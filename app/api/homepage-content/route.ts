import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

const TABLE_NAME = "homepage_content";

export async function GET() {
    try {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from(TABLE_NAME)
            .select("content")
            .eq("id", 1)
            .single();

        if (error || !data) {
            // Varsayılan içerik
            const defaultContent = {
                hero: {
                    title: "Mülkünüz İçin Doğru Strateji",
                    subtitle1: "Güvenli Yönetim",
                    subtitle2: "Sürdürülebilir Getiri",
                },
                stats: {
                    title: "Neden TSR GROUP'u seçmelisiniz?",
                    subtitle: "Sektördeki deneyimimiz ve başarılarımızla fark yaratıyoruz",
                }
            };
            return NextResponse.json(defaultContent);
        }
        return NextResponse.json(data.content);
    } catch (error: any) {
        console.error("Homepage content GET error:", error);
        return NextResponse.json({ error: "İçerik yüklenemedi" }, { status: 500 });
    }
}
