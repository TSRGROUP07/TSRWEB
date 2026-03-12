// Firestore'dan tüm properties'i silen script
// Kullanım: node scripts/delete-all-properties.js

const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs").promises;

async function deleteAllProperties() {
  try {
    // Firebase Admin'i başlat
    let serviceAccount = null;

    // 1. Environment variable'dan oku
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      try {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      } catch (e) {
        console.warn("⚠️ Env var parse hatası");
      }
    }

    // 2. Dosyadan oku
    if (!serviceAccount) {
      try {
        const serviceAccountPath = path.join(process.cwd(), "service-account.json");
        const fileContent = await fs.readFile(serviceAccountPath, "utf-8");
        serviceAccount = JSON.parse(fileContent);
      } catch (e) {
        console.error("❌ Service account dosyası bulunamadı");
        process.exit(1);
      }
    }

    // Firebase'i başlat
    if (!admin.apps || admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: "tsr-web-112e2",
      });
    }

    const db = admin.firestore();
    const collectionRef = db.collection("properties");

    // Tüm dokümanları getir
    console.log("📋 Properties collection'ından tüm dokümanlar getiriliyor...");
    const snapshot = await collectionRef.get();

    if (snapshot.empty) {
      console.log("✅ Collection zaten boş!");
      process.exit(0);
    }

    console.log(`📊 Toplam ${snapshot.size} ilan bulundu`);

    // Tüm dokümanları sil (batch işlemi)
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      console.log(`🗑️  Siliniyor: ${doc.id} - ${doc.data().title || "Başlıksız"}`);
      batch.delete(doc.ref);
    });

    // Batch'i commit et
    await batch.commit();
    console.log(`✅ Tüm ${snapshot.size} ilan başarıyla silindi!`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Hata:", error);
    process.exit(1);
  }
}

// Script'i çalıştır
deleteAllProperties();
