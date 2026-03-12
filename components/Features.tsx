"use client";

import { Building2, Map, TrendingUp, Calculator, Shield, CreditCard, Eye, Globe, BarChart3, Building, Hotel, MessageSquare, X, Send } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { useState, useEffect } from "react";
import { FaInstagram, FaTelegram, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

export default function Features() {
  const t = useTranslations('features');
  const tCommon = useTranslations('common');
  const tServices = useTranslations('services');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedContactMethod, setSelectedContactMethod] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [dynamicFeatures, setDynamicFeatures] = useState<any[]>([]);

  const defaultFeatures = [
    {
      iconName: "Map",
      titleKey: "3dTours",
      descKey: "3dToursDesc",
      href: "/3d-geziler",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    },
    {
      iconName: "TrendingUp",
      titleKey: "priceMovements",
      descKey: "priceMovementsDesc",
      href: "/fiyat-analizi",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    },
    {
      iconName: "BarChart3",
      titleKey: "analytics",
      descKey: "analyticsDesc",
      href: "/analitik",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    },
    {
      iconName: "Building2",
      titleKey: "apartmentComparison",
      descKey: "apartmentComparisonDesc",
      href: "/karsilastirma",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    },
    {
      iconName: "Calculator",
      titleKey: "investmentCalculator",
      descKey: "investmentCalculatorDesc",
      href: "/hesaplayici",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop",
    },
    {
      iconName: "Shield",
      titleKey: "companyDocuments",
      descKey: "companyDocumentsDesc",
      href: "/belgeler",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    },
    {
      iconName: "Globe",
      titleKey: "digitalSales",
      descKey: "digitalSalesDesc",
      href: "/dijital-satis",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
    },
    {
      iconName: "CreditCard",
      titleKey: "onlinePayment",
      descKey: "onlinePaymentDesc",
      href: "/odeme",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    },
    {
      iconName: "Eye",
      titleKey: "vrSupport",
      descKey: "vrSupportDesc",
      href: "/vr",
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&h=600&fit=crop",
    },
    {
      iconName: "Building",
      titleKey: "financialSupport",
      descKey: "financialSupportDesc",
      href: "/finansal-destek",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
      source: "services"
    },
    {
      iconName: "Hotel",
      titleKey: "buildingManagement",
      descKey: "buildingManagementDesc",
      href: "/bina-yonetimi",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      source: "services"
    },
  ];

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/homepage-content");
        if (response.ok) {
          const data = await response.json();
          if (data.features && data.features.items && data.features.items.length > 0) {
            setDynamicFeatures(data.features.items);
          } else {
            setDynamicFeatures(defaultFeatures);
          }
        } else {
          setDynamicFeatures(defaultFeatures);
        }
      } catch (error) {
        console.error("Features fetch error:", error);
        setDynamicFeatures(defaultFeatures);
      }
    };
    fetchContent();
  }, [t, tServices]);

  const iconMap: { [key: string]: any } = {
    Map, TrendingUp, BarChart3, Building2, Calculator, Shield, Globe, CreditCard, Eye, Building, Hotel
  };

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden" style={{ background: '#b7b1ad' }}>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-[#2e3c3a] leading-tight">
            {t('title')}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {dynamicFeatures.length > 0 ? (
            dynamicFeatures.map((feature, index) => {
              const Icon = iconMap[feature.iconName] || Map;
              let title = feature.title;
              let description = feature.description;

              // Eğer anahtarlar varsa tercüme et
              if (feature.titleKey) {
                const sourceT = feature.source === "services" ? tServices : t;
                title = sourceT(feature.titleKey);
              }
              if (feature.descKey) {
                const sourceT = feature.source === "services" ? tServices : t;
                description = sourceT(feature.descKey);
              }

              return (
                <Link
                  key={index}
                  href={feature.href || "#"}
                  prefetch={true}
                  className="group relative bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 p-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl animate-slide-up transform hover:-translate-y-1 overflow-hidden"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="absolute inset-0 opacity-80 group-hover:opacity-90 transition-opacity duration-300">
                    <Image
                      src={feature.image}
                      alt={title || "Feature"}
                      fill
                      className="object-cover"
                      loading="lazy"
                      quality={85}
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2e3c3a]/40 via-[#3a4d4a]/30 to-[#2e3c3a]/40"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-base font-bold mb-2 text-white line-clamp-2 group-hover:text-white/90 transition-colors drop-shadow-lg">
                      {title}
                    </h3>
                    <p className="text-white/90 text-xs leading-relaxed line-clamp-3 group-hover:text-white transition-colors drop-shadow-md">
                      {description}
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            // Loading state or empty
            null
          )}
        </div>

      </div>

      {isFormOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999]"
            onClick={() => setIsFormOpen(false)}
          />
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
            <div
              className="bg-[#b7b1ad] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-[#b7b1ad] border-b border-white/20 p-6 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold text-white">{t('modalTitle')}</h2>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label={tCommon('close')}
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>

              <form
                className="p-6 space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Form gönderildi:", formData);
                  setFormSubmitted(true);
                  setTimeout(() => {
                    setFormSubmitted(false);
                    setIsFormOpen(false);
                    setFormData({ name: "", email: "", phone: "", message: "" });
                    setSelectedContactMethod("");
                  }, 3000);
                }}
              >
                {formSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-center">
                    <p className="font-semibold">{t('success')}</p>
                    <p className="text-sm mt-1">{t('successDesc')}</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        {t('name')}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/10 text-white placeholder-white/60"
                        placeholder={t('namePlaceholder')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        {t('email')}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/10 text-white placeholder-white/60"
                        placeholder="ornek@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        {t('phone')}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/10 text-white placeholder-white/60"
                        placeholder={tCommon('phonePlaceholder')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        {t('message')}
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 resize-none bg-white/10 text-white placeholder-white/60"
                        placeholder={t('messagePlaceholder')}
                      ></textarea>
                    </div>

                    <div className="pt-4 border-t border-white/20">
                      <h3 className="text-lg font-semibold text-white mb-4">{t('contactHow')}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedContactMethod(selectedContactMethod === "instagram" ? "" : "instagram")}
                          className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all group ${selectedContactMethod === "instagram"
                            ? "bg-gray-900 border-gray-900"
                            : "bg-white/10 border-white/30 hover:border-white/50 hover:bg-white/15"
                            }`}
                        >
                          <FaInstagram className={`h-6 w-6 mb-2 group-hover:scale-110 transition-transform ${selectedContactMethod === "instagram" ? "text-white" : "text-[#E4405F]"
                            }`} />
                          <span className={`text-xs font-medium ${selectedContactMethod === "instagram" ? "text-white" : "text-white/90"
                            }`}>Instagram</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedContactMethod(selectedContactMethod === "telegram" ? "" : "telegram")}
                          className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all group ${selectedContactMethod === "telegram"
                            ? "bg-gray-900 border-gray-900"
                            : "bg-white/10 border-white/30 hover:border-white/50 hover:bg-white/15"
                            }`}
                        >
                          <FaTelegram className={`h-6 w-6 mb-2 group-hover:scale-110 transition-transform ${selectedContactMethod === "telegram" ? "text-white" : "text-[#0088cc]"
                            }`} />
                          <span className={`text-xs font-medium ${selectedContactMethod === "telegram" ? "text-white" : "text-white/90"
                            }`}>Telegram</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedContactMethod(selectedContactMethod === "phone" ? "" : "phone")}
                          className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all group ${selectedContactMethod === "phone"
                            ? "bg-gray-900 border-gray-900"
                            : "bg-white/10 border-white/30 hover:border-white/50 hover:bg-white/15"
                            }`}
                        >
                          <FaPhone className={`h-6 w-6 mb-2 group-hover:scale-110 transition-transform ${selectedContactMethod === "phone" ? "text-white" : "text-white"
                            }`} />
                          <span className={`text-xs font-medium ${selectedContactMethod === "phone" ? "text-white" : "text-white/90"
                            }`}>{tCommon('phone')}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedContactMethod(selectedContactMethod === "whatsapp" ? "" : "whatsapp")}
                          className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all group ${selectedContactMethod === "whatsapp"
                            ? "bg-gray-900 border-gray-900"
                            : "bg-white/10 border-white/30 hover:border-white/50 hover:bg-white/15"
                            }`}
                        >
                          <FaWhatsapp className={`h-6 w-6 mb-2 group-hover:scale-110 transition-transform ${selectedContactMethod === "whatsapp" ? "text-white" : "text-[#25D366]"
                            }`} />
                          <span className={`text-xs font-medium ${selectedContactMethod === "whatsapp" ? "text-white" : "text-white/90"
                            }`}>WhatsApp</span>
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/20">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          className="mt-1 w-5 h-5 text-[#4f271b] border-white/30 rounded focus:ring-white/50 focus:ring-2 bg-white/10"
                        />
                        <span className="text-sm text-white/90">
                          <a href="/kvkk" target="_blank" className="text-white hover:underline font-medium">
                            {t('kvkk')}
                          </a> {t('kvkkDesc')}
                        </span>
                      </label>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="flex-1 px-6 py-3 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
                      >
                        {tCommon('cancel')}
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-[#EDC370] to-[#E5B85C] hover:from-[#E5B85C] hover:to-[#EDC370] text-[#2e3c3a] rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
                      >
                        <Send className="h-5 w-5" />
                        <span>{tCommon('submit')}</span>
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
