"use client";

import { useState, useEffect } from "react";
import { Activity, Filter, RefreshCw, Trash2, Eye, Edit, Plus, X } from "lucide-react";
import { format } from "date-fns";

interface ActivityLog {
  id: number;
  action: string;
  entity: string;
  entityId?: number;
  userId?: string;
  details?: any;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

const actionLabels: { [key: string]: string } = {
  create: "Oluşturuldu",
  update: "Güncellendi",
  delete: "Silindi",
  view: "Görüntülendi",
  upload: "Yüklendi",
  publish: "Yayınlandı",
  unpublish: "Yayından Kaldırıldı",
  login: "Giriş Yapıldı",
  logout: "Çıkış Yapıldı",
};

const entityLabels: { [key: string]: string } = {
  property: "İlan",
  blog: "Blog",
  image: "Resim",
  video: "Video",
  user: "Kullanıcı",
  settings: "Ayarlar",
};

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    action: "",
    entity: "",
  });
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);

  useEffect(() => {
    loadLogs();
  }, [filters]);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.action) params.append("action", filters.action);
      if (filters.entity) params.append("entity", filters.entity);
      params.append("limit", "100");

      const response = await fetch(`/api/admin/activity-logs?${params}`);
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error("Loglar yüklenemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "create":
        return "bg-green-100 text-green-800";
      case "update":
        return "bg-blue-100 text-blue-800";
      case "delete":
        return "bg-red-100 text-red-800";
      case "view":
        return "bg-gray-100 text-gray-800";
      case "upload":
        return "bg-purple-100 text-purple-800";
      case "publish":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "create":
        return <Plus className="h-4 w-4" />;
      case "update":
        return <Edit className="h-4 w-4" />;
      case "delete":
        return <Trash2 className="h-4 w-4" />;
      case "view":
        return <Eye className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

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
            <h1 className="text-3xl font-bold text-gray-900">İşlem Geçmişi</h1>
            <p className="text-gray-600 mt-1">Tüm sistem aktivitelerini görüntüleyin</p>
          </div>
          <button
            onClick={loadLogs}
            className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Yenile</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              İşlem Tipi
            </label>
            <select
              value={filters.action}
              onChange={(e) => setFilters({ ...filters, action: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Tümü</option>
              {Object.entries(actionLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Varlık Tipi
            </label>
            <select
              value={filters.entity}
              onChange={(e) => setFilters({ ...filters, entity: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Tümü</option>
              {Object.entries(entityLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Tarih/Saat
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  İşlem
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Varlık
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Kullanıcı
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Detaylar
                </th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Henüz işlem kaydı yok
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedLog(log)}
                  >
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {format(new Date(log.createdAt), "dd MMM yyyy HH:mm")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${getActionColor(
                          log.action
                        )}`}
                      >
                        {getActionIcon(log.action)}
                        <span>{actionLabels[log.action] || log.action}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {entityLabels[log.entity] || log.entity}
                      {log.entityId && ` #${log.entityId}`}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {log.userId || "Sistem"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {log.details ? (
                        <span className="text-primary-600 hover:text-primary-700">
                          Detayları Gör
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">İşlem Detayları</h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-gray-700">Tarih/Saat:</span>
                <p className="text-gray-600">
                  {format(new Date(selectedLog.createdAt), "dd MMMM yyyy HH:mm:ss")}
                </p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">İşlem:</span>
                <p className="text-gray-600">
                  {actionLabels[selectedLog.action] || selectedLog.action}
                </p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Varlık:</span>
                <p className="text-gray-600">
                  {entityLabels[selectedLog.entity] || selectedLog.entity}
                  {selectedLog.entityId && ` (ID: ${selectedLog.entityId})`}
                </p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Kullanıcı:</span>
                <p className="text-gray-600">{selectedLog.userId || "Sistem"}</p>
              </div>
              {selectedLog.ipAddress && (
                <div>
                  <span className="font-semibold text-gray-700">IP Adresi:</span>
                  <p className="text-gray-600">{selectedLog.ipAddress}</p>
                </div>
              )}
              {selectedLog.details && (
                <div>
                  <span className="font-semibold text-gray-700">Detaylar:</span>
                  <pre className="mt-2 p-4 bg-gray-50 rounded-lg text-sm overflow-auto max-h-64">
                    {JSON.stringify(selectedLog.details, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}












