import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Public client — for browser usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side admin client — never expose to browser
export function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

// ─── Database types ────────────────────────────────────────────────────────

export interface DBUser {
  id: string;
  email: string;
  phone: string;
  store_name: string;
  store_description: string;
  store_city: string;
  store_category: string;
  whatsapp_number: string;
  whatsapp_phone_id: string;
  whatsapp_token: string;
  plan: "free" | "pro" | "enterprise";
  xp: number;
  streak: number;
  last_active: string;
  created_at: string;
}

export interface DBProduct {
  id: string;
  user_id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  category: string;
  in_stock: boolean;
  stock_count?: number;
  image_url?: string;
  created_at: string;
}

export interface DBConversation {
  id: string;
  user_id: string;
  customer_phone: string;
  customer_name?: string;
  status: "open" | "closed" | "pending";
  last_message: string;
  last_message_at: string;
  total_messages: number;
  created_at: string;
}

export interface DBMessage {
  id: string;
  conversation_id: string;
  role: "customer" | "assistant";
  content: string;
  wa_message_id?: string;
  created_at: string;
}

export interface DBOrder {
  id: string;
  user_id: string;
  conversation_id?: string;
  customer_name: string;
  customer_phone: string;
  items: { product_id: string; name: string; price: number; qty: number }[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  address?: string;
  notes?: string;
  created_at: string;
}

/*
─── Supabase SQL Schema ───────────────────────────────────────────────────────

Run this in your Supabase SQL editor to create all tables:

create table users (
  id uuid default gen_random_uuid() primary key,
  email text unique,
  phone text unique,
  password_hash text,
  store_name text not null,
  store_description text,
  store_city text,
  store_category text,
  whatsapp_number text,
  whatsapp_phone_id text,
  whatsapp_token text,
  plan text default 'free',
  xp integer default 50,
  streak integer default 1,
  last_active date default current_date,
  created_at timestamptz default now()
);

create table products (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade,
  name text not null,
  description text,
  price numeric not null,
  original_price numeric,
  category text,
  in_stock boolean default true,
  stock_count integer,
  image_url text,
  created_at timestamptz default now()
);

create table conversations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade,
  customer_phone text not null,
  customer_name text,
  status text default 'open',
  last_message text,
  last_message_at timestamptz default now(),
  total_messages integer default 0,
  created_at timestamptz default now()
);

create table messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references conversations(id) on delete cascade,
  role text not null,
  content text not null,
  wa_message_id text,
  created_at timestamptz default now()
);

create table orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade,
  conversation_id uuid references conversations(id),
  customer_name text,
  customer_phone text,
  items jsonb not null,
  total numeric not null,
  status text default 'pending',
  address text,
  notes text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table users enable row level security;
alter table products enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;
alter table orders enable row level security;

-- Policies: users can only access their own data
create policy "Users own data" on users for all using (auth.uid() = id);
create policy "Users own products" on products for all using (auth.uid() = user_id);
create policy "Users own conversations" on conversations for all using (auth.uid() = user_id);
create policy "Users own orders" on orders for all using (auth.uid() = user_id);

─────────────────────────────────────────────────────────────────────────────
*/
