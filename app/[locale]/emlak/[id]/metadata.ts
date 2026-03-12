import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/properties/${params.id}`,
      { cache: "no-store" }
    );
    
    if (!response.ok) {
      return createMetadata({
        title: "Emlak İlanı",
        description: "Emlak ilan detay sayfası",
        url: `/emlak/${params.id}`,
      });
    }

    const property = await response.json();

    return createMetadata({
      title: property.title || "Emlak İlanı",
      description: property.description || `${property.title} - ${property.location}. ${property.type} emlak ilanı.`,
      keywords: [
        "emlak",
        property.type?.toLowerCase(),
        property.location,
        "TSR GROUP",
        "gayrimenkul",
      ],
      image: property.image,
      url: `/emlak/${params.id}`,
    });
  } catch (error) {
    return createMetadata({
      title: "Emlak İlanı",
      description: "Emlak ilan detay sayfası",
      url: `/emlak/${params.id}`,
    });
  }
}












