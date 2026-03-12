import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { createDriveClient, createDriveClientFromServiceAccount, uploadToDrive } from "@/lib/google-drive";

function getDriveClient() {
  // Önce Service Account JSON dosyasını kontrol et
  try {
    const serviceAccountPath = join(process.cwd(), "google-drive-service-account.json");
    const serviceAccountFile = readFileSync(serviceAccountPath, "utf8");
    const serviceAccount = JSON.parse(serviceAccountFile);
    return createDriveClientFromServiceAccount(serviceAccount);
  } catch (fileError) {
    // Dosya yoksa veya okunamazsa env'den kontrol et
  }

  // Env'den Service Account kontrolü
  const serviceAccountJson = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT;
  if (serviceAccountJson) {
    try {
      let jsonString = serviceAccountJson.trim();
      if (jsonString.startsWith('"') && jsonString.endsWith('"')) {
        jsonString = jsonString.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, '\n');
      }
      const serviceAccount = JSON.parse(jsonString);
      return createDriveClientFromServiceAccount(serviceAccount);
    } catch (error) {
      console.error("Service Account JSON parse hatası:", error);
    }
  }

  // Service Account yoksa OAuth 2.0 kullan
  const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;
  const redirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI || 
    `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3004"}/api/admin/google-drive/callback`;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Google Drive bağlantısı yapılmamış. Lütfen önce bağlantı yapın.");
  }

  return createDriveClient({
    clientId,
    clientSecret,
    redirectUri,
    refreshToken,
  });
}

export async function POST(request: NextRequest) {
  try {
    const driveClient = getDriveClient();

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folderId = formData.get("folderId") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "Dosya bulunamadı" },
        { status: 400 }
      );
    }

    // Dosyayı buffer'a çevir
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Google Drive'a yükle
    const uploadedFile = await uploadToDrive(
      driveClient,
      buffer,
      file.name,
      file.type,
      folderId || undefined
    );

    return NextResponse.json({
      success: true,
      file: uploadedFile,
    });
  } catch (error: any) {
    console.error("Google Drive dosya yükleme hatası:", error);
    return NextResponse.json(
      { error: error.message || "Dosya yüklenemedi" },
      { status: 500 }
    );
  }
}
