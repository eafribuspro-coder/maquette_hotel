-- ============================================================
--  Nourabel Hotel — schéma de base de données
--  À exécuter dans l'éditeur SQL du projet Supabase.
-- ============================================================

-- ---------- Configuration (gérée par l'admin) ----------

create table if not exists public.chambres (
  id          text primary key,
  nom         text    not null,
  description text    not null default '',
  prix        integer not null check (prix >= 0),
  capacite    integer not null default 2 check (capacite > 0),
  quantite    integer not null default 1 check (quantite > 0),
  active      boolean not null default true
);

create table if not exists public.tables (
  id          text primary key,
  nom         text    not null,
  places      integer not null default 4 check (places > 0),
  emplacement text    not null default '',
  active      boolean not null default true
);

-- ---------- Réservations (créées par les clients) ----------

create table if not exists public.reservations_chambre (
  id         text primary key,
  "chambreId" text not null references public.chambres (id) on delete restrict,
  nom        text    not null,
  telephone  text    not null,
  email      text    not null,
  arrivee    date    not null,
  depart     date    not null,
  voyageurs  integer not null default 1 check (voyageurs > 0),
  montant    integer not null default 0 check (montant >= 0),
  statut     text    not null default 'en_attente'
             check (statut in ('en_attente', 'confirmee', 'annulee')),
  "creeLe"   timestamptz not null default now(),
  check (depart > arrivee)
);

create table if not exists public.reservations_table (
  id        text primary key,
  "tableId" text not null references public.tables (id) on delete restrict,
  nom       text    not null,
  telephone text    not null,
  email     text    not null,
  date      date    not null,
  heure     text    not null,
  couverts  integer not null default 2 check (couverts > 0),
  statut    text    not null default 'en_attente'
            check (statut in ('en_attente', 'confirmee', 'annulee')),
  "creeLe"  timestamptz not null default now()
);

create index if not exists idx_resa_chambre_arrivee on public.reservations_chambre (arrivee);
create index if not exists idx_resa_table_date      on public.reservations_table (date);

-- ---------- Sécurité (Row Level Security) ----------
-- Principe : le public peut consulter l'offre et déposer une demande de
-- réservation ; seul un utilisateur authentifié (l'admin) peut lire les
-- réservations, les modifier et configurer chambres et tables.

alter table public.chambres            enable row level security;
alter table public.tables              enable row level security;
alter table public.reservations_chambre enable row level security;
alter table public.reservations_table   enable row level security;

-- Offre : lecture publique, écriture réservée à l'admin
create policy "chambres lisibles par tous" on public.chambres
  for select using (true);
create policy "chambres modifiables par admin" on public.chambres
  for all to authenticated using (true) with check (true);

create policy "tables lisibles par tous" on public.tables
  for select using (true);
create policy "tables modifiables par admin" on public.tables
  for all to authenticated using (true) with check (true);

-- Réservations : création publique, consultation et modification par l'admin
create policy "demande de reservation chambre publique" on public.reservations_chambre
  for insert to anon, authenticated with check (true);
create policy "reservations chambre visibles par admin" on public.reservations_chambre
  for select to authenticated using (true);
create policy "reservations chambre modifiables par admin" on public.reservations_chambre
  for update to authenticated using (true) with check (true);
create policy "reservations chambre supprimables par admin" on public.reservations_chambre
  for delete to authenticated using (true);

create policy "demande de reservation table publique" on public.reservations_table
  for insert to anon, authenticated with check (true);
create policy "reservations table visibles par admin" on public.reservations_table
  for select to authenticated using (true);
create policy "reservations table modifiables par admin" on public.reservations_table
  for update to authenticated using (true) with check (true);
create policy "reservations table supprimables par admin" on public.reservations_table
  for delete to authenticated using (true);

-- ---------- Jeu de données de départ ----------

insert into public.chambres (id, nom, description, prix, capacite, quantite) values
  ('ch-standard',   'Chambre Standard',   'Confortable et lumineuse, vue sur les jardins de filaos.',            45000, 2, 12),
  ('ch-superieure', 'Chambre Supérieure', 'Terrasse privée ouverte sur la piscine et ses parasols.',            65000, 3,  8),
  ('ch-suite',      'Suite Familiale',    'Deux chambres communicantes et un salon, à quelques pas du sable.',  95000, 5,  4)
on conflict (id) do nothing;

insert into public.tables (id, nom, places, emplacement) values
  ('t-plage-1',    'Table Plage 1',    4, 'Bord de plage'),
  ('t-plage-2',    'Table Plage 2',    4, 'Bord de plage'),
  ('t-plage-3',    'Table Plage 3',    6, 'Bord de plage'),
  ('t-paillote-1', 'Paillote 1',       8, 'Sous la paillote'),
  ('t-paillote-2', 'Paillote 2',      10, 'Sous la paillote'),
  ('t-piscine-1',  'Table Piscine 1',  4, 'Bord de piscine')
on conflict (id) do nothing;

-- ---------- Compte administrateur ----------
-- À créer via Authentication → Users dans le tableau de bord Supabase
-- (e-mail + mot de passe). Aucun compte n'est créé par ce script.
