"use client";

import { useState, useMemo } from "react";
import { Search, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters, { FilterState } from "@/components/PropertyFilters";
import { debounce } from "@/lib/utils";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useTranslations } from 'next-intl';

// Lazy load MapView
const MapView = dynamic(() => import("@/components/MapView"), {
    ssr: false,
    loading: () => <div className="h-[600px] bg-gray-200 rounded-xl animate-pulse flex items-center justify-center"><p className="text-gray-500">Map Loading...</p></div>
});

interface Property {
    id: number | string;
    title: string;
    location: string;
    price: number;
    area: number;
    rooms: number | string;
    bathrooms: number;
    image?: string;
    images?: string[];
    type: string;
    propertyType?: string;
    furnishedStatus?: string;
    verified: boolean;
    coordinates?: { lat: number; lng: number };
    distanceToSea?: number;
    label?: string;
    citizenshipSuitable?: boolean;
    residencePermitSuitable?: boolean;
    hasSeaView?: boolean;
    usageStatus?: string;
    amenities?: {
        pool: boolean;
        indoorPool: boolean;
        sauna: boolean;
        steamRoom: boolean;
        fitness: boolean;
        parking: boolean;
        indoorParking: boolean;
        underfloorHeating: boolean;
        cinema: boolean;
        playground: boolean;
        turkishBath: boolean;
        massageRoom: boolean;
    };
}

interface EmlakClientProps {
    initialProperties: Property[];
    urlFilters?: Partial<FilterState>;
    urlSearchTerm?: string;
}

