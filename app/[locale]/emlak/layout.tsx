import { Metadata } from "next";
import { createMultilingualMetadata } from "@/lib/seo";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value || 'en') as 'tr' | 'en' | 'ru' | 'bs';

  return createMultilingualMetadata({
    locale,
    titles: {
      tr: "Emlak Alanya & Antalya | TSR GROUP - Satılık & Kiralık Daire, Villa | En İyi Fiyatlar",
      en: "Real Estate Alanya & Antalya | TSR GROUP - For Sale & Rent Apartment, Villa | Best Prices",
      ru: "Недвижимость Алания и Анталья | TSR GROUP - Продажа и Аренда Квартир, Вилл | Лучшие цены",
      bs: "Nekretnine Alanya & Antalija | TSR GROUP - Stanovi i Vile na Prodaju | Najbolje Cijene",
    },
    descriptions: {
      tr: "Alanya ve Antalya'da satılık ve kiralık emlak ilanları. Daire, villa, işyeri, arsa. Deniz manzaralı, havuzlu, lüks emlak seçenekleri. 3D tur, fiyat analizi, yatırım danışmanlığı. En güncel ilanlar.",
      en: "Real estate listings for sale and rent in Alanya and Antalya. Apartment, villa, commercial property, land. Sea view, pool, luxury property options. 3D tour, price analysis, investment consultancy. Latest listings.",
      ru: "Объявления о продаже и аренде недвижимости в Алании и Анталье. Квартиры, виллы, коммерческая недвижимость, земельные участки. Варианты с видом на море, бассейном, люкс недвижимость. 3D тур, анализ цен, инвестиционные консультации. Последние объявления.",
      bs: "Oglasi nekretnina na prodaju i najam u Alanji i Antaliji. Stanovi, vile, poslovni prostori, zemljišta. Pogled na more, bazen, luksuzne nekretnine. 3D ture, analiza cijena, investicijsko savjetovanje. Najnoviji oglasi.",
    },
    keywords: {
      tr: [
        "emlak alanya",
        "emlak antalya",
        "satılık daire alanya",
        "satılık daire antalya",
        "kiralık daire alanya",
        "kiralık daire antalya",
        "satılık villa alanya",
        "satılık villa antalya",
        "kiralık villa alanya",
        "kiralık villa antalya",
        "gayrimenkul alanya",
        "gayrimenkul antalya",
        "emlak ilanları alanya",
        "emlak ilanları antalya",
        "deniz manzaralı daire alanya",
        "havuzlu villa antalya",
        "tsr group emlak",
        "yatırım emlak alanya",
      ],
      en: [
        "real estate alanya",
        "real estate antalya",
        "apartment for sale alanya",
        "apartment for sale antalya",
        "apartment for rent alanya",
        "apartment for rent antalya",
        "villa for sale alanya",
        "villa for sale antalya",
        "villa for rent alanya",
        "villa for rent antalya",
        "property alanya",
        "property antalya",
        "real estate listings alanya",
        "real estate listings antalya",
        "sea view apartment alanya",
        "pool villa antalya",
        "tsr group real estate",
        "investment property alanya",
      ],
      ru: [
        "недвижимость алания",
        "недвижимость анталья",
        "квартира продажа алания",
        "квартира продажа анталья",
        "квартира аренда алания",
        "квартира аренда анталья",
        "вилла продажа алания",
        "вилла продажа анталья",
        "вилла аренда алания",
        "вилла аренда анталья",
        "недвижимость алания",
        "недвижимость анталья",
        "объявления недвижимость алания",
        "объявления недвижимость анталья",
        "квартира вид на море алания",
        "вилла с бассейном анталья",
        "tsr group недвижимость",
        "инвестиционная недвижимость алания",
      ],
      bs: [
        "nekretnine alanya",
        "nekretnine antalija",
        "stan na prodaju alanya",
        "stan na prodaju antalija",
        "stan za najam alanya",
        "stan za najam antalija",
        "vila na prodaju alanya",
        "vila na prodaju antalija",
        "vila za najam alanya",
        "vila za najam antalija",
        "nekretnine turska",
        "oglasi nekretnina alanya",
        "stan s pogledom na more",
        "vila s bazenom antalija",
        "tsr group nekretnine",
        "investicija nekretnine alanya",
      ],
    },
    url: "/emlak",
  });
}

export default function EmlakLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
