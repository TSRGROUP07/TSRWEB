import { Metadata } from "next";
import { createMultilingualMetadata } from "@/lib/seo";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await cookies()).get('locale')?.value as 'tr' | 'en' | 'ru' | 'bs' || 'en';

  return createMultilingualMetadata({
    locale,
    titles: {
      tr: "Transfer Hizmetleri - TSR GROUP",
      en: "Airport Transfer Alanya & Antalya - VIP Transfer Services Turkey",
      ru: "Трансфер Аланья и Анталья - VIP Трансфер из Аэропорта Турция",
      bs: "Aerodromski Transfer Alanya & Antalija - VIP Transfer Usluge Turska",
    },
    descriptions: {
      tr: "Alanya ve Antalya'da havaalanı transfer hizmeti. Konforlu ve güvenli transfer çözümleri.",
      en: "Premium airport transfer services in Alanya & Antalya, Turkey. Private VIP transfers, comfortable transportation from Antalya airport to Alanya hotels and resorts. 24/7 service.",
      ru: "Премиум трансфер из аэропорта Анталья в Аланью. Частный VIP трансфер, комфортная перевозка до отелей и курортов. Круглосуточный сервис.",
      bs: "Premium aerodromski transfer u Alanji i Antaliji, Turska. Privatni VIP transferi, udoban prijevoz od aerodroma Antalija do hotela i odmarališta u Alanji. 24/7 usluga.",
    },
    keywords: {
      tr: ["transfer", "havaalanı transferi", "Alanya transfer", "Antalya transfer", "VIP transfer", "özel transfer"],
      en: [
        "Alanya airport transfer", "Antalya airport transfer", "transfer service Turkey",
        "private transfer Alanya", "VIP transfer Antalya", "airport shuttle Alanya",
        "Antalya to Alanya transfer", "airport pickup Turkey", "luxury transfer service",
        "hotel transfer Alanya", "resort transfer Antalya"
      ],
      ru: [
        "трансфер Аланья", "трансфер Анталья аэропорт", "частный трансфер Турция",
        "VIP трансфер Аланья", "такси аэропорт Анталья", "трансфер из аэропорта",
        "трансфер в отель Аланья", "заказать трансфер Турция", "трансфер Анталья Аланья"
      ],
      bs: [
        "aerodromski transfer Alanya", "transfer Antalija aerodrom", "privatni transfer Turska",
        "VIP transfer Alanya", "taksi aerodrom Antalija", "transfer iz aerodroma",
        "transfer do hotela Alanya", "naručiti transfer Turska", "transfer Antalija Alanya"
      ],
    },
    url: "/transfer",
  });
}

export default function TransferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

