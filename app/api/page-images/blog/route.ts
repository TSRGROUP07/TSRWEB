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
    // Blog kategorisindeki görselleri filtrele
    const blogImages = images.filter((img: any) => img.category === "blog");
    
    return NextResponse.json(blogImages);
  } catch (error) {
    return NextResponse.json(
      { error: "Görseller yüklenemedi" },
      { status: 500 }
    );
  }
}












