"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, CheckCircle, TrendingUp, Search, Instagram, Youtube, Send, Music, ChevronDown } from "lucide-react";

export default function YonetilenProjelerPage() {
  const [projectType, setProjectType] = useState("Tümü");

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
      <style dangerouslySetInnerHTML={{
        __html: `
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
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop&q=90"
              alt="Yönetilen Projeler"
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

          <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center">
            <div className="w-full max-w-4xl">
              <div className="space-y-6 md:space-y-8">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
                    85+ Yönetilen Projeler
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-white/95 font-medium max-w-2xl leading-relaxed">
                    Geniş proje portföyümüz ile emlak yönetiminde güvenilir çözümler. Profesyonel ekibimiz ile başarılı sonuçlar.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleSearch}
                    className="bg-white hover:bg-white/95 text-[#2e3c3a] px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-2xl text-lg cursor-pointer"
                  >
                    <Search className="h-6 w-6" />
                    <span>Projeleri Gör</span>
                  </button>
                  <button
                    onClick={handleViewStats}
                    className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 text-lg cursor-pointer"
                  >
                    <span>İstatistikleri İncele</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div id="search-bar" className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] border-t border-[#2e3c3a]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm text-white/80 uppercase">PROJE TİPİ</label>
                <div className="relative">
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none appearance-none cursor-pointer"
                    style={{ color: 'white' }}
                  >
                    <option value="Tümü" style={{ background: '#2e3c3a', color: 'white' }}>Tümü</option>
                    <option value="Konut" style={{ background: '#2e3c3a', color: 'white' }}>Konut</option>
                    <option value="Ticari" style={{ background: '#2e3c3a', color: 'white' }}>Ticari</option>
                    <option value="Karma" style={{ background: '#2e3c3a', color: 'white' }}>Karma</option>
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

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-16">
          {/* Stats Section */}
          <div id="stats-section" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all">
              <div className="text-5xl font-bold text-white mb-2">85+</div>
              <div className="text-white/80 text-lg">Aktif Proje</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all">
              <div className="text-5xl font-bold text-white mb-2">100%</div>
              <div className="text-white/80 text-lg">Müşteri Memnuniyeti</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white rounded-2xl p-8 mb-12 border border-white/10 shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Hizmetlerimiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-white mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Konut Yönetimi</h3>
                  <p className="text-white/80 text-sm">Apartman ve site yönetimi hizmetleri</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-white mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Ticari Yönetim</h3>
                  <p className="text-white/80 text-sm">Ofis ve ticari alan yönetimi</p>
                </div>
              </div>
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
