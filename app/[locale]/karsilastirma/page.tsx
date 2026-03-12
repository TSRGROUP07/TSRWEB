"use client";

import { useState, useEffect, Suspense } from "react";
import { Building2, Bed, Bath, Square, MapPin, TrendingUp, CheckCircle, X, ArrowLeft, Sparkles, Search, Share2, Download, Filter, Star, DollarSign, Calendar, Home, Award } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  area: number;
  rooms: number;
  bathrooms: number;
  floor?: number;
  buildingAge?: number;
  features: string[];
  image?: string;
  type?: string;
  verified?: boolean;
  monthlyRent?: number;
}

function KarsilastirmaContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"price" | "area" | "rooms" | "name">("name");
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    // URL'den seçili property ID'lerini al
    const id1 = searchParams.get("id1");
    const id2 = searchParams.get("id2");

    if (id1 && id2 && properties.length > 0) {
      const prop1 = properties.find((p) => p.id === parseInt(id1));
      const prop2 = properties.find((p) => p.id === parseInt(id2));
      if (prop1 && prop2) {
        setSelectedProperties([prop1, prop2]);
      }
    }
  }, [searchParams, properties]);

  const loadProperties = async () => {
    try {
      const response = await fetch("/api/properties");
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        // API'den gelen verileri formatla
        const formattedProperties: Property[] = data.map((prop: any) => ({
          id: prop.id,
          title: prop.title || prop.name || "İsimsiz Emlak",
          location: prop.location || prop.address || "Konum belirtilmemiş",
          price: prop.price || 0,
          area: prop.area || 0,
          rooms: prop.rooms || 0,
          bathrooms: prop.bathrooms || 0,
          floor: prop.floor,
          buildingAge: prop.buildingAge || prop.age,
          features: prop.features || prop.amenities || [],
          image: prop.image || prop.images?.[0] || "/eviconu.png",
          type: prop.type || "sale",
          verified: prop.verified || false,
          monthlyRent: prop.monthlyRent,
        }));
        setProperties(formattedProperties);
      } else {
        // Fallback: Mock data
        const mockProperties: Property[] = [];
        setProperties(mockProperties);
      }
    } catch (error) {
      console.error("İlanlar yüklenemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const searchBar = document.getElementById("search-bar");
    if (searchBar) {
      searchBar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleViewProperties = () => {
    const propertiesGrid = document.getElementById("properties-grid");
    if (propertiesGrid) {
      propertiesGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const filteredProperties = properties
    .filter((prop) => {
      if (!searchTerm && filterType === "all") return true;
      const term = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm ||
        prop.title.toLowerCase().includes(term) ||
        prop.location.toLowerCase().includes(term);
      const matchesFilter = filterType === "all" || prop.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "area":
          return b.area - a.area;
        case "rooms":
          return b.rooms - a.rooms;
        case "name":
        default:
          return a.title.localeCompare(b.title);
      }
    });

  const compareFeatures = (prop1: Property, prop2: Property) => {
    const pricePerSqm1 = prop1.price / prop1.area;
    const pricePerSqm2 = prop2.price / prop2.area;
    const rentalYield1 = prop1.monthlyRent ? (prop1.monthlyRent * 12 / prop1.price) * 100 : 0;
    const rentalYield2 = prop2.monthlyRent ? (prop2.monthlyRent * 12 / prop2.price) * 100 : 0;

    const comparisons = [
      {
        label: "Fiyat",
        value1: prop1.price,
        value2: prop2.price,
        format: (val: number) =>
          new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            maximumFractionDigits: 0,
          }).format(val),
        better: prop1.price < prop2.price ? 1 : 2,
        icon: DollarSign,
      },
      {
        label: "Metrekare",
        value1: prop1.area,
        value2: prop2.area,
        format: (val: number) => `${val} m²`,
        better: prop1.area > prop2.area ? 1 : 2,
        icon: Square,
      },
      {
        label: "Oda Sayısı",
        value1: prop1.rooms,
        value2: prop2.rooms,
        format: (val: number) => `${val}+1`,
        better: prop1.rooms > prop2.rooms ? 1 : 2,
        icon: Bed,
      },
      {
        label: "Banyo Sayısı",
        value1: prop1.bathrooms,
        value2: prop2.bathrooms,
        format: (val: number) => `${val}`,
        better: prop1.bathrooms > prop2.bathrooms ? 1 : 2,
        icon: Bath,
      },
      {
        label: "Kat",
        value1: prop1.floor || 0,
        value2: prop2.floor || 0,
        format: (val: number) => val ? `${val}. Kat` : "-",
        better: null,
        icon: Building2,
      },
      {
        label: "Bina Yaşı",
        value1: prop1.buildingAge || 0,
        value2: prop2.buildingAge || 0,
        format: (val: number) => val ? `${val} yıl` : "-",
        better: prop1.buildingAge && prop2.buildingAge ? (prop1.buildingAge < prop2.buildingAge ? 1 : 2) : null,
        icon: Calendar,
      },
      {
        label: "m² Fiyat",
        value1: pricePerSqm1,
        value2: pricePerSqm2,
        format: (val: number) =>
          new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            maximumFractionDigits: 0,
          }).format(val),
        better: pricePerSqm1 < pricePerSqm2 ? 1 : 2,
        icon: TrendingUp,
      },
      {
        label: "Aylık Kira (Tahmini)",
        value1: prop1.monthlyRent || 0,
        value2: prop2.monthlyRent || 0,
        format: (val: number) => val ?
          new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            maximumFractionDigits: 0,
          }).format(val) : "-",
        better: prop1.monthlyRent && prop2.monthlyRent ? (prop1.monthlyRent > prop2.monthlyRent ? 1 : 2) : null,
        icon: Home,
      },
      {
        label: "Kira Getirisi (Yıllık)",
        value1: rentalYield1,
        value2: rentalYield2,
        format: (val: number) => val ? `${val.toFixed(1)}%` : "-",
        better: rentalYield1 && rentalYield2 ? (rentalYield1 > rentalYield2 ? 1 : 2) : null,
        icon: Award,
      },
    ];
    return comparisons;
  };

  const handleShare = () => {
    if (selectedProperties.length === 2) {
      const url = `${window.location.origin}/karsilastirma?id1=${selectedProperties[0].id}&id2=${selectedProperties[1].id}`;
      if (navigator.share) {
        navigator.share({
          title: "Emlak Karşılaştırması",
          text: `${selectedProperties[0].title} vs ${selectedProperties[1].title}`,
          url: url,
        });
      } else {
        navigator.clipboard.writeText(url);
        alert("Karşılaştırma linki kopyalandı!");
      }
    }
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

  if (selectedProperties.length !== 2) {
    return (
      <div className="min-h-screen bg-[#b7b1ad] text-white">
        {/* Hero Section */}
        <div className="relative h-[60vh] w-full overflow-hidden mt-8 mb-8 rounded-2xl mx-4">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=90"
              alt="Daire Karşılaştırma"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#2e3c3a]/90 via-[#3a4d4a]/80 to-[#2e3c3a]/90"></div>
          </div>

          <div className="relative z-20 container mx-auto px-6 lg:px-12 h-full flex items-center">
            <div className="w-full max-w-4xl">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
                    Daire Karşılaştırma
                  </h1>
                  <p className="text-xl md:text-2xl text-white/95 font-medium max-w-2xl leading-relaxed">
                    İki emlak ilanını detaylı olarak karşılaştırın ve en iyi seçimi yapın.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-2xl text-lg"
                  >
                    <Search className="h-6 w-6" />
                    <span>Emlak Ara</span>
                  </button>
                  <button
                    onClick={handleViewProperties}
                    className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 text-lg"
                  >
                    <span>Emlakları Gör</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Search and Filter Bar */}
          <div id="search-bar" className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] border border-white/20 rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Emlak adı veya lokasyon ara..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white placeholder-white/50"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-white/70" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white"
                >
                  <option value="all">Tümü</option>
                  <option value="sale">Satılık</option>
                  <option value="rent">Kiralık</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white"
                >
                  <option value="name">İsme Göre</option>
                  <option value="price">Fiyata Göre</option>
                  <option value="area">Metrekareye Göre</option>
                  <option value="rooms">Oda Sayısına Göre</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <p className="text-white/80 text-lg mb-2">
                Karşılaştırma yapmak için iki emlak seçin
              </p>
              {selectedProperties.length === 1 && (
                <p className="text-white font-semibold">
                  {selectedProperties.length} emlak seçildi, bir tane daha seçin
                </p>
              )}
            </div>
            <div id="properties-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.slice(0, 12).map((prop) => {
                const isSelected = selectedProperties.some(p => p.id === prop.id);
                return (
                  <div
                    key={prop.id}
                    className={`bg-white/10 backdrop-blur-md border rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 ${isSelected
                        ? "border-[#4f271b] bg-[#4f271b]/20 shadow-xl ring-2 ring-[#4f271b]"
                        : "border-white/20 hover:border-white/30 hover:bg-white/15"
                      }`}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedProperties(selectedProperties.filter(p => p.id !== prop.id));
                      } else if (selectedProperties.length < 2) {
                        setSelectedProperties([...selectedProperties, prop]);
                      } else {
                        // İkinci emlak seçildiyse, ilkini değiştir
                        setSelectedProperties([selectedProperties[1], prop]);
                      }
                    }}
                  >
                    <div className="flex gap-4 mb-4">
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 border-white/20">
                        {prop.image ? (
                          <Image
                            src={prop.image}
                            alt={prop.title}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] flex items-center justify-center">
                            <Building2 className="h-8 w-8 text-white/60" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        {isSelected && (
                          <div className="flex justify-end mb-2">
                            <div className="w-5 h-5 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-full flex items-center justify-center">
                              <CheckCircle className="h-3 w-3 text-white" />
                            </div>
                          </div>
                        )}
                        <h3 className="font-semibold mb-2 text-white text-lg line-clamp-1">{prop.title}</h3>
                        <div className="flex items-center text-white/70 mb-2 text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate">{prop.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/60 mb-2 text-xs">
                          <div className="flex items-center">
                            <Bed className="h-3 w-3 mr-1" />
                            {prop.rooms}+1
                          </div>
                          <div className="flex items-center">
                            <Bath className="h-3 w-3 mr-1" />
                            {prop.bathrooms}
                          </div>
                          <div className="flex items-center">
                            <Square className="h-3 w-3 mr-1" />
                            {prop.area}m²
                          </div>
                        </div>
                        <p className="text-white font-bold text-lg">
                          {new Intl.NumberFormat("tr-TR", {
                            style: "currency",
                            currency: "TRY",
                            maximumFractionDigits: 0,
                          }).format(prop.price)}
                        </p>
                      </div>
                    </div>
                    {prop.verified && (
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <CheckCircle className="h-3 w-3 text-[#2e3c3a]" />
                        <span>Doğrulanmış</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white/60 text-lg">Aradığınız kriterlere uygun emlak bulunamadı.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const comparisons = compareFeatures(selectedProperties[0], selectedProperties[1]);
  const winner1 = comparisons.filter(c => c.better === 1).length;
  const winner2 = comparisons.filter(c => c.better === 2).length;

  return (
    <div className="min-h-screen bg-[#b7b1ad] text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/karsilastirma"
              onClick={() => setSelectedProperties([])}
              className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/15 transition-all"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </Link>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">Daire Karşılaştırma</h1>
              <p className="text-white/60 mt-1">İki emlak ilanını detaylı karşılaştırın</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/15 transition-all text-white flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              <span>Paylaş</span>
            </button>
            <button
              onClick={() => setSelectedProperties([])}
              className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/15 transition-all text-white flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              <span>Yeni Karşılaştırma</span>
            </button>
          </div>
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 max-w-[95rem] mx-auto">
          {/* Property 1 */}
          <div className="md:col-span-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-lg shadow-md">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-[#4f271b] rounded-full text-xs font-semibold text-white shadow-sm">
                  İlan 1
                </div>
                {winner1 > winner2 && (
                  <div className="px-3 py-1 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-full text-xs font-semibold text-white flex items-center gap-1 shadow-md">
                    <Star className="h-3 w-3 fill-yellow-300" />
                    Kazanan
                  </div>
                )}
              </div>
            </div>
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-white/20 mb-4 shadow-lg">
              {selectedProperties[0].image ? (
                <Image
                  src={selectedProperties[0].image}
                  alt={selectedProperties[0].title}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] flex items-center justify-center">
                  <Building2 className="h-12 w-12 text-white/60" />
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white line-clamp-2 leading-tight">{selectedProperties[0].title}</h3>
            <div className="space-y-2 text-base mb-4">
              <div className="flex items-center text-white/80 bg-white/5 rounded-lg p-2">
                <MapPin className="h-5 w-5 mr-2 text-[#2e3c3a]" />
                <span className="font-medium text-sm">{selectedProperties[0].location}</span>
              </div>
              <div className="flex items-center gap-3 text-white/70 bg-white/5 rounded-lg p-2">
                <div className="flex items-center gap-1">
                  <Bed className="h-5 w-5 text-[#2e3c3a]" />
                  <span className="font-semibold text-sm">{selectedProperties[0].rooms}+1</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="h-5 w-5 text-[#2e3c3a]" />
                  <span className="font-semibold text-sm">{selectedProperties[0].bathrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square className="h-5 w-5 text-[#2e3c3a]" />
                  <span className="font-semibold text-sm">{selectedProperties[0].area}m²</span>
                </div>
              </div>
              {selectedProperties[0].floor && (
                <div className="flex items-center text-white/70 bg-white/5 rounded-lg p-2">
                  <Building2 className="h-4 w-4 mr-2 text-[#2e3c3a]" />
                  <span className="font-medium text-sm">{selectedProperties[0].floor}. Kat</span>
                </div>
              )}
            </div>
            <div className="text-3xl font-bold text-white mb-4">
              {new Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY",
                maximumFractionDigits: 0,
              }).format(selectedProperties[0].price)}
            </div>
            <Link
              href={`/emlak/${selectedProperties[0].id}`}
              className="block w-full text-center bg-gradient-to-r from-[#4f271b] to-[#3d1f15] hover:from-[#3d1f15] hover:to-[#4f271b] text-white font-semibold py-3 px-4 rounded-lg transition-all text-base shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Detayları Gör
            </Link>
          </div>

          {/* VS */}
          <div className="md:col-span-2 flex items-center justify-center">
            <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white rounded-full w-16 h-16 md:w-18 md:h-18 flex items-center justify-center font-bold text-xl md:text-2xl shadow-xl hover:scale-110 transition-transform border-2 border-white/30">
              VS
            </div>
          </div>

          {/* Property 2 */}
          <div className="md:col-span-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-lg shadow-md">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-[#4f271b] rounded-full text-xs font-semibold text-white shadow-sm">
                  İlan 2
                </div>
                {winner2 > winner1 && (
                  <div className="px-3 py-1 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-full text-xs font-semibold text-white flex items-center gap-1 shadow-md">
                    <Star className="h-3 w-3 fill-yellow-300" />
                    Kazanan
                  </div>
                )}
              </div>
            </div>
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-white/20 mb-4 shadow-lg">
              {selectedProperties[1].image ? (
                <Image
                  src={selectedProperties[1].image}
                  alt={selectedProperties[1].title}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] flex items-center justify-center">
                  <Building2 className="h-12 w-12 text-white/60" />
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white line-clamp-2 leading-tight">{selectedProperties[1].title}</h3>
            <div className="space-y-2 text-base mb-4">
              <div className="flex items-center text-white/80 bg-white/5 rounded-lg p-2">
                <MapPin className="h-5 w-5 mr-2 text-[#2e3c3a]" />
                <span className="font-medium text-sm">{selectedProperties[1].location}</span>
              </div>
              <div className="flex items-center gap-3 text-white/70 bg-white/5 rounded-lg p-2">
                <div className="flex items-center gap-1">
                  <Bed className="h-5 w-5 text-[#2e3c3a]" />
                  <span className="font-semibold text-sm">{selectedProperties[1].rooms}+1</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="h-5 w-5 text-[#2e3c3a]" />
                  <span className="font-semibold text-sm">{selectedProperties[1].bathrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square className="h-5 w-5 text-[#2e3c3a]" />
                  <span className="font-semibold text-sm">{selectedProperties[1].area}m²</span>
                </div>
              </div>
              {selectedProperties[1].floor && (
                <div className="flex items-center text-white/70 bg-white/5 rounded-lg p-2">
                  <Building2 className="h-4 w-4 mr-2 text-[#2e3c3a]" />
                  <span className="font-medium text-sm">{selectedProperties[1].floor}. Kat</span>
                </div>
              )}
            </div>
            <div className="text-3xl font-bold text-white mb-4">
              {new Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY",
                maximumFractionDigits: 0,
              }).format(selectedProperties[1].price)}
            </div>
            <Link
              href={`/emlak/${selectedProperties[1].id}`}
              className="block w-full text-center bg-gradient-to-r from-[#4f271b] to-[#3d1f15] hover:from-[#3d1f15] hover:to-[#4f271b] text-white font-semibold py-3 px-4 rounded-lg transition-all text-base shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Detayları Gör
            </Link>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="p-6 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a]">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="h-6 w-6" />
              Detaylı Karşılaştırma
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-white">Özellik</th>
                  <th className="px-6 py-4 text-center font-semibold text-white">
                    {selectedProperties[0].title}
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-white">
                    {selectedProperties[1].title}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((comp, index) => {
                  const Icon = comp.icon;
                  return (
                    <tr
                      key={index}
                      className={`border-b border-white/10 hover:bg-white/5 transition-colors ${index % 2 === 0 ? "bg-white/5" : "bg-transparent"
                        }`}
                    >
                      <td className="px-6 py-4 font-medium text-white/90">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-white/60" />
                          <span>{comp.label}</span>
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 text-center ${comp.better === 1
                            ? "bg-gradient-to-r from-[#2e3c3a]/30 to-[#3a4d4a]/30 font-semibold text-white"
                            : "text-white/80"
                          }`}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          {comp.better === 1 && (
                            <div className="p-1 bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] rounded-full">
                              <TrendingUp className="h-4 w-4 text-white" />
                            </div>
                          )}
                          <span>{comp.format(comp.value1)}</span>
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 text-center ${comp.better === 2
                            ? "bg-gradient-to-r from-[#2e3c3a]/30 to-[#3a4d4a]/30 font-semibold text-white"
                            : "text-white/80"
                          }`}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          {comp.better === 2 && (
                            <div className="p-1 bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] rounded-full">
                              <TrendingUp className="h-4 w-4 text-white" />
                            </div>
                          )}
                          <span>{comp.format(comp.value2)}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Features Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-lg">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Özellikler - {selectedProperties[0].title}</h3>
            </div>
            {selectedProperties[0].features && selectedProperties[0].features.length > 0 ? (
              <ul className="space-y-3">
                {selectedProperties[0].features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-white/90 bg-white/5 rounded-lg p-3">
                    <CheckCircle className="h-5 w-5 text-[#2e3c3a] mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/60 bg-white/5 rounded-lg p-4 text-center">Özellik bilgisi yok</p>
            )}
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-lg">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Özellikler - {selectedProperties[1].title}</h3>
            </div>
            {selectedProperties[1].features && selectedProperties[1].features.length > 0 ? (
              <ul className="space-y-3">
                {selectedProperties[1].features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-white/90 bg-white/5 rounded-lg p-3">
                    <CheckCircle className="h-5 w-5 text-[#2e3c3a] mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/60 bg-white/5 rounded-lg p-4 text-center">Özellik bilgisi yok</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KarsilastirmaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#b7b1ad] text-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2e3c3a] mx-auto mb-4"></div>
            <p className="text-white/80">Yükleniyor...</p>
          </div>
        </div>
      }
    >
      <KarsilastirmaContent />
    </Suspense>
  );
}
