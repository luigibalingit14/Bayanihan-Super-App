-- Bayanihan Super App — Supabase Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── Profiles ─────────────────────────────────────────────────────────────────
create table profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  full_name text,
  avatar_url text,
  barangay text,
  municipality text,
  province text,
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Anyone can view profiles"
  on profiles for select using (true);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = user_id);

create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = user_id);

-- ─── Reports ──────────────────────────────────────────────────────────────────
create table reports (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete set null,
  category text not null check (category in ('mobility', 'governance', 'health', 'agriculture', 'general')),
  type text not null,
  description text not null,
  location text,
  status text default 'pending' check (status in ('pending', 'in_review', 'resolved')),
  created_at timestamptz default now()
);

alter table reports enable row level security;

create policy "Anyone can read reports"
  on reports for select using (true);

create policy "Authenticated users can create reports"
  on reports for insert with check (auth.uid() = user_id);

create policy "Users can update own reports"
  on reports for update using (auth.uid() = user_id);

-- ─── Posts ────────────────────────────────────────────────────────────────────
create table posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete set null,
  category text not null check (category in ('disinfo', 'employment', 'agriculture', 'announcement')),
  title text not null,
  content text,
  tags text[],
  flagged boolean default false,
  flag_count integer default 0,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

alter table posts enable row level security;

create policy "Anyone can read posts"
  on posts for select using (true);

create policy "Authenticated users can create posts"
  on posts for insert with check (auth.uid() = user_id);

create policy "Users can flag any post (update flag_count)"
  on posts for update using (true);

-- ─── Bookings ─────────────────────────────────────────────────────────────────
create table bookings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete set null,
  service_type text not null check (service_type in ('healthcare', 'employment', 'transportation', 'agriculture')),
  provider_name text,
  scheduled_at timestamptz,
  notes text,
  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz default now()
);

alter table bookings enable row level security;

create policy "Users can read own bookings"
  on bookings for select using (auth.uid() = user_id);

create policy "Authenticated users can create bookings"
  on bookings for insert with check (auth.uid() = user_id);

create policy "Users can update own bookings"
  on bookings for update using (auth.uid() = user_id);
