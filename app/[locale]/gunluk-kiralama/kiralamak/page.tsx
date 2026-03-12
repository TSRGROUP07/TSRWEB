"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, MapPin, ChevronDown, Home, Users, Wifi, Car, Instagram, Youtube, Send, Music, Bed, Bath, Square } from "lucide-react";
import StructuredData from "@/components/StructuredData";
import { getLocalBusinessSchema } from "@/lib/seo";

const properties = [

  {
    id: 4,
    name: "Bahçeli Villa",
    category: "Villa",
    type: "Villa",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"],
    location: "Mahmutlar",
    capacity: 8,
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    price: 3000,
    currency: "₺",
    features: ["Wi-Fi", "Klima", "Mutfak", "TV", "Otopark", "Bahçe", "Havuz"],
  },
  {
    id: 5,
    name: "Deniz Manzaralı Villa",
    category: "Villa",
    type: "Villa",
    images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop"],
    location: "Oba",
    capacity: 10,
    bedrooms: 5,
    bathrooms: 4,
    area: 250,
    price: 4500,
    currency: "₺",
    features: ["Wi-Fi", "Klima", "Mutfak", "TV", "Otopark", "Bahçe", "Havuz", "Deniz Manzarası"],
  },
  {
    id: 6,
    name: "Lüks Penthouse",
    category: "Daire",
    type: "3+1",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"],
    location: "Alanya Merkez",
    capacity: 6,
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    price: 2500,
    currency: "₺",
    features: ["Wi-Fi", "Klima", "Mutfak", "TV", "Otopark", "Balkon", "Manzara"],
  },
];

