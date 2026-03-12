import { NextRequest, NextResponse } from "next/server";
import { PropertySchema } from "@/lib/validation";
import { logActivity } from "@/lib/activityLog";
import { getSupabaseById, updateInSupabaseCollection, deleteFromSupabaseCollection } from "@/lib/supabase-db";
import { revalidatePath } from "next/cache";

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

export async function GET(
  request: NextRequest,
  { params }: { params: any }
) {
  try {
    if (!checkAdminAuth(request)) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }
    const { id } = await Promise.resolve(params);
    const property = await getSupabaseById(TABLE_NAME, id);

    if (!property) {
      return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(property);
  } catch (error: any) {
    console.error("Property GET error:", error);
    return NextResponse.json(
      { error: "İlan yüklenemedi", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: any }
) {
  try {
    if (!checkAdminAuth(request)) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }
    const { id } = await Promise.resolve(params);
    const body = await request.json();

    console.log("📝 İlan güncelleme (Supabase):", { id, title: body.title });

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
    const updatedProperty: any = {
      ...validationResult.data,
      updated_at: new Date().toISOString()
    };

    // Sayısal alanları güvenli bir şekilde dönüştür
    if (updatedProperty.price !== undefined) updatedProperty.price = Number(updatedProperty.price);
    if (updatedProperty.area !== undefined) updatedProperty.area = Number(updatedProperty.area);

    // Diğer potansiyel sayısal alanlar
    ['monthlyRent', 'deposit', 'netArea', 'rooms', 'bathrooms', 'floor', 'totalFloors', 'buildingAge',
      'balconyCount', 'parkingCount', 'wc_count', 'monthly_fee', 'distanceToSea',
      'investment_score', 'structural_score', 'structural_building_age_impact',
      'structural_facilities_impact', 'structural_gross_area_impact', 'structural_usage_status_impact',
      'demographics_married_rate', 'demographics_youth_rate', 'demographics_higher_ed_rate',
      'demographics_election_percentage'
    ].forEach(key => {
      if (updatedProperty[key] !== undefined && updatedProperty[key] !== null && updatedProperty[key] !== "") {
        updatedProperty[key] = Number(updatedProperty[key]);
      } else if (updatedProperty[key] === "") {
        updatedProperty[key] = null;
      }
    });

    console.log("💾 Supabase'de güncelleniyor...");
    console.log("🔍 [Admin API] Coordinates in payload:", JSON.stringify(updatedProperty.coordinates));

    // Otomatik Çeviri İPTAL EDİLDİ (Kullanıcı İsteği: Google Translate Widget kullanılıyor)
    // Eski kod bloğu kaldırıldı.

    // Undefined değerleri temizle (Supabase hatasını önlemek için)
    Object.keys(updatedProperty).forEach(key => {
      if (updatedProperty[key] === undefined) {
        delete updatedProperty[key];
      }
    });

    console.log("🔍 [Admin API] Final Sanitized Payload keys:", Object.keys(updatedProperty));

    const saved = await updateInSupabaseCollection(TABLE_NAME, id, updatedProperty);

    console.log("✅ [Admin API] Saved property coordinates:", JSON.stringify(saved?.coordinates));

    // Cache'i temizle
    revalidatePath("/api/properties");
    revalidatePath("/");
    revalidatePath("/emlak");
    revalidatePath(`/emlak/${id}`);

    // Activity log
    try {
      await logActivity("update", "property", {
        entityId: id,
        details: { title: saved?.title || updatedProperty.title },
      });
    } catch (logError) {
      console.warn("Activity log error:", logError);
    }

    return NextResponse.json(saved);
  } catch (error: any) {
    console.error("❌ Property PUT error VERY DETAILED:", {
      message: error.message,
      stack: error.stack,
      details: error.details,
      hint: error.hint,
      code: error.code
    });
    return NextResponse.json(
      {
        error: "İlan güncellenemedi",
        message: error.message,
        technicalDetails: {
          code: error.code,
          details: error.details,
          hint: error.hint
        }
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";

export async function DELETE(
  request: NextRequest,
  { params }: { params: any }
) {
  try {
    if (!checkAdminAuth(request)) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }
    const resolvedParams = await Promise.resolve(params);
    const id = resolvedParams.id;

    console.log(`🗑️ DELETE (Supabase):`, { id });

    // Önce ilanın var olup olmadığını kontrol et
    const existing = await getSupabaseById(TABLE_NAME, id);
    if (!existing) {
      return NextResponse.json({ error: "İlan bulunamadı", id }, { status: 404 });
    }

    // Supabase'den sil
    await deleteFromSupabaseCollection(TABLE_NAME, id);

    // Cache'i temizle
    revalidatePath("/api/properties");
    revalidatePath("/");
    revalidatePath("/emlak");
    revalidatePath(`/emlak/${id}`);

    // Activity log
    try {
      await logActivity("delete", "property", {
        entityId: id,
        details: { title: existing.title || 'İsimsiz' },
      });
    } catch (logError) {
      console.warn("⚠️ Activity log hatası (önemsiz):", logError);
    }

    return NextResponse.json({ success: true, message: "İlan başarıyla silindi", id });
  } catch (error: any) {
    console.error("❌ Property DELETE error:", error);
    return NextResponse.json(
      { error: "İlan silinemedi", message: error.message },
      { status: 500 }
    );
  }
}







