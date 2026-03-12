# 🔥 Firestore'dan Manuel Silme Rehberi

## Firebase Console'dan Tüm İlanları Silme

### Adım 1: Firebase Console'a Giriş
1. https://console.firebase.google.com/ adresine gidin
2. Projenizi seçin: **tsr-web-112e2**
3. Sol menüden **Firestore Database** seçin

### Adım 2: Properties Collection'ını Bulun
1. Sol tarafta **Collections** listesinde **properties** collection'ını bulun
2. Üzerine tıklayın

### Adım 3: Tüm İlanları Silme

#### Yöntem 1: Tek Tek Silme (Küçük sayılar için)
1. Her ilanın yanındaki **⋮** (üç nokta) menüsüne tıklayın
2. **Delete document** seçin
3. Onaylayın

#### Yöntem 2: Toplu Silme (Önerilen)
1. İlk ilanı seçin (checkbox)
2. Tüm ilanları seçmek için **Select all** butonuna tıklayın
3. Üstteki **Delete** butonuna tıklayın
4. Onaylayın

### Adım 4: Collection'ı Tamamen Silme (Opsiyonel)
Eğer tüm collection'ı silmek istiyorsanız:
1. Collection adının yanındaki **⋮** menüsüne tıklayın
2. **Delete collection** seçin
3. Collection adını yazarak onaylayın: `properties`
4. **Delete** butonuna tıklayın

---

## ⚠️ ÖNEMLİ UYARILAR

1. **Bu işlem geri alınamaz!** Silinen veriler kalıcı olarak kaybolur.
2. Yedek almak isterseniz, önce **Export** yapın:
   - Collection'ın yanındaki **⋮** menüsü → **Export collection**
3. Production verilerini silmeden önce emin olun!

---

## 🔄 Alternatif: Admin Panelden Silme (Çalışıyorsa)

1. Admin Panel → İlanlar sayfasına gidin
2. Silmek istediğiniz ilanın yanındaki **🗑️ Sil** butonuna tıklayın
3. Onaylayın

---

## 📝 Notlar

- Firestore'da ID'ler **string** formatındadır
- Admin panelde görünen ID'ler number olabilir, ama Firestore'da string olarak saklanır
- Silme işlemi başarısız olursa, tarayıcı konsolunu kontrol edin (F12)