export default function KiralamakPage() {
  const [selectedLocation, setSelectedLocation] = useState("Tümü");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedType, setSelectedType] = useState("Tümü");
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [capacityFilter, setCapacityFilter] = useState("Tümü");

  // Filtrelenmiş mekanlar
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Tip filtresi
      if (selectedType !== "Tümü" && property.type !== selectedType) {
        return false;
      }

      // Lokasyon filtresi
      if (selectedLocation !== "Tümü" && !property.location.includes(selectedLocation)) {
        return false;
      }

      // Fiyat filtresi
      if (minPrice && property.price < parseInt(minPrice)) return false;
      if (maxPrice && property.price > parseInt(maxPrice)) return false;

      // Kapasite filtresi
      if (capacityFilter !== "Tümü") {
        const capacity = parseInt(capacityFilter);
        if (property.capacity < capacity) return false;
      }

      return true;
    });
  }, [selectedType, selectedLocation, minPrice, maxPrice, capacityFilter]);

  const handleSearch = () => {
    const searchBar = document.getElementById("search-bar");
    if (searchBar) {
      searchBar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleViewProperties = () => {
    const propertiesGrid = document.getElementById("properties-grid");
    if (propertiesGrid) {
      propertiesGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleReserve = (propertyId: number) => {
    const property = properties.find(p => p.id === propertyId);
    const params = new URLSearchParams({
      property: property?.name || propertyId.toString(),
      location: selectedLocation,
      startDate: startDate || "",
      endDate: endDate || "",
    });
    window.location.href = `/#iletisim?${params.toString()}`;
  };

  const structuredData = getLocalBusinessSchema({
    name: "TSR GROUP Günlük Ev Kiralama",
    description: "Alanya ve Antalya'da günlük ev kiralama. Villa, daire ve apartman kiralama. Kısa süreli tatil kiralama. Deniz manzaralı, havuzlu, lüks konaklama seçenekleri.",
    serviceType: "Günlük Ev Kiralama",
    areaServed: ["Alanya", "Antalya"],
    url: "/gunluk-kiralama",
    telephone: "+90-530-333-00-97",
    address: {
      addressLocality: "Alanya",
      addressRegion: "Antalya",
      addressCountry: "TR",
    },
    priceRange: "$$$",
  });

  return (
    <>
      <StructuredData data={structuredData} />
      {/* Açılır pencere stilleri */}
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Select option'ları için koyu arka plan ve beyaz yazı */
        select option {
          background-color: #2e3c3a !important;
          color: white !important;
        }
        
        /* Date picker için koyu tema - Chrome/Safari */
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
          opacity: 0.8;
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
        }
        
        input[type="date"]::-webkit-datetime-edit-text,
        input[type="date"]::-webkit-datetime-edit-month-field,
        input[type="date"]::-webkit-datetime-edit-day-field,
        input[type="date"]::-webkit-datetime-edit-year-field {
          color: white !important;
        }
        
        input[type="date"]::-webkit-datetime-edit-text:focus,
        input[type="date"]::-webkit-datetime-edit-month-field:focus,
        input[type="date"]::-webkit-datetime-edit-day-field:focus,
        input[type="date"]::-webkit-datetime-edit-year-field:focus {
          background-color: rgba(255, 255, 255, 0.1);
          color: white !important;
        }
        
        /* Firefox için date picker */
        input[type="date"] {
          color-scheme: dark;
        }
        
        /* Select dropdown için */
        select {
          color: white !important;
        }
        
        select:focus {
          color: white !important;
        }
      `}} />
      <div className="min-h-screen" style={{ background: '#b7b1ad' }}>
        {/* Hero Section */}
        <div className="relative h-[70vh] w-full overflow-hidden mt-8 mb-8 rounded-2xl mx-4">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1920&h=1080&fit=crop"
              alt="Günlük Kiralama"
              fill
              className="object-cover"
              priority
            />
            {/* Hafif koyu overlay - sadece yazıların okunabilirliği için */}
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
              {/* Text Content */}
              <div className="space-y-6 md:space-y-8">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
                    Alanya'da Günlük Kiralama
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-white/95 font-medium max-w-2xl leading-relaxed">
                    TSR GROUP ile kısa süreli konaklamalarınız için esnek ve konforlu çözümler. Tam donanımlı, temiz ve güvenli mekanlarımızla yanınızdayız.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleSearch}
                    className="bg-white hover:bg-white/95 text-[#2e3c3a] px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-2xl text-lg cursor-pointer"
                  >
                    <Search className="h-6 w-6" />
                    <span>Mekan Ara</span>
                  </button>
                  <Link
                    href="/gunluk-kiralama/kiraya-vermek"
                    className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 text-lg cursor-pointer"
                  >
                    <span>Kiraya Vermek İstiyorum</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div id="search-bar" className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] border-t border-[#2e3c3a]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 items-end">
              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm text-white/80 uppercase">LOKASYON</label>
                <div className="relative">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none appearance-none cursor-pointer"
                    style={{ color: 'white' }}
                  >
                    <option value="Tümü" style={{ background: '#2e3c3a', color: 'white' }}>Tümü</option>
                    <option value="Alanya Merkez" style={{ background: '#2e3c3a', color: 'white' }}>Alanya Merkez</option>
                    <option value="Kleopatra" style={{ background: '#2e3c3a', color: 'white' }}>Kleopatra Plajı</option>
                    <option value="Keykubat" style={{ background: '#2e3c3a', color: 'white' }}>Keykubat Plajı</option>
                    <option value="Mahmutlar" style={{ background: '#2e3c3a', color: 'white' }}>Mahmutlar</option>
                    <option value="Oba" style={{ background: '#2e3c3a', color: 'white' }}>Oba</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70 pointer-events-none" />
                </div>
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <label className="text-sm text-white/80 uppercase">GİRİŞ TARİHİ</label>
                <div className="relative">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none cursor-pointer [color-scheme:dark]"
                    style={{ color: 'white' }}
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70 pointer-events-none" />
                </div>
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <label className="text-sm text-white/80 uppercase">ÇIKIŞ TARİHİ</label>
                <div className="relative">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split('T')[0]}
                    className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none cursor-pointer [color-scheme:dark]"
                    style={{ color: 'white' }}
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70 pointer-events-none" />
                </div>
              </div>

              {/* Property Type */}
              <div className="space-y-2">
                <label className="text-sm text-white/80 uppercase">MEKAN TİPİ</label>
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none appearance-none cursor-pointer"
                    style={{ color: 'white' }}
                  >
                    <option value="Tümü" style={{ background: '#2e3c3a', color: 'white' }}>Tümü</option>
                    <option value="1+1" style={{ background: '#2e3c3a', color: 'white' }}>1+1 Daire</option>
                    <option value="2+1" style={{ background: '#2e3c3a', color: 'white' }}>2+1 Daire</option>
                    <option value="3+1" style={{ background: '#2e3c3a', color: 'white' }}>3+1 Daire</option>
                    <option value="Villa" style={{ background: '#2e3c3a', color: 'white' }}>Villa</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70 pointer-events-none" />
                </div>
              </div>

              {/* Filters and Search */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex-1 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-3 rounded-lg border border-white/20 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span className="text-2xl">{showFilters ? "-" : "+"}</span>
                  <span>Filtreler</span>
                </button>
                <button
                  onClick={handleSearch}
                  className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-6 py-3 rounded-lg border border-white/20 transition-colors cursor-pointer"
                >
                  <Search className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Genişletilmiş Filtreler */}
            {showFilters && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-white/20">
                <div className="space-y-2">
                  <label className="text-sm text-white/80 uppercase">MİNİMUM FİYAT (₺)</label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min"
                    className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/80 uppercase">MAKSİMUM FİYAT (₺)</label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max"
                    className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/80 uppercase">KAPASİTE</label>
                  <select
                    value={capacityFilter}
                    onChange={(e) => setCapacityFilter(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none appearance-none cursor-pointer"
                    style={{ color: 'white' }}
                  >
                    <option value="Tümü" style={{ background: '#2e3c3a', color: 'white' }}>Tümü</option>
                    <option value="2" style={{ background: '#2e3c3a', color: 'white' }}>2+ Kişi</option>
                    <option value="4" style={{ background: '#2e3c3a', color: 'white' }}>4+ Kişi</option>
                    <option value="6" style={{ background: '#2e3c3a', color: 'white' }}>6+ Kişi</option>
                    <option value="8" style={{ background: '#2e3c3a', color: 'white' }}>8+ Kişi</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/80 uppercase">KATEGORİ</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none appearance-none cursor-pointer"
                    style={{ color: 'white' }}
                  >
                    <option value="Tümü" style={{ background: '#2e3c3a', color: 'white' }}>Tümü</option>
                    <option value="Daire" style={{ background: '#2e3c3a', color: 'white' }}>Daire</option>
                    <option value="Villa" style={{ background: '#2e3c3a', color: 'white' }}>Villa</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Properties Grid */}
        <div id="properties-grid" className="container mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-16">
          {filteredProperties.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#2e3c3a] text-xl font-semibold mb-4">Aradığınız kriterlere uygun mekan bulunamadı.</p>
              <button
                onClick={() => {
                  setSelectedType("Tümü");
                  setSelectedLocation("Tümü");
                  setMinPrice("");
                  setMaxPrice("");
                  setCapacityFilter("Tümü");
                }}
                className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] transition-all cursor-pointer"
              >
                Filtreleri Temizle
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => {
                const currentIndex = currentImageIndex[property.id] || 0;
                const imageCount = property.images.length || 1;

                return (
                  <div
                    key={property.id}
                    className="bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-white/20"
                  >
                    {/* Property Image */}
                    <div className="relative h-64 w-full bg-[#2e3c3a] overflow-hidden group">
                      <Image
                        src={property.images[currentIndex] || property.images[0]}
                        alt={property.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Image Carousel Dots */}
                      {imageCount > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {Array.from({ length: imageCount }).map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex({ ...currentImageIndex, [property.id]: index })}
                              className={`h-2 rounded-full transition-all ${currentIndex === index ? "bg-white w-8" : "bg-white/50 w-2"
                                }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Property Info */}
                    <div className="p-6 space-y-4">
                      {/* Property Name */}
                      <div>
                        <h3 className="text-2xl font-bold text-[#2e3c3a] mb-1">{property.name}</h3>
                        <div className="flex items-center gap-2 text-[#2e3c3a]/70">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 text-[#2e3c3a]">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">{property.capacity} Kişi</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#2e3c3a]">
                          <Bed className="h-4 w-4" />
                          <span className="text-sm">{property.bedrooms} Yatak</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#2e3c3a]">
                          <Bath className="h-4 w-4" />
                          <span className="text-sm">{property.bathrooms} Banyo</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#2e3c3a]">
                          <Square className="h-4 w-4" />
                          <span className="text-sm">{property.area} m²</span>
                        </div>
                      </div>

                      {/* Features List */}
                      <div className="flex flex-wrap gap-2">
                        {property.features.map((feature, idx) => (
                          <span key={idx} className="bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] text-white px-3 py-1 rounded-lg text-xs font-medium">
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Price and Button */}
                      <div className="pt-4 border-t border-white/20 space-y-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[#2e3c3a] text-sm">Günlük fiyat:</span>
                          <span className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white px-4 py-1 rounded-full text-xl font-bold">
                            {property.price} {property.currency}
                          </span>
                        </div>
                        <button
                          onClick={() => handleReserve(property.id)}
                          className="w-full bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl cursor-pointer"
                        >
                          Şimdi rezerve et
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
