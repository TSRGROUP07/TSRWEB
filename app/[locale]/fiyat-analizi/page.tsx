"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown, MapPin, AlertCircle, BarChart3, Activity, ArrowUpRight, ArrowDownRight, Search, Instagram, Youtube, Send, Music } from "lucide-react";

interface PriceData {
  month: string;
  kadikoy: number;
  besiktas: number;
  sisli: number;
}

interface DistrictStat {
  district: string;
  avgPrice: number;
  change: number;
  trend: "up" | "down";
}

export default function FiyatAnaliziPage() {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [districtStats, setDistrictStats] = useState<DistrictStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPriceData();
  }, []);

  const loadPriceData = async () => {
    try {
      setLoading(true);
      // Gerçek uygulamada API'den gelecek
      // Şimdilik örnek veri gösteriyoruz
      const mockData: PriceData[] = [
        { month: "Ocak", kadikoy: 85000, besiktas: 95000, sisli: 90000 },
        { month: "Şubat", kadikoy: 87000, besiktas: 97000, sisli: 92000 },
        { month: "Mart", kadikoy: 89000, besiktas: 99000, sisli: 94000 },
        { month: "Nisan", kadikoy: 92000, besiktas: 102000, sisli: 97000 },
        { month: "Mayıs", kadikoy: 95000, besiktas: 105000, sisli: 100000 },
        { month: "Haziran", kadikoy: 98000, besiktas: 108000, sisli: 103000 },
      ];

      const mockStats: DistrictStat[] = [
        { district: "Kadıköy", avgPrice: 92000, change: 8.2, trend: "up" },
        { district: "Beşiktaş", avgPrice: 102000, change: 10.5, trend: "up" },
        { district: "Şişli", avgPrice: 97000, change: 7.8, trend: "up" },
        { district: "Bakırköy", avgPrice: 78000, change: -2.1, trend: "down" },
        { district: "Üsküdar", avgPrice: 75000, change: 5.3, trend: "up" },
      ];

      setPriceData(mockData);
      setDistrictStats(mockStats);
    } catch (err) {
      setError("Fiyat verileri yüklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#b7b1ad] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2e3c3a] mx-auto mb-4"></div>
          <p className="text-white/80">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#b7b1ad] text-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  const handleSearch = () => {
    const searchBar = document.getElementById("search-bar");
    if (searchBar) {
      searchBar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleViewAnalytics = () => {
    const analyticsGrid = document.getElementById("analytics-grid");
    if (analyticsGrid) {
      analyticsGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#b7b1ad] text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden mt-8 mb-8 rounded-2xl mx-4">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&q=90"
            alt="Fiyat Analizi"
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
                  Fiyat Analizi
                </h1>
                <p className="text-xl md:text-2xl text-white/95 font-medium max-w-2xl leading-relaxed">
                  Bölgesel emlak fiyat hareketliliklerini detaylı grafikler ve istatistiklerle takip edin.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={handleSearch}
                  className="bg-white hover:bg-white/95 text-[#2e3c3a] px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-2xl text-lg cursor-pointer"
                >
                  <Search className="h-6 w-6" />
                  <span>Analizleri Gör</span>
                </button>
                <button 
                  onClick={handleViewAnalytics}
                  className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 text-lg cursor-pointer"
                >
                  <span>Grafikleri İncele</span>
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
                placeholder="Bölge veya analiz ara..."
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

        {/* District Stats - Modern Cards */}
        <div id="analytics-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {districtStats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl hover:bg-white/15 hover:border-white/30 transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full backdrop-blur-sm ${
                  stat.trend === "up" 
                    ? "bg-green-500/80 text-white shadow-lg shadow-green-500/30" 
                    : "bg-red-500/80 text-white shadow-lg shadow-red-500/30"
                }`}>
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  <span className="text-xs font-bold">
                    {stat.trend === "up" ? "+" : ""}{stat.change}%
                  </span>
                </div>
              </div>
              <h3 className="font-semibold mb-2 text-white text-lg">{stat.district}</h3>
              <div className="text-2xl font-bold text-[#2e3c3a] mb-1">
                {new Intl.NumberFormat("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                  maximumFractionDigits: 0,
                }).format(stat.avgPrice)}
              </div>
              <p className="text-xs text-white/60 mt-2">m² başına ortalama</p>
            </div>
          ))}
        </div>

        {/* Price Trend Chart - Modern Design */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 mb-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-white">Aylık Fiyat Trendi</h2>
              <p className="text-white/60">Son 6 ayın fiyat hareketlilikleri</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-xl">
              <Activity className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceData}>
                <defs>
                  <linearGradient id="colorKadikoy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBesiktas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSisli" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis 
                  dataKey="month" 
                  stroke="#ffffff80" 
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#ffffff80"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) =>
                    new Intl.NumberFormat("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                      maximumFractionDigits: 0,
                    }).format(value)
                  }
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'rgba(46, 60, 58, 0.95)', 
                    border: '1px solid rgba(255, 255, 255, 0.2)', 
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }}
                  formatter={(value: number) =>
                    new Intl.NumberFormat("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                      maximumFractionDigits: 0,
                    }).format(value)
                  }
                />
                <Legend 
                  wrapperStyle={{ color: '#ffffff', fontSize: '14px' }}
                  iconType="circle"
                />
                <Area
                  type="monotone"
                  dataKey="kadikoy"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorKadikoy)"
                  name="Kadıköy"
                />
                <Area
                  type="monotone"
                  dataKey="besiktas"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorBesiktas)"
                  name="Beşiktaş"
                />
                <Area
                  type="monotone"
                  dataKey="sisli"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSisli)"
                  name="Şişli"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* District Comparison - Modern Bar Chart */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-white">Bölge Karşılaştırması</h2>
              <p className="text-white/60">Aylık bazda bölge fiyat karşılaştırması</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-xl">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis 
                  dataKey="month" 
                  stroke="#ffffff80"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#ffffff80"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) =>
                    new Intl.NumberFormat("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                      maximumFractionDigits: 0,
                    }).format(value)
                  }
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'rgba(46, 60, 58, 0.95)', 
                    border: '1px solid rgba(255, 255, 255, 0.2)', 
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }}
                  formatter={(value: number) =>
                    new Intl.NumberFormat("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                      maximumFractionDigits: 0,
                    }).format(value)
                  }
                />
                <Legend 
                  wrapperStyle={{ color: '#ffffff', fontSize: '14px' }}
                  iconType="circle"
                />
                <Bar 
                  dataKey="kadikoy" 
                  fill="url(#gradientKadikoy)" 
                  name="Kadıköy"
                  radius={[8, 8, 0, 0]}
                />
                <Bar 
                  dataKey="besiktas" 
                  fill="url(#gradientBesiktas)" 
                  name="Beşiktaş"
                  radius={[8, 8, 0, 0]}
                />
                <Bar 
                  dataKey="sisli" 
                  fill="url(#gradientSisli)" 
                  name="Şişli"
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient id="gradientKadikoy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#0284c7" stopOpacity={1}/>
                  </linearGradient>
                  <linearGradient id="gradientBesiktas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#059669" stopOpacity={1}/>
                  </linearGradient>
                  <linearGradient id="gradientSisli" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#d97706" stopOpacity={1}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
