import { Metadata } from "next";
import { createMultilingualMetadata } from "@/lib/seo";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await cookies()).get('locale')?.value as 'tr' | 'en' | 'ru' || 'en';

  return createMultilingualMetadata({
    locale,
    titles: {
      tr: "Araç Kiralama - TSR GROUP",
      en: "Car Rental Alanya & Antalya - Rent a Car Turkey | Cheap Car Hire",
      ru: "Аренда Авто Аланья и Анталья - Прокат Машин Турция",
    },
    descriptions: {
      tr: "Alanya ve Antalya'da araç kiralama hizmeti. Uygun fiyatlı ve güvenilir araç kiralama seçenekleri.",
      en: "Affordable car rental in Alanya & Antalya, Turkey. Wide range of vehicles: economy, luxury, SUV. Best prices, no hidden fees. Book your rental car online. Airport pickup available.",
      ru: "Аренда автомобилей в Аланье и Анталии, Турция. Широкий выбор машин: эконом, люкс, внедорожники. Лучшие цены, доставка в аэропорт.",
    },
    keywords: {
      tr: ["araç kiralama", "rent a car", "Alanya araç kiralama", "Antalya araç kiralama", "ucuz araç kiralama", "oto kiralama"],
      en: [
        "car rental Alanya", "rent a car Antalya", "cheap car hire Turkey",
        "vehicle rental Alanya", "car hire Antalya airport", "rent a car Turkey",
        "economy car rental", "luxury car rental Alanya", "SUV rental Antalya",
        "motorcycle rental Turkey", "scooter rental Alanya"
      ],
      ru: [
        "аренда авто Аланья", "прокат машин Анталья", "аренда автомобиля Турция",
        "машина напрокат Аланья", "прокат авто аэропорт Анталья", "недорогая аренда авто",
        "аренда внедорожника Турция", "прокат мотоцикла Аланья"
      ],
    },
    url: "/arac-kiralama",
  });
}

export default function AracKiralamaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
