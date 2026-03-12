import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tsrgroupalanya.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/_next/",
          "/static/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
        crawlDelay: 0,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
        crawlDelay: 0,
      },
      // Yandex bot - Critical for Russian market SEO
      {
        userAgent: "YandexBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
        crawlDelay: 0,
      },
      // Yandex image bot
      {
        userAgent: "YandexImages",
        allow: "/",
        disallow: ["/admin/"],
      },
      // Mail.RU bot - Popular Russian search engine
      {
        userAgent: "Mail.RU_Bot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}




