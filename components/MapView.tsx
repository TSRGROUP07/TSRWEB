"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

interface CountryData {
  flag: string;
  name: string;
  nameEn: string;
  minPrice: string;
  maxPrice: string;
  avgRentalYield: string;
  popularCities: string[];
  advantages: string[];
}

interface Property {
  id: number | string;
  title: string;
  location: string;
  price: number;
  area: number;
  rooms: number | string;
  bathrooms: number;
  image?: string; // Optional - MapView will handle missing images
  type: string;
  propertyType?: string;
  verified: boolean;
  coordinates?: { lat: number; lng: number };
  countryData?: CountryData; // Ülke bilgileri (analitik harita için)
}

interface MapViewProps {
  properties: Property[];
  height?: string;
  onCountryClick?: (countryName: string) => void;
}

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const t = useTranslations('common');
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  },
});

export default function MapView({ properties, height = "100%", onCountryClick }: MapViewProps) {

  return <LeafletMap properties={properties} height={height} onCountryClick={onCountryClick} />;
}
