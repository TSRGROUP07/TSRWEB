"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, Calculator, Phone, Mail, MessageSquare, ArrowRight, Hand, X } from "lucide-react";
import { FaInstagram, FaTelegram, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

interface PartnershipPlan {
  id: string;
  title: string;
  commission: number;
  description: string;
  features: string[];
  buttonText: string;
}

export default function IsOrtaklariPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>("premium");
  const [propertyPrice, setPropertyPrice] = useState<string>("");
  const [calculatedCommission, setCalculatedCommission] = useState<number | null>(null);
  const [isSupportFormOpen, setIsSupportFormOpen] = useState(false);
  const [selectedContactMethod, setSelectedContactMethod] = useState<string>("");

  const plans: PartnershipPlan[] = [
    {
      id: "standard",
      title: "Standart Ortaklık",
      commission: 30,
      description: "Müşteriyi bize gönderin, anlaşmanın tadını çıkarın ve komisyonunuzu keyifle alın",
      features: [
        "Müşteriyi sistemimize kaydediyorsunuz",
        "Müşteriyi şirketimizin uzmanları yönlendiriyor",
        "İşlem ilerlemenizi kişisel hesabınızdan takip ediyorsunuz",
        "Biz anlaşmayı kapatıyoruz",
        "Komisyon ödemesi",
        "Kişisel yönetici müşteriye",
        "Tam hukuki müşteri desteği",
        "Müşteri için ofiste sunum yapma",
        "Ücretsiz VIP transfer hizmeti müşterilere sunulmaktadır",
        "Müşterinin otelde konaklama bedelinin tazmini",
        "Tam erişim şirket kaynaklarına",
        "Ortaklar için kişisel hesap",
        "Eğitim materyalleri kişisel hesabında"
      ],
      buttonText: "TSR GROUP ile Ortak Olun"
    },
    {
      id: "professional",
      title: "Profesyonel Ortaklık",
      commission: 40,
      description: "Bizimle çalışın, işlemi kontrol edin ve komisyon kazanın",
      features: [
        "Sizi sistemimize kaydediyoruz",
        "Sizinle birlikte müşteriyi yönetiyoruz",
        "İşlem ilerlemesini kişisel panelde takip ediyorsunuz",
        "Birlikte bir anlaşmayı kapatıyoruz",
        "Komisyon ödemesi",
        "Kişisel müşteri yöneticisi",
        "Tam hukuki destek",
        "Müşteri için ofiste sunum yapmak",
        "Ücretsiz VIP transfer hizmeti müşterilere",
        "Müşterinin oteldeki konaklama tazminatı",
        "Şirket kaynaklarının kullanımı",
        "Partnerin kişisel hesabı",
        "Öğretici materyaller kişisel hesabınızda",
        "Şirket markasının kullanımı"
      ],
      buttonText: "Ortak Olmak"
    },
    {
      id: "premium",
      title: "Premium Ortaklık",
      commission: 70,
      description: "Kendi başınıza çalışarak kârınızı maksimize edin",
      features: [
        "Müşteriyi sistemimize kaydediyorsunuz",
        "Müşteriyi kendi başınıza yönetiyorsunuz",
        "Yardımcı işlem takibi",
        "Komisyon ödemesi",
        "Şirket yöneticisinin işlemle ilgili danışmanlığı",
        "Tam hukuki destek",
        "Müşteri için ofiste sunumlar yapmak",
        "Ücretsiz VIP transfer hizmeti müşterilere sunulmaktadır",
        "Partnerin kişisel hesabı",
        "Öğretici materyaller kişisel hesabında",
        "Şirket markasının kullanımı",
        "Dünya genelindeki mülk veritabanına erişim"
      ],
      buttonText: "Ortak Olmak"
    }
  ];

  const calculateCommission = (priceValue?: string) => {
    const priceStr = priceValue || propertyPrice;
    const price = parseFloat(priceStr.replace(/[^\d.,]/g, '').replace(',', '.'));
    if (!isNaN(price) && price > 0) {
      const selectedPlanData = plans.find(p => p.id === selectedPlan);
      if (selectedPlanData) {
        const commission = (price * selectedPlanData.commission) / 100;
        setCalculatedCommission(commission);
      }
    } else {
      setCalculatedCommission(null);
    }
  };

  useEffect(() => {
    if (propertyPrice) {
      const price = parseFloat(propertyPrice.replace(/[^\d.,]/g, '').replace(',', '.'));
      if (!isNaN(price) && price > 0) {
        const selectedPlanData = plans.find(p => p.id === selectedPlan);
        if (selectedPlanData) {
          const commission = (price * selectedPlanData.commission) / 100;
          setCalculatedCommission(commission);
        }
      }
    }
  }, [selectedPlan]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-[#b7b1ad] text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden mt-8 mb-8 rounded-2xl mx-4">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop&q=90"
            alt="İş Ortaklığı Programı"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>
        </div>

        <div className="relative z-20 container mx-auto px-6 lg:px-12 h-full flex items-center">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight drop-shadow-2xl">
              Esnek Ortaklık Tarifeleri
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl drop-shadow-lg">
              Kendi ödül seviyenizi seçin ve TSR GROUP ile birlikte büyüyün
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 pb-16">

        {/* Partnership Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const isPremium = plan.id === "premium";
            
            return (
              <div
                key={plan.id}
                className={`bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all ${
                  isSelected ? "ring-2 ring-[#2e3c3a] shadow-2xl scale-105" : "hover:shadow-xl"
                }`}
              >
                {/* Plan Header */}
                <div className="p-4 border-b border-gray-200">
                  {/* Commission Display */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 bg-gray-100 rounded-lg px-3 py-1.5">
                      <span className="text-xs text-gray-600">Ortak Komisyonu</span>
                    </div>
                    <div
                      className={`px-4 py-1.5 rounded-lg text-white font-bold text-base ${
                        isPremium
                          ? "bg-[#8B0000]"
                          : "bg-gray-800"
                      }`}
                    >
                      %{plan.commission}
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed mb-4 font-medium">{plan.description}</p>
                </div>

                {/* Features */}
                <div className="p-4">
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#2e3c3a] flex items-center justify-center mt-0.5">
                          <Check className="h-2.5 w-2.5 text-white" />
                        </div>
                        <span className="text-gray-700 text-xs leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all ${
                      isSelected
                        ? "bg-[#2e3c3a] text-white"
                        : "bg-white text-gray-800 border-2 border-gray-300 hover:border-[#2e3c3a]"
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commission Calculator */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="h-6 w-6 text-[#2e3c3a]" />
            <h2 className="text-2xl font-bold text-[#2e3c3a]">Komisyon Hesaplayıcı</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Input Section */}
            <div className="lg:col-span-1 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  İşlem Tutarı (₺)
                </label>
                <input
                  type="text"
                  value={propertyPrice}
                  onChange={(e) => {
                    setPropertyPrice(e.target.value);
                    calculateCommission(e.target.value);
                  }}
                  placeholder="Örn: 2.500.000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] text-gray-800 text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Plan Seçimi
                </label>
                <div className="space-y-2">
                  {plans.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => {
                        setSelectedPlan(plan.id);
                        if (propertyPrice) {
                          calculateCommission(propertyPrice);
                        }
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                        selectedPlan === plan.id
                          ? "bg-[#2e3c3a] text-white border-[#2e3c3a]"
                          : "bg-white text-gray-800 border-gray-300 hover:border-[#2e3c3a]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{plan.title}</span>
                        <span className={`text-sm font-bold ${
                          selectedPlan === plan.id ? "text-white" : "text-[#2e3c3a]"
                        }`}>
                          %{plan.commission}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Result Section */}
            <div className="lg:col-span-2">
              {calculatedCommission !== null ? (
                <div className="space-y-6">
                  {/* Primary Result Card */}
              <div className="bg-gradient-to-br from-[#2e3c3a] to-[#3a4d4a] rounded-lg p-6 text-white">
                    <h3 className="text-lg font-semibold mb-4">Kazanılacak Komisyon</h3>
                    <div className="space-y-3">
                      <div className="text-5xl font-bold mb-2">
                        {formatCurrency(calculatedCommission)}
                      </div>
                      <div className="text-sm text-white/80">
                        {plans.find(p => p.id === selectedPlan)?.title} - %{plans.find(p => p.id === selectedPlan)?.commission} komisyon oranı
                      </div>
                      <div className="pt-4 border-t border-white/20">
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div>
                            <span className="text-white/70">Komisyon Oranı:</span>
                            <div className="text-white font-semibold mt-1">
                              %{plans.find(p => p.id === selectedPlan)?.commission}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comparison Cards */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Tüm Planlar Karşılaştırması</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {plans.map((plan) => {
                        const price = parseFloat(propertyPrice.replace(/[^\d.,]/g, '').replace(',', '.'));
                        const commission = !isNaN(price) && price > 0 ? (price * plan.commission) / 100 : 0;
                        const isCurrentPlan = plan.id === selectedPlan;
                        
                        return (
                          <div
                            key={plan.id}
                            className={`rounded-lg p-4 border-2 ${
                              isCurrentPlan
                                ? "bg-[#2e3c3a] text-white border-[#2e3c3a]"
                                : "bg-white text-gray-800 border-gray-200"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold">{plan.title}</span>
                              <span className={`text-xs font-bold ${
                                isCurrentPlan ? "text-white" : "text-gray-600"
                              }`}>
                                %{plan.commission}
                              </span>
                            </div>
                            <div className={`text-2xl font-bold ${
                              isCurrentPlan ? "text-white" : "text-[#2e3c3a]"
                            }`}>
                              {formatCurrency(commission)}
                            </div>
                            {isCurrentPlan && (
                              <div className="mt-2 text-xs text-white/80">
                                Seçili Plan
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Visual Comparison Bar */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Komisyon Dağılımı</h4>
                    <div className="space-y-3">
                      {plans.map((plan) => {
                        const price = parseFloat(propertyPrice.replace(/[^\d.,]/g, '').replace(',', '.'));
                        const commission = !isNaN(price) && price > 0 ? (price * plan.commission) / 100 : 0;
                        const maxCommission = Math.max(...plans.map(p => {
                          const pPrice = parseFloat(propertyPrice.replace(/[^\d.,]/g, '').replace(',', '.'));
                          return !isNaN(pPrice) && pPrice > 0 ? (pPrice * p.commission) / 100 : 0;
                        }));
                        const percentage = maxCommission > 0 ? (commission / maxCommission) * 100 : 0;
                        const isCurrentPlan = plan.id === selectedPlan;
                        
                        return (
                          <div key={plan.id} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className={`font-medium ${isCurrentPlan ? "text-[#2e3c3a]" : "text-gray-600"}`}>
                                {plan.title} (%{plan.commission})
                              </span>
                              <span className={`font-bold ${isCurrentPlan ? "text-[#2e3c3a]" : "text-gray-700"}`}>
                                {formatCurrency(commission)}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  isCurrentPlan
                                    ? "bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a]"
                                    : plan.id === "premium"
                                    ? "bg-gradient-to-r from-[#8B0000] to-[#A52A2A]"
                                    : "bg-gray-400"
                                }`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-12 text-center">
                  <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">
                    Tutarı girin ve kazanacağınız komisyonu görün
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-br from-[#2e3c3a] to-[#3a4d4a] rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Section - Visual */}
            <div className="relative h-64 lg:h-auto min-h-[400px] bg-gradient-to-br from-[#2e3c3a]/90 to-[#3a4d4a]/90">
              <div className="absolute inset-0 opacity-10">
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=1200&fit=crop"
                  alt="İletişim"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-white">
                <div className="mb-6">
                  <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 mx-auto">
                    <Hand className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
                    Bilgi Almak İçin Dokun
                  </h3>
                  <p className="text-white/90 text-center text-lg max-w-md">
                    Ortaklık programımız hakkında detaylı bilgi almak için bizimle iletişime geçin
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section - Button */}
            <div className="bg-white p-8 lg:p-12 flex flex-col items-center justify-center">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#2e3c3a] mb-4">
                  Ortaklık İçin Destek Al
                </h3>
                <p className="text-gray-600">
                  Sorularınızı bize iletin, size en kısa sürede dönüş yapalım
                </p>
              </div>

              <button
                onClick={() => setIsSupportFormOpen(true)}
                className="w-full max-w-md py-5 px-8 bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] text-white rounded-lg font-semibold text-lg hover:from-[#3a4d4a] hover:to-[#2e3c3a] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:scale-105"
              >
                <MessageSquare className="h-6 w-6" />
                <span>Bilgi Al / Destek Al</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Support Form Modal */}
        {isSupportFormOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999]"
              onClick={() => setIsSupportFormOpen(false)}
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            />
            
            {/* Modal Content */}
            <div 
              className="fixed inset-0 z-[100000] flex items-start justify-center p-4 pointer-events-none pt-24"
              style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '6rem'
              }}
            >
              <div 
                className="rounded-2xl shadow-2xl max-w-2xl w-full max-h-[calc(100vh-8rem)] overflow-y-auto pointer-events-auto flex flex-col"
                style={{ background: '#b7b1ad' }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex-shrink-0 border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10" style={{ background: '#b7b1ad' }}>
                  <h2 className="text-2xl font-bold text-[#2e3c3a]">Ortaklık İçin Destek Al</h2>
                  <button
                    onClick={() => setIsSupportFormOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Kapat"
                  >
                    <X className="h-6 w-6 text-gray-600" />
                  </button>
                </div>
                
                {/* Form */}
                <form 
                  className="p-6 space-y-6 flex-1 overflow-y-auto" 
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Talebiniz gönderildi! En kısa sürede size dönüş yapacağız.");
                    setIsSupportFormOpen(false);
                  }}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adınız Soyadınız *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a]"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a]"
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a]"
                      placeholder="+90 5XX XXX XX XX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mesajınız / Sorunuz *
                    </label>
                    <textarea
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] resize-none"
                      placeholder="Ortaklık programı hakkında sorularınızı buraya yazın..."
                    ></textarea>
                  </div>

                  {/* İletişim Bölümü */}
                  <div className="pt-4 border-t border-gray-300">
                    <h3 className="text-lg font-semibold text-[#2e3c3a] mb-4">Sizinle Nasıl İletişime Geçelim?</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedContactMethod(selectedContactMethod === "instagram" ? "" : "instagram")}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all group ${
                          selectedContactMethod === "instagram"
                            ? "bg-gray-900 border-gray-900"
                            : "bg-white border-gray-300 hover:border-[#2e3c3a] hover:bg-gray-50"
                        }`}
                      >
                        <FaInstagram className={`h-6 w-6 mb-2 group-hover:scale-110 transition-transform ${
                          selectedContactMethod === "instagram" ? "text-white" : "text-[#E4405F]"
                        }`} />
                        <span className={`text-xs font-medium ${
                          selectedContactMethod === "instagram" ? "text-white" : "text-gray-700"
                        }`}>Instagram</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedContactMethod(selectedContactMethod === "telegram" ? "" : "telegram")}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all group ${
                          selectedContactMethod === "telegram"
                            ? "bg-gray-900 border-gray-900"
                            : "bg-white border-gray-300 hover:border-[#2e3c3a] hover:bg-gray-50"
                        }`}
                      >
                        <FaTelegram className={`h-6 w-6 mb-2 group-hover:scale-110 transition-transform ${
                          selectedContactMethod === "telegram" ? "text-white" : "text-[#0088cc]"
                        }`} />
                        <span className={`text-xs font-medium ${
                          selectedContactMethod === "telegram" ? "text-white" : "text-gray-700"
                        }`}>Telegram</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedContactMethod(selectedContactMethod === "phone" ? "" : "phone")}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all group ${
                          selectedContactMethod === "phone"
                            ? "bg-gray-900 border-gray-900"
                            : "bg-white border-gray-300 hover:border-[#2e3c3a] hover:bg-gray-50"
                        }`}
                      >
                        <FaPhone className={`h-6 w-6 mb-2 group-hover:scale-110 transition-transform ${
                          selectedContactMethod === "phone" ? "text-white" : "text-[#2e3c3a]"
                        }`} />
                        <span className={`text-xs font-medium ${
                          selectedContactMethod === "phone" ? "text-white" : "text-gray-700"
                        }`}>Telefon</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedContactMethod(selectedContactMethod === "mail" ? "" : "mail")}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all group ${
                          selectedContactMethod === "mail"
                            ? "bg-gray-900 border-gray-900"
                            : "bg-white border-gray-300 hover:border-[#2e3c3a] hover:bg-gray-50"
                        }`}
                      >
                        <FaEnvelope className={`h-6 w-6 mb-2 group-hover:scale-110 transition-transform ${
                          selectedContactMethod === "mail" ? "text-white" : "text-[#2e3c3a]"
                        }`} />
                        <span className={`text-xs font-medium ${
                          selectedContactMethod === "mail" ? "text-white" : "text-gray-700"
                        }`}>Mail</span>
                      </button>
                    </div>
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => setSelectedContactMethod(selectedContactMethod === "whatsapp" ? "" : "whatsapp")}
                        className={`flex items-center justify-center gap-2 p-4 rounded-lg border transition-all group w-full ${
                          selectedContactMethod === "whatsapp"
                            ? "bg-gray-900 border-gray-900"
                            : "bg-white border-gray-300 hover:border-[#2e3c3a] hover:bg-gray-50"
                        }`}
                      >
                        <FaWhatsapp className={`h-6 w-6 group-hover:scale-110 transition-transform ${
                          selectedContactMethod === "whatsapp" ? "text-white" : "text-[#25D366]"
                        }`} />
                        <span className={`text-sm font-medium ${
                          selectedContactMethod === "whatsapp" ? "text-white" : "text-gray-700"
                        }`}>WhatsApp</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsSupportFormOpen(false)}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-[#2e3c3a] text-white rounded-lg font-semibold hover:bg-[#3a4d4a] transition-colors"
                    >
                      Gönder
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
