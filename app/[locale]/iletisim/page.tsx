"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

import { useTranslations } from 'next-intl';

export default function IletisimPage() {
  const t = useTranslations('contactPage');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const messageData = {
        type: "contact",
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "",
        subject: formData.subject,
        message: formData.message,
        status: "new",
      };

      const response = await fetch("/api/admin/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || t('messageSentError'));
      }

      const result = await response.json();
      console.log("✅ Mesaj başarıyla gönderildi! Message ID:", result.message?.id);

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error: any) {
      console.error("Form gönderim hatası:", error);
      alert(`Bir hata oluştu: ${error?.message || t('tryAgain')}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#b7b1ad]">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080&fit=crop&q=90"
            alt={t('title')}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2e3c3a]/90 via-[#3a4d4a]/80 to-[#2e3c3a]/90"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight drop-shadow-2xl">
              {t('title')}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* İletişim Bilgileri ve Form */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Sol Panel - İletişim Bilgileri */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">{t('contactInfoTitle')}</h2>
              <p className="text-white/80 mb-8">
                {t('contactInfoDesc')}
              </p>
            </div>

            {/* İletişim Kartları */}
            <div className="space-y-6">
              {/* Telefon */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">{t('phone')}</h3>
                    <a href="tel:+905303330097" className="text-white/80 hover:text-white transition-colors block">
                      +90 (530) 333 00 97
                    </a>
                    <a
                      href="https://wa.me/905303330097"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                    >
                      <FaWhatsapp className="h-5 w-5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* E-posta */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">{t('email')}</h3>
                    <a href="mailto:info@tsremlak.com" className="text-white/80 hover:text-white transition-colors">
                      info@tsremlak.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Adres */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">{t('address')}</h3>
                    <p className="text-white/80 whitespace-pre-line">
                      {t('addressText')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Çalışma Saatleri */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">{t('workingHours')}</h3>
                    <p className="text-white/80 whitespace-pre-line">
                      {t('workingHoursText')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Panel - İletişim Formu */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('formTitle')}</h2>
            <p className="text-gray-600 mb-8">{t('formDesc')}</p>

            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('successTitle')}</h3>
                <p className="text-gray-600 mb-6">
                  {t('successDesc')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Ad Soyad */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('nameLabel')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4f271b] focus:outline-none text-gray-900"
                    placeholder={t('namePlaceholder')}
                  />
                </div>

                {/* E-posta */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('emailLabel')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4f271b] focus:outline-none text-gray-900"
                    placeholder={t('emailPlaceholder')}
                  />
                </div>

                {/* Telefon */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('phoneLabel')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4f271b] focus:outline-none text-gray-900"
                    placeholder={t('phonePlaceholder')}
                  />
                </div>

                {/* Konu */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('subjectLabel')}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4f271b] focus:outline-none text-gray-900 bg-white"
                  >
                    <option value="">{t('subjectPlaceholder')}</option>
                    <option value="emlak">{t('subjects.realEstate')}</option>
                    <option value="yatirim">{t('subjects.investment')}</option>
                    <option value="bina-yonetimi">{t('subjects.buildingManagement')}</option>
                    <option value="genel">{t('subjects.general')}</option>
                    <option value="diger">{t('subjects.other')}</option>
                  </select>
                </div>

                {/* Mesaj */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('messageLabel')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4f271b] focus:outline-none text-gray-900 resize-none"
                    placeholder={t('messagePlaceholder')}
                  />
                </div>

                {/* Gönder Butonu */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#4f271b] hover:bg-[#3d1f15] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>{t('submittingBtn')}</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>{t('submitBtn')}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Harita Bölümü */}
        <div className="mt-16">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">{t('visitUsTitle')}</h2>
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.123456789!2d32.000000!3d36.500000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzYsMzIsMCww!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
