# 🚀 Admin Blog System — Setup Guide

This guide walks you through connecting Supabase and getting the admin panel running in under 15 minutes.

---

## What Was Added

| File | What it does |
|------|-------------|
| `client/public/admin.html` | Standalone admin panel — visit `/admin.html` |
| `server/src/index.js` | Updated with Supabase + all blog API routes |
| `server/.env.example` | Copy → `.env` and fill in your keys |
| `supabase-setup.sql` | Run once in Supabase SQL Editor |

---

## Step 1 — Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in / create account
2. Click **New Project**
3. Choose a name (e.g. `forex-trading-hunters`) and a strong DB password FOREXHUNTERS123
4. Select a region close to your users
5. Wait ~2 minutes for it to provision

---

## Step 2 — Run the SQL Schema

1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **New Query**
3. Open `supabase-setup.sql` from your project root
4. **Paste the entire contents** into the SQL editor
5. Click **Run**

This creates:
- `blogs` table with all necessary columns
- Row-Level Security (public reads published only; admin can do everything)
- `blog-images` storage bucket (public read, auth write)
- Indexes for fast queries

---

## Step 3 — Create Your Admin User

1. In Supabase dashboard → **Authentication** → **Users**
2. Click **Add user → Create new user**
3. Enter your email and a strong password
4. Click **Create user**

> This is the email + password you'll use to log in to `/admin.html`

---

## Step 4 — Get Your API Keys

1. In Supabase dashboard → **Project Settings** → **API**
2. Copy your **Project URL** (looks like `https://xxxx.supabase.co`)
3. Copy your **service_role** key (click "Reveal" — it's the secret one)

> ⚠️ Never expose the service_role key in frontend code or git. It's server-only.

---

## Step 5 — Configure Environment Variables

In the `server/` folder:

```bash
cp .env.example .env
```

Edit `server/.env`:

```env
SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...your_service_role_key...
PORT=5174
```

---

## Step 6 — Install Dependencies & Start

```bash
# From the project root
npm install

# Start both client and server in dev mode
npm run dev
```

---

## Step 7 — Access the Admin Panel

Open your browser and go to:

```
http://localhost:5173/admin.html
```

Log in with the email + password you created in Step 3.

---

## Admin Panel Features

### ✍️ Blog Post Editor
- **Rich text** — bold, italic, headings H1–H3, lists, blockquotes, code blocks, links
- **Draft vs Published** — save a draft first, publish when ready
- **Tags** — type a tag, press Enter or comma to add; backspace to remove

### 🖼 Image Uploads
- Drag & drop or click to upload multiple images per post
- First image auto-set as cover; click "Set cover" to change
- Images stored in Supabase Storage (`blog-images` bucket)
- Click ✕ to remove any image

### 📋 Post Management
- See all posts (drafts + published) with status badges
- Edit any post — click ✏️
- Delete any post — click 🗑 (with confirmation)

---

## Displaying Blogs on the Main Website

The server exposes these **public** API endpoints (no auth needed):

```
GET /api/blogs              → list all published posts
GET /api/blogs/:slug        → get a single published post
```

Example — fetching posts in your React app:

```typescript
const res  = await fetch('/api/blogs');
const data = await res.json();
// data.blogs = [{ id, title, slug, excerpt, cover_image, tags, published_at }, ...]
```

Blog post content is stored as HTML (from the rich text editor) — render with `dangerouslySetInnerHTML`.

---

## Deploying to Production

When you deploy, make sure to:

1. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` as environment variables on your host
2. The `admin.html` file is in `client/public/` so it gets served statically
3. Consider adding HTTP Basic Auth or IP allowlisting at the server/proxy level as an extra layer for `/admin.html`

---

## Project Structure (new files highlighted)

```
forex-trading-hunters/
├── client/
│   ├── public/
│   │   └── admin.html          ← NEW: Admin panel
│   └── src/
│       └── App.tsx             (unchanged — add blog display here)
├── server/
│   ├── src/
│   │   └── index.js            ← UPDATED: Supabase + blog routes
│   ├── .env.example            ← NEW: Copy to .env
│   └── package.json            ← UPDATED: Added @supabase/supabase-js
└── supabase-setup.sql          ← NEW: Run once in Supabase SQL Editor
```
