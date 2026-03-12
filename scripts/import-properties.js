const fs = require('fs');
const path = require('path');

// API endpoint'i kullanmak için
// Eğer server çalışmıyorsa, bu script çalışmayacaktır
const BASE_URL = process.env.BASE_URL || 'http://localhost:3002';

// İlanlar klasörünün tam yolu
const ILANLAR_PATH = path.join(process.cwd(), 'public', 'ilanlar', '1-) TSR GROUP GAYRİMENKULLER', '1-) DAİRELER');

// Mevcut ilanları sil (örnek ilanlar: id 1, 2, 3)
async function deleteExampleProperties() {
  console.log('📋 Mevcut örnek ilanlar siliniyor...');
  
  // API üzerinden mevcut ilanları al
  try {
    const response = await fetch(`${BASE_URL}/api/admin/properties`);
    const properties = await response.json();
    
    // İlk 3 ilanı sil (örnek ilanlar)
    const exampleIds = properties.slice(0, 3).map(p => p.id);
    
    for (const id of exampleIds) {
      try {
        const deleteResponse = await fetch(`${BASE_URL}/api/admin/properties/${id}`, {
          method: 'DELETE'
        });
        if (deleteResponse.ok) {
          console.log(`✅ İlan silindi: ${id}`);
        } else {
          console.log(`❌ İlan silinemedi: ${id}`);
        }
      } catch (error) {
        console.error(`❌ İlan silinirken hata: ${id}`, error);
      }
    }
  } catch (error) {
    console.error('❌ Mevcut ilanlar alınamadı:', error);
  }
}

// Dosya isimlerinden bilgi çıkar
function parseFolderName(folderName) {
  // Örnek: "130.000 € - 2+1 - G.PINARI-ALAİYE SİTESİ A BLK K.3 N.12 - M016"
  // veya: "106.000 €-1+1-KARAKOCALI-AINA GARDEN B-2-KT.1-M001"
  
  const parts = folderName.split(' - ').filter(p => p.trim());
  let price = null;
  let currency = 'TRY';
  let rooms = null;
  let buildingName = '';
  let location = '';
  let code = '';
  
  // Fiyat ve para birimi
  const priceMatch = folderName.match(/(\d+(?:\.\d+)?)\s*(€|TL|£|\$)/);
  if (priceMatch) {
    price = parseFloat(priceMatch[1].replace('.', '').replace(',', '.'));
    const curr = priceMatch[2];
    if (curr === '€') currency = 'EUR';
    else if (curr === '£') currency = 'GBP';
    else if (curr === '$') currency = 'USD';
    else currency = 'TRY';
  }
  
  // Oda sayısı
  let bathrooms = 1;
  const roomMatch = folderName.match(/(\d+)\+(\d+)/);
  if (roomMatch) {
    rooms = parseInt(roomMatch[1]);
    bathrooms = parseInt(roomMatch[2]) || (rooms >= 3 ? 2 : 1);
  }
  
  // M kodu (M016, M001, vb.)
  const codeMatch = folderName.match(/M\d+/);
  if (codeMatch) {
    code = codeMatch[0];
  }
  
  // Bina/Site ismini bul
  const buildingMatch = folderName.match(/- (.+?) (?:A BLK|B BLK|E BLK|BLOK|KT\.|KAT|K\.)/i);
  if (buildingMatch) {
    buildingName = buildingMatch[1].trim();
  } else {
    // Alternatif format
    const altMatch = folderName.match(/(?:-|^)([A-ZİĞÜŞÇÖ][A-ZİĞÜŞÇÖ\s]+?)(?:\s+(?:A|B|C|E)\s+BLK|BLK|SİTESİ|RESİDENCE|GARDEN|APT)/i);
    if (altMatch) {
      buildingName = altMatch[1].trim();
    }
  }
  
  return { price, currency, rooms, bathrooms, buildingName, location, code };
}

