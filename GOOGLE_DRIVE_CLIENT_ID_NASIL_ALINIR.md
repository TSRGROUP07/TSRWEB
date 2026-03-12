# Google Drive Client ID ve Client Secret Nasıl Alınır?

Bu rehber, Google Drive entegrasyonu için gerekli Client ID ve Client Secret bilgilerini nasıl alacağınızı adım adım açıklar.

## 📋 Adım 1: Google Cloud Console'a Giriş

1. [Google Cloud Console](https://console.cloud.google.com/) adresine gidin
2. Google hesabınızla giriş yapın
3. Eğer daha önce proje oluşturmadıysanız, üst kısımdaki proje seçici menüsünden **"Yeni Proje"** (New Project) seçeneğine tıklayın

## 📋 Adım 2: Yeni Proje Oluşturma (İlk Kez İse)

1. **Proje Adı** girin (örn: "TSR Web Google Drive")
2. **Organizasyon** seçin (varsa)
3. **Konum** seçin (varsa)
4. **Oluştur** (Create) butonuna tıklayın
5. Proje oluşturulduktan sonra, üst kısımdaki proje seçici menüsünden yeni oluşturduğunuz projeyi seçin

## 📋 Adım 3: Google Drive API'yi Etkinleştirme

1. Sol menüden **"APIs & Services"** (API'ler ve Hizmetler) > **"Library"** (Kütüphane) seçeneğine tıklayın
2. Arama kutusuna **"Google Drive API"** yazın
3. **"Google Drive API"** seçeneğine tıklayın
4. **"Enable"** (Etkinleştir) butonuna tıklayın
5. API etkinleştirildiğinde yeşil bir onay mesajı göreceksiniz

## 📋 Adım 4: OAuth Consent Screen (İzin Ekranı) Yapılandırma

**ÖNEMLİ:** OAuth credentials oluşturmadan önce OAuth consent screen'i yapılandırmanız gerekir.

1. Sol menüden **"APIs & Services"** > **"OAuth consent screen"** seçeneğine tıklayın
2. **User Type** (Kullanıcı Tipi) seçin:
   - **External** (Harici) - Genel kullanım için (önerilen)
   - **Internal** (Dahili) - Sadece Google Workspace organizasyonu içinde kullanım için
3. **"Create"** (Oluştur) butonuna tıklayın

### OAuth Consent Screen Bilgilerini Doldurun:

**App Information (Uygulama Bilgileri):**
- **App name** (Uygulama Adı): `TSR Web` (veya istediğiniz isim)
- **User support email** (Kullanıcı destek e-postası): E-posta adresiniz
- **App logo** (Uygulama logosu): İsteğe bağlı
- **Application home page** (Uygulama ana sayfası): `https://tsremlak.com` (veya sitenizin URL'i)
- **Application privacy policy link** (Gizlilik politikası): İsteğe bağlı
- **Application terms of service link** (Hizmet şartları): İsteğe bağlı
- **Authorized domains** (Yetkili domainler): `tsremlak.com` (veya sitenizin domain'i)

**Developer contact information (Geliştirici iletişim bilgileri):**
- **Email addresses** (E-posta adresleri): E-posta adresiniz

**"Save and Continue"** (Kaydet ve Devam Et) butonuna tıklayın

### Scopes (İzinler) Sayfası:

1. **"Add or Remove Scopes"** (İzin Ekle veya Kaldır) butonuna tıklayın
2. Aşağıdaki izinleri seçin:
   - `https://www.googleapis.com/auth/drive.readonly` - Google Drive'dan dosya okuma
   - `https://www.googleapis.com/auth/drive.file` - Google Drive'a dosya yükleme
3. **"Update"** (Güncelle) butonuna tıklayın
4. **"Save and Continue"** (Kaydet ve Devam Et) butonuna tıklayın

### Test Users (Test Kullanıcıları) Sayfası:

**ÖNEMLİ:** Eğer OAuth consent screen'i **"Testing"** (Test) modundaysa, sadece test kullanıcıları uygulamayı kullanabilir.

1. **"Add Users"** (Kullanıcı Ekle) butonuna tıklayın
2. Google hesabınızın e-posta adresini ekleyin
3. **"Add"** (Ekle) butonuna tıklayın
4. **"Save and Continue"** (Kaydet ve Devam Et) butonuna tıklayın

**Not:** Production'da kullanmak için OAuth consent screen'i **"Publish"** (Yayınla) durumuna getirmeniz gerekir.

## 📋 Adım 5: OAuth 2.0 Credentials (Kimlik Bilgileri) Oluşturma

1. Sol menüden **"APIs & Services"** > **"Credentials"** (Kimlik Bilgileri) seçeneğine tıklayın
2. Üst kısımdaki **"+ CREATE CREDENTIALS"** (Kimlik Bilgileri Oluştur) butonuna tıklayın
3. Açılan menüden **"OAuth client ID"** seçeneğini seçin

### OAuth Client Oluşturma:

1. **Application type** (Uygulama Tipi) olarak **"Web application"** (Web Uygulaması) seçin
2. **Name** (İsim) alanına bir isim verin (örn: "TSR Web Drive Client")
3. **Authorized redirect URIs** (Yetkili Yönlendirme URI'leri) bölümüne şu URL'yi ekleyin:

   **Development (Geliştirme) için:**
   ```
   http://localhost:3004/api/admin/google-drive/callback
   ```

   **Production (Canlı) için:**
   ```
   https://tsremlak.com/api/admin/google-drive/callback
   ```
   (veya sitenizin domain'ini kullanın)

4. **"Create"** (Oluştur) butonuna tıklayın

## 📋 Adım 6: Client ID ve Client Secret'ı Kopyalama

1. Açılan pencerede **Client ID** ve **Client Secret** değerlerini göreceksiniz
2. **ÖNEMLİ:** Bu bilgileri hemen kopyalayın ve güvenli bir yere kaydedin
3. **Client Secret** sadece bir kez gösterilir! Eğer kaybederseniz, yeni bir OAuth client oluşturmanız gerekir

### Bilgileri Kopyalama:

- **Client ID**: `123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com` formatında bir değer
- **Client Secret**: `GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxxxxxx` formatında bir değer

## 📋 Adım 7: Admin Paneline Ekleme

1. Admin paneline giriş yapın: `/admin/login`
2. **"Ayarlar"** menüsüne gidin
3. **"Google Drive Entegrasyonu"** bölümünü bulun
4. **Client ID** ve **Client Secret** değerlerini ilgili alanlara yapıştırın
5. **"Kaydet"** butonuna tıklayın
6. **"Google Drive'a Bağlan"** butonuna tıklayın
7. Google hesabınızla giriş yapın ve izinleri verin
8. Bağlantı başarılı olduğunda **"Google Drive Bağlı"** mesajını göreceksiniz

## 🔒 Güvenlik Notları

1. **Client Secret'ı asla public repository'ye yüklemeyin**
2. `.env.local` dosyasını `.gitignore`'a ekleyin
3. Production'da HTTPS kullanın
4. OAuth consent screen'i production için yayınlamadan önce test edin

## ❓ Sık Sorulan Sorular

### Client Secret'ı kaybettim, ne yapmalıyım?

1. Google Cloud Console > APIs & Services > Credentials sayfasına gidin
2. İlgili OAuth client'ın yanındaki **"Edit"** (Düzenle) butonuna tıklayın
3. **"Reset Secret"** (Secret'ı Sıfırla) butonuna tıklayın
4. Yeni Client Secret'ı kopyalayın ve admin paneline ekleyin

### "Invalid redirect URI" hatası alıyorum

- Google Cloud Console'da **Authorized redirect URIs** listesinde doğru URL'nin olduğundan emin olun
- URL'nin tam olarak eşleştiğinden emin olun (http/https, port numarası, vb.)
- Development için: `http://localhost:3004/api/admin/google-drive/callback`
- Production için: `https://yourdomain.com/api/admin/google-drive/callback`

### "Access denied" hatası alıyorum

- OAuth consent screen'de test kullanıcı olarak eklendiğinizden emin olun
- Veya OAuth consent screen'i **"Published"** (Yayınlandı) durumuna getirin

### OAuth consent screen'i nasıl yayınlarım?

1. Google Cloud Console > APIs & Services > OAuth consent screen sayfasına gidin
2. **"Publish App"** (Uygulamayı Yayınla) butonuna tıklayın
3. Onaylayın

## 📞 Destek

Sorun yaşarsanız:
1. Tarayıcı konsolundaki hata mesajlarını kontrol edin
2. Server loglarını kontrol edin
3. Google Cloud Console'da API kullanım istatistiklerini kontrol edin
