const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

// Slug oluşturma fonksiyonu
function slugify(text) {
  const trMap = {
    'çÇ': 'c',
    'ğĞ': 'g',
    'şŞ': 's',
    'üÜ': 'u',
    'ıİ': 'i',
    'öÖ': 'o'
  };
  for (const [key, value] of Object.entries(trMap)) {
    text = text.replace(new RegExp('[' + key + ']', 'g'), value);
  }
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// .env.local dosyasını manuel oku (dotenv paketi yoksa)
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

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL veya Key bulunamadı!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const staticPosts = [
  {
    title: "Yabancılar Türkiye’de Nasıl T.C. Vatandaşı Olabilir?",
    excerpt: "Yatırım yoluyla vatandaşlıkta gayrimenkul alımı öne çıkıyor; 400.000 USD ve 3 yıl satmama şerhi gibi koşullar var.",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&h=800&fit=crop",
    content: "<h3>Yatırım Yoluyla Vatandaşlık</h3><p>Türkiye'de gayrimenkul alarak vatandaşlık kazanmak isteyen yabancılar için alt limit 400.000 USD olarak belirlenmiştir. Bu mülkün 3 yıl boyunca satılmaması gerekmektedir.</p>",
    category: "Blog",
    published: true,
  },
  {
    title: "İkametgâh (İkamet İzni) Nasıl Alınır?",
    excerpt: "e-İkamet üzerinden online başvuru, randevu ve evrak teslimi temel adımlardır; türüne göre belge listesi değişir.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=800&fit=crop",
    content: "<h3>İkamet İzni Süreci</h3><p>Online başvuru yaptıktan sonra randevu gününde belgelerinizle birlikte Göç İdaresi'ne gitmeniz gerekmektedir.</p>",
    category: "Blog",
    published: true,
  },
  {
    title: "Kısa Dönem Kiralama: Uzun Döneme Kıyasla Farkları ve Faydaları",
    excerpt: "Dinamik fiyatlandırma ve esnek nakit akışı sağlar; izin belgesi ve mevzuat gereklilikleri takip edilmelidir.",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=800&fit=crop",
    content: "<h3>Kısa Dönem vs Uzun Dönem</h3><p>Kısa dönem kiralamalar daha yüksek getiri sunsa da operasyonel maliyetleri daha yüksektir.</p>",
    category: "Blog",
    published: true,
  },
  {
    title: "Yabancı Alıcıların Türkiye'de Yatırım Yaparken Yaptığı Hatalar",
    excerpt: "Tapu uygunluğu ve değerleme kontrolü yapılmadan kapora verilmesi en yaygın hatalardan biridir.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=800&fit=crop",
    content: "<h3>Yabancı Yatırımcı Hataları</h3><p>Tapu uygunluğu ve değerleme kontrolü yapılmadan kapora verilmesi en yaygın hatalardan biridir.</p>",
    category: "Blog",
    published: true,
  },
  {
    title: "Türkiye Neden Küresel Gayrimenkul Yatırımcılarının Gözdesi Oldu?",
    excerpt: "Stratejik konum, turizm dinamikleri ve geniş ürün yelpazesi yabancı yatırımcıyı çekiyor.",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&h=800&fit=crop",
    content: "<h3>Küresel Yatırım Gözdesi Türkiye</h3><p>Stratejik konum, turizm dinamikleri ve geniş ürün yelpazesi yabancı yatırımcıyı çekiyor.</p>",
    category: "Blog",
    published: true,
  },
  {
    title: "Türkiye'de Genel Yaşam Maliyeti",
    excerpt: "Konut, gıda, ulaşım, sağlık ve sosyal yaşam kalemleri kur/enflasyonla birlikte toplam maliyeti belirler.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop",
    content: "<h3>Yaşam Maliyeti</h3><p>Konut, gıda, ulaşım, sağlık ve sosyal yaşam kalemleri kur/enflasyonla birlikte toplam maliyeti belirler.</p>",
    category: "Blog",
    published: true,
  },
  {
    title: "Alanya Yaşam Rehberi: Ulaşım, Çevre Yolu, Sahil Yolu ve Pratik Bilgiler",
    excerpt: "Kompakt şehir yapısı, sahil ve çevre yolu alternatifleri ve toplu taşıma hatları günlük yaşamı kolaylaştırır.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",
    content: "<h3>Alanya Yaşam Rehberi</h3><p>Kompakt şehir yapısı, sahil ve çevre yolu alternatifleri ve toplu taşıma hatları günlük yaşamı kolaylaştırır.</p>",
    category: "Blog",
    published: true,
  },
  {
    title: "Alanya'da Yapılacaklar Listesi",
    excerpt: "Kale, teleferik, Dim Çayı, sahil yürüyüşleri ve su sporları popüler aktiviteler arasında.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    content: "<h3>Alanya Aktiviteleri</h3><p>Kale, teleferik, Dim Çayı, sahil yürüyüşleri ve su sporları popüler aktiviteler arasında.</p>",
    category: "Blog",
    published: true,
  },
  {
    title: "Türkiye’de Ticari Alanlara Talep Artışı",
    excerpt: "Turizm, perakende ve e-ticaret kaynaklı lojistik ihtiyacı ticari gayrimenkulde talebi artırıyor.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    content: "<h3>Ticari Gayrimenkul</h3><p>Turizm, perakende ve e-ticaret kaynaklı lojistik ihtiyacı ticari gayrimenkulde talebi artırıyor.</p>",
    category: "Blog",
    published: true,
  },
];

const staticCars = [
  {
    name: "Fiat Egea",
    category: "economy",
    images: ["/RENTACAR/EGEA.jpg"],
    transmission: "manual",
    passengers: 5,
    fuel: "gasoline",
    price: 40,
    currency: "€",
    published: true
  },
  {
    name: "Hyundai Staria",
    category: "minibus",
    images: ["/RENTACAR/STARİA.jpg"],
    transmission: "auto",
    passengers: 9,
    fuel: "diesel",
    price: 120,
    currency: "€",
    published: true
  },
  {
    name: "Renault Clio",
    category: "economy",
    images: ["/RENTACAR/CLİO.png"],
    transmission: "manual",
    passengers: 5,
    fuel: "gasoline",
    price: 35,
    currency: "€",
    published: true
  },
  {
    name: "Renault Duster",
    category: "suv",
    images: ["/RENTACAR/duster.png"],
    transmission: "manual",
    passengers: 5,
    fuel: "diesel",
    price: 70,
    currency: "€",
    published: true
  },
  {
    name: "Ford Ranger",
    category: "offroad",
    images: ["/RENTACAR/ranger.png"],
    transmission: "manual",
    passengers: 5,
    fuel: "diesel",
    price: 150,
    currency: "€",
    published: true
  },
  {
    name: "Motorsikletler",
    category: "motorcycle",
    images: ["/RENTACAR/motor.png"],
    transmission: "manual",
    passengers: 2,
    fuel: "gasoline",
    price: 25,
    currency: "€",
    published: true
  },
];

async function migrate() {
  console.log("🚀 Migrasyon başlıyor...");

  // Blogları ekle
  for (const post of staticPosts) {
    const postWithSlug = {
      ...post,
      slug: slugify(post.title),
      author: "TSR GROUP",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    const { data, error } = await supabase.from('blogs').insert([postWithSlug]);
    if (error) console.error(`❌ Blog eklenemedi: ${post.title}`, error.message);
    else console.log(`✅ Blog eklendi: ${post.title}`);
  }

  // Araçları ekle
  for (const car of staticCars) {
    const { data, error } = await supabase.from('cars').insert([car]);
    if (error) console.error(`❌ Araç eklenemedi: ${car.name}`, error.message);
    else console.log(`✅ Araç eklendi: ${car.name}`);
  }

  console.log("🏁 Migrasyon tamamlandı!");
}

migrate();
