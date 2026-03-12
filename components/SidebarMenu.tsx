"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronUp,
  Search,
  Menu,
  Heart,
  Square,
  Home,
  Building2,
  TrendingUp,
  Calculator,
  FileText,
  Settings,
  CreditCard
} from "lucide-react";

export default function SidebarMenu() {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('sidebar');
  const pathname = usePathname();
  const router = useRouter();

  const languages = [
    { code: "tr", name: "Türkçe" },
    { code: "en", name: "English" },
    { code: "ru", name: "Русский" },
  ];

  const menuItems = [
    { name: t('home'), href: "/", icon: Home },
    { name: t('portfolio'), href: "/emlak", icon: Building2 },
    { name: t('investment'), href: "/yatirim", icon: TrendingUp },
    { name: t('calculator'), href: "/hesaplayici", icon: Calculator },
    { name: t('comparison'), href: "/karsilastirma", icon: FileText },
    { name: t('priceAnalysis'), href: "/fiyat-analizi", icon: TrendingUp },
    { name: t('buildingManagement'), href: "/bina-yonetimi", icon: Settings },
    { name: t('payment'), href: "/odeme", icon: CreditCard },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-20 bg-dark-green flex flex-col items-center py-6 z-50">
      {/* Dil Seçeneği */}
      <div className="relative mb-6">
        <button
          onClick={() => setIsLanguageOpen(!isLanguageOpen)}
          className="flex flex-col items-center justify-center w-12 h-12 text-white hover:bg-dark-green-light rounded-lg transition-colors"
        >
          <span className="text-sm font-semibold uppercase">{locale}</span>
          <ChevronUp
            className={`h-4 w-4 mt-1 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Dil Dropdown */}
        {isLanguageOpen && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-dark-green-light rounded-lg shadow-xl min-w-[120px] overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  const newPath = pathname.replace(`/${locale}`, `/${lang.code}`);
                  router.push(newPath || `/${lang.code}`);
                  setIsLanguageOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm text-white hover:bg-dark-green-dark transition-colors ${locale === lang.code ? 'bg-dark-green-dark' : ''
                  }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Menü Butonları */}
      <div className="flex flex-col items-center space-y-4 flex-1">
        <button className="w-12 h-12 flex items-center justify-center text-white hover:bg-dark-green-light rounded-lg transition-colors">
          <Search className="h-6 w-6" />
        </button>

        <button className="w-12 h-12 flex items-center justify-center text-white hover:bg-dark-green-light rounded-lg transition-colors">
          <Menu className="h-6 w-6" />
        </button>

        <div className="w-8 h-px bg-dark-green-light my-2" />

        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="w-12 h-12 flex items-center justify-center text-white hover:bg-dark-green-light rounded-lg transition-colors group relative"
              title={item.name}
            >
              <Icon className="h-6 w-6" />
              {/* Tooltip */}
              <span className="absolute left-full ml-2 px-2 py-1 bg-dark-green-light text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Alt Butonlar */}
      <div className="flex flex-col items-center space-y-4 mt-auto">
        <button className="w-12 h-12 flex items-center justify-center text-white hover:bg-dark-green-light rounded-lg transition-colors">
          <Heart className="h-6 w-6" />
        </button>
        <button className="w-12 h-12 flex items-center justify-center text-white hover:bg-dark-green-light rounded-lg transition-colors">
          <Square className="h-6 w-6" />
        </button>
      </div>
    </aside>
  );
}


