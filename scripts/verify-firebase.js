const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const logFile = path.join(process.cwd(), 'firebase-test.log');
fs.writeFileSync(logFile, ''); // Clear file

function log(msg) {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
}

async function testFirebase() {
    log('Testing Firebase connection...');
    try {
        const serviceAccountPath = path.join(process.cwd(), 'service-account.json');
        log('Reading service account from: ' + serviceAccountPath);

        if (!fs.existsSync(serviceAccountPath)) {
            throw new Error('service-account.json not found');
        }

        const content = fs.readFileSync(serviceAccountPath, 'utf8');
        const serviceAccount = JSON.parse(content);
        log('Service account parsed successfully. Project ID: ' + serviceAccount.project_id);

        if (admin.apps.length === 0) {
            log('Initializing Firebase Admin...');
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                projectId: serviceAccount.project_id,
            });
            log('Firebase initialized.');
        }

        // Test Firestore
        log('Testing Firestore...');
        const db = admin.firestore();
        try {
            const collections = await db.listCollections();
            log('✅ Firestore connected. Collections: ' + collections.map(c => c.id).join(', '));
        } catch (e) {
            log('❌ Firestore error: ' + e.message);
        }

        // Test Storage
        log('Testing Storage...');
        const bucketName = `${serviceAccount.project_id}.firebasestorage.app`;
        log(`Checking bucket: ${bucketName}`);
        const bucket = admin.storage().bucket(bucketName);

        try {
            const [exists] = await bucket.exists();
            log(`✅ Bucket ${bucketName} exists: ${exists}`);
        } catch (e) {
            log('❌ Storage bucket check error: ' + e.message);

            log('Trying alternative bucket domain...');
            try {
                const altBucket = `${serviceAccount.project_id}.appspot.com`;
                const b = admin.storage().bucket(altBucket);
                const [existsAlt] = await b.exists();
                log(`✅ Alternative bucket ${altBucket} exists: ${existsAlt}`);
            } catch (e2) {
                log('❌ Alternative bucket error: ' + e2.message);
            }
        }

    } catch (error) {
        log('❌ FATAL ERROR: ' + error.message);
        if (error.stack) log(error.stack);
    }
}

testFirebase();
