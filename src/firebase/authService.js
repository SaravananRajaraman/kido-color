/**
 * firebase/authService.js — Google Sign-In helpers
 */
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as fbSignOut,
  onAuthStateChanged as fbOnAuthStateChanged,
} from 'firebase/auth';
import { auth, isConfigured } from './config.js';

const provider = isConfigured ? new GoogleAuthProvider() : null;

/**
 * Sign in with Google. Uses popup first; falls back to redirect on
 * browsers that block popups (e.g. mobile Safari).
 */
export async function signInWithGoogle() {
  if (!isConfigured || !auth) throw new Error('Firebase not configured');
  try {
    return await signInWithPopup(auth, provider);
  } catch (err) {
    // Popup blocked or unsupported — fall back to redirect flow
    if (
      err.code === 'auth/popup-blocked' ||
      err.code === 'auth/popup-closed-by-user' ||
      err.code === 'auth/cancelled-popup-request'
    ) {
      await signInWithRedirect(auth, provider);
      return null; // page will reload; result handled in AuthProvider
    }
    throw err;
  }
}

/**
 * Consume a pending redirect sign-in result (call once on app load).
 * Returns the UserCredential or null if no redirect was pending.
 */
export async function consumeRedirectResult() {
  if (!isConfigured || !auth) return null;
  try {
    return await getRedirectResult(auth);
  } catch {
    return null;
  }
}

export async function signOut() {
  if (!isConfigured || !auth) return;
  return fbSignOut(auth);
}

export function onAuthStateChanged(callback) {
  if (!isConfigured || !auth) { callback(null); return () => {}; }
  return fbOnAuthStateChanged(auth, callback);
}
