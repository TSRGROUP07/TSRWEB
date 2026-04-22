"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Upload, X, Settings, Users, Fuel, Tag, CreditCard } from "lucide-react";
import Link from "next/link";

export default function EditAracPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "economy",
    images: [] as string[],
    transmission: "manual",
    passengers: 5,
    fuel: "gasoline",
    price: 0,
    currency: "€",
    published: true,
  });

  useEffect(() => {
    if (id) {
      loadCar();
    }
  }, [id]);

  const loadCar = async () => {
    try {
      const response = await fetch(`/api/admin/cars/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        alert("Araç bilgileri yüklenemedi");
        router.push("/admin/arac-kiralama");
      }
    } catch (error) {
      console.error("Yükleme hatası:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    const files = Array.from(e.target.files);

    try {
      const { uploadToFirebaseStorage } = await import("@/lib/storage-upload");
      
      const uploadPromises = files.map(file => 
        uploadToFirebaseStorage(file, "uploads/cars", { optimize: true, type: "images" })
      );

      const results = await Promise.all(uploadPromises);
      const newUrls = results.map(r => r.url);

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newUrls]
      }));
      
    } catch (error: any) {
      console.error("Upload hatası:", error);
      alert(error.message || "Görsel yüklenirken hata oluştu");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      alert("Lütfen en az bir görsel yükleyin");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/cars/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Araç başarıyla güncellendi!");
        router.push("/admin/arac-kiralama");
      } else {
        const error = await response.json();
        alert(`Hata: ${error.details || "Araç güncellenemedi"}`);
      }
    } catch (error) {
      alert("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/arac-kiralama"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Aracı Düzenle</h1>
            <p className="text-gray-600 mt-1">{formData.name} bilgilerini güncelleyin</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Araç Adı (Marka/Model) *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Örn: Fiat Egea"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori *</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="economy">Ekonomik</option>
                    <option value="mid">Orta Segment</option>
                    <option value="luxury">Lüks</option>
                    <option value="suv">SUV</option>
                    <option value="minibus">Minibüs</option>
                    <option value="offroad">Arazi / Off-road</option>
                    <option value="motorcycle">Motosiklet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Vites Tipi *</label>
                <div className="relative">
                  <Settings className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={formData.transmission}
                    onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="manual">Manuel</option>
                    <option value="auto">Otomatik</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Yolcu Kapasitesi *</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    required
                    value={formData.passengers}
                    onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Yakıt Tipi *</label>
                <div className="relative">
                  <Fuel className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={formData.fuel}
                    onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="gasoline">Benzin</option>
                    <option value="diesel">Dizel</option>
                    <option value="electric">Elektrikli</option>
                    <option value="hybrid">Hibrit</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700">Araç Görselleri *</label>
              <span className="text-xs text-gray-500">{formData.images.length} görsel seçildi</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {formData.images.map((url, index) => (
                <div key={index} className="relative group aspect-video rounded-lg overflow-hidden border border-gray-200">
                  <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-primary-600 text-white text-[10px] py-0.5 text-center font-bold">
                      KAPAK
                    </div>
                  )}
                </div>
              ))}
              
              <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors bg-gray-50">
                <Upload className="h-6 w-6 text-gray-400 mb-1" />
                <span className="text-[10px] text-gray-600 font-medium">
                  {uploading ? "Yükleniyor..." : "Görsel Ekle"}
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500 italic">İlk yüklenen görsel kapak görseli olarak kullanılacaktır.</p>
          </div>
        </div>

        {/* Right Column - Pricing & Submit */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-2">Fiyatlandırma</h2>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Günlük Ücret *</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Para Birimi *</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="€">EUR (€)</option>
                <option value="$">USD ($)</option>
                <option value="₺">TRY (₺)</option>
                <option value="£">GBP (£)</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-2">Yayınlama</h2>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Durum</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-700">
                  {formData.published ? "Yayında" : "Taslak"}
                </span>
              </label>
            </div>

            <div className="pt-4 space-y-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 font-bold"
              >
                <Save className="h-5 w-5" />
                <span>{loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}</span>
              </button>
              <Link
                href="/admin/arac-kiralama"
                className="w-full inline-flex items-center justify-center px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                İptal
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
