"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Activity, 
  MapPin, 
  Building2,
  DollarSign,
  Users,
  Calendar,
  Filter,
  Search,
  Instagram,
  Youtube,
  Send,
  Music
} from "lucide-react";
import { 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";

interface MarketData {
  propertyType: string;
  count: number;
  avgPrice: number;
  percentage: number;
}

interface DistrictData {
  district: string;
  properties: number;
  avgPrice: number;
  growth: number;
}

interface TimeSeriesData {
  month: string;
  sales: number;
  rentals: number;
  avgPrice: number;
}

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function AnalitikPage() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [districtData, setDistrictData] = useState<DistrictData[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Örnek veri - Gerçek uygulamada API'den gelecek
      const mockMarketData: MarketData[] = [
        { propertyType: "Daire", count: 450, avgPrice: 85000, percentage: 45 },
        { propertyType: "Villa", count: 120, avgPrice: 250000, percentage: 20 },
        { propertyType: "Rezidans", count: 180, avgPrice: 120000, percentage: 18 },
        { propertyType: "Ticari", count: 90, avgPrice: 95000, percentage: 12 },
        { propertyType: "Arsa", count: 60, avgPrice: 150000, percentage: 5 },
      ];

      const mockDistrictData: DistrictData[] = [
        { district: "Kadıköy", properties: 320, avgPrice: 92000, growth: 8.2 },
        { district: "Beşiktaş", properties: 280, avgPrice: 102000, growth: 10.5 },
        { district: "Şişli", properties: 250, avgPrice: 97000, growth: 7.8 },
        { district: "Bakırköy", properties: 180, avgPrice: 78000, growth: -2.1 },
        { district: "Üsküdar", properties: 200, avgPrice: 75000, growth: 5.3 },
        { district: "Ataşehir", properties: 220, avgPrice: 88000, growth: 6.7 },
      ];

      const mockTimeSeriesData: TimeSeriesData[] = [
        { month: "Ocak", sales: 120, rentals: 85, avgPrice: 85000 },
        { month: "Şubat", sales: 135, rentals: 92, avgPrice: 87000 },
        { month: "Mart", sales: 150, rentals: 98, avgPrice: 89000 },
        { month: "Nisan", sales: 165, rentals: 105, avgPrice: 92000 },
        { month: "Mayıs", sales: 180, rentals: 112, avgPrice: 95000 },
        { month: "Haziran", sales: 195, rentals: 120, avgPrice: 98000 },
      ];

      setMarketData(mockMarketData);
      setDistrictData(mockDistrictData);
      setTimeSeriesData(mockTimeSeriesData);
    } catch (error) {
      console.error("Analitik veriler yüklenemedi:", error);
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
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&q=90"
            alt="Analitik ve Veri Görselleştirme"
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
                  Analitik ve Veri Görselleştirme
                </h1>
                <p className="text-xl md:text-2xl text-white/95 font-medium max-w-2xl leading-relaxed">
                  Detaylı emlak analitiği ve interaktif veri görselleştirme araçları ile piyasa hakkında kapsamlı bilgi edinin.
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

        {/* Stats Overview */}
        <div id="analytics-grid" className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-xl">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">1,200+</div>
            <div className="text-white/60">Toplam İlan</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">₺95K</div>
            <div className="text-white/60">Ortalama Fiyat</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <Activity className="h-5 w-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">315</div>
            <div className="text-white/60">Aktif Kullanıcı</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-xl">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">+12%</div>
            <div className="text-white/60">Aylık Artış</div>
          </div>
        </div>

        {/* Property Type Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2 text-white">Gayrimenkul Dağılımı</h2>
                <p className="text-white/60">İlan türlerine göre dağılım</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-xl">
                <PieChart className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={marketData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {marketData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: 'rgba(46, 60, 58, 0.95)', 
                      border: '1px solid rgba(255, 255, 255, 0.2)', 
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ color: '#ffffff', fontSize: '14px' }}
                    iconType="circle"
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2 text-white">Bölge Performansı</h2>
                <p className="text-white/60">Bölgelere göre ortalama fiyatlar</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-xl">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={districtData} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis 
                    dataKey="district" 
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
                    dataKey="avgPrice" 
                    fill="url(#gradientBar)" 
                    radius={[8, 8, 0, 0]}
                    name="Ortalama Fiyat (m²)"
                  />
                  <defs>
                    <linearGradient id="gradientBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#0284c7" stopOpacity={1}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Time Series Analysis */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 mb-12 hover:shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-white">Zaman Serisi Analizi</h2>
              <p className="text-white/60">Satış, kiralama ve fiyat trendleri</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-xl">
              <Activity className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRentals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
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
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'rgba(46, 60, 58, 0.95)', 
                    border: '1px solid rgba(255, 255, 255, 0.2)', 
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <Legend 
                  wrapperStyle={{ color: '#ffffff', fontSize: '14px' }}
                  iconType="circle"
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                  name="Satış"
                />
                <Area
                  type="monotone"
                  dataKey="rentals"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRentals)"
                  name="Kiralama"
                />
                <Line
                  type="monotone"
                  dataKey="avgPrice"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  name="Ortalama Fiyat"
                  dot={{ fill: '#f59e0b', r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* District Comparison Table */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-white">Bölge Detay Karşılaştırması</h2>
              <p className="text-white/60">Bölgelere göre detaylı istatistikler</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-xl">
              <Filter className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 px-4 text-white font-semibold">Bölge</th>
                  <th className="text-right py-4 px-4 text-white font-semibold">İlan Sayısı</th>
                  <th className="text-right py-4 px-4 text-white font-semibold">Ortalama Fiyat</th>
                  <th className="text-right py-4 px-4 text-white font-semibold">Büyüme</th>
                </tr>
              </thead>
              <tbody>
                {districtData.map((district, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#2e3c3a]" />
                        <span className="text-white font-medium">{district.district}</span>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4 text-white">{district.properties}</td>
                    <td className="text-right py-4 px-4 text-white">
                      {new Intl.NumberFormat("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                        maximumFractionDigits: 0,
                      }).format(district.avgPrice)}
                    </td>
                    <td className="text-right py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold ${
                        district.growth >= 0
                          ? "bg-green-500/80 text-white"
                          : "bg-red-500/80 text-white"
                      }`}>
                        {district.growth >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingUp className="h-3 w-3 rotate-180" />
                        )}
                        {district.growth >= 0 ? "+" : ""}{district.growth}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
