/**
 * context/AuthContext.jsx
 *
 * Firebase Google auth state. Works gracefully when Firebase is not
 * configured (isConfigured === false) by keeping user === null.
 * Handles both popup and redirect sign-in flows.
 */
import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, consumeRedirectResult } from '../firebase/authService.js';
import { isConfigured }         from '../firebase/config.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Consume any pending redirect sign-in result (mobile fallback)
    consumeRedirectResult().catch(() => {});

    const unsub = onAuthStateChanged(u => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isConfigured }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
