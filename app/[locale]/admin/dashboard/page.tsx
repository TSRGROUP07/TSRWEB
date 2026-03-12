"use client";

import { useState, useEffect } from "react";
import { Home, Video, Image as ImageIcon, Eye, TrendingUp, AlertCircle, FileText, Calendar, Clock, MessageSquare, Users, Globe, Menu } from "lucide-react";
import Link from "next/link";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { format } from "date-fns";

interface Stats {
  totalProperties: number;
  totalVideos: number;
  totalImages: number;
  totalBlogs: number;
  totalViews: number;
  totalMessages: number;
  unreadMessages: number;
  totalTeamMembers: number;
  totalPages: number;
  recentProperties: any[];
  recentBlogs: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProperties: 0,
    totalVideos: 0,
    totalImages: 0,
    totalBlogs: 0,
    totalViews: 0,
    totalMessages: 0,
    unreadMessages: 0,
    totalTeamMembers: 0,
    totalPages: 0,
    recentProperties: [],
    recentBlogs: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("admin_token");
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const [propertiesRes, videosRes, imagesRes, blogsRes, messagesRes, teamRes, pagesRes] = await Promise.all([
        fetch("/api/admin/properties", { headers }).catch(() => null),
        fetch("/api/admin/videos", { headers }).catch(() => null),
        fetch("/api/admin/images", { headers }).catch(() => null),
        fetch("/api/admin/blogs", { headers }).catch(() => null),
        fetch("/api/admin/messages", { headers }).catch(() => null),
        fetch("/api/admin/team", { headers }).catch(() => null),
        fetch("/api/admin/pages", { headers }).catch(() => null),
      ]);

      const properties = propertiesRes ? await propertiesRes.json() : [];
      const videos = videosRes ? await videosRes.json() : [];
      const images = imagesRes ? await imagesRes.json() : [];
      const blogs = blogsRes ? await blogsRes.json() : [];
      const messages = messagesRes ? await messagesRes.json() : [];
      const teamMembers = teamRes ? await teamRes.json() : [];
      const pages = pagesRes ? await pagesRes.json() : [];

      const unreadMessages = Array.isArray(messages) ? messages.filter((m: any) => !m.read).length : 0;

