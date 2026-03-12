import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { createDriveClient, createDriveClientFromServiceAccount, listDriveFiles, downloadDriveFile } from "@/lib/google-drive";

function getDriveClient() {
  // Önce Service Account JSON dosyasını kontrol et
  // Önce service-account.json'u dene, yoksa google-drive-service-account.json'u kullan
  try {
    let serviceAccountPath = join(process.cwd(), "service-account.json");
    if (!existsSync(serviceAccountPath)) {
      serviceAccountPath = join(process.cwd(), "google-drive-service-account.json");
    }

    if (existsSync(serviceAccountPath)) {
      const serviceAccountFile = readFileSync(serviceAccountPath, "utf8");
      const serviceAccount = JSON.parse(serviceAccountFile);
      console.log("✅ Google Drive Service Account dosyasından yüklendi:", serviceAccountPath);
      return createDriveClientFromServiceAccount(serviceAccount);
    }
  } catch (fileError) {
    // Dosya yoksa veya okunamazsa env'den kontrol et
    console.log("ℹ️ Service Account dosyası bulunamadı, env'den kontrol ediliyor...");
  }

  // Env'den Service Account kontrolü
  const serviceAccountJson = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT;
  if (serviceAccountJson) {
    try {
      // Tırnak işaretlerini temizle (eğer env'de string olarak saklanmışsa)
      let jsonString = serviceAccountJson.trim();
      if (jsonString.startsWith('"') && jsonString.endsWith('"')) {
        jsonString = jsonString.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, '\n');
      }
      const serviceAccount = JSON.parse(jsonString);
      console.log("✅ Google Drive Service Account env'den yüklendi");
      return createDriveClientFromServiceAccount(serviceAccount);
    } catch (error) {
      console.error("Service Account JSON parse hatası:", error);
      console.error("JSON içeriği:", serviceAccountJson?.substring(0, 100));
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

export async function GET(request: NextRequest) {
  try {
    console.log("📂 Google Drive dosya listesi isteği alındı");

    // Service Account dosyasını oku (Test route ile aynı mantık)
    let serviceAccountPath = join(process.cwd(), "google-drive-service-account.json");
    if (!existsSync(serviceAccountPath)) {
      // Yedek olarak diğer ismi dene
      serviceAccountPath = join(process.cwd(), "service-account.json");
    }

    if (!existsSync(serviceAccountPath)) {
      throw new Error("Service Account dosyası bulunamadı!");
    }

    const serviceAccountFile = readFileSync(serviceAccountPath, "utf8");
    const serviceAccount = JSON.parse(serviceAccountFile);
    console.log("🔑 Service Account ile bağlanılıyor:", serviceAccount.client_email);

    const driveClient = createDriveClientFromServiceAccount(serviceAccount);

    // URL parametrelerini al
    const searchParams = request.nextUrl.searchParams;
    const folderId = searchParams.get("folderId") || undefined;
    const mimeTypeQuery = searchParams.get("mimeTypeQuery"); // Örn: "mimeType contains 'image/'"
    const excludeUploads = searchParams.get("excludeUploads");

    console.log("📋 Parametreler:", { folderId, mimeTypeQuery, excludeUploads });

    // SORGUSAYISAL İYİLEŞTİRME:
    // 1. 'sharedWithMe' kontrolünü kaldırıyoruz çünkü klasör içindeki dosyalar bu bayrağa sahip olmayabilir.
    // 2. 'owners' kontrolünü kaldırıyoruz.
    // 3. Eğer mimeTypeQuery varsa (örn: sadece resimler), bunu direkt sorguya ekliyoruz.
    //    Bu sayede API recursive olarak tüm erişilebilir klasörlerdeki resimleri bulur.

    let q = "trashed=false";

    // Eğer folderId verilmişse sadece o klasörün içindekileri listele
    if (folderId) {
      q = `'${folderId}' in parents and ${q}`;
    }

    if (mimeTypeQuery) {
      q += ` and ${mimeTypeQuery}`;
    }

    // Varsayılan: uygulamanın upload ettiği klasörü (TSR_WEB_UPLOADS) listeden gizle
    // (Kullanıcı Drive'da "kopya oluşuyor" gibi görünen dosyalar genelde buradan geliyor)
    if (excludeUploads !== "false") {
      try {
        const uploadsFolderName = "TSR_WEB_UPLOADS";
        const uploadsFolderResp = await driveClient.files.list({
          pageSize: 1,
          fields: "files(id, name, mimeType)",
          q: `name = '${uploadsFolderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed=false`,
          includeItemsFromAllDrives: true,
          supportsAllDrives: true,
          corpora: "allDrives",
        });
        const uploadsFolderId = uploadsFolderResp.data.files?.[0]?.id;
        if (uploadsFolderId) {
          q += ` and not '${uploadsFolderId}' in parents`;
          console.log("🧹 TSR_WEB_UPLOADS klasörü hariç tutuldu:", uploadsFolderId);
        }
      } catch (e: any) {
        console.warn("⚠️ TSR_WEB_UPLOADS hariç tutma başarısız (devam):", e?.message);
      }
    }

    console.log("🔍 Drive Sorgusu:", q);

    // Tüm dosyaları almak için pagination kullan
    let allFiles: any[] = [];
    let nextPageToken: string | null | undefined = undefined;
    let pageCount = 0;
    const maxPages = 10; // Maksimum 10 sayfa (1000 dosya) - güvenlik için limit

    do {
      const requestParams: any = {
        pageSize: 100,
        fields: "nextPageToken, files(id, name, mimeType, size, modifiedTime, webViewLink, thumbnailLink, owners, shared)",
        q: q,
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
        corpora: "allDrives",
        orderBy: "modifiedTime desc",
      };

      if (nextPageToken) {
        requestParams.pageToken = nextPageToken;
      }

      const allFilesResponse = await driveClient.files.list(requestParams);
      
      const pageFiles = allFilesResponse.data.files || [];
      allFiles = [...allFiles, ...pageFiles];
      nextPageToken = allFilesResponse.data.nextPageToken || undefined;
      pageCount++;

      console.log(`📄 Sayfa ${pageCount}: ${pageFiles.length} dosya alındı (Toplam: ${allFiles.length})`);

      // Güvenlik için maksimum sayfa limiti
      if (pageCount >= maxPages) {
        console.log(`⚠️ Maksimum sayfa limitine ulaşıldı (${maxPages} sayfa)`);
        break;
      }
    } while (nextPageToken);

    const files = allFiles;
    console.log(`✅ Toplam ${files.length} dosya bulundu (${pageCount} sayfa)`);

    // Debug: Dosya tiplerini göster
    if (files.length > 0) {
      const mimeTypes = files.map((f: any) => f.mimeType).filter(Boolean);
      const uniqueMimeTypes = [...new Set(mimeTypes)];
      console.log(`📋 Bulunan dosya tipleri:`, uniqueMimeTypes);
      console.log(`🖼️ Resim dosyaları:`, files.filter((f: any) => f.mimeType?.startsWith('image/')).length);
    }

    // ThumbnailLink yoksa alternatif thumbnail URL'i oluştur
    const filesWithThumbnails = files.map((file: any) => {
      // Eğer thumbnailLink yoksa ve dosya bir resimse, alternatif URL oluştur
      if (!file.thumbnailLink && file.mimeType?.startsWith('image/')) {
        file.thumbnailLink = `https://drive.google.com/thumbnail?id=${file.id}&sz=w400`;
      }
      return file;
    });

    console.log(`📸 ${filesWithThumbnails.filter((f: any) => f.thumbnailLink).length} dosyada thumbnail mevcut`);

    return NextResponse.json({ 
      files: filesWithThumbnails,
      stats: {
        total: files.length,
        images: files.filter((f: any) => f.mimeType?.startsWith('image/')).length,
        mimeTypes: [...new Set(files.map((f: any) => f.mimeType).filter(Boolean))]
      }
    });
  } catch (error: any) {
    console.error("❌ Google Drive dosya listesi hatası:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    return NextResponse.json(
      {
        error: error.message || "Dosyalar listelenemedi",
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const driveClient = getDriveClient();

    const body = await request.json();
    const { fileId } = body;

    if (!fileId) {
      return NextResponse.json(
        { error: "fileId gerekli" },
        { status: 400 }
      );
    }

    // Dosyayı indir
    const fileBuffer = await downloadDriveFile(driveClient, fileId);

    // Base64'e çevir (veya direkt buffer döndür)
    const base64 = fileBuffer.toString("base64");

    return NextResponse.json({
      success: true,
      data: base64,
      buffer: Array.from(fileBuffer),
    });
  } catch (error: any) {
    console.error("Google Drive dosya indirme hatası:", error);
    return NextResponse.json(
      { error: error.message || "Dosya indirilemedi" },
      { status: 500 }
    );
  }
}
