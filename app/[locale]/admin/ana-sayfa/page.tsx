"use client";

import { useState, useEffect } from "react";
import { Save, Image as ImageIcon, FileText, Users, BarChart3, Settings, Eye, Upload } from "lucide-react";
import Link from "next/link";

interface HomePageContent {
  hero: {
    videoUrl: string;
    title: string;
    subtitle1: string;
    subtitle2: string;
    searchPlaceholder: string;
  };
  about: {
    title: string;
    paragraphs: string[];
    imageUrl: string;
  };
  team: {
    title: string;
    subtitle: string;
    members: Array<{
      id: number;
      name: string;
      title: string;
      image: string;
    }>;
  };
  services: {
    title: string;
    description: string;
    imageUrl: string;
  };
  stats: {
    title: string;
    subtitle: string;
    items: Array<{
      key: string;
      value: string;
      label: string;
      image: string | null;
    }>;
  };
        features: {
          title: string;
          items: Array<{
            title: string;
            description: string;
            href: string;
            image: string;
          }>;
        };
        newsletter: {
          title: string;
          description: string;
          buttonText: string;
          placeholder: string;
        };
        banner: {
          enabled: boolean;
          title: string;
          description: string;
          buttonText: string;
          buttonLink: string;
        };
      }

export default function AnaSayfaPage() {
  const [content, setContent] = useState<HomePageContent>({
    hero: {
      videoUrl: "/TSR.mp4",
      title: "Mülkünüz İçin Doğru Strateji",
      subtitle1: "Güvenli Yönetim",
      subtitle2: "Sürdürülebilir Getiri",
      searchPlaceholder: "iletişim bilgilerinizi bırakın",
    },
    about: {
      title: "Şirket Hakkında",
      paragraphs: [
        "TSR GROUP sadece gayrimenkul satmaz.",
        "Biz yenilikçi ekosistemler oluşturuyoruz.",
        "Yönetiyoruz, analiz ediyoruz, tahmin ediyoruz.",
        "Ve müşterilere hiç kimsenin vermediğini veriyoruz.",
      ],
      imageUrl: "/ŞH.png",
    },
    team: {
      title: "Ekibimiz",
      subtitle: "Deneyimli ve profesyonel ekibimizle sizlere en iyi hizmeti sunuyoruz",
      members: [],
    },
    services: {
      title: "",
      description: "",
      imageUrl: "",
    },
    stats: {
      title: "Neden TSR GROUP'u seçmelisiniz?",
      subtitle: "Sektördeki deneyimimiz ve başarılarımızla fark yaratıyoruz",
      items: [],
    },
        features: {
          title: "",
          items: [],
        },
        newsletter: {
          title: "Haber Bültenine Abone Olun",
          description: "En yeni emlak fırsatları ve haberlerinden haberdar olun",
          buttonText: "Abone Ol",
          placeholder: "E-posta adresiniz",
        },
        banner: {
          enabled: true,
          title: "",
          description: "",
          buttonText: "",
          buttonLink: "",
        },
      });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      // Mevcut içerikleri yükle
      const response = await fetch("/api/admin/homepage-content");
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      } else {
        // Varsayılan içerikleri yükle
        await loadDefaultContent();
      }
    } catch (error) {
      console.error("İçerik yüklenemedi:", error);
      await loadDefaultContent();
    } finally {
      setLoading(false);
    }
  };

  const loadDefaultContent = async () => {
    // Team members'ı yükle
    const teamResponse = await fetch("/api/page-images/stats");
    if (teamResponse.ok) {
      const statsData = await teamResponse.json();
      setContent((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          items: statsData,
        },
      }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/homepage-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        alert("İçerik başarıyla kaydedildi!");
      } else {
        alert("İçerik kaydedilirken hata oluştu");
      }
    } catch (error) {
      alert("Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "hero", name: "Hero Video", icon: ImageIcon },
    { id: "about", name: "Hakkında", icon: FileText },
    { id: "team", name: "Ekip", icon: Users },
    { id: "services", name: "Hizmetler", icon: Settings },
    { id: "stats", name: "İstatistikler", icon: BarChart3 },
    { id: "features", name: "Özellikler", icon: Settings },
    { id: "newsletter", name: "Newsletter", icon: FileText },
    { id: "banner", name: "Banner", icon: ImageIcon },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#2e3c3a' }}></div>
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
            <h1 className="text-3xl font-bold text-gray-900">Ana Sayfa İçerik Yönetimi</h1>
            <p className="text-gray-600 mt-1">Ana sayfa içeriklerini düzenleyin</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span>Önizle</span>
            </Link>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center space-x-2 px-6 py-2 text-white rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#2e3c3a' }}
              onMouseEnter={(e) => {
                if (!saving) e.currentTarget.style.backgroundColor = '#3a4d4a';
              }}
              onMouseLeave={(e) => {
                if (!saving) e.currentTarget.style.backgroundColor = '#2e3c3a';
              }}
            >
              <Save className="h-5 w-5" />
              <span>{saving ? "Kaydediliyor..." : "Kaydet"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Forms */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Hero Section */}
        {activeTab === "hero" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Hero Video Bölümü</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL
              </label>
              <input
                type="text"
                value={content.hero.videoUrl}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, videoUrl: e.target.value },
                  })
                }
                placeholder="/TSR.mp4 veya YouTube URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Başlık
              </label>
              <input
                type="text"
                value={content.hero.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, title: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ana Başlık (Dönen Metin 1)
              </label>
              <input
                type="text"
                value={content.hero.subtitle1 || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, subtitle1: e.target.value },
                  })
                }
                placeholder="Güvenli Yönetim"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ana Başlık (Dönen Metin 2)
              </label>
              <input
                type="text"
                value={content.hero.subtitle2 || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, subtitle2: e.target.value },
                  })
                }
                placeholder="Sürdürülebilir Getiri"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Arama Placeholder Metni
              </label>
              <input
                type="text"
                value={content.hero.searchPlaceholder || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, searchPlaceholder: e.target.value },
                  })
                }
                placeholder="iletişim bilgilerinizi bırakın"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
          </div>
        )}

        {/* About Section */}
        {activeTab === "about" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Hakkında Bölümü</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Başlık
              </label>
              <input
                type="text"
                value={content.about.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    about: { ...content.about, title: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Görsel URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={content.about.imageUrl}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      about: { ...content.about, imageUrl: e.target.value },
                    })
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Link
                  href="/admin/resimler"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Görsel Seç
                </Link>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paragraflar (Her satır bir paragraf)
              </label>
              <textarea
                value={content.about.paragraphs.join("\n")}
                onChange={(e) =>
                  setContent({
                    ...content,
                    about: {
                      ...content.about,
                      paragraphs: e.target.value.split("\n").filter((p) => p.trim()),
                    },
                  })
                }
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
          </div>
        )}

        {/* Team Section */}
        {activeTab === "team" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Ekip Bölümü</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Başlık
              </label>
              <input
                type="text"
                value={content.team.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    team: { ...content.team, title: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alt Başlık
              </label>
              <input
                type="text"
                value={content.team.subtitle}
                onChange={(e) =>
                  setContent({
                    ...content,
                    team: { ...content.team, subtitle: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Ekip üyeleri şu anda sabit kodlanmış durumda. Ekip yönetimi için ayrı bir sayfa eklenebilir.
              </p>
              <Link
                href="/admin/ekip"
                className="inline-flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors"
                style={{ backgroundColor: '#2e3c3a' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#3a4d4a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2e3c3a';
                }}
              >
                <Users className="h-4 w-4" />
                <span>Ekip Yönetimi</span>
              </Link>
            </div>
          </div>
        )}

        {/* Services Section */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Hizmetler Bölümü</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Başlık
              </label>
              <input
                type="text"
                value={content.services.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    services: { ...content.services, title: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Açıklama
              </label>
              <textarea
                value={content.services.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    services: { ...content.services, description: e.target.value },
                  })
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Görsel URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={content.services.imageUrl}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      services: { ...content.services, imageUrl: e.target.value },
                    })
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Link
                  href="/admin/resimler"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Görsel Seç
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        {activeTab === "stats" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">İstatistikler Bölümü</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Başlık
              </label>
              <input
                type="text"
                value={content.stats.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    stats: { ...content.stats, title: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alt Başlık
              </label>
              <input
                type="text"
                value={content.stats.subtitle}
                onChange={(e) =>
                  setContent({
                    ...content,
                    stats: { ...content.stats, subtitle: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-4">
                İstatistik öğeleri resim yönetimi sayfasından yönetiliyor. Stats kategorisindeki görseller burada görüntülenir.
              </p>
              <Link
                href="/admin/resimler"
                className="inline-flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors"
                style={{ backgroundColor: '#2e3c3a' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#3a4d4a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2e3c3a';
                }}
              >
                <ImageIcon className="h-4 w-4" />
                <span>Resim Yönetimine Git</span>
              </Link>
            </div>
            {content.stats.items.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Mevcut İstatistikler</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.stats.items.map((stat, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="font-semibold">{stat.label}</div>
                      <div className="text-2xl font-bold" style={{ color: '#2e3c3a' }}>{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Features Section */}
        {activeTab === "features" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Özellikler Bölümü</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Başlık
              </label>
              <input
                type="text"
                value={content.features.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    features: { ...content.features, title: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Özellikler şu anda çeviri dosyalarından yönetiliyor. Özellik yönetimi için ayrı bir sayfa eklenebilir.
              </p>
            </div>
          </div>
        )}

        {/* Newsletter Section */}
        {activeTab === "newsletter" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Newsletter Bölümü</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Başlık
              </label>
              <input
                type="text"
                value={content.newsletter?.title || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    newsletter: { ...content.newsletter, title: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Açıklama
              </label>
              <textarea
                value={content.newsletter?.description || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    newsletter: { ...content.newsletter, description: e.target.value },
                  })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buton Metni
              </label>
              <input
                type="text"
                value={content.newsletter?.buttonText || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    newsletter: { ...content.newsletter, buttonText: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Placeholder Metni
              </label>
              <input
                type="text"
                value={content.newsletter?.placeholder || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    newsletter: { ...content.newsletter, placeholder: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
          </div>
        )}

        {/* Banner Section */}
        {activeTab === "banner" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Banner/Reklam Bölümü</h2>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Banner&apos;ı Aktif Et
                </label>
                <p className="text-xs text-gray-500">
                  Banner&apos;ın ana sayfada gösterilip gösterilmeyeceğini kontrol eder
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={content.banner?.enabled !== false}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      banner: { ...content.banner, enabled: e.target.checked },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2e3c3a]" style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties & { '--tw-ring-color'?: string }}></div>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner Başlık
              </label>
              <input
                type="text"
                value={content.banner?.title || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    banner: { ...content.banner, title: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner Açıklama
              </label>
              <textarea
                value={content.banner?.description || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    banner: { ...content.banner, description: e.target.value },
                  })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buton Metni
              </label>
              <input
                type="text"
                value={content.banner?.buttonText || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    banner: { ...content.banner, buttonText: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buton Link
              </label>
              <input
                type="text"
                value={content.banner?.buttonLink || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    banner: { ...content.banner, buttonLink: e.target.value },
                  })
                }
                placeholder="/sayfa-url"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#2e3c3a' } as React.CSSProperties}
              />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Banner görselleri Resim Yönetimi sayfasından &quot;Banner/Reklam&quot; kategorisi altından yönetilir.
              </p>
              <Link
                href="/admin/resimler?category=banner"
                className="inline-flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors"
                style={{ backgroundColor: '#2e3c3a' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#3a4d4a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2e3c3a';
                }}
              >
                <ImageIcon className="h-4 w-4" />
                <span>Banner Görsellerini Yönet</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
