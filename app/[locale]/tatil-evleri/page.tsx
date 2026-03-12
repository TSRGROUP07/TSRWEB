import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { Palmtree, Waves, Sun, BadgeCheck } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { getSupabaseCollection } from '@/lib/supabase-db';

// Dummy data fetching - in real app this would call your API with specific filters
async function getHolidayHomes() {
    try {
        console.log("🔍 [Tatil Evleri] Fetching holiday homes from Supabase...");

        // Directly call Supabase instead of API route
        const properties = await getSupabaseCollection("properties", {
            filters: [{ column: 'propertyType', operator: 'eq', value: 'Tatil Evi' }]
        });

        console.log(`✅ [Tatil Evleri] ${properties?.length || 0} holiday homes fetched`);

        if (!properties || properties.length === 0) {
            console.log("⚠️ [Tatil Evleri] No holiday homes found");
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
        console.error("❌ [Tatil Evleri] Error:", error);
        return [];
    }
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale });
    return {
        title: locale === 'en'
            ? 'Holiday Homes for Sale in Alanya | Buy Your Dream Villa - TSR GROUP'
            : 'Alanya Satılık Tatil Evleri | Yazlık Daireler - TSR GROUP',
        description: locale === 'en'
            ? 'Find your perfect holiday home in Alanya. Sea view apartments, luxury villas with pools. Best investment for British buyers starting from £75,000.'
            : 'Alanya\'da hayalinizdeki tatil evini bulun. Deniz manzaralı daireler, havuzlu lüks villalar. En iyi fiyat garantisi.',
        keywords: locale === 'en'
            ? ['Holiday home Alanya', 'Buy villa in Turkey', 'Sea view apartment Alanya', 'Vacation home for sale']
            : ['Alanya satılık yazlık', 'Deniz manzaralı daire', 'Alanya villa satılık']
    };
}

export default async function HolidayHomesPage({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations('HolidayHomes');
    const properties = await getHolidayHomes();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-[500px] overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/40 z-10" />
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop"
                        alt="Alanya Holiday Home"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center pt-20">
                    <BadgeCheck className="h-16 w-16 text-[#c5a265] mb-4 drop-shadow-lg" />
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-md">
                        {locale === 'en' ? 'Your Dream Holiday Home' : 'Hayalinizdeki Tatil Evi'}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl font-medium drop-shadow-sm">
                        {locale === 'en'
                            ? 'Sea view apartments & luxury villas selected for British investors.'
                            : 'İngiliz yatırımcılar için seçilmiş deniz manzaralı daireler ve lüks villalar.'}
                    </p>
                </div>
            </div>

            {/* Benefits Banner */}
            <div className="bg-[#2e3c3a] text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center gap-3">
                            <Sun className="h-10 w-10 text-[#c5a265]" />
                            <h3 className="text-xl font-bold">{locale === 'en' ? '300 Days of Sunshine' : 'Yılda 300 Gün Güneş'}</h3>
                            <p className="text-white/70">{locale === 'en' ? 'Perfect climate all year round' : 'Yıl boyu mükemmel iklim'}</p>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <Waves className="h-10 w-10 text-[#c5a265]" />
                            <h3 className="text-xl font-bold">{locale === 'en' ? 'Walking Distance to Beach' : 'Denize Yürüme Mesafesi'}</h3>
                            <p className="text-white/70">{locale === 'en' ? 'Prime locations near Mediterranean' : 'Akdeniz\'in en güzel plajlarına yakın'}</p>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <Palmtree className="h-10 w-10 text-[#c5a265]" />
                            <h3 className="text-xl font-bold">{locale === 'en' ? 'Luxury Lifestyle' : 'Lüks Yaşam Tarzı'}</h3>
                            <p className="text-white/70">{locale === 'en' ? 'Pools, gyms, and 5-star amenities' : 'Havuz, spor salonu ve 5 yıldızlı olanaklar'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Properties Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {locale === 'en' ? 'Curated Selection' : 'Özenle Seçilmiş İlanlar'}
                        </h2>
                        <p className="text-gray-600">
                            {locale === 'en' ? 'Best value properties for holiday & rental income' : 'Tatil ve kira geliri için en iyi fiyatlı mülkler'}
                        </p>
                    </div>
                    <Link href="/emlak" className="hidden md:inline-flex items-center gap-2 text-[#2e3c3a] font-bold hover:underline">
                        {locale === 'en' ? 'View All Properties' : 'Tüm İlanları Gör'} <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.length > 0 ? (
                        properties.map((property: any) => (
                            <PropertyCard key={property.id} property={property} />
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-20 bg-white rounded-xl shadow-sm">
                            <p className="text-gray-500 text-lg">
                                {locale === 'en' ? 'Loading exclusive offers...' : 'Özel fırsatlar yükleniyor...'}
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="/emlak" className="inline-flex items-center gap-2 bg-[#2e3c3a] text-white px-6 py-3 rounded-lg font-bold">
                        {locale === 'en' ? 'View All Properties' : 'Tüm İlanları Gör'} <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-4 mb-20">
                <div className="bg-[#c5a265] rounded-3xl p-12 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-black text-[#2e3c3a] mb-6">
                            {locale === 'en' ? 'Can\'t find what you are looking for?' : 'Aradığınızı bulamadınız mı?'}
                        </h2>
                        <p className="text-[#2e3c3a]/80 text-lg mb-8 max-w-2xl mx-auto font-medium">
                            {locale === 'en'
                                ? 'We have off-market deals exclusive to our private clients. Tell us your criteria.'
                                : 'Portföyümüzde yer almayan özel fırsatlar için kriterlerinizi bize iletin.'}
                        </p>
                        <Link
                            href="/iletisim"
                            className="inline-block bg-[#2e3c3a] hover:bg-[#1a2524] text-white px-8 py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105 shadow-xl"
                        >
                            {locale === 'en' ? 'Contact Investment Expert' : 'Yatırım Uzmanı ile Görüşün'}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper icon component
function ArrowRight({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}
