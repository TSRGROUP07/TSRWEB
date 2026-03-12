# 🚀 Vercel Admin Panel Kurulumu - Adım Adım Rehber

## 📋 YAPILACAKLAR LİSTESİ

### ✅ ADIM 1: Vercel Dashboard'a Giriş Yapın

1. https://vercel.com/dashboard adresine gidin
2. GitHub hesabınızla giriş yapın
3. Projenizi seçin (TSR_WEB)

---

### ✅ ADIM 2: Environment Variables Ekleme

1. Vercel Dashboard'da projenizi açın
2. Üst menüden **Settings** tıklayın
3. Sol menüden **Environment Variables** tıklayın
4. **Add New** butonuna tıklayın

#### 2.1. Admin Email Ekleme

- **Name:** `ADMIN_EMAIL`
- **Value:** `admin@tsremlak.com` (veya istediğiniz email)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development (hepsini seçin)
- **Add** butonuna tıklayın

#### 2.2. Admin Password Ekleme

- **Name:** `ADMIN_PASSWORD`
- **Value:** `güvenli-şifreniz-buraya` (güçlü bir şifre girin, örn: `Admin123!@#`)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- **Add** butonuna tıklayın

#### 2.3. Firebase Service Account Key Ekleme

**ÖNEMLİ:** Bu adım biraz uzun olacak!

1. Firebase Console'a gidin: https://console.firebase.google.com/
2. Projenizi seçin: `tsr-web-112e2`
3. Sol menüden **⚙️ Project Settings** tıklayın
4. Üst menüden **Service accounts** sekmesine tıklayın
5. **Generate new private key** butonuna tıklayın
6. JSON dosyası indirilecek (veya zaten var olan key'i kullanın)

7. Vercel'e geri dönün
8. **Add New** butonuna tıklayın
9. **Name:** `FIREBASE_SERVICE_ACCOUNT_KEY`
10. **Value:** İndirdiğiniz JSON dosyasının **TAMAMINI** kopyalayıp yapıştırın
    - JSON'u **tek satırda** yapıştırın
    - Tırnak işaretleri içinde olmalı: `{"type":"service_account",...}`
11. **Environment:** ✅ Production, ✅ Preview, ✅ Development
12. **Add** butonuna tıklayın

**Örnek Format:**
```
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"tsr-web-112e2","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"...","universe_domain":"googleapis.com"}
```

---

### ✅ ADIM 3: Deploy'u Yeniden Yapın

1. Vercel Dashboard'da projenize gidin
2. Üst menüden **Deployments** tıklayın
3. En son deployment'ı bulun
4. Sağ taraftaki **"..."** (üç nokta) menüsüne tıklayın
5. **Redeploy** seçeneğini tıklayın
6. **Redeploy** butonuna onaylayın
7. Deploy'un bitmesini bekleyin (2-3 dakika)

**VEYA**

GitHub'a yeni bir commit push edin (otomatik deploy olur)

---

### ✅ ADIM 4: Admin Girişi Test Edin

1. Deploy tamamlandıktan sonra sitenize gidin: `https://your-domain.com/admin/login`
2. Environment variable'larda belirlediğiniz bilgilerle giriş yapın:
   - **Email:** `admin@tsremlak.com` (veya belirlediğiniz)
   - **Password:** Belirlediğiniz şifre
3. Giriş başarılı olursa `/admin/dashboard` sayfasına yönlendirileceksiniz

---

### ✅ ADIM 5: İlk Verileri Ekleyin

Admin paneline girdikten sonra:

1. **İlanlar** → **Yeni İlan** → İlk ilanınızı ekleyin
2. **Blog** → **Yeni Blog** → İlk blog yazınızı ekleyin
3. **Resimler** → Resim yükleyin
4. **Videolar** → Video ekleyin

**Not:** İlk veriler Firestore'da otomatik olarak collection'ları oluşturacak.

---

### ✅ ADIM 6: Firebase Console'da Kontrol Edin

1. https://console.firebase.google.com/ → Proje: `tsr-web-112e2`
2. **Firestore Database** tıklayın
3. Collection'ları görüntüleyin:
   - `properties` - İlanlar
   - `blogs` - Blog yazıları
   - `images` - Resimler
   - `videos` - Videolar
   - `contactMessages` - Mesajlar

---

## ⚠️ SORUN GİDERME

### Admin Girişi Çalışmıyor
- Environment variables'ların doğru eklendiğinden emin olun
- Deploy'u yeniden yapın
- Browser console'da hataları kontrol edin

### Veriler Görünmüyor
- Firebase Console'da collection'ların oluştuğunu kontrol edin
- İlk veri eklediğinizde collection otomatik oluşur

### Firebase Service Account Key Hatası
- JSON'un tamamını tek satırda yapıştırdığınızdan emin olun
- Tırnak işaretlerinin doğru olduğundan emin olun

---

## 📞 YARDIM

Herhangi bir adımda sorun yaşarsanız:
1. Hata mesajını not edin
2. Vercel Dashboard → Deployments → Logs'u kontrol edin
3. Firebase Console'da hataları kontrol edin
