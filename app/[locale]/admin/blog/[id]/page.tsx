"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Upload } from "lucide-react";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";

export default function BlogEditPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [optimizeImages, setOptimizeImages] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    category: "Faydalı Bilgiler",
    published: true,
  });

  useEffect(() => {
    if (params.id) {
      loadBlog();
    }
  }, [params.id]);

  const loadBlog = async () => {
    try {
      const response = await fetch(`/api/admin/blogs/${params.id}`);
      const data = await response.json();
      setFormData({
        title: data.title || "",
        excerpt: data.excerpt || "",
        content: data.content || "",
        image: data.image || "",
        category: data.category || "Faydalı Bilgiler",
        published: data.published !== false,
      });
    } catch (error) {
      console.error("Blog yüklenemedi:", error);
      alert("Blog yüklenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    const file = e.target.files[0];

    try {
      // Firebase Storage'a direkt yükle
      const { uploadToFirebaseStorage } = await import("@/lib/storage-upload");
      
      const uploadResult = await uploadToFirebaseStorage(
        file,
        "uploads/blogs",
        {
          optimize: optimizeImages,
        }
      );

      setFormData({ ...formData, image: uploadResult.url });
      alert("Görsel yüklendi!");
    } catch (error: any) {
      console.error("Upload hatası:", error);
      alert(error.message || "Görsel yüklenirken hata oluştu");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/blogs/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Blog yazısı güncellendi!");
        router.push("/admin/blog");
      } else {
        alert("Blog yazısı güncellenirken hata oluştu");
      }
    } catch (error) {
      alert("Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

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
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog/Haber Düzenle</h1>
            <p className="text-gray-600 mt-1">Blog yazısını düzenleyin</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Başlık *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Blog yazısı başlığı"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Özet (Kısa Açıklama)
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Blog yazısının kısa özeti (ana sayfada görünecek)"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            İçerik *
          </label>
          <RichTextEditor
            content={formData.content}
            onChange={(content) => setFormData({ ...formData, content })}
            placeholder="Blog yazısının tam içeriğini buraya yazın..."
          />
          {!formData.content && (
            <p className="text-sm text-red-600 mt-1">İçerik gereklidir</p>
          )}
        </div>

        {/* Image */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-gray-700">
              Görsel
            </label>
            <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={optimizeImages}
                onChange={(e) => setOptimizeImages(e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span>Optimize et (WebP)</span>
            </label>
          </div>
          {formData.image ? (
            <div className="space-y-2">
              <img
                src={formData.image}
                alt="Preview"
                className="w-full max-w-md h-64 object-cover rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, image: "" })}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Görseli Kaldır
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">
                {uploading ? "Yükleniyor..." : "Görsel Yükle"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          )}
        </div>

        {/* Category and Published */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kategori *
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="Haberler">Haberler</option>
              <option value="Faydalı Bilgiler">Faydalı Bilgiler</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Durum
            </label>
            <select
              value={formData.published ? "published" : "draft"}
              onChange={(e) =>
                setFormData({ ...formData, published: e.target.value === "published" })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="published">Yayında</option>
              <option value="draft">Taslak</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
          <Link
            href="/admin/blog"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            İptal
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-5 w-5" />
            <span>{saving ? "Kaydediliyor..." : "Kaydet"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

