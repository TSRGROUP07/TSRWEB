// Firestore Helper Functions
// Vercel'de dosya sistemi read-only olduğu için tüm veriler Firestore'da saklanır

import path from "path";
import fs from "fs/promises";

let adminDb: any = null;

// Firebase Admin'i başlat ve Firestore instance'ını döndür
async function getFirestore() {
  if (adminDb) {
    return adminDb;
  }

  try {
    // @ts-ignore - firebase-admin server-side only
    const admin = require("firebase-admin");

    // Firebase'i başlat (eğer başlatılmamışsa)
    if (!admin.apps || admin.apps.length === 0) {
      const firebaseConfig = {
        projectId: "tsr-web-112e2",
      };

      let serviceAccount: any = null;

      // 1. Önce Environment Variable kontrol et
      if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        try {
          serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        } catch (e) {
          console.warn("⚠️ Env var parse hatası");
        }
      }

      // 2. Env var yoksa dosyaya bak (local development için)
      if (!serviceAccount) {
        try {
          const serviceAccountPath = path.join(process.cwd(), "service-account.json");
          console.log(`🔍 Service account dosyası aranıyor: ${serviceAccountPath}`);
          const fileContent = await fs.readFile(serviceAccountPath, "utf-8");
          serviceAccount = JSON.parse(fileContent);
          console.log(`✅ Service account dosyası bulundu ve okundu`);
        } catch (e: any) {
          console.error(`❌ Service account dosyası okunamadı:`, e.message);
          // Dosya yoksa devam et
        }
      }

      if (serviceAccount) {
        if (serviceAccount.project_id !== firebaseConfig.projectId) {
          console.log(`⚠️ Project ID uyuşmazlığı: Config=${firebaseConfig.projectId}, ServiceAccount=${serviceAccount.project_id}`);
          firebaseConfig.projectId = serviceAccount.project_id;
        }
        console.log(`✅ Firebase başlatılıyor: Project ID = ${firebaseConfig.projectId}`);
        try {
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            projectId: firebaseConfig.projectId,
          });
          console.log(`✅ Firebase başlatıldı (Service Account ile)`);
        } catch (initError: any) {
          console.error(`❌ Firebase başlatma hatası:`, initError.message);
          throw initError;
        }
      } else {
        const errorMsg = `❌ Service account bulunamadı! Firestore işlemleri çalışmayacak!`;
        console.error(errorMsg);
        console.error(`   Service account dosyası: service-account.json`);
        console.error(`   Veya FIREBASE_SERVICE_ACCOUNT_KEY environment değişkenini kullanın`);
        throw new Error(errorMsg);
      }
    }

    adminDb = admin.firestore();
    return adminDb;
  } catch (error: any) {
    console.error("Firestore initialization error:", error);
    throw new Error("Firestore başlatılamadı: " + error.message);
  }
}

// Collection'dan tüm dokümanları getir
export async function getCollection(collectionName: string) {
  try {
    console.log(`📖 Firestore'dan okunuyor: ${collectionName}`);
    const db = await getFirestore();

    if (!db) {
      throw new Error("Firestore instance bulunamadı");
    }

    const collectionRef = db.collection(collectionName);
    const snapshot = await collectionRef.get();

    console.log(`✅ ${collectionName} collection'ından ${snapshot.docs.length} doküman okundu`);

    return snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error: any) {
    // NOT_FOUND (code 5) hatası normal - koleksiyon henüz oluşturulmamış
    if (error.code === 5 || error.code === '5' || error.message?.includes('NOT_FOUND')) {
      console.log(`ℹ️ ${collectionName} koleksiyonu henüz oluşturulmamış (normal durum)`);
      return [];
    }

    // Diğer hatalar için detaylı log
    console.error(`❌ Error getting collection ${collectionName}:`, {
      code: error.code,
      message: error.message,
      details: error.details || error.toString(),
      stack: error.stack?.substring(0, 300),
    });

    // Boş array döndür ki uygulama çökmesin
    return [];
  }
}

