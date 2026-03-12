"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, Calendar, Key, CheckCircle, Info, Users, Wifi, Car, MapPin, Star, ArrowLeft, TrendingUp, DollarSign, Shield, Search, Instagram, Youtube, Send, Music, ChevronDown } from "lucide-react";

export default function KirayaVermekPage() {
  const [propertyType, setPropertyType] = useState("Tümü");
  const [location, setLocation] = useState("Tümü");
  const [bedrooms, setBedrooms] = useState("Tümü");

  const handleSearch = () => {
    const searchBar = document.getElementById("search-bar");
    if (searchBar) {
      searchBar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleViewInfo = () => {
    const infoSection = document.getElementById("info-section");
    if (infoSection) {
      infoSection.scrollIntoView({ behavior: "smooth", block: "start" });
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
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=90"
              alt="Kiraya Vermek İstiyorum"
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
          <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center">
            <div className="w-full max-w-4xl">
              <div className="space-y-6 md:space-y-8">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
                    Kiraya Vermek İstiyorum
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-white/95 font-medium max-w-2xl leading-relaxed">
                    Emlakınızı günlük kiralama ile değerlendirin, ek gelir elde edin. Profesyonel yönetim hizmetimiz ile yüksek getiri sağlayın.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleSearch}
                    className="bg-white hover:bg-white/95 text-[#2e3c3a] px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-2xl text-lg cursor-pointer"
                  >
                    <Search className="h-6 w-6" />
                    <span>Bilgi Al</span>
                  </button>
                  <button
                    onClick={handleViewInfo}
                    className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 text-lg cursor-pointer"
                  >
                    <span>Detayları Gör</span>
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
              {/* Property Type */}
              <div className="space-y-2">
                <label className="text-sm text-white/80 uppercase">EMLAK TİPİ</label>
                <div className="relative">
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none appearance-none cursor-pointer"
                    style={{ color: 'white' }}
                  >
                    <option value="Tümü" style={{ background: '#2e3c3a', color: 'white' }}>Tümü</option>
                    <option value="Daire" style={{ background: '#2e3c3a', color: 'white' }}>Daire</option>
                    <option value="Villa" style={{ background: '#2e3c3a', color: 'white' }}>Villa</option>
                    <option value="Studio" style={{ background: '#2e3c3a', color: 'white' }}>Studio</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70 pointer-events-none" />
                </div>
              </div>

              {/* Location */}
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
                    <option value="Kleopatra Plajı" style={{ background: '#2e3c3a', color: 'white' }}>Kleopatra Plajı</option>
                    <option value="Keykubat Plajı" style={{ background: '#2e3c3a', color: 'white' }}>Keykubat Plajı</option>
                    <option value="Mahmutlar" style={{ background: '#2e3c3a', color: 'white' }}>Mahmutlar</option>
                    <option value="Oba" style={{ background: '#2e3c3a', color: 'white' }}>Oba</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70 pointer-events-none" />
                </div>
              </div>

              {/* Search Button */}
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

        {/* Content Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
          {/* Info Banner */}
          <div id="info-section" className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] backdrop-blur-md border border-[#2e3c3a] rounded-xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <Info className="h-6 w-6 text-white flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Önemli Bilgi</h3>
                <p className="text-white/95">
                  Emlakınızı günlük kiralama ile değerlendirerek aylık gelirinizi %30-50 artırabilirsiniz.
                  Profesyonel yönetim hizmetimiz ile tüm süreç bizim kontrolümüzde. Siz sadece gelir elde edin.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
              <div className="p-3 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-xl w-fit mb-4">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Yüksek Getiri</h3>
              <p className="text-white/80">
                Günlük kiralama ile geleneksel kiradan %30-50 daha fazla gelir
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
              <div className="p-3 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-xl w-fit mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Güvenli Yönetim</h3>
              <p className="text-white/80">
                Profesyonel ekibimiz tüm süreci yönetir, güvenliğiniz sağlanır
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
              <div className="p-3 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-xl w-fit mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Esnek Kullanım</h3>
              <p className="text-white/80">
                İstediğiniz zaman kendi kullanımınız için rezervasyon yapabilirsiniz
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 mb-12 border border-white/20 overflow-x-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#2e3c3a] text-center">
              Gelir Karşılaştırması
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] text-white">
                    <th className="px-6 py-4 text-left font-bold">Özellik</th>
                    <th className="px-6 py-4 text-center font-bold">Geleneksel Kira</th>
                    <th className="px-6 py-4 text-center font-bold">Günlük Kiralama</th>
                  </tr>
                </thead>
                <tbody className="text-white/90">
                  <tr className="border-b border-white/10 hover:bg-white/5">
                    <td className="px-6 py-4 font-semibold">Aylık Gelir</td>
                    <td className="px-6 py-4 text-center">₺5,000 - ₺10,000</td>
                    <td className="px-6 py-4 text-center">₺15,000 - ₺25,000</td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/5">
                    <td className="px-6 py-4 font-semibold">Doluluk Oranı</td>
                    <td className="px-6 py-4 text-center">%100 (Sabit)</td>
                    <td className="px-6 py-4 text-center">%60-80 (Değişken)</td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/5">
                    <td className="px-6 py-4 font-semibold">Yönetim Hizmeti</td>
                    <td className="px-6 py-4 text-center">-</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="h-5 w-5 text-[#2e3c3a] mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/5">
                    <td className="px-6 py-4 font-semibold">Temizlik Hizmeti</td>
                    <td className="px-6 py-4 text-center">-</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="h-5 w-5 text-[#2e3c3a] mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/5">
                    <td className="px-6 py-4 font-semibold">Rezervasyon Yönetimi</td>
                    <td className="px-6 py-4 text-center">-</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="h-5 w-5 text-[#2e3c3a] mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="px-6 py-4 font-semibold">Esneklik</td>
                    <td className="px-6 py-4 text-center">Düşük</td>
                    <td className="px-6 py-4 text-center">Yüksek</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Process Timeline */}
          <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-2xl p-8 md:p-12 mb-12 border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">
              Süreç Adımları
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Başvuru</h3>
                <p className="text-white/80 text-sm">Emlakınızı kaydedin</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Değerlendirme</h3>
                <p className="text-white/80 text-sm">Emlak değerlendirmesi</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Hazırlık</h3>
                <p className="text-white/80 text-sm">Fotoğraf ve tanıtım</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Yayınlama</h3>
                <p className="text-white/80 text-sm">Platformlarda yayın</p>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white rounded-2xl p-8 mb-12 border border-white/10 shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Hizmetlerimiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Yönetim Hizmetleri</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-white/90">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                    <span>Rezervasyon yönetimi</span>
                  </li>
                  <li className="flex items-center text-white/90">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                    <span>Misafir iletişimi</span>
                  </li>
                  <li className="flex items-center text-white/90">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                    <span>Ödeme takibi</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Destek Hizmetleri</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-white/90">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                    <span>Profesyonel temizlik</span>
                  </li>
                  <li className="flex items-center text-white/90">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                    <span>Bakım ve onarım</span>
                  </li>
                  <li className="flex items-center text-white/90">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                    <span>7/24 destek hattı</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Emlakınızı Kiraya Verin</h2>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Emlakınızı günlük kiralama ile değerlendirmek için bizimle iletişime geçin.
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
      </div>
    </>
  );
}
