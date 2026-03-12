-- Add missing columns to site_videos table
ALTER TABLE site_videos ADD COLUMN IF NOT EXISTS url TEXT;
ALTER TABLE site_videos ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE site_videos ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE site_videos ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;

-- Ensure type is unique for upsert to work correctly
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'site_videos_type_key') THEN
        ALTER TABLE site_videos ADD CONSTRAINT site_videos_type_key UNIQUE (type);
    END IF;
END $$;
