-- Araç Kiralama (Car Rental) tablosu
CREATE TABLE IF NOT EXISTS public.cars (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- economy, mid, luxury, suv, minibus, offroad, motorcycle
    images TEXT[] DEFAULT '{}',
    transmission TEXT NOT NULL, -- manual, auto
    passengers INTEGER DEFAULT 5,
    fuel TEXT NOT NULL, -- gasoline, diesel, electric, hybrid
    price DECIMAL NOT NULL,
    currency TEXT DEFAULT '€',
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security) ayarları
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir (Public Read)
CREATE POLICY "Allow public read-only access" ON public.cars
    FOR SELECT USING (true);

-- Sadece adminler değiştirebilir (Service Role veya Admin Auth)
-- Not: Admin API'miz service_role_key kullandığı için RLS'i bypass edebilir 
-- veya aşağıdaki gibi politikalar eklenebilir.
CREATE POLICY "Allow all access for service role" ON public.cars
    USING (auth.jwt()->>'role' = 'service_role');
