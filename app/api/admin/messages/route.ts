import { NextRequest, NextResponse } from "next/server";
import { getSupabaseCollection, addToSupabaseCollection } from "@/lib/supabase-db";

const COLLECTION_NAME = "messages";

export const dynamic = "force-dynamic";

// GET - Mesajları getir
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const read = searchParams.get("read");

    let messages = await getSupabaseCollection(COLLECTION_NAME);

    // Filtreleme
    if (read !== null) {
      messages = messages.filter((msg: any) => msg.read === (read === "true"));
    }

    // Tarihe göre sırala (en yeni önce)
    messages.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return NextResponse.json(messages);
  } catch (error: any) {
    console.error("❌ Mesajlar yüklenemedi:", error);
    return NextResponse.json({ error: "Mesajlar yüklenemedi", details: error.message }, { status: 500 });
  }
}

// POST - Yeni mesaj ekle
export async function POST(request: NextRequest) {
  try {
    let message;
    try {
      message = await request.json();
    } catch (jsonError) {
      return NextResponse.json(
        { error: "Geçersiz JSON formatı" },
        { status: 400 }
      );
    }

    // Yeni mesaj oluştur
    const newMessage = {
      ...message,
      read: false,
      createdAt: new Date().toISOString(),
      // Eğer id yoksa drive-db zaten atar ama biz yine de epoch verelim garanti olsun
      id: message.id || Date.now().toString(),
    };

    console.log("📝 Mesaj Supabase'e kaydediliyor...", newMessage.email);

    // Supabase'e kaydet (Drive DB/Firestore yerine)
    const savedMessage = await addToSupabaseCollection(COLLECTION_NAME, newMessage);

    console.log("✅ Mesaj başarıyla kaydedildi:", savedMessage.id);

    return NextResponse.json({ success: true, message: savedMessage });
  } catch (error: any) {
    console.error("❌ Mesaj kaydedilemedi:", error);
    return NextResponse.json({ error: "Mesaj kaydedilemedi", details: error.message }, { status: 500 });
  }
}
