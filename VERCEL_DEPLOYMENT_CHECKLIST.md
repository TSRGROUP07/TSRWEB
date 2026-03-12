# ✅ VERCEL DEPLOYMENT CHECKLIST

## 🔍 BUILD HATASI KONTROL ADIMLARI

### 1. Yerel Build Test
```bash
cd "D:\c masaüstü\TSR_WEB"
npm run build
```

**Sonuç:**
- ✅ Başarılı → Vercel'de manuel redeploy yapın
- ❌ Hata → Hata mesajını not edin ve paylaşın

---

### 2. Vercel Build Logları

**Yol:**
1. Vercel Dashboard → Projeniz
2. Deployments sekmesi
3. Son deployment (kırmızı X) → Tıklayın
4. "Logs" sekmesi → Hata mesajını okuyun

---

### 3. Manuel Redeploy

Eğer kod doğruysa ama deploy olmamışsa:

1. Vercel Dashboard → Deployments
2. Son deployment → "..." menüsü
3. "Redeploy" seçin

---

## 📋 YAYGIN HATALAR

### TypeScript Hatası
- Yerel: `npm run build` → Hata görünür
- Vercel: Log'larda `Type error` görünür

### Environment Variable
- Vercel Settings → Environment Variables kontrol edin
- `HERO_VIDEO_URL` eklendi mi?

### Build Timeout
- Çok büyük dosya yüklenmiş olabilir
- `.gitignore` kontrol edin

---

**SONRAKI ADIM:** Vercel loglarında veya yerel build'de hangi hata var, paylaşın! 🔍
