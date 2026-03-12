import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseCollection } from "@/lib/supabase-db";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const supabaseAdmin = getSupabaseAdmin();
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
        const envStatus = {
            url: url ? `...${url.slice(-15)}` : "MISSING",
            has_anon: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            has_service: !!serviceKey,
            service_len: serviceKey.length,
            is_jwt: serviceKey.includes("."),
            is_short_secret: serviceKey.startsWith("sb_") || serviceKey.length < 50,
            nodeEnv: process.env.NODE_ENV
        };

        const { data: propData, error: propError, count } = await supabaseAdmin
            .from("properties")
            .select("*", { count: "exact" });

        // Video check
        const videos = await getSupabaseCollection("site_videos");
        const heroVideo = (videos || []).find((v: any) => v.type === "hero");

        // Site settings check
        const siteSettings = await getSupabaseCollection("site_settings");
        const hasSettings = (siteSettings || []).length > 0;
        const settingsSample = siteSettings?.[0] || null;

        return NextResponse.json({
            status: "diagnostic_v4_plus",
            env: envStatus,
            properties: {
                count: count || 0,
                error: propError?.message,
                sample: propData?.[0] || null
            },
            videos: {
                count: videos?.length || 0,
                has_hero: !!heroVideo,
                hero_url: heroVideo?.url || null
            },
            site_settings: {
                has_settings: hasSettings,
                sample: settingsSample
            },
            raw_timestamp: new Date().toISOString()
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
