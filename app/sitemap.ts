import { MetadataRoute } from "next";
import fs from "fs/promises";
import path from "path";

// Supported locales for hreflang
const locales = ['en', 'tr', 'ru', 'bs'] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tsrgroupalanya.com";

  // High-priority routes - Real estate and core services
  const staticRoutes = [
    "",
    "/emlak", // Real estate listings - HIGH PRIORITY for international SEO
    "/yatirim", // Investment - HIGH PRIORITY
    "/kurumsal", // Corporate / About us - NEW
    "/transfer", // Transfer services
    "/arac-kiralama", // Car rental
    "/gunluk-kiralama", // Daily rental
    "/gunluk-kiralama/kiralamak", // Rent out
    "/gunluk-kiralama/kiraya-vermek", // For rent
    "/hukuki", // Legal services
    "/hesaplayici", // Calculator
    "/karsilastirma", // Comparison
    "/fiyat-analizi", // Price analysis
    "/bina-yonetimi", // Building management
    "/odeme", // Payment
    "/belgeler", // Documents
    "/dijital-satis", // Digital sales
    "/favoriler", // Favorites
    "/iletisim", // Contact
    "/blog", // Blog
    "/vatandaslik", // Citizenship Landing Page - HIGH PRIORITY
    "/tatil-evleri", // Holiday Homes Showcase - HIGH PRIORITY
  ];

  // Helper function to create alternates object for hreflang
  const createAlternates = (route: string) => {
    const languages: Record<string, string> = {};
    locales.forEach(locale => {
      // route usually starts with / (e.g., /emlak)
      languages[locale] = `${baseUrl}/${locale}${route === '/' ? '' : route}`;
    });
    return { languages };
  };

  const routes: MetadataRoute.Sitemap = [];

  // Generate routes for each locale
  for (const locale of locales) {
    // 1. Static Routes
    staticRoutes.forEach(route => {
      // Determine priority and change frequency
      let priority = 0.7;
      let changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" = "weekly";

      if (route === "") { priority = 1.0; changeFrequency = "daily"; }
      else if (["/emlak", "/yatirim"].includes(route)) { priority = 0.95; changeFrequency = "daily"; }
      else if (["/transfer", "/arac-kiralama", "/gunluk-kiralama", "/hukuki", "/kurumsal"].includes(route)) { priority = 0.9; changeFrequency = "daily"; }
      else if (["/hesaplayici", "/karsilastirma", "/fiyat-analizi", "/iletisim"].includes(route)) { priority = 0.85; changeFrequency = "weekly"; }

      const localePath = locale === 'en' ? route : `/${locale}${route}`; // Default locale logic can be adjusted
      // Actually, since we use prefix='always' in navigation, we should probably output /en explicitly or handle default
      // For best SEO, explicit /en is good if redirects exist. 
      // Let's assume /en, /tr, /ru, /bs are all valid.

      const url = `${baseUrl}/${locale}${route}`;

      routes.push({
        url,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: createAlternates(route), // Alternates should point to other languages for THIS route
      });
    });

    // 2. Dynamic Properties
    try {
      const propertiesFile = path.join(process.cwd(), "data", "properties.json");
      const propertiesData = await fs.readFile(propertiesFile, "utf-8");
      const properties = JSON.parse(propertiesData);

      if (Array.isArray(properties)) {
        properties.forEach((property: any) => {
          const propertyRoute = `/emlak/${property.id}`;
          const url = `${baseUrl}/${locale}${propertyRoute}`;

          routes.push({
            url,
            lastModified: new Date(property.updatedAt || property.createdAt || Date.now()),
            changeFrequency: "weekly",
            priority: 0.7,
            alternates: createAlternates(propertyRoute),
          });
        });
      }
    } catch (e) { /* ignore */ }

    // 3. Dynamic Blogs
    try {
      const blogsFile = path.join(process.cwd(), "data", "blogs.json");
      const blogsData = await fs.readFile(blogsFile, "utf-8");
      const blogs = JSON.parse(blogsData);

      if (Array.isArray(blogs)) {
        blogs.filter((b: any) => b.published !== false).forEach((blog: any) => {
          const blogRoute = `/blog/${blog.id}`;
          const url = `${baseUrl}/${locale}${blogRoute}`;

          routes.push({
            url,
            lastModified: new Date(blog.updatedAt || blog.createdAt || Date.now()),
            changeFrequency: "monthly",
            priority: 0.6,
            alternates: createAlternates(blogRoute),
          });
        });
      }
    } catch (e) { /* ignore */ }
  }

  return routes;
}
