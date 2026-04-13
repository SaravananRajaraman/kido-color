/**
 * components/Home.jsx — landing screen with 3 mode cards
 */
import { useApp, MODES } from '../context/AppContext.jsx';
import useAudio from '../hooks/useAudio.js';

export default function Home() {
  const { setMode } = useApp();
  const { playClick } = useAudio();

  return (
    <section className="home-hero mode-section" aria-label="Choose a mode">
      <div className="home-title">
        <h1>🎨 Kido Color</h1>
        <p>Tap a card to start!</p>
      </div>

      <div className="home-cards">
        <button
          className="home-card card-color"
          onClick={() => { playClick(); setMode(MODES.COLOR); }}
          aria-label="Coloring mode — colour A to Z pictures"
        >
          <span className="card-emoji">🖍️</span>
          <span className="card-title">Color</span>
          <span className="card-subtitle">A–Z Animals &amp; more</span>
        </button>

        <button
          className="home-card card-trace"
          onClick={() => { playClick(); setMode(MODES.TRACE); }}
          aria-label="Tracing mode — trace A to Z letters"
        >
          <span className="card-emoji">✏️</span>
          <span className="card-title">Trace</span>
          <span className="card-subtitle">A–Z Letters</span>
        </button>

        <button
          className="home-card card-draw"
          onClick={() => { playClick(); setMode(MODES.DRAW); }}
          aria-label="Free drawing mode"
        >
          <span className="card-emoji">🖌️</span>
          <span className="card-title">Draw</span>
          <span className="card-subtitle">Free canvas</span>
        </button>
      </div>
    </section>
  );
}
