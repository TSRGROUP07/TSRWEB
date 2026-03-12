"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Login sayfasında kontrol yapma
    if (pathname === "/admin/login") return;

    if (!isAuthenticated()) {
      router.push("/admin/login");
    }
  }, [router, pathname]);

  // Login sayfasında sidebar gösterme
  if (pathname === "/admin/login") {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <div id="admin-layout-root" className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="ml-64 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
