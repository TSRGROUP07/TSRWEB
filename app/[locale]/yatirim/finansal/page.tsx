"use client";

import { DollarSign, CreditCard, FileText, CheckCircle } from "lucide-react";

export default function FinansalYatirimPage() {
  return (
    <div className="min-h-screen bg-[#b7b1ad] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <DollarSign className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#2e3c3a]">Finansal Destek</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#4f271b]/60 backdrop-blur-md border border-[#2d2825]/30 rounded-xl shadow-lg p-8 hover:bg-[#4f271b]/70 transition-all">
            <h2 className="text-2xl font-bold mb-4 text-white">Kredi Danışmanlığı</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CreditCard className="h-5 w-5 text-[#2e3c3a] mr-3 mt-1 flex-shrink-0" />
                <div className="text-white/90">
                  <strong className="text-white">Emlak Kredisi:</strong> Konut ve ticari emlak kredileri için en uygun faiz oranlarını bulun
                </div>
              </li>
              <li className="flex items-start">
                <DollarSign className="h-5 w-5 text-[#2e3c3a] mr-3 mt-1 flex-shrink-0" />
                <div className="text-white/90">
                  <strong className="text-white">Yatırım Kredisi:</strong> Yatırım projeleriniz için özel finansman çözümleri
                </div>
              </li>
              <li className="flex items-start">
                <FileText className="h-5 w-5 text-[#2e3c3a] mr-3 mt-1 flex-shrink-0" />
                <div className="text-white/90">
                  <strong className="text-white">Belge Hazırlığı:</strong> Kredi başvuruları için gerekli tüm belgelerin hazırlanması
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#2e3c3a] mr-3 mt-1 flex-shrink-0" />
                <div className="text-white/90">
                  <strong className="text-white">Onay Süreci:</strong> Kredi onay sürecinde profesyonel destek ve takip
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-[#4f271b]/60 backdrop-blur-md border border-[#2d2825]/30 rounded-xl shadow-lg p-8 hover:bg-[#4f271b]/70 transition-all">
            <h2 className="text-2xl font-bold mb-4 text-white">Teşvik Programları</h2>
            <ul className="space-y-3">
              <li className="flex items-center text-white/90">
                <span className="w-2 h-2 bg-[#2e3c3a] rounded-full mr-3"></span>
                Devlet teşvikleri ve hibeler
              </li>
              <li className="flex items-center text-white/90">
                <span className="w-2 h-2 bg-[#2e3c3a] rounded-full mr-3"></span>
                Vergi indirimleri ve muafiyetleri
              </li>
              <li className="flex items-center text-white/90">
                <span className="w-2 h-2 bg-[#2e3c3a] rounded-full mr-3"></span>
                Yatırım teşvik belgeleri
              </li>
              <li className="flex items-center text-white/90">
                <span className="w-2 h-2 bg-[#2e3c3a] rounded-full mr-3"></span>
                Özel sektör teşvik programları
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-4 text-white">Vatandaşlık Desteği</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Türkiye vatandaşlığı başvuru desteği</li>
              <li>• Yabancı yatırımcı vize işlemleri</li>
              <li>• Yasal süreç takibi ve danışmanlık</li>
              <li>• Belge hazırlığı ve başvuru süreci</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white rounded-xl p-8 border border-[#2e3c3a]/50 shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Neden TSR GROUP?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Uzman Ekip</h3>
              <p className="text-white/80">
                Finansal danışmanlık konusunda deneyimli ekibimiz
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Geniş Ağ</h3>
              <p className="text-white/80">
                Bankalar ve finans kurumları ile güçlü iş ortaklıkları
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Kişisel Çözüm</h3>
              <p className="text-white/80">
                Her yatırımcı için özel finansman çözümleri
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
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
