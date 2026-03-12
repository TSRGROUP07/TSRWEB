"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Home,
  Video,
  Image as ImageIcon,
  Settings,
  LogOut,
  Building2,
  FileText,
  Activity,
  Globe,
  Menu,
  MessageSquare,
  Search,
  Users,
} from "lucide-react";
import { logout } from "@/lib/auth";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Ana Sayfa İçerik",
      href: "/admin/ana-sayfa",
      icon: Globe,
    },
    {
      name: "İlan Yönetimi",
      href: "/admin/ilanlar",
      icon: Home,
    },
    {
      name: "Video Yönetimi",
      href: "/admin/videolar",
      icon: Video,
    },
    {
      name: "Resim Yönetimi",
      href: "/admin/resimler",
      icon: ImageIcon,
    },
    {
      name: "Blog/Haber Yönetimi",
      href: "/admin/blog",
      icon: FileText,
    },
    {
      name: "Menü Yönetimi",
      href: "/admin/menu",
      icon: Menu,
    },
    {
      name: "Sayfa Yönetimi",
      href: "/admin/sayfalar",
      icon: FileText,
    },
    {
      name: "SEO Yönetimi",
      href: "/admin/seo",
      icon: Search,
    },
    {
      name: "İletişim Mesajları",
      href: "/admin/mesajlar",
      icon: MessageSquare,
    },
    {
      name: "Ekip Yönetimi",
      href: "/admin/ekip",
      icon: Users,
    },
    {
      name: "İşlem Geçmişi",
      href: "/admin/activity-logs",
      icon: Activity,
    },
    {
      name: "Ayarlar",
      href: "/admin/ayarlar",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 text-white shadow-xl z-10 flex flex-col" style={{ backgroundColor: '#2e3c3a' }}>
      <div className="flex items-center space-x-3 p-6 border-b flex-shrink-0" style={{ borderColor: '#3a4d4a' }}>
        <Building2 className="h-8 w-8" style={{ color: '#EDC370' }} />
        <div>
          <h1 className="text-xl font-bold">TSR GROUP</h1>
          <p className="text-xs text-gray-400">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
              style={isActive ? { backgroundColor: '#3a4d4a' } : {}}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#3a4d4a';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t flex-shrink-0" style={{ borderColor: '#3a4d4a' }}>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white w-full transition-colors"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#3a4d4a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <LogOut className="h-5 w-5" />
          <span>Çıkış Yap</span>
        </button>
      </div>
    </aside>
  );
}
