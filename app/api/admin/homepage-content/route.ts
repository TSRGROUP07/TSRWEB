import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const TABLE_NAME = "homepage_content";

// GET - Ana sayfa içeriğini getir
export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from(TABLE_NAME)
      .select("content")
      .eq("id", 1)
      .single();

    if (error || !data) {
      // Veri yoksa varsayılan içerik döndür
      const defaultContent = {
        hero: {
          videoUrl: "/TSR.mp4",
          title: "Mülkünüz İçin Doğru Strateji",
          subtitle1: "Güvenli Yönetim",
          subtitle2: "Sürdürülebilir Getiri",
          searchPlaceholder: "iletişim bilgilerinizi bırakın",
        },
        about: {
          title: "Şirket Hakkında",
          paragraphs: [
            "TSR GROUP sadece gayrimenkul satmaz.",
            "Biz yenilikçi ekosistemler oluşturuyoruz.",
            "Yönetiyoruz, analiz ediyoruz, tahmin ediyoruz.",
            "Ve müşterilere hiç kimsenin vermediğini veriyoruz.",
          ],
          imageUrl: "/ŞH.png",
        },
        team: {
          title: "Ekibimiz",
          subtitle: "Deneyimli ve profesyonel ekibimizle sizlere en iyi hizmeti sunuyoruz",
          members: [],
        },
        services: {
          title: "",
          description: "",
          imageUrl: "",
        },
        stats: {
          title: "Neden TSR GROUP'u seçmelisiniz?",
          subtitle: "Sektördeki deneyimimiz ve başarılarımızla fark yaratıyoruz",
          items: [],
        },
        features: {
          title: "",
          items: [],
        },
        newsletter: {
          title: "Haber Bültenine Abone Olun",
          description: "En yeni emlak fırsatları ve haberlerinden haberdar olun",
          buttonText: "Abone Ol",
          placeholder: "E-posta adresiniz",
        },
        banner: {
          enabled: true,
          title: "",
          description: "",
          buttonText: "",
          buttonLink: "",
        },
      };
      return NextResponse.json(defaultContent);
    }
    return NextResponse.json(data.content);
  } catch (error: any) {
    console.error("Homepage content GET error:", error);
    return NextResponse.json({ error: "İçerik yüklenemedi" }, { status: 500 });
  }
}

// POST - Ana sayfa içeriğini kaydet
export async function POST(request: NextRequest) {
  try {
    const content = await request.json();
    const supabaseAdmin = getSupabaseAdmin();

    // Upsert (ID 1 olan satırı güncelle veya oluştur)
    const { error } = await supabaseAdmin
      .from(TABLE_NAME)
      .upsert({ id: 1, content, updated_at: new Date().toISOString() });

    if (error) throw error;

    return NextResponse.json({ success: true, message: "İçerik başarıyla kaydedildi" });
  } catch (error: any) {
    console.error("İçerik kaydedilemedi:", error);
    return NextResponse.json({ error: "İçerik kaydedilemedi" }, { status: 500 });
  }
}
