"use client";

import { useState, useEffect, useRef } from "react";
import { Link, usePathname, useRouter } from "@/lib/navigation";
import Image from "next/image";
// Removed next/navigation import as it's replaced by @/lib/navigation
import { Menu, X, MapPin, ChevronDown, DollarSign, HelpCircle, User, LogOut, Check, Building2, Compass, FileText, Navigation, Globe, Heart, Home, MoreVertical } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations, useLocale } from 'next-intl';
import { FaHome, FaCar, FaShuttleVan, FaBalanceScale, FaInstagram, FaTelegram, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { BsCurrencyDollar } from 'react-icons/bs';
import { HiMoon } from 'react-icons/hi2';
import { useCurrency } from "@/contexts/CurrencyContext";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('header');
  const tCommon = useTranslations('common');
  const tHero = useTranslations('heroVideo');
  const tQuestion = useTranslations('questionForm');
  const { currency, setCurrency } = useCurrency();
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isCorporateOpen, setIsCorporateOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  const [isQuestionFormOpen, setIsQuestionFormOpen] = useState(false);
  const [selectedContactMethod, setSelectedContactMethod] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [questionFormData, setQuestionFormData] = useState({
    name: "",
    email: "",
    phone: "",
    question: "",
    contactMethod: "",
    acceptTerms: false,
  });
  const [questionSubmitting, setQuestionSubmitting] = useState(false);
  const [questionSubmitted, setQuestionSubmitted] = useState(false);
  const currencyRef = useRef<HTMLDivElement>(null);
  const corporateRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Sadece ana sayfada servis butonlarını göster
  const isHomePage = pathname === '/';

  const services = [
    { icon: BsCurrencyDollar, title: tHero('investmentService'), href: "/yatirim" },
    { icon: FaHome, title: tHero('property'), href: "/emlak" },
    { icon: FaCar, title: tHero('carRental'), href: "/arac-kiralama" },
    { icon: HiMoon, title: tHero('dailyRental'), isMoon: true, href: "/gunluk-kiralama" },
    { icon: FaShuttleVan, title: tHero('transferService'), href: "/transfer" },
    { icon: FaBalanceScale, title: tHero('legalConsultancy'), href: "/hukuki" },
  ];


  // Kullanıcı bilgilerini localStorage'dan oku
  const checkUserData = () => {
    if (typeof window === "undefined") return;
    const userData = localStorage.getItem("user_data");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    // Client-side olduğunu işaretle
    setIsClient(true);
    // İlk yüklemede kontrol et
    checkUserData();

    // Storage event listener (diğer tab'lardaki değişiklikleri dinle)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user_data") {
        if (e.newValue) {
          try {
            setUser(JSON.parse(e.newValue));
          } catch (error) {
            console.error("Error parsing user data:", error);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    };

    // Custom event listener (aynı tab'daki değişiklikleri dinle)
    const handleUserDataUpdate = () => {
      checkUserData();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userDataUpdated", handleUserDataUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userDataUpdated", handleUserDataUpdate);
    };
  }, []);

  // Pathname değiştiğinde de kontrol et (sayfa değişikliklerinde)
  useEffect(() => {
    if (isClient) {
      checkUserData();
    }
  }, [pathname, isClient]);

  // Initialize selectedLocation after t is available

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setIsCurrencyOpen(false);
      }
      if (corporateRef.current && !corporateRef.current.contains(event.target as Node)) {
        setIsCorporateOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Çıkış yap
  const handleLogout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("firebase_user");
    setUser(null);
    setIsUserMenuOpen(false);
    // Custom event dispatch et (Header'ın güncellenmesi için)
    window.dispatchEvent(new CustomEvent("userDataUpdated"));
    router.push("/");
  };

  // Soru Sor formu gönder
  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submit başladı", { questionFormData, selectedContactMethod });

    // Form validation
    if (!questionFormData.name || !questionFormData.email || !questionFormData.question) {
      alert(tCommon('validationError'));
      return;
    }

    if (!questionFormData.acceptTerms) {
      alert(tCommon('kvkkError'));
      return;
    }

    setQuestionSubmitting(true);
    console.log("Gönderiliyor...");

    try {
      const messageData = {
        type: "question",
        name: questionFormData.name,
        email: questionFormData.email,
        phone: questionFormData.phone || "",
        message: questionFormData.question,
        contactMethod: selectedContactMethod || questionFormData.contactMethod || "",
        userId: user?.id || user?.uid || null,
        status: "new",
      };

      console.log("API'ye gönderiliyor:", messageData);

      // API route kullanarak mesajı gönder (timeout sorunu olmaz)
      const response = await fetch("/api/admin/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || tCommon('messageSentError'));
      }

      const result = await response.json();
      console.log("✅ Başarıyla kaydedildi! Message ID:", result.message?.id);

      setQuestionSubmitted(true);
      setQuestionSubmitting(false);

      // 3 saniye sonra modal'ı kapat
      setTimeout(() => {
        setIsQuestionFormOpen(false);
        setQuestionFormData({
          name: "",
          email: "",
          phone: "",
          question: "",
          contactMethod: "",
          acceptTerms: false,
        });
        setSelectedContactMethod("");
        setQuestionSubmitted(false);
      }, 3000);
    } catch (error: any) {
      console.error("Error submitting question:", error);
      console.error("Error details:", {
        message: error?.message,
        stack: error?.stack
      });
      alert(`${tCommon('errorOccurred')}: ${error?.message || tCommon('tryAgain')}`);
      setQuestionSubmitting(false);
    }
  };

  const currencies = [
    { code: "TRY" as const, symbol: "₺", name: t('currencies.try') },
    { code: "USD" as const, symbol: "$", name: t('currencies.usd') },
    { code: "EUR" as const, symbol: "€", name: t('currencies.eur') },
    { code: "GBP" as const, symbol: "£", name: t('currencies.gbp') },
  ];

  // Kurumsal dropdown menü öğeleri
  const corporateMenuItems = [
    { name: t('about'), href: `/kurumsal#hakkimizda` },
    { name: t('team'), href: `/kurumsal#ekip` },
    { name: t('reviews'), href: `/kurumsal#yorumlar` },
    { name: t('contact'), href: `/kurumsal#iletisim` },
  ];

  const menuItems = [
    { name: t('blog'), href: "/blog" },
    { name: t('partners'), href: "/is-ortaklari" },
  ];


  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 backdrop-blur-xl transition-all duration-300 border-b border-white/20 ${isMenuOpen ? 'bg-black z-[10000]' : 'bg-transparent z-[9990]'}`}
        suppressHydrationWarning
      >
        <nav className="container mx-auto px-4 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Logo - Sol */}
            <div className="flex-1 flex justify-start">
              <Link href="/" prefetch={true} className="flex items-center gap-3">
                <div className="relative h-14 w-auto flex items-center">
                  <Image
                    src="/LG.png"
                    alt="TSR GROUP Logo"
                    width={200}
                    height={56}
                    className="h-14 w-auto object-contain"
                    priority
                    unoptimized
                  />
                </div>
                <div className="flex flex-col justify-center leading-none">
                  <span className="text-white font-bold text-lg sm:text-xl md:text-2xl tracking-tight" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', lineHeight: '1', letterSpacing: '0.02em' }}>TSR</span>
                  <span className="text-white font-semibold text-[9px] sm:text-[10px] md:text-xs tracking-widest uppercase" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', lineHeight: '1', marginTop: '2px', letterSpacing: '0.1em' }}>GROUP</span>
                </div>
              </Link>
            </div>

            {/* Services - Sol tarafta alt alta yuvarlak - Sadece ana sayfada göster */}
            {isHomePage && (
              <div className="hidden lg:flex flex-col gap-3 fixed left-6 top-28 z-40">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={index}
                      href={service.href}
                      prefetch={true}
                      className="group relative"
                      title={service.title}
                    >
                      <div className="relative w-14 h-14 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-xl flex items-center justify-center shadow-md border border-white/20 group-hover:border-white/50 group-hover:scale-110 transition-all duration-300">
                        {service.isMoon ? (
                          <div className="relative" style={{ width: '1.5rem', height: '1.5rem' }}>
                            <HiMoon className="absolute text-white text-lg" style={{ width: '1.5rem', height: '1.5rem' }} />
                            <FaHome className="absolute text-white text-[10px]" style={{ transform: 'translate(13px, -4px)' }} />
                          </div>
                        ) : service.title === tHero('investmentService') ? (
                          <Icon className="text-white text-xl" style={{ width: '1.6rem', height: '1.6rem' }} />
                        ) : (
                          <Icon className="text-white text-lg" />
                        )}
                      </div>
                      {/* Tooltip */}
                      <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-[#2e3c3a] text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                        {service.title}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-[#2e3c3a] rotate-45"></div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Navigasyon - Orta */}
            <div className="hidden lg:flex items-center gap-8 justify-center flex-none">
              {/* Kurumsal Dropdown */}
              <div className="relative" ref={corporateRef}>
                <button
                  onClick={() => setIsCorporateOpen(!isCorporateOpen)}
                  className="flex items-center gap-1.5 px-4 py-2 text-white hover:text-white/80 transition-all font-normal text-sm relative group whitespace-nowrap"
                >
                  {t('corporate')}
                  <ChevronDown className={`h-3 w-3 transition-transform ${isCorporateOpen ? 'rotate-180' : ''}`} />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all group-hover:w-full bg-white"></span>
                </button>

                {isCorporateOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden z-50">
                    <div className="p-2">
                      {corporateMenuItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsCorporateOpen(false)}
                          className="block px-4 py-3 text-gray-700 hover:bg-[#2e3c3a] hover:text-white rounded-lg transition-colors text-sm"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mülk Yönetimi */}
              <Link
                href="/mulk-yonetimi-hizmetleri"
                prefetch={true}
                className="transition-all font-normal text-sm relative group text-white hover:text-white/80 whitespace-nowrap"
              >
                {tCommon('buildingManagement')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all group-hover:w-full bg-white"></span>
              </Link>

              {/* Diğer Menü Öğeleri */}
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={`transition-all font-normal text-sm relative group text-white hover:text-white/80`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all group-hover:w-full bg-white"></span>
                </Link>
              ))}

              {/* Soru Sor Butonu */}
              <button
                onClick={() => setIsQuestionFormOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-white hover:text-[#EDC370] transition-all font-medium text-sm relative group whitespace-nowrap bg-white/5 hover:bg-white/10 rounded-full border border-white/10 shadow-lg"
              >
                <HelpCircle className="h-4 w-4" />
                {t('askQuestion')}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 transition-all group-hover:w-1/2 bg-[#EDC370]"></span>
              </button>
            </div>

            {/* Giriş Yap Butonu ve Dil Seçici - Sağ */}
            <div className="flex items-center space-x-3 flex-1 justify-end">
              {/* Currency Selector - Desktop Only */}
              <div className="relative hidden lg:block" ref={currencyRef}>
                <button
                  onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-lg transition-all text-sm font-normal border border-white/10 hover:border-white/20"
                >
                  <DollarSign className="h-4 w-4" />
                  <span>{currencies.find(c => c.code === currency)?.symbol || currency}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`} />
                </button>

                {isCurrencyOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50">
                    {currencies.map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          setCurrency(curr.code);
                          setIsCurrencyOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors text-sm ${currency === curr.code
                          ? 'bg-gray-100 text-gray-900 font-semibold'
                          : 'text-gray-700 hover:text-gray-900'
                          }`}
                      >
                        <span className="text-lg font-medium">{curr.symbol}</span>
                        <div className="flex-1">
                          <div className="font-medium">{curr.code}</div>
                          <div className="text-xs text-gray-500">{curr.name}</div>
                        </div>
                        {currency === curr.code && (
                          <div className="w-2 h-2 bg-[#2e3c3a] rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>


              <LanguageSwitcher />

              {/* Kullanıcı Menüsü veya Giriş Butonu */}
              {isClient && user ? (
                <div className="relative hidden md:block" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-normal text-sm transition-all hover:scale-105 shadow-lg hover:shadow-xl bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white whitespace-nowrap"
                  >
                    <User className="h-4 w-4" />
                    <span>
                      {user.firstName && user.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : user.email?.split('@')[0] || t('user')}
                    </span>
                    <ChevronDown className={`h-3 w-3 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">
                          {user.firstName && user.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : t('user')}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                      </div>
                      <Link
                        href="/kaydedilenler"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors text-sm text-gray-700"
                      >
                        <User className="h-4 w-4" />
                        {t('savedItems')}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-red-50 transition-colors text-sm text-red-600"
                      >
                        <LogOut className="h-4 w-4" />
                        {tCommon('logout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/giris"
                  prefetch={true}
                  className="hidden md:block px-5 py-2 rounded-lg font-normal text-sm transition-all hover:scale-105 shadow-lg hover:shadow-xl bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white whitespace-nowrap"
                >
                  {tCommon('login')}
                </Link>
              )}

              {/* Mobile Menu Button - Enhanced for visibility */}
              <button
                className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 relative z-[10001] ${isMenuOpen
                  ? 'bg-white/10 text-white'
                  : 'bg-black/40 text-white hover:bg-black/50 border border-white/10 shadow-lg'
                  }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <MoreVertical className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Full Screen Overlay - Outside header to avoid backdrop-filter containing block */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[10000] bg-black overflow-y-auto">
          {/* Close Button */}
          <div className="fixed top-6 right-6 z-[10001]">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20"
              aria-label="Kapat"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Menu Content */}
          <div className="pt-24 pb-12 px-6">
            <div className="container mx-auto space-y-8">
              {/* Navigation Links */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] px-2">{t('menu') || 'Menü'}</p>
                <div className="grid grid-cols-1 gap-3">
                  {/* Corporate Menu Items for Mobile */}
                  <div className="space-y-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsCorporateOpen(!isCorporateOpen);
                      }}
                      className="w-full flex items-center justify-between px-4 py-4 bg-white/5 rounded-2xl text-white font-medium hover:bg-white/10 transition-all border border-white/5"
                    >
                      <span className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#EDC370] to-[#E5B85C] flex items-center justify-center text-gray-900">
                          <Building2 className="h-4 w-4" />
                        </div>
                        {t('corporate')}
                      </span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isCorporateOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isCorporateOpen && (
                      <div
                        className="pl-4 pr-2 py-2 space-y-2 animate-slide-down"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {corporateMenuItems.map((item) => (
                          <button
                            key={item.href}
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsMenuOpen(false);
                              router.push(item.href);
                            }}
                            className="w-full text-left block px-4 py-3.5 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-sm border-l-2 border-white/10"
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mülk Yönetimi - Mobile */}
                  <Link
                    href="/mulk-yonetimi-hizmetleri"
                    prefetch={true}
                    className="flex items-center gap-3 px-4 py-4 bg-white/5 rounded-2xl text-white font-medium hover:bg-white/10 transition-all border border-white/5"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <Building2 className="h-4 w-4" />
                    </div>
                    {tCommon('buildingManagement')}
                  </Link>

                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      prefetch={true}
                      className="flex items-center gap-3 px-4 py-4 bg-white/5 rounded-2xl text-white font-medium hover:bg-white/10 transition-all border border-white/5"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        {item.href.includes('proje') ? <Compass className="h-4 w-4" /> :
                          item.href.includes('emlak') ? <Home className="h-4 w-4" /> :
                            item.href.includes('blog') ? <FileText className="h-4 w-4" /> :
                              <Navigation className="h-4 w-4" />}
                      </div>
                      {item.name}
                    </Link>
                  ))}

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsQuestionFormOpen(true);
                    }}
                    className="flex items-center gap-3 px-4 py-4 bg-white/5 rounded-2xl text-white font-medium hover:bg-white/10 transition-all border border-white/5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <HelpCircle className="h-4 w-4" />
                    </div>
                    {t('askQuestion')}
                  </button>
                </div>
              </div>

              {/* Services Section - Mobilde de göster */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] px-2">{t('services') || 'Hizmetler'}</p>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={index}
                        href={service.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex flex-col items-center justify-center gap-3 px-4 py-5 bg-white/5 rounded-2xl text-white font-medium hover:bg-white/10 transition-all border border-white/5"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EDC370] to-[#E5B85C] flex items-center justify-center">
                          {service.isMoon ? (
                            <div className="relative" style={{ width: '1.5rem', height: '1.5rem' }}>
                              <HiMoon className="absolute text-gray-900 text-lg" style={{ width: '1.5rem', height: '1.5rem' }} />
                              <FaHome className="absolute text-gray-900 text-[10px]" style={{ transform: 'translate(13px, -4px)' }} />
                            </div>
                          ) : service.title === tHero('investmentService') ? (
                            <Icon className="text-gray-900 text-xl" style={{ width: '1.6rem', height: '1.6rem' }} />
                          ) : (
                            <Icon className="text-gray-900 text-lg" />
                          )}
                        </div>
                        <span className="text-xs text-center leading-tight">{service.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Settings Section */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] px-2">{t('settings') || 'Ayarlar'}</p>
                <div className="grid grid-cols-2 gap-3">
                  {/* Language Selector */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setIsMobileLangOpen(!isMobileLangOpen);
                        setIsCurrencyOpen(false);
                      }}
                      className="w-full flex flex-col items-center justify-center gap-2 px-3 py-5 bg-white/5 rounded-2xl text-white border border-white/10 hover:bg-white/10 transition-all"
                    >
                      <Globe className="h-5 w-5 text-[#EDC370]" />
                      <span className="text-xs font-semibold">{t('language') || 'Dil'}</span>
                    </button>
                    {isMobileLangOpen && (
                      <div className="absolute bottom-full left-0 right-0 mb-2 z-[10002] bg-[#1a1a1a] border border-white/20 rounded-2xl shadow-2xl p-2 animate-scale-in">
                        {['tr', 'en', 'ru'].map((l) => (
                          <button
                            key={l}
                            onClick={() => {
                              // Use Google Translate switching logic
                              const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
                              if (select) {
                                select.value = l;
                                select.dispatchEvent(new Event('change'));
                              } else {
                                const host = window.location.hostname;
                                document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                                document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${host}`;
                                document.cookie = `googtrans=/auto/${l}; path=/;`;
                                document.cookie = `googtrans=/auto/${l}; path=/; domain=${host}`;
                                window.location.reload();
                              }
                              setIsMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-3 rounded-lg mb-1 text-sm ${locale === l ? 'bg-[#EDC370] text-gray-900' : 'text-white hover:bg-white/10'}`}
                          >
                            <span>{l === 'tr' ? 'Türkçe' : l === 'en' ? 'English' : 'Русский'}</span>
                            {locale === l && <Check className="h-4 w-4" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Currency Selector */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setIsCurrencyOpen(!isCurrencyOpen);
                        setIsMobileLangOpen(false);
                      }}
                      className="w-full flex flex-col items-center justify-center gap-2 px-3 py-5 bg-white/5 rounded-2xl text-white border border-white/10 hover:bg-white/10 transition-all"
                    >
                      <DollarSign className="h-5 w-5 text-[#EDC370]" />
                      <span className="text-xs font-semibold">{currency}</span>
                    </button>
                    {isCurrencyOpen && (
                      <div className="absolute bottom-full left-0 right-0 mb-2 z-[10002] bg-[#1a1a1a] border border-white/20 rounded-2xl shadow-2xl p-2 animate-scale-in">
                        {currencies.map((curr) => (
                          <button
                            key={curr.code}
                            onClick={() => {
                              setCurrency(curr.code);
                              setIsCurrencyOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-3 rounded-lg mb-1 text-sm ${currency === curr.code ? 'bg-[#EDC370] text-gray-900' : 'text-white hover:bg-white/10'}`}
                          >
                            <span>{curr.code} ({curr.symbol})</span>
                            {currency === curr.code && <Check className="h-4 w-4" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* Login/User Section */}
              <div className="pt-6 border-t border-white/10">
                {isClient && user ? (
                  <div className="space-y-4">
                    <div className="px-5 py-5 bg-gradient-to-br from-[#2e3c3a] to-[#3a4d4a] rounded-3xl border border-white/10 flex items-center gap-4 shadow-xl">
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                        <User className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-bold text-white truncate">
                          {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email?.split('@')[0]}
                        </p>
                        <p className="text-xs text-white/50 truncate">{user.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/kaydedilenler"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex flex-col items-center justify-center gap-2 p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all"
                      >
                        <Heart className="h-6 w-6 text-red-400" />
                        <span className="text-xs font-medium text-white">{t('savedItems') || 'Favoriler'}</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex flex-col items-center justify-center gap-2 p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-red-500/10 transition-all text-red-400"
                      >
                        <LogOut className="h-6 w-6" />
                        <span className="text-xs font-medium">{tCommon('logout')}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/giris"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-3 w-full py-5 bg-gradient-to-r from-[#EDC370] via-[#E5B85C] to-[#EDC370] text-gray-900 font-bold rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <User className="h-5 w-5" />
                    <span>{tCommon('login')} / {tCommon('register') || 'Üye Ol'}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Soru Sor Form Modal */}
      {
        isQuestionFormOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
              onClick={() => setIsQuestionFormOpen(false)}
            />

            {/* Modal Content */}
            <div
              className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto flex flex-col animate-scale-in"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex-shrink-0 border-b border-gray-100 px-8 py-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">{tQuestion('title')}</h2>
                  <button
                    onClick={() => setIsQuestionFormOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    aria-label={tCommon('close')}
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                {/* Form Content */}
                <div className="p-8">
                  {questionSubmitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center py-12">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200">
                        <Check className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-green-900 mb-2">{tQuestion('success')}</h3>
                      <p className="text-green-700">{tQuestion('successMessage')}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleQuestionSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {tQuestion('name')} *
                          </label>
                          <input
                            type="text"
                            required
                            value={questionFormData.name}
                            onChange={(e) => setQuestionFormData({ ...questionFormData, name: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#2e3c3a] focus:ring-1 focus:ring-[#2e3c3a] outline-none transition-all"
                            placeholder={tQuestion('name')}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {tQuestion('email')} *
                          </label>
                          <input
                            type="email"
                            required
                            value={questionFormData.email}
                            onChange={(e) => setQuestionFormData({ ...questionFormData, email: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#2e3c3a] focus:ring-1 focus:ring-[#2e3c3a] outline-none transition-all"
                            placeholder="ornek@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {tQuestion('phone')}
                        </label>
                        <input
                          type="tel"
                          value={questionFormData.phone}
                          onChange={(e) => setQuestionFormData({ ...questionFormData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#2e3c3a] focus:ring-1 focus:ring-[#2e3c3a] outline-none transition-all"
                          placeholder="+90 5XX XXX XX XX"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {tQuestion('question')} *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={questionFormData.question}
                          onChange={(e) => setQuestionFormData({ ...questionFormData, question: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#2e3c3a] focus:ring-1 focus:ring-[#2e3c3a] outline-none transition-all resize-none"
                          placeholder={tQuestion('question')}
                        ></textarea>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-4">{tQuestion('contactMethod')}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { id: 'instagram', icon: FaInstagram, color: '#E4405F', label: 'Instagram' },
                            { id: 'telegram', icon: FaTelegram, color: '#0088cc', label: 'Telegram' },
                            { id: 'whatsapp', icon: FaWhatsapp, color: '#25D366', label: 'WhatsApp' },
                            { id: 'phone', icon: FaPhone, color: '#2e3c3a', label: 'Telefon' }
                          ].map((method) => (
                            <button
                              key={method.id}
                              type="button"
                              onClick={() => {
                                const val = selectedContactMethod === method.id ? "" : method.id;
                                setSelectedContactMethod(val);
                                setQuestionFormData({ ...questionFormData, contactMethod: val });
                              }}
                              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${selectedContactMethod === method.id
                                ? 'bg-gray-900 border-gray-900 text-white scale-95'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                            >
                              <method.icon className="h-6 w-6 mb-2" style={{ color: selectedContactMethod === method.id ? 'white' : method.color }} />
                              <span className="text-[10px] font-bold">{method.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            required
                            checked={questionFormData.acceptTerms}
                            onChange={(e) => setQuestionFormData({ ...questionFormData, acceptTerms: e.target.checked })}
                            className="mt-1 w-5 h-5 rounded border-gray-300 text-[#2e3c3a] focus:ring-[#2e3c3a]"
                          />
                          <span className="text-[12px] text-gray-500 leading-tight">
                            <a href="/kvkk" target="_blank" className="text-blue-600 hover:underline">KVKK</a> {tQuestion('acceptTerms')} *
                          </span>
                        </label>
                      </div>

                      <div className="flex gap-4 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsQuestionFormOpen(false)}
                          className="flex-1 px-6 py-4 border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                        >
                          {tCommon('cancel')}
                        </button>
                        <button
                          type="submit"
                          disabled={questionSubmitting}
                          className="flex-1 px-6 py-4 bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] text-white rounded-xl font-bold shadow-lg shadow-gray-200 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                        >
                          {questionSubmitting ? tQuestion('submitting') : tQuestion('submit')}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </>
        )
      }
    </>
  );
}
