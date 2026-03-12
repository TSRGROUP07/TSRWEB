// SerpAPI entegrasyonu için tip tanımlamaları ve yardımcı fonksiyonlar

export interface SerpApiLocation {
  konum: number;
  başlık: string;
  yer_kimliği: string;
  gps_koordinatları: {
    enlem: number;
    boylam: number;
  };
  değerlendirme?: number;
  yorumlar?: number;
  tip: string;
  adres: string;
  telefon?: string;
  web_sitesi?: string;
  açık_durum?: string;
  çalışma_saatleri?: Record<string, string>;
  küçük_resim?: string;
}

export interface SerpApiResponse {
  arama_meta_verileri: {
    id: string;
    durum: string;
    json_endpoint: string;
  };
  yerel_sonuçlar: SerpApiLocation[];
}

/**
 * SerpAPI ile Google Maps araması yapar
 * @param query - Arama sorgusu (örn: "okul", "market", "hastane")
 * @param location - Konum koordinatları veya adres
 * @param apiKey - SerpAPI anahtarı
 */
export async function searchNearbyPlaces(
  query: string,
  location: { lat: number; lng: number } | string,
  apiKey: string
): Promise<SerpApiLocation[]> {
  try {
    const locationParam =
      typeof location === "string"
        ? location
        : `@${location.lat},${location.lng},14z`;

    const response = await fetch(
      `https://serpapi.com/search.json?engine=google_maps&q=${encodeURIComponent(
        query
      )}&ll=${locationParam}&api_key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`API hatası: ${response.status}`);
    }

    const data: SerpApiResponse = await response.json();
    return data.yerel_sonuçlar || [];
  } catch (error) {
    console.error("SerpAPI hatası:", error);
    return [];
  }
}

/**
 * Emlak için çevre analizi yapar (okul, market, hastane, vb.)
 */
export async function getPropertySurroundings(
  location: { lat: number; lng: number },
  apiKey: string
) {
  const categories = [
    { query: "okul", label: "Okullar" },
    { query: "market", label: "Marketler" },
    { query: "hastane", label: "Hastaneler" },
    { query: "park", label: "Parklar" },
    { query: "restoran", label: "Restoranlar" },
    { query: "bank", label: "Bankalar" },
    { query: "spor salonu", label: "Spor Salonları" },
  ];

  const results: Record<string, SerpApiLocation[]> = {};

  for (const category of categories) {
    const places = await searchNearbyPlaces(category.query, location, apiKey);
    results[category.label] = places.slice(0, 5); // İlk 5 sonuç
  }

  return results;
}


















