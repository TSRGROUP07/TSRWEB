"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function CompanyAbout() {
  const t = useTranslations('companyAbout');

  return (
    <section className="relative py-12 lg:py-16" style={{ background: '#b7b1ad' }}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Şirket Hakkında Metin */}
          <div className="space-y-6 text-center">
            <div className="relative inline-block mb-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2e3c3a] relative z-10 leading-tight">
                {t('title')}
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] rounded-full"></div>
            </div>

            <div className="space-y-6">
              <p className="text-lg md:text-xl text-white leading-relaxed">
                {t('p1')}
              </p>

              <p className="text-lg md:text-xl text-white leading-relaxed">
                {t('p2')}
              </p>
            </div>

            {/* Devamını Oku Butonu */}
            <Link
              href="/kurumsal"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 group"
            >
              <span>{t('readMore')}</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
