"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, Search, Calendar, Tag } from "lucide-react";

interface Blog {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  image?: string;
  category: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const categories = [
    { value: "", label: "Tüm Kategoriler" },
    { value: "Haberler", label: "Haberler" },
    { value: "Faydalı Bilgiler", label: "Faydalı Bilgiler" },
  ];

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const response = await fetch("/api/admin/blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Bloglar yüklenemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu blog yazısını silmek istediğinize emin misiniz?")) return;

    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        loadBlogs();
        alert("Blog yazısı silindi!");
      } else {
        alert("Blog yazısı silinirken hata oluştu");
      }
    } catch (error) {
      alert("Bir hata oluştu");
    }
  };

  const handleTogglePublish = async (blog: Blog) => {
    try {
      const response = await fetch(`/api/admin/blogs/${blog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...blog,
          published: !blog.published,
        }),
      });

      if (response.ok) {
        loadBlogs();
        alert(`Blog yazısı ${!blog.published ? "yayınlandı" : "yayından kaldırıldı"}!`);
      } else {
        alert("Blog yazısı güncellenirken hata oluştu");
      }
    } catch (error) {
      alert("Bir hata oluştu");
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.excerpt && blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || blog.category === selectedCategory;
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
            <h1 className="text-3xl font-bold text-gray-900">Blog/Haber Yönetimi</h1>
            <p className="text-gray-600 mt-1">Tüm blog yazılarını ve haberleri yönetin</p>
          </div>
          <Link
            href="/admin/blog/yeni"
            className="inline-flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-md whitespace-nowrap"
          >
            <Plus className="h-5 w-5" />
            <span>Yeni Blog/Haber Ekle</span>
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
              placeholder="Blog yazısı ara..."
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

      {/* Blog List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {searchTerm || selectedCategory
              ? "Arama kriterlerinize uygun blog yazısı bulunamadı"
              : "Henüz blog yazısı eklenmemiş"}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Image */}
                  {blog.image && (
                    <div className="w-full md:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {blog.title}
                          </h3>
                          {!blog.published && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
                              Taslak
                            </span>
                          )}
                          {blog.published && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                              Yayında
                            </span>
                          )}
                        </div>
                        {blog.excerpt && (
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {blog.excerpt}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Tag className="h-4 w-4" />
                            <span>{blog.category}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(blog.createdAt).toLocaleDateString("tr-TR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link
                      href={`/blog/${blog.id}`}
                      target="_blank"
                      className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Görüntüle</span>
                    </Link>
                    <Link
                      href={`/admin/blog/${blog.id}`}
                      className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Düzenle</span>
                    </Link>
                    <button
                      onClick={() => handleTogglePublish(blog)}
                      className={`inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        blog.published
                          ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      <span>{blog.published ? "Yayından Kaldır" : "Yayınla"}</span>
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Sil</span>
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












