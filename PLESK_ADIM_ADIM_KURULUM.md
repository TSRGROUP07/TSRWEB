# Plesk - Next.js (Standalone) Adım Adım Kurulum Rehberi

Harika bir haber: `next.config.js` dosyanızı kontrol ettim ve `output: 'standalone'` ayarı dosyanızın 7. satırında zaten ekli. Yani Next.js tarafında Plesk için kodda hiçbir değişiklik yapmanıza gerek yok! Projeniz yapısal olarak hazır.

Dosyaları `httpdocs` içerisine başarılı bir şekilde çektiğinize göre, şimdi sadece Plesk ayarlarını, bağımlılık kurulumlarını ve ortam değişkenlerini ayarlamamız gerekiyor. Sırasıyla işlemleri yapalım:

## ADIM 1: GitHub ile Plesk Arasında Otomatik Senkronizasyon (Webhook)
Şu an dosyaları manuel çektiniz. Ancak ileride bilgisayarınızdan GitHub'a her `push` (yükleme) yaptığınızda Plesk'in bu dosyaları otomatik çekmesi için Webhook kurmalıyız.

1. **Plesk Panelinde:**
   - Plesk panelinizde ilgili alan adınıza (domain) tıklayın.
   - Menüden **Git** (veya Git Repositories) bölümüne girin.
   - Eklediğiniz deponun yanında bulunan **Repository Settings (Depo Ayarları)** veya dişli çark ikonuna tıklayın.
   - Karşınıza çıkan ekranda **"Webhook URL"** diye bir bağlantı göreceksiniz. (Örn: `https://.../modules/git/public/web-hook.php?...`). Bu linki tam olarak kopyalayın.

2. **GitHub Üzerinde:**
   - GitHub'da projenizin (reponun) sayfasına gidin.
   - Üst menüden **Settings (Ayarlar)** sekmesine tıklayın.
   - Sol menüden **Webhooks** kısmına gelin ve sağ üstteki **"Add webhook"** butonuna tıklayın.
   - **Payload URL** kutucuğuna Plesk'ten kopyaladığınız Webhook URL'sini yapıştırın.
   - **Content type** ayarını `application/json` olarak değiştirin.
   - Sayfanın altındaki **"Add webhook"** butonuna tıklayarak kaydedin.
   *(Tebrikler! Artık kodu GitHub'a gönderdiğiniz an `httpdocs` otomatik olarak güncellenecek.)*

---

## ADIM 2: Plesk'te Node.js Uygulamasını Aktif Etme
Plesk sunucusuna bu dosyaların bir "Node.js (Next.js)" projesi olduğunu söylememiz gerekiyor.

1. Plesk'te ilgili domainin ana sayfasına dönün.
2. Menüden **Node.js App** (Node.js Uygulaması) simgesine tıklayın. *(Göremezseniz hosting şirketinizin Node.js modülünü açması gerekir).*
3. Burada yapmanız gereken ayarlar **tam olarak** şunlardır:
   - **Node.js Sürümü:** `20.x` veya `18.x` seçin. (Kendi bilgisayarınızda hangisi yüklüyse veya güncel 20.x sürümü).
   - **Paket Yöneticisi:** `npm` olarak kalmalı.
   - **Document Root (Belge Kök Dizini):** `/httpdocs/public` olarak seçin. *(Güvenlik için çok önemlidir. Dışarıdan gelen kullanıcılar sadece `public` klasörünü (logolar, resimler) görmelidir, kaynak kodunuzu değil).*
   - **Application Root (Uygulama Kök Dizini):** `/httpdocs` olarak ayarlayın. (Projemizin ana klasörü).
   - **Application Startup File (Başlangıç Dosyası):** Buraya `server.js` yerine **`.next/standalone/server.js`** yazın. *(Projemiz standalone ayarlıdır ve ana çalıştırıcı bu dosyadır).*

---

## ADIM 3: Çevre Değişkenleri (.env) Ekleme
GitHub'a gizli `.env.local` dosyasını (Supabase, Firebase, Google API şifrelerini) yüklemediniz. Bu şifreleri Plesk'e manuel tanımlamalıyız.

1. Yine aynı **Node.js** ayarları sayfasında (alt kısımlarda) **"Custom environment variables" (Özel ortam değişkenleri / Çevre Değişkenleri)** bölümü göreceksiniz.
2. Bilgisayarınızdaki `.env.local` dosyasını VS Code ile açın.
3. Oradaki tüm şifreleri Plesk'teki bu alana tek tek `Key` (Anahtar) ve `Value` (Değer) olacak şekilde ekleyin.
   *Örnek:* 
   - Key: `NEXT_PUBLIC_SUPABASE_URL` | Value: `https://aahga...supabase.co`
   - Key: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Value: `AIzaSy...`
4. Bu ayarları ekledikten sonra Kaydet veya Tamam butonuna basmayı unutmayın.

---

## ADIM 4: Kütüphaneleri Kurma ve Projeyi Build Etme
Projenizin çalışması için gerekli kütüphaneleri (`node_modules`) kurup, canlı ortama hazırlamalıyız.

1. **Kurulum:** Node.js sayfasının üst kısmında bulunan **"NPM Install"** butonuna tıklayın. Bu işlem Plesk'in sunucu gücüne bağlı olarak birkaç dakika sürecektir. 
2. **Derleme (Build):** NPM Install işlemi bittikten sonra yanındaki **"Run Script" (Script Çalıştır)** butonuna tıklayın. Karşınıza bir kutucuk çıkacak; o kutucuğa `build` yazın ve çalıştırın.
   *(Bu işlem arkada `npm run build` komutunu çalıştırarak Next.js uygulamanızı standalone yayına hazır hale getirir).*

*Eğer panelinizde "Run Script" yoksa:*
Plesk terminaline (SSH) bağlanıp şu kodu yazmalısınız: 
```bash
cd httpdocs
npm run build
```

---

## ADIM 5: Yayına Alma
1. Derleme (build) işlemi başarıyla ve hatasız bittiyse, Node.js ana sayfasındaki **"Enable Node.js"** butonuna basın. Eğer sistem zaten etkinse **"Restart App" (Yeniden Başlat)** butonuna tıklayın.
2. Web tarayıcınızdan domain adınıza girin. Siteniz aktif olarak açılmış olmalıdır!

---

### 🔥 GÜNCELLEMELERDE NE YAPACAKSINIZ? (YENİ İŞ AKIŞI)
İlk kurulumu bitirdikten sonra (yani Adım 1'den 5'e kadar her şeyi yapıp siteyi açtıktan sonra), kodunuzda bir düzenleme yaptığınızda canlıya almak çok kolay olacak:

1. VS Code'da kodu yazın ve GitHub'a yollayın (`git push`).
2. Webhook otomatik olarak Plesk'teki `httpdocs` klasörünü güncelleyecek.
3. Plesk panele girip **Node.js** sekmesini açın.
4. Önce **"Run Script"** butonuna basıp tekrar `build` komutunu çalıştırın. (Yeni kodların derlenmesi için şart).
5. Build bitince **"Restart App"** butonuna basarak sunucuyu yeniden başlatın. Yeni özellikleriniz yayında!
