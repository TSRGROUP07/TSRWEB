"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save, X, Upload, MapPin, Home, Building2, Info, Image as ImageIcon, Video, Globe, User, Cloud } from "lucide-react";
import Image from "next/image";
import GoogleDriveFilePicker from "@/components/GoogleDriveFilePicker";
import LocationPicker from "@/components/admin/LocationPicker";

type TabType = "basic" | "details" | "location" | "media" | "settings" | "analysis";

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
  "İşyeri",
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

export default function IlanDuzenlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    isExchangeable: false,
    landArea: "", // Arsa Alanı (Villa için)
    emsal: "", // Emsal (Arsa için)
    label: "", // İlan Etiketi (Kampanya vb.)

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

    // Bina Özellikleri
    wcCount: "", // WC Sayısı
    kitchenType: "", // Mutfak Tipi
    monthlyFee: "", // Aidat Miktarı
    hasParentBathroom: false, // Ebeveyn Banyosu

    // Lokasyon
    location: "",
    district: "",
    neighborhood: "",
    address: "",
    coordinates: { lat: "", lng: "" },
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
      electionDistrict: "",
      electionWinner: "",
      electionPercentage: "",
    },

    // Yakın Yerler
    nearbyPlaces: [] as { name: string; distance: string; type: string }[],

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
  const [exchangeRates, setExchangeRates] = useState({ USD: 30.0, EUR: 32.5, GBP: 38.0, TRY: 38.0 });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingAgentPhoto, setUploadingAgentPhoto] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showGoogleDrivePicker, setShowGoogleDrivePicker] = useState(false);
  const [loadingFromDrive, setLoadingFromDrive] = useState(false);
  const [uploadQueue, setUploadQueue] = useState<any[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
  const [newPlace, setNewPlace] = useState({ name: "", distance: "", type: "Ulaşım" });

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

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/properties/${id}`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert("Oturum süreniz dolmuş olabilir. Lütfen tekrar giriş yapın.");
          router.push("/admin/login");
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log("📥 İlan verisi yüklendi (Edit Page):", data);

      setFormData(prev => ({
        ...prev,
        // Temel
        title: data.title || "",
        propertyType: data.propertyType || "Daire",
        buildingType: data.buildingType || "Apartman",
        type: data.type || "Satılık",
        price: data.price ? data.price.toString() : "",
        currency: data.currency || "EUR",
        monthlyRent: data.monthlyRent ? data.monthlyRent.toString() : "",
        deposit: data.deposit ? data.deposit.toString() : "",

        // Detaylar
        area: data.area ? data.area.toString() : "",
        netArea: data.netArea ? data.netArea.toString() : "",
        rooms: data.rooms ? data.rooms.toString() : "",
        bathrooms: data.bathrooms ? data.bathrooms.toString() : "",
        floor: data.floor ? data.floor.toString() : "",
        totalFloors: data.totalFloors ? data.totalFloors.toString() : "",
        buildingAge: data.buildingAge ? data.buildingAge.toString() : "",
        usageStatus: data.usageStatus || "Sıfır",
        heatingType: data.heatingType || "Kombi",
        direction: data.direction || "",
        balconyCount: data.balconyCount ? data.balconyCount.toString() : "",
        parkingCount: data.parkingCount ? data.parkingCount.toString() : "",

        // Booleans
        hasElevator: data.hasElevator || false,
        hasSecurity: data.hasSecurity || false,
        isInSite: data.isInSite || false,
        isSuitableForCredit: data.isSuitableForCredit || false,
        isPriority: data.isPriority || false,
        isExchangeable: data.isExchangeable || false,

        isOpportunity: data.isOpportunity || false,
        label: data.label || "", // Load label if exists
        isRentalGuaranteed: data.isRentalGuaranteed || false,
        citizenshipSuitable: data.citizenshipSuitable || false,
        residencePermitSuitable: data.residencePermitSuitable || false,
        furnishedStatus: data.furnishedStatus || "Boş",
        hasGenerator: data.hasGenerator || false,
        hasCamera: data.hasCamera || false,
        hasCamellia: data.hasCamellia || false,
        distanceToSea: data.distanceToSea ? data.distanceToSea.toString() : "",
        viewTypes: data.viewTypes || [],
        hasSeaView: data.hasSeaView || false,
        amenities: { ...prev.amenities, ...(data.amenities || {}) },

        // Bina Özellikleri
        wcCount: data.wcCount ? data.wcCount.toString() : "",
        kitchenType: data.kitchenType || "",
        monthlyFee: data.monthlyFee ? data.monthlyFee.toString() : "",
        hasParentBathroom: data.hasParentBathroom || false,

        // Lokasyon
        // Lokasyon
        location: data.location || data.city || "",
        district: data.district || "",
        neighborhood: data.neighborhood || "",
        address: data.address || "",
        coordinates: {
          lat: (data.coordinates?.lat || data.lat || "").toString(),
          lng: (data.coordinates?.lng || data.lng || "").toString(),
        },
        googleMapsUrl: data.googleMapsUrl || "",

        // Medya & Diğer
        description: data.description || "",
        features: data.features || [],
        images: data.images || [],
        videoUrl: data.videoUrl || "",
        virtualTourUrl: data.virtualTourUrl || "",

        // Ayarlar
        propertyStatus: data.propertyStatus || "Aktif",
        listingNumber: data.listingNumber || "",
        listingDate: data.listingDate ? data.listingDate.split("T")[0] : new Date().toISOString().split("T")[0],
        listingEndDate: data.listingEndDate ? data.listingEndDate.split("T")[0] : "",
        contactName: data.contactName || "",
        contactPhone: data.contactPhone || "",
        contactEmail: data.contactEmail || "",
        notes: data.notes || "",

        // Danışman
        agentName: data.agentName || "",
        agentPhoto: data.agentPhoto || "",
        agentPhone: data.agentPhone || "",

        // Complex Objects (If returned)
        investmentScore: data.investmentScore?.toString() || "",
        // FIX: Mapping correction
        investmentRating: data.investmentScoreDescription || data.investmentRating || "Orta",
        priceAnalysis: data.priceAnalysis || prev.priceAnalysis,
        // FIX: Mapping correction (DB: location_analysis -> Camel: locationAnalysis -> Form: marketingAnalysis)
        marketingAnalysis: data.locationAnalysis || data.marketingAnalysis || prev.marketingAnalysis,
        locationAnalysis: data.locationAnalysis || prev.locationAnalysis,
        structuralAnalysis: {
          mainScore: data.structuralScore?.toString() || "",
          ageScore: data.structuralBuildingAgeImpact || "",
          amenitiesScore: data.structuralFacilitiesImpact || "",
          areaScore: data.structuralGrossAreaImpact || "",
          usageScore: data.structuralUsageStatusImpact || "",
        },
        demographics: {
          marriedRatio: data.demographicsMarriedRate?.toString() || "",
          youthRatio: data.demographicsYouthRate?.toString() || "",
          educationRatio: data.demographicsHigherEdRate?.toString() || "",
          electionDistrict: data.demographicsElectionDistrict || "",
          electionWinner: data.demographicsElectionParty || "",
          electionPercentage: data.demographicsElectionPercentage?.toString() || "",
        },
        nearbyPlaces: data.nearbyPlaces || [],

        // Cover Image
        coverImage: data.coverImage || data.cover_image || (data.images && data.images.length > 0 ? data.images[0] : ""),
      }));
    } catch (error) {
      console.error("İlan yüklenemedi:", error);
      alert("İlan bilgileri yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const calculatePrices = (amount: number, baseCurrency: string) => {
    const rates: any = { ...exchangeRates };
    if (!rates.TRY) rates.TRY = 1;

    if (!amount) return {};

    const amountInTry = baseCurrency === "TRY" ? amount : amount * rates[baseCurrency];

    return {
      TRY: amountInTry,
      USD: amountInTry / rates.USD,
      EUR: amountInTry / rates.EUR,
      GBP: amountInTry / rates.GBP
    };
  };

  const handlePriceChange = (value: string) => {
    setFormData(prev => ({ ...prev, price: value }));
  };

  const addNearbyPlace = () => {
    if (newPlace.name && newPlace.distance) {
      setFormData({
        ...formData,
        nearbyPlaces: [...formData.nearbyPlaces, newPlace]
      });
      setNewPlace({ name: "", distance: "", type: "Ulaşım" });
    }
  };

  const removeNearbyPlace = (index: number) => {
    setFormData({
      ...formData,
      nearbyPlaces: formData.nearbyPlaces.filter((_, i) => i !== index)
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Başlık zorunludur";
    if (!formData.location.trim()) newErrors.location = "Konum zorunludur";
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Geçerli bir fiyat giriniz";
    }
    if (!formData.area || parseFloat(formData.area) <= 0) {
      newErrors.area = "Geçerli bir metrekare giriniz";
    }
    if (!formData.rooms || parseInt(formData.rooms) < 0) {
      newErrors.rooms = "Oda sayısı geçersiz";
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

    setSaving(true);

    try {
      const token = localStorage.getItem("admin_token");

      // Create a sanitized payload to avoid sending nested objects that don't exist in DB
      const payload = {
        // ...formData keys that are safe
        title: formData.title,
        propertyType: formData.propertyType,
        buildingType: formData.buildingType,
        type: formData.type,
        currency: formData.currency,
        notes: formData.notes,
        description: formData.description,
        features: formData.features,
        images: formData.images,
        videoUrl: formData.videoUrl,
        virtualTourUrl: formData.virtualTourUrl,

        // Manual mapping for database columns
        investment_score: formData.investmentScore ? parseInt(formData.investmentScore) : null,
        investment_score_description: formData.investmentRating,
        // JSON Columns
        location_analysis: formData.marketingAnalysis,
        price_analysis: formData.priceAnalysis,

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
        floor: formData.floor ? parseInt(formData.floor) : null,
        totalFloors: formData.totalFloors ? parseInt(formData.totalFloors) : null,
        buildingAge: formData.buildingAge ? parseInt(formData.buildingAge) : null,
        balconyCount: formData.balconyCount ? parseInt(formData.balconyCount) : 0,
        parkingCount: formData.parkingCount ? parseInt(formData.parkingCount) : 0,

        distanceToSea: formData.distanceToSea ? parseFloat(formData.distanceToSea) : null,

        // Strings/Text
        location: formData.location,
        district: formData.district,
        neighborhood: formData.neighborhood,
        address: formData.address,
        googleMapsUrl: formData.googleMapsUrl,

        // Additional Features
        label: formData.label,
        is_opportunity: formData.isOpportunity,
        is_rental_guaranteed: formData.isRentalGuaranteed,
        citizenship_suitable: formData.citizenshipSuitable,
        residence_permit_suitable: formData.residencePermitSuitable,
        furnished_status: formData.furnishedStatus,
        has_generator: formData.hasGenerator,
        has_camera: formData.hasCamera,
        has_camellia: formData.hasCamellia,
        view_types: formData.viewTypes,

        // Booleans
        hasElevator: formData.hasElevator,
        hasSecurity: formData.hasSecurity,
        isInSite: formData.isInSite,
        isSuitableForCredit: formData.isSuitableForCredit,
        isPriority: formData.isPriority,
        isExchangeable: formData.isExchangeable,

        // Building Details
        wc_count: formData.wcCount ? parseInt(formData.wcCount) : null,
        kitchen_type: formData.kitchenType,
        monthly_fee: formData.monthlyFee ? parseFloat(formData.monthlyFee) : null,
        has_parent_bathroom: formData.hasParentBathroom,
        has_sea_view: formData.hasSeaView,

        // Contact
        contactName: formData.contactName,
        contactPhone: formData.contactPhone,
        contactEmail: formData.contactEmail,

        // Agent
        agentName: formData.agentName,
        agentPhoto: formData.agentPhoto,
        agentPhone: formData.agentPhone,

        cover_image: formData.coverImage || (formData.images.length > 0 ? formData.images[0] : null),

        // Status
        propertyStatus: formData.propertyStatus,
        listingNumber: formData.listingNumber,
        listingDate: formData.listingDate,
        listingEndDate: formData.listingEndDate,
      } as any;

      if (formData.coordinates.lat && formData.coordinates.lng) {
        const lat = parseFloat(formData.coordinates.lat);
        const lng = parseFloat(formData.coordinates.lng);
        if (!isNaN(lat) && !isNaN(lng)) {
          payload.coordinates = { lat, lng };
        }
      }

      const response = await fetch(`/api/admin/properties/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("İlan başarıyla güncellendi!");
        router.push("/admin/ilanlar");
      } else {
        const result = await response.json();
        console.error("Update failed:", result);
        alert(`Hata: ${result.error || result.details || "Güncelleme başarısız"}`);
      }
    } catch (error: any) {
      console.error("Güncelleme hatası:", error);
      alert("Bir hata oluştu: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);

    const uploadedUrls: string[] = [];
    const errors: string[] = [];

    try {
      const token = localStorage.getItem("admin_token");
      const uploadFormData = new FormData();
      for (let i = 0; i < files.length; i++) {
        uploadFormData.append("file", files[i]);
      }
      uploadFormData.append("type", "properties");

      const response = await fetch("/api/admin/supabase-upload", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: uploadFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Yükleme başarısız");
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

  const handleGoogleDriveFileSelect = async (file: any) => {
    if (uploadingFiles.has(file.id)) {
      console.log("⚠️ Bu dosya zaten yükleniyor");
      return;
    }
    setUploadQueue((prev) => [...prev, file]);
  };

  const processUploadQueue = async () => {
    if (uploadingFiles.size > 0) return;

    setUploadQueue((queue) => {
      if (queue.length === 0) return queue;
      const file = queue[0];
      uploadFile(file);
      return queue.slice(1);
    });
  };

  const uploadFile = async (file: any) => {
    setLoadingFromDrive(true);
    setUploadingFiles((prev) => new Set([...prev, file.id]));

    try {
      console.log("📥 Google Drive'dan dosya yükleniyor:", file.name);
      const response = await fetch("/api/admin/upload-from-drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileId: file.id,
          fileName: file.name,
          mimeType: file.mimeType,
        }),
      });

      if (!response.ok) throw new Error("Dosya yüklenemedi");
      const data = await response.json();

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, data.url],
      }));

      if (uploadQueue.length === 0) {
        alert(`✅ "${file.name}" başarıyla eklendi!`);
      }
    } catch (error: any) {
      console.error("Drive upload error", error);
      alert("Google Drive'dan yükleme başarısız oldu.");
    } finally {
      setUploadingFiles((prev) => {
        const next = new Set(prev);
        next.delete(file.id);
        return next;
      });
      setTimeout(() => {
        setUploadingFiles((c) => {
          if (c.size === 0) {
            setUploadQueue((q) => {
              if (q.length > 0) processUploadQueue();
              else setLoadingFromDrive(false);
              return q;
            });
          }
          return c;
        });
      }, 500);
    }
  };

  useEffect(() => {
    if (uploadQueue.length > 0) {
      const timer = setTimeout(() => {
        processUploadQueue();
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
        setFormData({ ...formData, agentPhoto: data.url });
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">İlan bilgileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">İlan Düzenle</h1>
            <p className="text-gray-600 mt-1">İlan bilgilerini güncelleyin</p>
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
                <p className="text-sm text-gray-700">
                  <strong>İpucu:</strong> Zorunlu alanlar (*) ile işaretlenmiştir.
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
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 ${errors.title ? "border-red-500" : "border-gray-300"
                      }`}
                  />
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
                      className={`flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 ${errors.price ? "border-red-500" : "border-gray-300"}`}
                      placeholder="0"
                    />
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-r-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                    >
                      <option value="TRY">TRY (₺)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>

                  {formData.price && (
                    <div className="mt-2 text-xs text-gray-500 grid grid-cols-3 gap-2 bg-gray-50 p-2 rounded">
                      {Object.entries(calculatePrices(parseFloat(formData.price), formData.currency)).map(([curr, val]: any) => (
                        curr !== formData.currency && (
                          <div key={curr} className="flex justify-between">
                            <span>{curr}:</span>
                            <span className="font-medium">
                              {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: curr }).format(val)}
                            </span>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>

                {formData.type === "Kiralık" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Depozito
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.deposit}
                      onChange={(e) =>
                        setFormData({ ...formData, deposit: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kullanım Durumu
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İlan Etiketi (Opsiyonel)
                  </label>
                  <div className="relative">
                    <select
                      value={formData.label || ""}
                      onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#189BA3] focus:border-transparent outline-none transition-all appearance-none text-gray-900"
                    >
                      <option value="">Etiket Yok</option>
                      <option value="HAZIR DAİREYE 12 AY TAKSİT">HAZIR DAİREYE 12 AY TAKSİT</option>
                      <option value="12 AY TAKSİT">12 AY TAKSİT</option>
                      <option value="24 AY TAKSİT">24 AY TAKSİT</option>
                      <option value="36 AY TAKSİT">36AY TAKSİT</option>
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
              </div>
            </div>
          )}

          {/* Detaylar */}
          {activeTab === "details" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Özellikler ve Olanaklar</h3>

              {/* Checkboxlar - Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isOpportunity}
                    onChange={(e) => setFormData({ ...formData, isOpportunity: e.target.checked })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">🔥 Fırsat Daire</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.citizenshipSuitable}
                    onChange={(e) => setFormData({ ...formData, citizenshipSuitable: e.target.checked })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">🇹🇷 Vatandaşlığa Uygun</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.residencePermitSuitable}
                    onChange={(e) => setFormData({ ...formData, residencePermitSuitable: e.target.checked })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">📝 İkamete Uygun</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isRentalGuaranteed}
                    onChange={(e) => setFormData({ ...formData, isRentalGuaranteed: e.target.checked })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">💰 Kira Garantili</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasSeaView}
                    onChange={(e) => setFormData({ ...formData, hasSeaView: e.target.checked })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">🌊 Deniz Manzarası</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasGenerator}
                    onChange={(e) => setFormData({ ...formData, hasGenerator: e.target.checked })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">⚡ Jeneratör</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasCamera}
                    onChange={(e) => setFormData({ ...formData, hasCamera: e.target.checked })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">📹 Güvenlik Kamerası</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasCamellia}
                    onChange={(e) => setFormData({ ...formData, hasCamellia: e.target.checked })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">🌳 Kamelya</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasParentBathroom}
                    onChange={(e) => setFormData({ ...formData, hasParentBathroom: e.target.checked })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">🚿 Ebeveyn Banyosu</span>
                </label>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brüt Metrekare (m²) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Net Metrekare (m²)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.netArea}
                    onChange={(e) => setFormData({ ...formData, netArea: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Oda Sayısı <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.rooms}
                    onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Banyo Sayısı</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WC Sayısı</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.wcCount}
                    onChange={(e) => setFormData({ ...formData, wcCount: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mutfak Tipi</label>
                  <select
                    value={formData.kitchenType}
                    onChange={(e) => setFormData({ ...formData, kitchenType: e.target.value })}
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Seçiniz</option>
                    <option value="Açık Mutfak">Açık Mutfak</option>
                    <option value="Kapalı Mutfak">Kapalı Mutfak</option>
                    <option value="Amerikan Mutfak">Amerikan Mutfak</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Eşyalı Durumu</label>
                  <select
                    value={formData.furnishedStatus}
                    onChange={(e) => setFormData({ ...formData, furnishedStatus: e.target.value })}
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Boş">Boş</option>
                    <option value="Eşyalı">Eşyalı</option>
                    <option value="Kısmi Eşyalı">Kısmi Eşyalı</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Aidat (Miktar)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.monthlyFee}
                    onChange={(e) => setFormData({ ...formData, monthlyFee: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Denize Uzaklık (m)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.distanceToSea}
                    onChange={(e) => setFormData({ ...formData, distanceToSea: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                    placeholder="Örn: 500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Manzara</label>
                  <div className="flex flex-wrap gap-2">
                    {["Deniz", "Doğa", "Şehir", "Dağ", "Havuz"].map((view) => (
                      <label key={view} className="flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded border border-gray-200">
                        <input
                          type="checkbox"
                          checked={formData.viewTypes.includes(view)}
                          onChange={(e) => {
                            if (e.target.checked) setFormData({ ...formData, viewTypes: [...formData.viewTypes, view] });
                            else setFormData({ ...formData, viewTypes: formData.viewTypes.filter(v => v !== view) });
                          }}
                          className="rounded text-primary-600"
                        />
                        <span className="text-sm text-gray-700">{view}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bulunduğu Kat</label>
                  <input
                    type="number"
                    value={formData.floor}
                    onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Toplam Kat</label>
                  <input
                    type="number"
                    value={formData.totalFloors}
                    onChange={(e) => setFormData({ ...formData, totalFloors: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bina Yaşı</label>
                  <input
                    type="number"
                    value={formData.buildingAge}
                    onChange={(e) => setFormData({ ...formData, buildingAge: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Isıtma</label>
                  <select
                    value={formData.heatingType}
                    onChange={(e) => setFormData({ ...formData, heatingType: e.target.value })}
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {heatingTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
              </div>

              {/* Açıklama */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                  placeholder="İlan hakkında detaylı açıklama..."
                />
              </div>

              {/* Olanaklar */}
              <div className="space-y-4 border-t pt-6">
                <h4 className="font-medium text-gray-700">Sosyal Olanaklar</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Havuzlar */}
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={formData.amenities.pool} onChange={(e) => setFormData({ ...formData, amenities: { ...formData.amenities, pool: e.target.checked } })} className="w-4 h-4 text-primary-600 rounded" />
                    <span className="text-gray-900">Açık Havuz</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={formData.amenities.indoorPool} onChange={(e) => setFormData({ ...formData, amenities: { ...formData.amenities, indoorPool: e.target.checked } })} className="w-4 h-4 text-primary-600 rounded" />
                    <span className="text-gray-900">Kapalı Havuz</span>
                  </label>

                  {/* Wellness */}
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={formData.amenities.sauna} onChange={(e) => setFormData({ ...formData, amenities: { ...formData.amenities, sauna: e.target.checked } })} className="w-4 h-4 text-primary-600 rounded" />
                    <span className="text-gray-900">Sauna</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={formData.amenities.steamRoom} onChange={(e) => setFormData({ ...formData, amenities: { ...formData.amenities, steamRoom: e.target.checked } })} className="w-4 h-4 text-primary-600 rounded" />
                    <span className="text-gray-900">Buhar Odası</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={formData.amenities.fitness} onChange={(e) => setFormData({ ...formData, amenities: { ...formData.amenities, fitness: e.target.checked } })} className="w-4 h-4 text-primary-600 rounded" />
                    <span className="text-gray-900">Fitness / Spor Salonu</span>
                  </label>

                  {/* Diğer */}
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={formData.amenities.parking} onChange={(e) => setFormData({ ...formData, amenities: { ...formData.amenities, parking: e.target.checked } })} className="w-4 h-4 text-primary-600 rounded" />
                    <span className="text-gray-900">Açık Otopark</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={formData.amenities.indoorParking} onChange={(e) => setFormData({ ...formData, amenities: { ...formData.amenities, indoorParking: e.target.checked } })} className="w-4 h-4 text-primary-600 rounded" />
                    <span className="text-gray-900">Kapalı Otopark</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={formData.amenities.underfloorHeating} onChange={(e) => setFormData({ ...formData, amenities: { ...formData.amenities, underfloorHeating: e.target.checked } })} className="w-4 h-4 text-primary-600 rounded" />
                    <span className="text-gray-900">Yerden Isıtma</span>
                  </label>

                  {/* New Amenities */}
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={formData.amenities.cinema} onChange={(e) => setFormData({ ...formData, amenities: { ...formData.amenities, cinema: e.target.checked } })} className="w-4 h-4 text-primary-600 rounded" />
                    <span className="text-gray-900">Sinema Odası</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={formData.amenities.playground} onChange={(e) => setFormData({ ...formData, amenities: { ...formData.amenities, playground: e.target.checked } })} className="w-4 h-4 text-primary-600 rounded" />
                    <span className="text-gray-900">Çocuk Parkı</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={formData.amenities.turkishBath} onChange={(e) => setFormData({ ...formData, amenities: { ...formData.amenities, turkishBath: e.target.checked } })} className="w-4 h-4 text-primary-600 rounded" />
                    <span className="text-gray-900">Hamam</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={formData.amenities.massageRoom} onChange={(e) => setFormData({ ...formData, amenities: { ...formData.amenities, massageRoom: e.target.checked } })} className="w-4 h-4 text-primary-600 rounded" />
                    <span className="text-gray-900">Masaj Odası</span>
                  </label>
                </div>
              </div>

              {/* Manuel Özellik Ekleme */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Diğer Özellikler (Etiketler)</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                    placeholder="Örn: Amerikan Mutfak"
                  />
                  <button type="button" onClick={addFeature} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Ekle</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((f, i) => (
                    <span key={i} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm flex items-center gap-2">
                      {f} <button type="button" onClick={() => removeFeature(i)}><X className="h-3 w-3" /></button>
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
                    Konum (İl/İlçe) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                    placeholder="Örn: İstanbul, Kadıköy"
                  />
                </div>

                <LocationPicker
                  value={{
                    lat: formData.coordinates.lat,
                    lng: formData.coordinates.lng
                  }}
                  onChange={(coords) => setFormData({
                    ...formData,
                    coordinates: coords
                  })}
                />

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps URL</label>
                  <input
                    type="text"
                    value={formData.googleMapsUrl}
                    onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                    placeholder="https://goo.gl/maps/..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Medya */}
          {activeTab === "media" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resimler</label>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      multiple
                      className="hidden"
                      id="upload-edit-img"
                    />
                    <label
                      htmlFor="upload-edit-img"
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
                  <button type="button" onClick={() => setShowGoogleDrivePicker(!showGoogleDrivePicker)} className="flex-1 border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:bg-blue-50">
                    <div className="inline-flex items-center space-x-2 font-medium text-blue-600">
                      <Cloud className="h-5 w-5" />
                      <span>{showGoogleDrivePicker ? "Drive'ı Gizle" : "Google Drive'dan Seç"}</span>
                    </div>
                  </button>
                </div>

                {showGoogleDrivePicker && (
                  <div className="mt-4 mb-4">
                    {loadingFromDrive && <p className="text-blue-600 mb-2">Drive'dan yükleniyor...</p>}
                    <div className={loadingFromDrive ? "opacity-50 pointer-events-none" : ""}>
                      <GoogleDriveFilePicker onFileSelect={handleGoogleDriveFileSelect} acceptedTypes={["image/jpeg", "image/png", "image/webp"]} />
                    </div>
                  </div>
                )}

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={img}
                          alt=""
                          className={`w-full h-32 object-cover rounded-lg ${formData.coverImage === img ? 'ring-4 ring-primary-500' : ''}`}
                        />
                        {/* Cover Image Badge */}
                        {formData.coverImage === img && (
                          <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full shadow-md z-10">
                            Kapak
                          </div>
                        )}

                        {/* Actions Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                          {formData.coverImage !== img && (
                            <button
                              type="button"
                              onClick={() => setCoverImage(img)}
                              className="px-3 py-1 bg-white text-primary-600 rounded-full text-xs font-medium hover:bg-gray-100"
                            >
                              Kapak Yap
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                />
              </div>
            </div>
          )}

          {/* Ayarlar */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">İlan Durumu</label>
                  <select
                    value={formData.propertyStatus}
                    onChange={(e) => setFormData({ ...formData, propertyStatus: e.target.value })}
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {propertyStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Danışman Adı</label>
                  <input
                    type="text"
                    value={formData.agentName}
                    onChange={(e) => setFormData({ ...formData, agentName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
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
                disabled={saving}
                className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                <span>{saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}</span>
              </button>
            </div>
          </div>
        </form>
      </div >
    </div >
  );
}
