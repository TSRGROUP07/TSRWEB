# 🔑 Firebase Service Account Key Nasıl Alınır?

## 📋 Adım Adım Rehber

### ✅ ADIM 1: Firebase Console'a Giriş

1. Tarayıcınızda şu adrese gidin:
   **https://console.firebase.google.com/**

2. Google hesabınızla giriş yapın

---

### ✅ ADIM 2: Projenizi Seçin

1. Firebase Console'da projeler listesinden **`tsr-web-112e2`** projesini seçin
2. Proje açıldığında sol menüden **⚙️ Project Settings** (Proje Ayarları) tıklayın
   - Veya sol alttaki **⚙️** (ayarlar) ikonuna tıklayın

---

### ✅ ADIM 3: Service Accounts Sekmesine Gidin

1. Açılan sayfada üst menüden **"Service accounts"** sekmesine tıklayın
2. Bu sekmede Firebase Admin SDK bilgileri görünecek

---

### ✅ ADIM 4: Private Key Oluşturun

1. **"Generate new private key"** (Yeni özel anahtar oluştur) butonuna tıklayın
2. Bir uyarı penceresi açılacak:
   - "This will create a new private key for the service account..."
   - **"Generate key"** butonuna tıklayın
3. JSON dosyası otomatik olarak indirilecek
   - Dosya adı: `tsr-web-112e2-firebase-adminsdk-xxxxx-xxxxx.json`

---

### ✅ ADIM 5: JSON Dosyasını Açın

1. İndirilen JSON dosyasını bulun (genellikle Downloads klasöründe)
2. Dosyaya sağ tıklayın → **"Birlikte Aç"** → **Notepad** (veya herhangi bir metin editörü)
3. Dosyanın **TAMAMINI** seçin (Ctrl+A) ve kopyalayın (Ctrl+C)

**JSON içeriği şöyle görünecek:**
```json
{
  "type": "service_account",
  "project_id": "tsr-web-112e2",
  "private_key_id": "d651f6bb910269cafe1dd3de08f97488b852c3a8",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCmWtnwEo7lYYeq\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@tsr-web-112e2.iam.gserviceaccount.com",
  "client_id": "101951592270339740690",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40tsr-web-112e2.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
```

---

### ✅ ADIM 6: Vercel'e Ekleyin

1. Vercel Dashboard → Projeniz → **Settings** → **Environment Variables**
2. **Add Another Var** butonuna tıklayın
3. **Key** alanına: `FIREBASE_SERVICE_ACCOUNT_KEY` yazın
4. **Value** alanına: Kopyaladığınız JSON'un **TAMAMINI** yapıştırın
   - **ÖNEMLİ:** JSON'u **tek satırda** yapıştırın
   - Tüm satırları birleştirin (satır sonları `\n` olarak kalacak)
   - Tırnak işaretleri içinde olmalı

**Örnek Format (tek satır):**
```
{"type":"service_account","project_id":"tsr-web-112e2","private_key_id":"d651f6bb910269cafe1dd3de08f97488b852c3a8","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCmWtnwEo7lYYeq\nYWHLbmV0ADQnlzTVRTjqEGmZm5wpBY9bSgT5/rdM92nmkBOcMIP3872DcBR1Bvde\n...\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-fbsvc@tsr-web-112e2.iam.gserviceaccount.com","client_id":"101951592270339740690","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40tsr-web-112e2.iam.gserviceaccount.com","universe_domain":"googleapis.com"}
```

5. **Environment:** ✅ Production, ✅ Preview, ✅ Development (hepsini seçin)
6. **Save** butonuna tıklayın

---

## ⚠️ ÖNEMLİ NOTLAR

1. **JSON'u tek satırda yapıştırın** - Satır sonları `\n` olarak kalacak, bu normal
2. **Tırnak işaretleri içinde olmalı** - Vercel otomatik olarak ekler
3. **Tüm JSON'u kopyalayın** - Eksik kısım olmamalı
4. **Güvenlik:** Bu key çok hassas! Asla GitHub'a commit etmeyin, paylaşmayın

---

## 🔍 Alternatif: Mevcut Key Varsa

Eğer daha önce bir key oluşturduysanız:
1. Firebase Console → Project Settings → Service Accounts
2. Mevcut service account'u görüntüleyin
3. Yeni key oluşturmak için "Generate new private key" kullanın
4. Veya mevcut key'i kullanabilirsiniz (eğer kayıtlıysa)

---

## ✅ Kontrol

Key'i ekledikten sonra:
1. Vercel'de environment variable'ın kaydedildiğini kontrol edin
2. Deploy'u yeniden yapın
3. Admin panelinden bir mesaj gönderin
4. Firebase Console → Firestore → `contactMessages` collection'ında mesajı görün
