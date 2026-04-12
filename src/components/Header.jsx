/**
 * components/Header.jsx
 */
import { useApp, MODES }  from '../context/AppContext.jsx';
import AuthButton          from './AuthButton.jsx';

const TABS = [
  { id: MODES.HOME,  icon:'🏠', label:'Home'  },
  { id: MODES.COLOR, icon:'🖍️', label:'Color' },
  { id: MODES.TRACE, icon:'✏️', label:'Trace' },
  { id: MODES.DRAW,  icon:'🖌️', label:'Draw'  },
];

export default function Header() {
  const { mode, setMode } = useApp();

  return (
    <header className="app-header" role="banner">
      <button
        className="logo-btn"
        onClick={() => setMode(MODES.HOME)}
        aria-label="Go to home"
      >
        <span className="logo-emoji">🎨</span>
        <span className="logo-text">Kido Color</span>
      </button>

      <nav className="nav-tabs" aria-label="Main navigation">
        {TABS.filter(t => t.id !== MODES.HOME).map(t => (
          <button
            key={t.id}
            className={`nav-btn${mode === t.id ? ' active' : ''}`}
            onClick={() => setMode(t.id)}
            aria-label={t.label}
            aria-current={mode === t.id ? 'page' : undefined}
          >
            <span className="nav-icon">{t.icon}</span>
            <span className="nav-label">{t.label}</span>
          </button>
        ))}
      </nav>

      <div className="header-right">
        <AuthButton />
      </div>
    </header>
  );
}
