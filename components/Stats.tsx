"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TrendingUp, Building2, Calendar, Code, Headphones, BarChart3 } from "lucide-react";
import { useTranslations } from 'next-intl';

interface StatItem {
  key: string;
  value: string;
  label: string;
  image: string | null;
  href: string;
}

export default function Stats() {
  const t = useTranslations('stats');
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);

  const iconMap: { [key: string]: any } = {
    projects: Building2,
    realEstate: TrendingUp,
    experience: Calendar,
    itPlatform: Code,
    support: Headphones,
    occupancy: BarChart3,
  };

  useEffect(() => {
    // API'den stats görsellerini çek
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/page-images/stats");
        const data = await response.json();
        // API'den gelen verilere href ekle
        const statsWithHref = data.map((stat: StatItem) => {
          const hrefMap: { [key: string]: string } = {
            projects: "/yonetilen-projeler",
            realEstate: "/emlak-degeri",
            experience: "/deneyim",
            itPlatform: "/it-platformu",
            support: "/destek",
            occupancy: "/doluluk-orani",
          };
          // Support için API'den gelen görseli null yap, imageMap'teki görseli kullan
          const image = stat.key === 'support' ? null : stat.image;
          return { ...stat, href: hrefMap[stat.key] || "/", image };
        });
        setStats(statsWithHref);
      } catch (error) {
        console.error("Stats görselleri yüklenemedi:", error);
        // Hata durumunda varsayılan verileri kullan
        setStats([
          { key: "projects", value: "85+", label: t('projects'), image: null, href: "/yonetilen-projeler" },
          { key: "realEstate", value: "25+", label: t('realEstate'), image: null, href: "/emlak-degeri" },
          { key: "experience", value: "16", label: t('experience'), image: null, href: "/deneyim" },
          { key: "itPlatform", value: "", label: t('itPlatform'), image: null, href: "/it-platformu" },
          { key: "support", value: "", label: t('support'), image: null, href: "/destek" },
          { key: "occupancy", value: ">90%", label: t('occupancy'), image: null, href: "/doluluk-orani" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [t]);

  if (loading) {
    return (
      <section className="py-20" style={{ background: '#b7b1ad' }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2e3c3a] mx-auto mb-4"></div>
            <p className="text-[#2e3c3a]">{t('loading')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-20 md:pt-20 lg:py-32 relative overflow-hidden" style={{ background: '#b7b1ad' }}>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16" suppressHydrationWarning>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#2e3c3a] leading-tight">
            {t('title')}
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Minimal Grid Layout with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {stats.map((stat, index) => {
            const displayValue = stat.value || "";
            const Icon = iconMap[stat.key] || Building2;

            // Her stat için farklı görsel
            const imageMap: { [key: string]: string } = {
              projects: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
              realEstate: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
              experience: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
              itPlatform: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
              support: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?w=800&h=600&fit=crop",
              occupancy: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
            };

            // Support için her zaman imageMap'teki görseli kullan (API'den gelen görseli override et)
            const backgroundImage = stat.key === 'support' ? imageMap[stat.key] : (stat.image || imageMap[stat.key] || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop");

            return (
              <div
                key={stat.key}
                className="group relative overflow-hidden rounded-2xl border border-white/20 transition-all duration-300 min-h-[220px] sm:min-h-[280px]"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Arka Plan Görseli */}
                <div className="absolute inset-0">
                  <Image
                    src={backgroundImage}
                    alt={t(stat.key)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* Gradient Overlay - Minimal */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2e3c3a]/85 via-[#2e3c3a]/60 to-[#2e3c3a]/40"></div>
                </div>

                {/* İçerik - Üstte */}
                <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col justify-between">
                  {/* Üst - İkon */}
                  <div>
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  {/* Alt - Değer ve Label */}
                  <div className="space-y-3">
                    {displayValue && (
                      <div>
                        <span className="font-bold text-white leading-none text-4xl sm:text-5xl lg:text-6xl drop-shadow-lg">
                          {displayValue}
                        </span>
                      </div>
                    )}

                    <p className="text-white/95 group-hover:text-white transition-colors text-base lg:text-lg font-semibold leading-snug drop-shadow-md">
                      {t(stat.key)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
