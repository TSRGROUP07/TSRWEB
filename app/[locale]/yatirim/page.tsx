"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";

// Sabit görsel yolu - mutlak yol olarak tanımla - ASLA DEĞİŞMEYECEK
const ALONARSAT_IMAGE = "/ALONARSAT/ALSAT.png";

// investmentServices array'ini component dışında tanımla - böylece her render'da yeniden oluşturulmaz
const investmentServices = [
  {
    id: 1,
    title: "Satın Al (Ticari, Kurumsal Kiracılı) - Günlük Kiraya Ver",
    image: "/KURUMSAL/burger.png",
    href: "/yatirim/satin-al",
    unoptimized: true,
  },
  {
    id: 2,
    title: "Al-Onar-Sat",
    image: "/ALONARSAT/ALSAT.png",
    href: "/yatirim/al-onar-sat",
    unoptimized: true,
  },
  {
    id: 3,
    title: "Villanızı Siz Finanse Edin TSR Yapsın",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    href: "/yatirim/villa-finans",
    unoptimized: false,
  },
  {
    id: 4,
    title: "Toplu Emlak Bina Alımı",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    href: "/yatirim/toplu-bina",
    unoptimized: false,
  },
  {
    id: 5,
    title: "Karlı Arsa ve Arazi Yatırımları",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
    href: "/yatirim/arsa-arazi",
    unoptimized: false,
  },
  {
    id: 6,
    title: "Kentsel Dönüşüm ve Geliştirme Yatırımı",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    href: "/yatirim/kentsel-donusum",
    unoptimized: false,
  },
] as const;

export default function YatirimPage() {
  // investmentServices array'ini memoize et - her render'da aynı referans
  const services = useMemo(() => investmentServices, []);

  // Görseli preload et - tarayıcı cache'ine al
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = '/ALONARSAT/ALSAT.png';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#b7b1ad] text-white py-20" suppressHydrationWarning>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#2e3c3a] leading-tight">
            Yatırım Hizmetlerimiz
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
            Profesyonel yatırım danışmanlığı ile geleceğinize değer katın
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const isUnoptimized = service.unoptimized;

            return (
              <Link
                key={service.id}
                href={service.href}
                prefetch={true}
                className="group relative rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 bg-white/10 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              >
                {/* Görsel - Al-Onar-Sat için direkt sabit string, diğerleri için service.image */}
                <div className="relative h-64 w-full bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] overflow-hidden" suppressHydrationWarning>
                  {service.id === 2 ? (
                    <img
                      src="/ALONARSAT/ALSAT.png"
                      alt="Al-Onar-Sat - Renovasyon ve Dönüşüm"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      style={{ objectFit: 'cover' }}
                      loading="eager"
                    />
                  ) : isUnoptimized ? (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      style={{ objectFit: 'cover' }}
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0"></div>

                  {/* Başlık */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-white text-lg md:text-xl font-bold group-hover:text-white/90 transition-colors drop-shadow-lg">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

