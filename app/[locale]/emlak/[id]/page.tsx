import { getSupabaseById, getSupabaseCollection } from "@/lib/supabase-db";
import PropertyDetailClient from "./PropertyDetailClient";
import StructuredData from "@/components/StructuredData";
import { getRealEstateListingSchema } from "@/lib/seo";
import { getLocale } from "next-intl/server";

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id: propertyId, locale } = await params;

  // Server-side data fetching
  const property = await getSupabaseById("properties", propertyId);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#b7b1ad] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">İlan Bulunamadı</h1>
          <a href="/emlak" className="inline-block px-6 py-3 bg-[#2e3c3a] text-white rounded-lg">İlanlara Dön</a>
        </div>
      </div>
    );
  }

  // Fetch similar properties with optimized query
  const similarProperties = await getSupabaseCollection("properties", {
    filters: [
      { column: 'id', operator: 'neq', value: property.id },
      { column: 'type', operator: 'eq', value: property.type }
    ],
    limit: 4
  });

  // SEO Schema
  const propertySchema = getRealEstateListingSchema({
    name: property.title,
    description: property.description || property.title,
    image: property.image,
    price: property.price,
    priceCurrency: property.currency || "EUR",
    address: property.location,
    numberOfRooms: parseInt(property.rooms) || 0,
    floorSize: property.area,
    url: `/emlak/${property.id}`,
    type: property.type === 'rent' ? 'rent' : 'sale'
  });

  return (
    <div className="min-h-screen bg-[#b7b1ad] text-white">
      <StructuredData data={propertySchema} />
      <PropertyDetailClient
        property={property}
        similarProperties={similarProperties}
      />
    </div>
  );
}
