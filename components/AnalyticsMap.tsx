"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { useTranslations } from 'next-intl';

// Lazy load MapView - Leaflet (client-side only)
const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => <div className="h-[500px] bg-gray-200 rounded-xl animate-pulse flex items-center justify-center"><p className="text-gray-500">Loading map...</p></div>
});

interface CountryData {
  id: string;
  name: string;
  nameEn: string;
  flag: string; // Bayrak emoji (fallback için)
  flagCode: string; // ISO ülke kodu (bayrak görseli için)
  lat: number;
  lng: number;
  minPrice: string;
  maxPrice: string;
  avgRentalYield: string;
  popularCities: string[];
  advantages: string[];
}

export default function AnalyticsMap() {
  const t = useTranslations('analyticsMap');
  const [selectedCountryId, setSelectedCountryId] = useState<string>("tr");

  // 10+ Büyük Ülke Verileri
  const countries: CountryData[] = [
    {
      id: "tr",
      name: t('countries.tr.name'),
      nameEn: "Turkey",
      flag: "🇹🇷",
      flagCode: "tr",
      lat: 36.5437,
      lng: 31.9998,
      minPrice: "$50,000",
      maxPrice: "$500,000",
      avgRentalYield: "8.5%",
      popularCities: [t('countries.tr.city1'), t('countries.tr.city2'), t('countries.tr.city3'), t('countries.tr.city4'), t('countries.tr.city5')],
      advantages: [t('countries.tr.adv1'), t('countries.tr.adv2'), t('countries.tr.adv3'), t('countries.tr.adv4')]
    },
    {
      id: "es",
      name: t('countries.es.name'),
      nameEn: "Spain",
      flag: "🇪🇸",
      flagCode: "es",
      lat: 40.4637,
      lng: -3.7492,
      minPrice: "$80,000",
      maxPrice: "$400,000",
      avgRentalYield: "6.2%",
      popularCities: [t('countries.es.city1'), t('countries.es.city2'), t('countries.es.city3'), t('countries.es.city4'), t('countries.es.city5')],
      advantages: [t('countries.es.adv1'), t('countries.es.adv2'), t('countries.es.adv3'), t('countries.es.adv4')]
    },
    {
      id: "pt",
      name: t('countries.pt.name'),
      nameEn: "Portugal",
      flag: "🇵🇹",
      flagCode: "pt",
      lat: 39.3999,
      lng: -8.2245,
      minPrice: "$100,000",
      maxPrice: "$600,000",
      avgRentalYield: "5.8%",
      popularCities: [t('countries.pt.city1'), t('countries.pt.city2'), t('countries.pt.city3'), t('countries.pt.city4'), t('countries.pt.city5')],
      advantages: [t('countries.pt.adv1'), t('countries.pt.adv2'), t('countries.pt.adv3'), t('countries.pt.adv4')]
    },
    {
      id: "gr",
      name: t('countries.gr.name'),
      nameEn: "Greece",
      flag: "🇬🇷",
      flagCode: "gr",
      lat: 39.0742,
      lng: 21.8243,
      minPrice: "$60,000",
      maxPrice: "$350,000",
      avgRentalYield: "7.0%",
      popularCities: [t('countries.gr.city1'), t('countries.gr.city2'), t('countries.gr.city3'), t('countries.gr.city4'), t('countries.gr.city5')],
      advantages: [t('countries.gr.adv1'), t('countries.gr.adv2'), t('countries.gr.adv3'), t('countries.gr.adv4')]
    },
    {
      id: "it",
      name: t('countries.it.name'),
      nameEn: "Italy",
      flag: "🇮🇹",
      flagCode: "it",
      lat: 41.8719,
      lng: 12.5674,
      minPrice: "$120,000",
      maxPrice: "$800,000",
      avgRentalYield: "5.5%",
      popularCities: [t('countries.it.city1'), t('countries.it.city2'), t('countries.it.city3'), t('countries.it.city4'), t('countries.it.city5')],
      advantages: [t('countries.it.adv1'), t('countries.it.adv2'), t('countries.it.adv3'), t('countries.it.adv4')]
    },
    {
      id: "fr",
      name: t('countries.fr.name'),
      nameEn: "France",
      flag: "🇫🇷",
      flagCode: "fr",
      lat: 46.2276,
      lng: 2.2137,
      minPrice: "$150,000",
      maxPrice: "$1,000,000",
      avgRentalYield: "4.5%",
      popularCities: [t('countries.fr.city1'), t('countries.fr.city2'), t('countries.fr.city3'), t('countries.fr.city4'), t('countries.fr.city5')],
      advantages: [t('countries.fr.adv1'), t('countries.fr.adv2'), t('countries.fr.adv3'), t('countries.fr.adv4')]
    },
    {
      id: "de",
      name: t('countries.de.name'),
      nameEn: "Germany",
      flag: "🇩🇪",
      flagCode: "de",
      lat: 51.1657,
      lng: 10.4515,
      minPrice: "$200,000",
      maxPrice: "$1,200,000",
      avgRentalYield: "4.0%",
      popularCities: [t('countries.de.city1'), t('countries.de.city2'), t('countries.de.city3'), t('countries.de.city4'), t('countries.de.city5')],
      advantages: [t('countries.de.adv1'), t('countries.de.adv2'), t('countries.de.adv3'), t('countries.de.adv4')]
    },
    {
      id: "gb",
      name: t('countries.gb.name'),
      nameEn: "United Kingdom",
      flag: "🇬🇧",
      flagCode: "gb",
      lat: 55.3781,
      lng: -3.4360,
      minPrice: "$250,000",
      maxPrice: "$2,000,000",
      avgRentalYield: "5.2%",
      popularCities: [t('countries.gb.city1'), t('countries.gb.city2'), t('countries.gb.city3'), t('countries.gb.city4'), t('countries.gb.city5')],
      advantages: [t('countries.gb.adv1'), t('countries.gb.adv2'), t('countries.gb.adv3'), t('countries.gb.adv4')]
    },
    {
      id: "us",
      name: t('countries.us.name'),
      nameEn: "United States",
      flag: "🇺🇸",
      flagCode: "us",
      lat: 37.0902,
      lng: -95.7129,
      minPrice: "$150,000",
      maxPrice: "$1,500,000",
      avgRentalYield: "6.5%",
      popularCities: [t('countries.us.city1'), t('countries.us.city2'), t('countries.us.city3'), t('countries.us.city4'), t('countries.us.city5')],
      advantages: [t('countries.us.adv1'), t('countries.us.adv2'), t('countries.us.adv3'), t('countries.us.adv4')]
    },
    {
      id: "ca",
      name: t('countries.ca.name'),
      nameEn: "Canada",
      flag: "🇨🇦",
      flagCode: "ca",
      lat: 56.1304,
      lng: -106.3468,
      minPrice: "$180,000",
      maxPrice: "$800,000",
      avgRentalYield: "5.8%",
      popularCities: [t('countries.ca.city1'), t('countries.ca.city2'), t('countries.ca.city3'), t('countries.ca.city4'), t('countries.ca.city5')],
      advantages: [t('countries.ca.adv1'), t('countries.ca.adv2'), t('countries.ca.adv3'), t('countries.ca.adv4')]
    },
    {
      id: "ae",
      name: t('countries.ae.name'),
      nameEn: "United Arab Emirates",
      flag: "🇦🇪",
      flagCode: "ae",
      lat: 23.4241,
      lng: 53.8478,
      minPrice: "$200,000",
      maxPrice: "$3,000,000",
      avgRentalYield: "7.5%",
      popularCities: [t('countries.ae.city1'), t('countries.ae.city2'), t('countries.ae.city3'), t('countries.ae.city4'), t('countries.ae.city5')],
      advantages: [t('countries.ae.adv1'), t('countries.ae.adv2'), t('countries.ae.adv3'), t('countries.ae.adv4')]
    },
    {
      id: "bg",
      name: t('countries.bg.name'),
      nameEn: "Bulgaria",
      flag: "🇧🇬",
      flagCode: "bg",
      lat: 42.7339,
      lng: 25.4858,
      minPrice: "$30,000",
      maxPrice: "$200,000",
      avgRentalYield: "9.0%",
      popularCities: [t('countries.bg.city1'), t('countries.bg.city2'), t('countries.bg.city3'), t('countries.bg.city4'), t('countries.bg.city5')],
      advantages: [t('countries.bg.adv1'), t('countries.bg.adv2'), t('countries.bg.adv3'), t('countries.bg.adv4')]
    },
  ];

  const selectedCountryData = countries.find(c => c.id === selectedCountryId) || countries[0];

  return (
    <section className="relative py-20 lg:py-32" style={{ background: '#b7b1ad' }}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Başlık */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#2e3c3a] leading-tight">
              {t('title')}
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Harita ve Bilgi Paneli */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Harita - 2/3 genişlik */}
            <div className="lg:col-span-2 relative rounded-xl overflow-hidden shadow-2xl border-2 border-white/20">
              <div className="h-[500px] lg:h-[600px] relative">
                <MapView
                  properties={countries.map((country, index) => ({
                    id: index + 1000, // Unique number ID
                    title: country.name,
                    location: country.name,
                    price: 0,
                    area: 0,
                    rooms: 0,
                    bathrooms: 0,
                    image: "/eviconu.png", // Default image
                    type: "sale",
                    verified: true,
                    coordinates: { lat: country.lat, lng: country.lng },
                    // Ülke bilgilerini ekle
                    countryData: {
                      flag: country.flag,
                      flagCode: country.flagCode,
                      name: country.name,
                      nameEn: country.nameEn,
                      minPrice: country.minPrice,
                      maxPrice: country.maxPrice,
                      avgRentalYield: country.avgRentalYield,
                      popularCities: country.popularCities,
                      advantages: country.advantages,
                    },
                  }))}
                  height="100%"
                  onCountryClick={(countryName) => {
                    const country = countries.find(c => c.name === countryName);
                    if (country) {
                      setSelectedCountryId(country.id);
                    }
                  }}
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2e3c3a]/20 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Ülke Bilgi Paneli - 1/3 genişlik */}
            <div className="rounded-xl p-6 shadow-xl" style={{ backgroundColor: '#2e3c3a' }}>
              <h3 className="text-2xl font-bold text-white mb-4 pb-3 border-b border-white/20">
                {selectedCountryData.name}
              </h3>

              {/* Fiyat Aralığı */}
              <div className="mb-6 space-y-4">
                <div>
                  <div className="text-white/70 text-sm mb-1">{t('priceRange')}</div>
                  <div className="text-white font-semibold text-lg">
                    {selectedCountryData.minPrice} - {selectedCountryData.maxPrice}
                  </div>
                </div>

                <div>
                  <div className="text-white/70 text-sm mb-1">{t('avgRentalYield')}</div>
                  <div className="text-green-400 font-bold text-xl">
                    {selectedCountryData.avgRentalYield}
                  </div>
                </div>
              </div>

              {/* Popüler Şehirler */}
              <div className="mb-6">
                <div className="text-white/70 text-sm mb-3">{t('popularCities')}</div>
                <div className="flex flex-wrap gap-2">
                  {selectedCountryData.popularCities.map((city, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/20 rounded-lg text-white text-xs font-medium"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>

              {/* Avantajlar */}
              <div>
                <div className="text-white/70 text-sm mb-3">{t('advantages')}</div>
                <ul className="space-y-2">
                  {selectedCountryData.advantages.map((advantage, index) => (
                    <li key={index} className="flex items-start gap-2 text-white/90 text-sm">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Devamını Gör Butonu */}
          <div className="text-center">
            <Link
              href="/analitik-harita"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 group"
            >
              <MapPin className="h-5 w-5" />
              <span>{t('seeMore')}</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
