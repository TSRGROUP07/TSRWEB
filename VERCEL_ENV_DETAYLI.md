# Vercel Environment Variables - Detaylı Rehber

## 📝 Vercel'de Environment Variable Ekleme

Vercel'de "Name" yerine **"Key"** yazıyor, bu normal! İşte adım adım:

---

## 🔑 1. ADMIN_EMAIL Ekleme

1. **Add Another Var** butonuna tıklayın (veya ilk kez ekliyorsanız direkt form açık)
2. **Key** alanına: `ADMIN_EMAIL` yazın
3. **Value** alanına: `admin@tsremlak.com` yazın
4. **Environment** seçeneklerinden:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development
   (Hepsini seçin!)
5. **Save** butonuna tıklayın

---

## 🔑 2. ADMIN_PASSWORD Ekleme

1. **Add Another Var** butonuna tıklayın
2. **Key** alanına: `ADMIN_PASSWORD` yazın
3. **Value** alanına: `GüvenliŞifre123!` yazın (kendi şifrenizi girin)
4. **Environment:** ✅ Production, ✅ Preview, ✅ Development
5. **Save** butonuna tıklayın

---

## 🔑 3. FIREBASE_SERVICE_ACCOUNT_KEY Ekleme

### Önce Firebase'den Key Alın:

1. https://console.firebase.google.com/ → Proje: `tsr-web-112e2`
2. Sol menüden **⚙️ Project Settings** (Proje Ayarları)
3. Üst menüden **Service accounts** sekmesi
4. **Generate new private key** (Yeni özel anahtar oluştur) butonuna tıklayın
5. Uyarıyı onaylayın → JSON dosyası indirilecek

### JSON Dosyasını Açın:

İndirdiğiniz JSON dosyasını notepad veya text editor ile açın. İçeriği şöyle olacak:

```json
{
  "type": "service_account",
  "project_id": "tsr-web-112e2",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "...",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "...",
  "universe_domain": "googleapis.com"
}
```

### Vercel'e Ekleyin:

1. **Add Another Var** butonuna tıklayın
2. **Key** alanına: `FIREBASE_SERVICE_ACCOUNT_KEY` yazın
3. **Value** alanına: JSON dosyasının **TAMAMINI** kopyalayıp yapıştırın
   - **ÖNEMLİ:** JSON'u **tek satırda** yapıştırın
   - Tüm satırları birleştirin (satır sonları `\n` olarak kalacak)
   - Tırnak işaretleri içinde olmalı

**Örnek Format:**
```
{"type":"service_account","project_id":"tsr-web-112e2","private_key_id":"d651f6bb910269cafe1dd3de08f97488b852c3a8","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCmWtnwEo7lYYeq\n...\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-fbsvc@tsr-web-112e2.iam.gserviceaccount.com","client_id":"101951592270339740690","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40tsr-web-112e2.iam.gserviceaccount.com","universe_domain":"googleapis.com"}
```

4. **Environment:** ✅ Production, ✅ Preview, ✅ Development
5. **Save** butonuna tıklayın

---

## ✅ Kontrol Listesi

Ekledikten sonra şunları kontrol edin:

- [ ] `ADMIN_EMAIL` eklendi
- [ ] `ADMIN_PASSWORD` eklendi  
- [ ] `FIREBASE_SERVICE_ACCOUNT_KEY` eklendi
- [ ] Her biri için Production, Preview, Development seçili
- [ ] Tüm değişkenler kaydedildi

---

## 🚀 Sonraki Adım

Environment variables ekledikten sonra:
1. **Deployments** sekmesine gidin
2. Son deployment'ın yanındaki **"..."** → **Redeploy**
3. Deploy'un bitmesini bekleyin
4. `https://your-domain.com/admin/login` adresinden giriş yapın

---

## ⚠️ ÖNEMLİ NOTLAR

1. **Key** = Environment variable'ın adı (ADMIN_EMAIL, ADMIN_PASSWORD, vs.)
2. **Value** = Değeri (email, şifre, JSON, vs.)
3. Her değişken için **3 environment** seçin (Production, Preview, Development)
4. Firebase key'i eklerken JSON'u **tek satırda** yapıştırın
