# 🚀 TSR Web - Yayınlama Rehberi

Bu dokümanda projenizi canlıya almak için adım adım talimatlar bulunmaktadır.

## 📋 Yayınlamadan Önce Kontrol Listesi

- [ ] Build hatasız çalışıyor mu? (`npm run build`)
- [ ] Environment değişkenleri hazır mı?
- [ ] Admin şifreleri güvenli mi? (production'da mutlaka değiştirin!)
- [ ] `/data/` klasöründeki JSON dosyaları yedeklendi mi?

---

## 🌐 YAYINLAMA SEÇENEKLERİ

### 1️⃣ VERCEL (Önerilen - En Kolay) ⭐

Vercel, Next.js'in resmi hosting sağlayıcısıdır ve **ÜCRETSIZ** başlangıç planı sunar.

#### Adımlar:

**A) Vercel Hesabı Oluşturma**
1. https://vercel.com adresine gidin
2. "Sign Up" butonuna tıklayın (GitHub hesabınızla giriş yapabilirsiniz)

**B) Projeyi GitHub'a Yükleme (Önerilen)**
```bash
# Eğer henüz git repo'su yoksa
git init
git add .
git commit -m "Initial commit"
git branch -M main

# GitHub'da yeni bir repo oluşturun, sonra:
git remote add origin https://github.com/KULLANICI_ADINIZ/tsr-web.git
git push -u origin main
```

**C) Vercel'e Deploy Etme**
1. Vercel dashboard'a gidin: https://vercel.com/dashboard
2. "Add New Project" butonuna tıklayın
3. GitHub repo'nuzu seçin (veya "Import" ile dosya yükleyin)
4. **Settings kısmında:**
   - Framework Preset: **Next.js** (otomatik seçilir)
   - Root Directory: `.` (değiştirmeyin)
   - Build Command: `npm run build` (otomatik)
   - Output Directory: `.next` (otomatik)
   
5. **Environment Variables (Önemli!):**
   - `SERPAPI_KEY` = SerpAPI anahtarınız (eğer kullanıyorsanız)
   
6. "Deploy" butonuna tıklayın
7. 2-3 dakika içinde siteniz yayında olacak! 🎉

**Avantajlar:**
- ✅ Otomatik HTTPS
- ✅ Otomatik CDN
- ✅ Her commit'te otomatik deploy
- ✅ Ücretsiz SSL sertifikası
- ✅ Global edge network
- ✅ Ücretsiz başlangıç planı

---

### 2️⃣ NETLIFY (Alternatif)

Netlify da Next.js projeleri için iyi bir seçenektir.

#### Adımlar:

1. https://app.netlify.com adresine gidin
2. "Sign up" ile hesap oluşturun
3. "Add new site" → "Import an existing project"
4. GitHub repo'nuzu seçin veya dosya yükleyin
5. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Functions directory: `.netlify/functions`
6. Environment variables ekleyin (`SERPAPI_KEY`)
7. "Deploy site" butonuna tıklayın

---

### 3️⃣ KENDI SUNUCUNUZDA (VPS/Dedicated)

Kendi sunucunuzda çalıştırmak istiyorsanız:

#### Gereksinimler:
- Node.js 18+ kurulu olmalı
- PM2 veya benzeri process manager
- Nginx veya Apache reverse proxy
- SSL sertifikası (Let's Encrypt önerilir)

#### Adımlar:

**1. Build ve Dosya Yükleme:**
```bash
# Yerel bilgisayarınızda
npm run build

# Sunucuya dosyaları yükleyin (FTP/SCP/SFTP ile)
# Veya sunucuda direkt:
git clone https://github.com/KULLANICI_ADINIZ/tsr-web.git
cd tsr-web
npm install
npm run build
```

**2. Environment Variables:**
```bash
# Sunucuda .env.local dosyası oluşturun
nano .env.local

# İçeriğe ekleyin:
SERPAPI_KEY=your_key_here
```

**3. PM2 ile Çalıştırma:**
```bash
# PM2'yi global yükleyin
npm install -g pm2

# Projeyi başlatın
pm2 start npm --name "tsr-web" -- start
pm2 save
pm2 startup
```

**4. Nginx Reverse Proxy (Önerilen):**
```nginx
# /etc/nginx/sites-available/tsr-web
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**5. SSL Sertifikası (Let's Encrypt):**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 🔐 GÜVENLIK ÖNEMLI NOTLAR

### Production Ortamında MUTLAKA Yapın:

1. **Admin Şifresini Değiştirin:**
   - `/app/api/admin/login/route.ts` dosyasındaki şifreyi güçlü bir şifre ile değiştirin
   - Veya environment variable kullanın:
   ```typescript
   const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@tsremlak.com';
   const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
   ```

2. **Environment Variables:**
   - API anahtarlarını asla kod içinde saklamayın
   - Her platformda environment variables kullanın

3. **Database Kullanın:**
   - Production'da JSON dosyaları yerine veritabanı kullanın (PostgreSQL, MongoDB, vb.)
   - `/data/*.json` dosyaları development için uygundur

4. **HTTPS:**
   - Tüm production sitelerinde HTTPS kullanın
   - Vercel ve Netlify otomatik sağlar

5. **Rate Limiting:**
   - API endpoint'lerine rate limiting ekleyin
   - DDoS saldırılarına karşı koruma sağlayın

---

## 🧪 DEPLOY SONRASI TESTLER

Deploy ettikten sonra şunları test edin:

- [ ] Ana sayfa açılıyor mu?
- [ ] Emlak listesi görünüyor mu?
- [ ] Harita çalışıyor mu?
- [ ] Admin paneli giriş yapılabiliyor mu?
- [ ] Çoklu dil desteği çalışıyor mu? (TR/EN/RU)
- [ ] Mobil görünüm düzgün mü?
- [ ] Image optimization çalışıyor mu?

---

## 🐛 SORUN GİDERME

### Build Hatası Alıyorsanız:
```bash
# Önce yerel olarak test edin
npm run build

# Hataları kontrol edin ve düzeltin
```

### Environment Variables Çalışmıyorsa:
- Platform ayarlarından environment variables'ı kontrol edin
- Değişkenler büyük/küçük harf duyarlıdır
- Deploy'dan sonra yeniden deploy yapmanız gerekebilir

### Images Yüklenmiyorsa:
- `next.config.js` dosyasındaki `domains` ve `remotePatterns` ayarlarını kontrol edin
- Vercel/Netlify'da image optimization aktif olmalı

---

## 📞 DESTEK

Sorun yaşarsanız:
1. Tarayıcı konsolunda hataları kontrol edin
2. Platform logs'larını kontrol edin (Vercel/Netlify dashboard)
3. Build log'larını inceleyin

---

## ✨ BAŞARILAR!

Projenizi yayınlamak için en kolay yol **Vercel** kullanmaktır. 5 dakikada yayında olabilirsiniz! 🚀
