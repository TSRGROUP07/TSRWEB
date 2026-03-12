import { NextRequest, NextResponse } from "next/server";
import { PropertySchema } from "@/lib/validation";
import { logActivity } from "@/lib/activityLog";
import { getSupabaseCollection, addToSupabaseCollection } from "@/lib/supabase-db";


export const dynamic = "force-dynamic";

// Supabase tablo adı
const TABLE_NAME = "properties";

// Admin authentication kontrolü
function checkAdminAuth(request: NextRequest): boolean {
  if (process.env.NODE_ENV === "development") return true;
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) return true;
  const cookies = request.headers.get("cookie");
  if (cookies && cookies.includes("admin_token=")) return true;
  return false;
}

export async function GET(request: NextRequest) {
  try {
    if (!checkAdminAuth(request)) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }
    console.log(`📋 Supabase'dan ilanlar yükleniyor...`);
    const properties = await getSupabaseCollection(TABLE_NAME);
    console.log(`✅ ${properties.length} ilan yüklendi`);

    return NextResponse.json(properties, {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
  } catch (error: any) {
    console.error("❌ Properties GET error:", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!checkAdminAuth(request)) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }
    const body = await request.json();

    console.log("📝 İlan ekleme isteği (Supabase):", {
      title: body.title,
      location: body.location
    });

    // Validate input
    const validationResult = PropertySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Geçersiz veri",
          details: validationResult.error.errors,
          message: validationResult.error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')
        },
        { status: 400 }
      );
    }

    // Verileri hazırla
    const newProperty = {
      ...validationResult.data,
      // Supabase'e uygun hale getir (Sayısal alanlar)
      price: parseFloat(validationResult.data.price as any),
      area: parseFloat(validationResult.data.area as any),
      // Diğer alanlar db helpers tarafından otomatik olarak snake_case'e çevrilecek
    };

    // Verify unique slug
    // ...

    // Otomatik Çeviri İPTAL EDİLDİ (Kullanıcı İsteği)
    // Eski kod bloğu kaldırıldı.

    console.log("💾 Supabase'e kaydediliyor...");
    const savedProperty = await addToSupabaseCollection(TABLE_NAME, newProperty);

    // Activity log
    try {
      await logActivity("create", "property", {
        entityId: savedProperty.id,
        details: { title: savedProperty.title },
      });
    } catch (logError) {
      console.warn("Activity log error:", logError);
    }

    return NextResponse.json(savedProperty, { status: 201 });
  } catch (error: any) {
    console.error("❌ Property creation error:", error);
    return NextResponse.json(
      { error: "İlan eklenemedi", message: error.message },
      { status: 500 }
    );
  }
}




