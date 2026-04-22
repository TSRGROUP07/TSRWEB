const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
      process.env[key.trim()] = value;
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log("🔍 Araçlar tablosu kontrol ediliyor...");
  const { data, error, count } = await supabase.from('cars').select('*', { count: 'exact' });
  
  if (error) {
    if (error.code === '42P01') {
      console.error("❌ Hata: 'cars' tablosu veritabanında bulunamadı! Lütfen SQL kodunu çalıştırın.");
    } else {
      console.error("❌ Hata:", error.message);
    }
  } else {
    console.log(`✅ Başarılı! Toplam araç sayısı: ${count}`);
  }
}

check();
