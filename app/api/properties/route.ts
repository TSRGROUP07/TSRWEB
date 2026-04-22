import { NextRequest, NextResponse } from "next/server";
import { getSupabaseCollection } from "@/lib/supabase-db";

export const revalidate = 3600; // Cache for 1 hour
export const runtime = 'nodejs'; // Use Node.js runtime

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
  const type = searchParams.get('type');

  try {
    console.log("🔍 [API Properties] İlanlar çekiliyor...", { limit, type });

    // Supabase'dan ilanları çek
    const properties = await getSupabaseCollection("properties", {
      limit,
      filters: type ? [{ column: 'type', operator: 'eq', value: type }] : undefined
    });

    console.log(`✅ [API Properties] ${properties?.length || 0} ilan bulundu.`);
    console.log(`📊 [API Properties] Properties type:`, Array.isArray(properties) ? 'Array' : typeof properties);

    if (properties && properties.length > 0) {
      console.log("📄 [API Properties] İlan Listesi (İlk 5):", properties.slice(0, 5).map((p: any) => `${p.id}: ${p.title || 'Başlık Yok'}`).join(", "));
      console.log("📄 [API Properties] İlk ilan örneği:", {
        id: properties[0].id,
        title: properties[0].title,
        location: properties[0].location,
        price: properties[0].price,
        hasImage: !!properties[0].image || !!(properties[0].images && properties[0].images.length > 0)
      });
    } else {
      console.log("⚠️ [API Properties] Veritabanında ilan bulunamadı veya boş dizi döndü.");
      console.log("⚠️ [API Properties] Properties değeri:", properties);
    }

    if (!properties || properties.length === 0) {
      console.log("ℹ️ [API Properties] Boş dizi döndürülüyor.");
      return NextResponse.json([], {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          'CDN-Cache-Control': 'public, s-maxage=300',
        }
      });
    }

    // Her ilan için image alanını kontrol et ve düzelt
    const propertiesWithImages = properties.map((property: any) => {
      // Eğer image yoksa ama images dizisi varsa, ilk resmi image olarak kullan
      if (!property.image && property.images && property.images.length > 0) {
        property.image = property.images[0];
        console.log(`🖼️ İlan ${property.id} için image alanı images dizisinden eklendi`);
      }
      return property;
    });

    return NextResponse.json(propertiesWithImages, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        'CDN-Cache-Control': 'public, s-maxage=3600',
      }
    });
  } catch (error: any) {
    console.error("Properties GET error:", error);
    return NextResponse.json([], { 
      status: 500,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
      }
    });
  }
}
