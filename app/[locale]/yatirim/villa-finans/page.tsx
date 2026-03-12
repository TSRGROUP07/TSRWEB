"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home, DollarSign, Handshake, FileText, TrendingUp } from "lucide-react";

export default function VillaFinansPage() {
  return (
    <div className="min-h-screen bg-[#b7b1ad] text-white">
      {/* Hero Section - Daha kompakt */}
      <div className="relative h-[50vh] md:h-[55vh] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop"
          alt="Villa Finans Hizmeti"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 z-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Villanızı Siz Finanse Edin
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              TSR Yapsın
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

      {/* Content Section - Boşluk azaltıldı */}
      <div className="container mx-auto px-6 lg:px-12 py-8 md:py-12">
        {/* Overview */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 mb-8 border border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2e3c3a]">
            Hizmet Hakkında
          </h2>
          <p className="text-lg text-white/90 leading-relaxed mb-6">
            Hayalinizdeki villayı inşa etmek istiyorsunuz ancak inşaat sürecini yönetmek istemiyorsunuz mu? 
            "Villanızı Siz Finanse Edin, TSR Yapsın" hizmetimiz tam size göre. 
            Finansmanınızı sağlayın, geri kalan her şeyi profesyonel ekibimiz halleder.
          </p>
          <p className="text-lg text-white/90 leading-relaxed">
            Tasarımdan teslimata kadar tüm süreç TSR Group'un deneyimli ekibi tarafından yönetilir. 
            Siz sadece hayalinizdeki villanın keyfini çıkarırsınız.
          </p>
        </div>

        {/* Service Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#4f271b]/80 backdrop-blur-md rounded-xl p-6 border border-[#2d2825]/30 hover:border-[#2d2825]/50 transition-all shadow-lg">
            <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Finansman</h3>
            <p className="text-white/90 text-sm">
              Siz finansmanı sağlarsınız, biz inşaatı yönetiriz.
            </p>
          </div>

          <div className="bg-[#4f271b]/80 backdrop-blur-md rounded-xl p-6 border border-[#2d2825]/30 hover:border-[#2d2825]/50 transition-all shadow-lg">
            <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Tasarım</h3>
            <p className="text-white/90 text-sm">
              Mimari tasarım ve proje yönetimi profesyonel ekibimizce yapılır.
            </p>
          </div>

          <div className="bg-[#4f271b]/80 backdrop-blur-md rounded-xl p-6 border border-[#2d2825]/30 hover:border-[#2d2825]/50 transition-all shadow-lg">
            <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <Home className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">İnşaat</h3>
            <p className="text-white/90 text-sm">
              Kaliteli malzeme ve işçilikle villa inşaatı gerçekleştirilir.
            </p>
          </div>

          <div className="bg-[#4f271b]/80 backdrop-blur-md rounded-xl p-6 border border-[#2d2825]/30 hover:border-[#2d2825]/50 transition-all shadow-lg">
            <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <Handshake className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Teslimat</h3>
            <p className="text-white/90 text-sm">
              Zamanında ve kaliteli teslimat garantisi.
            </p>
          </div>
        </div>

        {/* Image Gallery - Before/After */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2e3c3a] text-center">
            Dönüşüm Örnekleri
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
              <h3 className="text-xl font-bold text-[#2e3c3a] py-2 text-center">Eski Hali</h3>
              <div className="relative w-full">
                <Image
                  src="/ALONARSAT/ESK.png"
                  alt="Eski Hali"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  unoptimized
                />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
              <h3 className="text-xl font-bold text-[#2e3c3a] py-2 text-center">Yeni Hali</h3>
              <div className="relative w-full">
                <Image
                  src="/ALONARSAT/YENİ.png"
                  alt="Yeni Hali"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 mb-8 border border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#2e3c3a]">
            Hizmet Avantajları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <TrendingUp className="h-6 w-6 text-[#2e3c3a] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#2e3c3a]">Profesyonel Yönetim</h3>
                <p className="text-white/80">
                  Tüm inşaat süreci deneyimli proje yöneticilerimiz tarafından yönetilir.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <TrendingUp className="h-6 w-6 text-[#2e3c3a] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#2e3c3a]">Kalite Garantisi</h3>
                <p className="text-white/80">
                  Yüksek kaliteli malzeme ve işçilik standartları uygulanır.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <TrendingUp className="h-6 w-6 text-[#2e3c3a] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#2e3c3a]">Zamanında Teslimat</h3>
                <p className="text-white/80">
                  Belirlenen süre içinde villa teslim edilir.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <TrendingUp className="h-6 w-6 text-[#2e3c3a] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#2e3c3a]">Şeffaf Süreç</h3>
                <p className="text-white/80">
                  Tüm süreç boyunca düzenli bilgilendirme ve şeffaflık.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-2xl p-8 md:p-12 text-center border border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Hayalinizdeki Villayı İnşa Edin
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Finansmanınızı sağlayın, geri kalanını TSR Group'a bırakın.
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
