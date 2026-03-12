"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { MapPin, Bed, Bath, Square, Phone, Mail, Share2, ChevronLeft, ChevronRight, X, Send, User, MessageSquare, Home, Building, Car, Wifi, TreePine, Shield, Sparkles, Calendar, Clock, AlertCircle, Bookmark, BookmarkCheck } from "lucide-react";
import SocialShare from "@/components/SocialShare";
import FavoriteButton from "@/components/FavoriteButton";
import { usePropertyTranslation } from "@/lib/usePropertyTranslation";
import { useCurrency } from "@/contexts/CurrencyContext";

// Lazy load MapView - Leaflet (client-side only)
const MapView = dynamic(() => import("@/components/MapView"), {
    ssr: false,
    loading: () => <div className="h-96 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center"><p className="text-gray-500">Harita yükleniyor...</p></div>
});

interface PropertyDetailClientProps {
    property: any;
    similarProperties: any[];
}

export default function PropertyDetailClient({ property, similarProperties }: PropertyDetailClientProps) {
    const propertyId = property.id;
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const { formatCurrency, exchangeRates, currency: globalCurrency } = useCurrency();
    const [selectedCurrency, setSelectedCurrency] = useState<'EUR' | 'USD' | 'RUB' | 'TRY' | 'GBP'>('EUR');
    const [isSaved, setIsSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    });
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Swipe logic
    const touchStart = useRef(0);
    const touchEnd = useRef(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchEnd.current = 0;
        touchStart.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEnd.current = e.targetTouches[0].clientX;
    };

    const getProxiedImageUrl = useCallback((url: string, width?: number, format: string = "webp") => {
        if (!url || url.includes("/api/image-proxy") || url.startsWith("data:") || !url.startsWith("http")) return url;
        const idMatch = url.match(/[?&]id=([^&]+)/) || url.match(/\/d\/([^/]+)/);
        return idMatch ? `/api/image-proxy?id=${idMatch[1]}${width ? `&w=${width}` : ''}${format ? `&format=${format}` : ''}` : url;
    }, []);

    const propertyImages = useMemo(() => {
        const raw = [property.image, ...(property.additionalImages || property.images || [])].filter(Boolean);
        // Use larger size for main gallery images, WebP for compression
        return Array.from(new Set(raw)).map(url => getProxiedImageUrl(url as string, 1920, "webp"));
    }, [property, getProxiedImageUrl]);

    // Separate thumbnails with smaller size
    const thumbnailImages = useMemo(() => {
        const raw = [property.image, ...(property.additionalImages || property.images || [])].filter(Boolean);
        // 150px width for thumbnails
        return Array.from(new Set(raw)).map(url => getProxiedImageUrl(url as string, 150, "webp"));
    }, [property, getProxiedImageUrl]);

    const handlePrevImage = useCallback(() => {
        setSelectedImageIndex((prev) => (prev - 1 + propertyImages.length) % propertyImages.length);
    }, [propertyImages?.length]);

    const handleNextImage = useCallback(() => {
        setSelectedImageIndex((prev) => (prev + 1) % propertyImages.length);
    }, [propertyImages?.length]);

    const handleTouchEnd = () => {
        if (!touchStart.current || !touchEnd.current) return;
        const distance = touchStart.current - touchEnd.current;
        if (distance > 50) handleNextImage();
        if (distance < -50) handlePrevImage();
    };

    useEffect(() => {
        if (globalCurrency) setSelectedCurrency(globalCurrency as any);
    }, [globalCurrency]);

    const formatPrice = (price: number, targetCurrency: string, fromCurrency: string = "EUR") => {
        if (!exchangeRates) return price.toLocaleString();
        const rateFrom = (exchangeRates as any)[fromCurrency] || 1;
        const amountInEur = fromCurrency === "EUR" ? price : price / rateFrom;
        const rateTo = (exchangeRates as any)[targetCurrency] || 1;
        const converted = targetCurrency === "EUR" ? amountInEur : amountInEur * rateTo;
        const symbols: any = { EUR: '€', USD: '$', RUB: '₽', TRY: '₺', GBP: '£' };
        const symbol = symbols[targetCurrency] || '$';
        const formatted = converted.toLocaleString('tr-TR', { maximumFractionDigits: 0 });
        return targetCurrency === 'RUB' || targetCurrency === 'TRY' ? `${formatted} ${symbol}` : `${symbol} ${formatted}`;
    };

    useEffect(() => {
        const savedProperties = JSON.parse(localStorage.getItem("favorites") || "[]");
        setIsSaved(savedProperties.includes(propertyId));
    }, [propertyId]);

    const handleSaveToggle = async () => {
        setSaving(true);
        try {
            const savedProperties = JSON.parse(localStorage.getItem("favorites") || "[]");
            const newSaved = isSaved ? savedProperties.filter((id: string) => id !== propertyId) : [...savedProperties, propertyId];
            localStorage.setItem("favorites", JSON.stringify(newSaved));
            setIsSaved(!isSaved);
        } finally {
            setSaving(false);
        }
    };

    const translations = usePropertyTranslation(property);
    const title = translations?.title || property?.title || '';
    const description = translations?.description || property?.description || '';
    const location = translations?.location || property?.location || '';

    const handleSubmitRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) return;
        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, propertyId, propertyTitle: title, propertyLocation: location })
            });
            if (res.ok) {
                setFormSubmitted(true);
                setTimeout(() => setFormSubmitted(false), 3000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Lightbox Modal */}
            {isLightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setIsLightboxOpen(false)}>
                    <button className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"><X className="h-8 w-8" /></button>
                    {propertyImages.length > 1 && (
                        <>
                            <button onClick={(e) => { e.stopPropagation(); handlePrevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full"><ChevronLeft className="h-8 w-8" /></button>
                            <button onClick={(e) => { e.stopPropagation(); handleNextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full"><ChevronRight className="h-8 w-8" /></button>
                        </>
                    )}
                    <div className="relative max-w-7xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
                        <Image src={propertyImages[selectedImageIndex]} alt={title} fill className="object-contain" sizes="90vw" priority quality={90} />
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Header */}
                    <div className="space-y-4">
                        <nav className="text-sm text-gray-200">
                            <Link href="/" className="hover:text-white">Ana Sayfa</Link> / <Link href="/emlak" className="hover:text-white">Emlak</Link> / {title}
                        </nav>
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <div className="flex items-center text-gray-200"><MapPin className="h-4 w-4 mr-2" /><span>{location}</span></div>

                        <div className="flex flex-wrap gap-3">
                            <SocialShare url={`/emlak/${property.id}`} title={title} description={location} />
                            <FavoriteButton propertyId={property.id} className="!bg-white/10" />
                        </div>
                    </div>

                    {/* Gallery */}
                    <div className="space-y-4">
                        {propertyImages.length > 0 && (
                            <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden border border-white/10 group cursor-pointer" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                                <Image src={propertyImages[selectedImageIndex]} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" onClick={() => setIsLightboxOpen(true)} priority sizes="(max-width: 1024px) 100vw, 66vw" />
                                {propertyImages.length > 1 && (
                                    <>
                                        <button onClick={(e) => { e.stopPropagation(); handlePrevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeft className="h-6 w-6" /></button>
                                        <button onClick={(e) => { e.stopPropagation(); handleNextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight className="h-6 w-6" /></button>
                                        <div className="absolute bottom-4 right-4 bg-black/50 px-4 py-1 rounded-full text-xs font-bold">{selectedImageIndex + 1} / {propertyImages.length}</div>
                                    </>
                                )}
                            </div>
                        )}
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            {thumbnailImages.map((img, index) => (
                                <button key={index} onClick={() => setSelectedImageIndex(index)} className={`relative h-20 w-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${selectedImageIndex === index ? 'border-white scale-105' : 'border-transparent opacity-60'}`}>
                                    <Image src={img} alt="thumb" fill className="object-cover" sizes="80px" loading="lazy" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="bg-white rounded-2xl p-8 text-gray-900 shadow-xl space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-red-500 inline-block">Detaylar</h2>
                            <div className="flex flex-wrap gap-3">
                                <DetailTag icon={<Bed />} label={`${property.rooms} Oda`} />
                                <DetailTag icon={<Bath />} label={`${property.bathrooms} Banyo`} />
                                <DetailTag icon={<Square />} label={`${property.area} m²`} />
                                <DetailTag icon={<Home />} label={property.type === 'rent' ? 'Kiralık' : 'Satılık'} />
                                <DetailTag icon={<Building />} label={property.propertyType || "Konut"} />
                            </div>
                        </div>

                        {description && (
                            <div>
                                <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-red-500 inline-block">Açıklama</h2>
                                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{description}</p>
                            </div>
                        )}

                        {property.features && property.features.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-red-500 inline-block">Özellikler</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {property.features.map((feature: string, i: number) => (
                                        <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <Sparkles className="h-5 w-5 text-red-500" />
                                            <span className="font-medium text-gray-800">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-red-500 inline-block">Konum</h2>
                            <div className="h-[400px] rounded-2xl overflow-hidden border border-gray-200">
                                <MapView properties={[{ ...property, title, coordinates: property.coordinates }]} height="100%" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Price Card */}
                    <div className="bg-white rounded-2xl p-8 text-gray-900 shadow-xl border border-gray-100">
                        <div className="flex gap-2 mb-6">
                            {['EUR', 'USD', 'RUB', 'TRY'].map((curr) => (
                                <button key={curr} onClick={() => setSelectedCurrency(curr as any)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${selectedCurrency === curr ? 'bg-gray-900 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{curr}</button>
                            ))}
                        </div>
                        <div className="space-y-1 mb-8">
                            <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">Fiyat</div>
                            <div className="text-4xl font-black text-gray-900">{formatPrice(property.price, selectedCurrency, property.currency)}</div>
                        </div>
                        <div className="space-y-4">
                            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                                <Phone className="h-5 w-5" /> Hemen Ara
                            </button>
                            <button onClick={handleSaveToggle} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 rounded-xl border border-gray-200 transition-all flex items-center justify-center gap-2">
                                {isSaved ? <BookmarkCheck className="h-5 w-5 text-green-600" /> : <Bookmark className="h-5 w-5" />} {isSaved ? "Kaydedildi" : "Favorilere Ekle"}
                            </button>
                        </div>
                    </div>

                    {/* Agent Card */}
                    <div className="bg-white rounded-2xl p-6 text-gray-900 shadow-xl border border-gray-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-16 w-16 bg-gray-900 rounded-full flex items-center justify-center text-white text-2xl font-bold">T</div>
                            <div>
                                <div className="font-bold text-lg">TSR GROUP</div>
                                <div className="text-sm text-gray-500">Mülk Sahibi / Danışman</div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmitRequest} className="space-y-4">
                            <input type="text" placeholder="Adınız" className="w-full bg-gray-50 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                            <input type="tel" placeholder="Telefon" className="w-full bg-gray-50 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                            <textarea placeholder="Mesajınız..." className="w-full bg-gray-50 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none resize-none" rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                            <button type="submit" className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-black transition-colors">Mesaj Gönder</button>
                        </form>
                        {formSubmitted && <p className="text-green-600 text-center mt-4 font-bold">Mesajınız başarıyla gönderildi!</p>}
                    </div>
                </div>
            </div>

            {/* Similar Properties */}
            {similarProperties.length > 0 && (
                <div className="mt-16 space-y-8">
                    <h2 className="text-3xl font-bold">Benzer Yatırım Fırsatları</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {similarProperties.map((p: any) => {
                            const simImageUrl = p.image || (p.images && p.images.length > 0 ? p.images[0] : null) || (p.additionalImages && p.additionalImages.length > 0 ? p.additionalImages[0] : "/placeholder-property.jpg");
                            return (
                                <Link key={p.id} href={`/emlak/${p.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                                    <div className="relative h-48 bg-gray-200">
                                        <Image
                                            src={getProxiedImageUrl(simImageUrl, 400, "webp")}
                                            alt={p.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <div className="text-xl font-bold text-gray-900">{formatPrice(p.price, selectedCurrency, p.currency)}</div>
                                        <div className="text-sm text-gray-500 line-clamp-1">{p.title}</div>
                                        <div className="flex gap-4 text-xs font-bold text-gray-400">
                                            <span>{p.rooms} Oda</span>
                                            <span>{p.area} m²</span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

function DetailTag({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl border border-gray-200">
            <div className="text-red-500 h-4 w-4">{icon}</div>
            <span className="text-sm font-bold text-gray-700">{label}</span>
        </div>
    );
}
