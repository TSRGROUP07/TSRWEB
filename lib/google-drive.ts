// Google Drive API helper functions
// This file should only be used on the server-side
import "server-only";
import { google } from "googleapis";
import { PassThrough } from "stream";

export interface GoogleDriveConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  refreshToken?: string;
}

export interface ServiceAccountConfig {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain?: string;
}

/**
 * Google Drive OAuth2 client oluşturur
 */
export function createDriveClient(config: GoogleDriveConfig) {
  const oauth2Client = new google.auth.OAuth2(
    config.clientId,
    config.clientSecret,
    config.redirectUri
  );

  if (config.refreshToken) {
    oauth2Client.setCredentials({
      refresh_token: config.refreshToken,
    });
  }

  return google.drive({ version: "v3", auth: oauth2Client });
}

/**
 * Service Account ile Google Drive client oluşturur
 */
export function createDriveClientFromServiceAccount(config: ServiceAccountConfig) {
  const auth = new google.auth.JWT({
    email: config.client_email,
    key: config.private_key.replace(/\\n/g, '\n'),
    scopes: [
      "https://www.googleapis.com/auth/drive.readonly",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/drive", // Tüm Drive erişimi için
    ],
  });

  return google.drive({ version: "v3", auth });
}

/**
 * OAuth2 authorization URL oluşturur
 */
export function getAuthUrl(config: GoogleDriveConfig): string {
  const oauth2Client = new google.auth.OAuth2(
    config.clientId,
    config.clientSecret,
    config.redirectUri
  );

  const scopes = [
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/drive.file",
  ];

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
  });
}

/**
 * Authorization code ile access token alır
 */
