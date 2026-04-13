/**
 * components/Home.jsx — landing screen with 3 mode cards
 */
import { useApp, MODES } from '../context/AppContext.jsx';

export default function Home() {
  const { setMode, completedCount, resetProgress } = useApp();

  const traceCount = completedCount('trace');
  const colorCount = completedCount('color');

  return (
    <section className="home-hero mode-section" aria-label="Choose a mode">
      <div className="home-title">
        <h1>🎨 Kido Color</h1>
        <p>Tap a card to start!</p>
      </div>

      <div className="home-cards">
        <button
          className="home-card card-color"
          onClick={() => setMode(MODES.COLOR)}
          aria-label="Coloring mode — colour A to Z pictures"
        >
          <span className="card-emoji">🖍️</span>
          <span className="card-title">Color</span>
          <span className="card-subtitle">A–Z Animals &amp; more</span>
          {colorCount > 0 && (
            <span className="card-progress" aria-label={`${colorCount} letters colored`}>
              ⭐ {colorCount}/26
            </span>
          )}
        </button>

        <button
          className="home-card card-trace"
          onClick={() => setMode(MODES.TRACE)}
          aria-label="Tracing mode — trace A to Z letters"
        >
          <span className="card-emoji">✏️</span>
          <span className="card-title">Trace</span>
          <span className="card-subtitle">A–Z Letters</span>
          {traceCount > 0 && (
            <span className="card-progress" aria-label={`${traceCount} letters traced`}>
              ⭐ {traceCount}/26
            </span>
          )}
        </button>

        <button
          className="home-card card-draw"
          onClick={() => setMode(MODES.DRAW)}
          aria-label="Free drawing mode"
        >
          <span className="card-emoji">🖌️</span>
          <span className="card-title">Draw</span>
          <span className="card-subtitle">Free canvas</span>
        </button>
      </div>

      {(traceCount > 0 || colorCount > 0) && (
        <button
          className="reset-progress-btn"
          onClick={() => resetProgress()}
          aria-label="Reset all progress"
        >
          🔄 Reset Progress
        </button>
      )}
    </section>
  );
}