// Collection'a yeni doküman ekle
export async function addToCollection(collectionName: string, data: any) {
  // Veriyi hazırla - Timestamp objelerini kaldır, sadece string kullan
  const docData: any = {
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    const db = await getFirestore();

    // Firestore bağlantısını test et
    if (!db) {
      throw new Error("Firestore instance bulunamadı");
    }

    // db kontrolü
    if (typeof db === 'undefined' || db === null) {
      throw new Error("Firestore instance tanımsız");
    }

    // Nested object'leri düzleştir (Firestore için)
    Object.keys(docData).forEach(key => {
      // null, undefined değerleri atla
      if (docData[key] === null || docData[key] === undefined) {
        delete docData[key];
        return;
      }

      if (docData[key] && typeof docData[key] === 'object' && !Array.isArray(docData[key]) && !(docData[key] instanceof Date)) {
        // Object'leri koru ama Date'leri string'e çevir
        if (docData[key].lat !== undefined && docData[key].lng !== undefined) {
          // coordinates objesi - koru
        } else {
          // Diğer objeleri stringify et
          docData[key] = JSON.stringify(docData[key]);
        }
      }
    });

    console.log(`📝 Firestore'a ekleniyor: ${collectionName}`, {
      title: data.title || 'İsimsiz',
      hasImage: !!data.image,
      imageCount: data.images?.length || 0,
    });

    const collectionRef = db.collection(collectionName);
    const docRef = await collectionRef.add(docData);

    console.log(`✅ Firestore'a eklendi: ${docRef.id}`);
    return { id: docRef.id, ...data };
  } catch (error: any) {
    console.error(`❌ Error adding to collection ${collectionName}:`, {
      code: error.code,
      message: error.message,
      details: error.details || error.toString(),
      stack: error.stack?.substring(0, 300),
    });

    // NOT_FOUND hatası - collection henüz oluşturulmamış, ilk kayıt oluşturulurken normal
    if (error.code === 5 || error.code === '5' || error.message?.includes('NOT_FOUND')) {
      console.log(`ℹ️ Firestore collection henüz oluşturulmamış, ilk kayıt oluşturuluyor...`);

      // İlk kayıt için tekrar dene
      try {
        const db = await getFirestore();
        const collectionRef = db.collection(collectionName);
        const docRef = await collectionRef.add(docData);
        console.log(`✅ İlk kayıt başarıyla oluşturuldu: ${docRef.id}`);
        return { id: docRef.id, ...data };
      } catch (retryError: any) {
        console.error(`❌ İlk kayıt oluşturma hatası:`, retryError);
        const detailedError = `Firestore bağlantı hatası

Olası nedenler:
1. Service account yanlış yapılandırılmış
2. Firestore projesi yanlış
3. Firestore rules yazmayı engelliyor
4. Network/bağlantı sorunu

Çözüm:
- service-account.json dosyasını kontrol edin
- Firebase Console'da Firestore'un aktif olduğundan emin olun
- Firestore rules'u kontrol edin

Orijinal hata: ${retryError.message || error.message || 'Bilinmeyen'}`;
        throw new Error(detailedError);
      }
    }

    throw error;
  }
}

// Collection'dan doküman güncelle
export async function updateInCollection(collectionName: string, docId: string, data: any) {
  try {
    const db = await getFirestore();
    await db.collection(collectionName).doc(docId).update({
      ...data,
      updatedAt: new Date().toISOString(),
    });
    return { id: docId, ...data };
  } catch (error: any) {
    console.error(`Error updating collection ${collectionName}:`, error);
    throw error;
  }
}