      // Son eklenen içerikler
      const recentProperties = Array.isArray(properties)
        ? properties
          .sort((a: any, b: any) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            if (isNaN(dateA)) return 1;
            if (isNaN(dateB)) return -1;
            return dateB - dateA;
          })
          .slice(0, 5)
        : [];

      const recentBlogs = Array.isArray(blogs)
        ? blogs
          .sort((a: any, b: any) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            if (isNaN(dateA)) return 1;
            if (isNaN(dateB)) return -1;
            return dateB - dateA;
          })
          .slice(0, 5)
        : [];

      // Grafik verisi oluştur (son 7 gün)
      const chartData = generateChartData(properties, blogs);

      setStats({
        totalProperties: Array.isArray(properties) ? properties.length : 0,
        totalVideos: Array.isArray(videos) ? videos.length : 0,
        totalImages: Array.isArray(images) ? images.length : 0,
        totalBlogs: Array.isArray(blogs) ? blogs.length : 0,
        totalViews: 0, // Gerçek uygulamada analytics'ten gelecek
        totalMessages: Array.isArray(messages) ? messages.length : 0,
        unreadMessages,
        totalTeamMembers: Array.isArray(teamMembers) ? teamMembers.length : 0,
        totalPages: Array.isArray(pages) ? pages.length : 0,
        recentProperties,
        recentBlogs,
      });
      setChartData(chartData);
    } catch (err) {
      setError("İstatistikler yüklenirken bir hata oluştu");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateChartData = (properties: any[], blogs: any[]) => {
    try {
      const days = 7;
      const data = [];

      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);

        // Tarihin geçerli olduğundan emin ol
        if (isNaN(date.getTime())) {
          continue;
        }

        let dateStr = `Gün ${days - i}`;
        try {
          if (!isNaN(date.getTime())) {
            const formatted = format(date, "dd MMM");
            if (formatted && formatted.trim()) {
              dateStr = formatted;
            }
          }
        } catch (error) {
          console.error("Tarih formatlama hatası:", error);
          // dateStr zaten fallback değere sahip
        }

        const propertyCount = properties ? properties.filter((p: any) => {
          if (!p || !p.createdAt) return false;
          try {
            const propDate = new Date(p.createdAt);
            return !isNaN(propDate.getTime()) && propDate.toDateString() === date.toDateString();
          } catch {
            return false;
          }
        }).length : 0;

        const blogCount = blogs ? blogs.filter((b: any) => {
          if (!b || !b.createdAt) return false;
          try {
            const blogDate = new Date(b.createdAt);
            return !isNaN(blogDate.getTime()) && blogDate.toDateString() === date.toDateString();
          } catch {
            return false;
          }
        }).length : 0;

        data.push({
          name: dateStr,
          İlanlar: propertyCount,
          Blog: blogCount,
        });
      }

      return data;
    } catch (error) {
      console.error("Chart data oluşturulurken hata:", error);
      return [];
    }
  };

  const statCards = [
    {
      title: "Toplam İlan",
      value: stats.totalProperties,
      icon: Home,
      color: "bg-blue-500",
      href: "/admin/ilanlar",
      change: "+12%",
    },
    {
      title: "Toplam Video",
      value: stats.totalVideos,
      icon: Video,
      color: "bg-purple-500",
      href: "/admin/videolar",
      change: "+5%",
    },
    {
      title: "Toplam Resim",
      value: stats.totalImages,
      icon: ImageIcon,
      color: "bg-green-500",
      href: "/admin/resimler",
      change: "+8%",
    },
    {
      title: "Toplam Blog",
      value: stats.totalBlogs,
      icon: FileText,
      color: "bg-indigo-500",
      href: "/admin/blog",
      change: "+15%",
    },
    {
      title: "Mesajlar",
      value: stats.totalMessages,
      icon: MessageSquare,
      color: "bg-yellow-500",
      href: "/admin/mesajlar",
      change: stats.unreadMessages > 0 ? `${stats.unreadMessages} okunmamış` : "Tümü okundu",
      badge: stats.unreadMessages > 0 ? stats.unreadMessages : undefined,
    },
    {
      title: "Ekip Üyeleri",
      value: stats.totalTeamMembers,
      icon: Users,
      color: "bg-pink-500",
      href: "/admin/ekip",
    },
    {
      title: "Sayfalar",
      value: stats.totalPages,
      icon: FileText,
      color: "bg-teal-500",
      href: "/admin/sayfalar",
    },
  ];

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
      {/* Page Header - Fixed at top */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Genel bakış ve istatistikler</p>
          </div>
          <button
            onClick={loadStats}
            className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
          >
            Yenile
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              href={stat.href}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow relative"
            >
              {stat.badge && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {stat.badge}
                </span>
              )}
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-600 text-sm">{stat.title}</p>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
                {stat.change && (
                  <span className={`text-sm font-semibold flex items-center ${stat.badge ? "text-red-600" : "text-green-600"
                    }`}>
                    {!stat.badge && <TrendingUp className="h-4 w-4 mr-1" />}
                    {stat.change}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Grafikler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Son 7 Gün İçerik Ekleme</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="İlanlar" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="Blog" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">İçerik Dağılımı</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { name: "İlanlar", value: stats.totalProperties },
              { name: "Videolar", value: stats.totalVideos },
              { name: "Resimler", value: stats.totalImages },
              { name: "Bloglar", value: stats.totalBlogs },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Son Eklenen İlanlar */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Son Eklenen İlanlar</h2>
            <Link
              href="/admin/ilanlar"
              className="text-sm hover:underline transition-colors"
              style={{ color: '#2e3c3a' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#3a4d4a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#2e3c3a';
              }}
            >
              Tümünü Gör
            </Link>
          </div>
          <div className="space-y-3">
            {!stats.recentProperties || stats.recentProperties.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm mb-4">Henüz ilan eklenmemiş</p>
                <Link
                  href="/admin/ilanlar/yeni"
                  className="inline-block px-4 py-2 text-white rounded-lg transition-colors text-sm"
                  style={{ backgroundColor: '#2e3c3a' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#3a4d4a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#2e3c3a';
                  }}
                >
                  İlk İlanı Ekle
                </Link>
              </div>
            ) : (
              (stats.recentProperties || []).map((property: any) => (
                <Link
                  key={property.id}
                  href={`/admin/ilanlar/${property.id}`}
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 truncate">{property.title}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {property.createdAt ? (() => {
                            try {
                              const date = new Date(property.createdAt);
                              if (isNaN(date.getTime())) return "Tarih yok";
                              return format(date, "dd MMM yyyy");
                            } catch (error) {
                              return "Tarih yok";
                            }
                          })() : "Tarih yok"}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${property.type === "Satılık" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                      }`}>
                      {property.type}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Son Eklenen Blog Yazıları */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Son Eklenen Blog Yazıları</h2>
            <Link
              href="/admin/blog"
              className="text-sm hover:underline transition-colors"
              style={{ color: '#2e3c3a' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#3a4d4a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#2e3c3a';
              }}
            >
              Tümünü Gör
            </Link>
          </div>
          <div className="space-y-3">
            {!stats.recentBlogs || stats.recentBlogs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm mb-4">Henüz blog yazısı eklenmemiş</p>
                <Link
                  href="/admin/blog/yeni"
                  className="inline-block px-4 py-2 text-white rounded-lg transition-colors text-sm"
                  style={{ backgroundColor: '#2e3c3a' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#3a4d4a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#2e3c3a';
                  }}
                >
                  İlk Blog Yazısını Ekle
                </Link>
              </div>
            ) : (
              (stats.recentBlogs || []).map((blog: any) => (
                <Link
                  key={blog.id}
                  href={`/admin/blog/${blog.id}`}
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 truncate">{blog.title}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {blog.createdAt ? (() => {
                            try {
                              const date = new Date(blog.createdAt);
                              if (isNaN(date.getTime())) return "Tarih yok";
                              return format(date, "dd MMM yyyy");
                            } catch (error) {
                              return "Tarih yok";
                            }
                          })() : "Tarih yok"}
                        </span>
                        {blog.published ? (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                            Yayında
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs">
                            Taslak
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Hızlı İşlemler */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/ilanlar/yeni"
            className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Home className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-gray-900">Yeni İlan Ekle</span>
          </Link>
          <Link
            href="/admin/blog/yeni"
            className="flex items-center space-x-3 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <FileText className="h-5 w-5 text-indigo-600" />
            <span className="font-medium text-gray-900">Yeni Blog Ekle</span>
          </Link>
          <Link
            href="/admin/videolar/yeni"
            className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <Video className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-gray-900">Video Yükle</span>
          </Link>
          <Link
            href="/admin/resimler"
            className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <ImageIcon className="h-5 w-5 text-green-600" />
            <span className="font-medium text-gray-900">Resim Yükle</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
