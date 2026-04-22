"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, Search, Settings, Users, Fuel } from "lucide-react";

interface Car {
  id: string;
  name: string;
  category: string;
  images: string[];
  transmission: string;
  passengers: number;
  fuel: string;
  price: number;
  currency: string;
  published: boolean;
  createdAt: string;
}

export default function AdminAracKiralamaPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const categories = [
    { value: "", label: "Tüm Kategoriler" },
    { value: "economy", label: "Ekonomik" },
    { value: "mid", label: "Orta Segment" },
    { value: "luxury", label: "Lüks" },
    { value: "suv", label: "SUV" },
    { value: "minibus", label: "Minibüs" },
    { value: "offroad", label: "Arazi / Off-road" },
    { value: "motorcycle", label: "Motosiklet" },
  ];

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      const response = await fetch("/api/admin/cars");
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Araçlar yüklenemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu aracı silmek istediğinize emin misiniz?")) return;

    try {
      const response = await fetch(`/api/admin/cars/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        loadCars();
        alert("Araç silindi!");
      } else {
        alert("Araç silinirken hata oluştu");
      }
    } catch (error) {
      alert("Bir hata oluştu");
    }
  };

  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || car.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Araç Kiralama Yönetimi</h1>
            <p className="text-gray-600 mt-1">Kiralık araç listesini yönetin</p>
          </div>
          <Link
            href="/admin/arac-kiralama/yeni"
            className="inline-flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-md whitespace-nowrap"
          >
            <Plus className="h-5 w-5" />
            <span>Yeni Araç Ekle</span>
          </Link>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Araç adı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Car List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredCars.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {searchTerm || selectedCategory
              ? "Arama kriterlerinize uygun araç bulunamadı"
              : "Henüz araç eklenmemiş"}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-gray-50"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-200">
                  {car.images && car.images.length > 0 ? (
                    <img
                      src={car.images[0]}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      Görsel Yok
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-800 shadow-sm">
                    {car.price} {car.currency} / Gün
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900 truncate">{car.name}</h3>
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-semibold">
                      {categories.find(c => c.value === car.category)?.label || car.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Settings className="h-4 w-4" />
                      <span>{car.transmission === 'auto' ? 'Otomatik' : 'Manuel'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{car.passengers} Kişi</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Fuel className="h-4 w-4" />
                      <span className="capitalize">{car.fuel}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Link
                      href={`/admin/arac-kiralama/${car.id}`}
                      className="flex-1 inline-flex items-center justify-center space-x-1 px-3 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors text-sm font-semibold"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Düzenle</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="inline-flex items-center justify-center p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      title="Sil"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
