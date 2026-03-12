"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import SidebarMenu from "@/components/SidebarMenu";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

// Lazy load heavy components
const ToastContainer = dynamic(() => import("@/components/Toast").then(mod => ({ default: mod.default })), { ssr: false });
const ChatWidget = dynamic(() => import("@/components/ChatWidget"), { ssr: false });

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const isHomePage = pathname === "/";

  // Admin sayfalarında Header ve Footer gösterme
  if (isAdminPage) {
    return (
      <CurrencyProvider>
        <ErrorBoundary>
          {children}
          <ToastContainer />
        </ErrorBoundary>
      </CurrencyProvider>
    );
  }

  // Ana sayfa için Header ve Footer göster, Sidebar kaldır
  return (
    <CurrencyProvider>
      <ErrorBoundary>
        <Header />
        <main className={`min-h-screen ${!isHomePage ? 'pt-20' : ''}`} style={{ background: '#b7b1ad' }}>{children}</main>
        <Footer />
        <ChatWidget />
        <ToastContainer />
      </ErrorBoundary>
    </CurrencyProvider>
  );
}




