"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { MapPin, Bed, Bath, Square, CheckCircle, User, Phone, Building } from "lucide-react";
import FavoriteButton from "./FavoriteButton";
import { useCurrency } from "@/contexts/CurrencyContext";
import { usePropertyTranslation } from "@/lib/usePropertyTranslation";

interface Property {
  id: number | string;
  title: string;
  location: string;
  price: number;
  area: number;
  rooms: number | string;
  bathrooms: number;
  image?: string;
  images?: string[]; // Resim dizisi
  type: string;
  verified: boolean;
  coordinates?: { lat: number; lng: number };
  agentName?: string;
  agentPhoto?: string;
  agentPhone?: string;
  floor?: number;
  totalFloors?: number;
  buildingAge?: number;
  monthlyRent?: number;
  currency?: any;
  label?: string; // İlan etiketi
  citizenshipSuitable?: boolean; // Vatandaşlığa Uygun
  residencePermitSuitable?: boolean; // İkamete Uygun
  coverImage?: string; // Kapak fotoğrafı
  hasSeaView?: boolean; // Deniz Manzarası
}

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
}

function PropertyCard({ property, priority = false }: PropertyCardProps) {
  const t = useTranslations('propertyCard');
  const { formatCurrency } = useCurrency();
  const { title, location } = usePropertyTranslation(property);

  // Helper function to convert Drive URLs to Proxy URLs with width support
  const getProxiedImageUrl = (url: string, width?: number, format: string = "webp") => {
    if (!url) return "";
    if (url.includes("/api/image-proxy") || url.startsWith("data:") || !url.startsWith("http")) return url;

    if (url.includes("drive.google.com") || url.includes("googleusercontent.com")) {
      let id = "";
      const idMatch = url.match(/[?&]id=([^&]+)/) || url.match(/\/d\/([^/]+)/);
      if (idMatch) id = idMatch[1];

      if (id) {
        return `/api/image-proxy?id=${id}${width ? `&w=${width}` : ''}${format ? `&format=${format}` : ''}`;
      }
    }
    return url;
  };

  // Eğer coverImage varsa onu, yoksa image, yoksa images[0] kullan
  const imageUrl = property.coverImage || property.image || (property.images && property.images.length > 0 ? property.images[0] : "");
  // Use WebP for better compression, 400px width for card thumbnails
  const displayImage = getProxiedImageUrl(imageUrl, 400, "webp");

  return (
    <Link href={`/emlak/${property.id}`} prefetch={true} className="block group h-full">
      <div className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all overflow-hidden cursor-pointer card-hover border border-gray-200 hover:border-[#2e3c3a]/50 relative h-full flex flex-col">
        <div className="relative h-64 sm:h-72 bg-gray-200 overflow-hidden rounded-t-xl">


          {/* Üst Sol - Sadece Tip Badge */}
          <div className="absolute top-2 left-2 z-20">
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-xl backdrop-blur-sm ${property.type === "Satılık"
                ? "bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] text-white border border-white/30"
                : "bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] text-white border border-white/30"
                }`}
            >
              {property.type === "Satılık" ? t('forSale') : property.type === "Kiralık" ? t('forRent') : property.type}
            </span>
          </div>

          {/* Üst Sağ - Verified ve Favori */}
          <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5">
            {property.verified && (
              <div className="bg-[#2e3c3a]/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-white/30">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            )}
            <div onClick={(e) => e.preventDefault()}>
              <FavoriteButton propertyId={property.id} />
            </div>
          </div>

          {/* Alt Sol - Fiyat ve Özellik Etiketleri (2 sıra) */}
          <div className="absolute bottom-1.5 left-1.5 right-1.5 z-20">


            {/* Etiketler - 2 sıra, flex wrap */}
            <div className="flex flex-wrap gap-1">
              {/* Deniz Manzarası Badge */}
              {property.hasSeaView && (
                <span className="px-2 py-1 rounded-full text-[9px] font-bold shadow-xl backdrop-blur-sm bg-gradient-to-r from-sky-500 to-blue-500 text-white border border-white/30">
                  🌊 Deniz Manzarası
                </span>
              )}

              {/* Vatandaşlık Badge */}
              {property.citizenshipSuitable && (
                <span className="px-2 py-1 rounded-full text-[9px] font-bold shadow-xl backdrop-blur-sm bg-gradient-to-r from-red-500 to-red-600 text-white border border-white/30">
                  🇹🇷 Vatandaşlık
                </span>
              )}

              {/* Oturma İzni Badge */}
              {property.residencePermitSuitable && (
                <span className="px-2 py-1 rounded-full text-[9px] font-bold shadow-xl backdrop-blur-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white border border-white/30">
                  📝 Oturma İzni
                </span>
              )}

              {/* Custom Label (Taksit vb.) */}
              {property.label && (
                <span className="px-2 py-1 rounded-full text-[9px] font-bold shadow-xl backdrop-blur-sm bg-gradient-to-r from-[#EDC370] to-[#E5B85C] text-[#2e3c3a] border border-[#2e3c3a]/10">
                  {property.label}
                </span>
              )}
            </div>
          </div>

          {/* Görsel */}
          {displayImage ? (
            <Image
              src={displayImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#2e3c3a] via-[#2e3c3a] to-[#2e3c3a] flex items-center justify-center">
              <span className="text-white text-lg font-bold drop-shadow-lg">
                {title}
              </span>
            </div>
          )}
        </div>

        {/* İçerik */}
        <div className="p-3 sm:p-4 bg-white border-t border-gray-200 flex-1 flex flex-col">
          <h3 className="text-sm sm:text-xs font-bold mb-1.5 group-hover:text-[#2e3c3a] transition-colors text-gray-900 line-clamp-2">
            {title}
          </h3>

          <div className="flex items-center text-gray-600 mb-1.5">
            <MapPin className="h-3.5 w-3.5 sm:h-3 sm:w-3 mr-1 text-gray-500 flex-shrink-0" />
            <span className="text-[11px] sm:text-[10px] font-medium line-clamp-1 text-gray-600">{location}</span>
          </div>

          {/* Ek Bilgiler - Modern Badges */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            {property.floor !== undefined && property.totalFloors && (
              <div className="flex items-center space-x-1 bg-gray-100 px-1.5 py-1 rounded-lg border border-gray-200">
                <Building className="h-3 w-3 sm:h-2.5 sm:w-2.5 text-[#2e3c3a]" />
                <span className="text-[11px] sm:text-[10px] font-semibold text-gray-900">{property.floor}/{property.totalFloors}</span>
              </div>
            )}
            {property.buildingAge !== undefined && (
              <div className="bg-gray-100 px-1.5 py-1 rounded-lg border border-gray-200">
                <span className="text-[11px] sm:text-[10px] font-semibold text-gray-900">{property.buildingAge} {t('years')}</span>
              </div>
            )}
          </div>

          {/* Özellikler - Modern Grid */}
          <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-gray-200 mt-auto">
            <div className="flex flex-col items-center p-2 sm:p-1.5 bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors">
              <Bed className="h-4 w-4 sm:h-3.5 sm:w-3.5 text-[#2e3c3a] mb-0.5" />
              <span className="text-[11px] sm:text-[10px] font-bold text-gray-900">{property.rooms}</span>
              <span className="text-[10px] sm:text-[9px] text-gray-600">{t('room')}</span>
            </div>
            <div className="flex flex-col items-center p-2 sm:p-1.5 bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors">
              <Bath className="h-4 w-4 sm:h-3.5 sm:w-3.5 text-[#2e3c3a] mb-0.5" />
              <span className="text-[11px] sm:text-[10px] font-bold text-gray-900">{property.bathrooms}</span>
              <span className="text-[10px] sm:text-[9px] text-gray-600">{t('bathroom')}</span>
            </div>
            <div className="flex flex-col items-center p-2 sm:p-1.5 bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors">
              <Square className="h-4 w-4 sm:h-3.5 sm:w-3.5 text-[#2e3c3a] mb-0.5" />
              <span className="text-[11px] sm:text-[10px] font-bold text-gray-900">{property.area}</span>
              <span className="text-[10px] sm:text-[9px] text-gray-600">{t('sqm')}</span>
            </div>
          </div>
        </div>

        {/* Fiyat Alanı - En Altta Sarı Bant */}
        <div className="bg-[#EDC370] p-3 text-center w-full mt-auto">
          <span className="block text-[#2e3c3a] text-lg sm:text-xl font-extrabold tracking-tight">
            {formatCurrency(property.price, property.currency || "EUR")}
          </span>
          {property.type === "Kiralık" && property.monthlyRent && (
            <span className="block text-[11px] text-[#2e3c3a]/80 font-bold mt-1">
              {t('monthly')}: {formatCurrency(property.monthlyRent, property.currency || "EUR")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default memo(PropertyCard);
