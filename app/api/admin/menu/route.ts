import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "menu.json");

// GET - Menü yapılandırmasını getir
export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error: any) {
    // Dosya yoksa varsayılan menü döndür
    if (error.code === "ENOENT") {
      const defaultMenu = {
        header: [
          { id: "1", name: "Portföy", href: "/emlak", order: 1, visible: true },
          { id: "2", name: "Kurumsal", href: "/belgeler", order: 2, visible: true },
          { id: "3", name: "Keşfet", href: "/yatirim", order: 3, visible: true },
          { id: "4", name: "Hizmetler", href: "/hesaplayici", order: 4, visible: true },
          { id: "5", name: "İletişim", href: "/#iletisim", order: 5, visible: true },
        ],
        footer: {
          quickLinks: [
            { id: "f1", name: "Emlak İlanları", href: "/emlak", order: 1, visible: true },
            { id: "f2", name: "Yatırım Danışmanlığı", href: "/yatirim", order: 2, visible: true },
            { id: "f3", name: "Hesaplayıcılar", href: "/hesaplayici", order: 3, visible: true },
            { id: "f4", name: "Bina Yönetimi", href: "/bina-yonetimi", order: 4, visible: true },
          ],
          services: [
            { id: "s1", name: "Fiyat Analizi", href: "/fiyat-analizi", order: 1, visible: true },
            { id: "s2", name: "Daire Karşılaştırma", href: "/karsilastirma", order: 2, visible: true },
            { id: "s3", name: "Online Ödeme", href: "/odeme", order: 3, visible: true },
            { id: "s4", name: "Şirket Belgeleri", href: "/belgeler", order: 4, visible: true },
          ],
        },
      };
      return NextResponse.json(defaultMenu);
    }
    return NextResponse.json({ error: "Menü yüklenemedi" }, { status: 500 });
  }
}

// POST - Menü yapılandırmasını kaydet
export async function POST(request: NextRequest) {
  try {
    const menuConfig = await request.json();

    // data klasörünün var olduğundan emin ol
    const dataDir = path.join(process.cwd(), "data");
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

    // Menüyü kaydet
    await fs.writeFile(dataFilePath, JSON.stringify(menuConfig, null, 2), "utf-8");

    return NextResponse.json({ success: true, message: "Menü başarıyla kaydedildi" });
  } catch (error) {
    console.error("Menü kaydedilemedi:", error);
    return NextResponse.json({ error: "Menü kaydedilemedi" }, { status: 500 });
  }
}
