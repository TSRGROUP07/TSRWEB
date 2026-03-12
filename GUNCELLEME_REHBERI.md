# 🔄 WEB SİTESİNİ GÜNCELLEME REHBERİ

## 🚀 GÜNCELLEME SÜRECİ (Basit 3 Adım)

### 1️⃣ Yerel Değişiklikler Yapın
- Kod dosyalarını düzenleyin
- Yeni özellikler ekleyin
- Hataları düzeltin

### 2️⃣ Değişiklikleri GitHub'a Yükleyin
```bash
git add .
git commit -m "Açıklayıcı mesaj (örn: Ana sayfa tasarımı güncellendi)"
git push
```

### 3️⃣ Otomatik Deploy
- Vercel otomatik olarak deploy eder (2-3 dakika)
- Değişiklikler canlıda! 🎉

---

## 📋 DETAYLI ADIMLAR

### Adım 1: Değişiklik Yapın

**Örnekler:**
- Dosya düzenleme (örn: `app/page.tsx`)
- Yeni sayfa ekleme
- Component ekleme/düzenleme
- Stil değişiklikleri

### Adım 2: Değişiklikleri Kontrol Edin

```bash
# Hangi dosyalar değişti?
git status

# Değişiklikleri önizle
git diff
```

### Adım 3: Değişiklikleri Ekleyin

```bash
# Tüm değişiklikleri ekle
git add .

# VEYA belirli dosyaları ekle
git add app/page.tsx components/Header.tsx
```

### Adım 4: Commit Yapın

```bash
# Anlamlı bir mesaj yazın
git commit -m "Ana sayfa hero bölümü güncellendi"
```

**İyi commit mesajları:**
- ✅ "Ana sayfa tasarımı güncellendi"
- ✅ "Emlak filtreleme özelliği eklendi"
- ✅ "Mobil görünüm düzeltmeleri"
- ❌ "düzenleme" (çok genel)
- ❌ "değişiklik" (açıklayıcı değil)

### Adım 5: GitHub'a Yükleyin

```bash
git push
```

### Adım 6: Vercel Otomatik Deploy Eder

- Vercel Dashboard'u kontrol edin: https://vercel.com/dashboard
- "Deployments" sekmesinde yeni deployment görünecek
- 2-3 dakika içinde canlıda olacak!

---

## 🎯 ÖRNEK SENARYOLAR

### Senaryo 1: Ana Sayfayı Güncelleme

```bash
# 1. app/page.tsx dosyasını düzenle
# 2. Değişiklikleri kaydet

# 3. Terminal'de:
git add app/page.tsx
git commit -m "Ana sayfa başlık ve açıklama güncellendi"
git push
```

**Sonuç:** Vercel otomatik deploy eder, 2-3 dakika içinde canlıda!

---

### Senaryo 2: Yeni Sayfa Ekleme

```bash
# 1. Yeni sayfa oluştur (örn: app/hakkimizda/page.tsx)
# 2. İçeriği yaz

# 3. Terminal'de:
git add app/hakkimizda/
git commit -m "Hakkımızda sayfası eklendi"
git push
```

---

### Senaryo 3: Component Güncelleme

```bash
# 1. components/Header.tsx düzenle
# 2. Değişiklikleri kaydet

# 3. Terminal'de:
git add components/Header.tsx
git commit -m "Header menü öğeleri güncellendi"
git push
```

---

## 🔍 DEĞİŞİKLİKLERİ GÖRÜNTÜLEME

### Yerel Değişiklikleri Görme

```bash
# Hangi dosyalar değişti?
git status

# Belirli bir dosyanın değişikliklerini gör
git diff app/page.tsx

# Tüm değişiklikleri gör
git diff
```

### GitHub'da Değişiklikleri Görme

1. GitHub repo'nuzu açın: https://github.com/eraybaysl/tsr-web
2. "Commits" sekmesine tıklayın
3. Tüm commit'leri görün

---

## ⚠️ ÖNEMLİ NOTLAR

### Build Hatası Alırsanız:

1. **Yerel olarak test edin:**
   ```bash
   npm run build
   ```

2. **Hataları düzeltin**

3. **Tekrar push edin:**
   ```bash
   git add .
   git commit -m "Build hatası düzeltildi"
   git push
   ```

### Değişiklikleri Geri Almak:

```bash
# Son commit'i geri al (dosyalar değişmeden kalır)
git reset --soft HEAD~1

# Değişiklikleri tamamen geri al
git reset --hard HEAD~1
```

**DİKKAT:** `git reset --hard` değişiklikleri kalıcı olarak siler!

---

## 🎨 GÜNCELLEME İPUÇLARI

### 1. Küçük ve Sık Commit Yapın
- ✅ Her özellik için ayrı commit
- ✅ Her düzeltme için ayrı commit
- ❌ Tüm değişiklikleri tek commit'te yapmak

### 2. Anlamlı Commit Mesajları
```bash
# ✅ İyi
git commit -m "Emlak detay sayfası harita entegrasyonu eklendi"

# ❌ Kötü
git commit -m "güncelleme"
```

### 3. Test Edin Sonra Push Yapın
```bash
# Önce yerel olarak test et
npm run dev

# Sorun yoksa push et
git push
```

---

## 🔄 VERCEL'DE MANUEL DEPLOY

Eğer otomatik deploy çalışmıyorsa:

1. Vercel Dashboard → Projeniz
2. "Deployments" sekmesi
3. Son deployment'ın yanındaki "..." menüsü
4. "Redeploy" seçin

---

## 📱 MOBİL/REMOUTE ÇALIŞMA

Başka bilgisayardan güncelleme yapmak:

### 1. Projeyi İndirin
```bash
git clone https://github.com/eraybaysl/tsr-web.git
cd tsr-web
npm install
```

### 2. Güncelleme Yapın
```bash
# Değişiklik yapın

# Yükleyin
git add .
git commit -m "Mesaj"
git push
```

---

## 🎯 HIZLI REFERANS

```bash
# Güncelleme yapmak için:
git add .
git commit -m "Açıklayıcı mesaj"
git push

# Değişiklikleri kontrol etmek için:
git status
git diff

# Son değişiklikleri görmek için:
git log --oneline -5
```

---

## ✅ KONTROL LİSTESİ

Güncelleme yapmadan önce:
- [ ] Değişiklikleri test ettim (`npm run dev`)
- [ ] Build başarılı (`npm run build`)
- [ ] Anlamlı commit mesajı hazırladım

Push yaptıktan sonra:
- [ ] Vercel Dashboard'da deployment başladı
- [ ] Deployment başarılı oldu
- [ ] Canlı sitede değişiklikleri kontrol ettim

---

**🎉 Artık güncellemeleriniz otomatik deploy olacak!**

Her `git push` yaptığınızda Vercel otomatik olarak:
1. GitHub'dan en son kodu çeker
2. Build yapar
3. Deploy eder
4. Canlıda yayınlar

**Toplam süre: 2-3 dakika!** ⚡
