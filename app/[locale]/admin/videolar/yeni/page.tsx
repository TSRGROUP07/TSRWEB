"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Upload, Video } from "lucide-react";

export default function YeniVideoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "hero" as "hero" | "property" | "other",
    propertyId: "",
    videoFile: null as File | null,
    videoUrl: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, videoFile: e.target.files[0] });
    }
  };

  const handleUpload = async () => {
    if (!formData.videoFile) return;

    setUploading(true);

    try {
      // Firebase Storage'a direkt yükle
      const { uploadToFirebaseStorage } = await import("@/lib/storage-upload");
      
      const uploadResult = await uploadToFirebaseStorage(
        formData.videoFile,
        "uploads/videos",
        {
          optimize: false,
          onProgress: (progress) => {
            console.log(`Video yükleme ilerlemesi: ${progress.toFixed(0)}%`);
          },
        }
      );

      setFormData({ ...formData, videoUrl: uploadResult.url });
      alert("Video yüklendi!");
    } catch (error: any) {
      console.error("Upload hatası:", error);
      alert(error.message || "Video yüklenirken hata oluştu");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.videoUrl && !formData.videoFile) {
      alert("Lütfen bir video yükleyin veya URL girin");
      return;
    }

    setLoading(true);

    try {
      let videoUrl = formData.videoUrl;

      // Eğer dosya yüklendiyse önce yükle
      if (formData.videoFile && !formData.videoUrl) {
        const { uploadToFirebaseStorage } = await import("@/lib/storage-upload");
        
        const uploadResult = await uploadToFirebaseStorage(
          formData.videoFile,
          "uploads/videos",
          {
            optimize: false,
          }
        );
        
        videoUrl = uploadResult.url;
      }

      const response = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          type: formData.type,
          url: videoUrl,
          propertyId: formData.propertyId ? parseInt(formData.propertyId) : null,
        }),
      });

      if (response.ok) {
        router.push("/admin/videolar");
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.details || errorData.error || "Video eklenirken hata oluştu";
        alert(`Hata: ${errorMessage}`);
        console.error("Video ekleme hatası:", errorData);
      }
    } catch (error) {
      alert("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header - Fixed at top */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Yeni Video Yükle</h1>
            <p className="text-gray-600 mt-1">Yeni video ekleyin veya yükleyin</p>
          </div>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap"
          >
            <X className="h-5 w-5" />
            <span>İptal</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Başlık *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Açıklama
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video Tipi *
          </label>
          <select
            required
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as "hero" | "property" | "other",
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="hero">Ana Sayfa Hero Video</option>
            <option value="property">Emlak Videosu</option>
            <option value="other">Diğer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video Yükleme
          </label>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="cursor-pointer inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Upload className="h-5 w-5" />
                  <span>Video Seç</span>
                </label>
                {formData.videoFile && (
                  <p className="mt-2 text-sm text-gray-600">
                    Seçilen: {formData.videoFile.name}
                  </p>
                )}
              </div>
            </div>

            {formData.videoFile && (
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {uploading ? "Yükleniyor..." : "Videoyu Yükle"}
              </button>
            )}

            <div className="text-center text-gray-500">veya</div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL (YouTube, Vimeo veya direkt video linki)
              </label>
              <input
                type="url"
                value={formData.videoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, videoUrl: e.target.value })
                }
                placeholder="https://www.youtube.com/watch?v=... veya https://vimeo.com/... veya https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                YouTube, Vimeo linkleri veya direkt video dosyası URL&apos;si (mp4, webm) girebilirsiniz
              </p>
            </div>
          </div>
        </div>

        {(formData.videoUrl || formData.videoFile) && (
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Video Önizleme:</p>
            {formData.videoUrl ? (
              (() => {
                const isYouTube = formData.videoUrl.includes("youtube.com") || formData.videoUrl.includes("youtu.be");
                const isVimeo = formData.videoUrl.includes("vimeo.com");
                
                if (isYouTube) {
                  const videoId = formData.videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
                  return videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      className="w-full rounded-lg"
                      style={{ aspectRatio: "16/9", height: "400px" }}
                      allowFullScreen
                    />
                  ) : (
                    <p className="text-red-600 text-sm">Geçersiz YouTube URL&apos;si</p>
                  );
                } else if (isVimeo) {
                  const videoId = formData.videoUrl.match(/vimeo\.com\/(\d+)/)?.[1];
                  return videoId ? (
                    <iframe
                      src={`https://player.vimeo.com/video/${videoId}`}
                      className="w-full rounded-lg"
                      style={{ aspectRatio: "16/9", height: "400px" }}
                      allowFullScreen
                    />
                  ) : (
                    <p className="text-red-600 text-sm">Geçersiz Vimeo URL&apos;si</p>
                  );
                } else {
                  return (
                    <video
                      src={formData.videoUrl}
                      controls
                      className="w-full rounded-lg"
                      onError={(e) => {
                        console.error("Video oynatma hatası:", e);
                      }}
                    />
                  );
                }
              })()
            ) : formData.videoFile ? (
              <video
                src={URL.createObjectURL(formData.videoFile)}
                controls
                className="w-full rounded-lg"
              />
            ) : null}
          </div>
        )}

        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            <span>{loading ? "Kaydediliyor..." : "Kaydet"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

