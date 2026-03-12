import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const IMAGES_FILE = path.join(DATA_DIR, "images.json");

async function getImages() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(IMAGES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const images = await getImages();
    // Hakkında bölümü için görseli filtrele (en son eklenen)
    const aboutImages = images.filter((img: any) => img.category === "about");
    const aboutImage = aboutImages[aboutImages.length - 1] || null;
    
    return NextResponse.json({
      image: aboutImage?.url || null,
      personName: aboutImage?.personName || aboutImage?.title?.split(".")[0] || "TSR GROUP",
      personTitle: aboutImage?.personTitle || "Şirket Sahibi",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Görsel yüklenemedi" },
      { status: 500 }
    );
  }
}

