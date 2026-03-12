import { NextRequest, NextResponse } from "next/server";
import { updateInSupabaseCollection, deleteFromSupabaseCollection } from "@/lib/supabase-db";

const COLLECTION_NAME = "messages";

// PUT - Mesajı güncelle (okundu işaretle)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);
    const body = await request.json();

    // Mesajı güncelle
    await updateInSupabaseCollection(COLLECTION_NAME, id, body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mesaj güncellenemedi:", error);
    return NextResponse.json({ error: "Mesaj güncellenemedi" }, { status: 500 });
  }
}

// DELETE - Mesajı sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);

    // Mesajı sil
    await deleteFromSupabaseCollection(COLLECTION_NAME, id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mesaj silinemedi:", error);
    return NextResponse.json({ error: "Mesaj silinemedi" }, { status: 500 });
  }
}
