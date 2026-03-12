-- Properties tablosuna kapak fotoğrafı sütunu ekleme
ALTER TABLE properties ADD COLUMN IF NOT EXISTS cover_image TEXT;
