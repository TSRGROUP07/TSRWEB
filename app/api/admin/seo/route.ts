import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const TABLE_NAME = "site_seo";

// GET - SEO yapılandırmasını getir
export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from(TABLE_NAME)
      .select("content")
      .eq("id", 1)
      .single();

    if (error || !data) {
      // Veri yoksa varsayılan SEO döndür
      const defaultSEO = {
        global: {
          siteName: "TSR GROUP",
          siteDescription: "",
          siteKeywords: "",
          ogImage: "",
          twitterCard: "summary_large_image",
        },
        pages: [],
      };
      return NextResponse.json(defaultSEO);
    }
    return NextResponse.json(data.content);
  } catch (error: any) {
    console.error("SEO GET error:", error);
    return NextResponse.json({ error: "SEO ayarları yüklenemedi" }, { status: 500 });
  }
}

// POST - SEO yapılandırmasını kaydet
export async function POST(request: NextRequest) {
  try {
    const content = await request.json();
    const supabaseAdmin = getSupabaseAdmin();

    // Upsert (ID 1 olan satırı güncelle veya oluştur)
    const { error } = await supabaseAdmin
      .from(TABLE_NAME)
      .upsert({ id: 1, content, updated_at: new Date().toISOString() });

    if (error) throw error;

    return NextResponse.json({ success: true, message: "SEO ayarları başarıyla kaydedildi" });
  } catch (error: any) {
    console.error("SEO ayarları kaydedilemedi:", error);
    return NextResponse.json({ error: "SEO ayarları kaydedilemedi" }, { status: 500 });
  }
}
