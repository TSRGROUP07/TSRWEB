# 🚀 HIZLI YAYINLAMA REHBERİ

## ⚡ EN HIZLI YOL: VERCEL CLI

### 1. Vercel CLI Kurulumu
```bash
npm install -g vercel
```

### 2. Projeyi Deploy Edin
```bash
vercel
```

İlk seferde sorular sorulacak:
- **Set up and deploy?** → Y
- **Which scope?** → Hesabınızı seçin
- **Link to existing project?** → N (yeni proje)
- **What's your project's name?** → tsr-web (veya istediğiniz isim)
- **In which directory is your code located?** → ./
- **Want to override the settings?** → N

### 3. Production'a Alın
```bash
vercel --prod
```

**Hazır! 🎉** Siteniz canlıda olacak!

---

## 🌐 GITHUB + VERCEL (OTOMATIK DEPLOY)

### 1. GitHub Repo Oluşturun
- https://github.com/new adresine gidin
- Repo adı: `tsr-web` (veya istediğiniz isim)
- Public veya Private seçin
- "Create repository" butonuna tıklayın

### 2. Projeyi GitHub'a Yükleyin
```bash
# Proje klasöründe terminal açın
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/tsr-web.git
git push -u origin main
```

**NOT:** `KULLANICI_ADINIZ` yerine kendi GitHub kullanıcı adınızı yazın!

### 3. Vercel'e Deploy Edin

**A) Vercel Dashboard ile:**
1. https://vercel.com adresine gidin
2. GitHub hesabınızla giriş yapın
3. "Add New Project" butonuna tıklayın
4. GitHub repo'nuzu seçin (`tsr-web`)
5. **Environment Variables** (opsiyonel):
   - Key: `SERPAPI_KEY`
   - Value: SerpAPI anahtarınız (varsa)
6. "Deploy" butonuna tıklayın
7. 2-3 dakika içinde siteniz canlıda! 🎉

**B) Vercel CLI ile:**
```bash
vercel --prod
```

---

## 📋 YAYINLAMADAN ÖNCE KONTROL LİSTESİ

- [x] Build başarılı (`npm run build` ✓)
- [ ] Environment değişkenleri hazır mı? (`SERPAPI_KEY` varsa)
- [ ] Admin şifresini değiştirdiniz mi? (Production'da önemli!)

---

## 🔐 ÖNEMLİ GÜVENLİK NOTLARI

### Admin Şifresini Değiştirin!

Production'a almadan önce mutlaka admin şifresini değiştirin:

**Dosya:** `app/api/admin/login/route.ts`

Şu satırları bulun:
```typescript
const ADMIN_EMAIL = 'admin@tsremlak.com';
const ADMIN_PASSWORD = 'admin123';
```

**Değiştirin:**
```typescript
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@tsremlak.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'güçlü-şifre-buraya';
```

Vercel'de Environment Variables ekleyin:
- `ADMIN_EMAIL` = admin email'iniz
- `ADMIN_PASSWORD` = güçlü şifreniz

---

## 🌍 DOMAIN BAĞLAMA (OPSİYONEL)

Vercel size ücretsiz bir domain verir: `tsr-web.vercel.app`

Kendi domain'inizi bağlamak için:
1. Vercel Dashboard → Project → Settings → Domains
2. Domain'inizi ekleyin
3. DNS ayarlarını yapın (Vercel size talimatlar verir)

---

## ✅ DEPLOY SONRASI TESTLER

- [ ] Ana sayfa açılıyor mu? (`https://tsr-web.vercel.app`)
- [ ] Emlak listesi görünüyor mu? (`/emlak`)
- [ ] Harita çalışıyor mu?
- [ ] Admin paneli giriş yapılabiliyor mu? (`/admin/login`)
- [ ] Çoklu dil desteği çalışıyor mu? (TR/EN/RU)

---

## 🆘 SORUN YAŞARSANIZ

### Build Hatası:
- Vercel Dashboard → Deployments → Logs'u kontrol edin
- Yerel olarak `npm run build` çalıştırıp hataları görebilirsiniz

### Environment Variables:
- Vercel Dashboard → Project → Settings → Environment Variables
- Değişkenleri ekledikten sonra **yeniden deploy** yapın

---

## 🎯 DİĞER YAYINLAMA SEÇENEKLERİ

### Netlify (Alternatif)
1. https://netlify.com
2. GitHub repo'nuzu bağlayın
3. Build command: `npm run build`
4. Publish directory: `.next`

### Kendi Sunucunuz
Detaylar için `YAYINLAMA_REHBERI.md` dosyasına bakın.

---

**BAŞARILAR! 🚀 Projeniz artık canlıda!**
