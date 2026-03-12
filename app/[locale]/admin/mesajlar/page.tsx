"use client";

import { useState, useEffect } from "react";
import { Search, Mail, Phone, Calendar, User, MessageCircle, CheckCircle, Trash2, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  contactMethod?: string;
  message?: string;
  question?: string; // Soru sor formundan gelen
  type?: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/messages?t=${Date.now()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await response.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Mesajlar yüklenemedi:", error);
      alert("Mesajlar yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gelen Talepler ve Mesajlar</h1>
            <p className="text-gray-600 mt-1">İletişim formları ve soru talepleri</p>
          </div>
          <button
            onClick={loadMessages}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Yenile"
          >
            <RefreshCw className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mesaj Listesi */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="İsim veya e-posta ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Mesaj bulunamadı
              </div>
            ) : (
              <div className="divide-y">
                {filteredMessages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${selectedMessage?.id === msg.id ? 'bg-blue-50 border-l-4 border-primary-600' : ''}`}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-gray-900 truncate">{msg.name}</span>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {new Date(msg.createdAt).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 truncate">{msg.email}</div>
                    <div className="text-xs text-gray-400 mt-1 truncate">
                      {msg.type === 'question' ? '❓ Soru' : '✉️ İletişim'}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mesaj Detayı */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md h-[600px] overflow-y-auto">
          {selectedMessage ? (
            <div className="p-8 space-y-6">
              <div className="border-b pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedMessage.name}</h2>
                    <div className="flex items-center gap-4 mt-2 text-gray-600">
                      <a href={`mailto:${selectedMessage.email}`} className="flex items-center gap-1 hover:text-primary-600">
                        <Mail className="h-4 w-4" />
                        {selectedMessage.email}
                      </a>
                      {selectedMessage.phone && (
                        <a href={`tel:${selectedMessage.phone}`} className="flex items-center gap-1 hover:text-primary-600">
                          <Phone className="h-4 w-4" />
                          {selectedMessage.phone}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center gap-1 justify-end">
                      <Calendar className="h-4 w-4" />
                      {new Date(selectedMessage.createdAt).toLocaleString('tr-TR')}
                    </div>
                    <div className="mt-1 badge px-2 py-1 bg-gray-100 rounded text-xs inline-block">
                      ID: {selectedMessage.id}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {selectedMessage.type === 'question' ? 'SORU / TALEP' : 'MESAJ İÇERİĞİ'}
                </h3>
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message || selectedMessage.question || "(İçerik yok)"}
                </p>
              </div>

              {selectedMessage.contactMethod && (
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded border border-blue-100">
                  <MessageCircle className="h-4 w-4 text-primary-600" />
                  <span>Tercih edilen iletişim yöntemi: <strong>{selectedMessage.contactMethod}</strong></span>
                </div>
              )}

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
              <MessageCircle className="h-16 w-16 mb-4 opacity-20" />
              <p className="text-lg">Görüntülemek için soldaki listeden bir mesaj seçin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
