import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const TABLE_NAME = "site_settings";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { googleMapsKey, serpApiKey, googleDriveClientId, googleDriveClientSecret, googleDriveServiceAccount } = body;
    const supabaseAdmin = getSupabaseAdmin();

    // Supabase'da ayarları güncelle (Row ID 1)
    const { error } = await supabaseAdmin
      .from(TABLE_NAME)
      .upsert({
        id: 1,
        google_maps_key: googleMapsKey,
        serp_api_key: serpApiKey,
        google_drive_client_id: googleDriveClientId,
        google_drive_client_secret: googleDriveClientSecret,
        google_drive_service_account: googleDriveServiceAccount,
        updated_at: new Date().toISOString()
      });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "API anahtarları başarıyla kaydedildi.",
    });
  } catch (error: any) {
    console.error("API anahtarı kaydetme hatası:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "API anahtarları kaydedilirken hata oluştu",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from(TABLE_NAME)
      .select("*")
      .eq("id", 1)
      .single();

    if (error || !data) {
      // Veri yoksa env'den oku (fallback)
      return NextResponse.json({
        googleMapsKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        serpApiKey: process.env.SERPAPI_KEY || "",
        googleDriveClientId: process.env.GOOGLE_DRIVE_CLIENT_ID || "",
        googleDriveClientSecret: process.env.GOOGLE_DRIVE_CLIENT_SECRET || "",
      });
    }

    return NextResponse.json({
      googleMapsKey: data.google_maps_key || "",
      serpApiKey: data.serp_api_key || "",
      googleDriveClientId: data.google_drive_client_id || "",
      googleDriveClientSecret: data.google_drive_client_secret || "",
    });
  } catch (error: any) {
    console.error("Settings fetch error:", error);
    return NextResponse.json(
      {
        error: error.message || "Ayarlar okunurken hata oluştu",
      },
      { status: 500 }
    );
  }
}
