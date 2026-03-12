# Firebase Storage CORS Ayarları

## Sorun
Firebase Storage'a client-side'dan yükleme yaparken CORS hatası alıyorsunuz.

## Çözüm 1: Firebase Storage CORS Ayarlarını Yapılandırma (Önerilen)

### Adımlar:

1. **Google Cloud SDK'yı yükleyin:**
   - https://cloud.google.com/sdk/docs/install

2. **gcloud CLI ile giriş yapın:**
   ```bash
   gcloud auth login
   ```

3. **Projeyi seçin:**
   ```bash
   gcloud config set project tsr-web-112e2
   ```

4. **CORS ayarları dosyası oluşturun (`cors.json`):**
   ```json
   [
     {
       "origin": ["*"],
       "method": ["GET", "POST", "PUT", "DELETE", "HEAD"],
       "maxAgeSeconds": 3600,
       "responseHeader": ["Content-Type", "Authorization"]
     }
   ]
   ```

5. **CORS ayarlarını uygulayın:**
   ```bash
   gsutil cors set cors.json gs://tsr-web-112e2.firebasestorage.app
   ```

### Alternatif: Firebase Console'dan

Firebase Console → Storage → Settings → CORS ayarları (eğer varsa)

## Çözüm 2: Server-Side Upload Kullanma (Geçici)

Şu anda `/api/admin/upload` route'u server-side upload kullanıyor. Bu CORS sorununu çözer ama Vercel'in 4.5MB body size limiti var.

## Çözüm 3: Firebase Authentication Kullanma

Client-side upload için Firebase Authentication kullanarak yükleme yapabilirsiniz. Bu CORS sorununu çözer.

### Kod Örneği:

```typescript
import { signInAnonymously } from "firebase/auth";
import { auth } from "@/lib/firebase";

// Anonymous authentication
await signInAnonymously(auth);

// Sonra upload yap
```

## Önerilen Çözüm

**En iyi çözüm:** Firebase Storage CORS ayarlarını yapılandırmak (Çözüm 1). Bu, client-side upload'ı sorunsuz çalıştırır.

**Geçici çözüm:** Server-side upload kullanmak (şu anda aktif).
