"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  propertyId: number | string;
  className?: string;
}

export default function FavoriteButton({ propertyId, className = "" }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // LocalStorage'dan favorileri yükle
    const favorites = getFavorites();
    setIsFavorite(favorites.includes(propertyId));
  }, [propertyId]);

  const getFavorites = (): (number | string)[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  };

  const router = useRouter();

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Link tıklamasını engelle
    e.stopPropagation(); // Event bubbling engelle

    // Auth kontrolü
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("user_token");
      if (!token) {
        // Giriş yapmamışsa yönlendir
        router.push("/giris");
        return;
      }
    }

    const favorites = getFavorites();

    if (isFavorite) {
      // Favorilerden çıkar
      const updated = favorites.filter((id) => id !== propertyId);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      // Favorilere ekle
      favorites.push(propertyId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isFavorite
        ? "bg-red-500 text-white hover:bg-red-600"
        : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
        } ${className}`}
      aria-label={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
    >
      <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
      <span className="font-medium">Kaydet</span>
    </button>
  );
}












