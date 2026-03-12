"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { MapPin, TrendingUp, DollarSign, Home, Building2, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Lazy load MapView - Leaflet (client-side only)
const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => <div className="h-[600px] bg-gray-200 rounded-xl animate-pulse flex items-center justify-center"><p className="text-gray-500">Harita yükleniyor...</p></div>
});

interface CountryData {
  name: string;
  nameEn: string;
  flag: string;
  flagCode: string;
  lat: number;
  lng: number;
  minPrice: string;
  maxPrice: string;
  avgRentalYield: string;
  popularCities: string[];
  advantages: string[];
  data?: {
    neighbor: string;
    housing: string;
    price: string;
    rentalProfit: string;
    percentage: string;
  }[];
}

export default function AnalitikHaritaPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>("Türkiye");

  const countries: CountryData[] = [
    {
      name: "Türkiye",
      nameEn: "Turkey",
      flag: "🇹🇷",
      flagCode: "tr",
      lat: 36.5437,
      lng: 31.9998,
      minPrice: "$50,000",
      maxPrice: "$500,000",
      avgRentalYield: "8.5%",
      popularCities: ["Alanya", "Antalya", "İstanbul", "Bodrum", "Fethiye"],
      advantages: ["Yüksek kira getirisi", "Turizm potansiyeli", "Vatandaşlık imkanı", "Düşük yaşam maliyeti"],
      data: [
        { neighbor: "Şehir merkezi", housing: "1+1", price: "$94,746", rentalProfit: "$693", percentage: "8.8%" },
        { neighbor: "Şehir merkezi", housing: "3+1", price: "$208,440", rentalProfit: "$1,073", percentage: "6.2%" },
        { neighbor: "Şehir dışında", housing: "1+1", price: "$94,746", rentalProfit: "$693", percentage: "8.8%" },
        { neighbor: "Şehir dışında", housing: "3+1", price: "$208,440", rentalProfit: "$1,073", percentage: "6.2%" },
      ]
    },
    {
      name: "İspanya",
      nameEn: "Spain",
      flag: "🇪🇸",
      flagCode: "es",
      lat: 40.4637,
      lng: -3.7492,
      minPrice: "$80,000",
      maxPrice: "$400,000",
      avgRentalYield: "6.2%",
      popularCities: ["Barcelona", "Madrid", "Valencia", "Marbella", "Alicante"],
      advantages: ["AB üyeliği", "Güçlü turizm", "İyi altyapı", "Sağlık sistemi"],
      data: [
        { neighbor: "Barcelona", housing: "1+1", price: "$150,000", rentalProfit: "$900", percentage: "7.2%" },
        { neighbor: "Barcelona", housing: "3+1", price: "$300,000", rentalProfit: "$1,800", percentage: "7.2%" },
        { neighbor: "Madrid", housing: "1+1", price: "$140,000", rentalProfit: "$850", percentage: "7.3%" },
        { neighbor: "Madrid", housing: "3+1", price: "$280,000", rentalProfit: "$1,700", percentage: "7.3%" },
      ]
    },
    {
      name: "Portekiz",
      nameEn: "Portugal",
      flag: "🇵🇹",
      flagCode: "pt",
      lat: 39.3999,
      lng: -8.2245,
      minPrice: "$100,000",
      maxPrice: "$600,000",
      avgRentalYield: "5.8%",
      popularCities: ["Lizbon", "Porto", "Algarve", "Cascais", "Faro"],
      advantages: ["Altın Vize programı", "Düşük vergi", "Güvenli ülke", "İyi iklim"],
      data: [
        { neighbor: "Lizbon", housing: "1+1", price: "$180,000", rentalProfit: "$1,000", percentage: "6.7%" },
        { neighbor: "Lizbon", housing: "3+1", price: "$400,000", rentalProfit: "$2,200", percentage: "6.6%" },
        { neighbor: "Algarve", housing: "1+1", price: "$120,000", rentalProfit: "$700", percentage: "7.0%" },
        { neighbor: "Algarve", housing: "3+1", price: "$350,000", rentalProfit: "$2,000", percentage: "6.9%" },
      ]
    },
    {
      name: "Yunanistan",
      nameEn: "Greece",
      flag: "🇬🇷",
      flagCode: "gr",
      lat: 39.0742,
      lng: 21.8243,
      minPrice: "$60,000",
      maxPrice: "$350,000",
      avgRentalYield: "7.0%",
      popularCities: ["Atina", "Selanik", "Mykonos", "Santorini", "Kreta"],
      advantages: ["AB üyeliği", "Tarihi değer", "Turizm", "Deniz manzarası"],
      data: [
        { neighbor: "Atina", housing: "1+1", price: "$90,000", rentalProfit: "$600", percentage: "8.0%" },
        { neighbor: "Atina", housing: "3+1", price: "$200,000", rentalProfit: "$1,400", percentage: "8.4%" },
        { neighbor: "Santorini", housing: "1+1", price: "$150,000", rentalProfit: "$1,200", percentage: "9.6%" },
        { neighbor: "Santorini", housing: "3+1", price: "$350,000", rentalProfit: "$3,000", percentage: "10.3%" },
      ]
    },
    {
      name: "İtalya",
      nameEn: "Italy",
      flag: "🇮🇹",
      flagCode: "it",
      lat: 41.8719,
      lng: 12.5674,
      minPrice: "$120,000",
      maxPrice: "$800,000",
      avgRentalYield: "5.5%",
      popularCities: ["Roma", "Milano", "Floransa", "Venedik", "Sicilya"],
      advantages: ["Kültürel miras", "AB üyeliği", "Lüks segment", "Tarihi değer"],
      data: [
        { neighbor: "Roma", housing: "1+1", price: "$200,000", rentalProfit: "$1,100", percentage: "6.6%" },
        { neighbor: "Roma", housing: "3+1", price: "$450,000", rentalProfit: "$2,500", percentage: "6.7%" },
        { neighbor: "Milano", housing: "1+1", price: "$250,000", rentalProfit: "$1,400", percentage: "6.7%" },
        { neighbor: "Milano", housing: "3+1", price: "$600,000", rentalProfit: "$3,300", percentage: "6.6%" },
      ]
    },
    {
      name: "Fransa",
      nameEn: "France",
      flag: "🇫🇷",
      flagCode: "fr",
      lat: 46.2276,
      lng: 2.2137,
      minPrice: "$150,000",
      maxPrice: "$1,000,000",
      avgRentalYield: "4.5%",
      popularCities: ["Paris", "Nice", "Cannes", "Lyon", "Marseille"],
      advantages: ["Prestijli lokasyon", "AB üyeliği", "Güçlü ekonomi", "Kültürel zenginlik"],
      data: [
        { neighbor: "Paris", housing: "1+1", price: "$300,000", rentalProfit: "$1,350", percentage: "5.4%" },
        { neighbor: "Paris", housing: "3+1", price: "$800,000", rentalProfit: "$3,600", percentage: "5.4%" },
        { neighbor: "Nice", housing: "1+1", price: "$200,000", rentalProfit: "$900", percentage: "5.4%" },
        { neighbor: "Nice", housing: "3+1", price: "$500,000", rentalProfit: "$2,250", percentage: "5.4%" },
      ]
    },
    {
      name: "Almanya",
      nameEn: "Germany",
      flag: "🇩🇪",
      flagCode: "de",
      lat: 51.1657,
      lng: 10.4515,
      minPrice: "$200,000",
      maxPrice: "$1,200,000",
      avgRentalYield: "4.0%",
      popularCities: ["Berlin", "Münih", "Hamburg", "Frankfurt", "Köln"],
      advantages: ["Güçlü ekonomi", "AB üyeliği", "İstikrarlı piyasa", "Yüksek yaşam kalitesi"],
      data: [
        { neighbor: "Berlin", housing: "1+1", price: "$250,000", rentalProfit: "$1,000", percentage: "4.8%" },
        { neighbor: "Berlin", housing: "3+1", price: "$600,000", rentalProfit: "$2,400", percentage: "4.8%" },
        { neighbor: "Münih", housing: "1+1", price: "$350,000", rentalProfit: "$1,400", percentage: "4.8%" },
        { neighbor: "Münih", housing: "3+1", price: "$900,000", rentalProfit: "$3,600", percentage: "4.8%" },
      ]
    },
    {
      name: "Birleşik Krallık",
      nameEn: "United Kingdom",
      flag: "🇬🇧",
      flagCode: "gb",
      lat: 55.3781,
      lng: -3.4360,
      minPrice: "$250,000",
      maxPrice: "$2,000,000",
      avgRentalYield: "5.2%",
      popularCities: ["Londra", "Manchester", "Birmingham", "Edinburgh", "Liverpool"],
      advantages: ["Güçlü para birimi", "Prestijli lokasyon", "Yüksek değer artışı", "Gelişmiş piyasa"],
      data: [
        { neighbor: "Londra", housing: "1+1", price: "$400,000", rentalProfit: "$2,000", percentage: "6.0%" },
        { neighbor: "Londra", housing: "3+1", price: "$1,200,000", rentalProfit: "$6,000", percentage: "6.0%" },
        { neighbor: "Manchester", housing: "1+1", price: "$180,000", rentalProfit: "$900", percentage: "6.0%" },
        { neighbor: "Manchester", housing: "3+1", price: "$350,000", rentalProfit: "$1,750", percentage: "6.0%" },
      ]
    },
    {
      name: "ABD",
      nameEn: "United States",
      flag: "🇺🇸",
      flagCode: "us",
      lat: 37.0902,
      lng: -95.7129,
      minPrice: "$150,000",
      maxPrice: "$1,500,000",
      avgRentalYield: "6.5%",
      popularCities: ["Miami", "Orlando", "Las Vegas", "Phoenix", "Tampa"],
      advantages: ["Büyük piyasa", "Yüksek likidite", "Diversifikasyon", "Güçlü dolar"],
      data: [
        { neighbor: "Miami", housing: "1+1", price: "$200,000", rentalProfit: "$1,300", percentage: "7.8%" },
        { neighbor: "Miami", housing: "3+1", price: "$500,000", rentalProfit: "$3,250", percentage: "7.8%" },
        { neighbor: "Orlando", housing: "1+1", price: "$150,000", rentalProfit: "$975", percentage: "7.8%" },
        { neighbor: "Orlando", housing: "3+1", price: "$350,000", rentalProfit: "$2,275", percentage: "7.8%" },
      ]
    },
    {
      name: "Kanada",
      nameEn: "Canada",
      flag: "🇨🇦",
      flagCode: "ca",
      lat: 56.1304,
      lng: -106.3468,
      minPrice: "$180,000",
      maxPrice: "$800,000",
      avgRentalYield: "5.8%",
      popularCities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
      advantages: ["Güvenli ülke", "Yüksek yaşam kalitesi", "İstikrarlı ekonomi", "Göçmen dostu"],
      data: [
        { neighbor: "Toronto", housing: "1+1", price: "$300,000", rentalProfit: "$1,740", percentage: "7.0%" },
        { neighbor: "Toronto", housing: "3+1", price: "$700,000", rentalProfit: "$4,060", percentage: "7.0%" },
        { neighbor: "Vancouver", housing: "1+1", price: "$400,000", rentalProfit: "$2,320", percentage: "7.0%" },
        { neighbor: "Vancouver", housing: "3+1", price: "$800,000", rentalProfit: "$4,640", percentage: "7.0%" },
      ]
    },
    {
      name: "Birleşik Arap Emirlikleri",
      nameEn: "United Arab Emirates",
      flag: "🇦🇪",
      flagCode: "ae",
      lat: 23.4241,
      lng: 53.8478,
      minPrice: "$200,000",
      maxPrice: "$3,000,000",
      avgRentalYield: "7.5%",
      popularCities: ["Dubai", "Abu Dhabi", "Sharjah", "Ras Al Khaimah", "Ajman"],
      advantages: ["Vergi avantajı", "Lüks segment", "Yüksek getiri", "Modern altyapı"],
      data: [
        { neighbor: "Dubai", housing: "1+1", price: "$300,000", rentalProfit: "$2,250", percentage: "9.0%" },
        { neighbor: "Dubai", housing: "3+1", price: "$800,000", rentalProfit: "$6,000", percentage: "9.0%" },
        { neighbor: "Abu Dhabi", housing: "1+1", price: "$250,000", rentalProfit: "$1,875", percentage: "9.0%" },
        { neighbor: "Abu Dhabi", housing: "3+1", price: "$700,000", rentalProfit: "$5,250", percentage: "9.0%" },
      ]
    },
    {
      name: "Bulgaristan",
      nameEn: "Bulgaria",
      flag: "🇧🇬",
      flagCode: "bg",
      lat: 42.7339,
      lng: 25.4858,
      minPrice: "$30,000",
      maxPrice: "$200,000",
      avgRentalYield: "9.0%",
      popularCities: ["Sofya", "Varna", "Burgas", "Plovdiv", "Nesebar"],
      advantages: ["Düşük fiyat", "Yüksek getiri", "AB üyeliği", "Hızlı vatandaşlık"],
      data: [
        { neighbor: "Sofya", housing: "1+1", price: "$50,000", rentalProfit: "$450", percentage: "10.8%" },
        { neighbor: "Sofya", housing: "3+1", price: "$120,000", rentalProfit: "$1,080", percentage: "10.8%" },
        { neighbor: "Varna", housing: "1+1", price: "$40,000", rentalProfit: "$360", percentage: "10.8%" },
        { neighbor: "Varna", housing: "3+1", price: "$100,000", rentalProfit: "$900", percentage: "10.8%" },
      ]
    },
  ];

  const selectedCountryData = countries.find(c => c.name === selectedCountry) || countries[0];

  return (
    <div className="min-h-screen bg-[#b7b1ad]">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&q=90"
            alt="Analitik Harita"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2e3c3a]/90 via-[#3a4d4a]/80 to-[#2e3c3a]/90"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl px-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight drop-shadow-2xl">
              Analitik Haritamızdan Yararlanın
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Yatırım için gayrimenkul seçin ve avantajlı konumları keşfedin
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg font-semibold transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Ana Sayfaya Dön</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-12">
        {/* Ülke Seçici */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#2e3c3a] mb-4">Avantajlı Ülkeler</h2>
          <div className="flex flex-wrap gap-3">
            {countries.map((country) => (
              <button
                key={country.name}
                onClick={() => setSelectedCountry(country.name)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${selectedCountry === country.name
                    ? "bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white shadow-lg"
                    : "bg-white/90 text-[#2e3c3a] hover:bg-white shadow-md hover:shadow-lg"
                  }`}
              >
                {country.name}
              </button>
            ))}
          </div>
        </div>

        {/* Harita ve Bilgi Tablosu */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Harita - 2/3 genişlik */}
          <div className="lg:col-span-2 relative rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 bg-white">
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
                onCountryClick={setSelectedCountry}
              />
            </div>
          </div>

          {/* Ülke Bilgi Paneli - 1/3 genişlik */}
          <div className="bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-xl p-6 shadow-xl border-2 border-white/10">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/20">
              {selectedCountryData.flagCode && (
                <img
                  src={`https://flagcdn.com/w40/${selectedCountryData.flagCode.toLowerCase()}.png`}
                  alt={selectedCountryData.name}
                  className="w-10 h-7 object-cover rounded border border-white/20"
                />
              )}
              <h3 className="text-2xl font-bold text-white">
                {selectedCountryData.name}
              </h3>
            </div>

            {/* Fiyat Aralığı */}
            <div className="mb-6 space-y-4">
              <div>
                <div className="text-white/70 text-sm mb-1">Fiyat Aralığı</div>
                <div className="text-white font-semibold text-lg">
                  {selectedCountryData.minPrice} - {selectedCountryData.maxPrice}
                </div>
              </div>

              <div>
                <div className="text-white/70 text-sm mb-1">Ortalama Kira Getirisi</div>
                <div className="text-green-400 font-bold text-xl">
                  {selectedCountryData.avgRentalYield}
                </div>
              </div>
            </div>

            {/* Popüler Şehirler */}
            <div className="mb-6">
              <div className="text-white/70 text-sm mb-3">Popüler Şehirler</div>
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
            <div className="mb-6">
              <div className="text-white/70 text-sm mb-3">Avantajlar</div>
              <ul className="space-y-2">
                {selectedCountryData.advantages.map((advantage, index) => (
                  <li key={index} className="flex items-start gap-2 text-white/90 text-sm">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Detaylı Fiyat Tablosu */}
            {selectedCountryData.data && selectedCountryData.data.length > 0 && (
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="text-white/70 text-sm mb-3">Detaylı Fiyat Analizi</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-2 px-1 text-white/90 font-semibold">Bölge</th>
                        <th className="text-left py-2 px-1 text-white/90 font-semibold">Konut</th>
                        <th className="text-right py-2 px-1 text-white/90 font-semibold">Fiyat</th>
                        <th className="text-right py-2 px-1 text-white/90 font-semibold">Kâr</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/80">
                      {selectedCountryData.data.map((row, index) => (
                        <tr key={index} className={index < selectedCountryData.data!.length - 1 ? "border-b border-white/10" : ""}>
                          {index === 0 || (index > 0 && selectedCountryData.data![index - 1].neighbor !== row.neighbor) ? (
                            <td className="py-2 px-1" rowSpan={selectedCountryData.data!.filter(d => d.neighbor === row.neighbor).length}>
                              {row.neighbor}
                            </td>
                          ) : null}
                          <td className="py-2 px-1">{row.housing}</td>
                          <td className="py-2 px-1 text-right">{row.price}</td>
                          <td className="py-2 px-1 text-right">
                            <div>{row.rentalProfit}</div>
                            <div className="text-green-400">{row.percentage}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#4f271b] rounded-xl p-6 shadow-xl border-2 border-white/10">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">8.5%</div>
                <div className="text-white/80 text-sm">Ortalama Kira Getirisi</div>
              </div>
            </div>
          </div>
          <div className="bg-[#4f271b] rounded-xl p-6 shadow-xl border-2 border-white/10">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-lg">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">15+</div>
                <div className="text-white/80 text-sm">Avantajlı Konum</div>
              </div>
            </div>
          </div>
          <div className="bg-[#4f271b] rounded-xl p-6 shadow-xl border-2 border-white/10">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-lg">
                <Home className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-white/80 text-sm">Analiz Edilen Mülk</div>
              </div>
            </div>
          </div>
        </div>

        {/* Açıklama */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-4">Yatırım Stratejisi</h3>
          <p className="text-white/90 leading-relaxed mb-4">
            Analitik haritamız, Türkiye'nin en avantajlı yatırım lokasyonlarını detaylı verilerle sunar. Her konum için fiyat analizi, kira getirisi ve yatırım potansiyeli hakkında güncel bilgiler sağlıyoruz.
          </p>
          <p className="text-white/90 leading-relaxed">
            Yatırım kararlarınızı veriye dayalı olarak alın ve en yüksek getiriyi elde edin. Uzman ekibimiz, size en uygun lokasyonu bulmanızda yardımcı olmak için hazır.
          </p>
        </div>
      </div>
    </div>
  );
}
