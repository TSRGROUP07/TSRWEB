"use client";

import { useState, useEffect } from "react";
import { Cloud, File, Image, Video, Loader2, X, Check } from "lucide-react";

interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  webViewLink?: string;
  thumbnailLink?: string;
}

interface GoogleDriveFilePickerProps {
  onFileSelect: (file: GoogleDriveFile) => void;
  acceptedTypes?: string[]; // Örn: ["image/jpeg", "image/png", "video/mp4"]
  folderId?: string;
}

export default function GoogleDriveFilePicker({
  onFileSelect,
  acceptedTypes,
  folderId,
}: GoogleDriveFilePickerProps) {
  const [files, setFiles] = useState<GoogleDriveFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  //const [selectedFile, setSelectedFile] = useState<GoogleDriveFile | null>(null); // OLD
  const [selectedFiles, setSelectedFiles] = useState<GoogleDriveFile[]>([]); // NEW

  useEffect(() => {
    loadFiles();
  }, [folderId]);

  const loadFiles = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (folderId) {
        params.append("folderId", folderId);
      }
      // NOT: mimeTypeQuery'yi kaldırdık - önce tüm dosyaları alalım, sonra client-side'da filtreleyelim
      // Bu sayede hangi dosyaların olduğunu görebiliriz
      // if (acceptedTypes && acceptedTypes.length > 0) {
      //   const imageTypes = acceptedTypes.filter(t => t.startsWith("image/"));
      //   if (imageTypes.length > 0) {
      //     params.append("mimeTypeQuery", "mimeType contains 'image/'");
      //   }
      // }

      const response = await fetch(`/api/admin/google-drive/files?${params.toString()}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Dosyalar yüklenemedi");
      }

      const data = await response.json();
      let filteredFiles = data.files || [];

      console.log(`📦 ${filteredFiles.length} dosya alındı (filtreleme öncesi)`);
      
      // Debug: API'den gelen istatistikleri göster
      if (data.stats) {
        console.log("📊 API İstatistikleri:", {
          toplam: data.stats.total,
          resimler: data.stats.images,
          dosyaTipleri: data.stats.mimeTypes
        });
      }
      
      // Debug: İlk birkaç dosyanın detaylarını göster
      if (filteredFiles.length > 0) {
        console.log("🔍 İlk 5 dosya detayı:", filteredFiles.slice(0, 5).map((f: GoogleDriveFile) => ({
          name: f.name,
          mimeType: f.mimeType,
          hasThumbnail: !!f.thumbnailLink,
          id: f.id
        })));
      } else {
        console.warn("⚠️ API'den hiç dosya gelmedi! Muhtemelen filtreleme çok katı veya dosyalar resim değil.");
      }

      // Client-side'da da filtreleme yap (eğer mimeType query çalışmazsa)
      if (acceptedTypes && acceptedTypes.length > 0) {
        const beforeFilter = filteredFiles.length;
        filteredFiles = filteredFiles.filter((file: GoogleDriveFile) => {
          if (!file.mimeType) {
            console.warn(`⚠️ Dosya mimeType yok: ${file.name}`);
            return false;
          }
          
          if (acceptedTypes.some(t => t.startsWith("image/"))) {
            return file.mimeType.startsWith("image/");
          }
          return acceptedTypes.some((type) => {
            return file.mimeType === type || file.mimeType.startsWith(type.split("/")[0] + "/");
          });
        });
        console.log(`🔍 Filtreleme: ${beforeFilter} → ${filteredFiles.length} dosya`);
      }

      console.log(`✅ ${filteredFiles.length} dosya gösterilecek`);
      setFiles(filteredFiles);
    } catch (err: any) {
      setError(err.message || "Dosyalar yüklenemedi");
      console.error("Google Drive dosya yükleme hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFileSelection = (file: GoogleDriveFile) => {
    setSelectedFiles(prev => {
      const exists = prev.find(f => f.id === file.id);
      if (exists) {
        return prev.filter(f => f.id !== file.id);
      } else {
        return [...prev, file];
      }
    });
  };

  const handleConfirmSelection = () => {
    selectedFiles.forEach(file => {
      onFileSelect(file);
    });
    // Seçimi temizle
    setSelectedFiles([]);
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) {
      return <Image className="h-8 w-8 text-blue-500" />;
    } else if (mimeType.startsWith("video/")) {
      return <Video className="h-8 w-8 text-red-500" />;
    } else {
      return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes?: string) => {
    if (!bytes) return "Bilinmiyor";
    const size = parseInt(bytes);
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (error && error.includes("bağlantısı yapılmamış")) {
    return (
      <div className="p-4 border border-yellow-300 bg-yellow-50 rounded-lg">
        <p className="text-sm text-yellow-800">
          Google Drive bağlantısı yapılmamış. Lütfen{" "}
          <a href="/admin/ayarlar" className="underline font-medium">
            Ayarlar
          </a>{" "}
          sayfasından Google Drive'a bağlanın.
        </p>
      </div>
    );
  }

  // Test butonu ekle (her zaman görünür)
  const handleTestConnection = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/google-drive/test");
      const data = await response.json();
      if (data.success) {
        alert(
          `Google Drive Test Sonuçları:\n\n` +
          `Service Account: ${data.serviceAccountEmail}\n` +
          `Toplam Dosya: ${data.stats.total}\n` +
          `Kendi Dosyaları: ${data.stats.own}\n` +
          `Paylaşılan Dosyalar: ${data.stats.shared}\n\n` +
          `NOT: Service Account'un kendi Drive'ındaki dosyalar veya Service Account e-postasına paylaşılan dosyalar görünecektir.\n\n` +
          `Eğer dosyalar görünmüyorsa:\n` +
          `1. Dosyalarınızı Service Account e-postasına paylaşın\n` +
          `2. Service Account e-postasını kontrol edin: ${data.serviceAccountEmail}`
        );
        // Test sonrası dosyaları yeniden yükle
        loadFiles();
      } else {
        alert("Test başarısız: " + (data.error || "Bilinmeyen hata"));
      }
    } catch (err: any) {
      alert("Test hatası: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Cloud className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Google Drive'dan Dosya Seç ({selectedFiles.length})</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleTestConnection}
            className="text-xs text-gray-600 hover:text-gray-800 px-2 py-1 border border-gray-300 rounded"
            disabled={loading}
          >
            Bağlantıyı Test Et
          </button>
          <button
            onClick={loadFiles}
            disabled={loading}
            className="text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400"
          >
            {loading ? "Yükleniyor..." : "Yenile"}
          </button>
        </div>
      </div>

      {/* Bilgilendirme */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
        <strong>ℹ️ İpucu:</strong> Birden fazla fotoğraf seçebilirsiniz. Seçtikten sonra aşağıdaki "Seçilenleri Ekle" butonuna basın.
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        </div>
      )}

      {error && !loading && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {!loading && !error && files.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Cloud className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="mb-2 font-medium">Google Drive'da resim dosyası bulunamadı</p>
          <div className="text-xs text-gray-400 mb-4 space-y-1">
            <p>Olası nedenler:</p>
            <ul className="list-disc list-inside text-left max-w-md mx-auto space-y-1">
              <li>Service Account'a paylaşılan dosyalar resim formatında değil</li>
              <li>Dosyalar Service Account e-postasına paylaşılmamış</li>
              <li>Dosyalar klasör içinde ve klasör paylaşılmamış</li>
            </ul>
            <p className="mt-2">
              <strong>Çözüm:</strong> Resim dosyalarınızı (JPG, PNG, WEBP, GIF) Service Account e-postasına paylaşın.
            </p>
          </div>
          <div className="flex gap-2 justify-center">
            <button
              onClick={handleTestConnection}
              className="text-xs text-blue-600 hover:text-blue-700 underline"
            >
              Bağlantıyı Test Et
            </button>
            <button
              onClick={loadFiles}
              className="text-xs text-blue-600 hover:text-blue-700 underline"
            >
              Yeniden Dene
            </button>
          </div>
        </div>
      )}

      {!loading && files.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto mb-4">
            {files.map((file) => {
              const isSelected = selectedFiles.some(f => f.id === file.id);
              return (
                <div
                  key={file.id}
                  onClick={() => toggleFileSelection(file)}
                  className={`relative border-2 rounded-lg p-3 cursor-pointer transition-all ${isSelected
                      ? "border-blue-500 bg-blue-50 shadow-md transform scale-[1.02]"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1 z-10 shadow-sm">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}

                  {file.mimeType?.startsWith("image/") ? (
                    <div className="relative w-full h-24 rounded mb-2 overflow-hidden bg-gray-100">
                      <img
                        src={file.thumbnailLink || `https://drive.google.com/thumbnail?id=${file.id}&sz=w400`}
                        alt={file.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Thumbnail yüklenemezse icon göster
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center fallback-icon" style={{ display: 'none' }}>
                        {getFileIcon(file.mimeType)}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-24 bg-gray-100 rounded mb-2 flex items-center justify-center">
                      {getFileIcon(file.mimeType)}
                    </div>
                  )}

                  <p className="text-xs font-medium text-gray-900 truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              )
            })}
          </div>

          <button
            onClick={handleConfirmSelection}
            disabled={selectedFiles.length === 0}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {selectedFiles.length === 0 ? "Fotoğraf Seçin" : `${selectedFiles.length} Fotoğrafı Ekle`}
          </button>
        </>
      )}
    </div>
  );
}
