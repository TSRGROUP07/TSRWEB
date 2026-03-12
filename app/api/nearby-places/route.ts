import { NextRequest, NextResponse } from "next/server";
import { searchNearbyPlaces, getPropertySurroundings } from "@/lib/serpapi";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const type = searchParams.get("type"); // "single" veya "surroundings"

  const apiKey = process.env.SERPAPI_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "SERPAPI_KEY environment değişkeni tanımlı değil" },
      { status: 500 }
    );
  }

  if (!lat || !lng) {
    return NextResponse.json(
      { error: "Lat ve lng parametreleri gerekli" },
      { status: 400 }
    );
  }

  try {
    if (type === "surroundings") {
      // Çevre analizi
      const surroundings = await getPropertySurroundings(
        { lat: parseFloat(lat), lng: parseFloat(lng) },
        apiKey
      );
      return NextResponse.json(surroundings);
    } else {
      // Tek bir arama
      const searchQuery = query || "emlak";
      const results = await searchNearbyPlaces(
        searchQuery,
        { lat: parseFloat(lat), lng: parseFloat(lng) },
        apiKey
      );
      return NextResponse.json(results);
    }
  } catch (error) {
    console.error("API hatası:", error);
    return NextResponse.json(
      { error: "API çağrısı başarısız" },
      { status: 500 }
    );
  }
}


















