"use client";

import { Share2, Link as LinkIcon, X } from "lucide-react";
import { FaWhatsapp, FaTelegram } from "react-icons/fa";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SocialShare({
  url,
  title,
  description = "",
  className = "",
}: SocialShareProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const t = useTranslations('common');

  const shareUrl = typeof window !== "undefined" ? window.location.origin + url : url;
  const shareText = `${title}${description ? ` - ${description}` : ""}`;

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
  };

  const handleShare = (platform: string) => {
    const link = shareLinks[platform as keyof typeof shareLinks];
    if (link) {
      window.open(link, "_blank", "width=600,height=400");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`w-full px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg transition-all flex items-center justify-center gap-2 font-medium ${className}`}
        aria-label={t('share')}
      >
        <Share2 className="h-5 w-5" />
        <span>{t('share')}</span>
      </button>

      {/* Paylaş Modal */}
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999]"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">{t('share')}</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label={t('close')}
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Share Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    handleShare("whatsapp");
                    setIsModalOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-3 p-4 bg-[#25D366] text-white rounded-lg hover:bg-[#20BA5A] transition-colors font-semibold"
                >
                  <FaWhatsapp className="h-6 w-6" />
                  <span>{t('whatsappShare')}</span>
                </button>

                <button
                  onClick={() => {
                    handleShare("telegram");
                    setIsModalOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-3 p-4 bg-[#0088cc] text-white rounded-lg hover:bg-[#0077B5] transition-colors font-semibold"
                >
                  <FaTelegram className="h-6 w-6" />
                  <span>{t('telegramShare')}</span>
                </button>

                <button
                  onClick={copyToClipboard}
                  className="w-full flex items-center justify-center gap-3 p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                >
                  {copied ? (
                    <>
                      <span className="text-green-600">✓</span>
                      <span>{t('linkCopied')}</span>
                    </>
                  ) : (
                    <>
                      <LinkIcon className="h-5 w-5" />
                      <span>{t('copyLink')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}












