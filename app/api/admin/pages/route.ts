import { NextRequest, NextResponse } from "next/server";
import { getSupabaseCollection, addToSupabaseCollection } from "@/lib/supabase-db";

const TABLE_NAME = "site_pages";

// GET - Tüm sayfaları getir
export async function GET() {
  try {
    const pages = await getSupabaseCollection(TABLE_NAME);
    return NextResponse.json(pages || []);
  } catch (error: any) {
    console.error("Pages GET error:", error);
    return NextResponse.json({ error: "Sayfalar yüklenemedi" }, { status: 500 });
  }
}

// POST - Yeni sayfa ekle
export async function POST(request: NextRequest) {
  try {
    const page = await request.json();

    // Yeni sayfa datası
    const newPage = {
      ...page,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Supabase'a kaydet
    const saved = await addToSupabaseCollection(TABLE_NAME, newPage);

    return NextResponse.json({ success: true, page: saved });
  } catch (error: any) {
    console.error("Sayfa kaydedilemedi:", error);
    return NextResponse.json({ error: "Sayfa kaydedilemedi" }, { status: 500 });
  }
}
