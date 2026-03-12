"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, Edit, Upload, User } from "lucide-react";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  title: string;
  image: string;
  order: number;
}

export default function EkipPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const response = await fetch("/api/admin/team");
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      } else {
        // Varsayılan ekip üyeleri
        setMembers([
          { id: 4, name: "Ulaş Özel", title: "General Manager", image: "/TSREKİP/4.jpeg", order: 1 },
          { id: 5, name: "Aybüke Karahan", title: "Sales Manager", image: "/TSREKİP/5.jpeg", order: 2 },
          { id: 6, name: "Atakan Acar", title: "Sales Manager", image: "/TSREKİP/6.jpeg", order: 3 },
          { id: 2, name: "İbrahim Yılmaz", title: "Portfolio Manager", image: "/TSREKİP/2.jpeg", order: 4 },
          { id: 3, name: "Erhan Uysal", title: "After Sales Manager", image: "/TSREKİP/3.jpeg", order: 5 },
          { id: 1, name: "Duygu Kaya", title: "Office Assistant", image: "/TSREKİP/1.jpeg", order: 6 },
        ]);
      }
    } catch (error) {
      console.error("Ekip üyeleri yüklenemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(members),
      });

      if (response.ok) {
        alert("Ekip üyeleri başarıyla kaydedildi!");
        setShowAddForm(false);
        setEditingMember(null);
      } else {
        alert("Ekip üyeleri kaydedilirken hata oluştu");
      }
    } catch (error) {
      alert("Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = () => {
    const newMember: TeamMember = {
      id: Date.now(),
      name: "",
      title: "",
      image: "",
      order: members.length + 1,
    };
    setEditingMember(newMember);
    setShowAddForm(true);
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setShowAddForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu ekip üyesini silmek istediğinize emin misiniz?")) return;

    setMembers(members.filter((m) => m.id !== id));
    await handleSave();
  };

  const handleSaveMember = () => {
    if (!editingMember) return;

    if (editingMember.id > 1000) {
      // Yeni üye
      setMembers([...members, editingMember]);
    } else {
      // Mevcut üyeyi güncelle
      setMembers(members.map((m) => (m.id === editingMember.id ? editingMember : m)));
    }

    setShowAddForm(false);
    setEditingMember(null);
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
            <h1 className="text-3xl font-bold text-gray-900">Ekip Yönetimi</h1>
            <p className="text-gray-600 mt-1">Ekip üyelerini yönetin</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Yeni Üye Ekle</span>
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Save className="h-5 w-5" />
              <span>{saving ? "Kaydediliyor..." : "Kaydet"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && editingMember && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingMember.id > 1000 ? "Yeni Ekip Üyesi Ekle" : "Ekip Üyesi Düzenle"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ad Soyad
              </label>
              <input
                type="text"
                value={editingMember.name}
                onChange={(e) =>
                  setEditingMember({ ...editingMember, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unvan
              </label>
              <input
                type="text"
                value={editingMember.title}
                onChange={(e) =>
                  setEditingMember({ ...editingMember, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Görsel URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editingMember.image}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, image: e.target.value })
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="/TSREKİP/1.jpeg"
                />
                <a
                  href="/admin/resimler"
                  target="_blank"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Görsel Seç
                </a>
              </div>
            </div>
            {editingMember.image && (
              <div className="md:col-span-2">
                <div className="relative w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                  <Image
                    src={editingMember.image}
                    alt={editingMember.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingMember(null);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              İptal
            </button>
            <button
              onClick={handleSaveMember}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Kaydet
            </button>
          </div>
        </div>
      )}

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-64 bg-gray-200">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{member.title}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Düzenle</span>
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
