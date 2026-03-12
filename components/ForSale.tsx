"use client";

import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Star } from "lucide-react";
import { useTranslations } from 'next-intl';

interface Property {
    id: number | string;
    title: string;
    location: string;
    price: number;
    area: number;
    rooms: number;
    bathrooms: number;
    image?: string;
    type: string;
    verified: boolean;
    coordinates?: { lat: number; lng: number };
    distanceToSea?: number;
}

interface ForSaleProps {
    initialProperties?: Property[];
}

export default function ForSale({ initialProperties = [] }: ForSaleProps) {
    const [properties, setProperties] = useState<Property[]>(initialProperties);
    const [loading, setLoading] = useState(initialProperties.length === 0);
    const t = useTranslations('forSale');

    useEffect(() => {
        if (initialProperties.length > 0) return; // Skip fetch if we have initial data

        let cancelled = false;

        const fetchProperties = async () => {
            try {
                console.log("🔍 [ForSale] Fetching properties from API...");
                const response = await fetch(`/api/properties`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // Client-side'da cache kontrolü için next: { revalidate: 60 } kullanılamaz
                    // Bunun yerine normal fetch yapıyoruz
                });

                console.log("📡 [ForSale] Response status:", response.status);

                if (response.ok) {
                    const data = await response.json();
                    console.log("✅ [ForSale] Properties fetched:", data?.length || 0, "items");

                    if (data && Array.isArray(data) && data.length > 0) {
                        console.log("📄 [ForSale] First property sample:", {
                            id: data[0].id,
                            title: data[0].title,
                            location: data[0].location,
                            price: data[0].price,
                            hasImage: !!data[0].image || !!(data[0].images && data[0].images.length > 0),
                            type: data[0].type
                        });
                    }

                    if (!cancelled) {
                        // Get first 4 properties for display
                        const firstFour = Array.isArray(data) ? data.slice(0, 4) : [];
                        console.log("📋 [ForSale] Setting properties:", firstFour.length, "items");

                        // Veri formatını kontrol et ve düzelt
                        const formattedProperties = firstFour.map((prop: any) => ({
                            ...prop, // CRITICAL: Preserve all original fields (including translations like title_en, description_ru)
                            id: prop.id,
                            title: prop.title || 'İlan Başlığı Yok',
                            location: prop.location || 'Konum Belirtilmemiş',
                            price: prop.price || 0,
                            area: prop.area || 0,
                            rooms: prop.rooms || 0,
                            bathrooms: prop.bathrooms || 0,
                            image: prop.image || (prop.images && prop.images.length > 0 ? prop.images[0] : undefined),
                            images: prop.images || [],
                            type: prop.type || prop.category || 'Satılık',
                            verified: prop.verified || false,
                            coordinates: prop.coordinates,
                            distanceToSea: prop.distanceToSea,
                            currency: prop.currency,
                            coverImage: prop.coverImage,
                            hasSeaView: prop.hasSeaView,
                            citizenshipSuitable: prop.citizenshipSuitable,
                            residencePermitSuitable: prop.residencePermitSuitable,
                            label: prop.label,
                            monthlyRent: prop.monthlyRent,
                            agentName: prop.agentName,
                            agentPhoto: prop.agentPhoto,
                            agentPhone: prop.agentPhone,
                            floor: prop.floor,
                            totalFloors: prop.totalFloors,
                            buildingAge: prop.buildingAge
                        }));

                        setProperties(formattedProperties);
                    }
                } else {
                    console.error("❌ [ForSale] Response not OK:", response.status, response.statusText);
                    const errorText = await response.text();
                    console.error("❌ [ForSale] Error response:", errorText);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error("❌ [ForSale] Failed to fetch properties:", error);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchProperties();

        return () => {
            cancelled = true;
        };
    }, []);

    if (loading) {
        return (
            <div className="relative py-20 px-6 lg:px-12 overflow-hidden" style={{ background: 'linear-gradient(135deg, #b7b1ad 0%, #a59d97 50%, #b7b1ad 100%)' }}>
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block animate-pulse">
                            <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#2e3c3a] via-[#EDC370] to-[#2e3c3a] bg-clip-text text-transparent mb-4">
                                {t('hotOffers')}
                            </h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-gradient-to-br from-white/80 to-white/40 rounded-2xl h-96 animate-pulse shadow-2xl" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative py-20 px-6 lg:px-12 overflow-hidden" style={{ background: 'linear-gradient(135deg, #b7b1ad 0%, #a59d97 50%, #b7b1ad 100%)' }}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-[#EDC370]/20 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-[#2e3c3a]/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#EDC370]/5 via-transparent to-[#2e3c3a]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="container mx-auto relative z-10 px-4 md:px-8 lg:px-16">
                {/* Header with Premium Design */}
                <div className="text-center mb-16 animate-fade-in">
                    {/* Badge - Now the main title */}
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EDC370] to-[#E5B85C] text-gray-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-base sm:text-lg mb-6 shadow-xl transform hover:scale-105 transition-all">
                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>{t('hotOffers')}</span>
                        <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>

                    <p className="text-lg sm:text-xl md:text-2xl text-[#2e3c3a] font-semibold mb-6 drop-shadow-lg">
                        {t('subtitle')}
                    </p>

                    {/* Decorative Line - Solid Yellow */}
                    <div className="relative w-48 h-2 mx-auto">
                        <div className="absolute inset-0 bg-[#EDC370] rounded-full" />
                    </div>
                </div>
            </div>

            {/* Properties Grid - 4 columns with stagger animation */}
            {properties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 px-4 md:px-8 lg:px-12">
                    {properties.map((property, index) => {
                        try {
                            return (
                                <div
                                    key={property.id}
                                    className="animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <PropertyCard property={property} priority={index < 4} />
                                </div>
                            );
                        } catch (error) {
                            console.error(`❌ [ForSale] Error rendering property ${property.id}:`, error);
                            return null;
                        }
                    })}
                </div>
            ) : (
                <div className="text-center py-12 mb-12">
                    <p className="text-lg text-[#2e3c3a] font-medium">
                        {t('noProperties')}
                    </p>
                    <p className="text-sm text-[#2e3c3a]/70 mt-2">
                        (API'den {properties.length} ilan alındı)
                    </p>
                </div>
            )}

            {/* View All Button - Solid Green */}
            <div className="text-center">
                <Link
                    href="/emlak"
                    className="inline-flex items-center gap-3 bg-[#2e3c3a] hover:bg-[#3a4d4a] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg shadow-2xl transition-all transform hover:scale-105"
                >
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>{t('exploreAll')}</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-gradient {
                    animation: gradient 3s ease infinite;
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
}
