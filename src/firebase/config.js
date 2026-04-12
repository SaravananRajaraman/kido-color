/**
 * firebase/config.js
 *
 * Initialize Firebase app.
 * Credentials come from Vite environment variables (VITE_FIREBASE_*).
 * Copy .env.example to .env.local and fill in your own values.
 */
import { initializeApp } from 'firebase/app';
import { getAuth }        from 'firebase/auth';
import { getFirestore }   from 'firebase/firestore';
import { getStorage }     from 'firebase/storage';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// Only initialize if credentials are present (allows offline/demo mode)
const isConfigured =
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== 'your-api-key' &&
  firebaseConfig.apiKey.length > 10;

let app      = null;
let auth     = null;
let db       = null;
let storage  = null;

if (isConfigured) {
  try {
    app     = initializeApp(firebaseConfig);
    auth    = getAuth(app);
    db      = getFirestore(app);
    storage = getStorage(app);
  } catch (e) {
    console.warn('Firebase init failed:', e.message);
  }
}

export { app, auth, db, storage, isConfigured };
