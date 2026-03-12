"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, Edit, Eye, FileText, Search } from "lucide-react";
import Link from "next/link";

interface Page {
  id: string;
  path: string;
  title: string;
  content: string;
  metaDescription: string;
  metaKeywords: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function SayfalarPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const response = await fetch("/api/admin/pages");
      if (response.ok) {
        const data = await response.json();
        setPages(data);
      }
    } catch (error) {
      console.error("Sayfalar yüklenemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingPage) return;

    setSaving(true);
    try {
      const method = editingPage.id ? "PUT" : "POST";
      const url = editingPage.id
        ? `/api/admin/pages/${editingPage.id}`
        : "/api/admin/pages";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPage),
      });

      if (response.ok) {
        alert("Sayfa başarıyla kaydedildi!");
        loadPages();
        setEditingPage(null);
      } else {
        alert("Sayfa kaydedilirken hata oluştu");
      }
    } catch (error) {
      alert("Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu sayfayı silmek istediğinize emin misiniz?")) return;

    try {
      const response = await fetch(`/api/admin/pages/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        loadPages();
      } else {
        alert("Sayfa silinirken hata oluştu");
      }
    } catch (error) {
      alert("Bir hata oluştu");
    }
  };

  const handleAdd = () => {
    setEditingPage({
      id: "",
      path: "/yeni-sayfa",
      title: "",
      content: "",
      metaDescription: "",
      metaKeywords: "",
      published: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.path.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="text-3xl font-bold text-gray-900">Sayfa Yönetimi</h1>
            <p className="text-gray-600 mt-1">Tüm sayfaları yönetin</p>
          </div>
          <button
            onClick={handleAdd}
            className="inline-flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Yeni Sayfa Ekle</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Sayfa ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Edit Form */}
      {editingPage && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingPage.id ? "Sayfa Düzenle" : "Yeni Sayfa Ekle"}
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sayfa Yolu
                </label>
                <input
                  type="text"
                  value={editingPage.path}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, path: e.target.value })
                  }
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
                  value={editingPage.title}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İçerik
              </label>
              <textarea
                value={editingPage.content}
                onChange={(e) =>
                  setEditingPage({ ...editingPage, content: e.target.value })
                }
                rows={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Sayfa içeriği (HTML veya Markdown)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Açıklama
              </label>
              <textarea
                value={editingPage.metaDescription}
                onChange={(e) =>
                  setEditingPage({
                    ...editingPage,
                    metaDescription: e.target.value,
                  })
                }
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Anahtar Kelimeler
              </label>
              <input
                type="text"
                value={editingPage.metaKeywords}
                onChange={(e) =>
                  setEditingPage({ ...editingPage, metaKeywords: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="kelime1, kelime2, kelime3"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="published"
                checked={editingPage.published}
                onChange={(e) =>
                  setEditingPage({ ...editingPage, published: e.target.checked })
                }
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="published" className="text-sm font-medium text-gray-700">
                Yayınla
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <button
                onClick={() => setEditingPage(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {saving ? "Kaydediliyor..." : "Kaydet"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pages List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Sayfa Yolu
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Başlık
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
              {filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    {searchTerm ? "Sonuç bulunamadı" : "Henüz sayfa eklenmemiş"}
                  </td>
                </tr>
              ) : (
                filteredPages.map((page) => (
                  <tr key={page.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <code className="text-sm text-gray-600">{page.path}</code>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {page.title}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          page.published
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {page.published ? "Yayında" : "Taslak"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={page.path}
                          target="_blank"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Görüntüle"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => setEditingPage(page)}
                          className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Düzenle"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(page.id)}
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
    </div>
  );
}
