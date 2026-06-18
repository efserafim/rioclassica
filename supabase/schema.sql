-- Rio Clássica — execute no Supabase → SQL Editor

-- Tabelas
create table if not exists public.sabados (
  id text primary key,
  featured boolean not null default false,
  badge text,
  title text not null,
  description text,
  duration text,
  languages text,
  max_people text,
  button_text text,
  note text,
  whatsapp_link text,
  explanation text,
  image_url text,
  image_alt text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.roteiros (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  description text,
  duration text,
  languages text,
  whatsapp_link text,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists sabados_featured_idx on public.sabados (featured);
create index if not exists sabados_created_at_idx on public.sabados (created_at desc);
create index if not exists roteiros_created_at_idx on public.roteiros (created_at desc);

-- RLS
alter table public.sabados enable row level security;
alter table public.roteiros enable row level security;

drop policy if exists "sabados_public_read" on public.sabados;
create policy "sabados_public_read"
  on public.sabados for select
  using (true);

drop policy if exists "sabados_authenticated_write" on public.sabados;
create policy "sabados_authenticated_write"
  on public.sabados for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "roteiros_public_read" on public.roteiros;
create policy "roteiros_public_read"
  on public.roteiros for select
  using (true);

drop policy if exists "roteiros_authenticated_write" on public.roteiros;
create policy "roteiros_authenticated_write"
  on public.roteiros for all
  to authenticated
  using (true)
  with check (true);

-- Card em destaque inicial (opcional)
insert into public.sabados (
  id, featured, badge, title, description, duration, languages, max_people,
  button_text, note, whatsapp_link, explanation, image_url, image_alt
) values (
  'featured-sabado',
  true,
  'EVENTO SURPRESA',
  'Qual será o tema deste Sábado?',
  'A cada semana, Rio Clássica revela um novo tema.',
  'Aproximadamente 3h30min',
  'PT / EN / ES / FR',
  'Máx. 12 pessoas',
  'Reservar agora',
  '*Vagas estritamente limitadas - Confirme sua participação via WhatsApp',
  'https://wa.me/21990234090?text=Olá%20Rio%20Clássica!',
  'Cada sábado é uma surpresa!',
  '/assets/image/Paço_Imperial_-_Rio_de_Janeiro_-_20220826172010.jpg',
  'Paço Imperial - Rio de Janeiro'
) on conflict (id) do nothing;

-- Storage: bucket "rioclassica" + políticas (execute também se o bucket já existir no painel)
insert into storage.buckets (id, name, public, file_size_limit)
values ('rioclassica', 'rioclassica', true, 10485760)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit;

drop policy if exists "rioclassica_public_read" on storage.objects;
create policy "rioclassica_public_read"
  on storage.objects for select
  using (bucket_id = 'rioclassica');

drop policy if exists "rioclassica_auth_insert" on storage.objects;
create policy "rioclassica_auth_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'rioclassica');

drop policy if exists "rioclassica_auth_update" on storage.objects;
create policy "rioclassica_auth_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'rioclassica')
  with check (bucket_id = 'rioclassica');

drop policy if exists "rioclassica_auth_delete" on storage.objects;
create policy "rioclassica_auth_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'rioclassica');

-- Tabela de Blog Posts
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text,
  content text not null,
  featured_image_url text,
  featured_image_alt text,
  author text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_published_idx on public.blog_posts (published);
create index if not exists blog_posts_created_at_idx on public.blog_posts (created_at desc);

-- RLS para Blog Posts
alter table public.blog_posts enable row level security;

drop policy if exists "blog_posts_public_read" on public.blog_posts;
create policy "blog_posts_public_read"
  on public.blog_posts for select
  using (published = true);

drop policy if exists "blog_posts_authenticated_all" on public.blog_posts;
create policy "blog_posts_authenticated_all"
  on public.blog_posts for all
  to authenticated
  using (true)
  with check (true);
