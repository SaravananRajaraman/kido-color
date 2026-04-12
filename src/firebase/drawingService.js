/**
 * firebase/drawingService.js
 *
 * Save / load / share drawings using Firebase Storage + Firestore.
 *
 * Each drawing is stored as:
 *   Storage:  users/{uid}/drawings/{docId}.png
 *   Firestore: users/{uid}/drawings/{docId}
 *     { name, mode, letter, style, createdAt, imageUrl, shareId }
 */
import {
  collection, addDoc, getDocs, doc, getDoc,
  setDoc, deleteDoc, query, orderBy, Timestamp,
} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { db, storage, isConfigured } from './config.js';

function userColl(uid) {
  return collection(db, 'users', uid, 'drawings');
}

/**
 * Save a canvas PNG as a new drawing record.
 * @param {string}  uid       – Firebase user UID
 * @param {string}  dataUrl   – canvas.toDataURL('image/png')
 * @param {object}  meta      – { name, mode, letter, style }
 * @returns {object}          – { id, imageUrl }
 */
export async function saveDrawing(uid, dataUrl, meta) {
  if (!isConfigured) throw new Error('Firebase not configured');

  // 1. Create Firestore doc to get an ID
  const docRef  = doc(userColl(uid));
  const shareId = docRef.id;

  // 2. Upload PNG to Storage
  const storRef = ref(storage, `users/${uid}/drawings/${shareId}.png`);
  await uploadString(storRef, dataUrl, 'data_url');
  const imageUrl = await getDownloadURL(storRef);

  // 3. Save metadata to Firestore
  await setDoc(docRef, {
    ...meta,
    imageUrl,
    shareId,
    createdAt: Timestamp.now(),
  });

  return { id: shareId, imageUrl };
}

/**
 * Load all drawings for a user (ordered newest-first).
 */
export async function loadDrawings(uid) {
  if (!isConfigured) return [];
  const q   = query(userColl(uid), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/**
 * Delete a drawing record (Firestore only – Storage file kept for share links).
 */
export async function deleteDrawing(uid, drawingId) {
  if (!isConfigured) return;
  await deleteDoc(doc(userColl(uid), drawingId));
}

/**
 * Get a drawing by shareId (for public share links, no auth required).
 * We store shared drawings in a top-level 'shared' collection.
 */
export async function getSharedDrawing(shareId) {
  if (!isConfigured) return null;
  const snap = await getDoc(doc(db, 'shared', shareId));
  return snap.exists() ? snap.data() : null;
}

/**
 * Publish a drawing to the public 'shared' collection.
 */
export async function shareDrawing(uid, drawingId) {
  if (!isConfigured) throw new Error('Firebase not configured');
  const snap = await getDoc(doc(userColl(uid), drawingId));
  if (!snap.exists()) throw new Error('Drawing not found');
  const data = snap.data();
  await setDoc(doc(db, 'shared', drawingId), {
    ...data,
    uid,
    sharedAt: Timestamp.now(),
  });
  return `${window.location.origin}/kido-color/#/share/${drawingId}`;
}
