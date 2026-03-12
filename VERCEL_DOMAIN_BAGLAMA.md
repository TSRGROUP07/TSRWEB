# 🌐 Vercel'de Domain Bağlama Rehberi
# Domain: tsrgroupalanya.com

## 🎯 Adım Adım Domain Bağlama

### 1️⃣ Vercel Dashboard'a Giriş Yapın

1. Tarayıcınızda şu adrese gidin: **https://vercel.com**
2. Giriş yapın (GitHub, GitLab veya Email ile)

### 2️⃣ Projenizi Seçin

1. Dashboard'da projenizi bulun ve tıklayın
2. Eğer proje yoksa:
   - "Add New Project" butonuna tıklayın
   - GitHub repo'nuzu seçin veya import edin
   - Deploy edin

### 3️⃣ Domain Ekleme

1. Proje sayfasında **"Settings"** sekmesine tıklayın
2. Sol menüden **"Domains"** seçeneğini tıklayın
3. **"Add Domain"** butonuna tıklayın
4. Domain adını girin: **`tsrgroupalanya.com`**
5. **"Add"** butonuna tıklayın

### 4️⃣ DNS Ayarları (ÖNEMLİ!)

Vercel size DNS kayıtlarını gösterecek. Şimdi domain sağlayıcınızda (örn: GoDaddy, Namecheap, vb.) şu ayarları yapmanız gerekiyor:

#### Seçenek 1: CNAME Kaydı (ÖNERİLEN - Daha Kolay)

Domain sağlayıcınızın DNS yönetim paneline gidin ve şu kaydı ekleyin:

**Ana Domain için:**
```
Type: CNAME
Name: @ (veya boş bırakın)
Value: cname.vercel-dns.com (Vercel size tam değeri verecek)
TTL: Auto (veya 3600)
```

**www Alt Domain için:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com (Vercel size tam değeri verecek)
TTL: Auto (veya 3600)
```

#### Seçenek 2: A Kaydı (IPv4)

Eğer CNAME desteklenmiyorsa:

```
Type: A
Name: @ (veya boş)
Value: 76.76.21.21 (Vercel'in IP adresi - Vercel size söyleyecek)
TTL: Auto
```

**ÖNEMLİ:** Vercel dashboard'da gösterilen tam değerleri kullanın! Yukarıdakiler örnek değerlerdir.

### 5️⃣ DNS Yayılımını Bekleyin

- DNS değişiklikleri **24-48 saat** içinde yayılır
- Genellikle **1-2 saat** içinde çalışmaya başlar
- Vercel dashboard'da domain durumunu takip edebilirsiniz

### 6️⃣ SSL Sertifikası (Otomatik)

- ✅ Vercel **otomatik olarak ücretsiz SSL sertifikası** sağlar
- ✅ HTTPS otomatik aktif olur
- ✅ DNS yayılımı tamamlandıktan sonra SSL aktif olur (1-2 saat)

---

## 📋 Domain Sağlayıcı Örnekleri

### GoDaddy

1. GoDaddy hesabınıza giriş yapın
2. **My Products** → **Domain'leriniz**
3. `tsrgroupalanya.com` → **DNS** → **Manage Zones**
4. **Add** butonuna tıklayın
5. Vercel'den aldığınız değerleri girin

### Namecheap

1. Namecheap hesabınıza giriş yapın
2. **Domain List** → `tsrgroupalanya.com` → **Manage**
3. **Advanced DNS** sekmesine gidin
4. **Add New Record** butonuna tıklayın
5. Vercel'den aldığınız değerleri girin

### Türkiye'deki Domain Sağlayıcıları

- **Turhost, Natro, Metu, Nic.tr** gibi sağlayıcılarda da benzer şekilde DNS yönetim paneline girip kayıtları ekleyin

---

## ✅ Kontrol Listesi

- [ ] Vercel'de proje deploy edildi
- [ ] Vercel Dashboard → Settings → Domains'a gidildi
- [ ] Domain eklendi (`tsrgroupalanya.com`)
- [ ] Vercel'in verdiği DNS kayıtları kopyalandı
- [ ] Domain sağlayıcısında DNS kayıtları eklendi
- [ ] DNS yayılımı beklendi (1-48 saat)
- [ ] Domain durumu "Valid Configuration" olarak görünüyor
- [ ] HTTPS aktif oldu

---

## 🔍 Domain Durumunu Kontrol Etme

### Vercel Dashboard'da:

1. **Settings → Domains** bölümüne gidin
2. Domain durumunu kontrol edin:
   - ✅ **Valid Configuration**: Bağlantı başarılı
   - ⚠️ **Invalid Configuration**: DNS kayıtlarını kontrol edin
   - ⏳ **Pending**: DNS yayılımı bekleniyor

### Terminal'de Kontrol:

```bash
# DNS kayıtlarını kontrol edin
nslookup tsrgroupalanya.com
dig tsrgroupalanya.com
```

---

## 🆘 Sorun Giderme

### Domain Bağlanmıyor

1. **DNS Kontrolü:**
   - Domain sağlayıcınızda DNS kayıtlarının doğru eklendiğinden emin olun
   - Vercel dashboard'daki değerlerle eşleştiğinden emin olun

2. **DNS Yayılımı:**
   - DNS değişiklikleri 24-48 saat sürebilir
   - Bekleyin veya DNS cache'ini temizleyin

3. **Vercel Dashboard:**
   - Settings → Domains → Domain durumunu kontrol edin
   - "Invalid Configuration" varsa DNS kayıtlarını tekrar kontrol edin

### SSL Sertifikası Sorunları

- Vercel otomatik SSL sağlar
- DNS yayılımı tamamlandıktan sonra SSL aktif olur
- Genellikle 1-2 saat içinde

### www ve Ana Domain

- Hem `tsrgroupalanya.com` hem de `www.tsrgroupalanya.com` çalışmalı
- Her ikisi için de DNS kaydı ekleyin

---

## 📞 Destek

- **Vercel DNS Dokümantasyonu:** https://vercel.com/docs/concepts/projects/domains
- **Vercel Destek:** https://vercel.com/support

---

## 🎉 Başarılı Bağlantı Sonrası

Domain bağlandıktan sonra:
- ✅ Siteniz `https://tsrgroupalanya.com` adresinde çalışacak
- ✅ HTTPS otomatik aktif olacak
- ✅ Vercel otomatik olarak CDN sağlayacak (hızlı yükleme)

**ÖNEMLİ NOT:** DNS değişiklikleri 24-48 saat içinde yayılır. Sabırla bekleyin! 🌐
