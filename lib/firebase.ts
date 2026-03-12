// Client-side Firebase
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Firebase Configuration - Doğrudan config değerleri
const firebaseConfig = {
  apiKey: "AIzaSyBQN2ph9kHn7QFNHvXuu6sviYOy0LEP85E",
  authDomain: "tsr-web-112e2.firebaseapp.com",
  projectId: "tsr-web-112e2",
  storageBucket: "tsr-web-112e2.firebasestorage.app",
  messagingSenderId: "339014148959",
  appId: "1:339014148959:web:4f34270d3de383212fccea",
};

// Config her zaman geçerli (hardcoded değerler)
const isConfigValid = true;

// Client-side Firebase
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;

if (typeof window !== "undefined") {
  // Client-side
  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
      // console.log("Firebase initialized successfully");
    } else {
      app = getApps()[0];
    }
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

export { auth, db, storage };
export default app;
