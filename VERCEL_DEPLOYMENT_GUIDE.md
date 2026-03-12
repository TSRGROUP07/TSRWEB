# Vercel Deployment Rehberi - Admin Panel Kurulumu

## 🔧 Gerekli Environment Variables

Vercel Dashboard → Project → Settings → Environment Variables bölümüne şu değişkenleri ekleyin:

### 1. Admin Giriş Bilgileri
```
ADMIN_EMAIL=admin@tsremlak.com
ADMIN_PASSWORD=güvenli-şifreniz-buraya
```

### 2. Firebase Service Account Key
```
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"tsr-web-112e2",...}
```
**Not:** Tüm JSON'u tek satırda, tırnak işaretleri içinde ekleyin.

### 3. Firebase Client Config (Opsiyonel - zaten kodda var)
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBQN2ph9kHn7QFNHvXuu6sviYOy0LEP85E
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tsr-web-112e2.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tsr-web-112e2
```

### 4. API Keys (Opsiyonel)
```
SERPAPI_KEY=your-serpapi-key
GOOGLE_MAPS_API_KEY=your-google-maps-key
```

## ⚠️ ÖNEMLİ: Vercel'de Dosya Sistemi Sorunu

Vercel'de dosya sistemi **read-only** olduğu için:
- ❌ `data/*.json` dosyalarına yazma **ÇALIŞMAZ**
- ✅ Tüm veriler **Firestore**'a kaydedilmeli

## 🔄 Yapılması Gerekenler

### 1. Mevcut Verileri Firestore'a Taşıma

Local'deki `data/*.json` dosyalarını Firestore'a migrate etmeniz gerekiyor.

### 2. API Route'ları Güncelleme

Tüm API route'ları Firestore kullanacak şekilde güncellenmeli:
- ✅ `/api/admin/messages` - Zaten Firestore kullanıyor
- ❌ `/api/admin/properties` - JSON dosyası kullanıyor → Firestore'a geçmeli
- ❌ `/api/admin/blogs` - JSON dosyası kullanıyor → Firestore'a geçmeli
- ❌ `/api/admin/images` - JSON dosyası kullanıyor → Firestore'a geçmeli
- ❌ `/api/admin/videos` - JSON dosyası kullanıyor → Firestore'a geçmeli

## 📝 Adım Adım Kurulum

### Adım 1: Vercel'de Environment Variables Ekleme

1. Vercel Dashboard'a gidin
2. Projenizi seçin
3. Settings → Environment Variables
4. Yukarıdaki tüm değişkenleri ekleyin
5. **Production, Preview, Development** için hepsini seçin
6. Deploy'u yeniden yapın

### Adım 2: Firebase Service Account Key Ekleme

1. Firebase Console → Project Settings → Service Accounts
2. "Generate new private key" ile key indirin
3. JSON içeriğini tek satırda, tırnak içinde `FIREBASE_SERVICE_ACCOUNT_KEY` olarak ekleyin

**Örnek:**
```
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"tsr-web-112e2","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"...","universe_domain":"googleapis.com"}
```

### Adım 3: Admin Girişi Test Etme

1. `https://your-domain.com/admin/login` adresine gidin
2. Environment variable'larda belirlediğiniz email/password ile giriş yapın

## 🚨 Sorun Giderme

### Admin Panel Açılmıyor
- Environment variables'ların doğru eklendiğinden emin olun
- Deploy'u yeniden yapın
- Browser console'da hataları kontrol edin

### Veriler Görünmüyor
- Firestore'da collection'ların oluşturulduğundan emin olun
- Firebase Console'da verileri kontrol edin
- API route'ların Firestore kullandığından emin olun

### Dosya Yükleme Çalışmıyor
- Vercel'de dosya yükleme için **Vercel Blob Storage** veya **Cloudinary** kullanın
- `/api/admin/upload` route'unu güncelleyin

## 📚 İleri Seviye

### Firestore Migration Script

Mevcut JSON dosyalarını Firestore'a taşımak için bir migration script'i oluşturabiliriz.

### Vercel Blob Storage Entegrasyonu

Dosya yükleme için Vercel Blob Storage kullanılabilir.
