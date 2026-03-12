# Firebase Kurulum Rehberi

## 1. Firebase Projesi Oluşturma

1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. "Add project" (Proje Ekle) butonuna tıklayın
3. Proje adını girin (örn: "tsr-emlak")
4. Google Analytics'i isteğe bağlı olarak etkinleştirin
5. Projeyi oluşturun

## 2. Authentication (Kimlik Doğrulama) Ayarları

1. Firebase Console'da sol menüden **Authentication** seçin
2. **Get started** butonuna tıklayın
3. **Sign-in method** sekmesine gidin
4. **Email/Password** seçeneğini etkinleştirin
5. **Enable** butonuna tıklayın ve kaydedin

## 3. Firestore Database Ayarları

1. Sol menüden **Firestore Database** seçin
2. **Create database** butonuna tıklayın
3. **Start in test mode** seçeneğini seçin (geliştirme için)
4. Lokasyon seçin (örn: europe-west1)
5. **Enable** butonuna tıklayın

## 4. Web App Yapılandırması

1. Firebase Console'da proje ayarlarına gidin (⚙️ ikonu)
2. **Project settings** > **General** sekmesine gidin
3. **Your apps** bölümünde **Web** ikonuna (</>) tıklayın
4. App nickname girin (örn: "TSR Web")
5. **Register app** butonuna tıklayın
6. Config bilgilerini kopyalayın

## 5. Environment Variables Ayarlama

Proje kök dizininde `.env.local` dosyası oluşturun ve aşağıdaki bilgileri ekleyin:

```env
# Firebase Client Config
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Firebase Admin (Opsiyonel - Server-side için)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## 6. Service Account Key (Opsiyonel - Server-side için)

1. Firebase Console > Project Settings > **Service accounts** sekmesine gidin
2. **Generate new private key** butonuna tıklayın
3. JSON dosyasını indirin
4. İçeriğini `.env.local` dosyasına `FIREBASE_SERVICE_ACCOUNT_KEY` olarak ekleyin (JSON string olarak)

## 7. Firestore Security Rules (Güvenlik Kuralları)

Firestore Console > **Rules** sekmesine gidin ve aşağıdaki kuralları ekleyin:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Kullanıcılar sadece kendi verilerini okuyup yazabilir
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Diğer koleksiyonlar için kurallar buraya eklenebilir
  }
}
```

## 8. Test Etme

1. `.env.local` dosyasını oluşturduğunuzdan emin olun
2. Firebase config bilgilerini eklediğinizden emin olun
3. Uygulamayı çalıştırın: `npm run dev`
4. `/giris` sayfasına gidin
5. Yeni bir kullanıcı kaydedin
6. Firebase Console > Authentication > Users bölümünde kullanıcıyı görebilmelisiniz
7. Firestore > Data bölümünde `users` koleksiyonunda kullanıcı bilgilerini görebilmelisiniz

## Önemli Notlar

- **Ücretsiz Tier Limitleri:**
  - Authentication: Sınırsız kullanıcı
  - Firestore: 1 GB depolama, 50K okuma/gün, 20K yazma/gün
  - Storage: 5 GB depolama, 1 GB/gün indirme

- **Güvenlik:**
  - Production'da Firestore security rules'u mutlaka yapılandırın
  - Service account key'i asla public repository'ye eklemeyin
  - `.env.local` dosyasını `.gitignore`'a ekleyin

## Sorun Giderme

- **"Firebase yapılandırması eksik" hatası:** `.env.local` dosyasını kontrol edin
- **"Permission denied" hatası:** Firestore security rules'u kontrol edin
- **"User not found" hatası:** Authentication'da kullanıcının oluşturulduğundan emin olun