// Klasör içindeki resimleri kategorize et
function categorizeImages(folderPath) {
  const categories = {
    exterior: [], // Dış mekan
    interior: [], // İç mekan
    documents: [] // Belgeler
  };
  
  try {
    const items = fs.readdirSync(folderPath, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(folderPath, item.name);
      
      if (item.isDirectory()) {
        // Alt klasörleri kontrol et
        const dirName = item.name.toUpperCase();
        
        // Dış mekan resimleri
        if (dirName.includes('KOMPLEKS') || dirName.includes('DIŞ') || 
            dirName.includes('PROJE') || dirName.includes('SİTE DIŞ')) {
          const files = fs.readdirSync(fullPath, { recursive: true });
          files.forEach(file => {
            const filePath = path.join(fullPath, file);
            if (fs.statSync(filePath).isFile() && /\.(jpg|jpeg|JPG|JPEG|png|PNG)$/i.test(file)) {
              categories.exterior.push(filePath.replace(/\\/g, '/'));
            }
          });
        } 
        // İç mekan resimleri
        else if (dirName.includes('DAİRE') || dirName.includes('İÇ') || 
                 dirName.includes('ÖRNEK DAİRE') || dirName.includes('GÜNCEL DAİRE')) {
          const files = fs.readdirSync(fullPath, { recursive: true });
          files.forEach(file => {
            const filePath = path.join(fullPath, file);
            if (fs.statSync(filePath).isFile() && /\.(jpg|jpeg|JPG|JPEG|png|PNG)$/i.test(file)) {
              categories.interior.push(filePath.replace(/\\/g, '/'));
            }
          });
        } 
        // Belgeler (İskan, belgeler, kat planları, info)
        else if (dirName.includes('İSKAN') || dirName.includes('BELGE') || 
                 dirName.includes('INFO') || dirName.includes('İNFO') ||
                 dirName.includes('KAT PLAN') || dirName.includes('PLAN')) {
          const files = fs.readdirSync(fullPath, { recursive: true });
          files.forEach(file => {
            const filePath = path.join(fullPath, file);
            if (fs.statSync(filePath).isFile() && /\.(jpg|jpeg|JPG|JPEG|png|PNG|pdf|PDF)$/i.test(file)) {
              categories.documents.push(filePath.replace(/\\/g, '/'));
            }
          });
        }
      } else if (item.isFile()) {
        // Doğrudan klasördeki resimler
        if (/\.(jpg|jpeg|JPG|JPEG|png|PNG)$/i.test(item.name)) {
          // İsimden kategori tahmin et
          if (item.name.includes('dış') || item.name.includes('kompleks') || item.name.includes('exterior')) {
            categories.exterior.push(fullPath.replace(/\\/g, '/'));
          } else if (item.name.includes('isk') || item.name.includes('belge') || item.name.includes('info')) {
            categories.documents.push(fullPath.replace(/\\/g, '/'));
          } else {
            // Varsayılan olarak iç mekan
            categories.interior.push(fullPath.replace(/\\/g, '/'));
          }
        }
      }
    }
  } catch (error) {
    console.error(`Klasör okuma hatası: ${folderPath}`, error);
  }
  
  return categories;
}

