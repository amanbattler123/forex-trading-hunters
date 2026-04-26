-- ============================================================
-- FOREX TRADING HUNTERS — SUPABASE SETUP
-- Run this entire file in your Supabase SQL Editor
-- ============================================================

-- ── 1. BLOGS TABLE ──────────────────────────────────────────
create table if not exists public.blogs (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text not null unique,
  excerpt       text,
  content       text not null,          -- HTML from rich text editor
  cover_image   text,                   -- public URL from Supabase Storage
  images        text[] default '{}',    -- array of extra image URLs
  tags          text[] default '{}',
  status        text not null default 'draft' check (status in ('draft', 'published')),
  author_id     uuid references auth.users(id) on delete set null,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blogs_updated_at on public.blogs;
create trigger blogs_updated_at
  before update on public.blogs
  for each row execute function public.handle_updated_at();

-- ── 2. ROW-LEVEL SECURITY ────────────────────────────────────
alter table public.blogs enable row level security;

-- Public can read published posts only
create policy "Public read published blogs"
  on public.blogs for select
  using (status = 'published');

-- Authenticated admin can do everything
create policy "Admin full access"
  on public.blogs for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ── 3. STORAGE BUCKET ────────────────────────────────────────
-- Create the bucket (run in SQL editor)
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Public read
create policy "Public read blog images"
  on storage.objects for select
  using (bucket_id = 'blog-images');

-- Auth upload
create policy "Admin upload blog images"
  on storage.objects for insert
  with check (bucket_id = 'blog-images' and auth.role() = 'authenticated');

-- Auth delete
create policy "Admin delete blog images"
  on storage.objects for delete
  using (bucket_id = 'blog-images' and auth.role() = 'authenticated');

-- ── 4. PUBLIC API FUNCTION (optional helper) ─────────────────
-- Returns published blogs ordered by published_at desc
create or replace function public.get_published_blogs()
returns setof public.blogs language sql security definer as $$
  select * from public.blogs
  where status = 'published'
  order by published_at desc nulls last;
$$;

-- ── 5. INDEXES ───────────────────────────────────────────────
create index if not exists blogs_status_idx on public.blogs(status);
create index if not exists blogs_published_at_idx on public.blogs(published_at desc);
create index if not exists blogs_slug_idx on public.blogs(slug);
