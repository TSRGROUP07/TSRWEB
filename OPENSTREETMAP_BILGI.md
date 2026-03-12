# OpenStreetMap (Leaflet) Harita Entegrasyonu

## ✅ Tamamen Ücretsiz!

Artık Google Maps API anahtarına ihtiyacınız yok! Proje **OpenStreetMap** ve **Leaflet** kullanıyor.

## 🎯 Özellikler

### ✅ Mevcut Özellikler
- ✅ **Ücretsiz harita görüntüleme** - OpenStreetMap kullanıyor
- ✅ **Marker'lar** - Emlak konumlarını gösterir
- ✅ **Arama** - Nominatim API ile konum arama (ücretsiz)
- ✅ **Yol tarifi** - OpenStreetMap routing ile
- ✅ **Harita tipleri** - OpenStreetMap, Carto Light, Uydu görünümü
- ✅ **Tam ekran modu**
- ✅ **Popup bilgileri** - Marker'a tıklayınca emlak detayları
- ✅ **Otomatik zoom** - Tüm emlakları gösterir

### 🗺️ Harita Tipleri

1. **OpenStreetMap** (Varsayılan)
   - Açık kaynak harita verisi
   - Tamamen ücretsiz

2. **Carto Light**
   - Modern, temiz görünüm
   - Ücretsiz

3. **Uydu Görünümü**
   - Esri World Imagery
   - Ücretsiz

## 📦 Kullanılan Teknolojiler

- **Leaflet** - Açık kaynak harita kütüphanesi
- **react-leaflet** - React için Leaflet wrapper
- **OpenStreetMap** - Açık kaynak harita verisi
- **Nominatim API** - Ücretsiz geocoding/search servisi
- **OSRM** - Açık kaynak routing servisi

## 🚀 Kullanım

Harita otomatik olarak çalışır, hiçbir API anahtarı gerekmez!

### Emlak Listesi Sayfası
```
/emlak → "Harita Görünümü" butonuna tıklayın
```

### Emlak Detay Sayfası
```
/emlak/[id] → Konum bölümünde harita görünür
```

## 🔍 Arama Özelliği

1. Harita üzerindeki arama kutusuna konum yazın
2. Enter'a basın veya "Ara" butonuna tıklayın
3. Harita otomatik olarak bulunan konuma zoom yapar

**Örnek aramalar:**
- "Alanya, Antalya"
- "İstanbul, Türkiye"
- "Kadıköy, İstanbul"

## 🧭 Yol Tarifi

1. Marker'a tıklayın
2. Popup'ta "Yol Tarifi" butonuna tıklayın
3. OpenStreetMap routing sayfası açılır
4. Konumunuzdan seçili emlaka yol tarifi alabilirsiniz

## ⚙️ Teknik Detaylar

### Nominatim API
- **Rate Limit**: Saniyede 1 istek (yeterli)
- **Ücretsiz**: Evet, tamamen ücretsiz
- **Kullanım**: Sadece arama için

### OpenStreetMap Tiles
- **Ücretsiz**: Evet
- **Limit**: Yok (makul kullanım)
- **Kullanım**: Harita görüntüleme

## 🔄 Google Maps'ten Geçiş

Eğer daha önce Google Maps kullanıyorsanız:
- ✅ Artık API anahtarı gerekmez
- ✅ Faturalandırma yok
- ✅ Limit yok
- ✅ Tüm özellikler çalışıyor

## 📝 Notlar

- OpenStreetMap verileri topluluk tarafından güncellenir
- Bazı bölgelerde detay seviyesi Google Maps'ten farklı olabilir
- Tüm özellikler ücretsiz ve açık kaynak

## 🆘 Sorun Giderme

### Harita görünmüyor
- Tarayıcı konsolunda hata var mı kontrol edin
- İnternet bağlantınızı kontrol edin
- Leaflet CSS'inin yüklendiğinden emin olun

### Arama çalışmıyor
- İnternet bağlantınızı kontrol edin
- Nominatim API rate limit'ine takılmış olabilirsiniz (1 saniye bekleyin)

### Marker'lar görünmüyor
- Leaflet icon dosyalarının yüklendiğinden emin olun
- Tarayıcı konsolunda hata var mı kontrol edin

## 🎉 Avantajlar

✅ **Tamamen Ücretsiz** - Hiçbir API anahtarı gerekmez
✅ **Açık Kaynak** - Topluluk tarafından desteklenir
✅ **Hızlı** - Hafif ve optimize edilmiş
✅ **Esnek** - Özelleştirilebilir
✅ **Gizlilik Dostu** - Verileriniz toplanmaz
