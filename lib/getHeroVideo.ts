import { getSupabaseCollection } from "@/lib/supabase-db";

export async function getHeroVideoUrl(): Promise<string | null> {
  try {
    const videos = await getSupabaseCollection("site_videos");
    
    const heroVideo = (videos || []).find((v: any) => {
      const typeMatch = v.type === "hero" || v.type === "Hero" || String(v.type).toLowerCase() === "hero";
      return typeMatch;
    });

    if (heroVideo && heroVideo.url) {
      return heroVideo.url;
    }

    // Fallback: Environment variable
    const envVideoUrl = process.env.HERO_VIDEO_URL;
    if (envVideoUrl) {
      return envVideoUrl;
    }

    // Fallback: GitHub Raw URL (Default)
    return "https://raw.githubusercontent.com/eraybaysl/tsr-web/main/public/videos/ALANYA%20CASTLE%20PROMOTION%20VIDEO%20DRONE%20%23alanya%20%23drone%20%23promotion.mp4";
  } catch (error: any) {
    console.error("Hero video getHeroVideoUrl error:", error);
    // Fallback on error
    return "https://raw.githubusercontent.com/eraybaysl/tsr-web/main/public/videos/ALANYA%20CASTLE%20PROMOTION%20VIDEO%20DRONE%20%23alanya%20%23drone%20%23promotion.mp4";
  }
}
