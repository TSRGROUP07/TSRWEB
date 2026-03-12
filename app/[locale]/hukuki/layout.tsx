import { Metadata } from "next";
import { createMultilingualMetadata } from "@/lib/seo";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await cookies()).get('locale')?.value as 'tr' | 'en' | 'ru' | 'bs' || 'en';

  return createMultilingualMetadata({
    locale,
    titles: {
      tr: "Hukuki Danışmanlık - TSR GROUP",
      en: "Legal Services Turkey - Property Lawyer Alanya & Antalya | Real Estate Law",
      ru: "Юридические Услуги Турция - Юрист по Недвижимости Аланья и Анталья",
      bs: "Pravne Usluge Turska - Advokat za Nekretnine Alanya i Antalija",
    },
    descriptions: {
      tr: "Alanya ve Antalya'da hukuki danışmanlık hizmeti. Yabancılar için emlak hukuku, vatandaşlık ve oturma izni danışmanlığı.",
      en: "Expert legal services in Alanya & Antalya, Turkey. Property law for foreigners, real estate transactions, Turkish citizenship applications, residence permits. English & Russian-speaking lawyers.",
      ru: "Профессиональные юридические услуги в Аланье и Анталии, Турция. Сопровождение сделок с недвижимостью, получение гражданства Турции, ВНЖ. Русскоязычные юристы.",
      bs: "Profesionalne pravne usluge u Alanji i Antaliji, Turska. Pravo nekretnina za strance, transakcije nekretnina, aplikacije za tursko državljanstvo, dozvole boravka. Advokati koji govore engleski i ruski.",
    },
    keywords: {
      tr: ["hukuki danışmanlık", "emlak hukuku", "avukat Alanya", "gayrimenkul hukuku", "vatandaşlık danışmanlığı", "oturma izni"],
      en: [
        "property lawyer Alanya", "real estate lawyer Turkey", "legal services Antalya",
        "Turkish citizenship lawyer", "property law Turkey", "real estate attorney Alanya",
        "legal consultancy Turkey", "residence permit lawyer", "investment legal advice",
        "foreign property purchase lawyer"
      ],
      ru: [
        "юрист по недвижимости Аланья", "юридические услуги Турция", "адвокат Анталья",
        "юрист по недвижимости Турция", "гражданство Турции юрист", "ВНЖ в Турции",
        "сопровождение сделок недвижимость", "консультация юриста Турция"
      ],
      bs: [
        "advokat za nekretnine Alanya", "pravne usluge Turska", "advokat Antalija",
        "pravo nekretnina Turska", "tursko državljanstvo advokat", "boravišna dozvola Turska",
        "pravno savjetovanje kupovina nekretnina", "advokat za strance Turska"
      ],
    },
    url: "/hukuki",
  });
}

export default function HukukiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

