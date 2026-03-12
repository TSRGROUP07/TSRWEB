"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Instagram, Youtube, Twitter, Send, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const tCommon = useTranslations('common');

  return (
    <footer className="bg-[#4f271b]/95 border-t border-[#2d2825]/50 text-white mt-20 relative overflow-hidden">

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Logo Section */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-start mb-6">
              <Link href="/" prefetch={true} className="relative h-36 w-auto group mb-5">
                <Image
                  src="/LG.png"
                  alt="TSR GROUP Logo"
                  width={360}
                  height={144}
                  className="h-36 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-lg"
                  priority
                />
              </Link>
              <div className="flex items-center gap-2.5 mt-1">
                <span className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tight drop-shadow-md" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', lineHeight: '1.3', letterSpacing: '0.03em', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>TSR</span>
                <span className="text-white/95 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wider uppercase drop-shadow-md" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', lineHeight: '1.3', letterSpacing: '0.08em', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>GROUP</span>
              </div>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-white mb-6 relative inline-block">
              {t('quickLinks')}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white/50 to-transparent"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/emlak"
                  prefetch={true}
                  className="group flex items-center text-white/80 hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:ml-0 -ml-6 transition-all">{t('propertyListings')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/yatirim"
                  prefetch={true}
                  className="group flex items-center text-white/80 hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:ml-0 -ml-6 transition-all">{t('investmentConsultancy')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/hesaplayici"
                  prefetch={true}
                  className="group flex items-center text-white/80 hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:ml-0 -ml-6 transition-all">{t('calculators')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/bina-yonetimi"
                  prefetch={true}
                  className="group flex items-center text-white/80 hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:ml-0 -ml-6 transition-all">{t('buildingManagement')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Hizmetler */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-white mb-6 relative inline-block">
              {t('services')}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white/50 to-transparent"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/fiyat-analizi"
                  prefetch={true}
                  className="group flex items-center text-white/80 hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:ml-0 -ml-6 transition-all">{t('priceAnalysis')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/karsilastirma"
                  prefetch={true}
                  className="group flex items-center text-white/80 hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:ml-0 -ml-6 transition-all">{t('apartmentComparison')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/odeme"
                  prefetch={true}
                  className="group flex items-center text-white/80 hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:ml-0 -ml-6 transition-all">{t('onlinePayment')}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/belgeler"
                  prefetch={true}
                  className="group flex items-center text-white/80 hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:ml-0 -ml-6 transition-all">{t('companyDocuments')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-white mb-6 relative inline-block">
              {t('contact')}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white/50 to-transparent"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+905303330097"
                  className="group flex items-center space-x-3 text-white/80 hover:text-white transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <span>0530 333 0097</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@tsremlak.com"
                  className="group flex items-center space-x-3 text-white/80 hover:text-white transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <span>info@tsremlak.com</span>
                </a>
              </li>
              <li>
                <div className="group flex items-start space-x-3 text-white/80">
                  <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <span className="leading-relaxed text-left">Ersel apt, Şekerhane, Ali İmam Sk. 18/A, 07400 Alanya/Antalya</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Sosyal Medya ve Copyright */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Sosyal Medya */}
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="font-semibold mb-4 text-white text-lg">{t('followUs')}</h3>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/tsrgroupalanya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-14 h-14 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border border-white/10 hover:border-white/20"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.youtube.com/@TSRGROUPSOCIAL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-14 h-14 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border border-white/10 hover:border-white/20"
                  aria-label="YouTube"
                >
                  <Youtube className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://wa.me/905303330097"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-14 h-14 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border border-white/10 hover:border-white/20"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                </a>
                <div
                  className="group relative w-14 h-14 bg-white/10 backdrop-blur-sm hover:bg-gradient-to-r hover:from-[#2e3c3a] hover:via-[#3a4d4a] hover:to-[#2e3c3a] rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border border-white/10 hover:border-white/20 cursor-pointer opacity-50"
                  aria-label="X (Twitter)"
                >
                  <Twitter className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                </div>
                <div
                  className="group relative w-14 h-14 bg-white/10 backdrop-blur-sm hover:bg-gradient-to-r hover:from-[#2e3c3a] hover:via-[#3a4d4a] hover:to-[#2e3c3a] rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border border-white/10 hover:border-white/20 cursor-pointer opacity-50"
                  aria-label="Telegram"
                >
                  <Send className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center lg:text-right">
              <p className="text-white/60 text-sm">
                &copy; 2025 TSR GROUP. {tCommon('allRightsReserved')}.
              </p>
              <p className="text-white/40 text-xs mt-2">
                {t('pioneer')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

