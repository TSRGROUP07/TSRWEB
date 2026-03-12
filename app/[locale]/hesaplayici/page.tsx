"use client";

import { useState } from "react";
import Image from "next/image";
import { Calculator, TrendingUp, Percent, Calendar, Sparkles, Search, Instagram, Youtube, Send, Music } from "lucide-react";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import CreditCalculator from "@/components/CreditCalculator";
import IncentiveCalculator from "@/components/IncentiveCalculator";

type CalculatorType = "investment" | "credit" | "incentive";

export default function HesaplayiciPage() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>("investment");

  const calculators = [
    {
      id: "investment" as CalculatorType,
      icon: TrendingUp,
      title: "Yatırım Geri Dönüş",
      description: "Ticari ve konut yatırımlarının geri dönüş süresini hesaplayın",
    },
    {
      id: "credit" as CalculatorType,
      icon: Percent,
      title: "Kredi Hesaplama",
      description: "Emlak kredisi ödeme planınızı oluşturun",
    },
    {
      id: "incentive" as CalculatorType,
      icon: Calendar,
      title: "Teşvikler",
      description: "Vatandaşlık ve teşvik programlarını inceleyin",
    },
  ];

  const handleSearch = () => {
    const searchBar = document.getElementById("search-bar");
    if (searchBar) {
      searchBar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleViewCalculators = () => {
    const calculatorsGrid = document.getElementById("calculators-grid");
    if (calculatorsGrid) {
      calculatorsGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#b7b1ad] text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden mt-8 mb-8 rounded-2xl mx-4">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1920&h=1080&fit=crop&q=90"
            alt="Yatırım Hesaplayıcıları"
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
                  Yatırım Hesaplayıcıları
                </h1>
                <p className="text-xl md:text-2xl text-white/95 font-medium max-w-2xl leading-relaxed">
                  Yatırım kararlarınızı destekleyecek profesyonel hesaplama araçları.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={handleSearch}
                  className="bg-white hover:bg-white/95 text-[#2e3c3a] px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-2xl text-lg cursor-pointer"
                >
                  <Search className="h-6 w-6" />
                  <span>Hesaplayıcıları Gör</span>
                </button>
                <button 
                  onClick={handleViewCalculators}
                  className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 text-lg cursor-pointer"
                >
                  <span>Hesaplamaya Başla</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-12 pb-12">
        {/* Search Bar */}
        <div id="search-bar" className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] border border-[#2e3c3a] rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
              <input
                type="text"
                placeholder="Hesaplayıcı ara..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white placeholder-white/50"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Calculator Tabs - Modern Design */}
        <div id="calculators-grid" className="flex flex-wrap justify-center gap-4 mb-12">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <button
                key={calc.id}
                onClick={() => setActiveCalculator(calc.id)}
                className={`group flex items-center space-x-4 px-8 py-5 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                  activeCalculator === calc.id
                    ? "bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white shadow-2xl scale-105 border-2 border-white/20"
                    : "bg-[#4f271b]/60 backdrop-blur-md border border-[#2d2825]/30 text-white hover:bg-[#4f271b]/70 hover:border-[#2e3c3a]/50 shadow-lg hover:shadow-xl"
                }`}
              >
                <div className={`p-3 rounded-xl transition-all ${
                  activeCalculator === calc.id
                    ? "bg-white/20"
                    : "bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] group-hover:scale-110"
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg text-white">
                    {calc.title}
                  </div>
                  <div className={`text-sm ${
                    activeCalculator === calc.id ? "text-white/90" : "text-white/70"
                  }`}>
                    {calc.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Calculator */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#4f271b]/60 backdrop-blur-md border border-[#2d2825]/30 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all">
            {activeCalculator === "investment" && <InvestmentCalculator />}
            {activeCalculator === "credit" && <CreditCalculator />}
            {activeCalculator === "incentive" && <IncentiveCalculator />}
          </div>
        </div>
      </div>
    </div>
  );
}
