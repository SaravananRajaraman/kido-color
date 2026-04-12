/**
 * App.jsx — root component
 */
import { useApp, MODES } from './context/AppContext.jsx';
import Header            from './components/Header.jsx';
import Home              from './components/Home.jsx';
import ColoringMode      from './components/ColoringMode.jsx';
import TracingMode       from './components/TracingMode.jsx';
import FreeDrawMode      from './components/FreeDrawMode.jsx';
import './styles/main.css';

function ModeRouter() {
  const { mode } = useApp();
  switch (mode) {
    case MODES.COLOR: return <ColoringMode />;
    case MODES.TRACE: return <TracingMode  />;
    case MODES.DRAW:  return <FreeDrawMode />;
    default:          return <Home         />;
  }
}

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <ModeRouter />
      </main>
    </div>
  );
}
