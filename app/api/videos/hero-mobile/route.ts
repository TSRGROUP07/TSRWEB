import { NextResponse } from "next/server";
import { getSupabaseCollection } from "@/lib/supabase-db";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const videos = await getSupabaseCollection("site_videos");
    const heroMobileVideo = (videos || []).find((v: any) => v.type === "hero-mobile");

    if (heroMobileVideo && heroMobileVideo.url) {
      return NextResponse.json({ url: heroMobileVideo.url });
    }

    // Fallback: Normal hero video
    const heroVideo = (videos || []).find((v: any) => v.type === "hero");
    if (heroVideo && heroVideo.url) {
      return NextResponse.json({ url: heroVideo.url });
    }

    return NextResponse.json({ url: null });
  } catch (error: any) {
    console.error("Hero mobile video GET error:", error);
    return NextResponse.json({ url: null });
  }
}
