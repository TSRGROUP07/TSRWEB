"use client";

import Link from "next/link";
import { ArrowLeft, Wrench, TrendingUp, DollarSign, CheckCircle, Info } from "lucide-react";
import { useEffect } from "react";

// Sabit görsel yolu - mutlak yol kullan (public klasöründen) - TAM OLARAK BU YOL OLMALI
const ALONARSAT_IMAGE = "/ALONARSAT/ALSAT.png";
const ESK_IMAGE = "/ESKİYENİ/ESKİ.png";
const YENI_IMAGE = "/ESKİYENİ/YENİ.png";

export default function AlOnarSatPage() {
  // Görseli preload et - tarayıcı cache'ine al
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = ALONARSAT_IMAGE;
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);
  return (
    <div className="min-h-screen bg-[#b7b1ad] text-white" suppressHydrationWarning>
      {/* Hero Section - AL-ONAR-SAT SAYFASI KAPAK GÖRSELİ - ASLA DEĞİŞMEYECEK */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src="/ALONARSAT/ALSAT.png"
          alt="Al-Onar-Sat - Renovasyon ve Dönüşüm"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 z-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Al-Onar-Sat
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Değer Artışı Sağlayarak Karlı Yatırım
            </p>
          </div>
        </div>
        <Link
          href="/yatirim"
          className="absolute top-6 left-6 z-30 flex items-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Geri Dön</span>
        </Link>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        {/* Overview */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 mb-12 border border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2e3c3a]">
            Hizmet Hakkında
          </h2>
          <p className="text-lg text-white/90 leading-relaxed mb-6">
            Al-Onar-Sat hizmetimiz ile potansiyeli yüksek ancak bakıma ihtiyacı olan emlakları satın alıyor,
            profesyonel ekibimizle yenileme ve iyileştirme işlemlerini gerçekleştiriyoruz.
            Değer artışı sağlanan emlakları piyasa değerinde satarak yatırımcılarımıza karlı getiri sağlıyoruz.
          </p>
          <p className="text-lg text-white/90 leading-relaxed">
            Bu hizmet, emlak yatırımında deneyimli olmayan yatırımcılar için de ideal bir seçenektir.
            Tüm süreç profesyonel ekibimiz tarafından yönetilir.
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] backdrop-blur-md border border-[#2e3c3a] rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <Info className="h-6 w-6 text-white flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Önemli Bilgi</h3>
              <p className="text-white/95">
                Al-Onar-Sat hizmetimiz ile emlaklarınızın değerini ortalama %30-50 artırabilirsiniz.
                Profesyonel yenileme ve iyileştirme işlemleri sayesinde yatırımınızın getiri oranını maksimize ediyoruz.
              </p>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#4f271b]/80 backdrop-blur-md rounded-xl p-6 border border-[#2d2825]/30 hover:border-[#2d2825]/50 transition-all shadow-lg">
            <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">1. Satın Al</h3>
            <p className="text-white/90">
              Potansiyeli yüksek, uygun fiyatlı emlakları tespit edip satın alıyoruz.
            </p>
          </div>

          <div className="bg-[#4f271b]/80 backdrop-blur-md rounded-xl p-6 border border-[#2d2825]/30 hover:border-[#2d2825]/50 transition-all shadow-lg">
            <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <Wrench className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">2. Onar ve Yenile</h3>
            <p className="text-white/90">
              Profesyonel ekibimizle kapsamlı yenileme ve iyileştirme işlemleri yapıyoruz.
            </p>
          </div>

          <div className="bg-[#4f271b]/80 backdrop-blur-md rounded-xl p-6 border border-[#2d2825]/30 hover:border-[#2d2825]/50 transition-all shadow-lg">
            <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">3. Sat ve Karlan</h3>
            <p className="text-white/90">
              Değer artışı sağlanan emlakları piyasa değerinde satarak karlı getiri elde ediyoruz.
            </p>
          </div>
        </div>

        {/* Image Gallery - Before/After */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2e3c3a] text-center">
            Dönüşüm Örnekleri
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
              <h3 className="text-xl font-bold text-[#2e3c3a] py-2 text-center">Eski Hali</h3>
              <div className="relative w-full aspect-[4/3]" suppressHydrationWarning>
                <img
                  src={ESK_IMAGE}
                  alt="Eski Hali"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
              <h3 className="text-xl font-bold text-[#2e3c3a] py-2 text-center">Yeni Hali</h3>
              <div className="relative w-full aspect-[4/3]" suppressHydrationWarning>
                <img
                  src={YENI_IMAGE}
                  alt="Yeni Hali"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 mb-12 border border-white/20 overflow-x-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#2e3c3a] text-center">
            Süreç Detayları
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] text-white">
                  <th className="px-6 py-4 text-left font-bold">Özellik</th>
                  <th className="px-6 py-4 text-center font-bold">Satın Al</th>
                  <th className="px-6 py-4 text-center font-bold">Onar ve Yenile</th>
                  <th className="px-6 py-4 text-center font-bold">Sat ve Karlan</th>
                </tr>
              </thead>
              <tbody className="text-white/90">
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Süre</td>
                  <td className="px-6 py-4 text-center">1-2 Hafta</td>
                  <td className="px-6 py-4 text-center">2-4 Ay</td>
                  <td className="px-6 py-4 text-center">1-2 Ay</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Yatırım</td>
                  <td className="px-6 py-4 text-center">₺200K - ₺2M</td>
                  <td className="px-6 py-4 text-center">₺50K - ₺500K</td>
                  <td className="px-6 py-4 text-center">-</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Profesyonel Ekip</td>
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
                  <td className="px-6 py-4 font-semibold">Kalite Garantisi</td>
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
                <tr className="hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Hukuki Destek</td>
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

        {/* Process Timeline */}
        <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-2xl p-8 md:p-12 mb-12 border border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">
            Süreç Zaman Çizelgesi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Emlak Tespiti</h3>
              <p className="text-white/80 text-sm mb-2">Potansiyeli yüksek emlakları belirliyoruz</p>
              <p className="text-white/60 text-xs">1-2 Hafta</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Yenileme</h3>
              <p className="text-white/80 text-sm mb-2">Profesyonel ekiple kapsamlı yenileme</p>
              <p className="text-white/60 text-xs">2-4 Ay</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Satış</h3>
              <p className="text-white/80 text-sm mb-2">Değer artışı ile karlı satış</p>
              <p className="text-white/60 text-xs">1-2 Ay</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 mb-12 border border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#2e3c3a]">
            Hizmet Avantajları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#2e3c3a]">Profesyonel Yönetim</h3>
                <p className="text-white/80">
                  Tüm süreç profesyonel ekibimiz tarafından yönetilir, siz sadece yatırım yaparsınız.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#2e3c3a]">Yüksek Karlılık</h3>
                <p className="text-white/80">
                  Doğru seçim ve profesyonel yenileme ile yüksek değer artışı sağlanır.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#2e3c3a]">Risk Minimizasyonu</h3>
                <p className="text-white/80">
                  Deneyimli ekibimiz riskleri önceden tespit eder ve minimize eder.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#2e3c3a]">Hızlı Dönüş</h3>
                <p className="text-white/80">
                  Etkin proje yönetimi ile hızlı dönüş süresi sağlanır.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-2xl p-8 md:p-12 text-center border border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Al-Onar-Sat Yatırım Fırsatları
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Karlı yatırım fırsatlarını keşfetmek için bizimle iletişime geçin.
          </p>
          <Link
            href="/#iletisim"
            className="inline-block bg-white text-[#2e3c3a] font-bold px-8 py-4 rounded-lg hover:bg-white/90 transition-all transform hover:scale-105"
          >
            İletişime Geç
          </Link>
        </div>
      </div>
    </div>
  );
}
