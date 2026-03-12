"use client";

import { useState, useEffect } from "react";
import { MapPin, Star, Phone, Globe, Clock, Building2 } from "lucide-react";

interface NearbyPlace {
  konum: number;
  başlık: string;
  gps_koordinatları: {
    enlem: number;
    boylam: number;
  };
  değerlendirme?: number;
  yorumlar?: number;
  tip: string;
  adres: string;
  telefon?: string;
  web_sitesi?: string;
  açık_durum?: string;
  küçük_resim?: string;
}

interface NearbyPlacesProps {
  location: { lat: number; lng: number };
  propertyId?: number;
}

export default function NearbyPlaces({ location, propertyId }: NearbyPlacesProps) {
  const [surroundings, setSurroundings] = useState<Record<string, NearbyPlace[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurroundings = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/nearby-places?lat=${location.lat}&lng=${location.lng}&type=surroundings`
        );

        if (!response.ok) {
          throw new Error("Veri yüklenemedi");
        }

        const data = await response.json();
        setSurroundings(data);
      } catch (err) {
        setError("Çevre bilgileri yüklenirken hata oluştu");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurroundings();
  }, [location]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600 text-sm">{error}</p>
        <p className="text-xs text-gray-600 mt-2">
          SERPAPI_KEY environment değişkenini kontrol edin.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
        {Object.entries(surroundings).map(([category, places]) => (
          <div key={category}>
            <h4 className="font-bold text-xl mb-4 text-gray-900 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-[#2e3c3a] to-[#3a4d4a] rounded-full"></span>
              {category}
            </h4>
            {places.length === 0 ? (
              <p className="text-gray-600 text-sm italic">Bu kategoride sonuç bulunamadı</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {places.map((place) => (
                  <div
                    key={place.konum}
                    className="border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 hover:border-[#2e3c3a] hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900 mb-1">
                          {place.başlık}
                        </h5>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                          <span>{place.adres}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          {place.değerlendirme && (
                            <div className="flex items-center text-yellow-500">
                              <Star className="h-4 w-4 mr-1 fill-current" />
                              <span>{place.değerlendirme}</span>
                              {place.yorumlar && (
                                <span className="text-gray-500 ml-1">
                                  ({place.yorumlar})
                                </span>
                              )}
                            </div>
                          )}
                          {place.açık_durum && (
                            <div className="flex items-center text-gray-600">
                              <Clock className="h-4 w-4 mr-1 text-gray-500" />
                              <span className="text-xs">{place.açık_durum}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {place.küçük_resim && (
                        <img
                          src={place.küçük_resim}
                          alt={place.başlık}
                          className="w-20 h-20 object-cover rounded ml-4 border border-gray-200"
                        />
                      )}
                    </div>
                    <div className="flex items-center space-x-4 mt-3 text-sm">
                      {place.telefon && (
                        <a
                          href={`tel:${place.telefon}`}
                          className="flex items-center text-[#2e3c3a] hover:text-[#3a4d4a] transition-colors"
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          <span>{place.telefon}</span>
                        </a>
                      )}
                      {place.web_sitesi && (
                        <a
                          href={place.web_sitesi}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-[#2e3c3a] hover:text-[#3a4d4a] transition-colors"
                        >
                          <Globe className="h-4 w-4 mr-1" />
                          <span>Web Sitesi</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}


















