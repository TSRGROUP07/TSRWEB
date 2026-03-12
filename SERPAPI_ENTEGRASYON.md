# SerpAPI Entegrasyonu - Detaylı Kılavuz

## Genel Bakış

SerpAPI, Google Maps arama sonuçlarını programatik olarak almak için kullanılan bir servistir. TSR Emlak web sitesinde, emlak detay sayfalarında çevre analizi yapmak için kullanılmaktadır.

## API Yapısı

Gönderdiğiniz örnek API yanıtına göre, aşağıdaki yapı kullanılmaktadır:

```typescript
{
  "arama_meta_verileri": {
    "id": "6722e9c748b9f773a3a65adb",
    "durum": "Başarı",
    "json_endpoint": "https://serpapi.com/searches/...",
    "oluşturulma_tarihi": "2024-10-31 02:21:59 UTC"
  },
  "yerel_sonuçlar": [
    {
      "konum": 1,
      "başlık": "İşletme Adı",
      "gps_koordinatları": {
        "enlem": 40.7477172,
        "boylam": -73.98653019999999
      },
      "değerlendirme": 4.5,
      "yorumlar": 3108,
      "tip": "Kahvehane",
      "adres": "Adres bilgisi",
      "telefon": "(917) 540-2776",
      "web_sitesi": "https://...",
      "açık_durum": "Yakında kapanıyor...",
      "çalışma_saatleri": { ... },
      "küçük_resim": "https://..."
    }
  ]
}
```

## Kullanım Senaryoları

### 1. Emlak Detay Sayfasında Çevre Analizi

Emlak detay sayfasında (`/emlak/[id]`), seçilen emlakın çevresindeki önemli yerler gösterilir:

- Okullar
- Marketler
- Hastaneler
- Parklar
- Restoranlar
- Bankalar
- Spor Salonları

### 2. Bölge Analizi

Fiyat analizi sayfasında, belirli bir bölgedeki emlak fiyatları ile çevredeki hizmetlerin kalitesi karşılaştırılabilir.

### 3. Harita Üzerinde Gösterim

Google Maps üzerinde, emlak konumunun yanında çevredeki önemli yerler de işaretlenebilir.

## Kurulum

1. **SerpAPI Hesabı Oluşturun**
   - [serpapi.com](https://serpapi.com/) adresine gidin
   - Ücretsiz hesap oluşturun (100 arama/ay ücretsiz)
   - API anahtarınızı alın

2. **Environment Değişkeni Ekleyin**
   ```bash
   # .env.local
   SERPAPI_KEY=your_serpapi_key_here
   ```

3. **API Kullanımı**
   - Emlak detay sayfasına gidin
   - Çevre analizi otomatik olarak yüklenir
   - API endpoint: `/api/nearby-places`

## API Endpoint'leri

### Çevre Analizi
```
GET /api/nearby-places?lat={lat}&lng={lng}&type=surroundings
```

**Yanıt:**
```json
{
  "Okullar": [...],
  "Marketler": [...],
  "Hastaneler": [...],
  ...
}
```

### Özel Arama
```
GET /api/nearby-places?lat={lat}&lng={lng}&query={query}
```

**Örnek:**
```
GET /api/nearby-places?lat=41.0082&lng=28.9784&query=okul
```

## Kod Örnekleri

### Frontend'de Kullanım

```typescript
import NearbyPlaces from "@/components/NearbyPlaces";

// Emlak detay sayfasında
<NearbyPlaces 
  location={{ lat: 41.0082, lng: 28.9784 }}
  propertyId={1}
/>
```

### Backend API Kullanımı

```typescript
import { getPropertySurroundings } from "@/lib/serpapi";

const surroundings = await getPropertySurroundings(
  { lat: 41.0082, lng: 28.9784 },
  process.env.SERPAPI_KEY!
);
```

## Fiyatlandırma

- **Ücretsiz Plan**: 100 arama/ay
- **Temel Plan**: $50/ay - 5,000 arama
- **Profesyonel Plan**: $250/ay - 25,000 arama

Detaylar için: [serpapi.com/pricing](https://serpapi.com/pricing)

## Limitler ve Öneriler

1. **Rate Limiting**: API çağrılarını cache'leyin
2. **Maliyet Optimizasyonu**: Sadece gerekli kategorileri sorgulayın
3. **Hata Yönetimi**: API hatalarını yakalayın ve kullanıcıya bilgi verin

## Sorun Giderme

### API Anahtarı Hatası
```
Error: SERPAPI_KEY environment değişkeni tanımlı değil
```
**Çözüm**: `.env.local` dosyasına `SERPAPI_KEY` ekleyin

### Sonuç Bulunamadı
- Konum koordinatlarını kontrol edin
- Arama sorgusunu değiştirmeyi deneyin
- API limitinizi kontrol edin

## Gelecek Geliştirmeler

- [ ] Cache mekanizması ekleme
- [ ] Daha fazla kategori desteği
- [ ] Harita üzerinde görselleştirme
- [ ] Filtreleme seçenekleri
- [ ] Mesafe hesaplama


















