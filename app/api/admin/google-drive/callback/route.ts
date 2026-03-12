import { NextRequest, NextResponse } from "next/server";
import { getTokensFromCode } from "@/lib/google-drive";
import fs from "fs";
import path from "path";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.redirect(
        new URL(`/admin/ayarlar?error=${encodeURIComponent(error)}`, request.url)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL("/admin/ayarlar?error=authorization_code_bulunamadi", request.url)
      );
    }

    const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI ||
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3004"}/api/admin/google-drive/callback`;

    if (!clientId || !clientSecret) {
      return NextResponse.redirect(
        new URL("/admin/ayarlar?error=api_bilgileri_eksik", request.url)
      );
    }

    // Token'ları al
    const tokens = await getTokensFromCode(
      { clientId, clientSecret, redirectUri },
      code
    );

    // Refresh token'ı .env.local dosyasına kaydet
    if (tokens.refresh_token) {
      const envPath = path.join(process.cwd(), ".env.local");
      let envContent = "";

      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, "utf8");
      }

      // Mevcut refresh token'ı güncelle veya ekle
      if (envContent.includes("GOOGLE_DRIVE_REFRESH_TOKEN=")) {
        envContent = envContent.replace(
          /GOOGLE_DRIVE_REFRESH_TOKEN=.*/,
          `GOOGLE_DRIVE_REFRESH_TOKEN=${tokens.refresh_token}`
        );
      } else {
        if (envContent && !envContent.endsWith("\n")) {
          envContent += "\n";
        }
        envContent += `GOOGLE_DRIVE_REFRESH_TOKEN=${tokens.refresh_token}\n`;
      }

      fs.writeFileSync(envPath, envContent, "utf8");
    }

    // Başarılı yönlendirme
    return NextResponse.redirect(
      new URL("/admin/ayarlar?google_drive_connected=true", request.url)
    );
  } catch (error: any) {
    console.error("Google Drive callback hatası:", error);
    return NextResponse.redirect(
      new URL(
        `/admin/ayarlar?error=${encodeURIComponent(error.message || "bilinmeyen_hata")}`,
        request.url
      )
    );
  }
}
