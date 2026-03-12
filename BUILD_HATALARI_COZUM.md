# 🔧 Build Hataları Çözümü

Build sırasında ESLint hataları alıyorsunuz. İki seçeneğiniz var:

## ⚡ Hızlı Çözüm (Geçici)

Build sırasında ESLint'i atlamak için `next.config.js` dosyasını güncelleyin:

```javascript
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Build sırasında ESLint hatalarını yoksay (sadece uyarı olarak göster)
    ignoreDuringBuilds: true,
  },
  // ... geri kalan ayarlar
}
```

**DİKKAT:** Bu sadece geçici bir çözümdür. Production için tüm hataları düzeltmelisiniz.

## ✅ Kalıcı Çözüm (Önerilen)

Tüm unescaped entities hatalarını düzeltin:

1. **Apostrophe (`'`)** → `&apos;` veya `{'` '}` (curly braces)
2. **Double Quote (`"`)** → `&quot;` veya `{'"'}` (curly braces)

### Örnek Düzeltmeler:

```jsx
// ❌ Hatalı:
<p>Banner'ı Aktif Et</p>
<p>"Banner/Reklam" kategorisi</p>

// ✅ Doğru:
<p>Banner&apos;ı Aktif Et</p>
<p>&quot;Banner/Reklam&quot; kategorisi</p>

// Veya curly braces ile:
<p>Banner{'\''}ı Aktif Et</p>
<p>{'"'}Banner/Reklam{'"'} kategorisi</p>
```

### Hatalı Dosyalar:

1. ✅ app/admin/ana-sayfa/page.tsx - **DÜZELTİLDİ**
2. ✅ app/admin/resimler/page.tsx - **DÜZELTİLDİ**
3. ✅ app/admin/videolar/yeni/page.tsx - **DÜZELTİLDİ**
4. ✅ app/blog/page.tsx - **DÜZELTİLDİ**
5. ⏳ app/analitik-harita/page.tsx
6. ⏳ app/arac-kiralama/page.tsx
7. ⏳ app/dijital-satis/page.tsx
8. ⏳ app/emlak/page.tsx
9. ⏳ app/gunluk-kiralama/kiralamak/page.tsx
10. ⏳ app/kurumsal/page.tsx
11. ⏳ app/transfer/page.tsx
12. ⏳ app/yatirim/satin-al/page.tsx
13. ⏳ app/yatirim/villa-finans/page.tsx
14. ⏳ components/CompanyAbout.tsx
15. ⏳ components/SocialShare.tsx
16. ⏳ components/Stats.tsx

---

## 🚀 Şimdi Ne Yapmalısınız?

**Seçenek 1: Hızlı (Geçici)**
- `next.config.js`'e `eslint: { ignoreDuringBuilds: true }` ekleyin
- Build çalışır ama hatalar göz ardı edilir

**Seçenek 2: Doğru (Kalıcı)**
- Tüm dosyalardaki hataları tek tek düzeltin
- Bu daha temiz kod sağlar

---

**Önerilen:** Geçici çözümle build alın, sonra hataları tek tek düzeltin.
