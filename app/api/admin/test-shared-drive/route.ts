import { NextResponse } from "next/server";
import { createDriveClientFromServiceAccount } from "@/lib/google-drive";
import { readFileSync } from "fs";
import { join } from "path";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folderId = searchParams.get("folderId") || process.env.GOOGLE_DRIVE_SHARED_FOLDER_ID || "1h_vSOwUit6Ig_JMg49Tea8zLr6LL8L8v";

    // Service Account'u yükle
    const serviceAccountPath = join(process.cwd(), "google-drive-service-account.json");
    const serviceAccountFile = readFileSync(serviceAccountPath, "utf8");
    const serviceAccount = JSON.parse(serviceAccountFile);
    const client = createDriveClientFromServiceAccount(serviceAccount);

    console.log(`🔍 Test ediliyor: Klasör ID = ${folderId}`);
    console.log(`📧 Service Account: ${serviceAccount.client_email}`);

    // Klasör bilgilerini al
    const folderInfo = await client.files.get({
      fileId: folderId,
      supportsAllDrives: true,
      fields: "id, name, mimeType, driveId, parents, capabilities",
    });

    const result = {
      success: true,
      folderId: folderInfo.data.id,
      folderName: folderInfo.data.name,
      isSharedDrive: !!folderInfo.data.driveId, // driveId varsa Shared Drive içinde
      driveId: folderInfo.data.driveId || null,
      serviceAccountEmail: serviceAccount.client_email,
      message: folderInfo.data.driveId 
        ? "✅ Klasör Shared Drive içinde! Service Account'un erişim izni olmalı."
        : "⚠️ Klasör normal Drive klasörü. Shared Drive içinde olmalı!",
      capabilities: folderInfo.data.capabilities,
    };

    // Test: Klasöre dosya yazma izni var mı?
    try {
      const testFileName = `test-${Date.now()}.txt`;
      const testContent = Buffer.from("Test dosyası");
      
      const testFile = await client.files.create({
        requestBody: {
          name: testFileName,
          parents: [folderId],
        },
        media: {
          mimeType: "text/plain",
          body: testContent as any,
        },
        supportsAllDrives: true,
        fields: "id, name",
      });

      // Test dosyasını sil
      await client.files.delete({
        fileId: testFile.data.id!,
        supportsAllDrives: true,
      });

      return NextResponse.json({
        ...result,
        writeTest: "✅ Başarılı! Klasöre yazma izni var.",
      });
    } catch (writeError: any) {
      return NextResponse.json({
        ...result,
        writeTest: `❌ Yazma hatası: ${writeError.message}`,
        error: writeError.message,
      }, { status: 200 }); // Hata olsa bile 200 dön, bilgi amaçlı
    }
  } catch (error: any) {
    console.error("Test hatası:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
      message: "Klasör erişilemiyor veya bulunamadı. Shared Drive içinde olduğundan ve Service Account'un erişim izni olduğundan emin olun.",
    }, { status: 500 });
  }
}
