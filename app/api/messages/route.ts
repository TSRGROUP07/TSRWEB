import { NextRequest, NextResponse } from "next/server";
import { addToSupabaseCollection } from "@/lib/supabase-db";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log("📬 Yeni ilan talebi alınıyor (Supabase):", body.email);

        // Zorunlu alan kontrolü
        if (!body.firstName || !body.email || !body.message) {
            return NextResponse.json({ error: "Eksik bilgi" }, { status: 400 });
        }

        // Mesajı kaydet
        const newMessage = {
            ...body,
            type: "property_inquiry",
            status: "new",
            createdAt: new Date().toISOString()
        };

        const saved = await addToSupabaseCollection("messages", newMessage);

        return NextResponse.json({ success: true, id: saved.id }, { status: 201 });
    } catch (error: any) {
        console.error("❌ Message POST error:", error);
        return NextResponse.json(
            { error: "Mesaj gönderilemedi", message: error.message },
            { status: 500 }
        );
    }
}
