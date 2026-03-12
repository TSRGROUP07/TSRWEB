import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Online Ödeme",
  description: "Güvenli online ödeme sistemi. Kredi kartı ve banka kartı ile güvenli ödeme yapın.",
  keywords: [
    "online ödeme",
    "güvenli ödeme",
    "kredi kartı ödeme",
    "TSR GROUP",
  ],
  url: "/odeme",
  robots: {
    index: false, // Ödeme sayfası arama motorlarında indekslenmesin
    follow: true,
  },
});












