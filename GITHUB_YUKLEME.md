# 📤 GITHUB'A PROJE YÜKLEME ADIMLARI

## 📍 NEREDE ÇALIŞTIRACAKSINIZ?

**Proje klasörünüzde Terminal/CMD açın:**
- Klasör: `D:\c masaüstü\TSR_WEB`
- PowerShell veya CMD'de bu klasöre gidin

---

## ⚡ HIZLI ADIMLAR

### 1. Terminal/CMD'de Proje Klasörüne Gidin

**PowerShell:**
```powershell
cd "D:\c masaüstü\TSR_WEB"
```

**CMD:**
```cmd
cd "D:\c masaüstü\TSR_WEB"
```

### 2. Git Komutlarını Sırayla Çalıştırın

**NOT:** GitHub'ın verdiği komutlar README.md oluşturuyor, ama bizim zaten README.md var. Aşağıdaki komutları kullanın:

```bash
# Git repository'yi başlat (eğer daha önce yapmadıysanız)
git init

# Tüm dosyaları ekle
git add .

# İlk commit
git commit -m "Initial commit"

# Branch adını main yap
git branch -M main

# GitHub repo'nuzu ekle (KULLANICI_ADINIZ yerine eraybaysl yazın)
git remote add origin https://github.com/eraybaysl/tsr-web.git

# GitHub'a yükle
git push -u origin main
```

---

## 🔐 EĞER HATA ALIRSANIZ

### "Git is not recognized" Hatası:
Git kurulu değil demektir. İndirip kurun:
- https://git-scm.com/download/win

### "Authentication failed" Hatası:
GitHub'a giriş yapmanız gerekiyor:

**Seçenek 1: Personal Access Token (Önerilen)**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" → `repo` yetkisi verin
3. Token'ı kopyalayın
4. `git push` sırasında şifre yerine token kullanın

**Seçenek 2: GitHub Desktop**
- https://desktop.github.com/ kurun
- GitHub hesabınızla giriş yapın
- GitHub Desktop üzerinden push yapın

---

## ✅ BAŞARILI OLURSA

Şunu görmelisiniz:
```
Enumerating objects: ...
Counting objects: 100% (xxx/xxx), done.
...
To https://github.com/eraybaysl/tsr-web.git
 * [new branch]      main -> main
```

Artık projeniz GitHub'da! 🎉

---

## 🚀 SONRAKI ADIM: VERCEL'E DEPLOY

1. https://vercel.com → GitHub ile giriş
2. "Add New Project"
3. `eraybaysl/tsr-web` repo'sunu seçin
4. "Deploy" tıklayın

---

**SORUN YAŞARSANIZ:** Hangi adımda hata aldığınızı söyleyin, yardımcı olayım!
