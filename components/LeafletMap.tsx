import React, { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Navigation, X, Maximize2, Minimize2, Layers, Search } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface CountryData {
  flag: string;
  flagCode?: string;
  name: string;
  nameEn: string;
  minPrice: string;
  maxPrice: string;
  avgRentalYield: string;
  popularCities: string[];
  advantages: string[];
}

interface Property {
  id: number | string;
  title: string;
  location: string;
  price: number;
  area: number;
  rooms: number | string;
  bathrooms: number;
  image?: string;
  type: string;
  propertyType?: string; // Add propertyType field
  verified: boolean;
  coordinates?: { lat: number; lng: number };
  lat?: number;
  lng?: number;
  countryData?: CountryData;
}

interface LeafletMapProps {
  properties: Property[];
  height?: string;
  onCountryClick?: (countryName: string) => void;
}

const defaultCenter: [number, number] = [36.5437, 31.9998]; // Alanya

// Fix Leaflet default icon
const fixLeafletIcon = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });
};

// Map instance wrapper
function MapInstance({ onMapReady }: { onMapReady: (map: L.Map) => void }) {
  const map = useMap();
  useEffect(() => {
    if (map) {
      onMapReady(map);
    }
  }, [map, onMapReady]);
  return null;
}

// Map bounds wrapper
function MapBounds({ bounds }: { bounds: L.LatLngBoundsExpression | null }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && map) {
      try {
        map.fitBounds(bounds as L.LatLngBoundsExpression, { padding: [50, 50] });
      } catch (err) {
        console.error("MapBounds error:", err);
      }
    }
  }, [bounds, map]);
  return null;
}

async function searchLocation(query: string): Promise<{ lat: number; lng: number; display_name: string } | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
      { headers: { "User-Agent": "TSR Emlak Web App" } }
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        display_name: data[0].display_name,
      };
    }
    return null;
  } catch (error) {
    console.error("Search error:", error);
    return null;
  }
}

function getDirectionsUrl(origin: [number, number] | { lat: number; lng: number }, destination: { lat: number; lng: number }): string {
  const originLat = Array.isArray(origin) ? origin[0] : origin.lat;
  const originLng = Array.isArray(origin) ? origin[1] : origin.lng;
  return `https://www.openstreetmap.org/directions?from=${originLat},${originLng}&to=${destination.lat},${destination.lng}`;
}

