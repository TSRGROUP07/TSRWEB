import { NextRequest, NextResponse } from "next/server";
import { getSupabaseById, updateInSupabaseCollection, deleteFromSupabaseCollection } from "@/lib/supabase-db";

const TABLE_NAME = "site_pages";

// GET - Tek sayfa getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const page = await getSupabaseById(TABLE_NAME, id);

    if (!page) {
      return NextResponse.json({ error: "Sayfa bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error: any) {
    console.error("Page GET error:", error);
    return NextResponse.json({ error: "Sayfa yüklenemedi" }, { status: 500 });
  }
}

// PUT - Sayfayı güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const pageData = await request.json();

    // Supabase'da güncelle
    const updated = await updateInSupabaseCollection(TABLE_NAME, id, {
      ...pageData,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, page: updated });
  } catch (error: any) {
    console.error("Sayfa güncellenemedi:", error);
    return NextResponse.json({ error: "Sayfa güncellenemedi" }, { status: 500 });
  }
}

// DELETE - Sayfayı sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Supabase'dan sil
    await deleteFromSupabaseCollection(TABLE_NAME, id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Sayfa silinemedi:", error);
    return NextResponse.json({ error: "Sayfa silinemedi" }, { status: 500 });
  }
}
