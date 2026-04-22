import { NextResponse } from "next/server";
import { getSupabaseCollection } from "@/lib/supabase-db";

export const dynamic = 'force-dynamic';
export const revalidate = 300; // 5 dakika cache - video URL değişmez sık sık

export async function GET() {
  try {
    // Supabase'dan hero tipindeki videoyu bul
    const videos = await getSupabaseCollection("site_videos");
    
    // Debug: Log all videos
    console.log(`🔍 [Hero Video API] Tüm videolar:`, videos);
    console.log(`🔍 [Hero Video API] Video sayısı:`, videos?.length || 0);
    
    // Debug: Log all video types
    console.log(`🔍 [Hero Video API] Video tipleri:`, (videos || []).map((v: any) => ({ id: v.id, type: v.type, typeValue: v.type, typeType: typeof v.type })));
    
    const heroVideo = (videos || []).find((v: any) => {
      const typeMatch = v.type === "hero" || v.type === "Hero" || String(v.type).toLowerCase() === "hero";
      console.log(`🔍 [Hero Video API] Video ${v.id} type kontrolü:`, { type: v.type, typeMatch });
      return typeMatch;
    });
    
    // Debug: Log hero video
    console.log(`🔍 [Hero Video API] Hero video bulundu:`, heroVideo);

    if (heroVideo && heroVideo.url) {
      console.log(`✅ [Hero Video API] Hero video URL döndürülüyor:`, heroVideo.url);
      return NextResponse.json(
        { url: heroVideo.url },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
            'CDN-Cache-Control': 'public, s-maxage=300'
          }
        }
      );
    }
    
    console.log(`⚠️ [Hero Video API] Hero video bulunamadı, fallback kullanılıyor`);

    // Fallback: Environment variable (opsiyonel)
    const envVideoUrl = process.env.HERO_VIDEO_URL;
    if (envVideoUrl) {
      return NextResponse.json({ url: envVideoUrl });
    }

    // Fallback: Default Local URL
    const defaultVideoUrl = "/videos/default-hero.mp4";
    return NextResponse.json({ url: defaultVideoUrl });
  } catch (error: any) {
    console.error("Hero video GET error:", error);
    // Fallback on error as well
    const defaultVideoUrl = "/videos/default-hero.mp4";
    return NextResponse.json({ url: defaultVideoUrl });
  }
}


















