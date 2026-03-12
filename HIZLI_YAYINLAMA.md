# ⚡ HIZLI YAYINLAMA - Vercel ile 5 Dakikada Yayında!

## 🚀 En Kolay Yol: Vercel

### 1. Adım: GitHub'a Yükleyin (2 dakika)

Eğer henüz GitHub'da yoksa:

```bash
# Proje klasöründe terminal açın
git init
git add .
git commit -m "Initial commit"
git branch -M main

# GitHub'da yeni bir repo oluşturun (github.com/new)
# Sonra şu komutları çalıştırın:
git remote add origin https://github.com/KULLANICI_ADINIZ/tsr-web.git
git push -u origin main
```

### 2. Adım: Vercel'e Deploy Edin (3 dakika)

1. **Vercel'e Gidin:** https://vercel.com
   - GitHub hesabınızla giriş yapın (veya email ile kaydolun)

2. **"Add New Project"** butonuna tıklayın

3. **GitHub repo'nuzu seçin** (veya "Import" ile dosya yükleyin)

4. **Environment Variables Ekleyin:**
   - "Environment Variables" bölümüne tıklayın
   - Key: `SERPAPI_KEY`
   - Value: SerpAPI anahtarınız (varsa, yoksa boş bırakabilirsiniz)
   - "Add" butonuna tıklayın

5. **"Deploy"** butonuna tıklayın

6. **Hazır!** 🎉 2-3 dakika içinde siteniz canlıda olacak!

---

## 📝 Önemli Notlar

### Environment Variables (Vercel Dashboard'da):

1. Projenizde "Settings" → "Environment Variables"
2. Şu değişkenleri ekleyin:
   - `SERPAPI_KEY` = SerpAPI anahtarınız (opsiyonel)

### Admin Şifresini Değiştirin:

Production'da mutlaka güvenli bir şifre kullanın!

**Seçenek 1:** `app/api/admin/login/route.ts` dosyasındaki şifreyi değiştirin

**Seçenek 2:** Environment variable kullanın:
- `ADMIN_EMAIL` 
- `ADMIN_PASSWORD`

---

## 🔗 Domain Bağlama (Opsiyonel)

Vercel size ücretsiz bir domain verir (örn: `tsr-web.vercel.app`)

Kendi domain'inizi bağlamak için:
1. Vercel Dashboard → Project → Settings → Domains
2. Domain'inizi ekleyin
3. DNS ayarlarını yapın (Vercel size talimatlar verir)

---

## ✅ Deploy Sonrası Kontrol Listesi

- [ ] Ana sayfa açılıyor mu?
- [ ] Emlak listesi görünüyor mu?
- [ ] Harita çalışıyor mu?
- [ ] Admin paneli giriş yapılabiliyor mu? (`/admin/login`)
- [ ] Çoklu dil desteği çalışıyor mu?
- [ ] Mobil görünüm düzgün mü?

---

## 🆘 Sorun Yaşıyorsanız

### Build Hatası:
- Vercel Dashboard → Deployments → Logs'u kontrol edin
- Yerel olarak `npm run build` çalıştırıp hataları görebilirsiniz

### Images Çalışmıyor:
- `next.config.js` dosyasındaki domain ayarlarını kontrol edin

---

## 🎯 Diğer Yayınlama Seçenekleri

- **Netlify:** https://netlify.com (benzer kolaylıkta)
- **Own Server:** Kendi sunucunuzda çalıştırmak için `YAYINLAMA_REHBERI.md` dosyasına bakın

---

## 💡 İpuçları

1. Her `git push` yaptığınızda Vercel otomatik deploy yapar
2. Preview deploys: Pull request açtığınızda otomatik test URL'i oluşur
3. Rollback: Eski bir deployment'a geri dönebilirsiniz

---

**BAŞARILAR! 🚀 Projeniz artık canlıda!**
