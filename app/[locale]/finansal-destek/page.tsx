"use client";

import Image from "next/image";
import { DollarSign, CreditCard, FileText, CheckCircle, TrendingUp, Shield, Globe, Building2, Info, Clock, Percent, Briefcase, UserCheck, Search, Instagram, Youtube, Send, Music } from "lucide-react";
import Link from "next/link";

export default function FinansalDestekPage() {
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
            src="/KURUMSAL/bank.png"
            alt="Finansal Destek"
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
        <div className="relative z-20 container mx-auto px-6 lg:px-12 h-full flex items-center">
          <div className="w-full max-w-4xl">
            {/* Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
                  Finansal Destek
                </h1>
                <p className="text-xl md:text-2xl text-white/95 font-medium max-w-2xl leading-relaxed">
                  Emlak yatırımlarınız için kapsamlı finansal çözümler ve danışmanlık hizmetleri. Kredi danışmanlığından teşvik programlarına, vatandaşlık desteğine kadar geniş bir yelpazede hizmet sunuyoruz.
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

      <div className="container mx-auto px-6 lg:px-12 py-12">

        {/* Info Banner */}
        <div id="search-bar" className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] backdrop-blur-md border border-[#2e3c3a] rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <Info className="h-6 w-6 text-white flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Önemli Bilgi</h3>
              <p className="text-white/95">
                TSR Group olarak, emlak yatırımlarınız için en uygun finansman çözümlerini bulmanıza yardımcı oluyoruz. 
                Bankalar ve finans kurumları ile güçlü iş ortaklıklarımız sayesinde, kredi başvurularınızdan teşvik programlarına, 
                vatandaşlık süreçlerinden yatırım danışmanlığına kadar geniş bir yelpazede hizmet sunuyoruz.
              </p>
            </div>
          </div>
        </div>

        {/* Hizmet Türleri Karşılaştırması */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 mb-12 border border-white/20 overflow-x-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#2e3c3a] text-center">
            Finansal Destek Hizmetleri Karşılaştırması
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] text-white">
                  <th className="px-6 py-4 text-left font-bold">Hizmet</th>
                  <th className="px-6 py-4 text-center font-bold">Kredi Danışmanlığı</th>
                  <th className="px-6 py-4 text-center font-bold">Teşvik Programları</th>
                  <th className="px-6 py-4 text-center font-bold">Vatandaşlık Desteği</th>
                </tr>
              </thead>
              <tbody className="text-white/90">
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Emlak Kredisi</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">-</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Yatırım Kredisi</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">-</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Belge Hazırlığı</td>
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
                  <td className="px-6 py-4 font-semibold">Devlet Teşvikleri</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">-</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Vergi İndirimleri</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">-</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Vatandaşlık Başvurusu</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Vize İşlemleri</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-primary-600 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Süreç Takibi</td>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2e3c3a]">Başvuru Süreci</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Finansal destek başvuru sürecimiz
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2e3c3a] to-[#3a4d4a] hidden md:block"></div>
            <div className="space-y-8">
              {[
                { icon: FileText, title: "Başvuru", description: "Finansal ihtiyaçlarınızı belirlemek için detaylı görüşme yapıyoruz" },
                { icon: Briefcase, title: "Belge Hazırlığı", description: "Gerekli tüm belgeleri hazırlıyor ve eksiksiz dosya oluşturuyoruz" },
                { icon: CreditCard, title: "Kredi Değerlendirme", description: "En uygun kredi seçeneklerini değerlendiriyor ve sunuyoruz" },
                { icon: Percent, title: "Teşvik Başvurusu", description: "Uygun teşvik programlarını belirleyip başvurularınızı yapıyoruz" },
                { icon: UserCheck, title: "Onay ve Takip", description: "Başvuru süreçlerini takip ediyor ve onay sonuçlarını size bildiriyoruz" },
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2e3c3a]">Finansal Destek Alanlarımız</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Sunduğumuz finansal destek hizmetleri
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop", title: "Kredi Danışmanlığı", description: "Emlak ve yatırım kredileri" },
              { image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop", title: "Teşvik Programları", description: "Devlet ve özel sektör teşvikleri" },
              { image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop", title: "Vatandaşlık Desteği", description: "Vize ve vatandaşlık işlemleri" },
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
          <h2 className="text-3xl font-bold mb-6">Finansal Destek Hizmetlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Kredi Danışmanlığı</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Emlak kredisi danışmanlığı</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Yatırım kredisi çözümleri</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Belge hazırlığı ve takip</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Kredi onay süreci desteği</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Teşvik ve Vatandaşlık</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Devlet teşvikleri ve hibeler</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Vergi indirimleri ve muafiyetleri</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Türkiye vatandaşlığı başvuru desteği</span>
                </li>
                <li className="flex items-center text-white/90">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                  <span>Yabancı yatırımcı vize işlemleri</span>
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
              <h3 className="text-xl font-semibold mb-2 text-white">Uzman Ekip</h3>
              <p className="text-white/80">
                Finansal danışmanlık konusunda deneyimli ekibimiz
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Geniş Ağ</h3>
              <p className="text-white/80">
                Bankalar ve finans kurumları ile güçlü iş ortaklıkları
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Kişisel Çözüm</h3>
              <p className="text-white/80">
                Her yatırımcı için özel finansman çözümleri
              </p>
            </div>
          </div>
        </div>

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
