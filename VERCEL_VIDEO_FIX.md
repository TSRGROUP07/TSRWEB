# 🎥 VERCEL'DE YOUTUBE VİDEO SORUNU ÇÖZÜMÜ

## ❌ SORUN
`data/videos.json` dosyası `.gitignore`'da olduğu için Vercel'e yüklenmiyor. Bu yüzden production'da video görünmüyor.

## ✅ ÇÖZÜM: Environment Variable Kullanma

### Adım 1: Vercel'de Environment Variable Ekleyin

1. **Vercel Dashboard'a gidin:**
   - https://vercel.com/dashboard
   - Projenizi seçin

2. **Settings → Environment Variables:**
   - "Add New" butonuna tıklayın

3. **Yeni Environment Variable Ekleyin:**
   - **Key:** `HERO_VIDEO_URL`
   - **Value:** `https://www.youtube.com/watch?v=l5J2bN_XTJw`
   - **Environment:** Production (veya All)
   - "Add" butonuna tıklayın

### Adım 2: Deploy'u Yeniden Başlatın

1. **Deployments sekmesine gidin**
2. Son deployment'ın yanındaki "..." menüsüne tıklayın
3. "Redeploy" seçin

VEYA

Yeni bir commit push edin:
```bash
git add app/api/videos/hero/route.ts
git commit -m "Hero video için environment variable desteği eklendi"
git push
```

### Adım 3: Kontrol Edin

Deploy tamamlandıktan sonra ana sayfayı açın. Video görünmeli!

---

## 🔄 SONRAKİ ADIMLAR

### Video URL'sini Değiştirmek İçin:

1. **Vercel Dashboard:**
   - Settings → Environment Variables
   - `HERO_VIDEO_URL`'yi bulun
   - "Edit" → Yeni YouTube URL'sini girin
   - Redeploy yapın

VEYA

2. **Admin Panel:**
   - `/admin/videolar/yeni` sayfasına gidin
   - Yeni video ekleyin (type: "hero")
   - Bu değişiklik `data/videos.json`'a yazılır
   - Ancak production'da çalışması için Vercel'e environment variable olarak da eklemeniz gerekir

---

## 📝 NOT

- **Local Development:** `data/videos.json` dosyasından okuyor (eski sistem çalışıyor)
- **Production (Vercel):** `HERO_VIDEO_URL` environment variable'ından okuyor

Bu sayede hem local'de hem production'da çalışır! 🎉
