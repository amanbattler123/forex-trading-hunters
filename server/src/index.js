import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { z } from 'zod';

// Server restart trigger v2
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.resolve(__dirname, '../../client/public/assets');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const hasSupabaseConfig = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
if (!hasSupabaseConfig) {
  console.error('[server] Missing SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY. Admin login will not work until server/.env is configured.');
}

if (SUPABASE_URL) {
  try {
    const u = new URL(SUPABASE_URL);
    console.log(`[server] Supabase URL host: ${u.host}`);
  } catch {
    console.error('[server] SUPABASE_URL is not a valid URL. It must include https:// and look like https://xxxx.supabase.co');
  }
}

let supabase = null;
if (hasSupabaseConfig) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  } catch (e) {
    console.error('[server] Failed to initialize Supabase client. Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.', e);
    supabase = null;
  }
}

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: true }));
app.use(express.json({ limit: '10mb' }));
app.use('/assets', express.static(assetsDir));

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

async function requireAuth(req, res, next) {
  if (!supabase) return res.status(500).json({ message: 'Server misconfigured: Supabase client not initialized' });
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
  const token = auth.slice(7);
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return res.status(401).json({ message: 'Invalid or expired token' });
  req.user = user;
  next();
}

const leadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  experience: z.enum(['beginner', 'intermediate', 'advanced'])
});

const blogSchema = z.object({
  title: z.string().min(3).max(300),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(1),
  cover_image: z.string().optional(),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string().max(50)).max(10).optional(),
  status: z.enum(['draft', 'published'])
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

const leads = [];
app.post('/api/lead', (req, res) => {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid form data.' });
  leads.push({ ...parsed.data, createdAt: new Date().toISOString() });
  res.status(201).json({ ok: true, message: 'Lead received.' });
});

app.get('/api/leads', requireAuth, (_req, res) => res.json({ leads }));

app.post('/api/auth/sign-in', async (req, res) => {
  if (!hasSupabaseConfig) return res.status(500).json({ message: 'Server misconfigured: missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY' });
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(401).json({ message: error.message });
    if (!data?.session?.access_token) return res.status(500).json({ message: 'Auth succeeded but no session returned' });
    res.json({ access_token: data.session.access_token, refresh_token: data.session.refresh_token, user: data.user });
  } catch (e) {
    console.error('[server] sign-in error', e);
    res.status(500).json({ message: e?.message || 'Internal server error' });
  }
});

app.get('/api/blogs', async (req, res) => {
  const { data, error } = await supabase
    .from('blogs').select('id,title,slug,excerpt,cover_image,tags,published_at,created_at')
    .eq('status', 'published').order('published_at', { ascending: false });
  if (error) return res.status(500).json({ message: error.message });
  res.json({ blogs: data });
});

app.get('/api/blogs/:slug', async (req, res) => {
  const { data, error } = await supabase.from('blogs').select('*')
    .eq('slug', req.params.slug).eq('status', 'published').single();
  if (error || !data) return res.status(404).json({ message: 'Post not found' });
  res.json({ blog: data });
});

app.get('/api/admin/blogs', requireAuth, async (_req, res) => {
  const { data, error } = await supabase.from('blogs')
    .select('id,title,slug,excerpt,status,tags,published_at,created_at,updated_at')
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ message: error.message });
  res.json({ blogs: data });
});

app.get('/api/admin/blogs/:id', requireAuth, async (req, res) => {
  const { data, error } = await supabase.from('blogs').select('*').eq('id', req.params.id).single();
  if (error || !data) return res.status(404).json({ message: 'Not found' });
  res.json({ blog: data });
});

app.post('/api/admin/blogs', requireAuth, async (req, res) => {
  const parsed = blogSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid data', errors: parsed.error.flatten() });
  const { title, excerpt, content, cover_image, images, tags, status } = parsed.data;
  const slug = slugify(title) + '-' + Date.now().toString(36);
  const payload = {
    title, slug, excerpt: excerpt || null, content,
    cover_image: cover_image || null, images: images || [], tags: tags || [],
    status, author_id: req.user.id,
    published_at: status === 'published' ? new Date().toISOString() : null
  };
  const { data, error } = await supabase.from('blogs').insert(payload).select().single();
  if (error) return res.status(500).json({ message: error.message });
  res.status(201).json({ blog: data });
});

app.put('/api/admin/blogs/:id', requireAuth, async (req, res) => {
  const parsed = blogSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid data', errors: parsed.error.flatten() });
  const { title, excerpt, content, cover_image, images, tags, status } = parsed.data;
  const { data: existing } = await supabase.from('blogs').select('published_at').eq('id', req.params.id).single();
  const payload = {
    title, excerpt: excerpt || null, content,
    cover_image: cover_image || null, images: images || [], tags: tags || [],
    status,
    published_at: status === 'published' && (!existing || !existing.published_at)
      ? new Date().toISOString() : (existing ? existing.published_at : null)
  };
  const { data, error } = await supabase.from('blogs').update(payload).eq('id', req.params.id).select().single();
  if (error) return res.status(500).json({ message: error.message });
  res.json({ blog: data });
});

app.delete('/api/admin/blogs/:id', requireAuth, async (req, res) => {
  const { error } = await supabase.from('blogs').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ message: error.message });
  res.json({ ok: true });
});

app.post('/api/admin/upload', requireAuth, async (req, res) => {
  const { base64, filename, mimetype } = req.body;
  if (!base64 || !filename) return res.status(400).json({ message: 'base64 and filename required' });
  const buffer = Buffer.from(base64, 'base64');
  const ext = filename.split('.').pop();
  const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { data, error } = await supabase.storage
    .from('blog-images').upload(uniqueName, buffer, { contentType: mimetype || 'image/jpeg', upsert: false });
  if (error) return res.status(500).json({ message: error.message });
  const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(data.path);
  res.json({ url: publicUrl });
});

const port = Number(process.env.PORT ?? 5174);
app.use((err, _req, res, _next) => {
  console.error('[server] unhandled error', err);
  if (res.headersSent) return;
  res.status(500).json({ message: 'Internal server error' });
});

const server = app.listen(port, () => console.log(`[server] listening on http://localhost:${port}`));
server.on('error', (e) => {
  if (e?.code === 'EADDRINUSE') {
    console.error(`[server] Port ${port} is already in use. Stop the other process or change PORT in server/.env`);
    return;
  }
  console.error('[server] listen error', e);
});
