"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, GripVertical, ArrowUp, ArrowDown } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  href: string;
  order: number;
  visible: boolean;
}

interface MenuConfig {
  header: MenuItem[];
  footer: {
    quickLinks: MenuItem[];
    services: MenuItem[];
  };
}

export default function MenuPage() {
  const [menuConfig, setMenuConfig] = useState<MenuConfig>({
    header: [],
    footer: {
      quickLinks: [],
      services: [],
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const response = await fetch("/api/admin/menu");
      if (response.ok) {
        const data = await response.json();
        setMenuConfig(data);
      } else {
        // Varsayılan menü
        setMenuConfig({
          header: [
            { id: "1", name: "Portföy", href: "/emlak", order: 1, visible: true },
            { id: "2", name: "Kurumsal", href: "/belgeler", order: 2, visible: true },
            { id: "3", name: "Keşfet", href: "/yatirim", order: 3, visible: true },
            { id: "4", name: "Hizmetler", href: "/hesaplayici", order: 4, visible: true },
            { id: "5", name: "İletişim", href: "/#iletisim", order: 5, visible: true },
          ],
          footer: {
            quickLinks: [
              { id: "f1", name: "Emlak İlanları", href: "/emlak", order: 1, visible: true },
              { id: "f2", name: "Yatırım Danışmanlığı", href: "/yatirim", order: 2, visible: true },
              { id: "f3", name: "Hesaplayıcılar", href: "/hesaplayici", order: 3, visible: true },
              { id: "f4", name: "Bina Yönetimi", href: "/bina-yonetimi", order: 4, visible: true },
            ],
            services: [
              { id: "s1", name: "Fiyat Analizi", href: "/fiyat-analizi", order: 1, visible: true },
              { id: "s2", name: "Daire Karşılaştırma", href: "/karsilastirma", order: 2, visible: true },
              { id: "s3", name: "Online Ödeme", href: "/odeme", order: 3, visible: true },
              { id: "s4", name: "Şirket Belgeleri", href: "/belgeler", order: 4, visible: true },
            ],
          },
        });
      }
    } catch (error) {
      console.error("Menü yüklenemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menuConfig),
      });

      if (response.ok) {
        alert("Menü başarıyla kaydedildi!");
      } else {
        alert("Menü kaydedilirken hata oluştu");
      }
    } catch (error) {
      alert("Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  const addMenuItem = (section: "header" | "quickLinks" | "services") => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: "Yeni Menü Öğesi",
      href: "/",
      order: 999,
      visible: true,
    };

    if (section === "header") {
      setMenuConfig({
        ...menuConfig,
        header: [...menuConfig.header, newItem],
      });
    } else {
      setMenuConfig({
        ...menuConfig,
        footer: {
          ...menuConfig.footer,
          [section]: [...menuConfig.footer[section], newItem],
        },
      });
    }
  };

  const removeMenuItem = (section: "header" | "quickLinks" | "services", id: string) => {
    if (section === "header") {
      setMenuConfig({
        ...menuConfig,
        header: menuConfig.header.filter((item) => item.id !== id),
      });
    } else {
      setMenuConfig({
        ...menuConfig,
        footer: {
          ...menuConfig.footer,
          [section]: menuConfig.footer[section].filter((item) => item.id !== id),
        },
      });
    }
  };

  const updateMenuItem = (
    section: "header" | "quickLinks" | "services",
    id: string,
    field: keyof MenuItem,
    value: any
  ) => {
    if (section === "header") {
      setMenuConfig({
        ...menuConfig,
        header: menuConfig.header.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      });
    } else {
      setMenuConfig({
        ...menuConfig,
        footer: {
          ...menuConfig.footer,
          [section]: menuConfig.footer[section].map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          ),
        },
      });
    }
  };

  const moveItem = (
    section: "header" | "quickLinks" | "services",
    id: string,
    direction: "up" | "down"
  ) => {
    let items: MenuItem[];
    if (section === "header") {
      items = [...menuConfig.header];
    } else {
      items = [...menuConfig.footer[section]];
    }

    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return;

    if (direction === "up" && index > 0) {
      [items[index], items[index - 1]] = [items[index - 1], items[index]];
    } else if (direction === "down" && index < items.length - 1) {
      [items[index], items[index + 1]] = [items[index + 1], items[index]];
    }

    // Order'ları güncelle
    items.forEach((item, idx) => {
      item.order = idx + 1;
    });

    if (section === "header") {
      setMenuConfig({ ...menuConfig, header: items });
    } else {
      setMenuConfig({
        ...menuConfig,
        footer: { ...menuConfig.footer, [section]: items },
      });
    }
  };

  const renderMenuItem = (
    item: MenuItem,
    section: "header" | "quickLinks" | "services",
    index: number
  ) => {
    return (
      <div
        key={item.id}
        className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200"
      >
        <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
        <div className="flex-1 grid grid-cols-3 gap-4">
          <input
            type="text"
            value={item.name}
            onChange={(e) => updateMenuItem(section, item.id, "name", e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Menü Adı"
          />
          <input
            type="text"
            value={item.href}
            onChange={(e) => updateMenuItem(section, item.id, "href", e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="/sayfa-url"
          />
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={item.visible}
                onChange={(e) => updateMenuItem(section, item.id, "visible", e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Görünür</span>
            </label>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => moveItem(section, item.id, "up")}
            disabled={index === 0}
            className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Yukarı Taşı"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
          <button
            onClick={() => moveItem(section, item.id, "down")}
            disabled={
              index ===
              (section === "header"
                ? menuConfig.header.length - 1
                : menuConfig.footer[section].length - 1)
            }
            className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Aşağı Taşı"
          >
            <ArrowDown className="h-4 w-4" />
          </button>
          <button
            onClick={() => removeMenuItem(section, item.id)}
            className="p-2 text-red-600 hover:text-red-700"
            title="Sil"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
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
            <h1 className="text-3xl font-bold text-gray-900">Menü Yönetimi</h1>
            <p className="text-gray-600 mt-1">Header ve Footer menülerini düzenleyin</p>
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

      {/* Header Menu */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Header Menü</h2>
          <button
            onClick={() => addMenuItem("header")}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Ekle</span>
          </button>
        </div>
        <div className="space-y-2">
          {menuConfig.header.map((item, index) => renderMenuItem(item, "header", index))}
        </div>
      </div>

      {/* Footer Quick Links */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Footer - Hızlı Linkler</h2>
          <button
            onClick={() => addMenuItem("quickLinks")}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Ekle</span>
          </button>
        </div>
        <div className="space-y-2">
          {menuConfig.footer.quickLinks.map((item, index) =>
            renderMenuItem(item, "quickLinks", index)
          )}
        </div>
      </div>

      {/* Footer Services */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Footer - Hizmetler</h2>
          <button
            onClick={() => addMenuItem("services")}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Ekle</span>
          </button>
        </div>
        <div className="space-y-2">
          {menuConfig.footer.services.map((item, index) =>
            renderMenuItem(item, "services", index)
          )}
        </div>
      </div>
    </div>
  );
}
