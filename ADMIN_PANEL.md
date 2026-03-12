# Admin Panel Kılavuzu

## Genel Bakış

TSR Emlak Admin Paneli, web sitesinin içeriğini yönetmek için kapsamlı bir yönetim sistemidir. İlan, video ve resim yönetimi yapabilirsiniz.

## Giriş

1. Tarayıcınızda `/admin/login` adresine gidin
2. Varsayılan giriş bilgileri:
   - **E-posta:** `admin@tsremlak.com`
   - **Şifre:** `admin123`

**Önemli:** Production ortamında mutlaka şifreyi değiştirin!

## Özellikler

### 1. Dashboard

Ana sayfada genel istatistikleri görüntüleyebilirsiniz:
- Toplam ilan sayısı
- Toplam video sayısı
- Toplam resim sayısı
- Toplam görüntülenme

### 2. İlan Yönetimi

#### Yeni İlan Ekleme

1. **İlan Yönetimi** menüsüne gidin
2. **Yeni İlan Ekle** butonuna tıklayın
3. Formu doldurun:
   - Başlık (zorunlu)
   - Konum (zorunlu)
   - Fiyat (zorunlu)
   - Metrekare (zorunlu)
   - Oda sayısı (zorunlu)
   - Banyo sayısı (zorunlu)
   - Kat, Bina yaşı (opsiyonel)
   - Tip (Satılık/Kiralık)
   - Açıklama
   - Koordinatlar (Google Maps'ten alın)
   - Özellikler (Balkon, Asansör, vb.)

4. **Kaydet** butonuna tıklayın

#### İlan Düzenleme

1. İlan listesinde düzenlemek istediğiniz ilanın yanındaki **Düzenle** butonuna tıklayın
2. Formu güncelleyin
3. **Kaydet** butonuna tıklayın

#### İlan Silme

1. İlan listesinde silmek istediğiniz ilanın yanındaki **Sil** butonuna tıklayın
2. Onaylayın

### 3. Video Yönetimi

#### Video Yükleme

1. **Video Yönetimi** menüsüne gidin
2. **Yeni Video Yükle** butonuna tıklayın
3. Formu doldurun:
   - Başlık
   - Açıklama
   - Video Tipi:
     - **Ana Sayfa Hero Video:** Ana sayfanın açılış videosu
     - **Emlak Videosu:** Belirli bir emlak için video
     - **Diğer:** Genel kullanım

4. Video yükleme seçenekleri:
   - **Dosya Yükleme:** Bilgisayarınızdan video dosyası seçin
   - **URL:** YouTube, Vimeo veya başka bir video URL'si girin

5. **Kaydet** butonuna tıklayın

#### Video Silme

1. Video listesinde silmek istediğiniz videonun yanındaki **Sil** butonuna tıklayın
2. Onaylayın

### 4. Resim Yönetimi

#### Resim Yükleme

1. **Resim Yönetimi** menüsüne gidin
2. **Resim Yükle** butonuna tıklayın
3. Bilgisayarınızdan resim seçin
4. Resim otomatik olarak yüklenecek

#### Resim Silme

1. Resim üzerine gelin
2. Görünen **Sil** butonuna tıklayın

### 5. Ayarlar

**Genel Ayarlar:**
- Site adı
- Site e-posta
- Site telefon

**API Anahtarları:**
- SerpAPI Key
- Google Maps API Key

## Dosya Yapısı

Yüklenen dosyalar şu klasörlerde saklanır:
- **Videolar:** `/public/uploads/video/`
- **Resimler:** `/public/uploads/images/`

Veriler JSON dosyalarında saklanır:
- **İlanlar:** `/data/properties.json`
- **Videolar:** `/data/videos.json`
- **Resimler:** `/data/images.json`

## Güvenlik Önerileri

1. **Production Ortamı:**
   - Mutlaka güvenli bir authentication sistemi kullanın (JWT, OAuth)
   - Şifreleri environment değişkenlerinde saklayın
   - Database kullanın (JSON dosyaları yerine)
   - HTTPS kullanın

2. **Dosya Yükleme:**
   - Dosya boyutu limitleri koyun
   - Dosya tipi kontrolü yapın
   - Güvenlik taraması yapın

3. **API Anahtarları:**
   - API anahtarlarını asla kod içinde saklamayın
   - Environment değişkenlerinde saklayın
   - Düzenli olarak değiştirin

## Sorun Giderme

### Giriş Yapamıyorum
- E-posta ve şifrenin doğru olduğundan emin olun
- Tarayıcı konsolunda hata mesajlarını kontrol edin
- Environment değişkenlerini kontrol edin

### Dosya Yüklenmiyor
- Dosya boyutunu kontrol edin (max 50MB önerilir)
- Dosya formatını kontrol edin
- `/public/uploads/` klasörünün yazılabilir olduğundan emin olun

### Veriler Kayboldu
- `/data/` klasöründeki JSON dosyalarını kontrol edin
- Backup almayı unutmayın

## Gelecek Geliştirmeler

- [ ] Database entegrasyonu
- [ ] Çoklu kullanıcı desteği
- [ ] Rol bazlı yetkilendirme
- [ ] Aktivite logları
- [ ] Otomatik backup
- [ ] Bulk işlemler
- [ ] Gelişmiş filtreleme
- [ ] Export/Import özellikleri


















