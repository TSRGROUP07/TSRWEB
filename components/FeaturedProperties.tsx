"use client";

import { useState, useEffect, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import PropertyCard from "./PropertyCard";
import PropertyFilters, { FilterState } from "./PropertyFilters";

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  area: number;
  rooms: number;
  bathrooms: number;
  image?: string;
  type: string;
  verified: boolean;
  agentName?: string;
  agentPhoto?: string;
  agentPhone?: string;
  floor?: number;
  totalFloors?: number;
  buildingAge?: number;
  monthlyRent?: number;
  currency?: any;
}

import { useCurrency } from "@/contexts/CurrencyContext";

export default function FeaturedProperties() {
  const t = useTranslations('featuredProperties');
  const tCommon = useTranslations('common');
  const { currency: globalCurrency, convertAmount } = useCurrency();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
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
  });

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const response = await fetch(`/api/properties?t=${Date.now()}`);
        if (!response.ok) throw new Error(t('dataLoadError'));

        const data = await response.json();

        // Örnek ilanlar ekle (Not: In a real app, these should also come from a localized source or API)
        const sampleProperties: Property[] = [
          {
            id: 9991,
            title: t('sample1Title'),
            location: t('sample1Location'),
            price: 2500000,
            area: 350,
            rooms: 5,
            bathrooms: 4,
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
            type: tCommon('sale'),
            verified: true,
            floor: 1,
            totalFloors: 2,
            buildingAge: 2,
            agentName: "Ali Veli",
            agentPhone: "+90 555 111 2233",
          },
          {
            id: 9992,
            title: t('sample2Title'),
            location: t('sample2Location'),
            price: 850000,
            area: 120,
            rooms: 3,
            bathrooms: 2,
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
            type: tCommon('sale'),
            verified: true,
            floor: 5,
            totalFloors: 8,
            buildingAge: 5,
            agentName: "Fatma Yılmaz",
            agentPhone: "+90 555 222 3344",
          },
          {
            id: 9993,
            title: t('sample3Title'),
            location: t('sample3Location'),
            price: 1800000,
            area: 280,
            rooms: 4,
            bathrooms: 3,
            image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
            type: tCommon('sale'),
            verified: true,
            floor: 1,
            totalFloors: 2,
            buildingAge: 8,
            agentName: "Mehmet Özkan",
            agentPhone: "+90 555 333 4455",
          },
        ];

        const allProperties = [...data, ...sampleProperties];
        setProperties(allProperties.slice(0, 8)); // İlk 8 ilanı al (4 üstte, 4 altta)
      } catch (error) {
        console.error(t('errorLoading'), error);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, [t]);

  // Filter properties
  const filteredProperties = useMemo(() => {
    let filtered = [...properties];

    // Type filter
    if (filters.type) {
      filtered = filtered.filter((prop) => prop.type === filters.type);
    }

    // Price filters - Convert both filter and property price to TRY for comparison
    if (filters.minPrice !== "") {
      const minPriceInTRY = convertAmount(Number(filters.minPrice), globalCurrency);
      filtered = filtered.filter((prop) => {
        const propPriceInTRY = convertAmount(prop.price, (prop as any).currency || "EUR");
        return propPriceInTRY >= minPriceInTRY;
      });
    }
    if (filters.maxPrice !== "") {
      const maxPriceInTRY = convertAmount(Number(filters.maxPrice), globalCurrency);
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

    // Rooms filter - Unified logic
    if (filters.rooms !== "") {
      const roomVal = Number(filters.rooms);
      filtered = filtered.filter((prop) => {
        if (typeof prop.rooms === 'number') {
          return prop.rooms >= roomVal;
        }
        return parseInt(prop.rooms as string) >= roomVal;
      });
    }

    // Bathrooms filter
    if (filters.bathrooms !== "") {
      filtered = filtered.filter((prop) => prop.bathrooms >= Number(filters.bathrooms));
    }

    return filtered;
  }, [properties, filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden" style={{ background: '#b7b1ad' }}>
      {/* Modern Dekoratif arka plan elementleri */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-[#2e3c3a] to-[#2e3c3a] rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-gradient-to-br from-[#2e3c3a] to-[#2e3c3a] rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-6 gradient-text leading-tight">
            {t('title')}
          </h2>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <PropertyFilters onFilterChange={handleFilterChange} activeFilters={filters} />
        </div>

        {/* Results Count */}
        {!loading && (
          <div className="mb-6 text-black/80 text-center">
            {t('resultsFound', { count: filteredProperties.length })}
          </div>
        )}

        {/* İlanlar Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg border-2 border-[#2e3c3a]/20 h-64 animate-pulse"
              >
                <div className="h-40 bg-[#2e3c3a] rounded-t-xl"></div>
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-[#2e3c3a] rounded w-3/4"></div>
                  <div className="h-3 bg-[#2e3c3a] rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {filteredProperties.map((property, index) => (
                <div
                  key={property.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>

            {/* Tümünü Gör Butonu */}
            <div className="text-center animate-slide-up delay-500">
              <Link
                href="/emlak"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>{t('seeAll')}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-black text-lg">
              {filters.type || filters.minPrice || filters.maxPrice || filters.minArea || filters.maxArea || filters.rooms || filters.bathrooms
                ? t('noFilteredProperties')
                : t('noProperties')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

