import "@/app/globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import StructuredData from "@/components/StructuredData";
import { getOrganizationSchema, getWebsiteSchema } from "@/lib/seo";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { locales } from "@/lib/navigation";
import type { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTranslate from "@/components/GoogleTranslate";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    preload: true,
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: {
        default: "TSR GROUP - Real Estate Alanya | Property Investment Turkey | Недвижимость Аланья | Nekretnine Alanya",
        template: "%s | TSR GROUP",
    },
    description: "Premium real estate solutions in Alanya & Antalya, Turkey. Property for sale, villas, apartments, investment consultancy, transfer, car rental, daily rental. Недвижимость в Аланье - продажа, инвестиции. Nekretnine Alanya - prodaja, investicije.",
    keywords: [
        // Turkish - Emlak
        "emlak", "gayrimenkul", "satılık daire", "kiralık daire", "villa satılık", "Alanya emlak", "Antalya emlak",
        "yatırım danışmanlığı", "TSR GROUP", "dijital emlak", "deniz manzaralı daire", "sahil evi",
        // Turkish - Services
        "transfer hizmeti", "araç kiralama", "günlük kiralama", "tatil evi", "hukuki danışmanlık", "tapu işlemleri",
        // English - Real Estate (UK Focused)
        "real estate Alanya", "property for sale Alanya", "villas for sale Turkey", "apartments Antalya",
        "flats for sale in Alanya", "apartments for sale in Alanya", "properties for sale in Alanya",
        "2-bedroom flat for sale in Alanya", "sea-view apartment for sale in Alanya", "new build flats for sale in Alanya",
        "buy property Alanya", "holiday homes Turkey", "holiday experts Alanya", "estate agents Alanya",
        "Turkish citizenship investment", "property investment Turkey", "Alanya real estate investment",
        // English - Services
        "airport transfer Alanya", "private transfer Antalya", "VIP transfer Turkey",
        "car rental Alanya", "daily rental Alanya", "holiday lets Alanya", "vacation rentals Alanya",
        "legal consultancy Turkey", "property lawyer Turkey", "investment consultancy Turkey",
        // Russian - Недвижимость
        "недвижимость Аланья", "недвижимость Анталья", "квартиры на продажу Турция", "виллы Аланья",
        "купить квартиру Турция", "квартира с видом на море", "инвестиции недвижимость Турция",
        "гражданство Турции", "покупка недвижимости Турция",
        // Russian - Услуги
        "трансфер из аэропорта Анталья", "частный трансфер Аланья", "аренда авто Турция",
        "посуточная аренда Аланья", "юридические услуги Турция", "инвестиционный консалтинг",
        // Bosnian - Nekretnine
        "nekretnine Alanya", "stan na prodaju Alanya", "vila na prodaju Turska", "kupiti nekretninu Turska",
        "stan sa pogledom na more", "investicija nekretnine Turska", "tursko državljanstvo investicija",
        // Bosnian - Usluge
        "aerodromski transfer Antalija", "privatni transfer Alanya", "rent a car Turska",
        "dnevni najam Alanya", "kuće za odmor Turska", "pravni savjetnik Turska", "investicijsko savjetovanje",
    ],
    authors: [{ name: "TSR GROUP" }],
    creator: "TSR GROUP",
    publisher: "TSR GROUP",
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.tsrgroupalanya.com"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "tr_TR",
        url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.tsrgroupalanya.com",
        siteName: "TSR GROUP - Real Estate Alanya & Antalya",
        title: "TSR GROUP - Premium Real Estate in Alanya & Antalya Turkey | Property Investment",
        description: "Find your dream property in Alanya & Antalya! Villas, apartments, houses for sale. Investment consultancy, transfer, car rental services. Недвижимость в Аланье. Nekretnine Alanya.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "TSR GROUP - Real Estate Alanya Turkey",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "TSR GROUP - Real Estate Alanya | Property Turkey | Недвижимость | Nekretnine",
        description: "Premium properties in Alanya & Antalya: villas, apartments, investment opportunities. Property sales, rentals, transfer & legal services.",
        images: ["/og-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        // Google Search Console verification code buraya eklenebilir
        // google: "verification-code",
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/favicon.ico',
    },
};

import MetaPixel from "@/components/MetaPixel";
import GoogleAdsTag from "@/components/GoogleAdsTag";

export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale as any)) notFound();

    // Enable static rendering
    const messages = await getMessages();

    // Inside LocaleLayout component
    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <StructuredData data={getOrganizationSchema()} />
                <StructuredData data={getWebsiteSchema()} />
                <MetaPixel />
                <GoogleAdsTag />
            </head>
            <body className={inter.className} suppressHydrationWarning>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID || ''} />
                    <ConditionalLayout>{children}</ConditionalLayout>
                    <GoogleTranslate />
                </NextIntlClientProvider>
                <Analytics />
            </body>
        </html>
    );
}
