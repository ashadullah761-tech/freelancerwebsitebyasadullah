-- Supabase Schema for FreelanceFlow
-- Run this in your Supabase SQL Editor

-- 1. Create the projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  tech_stack TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'completed',
  live_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create the inquiries table
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT NOT NULL,
  budget TEXT,
  timeline TEXT,
  description TEXT NOT NULL,
  attachment_url TEXT,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies for projects
-- Anyone can read projects (for the portfolio page)
CREATE POLICY "Public profiles are viewable by everyone" ON projects FOR SELECT USING (true);
-- Only authenticated admins can insert/update/delete projects
CREATE POLICY "Admins can insert projects" ON projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update projects" ON projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete projects" ON projects FOR DELETE TO authenticated USING (true);

-- 4. RLS Policies for inquiries
-- Anyone can insert an inquiry (the client form)
CREATE POLICY "Anyone can insert an inquiry" ON inquiries FOR INSERT WITH CHECK (true);
-- Only authenticated admins can read/update/delete inquiries
CREATE POLICY "Admins can read inquiries" ON inquiries FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can update inquiries" ON inquiries FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete inquiries" ON inquiries FOR DELETE TO authenticated USING (true);

-- 5. Storage Buckets (Run this manually in the Storage UI or use these SQL commands if allowed)
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('inquiries', 'inquiries', false);

-- Set public policy for portfolio bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');

-- 6. Insert Sample Projects
INSERT INTO projects (title, description, image_url, category, tech_stack, status, live_url)
VALUES 
  ('E-commerce Redesign', 'A complete overhaul of an online fashion retailer.', 'https://images.unsplash.com/photo-1648824571286-905c10aa27ee?w=800&q=80', 'Web Dev', ARRAY['Next.js', 'Tailwind', 'Stripe'], 'completed', 'https://example.com'),
  ('Fintech Dashboard', 'A modern, data-rich dashboard for personal finance.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', 'UI/UX', ARRAY['React', 'Framer Motion', 'Recharts'], 'completed', 'https://example.com'),
  ('Local Coffee Shop', 'Beautiful branding and website for a boutique cafe.', 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80', 'Branding', ARRAY['Webflow', 'Figma'], 'completed', 'https://example.com'),
  ('Task Manager Mobile', 'A sleek mobile application for async task management.', 'https://images.unsplash.com/photo-1616423640778-28d1b53229b1?w=800&q=80', 'Mobile', ARRAY['React Native', 'Supabase'], 'completed', 'https://example.com'),
  ('Agency Landing Page', 'High conversion landing page with 3D animations.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', 'Web Dev', ARRAY['Three.js', 'Next.js'], 'completed', 'https://example.com'),
  ('Real Estate Platform', 'Property directory with map integration.', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80', 'Web Dev', ARRAY['Next.js', 'Prisma', 'PostgreSQL'], 'completed', 'https://example.com');
