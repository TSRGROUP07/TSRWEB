# 🚀 DEĞİŞİKLİKLERİ GITHUB'A PUSH ETME

## ⚡ HIZLI ADIMLAR

PowerShell'i açın (`D:\c masaüstü\TSR_WEB` klasöründe):

```bash
# 1. Değişiklikleri kontrol et
git status

# 2. Tüm değişiklikleri ekle
git add .

# 3. Commit yap
git commit -m "Hero video için environment variable desteği eklendi ve 2025/MayAlanya bölümü kaldırıldı"

# 4. GitHub'a yükle
git push
```

---

## 🔍 DETAYLI ADIMLAR

### Adım 1: Terminal'de Proje Klasörüne Gidin

PowerShell'de:
```powershell
cd "D:\c masaüstü\TSR_WEB"
```

### Adım 2: Değişiklikleri Kontrol Edin

```bash
git status
```

Hangi dosyalar değişti göreceksiniz:
- `app/api/videos/hero/route.ts`
- `app/kurumsal/page.tsx`

### Adım 3: Değişiklikleri Ekleyin

```bash
git add .
```

VEYA sadece değişen dosyaları:

```bash
git add app/api/videos/hero/route.ts
git add app/kurumsal/page.tsx
```

### Adım 4: Commit Yapın

```bash
git commit -m "Hero video environment variable desteği ve 2025/MayAlanya bölümü kaldırıldı"
```

### Adım 5: GitHub'a Push Edin

```bash
git push
```

---

## ✅ PUSH SONRASI

Push yaptıktan sonra:
1. Vercel otomatik deploy başlatır (2-3 dakika)
2. Vercel Dashboard'da deployment'ı görebilirsiniz
3. Deploy tamamlandığında değişiklikler canlıda olur

---

## ⚠️ HATA ALIRSANIZ

### "nothing to commit" hatası:
- Dosyalar zaten commit edilmiş demektir
- Sadece `git push` yapın

### "authentication" hatası:
- GitHub'a giriş yapmanız gerekebilir
- Personal Access Token kullanın

### "not a git repository" hatası:
- Klasörde git repo yok demektir
- `git init` yapmanız gerekebilir (ama muhtemelen zaten var)

---

**Not:** Push sonrası Vercel otomatik deploy eder! 🎉
