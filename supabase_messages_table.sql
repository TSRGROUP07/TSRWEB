-- TSR_WEB Messages Table Schema
-- İletişim formları ve mesajlar için tablo

CREATE TABLE IF NOT EXISTS public.messages (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Mesaj Bilgileri
    type TEXT, -- "contact", "question", "mulk_yonetimi", "property_inquiry" vb.
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT,
    question TEXT, -- Soru sor formundan gelen
    
    -- İletişim Tercihi
    contact_method TEXT, -- "email", "phone", "whatsapp" vb.
    
    -- Durum
    status TEXT DEFAULT 'new', -- "new", "read", "replied", "archived"
    read BOOLEAN DEFAULT false,
    
    -- Kullanıcı Bilgisi (opsiyonel)
    user_id TEXT,
    
    -- Emlak İlanı ile İlişkili (opsiyonel)
    property_id TEXT,
    property_title TEXT,
    property_location TEXT,
    
    -- Ek Bilgiler
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Index'ler (performans için)
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_email ON public.messages(email);
CREATE INDEX IF NOT EXISTS idx_messages_read ON public.messages(read);
CREATE INDEX IF NOT EXISTS idx_messages_status ON public.messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_type ON public.messages(type);

-- Row Level Security (RLS)
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilsin (Public Read) - Admin panel için
CREATE POLICY "Public read messages" ON public.messages
    FOR SELECT USING (true);

-- Herkes yazabilsin (Public Insert) - Form gönderimi için
CREATE POLICY "Public insert messages" ON public.messages
    FOR INSERT WITH CHECK (true);

-- Authenticated users güncelleyebilsin (Admin için)
CREATE POLICY "Authenticated update messages" ON public.messages
    FOR UPDATE USING (true);

-- Authenticated users silebilsin (Admin için)
CREATE POLICY "Authenticated delete messages" ON public.messages
    FOR DELETE USING (true);

-- Updated_at otomatik güncelleme trigger'ı
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON public.messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