export default function LeafletMap({ properties, height = "100%", onCountryClick }: LeafletMapProps) {
  const t = useTranslations('analyticsMap');
  const tCommon = useTranslations('common');
  const tCard = useTranslations('propertyCard');
  const tHero = useTranslations('heroVideo');

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(defaultCenter);
  const [mapZoom, setMapZoom] = useState(12);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [mapType, setMapType] = useState<"osm" | "carto" | "satellite">("osm");
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    fixLeafletIcon();
  }, []);

  // Property locations - if properties have coordinates, use them; otherwise use mock
  const propertyLocations = useMemo(() => {
    if (properties.length === 0) return [];

    return properties.map((prop) => {
      const hasCoordinates = prop.coordinates;
      return {
        ...prop, // Tüm property verilerini koru (countryData dahil)
        lat: hasCoordinates
          ? prop.coordinates!.lat
          : defaultCenter[0] + (Math.random() - 0.5) * 0.1,
        lng: hasCoordinates
          ? prop.coordinates!.lng
          : defaultCenter[1] + (Math.random() - 0.5) * 0.1,
      };
    });
  }, [properties]);


  // Calculate map center based on properties
  const calculatedCenter = useMemo(() => {
    if (propertyLocations.length === 0) return defaultCenter;

    const avgLat = propertyLocations.reduce((sum, p) => sum + p.lat, 0) / propertyLocations.length;
    const avgLng = propertyLocations.reduce((sum, p) => sum + p.lng, 0) / propertyLocations.length;

    return [avgLat, avgLng] as [number, number];
  }, [propertyLocations]);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    const result = await searchLocation(searchQuery);

    if (result) {
      setMapCenter([result.lat, result.lng]);
      setMapZoom(15);
    } else {
      alert(tCommon('errorOccurred'));
    }

    setIsSearching(false);
  }, [searchQuery]);

  const handleMarkerClick = useCallback((property: Property) => {
    // Sadece property'yi seç, harita zoom yapma
    setSelectedProperty(property);
    // Harita merkezini ve zoom'u değiştirme - harita yenilenmesin
  }, []);

  const handleGetDirections = useCallback((destination: { lat: number; lng: number }) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const origin = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const url = getDirectionsUrl(origin, destination);
        window.open(url, "_blank");
      },
      () => {
        // Fallback to default location
        const url = getDirectionsUrl(defaultCenter, destination);
        window.open(url, "_blank");
      }
    );
  }, []);



  // Harita boyutunu yeniden hesapla
  const invalidateMapSize = useCallback(() => {
    if (mapRef.current && typeof mapRef.current.invalidateSize === 'function') {
      // Kısa bir gecikme ile harita boyutunu yeniden hesapla
      setTimeout(() => {
        if (mapRef.current) {
          try {
            mapRef.current.invalidateSize();
            // Ekstra güvence için bir daha dene
            setTimeout(() => {
              if (mapRef.current && typeof mapRef.current.invalidateSize === 'function') {
                mapRef.current.invalidateSize();
              }
            }, 200);
          } catch (err) {
            console.error("Invalidate size hatası:", err);
          }
        }
      }, 100);
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    const elem = containerRef.current;

    // Mevcut fullscreen durumunu kontrol et
    const isCurrentlyFullscreen = !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    );

    if (!isCurrentlyFullscreen) {
      // Fullscreen'e geç
      const requestFullscreen =
        elem.requestFullscreen ||
        (elem as any).webkitRequestFullscreen ||
        (elem as any).mozRequestFullScreen ||
        (elem as any).msRequestFullscreen;

      if (requestFullscreen) {
        Promise.resolve(requestFullscreen.call(elem))
          .catch((err) => {
            console.error("Fullscreen hatası:", err);
            // Fallback: CSS ile tam ekran yap
            setIsFullscreen(true);
            document.body.style.overflow = 'hidden';
            setTimeout(() => invalidateMapSize(), 100);
          });
      } else {
        // Fallback: CSS ile tam ekran yap
        setIsFullscreen(true);
        document.body.style.overflow = 'hidden';
        setTimeout(() => invalidateMapSize(), 100);
      }
    } else {
      // Fullscreen'den çık - sadece gerçekten fullscreen modundaysa
      const exitFullscreen =
        document.exitFullscreen ||
        (document as any).webkitExitFullscreen ||
        (document as any).mozCancelFullScreen ||
        (document as any).msExitFullscreen;

      if (exitFullscreen) {
        // Önce fullscreen element kontrolü yap
        const hasFullscreenElement = !!(
          document.fullscreenElement ||
          (document as any).webkitFullscreenElement ||
          (document as any).mozFullScreenElement ||
          (document as any).msFullscreenElement
        );

        if (hasFullscreenElement) {
          Promise.resolve(exitFullscreen.call(document))
            .catch((err) => {
              console.error("Exit fullscreen hatası:", err);
              // Fallback: CSS ile çık
              setIsFullscreen(false);
              document.body.style.overflow = '';
              setTimeout(() => invalidateMapSize(), 100);
            });
        } else {
          // Zaten fullscreen değil, sadece state'i güncelle
          setIsFullscreen(false);
          document.body.style.overflow = '';
          setTimeout(() => invalidateMapSize(), 100);
        }
      } else {
        // Fallback: CSS ile çık
        setIsFullscreen(false);
        document.body.style.overflow = '';
        setTimeout(() => invalidateMapSize(), 100);
      }
    }
  }, [invalidateMapSize]);

  // Fullscreen değişikliklerini dinle
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      if (isCurrentlyFullscreen !== isFullscreen) {
        setIsFullscreen(isCurrentlyFullscreen);
        document.body.style.overflow = isCurrentlyFullscreen ? 'hidden' : '';
        // Boyutu yeniden hesapla - daha uzun bekle
        setTimeout(() => {
          invalidateMapSize();
        }, 300);
        setTimeout(() => {
          invalidateMapSize();
        }, 600);
      }
    };

    // ESC tuşu ile çıkışı dinle
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        document.body.style.overflow = '';
        setTimeout(() => {
          invalidateMapSize();
        }, 100);
        setTimeout(() => {
          invalidateMapSize();
        }, 300);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isFullscreen, invalidateMapSize]);

  // Fullscreen state değiştiğinde harita boyutunu yeniden hesapla
  useEffect(() => {
    if (isFullscreen) {
      // Fullscreen'e geçerken
      setTimeout(() => {
        invalidateMapSize();
      }, 100);
      setTimeout(() => {
        invalidateMapSize();
      }, 300);
      setTimeout(() => {
        invalidateMapSize();
      }, 500);
    } else {
      // Fullscreen'den çıkarken
      setTimeout(() => {
        invalidateMapSize();
      }, 100);
      setTimeout(() => {
        invalidateMapSize();
      }, 300);
    }
  }, [isFullscreen, invalidateMapSize]);

  const toggleMapType = useCallback(() => {
    const types: Array<"osm" | "carto" | "satellite"> = ["osm", "carto", "satellite"];
    const currentIndex = types.indexOf(mapType);
    const nextIndex = (currentIndex + 1) % types.length;
    setMapType(types[nextIndex]);
  }, [mapType]);

  // Tile layer URL'leri
  const getTileLayerUrl = () => {
    switch (mapType) {
      case "carto":
        return "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
      case "satellite":
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      default:
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    }
  };

  const getTileLayerAttribution = () => {
    switch (mapType) {
      case "carto":
        return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
      case "satellite":
        return '&copy; <a href="https://www.esri.com/">Esri</a>';
      default:
        return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    }
  };

  // Özel marker ikonu - Kullanıcı PNG İkonu (Optimize Edilmiş)
  const createCustomIcon = (property: Property) => {
    const { verified, type, propertyType } = property;

    // Debug
    // console.log(`Icon check - Type: "${type}", PropertyType: "${propertyType}"`);

    // Arsa ise özel ikon kullan
    // Check both type (transaction) and propertyType (category) just in case
    const normalizedType = type?.trim().toLowerCase() || "";
    const normalizedPropertyType = propertyType?.trim().toLowerCase() || "";
    const rawPropertyType = (property as any).property_type?.trim().toLowerCase() || ""; // Fallback for snake_case

    // Debug
    // console.log(`Icon check - Type: "${type}", PropertyType: "${propertyType}", Raw: "${(property as any).property_type}"`);

    // Check if it's land/plot based on propertyType OR rawPropertyType
    if (normalizedPropertyType.includes("arsa") || normalizedPropertyType.includes("land") || normalizedPropertyType.includes("plot") || normalizedPropertyType.includes("arazi") ||
      rawPropertyType.includes("arsa") || rawPropertyType.includes("land") || rawPropertyType.includes("plot") || rawPropertyType.includes("arazi")) {
      return new L.Icon({
        iconUrl: "/G46.png",
        iconSize: [33, 50], // ~0.66 aspect ratio (531x800)
        iconAnchor: [16, 50],
        popupAnchor: [0, -50],
        className: verified ? 'verified-marker custom-marker' : 'custom-marker',
      });
    }

    // Varsayılan ev ikonu
    return new L.Icon({
      iconUrl: "/eviconu.png",
      iconSize: [32, 38], // Kompakt boyut
      iconAnchor: [16, 38], // Pin'in alt orta noktası
      popupAnchor: [0, -38],
      className: verified ? 'verified-marker custom-marker' : 'custom-marker',
    });
  };

  // Calculate map bounds based on properties
  const calculatedBounds = useMemo(() => {
    if (propertyLocations.length === 0) return null;

    try {
      const bounds = new L.LatLngBounds(
        [propertyLocations[0].lat, propertyLocations[0].lng],
        [propertyLocations[0].lat, propertyLocations[0].lng]
      );

      propertyLocations.forEach((prop) => {
        bounds.extend([prop.lat, prop.lng]);
      });

      return bounds;
    } catch (err) {
      console.error("Bounds calculation error:", err);
      return null;
    }
  }, [propertyLocations]);



  const mapHeight = isFullscreen ? "100vh" : (height || "100%");

  // Fullscreen durumunda container stilini dinamik olarak ayarla
  const containerStyle: React.CSSProperties = isFullscreen ? {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100vw",
    height: "100vh",
    margin: 0,
    padding: 0,
    zIndex: 99999,
    borderRadius: 0,
  } : {
    height: mapHeight,
    minHeight: "400px",
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-xl overflow-hidden bg-gray-100 ${isFullscreen ? 'fixed inset-0 z-[99999] rounded-none' : ''}`}
      style={containerStyle}
    >
      {/* Search Box */}
      <div className="absolute top-4 left-4 right-4 z-[2000] flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSearch()}
            placeholder={tHero('addressPlaceholder')}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        {/* Map Controls */}
        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="px-4 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
            title={tCommon('search')}
          >
            {isSearching ? "..." : tCommon('search')}
          </button>
          <button
            onClick={toggleMapType}
            className="px-4 py-3 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            title={tCommon('changeMapType')}
          >
            <Layers className="h-5 w-5 text-gray-700" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="px-4 py-3 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
            title={isFullscreen ? tCommon('exitFullScreen') : tCommon('fullScreen')}
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5 text-gray-700" />
            ) : (
              <Maximize2 className="h-5 w-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Leaflet Map */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
        zIndex: 1
      }}>
        <MapContainer
          center={calculatedCenter}
          zoom={propertyLocations.length > 1 ? 3 : mapZoom}
          style={{
            height: "100%",
            width: "100%",
            margin: 0,
            padding: 0
          }}
          scrollWheelZoom={true}
          doubleClickZoom={false}
          className="leaflet-container"
        >
          <MapInstance onMapReady={(map) => {
            mapRef.current = map;
          }} />
          <TileLayer
            url={getTileLayerUrl()}
            attribution={getTileLayerAttribution()}
          />

          <MapBounds bounds={calculatedBounds} />

          {/* Markers */}
          {propertyLocations.map((property) => {
            // Debug: Popup render kontrolü
            if (property.countryData) {
              console.log('🗺️ Popup için ülke verisi:', property.countryData.name, 'FlagCode:', property.countryData.flagCode);
            }
            return (
              <Marker
                key={property.id}
                position={[property.lat, property.lng]}
                icon={createCustomIcon(property)}
                eventHandlers={{
                  click: (e: any) => {
                    // Tek tıklamada hiçbir şey yapma - harita yenilenmesin
                    e.originalEvent?.stopPropagation();
                  },
                  dblclick: (e: any) => {
                    // Çift tıklamada popup aç
                    e.originalEvent?.stopPropagation();
                    const marker = e.target;
                    if (marker && typeof marker.openPopup === 'function') {
                      setTimeout(() => {
                        if (marker && typeof marker.openPopup === 'function') {
                          marker.openPopup();
                        }
                      }, 100);
                    }
                    // Modal açma - sadece popup yeterli
                  },
                  mouseover: () => {
                    // Mouseover'da hiçbir şey yapma
                  },
                  mouseout: () => {
                    // Mouseout'da hiçbir şey yapma
                  },
                }}
              >
                <Popup
                  key={`popup-${property.id}-${property.countryData ? 'country' : 'property'}`}
                  className={property.countryData ? "tsr-popup tsr-popup-country-wrapper" : "tsr-popup"}
                  closeButton={true}
                  autoPan={true}
                  autoPanPaddingTopLeft={[0, 100]} // Arama butonu için üstten boşluk
                  autoPanPaddingBottomRight={[0, 0]}
                >
                  <div className="tsr-popup-content">
                    {property.countryData ? (
                      // Ülke bilgileri popup'ı (Analitik Harita)
                      <div className="tsr-popup-country">
                        <div className="tsr-popup-country-header">
                          <div className="tsr-popup-country-flag">
                            {property.countryData.flagCode ? (
                              <img
                                src={`https://flagcdn.com/w80/${property.countryData.flagCode.toLowerCase()}.png`}
                                alt={property.countryData.name}
                                className="tsr-popup-flag-image"
                                onError={(e) => {
                                  // Eğer görsel yüklenemezse emoji göster
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const fallback = target.nextElementSibling as HTMLElement;
                                  if (fallback) fallback.style.display = 'block';
                                }}
                              />
                            ) : null}
                            <span
                              style={{
                                fontSize: '48px',
                                lineHeight: '1',
                                display: property.countryData.flagCode ? 'none' : 'block',
                                fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, sans-serif'
                              }}
                            >
                              {property.countryData.flag || '🏳️'}
                            </span>
                          </div>
                          <div>
                            <h3 className="tsr-popup-country-name">{property.countryData.name || property.title}</h3>
                            <p className="tsr-popup-country-name-en">{property.countryData.nameEn || ''}</p>
                          </div>
                        </div>
                        <div className="tsr-popup-country-info">
                          <div className="tsr-popup-country-price">
                            <span className="tsr-popup-country-label">{t('priceRange')}:</span>
                            <span className="tsr-popup-country-value">
                              {property.countryData.minPrice} - {property.countryData.maxPrice}
                            </span>
                          </div>
                          <div className="tsr-popup-country-yield">
                            <span className="tsr-popup-country-label">{t('avgRentalYield')}:</span>
                            <span className="tsr-popup-country-yield-value">{property.countryData.avgRentalYield}</span>
                          </div>
                          <div className="tsr-popup-country-cities">
                            <span className="tsr-popup-country-label">{t('popularCities')}:</span>
                            <div className="tsr-popup-country-cities-list">
                              {property.countryData.popularCities.slice(0, 3).map((city, idx) => (
                                <span key={idx} className="tsr-popup-country-city-tag">{city}</span>
                              ))}
                            </div>
                          </div>
                          {property.countryData.advantages && property.countryData.advantages.length > 0 && (
                            <div className="tsr-popup-country-advantages">
                              <span className="tsr-popup-country-label">{t('advantages')}:</span>
                              <ul className="tsr-popup-country-advantages-list">
                                {property.countryData.advantages.slice(0, 3).map((advantage, idx) => (
                                  <li key={idx} className="tsr-popup-country-advantage-item">
                                    <span className="tsr-popup-advantage-icon">✓</span>
                                    <span>{advantage}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      // Normal emlak popup'ı
                      <>
                        {property.image && (
                          <div className="tsr-popup-image">
                            <img
                              src={property.image}
                              alt={property.title}
                              className="w-full h-32 object-cover rounded-t-lg"
                            />
                            {property.verified && (
                              <div className="tsr-popup-verified">
                                <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                {tCommon('verified')}
                              </div>
                            )}
                          </div>
                        )}
                        <div className="tsr-popup-body">
                          <h3 className="tsr-popup-title">{property.title}</h3>
                          <div className="tsr-popup-location">
                            <MapPin className="h-3 w-3" />
                            <span>{property.location}</span>
                          </div>
                          <div className="tsr-popup-price">
                            {new Intl.NumberFormat("tr-TR", {
                              style: "currency",
                              currency: "TRY",
                              maximumFractionDigits: 0,
                            }).format(property.price)}
                          </div>
                          <div className="tsr-popup-features">
                            <span>{property.rooms}+1</span>
                            <span>•</span>
                            <span>{property.bathrooms} {tCard('bathroom')}</span>
                            <span>•</span>
                            <span>{property.area} {tCard('sqm')}</span>
                          </div>
                          <Link
                            href={`/emlak/${property.id}`}
                            className="tsr-popup-link"
                            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
                          >
                            {tCommon('seeDetails')}
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Custom Property Modal */}
      {selectedProperty && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
          onClick={() => setSelectedProperty(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          {/* Modal Content */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 z-10 bg-[#4f271b] hover:bg-[#3d1f15] rounded-full p-2 shadow-lg transition-all hover:scale-110"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            {/* Property Image */}
            {selectedProperty.image && (
              <div className="relative w-full h-56 overflow-hidden rounded-t-2xl">
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
                {selectedProperty.verified && (
                  <div className="absolute top-4 left-4 bg-[#4f271b] text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Doğrulanmış
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                {selectedProperty.title}
              </h3>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{selectedProperty.location}</span>
              </div>

              {/* Price */}
              <div className="text-3xl font-extrabold bg-gradient-to-r from-[#4f271b] to-[#6b3821] bg-clip-text text-transparent mb-5">
                {new Intl.NumberFormat("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                  maximumFractionDigits: 0,
                }).format(selectedProperty.price)}
              </div>

              {/* Features */}
              <div className="flex gap-4 py-4 border-t border-b border-gray-200 mb-5">
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-[#2e3c3a]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="text-sm font-medium">{selectedProperty.rooms}+1</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-[#2e3c3a]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">{selectedProperty.bathrooms} Banyo</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-[#2e3c3a]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span className="text-sm font-medium">{selectedProperty.area} m²</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Link
                  href={`/emlak/${selectedProperty.id}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#4f271b] hover:bg-[#3d1f15] text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
                >
                  <span>Detaylar</span>
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
                <button
                  onClick={() => {
                    const lat = selectedProperty.lat || selectedProperty.coordinates?.lat || defaultCenter[0];
                    const lng = selectedProperty.lng || selectedProperty.coordinates?.lng || defaultCenter[1];
                    handleGetDirections({ lat, lng });
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#4f271b] hover:bg-[#3d1f15] text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Yol Tarifi</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Property Count Badge */}
      {propertyLocations.length > 0 && (
        <div className="absolute bottom-4 left-4 z-[2000] bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] px-4 py-2 rounded-lg shadow-lg border-2 border-white/20">
          <span className="text-sm font-semibold text-white">
            {propertyLocations.length} İlan
          </span>
        </div>
      )}

      {/* Map Type Indicator */}
      <div className="absolute bottom-4 right-4 z-[2000] bg-white px-3 py-2 rounded-lg shadow-lg border-2 border-[#2e3c3a]/10">
        <span className="text-xs font-semibold text-[#2e3c3a]">
          {mapType === "osm" ? "OpenStreetMap" : mapType === "carto" ? "Carto Light" : "Uydu"}
        </span>
      </div>

      {/* Global Popup Styles */}
      <style jsx global>{`
        .leaflet-container {
          height: 100% !important;
          width: 100% !important;
        }
        
        ${isFullscreen ? `
          body {
            overflow: hidden !important;
          }
          .leaflet-container {
            height: 100vh !important;
            width: 100vw !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
          }
        ` : ''}
        
        .tsr-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 0;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .tsr-popup .leaflet-popup-content {
          margin: 0;
          width: 250px !important;
        }

        .tsr-popup-country-wrapper .leaflet-popup-content {
          width: 320px !important;
        }

        .tsr-popup .leaflet-popup-tip {
          background: white;
        }

        .tsr-popup-content {
          font-family: system-ui, -apple-system, sans-serif;
        }

        .tsr-popup-country-wrapper .tsr-popup-content {
          width: 100% !important;
        }

        .tsr-popup-image {
          position: relative;
        }

        .tsr-popup-verified {
          position: absolute;
          top: 8px;
          right: 8px;
          background: #4f271b;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .tsr-popup-body {
          padding: 12px;
          background: white;
        }

        .tsr-popup-title {
          font-size: 14px;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 8px 0;
          line-height: 1.3;
        }

        .tsr-popup-location {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #6b7280;
          font-size: 11px;
          margin-bottom: 8px;
        }

        .tsr-popup-price {
          font-size: 18px;
          font-weight: 800;
          background: linear-gradient(135deg, #4f271b 0%, #6b3821 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
        }

        .tsr-popup-features {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #4b5563;
          font-weight: 500;
          margin-bottom: 10px;
          padding: 8px 0;
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
        }

        .tsr-popup-link {
          display: block;
          width: 100%;
          text-align: center;
          background: #4f271b;
          color: white !important;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .tsr-popup-link:hover {
          background: #3d1f15;
          box-shadow: 0 4px 8px rgba(79, 39, 27, 0.3);
          transform: translateY(-1px);
        }

        /* Ülke Popup Stilleri */
        .tsr-popup-country {
          padding: 16px;
          background: white;
          min-width: 280px;
          width: 100%;
        }

        .tsr-popup-country-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 2px solid #e5e7eb;
        }

        .tsr-popup-country-flag {
          font-size: 48px;
          line-height: 1;
          flex-shrink: 0;
          width: 70px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 4px;
          background: #f9fafb;
          border-radius: 6px;
          overflow: hidden;
        }

        .tsr-popup-flag-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center center;
          border-radius: 4px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          display: block;
          margin: 0 auto;
        }


        .tsr-popup-country-flag span {
          font-family: "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "Twemoji Mozilla", "EmojiOne", sans-serif !important;
          font-size: 48px !important;
          line-height: 1 !important;
          display: block !important;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
        }

        .tsr-popup-country-name {
          font-size: 18px;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 4px 0;
          line-height: 1.2;
        }

        .tsr-popup-country-name-en {
          font-size: 12px;
          color: #6b7280;
          margin: 0;
          font-weight: 500;
        }

        .tsr-popup-country-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .tsr-popup-country-price,
        .tsr-popup-country-yield,
        .tsr-popup-country-cities,
        .tsr-popup-country-advantages {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .tsr-popup-country-label {
          font-size: 11px;
          color: #6b7280;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .tsr-popup-country-value {
          font-size: 16px;
          font-weight: 700;
          color: #1f2937;
        }

        .tsr-popup-country-yield-value {
          font-size: 20px;
          font-weight: 800;
          color: #10b981;
        }

        .tsr-popup-country-cities-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }

        .tsr-popup-country-city-tag {
          font-size: 11px;
          padding: 4px 8px;
          background: #f3f4f6;
          color: #4b5563;
          border-radius: 6px;
          font-weight: 500;
        }

        .tsr-popup-country-advantages-list {
          list-style: none;
          padding: 0;
          margin: 4px 0 0 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .tsr-popup-country-advantage-item {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          font-size: 12px;
          color: #4b5563;
          line-height: 1.4;
        }

        .tsr-popup-advantage-icon {
          color: #10b981;
          font-weight: bold;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Leaflet Popup Close Button - Kahverengi */
        .leaflet-popup-close-button {
          color: #4f271b !important;
          font-size: 24px !important;
          font-weight: bold !important;
          padding: 4px 8px !important;
          width: auto !important;
          height: auto !important;
        }

        .leaflet-popup-close-button:hover {
          color: #3d1f15 !important;
          background: rgba(79, 39, 27, 0.1) !important;
        }

        /* Custom Marker Styling */
        .custom-marker {
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
          transition: all 0.3s ease;
        }

        .custom-marker:hover {
          filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
          transform: scale(1.1);
        }

        .verified-marker {
          filter: drop-shadow(0 4px 8px rgba(74, 222, 128, 0.4));
        }
      `}</style>
    </div>
  );
}
