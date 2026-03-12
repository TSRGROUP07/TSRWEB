"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Scale, FileText, Shield, CheckCircle, Info, User, Mail, Phone, Briefcase, Gavel, Building2, FileCheck, Clock, Search, Instagram, Youtube, Send, Music } from "lucide-react";
import Link from "next/link";
import { getServiceSchema } from "@/lib/seo";

export default function HukukiPage() {
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

  // Structured data for SEO
  useEffect(() => {
    const structuredData = getServiceSchema({
      name: "TSR GROUP Hukuki Danışmanlık",
      description: "Alanya ve Antalya'da profesyonel hukuki danışmanlık hizmeti. Emlak hukuku, ticaret hukuku, yatırım hukuku. Sözleşme hazırlama, tapu işlemleri, şirket kuruluş danışmanlığı.",
      provider: "TSR GROUP",
      areaServed: ["Alanya", "Antalya"],
      url: "/hukuki",
      serviceType: "Hukuki Danışmanlık",
    });
    
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    script.id = "structured-data-hukuki";
    
    // Remove existing if any
    const existing = document.getElementById("structured-data-hukuki");
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);
    
    return () => {
      const scriptToRemove = document.getElementById("structured-data-hukuki");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#b7b1ad] text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden mt-8 mb-8 rounded-2xl mx-4">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop&q=90"
            alt="Hukuki Danışmanlık"
            fill
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
                  Hukuki Danışmanlık
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-white/95 font-medium max-w-2xl leading-relaxed">
                  TSR GROUP ile emlak, ticaret ve yatırım konularında profesyonel hukuki danışmanlık hizmeti. Deneyimli hukuk ekibimiz ile yanınızdayız.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleSearch}
                  className="bg-white hover:bg-white/95 text-[#2e3c3a] px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-2xl text-lg cursor-pointer"
                >
                  <Search className="h-6 w-6" />
                  <span>Hizmetleri Gör</span>
                </button>
                <button
                  onClick={handleViewServices}
                  className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 text-lg cursor-pointer"
                >
                  <span>Detayları İncele</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 pb-12">

        {/* Info Banner */}
        <div id="search-bar" className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] backdrop-blur-md border border-[#2e3c3a] rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <Info className="h-6 w-6 text-white flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Önemli Bilgi</h3>
              <p className="text-white/95">
                TSR Group olarak, tüm emlak işlemlerinizde yasal güvence sağlıyoruz. Deneyimli hukuk ekibimiz ile
                sözleşmelerinizin hazırlanmasından tapu işlemlerine kadar her aşamada yanınızdayız.
                Yatırım kararlarınızı güvenle almanız için profesyonel hukuki danışmanlık hizmeti sunuyoruz.
              </p>
            </div>
          </div>
        </div>

        {/* Authorized Person Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-200 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2e3c3a]">Yetkili Kişi</h2>
            <p className="text-lg text-gray-700">
              Hukuki danışmanlık hizmetlerimizden sorumlu yetkili kişimiz
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-[#2e3c3a] shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] flex items-center justify-center">
                <User className="h-24 w-24 text-white" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-[#2e3c3a] mb-2">Emriye Kasımoğlu</h3>
              <p className="text-lg text-gray-700 mb-4">Hukuki Danışman</p>
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-700">
                  <Mail className="h-5 w-5 text-[#2e3c3a]" />
                  <span>hukuki@tsrgroup.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-700">
                  <Phone className="h-5 w-5 text-[#2e3c3a]" />
                  <span>+90 (XXX) XXX XX XX</span>
                </div>
              </div>
            </div>
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
                  <th className="px-6 py-4 text-center font-bold">Emlak Hukuku</th>
                  <th className="px-6 py-4 text-center font-bold">Ticaret Hukuku</th>
                  <th className="px-6 py-4 text-center font-bold">Yatırım Hukuku</th>
                </tr>
              </thead>
              <tbody className="text-white/90">
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Sözleşme Hazırlama</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Hukuki İnceleme</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Tapu İşlemleri</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Şirket Kuruluş</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">-</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Yatırım Danışmanlığı</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Uyuşmazlık Çözümü</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Süreç Adımları */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2e3c3a]">Süreç Adımları</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Hukuki danışmanlık sürecimiz
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2e3c3a] to-[#3a4d4a] hidden md:block"></div>
            <div className="space-y-8">
              {[
                { icon: FileText, title: "İlk Görüşme", description: "İhtiyaçlarınızı belirlemek için detaylı görüşme yapıyoruz" },
                { icon: Gavel, title: "Hukuki İnceleme", description: "Dosyanızı hukuki açıdan inceliyor ve analiz ediyoruz" },
                { icon: FileCheck, title: "Sözleşme Hazırlama", description: "Gerekli sözleşmeleri hazırlıyor ve onayınıza sunuyoruz" },
                { icon: Building2, title: "İşlem Takibi", description: "Tapu ve diğer resmi işlemlerin takibini yapıyoruz" },
                { icon: Shield, title: "Tamamlanma", description: "Tüm işlemler tamamlandıktan sonra belgelerinizi teslim ediyoruz" },
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2e3c3a]">Hukuki Danışmanlık Alanlarımız</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Uzmanlaştığımız hukuki danışmanlık alanları
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop", title: "Emlak Hukuku", description: "Alım-satım, kiralama ve tapu işlemleri" },
              { image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop", title: "Ticaret Hukuku", description: "Şirket kuruluş ve ticari sözleşmeler" },
              { image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop", title: "Yatırım Hukuku", description: "Yatırım projeleri ve danışmanlık" },
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

        {/* Services Section */}
        <div id="services-grid" className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white rounded-2xl p-8 mb-12 border border-white/10 shadow-xl">
          <h2 className="text-3xl font-bold mb-6">Hukuki Danışmanlık Hizmetlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Emlak Hukuku</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Alım-satım sözleşmeleri</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Kiralama sözleşmeleri</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Tapu işlemleri danışmanlığı</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>İpotek ve rehin işlemleri</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Kentsel dönüşüm hukuku</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Ticaret Hukuku</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Şirket kuruluş danışmanlığı</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Ticari sözleşmeler</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Yatırım danışmanlığı</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Birleşme ve devir işlemleri</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Uyuşmazlık çözümü</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Hukuki Danışmanlık Hizmeti</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Hukuki danışmanlık hizmeti için bizimle iletişime geçin.
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
  );
}
