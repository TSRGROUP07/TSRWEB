"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Building2, Users, TrendingUp, MapPin, DollarSign, Info, CheckCircle } from "lucide-react";

export default function TopluBinaPage() {
  return (
    <div className="min-h-screen bg-[#b7b1ad] text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
          alt="Toplu Emlak Bina Alımı"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 z-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Toplu Emlak Bina Alımı
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Büyük Ölçekli Yatırım Fırsatları
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
            Toplu emlak bina alımı hizmetimiz, büyük ölçekli yatırımcılar ve kurumsal müşterilerimiz için 
            tasarlanmış özel bir hizmettir. Tüm bir binayı veya birden fazla binayı toplu olarak satın alarak 
            önemli ölçüde fiyat avantajı sağlayabilirsiniz.
          </p>
          <p className="text-lg text-white/90 leading-relaxed">
            Bu hizmet, yatırım portföyünüzü genişletmek, toplu kira geliri elde etmek veya 
            büyük ölçekli geliştirme projeleri için ideal bir seçenektir.
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] backdrop-blur-md border border-[#2e3c3a] rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <Info className="h-6 w-6 text-white flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Önemli Bilgi</h3>
              <p className="text-white/95">
                Toplu bina alımı ile %15-25 arası fiyat avantajı elde edebilirsiniz. 
                Kurumsal yatırımcılar için özel finansman çözümleri ve yönetim hizmetleri sunuyoruz.
              </p>
            </div>
          </div>
        </div>

        {/* Service Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#4f271b]/80 backdrop-blur-md rounded-xl p-6 border border-[#2d2825]/30 hover:border-[#2d2825]/50 transition-all shadow-lg">
            <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Toplu Bina Alımı</h3>
            <p className="text-white/90">
              Tüm binayı veya birden fazla birimi toplu olarak satın alın, önemli fiyat avantajı elde edin.
            </p>
          </div>

          <div className="bg-[#4f271b]/80 backdrop-blur-md rounded-xl p-6 border border-[#2d2825]/30 hover:border-[#2d2825]/50 transition-all shadow-lg">
            <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Kurumsal Çözümler</h3>
            <p className="text-white/90">
              Kurumsal müşterilerimiz için özel finansman ve yönetim çözümleri.
            </p>
          </div>

          <div className="bg-[#4f271b]/80 backdrop-blur-md rounded-xl p-6 border border-[#2d2825]/30 hover:border-[#2d2825]/50 transition-all shadow-lg">
            <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Yatırım Portföyü</h3>
            <p className="text-white/90">
              Yatırım portföyünüzü genişletin ve çeşitlendirin.
            </p>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#2e3c3a] text-center">
            Projelerimizden Örnekler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative h-64 rounded-xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                alt="Toplu Bina Projesi"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <span className="text-white font-bold">Toplu Bina Alımı</span>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                alt="Kurumsal Yatırım"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <span className="text-white font-bold">Kurumsal Çözümler</span>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop"
                alt="Yatırım Portföyü"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <span className="text-white font-bold">Yatırım Portföyü</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 mb-12 border border-white/20 overflow-x-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#2e3c3a] text-center">
            Hizmet Detayları
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] text-white">
                  <th className="px-6 py-4 text-left font-bold">Özellik</th>
                  <th className="px-6 py-4 text-center font-bold">Toplu Bina Alımı</th>
                  <th className="px-6 py-4 text-center font-bold">Kurumsal Çözümler</th>
                  <th className="px-6 py-4 text-center font-bold">Yatırım Portföyü</th>
                </tr>
              </thead>
              <tbody className="text-white/90">
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Yatırım Tutarı</td>
                  <td className="px-6 py-4 text-center">₺5M - ₺50M</td>
                  <td className="px-6 py-4 text-center">₺50M+</td>
                  <td className="px-6 py-4 text-center">₺10M - ₺100M</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Fiyat Avantajı</td>
                  <td className="px-6 py-4 text-center">%15-25</td>
                  <td className="px-6 py-4 text-center">%20-30</td>
                  <td className="px-6 py-4 text-center">%10-20</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 font-semibold">Finansman Desteği</td>
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
                  <td className="px-6 py-4 font-semibold">Yönetim Hizmeti</td>
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
            Süreç Adımları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Danışmanlık</h3>
              <p className="text-white/80 text-sm">Yatırım hedeflerinizi belirliyoruz</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Emlak Seçimi</h3>
              <p className="text-white/80 text-sm">En uygun binaları buluyoruz</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Finansman</h3>
              <p className="text-white/80 text-sm">Özel finansman çözümleri</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Yönetim</h3>
              <p className="text-white/80 text-sm">Profesyonel yönetim hizmeti</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 mb-12 border border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#2e3c3a]">
            Hizmet Özellikleri
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <DollarSign className="h-6 w-6 text-[#2e3c3a] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#2e3c3a]">Fiyat Avantajı</h3>
                <p className="text-white/80">
                  Toplu alım ile önemli ölçüde fiyat indirimi ve avantajlı ödeme koşulları.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-[#2e3c3a] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#2e3c3a]">Stratejik Lokasyonlar</h3>
                <p className="text-white/80">
                  Yüksek potansiyelli lokasyonlarda toplu bina alım fırsatları.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <TrendingUp className="h-6 w-6 text-[#2e3c3a] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#2e3c3a]">Yüksek Getiri</h3>
                <p className="text-white/80">
                  Toplu kira geliri ve değer artış potansiyeli ile yüksek getiri.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Users className="h-6 w-6 text-[#2e3c3a] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#2e3c3a]">Profesyonel Danışmanlık</h3>
                <p className="text-white/80">
                  Deneyimli ekibimiz toplu alım sürecinin her aşamasında yanınızda.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-2xl p-8 md:p-12 text-center border border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Toplu Bina Alım Fırsatları
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Büyük ölçekli yatırım fırsatlarını keşfetmek için bizimle iletişime geçin.
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
