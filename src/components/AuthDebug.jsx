/**
 * components/AuthDebug.jsx
 *
 * Developer-only panel that shows which VITE_FIREBASE_* environment
 * variables are set. Rendered only when import.meta.env.DEV is true.
 * Helps diagnose "sign-in not working" issues without exposing secrets.
 */

const REQUIRED_VARS = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
];

export default function AuthDebug() {
  if (!import.meta.env.DEV) return null;

  const rows = REQUIRED_VARS.map(key => {
    const val = import.meta.env[key];
    const set = !!val && val !== 'your-api-key' && val.length > 4;
    return { key, set, hint: set ? `…${val.slice(-4)}` : 'MISSING' };
  });

  const allSet = rows.every(r => r.set);

  return (
    <div style={{
      position: 'fixed', bottom: 8, left: 8, zIndex: 9999,
      background: allSet ? '#E8F5E9' : '#FFEBEE',
      border: `2px solid ${allSet ? '#4CAF50' : '#E53935'}`,
      borderRadius: 10, padding: '8px 12px', fontSize: 11,
      fontFamily: 'monospace', maxWidth: 280, userSelect: 'text',
      boxShadow: '0 2px 8px rgba(0,0,0,.18)',
    }}>
      <strong>🔧 Firebase ENV {allSet ? '✅' : '❌'}</strong>
      <table style={{ marginTop: 4, borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          {rows.map(({ key, set, hint }) => (
            <tr key={key}>
              <td style={{ color: set ? '#2E7D32' : '#C62828', paddingRight: 6 }}>
                {set ? '✓' : '✗'}
              </td>
              <td style={{ color: '#333' }}>{key.replace('VITE_FIREBASE_', '')}</td>
              <td style={{ color: set ? '#555' : '#C62828', paddingLeft: 6 }}>
                {hint}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!allSet && (
        <p style={{ marginTop: 6, color: '#C62828' }}>
          Copy .env.example → .env.local and fill in your Firebase credentials.
        </p>
      )}
    </div>
  );
}
