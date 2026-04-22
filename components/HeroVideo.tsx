"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Play, Pause, Volume2, VolumeX, Search, ChevronDown, Filter, X } from "lucide-react";
import { useTranslations } from 'next-intl';
import { getVideoType, getYouTubeVideoId, getVimeoVideoId, getYouTubeEmbedUrl, getVimeoEmbedUrl } from "@/lib/videoUtils";

interface HeroVideoProps {
  videoUrl?: string;
  forceDirect?: boolean;
  totalPropertiesCount?: number;
}

export default function HeroVideo({ videoUrl, forceDirect = true, totalPropertiesCount: initialCount = 0 }: HeroVideoProps) {
  const t = useTranslations('heroVideo');
  const tCommon = useTranslations('common');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Initialize from props immediately to avoid flicker
  const initialVideoType = videoUrl ? getVideoType(videoUrl) : null;
  const [videoData, setVideoData] = useState<{ url: string; type: "youtube" | "vimeo" | "direct" } | null>(
    videoUrl && initialVideoType ? { url: videoUrl, type: initialVideoType } : null
  );
  const [loading, setLoading] = useState(!videoUrl);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [searchType, setSearchType] = useState<"buy" | "sell" | "rent">("buy");
  const [propertyType, setPropertyType] = useState("");
  const [rooms, setRooms] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [mobileVideoUrl, setMobileVideoUrl] = useState<string | null>(null);

  // Contact form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneCountry, setPhoneCountry] = useState("+90");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [totalProperties, setTotalProperties] = useState<number>(initialCount);
  const [rotatingText, setRotatingText] = useState(0);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Extended filter states for modal
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [propertyIdModal, setPropertyIdModal] = useState("");
  const [furnished, setFurnished] = useState<"furnished" | "unfurnished" | "">("");
  const [residential, setResidential] = useState<"suitable" | "not-suitable" | "">("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [citizenship, setCitizenship] = useState<"suitable" | "not-suitable" | "">("");
  const [distanceToSeaModal, setDistanceToSeaModal] = useState("");

  // Autocomplete states
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allLocations, setAllLocations] = useState<string[]>([]);
  const [allLocationsModal, setAllLocationsModal] = useState<string[]>([]);
  const [showSuggestionsModal, setShowSuggestionsModal] = useState(false);
  const [locationSuggestionsModal, setLocationSuggestionsModal] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Rotating text için interval
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingText((prev) => (prev === 0 ? 1 : 0));
    }, 3000); // 3 saniyede bir değişir

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Eğer videoUrl prop olarak gelmişse, sadece direct video için preload yap
    if (videoUrl) {
      if (!videoData) {
        // Should not happen with new init logic, but safe guard
        const videoType = getVideoType(videoUrl);
        setVideoData({ url: videoUrl, type: videoType });
        setLoading(false);
      }
      return; // Prop varsa API çağrısı yapma!
    }

    // Fallback: Eğer prop yoksa API'den çek (eski davranış)
    const fetchHeroVideo = async () => {
      try {
        const response = await fetch("/api/videos/hero", {
          cache: 'force-cache',
        });

        if (!response.ok) {
          setLoading(false);
          return;
        }

        const data = await response.json();

        if (data && data.url) {
          const videoType = getVideoType(data.url);
          setVideoData({ url: data.url, type: videoType });
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("❌ [HeroVideo] Video yüklenemedi:", error);
        setLoading(false);
      }
    };

    fetchHeroVideo();

    // Mobil kontrolü
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Mobil video URL'sini çek (Eğer API destekliyorsa)
    const fetchMobileVideo = async () => {
      try {
        const response = await fetch("/api/videos/hero-mobile");
        if (response.ok) {
          const data = await response.json();
          if (data && data.url) {
            setMobileVideoUrl(data.url);
          }
        } else {
          // 404 veya başka bir hata - sessizce devam et, normal video kullanılacak
          console.log("Mobil video endpoint mevcut değil, normal video kullanılacak");
        }
      } catch (error) {
        // Hata durumunda sessizce devam et, normal video kullanılacak
        console.log("Mobil video yüklenemedi, normal video kullanılacak:", error);
      }
    };
    fetchMobileVideo();
  }, []);

  // Location suggestions fetch - only locations, better for performance
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/locations");
        if (response.ok) {
          const data = await response.json();
          setAllLocations(data);
        }
      } catch (error) {
        console.error("Konumlar yüklenemedi:", error);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    if (videoRef.current && videoData && videoData.type === "direct") {
      videoRef.current.muted = isMuted;
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play().catch((error) => {
          console.error("Video oynatılamadı:", error);
        });
      }
    }
  }, [isMuted, isPlaying, videoData]);

  // ESC tuşu ile modal kapatma
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFilterModalOpen) {
        setIsFilterModalOpen(false);
      }
    };

    if (isFilterModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isFilterModalOpen]);

  // Location autocomplete için önerileri filtrele (ana arama)
  useEffect(() => {
    if (address.length >= 3) {
      const searchTerm = address.toLowerCase();
      const filtered = allLocations.filter(loc =>
        loc.toLowerCase().includes(searchTerm)
      ).slice(0, 8); // En fazla 8 öneri göster
      setLocationSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setLocationSuggestions([]);
      setShowSuggestions(false);
    }
  }, [address, allLocations]);

  // Location autocomplete için önerileri filtrele (modal)
  const [addressModal, setAddressModal] = useState("");

  useEffect(() => {
    if (addressModal.length >= 3) {
      const searchTerm = addressModal.toLowerCase();
      const filtered = allLocationsModal.filter(loc =>
        loc.toLowerCase().includes(searchTerm)
      ).slice(0, 8); // En fazla 8 öneri göster
      setLocationSuggestionsModal(filtered);
      setShowSuggestionsModal(filtered.length > 0);
    } else {
      setLocationSuggestionsModal([]);
      setShowSuggestionsModal(false);
    }
  }, [addressModal, allLocationsModal]);

  const togglePlay = () => {
    if (videoData?.type === "direct" && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((error) => {
          console.error("Video oynatılamadı:", error);
        });
      }
      setIsPlaying(!isPlaying);
    } else if (videoData?.type === "youtube" && iframeRef.current) {
      // YouTube iframe API kullanarak kontrol et
      const message = isPlaying ? '{"event":"command","func":"pauseVideo","args":""}' : '{"event":"command","func":"playVideo","args":""}';
      iframeRef.current.contentWindow?.postMessage(message, "*");
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoData?.type === "youtube" && iframeRef.current) {
      const message = !isMuted ? '{"event":"command","func":"mute","args":""}' : '{"event":"command","func":"unMute","args":""}';
      iframeRef.current.contentWindow?.postMessage(message, "*");
    }
  };

  const videoSource = isMobile && mobileVideoUrl ? mobileVideoUrl : (videoUrl || videoData?.url || null);
  const videoType = videoSource ? getVideoType(videoSource) : null;
  const youtubeVideoId = videoSource && videoType === "youtube" ? getYouTubeVideoId(videoSource) : null;
  const vimeoVideoId = videoSource && videoType === "vimeo" ? getVimeoVideoId(videoSource) : null;


  return (
    <div className="relative h-screen w-full overflow-hidden z-0">
      {/* Dynamic Gradient Overlay with Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/10 to-black/50 z-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-[#2e3c3a]/20 via-transparent to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black/30_100%)] z-10 pointer-events-none"></div>

      {loading ? (
        <div className="absolute inset-0 bg-gradient-to-br from-[#b7b1ad] via-[#a59d97] to-[#b7b1ad] flex items-center justify-center z-20">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
            </div>
            <div className="text-white text-xl font-semibold">{t('loading')}</div>
          </div>
        </div>
      ) : videoSource ? (
        <>
          {videoType === "youtube" && youtubeVideoId ? (
            <iframe
              ref={iframeRef}
              src={getYouTubeEmbedUrl(youtubeVideoId, isPlaying, isMuted, true)}
              className={`absolute inset-0 w-full h-full transition-transform duration-700 ${isMobile ? 'scale-[4.0] md:scale-110' : 'scale-110'
                }`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ border: "none" }}
              onError={() => {
                console.error("YouTube video yüklenemedi");
              }}
            />
          ) : videoType === "vimeo" && vimeoVideoId ? (
            <iframe
              src={getVimeoEmbedUrl(vimeoVideoId, isPlaying, isMuted, true)}
              className={`absolute inset-0 w-full h-full transition-transform duration-700 ${isMobile ? 'scale-[4.0] md:scale-110' : 'scale-110'
                }`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ border: "none" }}
              onError={() => {
                console.error("Vimeo video yüklenemedi");
              }}
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              className={`absolute inset-0 w-full h-full transition-transform duration-700 ${isMobile
                ? 'object-cover scale-[4.0] md:object-cover md:scale-110'
                : 'object-cover scale-110'
                }`}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={(e) => {
                console.error("Video hatası:", e);
                console.error("Video URL:", videoSource);
              }}
              onLoadedData={() => {
                console.log("Video başarıyla yüklendi:", videoSource);
                setLoading(false);
              }}
              onCanPlay={() => {
                // Video oynatılmaya hazır olduğunda loading'i kapat
                setLoading(false);
              }}
            >
              <source src={videoSource} type="video/mp4" />
              <source src={videoSource} type="video/webm" />
              {t('browserNotSupported')}
            </video>
          )}
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#b7b1ad] via-[#a59d97] to-[#b7b1ad] flex items-center justify-center z-20">
          <div className="text-center px-4">
            <p className="text-white text-lg md:text-xl font-semibold mb-2">
              {t('videoNotAvailable')}
            </p>
            <p className="text-white/80 text-sm md:text-base">
              {t('checkVideoSettings')}
            </p>
          </div>
        </div>
      )}

      {/* Search Form Overlay - Top Center */}
      <div className="absolute top-40 md:top-32 left-1/2 -translate-x-1/2 z-30 w-full max-w-5xl px-4 md:px-6">
        <div className="space-y-4">
          {/* Title */}
          <div className="text-center animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-2xl tracking-tight leading-tight">
              {t('mainTitle')}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white drop-shadow-2xl flex items-center justify-center min-h-[32px] md:min-h-[48px] relative">
              {searchType === "buy" ? (
                <>
                  <span className={`transition-all duration-500 absolute left-1/2 -translate-x-1/2 whitespace-nowrap ${rotatingText === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                    {t('secureManagement')}
                  </span>
                  <span className={`transition-all duration-500 absolute left-1/2 -translate-x-1/2 whitespace-nowrap ${rotatingText === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                    {t('sustainableReturn')}
                  </span>
                </>
              ) : (
                t('leaveContactInfo')
              )}
            </p>
          </div>

          {/* Search Type Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchType("buy")}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold text-white transition-all ${searchType === "buy"
                ? "bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] backdrop-blur-sm"
                : "bg-gradient-to-r from-[#2e3c3a]/60 via-[#3a4d4a]/60 to-[#2e3c3a]/60 backdrop-blur-sm hover:from-[#2e3c3a]/80 hover:via-[#3a4d4a]/80 hover:to-[#2e3c3a]/80"
                }`}
            >
              {t('buy')}
            </button>
            <button
              onClick={() => setSearchType("sell")}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold text-white transition-all ${searchType === "sell"
                ? "bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] backdrop-blur-sm"
                : "bg-gradient-to-r from-[#2e3c3a]/60 via-[#3a4d4a]/60 to-[#2e3c3a]/60 backdrop-blur-sm hover:from-[#2e3c3a]/80 hover:via-[#3a4d4a]/80 hover:to-[#2e3c3a]/80"
                }`}
            >
              {t('sell')}
            </button>
            <button
              onClick={() => setSearchType("rent")}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold text-white transition-all ${searchType === "rent"
                ? "bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] backdrop-blur-sm"
                : "bg-gradient-to-r from-[#2e3c3a]/60 via-[#3a4d4a]/60 to-[#2e3c3a]/60 backdrop-blur-sm hover:from-[#2e3c3a]/80 hover:via-[#3a4d4a]/80 hover:to-[#2e3c3a]/80"
                }`}
            >
              {t('rent')}
            </button>
          </div>

          {/* Search Bar - Only show for "buy" */}
          {searchType === "buy" ? (
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-xl">
              <div className="flex flex-col md:flex-row gap-2">
                {/* Property Type */}
                <div className="flex-1 relative">
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] appearance-none cursor-pointer"
                  >
                    <option value="">{t('propertyType')}</option>
                    {[
                      t('apartment'), t('villa'), t('residence'), t('detached'), "Dubleks", "Tripleks",
                      "Penthouse", "Ticari", t('office'), t('store'), "Depo", t('land'), "Satılık Bina", "İşyeri"
                    ].map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Rooms */}
                <div className="flex-1 relative">
                  <select
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] appearance-none cursor-pointer"
                  >
                    <option value="">{t('rooms')}</option>
                    <option value="0">Studio</option>
                    <option value="1">1+0 / 1+1</option>
                    <option value="2">2+1</option>
                    <option value="3">3+1</option>
                    <option value="4">4+1</option>
                    <option value="5">5+1</option>
                    <option value="6">6+</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Price */}
                <div className="flex-1 relative">
                  <select
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] appearance-none cursor-pointer"
                  >
                    <option value="">{t('price')}</option>
                    <option value="0-50000">$0 - $50,000</option>
                    <option value="50000-100000">$50,000 - $100,000</option>
                    <option value="100000-200000">$100,000 - $200,000</option>
                    <option value="200000+">$200,000+</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Address */}
                <div className="flex-2 relative">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onFocus={() => {
                      if (address.length >= 3 && locationSuggestions.length > 0) {
                        setShowSuggestions(true);
                      }
                    }}
                    onBlur={() => {
                      // Biraz gecikme ile kapat, böylece tıklama işlemi yapılabilir
                      setTimeout(() => setShowSuggestions(false), 200);
                    }}
                    placeholder={t('addressPlaceholder')}
                    className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#2e3c3a]"
                  />
                  <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />

                  {/* Autocomplete Suggestions */}
                  {showSuggestions && locationSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                      {locationSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            setAddress(suggestion);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-gray-100 transition-colors text-sm text-gray-700 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-center gap-2">
                            <Search className="h-3.5 w-3.5 text-gray-400" />
                            <span>{suggestion}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Property ID */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={propertyId}
                    onChange={(e) => setPropertyId(e.target.value)}
                    placeholder={t('propertyId') || 'Property ID'}
                    className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#2e3c3a]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-3">
                <button
                  onClick={() => {
                    setAddressModal(address); // Modal açıldığında mevcut adresi kopyala
                    setIsFilterModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
                >
                  <Filter className="h-4 w-4" />
                  <span>{t('allFilters')}</span>
                </button>
                <Link
                  href={`/emlak?${new URLSearchParams({
                    ...(searchType && { type: searchType === 'buy' ? 'Satılık' : 'Kiralık' }),
                    ...(propertyType && { propertyType }),
                    ...(rooms && { rooms }),
                    ...(price && { price }),
                    ...(address && { location: address }),
                    ...(propertyId && { propertyId }),
                  }).toString()}`}
                  className="text-gray-900 font-bold px-4 sm:px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-xs sm:text-sm"
                  style={{
                    background: 'linear-gradient(to right, #EDC370, #EDC370, #EDC370)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, #E5B85C, #E5B85C, #E5B85C)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, #EDC370, #EDC370, #EDC370)';
                  }}
                >
                  {isMounted && totalProperties > 0
                    ? t('showProperties', { count: totalProperties })
                    : (initialCount > 0 ? t('showProperties', { count: initialCount }) : t('showAllProperties'))
                  }
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Contact Form - For "sell" and "rent" */}
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                <form className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* First Name */}
                    <div>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder={t('firstName')}
                        className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#2e3c3a]"
                        required
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder={t('lastName')}
                        className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#2e3c3a]"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="flex gap-2">
                    <div className="relative w-32">
                      <select
                        value={phoneCountry}
                        onChange={(e) => setPhoneCountry(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] appearance-none cursor-pointer"
                      >
                        <option value="+90">🇹🇷 +90</option>
                        <option value="+7">🇷🇺 +7</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+49">🇩🇪 +49</option>
                        <option value="+33">🇫🇷 +33</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="flex-1">
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder={t('phoneNumber')}
                        className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#2e3c3a]"
                        required
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* Submit Button - Separate, fixed position */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-gray-900 font-bold px-8 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-sm"
                  style={{
                    background: 'linear-gradient(to right, #EDC370, #EDC370, #EDC370)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, #E5B85C, #E5B85C, #E5B85C)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, #EDC370, #EDC370, #EDC370)';
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    // Form submit logic here
                    console.log({ firstName, lastName, phoneCountry, phoneNumber, type: searchType });
                  }}
                >
                  {tCommon('submit')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>



      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-24 bg-black/50 backdrop-blur-sm overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsFilterModalOpen(false);
            }
          }}
        >
          <div className="rounded-xl shadow-2xl w-full max-w-5xl max-h-[calc(100vh-8rem)] flex flex-col overflow-hidden my-4" style={{ background: '#b7b1ad' }}>
            {/* Modal Header */}
            <div className="flex-shrink-0 border-b border-gray-200 px-5 py-3 flex items-center justify-between" style={{ background: '#b7b1ad' }}>
              <h2 className="text-xl font-bold text-gray-900">{t('allFilters')}</h2>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Kapat"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-4 overflow-y-auto flex-1">
              {/* Property Type */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  {t('propertyType')}
                </label>
                <div className="relative">
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] appearance-none cursor-pointer"
                  >
                    <option value="">{t('all')}</option>
                    <option value="daire">{t('apartment')}</option>
                    <option value="villa">{t('villa')}</option>
                    <option value="rezidans">{t('residence')}</option>
                    <option value="müstakil">{t('detached')}</option>
                    <option value="ofis">{t('office')}</option>
                    <option value="dükkan">{t('store')}</option>
                    <option value="arsa">{t('land')}</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Rooms - Button Style */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  {t('rooms')}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: t('studio'), value: "0" },
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                    { label: "4", value: "4" },
                    { label: "5", value: "5" },
                    { label: "6+", value: "6" },
                    { label: t('freeLayout'), value: "free" }
                  ].map((room) => {
                    const isSelected = rooms === room.value;
                    return (
                      <button
                        key={room.value}
                        type="button"
                        onClick={() => setRooms(isSelected ? "" : room.value)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${isSelected
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                          }`}
                      >
                        {room.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bathrooms - Button Style */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  {t('bathrooms')}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: tCommon('no'), value: "0" },
                    { label: "1", value: "1" },
                    { label: "2+", value: "2" }
                  ].map((bath) => {
                    const isSelected = bathrooms === bath.value;
                    return (
                      <button
                        key={bath.value}
                        type="button"
                        onClick={() => setBathrooms(isSelected ? "" : bath.value)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${isSelected
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                          }`}
                      >
                        {bath.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Furnished - Button Style */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  {t('furnished')}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: t('furnished_yes'), value: "furnished" },
                    { label: t('furnished_no'), value: "unfurnished" }
                  ].map((option) => {
                    const isSelected = furnished === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFurnished(isSelected ? "" : option.value as "furnished" | "unfurnished")}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${isSelected
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                          }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Residential - Button Style */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  {t('residency')}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: t('suitable'), value: "suitable" },
                    { label: t('notSuitable'), value: "not-suitable" }
                  ].map((option) => {
                    const isSelected = residential === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setResidential(isSelected ? "" : option.value as "suitable" | "not-suitable")}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${isSelected
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                          }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Amenities - Button Style */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  {t('amenities')}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: t('openPool'), value: "open-pool" },
                    { label: t('closedPool'), value: "closed-pool" },
                    { label: t('openParking'), value: "open-parking" },
                    { label: t('closedParking'), value: "closed-parking" },
                    { label: t('sauna'), value: "sauna" },
                    { label: t('hamam'), value: "hamam" },
                    { label: t('steamRoom'), value: "steam-room" },
                    { label: t('fitness'), value: "fitness" }
                  ].map((option) => {
                    const isSelected = amenities.includes(option.value);
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setAmenities(amenities.filter(a => a !== option.value));
                          } else {
                            setAmenities([...amenities, option.value]);
                          }
                        }}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${isSelected
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                          }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Citizenship - Button Style */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  {t('citizenship')}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: t('citizenshipSuitable'), value: "suitable" },
                    { label: t('citizenshipNotSuitable'), value: "not-suitable" }
                  ].map((option) => {
                    const isSelected = citizenship === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setCitizenship(isSelected ? "" : option.value as "suitable" | "not-suitable")}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${isSelected
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                          }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Denize Uzaklık - Button Style */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  {t('distanceToSea')}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: "0-100m", value: "0-100" },
                    { label: "100-300m", value: "100-300" },
                    { label: "300-500m", value: "300-500" },
                    { label: "500m+", value: "500+" }
                  ].map((option) => {
                    const isSelected = distanceToSeaModal === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setDistanceToSeaModal(isSelected ? "" : option.value)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${isSelected
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                          }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    {t('minPrice')}
                  </label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder={tCommon('min')}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2e3c3a]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    {t('maxPrice')}
                  </label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder={tCommon('max')}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2e3c3a]"
                  />
                </div>
              </div>

              {/* Area Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    {t('minArea')}
                  </label>
                  <input
                    type="number"
                    value={minArea}
                    onChange={(e) => setMinArea(e.target.value)}
                    placeholder={tCommon('min')}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2e3c3a]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    {t('maxArea')}
                  </label>
                  <input
                    type="number"
                    value={maxArea}
                    onChange={(e) => setMaxArea(e.target.value)}
                    placeholder={tCommon('max')}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2e3c3a]"
                  />
                </div>
              </div>


              {/* Price Quick Select */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  {t('priceQuickSelect')}
                </label>
                <div className="relative">
                  <select
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] appearance-none cursor-pointer"
                  >
                    <option value="">{t('selectPrice')}</option>
                    <option value="0-50000">$0 - $50,000</option>
                    <option value="50000-100000">$50,000 - $100,000</option>
                    <option value="100000-200000">$100,000 - $200,000</option>
                    <option value="200000-500000">$200,000 - $500,000</option>
                    <option value="500000+">$500,000+</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Property ID -Modal */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  İlan ID
                </label>
                <input
                  type="text"
                  value={propertyIdModal}
                  onChange={(e) => setPropertyIdModal(e.target.value)}
                  placeholder="İlan ID ile ara"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2e3c3a]"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  {t('addressOrComplex')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={addressModal}
                    onChange={(e) => {
                      setAddressModal(e.target.value);
                      setAddress(e.target.value); // Ana state'i de güncelle
                    }}
                    onFocus={() => {
                      if (addressModal.length >= 3 && locationSuggestionsModal.length > 0) {
                        setShowSuggestionsModal(true);
                      }
                    }}
                    onBlur={() => {
                      // Biraz gecikme ile kapat, böylece tıklama işlemi yapılabilir
                      setTimeout(() => setShowSuggestionsModal(false), 200);
                    }}
                    placeholder={t('addressModalPlaceholder')}
                    className="w-full px-3 py-2 pr-10 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2e3c3a]"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />

                  {/* Autocomplete Suggestions Modal */}
                  {showSuggestionsModal && locationSuggestionsModal.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
                      {locationSuggestionsModal.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            setAddressModal(suggestion);
                            setAddress(suggestion); // Ana state'i de güncelle
                            setShowSuggestionsModal(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors text-sm text-gray-700 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-center gap-2">
                            <Search className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{suggestion}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex-shrink-0 border-t border-gray-200 px-5 py-3 flex items-center justify-between gap-4" style={{ background: '#b7b1ad' }}>
              <button
                onClick={() => {
                  setPropertyType("");
                  setRooms("");
                  setPrice("");
                  setAddress("");
                  setAddressModal("");
                  setPropertyId("");
                  setPropertyIdModal("");
                  setMinPrice("");
                  setMaxPrice("");
                  setMinArea("");
                  setMaxArea("");
                  setBathrooms("");
                  setFurnished("");
                  setResidential("");
                  setAmenities([]);
                  setCitizenship("");
                  setDistanceToSeaModal("");
                  setShowSuggestions(false);
                  setShowSuggestionsModal(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                <X className="h-4 w-4" />
                <span>{t('clearAll')}</span>
              </button>
              <Link
                href={`/emlak?${new URLSearchParams({
                  ...(propertyType && { propertyType }),
                  ...(rooms && { rooms }),
                  ...(price && { price }),
                  ...(addressModal && { address: addressModal }),
                  ...(propertyIdModal && { propertyId: propertyIdModal }),
                  ...(minPrice && { minPrice }),
                  ...(maxPrice && { maxPrice }),
                  ...(minArea && { minArea }),
                  ...(maxArea && { maxArea }),
                  ...(bathrooms && { bathrooms }),
                  ...(furnished && { furnished }),
                  ...(residential && { residential }),
                  ...(distanceToSeaModal && { distanceToSea: distanceToSeaModal }),
                }).toString()}`}
                onClick={() => {
                  setAddress(addressModal); // Modal'daki adresi ana state'e kopyala
                  setPropertyId(propertyIdModal); // Modal'daki property ID'yi kopyala
                  setIsFilterModalOpen(false);
                }}
                className="text-gray-900 font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-sm"
                style={{
                  background: 'linear-gradient(to right, #EDC370, #EDC370, #EDC370)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, #E5B85C, #E5B85C, #E5B85C)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, #EDC370, #EDC370, #EDC370)';
                }}
              >
                {totalProperties > 0 ? t('showProperties', { count: totalProperties }) : t('showAllProperties')}
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
