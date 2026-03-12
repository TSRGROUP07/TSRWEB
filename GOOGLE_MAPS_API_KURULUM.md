# Google Maps API Kurulum Rehberi

## 🚀 Hızlı Başlangıç

### Adım 1: Google Cloud Console'a Giriş
1. [Google Cloud Console](https://console.cloud.google.com/) adresine gidin
2. Google hesabınızla giriş yapın
3. Yeni bir proje oluşturun veya mevcut bir projeyi seçin

### Adım 2: API'leri Etkinleştir
Aşağıdaki API'leri etkinleştirmeniz gerekiyor:

1. **Maps JavaScript API** - Harita görüntüleme için
   - [Direkt Link](https://console.cloud.google.com/apis/library/maps-javascript-api.googleapis.com)

2. **Places API** - Konum arama için
   - [Direkt Link](https://console.cloud.google.com/apis/library/places-backend.googleapis.com)

3. **Directions API** - Yol tarifi için
   - [Direkt Link](https://console.cloud.google.com/apis/library/directions-backend.googleapis.com)

4. **Geocoding API** (Opsiyonel) - Adres dönüştürme için
   - [Direkt Link](https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com)

**Hızlı Etkinleştirme:**
- Her bir linke tıklayın
- "ETKİNLEŞTİR" butonuna tıklayın
- Tüm API'ler etkinleştirilene kadar tekrarlayın

### Adım 3: API Anahtarı Oluştur
1. [API ve Hizmetler > Kimlik Bilgileri](https://console.cloud.google.com/apis/credentials) sayfasına gidin
2. Üstteki **"+ KİMLİK BİLGİSİ OLUŞTUR"** butonuna tıklayın
3. **"API anahtarı"** seçeneğini seçin
4. Oluşturulan API anahtarını kopyalayın

### Adım 4: API Anahtarı Kısıtlamaları (Önerilen)
Güvenlik için API anahtarınızı kısıtlayın:

1. Oluşturduğunuz API anahtarının yanındaki **düzenle** (kalem) ikonuna tıklayın
2. **"Uygulama kısıtlamaları"** bölümünde:
   - **"HTTP başvuruları"** seçin
   - **"Web siteleri"** ekleyin
   - Geliştirme için: `http://localhost:3000/*`
   - Production için: `https://yourdomain.com/*`
3. **"API kısıtlamaları"** bölümünde:
   - **"API'leri kısıtla"** seçin
   - Sadece yukarıda etkinleştirdiğiniz API'leri seçin:
     - Maps JavaScript API
     - Places API
     - Directions API
     - Geocoding API (eğer eklediyseniz)
4. **"Kaydet"** butonuna tıklayın

### Adım 5: Faturalandırma Ayarları
⚠️ **ÖNEMLİ:** Google Maps API ücretsiz değildir, ancak cömert bir ücretsiz kotası vardır.

1. [Faturalandırma](https://console.cloud.google.com/billing) sayfasına gidin
2. Faturalandırma hesabı oluşturun (kredi kartı gerekli)
3. Projenizi faturalandırma hesabına bağlayın

**Ücretsiz Kota (Aylık):**
- Maps JavaScript API: İlk 28,000 yükleme ücretsiz
- Places API: İlk 1,000 istek ücretsiz
- Directions API: İlk 2,500 istek ücretsiz

### Adım 6: API Anahtarını Projeye Ekleme

1. Proje kök dizininde `.env.local` dosyasını oluşturun (yoksa)
2. Aşağıdaki satırı ekleyin:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
```

3. `YOUR_API_KEY_HERE` kısmını kendi API anahtarınızla değiştirin
4. Dosyayı kaydedin
5. Geliştirme sunucusunu yeniden başlatın:
   ```bash
   npm run dev
   ```

## ✅ Kontrol Listesi

- [ ] Google Cloud Console'da proje oluşturuldu
- [ ] Maps JavaScript API etkinleştirildi
- [ ] Places API etkinleştirildi
- [ ] Directions API etkinleştirildi
- [ ] API anahtarı oluşturuldu
- [ ] API anahtarı kısıtlandı (güvenlik için)
- [ ] Faturalandırma hesabı bağlandı
- [ ] `.env.local` dosyasına API anahtarı eklendi
- [ ] Geliştirme sunucusu yeniden başlatıldı

## 🔧 Sorun Giderme

### API anahtarı çalışmıyor
- API anahtarının doğru kopyalandığından emin olun
- API'lerin etkinleştirildiğini kontrol edin
- Tarayıcı konsolunda hata mesajlarını kontrol edin

### "This API key is not authorized" hatası
- API kısıtlamalarında doğru API'lerin seçildiğini kontrol edin
- Web sitesi kısıtlamalarında doğru domain'lerin eklendiğini kontrol edin

### Faturalandırma hatası
- Faturalandırma hesabının bağlı olduğunu kontrol edin
- Kredi kartı bilgilerinin doğru olduğunu kontrol edin

## 📞 Destek

Daha fazla yardım için:
- [Google Maps Platform Dokümantasyonu](https://developers.google.com/maps/documentation)
- [Google Cloud Console Yardım](https://cloud.google.com/docs)
