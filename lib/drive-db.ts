import { join } from "path";
import { readFileSync } from "fs";
import {
    createDriveClientFromServiceAccount,
    downloadDriveFile,
    findFileByName,
    uploadToDrive,
    updateDriveFile,
    makeFilePublic
} from "@/lib/google-drive";

// Veritabanı dosyasının adı
const DB_FILE_NAME = "tsr-web-database.json";
// Paylaşılan Klasör ID (Service Account Quota Fix)
// ÖNEMLİ: Bu klasör bir Shared Drive (Paylaşılan Sürücü) içinde olmalı!
// Environment variable'dan al, yoksa default kullan
const SHARED_FOLDER_ID = process.env.GOOGLE_DRIVE_SHARED_FOLDER_ID || "1h_vSOwUit6Ig_JMg49Tea8zLr6LL8L8v";

// In-memory cache (basit performans için)
// Next.js serverless fonksiyonlarında her tetiklemede sıfırlanabilir, ama container reuse durumunda işe yarar
let dbCache: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5000; // 5 saniye cache (ardışık istekler için)

// Service Account ve Drive Client hazırla
function getDriveClient() {
    try {
        // Environment variable öncelikli
        if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
            // Google Drive için scope'ları ayarla (eğer service account key doğruysa çalışır)
            // Ancak genellikle google-drive-service-account.json kullanıyoruz
            // Şimdilik standart dosyayı kullanalım
        }

        // Dosyadan oku
        const serviceAccountPath = join(process.cwd(), "google-drive-service-account.json");
        const serviceAccountFile = readFileSync(serviceAccountPath, "utf8");
        const serviceAccount = JSON.parse(serviceAccountFile);
        return createDriveClientFromServiceAccount(serviceAccount);
    } catch (error) {
        console.error("Drive Client oluşturulamadı:", error);
        throw new Error("Veritabanı bağlantısı kurulamadı (Service Account hatası)");
    }
}

// Veritabanını (JSON dosyasını) getir
async function getDatabase() {
    const now = Date.now();
    if (dbCache && (now - lastFetchTime < CACHE_DURATION)) {
        return dbCache;
    }

    const client = getDriveClient();

    // Dosyayı ara
    let file = await findFileByName(client, DB_FILE_NAME, SHARED_FOLDER_ID);

    // PAYLAŞILMIŞ KLASÖR ID'Sİ (Global tanımlandı)
    // const SHARED_FOLDER_ID = "1h_vSOwUit6Ig_JMg49Tea8zLr6LL8L8v";

    if (!file) {
        console.log("ℹ️ Veritabanı dosyası bulunamadı, yeni oluşturuluyor...");
        // Dosya yoksa boş bir veritabanı oluştur
        const initialDb = { properties: [], blogs: [], settings: {} };
        const buffer = Buffer.from(JSON.stringify(initialDb, null, 2));

        // Shared Folder içine oluşturuyoruz!
        const newFile = await uploadToDrive(client, buffer, DB_FILE_NAME, "application/json", SHARED_FOLDER_ID);
        // Dosyayı public yapmaya gerek yok, backend okuyacak. Ama yedekleme için link olsun derseniz yapabilirsiniz.

        dbCache = initialDb;
        lastFetchTime = now;
        return initialDb;
    }

    // Dosyayı indir ve parse et
    console.log(`📥 Veritabanı indiriliyor (${file.id})...`);
    const buffer = await downloadDriveFile(client, file.id);
    const jsonContent = buffer.toString("utf-8");

    try {
        dbCache = JSON.parse(jsonContent);
        lastFetchTime = now;
        return dbCache;
    } catch (parseError) {
        console.error("Veritabanı JSON parse hatası:", parseError);
        // Bozuk dosya durumunda boş dön veya yedek al
        return { properties: [], blogs: [], settings: {} };
    }
}

// Veritabanını kaydet
async function saveDatabase(data: any) {
    const client = getDriveClient();

    // Dosyayı ara (ID lazım)
    let file = await findFileByName(client, DB_FILE_NAME, SHARED_FOLDER_ID);

    const buffer = Buffer.from(JSON.stringify(data, null, 2));

    // PAYLAŞILMIŞ KLASÖR ID'Sİ (Global)
    // const SHARED_FOLDER_ID = "1h_vSOwUit6Ig_JMg49Tea8zLr6LL8L8v";

    if (file) {
        console.log(`💾 Veritabanı güncelleniyor (${file.id})...`);
        await updateDriveFile(client, file.id, buffer);
    } else {
        console.log(`💾 Yeni veritabanı dosyası oluşturuluyor...`);
        // Shared Folder içine oluşturuyoruz!
        await uploadToDrive(client, buffer, DB_FILE_NAME, "application/json", SHARED_FOLDER_ID);
    }

    // Cache güncelle
    dbCache = data;
    lastFetchTime = Date.now();

    return true;
}

// --- Firestore-like Interface ---

export async function getCollection(collectionName: string) {
    try {
        const db = await getDatabase();
        return db[collectionName] || [];
    } catch (error) {
        console.error(`getCollection hatası (${collectionName}):`, error);
        return [];
    }
}

export async function addToCollection(collectionName: string, item: any) {
    try {
        const db = await getDatabase();

        if (!db[collectionName]) {
            db[collectionName] = [];
        }

        // ID ekle
        const newItem = {
            ...item,
            id: item.id || Math.random().toString(36).substr(2, 9),
            createdAt: item.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        db[collectionName].push(newItem);

        // Kaydet
        await saveDatabase(db);

        return newItem;
    } catch (error: any) {
        console.error(`addToCollection hatası (${collectionName}):`, error);
        throw new Error(`Kayıt eklenemedi: ${error.message}`);
    }
}

export async function updateInCollection(collectionName: string, docId: string, data: any) {
    try {
        const db = await getDatabase();
        const list = db[collectionName] || [];

        const index = list.findIndex((item: any) => item.id === docId);

        if (index === -1) {
            throw new Error("Kayıt bulunamadı");
        }

        const updatedItem = {
            ...list[index],
            ...data,
            updatedAt: new Date().toISOString()
        };

        list[index] = updatedItem;
        db[collectionName] = list;

        await saveDatabase(db);

        return updatedItem;
    } catch (error: any) {
        console.error(`updateInCollection hatası (${collectionName}/${docId}):`, error);
        throw error;
    }
}

export async function deleteFromCollection(collectionName: string, docId: string) {
    try {
        const db = await getDatabase();
        const list = db[collectionName] || [];

        const newList = list.filter((item: any) => item.id !== docId);

        if (list.length === newList.length) {
            // Değişiklik yok (zaten silinmiş veya yok)
            return true;
        }

        db[collectionName] = newList;

        await saveDatabase(db);

        return true;
    } catch (error) {
        console.error(`deleteFromCollection hatası (${collectionName}/${docId}):`, error);
        throw error;
    }
}

export async function getById(collectionName: string, docId: string) {
    try {
        const list = await getCollection(collectionName);
        return list.find((item: any) => item.id === docId) || null;
    } catch (error) {
        return null;
    }
}
