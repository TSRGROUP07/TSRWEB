import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getSupabaseCollection, addToSupabaseCollection, deleteFromSupabaseCollection } from "@/lib/supabase-db";
import { PropertySchema } from "@/lib/validation";

const COLLECTION_NAME = "properties";
const ILANLAR_PATH = path.join(process.cwd(), "public", "ilanlar", "1-) TSR GROUP GAYRİMENKULLER", "1-) DAİRELER");

// Dosya isimlerinden bilgi çıkar
function parseFolderName(folderName: string) {
  let price: number | null = null;
  let currency = "TRY";
  let rooms: number | null = null;
  let bathrooms = 1;
  let buildingName = "";
  let code = "";

  // Fiyat ve para birimi
  const priceMatch = folderName.match(/(\d+(?:\.\d+)?)\s*(€|TL|£|\$)/);
  if (priceMatch) {
    price = parseFloat(priceMatch[1].replace(/\./g, "").replace(/,/g, "."));
    const curr = priceMatch[2];
    if (curr === "€") currency = "EUR";
    else if (curr === "£") currency = "GBP";
    else if (curr === "$") currency = "USD";
    else currency = "TRY";
  }

  // Oda sayısı
  const roomMatch = folderName.match(/(\d+)\+(\d+)/);
  if (roomMatch) {
    rooms = parseInt(roomMatch[1]);
    bathrooms = parseInt(roomMatch[2]) || (rooms >= 3 ? 2 : 1);
  }

  // M kodu
  const codeMatch = folderName.match(/M\d+/);
  if (codeMatch) {
    code = codeMatch[0];
  }

  // Bina/Site ismini bul
  const buildingMatch = folderName.match(/- (.+?) (?:A BLK|B BLK|E BLK|BLOK|KT\.|KAT|K\.)/i);
  if (buildingMatch) {
    buildingName = buildingMatch[1].trim();
  } else {
    const altMatch = folderName.match(
      /(?:-|^)([A-ZİĞÜŞÇÖ][A-ZİĞÜŞÇÖ\s]+?)(?:\s+(?:A|B|C|E)\s+BLK|BLK|SİTESİ|RESİDENCE|GARDEN|APT)/i
    );
    if (altMatch) {
      buildingName = altMatch[1].trim();
    }
  }

  return { price, currency, rooms, bathrooms, buildingName, code };
}

// Resimleri kategorize et
async function categorizeImages(folderPath: string) {
  const categories = {
    exterior: [] as string[],
    interior: [] as string[],
    documents: [] as string[],
  };

  try {
    const items = await fs.readdir(folderPath, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(folderPath, item.name);

      if (item.isDirectory()) {
        const dirName = item.name.toUpperCase();

        // Dış mekan
        if (
          dirName.includes("KOMPLEKS") ||
          dirName.includes("DIŞ") ||
          dirName.includes("PROJE") ||
          dirName.includes("SİTE DIŞ")
        ) {
          const files = await getAllFilesRecursive(fullPath);
          files
            .filter((file) => /\.(jpg|jpeg|JPG|JPEG|png|PNG)$/i.test(file))
            .forEach((file) => {
              const relPath = "/" + path.relative(path.join(process.cwd(), "public"), file).replace(/\\/g, "/");
              categories.exterior.push(relPath);
            });
        }
        // İç mekan
        else if (
          dirName.includes("DAİRE") ||
          dirName.includes("İÇ") ||
          dirName.includes("ÖRNEK DAİRE") ||
          dirName.includes("GÜNCEL DAİRE")
        ) {
          const files = await getAllFilesRecursive(fullPath);
          files
            .filter((file) => /\.(jpg|jpeg|JPG|JPEG|png|PNG)$/i.test(file))
            .forEach((file) => {
              const relPath = "/" + path.relative(path.join(process.cwd(), "public"), file).replace(/\\/g, "/");
              categories.interior.push(relPath);
            });
        }
        // Belgeler
        else if (
          dirName.includes("İSKAN") ||
          dirName.includes("BELGE") ||
          dirName.includes("INFO") ||
          dirName.includes("İNFO") ||
          dirName.includes("KAT PLAN") ||
          dirName.includes("PLAN")
        ) {
          const files = await getAllFilesRecursive(fullPath);
          files
            .filter((file) => /\.(jpg|jpeg|JPG|JPEG|png|PNG|pdf|PDF)$/i.test(file))
            .forEach((file) => {
              const relPath = "/" + path.relative(path.join(process.cwd(), "public"), file).replace(/\\/g, "/");
              categories.documents.push(relPath);
            });
        }
      } else if (item.isFile()) {
        if (/\.(jpg|jpeg|JPG|JPEG|png|PNG)$/i.test(item.name)) {
          const fileName = item.name.toUpperCase();
          const relPath = "/" + path.relative(path.join(process.cwd(), "public"), fullPath).replace(/\\/g, "/");
          if (fileName.includes("DIŞ") || fileName.includes("KOMPLEKS") || fileName.includes("EXTERIOR")) {
            categories.exterior.push(relPath);
          } else if (fileName.includes("İSK") || fileName.includes("BELGE") || fileName.includes("INFO")) {
            categories.documents.push(relPath);
          } else {
            categories.interior.push(relPath);
          }
        }
      }
    }
  } catch (error) {
    console.error(`Klasör okuma hatası: ${folderPath}`, error);
  }

  return categories;
}

