import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getImageMetadata } from "@/lib/imageOptimization";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Admin authentication kontrolü
function checkAdminAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");

  // Authorization header kontrolü
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return true;
  }

  // Cookie'den token kontrol et
  const cookies = request.headers.get("cookie");
  if (cookies && cookies.includes("admin_token=")) {
    return true;
  }

  // Development'ta daha esnek ol
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Admin authentication kontrolü
    if (!checkAdminAuth(request)) {
      return NextResponse.json(
        { error: "Yetkisiz erişim. Lütfen giriş yapın." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string || "images";
    const optimize = formData.get("optimize") === "true";

    if (!file) {
      return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
    }

    // Dosya boyutu kontrolü (100MB limit for videos)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `Dosya çok büyük. Maksimum boyut: 100MB. Mevcut: ${(file.size / 1024 / 1024).toFixed(2)}MB` },
        { status: 413 }
      );
    }

    const bytes = await file.arrayBuffer();
    let buffer = Buffer.from(bytes);

    // Metadata al (sadece resimler için)
    let metadata: any = null;
    if (file.type.startsWith("image/")) {
      try {
        metadata = await getImageMetadata(buffer);
      } catch (e) {
        console.warn("Metadata alınamadı:", e);
      }
    }

    // Optimizasyon (sadece resimler için)
    let ext = file.name.split(".").pop() || "jpg";
    let mimeType = file.type;

    if (optimize && file.type.startsWith("image/")) {
      try {
        const sharp = require("sharp");
        buffer = await sharp(buffer)
          .resize(1920, 1080, { fit: "inside", withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer();
        ext = "webp";
        mimeType = "image/webp";
      } catch (optimizeError) {
        console.warn("Optimizasyon hatası:", optimizeError);
      }
    }

    console.log("📤 Supabase Storage'a yükleniyor...");

    // Dosya adı
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").replace(/\.[^/.]+$/, "");
    const fileName = `${type}/${timestamp}-${safeName}.${ext}`;

    console.log("🚀 Supabase upload başlıyor:", fileName, "Boyut:", buffer.length);

    // Dedupe için MD5 hesapla (sadece resimler için)
    let md5: string | null = null;
    if (file.type.startsWith("image/")) {
      try {
        md5 = crypto.createHash("md5").update(buffer).digest("hex");
      } catch (e) {
        md5 = null;
      }
    }

    // Upload to Supabase Storage
    const bucketName = file.type.startsWith("video/") ? "videos" : "images";

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, buffer, {
        contentType: mimeType,
        upsert: true, // Aynı dosya varsa üzerine yaz
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      throw new Error(`Upload hatası: ${uploadError.message}`);
    }

    console.log("✅ Supabase Storage'a yüklendi:", uploadData.path);

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      thumbnailUrl: publicUrl,
      filename: fileName,
      metadata,
      optimized: optimize,
      isSupabaseFile: true,
    });

  } catch (error: any) {
    console.error("❌ Upload hatası (detaylı):", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code,
    });

    const errorMessage = error instanceof Error ? error.message : "Bilinmeyen hata";
    const errorDetails = {
      error: "Dosya yüklenemedi",
      message: errorMessage,
      ...(process.env.NODE_ENV === "development" && {
        details: error.stack,
        code: error.code,
      }),
    };

    return NextResponse.json(errorDetails, { status: 500 });
  }
}
