import { Suspense } from "react";
import Image from "next/image";
import { Instagram, Youtube, Send, Music, Search } from "lucide-react";
import { getTranslations } from 'next-intl/server';
import EmlakClient from "@/components/EmlakClient";
import SkeletonLoader from "@/components/SkeletonLoader";
import StructuredData from "@/components/StructuredData";
import { getRealEstateAgentSchema } from "@/lib/seo";
import { getSupabaseCollection } from "@/lib/supabase-db";

// Server Component - ISR with 1 hour revalidation
export const revalidate = 3600;

async function getProperties() {
  try {
    console.log("🔍 [Emlak Page] Fetching properties from Supabase...");

    // Directly call Supabase instead of API route to avoid NEXT_PUBLIC_SITE_URL issue
    const properties = await getSupabaseCollection("properties", {});

    console.log(`✅ [Emlak Page] ${properties?.length || 0} properties fetched`);

    if (!properties || properties.length === 0) {
      console.log("⚠️ [Emlak Page] No properties found in database");
      return [];
    }

    // Ensure each property has an image
    const propertiesWithImages = properties.map((property: any) => {
      if (!property.image && property.images && property.images.length > 0) {
        property.image = property.images[0];
      }
      return property;
    });

    return propertiesWithImages;
  } catch (error) {
    console.error("❌ [Emlak Page] Error fetching properties:", error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations('realEstatePage');

  return {
    title: t('title') + ' - TSR GROUP',
    description: t('subtitle'),
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
      type: 'website',
    }
  };
}

export default async function EmlakPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const t = await getTranslations('realEstatePage');

  // Fetch properties server-side
  const properties = await getProperties();

  // Parse URL filters
  const urlFilters: any = {};
  const type = searchParams.type;
  const propertyType = searchParams.propertyType;
  const rooms = searchParams.rooms;
  const price = searchParams.price;
  const propertyId = searchParams.propertyId;
  const location = searchParams.location;

  if (type) urlFilters.type = type;
  if (propertyType) urlFilters.propertyType = propertyType;
  if (rooms) urlFilters.rooms = isNaN(Number(rooms)) ? rooms : Number(rooms);
  if (propertyId) urlFilters.propertyId = propertyId;

  // Parse price range
  if (price && typeof price === 'string') {
    if (price.includes('-')) {
      const [min, max] = price.split('-');
      if (min) urlFilters.minPrice = Number(min);
      if (max) urlFilters.maxPrice = Number(max);
    } else if (price.endsWith('+')) {
      urlFilters.minPrice = Number(price.replace('+', ''));
    }
  }

  const urlSearchTerm = typeof location === 'string' ? location : '';

  // SEO Schema
  const structuredData = getRealEstateAgentSchema();

  const handleSearch = () => {
    "use client";
    const searchBar = document.getElementById("search-bar");
    if (searchBar) {
      searchBar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleViewProperties = () => {
    "use client";
    const propertiesGrid = document.getElementById("properties-grid");
    if (propertiesGrid) {
      propertiesGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#b7b1ad] text-white">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden mt-8 mb-8 rounded-2xl mx-4">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=90"
            alt={t('title')}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>

        {/* Social Media Icons */}
        <div className="absolute top-6 right-6 z-30 flex flex-col gap-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors">
            <Instagram className="h-6 w-6" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors">
            <Youtube className="h-6 w-6" />
          </a>
          <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors">
            <Send className="h-6 w-6" />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors">
            <Music className="h-6 w-6" />
          </a>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center">
          <div className="w-full max-w-4xl">
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
                  {t('title')}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-white/95 font-medium max-w-2xl leading-relaxed">
                  {t('subtitle')}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#search-bar"
                  className="bg-white hover:bg-white/95 text-[#2e3c3a] px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-2xl text-lg"
                >
                  <Search className="h-6 w-6" />
                  <span>{t('searchBtn')}</span>
                </a>
                <a
                  href="#properties-grid"
                  className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 text-lg"
                >
                  <span>{t('viewListingsBtn')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Component with Suspense */}
      <Suspense fallback={
        <div className="container mx-auto px-4 lg:px-12 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
        </div>
      }>
        <EmlakClient
          initialProperties={properties}
          urlFilters={urlFilters}
          urlSearchTerm={urlSearchTerm}
        />
      </Suspense>
    </div>
  );
}