// Özyinelemeli dosya listeleme
async function getAllFilesRecursive(dirPath: string): Promise<string[]> {
  const files: string[] = [];
  try {
    const items = await fs.readdir(dirPath, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dirPath, item.name);
      if (item.isDirectory()) {
        const subFiles = await getAllFilesRecursive(fullPath);
        files.push(...subFiles);
      } else {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Recursive read error: ${dirPath}`, error);
  }
  return files;
}

export async function POST(request: NextRequest) {
  try {
    const results = {
      deleted: [] as string[],
      imported: [] as string[],
      errors: [] as string[],
    };

    // 0. Klasör yolunu kontrol et
    console.log("📂 Klasör yolu kontrol ediliyor:", ILANLAR_PATH);
    try {
      await fs.access(ILANLAR_PATH);
      console.log("✅ Klasör bulundu");
    } catch (error: any) {
      const errorMsg = `Klasör bulunamadı: ${ILANLAR_PATH} - ${error.message}`;
      console.error("❌", errorMsg);
      results.errors.push(errorMsg);
      return NextResponse.json({
        success: false,
        error: errorMsg,
        results,
      }, { status: 404 });
    }

    // 0.5. Service Account kontrolü
    const serviceAccountPath = path.join(process.cwd(), "service-account.json");
    try {
      await fs.access(serviceAccountPath);
      console.log("✅ Service Account dosyası bulundu");
    } catch (error: any) {
      console.warn("⚠️ Service Account dosyası bulunamadı! Firestore işlemleri başarısız olabilir.");
      console.warn("   Service account dosyası: service-account.json");
      console.warn("   Veya FIREBASE_SERVICE_ACCOUNT_KEY environment değişkenini kullanın");
    }

    // 1. Mevcut örnek ilanları sil (eğer varsa)
    console.log("📋 Mevcut örnek ilanlar kontrol ediliyor...");
    try {
      // Supabase bağlantısını test et
      const existingProperties = await getSupabaseCollection(COLLECTION_NAME);
      console.log(`📊 Mevcut ilan sayısı: ${existingProperties.length}`);

      if (existingProperties.length > 0) {
        const exampleProperties = existingProperties.slice(0, 3);
        console.log(`🗑️ Silinecek örnek ilanlar: ${exampleProperties.length}`);

        for (const prop of exampleProperties) {
          try {
            await deleteFromSupabaseCollection(COLLECTION_NAME, prop.id);
            results.deleted.push(prop.id);
            console.log(`✅ İlan silindi: ${prop.id} (${prop.title || 'İsimsiz'})`);
          } catch (error: any) {
            const errorMsg = `Silme hatası ${prop.id}: ${error.code || ''} ${error.message || 'Bilinmeyen hata'}`;
            console.error("❌", errorMsg);
            results.errors.push(errorMsg);
          }
        }
      } else {
        console.log("ℹ️ Silinecek örnek ilan yok");
      }
    } catch (error: any) {
      const errorMsg = `Supabase bağlantı hatası: ${error.code || ''} ${error.message || 'Bilinmeyen hata'}`;
      console.error("❌", errorMsg);
      results.errors.push(errorMsg);
      // Supabase bağlantı sorunu varsa devam etmeyelim
      return NextResponse.json({
        success: false,
        error: "Supabase bağlantı hatası",
        details: errorMsg,
        results,
      }, { status: 500 });
    }

    // 2. Tüm daireleri tara
    console.log("🔍 İlanlar klasörü taranıyor...");
    let districts: string[] = [];
    try {
      const items = await fs.readdir(ILANLAR_PATH, { withFileTypes: true });
      districts = items
        .filter((item) => item.isDirectory())
        .map((item) => item.name);
      console.log(`📁 Bulunan bölgeler (${districts.length}):`, districts);
    } catch (error: any) {
      const errorMsg = `Klasör okuma hatası: ${error.message}`;
      console.error("❌", errorMsg);
      results.errors.push(errorMsg);
      return NextResponse.json({
        success: false,
        error: errorMsg,
        results,
      }, { status: 500 });
    }

    const allProperties: any[] = [];

    for (const district of districts) {
      try {
        const districtPath = path.join(ILANLAR_PATH, district);
        console.log(`📂 Bölge taranıyor: ${district}`);

        const roomTypeItems = await fs.readdir(districtPath, { withFileTypes: true });
        const roomTypes = roomTypeItems
          .filter((item) => item.isDirectory())
          .map((item) => item.name);

        console.log(`  📁 Oda tipleri (${roomTypes.length}):`, roomTypes);

        for (const roomType of roomTypes) {
          try {
            const roomTypePath = path.join(districtPath, roomType);
            const apartmentItems = await fs.readdir(roomTypePath, { withFileTypes: true });
            const apartments = apartmentItems
              .filter((item) => item.isDirectory())
              .map((item) => item.name);

            console.log(`    📦 Daireler (${apartments.length}):`, apartments.slice(0, 3), apartments.length > 3 ? '...' : '');

            for (const apartment of apartments) {
              try {
                const apartmentPath = path.join(roomTypePath, apartment);
                console.log(`      🏠 İşleniyor: ${apartment}`);

                const parsed = parseFolderName(apartment);
                const images = await categorizeImages(apartmentPath);

                // Tüm resimleri birleştir (dış mekan, iç mekan, belgeler sırasıyla)
                const allImages = [
                  ...images.exterior,
                  ...images.interior,
                  ...images.documents,
                ].map(img => {
                  // Path'i normalize et - public klasöründen başlamalı
                  if (img.startsWith('/')) {
                    return img; // Zaten doğru format
                  }
                  return `/${img}`;
                }).filter(img => img.startsWith('/ilanlar')); // Sadece ilanlar klasöründeki resimleri al

                console.log(`        🖼️ Resimler: Dış=${images.exterior.length}, İç=${images.interior.length}, Belge=${images.documents.length}, Toplam=${allImages.length}`);

                if (allImages.length === 0) {
                  const warnMsg = `⚠️ Resim bulunamadı: ${apartment}`;
                  console.log(warnMsg);
                  results.errors.push(warnMsg);
                  continue;
                }

                let buildingName = parsed.buildingName || "";
                if (!buildingName) {
                  const match = apartment.match(/- ([A-ZİĞÜŞÇÖ][^-]+?)(?:\s+M\d+|$)/);
                  if (match) buildingName = match[1].trim();
                }

                const cleanDistrict = district.replace(/^\d+\)\s*/, "").trim();
                const title = buildingName
                  ? `${buildingName} - ${roomType} Daire`
                  : `${cleanDistrict} - ${roomType} Daire`;

                const description = `${buildingName ? buildingName + " sitesinde" : cleanDistrict + " bölgesinde"} bulunan ${roomType} daire. ${parsed.code ? "Referans: " + parsed.code + ". " : ""}Geniş ve ferah yaşam alanları, modern tasarım.`;

                let priceTRY = parsed.price || 0;
                if (parsed.currency === "EUR" && parsed.price) {
                  priceTRY = Math.round(parsed.price * 35);
                } else if (parsed.currency === "GBP" && parsed.price) {
                  priceTRY = Math.round(parsed.price * 45);
                } else if (parsed.currency === "USD" && parsed.price) {
                  priceTRY = Math.round(parsed.price * 32);
                }

                const estimatedArea = parsed.rooms ? parsed.rooms * 35 + 20 : 60;

                // Ana görsel (ilk dış mekan resmi varsa onu, yoksa ilk iç mekan resmi)
                // ⚠️ ÖNEMLİ: Görseller YEREL DOSYALARDAN kullanılıyor, Firebase Storage'a YÜKLENMİYOR!
                const mainImage = images.exterior.length > 0
                  ? images.exterior[0].startsWith('/') ? images.exterior[0] : `/${images.exterior[0]}`
                  : allImages[0];

                // ✅ YEREL PATH KULLAN - Firebase Storage'a YÜKLEME YOK!
                // Tüm görseller public/ilanlar/ klasöründeki yerel dosyalardan okunuyor
                // Sadece path'ler Firestore'a kaydediliyor, görsellerin kendisi değil
                const property = {
                  title,
                  location: `Alanya, ${cleanDistrict}`,
                  price: priceTRY || 100000,
                  area: estimatedArea,
                  rooms: parsed.rooms || 1,
                  bathrooms: parsed.bathrooms || 1,
                  image: mainImage, // ✅ Yerel path: /ilanlar/1-) TSR GROUP GAYRİMENKULLER/...
                  images: allImages, // ✅ Tüm yerel path'ler (Firebase Storage değil!)
                  type: "Satılık",
                  verified: true,
                  propertyType: "Daire",
                  buildingType: buildingName ? "Site" : "Apartman",
                  description: description || `${buildingName || cleanDistrict} bölgesinde bulunan ${roomType} daire.`,
                  features: ["Otopark", "Güvenlik", buildingName ? "Site İçi" : "", "Kaliteli İnşaat"].filter((f) => f),
                  coordinates: { lat: 36.5448, lng: 31.9998 },
                  listingNumber: parsed.code || "",
                  district: cleanDistrict,
                  neighborhood: buildingName || cleanDistrict,
                  buildingName: buildingName || "",
                };

                allProperties.push(property);
                console.log(`        ✅ İlan hazırlandı: ${title}`);
              } catch (error: any) {
                const errorMsg = `Daire işleme hatası (${apartment}): ${error.message}`;
                console.error(`        ❌`, errorMsg);
                results.errors.push(errorMsg);
              }
            }
          } catch (error: any) {
            const errorMsg = `Oda tipi okuma hatası (${roomType}): ${error.message}`;
            console.error(`    ❌`, errorMsg);
            results.errors.push(errorMsg);
          }
        }
      } catch (error: any) {
        const errorMsg = `Bölge okuma hatası (${district}): ${error.message}`;
        console.error(`  ❌`, errorMsg);
        results.errors.push(errorMsg);
      }
    }

    console.log(`\n📊 Toplam ${allProperties.length} ilan hazırlandı\n`);

    // 3. Property'leri sisteme ekle
    console.log(`\n📤 ${allProperties.length} ilan sisteme yükleniyor...\n`);
    for (let i = 0; i < allProperties.length; i++) {
      const property = allProperties[i];
      try {
        // Validation yap
        const validationResult = PropertySchema.safeParse(property);
        if (!validationResult.success) {
          const errorMsg = `${property.title}: Validation hatası - ${validationResult.error.errors.map(e => e.message).join(', ')}`;
          results.errors.push(errorMsg);
          console.error(`❌ [${i + 1}/${allProperties.length}] Validation hatası: ${property.title}`, validationResult.error.errors);
          continue;
        }

        // Supabase'e ekle
        const newProperty = {
          ...validationResult.data,
          verified: true,
        };

        const savedProperty = await addToSupabaseCollection(COLLECTION_NAME, newProperty);
        results.imported.push(property.title);
        console.log(`✅ [${i + 1}/${allProperties.length}] İlan eklendi: ${property.title} (ID: ${savedProperty.id})`);
      } catch (error: any) {
        // Supabase hatalarını daha detaylı logla
        let errorMsg = `${property.title}: `;
        if (error.message) {
          errorMsg += error.message;
        } else {
          errorMsg += JSON.stringify(error);
        }
        results.errors.push(errorMsg);
        console.error(`❌ [${i + 1}/${allProperties.length}] İlan eklenemedi: ${property.title}`);
        console.error(`   Hata detayı:`, {
          code: error.code,
          message: error.message,
          stack: error.stack?.substring(0, 200),
          property: {
            title: property.title,
            price: property.price,
            area: property.area,
            rooms: property.rooms,
          }
        });
      }
    }

    const successMsg = `${results.imported.length} ilan başarıyla eklendi, ${results.deleted.length} örnek ilan silindi`;
    console.log(`\n✅ ${successMsg}\n`);

    return NextResponse.json({
      success: results.imported.length > 0 || results.deleted.length > 0,
      message: successMsg,
      results,
    });
  } catch (error: any) {
    const errorMsg = `İçe aktarma hatası: ${error.message}`;
    console.error("❌", errorMsg, error);
    return NextResponse.json(
      {
        success: false,
        error: "İçe aktarma başarısız",
        details: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
