# Google Drive Entegrasyonu - Kurulum Rehberi

Bu rehber, admin paneline Google Drive entegrasyonunu nasıl yapacağınızı açıklar.

## Adım 1: Google Cloud Console'da Proje Oluşturma

1. [Google Cloud Console](https://console.cloud.google.com/) adresine gidin
2. Yeni bir proje oluşturun veya mevcut bir projeyi seçin
3. Proje adını girin (örn: "TSR Web Google Drive")

## Adım 2: Google Drive API'yi Etkinleştirme

1. Sol menüden **"APIs & Services"** > **"Library"** seçeneğine gidin
2. Arama kutusuna **"Google Drive API"** yazın
3. **"Google Drive API"** seçeneğine tıklayın
4. **"Enable"** (Etkinleştir) butonuna tıklayın

## Adım 3: OAuth 2.0 Credentials Oluşturma

1. Sol menüden **"APIs & Services"** > **"Credentials"** seçeneğine gidin
2. Üstteki **"+ CREATE CREDENTIALS"** butonuna tıklayın
3. **"OAuth client ID"** seçeneğini seçin
4. Eğer ilk kez OAuth consent screen oluşturuyorsanız:
   - **"Configure Consent Screen"** butonuna tıklayın
   - **"External"** seçeneğini seçin ve **"Create"** butonuna tıklayın
   - Uygulama bilgilerini doldurun:
     - **App name**: TSR Web (veya istediğiniz isim)
     - **User support email**: E-posta adresiniz
     - **Developer contact information**: E-posta adresiniz
   - **"Save and Continue"** butonuna tıklayın
   - **Scopes** sayfasında **"Save and Continue"** butonuna tıklayın
   - **Test users** sayfasında (isteğe bağlı) test kullanıcıları ekleyin
   - **"Back to Dashboard"** butonuna tıklayın

5. **"Credentials"** sayfasına geri dönün ve **"+ CREATE CREDENTIALS"** > **"OAuth client ID"** seçin
6. **Application type** olarak **"Web application"** seçin
7. **Name** alanına bir isim verin (örn: "TSR Web Drive Client")
8. **Authorized redirect URIs** bölümüne şu URL'yi ekleyin:
   ```
   http://localhost:3004/api/admin/google-drive/callback
   ```
   Production için:
   ```
   https://yourdomain.com/api/admin/google-drive/callback
   ```
9. **"Create"** butonuna tıklayın
10. Açılan pencerede **Client ID** ve **Client Secret** değerlerini kopyalayın (bunları bir yere kaydedin, Client Secret sadece bir kez gösterilir!)

## Adım 4: Admin Panelde Yapılandırma

1. Admin paneline giriş yapın: `/admin/login`
2. **"Ayarlar"** menüsüne gidin
3. **"Google Drive Entegrasyonu"** bölümünü bulun
4. **Client ID** ve **Client Secret** değerlerini ilgili alanlara girin
5. **"Kaydet"** butonuna tıklayın
6. **"Google Drive'a Bağlan"** butonuna tıklayın
7. Google hesabınızla giriş yapın ve izinleri verin
8. Bağlantı başarılı olduğunda **"Google Drive Bağlı"** mesajını göreceksiniz

## Adım 5: Environment Değişkenleri

`.env.local` dosyanızda şu değişkenler otomatik olarak oluşturulur:

```env
GOOGLE_DRIVE_CLIENT_ID=your_client_id_here
GOOGLE_DRIVE_CLIENT_SECRET=your_client_secret_here
GOOGLE_DRIVE_REFRESH_TOKEN=auto_generated_after_connection
GOOGLE_DRIVE_REDIRECT_URI=http://localhost:3004/api/admin/google-drive/callback
```

**Önemli:** Sunucuyu yeniden başlatmanız gerekebilir:
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## Kullanım

### Google Drive'dan Dosya Seçme

1. **Resimler** veya **Videolar** sayfasına gidin
2. **"Google Drive'dan Seç"** butonuna tıklayın (yakında eklenecek)
3. Google Drive'daki dosyalarınızı görüntüleyin
4. İstediğiniz dosyayı seçin ve kullanın

### Google Drive'a Dosya Yükleme

1. Admin panelden dosya yüklerken **"Google Drive'a Yükle"** seçeneğini seçebilirsiniz (yakında eklenecek)

## Sorun Giderme

### "Google Drive bağlantısı yapılmamış" Hatası

- Client ID ve Client Secret'ın doğru girildiğinden emin olun
- **"Google Drive'a Bağlan"** butonuna tıklayıp OAuth akışını tamamlayın
- Sunucuyu yeniden başlatın

### "Invalid redirect URI" Hatası

- Google Cloud Console'da **Authorized redirect URIs** listesinde doğru URL'nin olduğundan emin olun
- URL'nin tam olarak eşleştiğinden emin olun (http/https, port numarası, vb.)

### "Access denied" Hatası

- OAuth consent screen'de test kullanıcı olarak eklendiğinizden emin olun
- Veya consent screen'i **"Published"** durumuna getirin (production için)

### Refresh Token Bulunamıyor

- OAuth consent screen'de **"access_type: offline"** ayarının olduğundan emin olun (otomatik olarak ayarlanır)
- İlk bağlantıda **"prompt: consent"** ile refresh token alınır

## Güvenlik Notları

1. **Client Secret** değerini asla public repository'ye yüklemeyin
2. `.env.local` dosyasını `.gitignore`'a ekleyin
3. Production'da HTTPS kullanın
4. OAuth consent screen'i production için yayınlamadan önce test edin

## API Limitleri

Google Drive API'nin ücretsiz kullanım limitleri:
- Günlük: 1 milyar istek
- Saniye başına kullanıcı başına: 1000 istek

Bu limitler normal kullanım için yeterlidir.

## Destek

Sorun yaşarsanız:
1. Tarayıcı konsolundaki hata mesajlarını kontrol edin
2. Server loglarını kontrol edin
3. Google Cloud Console'da API kullanım istatistiklerini kontrol edin
