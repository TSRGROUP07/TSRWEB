import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tsrgroupalanya.com";
const siteName = "TSR GROUP";
const defaultDescription = "Dijital emlak çözümleri, yatırım danışmanlığı ve profesyonel gayrimenkul hizmetleri";

// Supported locales type
type SupportedLocale = "tr" | "en" | "ru" | "bs";

// Type for multilingual content that supports optional Bosnian
type MultilingualContent<T> = {
  tr: T;
  en: T;
  ru: T;
  bs?: T;
};

/**
 * Çok dilli SEO metadata oluşturur
 */
export function createMultilingualMetadata({
  locale = "en",
  titles,
  descriptions,
  keywords,
  image,
  url,
  type = "website",
  robots,
}: {
  locale?: SupportedLocale;
  titles: MultilingualContent<string>;
  descriptions: MultilingualContent<string>;
  keywords: MultilingualContent<string[]>;
  image?: string;
  url: string;
  type?: "website" | "article";
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
}): Metadata {
  // Fallback to English if locale content not available
  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;
  const keywordList = keywords[locale] || keywords.en;
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const imageUrl = image ? (image.startsWith("http") ? image : `${siteUrl}${image}`) : `${siteUrl}/og-image.jpg`;
  const pageUrl = `${siteUrl}${url}`;

  // Locale mapping for OpenGraph
  const localeMap: Record<SupportedLocale, string> = {
    tr: "tr_TR",
    en: "en_US",
    ru: "ru_RU",
    bs: "bs_BA",
  };

  // hreflang alternates - tüm diller için (Google'a dil alternatiflerini bildirir)
  const alternates: any = {
    canonical: pageUrl,
    languages: {
      'en': pageUrl,
      'tr': pageUrl,
      'ru': pageUrl,
      'bs': pageUrl,
    },
  };

  return {
    title: fullTitle,
    description,
    keywords: keywordList.length > 0 ? keywordList.join(", ") : undefined,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    metadataBase: new URL(siteUrl),
    alternates,
    openGraph: {
      type,
      url: pageUrl,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: localeMap[locale],
      alternateLocale: Object.values(localeMap).filter(l => l !== localeMap[locale]),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: "@tsrgroup",
    },
    robots: robots ? {
      index: robots.index ?? true,
      follow: robots.follow ?? true,
      googleBot: {
        index: robots.index ?? true,
        follow: robots.follow ?? true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    } : {
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
  };
}


/**
 * Temel SEO metadata oluşturur (geriye dönük uyumluluk için)
 */
export function createMetadata({
  title,
  description = defaultDescription,
  keywords = [],
  image,
  url,
  type = "website",
  robots,
}: {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
}): Metadata {
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const imageUrl = image ? (image.startsWith("http") ? image : `${siteUrl}${image}`) : `${siteUrl}/og-image.jpg`;
  const pageUrl = url ? `${siteUrl}${url}` : siteUrl;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(", ") : undefined,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type,
      url: pageUrl,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "tr_TR",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: "@tsrgroup",
    },
    robots: robots ? {
      index: robots.index ?? true,
      follow: robots.follow ?? true,
      googleBot: {
        index: robots.index ?? true,
        follow: robots.follow ?? true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    } : {
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
  };
}

/**
 * Organization structured data oluşturur
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TSR GROUP",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: defaultDescription,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+90-530-333-00-97",
      contactType: "customer service",
      areaServed: "TR",
      availableLanguage: ["Turkish", "English", "Russian"],
    },
    sameAs: [
      "https://www.instagram.com/tsrgroupalanya",
      "https://www.facebook.com/tsrgroupalanya"
    ],
  };
}

/**
 * WebSite structured data oluşturur
 */
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/emlak?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * BlogPosting structured data oluşturur
 */
export function getBlogPostSchema({
  title,
  description,
  image,
  url,
  datePublished,
  dateModified,
  author = "TSR GROUP",
}: {
  title: string;
  description: string;
  image?: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: image ? (image.startsWith("http") ? image : `${siteUrl}${image}`) : undefined,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}${url}`,
    },
  };
}

/**
 * RealEstateAgent structured data oluşturur
 */
export function getRealEstateAgentSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteName,
    url: siteUrl,
    description: defaultDescription,
    telephone: "+90-530-333-00-97", // Added phone
    image: `${siteUrl}/logo.png`,    // Added logo
    address: {                      // Added address
      "@type": "PostalAddress",
      streetAddress: "Ersel apt, Şekerhane, Ali İmam Sk. 18/A",
      addressLocality: "Alanya",
      addressRegion: "Antalya",
      postalCode: "07400",
      addressCountry: "TR"
    },
    areaServed: {
      "@type": "Country",
      name: "Turkey",
    },
  };
}

/**
 * Product (Property) structured data oluşturur
 */
export function getPropertySchema({
  name,
  description,
  image,
  price,
  priceCurrency = "TRY",
  address,
  numberOfRooms,
  floorSize,
  url,
}: {
  name: string;
  description: string;
  image?: string;
  price: number;
  priceCurrency?: string;
  address: string;
  numberOfRooms?: number;
  floorSize?: number;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: image ? (image.startsWith("http") ? image : `${siteUrl}${image}`) : undefined,
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency,
      availability: "https://schema.org/InStock",
      url: `${siteUrl}${url}`,
    },
    additionalProperty: [
      ...(numberOfRooms
        ? [
          {
            "@type": "PropertyValue",
            name: "Oda Sayısı",
            value: numberOfRooms,
          },
        ]
        : []),
      ...(floorSize
        ? [
          {
            "@type": "PropertyValue",
            name: "Metrekare",
            value: floorSize,
          },
        ]
        : []),
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: address,
      addressCountry: "TR",
    },
  };
}

/**
 * LocalBusiness structured data oluşturur (hizmet sayfaları için)
 */
export function getLocalBusinessSchema({
  name,
  description,
  serviceType,
  areaServed,
  url,
  telephone,
  address,
  priceRange,
}: {
  name: string;
  description: string;
  serviceType: string;
  areaServed: string | string[];
  url: string;
  telephone?: string;
  address?: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
  priceRange?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    "@id": `${siteUrl}${url}`,
    url: `${siteUrl}${url}`,
    telephone: telephone || "+90-530-333-00-97",
    priceRange: priceRange || "$$",
    areaServed: Array.isArray(areaServed)
      ? areaServed.map((area) => ({
        "@type": "City",
        name: area,
      }))
      : {
        "@type": "City",
        name: areaServed,
      },
    ...(address ? {
      address: {
        "@type": "PostalAddress",
        streetAddress: address.streetAddress || "Ersel apt, Şekerhane, Ali İmam Sk. 18/A",
        addressLocality: address.addressLocality,
        addressRegion: address.addressRegion || "Antalya",
        postalCode: address.postalCode || "07400",
        addressCountry: address.addressCountry || "TR",
      },
    } : { // Default address if none provided
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ersel apt, Şekerhane, Ali İmam Sk. 18/A",
        addressLocality: "Alanya",
        addressRegion: "Antalya",
        postalCode: "07400",
        addressCountry: "TR",
      }
    }),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: serviceType,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: serviceType,
            description,
          },
        },
      ],
    },
  };
}

/**
 * Service structured data oluşturur
 */
export function getServiceSchema({
  name,
  description,
  provider,
  areaServed,
  url,
  serviceType,
}: {
  name: string;
  description: string;
  provider: string;
  areaServed: string | string[];
  url: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
      url: siteUrl,
    },
    areaServed: Array.isArray(areaServed)
      ? areaServed.map((area) => ({
        "@type": "City",
        name: area,
      }))
      : {
        "@type": "City",
        name: areaServed,
      },
    url: `${siteUrl}${url}`,
    serviceType,
  };
}

/**
 * Generate hreflang links for multilingual pages
 */
export function generateHreflangLinks(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tsrgroupalanya.com";

  return [
    { rel: "alternate", hrefLang: "tr", href: `${baseUrl}${path}` },
    { rel: "alternate", hrefLang: "en", href: `${baseUrl}${path}` },
    { rel: "alternate", hrefLang: "ru", href: `${baseUrl}${path}` },
    { rel: "alternate", hrefLang: "bs", href: `${baseUrl}${path}` },
    { rel: "alternate", hrefLang: "x-default", href: `${baseUrl}${path}` },
  ];
}


/**
 * Generate geo-targeting meta tags for Alanya/Antalya region
 */
export function getGeoMetaTags() {
  return [
    { name: "geo.region", content: "TR-07" }, // Antalya province code
    { name: "geo.placename", content: "Alanya, Antalya" },
    { name: "geo.position", content: "36.5444;31.9997" }, // Alanya coordinates
    { name: "ICBM", content: "36.5444, 31.9997" },
  ];
}

/**
 * Generate Yandex-specific meta tags
 */
export function getYandexMetaTags() {
  return [
    { name: "yandex-verification", content: "YOUR_YANDEX_VERIFICATION_CODE" }, // User needs to replace
    { name: "theme-color", content: "#2e3c3a" }, // Your dark green brand color
  ];
}

/**
 * Enhanced LocalBusiness schema for Alanya/Antalya services
 */
export function getAlanyaLocalBusinessSchema({
  name,
  description,
  serviceType,
  url,
  image,
  priceRange = "$$",
}: {
  name: string;
  description: string;
  serviceType: string;
  url: string;
  image?: string;
  priceRange?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tsrgroupalanya.com";

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${name} - TSR GROUP`,
    description,
    "@id": `${baseUrl}${url}`,
    url: `${baseUrl}${url}`,
    telephone: "+90-530-333-00-97",
    email: "info@tsremlak.com",
    priceRange,
    image: image ? (image.startsWith("http") ? image : `${baseUrl}${image}`) : `${baseUrl}/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ersel apt, Şekerhane, Ali İmam Sk. 18/A",
      addressLocality: "Alanya",
      addressRegion: "Antalya",
      postalCode: "07400",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "36.5444",
      longitude: "31.9997",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Alanya",
      },
      {
        "@type": "City",
        name: "Antalya",
      },
      {
        "@type": "Country",
        name: "Turkey",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: serviceType,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: serviceType,
            description,
          },
        },
      ],
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      "https://www.instagram.com/tsrgroupalanya",
      "https://www.facebook.com/tsrgroupalanya"
    ],
  };
}

/**
 * RealEstateListing schema for property pages
 */
export function getRealEstateListingSchema({
  name,
  description,
  image,
  price,
  priceCurrency = "USD",
  address,
  numberOfRooms,
  numberOfBedrooms,
  numberOfBathrooms,
  floorSize,
  url,
  availableFrom,
  type = "sale", // 'sale' or 'rent'
}: {
  name: string;
  description: string;
  image?: string;
  price: number;
  priceCurrency?: string;
  address: string;
  numberOfRooms?: number;
  numberOfBedrooms?: number;
  numberOfBathrooms?: number;
  floorSize?: number;
  url: string;
  availableFrom?: string;
  type?: "sale" | "rent";
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tsrgroupalanya.com";

  return {
    "@context": "https://schema.org",
    "@type": type === "rent" ? "RentAction" : "Product",
    name,
    description,
    image: image ? (image.startsWith("http") ? image : `${baseUrl}${image}`) : undefined,
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency,
      availability: "https://schema.org/InStock",
      url: `${baseUrl}${url}`,
      ...(availableFrom && { availableAtOrFrom: availableFrom }),
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: address,
      addressRegion: "Antalya",
      addressCountry: "TR",
    },
    ...(numberOfRooms && {
      numberOfRooms: numberOfRooms,
    }),
    ...(numberOfBedrooms && {
      numberOfBedrooms: numberOfBedrooms,
    }),
    ...(numberOfBathrooms && {
      numberOfBathRoomsTotal: numberOfBathrooms,
    }),
    ...(floorSize && {
      floorSize: {
        "@type": "QuantitativeValue",
        value: floorSize,
        unitCode: "MTK", // Square meter
      },
    }),
  };
}








