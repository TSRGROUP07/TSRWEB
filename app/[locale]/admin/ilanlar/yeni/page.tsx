"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Upload, MapPin, Home, Building2, Info, Image as ImageIcon, Video, Globe, User, Cloud } from "lucide-react";
import Image from "next/image";
import GoogleDriveFilePicker from "@/components/GoogleDriveFilePicker";
import LocationPicker, { geocodeAddress as geocodeAddressOSM } from "@/components/admin/LocationPicker";
type TabType = "basic" | "details" | "location" | "media" | "settings";

const propertyTypes = [
  "Daire",
  "Villa",
  "Rezidans",
  "Müstakil Ev",
  "Dubleks",
  "Tripleks",
  "Penthouse",
  "Ticari",
  "Ofis",
  "Mağaza",
  "Depo",
  "Arsa",
  "Satılık Bina",
  "İşyeri",
];

const kitchenTypes = [
  "Amerika Mutfağı",
  "Kapalı Mutfak",
  "Ayrı Mutfak",
];

const buildingTypes = [
  "Apartman",
  "Villa",
  "Rezidans",
  "Site",
  "Müstakil",
  "Plaza",
  "AVM",
];

const heatingTypes = [
  "Kombi",
  "Merkezi Sistem",
  "Soba",
  "Yerden Isıtma",
  "Klima",
  "Isıtma Yok",
];

const directions = [
  "Güney",
  "Kuzey",
  "Doğu",
  "Batı",
  "Güneydoğu",
  "Güneybatı",
  "Kuzeydoğu",
  "Kuzeybatı",
  "Her Yöne",
];

const usageStatuses = [
  "Sıfır",
  "İkinci El",
  "Yapım Aşamasında",
  "Yakında Teslim",
];

const propertyStatuses = [
  "Aktif",
  "Pasif",
  "Satıldı",
  "Kiralandı",
  "Beklemede",
];

