"use client";

import { useState, useEffect } from "react";
import { Save, Key, User, Bell, Globe, Mail, Phone, Settings, Database, Shield, Facebook, Instagram, Youtube, Twitter, Linkedin, MapPin, FileText, Cloud, CheckCircle, XCircle, ExternalLink } from "lucide-react";

export default function AyarlarPage() {
  const [settings, setSettings] = useState({
    siteName: "TSR GROUP",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.tsrgroupalanya.com",
    siteEmail: "info@tsremlak.com",
    sitePhone: "+90 (XXX) XXX XX XX",
    siteAddress: "Ersel apt, Şekerhane, Ali İmam Sk. 18/A, 07400 Alanya/Antalya",
    adminEmail: "admin@tsremlak.com",
    serpApiKey: "",
    googleMapsKey: "",
    maintenanceMode: false,
    allowRegistration: false,
    // Sosyal Medya
    facebookUrl: "",
    instagramUrl: "https://www.instagram.com/tsrgroupalanya/",
    youtubeUrl: "https://www.youtube.com/@TSRGROUPSOCIAL",
    twitterUrl: "",
    linkedinUrl: "",
    whatsappNumber: "+905303330097",
    // Footer
    footerDescription: "",
    footerCopyright: "© 2025 TSR GROUP. Tüm hakları saklıdır.",
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [googleDriveConnected, setGoogleDriveConnected] = useState(false);
  const [googleDriveConnecting, setGoogleDriveConnecting] = useState(false);
  const [googleDriveClientId, setGoogleDriveClientId] = useState("");
  const [googleDriveClientSecret, setGoogleDriveClientSecret] = useState("");
  const [googleDriveServiceAccount, setGoogleDriveServiceAccount] = useState("");
  const [useServiceAccount, setUseServiceAccount] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadSettings();
    checkGoogleDriveConnection();

    // URL'den gelen parametreleri kontrol et
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("google_drive_connected") === "true") {
      setGoogleDriveConnected(true);
      // URL'den parametreyi temizle
      window.history.replaceState({}, "", window.location.pathname);
    }
    if (urlParams.get("error")) {
      alert("Google Drive bağlantı hatası: " + urlParams.get("error"));
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const loadSettings = async () => {
    try {
      // API anahtarlarını server'dan yükle
      const response = await fetch("/api/admin/settings");
      if (response.ok) {
        const apiKeys = await response.json();
        setSettings((prev) => ({
          ...prev,
          googleMapsKey: apiKeys.googleMapsKey || "",
          serpApiKey: apiKeys.serpApiKey || "",
        }));
        setGoogleDriveClientId(apiKeys.googleDriveClientId || "");
        setGoogleDriveClientSecret(apiKeys.googleDriveClientSecret || "");
      }

      // Diğer ayarları localStorage'dan yükle
      const savedSettings = localStorage.getItem("admin_settings");
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings((prev) => ({
          ...prev,
          ...parsed,
          googleMapsKey: prev.googleMapsKey || parsed.googleMapsKey || "",
          serpApiKey: prev.serpApiKey || parsed.serpApiKey || "",
        }));
      }
    } catch (error) {
      console.error("Ayarlar yüklenemedi:", error);
    }
  };

  const checkGoogleDriveConnection = async () => {
    try {
      const response = await fetch("/api/admin/google-drive/status");
      if (response.ok) {
        const data = await response.json();
        setGoogleDriveConnected(data.connected || false);
      }
    } catch (error) {
      console.error("Google Drive bağlantı kontrolü hatası:", error);
    }
  };

  const handleGoogleDriveConnect = async () => {
    if (!googleDriveClientId || !googleDriveClientSecret) {
      alert("Lütfen önce Client ID ve Client Secret bilgilerini girin ve kaydedin.");
      return;
    }

    setGoogleDriveConnecting(true);
    try {
      // Önce API bilgilerini kaydet
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          googleDriveClientId: googleDriveClientId,
          googleDriveClientSecret: googleDriveClientSecret,
        }),
      });

      // Auth URL'yi al
      const response = await fetch("/api/admin/google-drive/auth");
      if (response.ok) {
        const data = await response.json();
        // Yeni pencerede Google OAuth sayfasını aç
        window.location.href = data.authUrl;
      } else {
        const error = await response.json();
        alert("Bağlantı hatası: " + (error.error || "Bilinmeyen hata"));
      }
    } catch (error: any) {
      alert("Bağlantı hatası: " + (error.message || "Bilinmeyen hata"));
    } finally {
      setGoogleDriveConnecting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      // API anahtarlarını server'a kaydet (.env.local dosyasına)
      const apiResponse = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          googleMapsKey: settings.googleMapsKey,
          serpApiKey: settings.serpApiKey,
          googleDriveClientId: useServiceAccount ? "" : googleDriveClientId,
          googleDriveClientSecret: useServiceAccount ? "" : googleDriveClientSecret,
          googleDriveServiceAccount: useServiceAccount ? googleDriveServiceAccount : "",
        }),
      });

      if (!apiResponse.ok) {
        throw new Error("API anahtarları kaydedilemedi");
      }

      // Diğer ayarları localStorage'a kaydet
      const { googleMapsKey, serpApiKey, ...otherSettings } = settings;
      localStorage.setItem("admin_settings", JSON.stringify(otherSettings));

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);

      // API anahtarları kaydedildiyse kullanıcıyı bilgilendir
      if (settings.googleMapsKey || settings.serpApiKey) {
        alert("API anahtarları başarıyla kaydedildi! Lütfen geliştirme sunucusunu yeniden başlatın (Ctrl+C sonra npm run dev)");
      }
    } catch (error: any) {
      alert("Ayarlar kaydedilirken hata oluştu: " + (error.message || "Bilinmeyen hata"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header - Fixed at top */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ayarlar</h1>
          <p className="text-gray-600 mt-1">Sistem ve API ayarlarını yönetin</p>
        </div>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          Ayarlar başarıyla kaydedildi!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Genel Ayarlar */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Genel Ayarlar</span>
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Adı
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site E-posta
              </label>
              <input
                type="email"
                value={settings.siteEmail}
                onChange={(e) =>
                  setSettings({ ...settings, siteEmail: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Telefon
              </label>
              <input
                type="text"
                value={settings.sitePhone}
                onChange={(e) =>
                  setSettings({ ...settings, sitePhone: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site URL
              </label>
              <input
                type="url"
                value={settings.siteUrl}
                onChange={(e) =>
                  setSettings({ ...settings, siteUrl: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="https://www.tsrgroupalanya.com"
              />
            </div>
          </div>
        </div>

        {/* İletişim Bilgileri */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>İletişim Bilgileri</span>
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adres
                </label>
                <textarea
                  value={settings.siteAddress}
                  onChange={(e) =>
                    setSettings({ ...settings, siteAddress: e.target.value })
                  }
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sosyal Medya */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Sosyal Medya</span>
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                  <Facebook className="h-4 w-4" />
                  <span>Facebook URL</span>
                </label>
                <input
                  type="url"
                  value={settings.facebookUrl}
                  onChange={(e) =>
                    setSettings({ ...settings, facebookUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                  <Instagram className="h-4 w-4" />
                  <span>Instagram URL</span>
                </label>
                <input
                  type="url"
                  value={settings.instagramUrl}
                  onChange={(e) =>
                    setSettings({ ...settings, instagramUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                  <Youtube className="h-4 w-4" />
                  <span>YouTube URL</span>
                </label>
                <input
                  type="url"
                  value={settings.youtubeUrl}
                  onChange={(e) =>
                    setSettings({ ...settings, youtubeUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="https://youtube.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                  <Twitter className="h-4 w-4" />
                  <span>Twitter/X URL</span>
                </label>
                <input
                  type="url"
                  value={settings.twitterUrl}
                  onChange={(e) =>
                    setSettings({ ...settings, twitterUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="https://twitter.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn URL</span>
                </label>
                <input
                  type="url"
                  value={settings.linkedinUrl}
                  onChange={(e) =>
                    setSettings({ ...settings, linkedinUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="https://linkedin.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Numarası
                </label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) =>
                    setSettings({ ...settings, whatsappNumber: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="+905303330097"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Ayarları */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Footer Ayarları</span>
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Footer Açıklama
                </label>
                <textarea
                  value={settings.footerDescription}
                  onChange={(e) =>
                    setSettings({ ...settings, footerDescription: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Footer'da görünecek açıklama metni"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Copyright Metni
                </label>
                <input
                  type="text"
                  value={settings.footerCopyright}
                  onChange={(e) =>
                    setSettings({ ...settings, footerCopyright: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sistem Ayarları */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Sistem Ayarları</span>
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bakım Modu
                  </label>
                  <p className="text-xs text-gray-500">
                    Site bakım modunda iken sadece admin erişebilir
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) =>
                      setSettings({ ...settings, maintenanceMode: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* API Anahtarları */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Key className="h-5 w-5" />
              <span>API Anahtarları</span>
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SerpAPI Key
              </label>
              <input
                type="password"
                value={settings.serpApiKey}
                onChange={(e) =>
                  setSettings({ ...settings, serpApiKey: e.target.value })
                }
                placeholder="SerpAPI anahtarınızı girin"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Maps API Key
              </label>
              <input
                type="password"
                value={settings.googleMapsKey}
                onChange={(e) =>
                  setSettings({ ...settings, googleMapsKey: e.target.value })
                }
                placeholder="Google Maps anahtarınızı girin"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                API anahtarı almak için:{" "}
                <a
                  href="https://console.cloud.google.com/google/maps-apis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google Cloud Console
                </a>
                {" | "}
                <a
                  href="/GOOGLE_MAPS_API_KURULUM.md"
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  Detaylı Rehber
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Google Drive Bağlantısı */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Cloud className="h-5 w-5" />
              <span>Google Drive Entegrasyonu</span>
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Google Drive'dan dosyaları çekmek ve yüklemek için bağlantı yapın.
            </p>

            {/* Yöntem Seçimi */}
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useServiceAccount}
                  onChange={(e) => setUseServiceAccount(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-blue-900">
                  Service Account Kullan (Önerilen - Daha Basit)
                </span>
              </label>
              <p className="text-xs text-blue-700 mt-2 ml-6">
                Service Account kullanırsanız OAuth bağlantısı yapmanıza gerek yok. Sadece JSON'u yapıştırın.
              </p>
            </div>
          </div>

          {/* Bağlantı Durumu */}
          <div className="p-4 rounded-lg border-2 border-dashed border-gray-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {googleDriveConnected ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      Google Drive Bağlı
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span className="text-sm font-medium text-red-600">
                      Google Drive Bağlı Değil
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Service Account JSON */}
            <div style={{ display: useServiceAccount ? 'block' : 'none' }}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Account JSON
              </label>
              <textarea
                value={googleDriveServiceAccount}
                onChange={(e) => setGoogleDriveServiceAccount(e.target.value)}
                placeholder='{"type":"service_account","project_id":"...","private_key":"..."}'
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-xs"
              />
              <p className="text-xs text-gray-500 mt-1">
                Service Account JSON dosyanızın tüm içeriğini buraya yapıştırın (tek satır veya çok satır olabilir)
              </p>
              <p className="text-xs text-blue-600 mt-2">
                <a href="/SERVICE_ACCOUNT_KURULUM.md" target="_blank" className="underline">
                  Service Account Kurulum Rehberi
                </a>
              </p>
            </div>

            {/* OAuth 2.0 Client ID ve Secret */}
            <div style={{ display: useServiceAccount ? 'none' : 'block' }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Drive Client ID
                </label>
                <input
                  type="text"
                  value={googleDriveClientId}
                  onChange={(e) => setGoogleDriveClientId(e.target.value)}
                  placeholder="Google Cloud Console'dan alınan Client ID"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Google Cloud Console'dan OAuth 2.0 Client ID oluşturun
                </p>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Drive Client Secret
                </label>
                <input
                  type="password"
                  value={googleDriveClientSecret}
                  onChange={(e) => setGoogleDriveClientSecret(e.target.value)}
                  placeholder="Google Cloud Console'dan alınan Client Secret"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* OAuth Bağlantı Butonu */}
            <div style={{ display: useServiceAccount ? 'none' : 'block' }}>
              <button
                type="button"
                onClick={handleGoogleDriveConnect}
                disabled={googleDriveConnecting || !googleDriveClientId || !googleDriveClientSecret}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <ExternalLink className="h-5 w-5" />
                <span>
                  {googleDriveConnecting
                    ? "Bağlanıyor..."
                    : googleDriveConnected
                      ? "Yeniden Bağlan"
                      : "Google Drive'a Bağlan"}
                </span>
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Bağlantı yapmak için Google hesabınızla giriş yapmanız gerekecektir.
                <br />
                <a
                  href="https://console.cloud.google.com/apis/credentials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google Cloud Console'da OAuth 2.0 Credentials oluşturun
                </a>
              </p>
            </div>

            {/* Service Account Bilgi Mesajı */}
            <div style={{ display: useServiceAccount ? 'block' : 'none' }} className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                Service Account kullanıyorsunuz. JSON'u yapıştırıp kaydettiğinizde otomatik olarak bağlanacaktır.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Save className="h-5 w-5" />
            <span>{loading ? "Kaydediliyor..." : "Kaydet"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

