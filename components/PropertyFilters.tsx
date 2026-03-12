"use client";

import { useState, useEffect } from "react";
import { Filter, X } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useCurrency } from "@/contexts/CurrencyContext";

interface PropertyFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  activeFilters: FilterState;
}

export interface FilterState {
  type: string;             // "Satılık", "Kiralık", ""
  propertyType: string;     // "Daire", "Villa", etc.
  minPrice: number | "";
  maxPrice: number | "";
  minArea: number | "";
  maxArea: number | "";
  rooms: number | string | ""; // Numeric values (0-6)
  bathrooms: number | "";
  furnitureStatus: string;  // "Boş", "Eşyalı", "Yarı Eşyalı", ""
  activityStatus: string;
  propertyStatus: string;
  distanceToSea: string;
  propertyId: string;
}

export default function PropertyFilters({ onFilterChange, activeFilters }: PropertyFiltersProps) {
  const t = useTranslations('propertyFilters');
  const { currency, convertAmount, formatCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(activeFilters);

  // Sync internal state with activeFilters prop
  useEffect(() => {
    setFilters(activeFilters);
  }, [activeFilters]);

  const handleFilterChange = (key: keyof FilterState, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const cleared: FilterState = {
      type: "",
      propertyType: "",
      minPrice: "",
      maxPrice: "",
      minArea: "",
      maxArea: "",
      rooms: "",
      bathrooms: "",
      furnitureStatus: "",
      activityStatus: "",
      propertyStatus: "",
      distanceToSea: "",
      propertyId: "",
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  const toggleRoomFilter = (roomValue: number | string) => {
    const newRooms = filters.rooms === roomValue ? "" : roomValue;
    handleFilterChange("rooms", newRooms);
  };

  const toggleBathroomFilter = (bathroomValue: number | string) => {
    const newBathrooms = filters.bathrooms === bathroomValue ? "" : bathroomValue;
    handleFilterChange("bathrooms", newBathrooms);
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== "" && value !== 0
  );

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white rounded-lg transition-all shadow-lg hover:shadow-xl"
        >
          <Filter className="h-4 w-4" />
          <span className="text-sm">{t('filter')}</span>
          {hasActiveFilters && (
            <span className="bg-white text-[#2e3c3a] rounded-full px-2 py-0.5 text-xs font-semibold">
              {t('active')}
            </span>
          )}
        </button>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors text-sm"
          >
            <X className="h-4 w-4" />
            <span>{t('clearFilters')}</span>
          </button>
        )}
      </div>

      {isOpen && (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 mt-3">
          <div className="space-y-6">
            {/* Tip ve Fiyat/Alan Filtreleri */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-xs font-medium text-white mb-2">
                  {t('transactionType')}
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#2e3c3a]/60 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white"
                >
                  <option value="">{t('all')}</option>
                  <option value="Satılık">{t('sale')}</option>
                  <option value="Kiralık">{t('rent')}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-2">
                  {t('propertyType')}
                </label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange("propertyType", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#2e3c3a]/60 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white"
                >
                  <option value="">{t('all')}</option>
                  {[
                    { label: t('apartment'), value: "Daire" },
                    { label: t('villa'), value: "Villa" },
                    { label: t('residence'), value: "Rezidans" },
                    { label: t('detached'), value: "Müstakil Ev" },
                    { label: t('duplex'), value: "Dubleks" },
                    { label: t('triplex'), value: "Tripleks" },
                    { label: t('penthouse'), value: "Penthouse" },
                    { label: t('commercial'), value: "Ticari" },
                    { label: t('office'), value: "Ofis" },
                    { label: t('store'), value: "Mağaza" },
                    { label: t('warehouse'), value: "Depo" },
                    { label: t('land'), value: "Arsa" },
                    { label: t('building'), value: "Satılık Bina" },
                    { label: t('workplace'), value: "İşyeri" }
                  ].map(item => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-2">
                  {t('minPrice')} ({currency})
                </label>
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) =>
                    handleFilterChange("minPrice", e.target.value ? Number(e.target.value) : "")
                  }
                  placeholder={`Min (${currency})`}
                  className="w-full px-3 py-2 text-sm bg-[#2e3c3a]/60 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white placeholder-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-2">
                  {t('maxPrice')} ({currency})
                </label>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    handleFilterChange("maxPrice", e.target.value ? Number(e.target.value) : "")
                  }
                  placeholder={`Max (${currency})`}
                  className="w-full px-3 py-2 text-sm bg-[#2e3c3a]/60 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white placeholder-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-2">
                  {t('minArea')} (m²)
                </label>
                <input
                  type="number"
                  value={filters.minArea}
                  onChange={(e) =>
                    handleFilterChange("minArea", e.target.value ? Number(e.target.value) : "")
                  }
                  placeholder="Min"
                  className="w-full px-3 py-2 text-sm bg-[#2e3c3a]/60 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white placeholder-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-2">
                  {t('maxArea')} (m²)
                </label>
                <input
                  type="number"
                  value={filters.maxArea}
                  onChange={(e) =>
                    handleFilterChange("maxArea", e.target.value ? Number(e.target.value) : "")
                  }
                  placeholder="Max"
                  className="w-full px-3 py-2 text-sm bg-[#2e3c3a]/60 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white placeholder-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white mb-2">
                  {t('propertyId')}
                </label>
                <input
                  type="text"
                  value={filters.propertyId}
                  onChange={(e) =>
                    handleFilterChange("propertyId", e.target.value)
                  }
                  placeholder={t('propertyId')}
                  className="w-full px-3 py-2 text-sm bg-[#2e3c3a]/60 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white placeholder-white/40"
                />
              </div>
            </div>

            {/* Eşya Durumu */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white/90">
                {t('furnitureStatus')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: t('unfurnished'), value: "Boş" },
                  { label: t('furnished'), value: "Eşyalı" },
                  { label: "Yarı Eşyalı", value: "Yarı Eşyalı" }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handleFilterChange("furnitureStatus", filters.furnitureStatus === item.value ? "" : item.value)}
                    className={`px-4 py-2 text-sm rounded-lg transition-all border-2 ${filters.furnitureStatus === item.value
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-white/20 hover:border-white/40"
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Aktivite Durumu */}
            <div>
              <label className="block text-xs font-medium text-white mb-2">
                {t('activityStatus')}
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleFilterChange("activityStatus", filters.activityStatus === "full_activity" ? "" : "full_activity")}
                  className={`px-4 py-2 text-sm rounded-lg transition-all ${filters.activityStatus === "full_activity"
                    ? "bg-black text-white border-2 border-black"
                    : "bg-white text-black border-2 border-white/20 hover:border-white/40"
                    }`}
                >
                  {t('fullActivity')}
                </button>

                <button
                  onClick={() => handleFilterChange("activityStatus", filters.activityStatus === "no_activity" ? "" : "no_activity")}
                  className={`px-4 py-2 text-sm rounded-lg transition-all ${filters.activityStatus === "no_activity"
                    ? "bg-black text-white border-2 border-black"
                    : "bg-white text-black border-2 border-white/20 hover:border-white/40"
                    }`}
                >
                  {t('noActivity')}
                </button>
              </div>
            </div>

            {/* Emlak Durumu */}
            <div>
              <label className="block text-xs font-medium text-white mb-2">
                {t('propertyStatus')}
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleFilterChange("propertyStatus", filters.propertyStatus === "under_construction" ? "" : "under_construction")}
                  className={`px-4 py-2 text-sm rounded-lg transition-all ${filters.propertyStatus === "under_construction"
                    ? "bg-black text-white border-2 border-black"
                    : "bg-white text-black border-2 border-white/20 hover:border-white/40"
                    }`}
                >
                  {t('underConstruction')}
                </button>
                <button
                  onClick={() => handleFilterChange("propertyStatus", filters.propertyStatus === "future_delivery" ? "" : "future_delivery")}
                  className={`px-4 py-2 text-sm rounded-lg transition-all ${filters.propertyStatus === "future_delivery"
                    ? "bg-black text-white border-2 border-black"
                    : "bg-white text-black border-2 border-white/20 hover:border-white/40"
                    }`}
                >
                  {t('futureDelivery')}
                </button>
                <button
                  onClick={() => handleFilterChange("propertyStatus", filters.propertyStatus === "ready" ? "" : "ready")}
                  className={`px-4 py-2 text-sm rounded-lg transition-all ${filters.propertyStatus === "ready"
                    ? "bg-black text-white border-2 border-black"
                    : "bg-white text-black border-2 border-white/20 hover:border-white/40"
                    }`}
                >
                  {t('readyToMove')}
                </button>
              </div>
            </div>

            {/* Oda Sayısı */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white/90">
                {t('rooms')}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: t('studio'), value: 0 },
                  { label: "1+", value: 1 },
                  { label: "2+1", value: 2 },
                  { label: "3+1", value: 3 },
                  { label: "4+1", value: 4 },
                  { label: "5+1", value: 5 },
                  { label: "6+", value: 6 },
                ].map((room) => (
                  <button
                    key={room.value}
                    onClick={() => toggleRoomFilter(room.value)}
                    className={`px-3 py-2 text-sm rounded-lg transition-all border-2 ${filters.rooms === room.value
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-white/20 hover:border-white/40"
                      }`}
                  >
                    {room.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Banyo Sayısı - Toggle Butonlar */}
            <div>
              <label className="block text-xs font-medium text-white mb-2">
                {t('bathrooms')}
              </label>
              <div className="flex flex-wrap gap-2">
                {["Yok", "1", "2", "3+"].map((bathroom) => {
                  const bathroomValue = bathroom === "Yok" ? 0 : bathroom === "3+" ? 3 : parseInt(bathroom);
                  const isSelected = filters.bathrooms === bathroomValue ||
                    (bathroom === "3+" && typeof filters.bathrooms === "number" && filters.bathrooms >= 3);

                  let label = bathroom;
                  if (bathroom === "Yok") label = t('none');

                  return (
                    <button
                      key={bathroom}
                      onClick={() => toggleBathroomFilter(bathroomValue)}
                      className={`px-4 py-2 text-sm rounded-lg transition-all ${isSelected
                        ? "bg-black text-white border-2 border-black"
                        : "bg-white text-black border-2 border-white/20 hover:border-white/40"
                        }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Denize Uzaklık - Toggle Butonlar */}
            <div>
              <label className="block text-xs font-medium text-white mb-2">
                {t('distanceToSea')}
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "0-100m", value: "0-100" },
                  { label: "100-300m", value: "100-300" },
                  { label: "300-500m", value: "300-500" },
                  { label: "500m+", value: "500+" }
                ].map((distance) => {
                  const isSelected = filters.distanceToSea === distance.value;

                  return (
                    <button
                      key={distance.value}
                      onClick={() => handleFilterChange("distanceToSea", isSelected ? "" : distance.value)}
                      className={`px-4 py-2 text-sm rounded-lg transition-all ${isSelected
                        ? "bg-black text-white border-2 border-black"
                        : "bg-white text-black border-2 border-white/20 hover:border-white/40"
                        }`}
                    >
                      {distance.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
