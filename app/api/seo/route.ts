import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

const TABLE_NAME = "site_seo";

export async function GET() {
    try {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from(TABLE_NAME)
            .select("content")
            .eq("id", 1)
            .single();

        if (error || !data) {
            const defaultSEO = {
                global: {
                    siteName: "TSR GROUP",
                    siteDescription: "",
                    siteKeywords: "",
                    ogImage: "",
                    twitterCard: "summary_large_image",
                },
                pages: [],
            };
            return NextResponse.json(defaultSEO);
        }
        return NextResponse.json(data.content);
    } catch (error: any) {
        console.error("SEO GET error:", error);
        return NextResponse.json({ error: "SEO ayarları yüklenemedi" }, { status: 500 });
    }
}
