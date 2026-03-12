import HeroVideo from "@/components/HeroVideo";
import StructuredData from "@/components/StructuredData";
import { getRealEstateAgentSchema } from "@/lib/seo";
import ForSale from "@/components/ForSale";
import { getHeroVideoUrl } from "@/lib/getHeroVideo";
import HomeContent from "@/components/HomeContent";
import { getSupabaseCollection, getSupabaseCount } from "@/lib/supabase-db";

export default async function Home() {
  // Fetch everything on server for better performance
  const [videoUrl, allProperties, totalPropertiesCount] = await Promise.all([
    getHeroVideoUrl(),
    getSupabaseCollection("properties", { limit: 8 }),
    getSupabaseCount("properties")
  ]);

  // Pass first 4 properties for immediate display
  const initialProperties = Array.isArray(allProperties) ? allProperties.slice(0, 4) : [];

  return (
    <div className="relative" style={{ background: '#b7b1ad' }}>
      <StructuredData data={getRealEstateAgentSchema()} />

      {/* Hero Video Section - Video URL and property count passed as props */}
      <HeroVideo
        videoUrl={videoUrl || undefined}
        totalPropertiesCount={totalPropertiesCount}
      />

      {/* FOR SALE Section - Initial properties passed for immediate render */}
      <ForSale initialProperties={initialProperties} />

      {/* Diğer bileşenler - Client component'te lazy loading */}
      <HomeContent />
    </div>
  );
}




