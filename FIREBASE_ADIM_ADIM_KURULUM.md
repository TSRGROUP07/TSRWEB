# Firebase Kurulum - Adım Adım Rehber

## 🔥 ADIM 1: Firebase Projesi Oluşturma

1. **Firebase Console'a gidin:**
   - Tarayıcınızda [https://console.firebase.google.com/](https://console.firebase.google.com/) adresine gidin
   - Google hesabınızla giriş yapın

2. **Yeni Proje Oluştur:**
   - Sol üstteki **"Add project"** (Proje Ekle) butonuna tıklayın
   - **Proje adı** girin: `tsr-emlak` (veya istediğiniz isim)
   - **Continue** (Devam) butonuna tıklayın

3. **Google Analytics (Opsiyonel):**
   - "Enable Google Analytics for this project" seçeneğini açık bırakabilir veya kapatabilirsiniz
   - Açık bırakırsanız, bir Analytics hesabı seçin veya yeni oluşturun
   - **Continue** butonuna tıklayın

4. **Proje Oluşturuluyor:**
   - Birkaç saniye bekleyin
   - **Continue** butonuna tıklayın
   - Proje oluşturuldu! 🎉

---

## 🔐 ADIM 2: Authentication (Kimlik Doğrulama) Ayarları

1. **Authentication'a gidin:**
   - Sol menüden **"Authentication"** (Kimlik Doğrulama) seçeneğine tıklayın
   - İlk kez açıyorsanız **"Get started"** (Başlayın) butonuna tıklayın

2. **Sign-in method (Giriş yöntemi) ayarları:**
   - Üstteki **"Sign-in method"** sekmesine tıklayın
   - **"Email/Password"** seçeneğini bulun ve üzerine tıklayın
   - **"Enable"** (Etkinleştir) butonuna tıklayın
   - **"Email link (passwordless sign-in)"** seçeneğini **KAPALI** bırakın (sadece şifre ile giriş)
   - **"Save"** (Kaydet) butonuna tıklayın
   - ✅ Email/Password artık aktif!

---

## 💾 ADIM 3: Firestore Database Oluşturma

1. **Firestore Database'e gidin:**
   - Sol menüden **"Firestore Database"** seçeneğine tıklayın
   - **"Create database"** (Veritabanı oluştur) butonuna tıklayın

2. **Güvenlik kuralları seçimi:**
   - **"Start in test mode"** (Test modunda başlat) seçeneğini seçin
   - ⚠️ **Not:** Production'da mutlaka güvenlik kurallarını güncelleyin!
   - **Next** (İleri) butonuna tıklayın

3. **Lokasyon seçimi:**
   - Veritabanı lokasyonunu seçin (örn: **europe-west1** - Belçika)
   - Türkiye'ye yakın bir lokasyon seçmeniz önerilir
   - **Enable** (Etkinleştir) butonuna tıklayın
   - Birkaç dakika bekleyin, veritabanı oluşturuluyor...

---

## 🌐 ADIM 4: Web Uygulaması Yapılandırması

1. **Proje ayarlarına gidin:**
   - Sol üstteki **⚙️ (Settings)** ikonuna tıklayın
   - **"Project settings"** (Proje ayarları) seçeneğine tıklayın

2. **Web uygulaması ekleyin:**
   - Sayfanın alt kısmında **"Your apps"** (Uygulamalarınız) bölümüne gidin
   - **Web** ikonuna (</>) tıklayın
   - **App nickname** (Uygulama takma adı) girin: `TSR Web`
   - **"Also set up Firebase Hosting?"** seçeneğini şimdilik **KAPALI** bırakın
   - **"Register app"** (Uygulamayı kaydet) butonuna tıklayın

3. **Config bilgilerini kopyalayın:**
   - Açılan ekranda **config** objesi görünecek
   - Bu bilgileri kopyalayın (daha sonra kullanacağız)
   - Örnek format:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "tsr-emlak.firebaseapp.com",
     projectId: "tsr-emlak",
     storageBucket: "tsr-emlak.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```
   - **"Continue to console"** (Konsola devam et) butonuna tıklayın

---

## 🔑 ADIM 5: Environment Variables (.env.local) Dosyası Oluşturma

1. **Proje klasörünüze dönün:**
   - Visual Studio Code veya editörünüzde projeyi açın
   - Proje kök dizininde (package.json'un olduğu yerde) `.env.local` dosyası oluşturun

2. **Firebase config bilgilerini ekleyin:**
   - Firebase Console'dan kopyaladığınız config bilgilerini kullanın
   - `.env.local` dosyasına şu formatta ekleyin:

```env
# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy... (Firebase Console'dan kopyaladığınız apiKey)
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tsr-emlak.firebaseapp.com (Firebase Console'dan kopyaladığınız authDomain)
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tsr-emlak (Firebase Console'dan kopyaladığınız projectId)
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tsr-emlak.appspot.com (Firebase Console'dan kopyaladığınız storageBucket)
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789 (Firebase Console'dan kopyaladığınız messagingSenderId)
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123 (Firebase Console'dan kopyaladığınız appId)
```

3. **Dosyayı kaydedin:**
   - `.env.local` dosyasını kaydedin
   - ⚠️ **ÖNEMLİ:** Bu dosyayı asla Git'e commit etmeyin! (zaten .gitignore'da olmalı)

---

## 🛡️ ADIM 6: Firestore Security Rules (Güvenlik Kuralları) - ÖNEMLİ!

1. **Firestore Console'a gidin:**
   - Sol menüden **"Firestore Database"** seçeneğine tıklayın
   - Üstteki **"Rules"** (Kurallar) sekmesine tıklayın

2. **Güvenlik kurallarını ekleyin:**
   - Mevcut kuralları silin ve aşağıdakileri yapıştırın:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Kullanıcılar sadece kendi verilerini okuyup yazabilir
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      // Kullanıcılar kendi verilerini oluşturabilir
      allow create: if request.auth != null;
    }
    
    // Public read için (isteğe bağlı)
    match /properties/{propertyId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Diğer koleksiyonlar için varsayılan: sadece authenticated kullanıcılar
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. **Kuralları yayınlayın:**
   - **"Publish"** (Yayınla) butonuna tıklayın
   - ✅ Güvenlik kuralları aktif!

---

## ✅ ADIM 7: Test Etme

1. **Uygulamayı başlatın:**
   - Terminal'de: `npm run dev`
   - Tarayıcıda: `http://localhost:3002/giris`

2. **Yeni kullanıcı kaydedin:**
   - Giriş sayfasında **"Kayıt Ol"** sekmesine tıklayın
   - Formu doldurun ve **"Kayıt Ol"** butonuna tıklayın
   - Başarılı olursa Firebase Console'da kontrol edin

3. **Firebase Console'da kontrol:**
   - **Authentication > Users** bölümünde yeni kullanıcıyı görebilmelisiniz
   - **Firestore Database > Data** bölümünde `users` koleksiyonunda kullanıcı bilgilerini görebilmelisiniz

4. **Giriş yapın:**
   - **"Giriş Yap"** sekmesine geçin
   - Kayıt olduğunuz e-posta ve şifre ile giriş yapın
   - Başarılı olursa ana sayfaya yönlendirilmelisiniz

---

## 📋 Özet Checklist

- [ ] Firebase projesi oluşturuldu
- [ ] Authentication > Email/Password etkinleştirildi
- [ ] Firestore Database oluşturuldu (test mode)
- [ ] Web uygulaması kaydedildi
- [ ] Config bilgileri kopyalandı
- [ ] `.env.local` dosyası oluşturuldu ve config bilgileri eklendi
- [ ] Firestore Security Rules güncellendi
- [ ] Test kaydı yapıldı ve Firebase Console'da görüldü
- [ ] Test girişi yapıldı ve başarılı oldu

---

## 🆘 Sorun Giderme

### "Firebase yapılandırması eksik" hatası:
- `.env.local` dosyasının proje kök dizininde olduğundan emin olun
- Dosya adının tam olarak `.env.local` olduğundan emin olun (başında nokta var!)
- Environment variable'ların `NEXT_PUBLIC_` ile başladığından emin olun
- Uygulamayı yeniden başlatın (`npm run dev`)

### "Permission denied" hatası:
- Firestore Security Rules'u kontrol edin
- Test mode'da olduğundan emin olun (geliştirme için)

### "User not found" veya "Wrong password" hatası:
- Authentication > Users bölümünde kullanıcının oluşturulduğundan emin olun
- E-posta adresinin doğru yazıldığından emin olun

---

## 🎯 Sonraki Adımlar (Opsiyonel)

1. **Firebase Storage:** Profil resimleri ve dosyalar için
2. **Firebase Hosting:** Uygulamayı deploy etmek için
3. **Firebase Analytics:** Kullanıcı davranışlarını analiz etmek için
4. **Sosyal medya ile giriş:** Google, Facebook vb. eklemek için

---

**Tebrikler! Firebase entegrasyonu tamamlandı! 🎉**
