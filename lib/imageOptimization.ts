import { join } from "path";
import { writeFile, mkdir } from "fs/promises";

// Sharp'ı runtime'da yükle (Next.js build sorunlarını önlemek için)
let sharp: any = null;
let sharpChecked = false;

async function getSharp() {
  // Zaten kontrol edildiyse ve sharp yoksa null döndür
  if (sharpChecked && !sharp) {
    return null;
  }
  
  // Sharp zaten yüklüyse döndür
  if (sharp) {
    return sharp;
  }
  
  // İlk kez kontrol et
  if (!sharpChecked) {
    sharpChecked = true;
    try {
      // Sharp webpack externals olarak işaretlendiği için require ile yüklenebilir
      const sharpModule = require("sharp");
      sharp = sharpModule.default || sharpModule;
      return sharp;
    } catch (error: any) {
      console.warn("Sharp modülü kullanılamıyor, görseller optimizasyon olmadan kaydedilecek.");
      sharp = null;
      return null;
    }
  }
  
  return null;
}

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "webp" | "jpeg" | "png";
  fit?: "cover" | "contain" | "fill" | "inside" | "outside";
}

/**
 * Görseli optimize eder ve kaydeder
 */
export async function optimizeImage(
  inputBuffer: Buffer,
  outputPath: string,
  options: ImageOptimizationOptions = {}
): Promise<string> {
  const {
    width = 1920,
    height = 1080,
    quality = 85,
    format = "webp",
    fit = "inside",
  } = options;

  // Output dizinini oluştur
  const outputDir = join(process.cwd(), "public", outputPath.split("/").slice(0, -1).join("/"));
  await mkdir(outputDir, { recursive: true });

  // Sharp'ı dene
  const sharpInstance = await getSharp();
  
  if (!sharpInstance) {
    // Sharp yoksa, dosyayı olduğu gibi kaydet
    const fullPath = join(process.cwd(), "public", outputPath);
    await writeFile(fullPath, inputBuffer);
    return outputPath;
  }

  try {
    // Sharp pipeline oluştur
    let pipeline = sharpInstance(inputBuffer);

    // Resize işlemi
    pipeline = pipeline.resize(width, height, {
      fit,
      withoutEnlargement: true,
    });

    // Format ve kalite ayarları
    switch (format) {
      case "webp":
        pipeline = pipeline.webp({ quality });
        break;
      case "jpeg":
        pipeline = pipeline.jpeg({ quality, mozjpeg: true });
        break;
      case "png":
        pipeline = pipeline.png({ quality, compressionLevel: 9 });
        break;
    }

    // Görseli kaydet
    const fullPath = join(process.cwd(), "public", outputPath);
    await pipeline.toFile(fullPath);

    return outputPath;
  } catch (error) {
    console.warn("Sharp ile optimizasyon başarısız, orijinal dosya kaydediliyor:", error);
    // Hata durumunda orijinal dosyayı kaydet
    const fullPath = join(process.cwd(), "public", outputPath);
    await writeFile(fullPath, inputBuffer);
    return outputPath;
  }
}

/**
 * Görseli birden fazla boyutta optimize eder (responsive images)
 */
export async function optimizeImageMultipleSizes(
  inputBuffer: Buffer,
  basePath: string,
  sizes: { width: number; suffix: string }[] = [
    { width: 1920, suffix: "large" },
    { width: 1280, suffix: "medium" },
    { width: 768, suffix: "small" },
    { width: 400, suffix: "thumbnail" },
  ],
  quality: number = 85
): Promise<{ [key: string]: string }> {
  const results: { [key: string]: string } = {};

  for (const size of sizes) {
    const ext = basePath.split(".").pop();
    const nameWithoutExt = basePath.replace(`.${ext}`, "");
    const outputPath = `${nameWithoutExt}-${size.suffix}.webp`;

    await optimizeImage(inputBuffer, outputPath, {
      width: size.width,
      quality,
      format: "webp",
      fit: "inside",
    });

    results[size.suffix] = outputPath;
  }

  return results;
}

/**
 * Görselin metadata'sını alır
 */
export async function getImageMetadata(buffer: Buffer) {
  const sharpInstance = await getSharp();
  
  if (!sharpInstance) {
    // Sharp yoksa basit metadata döndür
    return {
      width: 0,
      height: 0,
      format: "unknown",
      size: buffer.length,
    };
  }

  try {
    const metadata = await sharpInstance(buffer).metadata();
    return {
      width: metadata.width || 0,
      height: metadata.height || 0,
      format: metadata.format || "unknown",
      size: buffer.length,
    };
  } catch (error) {
    console.warn("Metadata alınamadı:", error);
    return {
      width: 0,
      height: 0,
      format: "unknown",
      size: buffer.length,
    };
  }
}

/**
 * Görseli thumbnail boyutuna optimize eder
 */
export async function createThumbnail(
  inputBuffer: Buffer,
  outputPath: string,
  size: number = 400
): Promise<string> {
  const sharpInstance = await getSharp();
  
  if (!sharpInstance) {
    // Sharp yoksa, orijinal görseli kaydet
    const outputDir = join(process.cwd(), "public", outputPath.split("/").slice(0, -1).join("/"));
    await mkdir(outputDir, { recursive: true });
    const fullPath = join(process.cwd(), "public", outputPath);
    await writeFile(fullPath, inputBuffer);
    return outputPath;
  }

  return optimizeImage(inputBuffer, outputPath, {
    width: size,
    height: size,
    quality: 80,
    format: "webp",
    fit: "cover",
  });
}



