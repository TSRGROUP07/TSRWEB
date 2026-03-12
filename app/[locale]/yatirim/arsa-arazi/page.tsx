"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, TrendingUp, DollarSign, Compass, BarChart3, Info, CheckCircle } from "lucide-react";

export default function ArsaAraziPage() {
  return (
    <div className="min-h-screen bg-[#b7b1ad] text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=1080&fit=crop"
          alt="Karlı Arsa ve Arazi Yatırımları"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 z-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Karlı Arsa ve Arazi Yatırımları
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Geleceğe Yatırım Yapın
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
            Arsa ve arazi yatırımları, uzun vadeli değer artışı potansiyeli yüksek yatırım seçenekleridir. 
            TSR Group olarak, yüksek potansiyelli arsa ve arazi yatırım fırsatlarını sizlerle buluşturuyoruz.
          </p>
          <p className="text-lg text-white/90 leading-relaxed">
            Şehir gelişim planları, altyapı projeleri ve bölgesel gelişim potansiyeli analiz edilerek 
            en karlı yatırım fırsatları belirlenir ve yatırımcılarımıza sunulur.
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] backdrop-blur-md border border-[#2e3c3a] rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <Info className="h-6 w-6 text-white flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Önemli Bilgi</h3>
              <p className="text-white/95">
                Arsa ve arazi yatırımları uzun vadede %50-200 arası değer artışı potansiyeline sahiptir. 
                Stratejik lokasyonlarda erken yatırım yaparak maksimum getiri elde edebilirsiniz.
              </p>
            </div>
          </div>
        </div>

        {/* Investment Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#4f271b]/80 backdrop-blur-md rounded-xl p-6 border border-[#2d2825]/30 hover:border-[#2d2825]/50 transition-all shadow-lg">
            <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Şehir Arsaları</h3>
            <p className="text-white/90">
              Şehir merkezinde yüksek potansiyelli arsa yatırım fırsatları.
            </p>
          </div>

          <div className="bg-[#4f271b]/80 backdrop-blur-md rounded-xl p-6 border border-[#2d2825]/30 hover:border-[#2d2825]/50 transition-all shadow-lg">
            <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <Compass className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Gelişim Bölgeleri</h3>
            <p className="text-white/90">
              Altyapı ve gelişim projeleri ile değer artışı potansiyeli yüksek araziler.
            </p>
          </div>

          <div className="bg-[#4f271b]/80 backdrop-blur-md rounded-xl p-6 border border-[#2d2825]/30 hover:border-[#2d2825]/50 transition-all shadow-lg">
            <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Yatırım Analizi</h3>
            <p className="text-white/90">
              Detaylı pazar analizi ve yatırım potansiyeli değerlendirmesi.
            </p>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#2e3c3a] text-center">
            Yatırım Fırsatları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative h-64 rounded-xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop"
                alt="Şehir Arsaları"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <span className="text-white font-bold">Şehir Arsaları</span>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop"
                alt="Gelişim Bölgeleri"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <span className="text-white font-bold">Gelişim Bölgeleri</span>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop"
                alt="Yatırım Analizi"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <span className="text-white font-bold">Yatırım Analizi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 mb-12 border border-white/20 overflow-x-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#2e3c3a] text-center">
            Yatırım Türleri Karşılaştırması
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] text-white">
                  <th className="px-6 py-4 text-left font-bold">Özellik</th>
                  <th className="px-6 py-4 text-center font-bold">Şehir Arsaları</th>
                  <th className="px-6 py-4 text-center font-bold">Gelişim Bölgeleri</th>
                  <th className="px-6 py-4 text-center font-bold">Yatırım Analizi</th>
                </tr>
              </thead>
              <tbody className="text-white/90">
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Yatırım Tutarı</td>
                  <td className="px-6 py-4 text-center">₺500K - ₺5M</td>
                  <td className="px-6 py-4 text-center">₺200K - ₺2M</td>
                  <td className="px-6 py-4 text-center">-</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Değer Artış Potansiyeli</td>
                  <td className="px-6 py-4 text-center">%50-100</td>
                  <td className="px-6 py-4 text-center">%100-200</td>
                  <td className="px-6 py-4 text-center">-</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Pazar Analizi</td>
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
                <tr className="hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Gelişim Planı Analizi</td>
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
            Yatırım Süreci
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Analiz</h3>
              <p className="text-white/80 text-sm">Pazar ve lokasyon analizi</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Seçim</h3>
              <p className="text-white/80 text-sm">En uygun arsa seçimi</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Yatırım</h3>
              <p className="text-white/80 text-sm">Güvenli yatırım süreci</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Takip</h3>
              <p className="text-white/80 text-sm">Değer artışı takibi</p>
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
              <TrendingUp className="h-6 w-6 text-[#2e3c3a] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#2e3c3a]">Yüksek Değer Artışı</h3>
                <p className="text-white/80">
                  Stratejik lokasyonlarda uzun vadeli değer artışı potansiyeli.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <DollarSign className="h-6 w-6 text-[#2e3c3a] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#2e3c3a]">Uygun Fiyatlar</h3>
                <p className="text-white/80">
                  Erken yatırım fırsatları ile uygun fiyat avantajları.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-[#2e3c3a] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#2e3c3a]">Stratejik Lokasyonlar</h3>
                <p className="text-white/80">
                  Gelişim potansiyeli yüksek, stratejik konumlarda arsa ve araziler.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <BarChart3 className="h-6 w-6 text-[#2e3c3a] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#2e3c3a]">Profesyonel Analiz</h3>
                <p className="text-white/80">
                  Detaylı pazar analizi ve yatırım potansiyeli değerlendirmesi.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-2xl p-8 md:p-12 text-center border border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Arsa ve Arazi Yatırım Fırsatları
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Geleceğe yatırım yapmak için karlı arsa ve arazi fırsatlarını keşfedin.
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