// Collection'dan doküman sil
export async function deleteFromCollection(collectionName: string, docId: string) {
  try {
    console.log(`🗑️ Firestore'dan siliniyor: ${collectionName}/${docId}`);
    
    const db = await getFirestore();
    
    if (!db) {
      throw new Error("Firestore instance bulunamadı");
    }

    // Önce dokümanın var olup olmadığını kontrol et (opsiyonel - idempotent için)
    const docRef = db.collection(collectionName).doc(docId);
    const docSnapshot = await docRef.get();
    
    if (!docSnapshot.exists) {
      console.warn(`⚠️ Doküman zaten yok: ${collectionName}/${docId}`);
      // Idempotent - zaten yoksa başarılı say
      return true;
    }

    // Dokümanı sil
    await docRef.delete();
    console.log(`✅ Doküman başarıyla silindi: ${collectionName}/${docId}`);
    
    return true;
  } catch (error: any) {
    console.error(`❌ Error deleting from collection ${collectionName}/${docId}:`, {
      code: error.code,
      message: error.message,
      details: error.details || error.toString(),
      stack: error.stack?.substring(0, 300),
    });
    
    // NOT_FOUND hatası - doküman zaten yok, idempotent için başarılı say
    if (error.code === 5 || error.code === '5' || error.message?.includes('NOT_FOUND')) {
      console.log(`ℹ️ Doküman zaten yok (idempotent): ${collectionName}/${docId}`);
      return true;
    }
    
    throw error;
  }
}

// Collection'dan ID'ye göre doküman getir
export async function getById(collectionName: string, docId: string) {
  try {
    console.log(`🔍 Firestore'dan doküman aranıyor: ${collectionName}/${docId}`);
    const db = await getFirestore();
    
    if (!db) {
      throw new Error("Firestore instance bulunamadı");
    }

    const docRef = db.collection(collectionName).doc(docId);
    const doc = await docRef.get();
    
    if (doc.exists) {
      const data = { id: doc.id, ...doc.data() };
      console.log(`✅ Doküman bulundu: ${collectionName}/${docId}`, { 
        title: data.title || 'İsimsiz',
        hasId: !!data.id 
      });
      return data;
    }
    
    console.warn(`⚠️ Doküman bulunamadı: ${collectionName}/${docId}`);
    
    // Alternatif: Tüm collection'ı tarayarak ID'yi ara (fallback)
    console.log(`🔍 Alternatif arama deneniyor: ${collectionName} collection'ında ID aranıyor...`);
    const snapshot = await db.collection(collectionName).get();
    const foundDoc = snapshot.docs.find((d: any) => d.id === docId);
    
    if (foundDoc) {
      const data = { id: foundDoc.id, ...foundDoc.data() };
      console.log(`✅ Doküman alternatif yöntemle bulundu: ${collectionName}/${docId}`);
      return data;
    }
    
    console.warn(`⚠️ Doküman hiçbir yöntemle bulunamadı: ${collectionName}/${docId}`);
    console.log(`ℹ️ Collection'da toplam ${snapshot.docs.length} doküman var`);
    if (snapshot.docs.length > 0) {
      console.log(`ℹ️ İlk 3 doküman ID'si:`, snapshot.docs.slice(0, 3).map((d: any) => d.id));
    }
    
    return null;
  } catch (error: any) {
    console.error(`❌ Error getting document from ${collectionName}/${docId}:`, {
      code: error.code,
      message: error.message,
      details: error.details || error.toString(),
    });
    return null;
  }
}

// Collection'daki tüm dokümanları güncelle (batch update)
export async function saveCollection(collectionName: string, items: any[]) {
  try {
    const db = await getFirestore();
    const batch = db.batch();

    // Önce mevcut tüm dokümanları sil
    const snapshot = await db.collection(collectionName).get();
    snapshot.docs.forEach((doc: any) => {
      batch.delete(doc.ref);
    });

    // Yeni dokümanları ekle
    items.forEach((item) => {
      const docRef = db.collection(collectionName).doc(item.id?.toString() || db.collection(collectionName).doc().id);
      batch.set(docRef, {
        ...item,
        updatedAt: new Date().toISOString(),
      });
    });

    await batch.commit();
    return items;
  } catch (error: any) {
    console.error(`Error saving collection ${collectionName}:`, error);
    throw error;
  }
}
