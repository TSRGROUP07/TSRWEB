# Google Drive Dosya Paylaşım Rehberi

Service Account kullanarak Google Drive'dan dosya seçmek için, dosyaların Service Account'un Drive'ında olması veya Service Account e-postasına paylaşılması gerekir.

## 🔍 Sorun: Dosyalar Görünmüyor

Eğer Google Drive'da dosyalarınız var ama görünmüyorsa, muhtemelen şu nedenlerden biri olabilir:

1. **Dosyalar Service Account'un Drive'ında değil** - Dosyalarınız kendi Google hesabınızda
2. **Dosyalar paylaşılmamış** - Service Account e-postasına paylaşım yapılmamış
3. **API izinleri eksik** - Google Drive API izinleri yeterli değil

## ✅ Çözüm 1: Dosyaları Service Account E-postasına Paylaşma (Önerilen)

### Adım 1: Service Account E-postasını Not Edin

Service Account e-postanız: **`tsr-drive-service@tsrgroup1.iam.gserviceaccount.com`**

### Adım 2: Google Drive'da Dosyaları Paylaşın

1. [Google Drive](https://drive.google.com/) adresine gidin
2. Paylaşmak istediğiniz dosya veya klasöre sağ tıklayın
3. **"Paylaş"** (Share) seçeneğine tıklayın
4. **"Kişi veya grup ekle"** alanına şu e-postayı yazın:
   ```
   tsr-drive-service@tsrgroup1.iam.gserviceaccount.com
   ```
5. **"Görüntüleyen"** (Viewer) veya **"Düzenleyen"** (Editor) izni verin
6. **"Gönder"** (Send) butonuna tıklayın

### Adım 3: Test Edin

1. Admin paneline gidin: `/admin/ilanlar/yeni`
2. "Medya" sekmesine gidin
3. "Google Drive'dan Seç" butonuna tıklayın
4. Paylaştığınız dosyalar görünecektir

## ✅ Çözüm 2: Dosyaları Service Account'un Drive'ına Yükleme

### Adım 1: Service Account'un Drive'ına Erişim

Service Account'un kendi Google Drive'ı vardır. Bu Drive'a dosya yüklemek için:

1. Service Account e-postasına giriş yapamazsınız (bu bir robot hesabıdır)
2. Bunun yerine, dosyaları kendi Drive'ınızdan Service Account'a paylaşın (Yukarıdaki Çözüm 1)

### Alternatif: Klasör Paylaşımı

1. Google Drive'da bir klasör oluşturun (örn: "TSR İlan Görselleri")
2. Bu klasörü Service Account e-postasına paylaşın
3. Tüm görselleri bu klasöre yükleyin
4. Artık tüm dosyalar otomatik olarak görünecektir

## 🔧 Test Endpoint'i

Development modunda test endpoint'ini kullanabilirsiniz:

1. Tarayıcıda şu URL'yi açın:
   ```
   http://localhost:3004/api/admin/google-drive/test
   ```

2. Veya Google Drive File Picker'da "Test" butonuna tıklayın

Bu endpoint şunları gösterir:
- Service Account e-postası
- Toplam dosya sayısı
- Service Account'un kendi dosyaları
- Paylaşılan dosyalar

## ❓ Sık Sorulan Sorular

### Dosyalarım neden görünmüyor?

- Dosyalar Service Account e-postasına paylaşılmamış olabilir
- Dosyalar Service Account'un Drive'ında değil, kendi Drive'ınızda olabilir
- Paylaşım izinleri yeterli olmayabilir

### Service Account'un Drive'ına nasıl erişirim?

Service Account bir robot hesabıdır, doğrudan giriş yapamazsınız. Dosyaları paylaşarak erişim sağlayın.

### Tüm dosyaları tek tek paylaşmam mı gerekiyor?

Hayır! Bir klasör oluşturup tüm dosyaları oraya koyun ve klasörü Service Account'a paylaşın. Böylece klasördeki tüm dosyalar otomatik olarak görünecektir.

### Paylaşım izni ne olmalı?

- **Görüntüleyen (Viewer)**: Dosyaları görmek ve indirmek için yeterli
- **Düzenleyen (Editor)**: Dosyaları görmek, indirmek ve yüklemek için

### Dosyalar hala görünmüyor

1. Test endpoint'ini kullanarak Service Account'un erişebildiği dosyaları kontrol edin
2. Tarayıcı konsolundaki hata mesajlarını kontrol edin
3. Server loglarını kontrol edin
4. Paylaşımın doğru yapıldığından emin olun

## 📝 Örnek: Klasör Paylaşımı

1. Google Drive'da **"TSR İlan Görselleri"** adında bir klasör oluşturun
2. Tüm ilan görsellerinizi bu klasöre yükleyin
3. Klasöre sağ tıklayın → **"Paylaş"**
4. E-posta: `tsr-drive-service@tsrgroup1.iam.gserviceaccount.com`
5. İzin: **"Görüntüleyen"** veya **"Düzenleyen"**
6. **"Gönder"**

Artık klasördeki tüm dosyalar admin panelden görünecektir!