export default function EmlakClient({ initialProperties, urlFilters = {}, urlSearchTerm = "" }: EmlakClientProps) {
    const t = useTranslations('realEstatePage');
    const { currency, convertAmount } = useCurrency();
    const [searchTerm, setSearchTerm] = useState(urlSearchTerm);
    const [showMap, setShowMap] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        type: "",
        propertyType: "",
        minPrice: "",
        maxPrice: "",
        minArea: "",
        maxArea: "",
        rooms: "",
        bathrooms: "",
        furnitureStatus: "",
        activityStatus: "",
        propertyStatus: "",
        distanceToSea: "",
        propertyId: "",
        ...urlFilters
    });

    // Pagination state
    const [displayCount, setDisplayCount] = useState(12);

    // Debounced search
    const debouncedSearch = useMemo(
        () =>
            debounce((term: string) => {
                setSearchTerm(term);
                setDisplayCount(12); // Reset pagination on search
            }, 300),
        []
    );

    // Filter and search properties
    const filteredProperties = useMemo(() => {
        let filtered = [...initialProperties];

        // Search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (prop) =>
                    prop.title.toLowerCase().includes(term) ||
                    prop.location.toLowerCase().includes(term)
            );
        }

        // Type filter
        if (filters.type) {
            filtered = filtered.filter((prop) => prop.type === filters.type);
        }

        // Property Type filter
        if (filters.propertyType) {
            filtered = filtered.filter((prop) => prop.propertyType === filters.propertyType);
        }

        // Price filters
        if (filters.minPrice !== "") {
            const minPriceInTRY = convertAmount(Number(filters.minPrice), currency);
            filtered = filtered.filter((prop) => {
                const propPriceInTRY = convertAmount(prop.price, (prop as any).currency || "EUR");
                return propPriceInTRY >= minPriceInTRY;
            });
        }
        if (filters.maxPrice !== "") {
            const maxPriceInTRY = convertAmount(Number(filters.maxPrice), currency);
            filtered = filtered.filter((prop) => {
                const propPriceInTRY = convertAmount(prop.price, (prop as any).currency || "EUR");
                return propPriceInTRY <= maxPriceInTRY;
            });
        }

        // Area filters
        if (filters.minArea !== "") {
            filtered = filtered.filter((prop) => prop.area >= Number(filters.minArea));
        }
        if (filters.maxArea !== "") {
            filtered = filtered.filter((prop) => prop.area <= Number(filters.maxArea));
        }

        // Rooms filter
        if (filters.rooms !== "") {
            const filterRoomVal = Number(filters.rooms);
            filtered = filtered.filter((prop) => {
                const propRooms = prop.rooms;
                if (typeof propRooms === 'number') {
                    if (filterRoomVal === 6) return propRooms >= 6;
                    return propRooms === filterRoomVal;
                }
                if (typeof propRooms === 'string') {
                    if (propRooms === filters.rooms.toString()) return true;
                    if (filterRoomVal === 0 && propRooms === "Studio") return true;
                    const propRoomNum = parseInt(propRooms);
                    if (filterRoomVal === 6) return propRoomNum >= 6;
                    return propRoomNum === filterRoomVal;
                }
                return false;
            });
        }

        // Furniture status filter
        if (filters.furnitureStatus) {
            filtered = filtered.filter((prop) => prop.furnishedStatus === filters.furnitureStatus);
        }

        // Activity Status Filter
        if (filters.activityStatus) {
            filtered = filtered.filter((prop) => {
                const a: any = prop.amenities || {};
                const hasActivity = a.pool || a.indoorPool || a.fitness || a.sauna || a.turkishBath || a.cinema || a.playground || a.massageRoom || a.steamRoom;
                if (filters.activityStatus === "full_activity") return hasActivity;
                if (filters.activityStatus === "no_activity") return !hasActivity;
                return true;
            });
        }

        // Property Status Filter
        if (filters.propertyStatus) {
            filtered = filtered.filter((prop) => {
                if (!prop.usageStatus) return false;
                if (filters.propertyStatus === "under_construction") return prop.usageStatus === "Yapım Aşamasında";
                if (filters.propertyStatus === "future_delivery") return prop.usageStatus === "Yakında Teslim";
                if (filters.propertyStatus === "ready") return prop.usageStatus === "Sıfır" || prop.usageStatus === "İkinci El";
                return true;
            });
        }

        // Bathrooms filter
        if (filters.bathrooms !== "") {
            filtered = filtered.filter((prop) => prop.bathrooms >= Number(filters.bathrooms));
        }

        // Distance to sea filter
        if (filters.distanceToSea !== "") {
            const distanceRange = filters.distanceToSea;
            filtered = filtered.filter((prop) => {
                if (!prop.distanceToSea) return false;
                if (distanceRange === "0-100") return prop.distanceToSea <= 100;
                else if (distanceRange === "100-300") return prop.distanceToSea > 100 && prop.distanceToSea <= 300;
                else if (distanceRange === "300-500") return prop.distanceToSea > 300 && prop.distanceToSea <= 500;
                else if (distanceRange === "500+") return prop.distanceToSea > 500;
                return true;
            });
        }

        // Property ID filter
        if (filters.propertyId) {
            filtered = filtered.filter((prop) =>
                prop.id.toString().includes(filters.propertyId)
            );
        }

        return filtered;
    }, [initialProperties, searchTerm, filters, currency, convertAmount]);

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
        setDisplayCount(12); // Reset pagination on filter change
    };

    const handleLoadMore = () => {
        setDisplayCount((prev) => prev + 12);
    };

    const displayedProperties = filteredProperties.slice(0, displayCount);

    const handleSearch = () => {
        const searchBar = document.getElementById("search-bar");
        if (searchBar) {
            searchBar.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 pb-12">
            {/* Search Bar */}
            <div id="search-bar" className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] border border-[#2e3c3a] rounded-xl shadow-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            onChange={(e) => debouncedSearch(e.target.value)}
                            defaultValue={urlSearchTerm}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white placeholder-white/50"
                        />
                    </div>
                    <button
                        onClick={() => setShowMap(!showMap)}
                        className="px-6 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 whitespace-nowrap"
                    >
                        <MapPin className="h-5 w-5" />
                        <span>{showMap ? t('listView') : t('mapView')}</span>
                    </button>
                </div>
            </div>

            {/* Filters */}
            <PropertyFilters onFilterChange={handleFilterChange} activeFilters={filters} />

            {/* Results Count */}
            <div className="mb-6 text-white/80">
                <span className="font-semibold text-white">{filteredProperties.length}</span> {t('resultsFound')}
            </div>

            {/* Map or List View */}
            {showMap ? (
                <div className="h-[600px] rounded-xl overflow-hidden shadow-lg relative z-10">
                    <MapView properties={filteredProperties} height="600px" />
                </div>
            ) : (
                <>
                    {filteredProperties.length === 0 ? (
                        <div id="properties-grid" className="text-center py-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg">
                            <p className="text-white/80 text-lg">
                                {searchTerm ? t('noResults') : t('noListings')}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div id="properties-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                {displayedProperties.map((property, index) => (
                                    <PropertyCard key={property.id} property={property} priority={index < 8} />
                                ))}
                            </div>

                            {/* Load More Button */}
                            {filteredProperties.length > displayCount && (
                                <div className="flex justify-center pt-4">
                                    <button
                                        onClick={handleLoadMore}
                                        className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                                    >
                                        {t('loadMore')} ({filteredProperties.length - displayCount} {t('listingsRemaining')})
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
