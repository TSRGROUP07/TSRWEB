"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TrendingUp, CheckCircle, BarChart3, Search, Instagram, Youtube, Send, Music, ChevronDown } from "lucide-react";

export default function DolulukOraniPage() {
  const [location, setLocation] = useState("Tümü");

  const handleSearch = () => {
    const searchBar = document.getElementById("search-bar");
    if (searchBar) {
      searchBar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleViewStats = () => {
    const statsSection = document.getElementById("stats-section");
    if (statsSection) {
      statsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=1080&fit=crop&q=90"
            alt="Ortalama Doluluk"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>

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

        <div className="relative z-20 container mx-auto px-6 lg:px-12 h-full flex items-center">
          <div className="w-full max-w-4xl">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
                  %90+ Ortalama Doluluk
                </h1>
                <p className="text-xl md:text-2xl text-white/95 font-medium max-w-2xl leading-relaxed">
                  Yüksek doluluk oranımız ile güvenilir yatırım getirisi. Profesyonel yönetim, kaliteli hizmet.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={handleSearch}
                  className="bg-white hover:bg-white/95 text-[#2e3c3a] px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-2xl text-lg cursor-pointer"
                >
                  <Search className="h-6 w-6" />
                  <span>İstatistikleri Gör</span>
                </button>
                <button 
                  onClick={handleViewStats}
                  className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 text-lg cursor-pointer"
                >
                  <span>Detayları İncele</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div id="search-bar" className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] border-t border-[#2e3c3a]">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm text-white/80 uppercase">LOKASYON</label>
              <div className="relative">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none appearance-none cursor-pointer"
                  style={{ color: 'white' }}
                >
                  <option value="Tümü" style={{ background: '#2e3c3a', color: 'white' }}>Tümü</option>
                  <option value="Alanya Merkez" style={{ background: '#2e3c3a', color: 'white' }}>Alanya Merkez</option>
                  <option value="Kleopatra" style={{ background: '#2e3c3a', color: 'white' }}>Kleopatra Plajı</option>
                  <option value="Keykubat" style={{ background: '#2e3c3a', color: 'white' }}>Keykubat Plajı</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70 pointer-events-none" />
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleSearch}
                className="flex-1 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-6 py-3 rounded-lg border border-white/20 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Search className="h-6 w-6" />
                <span>Ara</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-16">
        {/* Stats Section */}
        <div id="stats-section" className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white rounded-2xl p-8 mb-12 border border-white/10 shadow-xl">
          <h2 className="text-3xl font-bold mb-6">Doluluk İstatistikleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center">
              <div className="text-5xl font-bold mb-2">90%+</div>
              <div className="text-white/80 text-lg">Ortalama Doluluk</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center">
              <div className="text-5xl font-bold mb-2">95%+</div>
              <div className="text-white/80 text-lg">Premium Lokasyonlar</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center">
              <div className="text-5xl font-bold mb-2">12</div>
              <div className="text-white/80 text-lg">Ay Ortalama Süre</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all">
            <h3 className="text-xl font-bold mb-4 text-white">Başarı Faktörleri</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-white/90">
                <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                <span>Stratejik Lokasyon Seçimi</span>
              </li>
              <li className="flex items-center text-white/90">
                <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                <span>Profesyonel Yönetim</span>
              </li>
              <li className="flex items-center text-white/90">
                <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                <span>Kaliteli Hizmet</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all">
            <h3 className="text-xl font-bold mb-4 text-white">Yatırım Getirisi</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-white/90">
                <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                <span>Yüksek Kira Geliri</span>
              </li>
              <li className="flex items-center text-white/90">
                <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                <span>Düşük Boşluk Oranı</span>
              </li>
              <li className="flex items-center text-white/90">
                <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                <span>Güvenilir Yatırım</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
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
