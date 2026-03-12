import { NextRequest, NextResponse } from "next/server";

// Güvenlik: sadece belirli hostlara izin verelim
const ALLOWED_HOSTS = new Set([
  "maps.app.goo.gl",
  "goo.gl",
  "google.com",
  "www.google.com",
  "maps.google.com",
  "www.maps.google.com",
]);

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const urlParam = request.nextUrl.searchParams.get("url");
    if (!urlParam) {
      return NextResponse.json({ error: "url gerekli" }, { status: 400 });
    }

    let inputUrl: URL;
    try {
      inputUrl = new URL(urlParam);
    } catch {
      return NextResponse.json({ error: "Geçersiz URL" }, { status: 400 });
    }

    // Host kontrolü - maps.app.goo.gl ve goo.gl için izin ver
    const isAllowed = ALLOWED_HOSTS.has(inputUrl.hostname) ||
      inputUrl.hostname.endsWith('.goo.gl') ||
      inputUrl.hostname.endsWith('.google.com');

    if (!isAllowed) {
      console.warn("⚠️ İzin verilmeyen host:", inputUrl.hostname);
      return NextResponse.json({
        error: `Bu host için çözümleme desteklenmiyor: ${inputUrl.hostname}`
      }, { status: 400 });
    }

    console.log("🔗 URL çözümleniyor:", inputUrl.toString());

    // Redirect takip et - Google'ın kısa linklerini çöz
    try {
      // Önce redirect: "follow" ile dene (otomatik redirect takibi)
      const resp = await fetch(inputUrl.toString(), {
        method: "GET",
        redirect: "follow", // Otomatik redirect takibi
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7"
        },
      });

      // Final URL response.url'de olmalı
      const finalUrl = resp.url || inputUrl.toString();
      console.log("✅ Final URL (follow):", finalUrl);

      // Eğer final URL hala kısa link ise, manuel takip dene
      if (finalUrl.includes("maps.app.goo.gl") || finalUrl.includes("goo.gl/maps")) {
        console.log("⚠️ Hala kısa link, manuel takip deneniyor...");

        // Manuel redirect takibi
        let currentUrl = finalUrl;
        let redirectCount = 0;
        const maxRedirects = 5;

        while (redirectCount < maxRedirects) {
          const manualResp = await fetch(currentUrl, {
            method: "GET",
            redirect: "manual",
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
              "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
            },
          });

          if (manualResp.status >= 300 && manualResp.status < 400) {
            const location = manualResp.headers.get("location");
            if (location) {
              currentUrl = new URL(location, currentUrl).toString();
              redirectCount++;
              console.log(`↪️ Manuel redirect ${redirectCount}: ${currentUrl}`);
              continue;
            }
          }

          // Başarılı
          if (manualResp.ok || manualResp.status < 300) {
            const manualFinalUrl = manualResp.url || currentUrl;
            console.log("✅ Final URL (manuel):", manualFinalUrl);
            return NextResponse.json({ success: true, finalUrl: manualFinalUrl });
          }
          break;
        }
      }

      return NextResponse.json({ success: true, finalUrl });
    } catch (fetchError: any) {
      console.error("❌ Fetch hatası:", fetchError.message);
      return NextResponse.json({
        error: `URL çözümlenemedi: ${fetchError.message}`
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error("❌ URL çözümleme hatası:", error);
    return NextResponse.json(
      { error: error.message || "URL çözümlenemedi" },
      { status: 500 }
    );
  }
}

