"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Send, Building2, Home, Handshake } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function ServicesOverview() {
  const t = useTranslations('servicesOverview');
  const tCommon = useTranslations('common');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const services = [
    {
      id: "investors",
      title: t('investors'),
      description: t('investorsDesc'),
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
      icon: Building2,
      href: "/mulk-yonetimi-hizmetleri",
    },
    {
      id: "rental",
      title: t('rental'),
      description: t('rentalDesc'),
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
      icon: Home,
      href: "/gunluk-kiralama",
    },
    {
      id: "partners",
      title: t('partners'),
      description: t('partnersDesc'),
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop",
      icon: Handshake,
      href: "/is-ortaklari",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemi buraya gelecek
    console.log("Form gönderildi:", formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  return (
    <>
      <section className="relative py-20 lg:py-32" style={{ background: '#4f271b' }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('title')}
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-4">
              {t('description')}
            </p>
            <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto mb-8">
              {t('ecosystem')}
            </p>
          </div>

          {/* 3 Kart */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="group relative animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-white/10 hover:border-white/30">
                    {/* Görsel */}
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                      {/* İkon */}
                      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-white" />
                      </div>

                      {/* Başlık Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Açıklama */}
                    <div className="bg-white/5 backdrop-blur-sm p-6 border-t border-white/10">
                      <p className="text-white/90 text-center font-medium">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Buton */}
                  <Link
                    href={service.href}
                    className="w-full mt-4 block bg-gradient-to-r from-[#EDC370] to-[#E5B85C] hover:from-[#E5B85C] hover:to-[#EDC370] text-[#2e3c3a] py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-center"
                  >
                    Devamını Gör
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Detaylar için Bize Ulaş Butonu */}
          <div className="max-w-2xl mx-auto mt-12 text-center">
            <button
              onClick={() => setIsFormOpen(true)}
              className="text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              style={{ backgroundColor: '#2e3c3a' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#3a4d4a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2e3c3a';
              }}
            >
              Detaylar için Bize Ulaş
            </button>
          </div>
        </div>
      </section>

      {/* Form Modal */}
      {isFormOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999]"
            onClick={() => setIsFormOpen(false)}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#2e3c3a]">
                  Detaylar için Bize Ulaş
                </h3>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label={tCommon('close')}
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-center">
                  <p className="font-semibold">{t('modalSuccess')}</p>
                  <p className="text-sm mt-1">{t('modalSuccessDesc')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('modalName')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f271b]"
                      placeholder={t('modalNamePlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('modalEmail')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f271b]"
                      placeholder={t('modalEmailPlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('modalPhone')}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f271b]"
                      placeholder={t('modalPhonePlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('modalMessage')}
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f271b] resize-none"
                      placeholder={t('modalMessagePlaceholder')}
                    ></textarea>
                  </div>

                  {/* KVKK Onay */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        className="mt-1 w-5 h-5 text-[#4f271b] border-gray-300 rounded focus:ring-[#4f271b] focus:ring-2"
                      />
                      <span className="text-sm text-gray-700">
                        <a href="/kvkk" target="_blank" className="text-[#4f271b] hover:underline font-medium">
                          {t('modalKvkk')}
                        </a> {t('modalKvkkDesc')}
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      {tCommon('cancel')}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white rounded-lg font-semibold hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] transition-all flex items-center justify-center space-x-2"
                    >
                      <Send className="h-5 w-5" />
                      <span>{tCommon('submit')}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
