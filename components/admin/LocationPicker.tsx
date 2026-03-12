"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

interface LocationPickerProps {
    value: { lat: string; lng: string };
    onChange: (coords: { lat: string; lng: string }) => void;
}

// Varsayılan Merkez (Alanya)
const defaultCenter: [number, number] = [36.54375, 31.99982];

// Nominatim geocoding (OpenStreetMap - ücretsiz, API key gerektirmez)
async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
    try {
        // Adresi temizle ve optimize et
        const cleanAddress = address
            .replace(/\/Antalya/g, "") // "/Antalya" kısmını kaldır
            .replace(/Alanya\/Antalya/g, "Alanya") // "Alanya/Antalya" -> "Alanya"
            .trim();

        console.log("🔍 Nominatim sorgusu:", cleanAddress);
        
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanAddress)}&limit=1&countrycodes=tr`,
            {
                headers: {
                    "User-Agent": "TSR Emlak Web App (contact@tsrgroupalanya.com)",
                    "Accept-Language": "tr,en",
                },
            }
        );

        if (!response.ok) {
            console.error("❌ Nominatim HTTP hatası:", response.status, response.statusText);
            return null;
        }

        const data = await response.json();
        console.log("📍 Nominatim yanıtı:", data);
        
        if (data && data.length > 0) {
            const result = {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
            };
            console.log("✅ Koordinat bulundu:", result);
            return result;
        }
        
        console.warn("⚠️ Nominatim sonuç bulamadı");
        return null;
    } catch (error) {
        console.error("❌ Geocoding hatası:", error);
        return null;
    }
}

export default function LocationPicker({ value, onChange }: LocationPickerProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [modulesLoaded, setModulesLoaded] = useState(false);
    const [leafletModules, setLeafletModules] = useState<any>(null);
    const mapRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        // Leaflet CSS yükle
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        if (!document.querySelector(`link[href="${link.href}"]`)) {
            document.head.appendChild(link);
        }

        // Leaflet modüllerini yükle
        const loadLeafletModules = async () => {
            try {
                console.log("🔄 Leaflet modülleri yükleniyor...");
                const reactLeafletModule = await import("react-leaflet");
                const leafletModule = await import("leaflet");

                console.log("✅ Leaflet modülleri yüklendi");

                // Leaflet default icon sorununu düzelt
                if (leafletModule.Icon && leafletModule.Icon.Default) {
                    delete (leafletModule.Icon.Default.prototype as any)._getIconUrl;
                    leafletModule.Icon.Default.mergeOptions({
                        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
                        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
                        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
                    });
                }

                const modules = {
                    MapContainer: reactLeafletModule.MapContainer,
                    TileLayer: reactLeafletModule.TileLayer,
                    Marker: reactLeafletModule.Marker,
                    Popup: reactLeafletModule.Popup,
                    useMap: reactLeafletModule.useMap,
                    useMapEvents: reactLeafletModule.useMapEvents,
                    Icon: leafletModule.Icon,
                };

                console.log("📦 Modüller set ediliyor:", Object.keys(modules));
                setLeafletModules(modules);
                setModulesLoaded(true);
                setIsMounted(true);
                console.log("✅ Harita hazır!");
            } catch (err) {
                console.error("❌ Leaflet modülleri yüklenirken hata:", err);
            }
        };

        loadLeafletModules();
    }, []);

    const center = useMemo<[number, number]>(() => {
        if (value.lat && value.lng) {
            return [parseFloat(value.lat), parseFloat(value.lng)];
        }
        return defaultCenter;
    }, [value]);

    // Map instance wrapper - tıklama event'i için
    function MapClickHandler({ onMapReady, onMapClick, modules }: { onMapReady: (map: any) => void; onMapClick: (e: any) => void; modules: any }) {
        if (!modules || typeof modules.useMap !== 'function' || typeof modules.useMapEvents !== 'function') return null;

        const MapClickHandlerInner = () => {
            try {
                const map = modules.useMap();
                modules.useMapEvents({
                    click: onMapClick,
                });
                useEffect(() => {
                    if (map) {
                        onMapReady(map);
                    }
                }, [map, onMapReady]);
                return null;
            } catch (error) {
                console.error("MapClickHandler hatası:", error);
                return null;
            }
        };

        return <MapClickHandlerInner />;
    }

    const handleMapClick = useCallback((e: any) => {
        if (e.latlng) {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;
            onChange({ lat: lat.toString(), lng: lng.toString() });
        }
    }, [onChange]);

    if (!isMounted || !modulesLoaded || !leafletModules) {
        return (
            <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center rounded-lg border">
                <div className="flex flex-col items-center gap-2 text-gray-500">
                    <MapPin className="h-8 w-8 animate-bounce" />
                    <span>Harita yükleniyor...</span>
                </div>
            </div>
        );
    }

    const { MapContainer, TileLayer, Marker, Popup } = leafletModules;

    return (
        <div className="space-y-2">
            <div className="bg-blue-50 text-blue-800 text-xs p-2 rounded border border-blue-100 mb-2">
                <p>Haritada konumu işaretlemek için tıklayın.</p>
            </div>
            <div className="border rounded-lg overflow-hidden shadow-sm" style={{ height: "400px" }}>
                <MapContainer
                    center={center}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                    scrollWheelZoom={true}
                >
                    <MapClickHandler 
                        modules={leafletModules}
                        onMapReady={(map) => {
                            mapRef.current = map;
                        }}
                        onMapClick={handleMapClick}
                    />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* Seçili Konum Marker'ı */}
                    {value.lat && value.lng && (
                        <Marker
                            position={[parseFloat(value.lat), parseFloat(value.lng)]}
                        >
                            <Popup>
                                <div className="text-sm">
                                    <strong>Seçili Konum</strong>
                                    <br />
                                    Enlem: {value.lat}
                                    <br />
                                    Boylam: {value.lng}
                                </div>
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>
            <div className="flex gap-4 text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                <span>Enlem: {value.lat || '-'}</span>
                <span>Boylam: {value.lng || '-'}</span>
            </div>
        </div>
    );
}

// Export geocode fonksiyonu - admin sayfasında kullanılacak
export { geocodeAddress };
