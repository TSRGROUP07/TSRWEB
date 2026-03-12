"use client";

import { useState, useEffect } from "react";
import { X, QrCode, Phone } from "lucide-react";
import { FaWhatsapp, FaTelegram, FaInstagram } from "react-icons/fa";
import { useTranslations } from 'next-intl';

export default function ChatWidget() {
  const t = useTranslations('chatWidget');
  const [isOpen, setIsOpen] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(0); // 0: WhatsApp, 1: Telegram, 2: Phone

  // İkonları döndür
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % 3);
    }, 2500); // 2.5 saniyede bir değişir

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-full flex items-center justify-center shadow-2xl hover:shadow-[0_0_30px_rgba(46,60,58,0.8)] hover:scale-110 transition-all duration-300 border-2 border-white/20 hover:border-white/50 group"
        aria-label={t('contact')}
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          {/* WhatsApp */}
          <FaWhatsapp
            className={`absolute w-8 h-8 transition-all duration-500 ${currentIcon === 0
              ? 'opacity-100 scale-100 text-[#25D366]'
              : 'opacity-0 scale-75 text-white'
              }`}
          />
          {/* Telegram */}
          <FaTelegram
            className={`absolute w-8 h-8 transition-all duration-500 ${currentIcon === 1
              ? 'opacity-100 scale-100 text-[#0088cc]'
              : 'opacity-0 scale-75 text-white'
              }`}
          />
          {/* Phone */}
          <Phone
            className={`absolute w-8 h-8 transition-all duration-500 ${currentIcon === 2
              ? 'opacity-100 scale-100 text-white'
              : 'opacity-0 scale-75 text-white'
              }`}
          />
        </div>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-gradient-to-br from-[#b7b1ad] via-white to-[#b7b1ad] rounded-2xl shadow-2xl w-[90vw] max-w-md p-5 md:p-6 relative animate-scale-in border border-white/20 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 z-50 w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors border border-gray-200 shadow-md"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-[#2e3c3a]" />
            </button>

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-bold text-[#2e3c3a] text-center mb-4 md:mb-6 mt-2">
              {t('title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Left Side - QR Code - Mobilde gizle */}
              <div className="hidden md:block space-y-4">
                <a
                  href="https://bobil.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <QrCode className="h-5 w-5" />
                  <span>{t('scanQr')}</span>
                </a>
                <div className="bg-white/90 backdrop-blur-sm border-2 border-[#2e3c3a]/20 rounded-lg p-8 flex items-center justify-center shadow-inner min-h-[200px]">
                  <p className="text-[#2e3c3a] text-center font-medium text-lg">
                    {t('qrPlaceholder')}
                  </p>
                </div>
              </div>

              {/* Right Side - Chat Apps */}
              <div className="space-y-1.5 md:space-y-3">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/905303330097"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 md:gap-3 bg-green-50/75 backdrop-blur-sm hover:bg-green-50 text-[#2e3c3a] font-semibold py-2 md:py-4 px-2.5 md:px-4 rounded-lg transition-all shadow-md hover:shadow-lg border border-green-200/50 hover:border-green-300/70 group"
                >
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-green-100/70 backdrop-blur-sm rounded-lg flex items-center justify-center border border-green-200/50 group-hover:bg-green-100 transition-colors flex-shrink-0">
                    <FaWhatsapp className="h-4 w-4 md:h-6 md:w-6 text-green-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="flex-1 text-xs md:text-base">WhatsApp</span>
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me/+905303330097"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 md:gap-3 bg-blue-50/75 backdrop-blur-sm hover:bg-blue-50 text-[#2e3c3a] font-semibold py-2 md:py-4 px-2.5 md:px-4 rounded-lg transition-all shadow-md hover:shadow-lg border border-blue-200/50 hover:border-blue-300/70 group"
                >
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-100/70 backdrop-blur-sm rounded-lg flex items-center justify-center border border-blue-200/50 group-hover:bg-blue-100 transition-colors flex-shrink-0">
                    <FaTelegram className="h-4 w-4 md:h-6 md:w-6 text-blue-500 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="flex-1 text-xs md:text-base">Telegram</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/tsrgroupalanya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 md:gap-3 bg-pink-50/75 backdrop-blur-sm hover:bg-pink-50 text-[#2e3c3a] font-semibold py-2 md:py-4 px-2.5 md:px-4 rounded-lg transition-all shadow-md hover:shadow-lg border border-pink-200/50 hover:border-pink-300/70 group"
                >
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-pink-100/70 backdrop-blur-sm rounded-lg flex items-center justify-center border border-pink-200/50 group-hover:bg-pink-100 transition-colors flex-shrink-0">
                    <FaInstagram className="h-4 w-4 md:h-6 md:w-6 text-pink-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="flex-1 text-xs md:text-base">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
