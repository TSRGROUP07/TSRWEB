"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Trash2, Upload, Image as ImageIcon, Eye, Edit, X, Download } from "lucide-react";
import Image from "next/image";

interface Image {
  id: number;
  title: string;
  url: string;
  propertyId?: number;
  category?: string;
  statKey?: string;
  position?: string; // Banner için: "top", "middle", "bottom"
  link?: string; // Banner için link
  active?: boolean; // Banner için aktif/pasif
  description?: string; // Banner için açıklama
  beforeAfter?: string; // Services için: "before" veya "after"
  createdAt: string;
  metadata?: {
    width: number;
    height: number;
    size: number;
  };
  optimized?: boolean;
}

const statKeys = [
  { value: "projects", label: "Yönetilen Projeler" },
  { value: "realEstate", label: "Milyon $ Değerinde Emlak" },
  { value: "experience", label: "Yıl Deneyimi" },
  { value: "itPlatform", label: "Kendi IT Platformu" },
  { value: "support", label: "24/7 Kiracı Desteği" },
  { value: "occupancy", label: "Ortalama Doluluk" },
];

export default function ResimlerPage() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatKey, setSelectedStatKey] = useState<string>("");
  const [selectedBeforeAfter, setSelectedBeforeAfter] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<Image | null>(null);
  const [editingImage, setEditingImage] = useState<Image | null>(null);

  const categories = [
    {
      value: "",
      label: "Tümü",
      description: "Tüm kategorileri göster"
    },
    {
      value: "about",
      label: "Hakkında Bölümü",
      description: "Ana sayfada 'Şirket Hakkında' bölümünde sol tarafta kişi fotoğrafı olarak görünür. En son yüklenen görsel kullanılır."
    },
    {
      value: "blog",
      label: "Blog/Haber Kartları",
      description: "Ana sayfada 'Blog/Haber Kartları' bölümünde kart görselleri olarak görünür. Birden fazla görsel yüklenebilir (maksimum 6 adet gösterilir)."
    },
    {
      value: "newsletter",
      label: "Newsletter Bölümü",
      description: "Ana sayfada 'Newsletter' bölümünde sağ tarafta arka plan görseli olarak görünür. En son yüklenen görsel kullanılır."
    },
    {
      value: "stats",
      label: "Neden TSR GROUP Bölümü",
      description: "Ana sayfada 'Neden TSR GROUP'u seçmelisiniz?' bölümünde 6 panel görseli olarak görünür. Her panel için farklı görsel yüklenebilir."
    },
    {
      value: "services",
      label: "Villa Finans - Eski/Yeni Karşılaştırma",
      description: "/yatirim/villa-finans sayfasında eski-yeni karşılaştırmalı slider olarak görünür. Format 3:2 olmalı. Önce 'ESKİ' görseli, sonra 'YENİ' görseli yükleyin. Sadece 1 ev için."
    },
    {
      value: "property",
      label: "Emlak İlanları",
      description: "Emlak ilanlarında kullanılır. İlan detay sayfalarında görüntülenir."
    },
    {
      value: "banner",
      label: "Banner/Reklam",
      description: "Ana sayfada farklı bölümler arasında gösterilen banner'lar. Pozisyon seçimi: top (üst), middle (orta), bottom (alt)."
    },
    {
      value: "general",
      label: "Genel",
      description: "Genel amaçlı görseller. Şu anda özel bir yerde kullanılmaz."
    },
  ];

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/admin/images", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await response.json();
      setImages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Resimler yüklenemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  const [optimizeImages, setOptimizeImages] = useState(true);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    const file = e.target.files[0];

    try {
      // Firebase Storage'a direkt yükle (4MB limiti yok - 100MB'a kadar)
      const { uploadToFirebaseStorage } = await import("@/lib/storage-upload");

      const uploadResult = await uploadToFirebaseStorage(
        file,
        "uploads/images",
        {
          optimize: optimizeImages,
          onProgress: (progress) => {
            console.log(`Yükleme ilerlemesi: ${progress.toFixed(0)}%`);
          },
        }
      );

      // Resmi Firestore'a kaydet
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/admin/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          title: file.name,
          url: uploadResult.url,
          thumbnailUrl: uploadResult.thumbnailUrl || null,
          category: selectedCategory || "general",
          statKey: selectedCategory === "stats" ? selectedStatKey : undefined,
          beforeAfter: selectedCategory === "services" ? selectedBeforeAfter || undefined : undefined,
          metadata: uploadResult.metadata || null,
          optimized: optimizeImages,
        }),
      });

      if (response.ok) {
        loadImages();
        setSelectedCategory("");
        setSelectedStatKey("");
        setSelectedBeforeAfter("");
        alert(`Resim yüklendi!${optimizeImages ? " (Firebase Storage'a yüklendi)" : ""}`);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Resim kaydedilirken hata oluştu");
      }
    } catch (error: any) {
      console.error("Upload hatası:", error);
      // CORS hatası varsa, server-side upload'a fallback
      if (error.message?.includes("CORS") || error.message?.includes("cors")) {
        console.log("CORS hatası, server-side upload deneniyor...");
        // Server-side upload'a fallback (4MB limiti var)
        const maxSize = 4 * 1024 * 1024; // 4MB
        if (file.size > maxSize) {
          alert(`Dosya çok büyük. Maksimum boyut: 4MB. Mevcut: ${(file.size / 1024 / 1024).toFixed(2)}MB\n\nNot: Firebase Storage CORS ayarlarını yapılandırın (FIREBASE_STORAGE_CORS.md dosyasına bakın).`);
        } else {
          // Server-side upload dene
          const formData = new FormData();
          formData.append("file", file);
          formData.append("type", "images");
          formData.append("optimize", optimizeImages.toString());

          const token = localStorage.getItem("admin_token");
          const uploadResponse = await fetch("/api/admin/upload", {
            method: "POST",
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            body: formData,
          });

          const uploadData = await uploadResponse.json();
          if (uploadResponse.ok) {
            await fetch("/api/admin/images", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {})
              },
              body: JSON.stringify({
                title: file.name,
                url: uploadData.url,
                thumbnailUrl: uploadData.thumbnailUrl || null,
                category: selectedCategory || "general",
                statKey: selectedCategory === "stats" ? selectedStatKey : undefined,
                beforeAfter: selectedCategory === "services" ? selectedBeforeAfter || undefined : undefined,
                metadata: uploadData.metadata || null,
                optimized: uploadData.optimized || false,
              }),
            });
            loadImages();
            setSelectedCategory("");
            setSelectedStatKey("");
            setSelectedBeforeAfter("");
            alert(`Resim yüklendi! (Server-side upload)`);
          } else {
            alert(uploadData.error || "Resim yüklenirken hata oluştu");
          }
        }
      } else {
        alert(error.message || "Resim yüklenirken hata oluştu");
      }
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Header - Fixed at top */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resim Yönetimi</h1>
            <p className="text-gray-600 mt-1">Tüm resimleri yönetin</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex flex-col flex-1">
                <label className="text-sm font-semibold text-gray-700 mb-1">
                  📍 Görsel Nerede Görünecek? (Kategori Seçin)
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                {selectedCategory === "stats" && (
                  <div className="mt-2">
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">
                      📌 Hangi Panel Görseli?
                    </label>
                    <select
                      value={selectedStatKey}
                      onChange={(e) => setSelectedStatKey(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                    >
                      <option value="">Panel Seçin</option>
                      {statKeys.map((stat) => (
                        <option key={stat.value} value={stat.value}>
                          {stat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {selectedCategory === "services" && (
                  <div className="mt-2">
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">
                      📌 Eski/Yeni Görsel Seçimi
                    </label>
                    <select
                      value={selectedBeforeAfter}
                      onChange={(e) => setSelectedBeforeAfter(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                    >
                      <option value="">Normal Görsel (Eski/Yeni değil)</option>
                      <option value="before">ESKİ (Before)</option>
                      <option value="after">YENİ (After)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      💡 Eski-Yeni karşılaştırması için: Önce &quot;ESKİ&quot; görseli, sonra &quot;YENİ&quot; görseli yükleyin. Format 3:2 olmalı.
                    </p>
                  </div>
                )}
                {selectedCategory && (
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>ℹ️ Açıklama:</strong> {categories.find(c => c.value === selectedCategory)?.description}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={optimizeImages}
                    onChange={(e) => setOptimizeImages(e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span>Görseli optimize et (WebP, resize, compression)</span>
                </label>
                <label className="inline-flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors cursor-pointer shadow-md whitespace-nowrap">
                  <Upload className="h-5 w-5" />
                  <span>{uploading ? "Yükleniyor..." : "Resim Yükle"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploading || !selectedCategory || (selectedCategory === "stats" && !selectedStatKey)}
                  />
                </label>
              </div>
            </div>
            {!selectedCategory && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ <strong>Uyarı:</strong> Lütfen önce görselin nerede görüneceğini seçmek için bir kategori seçin!
                </p>
              </div>
            )}
            {selectedCategory === "stats" && !selectedStatKey && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ <strong>Uyarı:</strong> Stats kategorisi için lütfen hangi panel görseli olduğunu seçin!
                </p>
              </div>
            )}
            {optimizeImages && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  ✅ <strong>Optimizasyon Aktif:</strong> Görseller otomatik olarak WebP formatına dönüştürülecek, boyutlandırılacak ve sıkıştırılacak. Bu, sayfa yükleme hızını artırır.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Kategori Açıklamaları */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📋 Kategori Açıklamaları</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.filter(c => c.value !== "").map((cat) => (
            <div key={cat.value} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">{cat.label}</h3>
              <p className="text-sm text-gray-600">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Görseller Grid */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Yüklenen Görseller</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {images.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              Henüz resim eklenmemiş
            </div>
          ) : (
            images.map((image) => {
              const categoryInfo = categories.find((c) => c.value === image.category);
              return (
                <div
                  key={image.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden group relative border-2 border-transparent hover:border-primary-300 transition-colors"
                >
                  <div className="aspect-square bg-gray-200 relative">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => setPreviewImage(image)}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        title="Önizle"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingImage(image)}
                        className="p-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                        title="Düzenle"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm("Bu resmi silmek istediğinize emin misiniz?")) {
                            try {
                              const token = localStorage.getItem("admin_token");
                              const response = await fetch(`/api/admin/images?id=${image.id}`, {
                                method: "DELETE",
                                headers: token ? { Authorization: `Bearer ${token}` } : {},
                              });
                              if (response.ok) {
                                loadImages();
                                alert("Resim silindi!");
                              }
                            } catch (error) {
                              alert("Resim silinirken hata oluştu");
                            }
                          }
                        }}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    {/* Kategori Badge */}
                    {image.category && (
                      <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                        {categoryInfo?.label || image.category}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-600 truncate mb-1">{image.title}</p>
                    {image.category && categoryInfo && (
                      <div className="mt-2">
                        <p className="text-xs font-semibold text-primary-600 mb-1">
                          📍 {categoryInfo.label}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {categoryInfo.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">{previewImage.title}</h3>
              <div className="flex gap-2">
                <a
                  href={previewImage.url}
                  download
                  className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  title="İndir"
                >
                  <Download className="h-5 w-5" />
                </a>
                <button
                  onClick={() => setPreviewImage(null)}
                  className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                <Image
                  src={previewImage.url}
                  alt={previewImage.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Kategori:</span>{" "}
                  {categories.find((c) => c.value === previewImage.category)?.label || "Genel"}
                </div>
                {previewImage.metadata && (
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">Boyut:</span>{" "}
                      {previewImage.metadata.width} x {previewImage.metadata.height}px
                    </div>
                    <div>
                      <span className="font-semibold">Dosya Boyutu:</span>{" "}
                      {(previewImage.metadata.size / 1024).toFixed(2)} KB
                    </div>
                  </div>
                )}
                {previewImage.optimized && (
                  <div className="text-green-600 font-semibold">✓ WebP formatında optimize edilmiş</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Resmi Düzenle</h3>
              <button
                onClick={() => setEditingImage(null)}
                className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const token = localStorage.getItem("admin_token");
                  const response = await fetch(`/api/admin/images?id=${editingImage.id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      ...(token ? { Authorization: `Bearer ${token}` } : {})
                    },
                    body: JSON.stringify({
                      title: editingImage.title,
                      category: editingImage.category,
                      position: editingImage.position,
                      link: editingImage.link,
                      active: editingImage.active,
                      description: editingImage.description,
                      beforeAfter: editingImage.beforeAfter,
                    }),
                  });
                  if (response.ok) {
                    loadImages();
                    setEditingImage(null);
                    alert("Resim güncellendi!");
                  }
                } catch (error) {
                  alert("Resim güncellenirken hata oluştu");
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Başlık
                </label>
                <input
                  type="text"
                  value={editingImage.title}
                  onChange={(e) =>
                    setEditingImage({ ...editingImage, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  value={editingImage.category}
                  onChange={(e) =>
                    setEditingImage({ ...editingImage, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {categories
                    .filter((c) => c.value !== "")
                    .map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                </select>
              </div>

              {/* Banner özel alanları */}
              {editingImage.category === "banner" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pozisyon
                    </label>
                    <select
                      value={editingImage.position || "middle"}
                      onChange={(e) =>
                        setEditingImage({ ...editingImage, position: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="top">Üst (Featured Properties altı)</option>
                      <option value="middle">Orta (Bölümler arası)</option>
                      <option value="bottom">Alt (Stats altı)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link (Opsiyonel)
                    </label>
                    <input
                      type="text"
                      value={editingImage.link || ""}
                      onChange={(e) =>
                        setEditingImage({ ...editingImage, link: e.target.value })
                      }
                      placeholder="https://example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Açıklama (Opsiyonel)
                    </label>
                    <textarea
                      value={editingImage.description || ""}
                      onChange={(e) =>
                        setEditingImage({ ...editingImage, description: e.target.value })
                      }
                      placeholder="Banner açıklaması"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="active"
                      checked={editingImage.active !== false}
                      onChange={(e) =>
                        setEditingImage({ ...editingImage, active: e.target.checked })
                      }
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label htmlFor="active" className="text-sm font-medium text-gray-700">
                      Aktif (Göster)
                    </label>
                  </div>
                </>
              )}

              {/* Services özel alanları */}
              {editingImage.category === "services" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Eski/Yeni Görsel
                  </label>
                  <select
                    value={editingImage.beforeAfter || ""}
                    onChange={(e) =>
                      setEditingImage({ ...editingImage, beforeAfter: e.target.value || undefined })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Normal Görsel (Eski/Yeni değil)</option>
                    <option value="before">ESKİ (Before)</option>
                    <option value="after">YENİ (After)</option>
                  </select>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setEditingImage(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

