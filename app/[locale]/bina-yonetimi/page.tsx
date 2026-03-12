"use client";

import Image from "next/image";
import Link from "next/link";
import { Building2, Users, Wrench, FileText, CheckCircle, TrendingUp, Award, Info, Clock, Shield, Settings, Home, Search, Instagram, Youtube, Send, Music } from "lucide-react";

export default function BinaYonetimiPage() {
  // İstatistikler - Yönetilen binalar hakkında genel bilgiler
  const managedBuildings = 45;
  const totalApartments = 1200;
  const satisfiedClients = 98;
  const yearsOfExperience = 15;

  const handleSearch = () => {
    const searchBar = document.getElementById("search-bar");
    if (searchBar) {
      searchBar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleViewServices = () => {
    const servicesGrid = document.getElementById("services-grid");
    if (servicesGrid) {
      servicesGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#b7b1ad] text-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden mt-8 mb-8 rounded-2xl mx-4">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop&q=90"
            alt="Bina ve Daire Yönetimi"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Hafif koyu overlay - sadece yazıların okunabilirliği için */}
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
            {/* Text Content */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
                  Bina ve Daire Yönetimi
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-white/95 font-medium max-w-2xl leading-relaxed">
                  Profesyonel bina ve daire yönetim hizmetleri ile emlakınızın değerini artırın. Yönetim kurulu danışmanlığından finansal yönetime, bakım-onarım planlamasından operasyonel desteğe kadar kapsamlı hizmetlerimiz ile yanınızdayız.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleSearch}
                  className="bg-white hover:bg-white/95 text-[#2e3c3a] px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-2xl text-lg cursor-pointer"
                >
                  <Search className="h-6 w-6" />
                  <span>Hizmetleri Keşfet</span>
                </button>
                <button
                  onClick={handleViewServices}
                  className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 text-lg cursor-pointer"
                >
                  <span>Detayları Gör</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12">

        {/* Info Banner */}
        <div id="search-bar" className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] backdrop-blur-md border border-[#2e3c3a] rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <Info className="h-6 w-6 text-white flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Önemli Bilgi</h3>
              <p className="text-white/95">
                TSR Group olarak, {yearsOfExperience} yıllık deneyimimiz ile {managedBuildings} binada {totalApartments} daireyi profesyonelce yönetiyoruz.
                Yönetim kurulu danışmanlığından finansal yönetime, bakım-onarım planlamasından operasyonel desteğe kadar
                kapsamlı hizmetlerimiz ile binalarınızın değerini artırıyor ve yaşam kalitesini yükseltiyoruz.
              </p>
            </div>
          </div>
        </div>

        {/* Süreç Adımları */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2e3c3a]">Yönetim Süreci</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Bina ve daire yönetim sürecimiz
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2e3c3a] to-[#3a4d4a] hidden md:block"></div>
            <div className="space-y-8">
              {[
                { icon: FileText, title: "İlk Değerlendirme", description: "Bina ve daire durumunu analiz ediyor, ihtiyaçları belirliyoruz" },
                { icon: Settings, title: "Yönetim Planı", description: "Özel yönetim planı hazırlıyor ve onayınıza sunuyoruz" },
                { icon: Shield, title: "Finansal Yönetim", description: "Bütçe planlaması ve aidat takibini başlatıyoruz" },
                { icon: Wrench, title: "Operasyonel Hizmetler", description: "Bakım-onarım ve günlük yönetim hizmetlerini yürütüyoruz" },
                { icon: Clock, title: "Düzenli Takip", description: "Düzenli raporlama ve sürekli iletişim ile hizmet kalitesini koruyoruz" },
              ].map((step, index) => (
                <div key={index} className="relative flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-full flex items-center justify-center shadow-lg z-10">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-white/80">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hizmet Görselleri */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2e3c3a]">Yönetim Hizmetlerimiz</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Sunduğumuz bina ve daire yönetim hizmetleri
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop", title: "Yönetim Danışmanlığı", description: "Yönetim kurulu toplantıları ve planlama" },
              { image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop", title: "Finansal Yönetim", description: "Bütçe planlaması ve aidat takibi" },
              { image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", title: "Operasyonel Destek", description: "Bakım-onarım ve günlük yönetim" },
            ].map((item, index) => (
              <div key={index} className="group relative rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-48 w-full bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-white text-xl font-bold group-hover:text-white/90 transition-colors drop-shadow-lg">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-sm mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 hover:shadow-xl hover:bg-white/15 transition-all">
            <div className="flex items-center justify-between mb-2">
              <Building2 className="h-8 w-8 text-[#2e3c3a]" />
              <span className="text-2xl font-bold text-white">{managedBuildings}</span>
            </div>
            <div className="text-white/80">Yönetilen Bina</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 hover:shadow-xl hover:bg-white/15 transition-all">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-[#2e3c3a]" />
              <span className="text-2xl font-bold text-white">{totalApartments}</span>
            </div>
            <div className="text-white/80">Toplam Daire</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 hover:shadow-xl hover:bg-white/15 transition-all">
            <div className="flex items-center justify-between mb-2">
              <Award className="h-8 w-8 text-[#2e3c3a]" />
              <span className="text-2xl font-bold text-white">%{satisfiedClients}</span>
            </div>
            <div className="text-white/80">Memnuniyet Oranı</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 hover:shadow-xl hover:bg-white/15 transition-all">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8 text-[#2e3c3a]" />
              <span className="text-2xl font-bold text-white">{yearsOfExperience}+</span>
            </div>
            <div className="text-white/80">Yıl Deneyim</div>
          </div>
        </div>

        {/* Hizmet Türleri Karşılaştırması */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 mb-12 border border-white/20 overflow-x-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#2e3c3a] text-center">
            Hizmet Türleri Karşılaştırması
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] text-white">
                  <th className="px-6 py-4 text-left font-bold">Hizmet</th>
                  <th className="px-6 py-4 text-center font-bold">Yönetim Danışmanlığı</th>
                  <th className="px-6 py-4 text-center font-bold">Finansal Yönetim</th>
                  <th className="px-6 py-4 text-center font-bold">Operasyonel Destek</th>
                </tr>
              </thead>
              <tbody className="text-white/90">
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Yönetim Kurulu Toplantıları</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">-</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Bütçe Planlaması</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">-</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Aidat Takibi</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">-</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Bakım-Onarım Planlaması</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Hizmet Alımı</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Mali Raporlama</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">-</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Daire Yönetimi</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Hukuki Destek</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Services Section */}
        <div id="services-grid" className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white rounded-2xl p-8 mb-12 border border-white/10 shadow-xl">
          <h2 className="text-3xl font-bold mb-6">Bina ve Daire Yönetim Hizmetlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Yönetim Hizmetleri</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Yönetim kurulu danışmanlığı</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Toplantı organizasyonu ve karar alma süreçleri</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Finansal yönetim ve bütçe planlaması</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Hukuki destek ve sözleşme yönetimi</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Operasyonel Hizmetler</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Daire yönetimi ve koordinasyon</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Bakım-onarım planlaması ve takibi</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Güvenlik ve temizlik hizmetleri</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Teknik sistemler yönetimi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Neden TSR GROUP */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-[#2e3c3a] text-center">Neden TSR GROUP?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Deneyimli Ekip</h3>
              <p className="text-white/80">
                {yearsOfExperience} yıllık deneyimimiz ile bina yönetiminde uzman ekibimiz
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Kapsamlı Hizmet</h3>
              <p className="text-white/80">
                Yönetimden finansal işlemlere, bakımdan hukuki süreçlere kadar tüm ihtiyaçlarınız için çözüm
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Şeffaf Yönetim</h3>
              <p className="text-white/80">
                Düzenli raporlama ve şeffaf iletişim ile güvenilir hizmet
              </p>
            </div>
          </div>
        </div>

        {/* İletişim */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            İletişime Geç
          </Link>
        </div>
      </div>
    </div>
  );
}
