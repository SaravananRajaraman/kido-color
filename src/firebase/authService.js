/**
 * firebase/authService.js — Google Sign-In helpers
 */
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged as fbOnAuthStateChanged,
} from 'firebase/auth';
import { auth, isConfigured } from './config.js';

const provider = isConfigured ? new GoogleAuthProvider() : null;

export async function signInWithGoogle() {
  if (!isConfigured || !auth) throw new Error('Firebase not configured');
  return signInWithPopup(auth, provider);
}

export async function signOut() {
  if (!isConfigured || !auth) return;
  return fbSignOut(auth);
}

export function onAuthStateChanged(callback) {
  if (!isConfigured || !auth) { callback(null); return () => {}; }
  return fbOnAuthStateChanged(auth, callback);
}
