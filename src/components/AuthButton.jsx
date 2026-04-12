/**
 * components/AuthButton.jsx
 * Google Sign-In / Sign-Out button.
 * Shows a friendly message when Firebase is not configured.
 * Surfaces auth errors to the user instead of swallowing them.
 */
import { useAuth }          from '../context/AuthContext.jsx';
import { signInWithGoogle, signOut } from '../firebase/authService.js';
import { useState }         from 'react';

/** Map Firebase error codes to readable messages. */
function friendlyError(code) {
  switch (code) {
    case 'auth/network-request-failed':  return 'No internet connection. Try again.';
    case 'auth/user-disabled':           return 'This account has been disabled.';
    case 'auth/account-exists-with-different-credential':
      return 'Account exists with a different sign-in method.';
    case 'auth/unauthorized-domain':
      return 'Sign-in not allowed on this domain. Check Firebase Console → Auth → Authorized domains.';
    default:
      return 'Sign-in failed. Check your Firebase config or try again.';
  }
}

export default function AuthButton() {
  const { user, loading, isConfigured } = useAuth();
  const [busy,  setBusy]  = useState(false);
  const [error, setError] = useState('');

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
    setError('');
    setBusy(true);
    try {
      if (user) await signOut();
      else      await signInWithGoogle();
    } catch (e) {
      console.warn('Auth error:', e.code, e.message);
      setError(friendlyError(e.code));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-btn-wrapper">
      <button
        className="auth-btn"
        onClick={handleClick}
        disabled={busy}
        aria-label={user ? `Signed in as ${user.displayName}. Click to sign out.` : 'Sign in with Google'}
      >
        {busy
          ? <span className="spinner" aria-label="Signing in…" />
          : user
            ? <><img src={user.photoURL} alt="" />{user.displayName?.split(' ')[0]}</>
            : <><span className="auth-icon">🔑</span>Sign In</>
        }
      </button>
      {error && (
        <div className="auth-error" role="alert" aria-live="assertive">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
