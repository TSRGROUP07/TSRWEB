"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, ChevronDown, Map, Camera, Home, Building2, Instagram, Youtube, Send, Music, Eye, Globe } from "lucide-react";

const tours = [
  {
    id: 1,
    title: "Lüks Villa - 3D Tur",
    location: "Alanya Merkez",
    type: "Villa",
    rooms: 5,
    area: 350,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    has360Tour: true,
    has3DMap: true,
  },
  {
    id: 2,
    title: "Modern Daire - 360° Tur",
    location: "Kleopatra Plajı",
    type: "Daire",
    rooms: 3,
    area: 120,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    has360Tour: true,
    has3DMap: true,
  },
  {
    id: 3,
    title: "Rezidans Daire - Sanal Tur",
    location: "Keykubat Plajı",
    type: "Daire",
    rooms: 4,
    area: 180,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    has360Tour: true,
    has3DMap: false,
  },
  {
    id: 4,
    title: "Bahçeli Villa - 3D Gezinti",
    location: "Mahmutlar",
    type: "Villa",
    rooms: 6,
    area: 400,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    has360Tour: true,
    has3DMap: true,
  },
  {
    id: 5,
    title: "Penthouse - 360° Tur",
    location: "Alanya Merkez",
    type: "Daire",
    rooms: 4,
    area: 250,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    has360Tour: true,
    has3DMap: true,
  },
  {
    id: 6,
    title: "Geniş Daire - Sanal Gezinti",
    location: "Oba",
    type: "Daire",
    rooms: 3,
    area: 150,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    has360Tour: true,
    has3DMap: false,
  },
];

export default function UcBoyutluGezilerPage() {
  const [selectedLocation, setSelectedLocation] = useState("Tümü");
  const [selectedType, setSelectedType] = useState("Tümü");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [tourFilter, setTourFilter] = useState("Tümü");

  // Filtrelenmiş turlar
  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      // Lokasyon filtresi
      if (selectedLocation !== "Tümü" && !tour.location.includes(selectedLocation)) {
        return false;
      }
      
      // Tip filtresi
      if (selectedType !== "Tümü" && tour.type !== selectedType) {
        return false;
      }
      
      // Arama filtresi
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        if (!tour.title.toLowerCase().includes(term) && !tour.location.toLowerCase().includes(term)) {
          return false;
        }
      }
      
      // Tur tipi filtresi
      if (tourFilter === "360° Tur" && !tour.has360Tour) return false;
      if (tourFilter === "3D Harita" && !tour.has3DMap) return false;
      
      return true;
    });
  }, [selectedLocation, selectedType, searchTerm, tourFilter]);

  const handleSearch = () => {
    const searchBar = document.getElementById("search-bar");
    if (searchBar) {
      searchBar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleViewTours = () => {
    const toursGrid = document.getElementById("tours-grid");
    if (toursGrid) {
      toursGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleViewTour = (tourId: number) => {
    const tour = tours.find(t => t.id === tourId);
    const params = new URLSearchParams({
      tour: tour?.title || tourId.toString(),
    });
    window.location.href = `/emlak?${params.toString()}`;
  };

  return (
    <>
      {/* Açılır pencere stilleri */}
      <style dangerouslySetInnerHTML={{__html: `
        select option {
          background-color: #2e3c3a !important;
          color: white !important;
        }
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
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&h=1080&fit=crop&q=90"
            alt="3D İç Mekan Gezileri"
            fill
            className="object-cover"
            priority
          />
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
        <div className="relative z-20 container mx-auto px-6 lg:px-12 h-full flex items-center">
          <div className="w-full max-w-4xl">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
                  3D İç Mekan Gezileri
                </h1>
                <p className="text-xl md:text-2xl text-white/95 font-medium max-w-2xl leading-relaxed">
                  Google Maps 3D ile dış çevre gezintisi ve sanal iç mekan turları ile emlakları gerçek gibi keşfedin.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={handleSearch}
                  className="bg-white hover:bg-white/95 text-[#2e3c3a] px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-2xl text-lg cursor-pointer"
                >
                  <Search className="h-6 w-6" />
                  <span>Tur Ara</span>
                </button>
                <button 
                  onClick={handleViewTours}
                  className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 text-lg cursor-pointer"
                >
                  <span>Turları Gör</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div id="search-bar" className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] border-t border-[#2e3c3a]">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Search */}
            <div className="space-y-2 lg:col-span-2">
              <label className="text-sm text-white/80 uppercase">ARAMA</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Emlak adı veya lokasyon ara..."
                  className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none placeholder-white/50"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70 pointer-events-none" />
              </div>
            </div>

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
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-white/20">
              <div className="space-y-2">
                <label className="text-sm text-white/80 uppercase">EMLAK TİPİ</label>
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
              <div className="space-y-2">
                <label className="text-sm text-white/80 uppercase">TUR TİPİ</label>
                <select
                  value={tourFilter}
                  onChange={(e) => setTourFilter(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none appearance-none cursor-pointer"
                  style={{ color: 'white' }}
                >
                  <option value="Tümü" style={{ background: '#2e3c3a', color: 'white' }}>Tümü</option>
                  <option value="360° Tur" style={{ background: '#2e3c3a', color: 'white' }}>360° Tur</option>
                  <option value="3D Harita" style={{ background: '#2e3c3a', color: 'white' }}>3D Harita</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tours Grid */}
      <div id="tours-grid" className="container mx-auto px-6 lg:px-12 py-16">
        {filteredTours.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#2e3c3a] text-xl font-semibold mb-4">Aradığınız kriterlere uygun tur bulunamadı.</p>
            <button
              onClick={() => {
                setSelectedLocation("Tümü");
                setSelectedType("Tümü");
                setSearchTerm("");
                setTourFilter("Tümü");
              }}
              className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] transition-all cursor-pointer"
            >
              Filtreleri Temizle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-white/20 group"
              >
                {/* Tour Image */}
                <div className="relative h-64 w-full bg-[#2e3c3a] overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {tour.has360Tour && (
                      <span className="bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] text-white px-3 py-1 rounded-full text-xs font-bold">
                        360° Tur
                      </span>
                    )}
                    {tour.has3DMap && (
                      <span className="bg-gradient-to-r from-[#3a4d4a] to-[#2e3c3a] text-white px-3 py-1 rounded-full text-xs font-bold">
                        3D Harita
                      </span>
                    )}
                  </div>
                </div>

                {/* Tour Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#2e3c3a] mb-1">{tour.title}</h3>
                    <div className="flex items-center gap-2 text-[#2e3c3a]/70">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{tour.location}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-[#2e3c3a]">
                      <Home className="h-4 w-4" />
                      <span className="text-sm">{tour.rooms} Oda</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#2e3c3a]">
                      <Building2 className="h-4 w-4" />
                      <span className="text-sm">{tour.area} m²</span>
                    </div>
                    <span className="bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] text-white px-3 py-1 rounded-lg text-xs font-medium">
                      {tour.type}
                    </span>
                  </div>

                  {/* Button */}
                  <button 
                    onClick={() => handleViewTour(tour.id)}
                    className="w-full bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Eye className="h-5 w-5" />
                    <span>3D Turu Başlat</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
