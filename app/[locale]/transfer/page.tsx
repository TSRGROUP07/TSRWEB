"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, MapPin, ChevronDown, Plane, Car, Users, Shield, Instagram, Youtube, Send, Music, CheckCircle, Clock, Luggage } from "lucide-react";
import StructuredData from "@/components/StructuredData";
import { getLocalBusinessSchema } from "@/lib/seo";

const transferVehicles = [
  {
    id: 1,
    name: "VIP Küçük Araç",
    category: "VIP",
    type: "VIP",
    images: ["/TRASNFER/C22.png"],
    capacity: 3,
    features: ["Lüks İç Mekan", "Wi-Fi", "Su İkramı", "Klima"],
    price: 1000,
    currency: "₺",
    location: "Alanya",
  },
  {
    id: 2,
    name: "Mercedes Benz Vito",
    category: "VIP",
    type: "VIP",
    images: ["/TRASNFER/VİTO.png"],
    capacity: 8,
    features: ["Geniş İç Mekan", "Wi-Fi", "Premium Konfor", "Klima"],
    price: 1500,
    currency: "₺",
    location: "Alanya",
  },
  {
    id: 3,
    name: "Sprinter Shuttle",
    category: "Shuttle",
    type: "Shuttle",
    images: ["/TRASNFER/sprinter.jpg"],
    capacity: 12,
    features: ["Geniş Bagaj", "Klima", "Rahat Koltuklar", "Wi-Fi"],
    price: 1800,
    currency: "₺",
    location: "Alanya",
  },
  {
    id: 4,
    name: "Premium Sedan",
    category: "VIP",
    type: "VIP",
    images: ["/TRASNFER/C22.png"],
    capacity: 3,
    features: ["Lüks İç Mekan", "Wi-Fi", "Su İkramı", "Klima"],
    price: 1200,
    currency: "₺",
    location: "Antalya",
  },
  {
    id: 5,
    name: "Minibüs Transfer",
    category: "Shuttle",
    type: "Shuttle",
    images: ["/TRASNFER/VİTO.png"],
    capacity: 10,
    features: ["Geniş Bagaj", "Klima", "Rahat Koltuklar"],
    price: 1600,
    currency: "₺",
    location: "Alanya",
  },
  {
    id: 6,
    name: "Lüks Van",
    category: "VIP",
    type: "VIP",
    images: ["/TRASNFER/sprinter.jpg"],
    capacity: 6,
    features: ["Lüks İç Mekan", "Wi-Fi", "Premium Konfor", "Klima"],
    price: 1400,
    currency: "₺",
    location: "Alanya",
  },
];

