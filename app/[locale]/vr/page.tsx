"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Headphones, Smartphone, Globe, Zap, CheckCircle, Search, Instagram, Youtube, Send, Music, MapPin, ChevronDown } from "lucide-react";

const vrProperties = [
  {
    id: 1,
    title: "Lüks Villa - VR Tur",
    location: "Alanya Merkez",
    type: "Villa",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    vrReady: true,
  },
  {
    id: 2,
    title: "Modern Daire - VR Deneyim",
    location: "Kleopatra Plajı",
    type: "Daire",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    vrReady: true,
  },
  {
    id: 3,
    title: "Rezidans - VR Hazır",
    location: "Keykubat Plajı",
    type: "Daire",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    vrReady: false,
  },
  {
    id: 4,
    title: "Bahçeli Villa - VR Tur",
    location: "Mahmutlar",
    type: "Villa",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    vrReady: true,
  },
  {
    id: 5,
    title: "Penthouse - VR Deneyim",
    location: "Alanya Merkez",
    type: "Daire",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    vrReady: true,
  },
  {
    id: 6,
    title: "Geniş Daire - VR Hazırlanıyor",
    location: "Oba",
    type: "Daire",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    vrReady: false,
  },
];

export default function VRPage() {
  const [selectedLocation, setSelectedLocation] = useState("Tümü");
  const [selectedType, setSelectedType] = useState("Tümü");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [vrReadyFilter, setVrReadyFilter] = useState("Tümü");

  // Filtrelenmiş özellikler
  const filteredProperties = useMemo(() => {
    return vrProperties.filter((property) => {
      if (selectedLocation !== "Tümü" && !property.location.includes(selectedLocation)) {
        return false;
      }
      if (selectedType !== "Tümü" && property.type !== selectedType) {
        return false;
      }
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        if (!property.title.toLowerCase().includes(term) && !property.location.toLowerCase().includes(term)) {
          return false;
        }
      }
      if (vrReadyFilter === "VR Hazır" && !property.vrReady) return false;
      if (vrReadyFilter === "Hazırlanıyor" && property.vrReady) return false;
      return true;
    });
  }, [selectedLocation, selectedType, searchTerm, vrReadyFilter]);

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

  const handleViewVR = (propertyId: number) => {
    const property = vrProperties.find(p => p.id === propertyId);
    const params = new URLSearchParams({
      property: property?.title || propertyId.toString(),
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
      <div className="min-h-screen bg-[#b7b1ad] text-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden mt-8 mb-8 rounded-2xl mx-4">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=1920&h=1080&fit=crop&q=90"
            alt="VR Desteği"
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
                  VR Desteği
                </h1>
                <p className="text-xl md:text-2xl text-white/95 font-medium max-w-2xl leading-relaxed">
                  Gelecek çalışmalarda VR gözlük desteği ile emlak deneyimini yeni bir boyuta taşıyoruz. Gerçekçi ve sürükleyici VR turları ile emlakları keşfedin.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={handleSearch}
                  className="bg-white hover:bg-white/95 text-[#2e3c3a] px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-2xl text-lg cursor-pointer"
                >
                  <Search className="h-6 w-6" />
                  <span>VR Turları Ara</span>
                </button>
                <button 
                  onClick={handleViewProperties}
                  className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 text-lg cursor-pointer"
                >
                  <span>VR Hazır Emlaklar</span>
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
                <label className="text-sm text-white/80 uppercase">VR DURUMU</label>
                <select
                  value={vrReadyFilter}
                  onChange={(e) => setVrReadyFilter(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none appearance-none cursor-pointer"
                  style={{ color: 'white' }}
                >
                  <option value="Tümü" style={{ background: '#2e3c3a', color: 'white' }}>Tümü</option>
                  <option value="VR Hazır" style={{ background: '#2e3c3a', color: 'white' }}>VR Hazır</option>
                  <option value="Hazırlanıyor" style={{ background: '#2e3c3a', color: 'white' }}>Hazırlanıyor</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Properties Grid */}
      <div id="properties-grid" className="container mx-auto px-6 lg:px-12 py-16">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#2e3c3a] text-xl font-semibold mb-4">Aradığınız kriterlere uygun emlak bulunamadı.</p>
            <button
              onClick={() => {
                setSelectedLocation("Tümü");
                setSelectedType("Tümü");
                setSearchTerm("");
                setVrReadyFilter("Tümü");
              }}
              className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] transition-all cursor-pointer"
            >
              Filtreleri Temizle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-white/20 group"
              >
                {/* Property Image */}
                <div className="relative h-64 w-full bg-[#2e3c3a] overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* VR Badge */}
                  <div className="absolute top-4 left-4">
                    {property.vrReady ? (
                      <span className="bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-1 rounded-full text-xs font-bold">
                        VR Hazır
                      </span>
                    ) : (
                      <span className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Hazırlanıyor
                      </span>
                    )}
                  </div>
                </div>

                {/* Property Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#2e3c3a] mb-1">{property.title}</h3>
                    <div className="flex items-center gap-2 text-[#2e3c3a]/70">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] text-white px-3 py-1 rounded-lg text-xs font-medium">
                      {property.type}
                    </span>
                  </div>

                  <button 
                    onClick={() => handleViewVR(property.id)}
                    className="w-full bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Eye className="h-5 w-5" />
                    <span>{property.vrReady ? "VR Turu Başlat" : "Detayları Gör"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

        {/* Features Grid - Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
            <div className="p-3 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-xl w-fit mb-4">
              <Headphones className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">360° Sanal Tur</h3>
            <p className="text-white/80">
              Emlakları VR gözlük ile 360 derece sanal tur deneyimiyle keşfedin
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
            <div className="p-3 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-xl w-fit mb-4">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Mobil Uyumlu</h3>
            <p className="text-white/80">
              VR deneyimini mobil cihazlarınızda da yaşayın, her yerden erişim
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
            <div className="p-3 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-xl w-fit mb-4">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Uzaktan İnceleme</h3>
            <p className="text-white/80">
              Dünyanın her yerinden emlakları VR ile inceleyin, seyahat etmeden karar verin
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
            <div className="p-3 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-xl w-fit mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Gerçekçi Deneyim</h3>
            <p className="text-white/80">
              Yüksek kaliteli VR teknolojisi ile gerçekçi emlak deneyimi
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
            <div className="p-3 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-xl w-fit mb-4">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">İmmersif Tasarım</h3>
            <p className="text-white/80">
              Tamamen sürükleyici VR deneyimi ile emlakları gerçek gibi görün
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
            <div className="p-3 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-xl w-fit mb-4">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Kolay Kullanım</h3>
            <p className="text-white/80">
              Basit ve sezgisel arayüz ile herkes VR deneyimini kolayca kullanabilir
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white rounded-2xl p-8 mb-12 border border-white/10 shadow-xl">
          <h2 className="text-3xl font-bold mb-6">VR Teknolojisi ile Emlak Deneyimi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Yakında Gelecek</h3>
              <p className="text-white/80 mb-4">
                VR gözlük desteği yakında hizmetinizde olacak. Bu teknoloji ile emlakları 
                fiziksel olarak ziyaret etmeden, gerçekçi bir şekilde inceleyebileceksiniz.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                  <span>360° sanal tur deneyimi</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                  <span>VR gözlük uyumluluğu</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                  <span>Mobil ve masaüstü erişim</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Avantajlar</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-white">Zaman Tasarrufu:</strong>
                    <p className="text-white/80 text-sm">Fiziksel ziyaretlere gerek kalmadan emlakları inceleyin</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-white">Uzaktan Erişim:</strong>
                    <p className="text-white/80 text-sm">Dünyanın her yerinden emlakları VR ile görüntüleyin</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-white">Gerçekçi Deneyim:</strong>
                    <p className="text-white/80 text-sm">Yüksek kaliteli VR teknolojisi ile gerçek gibi görün</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">VR Desteği Hakkında Bilgi Alın</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              VR teknolojisi ile ilgili güncel gelişmeler ve hizmet başlangıç tarihi hakkında 
              bilgi almak için bizimle iletişime geçin.
            </p>
            <Link
              href="/#iletisim"
              className="inline-block px-8 py-3 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white rounded-lg transition-all shadow-lg hover:shadow-xl cursor-pointer"
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
