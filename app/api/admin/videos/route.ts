import { NextRequest, NextResponse } from "next/server";
import { getSupabaseCollection, addToSupabaseCollection, updateInSupabaseCollection } from "@/lib/supabase-db";

const TABLE_NAME = "site_videos";

export async function GET() {
  try {
    const videos = await getSupabaseCollection(TABLE_NAME);
    return NextResponse.json(videos || []);
  } catch (error: any) {
    console.error("Videos GET error:", error);
    return NextResponse.json(
      { error: "Videolar yüklenemedi", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type = "hero", url, title, description } = body;

    console.log(`🔍 [Admin Videos POST] Gelen veri:`, { type, url, title, description });

    if (!url) {
      return NextResponse.json({ error: "Video URL gereklidir" }, { status: 400 });
    }

    // Check if hero video already exists
    const existingVideos = await getSupabaseCollection(TABLE_NAME);
    console.log(`🔍 [Admin Videos POST] Mevcut videolar:`, existingVideos);
    
    const heroVideo = (existingVideos || []).find((v: any) => v.type === type);
    console.log(`🔍 [Admin Videos POST] Bulunan hero video:`, heroVideo);

    if (heroVideo) {
      // Update existing
      console.log(`🔄 [Admin Videos POST] Video güncelleniyor (ID: ${heroVideo.id})`);
      await updateInSupabaseCollection(TABLE_NAME, heroVideo.id, {
        url,
        title,
        description,
        updatedAt: new Date().toISOString(),
      });
      console.log(`✅ [Admin Videos POST] Video güncellendi`);
      return NextResponse.json({ success: true, message: "Video güncellendi" });
    } else {
      // Create new
      console.log(`➕ [Admin Videos POST] Yeni video oluşturuluyor`);
      const newVideo = {
        type,
        url,
        title,
        description,
        createdAt: new Date().toISOString(),
      };
      await addToSupabaseCollection(TABLE_NAME, newVideo);
      console.log(`✅ [Admin Videos POST] Video eklendi`);
      return NextResponse.json({ success: true, message: "Video eklendi" }, { status: 201 });
    }
  } catch (error: any) {
    console.error("Video POST error:", error);
    return NextResponse.json(
      { error: "Video kaydedilemedi", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "hero";

    const videos = await getSupabaseCollection(TABLE_NAME);
    const heroVideo = (videos || []).find((v: any) => v.type === type);

    if (!heroVideo) {
      return NextResponse.json({ error: "Video bulunamadı" }, { status: 404 });
    }

    // Use admin helper to delete (bypasses RLS)
    const { deleteFromSupabaseCollection } = await import("@/lib/supabase-db");
    await deleteFromSupabaseCollection(TABLE_NAME, heroVideo.id);

    return NextResponse.json({ success: true, message: "Video silindi" });
  } catch (error: any) {
    console.error("Video DELETE error:", error);
    return NextResponse.json(
      { error: "Video silinemedi", details: error.message },
      { status: 500 }
    );
  }
}


















