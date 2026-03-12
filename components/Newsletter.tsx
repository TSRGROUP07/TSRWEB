"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function Newsletter() {
  const t = useTranslations('newsletter');
  const [email, setEmail] = useState("");
  const [agreements, setAgreements] = useState({
    dataProcessing: false,
    policyRead: false,
    marketing: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter abonelik işlemi burada yapılacak
    console.log("Newsletter subscription:", { email, agreements });
  };

  return (
    <section className="relative py-20 lg:py-32" style={{ background: '#b7b1ad' }}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Sol Taraf - Form */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-block">
              <p className="text-sm text-white/70 uppercase tracking-wider font-bold mb-2">
                {t('badge')}
              </p>
              <div className="h-1 w-16 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-6">
              {t('title')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input - Modern Design */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('placeholder')}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/30 text-white placeholder-white/50 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] focus:border-[#2e3c3a] transition-all text-lg"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl whitespace-nowrap"
                >
                  <span>{t('button')}</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>

              {/* Checkboxes */}
              <div className="space-y-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agreements.dataProcessing}
                    onChange={(e) =>
                      setAgreements({
                        ...agreements,
                        dataProcessing: e.target.checked,
                      })
                    }
                    className="mt-1 w-5 h-5 text-[#2e3c3a] bg-white/10 border-2 border-white/30 rounded focus:ring-[#2e3c3a] focus:ring-2 checked:bg-[#2e3c3a] checked:border-[#2e3c3a] transition-all"
                  />
                  <span className="text-sm text-white/90 group-hover:text-white transition-colors">
                    {t('agreeProcessing')}
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agreements.policyRead}
                    onChange={(e) =>
                      setAgreements({
                        ...agreements,
                        policyRead: e.target.checked,
                      })
                    }
                    className="mt-1 w-5 h-5 text-[#2e3c3a] bg-white/10 border-2 border-white/30 rounded focus:ring-[#2e3c3a] focus:ring-2 checked:bg-[#2e3c3a] checked:border-[#2e3c3a] transition-all"
                  />
                  <span className="text-sm text-white/90 group-hover:text-white transition-colors">
                    {t('agreePolicy')}
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agreements.marketing}
                    onChange={(e) =>
                      setAgreements({
                        ...agreements,
                        marketing: e.target.checked,
                      })
                    }
                    className="mt-1 w-5 h-5 text-[#2e3c3a] bg-white/10 border-2 border-white/30 rounded focus:ring-[#2e3c3a] focus:ring-2 checked:bg-[#2e3c3a] checked:border-[#2e3c3a] transition-all"
                  />
                  <span className="text-sm text-white/90 group-hover:text-white transition-colors">
                    {t('agreeMarketing')}
                  </span>
                </label>
              </div>
            </form>
          </div>

          {/* Sağ Taraf - Görsel */}
          <div className="relative animate-slide-up">
            <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-2xl overflow-hidden shadow-2xl group border-2 border-white/20 hover:border-white/40 transition-all">
              <Image
                src="/newsletter-bg.png"
                alt="Newsletter Analytics - Real Estate Insights"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

