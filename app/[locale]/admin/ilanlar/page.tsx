"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, Search, CheckSquare, Square, Download, Upload, RefreshCw } from "lucide-react";

interface Property {
  id: number | string; // Firestore ID'leri string olabilir
  title: string;
  location: string;
  price: number;
  area: number;
  rooms: number;
  bathrooms: number;
  type: string;
  verified: boolean;
  currency?: any;
  createdAt: string;
}

export default function IlanlarPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<(number | string)[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      console.log("📋 İlanlar yükleniyor...");
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/properties?t=${Date.now()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await response.json();
      console.log(`✅ ${data.length} ilan yüklendi`);
      setProperties(data);

      if (data.length === 0) {
        console.warn("⚠️ Hiç ilan bulunamadı. Supabase bağlantısını kontrol edin.");
      }
    } catch (error: any) {
      console.error("❌ İlanlar yüklenemedi:", error);
      alert(`İlanlar yüklenemedi: ${error.message || 'Bilinmeyen hata'}`);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number | string) => {
    if (!confirm("Bu ilanı silmek istediğinize emin misiniz?")) return;

    try {
      console.log(`🗑️ İlan siliniyor: ${id}`);
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/properties/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        console.log(`✅ İlan başarıyla silindi: ${id}`);
        loadProperties();
        setSelectedIds([]);
        alert("İlan başarıyla silindi");
      } else {
        const errorMessage = data.error || data.message || "İlan silinirken hata oluştu";
        console.error(`❌ İlan silme hatası:`, { id, error: errorMessage, status: response.status });
        alert(`İlan silinemedi: ${errorMessage}`);
      }
    } catch (error: any) {
      console.error(`❌ İlan silme exception:`, error);
      alert(`Bir hata oluştu: ${error.message || 'Bilinmeyen hata'}`);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`${selectedIds.length} ilanı silmek istediğinize emin misiniz?`)) return;

    try {
      const token = localStorage.getItem("admin_token");
      const promises = selectedIds.map((id) =>
        fetch(`/api/admin/properties/${id}`, {
          method: "DELETE",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
      );
      await Promise.all(promises);
      loadProperties();
      setSelectedIds([]);
      setSelectAll(false);
      alert(`${selectedIds.length} ilan başarıyla silindi`);
    } catch (error) {
      alert("Toplu silme işlemi sırasında hata oluştu");
    }
  };

  const handleImportProperties = async () => {
    if (!confirm("Bu işlem mevcut 3 örnek ilanı silecek ve tüm daireleri sisteme yükleyecek. Devam etmek istiyor musunuz?")) return;

    setImporting(true);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/admin/import-properties", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const result = await response.json();

      if (response.ok && result.success !== false) {
        let message = `✅ ${result.message}\n\n`;
        message += `📤 İçe Aktarılan: ${result.results.imported.length}\n`;
        message += `🗑️ Silinen: ${result.results.deleted.length}\n`;

        if (result.results.errors.length > 0) {
          message += `\n⚠️ Hatalar (${result.results.errors.length}):\n`;
          // İlk 10 hatayı göster
          const errorsToShow = result.results.errors.slice(0, 10);
          errorsToShow.forEach((err: string, idx: number) => {
            message += `\n${idx + 1}. ${err.substring(0, 100)}${err.length > 100 ? '...' : ''}`;
          });
          if (result.results.errors.length > 10) {
            message += `\n... ve ${result.results.errors.length - 10} hata daha`;
          }
          console.error("❌ TÜM HATALAR:", result.results.errors);
          console.error("❌ HATA DETAYLARI:", JSON.stringify(result.results.errors, null, 2));
        }

        alert(message);
        loadProperties();
      } else {
        let errorMsg = `❌ Hata: ${result.error || "Bilinmeyen hata"}`;
        if (result.details) {
          errorMsg += `\n\nDetaylar: ${result.details}`;
        }
        if (result.results?.errors?.length > 0) {
          errorMsg += `\n\nİlk 10 hata:\n`;
          result.results.errors.slice(0, 10).forEach((err: string, idx: number) => {
            errorMsg += `\n${idx + 1}. ${err.substring(0, 100)}${err.length > 100 ? '...' : ''}`;
          });
          console.error("❌ TÜM HATALAR:", result.results.errors);
          console.error("❌ HATA DETAYLARI:", JSON.stringify(result.results.errors, null, 2));
        }
        if (result.stack) {
          console.error("❌ STACK TRACE:", result.stack);
        }
        alert(errorMsg);
      }
    } catch (error: any) {
      alert(`❌ İçe aktarma sırasında hata oluştu: ${error.message}\n\nLütfen tarayıcı console'unu (F12) kontrol edin.`);
      console.error("İçe aktarma hatası:", error);
    } finally {
      setImporting(false);
    }
  };

  const handleDeleteAll = async () => {
    if (filteredProperties.length === 0) return;

    const confirmMessage = `TÜM ${filteredProperties.length} İLANI SİLMEK İSTEDİĞİNİZE EMİN MİSİNİZ?\n\nBu işlem geri alınamaz!`;
    if (!confirm(confirmMessage)) return;

    // İkinci onay
    if (!confirm("Son bir kez daha onaylıyor musunuz? TÜM İLANLAR SİLİNECEK!")) return;

    try {
      const token = localStorage.getItem("admin_token");
      const allIds = filteredProperties.map((p) => p.id);
      const promises = allIds.map((id) =>
        fetch(`/api/admin/properties/${id}`, {
          method: "DELETE",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
      );
      await Promise.all(promises);
      loadProperties();
      setSelectedIds([]);
      setSelectAll(false);
      alert(`Tüm ${allIds.length} ilan başarıyla silindi`);
    } catch (error) {
      alert("Tüm ilanları silme işlemi sırasında hata oluştu");
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProperties.map((p) => p.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectOne = (id: number | string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
    setSelectAll(false);
  };

  const handleExport = () => {
    const data = filteredProperties.map((prop) => ({
      Başlık: prop.title,
      Konum: prop.location,
      Fiyat: prop.price,
      Metrekare: prop.area,
      Oda: prop.rooms,
      Banyo: prop.bathrooms,
      Tip: prop.type,
      Durum: prop.verified ? "Doğrulanmış" : "Doğrulanmamış",
    }));

    const csv = [
      Object.keys(data[0]).join(","),
      ...data.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `ilanlar-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const filteredProperties = properties.filter(
    (prop) =>
      prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      {/* Page Header - Fixed at top */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">İlan Yönetimi</h1>
            <p className="text-gray-600 mt-1">Tüm emlak ilanlarını yönetin</p>
          </div>
          <Link
            href="/admin/ilanlar/yeni"
            className="inline-flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-md whitespace-nowrap"
          >
            <Plus className="h-5 w-5" />
            <span>Yeni İlan Ekle</span>
          </Link>
        </div>
      </div>

      {/* Search Bar and Bulk Actions */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="İlan ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleImportProperties}
              disabled={importing}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              title="Klasörlerdeki tüm daireleri sisteme yükle"
            >
              <RefreshCw className={`h-4 w-4 ${importing ? "animate-spin" : ""}`} />
              <span>{importing ? "İçe Aktarılıyor..." : "İlanları İçe Aktar"}</span>
            </button>
            <button
              onClick={handleExport}
              disabled={filteredProperties.length === 0}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4" />
              <span>Dışa Aktar</span>
            </button>
            {filteredProperties.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                title="Tüm ilanları sil (Örnek daireleri temizlemek için)"
              >
                <Trash2 className="h-4 w-4" />
                <span>Tümünü Sil ({filteredProperties.length})</span>
              </button>
            )}
          </div>
        </div>
        {selectedIds.length > 0 && (
          <div className="mt-4 pt-4 border-t flex items-center justify-between">
            <span className="text-sm text-gray-600">
              <span className="font-semibold">{selectedIds.length}</span> ilan seçildi
            </span>
            <button
              onClick={handleBulkDelete}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Seçilenleri Sil</span>
            </button>
          </div>
        )}
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-12">
                  <button
                    onClick={handleSelectAll}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    {selectAll ? (
                      <CheckSquare className="h-5 w-5 text-primary-600" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Başlık
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Konum
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Fiyat
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Oda
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Durum
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    {searchTerm ? (
                      <div>
                        <p className="mb-2">Sonuç bulunamadı</p>
                        <button
                          onClick={() => setSearchTerm("")}
                          className="text-primary-600 hover:text-primary-700"
                        >
                          Aramayı temizle
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="mb-4">Henüz ilan eklenmemiş</p>
                        <Link
                          href="/admin/ilanlar/yeni"
                          className="inline-flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          <span>İlk İlanı Ekle</span>
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                filteredProperties.map((property) => (
                  <tr
                    key={property.id}
                    className={`border-b hover:bg-gray-50 transition-colors ${selectedIds.includes(property.id) ? "bg-blue-50" : ""
                      }`}
                  >
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleSelectOne(property.id)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        {selectedIds.includes(property.id) ? (
                          <CheckSquare className="h-5 w-5 text-primary-600" />
                        ) : (
                          <Square className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{property.title}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {property.location}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">
                        {new Intl.NumberFormat("tr-TR", {
                          style: "currency",
                          currency: property.currency || "EUR",
                          maximumFractionDigits: 0,
                        }).format(property.price)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{property.rooms}+1</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${property.type === "Satılık"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                          }`}
                      >
                        {property.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/emlak/${property.id}`}
                          target="_blank"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Görüntüle"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/ilanlar/${property.id}`}
                          className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Düzenle"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Sil"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      {filteredProperties.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">
            Toplam <span className="font-semibold">{filteredProperties.length}</span> ilan gösteriliyor
            {searchTerm && ` (${properties.length} toplam)`}
          </p>
        </div>
      )}
    </div>
  );
}
