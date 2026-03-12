"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Laptop } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "TSR GROUP: Vizyonunu İnşa Ediyoruz",
      description: "Dijital emlak çözümleri ile hayallerinizi gerçeğe dönüştürün. Profesyonel danışmanlık ve güvenilir hizmetler ile yatırımlarınızı değerlendirin.",
    },
  ];

  return (
    <section className="relative min-h-screen bg-white pt-20 overflow-hidden">
      {/* Sol taraftaki ok ikonu */}
      <button
        className="absolute left-8 top-1/2 -translate-y-1/2 z-10 text-gray-400 hover:text-[#2e3c3a] transition-colors"
        aria-label="Önceki"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>

      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Sol Kolon - Metin ve Butonlar */}
          <div className="space-y-8 z-10">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-[#2e3c3a] leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-2xl">
                {slides[currentSlide].description}
              </p>
            </div>

            {/* Butonlar */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/emlak"
                className="bg-[#2e3c3a] hover:bg-[#2e3c3a] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 shadow-lg"
              >
                Daha Fazla Keşfet
              </Link>
              <Link
                href="/#iletisim"
                className="bg-white border-2 border-[#2e3c3a] text-[#2e3c3a] hover:bg-[#2e3c3a] px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
              >
                Bize Ulaşın
              </Link>
            </div>
          </div>

          {/* Sağ Kolon - Laptop Görseli */}
          <div className="relative lg:min-h-[600px] flex items-center justify-center">
            {/* Arka plandaki aqua yuvarlak şekil */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2e3c3a] rounded-full opacity-30 blur-3xl -z-0"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#2e3c3a] rounded-full opacity-20 blur-2xl -z-0"></div>

            {/* Laptop Mockup */}
            <div className="relative z-10 w-full max-w-2xl">
              <div className="relative bg-gray-100 rounded-lg p-4 shadow-2xl">
                {/* Laptop Frame */}
                <div className="bg-gray-800 rounded-t-lg p-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>

                {/* Laptop Screen Content */}
                <div className="bg-[#2e3c3a] rounded-b-lg p-6 min-h-[400px]">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2e3c3a]">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-[#2e3c3a] rounded"></div>
                      <span className="text-xl font-bold text-[#2e3c3a]">Turkuaz Gelecek</span>
                    </div>
                  </div>

                  {/* Content Cards */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-[#2e3c3a]/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-[#2e3c3a] rounded-lg flex items-center justify-center">
                          <span className="text-white text-xl">🏠</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">Emlak Yönetimi</h3>
                          <p className="text-sm text-gray-600">Profesyonel çözümler</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-[#2e3c3a]/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-[#2e3c3a] rounded-lg flex items-center justify-center">
                          <span className="text-white text-xl">📊</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">Yatırım Analizi</h3>
                          <p className="text-sm text-gray-600">Detaylı raporlar</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-[#2e3c3a]/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-[#2e3c3a] rounded-lg flex items-center justify-center">
                          <span className="text-white text-xl">💼</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">Danışmanlık</h3>
                          <p className="text-sm text-gray-600">Uzman desteği</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sağ taraftaki ok ikonu */}
      <button
        className="absolute right-8 top-1/2 -translate-y-1/2 z-10 text-gray-400 hover:text-[#2e3c3a] transition-colors"
        aria-label="Sonraki"
      >
        <ArrowRight className="h-6 w-6" />
      </button>
    </section>
  );
}




