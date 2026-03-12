"use client";

import React from "react";
import { Plus, X, Bus, Cross, TreePine, School, Heart, Trophy, Music, ShoppingBag } from "lucide-react";
import { useState } from "react";

interface NearbyPlace {
    icon: string;
    distance: number;
    name: string;
}

interface InvestmentFormData {
    investment_score?: number;
    investment_score_description?: string;
    price_analysis?: {
        yearly_return?: string;
        unit_price?: string;
        value_estimation?: string;
        rental_income?: string;
    };
    location_analysis?: {
        neighborhood_score?: number;
        district_score?: number;
        province_score?: number;
    };
    location_nearby_transit?: boolean;
    location_nearby_schools?: boolean;
    location_nearby_health?: boolean;
    location_nearby_green_areas?: boolean;
    location_nearby_sports?: boolean;
    location_nearby_entertainment?: boolean;
    structural_score?: number;
    structural_building_age_impact?: string;
    structural_facilities_impact?: string;
    structural_gross_area_impact?: string;
    structural_usage_status_impact?: string;
    demographics_married_rate?: number;
    demographics_youth_rate?: number;
    demographics_higher_ed_rate?: number;
    demographics_election_district?: string;
    demographics_election_party?: string;
    demographics_election_percentage?: number;
    nearby_places?: NearbyPlace[];
}

interface InvestmentAnalysisFormProps {
    data: InvestmentFormData;
    onChange: (data: InvestmentFormData) => void;
}

const iconOptions = [
    { value: "bus", label: "Otobüs", icon: Bus },
    { value: "hospital", label: "Hastane/Eczane", icon: Cross },
    { value: "park", label: "Park", icon: TreePine },
    { value: "school", label: "Okul", icon: School },
    { value: "heart", label: "Sağlık", icon: Heart },
    { value: "sports", label: "Spor", icon: Trophy },
    { value: "entertainment", label: "Eğlence", icon: Music },
    { value: "shopping", label: "Alışveriş", icon: ShoppingBag },
];

