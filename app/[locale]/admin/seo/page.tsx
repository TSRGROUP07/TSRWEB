"use client";

import { useState, useEffect } from "react";
import { Save, Search, Globe, FileText } from "lucide-react";

interface SEOConfig {
  global: {
    siteName: string;
    siteDescription: string;
    siteKeywords: string;
    ogImage: string;
    twitterCard: string;
  };
  pages: Array<{
    path: string;
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
  }>;
}

export default function SEOPage() {
  const [seoConfig, setSeoConfig] = useState<SEOConfig>({
    global: {
      siteName: "TSR GROUP",
      siteDescription: "",
      siteKeywords: "",
      ogImage: "",
      twitterCard: "summary_large_image",
    },
    pages: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"global" | "pages">("global");

  useEffect(() => {
    loadSEO();
  }, []);

  const loadSEO = async () => {
    try {
      const response = await fetch("/api/admin/seo");
      if (response.ok) {
        const data = await response.json();
        setSeoConfig(data);
      }
    } catch (error) {
      console.error("SEO ayarları yüklenemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seoConfig),
      });

      if (response.ok) {
        alert("SEO ayarları başarıyla kaydedildi!");
      } else {
        alert("SEO ayarları kaydedilirken hata oluştu");
      }
    } catch (error) {
      alert("Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  const addPage = () => {
    setSeoConfig({
      ...seoConfig,
      pages: [
        ...seoConfig.pages,
        {
          path: "/yeni-sayfa",
          title: "",
          description: "",
          keywords: "",
          ogImage: "",
        },
      ],
    });
  };

  const updatePage = (index: number, field: string, value: string) => {
    const updatedPages = [...seoConfig.pages];
    updatedPages[index] = { ...updatedPages[index], [field]: value };
    setSeoConfig({ ...seoConfig, pages: updatedPages });
  };

  const removePage = (index: number) => {
    setSeoConfig({
      ...seoConfig,
      pages: seoConfig.pages.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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
            <h1 className="text-3xl font-bold text-gray-900">SEO Yönetimi</h1>
            <p className="text-gray-600 mt-1">SEO ayarlarını yönetin</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Save className="h-5 w-5" />
            <span>{saving ? "Kaydediliyor..." : "Kaydet"}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("global")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === "global"
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Globe className="h-4 w-4" />
            <span>Global SEO</span>
          </button>
          <button
            onClick={() => setActiveTab("pages")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === "pages"
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Sayfa SEO</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === "global" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Global SEO Ayarları</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Adı
              </label>
              <input
                type="text"
                value={seoConfig.global.siteName}
                onChange={(e) =>
                  setSeoConfig({
                    ...seoConfig,
                    global: { ...seoConfig.global, siteName: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Açıklaması
              </label>
              <textarea
                value={seoConfig.global.siteDescription}
                onChange={(e) =>
                  setSeoConfig({
                    ...seoConfig,
                    global: { ...seoConfig.global, siteDescription: e.target.value },
                  })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Site hakkında kısa açıklama (150-160 karakter önerilir)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Anahtar Kelimeleri
              </label>
              <input
                type="text"
                value={seoConfig.global.siteKeywords}
                onChange={(e) =>
                  setSeoConfig({
                    ...seoConfig,
                    global: { ...seoConfig.global, siteKeywords: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="kelime1, kelime2, kelime3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Open Graph Görseli
              </label>
              <input
                type="text"
                value={seoConfig.global.ogImage}
                onChange={(e) =>
                  setSeoConfig({
                    ...seoConfig,
                    global: { ...seoConfig.global, ogImage: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="/images/og-image.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twitter Card Tipi
              </label>
              <select
                value={seoConfig.global.twitterCard}
                onChange={(e) =>
                  setSeoConfig({
                    ...seoConfig,
                    global: { ...seoConfig.global, twitterCard: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="summary">Summary</option>
                <option value="summary_large_image">Summary Large Image</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === "pages" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Sayfa SEO Ayarları</h2>
              <button
                onClick={addPage}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>Yeni Sayfa Ekle</span>
              </button>
            </div>
            <div className="space-y-4">
              {seoConfig.pages.map((page, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg space-y-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Sayfa {index + 1}</h3>
                    <button
                      onClick={() => removePage(index)}
                      className="px-3 py-1 text-red-600 hover:text-red-700 text-sm"
                    >
                      Sil
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sayfa Yolu
                    </label>
                    <input
                      type="text"
                      value={page.path}
                      onChange={(e) => updatePage(index, "path", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="/sayfa-url"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sayfa Başlığı
                    </label>
                    <input
                      type="text"
                      value={page.title}
                      onChange={(e) => updatePage(index, "title", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Sayfa başlığı (50-60 karakter önerilir)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Açıklama
                    </label>
                    <textarea
                      value={page.description}
                      onChange={(e) => updatePage(index, "description", e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Sayfa açıklaması (150-160 karakter önerilir)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Anahtar Kelimeler
                    </label>
                    <input
                      type="text"
                      value={page.keywords}
                      onChange={(e) => updatePage(index, "keywords", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="kelime1, kelime2, kelime3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      OG Görsel
                    </label>
                    <input
                      type="text"
                      value={page.ogImage}
                      onChange={(e) => updatePage(index, "ogImage", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="/images/page-og-image.jpg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
