"use client";

import Image from "next/image";
import { Globe, Users, TrendingUp, CheckCircle, Search, Instagram, Youtube, Send, Music } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Geniş Ağ",
    description: "Türkiye genelinde geniş dijital satış ağımız",
  },
  {
    icon: Users,
    title: "Uzman Ekip",
    description: "Alanında uzman satış danışmanlarımız",
  },
  {
    icon: TrendingUp,
    title: "Yüksek Başarı",
    description: "Yüksek satış oranları ve müşteri memnuniyeti",
  },
  {
    icon: CheckCircle,
    title: "Güvenilir Hizmet",
    description: "Şeffaf ve güvenilir satış süreçleri",
  },
];

export default function DijitalSatisPage() {
  const handleSearch = () => {
    const searchBar = document.getElementById("search-bar");
    if (searchBar) {
      searchBar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleViewFeatures = () => {
    const featuresGrid = document.getElementById("features-grid");
    if (featuresGrid) {
      featuresGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#b7b1ad] text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden mt-8 mb-8 rounded-2xl mx-4">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop&q=90"
            alt="Dijital Satış Ağı"
            fill
            sizes="100vw"
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
                  Dijital Satış Ağı
                </h1>
                <p className="text-xl md:text-2xl text-white/95 font-medium max-w-2xl leading-relaxed">
                  Modern teknoloji ile güçlendirilmiş dijital satış ağımız.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={handleSearch}
                  className="bg-white hover:bg-white/95 text-[#2e3c3a] px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-2xl text-lg cursor-pointer"
                >
                  <Search className="h-6 w-6" />
                  <span>Özellikleri Gör</span>
                </button>
                <button 
                  onClick={handleViewFeatures}
                  className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 text-lg cursor-pointer"
                >
                  <span>Detayları İncele</span>
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
                placeholder="Özellik ara..."
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

        <div id="features-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-[#4f271b]/60 backdrop-blur-md border border-[#2d2825]/30 rounded-xl shadow-lg p-6 hover:shadow-xl hover:bg-[#4f271b]/70 transition-all"
              >
                <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white rounded-xl p-12 border border-[#2e3c3a]/50 shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Dijital Satış Ağımızın Avantajları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Teknoloji Entegrasyonu</h3>
              <p className="text-white/80">
                En son teknolojileri kullanarak satış süreçlerimizi dijitalleştirdik.
                Müşterilerimiz online platformlar üzerinden kolayca hizmet alabilirler.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Geniş Erişim</h3>
              <p className="text-white/80">
                Türkiye'nin her yerinden müşterilerimize hizmet veriyoruz.
                Fiziksel sınırlar olmadan, dijital platformlar üzerinden hizmet sunuyoruz.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Hızlı İşlem</h3>
              <p className="text-white/80">
                Dijital süreçler sayesinde işlemlerinizi hızlıca tamamlayabilirsiniz.
                Belge hazırlama, onay süreçleri ve iletişim dijital platformlar üzerinden yönetilir.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">7/24 Erişim</h3>
              <p className="text-white/80">
                Dijital platformlarımız 7/24 aktif. İstediğiniz zaman bilgi alabilir,
                işlemlerinizi takip edebilir ve destek alabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