// Klasör yapısını tara ve property'leri oluştur
async function scanAndImportProperties() {
  console.log('🔍 İlanlar klasörü taranıyor...');
  
  const districts = fs.readdirSync(ILANLAR_PATH, { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(item => item.name);
  
  console.log(`📁 Bulunan bölgeler: ${districts.join(', ')}`);
  
  const allProperties = [];
  
  for (const district of districts) {
    const districtPath = path.join(ILANLAR_PATH, district);
    const roomTypes = fs.readdirSync(districtPath, { withFileTypes: true })
      .filter(item => item.isDirectory())
      .map(item => item.name);
    
    for (const roomType of roomTypes) {
      const roomTypePath = path.join(districtPath, roomType);
      const apartments = fs.readdirSync(roomTypePath, { withFileTypes: true })
        .filter(item => item.isDirectory())
        .map(item => item.name);
      
      for (const apartment of apartments) {
        const apartmentPath = path.join(roomTypePath, apartment);
        const parsed = parseFolderName(apartment);
        const images = categorizeImages(apartmentPath);
        
        // Public klasörüne göre URL oluştur
        const allImages = [
          ...images.exterior.map(img => '/' + path.relative(path.join(process.cwd(), 'public'), img).replace(/\\/g, '/')),
          ...images.interior.map(img => '/' + path.relative(path.join(process.cwd(), 'public'), img).replace(/\\/g, '/')),
          ...images.documents.map(img => '/' + path.relative(path.join(process.cwd(), 'public'), img).replace(/\\/g, '/'))
        ];
        
        if (allImages.length === 0) {
          console.log(`⚠️ Resim bulunamadı: ${apartment}`);
          continue;
        }
        
        // Bina ismini temizle ve güzelleştir
        let buildingName = parsed.buildingName || '';
        if (!buildingName) {
          // Klasör adından çıkarmaya çalış
          const match = apartment.match(/- ([A-ZİĞÜŞÇÖ][^-]+?)(?:\s+M\d+|$)/);
          if (match) buildingName = match[1].trim();
        }
        
        // Bölge ismini düzenle
        const cleanDistrict = district.replace(/^\d+\)\s*/, '').trim();
        
        // Başlık oluştur
        const title = buildingName 
          ? `${buildingName} - ${roomType} Daire`
          : `${cleanDistrict} - ${roomType} Daire`;
        
        // Açıklama oluştur
        const description = `${buildingName ? buildingName + ' sitesinde' : cleanDistrict + ' bölgesinde'} bulunan ${roomType} daire. ${parsed.code ? 'Referans: ' + parsed.code : ''}`;
        
        // Fiyatı TRY'ye çevir (eğer farklı para birimiyse)
        // Para birimini saklamak için currency alanı kullanılabilir ama şimdilik TRY'ye çeviriyoruz
        let priceTRY = parsed.price;
        if (parsed.currency === 'EUR' && parsed.price) {
          priceTRY = Math.round(parsed.price * 35); // EUR -> TRY
        } else if (parsed.currency === 'GBP' && parsed.price) {
          priceTRY = Math.round(parsed.price * 45); // GBP -> TRY
        } else if (parsed.currency === 'USD' && parsed.price) {
          priceTRY = Math.round(parsed.price * 32); // USD -> TRY
        } else if (!parsed.price) {
          // Fiyat bulunamadıysa varsayılan
          priceTRY = 100000;
        }
        
        // Metrekare tahmini (oda sayısına göre)
        const estimatedArea = parsed.rooms ? (parsed.rooms * 35 + 20) : 60;
        
        const property = {
          title,
          location: `Alanya, ${cleanDistrict}`,
          price: priceTRY,
          area: estimatedArea,
          rooms: parsed.rooms || 1,
          bathrooms: parsed.bathrooms || 1,
          image: allImages[0], // İlk resim ana resim (dış mekan varsa o, yoksa iç mekan)
          images: allImages, // Tüm resimler: dış, iç, belge sırasıyla
          type: "Satılık",
          verified: true,
          propertyType: "Daire",
          buildingType: buildingName ? "Site" : "Apartman",
          description: description || `${buildingName ? buildingName + ' sitesinde' : cleanDistrict + ' bölgesinde'} bulunan modern ${roomType} daire. ${parsed.code ? 'Referans: ' + parsed.code + '. ' : ''}Geniş ve ferah yaşam alanları, modern tasarım.`,
          features: [
            "Otopark",
            "Güvenlik",
            buildingName ? "Site İçi" : "",
            "Kaliteli İnşaat"
          ].filter(f => f),
          coordinates: { lat: 36.5448, lng: 31.9998 }, // Alanya koordinatları (varsayılan)
          listingNumber: parsed.code || '',
          district: cleanDistrict,
          neighborhood: buildingName || cleanDistrict,
          buildingName: buildingName || '',
        };
        
        allProperties.push(property);
        console.log(`✅ İlan hazırlandı: ${title}`);
      }
    }
  }
  
  console.log(`\n📊 Toplam ${allProperties.length} ilan hazırlandı\n`);
  return allProperties;
}

// Property'leri API'ye gönder
async function importProperties(properties) {
  console.log('📤 İlanlar sisteme yükleniyor...\n');
  
  for (let i = 0; i < properties.length; i++) {
    const property = properties[i];
    try {
      const response = await fetch(`${BASE_URL}/api/admin/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(property)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✅ [${i + 1}/${properties.length}] İlan eklendi: ${property.title}`);
      } else {
        const error = await response.json();
        console.log(`❌ [${i + 1}/${properties.length}] İlan eklenemedi: ${property.title} - ${error.error || 'Bilinmeyen hata'}`);
      }
    } catch (error) {
      console.error(`❌ [${i + 1}/${properties.length}] Hata: ${property.title}`, error.message);
    }
    
    // API'yi yormamak için kısa bekleme
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

// Ana fonksiyon
async function main() {
  console.log('🚀 İlan içe aktarma işlemi başlıyor...\n');
  
  try {
    // 1. Örnek ilanları sil
    await deleteExampleProperties();
    console.log('\n');
    
    // 2. Tüm daireleri tara
    const properties = await scanAndImportProperties();
    
    // 3. Property'leri sisteme ekle
    await importProperties(properties);
    
    console.log('\n✅ İşlem tamamlandı!');
  } catch (error) {
    console.error('\n❌ İşlem sırasında hata oluştu:', error);
    process.exit(1);
  }
}

// Script çalıştırılabilir
if (require.main === module) {
  main();
}

module.exports = { main };
