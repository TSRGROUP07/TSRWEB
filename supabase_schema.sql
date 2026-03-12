-- TSR_WEB Properties Table Schema

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Basic Info
    title TEXT NOT NULL,
    property_type TEXT,
    building_type TEXT,
    type TEXT, -- Satılık / Kiralık
    price NUMERIC,
    currency TEXT DEFAULT 'EUR',
    monthly_rent NUMERIC,
    deposit NUMERIC,
    
    -- Details
    area NUMERIC,
    net_area NUMERIC,
    rooms INTEGER,
    bathrooms INTEGER,
    wc_count INTEGER,
    floor INTEGER,
    total_floors INTEGER,
    building_age INTEGER,
    usage_status TEXT,
    
    -- Features
    heating_type TEXT,
    direction TEXT,
    balcony_count INTEGER DEFAULT 0,
    parking_count INTEGER DEFAULT 0,
    has_elevator BOOLEAN DEFAULT false,
    has_security BOOLEAN DEFAULT false,
    is_in_site BOOLEAN DEFAULT false,
    is_suitable_for_credit BOOLEAN DEFAULT false,
    is_priority BOOLEAN DEFAULT false,
    kitchen_type TEXT,
    monthly_fee NUMERIC,
    has_parent_bathroom BOOLEAN DEFAULT false,
    is_exchangeable BOOLEAN DEFAULT false,
    land_area NUMERIC,
    emsal TEXT,
    
    -- New Status Features
    is_opportunity BOOLEAN DEFAULT false,
    is_rental_guaranteed BOOLEAN DEFAULT false,
    citizenship_suitable BOOLEAN DEFAULT false,
    residence_permit_suitable BOOLEAN DEFAULT false,
    furnished_status TEXT,
    has_generator BOOLEAN DEFAULT false,
    has_camera BOOLEAN DEFAULT false,
    has_camellia BOOLEAN DEFAULT false,
    distance_to_sea TEXT,
    view_types TEXT[], -- Array of view types
    
    -- Amenities
    amenities JSONB DEFAULT '{}'::jsonb,
    
    -- Location
    location TEXT,
    district TEXT,
    neighborhood TEXT,
    address TEXT,
    coordinates JSONB, -- {lat: string, lng: string}
    google_maps_url TEXT,
    
    -- Analysis
    investment_score INTEGER,
    investment_rating TEXT,
    price_analysis JSONB DEFAULT '{}'::jsonb,
    marketing_analysis JSONB DEFAULT '{}'::jsonb,
    location_analysis JSONB DEFAULT '{}'::jsonb,
    structural_analysis JSONB DEFAULT '{}'::jsonb,
    demographics JSONB DEFAULT '{}'::jsonb,
    nearby_places JSONB DEFAULT '[]'::jsonb,
    
    -- Content
    description TEXT,
    description_tr TEXT,
    description_en TEXT,
    description_ru TEXT,
    
    title_tr TEXT,
    title_en TEXT,
    title_ru TEXT,
    
    location_tr TEXT,
    location_en TEXT,
    location_ru TEXT,
    
    district_tr TEXT,
    district_en TEXT,
    district_ru TEXT,
    
    neighborhood_tr TEXT,
    neighborhood_en TEXT,
    neighborhood_ru TEXT,
    
    address_tr TEXT,
    address_en TEXT,
    address_ru TEXT,
    
    features TEXT[], -- Array of strings
    features_tr TEXT[],
    features_en TEXT[],
    features_ru TEXT[],
    
    notes_tr TEXT,
    notes_en TEXT,
    notes_ru TEXT,
    
    images TEXT[], -- Array of image URLs
    video_url TEXT,
    virtual_tour_url TEXT,
    
    -- Admin & Contact
    property_status TEXT DEFAULT 'Aktif',
    listing_number TEXT,
    listing_date DATE DEFAULT CURRENT_DATE,
    listing_end_date DATE,
    contact_name TEXT,
    contact_phone TEXT,
    contact_email TEXT,
    notes TEXT,
    
    -- Agent
    agent_name TEXT,
    agent_photo TEXT,
    agent_phone TEXT
);

/* 
  EĞER TABLOYU DAHA ÖNCE OLUŞTURDUYSANIZ, EKSİK SÜTUNLARI EKLEMEK İÇİN 
  AŞAĞIDAKİ KOMUTLARI SQL EDITOR'DE ÇALIŞTIRIN:

ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS title_tr TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS title_ru TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS description_tr TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS description_en TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS description_ru TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS location_tr TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS location_en TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS location_ru TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS district_tr TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS district_en TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS district_ru TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS neighborhood_tr TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS neighborhood_en TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS neighborhood_ru TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS address_tr TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS address_en TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS address_ru TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS features_tr TEXT[];
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS features_en TEXT[];
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS features_ru TEXT[];
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS notes_tr TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS notes_en TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS notes_ru TEXT;
*/

-- Row Level Security (RLS) - Opsiyonel ama önerilir
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilsin (Public Read)
CREATE POLICY "Public read properties" ON public.properties
    FOR SELECT USING (true);

-- Sadece authenticated users (veya admin) yazabilsin
-- Not: Anon key ile yazma yetkisi vermek isterseniz 'anon' kullanın, 
-- ama genellikle service_role key backend'de yeterlidir.
CREATE POLICY "Authenticated insert properties" ON public.properties
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated update properties" ON public.properties
    FOR UPDATE USING (true);

CREATE POLICY "Authenticated delete properties" ON public.properties
    FOR DELETE USING (true);
