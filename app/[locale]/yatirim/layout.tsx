import { Metadata } from "next";
import { createMultilingualMetadata } from "@/lib/seo";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
    const locale = (await cookies()).get('locale')?.value as 'tr' | 'en' | 'ru' | 'bs' || 'en';

    return createMultilingualMetadata({
        locale,
        titles: {
            tr: "Yatırım Danışmanlığı - TSR GROUP",
            en: "Investment Consultancy Turkey - Real Estate ROI Alanya & Antalya",
            ru: "Инвестиционный Консалтинг Турция - Доходность Недвижимости Аланья",
            bs: "Investicijsko Savjetovanje Turska - Prinos Nekretnina Alanya & Antalija",
        },
        descriptions: {
            tr: "Türkiye'de gayrimenkul yatırımınızı maksimize edin. Yüksek kira getirili mülkler, sermaye değer artışı fırsatları, profesyonel danışmanlık.",
            en: "Maximize your real estate investment in Turkey. High rental yield properties, capital appreciation opportunities, professional consultancy in Alanya & Antalya.",
            ru: "Максимизируйте инвестиции в недвижимость Турции. Высокодоходная аренда, прирост капитала, профессиональный консалтинг в Аланье и Анталье.",
            bs: "Maksimalizirajte investiciju u nekretnine Turske. Visoki prinosi najma, rast kapitala, profesionalno savjetovanje u Alanji i Antaliji.",
        },
        keywords: {
            tr: [
                "yatırım danışmanlığı", "emlak yatırımı", "gayrimenkul yatırım", "yatırım Alanya",
                "Türkiye yatırım", "kira getirisi", "değer artışı", "yatırım fırsatları"
            ],
            en: [
                "investment consultancy Turkey", "real estate investment Alanya", "property investment Antalya",
                "high rental yield Turkey", "capital appreciation Turkey", "ROI property Turkey",
                "buy to let Alanya", "investment opportunities Turkey", "Turkish citizenship investment"
            ],
            ru: [
                "инвестиционный консалтинг Турция", "инвестиции недвижимость Аланья", "вложения Анталья",
                "высокая доходность аренды Турция", "прирост капитала", "доходная недвижимость",
                "инвестиционные возможности Турция", "гражданство за инвестиции"
            ],
            bs: [
                "investicijsko savjetovanje Turska", "investicija nekretnine Alanya", "ulaganje Antalija",
                "visoki prinos najma Turska", "rast kapitala", "dohodovna nekretnina",
                "investicijske prilike Turska", "državljanstvo za investiciju"
            ],
        },
        url: "/yatirim",
    });
}

export default function YatirimLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
