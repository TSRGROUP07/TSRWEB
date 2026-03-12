import { NextResponse } from "next/server";
import { getSupabaseCollection } from "@/lib/supabase-db";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const images = await getSupabaseCollection("site_images");

    // Stats bölümü için görselleri filtrele
    const statsImages = (images || []).filter((img: any) => img.category === "stats");

    // 6 görsel için varsayılan yapı
    const defaultStats = [
      { key: "projects", value: "85+", label: "yönetilen projeler" },
      { key: "realEstate", value: "25+", label: "milyon $ değerinde emlak" },
      { key: "experience", value: "16", label: "yıl deneyimi" },
      { key: "itPlatform", value: "", label: "kendi IT platformu" },
      { key: "support", value: "", label: "24/7 kiracı desteği" },
      { key: "occupancy", value: ">90%", label: "ortalama doluluk" },
    ];

    // Her stat için görseli bul
    const stats = defaultStats.map((stat) => {
      // meta içindeki statKey'e veya başlığa bakabiliriz
      const image = statsImages.find((img: any) =>
        (img.meta && img.meta.statKey === stat.key) ||
        img.title === stat.key
      );
      return {
        ...stat,
        image: image?.url || null,
      };
    });

    return NextResponse.json(stats);
  } catch (error: any) {
    console.error("Stats images GET error:", error);
    return NextResponse.json(
      { error: "Görseller yüklenemedi" },
      { status: 500 }
    );
  }
}










