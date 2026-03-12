/**
 * Google Maps API Kurulum Yardımcı Script
 * 
 * Bu script .env.local dosyasını oluşturur veya günceller
 * 
 * Kullanım:
 * node scripts/setup-google-maps.js YOUR_API_KEY_HERE
 */

const fs = require('fs');
const path = require('path');

const API_KEY = process.argv[2];
const ENV_FILE = path.join(__dirname, '..', '.env.local');

if (!API_KEY) {
  console.log('❌ Hata: API anahtarı gerekli!');
  console.log('');
  console.log('Kullanım:');
  console.log('  node scripts/setup-google-maps.js YOUR_API_KEY_HERE');
  console.log('');
  console.log('API anahtarı almak için:');
  console.log('  1. https://console.cloud.google.com/ adresine gidin');
  console.log('  2. Proje oluşturun veya seçin');
  console.log('  3. Maps JavaScript API, Places API ve Directions API\'yi etkinleştirin');
  console.log('  4. API ve Hizmetler > Kimlik Bilgileri > API anahtarı oluştur');
  console.log('  5. Oluşturulan anahtarı kopyalayın');
  console.log('');
  console.log('Detaylı rehber için: GOOGLE_MAPS_API_KURULUM.md dosyasına bakın');
  process.exit(1);
}

// .env.local dosyasını oku veya oluştur
let envContent = '';
if (fs.existsSync(ENV_FILE)) {
  envContent = fs.readFileSync(ENV_FILE, 'utf8');
}

// API anahtarını güncelle veya ekle
if (envContent.includes('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=')) {
  // Mevcut anahtarı güncelle
  envContent = envContent.replace(
    /NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=.*/,
    `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${API_KEY}`
  );
  console.log('✅ Mevcut API anahtarı güncellendi');
} else {
  // Yeni anahtar ekle
  if (envContent && !envContent.endsWith('\n')) {
    envContent += '\n';
  }
  envContent += `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${API_KEY}\n`;
  console.log('✅ Yeni API anahtarı eklendi');
}

// Dosyayı kaydet
fs.writeFileSync(ENV_FILE, envContent, 'utf8');

console.log('');
console.log('🎉 Google Maps API anahtarı başarıyla eklendi!');
console.log('');
console.log('📝 Sonraki adımlar:');
console.log('  1. Geliştirme sunucusunu yeniden başlatın: npm run dev');
console.log('  2. Tarayıcıda http://localhost:3000/emlak adresine gidin');
console.log('  3. "Harita Görünümü" butonuna tıklayın');
console.log('');
console.log('⚠️  Not: API anahtarınızın güvenliği için:');
console.log('  - .env.local dosyası .gitignore\'da olduğundan emin olun');
console.log('  - Production\'da API anahtarını kısıtlayın');
console.log('  - GOOGLE_MAPS_API_KURULUM.md dosyasındaki güvenlik adımlarını takip edin');
