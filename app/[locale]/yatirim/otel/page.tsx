"use client";

import { Hotel, TrendingUp, MapPin, DollarSign, Users } from "lucide-react";

export default function OtelYatirimPage() {
  return (
    <div className="min-h-screen bg-[#b7b1ad] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Hotel className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-[#2e3c3a]">Otel Yatırımları</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#4f271b]/60 backdrop-blur-md border border-[#2d2825]/30 rounded-xl shadow-lg p-8 hover:bg-[#4f271b]/70 transition-all">
            <h2 className="text-2xl font-bold mb-4 text-white">Yatırım Avantajları</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <TrendingUp className="h-5 w-5 text-[#2e3c3a] mr-3 mt-1 flex-shrink-0" />
                <div className="text-white/90">
                  <strong className="text-white">Yüksek Getiri Oranları:</strong> Otel yatırımları yıllık %8-15 arası getiri sağlayabilir
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#2e3c3a] mr-3 mt-1 flex-shrink-0" />
                <div className="text-white/90">
                  <strong className="text-white">Stratejik Lokasyonlar:</strong> Turistik bölgelerde premium konumlarda yatırım fırsatları
                </div>
              </li>
              <li className="flex items-start">
                <Users className="h-5 w-5 text-[#2e3c3a] mr-3 mt-1 flex-shrink-0" />
                <div className="text-white/90">
                  <strong className="text-white">Profesyonel Yönetim:</strong> Deneyimli otel yönetim ekibi ile sorunsuz işletme
                </div>
              </li>
              <li className="flex items-start">
                <DollarSign className="h-5 w-5 text-[#2e3c3a] mr-3 mt-1 flex-shrink-0" />
                <div className="text-white/90">
                  <strong className="text-white">Pasif Gelir:</strong> Düzenli kira geliri ve değer artış potansiyeli
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-[#4f271b]/60 backdrop-blur-md border border-[#2d2825]/30 rounded-xl shadow-lg p-8 hover:bg-[#4f271b]/70 transition-all">
            <h2 className="text-2xl font-bold mb-4 text-white">Hizmetlerimiz</h2>
            <ul className="space-y-3">
              <li className="flex items-center text-white/90">
                <span className="w-2 h-2 bg-[#2e3c3a] rounded-full mr-3"></span>
                Yatırım danışmanlığı ve pazar analizi
              </li>
              <li className="flex items-center text-white/90">
                <span className="w-2 h-2 bg-[#2e3c3a] rounded-full mr-3"></span>
                Otel lokasyon seçimi ve değerlendirme
              </li>
              <li className="flex items-center text-white/90">
                <span className="w-2 h-2 bg-[#2e3c3a] rounded-full mr-3"></span>
                Finansman çözümleri ve kredi danışmanlığı
              </li>
              <li className="flex items-center text-white/90">
                <span className="w-2 h-2 bg-[#2e3c3a] rounded-full mr-3"></span>
                Yasal süreçler ve belgelendirme desteği
              </li>
              <li className="flex items-center text-white/90">
                <span className="w-2 h-2 bg-[#2e3c3a] rounded-full mr-3"></span>
                İşletme yönetimi ve operasyonel destek
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white rounded-xl p-8 border border-[#2e3c3a]/50 shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Neden Otel Yatırımı?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Yüksek Getiri</h3>
              <p className="text-white/80">
                Otel yatırımları uzun vadede yüksek getiri potansiyeli sunar
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Diversifikasyon</h3>
              <p className="text-white/80">
                Portföyünüzü çeşitlendirerek riski azaltın
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Değer Artışı</h3>
              <p className="text-white/80">
                Emlak değeri zamanla artar, yatırımınız büyür
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            İletişime Geç
          </a>
        </div>
      </div>
    </div>
  );
}
