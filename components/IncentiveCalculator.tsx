"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Info } from "lucide-react";

export default function IncentiveCalculator() {
  const [propertyValue, setPropertyValue] = useState(500000);
  const [country, setCountry] = useState("turkey");

  const calculateCitizenship = () => {
    const requirements: { [key: string]: { min: number; eligible: boolean } } = {
      turkey: { min: 400000, eligible: propertyValue >= 400000 },
      cyprus: { min: 300000, eligible: propertyValue >= 300000 },
      greece: { min: 250000, eligible: propertyValue >= 250000 },
      portugal: { min: 500000, eligible: propertyValue >= 500000 },
    };

    return requirements[country] || requirements.turkey;
  };

  const requirement = calculateCitizenship();

  const incentives = [
    {
      title: "Türkiye Vatandaşlığı",
      minAmount: 400000,
      benefits: [
        "Pasaport avantajları",
        "Vize serbestisi",
        "Eğitim ve sağlık hizmetleri",
        "İş kurma kolaylığı",
      ],
    },
    {
      title: "Kıbrıs Vatandaşlığı",
      minAmount: 300000,
      benefits: [
        "AB pasaportu",
        "Vergi avantajları",
        "Eğitim fırsatları",
        "Seyahat kolaylığı",
      ],
    },
    {
      title: "Yunanistan Vatandaşlığı",
      minAmount: 250000,
      benefits: [
        "AB pasaportu",
        "Schengen vizesi",
        "Eğitim imkanları",
        "İş fırsatları",
      ],
    },
  ];

  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-8 text-white">Teşvik ve Vatandaşlık Hesaplayıcı</h2>

      <div className="mb-8">
        <label className="block text-sm font-medium text-white/90 mb-2">
          Emlak Değeri (₺)
        </label>
        <input
          type="number"
          value={propertyValue}
          onChange={(e) => setPropertyValue(Number(e.target.value))}
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] focus:border-[#2e3c3a] mb-4"
        />
        <label className="block text-sm font-medium text-white/90 mb-2">
          Ülke Seçimi
        </label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] focus:border-[#2e3c3a]"
        >
          <option value="turkey" className="bg-[#4f271b]">Türkiye</option>
          <option value="cyprus" className="bg-[#4f271b]">Kıbrıs</option>
          <option value="greece" className="bg-[#4f271b]">Yunanistan</option>
          <option value="portugal" className="bg-[#4f271b]">Portekiz</option>
        </select>
      </div>

      <div className="bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] p-6 rounded-xl shadow-xl border border-white/10 mb-8">
        <div className="flex items-center space-x-3 mb-4">
          {requirement.eligible ? (
            <CheckCircle className="h-8 w-8 text-green-400" />
          ) : (
            <XCircle className="h-8 w-8 text-red-400" />
          )}
          <div>
            <div className="text-lg font-semibold text-white">
              {requirement.eligible ? "Uygun" : "Uygun Değil"}
            </div>
            <div className="text-sm text-white/70">
              Minimum gereksinim: {new Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY",
                maximumFractionDigits: 0,
              }).format(requirement.min)}
            </div>
          </div>
        </div>
        {requirement.eligible ? (
          <p className="text-green-300 font-medium">
            Tebrikler! Seçtiğiniz emlak değeri vatandaşlık başvurusu için yeterli.
          </p>
        ) : (
          <p className="text-red-300 font-medium">
            Vatandaşlık için minimum {new Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
              maximumFractionDigits: 0,
            }).format(requirement.min)} değerinde emlak gerekli.
          </p>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-6 text-white">Mevcut Teşvik Programları</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {incentives.map((incentive, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all">
              <h4 className="text-lg font-semibold mb-2 text-white">{incentive.title}</h4>
              <div className="text-sm text-white/70 mb-4">
                Minimum: {new Intl.NumberFormat("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                  maximumFractionDigits: 0,
                }).format(incentive.minAmount)}
              </div>
              <ul className="space-y-2">
                {incentive.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center text-sm text-white/90">
                    <CheckCircle className="h-4 w-4 text-[#2e3c3a] mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Info className="h-6 w-6 text-[#2e3c3a] mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-white mb-2">Bilgilendirme</h4>
            <p className="text-sm text-white/80">
              Vatandaşlık başvuruları için güncel mevzuat ve gereksinimler değişebilir.
              Detaylı bilgi için danışmanlarımızla iletişime geçin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


















