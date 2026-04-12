/**
 * components/AuthButton.jsx
 * Google Sign-In / Sign-Out button.
 * Shows a friendly message when Firebase is not configured.
 */
import { useAuth }          from '../context/AuthContext.jsx';
import { signInWithGoogle, signOut } from '../firebase/authService.js';
import { useState }         from 'react';

export default function AuthButton() {
  const { user, loading, isConfigured } = useAuth();
  const [busy, setBusy] = useState(false);

  if (loading) return null;

  if (!isConfigured) {
    return (
      <button className="auth-btn" title="Add Firebase config to enable cloud save" disabled>
        <span className="auth-icon">🔐</span>
        Sign In
      </button>
    );
  }

  async function handleClick() {
    if (busy) return;
    setBusy(true);
    try {
      if (user) await signOut();
      else      await signInWithGoogle();
    } catch (e) {
      console.warn('Auth error:', e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      className="auth-btn"
      onClick={handleClick}
      aria-label={user ? `Signed in as ${user.displayName}. Click to sign out.` : 'Sign in with Google'}
    >
      {user
        ? <><img src={user.photoURL} alt="" />{user.displayName?.split(' ')[0]}</>
        : <><span className="auth-icon">🔑</span>Sign In</>
      }
    </button>
  );
}
