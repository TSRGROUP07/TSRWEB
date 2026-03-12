"use client";

import { useState } from "react";
import { Home, Building2, MapPin, Calculator, TrendingUp, Users, CheckCircle, ArrowRight, Square, LandPlot, Phone, Mail, User, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useTranslations } from 'next-intl';

interface PropertyType {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const roomTypes = ["1+1", "2+1", "3+1", "4+1", "5+1"];


export default function PropertyCalculator() {
  const t = useTranslations('propertyCalculator');
  const tCommon = useTranslations('common');

  // Standart danışman bilgisi
  const defaultConsultant = {
    name: t('defaultConsultantName'),
    phone: "05303330097"
  };
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState<string>("konut");
  const [area, setArea] = useState<string>("100");
  const [roomType, setRoomType] = useState<string>("3+1");
  const [buildingAge, setBuildingAge] = useState<string>("5");
  const [location, setLocation] = useState<string>("");

  // Kullanıcı bilgileri
  const [userName, setUserName] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const propertyTypes: PropertyType[] = [
    { id: "konut", name: t('propertyTypes.residential'), icon: <Home className="h-6 w-6" /> },
    { id: "arsa", name: t('propertyTypes.land'), icon: <Square className="h-6 w-6" /> },
    { id: "arazi", name: t('propertyTypes.plot'), icon: <LandPlot className="h-6 w-6" /> },
    { id: "ticari", name: t('propertyTypes.commercial'), icon: <Building2 className="h-6 w-6" /> },
  ];

  const handleStep1Next = () => {
    if (area && location) {
      setStep(2);
    }
  };

  const handleStep2Next = () => {
    if (userName && userPhone && userEmail) {
      setStep(3);
    }
  };

  const handleStep3Submit = () => {
    setIsSubmitted(true);
    setStep(4);
    // Burada API çağrısı yapılabilir
    console.log("Form gönderildi:", {
      propertyType,
      area,
      roomType,
      buildingAge,
      location,
      userName,
      userPhone,
      userEmail,
      consultant: defaultConsultant,
    });
  };

  const steps = [
    {
      id: 1,
      title: t('steps.step1Title'),
      description: t('steps.step1Desc'),
      icon: <Calculator className="h-6 w-6" />,
    },
    {
      id: 2,
      title: t('steps.step2Title'),
      description: t('steps.step2Desc'),
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      id: 3,
      title: t('steps.step3Title'),
      description: t('steps.step3Desc'),
      icon: <Users className="h-6 w-6" />,
    },
    {
      id: 4,
      title: t('steps.step4Title'),
      description: t('steps.step4Desc'),
      icon: <CheckCircle className="h-6 w-6" />,
    },
  ];

  return (
    <div className="bg-[#b7b1ad] py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{t('title')}</h2>
            <p className="text-white/80">{t('subtitle')}</p>
          </div>
          <Link
            href="/iletisim"
            className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2 whitespace-nowrap"
          >
            <Phone className="h-5 w-5" />
            <span>{t('contactForInfo')}</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol Panel - Form */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('featuresTitle')}</h2>
            <p className="text-gray-600 mb-8">{t('featuresSubtitle')}</p>

            {step === 1 && (
              <>
                {/* Emlak Kategorisi */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">{t('category')}</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {propertyTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setPropertyType(type.id)}
                        className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${propertyType === type.id
                          ? "border-[#4f271b] bg-[#4f271b] text-white shadow-lg"
                          : "border-gray-200 bg-white text-gray-700 hover:border-[#4f271b]/50"
                          }`}
                      >
                        <div className="flex-shrink-0">{type.icon}</div>
                        <span className="font-semibold text-sm sm:text-base">{type.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Alan */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('area')}</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4f271b] focus:outline-none text-lg text-gray-900"
                      placeholder="100"
                    />
                    <span className="text-gray-600 font-semibold">{t('units.sqm')}</span>
                  </div>
                </div>

                {/* Oda */}
                {propertyType === "konut" && (
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-4">{t('rooms')}</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {roomTypes.map((room) => (
                        <button
                          key={room}
                          onClick={() => setRoomType(room)}
                          className={`p-3 rounded-xl border-2 transition-all font-semibold text-sm ${roomType === room
                            ? "border-[#4f271b] bg-[#4f271b] text-white shadow-lg"
                            : "border-gray-200 bg-white text-gray-700 hover:border-[#4f271b]/50"
                            }`}
                        >
                          {room}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bina Yaşı */}
                {propertyType === "konut" && (
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('buildingAge')}</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={buildingAge}
                        onChange={(e) => setBuildingAge(e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4f271b] focus:outline-none text-lg text-gray-900"
                        placeholder="5"
                      />
                      <span className="text-gray-600 font-semibold">{t('units.year')}</span>
                    </div>
                  </div>
                )}

                {/* Konum */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('location')}</label>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4f271b] focus:outline-none text-gray-900"
                      placeholder={t('locationPlaceholder')}
                    />
                  </div>
                </div>

                {/* Devam Butonu */}
                <button
                  onClick={handleStep1Next}
                  className="w-full bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <span>{t('continue')}</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{t('personalInfoTitle')}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{t('personalInfoDesc')}</p>
                </div>

                {/* Ad Soyad */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('userName')}</label>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4f271b] focus:outline-none text-gray-900"
                      placeholder={t('userNamePlaceholder')}
                      required
                    />
                  </div>
                </div>

                {/* Telefon */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('userPhone')}</label>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4f271b] focus:outline-none text-gray-900"
                      placeholder={t('userPhonePlaceholder')}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('userEmail')}</label>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4f271b] focus:outline-none text-gray-900"
                      placeholder={t('userEmailPlaceholder')}
                      required
                    />
                  </div>
                </div>

                {/* Geri ve Devam Butonları */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all border-2 border-white/30"
                  >
                    {t('back')}
                  </button>
                  <button
                    onClick={handleStep2Next}
                    className="flex-1 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <span>{t('continue')}</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{t('consultantTitle')}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{t('consultantDesc')}</p>
                </div>

                {/* Standart Danışman Bilgisi */}
                <div className="mb-8 p-6 rounded-xl border-2 border-[#4f271b] bg-[#4f271b]/5 shadow-lg">
                  <div className="flex items-center gap-4">
                    {/* İkon (Fotoğraf yerine) */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      <User className="h-8 w-8" />
                    </div>

                    {/* Bilgiler */}
                    <div className="flex-1">
                      <h4 className="font-bold text-[#4f271b] mb-2 text-lg">{defaultConsultant.name}</h4>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="h-4 w-4" />
                        <a href={`tel:+90${defaultConsultant.phone.replace(/\s/g, '')}`} className="font-semibold hover:text-[#4f271b] transition-colors">
                          {defaultConsultant.phone}
                        </a>
                      </div>
                    </div>

                    {/* Onay İşareti */}
                    <div>
                      <CheckCircle className="h-8 w-8 text-[#4f271b]" />
                    </div>
                  </div>
                </div>

                {/* Geri ve Gönder Butonları */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all border-2 border-gray-200"
                  >
                    {t('back')}
                  </button>
                  <button
                    onClick={handleStep3Submit}
                    className="flex-1 bg-[#4f271b] hover:bg-[#3d1f15] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>{tCommon('submit')}</span>
                  </button>
                </div>
              </>
            )}

            {step === 4 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('successTitle')}</h3>
                <p className="text-gray-600 mb-6">
                  {t('successDesc')}
                </p>
                <Link
                  href="/iletisim"
                  className="inline-block bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  {t('goToContact')}
                </Link>
              </div>
            )}
          </div>

          {/* Sağ Panel - Wizard */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('howItWorks')}</h2>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {steps.map((s, index) => (
                  <div key={s.id} className="flex items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s.id
                        ? "bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white"
                        : "bg-gray-200 text-gray-500"
                        }`}
                    >
                      {s.id}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-2 transition-all ${step > s.id ? "bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a]" : "bg-gray-200"
                          }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Cards */}
            <div className="space-y-4">
              {steps.map((s) => (
                <div
                  key={s.id}
                  className={`p-6 rounded-xl border-2 transition-all ${step === s.id
                    ? "border-[#4f271b] bg-[#4f271b]/5 shadow-lg"
                    : "border-gray-200 bg-white"
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg ${step === s.id
                        ? "bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white"
                        : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {s.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg mb-2 ${step === s.id ? "text-[#4f271b]" : "text-gray-900"}`}>{s.title}</h3>
                      <p className="text-gray-600 text-sm">{s.description}</p>
                    </div>
                    {step === s.id && (
                      <ArrowRight className="h-5 w-5 text-[#4f271b]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
