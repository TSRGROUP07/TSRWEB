import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { createDriveClientFromServiceAccount } from "@/lib/google-drive";

export async function GET(request: NextRequest) {
  try {
    // Service Account dosyasını oku
    const serviceAccountPath = join(process.cwd(), "google-drive-service-account.json");
    const serviceAccountFile = readFileSync(serviceAccountPath, "utf8");
    const serviceAccount = JSON.parse(serviceAccountFile);
    
    const driveClient = createDriveClientFromServiceAccount(serviceAccount);

    // Tüm erişilebilir dosyaları listele (Service Account'un kendi dosyaları + paylaşılan dosyalar)
    // Pagination ile tüm dosyaları al
    let allFilesList: any[] = [];
    let nextToken: string | null | undefined = undefined;
    do {
      const response: any = await driveClient.files.list({
        pageSize: 100,
        pageToken: nextToken || undefined,
        fields: "nextPageToken, files(id, name, mimeType, size, modifiedTime, owners, shared)",
        q: "trashed=false",
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
        corpora: "allDrives",
      });
      allFilesList = [...allFilesList, ...(response.data.files || [])];
      nextToken = response.data.nextPageToken || undefined;
    } while (nextToken);

    // Resim dosyalarını filtrele
    const imageFiles = allFilesList.filter(f => f.mimeType?.startsWith('image/'));

    // Service Account'un kendi dosyalarını listele
    let ownFilesList: any[] = [];
    nextToken = undefined;
    do {
      const response: any = await driveClient.files.list({
        pageSize: 100,
        pageToken: nextToken || undefined,
        fields: "nextPageToken, files(id, name, mimeType, size, modifiedTime)",
        q: "trashed=false and 'me' in owners",
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
      });
      ownFilesList = [...ownFilesList, ...(response.data.files || [])];
      nextToken = response.data.nextPageToken || undefined;
    } while (nextToken);

    // Paylaşılan dosyaları listele
    let sharedFilesList: any[] = [];
    nextToken = undefined;
    do {
      const response: any = await driveClient.files.list({
        pageSize: 100,
        pageToken: nextToken || undefined,
        fields: "nextPageToken, files(id, name, mimeType, size, modifiedTime, owners)",
        q: "trashed=false",
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
        corpora: "allDrives",
      });
      const files = response.data.files || [];
      // Paylaşılan dosyalar: Service Account sahibi değilse
      const shared = files.filter((f: any) => 
        !f.owners?.some((o: any) => o.emailAddress === serviceAccount.client_email)
      );
      sharedFilesList = [...sharedFilesList, ...shared];
      nextToken = response.data.nextPageToken || undefined;
    } while (nextToken);

    return NextResponse.json({
      success: true,
      serviceAccountEmail: serviceAccount.client_email,
      stats: {
        total: allFilesList.length,
        own: ownFilesList.length,
        shared: sharedFilesList.length,
        images: imageFiles.length,
      },
      allFiles: allFilesList.slice(0, 10), // İlk 10 dosyayı göster
      ownFiles: ownFilesList.slice(0, 10),
      sharedFiles: sharedFilesList.slice(0, 10),
      imageFiles: imageFiles.slice(0, 10),
    });
  } catch (error: any) {
    console.error("Google Drive test hatası:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Test başarısız",
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