export async function getTokensFromCode(
  config: GoogleDriveConfig,
  code: string
) {
  const oauth2Client = new google.auth.OAuth2(
    config.clientId,
    config.clientSecret,
    config.redirectUri
  );

  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

/**
 * Google Drive'dan dosya listesi alır
 */
export async function listDriveFiles(
  driveClient: any,
  folderId?: string,
  pageSize: number = 50,
  mimeTypeQuery?: string
) {
  try {
    let query = "trashed=false";

    if (folderId) {
      query = `'${folderId}' in parents and ${query}`;
    }
    // Root'ta: Tüm erişilebilir dosyaları göster
    // Service Account'un kendi dosyaları + paylaşılan dosyalar
    // Query'yi basitleştir - tüm erişilebilir dosyaları göster

    if (mimeTypeQuery) {
      query = `${query} and (${mimeTypeQuery})`;
    }

    console.log("🔍 Google Drive query:", query);

    const response = await driveClient.files.list({
      q: query,
      pageSize,
      fields: "nextPageToken, files(id, name, mimeType, size, modifiedTime, webViewLink, thumbnailLink, owners, shared, parents)",
      orderBy: "modifiedTime desc",
      includeItemsFromAllDrives: true,
      supportsAllDrives: true,
      corpora: "allDrives", // Tüm Drive'ları dahil et (paylaşılan dosyalar dahil)
    });

    const files = response.data.files || [];
    console.log(`✅ ${files.length} dosya bulundu`);

    if (files.length > 0) {
      console.log("📄 İlk 3 dosya:", files.slice(0, 3).map((f: any) => ({
        name: f.name,
        type: f.mimeType,
        id: f.id,
        owners: f.owners?.map((o: any) => o.emailAddress) || []
      })));
    }

    return files;
  } catch (error: any) {
    console.error("❌ Google Drive dosya listesi hatası:", {
      message: error.message,
      code: error.code,
      details: error.errors || error.toString(),
    });
    throw new Error(`Dosyalar listelenemedi: ${error.message}`);
  }
}

/**
 * Google Drive'dan dosya indirir
 */
export async function downloadDriveFile(
  driveClient: any,
  fileId: string
): Promise<Buffer> {
  try {
    const response = await driveClient.files.get(
      { fileId, alt: "media" },
      { responseType: "arraybuffer" }
    );

    return Buffer.from(response.data);
  } catch (error: any) {
    console.error("Google Drive dosya indirme hatası:", error);
    throw new Error(`Dosya indirilemedi: ${error.message}`);
  }
}

/**
 * Google Drive'a dosya yükler
 */
export async function uploadToDrive(
  driveClient: any,
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string,
  folderId?: string
) {
  try {
    const fileMetadata: any = {
      name: fileName,
    };

    if (folderId) {
      fileMetadata.parents = [folderId];
    }

    console.log(`📤 Drive Upload param: Name=${fileName} Folder=${folderId || "ROOT"}`);
    console.log("📄 Metadata:", JSON.stringify(fileMetadata));

    const bufferStream = new PassThrough();
    bufferStream.end(fileBuffer);

    const media = {
      mimeType,
      body: bufferStream,
    };

    const response = await driveClient.files.create({
      requestBody: fileMetadata,
      media,
      supportsAllDrives: true, // Shared Drive desteği
      fields: "id, name, webViewLink, thumbnailLink",
    });

    return response.data;
  } catch (error: any) {
    console.error("Google Drive dosya yükleme hatası:", error);
    
    // Service Account storage quota hatası için özel mesaj
    if (error.message?.includes("Service Accounts do not have storage quota") || 
        error.message?.includes("storage quota")) {
      // Service Account email'ini güvenli şekilde al
      let serviceAccountEmail = "Service Account email'inizi kontrol edin";
      try {
        if (process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT) {
          const sa = JSON.parse(process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT);
          serviceAccountEmail = sa.client_email || serviceAccountEmail;
        } else {
          // Dosyadan oku
          const fs = require('fs');
          const path = require('path');
          const saPath = path.join(process.cwd(), "google-drive-service-account.json");
          if (fs.existsSync(saPath)) {
            const saContent = fs.readFileSync(saPath, "utf8");
            const sa = JSON.parse(saContent);
            serviceAccountEmail = sa.client_email || serviceAccountEmail;
          }
        }
      } catch (e) {
        // Email alınamazsa varsayılan mesaj kullan
      }
      
      throw new Error(
        "❌ Google Drive Service Account'un depolama kotası yok!\n\n" +
        "ÇÖZÜM ADIMLARI:\n" +
        "1. Google Drive'da bir Shared Drive (Paylaşılan Sürücü) oluşturun\n" +
        "   → https://drive.google.com → Sol menüden 'Paylaşılan sürücüler' → 'Yeni'\n\n" +
        "2. Service Account'u Shared Drive'a ekleyin:\n" +
        "   → Shared Drive'a sağ tıklayın → 'Paylaş' → Email ekleyin\n" +
        "   → Email: " + serviceAccountEmail + "\n" +
        "   → Rol: 'İçerik Yöneticisi' seçin\n\n" +
        "3. Shared Drive içinde bir klasör oluşturun\n" +
        "4. O klasörün ID'sini alın (URL'den)\n" +
        "5. .env.local dosyasına ekleyin:\n" +
        "   GOOGLE_DRIVE_SHARED_FOLDER_ID=klasör_id_buraya\n\n" +
        "Detaylı bilgi: https://developers.google.com/workspace/drive/api/guides/about-shareddrives"
      );
    }
    
    throw new Error(`Dosya yüklenemedi: ${error.message}`);
  }
}

/**
 * Google Drive'da klasör oluşturur
 */
export async function createDriveFolder(
  driveClient: any,
  folderName: string,
  parentFolderId?: string
) {
  try {
    const fileMetadata: any = {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
    };

    if (parentFolderId) {
      fileMetadata.parents = [parentFolderId];
    }

    const response = await driveClient.files.create({
      requestBody: fileMetadata,
      fields: "id, name",
    });

    return response.data;
  } catch (error: any) {
    console.error("Google Drive klasör oluşturma hatası:", error);
    throw new Error(`Klasör oluşturulamadı: ${error.message}`);
  }
}

/**
 * Dosyayı public yapar (herkese açık)
 */
export async function makeFilePublic(driveClient: any, fileId: string) {
  try {
    // Önce mevcut permission'ları kontrol et
    const permissions = await driveClient.permissions.list({
      fileId,
      fields: "permissions(id, type, role)",
    });

    // Zaten "anyone" permission'ı var mı kontrol et
    const hasPublicPermission = permissions.data.permissions?.some(
      (p: any) => p.type === "anyone" && p.role === "reader"
    );

    if (hasPublicPermission) {
      console.log(`ℹ️ Dosya zaten public: ${fileId}`);
      return true;
    }

    // Public permission ekle
    await driveClient.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    console.log(`✅ Dosya public yapıldı: ${fileId}`);
    return true;
  } catch (error: any) {
    // Zaten public ise veya permission hatası önemsizse devam et
    if (error.message?.includes("already exists") || error.message?.includes("Permission denied")) {
      console.log(`ℹ️ Dosya zaten public veya permission hatası (devam ediliyor): ${fileId}`);
      return true;
    }
    console.warn("⚠️ Google Drive permission hatası:", error.message);
    // Hata olsa bile devam et, dosya zaten public olabilir
    return true;
  }
}

/**
 * Dosya metadata'sını alır
 */
export async function getFileMetadata(driveClient: any, fileId: string) {
  try {
    const response = await driveClient.files.get({
      fileId,
      fields: "id, name, webViewLink, thumbnailLink, size, mimeType",
    });
    return response.data;
  } catch (error: any) {
    console.error("Google Drive metadata hatası:", error);
    throw new Error(`Dosya bilgileri alınamadı: ${error.message}`);
  }
}

/**
 * İsme göre dosya arar
 */
export async function findFileByName(driveClient: any, fileName: string, folderId?: string) {
  try {
    const files = await listDriveFiles(
      driveClient,
      folderId,
      1,
      `name = '${fileName}' and trashed = false`
    );

    if (files && files.length > 0) {
      return files[0];
    }
    return null;
  } catch (error: any) {
    console.error("Google Drive dosya arama hatası:", error);
    // Hata durumunda null dön
    return null;
  }
}

/**
 * Drive'daki mevcut dosyayı günceller
 */
export async function updateDriveFile(
  driveClient: any,
  fileId: string,
  fileBuffer: Buffer,
  mimeType: string = "application/json"
) {
  try {
    const bufferStream = new PassThrough();
    bufferStream.end(fileBuffer);

    const media = {
      mimeType,
      body: bufferStream,
    };

    const response = await driveClient.files.update({
      fileId,
      media,
      fields: "id, name, modifiedTime",
    });

    console.log(`✅ Dosya güncellendi: ${fileId}`);
    return response.data;
  } catch (error: any) {
    console.error("Google Drive dosya güncelleme hatası:", error);
    throw new Error(`Dosya güncellenemedi: ${error.message}`);
  }
}
