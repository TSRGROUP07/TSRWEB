"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Play, Upload } from "lucide-react";

interface Video {
  id: number;
  title: string;
  description: string;
  url: string;
  type: "hero" | "property" | "other";
  propertyId?: number;
  createdAt: string;
}

export default function VideolarPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const response = await fetch("/api/admin/videos");
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Videolar yüklenemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu videoyu silmek istediğinize emin misiniz?")) return;

    try {
      const response = await fetch(`/api/admin/videos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        loadVideos();
      } else {
        alert("Video silinirken hata oluştu");
      }
    } catch (error) {
      alert("Bir hata oluştu");
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Header - Fixed at top */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Video Yönetimi</h1>
            <p className="text-gray-600 mt-1">Tüm videoları yönetin</p>
          </div>
          <Link
            href="/admin/videolar/yeni"
            className="inline-flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-md whitespace-nowrap"
          >
            <Plus className="h-5 w-5" />
            <span>Yeni Video Yükle</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            Henüz video eklenmemiş
          </div>
        ) : (
          videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48 bg-gray-200">
                <video
                  src={video.url}
                  className="w-full h-full object-cover"
                  controls={false}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="h-12 w-12 text-white" />
                </div>
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 bg-primary-600 text-white text-xs rounded">
                    {video.type}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{video.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(video.createdAt).toLocaleDateString("tr-TR")}
                  </span>
                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/videolar/${video.id}`}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(video.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