export default function YeniIlanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("basic");
  const [formData, setFormData] = useState({
    // Temel Bilgiler
    title: "",
    propertyType: "Daire",
    buildingType: "Apartman",
    type: "Satılık",
    price: "",
    currency: "EUR", // Varsayılan EURO
    monthlyRent: "",
    deposit: "",

    // Detaylı Bilgiler
    area: "",
    netArea: "",
    rooms: "",
    bathrooms: "",
    wcCount: "", // WC Sayısı
    floor: "",
    totalFloors: "",
    buildingAge: "",
    usageStatus: "Sıfır",
    // Ek Özellikler
    heatingType: "Kombi",
    direction: "",
    balconyCount: "",
    parkingCount: "",
    hasElevator: false,
    hasSecurity: false,
    isInSite: false,
    isSuitableForCredit: false,
    isPriority: false,
    // Bina Özellikleri
    kitchenType: "", // Mutfak Tipi (Amerika Mutfağı / Kapalı Mutfak / Ayrı Mutfak)
    monthlyFee: "", // Aidat Miktarı
    hasParentBathroom: false, // Ebeveyn Banyosu
    // Villa/Arsa Özellikleri
    landArea: "", // Arsa Alanı (Villa için)
    emsal: "", // Emsal (Arsa için)
    label: "", // İlan Etiketi (Kampanya vb.)

    // Yeni Eklenen Özellikler
    isOpportunity: false, // Fırsat Daire
    isRentalGuaranteed: false, // Kira Garantili
    citizenshipSuitable: false, // Vatandaşlığa Uygun
    residencePermitSuitable: false, // İkamete Uygun
    furnishedStatus: "Boş", // Eşyalı/Eşyasız Durumu
    hasGenerator: false, // Jeneratör
    hasCamera: false,    // Kamera
    hasCamellia: false,  // Kamelya
    distanceToSea: "", // Denize Uzaklık (m)
    viewTypes: [] as string[], // Deniz, Doğa, Şehir
    hasSeaView: false, // Deniz Manzarası

    // Olanaklar (Checkboxlar)
    amenities: {
      pool: false,
      indoorPool: false,
      sauna: false,
      steamRoom: false,
      fitness: false,
      parking: false,
      indoorParking: false,
      underfloorHeating: false,
      cinema: false,
      playground: false,
      turkishBath: false,
      massageRoom: false,
    },

    // Lokasyon
    location: "",
    district: "",
    neighborhood: "",
    address: "",
    coordinates: { lat: "", lng: "" } as { lat: string; lng: string },
    googleMapsUrl: "",

    // Analiz ve Skorlar
    investmentScore: "", // 0-100
    investmentRating: "Orta", // Düşük, Orta, İyi, Mükemmel

    // Fiyat Analizi
    priceAnalysis: {
      annualReturn: "", // +1.8%
      unitPriceChange: "", // -13%
      valuePrediction: "", // -22%
      rentalIncomeChange: "", // +8%
    },

    // Bölge Analizi
    marketingAnalysis: {
      neighborhoodScore: "",
      districtScore: "",
      cityScore: "",
    },

    // Konum Analizi
    locationAnalysis: {
      transport: false,
      schools: false,
      health: false,
      green: false,
      sports: false,
      entertainment: false,
    },

    // Yapısal Durum
    structuralAnalysis: {
      mainScore: "", // Yapısal Skor
      ageScore: "",
      amenitiesScore: "",
      areaScore: "",
      usageScore: "",
    },

    // Demografi
    demographics: {
      marriedRatio: "", // %50
      youthRatio: "", // %38
      educationRatio: "", // %19
      origin: "", // Çankırı (%28)
      political: "", // AK Parti (%54)
      electionDistrict: "",
      electionWinner: "",
      electionPercentage: "",
    },

    // Yakın Yerler
    nearbyPlaces: [] as { name: string; distance: number; icon: string }[],

    // Açıklama ve Özellikler
    description: "",
    features: [] as string[],

    // Medya
    images: [] as string[],
    videoUrl: "",
    virtualTourUrl: "",

    // Ayarlar
    propertyStatus: "Aktif",
    listingNumber: "",
    listingDate: new Date().toISOString().split("T")[0],
    listingEndDate: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    notes: "",

    // Danışman Bilgileri
    agentName: "",
    agentPhoto: "",
    agentPhone: "",

    // Cover Photo
    coverImage: "",
  });

  const [newFeature, setNewFeature] = useState("");
  // exchangeRates: EUR bazlı kurlar (1 EUR = X currency)
  const [exchangeRates, setExchangeRates] = useState({ USD: 1.1, EUR: 1, GBP: 0.85, TRY: 36.5 }); // Varsayılan (EUR bazlı)

  // Para birimi çevirici
  useEffect(() => {
    // Gerçek kur verisi çekme
    const fetchRates = async () => {
      try {
        // EUR bazlı kurları çek
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
        const data = await res.json();
        if (data && data.rates) {
          setExchangeRates({
            USD: data.rates.USD,
            EUR: 1, // Baz
            GBP: data.rates.GBP,
            TRY: data.rates.TRY
          });
          console.log("✅ Güncel kurlar yüklendi:", data.rates);
        }
      } catch (error) {
        console.error("Kur çekme hatası:", error);
        // Hata durumunda fallback (Tahmini)
        setExchangeRates({ USD: 1.05, EUR: 1, GBP: 0.85, TRY: 36.5 });
      }
    };

    fetchRates();
  }, []);

  const calculatePrices = (amount: number, baseCurrency: string) => {
    // exchangeRates: 1 EUR = X currency
    const rates: any = { ...exchangeRates };
    if (!rates.EUR) rates.EUR = 1;

    if (!amount || Number.isNaN(amount)) return {};

    // 1) baseCurrency -> EUR
    // - Eğer base EUR ise amountEur = amount
    // - Eğer base TRY/USD/GBP ise amountEur = amount / rates[base]
    const base = (baseCurrency || "EUR").toUpperCase();
    const baseRate = rates[base];
    const amountEur =
      base === "EUR" ? amount : baseRate ? amount / baseRate : amount; // baseRate yoksa fallback

    // 2) EUR -> hedef para birimleri
    const to = (curr: string) => {
      if (curr === "EUR") return amountEur;
      const r = rates[curr];
      return r ? amountEur * r : amountEur;
    };

    return {
      TRY: to("TRY"),
      USD: to("USD"),
      EUR: to("EUR"),
      GBP: to("GBP"),
    };
  };

  const handlePriceChange = (value: string) => {
    setFormData(prev => ({ ...prev, price: value }));
    // Otomatik çeviri UI'da gösterilecek
  };

  const [newPlace, setNewPlace] = useState({ name: "", distance: 0, icon: "bus" });

  const addNearbyPlace = () => {
    if (newPlace.name && newPlace.distance) {
      setFormData({
        ...formData,
        nearbyPlaces: [...formData.nearbyPlaces, newPlace]
      });
      setNewPlace({ name: "", distance: 0, icon: "bus" });
    }
  };

  const removeNearbyPlace = (index: number) => {
    setFormData({
      ...formData,
      nearbyPlaces: formData.nearbyPlaces.filter((_, i) => i !== index)
    });
  };

  const parseCoordinatesFromUrl = (url: string) => {
    if (!url) return null;

    // 1. @lat,lng formatı (Google Maps Desktop)
    const atMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (atMatch) {
      return { lat: atMatch[1], lng: atMatch[2] };
    }

    // 2. q=lat,lng formatı (Mobile/Search)
    const qMatch = url.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (qMatch) {
      return { lat: qMatch[1], lng: qMatch[2] };
    }

    // 3. ll=lat,lng formatı
    const llMatch = url.match(/[?&]ll=(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (llMatch) {
      return { lat: llMatch[1], lng: llMatch[2] };
    }

    // 3.5 query=lat,lng / destination=lat,lng gibi formatlar
    const queryMatch = url.match(/[?&](query|destination|daddr|saddr)=(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (queryMatch) {
      return { lat: queryMatch[2], lng: queryMatch[3] };
    }

    // 4. pb=!...!3dLAT!4dLNG formatı (Embed/Long URL) - ÖNCE BUNU KONTROL ET (daha spesifik)
    const pbLatMatch = url.match(/!3d(-?\d+\.\d+)/);
    const pbLngMatch = url.match(/!4d(-?\d+\.\d+)/);
    if (pbLatMatch && pbLngMatch) {
      return { lat: pbLatMatch[1], lng: pbLngMatch[1] };
    }

    // 5. /place/.../@lat,lng,zoom formatı (Yeni Google Maps URL formatı)
    const placeMatch = url.match(/\/place\/[^/]+\/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (placeMatch) {
      return { lat: placeMatch[1], lng: placeMatch[2] };
    }

    return null;
  };

  // OpenStreetMap Nominatim geocoding (ücretsiz, API key gerektirmez)
  const geocodeAddress = async (address: string): Promise<{ lat: string; lng: string } | null> => {
    try {
      console.log("📍 OpenStreetMap ile adres geocode ediliyor:", address);
      const result = await geocodeAddressOSM(address);
      if (result) {
        return { lat: result.lat.toString(), lng: result.lng.toString() };
      }
      return null;
    } catch (error) {
      console.error("❌ Adres geocode edilemedi:", error);
      return null;
    }
  };

  const verifyLocationInfo = async () => {
    const url = formData.googleMapsUrl?.trim();
    if (!url) {
      alert("❌ Lütfen Google Maps linki girin.");
      return;
    }

    // Önce direkt parse dene (URL içinde koordinat varsa)
    let coords = parseCoordinatesFromUrl(url);

    // Kısa link olabilir (maps.app.goo.gl / goo.gl/maps). Redirect çöz ve tekrar dene.
    if (!coords && (url.includes("maps.app.goo.gl") || url.includes("goo.gl/maps"))) {
      try {
        console.log("🔗 Kısa link çözümleniyor:", url);

        // Önce server-side API'yi dene
        try {
          const resp = await fetch(`/api/admin/resolve-url?url=${encodeURIComponent(url)}`, {
            cache: "no-store",
            method: "GET"
          });

          if (resp.ok) {
            const data = await resp.json();
            console.log("✅ Server-side çözümlenen URL:", data.finalUrl);

            if (data?.finalUrl) {
              // 1) Önce final URL'den koordinat dene
              coords = parseCoordinatesFromUrl(data.finalUrl);
              if (coords) {
                setFormData(prev => ({
                  ...prev,
                  googleMapsUrl: data.finalUrl,
                  coordinates: coords as { lat: string; lng: string }
                }));
                alert("✅ Konum başarıyla güncellendi! (Kısa link çözümlendi)");
                return;
              }

              // 2) q=adres parametresini bul ve OpenStreetMap Nominatim ile geocode et
              const addrMatch = data.finalUrl.match(/[?&]q=([^&]+)/);
              if (addrMatch) {
                const decodedAddress = decodeURIComponent(addrMatch[1].replace(/\+/g, " "));
                console.log("📍 OpenStreetMap ile adres geocode ediliyor:", decodedAddress);
                const geo = await geocodeAddress(decodedAddress);
                if (geo) {
                  setFormData(prev => ({
                    ...prev,
                    googleMapsUrl: data.finalUrl,
                    coordinates: geo as { lat: string; lng: string }
                  }));
                  alert("✅ Konum başarıyla güncellendi! (OpenStreetMap üzerinden)");
                  return;
                } else {
                  console.warn("⚠️ Adres geocode edilemedi, kullanıcıya talimat veriliyor");
                }
              }
            }
          }
        } catch (serverError) {
          console.warn("⚠️ Server-side çözümleme hatası:", serverError);
        }

        // Buraya düşersek, kısa link çözülemedi
        alert(
          "❌ Kısa link otomatik çözümlenemedi.\n\n" +
          "Lütfen Google Maps'te konumunuzu açın, 'Paylaş' → 'Bağlantıyı kopyala' ile aldığınız TAM linki (veya haritada 'Burada ne var?' ile koordinat) kullanın\n" +
          "Alternatif olarak haritada konumu fare ile tıklayarak da seçebilirsiniz."
        );
        return;
      } catch (e: any) {
        console.error("❌ Kısa link çözümleme hatası:", e);
        alert(
          "❌ Kısa link çözümlenemedi.\n\n" +
          "Lütfen Google Maps'te 'Paylaş' → 'Bağlantıyı kopyala' ile aldığınız TAM linki (maps.google.com ile başlayan) yapıştırın."
        );
        return;
      }
    }

    if (coords) {
      setFormData(prev => ({
        ...prev,
        coordinates: coords as { lat: string; lng: string }
      }));
      alert("✅ Konum başarıyla güncellendi!");
    } else {
      alert(
        "❌ URL'den konum alınamadı.\n\n" +
        "Lütfen Google Maps'te konumunuzu açın, 'Paylaş' → 'Bağlantıyı kopyala' ile aldığınız TAM linki yapıştırın.\n" +
        "Kısa link (maps.app.goo.gl) yerine tam link (maps.google.com/...) kullanın."
      );
    }
  };
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingAgentPhoto, setUploadingAgentPhoto] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showGoogleDrivePicker, setShowGoogleDrivePicker] = useState(false);
  const [loadingFromDrive, setLoadingFromDrive] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Temel alanlar
    if (!formData.title.trim()) {
      newErrors.title = "Başlık zorunludur";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Başlık en az 3 karakter olmalıdır";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Konum zorunludur";
    } else if (formData.location.trim().length < 3) {
      newErrors.location = "Konum en az 3 karakter olmalıdır";
    }

    if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Geçerli bir fiyat giriniz (0'dan büyük olmalı)";
    }

    if (!formData.area || isNaN(parseFloat(formData.area)) || parseFloat(formData.area) <= 0) {
      newErrors.area = "Geçerli bir metrekare giriniz (0'dan büyük olmalı)";
    }

    if (!formData.rooms || isNaN(parseInt(formData.rooms)) || parseInt(formData.rooms) < 0) {
      newErrors.rooms = "Oda sayısı zorunludur (0 veya daha büyük)";
    }

    // Opsiyonel alanlar için validasyon
    if (formData.netArea && (isNaN(parseFloat(formData.netArea)) || parseFloat(formData.netArea) < 0)) {
      newErrors.netArea = "Net metrekare geçerli bir sayı olmalıdır";
    }

    if (formData.bathrooms && (isNaN(parseInt(formData.bathrooms)) || parseInt(formData.bathrooms) < 0)) {
      newErrors.bathrooms = "Banyo sayısı geçerli bir sayı olmalıdır";
    }

    if (formData.contactEmail && formData.contactEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Geçerli bir e-posta adresi giriniz";
    }

    if (formData.videoUrl && formData.videoUrl.trim() && !formData.videoUrl.match(/^https?:\/\/.+/)) {
      newErrors.videoUrl = "Geçerli bir URL giriniz (http:// veya https:// ile başlamalı)";
    }

    if (formData.virtualTourUrl && formData.virtualTourUrl.trim() && !formData.virtualTourUrl.match(/^https?:\/\/.+/)) {
      newErrors.virtualTourUrl = "Geçerli bir URL giriniz (http:// veya https:// ile başlamalı)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Lütfen tüm zorunlu alanları doldurun");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/admin/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          ...formData,
          // Manual mapping for database columns
          investment_score: formData.investmentScore ? parseInt(formData.investmentScore) : null,
          investment_score_description: formData.investmentRating,
          // JSON Columns
          location_analysis: formData.marketingAnalysis, // Maps marketingAnalysis state to location_analysis JSONB
          price_analysis: formData.priceAnalysis, // Maps priceAnalysis state to price_analysis JSONB

          // Structural Analysis (Flat Columns)
          structural_score: formData.structuralAnalysis?.mainScore ? parseInt(formData.structuralAnalysis.mainScore) : null,
          structural_building_age_impact: formData.structuralAnalysis?.ageScore,
          structural_facilities_impact: formData.structuralAnalysis?.amenitiesScore,
          structural_gross_area_impact: formData.structuralAnalysis?.areaScore,
          structural_usage_status_impact: formData.structuralAnalysis?.usageScore,

          // Demographics (Flat Columns)
          demographics_married_rate: formData.demographics?.marriedRatio ? parseFloat(formData.demographics.marriedRatio) : null,
          demographics_youth_rate: formData.demographics?.youthRatio ? parseFloat(formData.demographics.youthRatio) : null,
          demographics_higher_ed_rate: formData.demographics?.educationRatio ? parseFloat(formData.demographics.educationRatio) : null,
          demographics_election_district: formData.demographics?.electionDistrict,
          demographics_election_party: formData.demographics?.electionWinner,
          demographics_election_percentage: formData.demographics?.electionPercentage ? parseFloat(formData.demographics.electionPercentage) : null,

          // Nearby Places (JSONB)
          nearby_places: formData.nearbyPlaces,

          price: parseFloat(formData.price),
          monthlyRent: formData.monthlyRent ? parseFloat(formData.monthlyRent) : null,
          deposit: formData.deposit ? parseFloat(formData.deposit) : null,
          area: parseFloat(formData.area),
          netArea: formData.netArea ? parseFloat(formData.netArea) : null,
          rooms: parseInt(formData.rooms),
          bathrooms: parseInt(formData.bathrooms) || 0,
          wcCount: formData.wcCount ? parseInt(formData.wcCount) : null,
          floor: formData.floor ? parseInt(formData.floor) : null,
          totalFloors: formData.totalFloors ? parseInt(formData.totalFloors) : null,
          buildingAge: formData.buildingAge ? parseInt(formData.buildingAge) : null,
          balconyCount: formData.balconyCount ? parseInt(formData.balconyCount) : 0,
          parkingCount: formData.parkingCount ? parseInt(formData.parkingCount) : 0,
          kitchenType: formData.kitchenType || null,
          monthlyFee: formData.monthlyFee ? parseFloat(formData.monthlyFee) : null,
          hasParentBathroom: formData.hasParentBathroom,
          landArea: formData.landArea ? parseFloat(formData.landArea) : null,
          emsal: formData.emsal || null,
          coordinates: formData.coordinates.lat && formData.coordinates.lng ? {
            lat: parseFloat(formData.coordinates.lat),
            lng: parseFloat(formData.coordinates.lng),
          } : null,
          cover_image: formData.coverImage || (formData.images.length > 0 ? formData.images[0] : null),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ İlan başarıyla eklendi:", result);
        alert("İlan başarıyla eklendi!");
        router.push("/admin/ilanlar");
      } else {
        const error = await response.json().catch(() => ({ error: "Bilinmeyen hata" }));
        console.error("❌ İlan ekleme hatası:", error);

        // Detaylı hata mesajı göster
        let errorMessage = error.error || "İlan eklenirken hata oluştu";
        if (error.message) {
          errorMessage += "\n\n" + error.message;
        }
        if (error.details && Array.isArray(error.details)) {
          const detailMessages = error.details.map((d: any) =>
            `${d.path?.join('.') || 'Alan'}: ${d.message || 'Geçersiz değer'}`
          ).join('\n');
          if (detailMessages) {
            errorMessage += "\n\nDetaylar:\n" + detailMessages;
          }
        }

        // Google Drive storage quota hatası için özel uyarı
        if (error.message?.includes("storage quota") || error.message?.includes("Service Accounts")) {
          errorMessage =
            "❌ Google Drive Depolama Hatası\n\n" +
            "Service Account'un depolama kotası yok. İlanlar kaydedilemiyor.\n\n" +
            "Çözüm:\n" +
            "1. Google Drive'da bir Shared Drive (Paylaşılan Sürücü) oluşturun\n" +
            "2. Service Account email'ini o Shared Drive'a 'İçerik Yöneticisi' olarak ekleyin\n" +
            "3. SHARED_FOLDER_ID environment değişkenini güncelleyin\n\n" +
            "Detaylı bilgi için admin paneline bakın.";
        }

        alert(errorMessage);
      }
    } catch (error: any) {
      console.error("❌ İlan ekleme exception:", error);
      alert("Bir hata oluştu: " + (error.message || "Bilinmeyen hata"));
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);

    const uploadedUrls: string[] = [];
    const errors: string[] = [];

    // Dinamik import ile compressImage fonksiyonunu al
    const { compressImage } = await import("@/lib/client-image-compression");

    try {
      const token = localStorage.getItem("admin_token");
      const uploadFormData = new FormData();

      // Dosyaları işle ve sıkıştır
      for (let i = 0; i < files.length; i++) {
        try {
          // Kullanıcıya bilgi ver (Console opsiyonel)
          console.log(`Resim işleniyor: ${files[i].name}`);
          const compressedFile = await compressImage(files[i]);
          uploadFormData.append("file", compressedFile);
        } catch (compressError) {
          console.error("Sıkıştırma hatası, orijinal dosya kullanılıyor:", compressError);
          uploadFormData.append("file", files[i]);
        }
      }
      uploadFormData.append("type", "properties");


      const response = await fetch("/api/admin/supabase-upload", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: uploadFormData,
      });

      let data: any;
      try {
        // Önce status kontrolü yap
        if (response.status === 413) {
          throw new Error("Dosya boyutu çok yüksek. Lütfen daha küçük boyutlu resimler yükleyin (Maksimum 4.5MB) veya daha az sayıda resim seçin.");
        }

        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.error("JSON parse hatası, server yanıtı:", text);
          throw new Error(`Sunucu hatası (${response.status}): Beklenmeyen yanıt alındı.`);
        }

        if (!response.ok) {
          throw new Error(data.error || "Yükleme başarısız");
        }

      } catch (error: any) {
        // Eğer yukarıda biz fırlattıysak o mesajı kullan, yoksa genel hata
        if (error.message.includes("Dosya boyutu") || error.message.includes("Sunucu hatası")) {
          throw error;
        }
        throw new Error(data?.error || error.message || "Yükleme başarısız");
      }

      if (data.results) {
        data.results.forEach((res: any) => {
          if (res.success) {
            uploadedUrls.push(res.url);
          } else {
            errors.push(`${res.filename}: ${res.error}`);
          }
        });
      } else if (data.url) {
        uploadedUrls.push(data.url);
      }

    } catch (error: any) {
      console.error("Upload hatası:", error);
      errors.push(error.message || "Yükleme sırasında bir hata oluştu");
    }

    // Başarıyla yüklenen resimleri ekle
    if (uploadedUrls.length > 0) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));

      if (errors.length > 0) {
        alert(`⚠️ ${uploadedUrls.length} resim yüklendi. ${errors.length} resim yüklenemedi:\n\n${errors.join('\n\n')}`);
      }
    } else if (errors.length > 0) {
      alert(`❌ Resimler yüklenirken hata oluştu:\n\n${errors.join('\n\n')}`);
    }

    // Input'u temizle
    e.target.value = '';
    setUploadingImage(false);
  };

  const setCoverImage = (url: string) => {
    setFormData(prev => ({ ...prev, coverImage: url }));
  };

  const removeImage = (index: number) => {
    const imageToRemove = formData.images[index];
    const newImages = formData.images.filter((_, i) => i !== index);

    // Eğer silinen resim kapak fotoğrafıysa ve başka resim varsa, ilkini kapak yap
    let newCoverImage = formData.coverImage;
    if (imageToRemove === formData.coverImage) {
      newCoverImage = newImages.length > 0 ? newImages[0] : "";
    }

    setFormData({
      ...formData,
      images: newImages,
      coverImage: newCoverImage
    });
  };

  const [uploadQueue, setUploadQueue] = useState<any[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());

  const handleGoogleDriveFileSelect = async (file: any) => {
    // Eğer zaten yükleniyorsa veya queue'da varsa, queue'ya ekle
    if (uploadingFiles.has(file.id)) {
      console.log("⚠️ Bu dosya zaten yükleniyor");
      return;
    }

    // Duplicate kontrolü - zaten queue'da var mı?
    const isDuplicateInQueue = uploadQueue.some(q => q.id === file.id);
    if (isDuplicateInQueue) {
      console.log("⚠️ Bu dosya zaten kuyrukta:", file.name);
      return;
    }

    // Duplicate kontrolü - zaten formData.images içinde var mı?
    // URL'lerden fileId'yi çıkar ve karşılaştır
    const isDuplicateInImages = formData.images.some((imageUrl: string) => {
      if (!imageUrl) return false;
      // Proxy URL formatı: /api/image-proxy?id=FILE_ID
      const idMatch = imageUrl.match(/[?&]id=([^&]+)/);
      if (idMatch) {
        return idMatch[1] === file.id;
      }
      // Direkt Drive URL formatı: .../d/FILE_ID/...
      const driveIdMatch = imageUrl.match(/\/d\/([^/]+)/);
      if (driveIdMatch) {
        return driveIdMatch[1] === file.id;
      }
      return false;
    });

    if (isDuplicateInImages) {
      // Duplicate seçimi sessizce yok say (alert spam olmasın)
      console.log("⚠️ Bu dosya zaten listede (atlanıyor):", file.name);
      return;
    }

    // Queue'ya ekle
    setUploadQueue((prev) => [...prev, file]);
    processUploadQueue();
  };

  const processUploadQueue = async () => {
    // Eğer zaten bir dosya yükleniyorsa bekle
    if (uploadingFiles.size > 0) {
      return;
    }

    // Queue'dan ilk dosyayı al
    setUploadQueue((queue) => {
      if (queue.length === 0) return queue;

      const file = queue[0];
      uploadFile(file);

      return queue.slice(1); // İlk dosyayı queue'dan çıkar
    });
  };

  const uploadFile = async (file: any) => {
    setLoadingFromDrive(true);
    setUploadingFiles((prev) => new Set([...prev, file.id]));

    try {
      console.log("📥 Google Drive'dan dosya yükleniyor:", file.name);

      // Server-side upload API'sini kullan
      const response = await fetch("/api/admin/upload-from-drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileId: file.id,
          fileName: file.name,
          mimeType: file.mimeType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Dosya yüklenemedi (${response.status})`);
      }

      const data = await response.json();

      if (!data.url) {
        throw new Error("Dosya URL'si alınamadı");
      }

      console.log("✅ Dosya yüklendi:", data.url);

      // Son duplicate kontrolü - upload sırasında başka bir yerde eklenmiş olabilir
      setFormData((prev) => {
        // URL'den fileId çıkar
        const urlIdMatch = data.url.match(/[?&]id=([^&]+)/) || data.url.match(/\/d\/([^/]+)/);
        const urlFileId = urlIdMatch ? urlIdMatch[1] : null;

        // Zaten listede var mı kontrol et
        const alreadyExists = prev.images.some((imgUrl: string) => {
          if (!imgUrl) return false;
          const existingIdMatch = imgUrl.match(/[?&]id=([^&]+)/) || imgUrl.match(/\/d\/([^/]+)/);
          const existingFileId = existingIdMatch ? existingIdMatch[1] : null;
          return urlFileId && existingFileId && urlFileId === existingFileId;
        });

        if (alreadyExists) {
          console.log("⚠️ Dosya zaten listede, tekrar eklenmiyor:", file.name);
          return prev; // Değişiklik yapma
        }

        // Yeni resmi ekle
        return {
          ...prev,
          images: [...prev.images, data.url],
        };
      });

      // Başarı mesajı: alert spam olmaması için kaldırıldı.
      // Kullanıcı zaten alttaki önizlemede görselin eklendiğini görebilir.
    } catch (error: any) {
      console.error("❌ Google Drive dosya yükleme hatası:", {
        message: error.message,
        file: file.name,
      });

      let userFriendlyMessage = error.message || "Google Drive'dan resim eklenirken hata oluştu";

      if (error.message.includes("CORS")) {
        userFriendlyMessage = "CORS hatası. Lütfen Firebase Storage ayarlarını kontrol edin.";
      } else if (error.message.includes("Storage")) {
        userFriendlyMessage = "Dosya yükleme hatası. Lütfen tekrar deneyin.";
      }

      alert(`❌ Hata (${file.name}): ${userFriendlyMessage}`);
    } finally {
      setUploadingFiles((prev) => {
        const next = new Set(prev);
        next.delete(file.id);
        return next;
      });

      // Queue'da başka dosya varsa işle
      setTimeout(() => {
        setUploadingFiles((current) => {
          if (current.size === 0) {
            setUploadQueue((queue) => {
              if (queue.length > 0) {
                processUploadQueue();
              } else {
                setLoadingFromDrive(false);
              }
              return queue;
            });
          }
          return current;
        });
      }, 500);
    }
  };

  // Queue değiştiğinde işle
  useEffect(() => {
    if (uploadQueue.length > 0) {
      const timer = setTimeout(() => {
        setUploadingFiles((current) => {
          if (current.size === 0) {
            processUploadQueue();
          }
          return current;
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [uploadQueue.length]);

  const handleAgentPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAgentPhoto(true);
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("type", "image");

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: uploadFormData,
      });

      const data = await response.json();
      if (response.ok) {
        setFormData({
          ...formData,
          agentPhoto: data.url,
        });
      } else {
        alert("Danışman fotoğrafı yüklenirken hata oluştu");
      }
    } catch (error) {
      alert("Bir hata oluştu");
    } finally {
      setUploadingAgentPhoto(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const tabs = [
    { id: "basic" as TabType, label: "Temel Bilgiler", icon: Home },
    { id: "details" as TabType, label: "Detaylar", icon: Building2 },
    { id: "location" as TabType, label: "Lokasyon", icon: MapPin },
    { id: "media" as TabType, label: "Medya", icon: ImageIcon },
    { id: "settings" as TabType, label: "Ayarlar", icon: Info },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Yeni İlan Ekle</h1>
            <p className="text-gray-600 mt-1">Detaylı emlak ilanı oluşturun</p>
          </div>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap"
          >
            <X className="h-5 w-5" />
            <span>İptal</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex border-b overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-colors whitespace-nowrap ${activeTab === tab.id
                  ? "border-b-2 border-primary-600 text-primary-600"
                  : "text-gray-600 hover:text-primary-600"
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Temel Bilgiler */}
          {activeTab === "basic" && (
            <div className="space-y-6">
              <div className="bg-[#E0F2F1]/30 border-l-4 border-[#189BA3] p-4 rounded-r-lg mb-6">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>🌐 Otomatik Çeviri:</strong> İlanınızı sadece Türkçe olarak girin, sistem otomatik olarak İngilizce ve Rusça çevirilerini oluşturacaktır.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>İpucu:</strong> Zorunlu alanlar (*) ile işaretlenmiştir. Danışman bilgileri ilan kartında görünecektir.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İlan Başlığı <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.title ? "border-red-500" : "border-gray-300"
                      }`}
                    placeholder="Örn: Deniz Manzaralı 3+1 Daire"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emlak Tipi <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.propertyType}
                    onChange={(e) =>
                      setFormData({ ...formData, propertyType: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bina Tipi <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.buildingType}
                    onChange={(e) =>
                      setFormData({ ...formData, buildingType: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {buildingTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İlan Tipi <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Satılık">Satılık</option>
                    <option value="Kiralık">Kiralık</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Eşya Durumu
                  </label>
                  <select
                    value={formData.furnishedStatus || "Boş"}
                    onChange={(e) =>
                      setFormData({ ...formData, furnishedStatus: e.target.value as any })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Eşyalı">Eşyalı</option>
                    <option value="Eşyasız">Eşyasız</option>
                    <option value="Kısmen Eşyalı">Kısmen Eşyalı</option>
                    <option value="Boş">Boş</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formData.type === "Satılık" ? "Satış Fiyatı" : "Aylık Kira"} <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handlePriceChange(e.target.value)}
                      className={`flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.price ? "border-red-500" : "border-gray-300"}`}
                      placeholder="0"
                    />
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-r-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="TRY">TRY (₺)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>

                  {/* Otomatik Çeviri Gösterimi */}
                  {formData.price && (
                    <div className="mt-2 text-xs text-gray-500 grid grid-cols-3 gap-2 bg-gray-50 p-2 rounded">
                      {Object.entries(calculatePrices(parseFloat(formData.price), formData.currency)).map(([curr, val]: any) => (
                        curr !== formData.currency && (
                          <div key={curr} className="flex justify-between">
                            <span>{curr}:</span>
                            <span className="font-medium">
                              {new Intl.NumberFormat(curr === 'TRY' ? 'tr-TR' : 'en-US', { style: 'currency', currency: curr }).format(val)}
                            </span>
                          </div>
                        )
                      ))}
                    </div>
                  )}

                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>

                {formData.type === "Kiralık" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Depozito (₺)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.deposit}
                        onChange={(e) =>
                          setFormData({ ...formData, deposit: e.target.value })
                        }
                        className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="0"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kullanım Durumu <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.usageStatus}
                    onChange={(e) =>
                      setFormData({ ...formData, usageStatus: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {usageStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Danışman Bilgileri */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-[#189BA3]" />
                  Danışman Bilgileri
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Danışman Adı
                    </label>
                    <input
                      type="text"
                      value={formData.agentName}
                      onChange={(e) =>
                        setFormData({ ...formData, agentName: e.target.value })
                      }
                      className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#189BA3]"
                      placeholder="Örn: Ahmet Yılmaz"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Danışman Telefonu
                    </label>
                    <input
                      type="tel"
                      value={formData.agentPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, agentPhone: e.target.value })
                      }
                      className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#189BA3]"
                      placeholder="Örn: +90 555 123 4567"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Danışman Fotoğrafı
                    </label>
                    <div className="flex items-center space-x-4">
                      {formData.agentPhoto && (
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#189BA3]">
                          <Image
                            src={formData.agentPhoto}
                            alt="Danışman"
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                      )}
                      <label className="flex-1 cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAgentPhotoUpload}
                          className="hidden"
                        />
                        <div className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#189BA3] transition-colors text-center">
                          <span className="text-sm text-gray-600">
                            {formData.agentPhoto ? "Fotoğrafı Değiştir" : "Fotoğraf Yükle"}
                          </span>
                        </div>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Danışman fotoğrafı ilan kartında görünecektir
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Detaylar */}
          {activeTab === "details" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brüt Metrekare (m²) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.area}
                    onChange={(e) =>
                      setFormData({ ...formData, area: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.area ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {errors.area && (
                    <p className="text-red-500 text-sm mt-1">{errors.area}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Net Metrekare (m²)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.netArea}
                    onChange={(e) =>
                      setFormData({ ...formData, netArea: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Oda Sayısı *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.rooms}
                    onChange={(e) =>
                      setFormData({ ...formData, rooms: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.rooms ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {errors.rooms && (
                    <p className="text-red-500 text-sm mt-1">{errors.rooms}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Banyo Sayısı
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.bathrooms}
                    onChange={(e) =>
                      setFormData({ ...formData, bathrooms: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WC Sayısı
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.wcCount}
                    onChange={(e) =>
                      setFormData({ ...formData, wcCount: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="WC sayısı"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mutfak Tipi
                  </label>
                  <select
                    value={formData.kitchenType}
                    onChange={(e) =>
                      setFormData({ ...formData, kitchenType: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Seçiniz</option>
                    {kitchenTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aidat Miktarı (TL/Ay)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.monthlyFee}
                    onChange={(e) =>
                      setFormData({ ...formData, monthlyFee: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Aylık aidat miktarı"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasParentBathroom"
                    checked={formData.hasParentBathroom}
                    onChange={(e) =>
                      setFormData({ ...formData, hasParentBathroom: e.target.checked })
                    }
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="hasParentBathroom" className="ml-2 text-sm font-medium text-gray-700">
                    Ebeveyn Banyosu
                  </label>
                </div>

                {/* Etiket Seçimi (Kampanya) */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İlan Etiketi (Opsiyonel)
                  </label>
                  <div className="relative">
                    <select
                      value={formData.label || ""}
                      onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#189BA3] focus:border-transparent outline-none transition-all appearance-none"
                    >
                      <option value="">Etiket Yok</option>
                      <option value="HAZIR DAİREYE 12 AY TAKSİT">HAZIR DAİREYE 12 AY TAKSİT</option>
                      <option value="12 AY TAKSİT">12 AY TAKSİT</option>
                      <option value="24 AY TAKSİT">24 AY TAKSİT</option>
                      <option value="36 AY TAKSİT">36 AY TAKSİT</option>
                      <option value="48 AY TAKSİT">48 AY TAKSİT</option>
                      <option value="60 AY TAKSİT">60 AY TAKSİT</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">İlan kartında görünecek özel etiket.</p>
                </div>

                {/* Villa için Arsa Alanı */}
                {formData.propertyType === "Villa" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Arsa Alanı (m²)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.landArea}
                      onChange={(e) =>
                        setFormData({ ...formData, landArea: e.target.value })
                      }
                      className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Arsa metrekare"
                    />
                  </div>
                )}

                {/* Arsa için Emsal */}
                {formData.propertyType === "Arsa" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emsal
                    </label>
                    <input
                      type="text"
                      value={formData.emsal}
                      onChange={(e) =>
                        setFormData({ ...formData, emsal: e.target.value })
                      }
                      className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Örn: 0.5, 1.0, 2.0"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bulunduğu Kat
                  </label>
                  <input
                    type="number"
                    value={formData.floor}
                    onChange={(e) =>
                      setFormData({ ...formData, floor: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Örn: 3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Toplam Kat Sayısı
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.totalFloors}
                    onChange={(e) =>
                      setFormData({ ...formData, totalFloors: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bina Yaşı
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.buildingAge}
                    onChange={(e) =>
                      setFormData({ ...formData, buildingAge: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Yıl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Isıtma Tipi
                  </label>
                  <select
                    value={formData.heatingType}
                    onChange={(e) =>
                      setFormData({ ...formData, heatingType: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {heatingTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yön
                  </label>
                  <select
                    value={formData.direction}
                    onChange={(e) =>
                      setFormData({ ...formData, direction: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Seçiniz</option>
                    {directions.map((dir) => (
                      <option key={dir} value={dir}>
                        {dir}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Balkon Sayısı
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.balconyCount}
                    onChange={(e) =>
                      setFormData({ ...formData, balconyCount: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Otopark Sayısı
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.parkingCount}
                    onChange={(e) =>
                      setFormData({ ...formData, parkingCount: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-6">
                <h3 className="font-semibold text-gray-700 border-b pb-2">Özellikler ve Olanaklar</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 bg-green-50 border-green-200">
                    <input
                      type="checkbox"
                      checked={formData.isOpportunity}
                      onChange={(e) => setFormData({ ...formData, isOpportunity: e.target.checked })}
                      className="rounded text-green-600 focus:ring-green-500 h-5 w-5"
                    />
                    <span className="text-sm font-medium text-green-800">Fırsat Daire (Ana Sayfada Göster)</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 border-blue-200 bg-blue-50">
                    <input
                      type="checkbox"
                      checked={formData.isRentalGuaranteed}
                      onChange={(e) => setFormData({ ...formData, isRentalGuaranteed: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-blue-500 h-5 w-5"
                    />
                    <span className="text-sm font-medium text-blue-800">Kira Garantili</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.citizenshipSuitable}
                      onChange={(e) => setFormData({ ...formData, citizenshipSuitable: e.target.checked })}
                      className="rounded text-primary-600 focus:ring-primary-500 h-5 w-5"
                    />
                    <span className="text-sm text-gray-700">Vatandaşlığa Uygun</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.residencePermitSuitable}
                      onChange={(e) => setFormData({ ...formData, residencePermitSuitable: e.target.checked })}
                      className="rounded text-primary-600 focus:ring-primary-500 h-5 w-5"
                    />
                    <span className="text-sm text-gray-700">İkamete Uygun</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 border-sky-200 bg-sky-50">
                    <input
                      type="checkbox"
                      checked={formData.hasSeaView}
                      onChange={(e) => setFormData({ ...formData, hasSeaView: e.target.checked })}
                      className="rounded text-sky-600 focus:ring-sky-500 h-5 w-5"
                    />
                    <span className="text-sm font-medium text-sky-800">🌊 Deniz Manzarası</span>
                  </label>
                </div>

                <h4 className="font-medium text-gray-700 mt-4">Bina ve Site Olanakları</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { key: 'hasElevator', label: 'Asansör' },
                    { key: 'hasSecurity', label: 'Güvenlik / Bekçi' },
                    { key: 'isInSite', label: 'Site İçinde' },
                    { key: 'isSuitableForCredit', label: 'Krediye Uygun' },
                    { key: 'hasGenerator', label: 'Jeneratör' },
                    { key: 'hasCamera', label: 'Kamera Sistemi' },
                    { key: 'hasCamellia', label: 'Kamelya / Çardak' },
                    { key: 'pool', label: 'Açık Havuz', isAmenity: true },
                    { key: 'indoorPool', label: 'Kapalı Havuz', isAmenity: true },
                    { key: 'sauna', label: 'Sauna', isAmenity: true },
                    { key: 'steamRoom', label: 'Buhar Odası', isAmenity: true },
                    { key: 'fitness', label: 'Fitness / Spor Salonu', isAmenity: true },
                    { key: 'parking', label: 'Açık Otopark', isAmenity: true },
                    { key: 'indoorParking', label: 'Kapalı Otopark', isAmenity: true },
                    { key: 'underfloorHeating', label: 'Yerden Isıtma', isAmenity: true },
                    { key: 'cinema', label: 'Sinema Odası', isAmenity: true },
                    { key: 'playground', label: 'Çocuk Parkı', isAmenity: true },
                    { key: 'turkishBath', label: 'Hamam', isAmenity: true },
                    { key: 'massageRoom', label: 'Masaj Odası', isAmenity: true },
                  ].map((item: any) => (
                    <label key={item.key} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.isAmenity ? (formData.amenities as any)[item.key] : (formData as any)[item.key]}
                        onChange={(e) => {
                          if (item.isAmenity) {
                            setFormData({ ...formData, amenities: { ...formData.amenities, [item.key]: e.target.checked } });
                          } else {
                            setFormData({ ...formData, [item.key]: e.target.checked });
                          }
                        }}
                        className="rounded text-primary-600 focus:ring-primary-500 h-5 w-5"
                      />
                      <span className="text-sm text-gray-700">{item.label}</span>
                    </label>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Denize Uzaklık</label>
                    <input
                      type="text"
                      value={formData.distanceToSea}
                      onChange={(e) => setFormData({ ...formData, distanceToSea: e.target.value })}
                      className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg"
                      placeholder="Örn: 500m, 1km, Denize Sıfır"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Manzara Seçenekleri</label>
                    <div className="flex gap-4 flex-wrap">
                      {['Deniz', 'Doğa', 'Şehir', 'Dağ', 'Havuz'].map(view => (
                        <label key={view} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.viewTypes.includes(view)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({ ...formData, viewTypes: [...formData.viewTypes, view] });
                              } else {
                                setFormData({ ...formData, viewTypes: formData.viewTypes.filter(v => v !== view) });
                              }
                            }}
                            className="rounded text-primary-600 h-4 w-4"
                          />
                          <span className="text-sm">{view}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açıklama
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={8}
                  className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Emlak hakkında detaylı açıklama yazın..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Özellikler
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                    placeholder="Özellik ekle (örn: Balkon, Asansör, Güvenlik)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Ekle
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm flex items-center space-x-2"
                    >
                      <span>{feature}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-primary-600 hover:text-primary-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Lokasyon */}
          {activeTab === "location" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konum (İl/İlçe) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.location ? "border-red-500" : "border-gray-300"
                      }`}
                    placeholder="Örn: İstanbul, Kadıköy"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İlçe
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) =>
                      setFormData({ ...formData, district: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="İlçe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mahalle
                  </label>
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) =>
                      setFormData({ ...formData, neighborhood: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Mahalle"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adres
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Detaylı adres bilgisi"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Harita Konumu (İsteğe Bağlı)
                  </label>
                  <LocationPicker
                    value={formData.coordinates}
                    onChange={(coords) => setFormData({ ...formData, coordinates: coords })}
                  />
                </div>



                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Maps URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={formData.googleMapsUrl}
                      onChange={(e) => {
                        setFormData({ ...formData, googleMapsUrl: e.target.value });
                        // URL yapıştırıldığında otomatik dene
                        const coords = parseCoordinatesFromUrl(e.target.value);
                        if (coords) {
                          setFormData(prev => ({ ...prev, googleMapsUrl: e.target.value, coordinates: coords }));
                        }
                      }}
                      className="flex-1 px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="https://maps.google.com/..."
                    />
                    <button
                      type="button"
                      onClick={verifyLocationInfo}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                      Konumu Doğrula
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Google Maps linkini yapıştırdığınızda harita otomatik güncellenir.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Medya */}
          {activeTab === "media" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resimler
                </label>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        multiple
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className={`cursor-pointer inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${uploadingImage
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gray-100 hover:bg-gray-200"
                          }`}
                      >
                        <Upload className="h-5 w-5" />
                        <span>{uploadingImage ? "Yükleniyor..." : "Bilgisayardan Yükle (Çoklu Seçim)"}</span>
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        Birden fazla fotoğraf seçebilirsiniz
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowGoogleDrivePicker(!showGoogleDrivePicker)}
                      className="flex-1 border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:bg-blue-50 transition-colors"
                    >
                      <div className="inline-flex items-center space-x-2 px-4 py-2">
                        <Cloud className="h-5 w-5 text-blue-600" />
                        <span className="text-blue-600 font-medium">
                          {showGoogleDrivePicker ? "Google Drive'ı Gizle" : "Google Drive'dan Seç"}
                        </span>
                      </div>
                    </button>
                  </div>

                  {showGoogleDrivePicker && (
                    <div className="mt-4">
                      {loadingFromDrive && (
                        <div className="mb-4 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
                          <div className="flex items-center justify-center space-x-3">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            <p className="text-blue-800 font-medium">Google Drive'dan resim yükleniyor, lütfen bekleyin...</p>
                          </div>
                        </div>
                      )}
                      <div className={loadingFromDrive ? "opacity-50 pointer-events-none" : ""}>
                        <GoogleDriveFilePicker
                          onFileSelect={handleGoogleDriveFileSelect}
                          acceptedTypes={["image/jpeg", "image/png", "image/webp", "image/gif"]}
                        />
                      </div>
                    </div>
                  )}
                </div>
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Resim ${index + 1}`}
                          className={`w-full h-32 object-cover rounded-lg ${formData.coverImage === image ? 'ring-4 ring-primary-500' : ''}`}
                        />
                        {/* Cover Image Badge */}
                        {formData.coverImage === image && (
                          <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full shadow-md z-10">
                            Kapak
                          </div>
                        )}

                        {/* Actions Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                          {formData.coverImage !== image && (
                            <button
                              type="button"
                              onClick={() => setCoverImage(image)}
                              className="px-3 py-1 bg-white text-primary-600 rounded-full text-xs font-medium hover:bg-gray-100"
                            >
                              Kapak Yap
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video URL (YouTube, Vimeo veya direkt link)
                </label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, videoUrl: e.target.value })
                  }
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.videoUrl ? "border-red-500" : "border-gray-300"
                    }`}
                  placeholder="https://www.youtube.com/watch?v=... veya https://..."
                />
                {errors.videoUrl && (
                  <p className="text-red-500 text-sm mt-1">{errors.videoUrl}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  3D Sanal Tur URL
                </label>
                <input
                  type="url"
                  value={formData.virtualTourUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, virtualTourUrl: e.target.value })
                  }
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.virtualTourUrl ? "border-red-500" : "border-gray-300"
                    }`}
                  placeholder="https://..."
                />
                {errors.virtualTourUrl && (
                  <p className="text-red-500 text-sm mt-1">{errors.virtualTourUrl}</p>
                )}
              </div>
            </div>
          )}


          {/* Ayarlar */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İlan Durumu *
                  </label>
                  <select
                    required
                    value={formData.propertyStatus}
                    onChange={(e) =>
                      setFormData({ ...formData, propertyStatus: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {propertyStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İlan Numarası
                  </label>
                  <input
                    type="text"
                    value={formData.listingNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, listingNumber: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Örn: IL-2025-001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İlan Tarihi *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.listingDate}
                    onChange={(e) =>
                      setFormData({ ...formData, listingDate: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İlan Bitiş Tarihi
                  </label>
                  <input
                    type="date"
                    value={formData.listingEndDate}
                    onChange={(e) =>
                      setFormData({ ...formData, listingEndDate: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İletişim Adı
                  </label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) =>
                      setFormData({ ...formData, contactName: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="İletişim kişisi adı"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İletişim Telefonu
                  </label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPhone: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="+90 555 123 45 67"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İletişim E-posta
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, contactEmail: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.contactEmail ? "border-red-500" : "border-gray-300"
                      }`}
                    placeholder="email@example.com"
                  />
                  {errors.contactEmail && (
                    <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>
                  )}
                </div>


                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notlar
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="İlan hakkında özel notlar..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-between items-center pt-6 border-t">
            <div className="text-sm text-gray-500">
              * Zorunlu alanlar
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                <span>{loading ? "Kaydediliyor..." : "İlanı Kaydet"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
