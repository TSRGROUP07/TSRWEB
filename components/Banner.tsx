"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

interface Banner {
  id: number;
  url: string; // API'den gelen image.url
  title?: string;
  description?: string;
  link?: string;
  position?: string; // "top", "middle", "bottom" gibi
  active?: boolean;
  createdAt: string;
}

interface BannerProps {
  position?: string; // Banner'ın hangi pozisyonda gösterileceği
  index?: number; // Aynı pozisyondaki banner'ların hangisini göstereceği (0, 1, 2...)
}

export default function Banner({ position = "middle", index = 0 }: BannerProps) {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentBanner, setCurrentBanner] = useState<Banner | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`/api/admin/images?category=banner`);
        if (response.ok) {
          const data = await response.json();
          // Pozisyona göre filtrele ve aktif olanları al
          const filtered = data
            .filter((banner: any) => 
              banner.active !== false && 
              (!banner.position || banner.position === position)
            )
            .sort((a: any, b: any) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          
          setBanners(filtered);
          // Index'e göre banner seç (eğer index geçerliyse)
          if (filtered.length > 0 && index < filtered.length) {
            setCurrentBanner(filtered[index]);
          } else if (filtered.length > 0) {
            // Index geçersizse ilk banner'ı göster
            setCurrentBanner(filtered[0]);
          }
        }
      } catch (error) {
        console.error("Banner yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, [position, index]);

  // Kapatılmış banner'ları kontrol et - Hook'lar her zaman çağrılmalı
  useEffect(() => {
    if (currentBanner && typeof window !== "undefined") {
      const closedBanners = JSON.parse(
        localStorage.getItem("closedBanners") || "[]"
      );
      if (closedBanners.includes(currentBanner.id)) {
        setIsVisible(false);
      }
    }
  }, [currentBanner]);

  // Eğer banner yoksa veya görünür değilse hiçbir şey gösterme
  if (loading || !currentBanner || !isVisible) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
    // LocalStorage'a kaydet ki kullanıcı kapatırsa tekrar gösterme
    if (typeof window !== "undefined" && currentBanner) {
      const closedBanners = JSON.parse(
        localStorage.getItem("closedBanners") || "[]"
      );
      if (!closedBanners.includes(currentBanner.id)) {
        closedBanners.push(currentBanner.id);
        localStorage.setItem("closedBanners", JSON.stringify(closedBanners));
      }
    }
  };

  const BannerContent = (
    <div className="relative w-full overflow-hidden rounded-xl shadow-2xl group">
      {currentBanner.link ? (
        <Link href={currentBanner.link} prefetch={true} className="block">
          <div className="relative w-full h-full">
            <Image
              src={currentBanner.url}
              alt={currentBanner.title || "Banner"}
              width={1200}
              height={300}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            {(currentBanner.title || currentBanner.description) && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
                <div className="p-6 text-white w-full">
                  {currentBanner.title && (
                    <h3 className="text-2xl font-bold mb-2">{currentBanner.title}</h3>
                  )}
                  {currentBanner.description && (
                    <p className="text-white/90">{currentBanner.description}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </Link>
      ) : (
        <div className="relative w-full h-full">
          <Image
            src={currentBanner.url}
            alt={currentBanner.title || "Banner"}
            width={1200}
            height={300}
            className="w-full h-auto object-cover"
            unoptimized
          />
          {(currentBanner.title || currentBanner.description) && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
              <div className="p-6 text-white w-full">
                {currentBanner.title && (
                  <h3 className="text-2xl font-bold mb-2">{currentBanner.title}</h3>
                )}
                {currentBanner.description && (
                  <p className="text-white/90">{currentBanner.description}</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Kapat butonu */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all z-10"
        aria-label="Banner'ı kapat"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {BannerContent}
    </div>
  );
}
