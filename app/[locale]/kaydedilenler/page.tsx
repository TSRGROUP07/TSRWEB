"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Home, MapPin, Square, Bed, Bath, Trash2, BookmarkCheck, Heart } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";

export default function KaydedilenlerPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [savedProperties, setSavedProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user_data");
    if (!userData) {
      router.push("/giris");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      loadSavedProperties(parsedUser.id);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/giris");
    }
  }, [router]);

  const loadSavedProperties = async (userId: string) => {
    try {
      setLoading(true);
      const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]");

      if (favoriteIds.length === 0) {
        setSavedProperties([]);
        return;
      }

      // İlan detaylarını API'den çek
      const response = await fetch("/api/properties");
      if (response.ok) {
        const allProperties = await response.json();
        const saved = allProperties.filter((p: any) => favoriteIds.includes(p.id));
        setSavedProperties(saved);
      }
    } catch (error) {
      console.error("Error loading saved properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (propertyId: string) => {
    if (!confirm("Bu evi kayıtlardan kaldırmak istediğinize emin misiniz?")) {
      return;
    }

    try {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const updated = favorites.filter((id: string) => id !== propertyId);
      localStorage.setItem("favorites", JSON.stringify(updated));

      // Listeden kaldır
      setSavedProperties(savedProperties.filter((p) => p.id !== propertyId));
    } catch (error) {
      console.error("Error removing property:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#b7b1ad] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#b7b1ad] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2e3c3a] to-[#3a4d4a] flex items-center justify-center">
              <BookmarkCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Kaydedilenler</h1>
              <p className="text-white/70 mt-1">
                {savedProperties.length} {savedProperties.length === 1 ? 'ev' : 'ev'} kaydedildi
              </p>
            </div>
          </div>
        </div>

        {/* Kaydedilen Evler */}
        {savedProperties.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-12 text-center">
            <BookmarkCheck className="h-16 w-16 text-white/50 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Henüz kaydedilmiş ev yok</h2>
            <p className="text-white/70 mb-6">
              Beğendiğiniz evleri kaydederek daha sonra kolayca bulabilirsiniz.
            </p>
            <Link
              href="/emlak"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Evlere Göz At
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((savedProperty) => (
              <div
                key={savedProperty.id}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:shadow-xl transition-all group"
              >
                {/* Resim */}
                <Link href={`/emlak/${savedProperty.propertyId}`}>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={savedProperty.image || savedProperty.propertyImage || "/placeholder-property.jpg"}
                      alt={savedProperty.title || savedProperty.propertyTitle || "Emlak"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <BookmarkCheck className="h-3 w-3" />
                      Kaydedildi
                    </div>
                  </div>
                </Link>

                {/* İçerik */}
                <div className="p-5">
                  <Link href={`/emlak/${savedProperty.propertyId || savedProperty.id}`}>
                    <h3 className="text-xl font-bold text-white mb-2 hover:text-white/80 transition-colors line-clamp-2">
                      {savedProperty.title || savedProperty.propertyTitle || "Emlak"}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 text-white/70 mb-4">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{savedProperty.location || savedProperty.propertyLocation || "Konum bilgisi yok"}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-white/70">
                    {savedProperty.propertyArea && (
                      <div className="flex items-center gap-1">
                        <Square className="h-4 w-4" />
                        <span>{savedProperty.propertyArea} m²</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      <span>Oda</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      <span>Banyo</span>
                    </div>
                  </div>

                  {savedProperty.propertyPrice && (
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-[#EDC370] text-[#2e3c3a] text-xl font-extrabold rounded-md shadow-lg transform hover:scale-105 transition-transform">
                        ₺{savedProperty.propertyPrice.toLocaleString('tr-TR')}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Link
                      href={`/emlak/${savedProperty.propertyId || savedProperty.id}`}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white rounded-lg text-center font-semibold hover:shadow-lg transition-all"
                    >
                      Detayları Gör
                    </Link>
                    <button
                      onClick={() => handleRemove(savedProperty.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
                      title="Kayıtlardan kaldır"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  {savedProperty.savedAt && (
                    <div className="mt-3 text-xs text-white/50">
                      Kaydedildi: {new Date(savedProperty.savedAt).toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
