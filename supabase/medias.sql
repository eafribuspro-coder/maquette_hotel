-- ============================================================
--  Nourabel Hotel — médias gérés par l'admin (film + photos)
--  À exécuter UNE FOIS dans l'éditeur SQL du projet Supabase,
--  après supabase/schema.sql.
-- ============================================================

-- ---------- Table des métadonnées ----------

create table if not exists public.medias (
  id       text primary key,
  type     text not null check (type in ('film', 'photo')),
  url      text not null,
  chemin   text not null default '',
  titre    text not null default '',
  ordre    bigint not null default 0,
  "creeLe" timestamptz not null default now()
);

create index if not exists idx_medias_type on public.medias (type);

alter table public.medias enable row level security;

-- Lecture publique (le site public affiche les médias),
-- écriture réservée à l'admin authentifié.
drop policy if exists "medias lisibles par tous" on public.medias;
create policy "medias lisibles par tous" on public.medias
  for select using (true);

drop policy if exists "medias gérables par admin" on public.medias;
create policy "medias gérables par admin" on public.medias
  for all to authenticated using (true) with check (true);

-- ---------- Bucket de stockage des fichiers ----------

insert into storage.buckets (id, name, public)
values ('medias', 'medias', true)
on conflict (id) do update set public = true;

-- Fichiers lisibles par tous, ajout / suppression réservés à l'admin.
drop policy if exists "medias storage lisibles par tous" on storage.objects;
create policy "medias storage lisibles par tous" on storage.objects
  for select using (bucket_id = 'medias');

drop policy if exists "medias storage ajout admin" on storage.objects;
create policy "medias storage ajout admin" on storage.objects
  for insert to authenticated with check (bucket_id = 'medias');

drop policy if exists "medias storage maj admin" on storage.objects;
create policy "medias storage maj admin" on storage.objects
  for update to authenticated using (bucket_id = 'medias') with check (bucket_id = 'medias');

drop policy if exists "medias storage suppression admin" on storage.objects;
create policy "medias storage suppression admin" on storage.objects
  for delete to authenticated using (bucket_id = 'medias');
