# 🌐 MEVCUT DOMAIN'İ BAĞLAMA REHBERİ

Domain: **https://tsrgroupalanya.com/**

## 🎯 YÖNTEM 1: VERCEL'E BAĞLAMA (ÖNERİLEN)

### Adım 1: Vercel'de Deploy Edin

**A) Vercel CLI ile:**
```bash
# Vercel CLI kurun
npm install -g vercel

# Deploy edin
vercel

# Production'a alın
vercel --prod
```

**B) GitHub + Vercel ile:**
1. Projeyi GitHub'a yükleyin
2. https://vercel.com → GitHub ile giriş
3. "Add New Project" → Repo'nuzu seçin
4. "Deploy" tıklayın

### Adım 2: Domain'i Vercel'e Bağlayın

1. **Vercel Dashboard'a gidin:**
   - https://vercel.com/dashboard
   - Projenizi seçin

2. **Settings → Domains:**
   - "Add Domain" butonuna tıklayın
   - Domain adını girin: `tsrgroupalanya.com`
   - "Add" butonuna tıklayın

3. **DNS Ayarları:**
   Vercel size DNS kayıtlarını gösterecek. Domain sağlayıcınızda (GoDaddy, Namecheap, vb.) şu kayıtları ekleyin:

   **Seçenek 1: A Kaydı (IPv4)**
   ```
   Type: A
   Name: @ (veya boş)
   Value: 76.76.21.21 (Vercel'in IP'si - Vercel size söyleyecek)
   TTL: Auto
   ```

   **Seçenek 2: CNAME (Önerilen)**
   ```
   Type: CNAME
   Name: @ (veya www)
   Value: cname.vercel-dns.com (Vercel size söyleyecek)
   TTL: Auto
   ```

   **www için:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: Auto
   ```

4. **DNS Yayılımını Bekleyin:**
   - DNS değişiklikleri 24-48 saat içinde yayılır (genellikle 1-2 saat)
   - Vercel dashboard'da domain durumunu kontrol edebilirsiniz

5. **SSL Sertifikası:**
   - Vercel otomatik olarak ücretsiz SSL sertifikası sağlar
   - HTTPS otomatik aktif olur

### Adım 3: Eski Sitenizi Devre Dışı Bırakın

Eski hosting sağlayıcınızda:
- Sunucuyu durdurun VEYA
- Domain'i Vercel'e yönlendirin

---

## 🖥️ YÖNTEM 2: KENDI SUNUCUNUZDA ÇALIŞTIRMAK

Eğer domain zaten kendi sunucunuzda çalışıyorsa:

### Adım 1: Sunucuya Bağlanın
```bash
# SSH ile sunucunuza bağlanın
ssh kullanici@sunucu-ip
```

### Adım 2: Projeyi Yükleyin
```bash
# Projeyi klonlayın veya yükleyin
git clone https://github.com/KULLANICI_ADINIZ/tsr-web.git
cd tsr-web

# Bağımlılıkları yükleyin
npm install

# Build yapın
npm run build
```

### Adım 3: PM2 ile Çalıştırın
```bash
# PM2'yi kurun
npm install -g pm2

# Projeyi başlatın
pm2 start npm --name "tsr-web" -- start

# Otomatik başlatmayı ayarlayın
pm2 save
pm2 startup
```

### Adım 4: Nginx Reverse Proxy (Önerilen)

Eğer Nginx kullanıyorsanız:

**Dosya:** `/etc/nginx/sites-available/tsrgroupalanya.com`

```nginx
server {
    listen 80;
    server_name tsrgroupalanya.com www.tsrgroupalanya.com;

    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Aktif edin:**
```bash
sudo ln -s /etc/nginx/sites-available/tsrgroupalanya.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Adım 5: SSL Sertifikası (Let's Encrypt)
```bash
# Certbot kurun
sudo apt install certbot python3-certbot-nginx

# SSL sertifikası alın
sudo certbot --nginx -d tsrgroupalanya.com -d www.tsrgroupalanya.com
```

---

## 🔄 DOMAIN TRANSFERİ (GEREKİRSE)

Eğer domain'i başka bir sağlayıcıda tutuyorsanız:

### DNS Sağlayıcınızı Değiştirin

**Örnek: GoDaddy**
1. GoDaddy → My Products → Domain'leriniz
2. `tsrgroupalanya.com` → DNS → Manage Zones
3. A kaydı veya CNAME kaydı ekleyin (Vercel'den aldığınız değerlerle)

**Örnek: Namecheap**
1. Namecheap → Domain List → Manage
2. Advanced DNS
3. A kaydı veya CNAME kaydı ekleyin

---

## ✅ KONTROL LİSTESİ

- [ ] Vercel'de deploy edildi
- [ ] Domain Vercel dashboard'a eklendi
- [ ] DNS kayıtları güncellendi
- [ ] DNS yayılımı tamamlandı (24-48 saat)
- [ ] HTTPS aktif (otomatik)
- [ ] Eski site devre dışı bırakıldı

---

## 🆘 SORUN GİDERME

### Domain Bağlanmıyor:

1. **DNS Kontrolü:**
   ```bash
   # Terminal'de DNS kayıtlarını kontrol edin
   nslookup tsrgroupalanya.com
   dig tsrgroupalanya.com
   ```

2. **Vercel Dashboard:**
   - Settings → Domains → Domain durumunu kontrol edin
   - "Invalid Configuration" varsa DNS kayıtlarını kontrol edin

3. **DNS Yayılımı:**
   - DNS değişiklikleri zaman alabilir (1-48 saat)
   - Bekleyin veya DNS cache'ini temizleyin

### SSL Sertifikası Sorunları:

- Vercel otomatik SSL sağlar
- DNS yayılımı tamamlandıktan sonra SSL aktif olur
- Genellikle 1-2 saat içinde

---

## 📞 DESTEK

- **Vercel DNS Yardımı:** https://vercel.com/docs/concepts/projects/domains
- **Vercel Destek:** https://vercel.com/support

---

**ÖNEMLİ:** DNS değişiklikleri 24-48 saat içinde yayılır. Bekleyin ve kontrol edin! 🌐
