"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Video, Save, Trash2, Upload } from "lucide-react";
import { showToast } from "@/components/Toast";

export default function VideoYonetimPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [title, setTitle] = useState("Hero Video");
    const [description, setDescription] = useState("");
    const [currentVideo, setCurrentVideo] = useState<any>(null);

    useEffect(() => {
        loadCurrentVideo();
    }, []);

    const loadCurrentVideo = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/videos/hero");
            if (response.ok) {
                const data = await response.json();
                if (data && data.url) {
                    setCurrentVideo(data);
                    setTitle(data.title || "Hero Video");
                    setDescription(data.description || "");
                }
            }
        } catch (error) {
            console.error("Video yüklenemedi:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Video formatı kontrolü
            if (!file.type.startsWith("video/")) {
                showToast("Lütfen video dosyası seçin", "error");
                return;
            }
            setVideoFile(file);
        }
    };

    const handleUpload = async () => {
        if (!videoFile) {
            showToast("Lütfen bir video dosyası seçin", "error");
            return;
        }

        try {
            setUploading(true);
            setUploadProgress(0);

            const formData = new FormData();
            formData.append("file", videoFile);
            formData.append("type", "hero");
            formData.append("title", title);
            formData.append("description", description);

            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener("progress", (e) => {
                if (e.lengthComputable) {
                    const percentComplete = (e.loaded / e.total) * 100;
                    setUploadProgress(Math.round(percentComplete));
                }
            });

            xhr.addEventListener("load", async () => {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    showToast("Video başarıyla yüklendi!", "success");
                    setVideoFile(null);
                    setUploadProgress(0);
                    await loadCurrentVideo();
                } else {
                    throw new Error("Upload failed");
                }
            });

            xhr.addEventListener("error", () => {
                throw new Error("Network error");
            });

            xhr.open("POST", "/api/admin/videos/upload");
            xhr.send(formData);

        } catch (error) {
            console.error("Upload hatası:", error);
            showToast("Video yüklenirken hata oluştu", "error");
            setUploadProgress(0);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Videoyu silmek istediğinizden emin misiniz?")) return;

        try {
            setSaving(true);
            const response = await fetch("/api/admin/videos?type=hero", {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Video silinemedi");

            showToast("Video başarıyla silindi", "success");
            setTitle("Hero Video");
            setDescription("");
            setCurrentVideo(null);
        } catch (error) {
            console.error("Silme hatası:", error);
            showToast("Video silinirken hata oluştu", "error");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex items-center space-x-3 mb-2">
                        <Video className="h-8 w-8 text-primary-600" />
                        <h1 className="text-3xl font-bold text-gray-900">Video Yönetimi</h1>
                    </div>
                    <p className="text-gray-600">Ana sayfada gösterilecek hero videosunu yükleyin</p>
                </div>

                {loading ? (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Yükleniyor...</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="space-y-6">
                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Video Dosyası * (.mp4, .webm, .mov)
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                                    <input
                                        type="file"
                                        accept="video/mp4,video/webm,video/quicktime"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="video-upload"
                                    />
                                    <label
                                        htmlFor="video-upload"
                                        className="cursor-pointer flex flex-col items-center"
                                    >
                                        <Upload className="h-12 w-12 text-gray-400 mb-3" />
                                        <span className="text-sm text-gray-600">
                                            {videoFile ? videoFile.name : "Video dosyası seçmek için tıklayın"}
                                        </span>
                                        {videoFile && (
                                            <span className="text-xs text-gray-500 mt-1">
                                                Boyut: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                                            </span>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Upload Progress */}
                            {uploading && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-blue-900">Yükleniyor...</span>
                                        <span className="text-sm font-bold text-blue-900">{uploadProgress}%</span>
                                    </div>
                                    <div className="w-full bg-blue-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Başlık (Opsiyonel)
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Hero Video"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Açıklama (Opsiyonel)
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={3}
                                    placeholder="Video hakkında notlar..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>

                            {/* Current Video Preview */}
                            {currentVideo && currentVideo.url && (
                                <div className="border-t pt-6">
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Mevcut Video</h3>
                                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                                        <video
                                            src={currentVideo.url}
                                            controls
                                            className="w-full max-h-64 object-contain"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between pt-6 border-t">
                                <button
                                    type="button"
                                    onClick={() => router.push("/admin")}
                                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Geri
                                </button>
                                <div className="flex space-x-3">
                                    {currentVideo && (
                                        <button
                                            type="button"
                                            onClick={handleDelete}
                                            disabled={saving || uploading}
                                            className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                            <span>Sil</span>
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={handleUpload}
                                        disabled={!videoFile || uploading}
                                        className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                                    >
                                        <Upload className="h-5 w-5" />
                                        <span>{uploading ? "Yükleniyor..." : "Yükle"}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Instructions */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">📹 Video Yükleme Talimatları</h3>
                    <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                        <li><strong>Format:</strong> MP4, WebM veya MOV formatında olmalı</li>
                        <li><strong>Boyut:</strong> Maksimum 100 MB (önerilir)</li>
                        <li><strong>Çözünürlük:</strong> 1920x1080 (Full HD) önerilir</li>
                        <li><strong>Süre:</strong> 15-30 saniye ideal (loop olacağı için)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
