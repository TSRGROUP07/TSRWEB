-- Create tables for Full Site Content Migration

-- 1. Blogs
CREATE TABLE IF NOT EXISTS blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT,
    excerpt TEXT,
    category TEXT,
    image TEXT,
    published BOOLEAN DEFAULT false,
    author TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Admin Images (Gallery)
CREATE TABLE IF NOT EXISTS site_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT,
    url TEXT NOT NULL,
    category TEXT,
    meta JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Team Members
CREATE TABLE IF NOT EXISTS team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT,
    image TEXT,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 4. Site Pages (Dynamic content for custom pages)
CREATE TABLE IF NOT EXISTS site_pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content JSONB,
    seo JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 5. Videos
CREATE TABLE IF NOT EXISTS site_videos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT,
    description TEXT,
    url TEXT NOT NULL,
    type TEXT, -- hero, property, etc.
    property_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 6. Homepage Content (A single row to store all JSON content)
CREATE TABLE IF NOT EXISTS homepage_content (
    id INTEGER PRIMARY KEY DEFAULT 1,
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT one_row CHECK (id = 1)
);

-- 7. App Settings (To replace .env.local runtime edits)
CREATE TABLE IF NOT EXISTS site_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    google_maps_key TEXT,
    serp_api_key TEXT,
    google_drive_client_id TEXT,
    google_drive_client_secret TEXT,
    google_drive_service_account TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT one_row CHECK (id = 1)
);

-- 8. SEO Settings
CREATE TABLE IF NOT EXISTS site_seo (
    id INTEGER PRIMARY KEY DEFAULT 1,
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT one_row_seo CHECK (id = 1)
);

-- RLS Policies
-- Allow all for Authenticated Role (Admin / Service Role)
-- Allow public reading (Select) for all content tables

-- Blogs
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all to authenticated" ON blogs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow read to anon" ON blogs FOR SELECT USING (true);

-- Site Images
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read to anon" ON site_images FOR SELECT USING (true);

-- Team Members
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read to anon" ON team_members FOR SELECT USING (true);

-- Site Pages
ALTER TABLE site_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read to anon" ON site_pages FOR SELECT USING (true);

-- Site Videos
ALTER TABLE site_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read to anon" ON site_videos FOR SELECT USING (true);

-- Homepage Content
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read to anon" ON homepage_content FOR SELECT USING (true);

-- SEO Settings
ALTER TABLE site_seo ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read to anon" ON site_seo FOR SELECT USING (true);

-- Properties (Crucial for the listing page)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read to anon" ON properties FOR SELECT USING (true);
