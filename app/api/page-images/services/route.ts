import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const IMAGES_FILE = path.join(DATA_DIR, "images.json");

async function getImages() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(IMAGES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    // Önce public/ESKİYENİ klasöründeki dosyaları kontrol et
    const publicDir = path.join(process.cwd(), "public", "ESKİYENİ");
    let houses: any[] = [];
    
    try {
      const files = await fs.readdir(publicDir);
      
      // ESKİ ve YENİ dosyalarını eşleştir (daha esnek - Türkçe karakter desteği)
      const eskiFiles = files.filter(f => {
        const upper = f.toUpperCase();
        return upper.includes("ESK") || upper.includes("BEFORE") || upper.includes("ÖNCE");
      });
      const yeniFiles = files.filter(f => {
        const upper = f.toUpperCase();
        return upper.includes("YEN") || upper.includes("AFTER") || upper.includes("SONRA");
      });
      
      // Dosya isimlerinden ev numaralarını çıkar ve eşleştir
      const evMap = new Map<number, { eski: string; yeni: string }>();
      
      eskiFiles.forEach(file => {
        // Dosya isminden sayıyı çıkar (ESKİ-1EV.png -> 1)
        const numbers = file.match(/\d+/);
        if (numbers) {
          const evNo = parseInt(numbers[0]);
          const filePath = `/ESKİYENİ/${file}`;
          if (!evMap.has(evNo)) {
            evMap.set(evNo, { eski: filePath, yeni: "" });
          } else {
            evMap.get(evNo)!.eski = filePath;
          }
        }
      });
      
      yeniFiles.forEach(file => {
        // Dosya isminden sayıyı çıkar (YENİ-1EV.png -> 1)
        const numbers = file.match(/\d+/);
        if (numbers) {
          const evNo = parseInt(numbers[0]);
          const filePath = `/ESKİYENİ/${file}`;
          if (!evMap.has(evNo)) {
            evMap.set(evNo, { eski: "", yeni: filePath });
          } else {
            evMap.get(evNo)!.yeni = filePath;
          }
        }
      });
      
      // Eşleşen çiftleri houses array'ine ekle
      evMap.forEach((pair, evNo) => {
        if (pair.eski && pair.yeni) {
          houses.push({
            id: evNo,
            beforeImage: pair.eski,
            afterImage: pair.yeni,
            title: `Ev Dönüşümü ${evNo}`
          });
        }
      });
      
      // Ev numarasına göre sırala
      houses.sort((a, b) => a.id - b.id);
    } catch (dirError) {
      console.error("ESKİYENİ klasörü okunamadı:", dirError);
    }
    
    // Eğer klasörden görsel bulunamadıysa, admin panel verilerine bak
    if (houses.length === 0) {
      const images = await getImages();
      // Services bölümü için görselleri filtrele (eski ve yeni)
      const servicesImages = images
        .filter((img: any) => img.category === "services")
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      // Tüm before/after çiftlerini bul
      const beforeImages = servicesImages.filter((img: any) => img.beforeAfter === "before");
      const afterImages = servicesImages.filter((img: any) => img.beforeAfter === "after");
      
      // Tüm ev çiftlerini oluştur - her before için karşılık gelen after'ı bul
      const maxPairs = Math.max(beforeImages.length, afterImages.length);
      
      for (let i = 0; i < maxPairs; i++) {
        const beforeImage = beforeImages[i];
        const afterImage = afterImages[i];
        
        if (beforeImage && afterImage) {
          houses.push({
            id: i + 1,
            beforeImage: beforeImage.url,
            afterImage: afterImage.url,
            title: beforeImage.title || `Ev Dönüşümü ${i + 1}`
          });
        }
      }
    }
    
    // Eski format desteği (geriye dönük uyumluluk)
    if (houses.length > 0) {
      return NextResponse.json({
        image: houses[0].beforeImage,
        beforeImage: houses[0].beforeImage,
        afterImage: houses[0].afterImage,
        hasBeforeAfter: true,
        houses: houses, // Yeni format - birden fazla ev için
      });
    }
    
    return NextResponse.json({
      image: null,
      beforeImage: null,
      afterImage: null,
      hasBeforeAfter: false,
      houses: [],
    });
  } catch (error) {
    console.error("API hatası:", error);
    return NextResponse.json(
      { error: "Görsel yüklenemedi", details: error instanceof Error ? error.message : "Bilinmeyen hata" },
      { status: 500 }
    );
  }
}






