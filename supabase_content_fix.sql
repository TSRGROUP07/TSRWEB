-- Add RLS and default content for site_videos and site_settings
-- First, ensure RLS is enabled for all tables (again, to be safe)
ALTER TABLE site_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read for site_videos" ON site_videos FOR SELECT USING (true);
CREATE POLICY "Allow admin all for site_videos" ON site_videos FOR ALL USING (auth.role() = 'service_role');

ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read for site_images" ON site_images FOR SELECT USING (true);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read for site_settings" ON site_settings FOR SELECT USING (true);

ALTER TABLE site_seo ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read for site_seo" ON site_seo FOR SELECT USING (true);

-- Insert default Hero Video from VERCEL_VIDEO_FIX.md
INSERT INTO site_videos (title, url, type) 
VALUES ('Hero Video', 'https://www.youtube.com/watch?v=l5J2bN_XTJw', 'hero')
ON CONFLICT DO NOTHING;

-- Insert empty site settings if missing
INSERT INTO site_settings (id) VALUES (1) ON CONFLICT DO NOTHING;
