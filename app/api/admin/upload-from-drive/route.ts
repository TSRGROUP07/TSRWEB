import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { createDriveClientFromServiceAccount, makeFilePublic, getFileMetadata } from "@/lib/google-drive";

// Bu endpoint artık dosyayı indirip tekrar yüklemez.
// Sadece dosyanın public olduğundan emin olur ve direkt Drive linkini döndürür.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileId, fileName, mimeType } = body;

    if (!fileId) {
      return NextResponse.json(
        { error: "fileId gerekli" },
        { status: 400 }
      );
    }

    console.log("📥 Google Drive dosyası işleniyor:", fileId);

    // Google Drive client'ı oluştur
    // ÖNEMLİ: Google Drive için öncelik her zaman google-drive-service-account.json olmalı.
    // service-account.json genelde Firebase Admin içindir ve farklı bir project'e bağlı olabilir.
    let serviceAccount: any = null;
    let serviceAccountPath: string | null = null;

    // 1) Önce ENV (Vercel/Prod için en güvenlisi)
    const envSa = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT;
    if (envSa) {
      try {
        let jsonString = envSa.trim();
        if (jsonString.startsWith('"') && jsonString.endsWith('"')) {
          jsonString = jsonString.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, '\n');
        }
        serviceAccount = JSON.parse(jsonString);
        console.log("✅ Google Drive Service Account env'den yüklendi");
      } catch (e: any) {
        console.warn("⚠️ GOOGLE_DRIVE_SERVICE_ACCOUNT parse edilemedi:", e?.message);
      }
    }

    // 2) Dosya: google-drive-service-account.json (Drive için doğru dosya)
    if (!serviceAccount) {
      const preferredPath = join(process.cwd(), "google-drive-service-account.json");
      if (existsSync(preferredPath)) {
        serviceAccountPath = preferredPath;
        const serviceAccountFile = readFileSync(serviceAccountPath, "utf8");
        serviceAccount = JSON.parse(serviceAccountFile);
        console.log("✅ Google Drive Service Account dosyadan yüklendi:", serviceAccountPath);
      }
    }

    // 3) Son çare: service-account.json (Firebase Admin dosyası olabilir)
    if (!serviceAccount) {
      const fallbackPath = join(process.cwd(), "service-account.json");
      if (existsSync(fallbackPath)) {
        serviceAccountPath = fallbackPath;
        const serviceAccountFile = readFileSync(serviceAccountPath, "utf8");
        serviceAccount = JSON.parse(serviceAccountFile);
        console.log("⚠️ DİKKAT: Google Drive için service-account.json kullanılıyor:", serviceAccountPath);
      }
    }

    if (!serviceAccount) {
      throw new Error(
        `Google Drive Service Account bulunamadı.\n\n` +
        `Çözüm:\n` +
        `- Prod/Vercel: GOOGLE_DRIVE_SERVICE_ACCOUNT env ekleyin\n` +
        `- Lokal: google-drive-service-account.json dosyasını proje köküne koyun`
      );
    }

    const driveClient = createDriveClientFromServiceAccount(serviceAccount);

    // 1. Dosya bilgilerini al (kontrol amaçlı)
    let fileMetadata: any;
    try {
      fileMetadata = await getFileMetadata(driveClient, fileId);
      console.log("✅ Dosya bulundu:", fileMetadata.name);
    } catch (metadataError: any) {
      // Google Drive API etkinleştirme hatası
      if (metadataError.message?.includes("API has not been used") || metadataError.message?.includes("disabled")) {
        const projectIdMatch = metadataError.message.match(/project (\d+)/);
        const projectId = projectIdMatch ? projectIdMatch[1] : "YOUR_PROJECT_ID";
        const enableUrl = `https://console.developers.google.com/apis/api/drive.googleapis.com/overview?project=${projectId}`;
        
        throw new Error(
          `Google Drive API etkinleştirilmemiş!\n\n` +
          `Lütfen şu adımları izleyin:\n` +
          `1. ${enableUrl} adresine gidin\n` +
          `2. "Enable" (Etkinleştir) butonuna tıklayın\n` +
          `3. Birkaç dakika bekleyin\n` +
          `4. Tekrar deneyin\n\n` +
          `Project ID: ${projectId}\n` +
          `Service Account: ${serviceAccount.client_email || 'Bilinmiyor'}`
        );
      }
      throw metadataError;
    }

    // 2. Dosyayı public yap
    try {
      await makeFilePublic(driveClient, fileId);
    } catch (permError: any) {
      console.warn("⚠️ Permission uyarısı (zaten public olabilir):", permError.message);
    }

    // 3. Resim URL'ini oluştur - PROXY KULLAN
    // Bu sayede tüm cihazlarda ve tarayıcılarda (CORS sorunu olmadan) çalışır.
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin;
    const publicUrl = `${baseUrl}/api/image-proxy?id=${fileId}`;

    // Eski yöntem (Yedek olarak logluyoruz)
    // const directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

    console.log("📸 Kullanılacak URL formatı:", publicUrl);

    console.log("✅ Drive URL hazırlandı:", publicUrl);

    // Dosya adını güvenli hale getir
    const safeFileName = (fileName || fileMetadata.name || `drive-file-${fileId}`).replace(/[^a-zA-Z0-9.-]/g, "_");

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: safeFileName,
      fileId: fileId, // Orijinal ID'yi de dönelim
      isDriveFile: true
    });
  } catch (error: any) {
    console.error("❌ Drive işlemi hatası:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });

    // Kullanıcı dostu hata mesajı
    let userFriendlyMessage = error.message || "Dosya işlenemedi";
    
    // Google Drive API etkinleştirme hatası için özel mesaj
    if (error.message?.includes("API has not been used") || error.message?.includes("disabled")) {
      const projectIdMatch = error.message.match(/project (\d+)/);
      const projectId = projectIdMatch ? projectIdMatch[1] : "YOUR_PROJECT_ID";
      const enableUrl = `https://console.developers.google.com/apis/api/drive.googleapis.com/overview?project=${projectId}`;
      
      userFriendlyMessage = `Google Drive API etkinleştirilmemiş!\n\n` +
        `Lütfen şu adımları izleyin:\n` +
        `1. ${enableUrl} adresine gidin\n` +
        `2. "Enable" (Etkinleştir) butonuna tıklayın\n` +
        `3. Birkaç dakika bekleyin\n` +
        `4. Tekrar deneyin\n\n` +
        `Project ID: ${projectId}`;
    }

    return NextResponse.json(
      {
        error: userFriendlyMessage,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        code: error.code,
      },
      { status: 500 }
    );
  }
}
