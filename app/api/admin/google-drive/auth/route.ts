import { NextRequest, NextResponse } from "next/server";
import { getAuthUrl } from "@/lib/google-drive";

export async function GET(request: NextRequest) {
  try {
    const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI || 
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3004"}/api/admin/google-drive/callback`;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: "Google Drive API bilgileri eksik. Lütfen ayarlardan yapılandırın." },
        { status: 400 }
      );
    }

    const authUrl = getAuthUrl({
      clientId,
      clientSecret,
      redirectUri,
    });

    return NextResponse.json({ authUrl });
  } catch (error: any) {
    console.error("Google Drive auth URL oluşturma hatası:", error);
    return NextResponse.json(
      { error: error.message || "Auth URL oluşturulamadı" },
      { status: 500 }
    );
  }
}
