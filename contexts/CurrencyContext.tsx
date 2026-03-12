"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Currency = "TRY" | "USD" | "EUR" | "GBP" | "RUB";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertAmount: (amount: number, fromCurrency?: Currency) => number;
  formatCurrency: (amount: number, fromCurrency?: Currency) => string;
  exchangeRates: Record<Currency, number>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Güncel döviz kurları (API'den çekilecek, bunlar varsayılan değerler)
const defaultExchangeRates: Record<Currency, number> = {
  EUR: 1,      // Baz: EUR
  USD: 1.08,   // 1 EUR = 1.08 USD
  GBP: 0.84,   // 1 EUR = 0.84 GBP
  TRY: 37.20,  // 1 EUR = 37.20 TRY
  RUB: 100.0,  // 1 EUR = 100 RUB
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("EUR");
  const [exchangeRates, setExchangeRates] = useState<Record<Currency, number>>(defaultExchangeRates);
  const [mounted, setMounted] = useState(false);

  // Döviz kurlarını API'den çek
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
        const data = await res.json();
        if (data && data.rates) {
          setExchangeRates({
            EUR: 1,
            USD: data.rates.USD || defaultExchangeRates.USD,
            GBP: data.rates.GBP || defaultExchangeRates.GBP,
            TRY: data.rates.TRY || defaultExchangeRates.TRY,
            RUB: data.rates.RUB || defaultExchangeRates.RUB,
          });
          console.log("✅ Güncel kurlar (EUR bazlı) yüklendi:", data.rates);
        }
      } catch (error) {
        console.error("Döviz kuru çekme hatası:", error);
      }
    };

    fetchRates();
    // Her saat başı güncelle
    const interval = setInterval(fetchRates, 3600000);
    return () => clearInterval(interval);
  }, []);

  // LocalStorage'dan para birimi yükle - sadece client-side'da
  useEffect(() => {
    setMounted(true);
    const savedCurrency = localStorage.getItem("currency") as Currency;
    if (savedCurrency && ["TRY", "USD", "EUR", "GBP", "RUB"].includes(savedCurrency)) {
      setCurrencyState(savedCurrency);
    }
  }, []);

  // Para birimini değiştir ve localStorage'a kaydet
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    if (typeof window !== 'undefined') {
      localStorage.setItem('currency', newCurrency);
    }
  };

  // Tutarı seçilen para birimine çevir (Baz: EUR)
  const convertAmount = (amount: number, fromCurrency?: Currency): number => {
    const from = fromCurrency || "EUR";

    // Eğer aynıysa çevirme
    if (currency === from) return amount;

    // 1. Adım: Kaynak para biriminden EUR'ya çevir
    // amountInEur = amount / rate[from]
    const rateFrom = exchangeRates[from] || 1;
    const amountInEur = from === "EUR" ? amount : amount / rateFrom;

    // 2. Adım: EUR'dan hedef para birimine çevir
    // result = amountInEur * rate[target]
    const rateTo = exchangeRates[currency] || 1;
    return currency === "EUR" ? amountInEur : amountInEur * rateTo;
  };

  // Tutarı formatlanmış string olarak döndür
  const formatCurrency = (amount: number, fromCurrency?: Currency): string => {
    const from = fromCurrency || "EUR";
    const convertedAmount = convertAmount(amount, from);

    const currencySymbols: Record<Currency, string> = {
      TRY: "₺",
      USD: "$",
      EUR: "€",
      GBP: "£",
      RUB: "₽",
    };

    const formatted = convertedAmount.toLocaleString("tr-TR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    if (currency === "RUB" || currency === "TRY") {
      return `${formatted} ${currencySymbols[currency]}`;
    }

    return `${currencySymbols[currency]} ${formatted}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        convertAmount,
        formatCurrency,
        exchangeRates,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
