import { Metadata } from "next";
import { createMultilingualMetadata } from "@/lib/seo";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await cookies()).get('locale')?.value as 'tr' | 'en' | 'ru' | 'bs' || 'en';

  return createMultilingualMetadata({
    locale,
    titles: {
      tr: "Günlük Kiralama - TSR GROUP",
      en: "Daily Rental Alanya & Antalya - Holiday Apartments Turkey | Vacation Rentals",
      ru: "Посуточная Аренда Аланья и Анталья - Квартиры на Отдых Турция",
      bs: "Dnevni Najam Alanya & Antalija - Apartmani za Odmor Turska | Najem za Odmor",
    },
    descriptions: {
      tr: "Alanya ve Antalya'da günlük kiralama hizmeti. Tatil için kiralık daireler, villalar ve evler.",
      en: "Daily & short-term vacation rentals in Alanya & Antalya, Turkey. Holiday apartments, villas, houses for rent. Perfect for your Turkish holiday. Best prices for daily rental properties.",
      ru: "Посуточная аренда квартир в Аланье и Анталии, Турция. Апартаменты, виллы, дома для отдыха. Лучшие цены на жильё для отпуска.",
      bs: "Dnevni i kratkoročni najam za odmor u Alanji i Antaliji, Turska. Apartmani, vile, kuće za najam. Savršeno za vaš odmor u Turskoj. Najbolje cijene za dnevni najam nekretnina.",
    },
    keywords: {
      tr: ["günlük kiralama", "tatil evi", "kiralık daire", "villa kiralama", "kısa süreli kiralama", "Alanya kiralık", "Antalya tatil evi"],
      en: [
        "daily rental Alanya", "holiday apartment Antalya", "vacation rental Turkey",
        "short term rental Alanya", "holiday home Turkey", "apartment rental Antalya",
        "villa rental Alanya", "vacation apartment Turkey", "rent apartment Alanya",
        "holiday house Antalya", "furnished apartment rental"
      ],
      ru: [
        "посуточная аренда Аланья", "аренда квартир Анталья", "квартиры на отдых Турция",
        "апартаменты Аланья", "снять квартиру Анталья", "аренда жилья Турция",
        "аренда вилл Аланья", "дома на отдых Анталья", "краткосрочная аренда"
      ],
      bs: [
        "dnevni najam Alanya", "apartman za odmor Antalija", "najam za odmor Turska",
        "kratkoročni najam Alanya", "kuća za odmor Turska", "najam stana Antalija",
        "najam vile Alanya", "apartman Turska", "iznajmiti stan Alanya",
        "kuća za odmor Antalija", "namješten stan najam"
      ],
    },
    url: "/gunluk-kiralama",
  });
}

export default function GunlukKiralamaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

