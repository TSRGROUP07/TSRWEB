const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  // ESLint'i build sırasında atla (geçici - production'da hataları düzeltin)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Route prefetching optimization
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'],
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  images: {
    domains: ['localhost', 'images.unsplash.com', 'maps.googleapis.com', 'maps.gstatic.com', 'tile.openstreetmap.org', 'basemaps.cartocdn.com', 'server.arcgisonline.com', 'cdnjs.cloudflare.com', 'firebasestorage.googleapis.com', 'storage.googleapis.com', 'aahgazecwmylfxbntatf.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aahgazecwmylfxbntatf.supabase.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'maps.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tile.openstreetmap.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'basemaps.cartocdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'server.arcgisonline.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdnjs.cloudflare.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'doc-0k-4c-docs.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
    // WebP ve AVIF formatları için optimization
    formats: ["image/avif", "image/webp"],
    // Responsive image sizes - mobil ve tablet için optimize edilmiş
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    // Cache süresini artır - 1 gün
    minimumCacheTTL: 86400,
    // SVG desteği
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config, { isServer }) => {
    // Sharp sadece server-side'da çalışır ve optional olmalı
    if (isServer) {
      config.externals = config.externals || [];
      if (Array.isArray(config.externals)) {
        config.externals.push('sharp');
        // firebase-admin'i external'dan kaldır - Next.js'in yüklemesine izin ver
      } else {
        config.externals = [config.externals, 'sharp'];
      }
    }

    // Leaflet için client-side only
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
      // googleapis sadece server-side'da çalışır
      config.resolve.alias = {
        ...config.resolve.alias,
        googleapis: false,
      };
    }

    return config;
  },
  // SEO ve Performance için headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
}

module.exports = withNextIntl(nextConfig)




