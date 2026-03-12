// JSON Helper Functions - Local JSON dosyalarından okuma/yazma
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

// JSON dosyasından veri oku
export async function readJsonFile<T>(filename: string): Promise<T> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch (error: any) {
    // Dosya yoksa boş array/object döndür
    if (error.code === "ENOENT") {
      console.log(`ℹ️ ${filename} dosyası bulunamadı, boş veri döndürülüyor`);
      return [] as T;
    }
    console.error(`❌ Error reading ${filename}:`, error.message);
    throw error;
  }
}

// JSON dosyasına veri yaz
export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`✅ ${filename} dosyasına yazıldı`);
  } catch (error: any) {
    console.error(`❌ Error writing ${filename}:`, error.message);
    throw error;
  }
}
