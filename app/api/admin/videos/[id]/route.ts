import { NextRequest, NextResponse } from "next/server";
import { getSupabaseById, deleteFromSupabaseCollection } from "@/lib/supabase-db";

const TABLE_NAME = "site_videos";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);

    // Video'yu bul
    const video = await getSupabaseById(TABLE_NAME, id);
    if (!video) {
      return NextResponse.json(
        { error: "Video bulunamadı" },
        { status: 404 }
      );
    }

    // Supabase'dan sil
    await deleteFromSupabaseCollection(TABLE_NAME, id);

    console.log("✅ Video başarıyla silindi:", id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Video DELETE error:", error);
    return NextResponse.json(
      { error: "Video silinemedi", details: error.message },
      { status: 500 }
    );
  }
}


















