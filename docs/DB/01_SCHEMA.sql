-- 🏗 Fellbach Wine Store - Initial Schema
-- PostgreSQL 15+ / Supabase

-- 1. 🛠 EXTENSIONS
-- Включаем pgvector для AI поиска
create extension if not exists vector;

-- 2. 🍷 WINES (Каталог вин)
create type wine_type as enum ('RED', 'WHITE', 'ROSE', 'SPARKLING', 'ALCOHOL_FREE', 'PACKAGE', 'OTHER');
create type wine_flavor as enum ('TROCKEN', 'HALBTROCKEN', 'FEINHERB', 'LIEBLICH', 'SUESS');
create type stock_status as enum ('IN_STOCK', 'OUT_OF_STOCK', 'ON_DEMAND');

create table wines (
    id bigint generated always as identity primary key,
    slug text unique not null,
    name text not null,
    description text,
    short_description text,
    image_url text,
    
    price numeric(10, 2) not null,
    sale_price numeric(10, 2),
    is_sale boolean default false,
    
    stock_status stock_status default 'IN_STOCK',
    stock_quantity integer default 0,
    
    type wine_type not null,
    grape_variety text,
    year integer,
    
    alcohol text, -- '13.5%'
    acidity text,
    sugar text,
    flavor wine_flavor,
    quality_level text,
    edition text,
    
    rating numeric(3, 1),
    recommended_dishes text[], -- Array of strings
    tags text[],
    
    -- AI Embeddings
    embedding vector(1536), -- OpenAI Ada-002 size
    
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index idx_wines_type on wines(type);
create index idx_wines_price on wines(price);
create index idx_wines_grape on wines(grape_variety);

-- 3. 📅 EVENTS (События)
create type event_category as enum ('WEINFEST', 'WEINPROBE', 'KELLERBLICKE', 'WEINTREFF', 'AFTERWORK', 'WEINWANDERUNG', 'SONSTIGES');

create table events (
    id bigint generated always as identity primary key,
    slug text unique not null,
    title text not null,
    description text,
    image_url text,
    
    event_date date not null,
    event_time time not null,
    location text,
    
    price_per_person numeric(10, 2) not null,
    total_spots integer not null,
    booked_spots integer default 0,
    
    category event_category not null,
    
    created_at timestamptz default now()
);

-- 4. 👤 USERS (Пользователи)
-- Эта таблица расширяет auth.users из Supabase
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text,
    full_name text,
    
    -- Loyalty
    loyalty_points integer default 0,
    loyalty_tier text default 'BRONZE',
    
    birth_date date,
    
    updated_at timestamptz default now()
);

-- 5. 🛒 ORDERS (Заказы)
create type order_status as enum ('NEW', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED');

create table orders (
    id bigint generated always as identity primary key,
    order_number text unique not null, -- 'ORD-2024-XXXX'
    
    user_id uuid references public.profiles(id), -- Nullable (для гостей)
    customer_email text not null,
    customer_phone text,
    
    shipping_address jsonb, -- { "street": "...", "city": "..." }
    
    items_total numeric(10, 2) not null,
    shipping_cost numeric(10, 2) default 0,
    grand_total numeric(10, 2) not null,
    
    status order_status default 'NEW',
    payment_intent_id text, -- Stripe ID
    
    created_at timestamptz default now()
);

create table order_items (
    id bigint generated always as identity primary key,
    order_id bigint references orders(id) on delete cascade,
    wine_id bigint references wines(id),
    
    wine_name_snapshot text not null, -- Название вина на момент покупки
    quantity integer not null,
    price_per_unit numeric(10, 2) not null
);

-- 6. 🎟 BOOKINGS (Бронирование событий)
create table bookings (
    id bigint generated always as identity primary key,
    event_id bigint references events(id),
    user_id uuid references public.profiles(id),
    
    customer_name text not null,
    customer_email text not null,
    guests_count integer not null,
    total_price numeric(10, 2) not null,
    
    status text default 'CONFIRMED',
    
    created_at timestamptz default now()
);

-- 7. 💎 LOYALTY TRANSACTIONS
create type transaction_type as enum ('EARN', 'BURN', 'ADJUSTMENT');

create table loyalty_transactions (
    id bigint generated always as identity primary key,
    user_id uuid references public.profiles(id) not null,
    
    points integer not null, -- +50 or -100
    type transaction_type not null,
    description text,
    
    order_id bigint references orders(id), -- Опциональная ссылка на заказ
    
    created_at timestamptz default now()
);

-- 8. 🔐 RLS (Row Level Security) - Безопасность
alter table profiles enable row level security;
alter table orders enable row level security;
alter table bookings enable row level security;

-- Политика: Пользователь видит только свой профиль
create policy "Public profiles are viewable by everyone" 
on profiles for select using (true);

create policy "Users can update own profile" 
on profiles for update using (auth.uid() = id);

-- Политика: Заказы видны только владельцу
create policy "Users can see own orders" 
on orders for select using (auth.uid() = user_id);