export default function TransferPage() {
  const [selectedLocation, setSelectedLocation] = useState("Tümü");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("Tümü");
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [capacityFilter, setCapacityFilter] = useState("Tümü");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");

  // Filtrelenmiş araçlar
  const filteredVehicles = useMemo(() => {
    return transferVehicles.filter((vehicle) => {
      // Tip filtresi
      if (selectedType !== "Tümü" && vehicle.type !== selectedType) {
        return false;
      }

      // Lokasyon filtresi
      if (selectedLocation !== "Tümü" && vehicle.location !== selectedLocation) {
        return false;
      }

      // Fiyat filtresi
      if (minPrice && vehicle.price < parseInt(minPrice)) return false;
      if (maxPrice && vehicle.price > parseInt(maxPrice)) return false;

      // Kapasite filtresi
      if (capacityFilter !== "Tümü") {
        const capacity = parseInt(capacityFilter);
        if (vehicle.capacity < capacity) return false;
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

  const handleViewVehicles = () => {
    const vehiclesGrid = document.getElementById("vehicles-grid");
    if (vehiclesGrid) {
      vehiclesGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleReserve = (vehicleId: number) => {
    const vehicle = transferVehicles.find(v => v.id === vehicleId);
    const params = new URLSearchParams({
      vehicle: vehicle?.name || vehicleId.toString(),
      pickup: pickupLocation || "",
      dropoff: dropoffLocation || "",
      date: selectedDate || "",
    });
    window.location.href = `/#iletisim?${params.toString()}`;
  };

  const structuredData = getLocalBusinessSchema({
    name: "TSR GROUP Transfer Hizmeti",
    description: "Alanya ve Antalya'da profesyonel transfer hizmeti. VIP transfer, havaalanı transferi, otel transferi ve şehirlerarası transfer.",
    serviceType: "Transfer Hizmeti",
    areaServed: ["Alanya", "Antalya"],
    url: "/transfer",
    telephone: "+90-530-333-00-97",
    address: {
      addressLocality: "Alanya",
      addressRegion: "Antalya",
      addressCountry: "TR",
    },
    priceRange: "$$",
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
              src="/transfer-hero.png"
              alt="Transfer Hizmeti"
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
                    Alanya'da Profesyonel Transfer
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-white/95 font-medium max-w-2xl leading-relaxed">
                    TSR GROUP ile güvenli, konforlu ve zamanında transfer hizmeti. Havaalanı, otel ve şehirlerarası tüm transfer ihtiyaçlarınız için 7/24 hizmetinizdeyiz.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleSearch}
                    className="bg-white hover:bg-white/95 text-[#2e3c3a] px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-2xl text-lg cursor-pointer"
                  >
                    <Search className="h-6 w-6" />
                    <span>Araç Ara</span>
                  </button>
                  <button
                    onClick={handleViewVehicles}
                    className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 text-lg cursor-pointer"
                  >
                    <span>Fiyatları Gör</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div id="search-bar" className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] border-t border-[#2e3c3a]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 items-end">
              {/* Pickup Location */}
              <div className="space-y-2">
                <label className="text-sm text-white/80 uppercase">ALIM NOKTASI</label>
                <div className="relative">
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Alım noktası"
                    className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none placeholder-white/50"
                  />
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70 pointer-events-none" />
                </div>
              </div>

              {/* Dropoff Location */}
              <div className="space-y-2">
                <label className="text-sm text-white/80 uppercase">BIRAKMA NOKTASI</label>
                <div className="relative">
                  <input
                    type="text"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    placeholder="Bırakma noktası"
                    className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none placeholder-white/50"
                  />
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70 pointer-events-none" />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-sm text-white/80 uppercase">TARİH</label>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none cursor-pointer [color-scheme:dark]"
                    style={{ color: 'white' }}
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70 pointer-events-none" />
                </div>
              </div>

              {/* Vehicle Type */}
              <div className="space-y-2">
                <label className="text-sm text-white/80 uppercase">ARAÇ TİPİ</label>
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none appearance-none cursor-pointer"
                    style={{ color: 'white' }}
                  >
                    <option value="Tümü" style={{ background: '#2e3c3a', color: 'white' }}>Tümü</option>
                    <option value="VIP" style={{ background: '#2e3c3a', color: 'white' }}>VIP</option>
                    <option value="Shuttle" style={{ background: '#2e3c3a', color: 'white' }}>Shuttle</option>
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
                    <option value="3" style={{ background: '#2e3c3a', color: 'white' }}>3+ Kişi</option>
                    <option value="6" style={{ background: '#2e3c3a', color: 'white' }}>6+ Kişi</option>
                    <option value="8" style={{ background: '#2e3c3a', color: 'white' }}>8+ Kişi</option>
                    <option value="10" style={{ background: '#2e3c3a', color: 'white' }}>10+ Kişi</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/80 uppercase">LOKASYON</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none appearance-none cursor-pointer"
                    style={{ color: 'white' }}
                  >
                    <option value="Tümü" style={{ background: '#2e3c3a', color: 'white' }}>Tümü</option>
                    <option value="Alanya" style={{ background: '#2e3c3a', color: 'white' }}>Alanya</option>
                    <option value="Antalya" style={{ background: '#2e3c3a', color: 'white' }}>Antalya</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Vehicles Grid */}
        <div id="vehicles-grid" className="container mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-16">
          {filteredVehicles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#2e3c3a] text-xl font-semibold mb-4">Aradığınız kriterlere uygun araç bulunamadı.</p>
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
              {filteredVehicles.map((vehicle) => {
                const currentIndex = currentImageIndex[vehicle.id] || 0;
                const imageCount = vehicle.images.length || 1;

                return (
                  <div
                    key={vehicle.id}
                    className="bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-white/20"
                  >
                    {/* Vehicle Image */}
                    <div className="relative h-64 w-full bg-[#2e3c3a] overflow-hidden group">
                      <Image
                        src={vehicle.images[currentIndex] || vehicle.images[0]}
                        alt={vehicle.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-[#2e3c3a] text-white px-3 py-1 rounded-full text-xs font-bold">
                          {vehicle.category}
                        </span>
                      </div>

                      {/* Image Carousel Dots */}
                      {imageCount > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {Array.from({ length: imageCount }).map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex({ ...currentImageIndex, [vehicle.id]: index })}
                              className={`h-2 rounded-full transition-all ${currentIndex === index ? "bg-white w-8" : "bg-white/50 w-2"
                                }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Vehicle Info */}
                    <div className="p-6 space-y-4">
                      {/* Vehicle Name */}
                      <div>
                        <h3 className="text-2xl font-bold text-[#2e3c3a] mb-1">{vehicle.name}</h3>
                        <div className="flex items-center gap-2 text-[#2e3c3a]/70">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{vehicle.location}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex items-center gap-2 text-[#2e3c3a] mb-3">
                        <Users className="h-4 w-4" />
                        <span className="text-sm font-medium">{vehicle.capacity} Kişi</span>
                      </div>

                      {/* Features List */}
                      <div className="flex flex-wrap gap-2">
                        {vehicle.features.map((feature, idx) => (
                          <span key={idx} className="bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] text-white px-3 py-1 rounded-lg text-xs font-medium">
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Price and Button */}
                      <div className="pt-4 border-t border-white/20 space-y-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[#2e3c3a] text-sm">Transfer fiyatı:</span>
                          <span className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white px-4 py-1 rounded-full text-xl font-bold">
                            {vehicle.price} {vehicle.currency}
                          </span>
                        </div>
                        <button
                          onClick={() => handleReserve(vehicle.id)}
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
