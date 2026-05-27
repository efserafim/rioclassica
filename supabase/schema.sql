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

drop policy if exists "roteiros_public_read" on public.roteiros;
create policy "roteiros_public_read"
  on public.roteiros for select
  using (true);

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
  'Descubra o Tema no WhatsApp',
  '*Vagas estritamente limitadas - Confirme sua participação via WhatsApp',
  'https://wa.me/21990234090?text=Olá%20Rio%20Clássica!',
  'Cada sábado é uma surpresa!',
  'assets/image/Paço_Imperial_-_Rio_de_Janeiro_-_20220826172010.jpg',
  'Paço Imperial - Rio de Janeiro'
) on conflict (id) do nothing;

-- Storage: bucket "rioclassica" + políticas
insert into storage.buckets (id, name, public, file_size_limit)
values ('rioclassica', 'rioclassica', true, 10485760)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit;

drop policy if exists "rioclassica_public_read" on storage.objects;
create policy "rioclassica_public_read"
  on storage.objects for select
  using (bucket_id = 'rioclassica');

-- Admin allowlist
create table if not exists public.admin_allowlist (
  email text primary key,
  created_at timestamptz not null default now()
);

alter table public.admin_allowlist enable row level security;

drop policy if exists "admin_allowlist_no_access" on public.admin_allowlist;
create policy "admin_allowlist_no_access"
  on public.admin_allowlist for all
  using (false)
  with check (false);

-- Função para verificar se é admin
create or replace function public.is_admin_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_allowlist a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_admin_user() from public;
grant execute on function public.is_admin_user() to authenticated;

-- Políticas de admin para sabados
drop policy if exists "sabados_authenticated_write" on public.sabados;
drop policy if exists "sabados_admin_insert" on public.sabados;
drop policy if exists "sabados_admin_update" on public.sabados;
drop policy if exists "sabados_admin_delete" on public.sabados;

create policy "sabados_admin_insert"
  on public.sabados for insert to authenticated
  with check (public.is_admin_user());

create policy "sabados_admin_update"
  on public.sabados for update to authenticated
  using (public.is_admin_user()) with check (public.is_admin_user());

create policy "sabados_admin_delete"
  on public.sabados for delete to authenticated
  using (public.is_admin_user());

-- Políticas de admin para roteiros
drop policy if exists "roteiros_authenticated_write" on public.roteiros;
drop policy if exists "roteiros_admin_insert" on public.roteiros;
drop policy if exists "roteiros_admin_update" on public.roteiros;
drop policy if exists "roteiros_admin_delete" on public.roteiros;

create policy "roteiros_admin_insert"
  on public.roteiros for insert to authenticated
  with check (public.is_admin_user());

create policy "roteiros_admin_update"
  on public.roteiros for update to authenticated
  using (public.is_admin_user()) with check (public.is_admin_user());

create policy "roteiros_admin_delete"
  on public.roteiros for delete to authenticated
  using (public.is_admin_user());

-- Políticas de admin para storage
drop policy if exists "rioclassica_auth_insert" on storage.objects;
drop policy if exists "rioclassica_admin_insert" on storage.objects;
create policy "rioclassica_admin_insert"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'rioclassica'
    and public.is_admin_user()
    and (storage.foldername(name))[1] in ('sabados', 'roteiros')
  );

drop policy if exists "rioclassica_auth_update" on storage.objects;
drop policy if exists "rioclassica_admin_update" on storage.objects;
create policy "rioclassica_admin_update"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'rioclassica'
    and public.is_admin_user()
    and (storage.foldername(name))[1] in ('sabados', 'roteiros')
  )
  with check (
    bucket_id = 'rioclassica'
    and public.is_admin_user()
    and (storage.foldername(name))[1] in ('sabados', 'roteiros')
  );

drop policy if exists "rioclassica_auth_delete" on storage.objects;
drop policy if exists "rioclassica_admin_delete" on storage.objects;
create policy "rioclassica_admin_delete"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'rioclassica'
    and public.is_admin_user()
    and (storage.foldername(name))[1] in ('sabados', 'roteiros')
  );
