"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowLeft, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCurrency } from "@/contexts/CurrencyContext";

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  image?: string;
  type: string;
  currency?: any;
}

export default function FavorilerPage() {
  const { formatCurrency } = useCurrency();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      // LocalStorage'dan favori ID'leri al
      const stored = localStorage.getItem("favorites");
      const favoriteIds = stored ? JSON.parse(stored) : [];
      setFavorites(favoriteIds);

      if (favoriteIds.length === 0) {
        setLoading(false);
        return;
      }

      // Tüm ilanları çek ve favori olanları filtrele
      const response = await fetch("/api/properties");
      const allProperties = await response.json();
      const favoriteProperties = allProperties.filter((prop: Property) =>
        favoriteIds.includes(prop.id)
      );
      setProperties(favoriteProperties);
    } catch (error) {
      console.error("Favoriler yüklenemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = (propertyId: number) => {
    const updated = favorites.filter((id) => id !== propertyId);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
    setProperties(properties.filter((prop) => prop.id !== propertyId));
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-[#b7b1ad] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2e3c3a] mx-auto mb-4"></div>
          <p className="text-white/80">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#b7b1ad] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            prefetch={true}
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Ana Sayfaya Dön</span>
          </Link>
          <h1 className="text-4xl font-bold text-[#2e3c3a] flex items-center gap-3">
            <Heart className="h-10 w-10 text-red-500 fill-current" />
            Favori İlanlarım
          </h1>
          <p className="text-white/80 mt-2">
            {properties.length} ilan favorilerinizde
          </p>
        </div>

        {/* Favorites List */}
        {properties.length === 0 ? (
          <div className="bg-[#4f271b]/60 backdrop-blur-md border border-[#2d2825]/30 rounded-xl shadow-lg p-12 text-center">
            <Heart className="h-16 w-16 text-white/40 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">
              Henüz favori ilanınız yok
            </h2>
            <p className="text-white/70 mb-6">
              Beğendiğiniz ilanları favorilerinize ekleyerek daha sonra kolayca bulabilirsiniz.
            </p>
            <Link
              href="/emlak"
              prefetch={true}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              <span>İlanları Görüntüle</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-[#4f271b]/60 backdrop-blur-md border border-[#2d2825]/30 rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:bg-[#4f271b]/70 transition-all"
              >
                <Link href={`/emlak/${property.id}`}>
                  <div className="relative h-64 bg-gray-200">
                    {property.image ? (
                      <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/40">
                        Görsel Yok
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${property.type === "Satılık"
                          ? "bg-green-500 text-white"
                          : "bg-blue-500 text-white"
                          }`}
                      >
                        {property.type}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/emlak/${property.id}`} prefetch={true}>
                    <h3 className="text-xl font-semibold text-white mb-2 hover:text-[#2e3c3a] transition-colors">
                      {property.title}
                    </h3>
                  </Link>
                  <p className="text-white/70 mb-2">{property.location}</p>
                  <p className="text-2xl font-bold text-[#2e3c3a] mb-4">
                    {formatCurrency(property.price, property.currency || "EUR")}
                  </p>
                  <button
                    onClick={() => removeFavorite(property.id)}
                    className="w-full flex items-center justify-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg transition-colors border border-red-500/30"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Favorilerden Çıkar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
