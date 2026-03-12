# 🔍 SEO İyileştirme Rehberi

Bu doküman, TSR Web sitesi için yapılan SEO iyileştirmelerini ve kullanım talimatlarını içermektedir.

## ✅ Tamamlanan SEO İyileştirmeleri

### 1. **Structured Data (JSON-LD)**
- ✅ Organization Schema
- ✅ WebSite Schema (SearchAction ile)
- ✅ RealEstateAgent Schema
- ✅ BlogPosting Schema
- ✅ Product Schema (Emlak ilanları için)

### 2. **Meta Tags Optimizasyonu**
- ✅ Title tags (her sayfada özelleştirilmiş)
- ✅ Meta descriptions (her sayfada özelleştirilmiş)
- ✅ Keywords (sayfa bazlı)
- ✅ Canonical URLs
- ✅ Author, Publisher tags

### 3. **Open Graph Tags**
- ✅ Facebook ve LinkedIn paylaşımları için
- ✅ Görsel, başlık, açıklama
- ✅ Site adı ve locale

### 4. **Twitter Cards**
- ✅ Summary Large Image formatı
- ✅ Görsel, başlık, açıklama
- ✅ Creator bilgisi

### 5. **Sitemap.xml**
- ✅ Statik sayfalar
- ✅ Dinamik emlak ilanları
- ✅ Dinamik blog yazıları
- ✅ LastModified tarihleri
- ✅ Priority ve changeFrequency ayarları

### 6. **Robots.txt**
- ✅ Admin ve API sayfaları engellendi
- ✅ Googlebot ve Bingbot için özel kurallar
- ✅ Sitemap referansı

### 7. **Next.js Image Optimizasyonu**
- ✅ WebP ve AVIF format desteği
- ✅ Responsive image sizes
- ✅ Lazy loading
- ✅ Cache ayarları

### 8. **Security Headers**
- ✅ X-Content-Type-Options
- ✅ X-Frame-Options
- ✅ X-XSS-Protection
- ✅ Referrer-Policy

## 📋 Kullanım Talimatları

### Environment Variables

`.env.local` dosyasına ekleyin:

```env
NEXT_PUBLIC_SITE_URL=https://tsremlak.com
```

### Meta Tags Kullanımı

Her sayfada `metadata.ts` dosyası oluşturun:

```typescript
import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Sayfa Başlığı",
  description: "Sayfa açıklaması (150-160 karakter)",
  keywords: ["anahtar", "kelime", "listesi"],
  url: "/sayfa-yolu",
  image: "/görsel-yolu.jpg", // Opsiyonel
});
```

### Structured Data Kullanımı

Sayfalarda structured data eklemek için:

```typescript
import StructuredData from "@/components/StructuredData";
import { getBlogPostSchema } from "@/lib/seo";

// Component içinde
<StructuredData data={getBlogPostSchema({...})} />
```

## 🎯 SEO Checklist

### ✅ Tamamlanan
- [x] Structured Data (JSON-LD)
- [x] Meta tags optimizasyonu
- [x] Open Graph tags
- [x] Twitter Cards
- [x] Canonical URLs
- [x] Sitemap.xml (dinamik)
- [x] Robots.txt
- [x] Image optimization
- [x] Security headers

### 📝 Yapılması Gerekenler

1. **Google Search Console**
   - Site ekleme
   - Sitemap gönderme
   - Verification code ekleme (metadata'da)

2. **Google Analytics**
   - Tracking code ekleme
   - Event tracking

3. **OG Image Oluşturma**
   - `/public/og-image.jpg` dosyası oluştur
   - 1200x630px boyutunda
   - Site logosu ve marka renkleri

4. **Favicon ve Icons**
   - `/public/favicon.ico`
   - `/public/icon-192.png`
   - `/public/icon-512.png`

5. **Page Speed Optimizasyonu**
   - Lighthouse test
   - Core Web Vitals iyileştirmeleri
   - Code splitting

6. **Mobile Optimization**
   - Responsive test
   - Mobile-first indexing

7. **Content Optimization**
   - Heading yapısı (H1, H2, H3)
   - Internal linking
   - Alt text'ler (tüm görsellerde)

## 📊 SEO Metrikleri

### Önemli Metrikler
- **Page Speed**: 90+ (Lighthouse)
- **Mobile-Friendly**: ✅
- **Structured Data**: ✅
- **Meta Tags**: ✅
- **Sitemap**: ✅
- **Robots.txt**: ✅

## 🔧 Teknik Detaylar

### Structured Data Tipleri

1. **Organization**: Şirket bilgileri
2. **WebSite**: Site bilgileri ve arama özelliği
3. **RealEstateAgent**: Emlak acentesi bilgileri
4. **BlogPosting**: Blog yazıları
5. **Product**: Emlak ilanları

### Sitemap Özellikleri

- Ana sayfa: `priority: 1.0`, `changeFrequency: daily`
- Statik sayfalar: `priority: 0.8`, `changeFrequency: weekly`
- Emlak ilanları: `priority: 0.7`, `changeFrequency: weekly`
- Blog yazıları: `priority: 0.6`, `changeFrequency: monthly`

## 🚀 Sonraki Adımlar

1. Google Search Console'a site ekle
2. Sitemap'i Google'a gönder
3. OG image oluştur
4. Favicon ekle
5. Google Analytics entegrasyonu
6. Page Speed testleri yap
7. Core Web Vitals iyileştirmeleri

## 📚 Kaynaklar

- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards)












