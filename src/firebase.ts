// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import appletConfig from "../firebase-applet-config.json";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyB-DnNzQAUQ8_N3eJN0V6g0Y8BWlqBL5Qo",
  authDomain: "raavanaatec.firebaseapp.com",
  projectId: "raavanaatec",
  storageBucket: "raavanaatec.firebasestorage.app",
  messagingSenderId: "814250444039",
  appId: "1:814250444039:web:8c7372b04be5ce6c9cb1a2",
  measurementId: "G-GTPG4BGPP3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore with provisioned database ID
const databaseId = (import.meta.env.VITE_FIRESTORE_DATABASE_ID as string) || (appletConfig as any).firestoreDatabaseId || undefined;
export const db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Analytics safely
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      // Analytics fallback for environments without cookie/storage support
    });
}
