-- TSR GROUP - Consolidated Schema & Content Fix
-- This script ensures all tables exist, RLS is enabled, and default content is restored.

-- 1. Create Tables if they don't exist
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

CREATE TABLE IF NOT EXISTS site_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT,
    url TEXT NOT NULL,
    category TEXT,
    meta JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT,
    image TEXT,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content JSONB,
    seo JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_videos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT,
    description TEXT,
    url TEXT NOT NULL,
    type TEXT, -- hero, property, etc.
    property_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS homepage_content (
    id INTEGER PRIMARY KEY DEFAULT 1,
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT one_row CHECK (id = 1)
);

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

CREATE TABLE IF NOT EXISTS site_seo (
    id INTEGER PRIMARY KEY DEFAULT 1,
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT one_row_seo CHECK (id = 1)
);

-- 2. Ensure RLS is enabled and policies are set
-- Drop existing policies to avoid "already exists" errors if re-running
DO $$ 
BEGIN
    -- Blogs
    ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow read to anon" ON blogs;
    CREATE POLICY "Allow read to anon" ON blogs FOR SELECT USING (true);
    
    -- Site Images
    ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow read to anon" ON site_images;
    CREATE POLICY "Allow read to anon" ON site_images FOR SELECT USING (true);
    
    -- Team Members
    ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow read to anon" ON team_members;
    CREATE POLICY "Allow read to anon" ON team_members FOR SELECT USING (true);
    
    -- Site Pages
    ALTER TABLE site_pages ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow read to anon" ON site_pages;
    CREATE POLICY "Allow read to anon" ON site_pages FOR SELECT USING (true);
    
    -- Site Videos
    ALTER TABLE site_videos ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow read to anon" ON site_videos;
    CREATE POLICY "Allow read to anon" ON site_videos FOR SELECT USING (true);
    
    -- Homepage Content
    ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow read to anon" ON homepage_content;
    CREATE POLICY "Allow read to anon" ON homepage_content FOR SELECT USING (true);
    
    -- Site Settings
    ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow read to anon" ON site_settings;
    CREATE POLICY "Allow read to anon" ON site_settings FOR SELECT USING (true);
    
    -- SEO Settings
    ALTER TABLE site_seo ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow read to anon" ON site_seo;
    CREATE POLICY "Allow read to anon" ON site_seo FOR SELECT USING (true);
    
    -- Properties
    ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow read to anon" ON properties;
    CREATE POLICY "Allow read to anon" ON properties FOR SELECT USING (true);
END $$;

-- 3. Insert Default Content
-- Insert Hero Video
INSERT INTO site_videos (title, url, type) 
SELECT 'Hero Video', 'https://www.youtube.com/watch?v=l5J2bN_XTJw', 'hero'
WHERE NOT EXISTS (SELECT 1 FROM site_videos WHERE type = 'hero');

-- Insert default rows for singleton tables
INSERT INTO site_settings (id) VALUES (1) ON CONFLICT DO NOTHING;
INSERT INTO site_seo (id, content) VALUES (1, '{}'::jsonb) ON CONFLICT DO NOTHING;
INSERT INTO homepage_content (id, content) VALUES (1, '{}'::jsonb) ON CONFLICT DO NOTHING;