export default function InvestmentAnalysisForm({ data, onChange }: InvestmentAnalysisFormProps) {
    const [newPlace, setNewPlace] = useState<NearbyPlace>({ icon: "bus", distance: 0, name: "" });

    const updateData = (updates: Partial<InvestmentFormData>) => {
        onChange({ ...data, ...updates });
    };

    const addNearbyPlace = () => {
        if (newPlace.name && newPlace.distance > 0) {
            const nearbyPlaces = [...(data.nearby_places || []), newPlace];
            updateData({ nearby_places: nearbyPlaces });
            setNewPlace({ icon: "bus", distance: 0, name: "" });
        }
    };

    const removeNearbyPlace = (index: number) => {
        const nearbyPlaces = [...(data.nearby_places || [])];
        nearbyPlaces.splice(index, 1);
        updateData({ nearby_places: nearbyPlaces });
    };

    return (
        <div className="space-y-8">
            {/* Investment Score Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Yatırım Skoru</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Skor (0-100)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={data.investment_score || ""}
                            onChange={(e) => updateData({ investment_score: parseInt(e.target.value) || 0 })}
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="85"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Açıklama
                        </label>
                        <textarea
                            value={data.investment_score_description || ""}
                            onChange={(e) => updateData({ investment_score_description: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Yapay zeka tarafından hesaplanan yatırım skoru..."
                        />
                    </div>
                </div>
            </div>

            {/* Price Analysis Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Fiyat Analizi</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Yıllık Getiri (örn: +1.8%)
                        </label>
                        <input
                            type="text"
                            value={data.price_analysis?.yearly_return || ""}
                            onChange={(e) => updateData({
                                price_analysis: { ...data.price_analysis, yearly_return: e.target.value }
                            })}
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="+1.8%"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Birim Fiyatı (örn: -13%)
                        </label>
                        <input
                            type="text"
                            value={data.price_analysis?.unit_price || ""}
                            onChange={(e) => updateData({
                                price_analysis: { ...data.price_analysis, unit_price: e.target.value }
                            })}
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="-13%"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Değer Tahmini (örn: -22%)
                        </label>
                        <input
                            type="text"
                            value={data.price_analysis?.value_estimation || ""}
                            onChange={(e) => updateData({
                                price_analysis: { ...data.price_analysis, value_estimation: e.target.value }
                            })}
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="-22%"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Kira Geliri (örn: +8%)
                        </label>
                        <input
                            type="text"
                            value={data.price_analysis?.rental_income || ""}
                            onChange={(e) => updateData({
                                price_analysis: { ...data.price_analysis, rental_income: e.target.value }
                            })}
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="+8%"
                        />
                    </div>
                </div>
            </div>

            {/* Region Analysis Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bölge Analizi</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mahalle Skoru (0-100)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={data.location_analysis?.neighborhood_score || ""}
                            onChange={(e) => updateData({
                                location_analysis: { ...data.location_analysis, neighborhood_score: parseInt(e.target.value) || 0 }
                            })}
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            İlçe Skoru (0-100)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={data.location_analysis?.district_score || ""}
                            onChange={(e) => updateData({
                                location_analysis: { ...data.location_analysis, district_score: parseInt(e.target.value) || 0 }
                            })}
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="66"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            İl Skoru (0-100)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={data.location_analysis?.province_score || ""}
                            onChange={(e) => updateData({
                                location_analysis: { ...data.location_analysis, province_score: parseInt(e.target.value) || 0 }
                            })}
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="61"
                        />
                    </div>
                </div>
            </div>

            {/* Location Checklist Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Konum Özellikleri</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                        { key: "location_nearby_transit", label: "Toplu Ulaşıma Yakın" },
                        { key: "location_nearby_schools", label: "Okullara Yakın" },
                        { key: "location_nearby_health", label: "Sağlık Hizmetlerine Yakın" },
                        { key: "location_nearby_green_areas", label: "Yeşil Alanlara Yakın" },
                        { key: "location_nearby_sports", label: "Spor Alanlarına Yakın" },
                        { key: "location_nearby_entertainment", label: "Eğlence Alanlarına Yakın" },
                    ].map((item) => (
                        <label key={item.key} className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data[item.key as keyof InvestmentFormData] as boolean || false}
                                onChange={(e) => updateData({ [item.key]: e.target.checked })}
                                className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                            />
                            <span className="text-sm text-gray-700">{item.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Structural Condition Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Yapısal Durum</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Skor (0-100)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={data.structural_score || ""}
                            onChange={(e) => updateData({ structural_score: parseInt(e.target.value) || 0 })}
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="52"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bina Yaşı Etkisi (örn: -15 yaş)
                        </label>
                        <input
                            type="text"
                            value={data.structural_building_age_impact || ""}
                            onChange={(e) => updateData({ structural_building_age_impact: e.target.value })}
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="-15 yaş"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Olanaklar Etkisi (örn: +2)
                        </label>
                        <input
                            type="text"
                            value={data.structural_facilities_impact || ""}
                            onChange={(e) => updateData({ structural_facilities_impact: e.target.value })}
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="+2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Brüt Alan Etkisi (örn: +1%)
                        </label>
                        <input
                            type="text"
                            value={data.structural_gross_area_impact || ""}
                            onChange={(e) => updateData({ structural_gross_area_impact: e.target.value })}
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="+1%"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Kullanım Durumu Etkisi (örn: +0.08%)
                        </label>
                        <input
                            type="text"
                            value={data.structural_usage_status_impact || ""}
                            onChange={(e) => updateData({ structural_usage_status_impact: e.target.value })}
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="+0.08%"
                        />
                    </div>
                </div>
            </div>

            {/* Demographics Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bölge Demografisi</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Evli Oranı (%)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={data.demographics_married_rate || ""}
                            onChange={(e) => updateData({ demographics_married_rate: parseFloat(e.target.value) || 0 })}
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Genç Nüfus Oranı (%)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={data.demographics_youth_rate || ""}
                            onChange={(e) => updateData({ demographics_youth_rate: parseFloat(e.target.value) || 0 })}
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="38"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Yüksek Öğrenim Oranı (%)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={data.demographics_higher_ed_rate || ""}
                            onChange={(e) => updateData({ demographics_higher_ed_rate: parseFloat(e.target.value) || 0 })}
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="19"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Seçim Bölgesi
                        </label>
                        <input
                            type="text"
                            value={data.demographics_election_district || ""}
                            onChange={(e) => updateData({ demographics_election_district: e.target.value })}
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Çankırı"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Kazanan Parti
                        </label>
                        <input
                            type="text"
                            value={data.demographics_election_party || ""}
                            onChange={(e) => updateData({ demographics_election_party: e.target.value })}
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="AK Parti"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Oy Oranı (%)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={data.demographics_election_percentage || ""}
                            onChange={(e) => updateData({ demographics_election_percentage: parseFloat(e.target.value) || 0 })}
                            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="54"
                        />
                    </div>
                </div>
            </div>

            {/* Nearby Places Manager */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Yakınlarda Neler Var?</h3>

                {/* Add New Place Form */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">İkon</label>
                        <select
                            value={newPlace.icon}
                            onChange={(e) => setNewPlace({ ...newPlace, icon: e.target.value })}
                            className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            {iconOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Mesafe (m)</label>
                        <input
                            type="number"
                            min="0"
                            value={newPlace.distance || ""}
                            onChange={(e) => setNewPlace({ ...newPlace, distance: parseInt(e.target.value) || 0 })}
                            className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="330"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">İsim</label>
                        <input
                            type="text"
                            value={newPlace.name}
                            onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
                            className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Basketbol Sahası"
                        />
                    </div>

                    <div className="flex items-end">
                        <button
                            type="button"
                            onClick={addNearbyPlace}
                            className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                        >
                            <Plus className="h-4 w-4" />
                            <span className="text-sm">Ekle</span>
                        </button>
                    </div>
                </div>

                {/* Places List */}
                <div className="space-y-2">
                    {(data.nearby_places || []).map((place, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                {iconOptions.find(opt => opt.value === place.icon)?.icon &&
                                    React.createElement(iconOptions.find(opt => opt.value === place.icon)!.icon, { className: "h-5 w-5 text-primary-600" })
                                }
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">{place.distance}m</p>
                                <p className="text-sm text-gray-600">{place.name}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeNearbyPlace(index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    ))}

                    {(!data.nearby_places || data.nearby_places.length === 0) && (
                        <p className="text-center text-sm text-gray-500 py-4">
                            Henüz yakın yer eklenmemiş. Yukarıdaki formu kullanarak ekleyebilirsiniz.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
