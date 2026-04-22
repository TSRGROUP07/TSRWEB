"use client";


import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, MapPin, ChevronDown, Settings, Users, Fuel, Instagram, Youtube, Send, Music, X } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import StructuredData from "@/components/StructuredData";
import { getLocalBusinessSchema } from "@/lib/seo";
import { useTranslations } from "next-intl";



export default function AracKiralamaPage() {
  const t = useTranslations('rentACar');
  const { currency, formatCurrency, convertAmount } = useCurrency();
  const [selectedPickup, setSelectedPickup] = useState("office");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCarType, setSelectedCarType] = useState("all");
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [transmissionFilter, setTransmissionFilter] = useState("all");
  const [fuelFilter, setFuelFilter] = useState("all");

  const getFuelBadgeColor = (fuel: string) => {
    if (fuel === "electric") return "bg-green-700";
    if (fuel === "gasoline") return "bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a]";
    if (fuel === "diesel") return "bg-gradient-to-r from-[#3a4d4a] to-[#2e3c3a]";
    return "bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a]";
  };

  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("/api/admin/cars");
        if (response.ok) {
          const data = await response.json();
          // Filter only published ones
          const publishedCars = data.filter((c: any) => c.published);
          setCars(publishedCars);
        }
      } catch (error) {
        console.error("Araçlar yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // Filtrelenmiş araçlar
  const filteredCars = useMemo(() => {
    return (cars || []).filter((car) => {
      // Araç tipi filtresi
      if (selectedCarType !== "all" && car.category !== selectedCarType) {
        return false;
      }

      // Fiyat filtresi
      if (minPrice && car.price < parseInt(minPrice)) return false;
      if (maxPrice && car.price > parseInt(maxPrice)) return false;

      // Vites tipi filtresi
      if (transmissionFilter !== "all" && car.transmission !== transmissionFilter) {
        return false;
      }

      // Yakıt tipi filtresi
      if (fuelFilter !== "all" && car.fuel !== fuelFilter) {
        return false;
      }

      return true;
    });
  }, [cars, selectedCarType, minPrice, maxPrice, transmissionFilter, fuelFilter]);

  const handleSearch = () => {
    // Arama çubuğuna scroll yap
    const searchBar = document.getElementById("search-bar");
    if (searchBar) {
      searchBar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleViewPrices = () => {
    // Araçlar bölümüne scroll yap
    const carsGrid = document.getElementById("cars-grid");
    if (carsGrid) {
      carsGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleReserve = (carId: any) => {
    // Rezervasyon için iletişim sayfasına yönlendir
    const car = cars.find(c => c.id === carId);
    const params = new URLSearchParams({
      car: car?.name || carId.toString(),
      pickup: t(`pickupOptions.${selectedPickup}`),
      startDate: startDate || "",
      endDate: endDate || "",
    });
    window.location.href = `/#iletisim?${params.toString()}`;
  };

  const structuredData = getLocalBusinessSchema({
    name: "TSR GROUP Araç Kiralama",
    description: t('subtitle'),
    serviceType: "Araç Kiralama",
    areaServed: ["Alanya", "Antalya"],
    url: "/arac-kiralama",
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
              src="/RENTACAR/kapak.png"
              alt="Araç Kiralama"
              fill
              sizes="100vw"
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
                    {t('title')}
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-white/95 font-medium max-w-2xl leading-relaxed">
                    {t('subtitle')}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleSearch}
                    className="bg-white hover:bg-white/95 text-[#2e3c3a] px-8 py-3 sm:py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-2xl text-base sm:text-lg cursor-pointer"
                  >
                    <Search className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span>{t('searchBtn')}</span>
                  </button>
                  <button
                    onClick={handleViewPrices}
                    className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/50 px-8 py-3 sm:py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105 text-base sm:text-lg cursor-pointer"
                  >
                    <span>{t('pricesBtn')}</span>
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
              {/* Pickup Point */}
              <div className="space-y-2">
                <label className="text-sm text-white/80 uppercase">{t('pickup')}</label>
                <div className="relative">
                  <select
                    value={selectedPickup}
                    onChange={(e) => setSelectedPickup(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none appearance-none cursor-pointer"
                    style={{ color: 'white' }}
                  >
                    <option value="office" style={{ background: '#2e3c3a', color: 'white' }}>{t('pickupOptions.office')}</option>
                    <option value="airport" style={{ background: '#2e3c3a', color: 'white' }}>{t('pickupOptions.airport')}</option>
                    <option value="hotel" style={{ background: '#2e3c3a', color: 'white' }}>{t('pickupOptions.hotel')}</option>
                    <option value="address" style={{ background: '#2e3c3a', color: 'white' }}>{t('pickupOptions.address')}</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70 pointer-events-none" />
                </div>
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <label className="text-sm text-white/80 uppercase">{t('startDate')}</label>
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
                <label className="text-sm text-white/80 uppercase">{t('endDate')}</label>
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

              {/* Car Type */}
              <div className="space-y-2">
                <label className="text-sm text-white/80 uppercase">{t('carType')}</label>
                <div className="relative">
                  <select
                    value={selectedCarType}
                    onChange={(e) => setSelectedCarType(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="all">{t('carTypes.all')}</option>
                    <option value="economy">{t('carTypes.economy')}</option>
                    <option value="mid">{t('carTypes.mid')}</option>
                    <option value="luxury">{t('carTypes.luxury')}</option>
                    <option value="suv">{t('carTypes.suv')}</option>
                    <option value="minibus">{t('carTypes.minibus')}</option>
                    <option value="offroad">{t('carTypes.offroad')}</option>
                    <option value="motorcycle">{t('carTypes.motorcycle')}</option>
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
                  <span>{t('filters')}</span>
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
                  <label className="text-sm text-white/80 uppercase">{t('minPrice')} ({currency})</label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder={`Min (${currency})`}
                    className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/80 uppercase">{t('maxPrice')} ({currency})</label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder={`Max (${currency})`}
                    className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/80 uppercase">{t('transmission')}</label>
                  <select
                    value={transmissionFilter}
                    onChange={(e) => setTransmissionFilter(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none appearance-none cursor-pointer"
                    style={{ color: 'white' }}
                  >
                    <option value="all" style={{ background: '#2e3c3a', color: 'white' }}>{t('transmissions.all')}</option>
                    <option value="auto" style={{ background: '#2e3c3a', color: 'white' }}>{t('transmissions.auto')}</option>
                    <option value="manual" style={{ background: '#2e3c3a', color: 'white' }}>{t('transmissions.manual')}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/80 uppercase">{t('fuel')}</label>
                  <select
                    value={fuelFilter}
                    onChange={(e) => setFuelFilter(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none appearance-none cursor-pointer"
                    style={{ color: 'white' }}
                  >
                    <option value="all" style={{ background: '#2e3c3a', color: 'white' }}>{t('fuels.all')}</option>
                    <option value="gasoline" style={{ background: '#2e3c3a', color: 'white' }}>{t('fuels.gasoline')}</option>
                    <option value="diesel" style={{ background: '#2e3c3a', color: 'white' }}>{t('fuels.diesel')}</option>
                    <option value="electric" style={{ background: '#2e3c3a', color: 'white' }}>{t('fuels.electric')}</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cars Grid */}
        <div id="cars-grid" className="container mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-16">
          {filteredCars.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#2e3c3a] text-xl font-semibold mb-4">{t('noResults')}</p>
              <button
                onClick={() => {
                  setSelectedCarType("all");
                  setMinPrice("");
                  setMaxPrice("");
                  setTransmissionFilter("all");
                  setFuelFilter("all");
                }}
                className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] transition-all"
              >
                {t('clearFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car) => {
                const currentIndex = currentImageIndex[car.id] || 0;
                const imageCount = car.images.length || 1;

                return (
                  <div
                    key={car.id}
                    className="bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-white/20"
                  >
                    {/* Car Image */}
                    <div className="relative h-64 w-full bg-[#2e3c3a] overflow-hidden group">
                      <Image
                        src={car.images[currentIndex] || car.images[0] || "/RENTACAR/EGEA.jpg"}
                        alt={car.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Image Carousel Dots */}
                      {imageCount > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {Array.from({ length: imageCount }).map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex({ ...currentImageIndex, [car.id]: index })}
                              className={`h-2 rounded-full transition-all ${currentIndex === index ? "bg-white w-8" : "bg-white/50 w-2"
                                }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Car Info */}
                    <div className="p-6 space-y-4">
                      {/* Car Name */}
                      <h3 className="text-2xl font-bold text-[#2e3c3a]">{car.name}</h3>

                      {/* Features */}
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 text-[#2e3c3a]">
                          <Settings className="h-4 w-4" />
                          <span className="text-sm">{t(`transmissions.${car.transmission}`)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#2e3c3a]">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">{car.passengers}</span>
                        </div>
                        <div className={`${getFuelBadgeColor(car.fuel)} text-white px-3 py-1 rounded-lg text-sm font-medium`}>
                          {t(`fuels.${car.fuel}`)}
                        </div>
                      </div>

                      {/* Price and Button */}
                      <div className="pt-4 border-t border-white/20 space-y-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[#2e3c3a] text-sm">{t('dailyPrice')}:</span>
                          <span className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white px-4 py-1 rounded-full text-xl font-bold">
                            {formatCurrency(car.price, "EUR")}
                          </span>
                        </div>
                        <button
                          onClick={() => handleReserve(car.id)}
                          className="w-full bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl cursor-pointer"
                        >
                          {t('reserveBtn')}
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
