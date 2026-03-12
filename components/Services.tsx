"use client";

import { useState, useEffect } from "react";
import { Home, Hotel, Building, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function Services() {
  const t = useTranslations('services');

  const services = [
    {
      icon: Home,
      title: t('property'),
      description: t('propertyDesc'),
      href: "/emlak",
    },
    {
      icon: TrendingUp,
      title: t('investment'),
      description: t('investmentDesc'),
      href: "/yatirim",
    },
  ];
  const [servicesImage, setServicesImage] = useState<string | null>("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&q=90");
  const [loading, setLoading] = useState(false);

  // API çağrısı devre dışı - direkt görsel kullanılıyor
  // useEffect(() => {
  //   const fetchServicesImage = async () => {
  //     try {
  //       const response = await fetch("/api/page-images/services");
  //       const data = await response.json();
  //       if (data.image) {
  //         setServicesImage(data.image);
  //       }
  //     } catch (error) {
  //       console.error("Services görseli yüklenemedi:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchServicesImage();
  // }, []);

  return (
    <section className="py-20 lg:py-32" style={{ background: '#b7b1ad' }}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Sol Taraf - Modern Gradient Blok */}
          <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden group">
            {loading ? (
              <div className="absolute inset-0 bg-gradient-to-br from-[#2e3c3a] via-[#2e3c3a] to-[#2e3c3a] rounded-3xl flex items-center justify-center">
                <div className="text-white font-semibold">{t('loading')}</div>
              </div>
            ) : servicesImage ? (
              <Image
                src={servicesImage}
                alt={t('alt')}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500 rounded-3xl"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#2e3c3a] via-[#2e3c3a] to-[#2e3c3a] rounded-3xl"></div>
            )}
            {/* Shine effect */}
            <div className="absolute inset-0 shine"></div>
          </div>

          {/* Sağ Taraf - Metin İçeriği */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#2e3c3a] leading-tight mb-6">
                {t('title')}
              </h2>
              <p className="text-base md:text-lg text-black leading-relaxed font-light">
                {t('description')}
              </p>
            </div>

            {/* Hizmet Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={index}
                    href={service.href}
                    prefetch={true}
                    className="bg-white/95 backdrop-blur-sm hover:bg-white p-6 rounded-3xl border border-gray-200/50 hover:border-[#2e3c3a]/30 card-hover group shadow-xl hover:shadow-2xl transition-all"
                  >
                    <div className="bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] group-hover:from-[#3a4d4a] group-hover:via-[#2e3c3a] group-hover:to-[#3a4d4a] w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-[#2e3c3a] group-hover:text-[#2a1d12] transition-colors">{service.title}</h3>
                    <p className="text-sm text-black group-hover:text-black">{service.description}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




