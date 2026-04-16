/**
 * components/TracingMode.jsx
 *
 * A–Z letter tracing.
 * Three canvas layers (bottom to top):
 *   1. bgCanvasRef   – lined paper background (static)
 *   2. drawCanvasRef – user's blue pencil strokes (receives pointer events)
 *   3. guideCanvasRef – semi-transparent dotted letter overlay (top, pointer-events:none)
 *
 * The guide sits ON TOP of the user's drawing so there's no double-line effect.
 * Coverage detection triggers completion when the kid has traced ~65%.
 *
 * Guide letter uses "Fredoka One" (loaded via Google Fonts in index.html).
 */
import { useRef, useEffect, useCallback, useState } from 'react';
import { useApp }     from '../context/AppContext.jsx';
import { useDrawing } from '../hooks/useDrawing.js';
import ActionBar      from './ActionBar.jsx';
import SaveDialog     from './SaveDialog.jsx';
import Confetti       from './Confetti.jsx';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Font stack: Fredoka One (Google Fonts) → Arial Rounded MT Bold → sans-serif
const GUIDE_FONT = '"Fredoka One","Arial Rounded MT Bold",Arial,sans-serif';

// Tracing colour: always blue
const TRACE_COLOR = '#2979FF';
const TRACE_BRUSH = 12;   // thick enough to visibly cover the guide

// Minimum fraction of guide pixels that must be covered to trigger completion.
const COVERAGE_THRESHOLD = 0.65;

export default function TracingMode() {
  const { letter, setLetter, markComplete, isCompleted } = useApp();

  const bgCanvasRef    = useRef(null);   // lined paper background
  const drawCanvasRef  = useRef(null);   // user strokes (middle)
  const guideCanvasRef = useRef(null);   // transparent letter guide (top)
  const containerRef   = useRef(null);

  const [celebrate, setCelebrate] = useState(false);
  const [showSave,  setShowSave]  = useState(false);

  const { undo, redo } = useDrawing({
    canvasRef: drawCanvasRef,
    tool:      'pencil',
    color:     TRACE_COLOR,
    brushSize: TRACE_BRUSH,
    enabled:   true,
  });

  /* ── draw paper background ───────────────────────────── */
  const drawBg = useCallback(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas || !canvas.width) return;
    const cx = canvas.getContext('2d');
    const { width: w, height: h } = canvas;

    cx.fillStyle = '#FFFDE7';
    cx.fillRect(0, 0, w, h);
    cx.strokeStyle = '#C8E6C9';
    cx.lineWidth = 1.2;
    for (let y = 40; y < h; y += 38) {
      cx.beginPath(); cx.moveTo(0, y); cx.lineTo(w, y); cx.stroke();
    }
    cx.strokeStyle = '#FFCDD2';
    cx.lineWidth = 2.5;
    cx.beginPath(); cx.moveTo(60, 0); cx.lineTo(60, h); cx.stroke();
  }, []);

  /* ── draw transparent guide letter on top canvas ── */
  const drawGuide = useCallback(() => {
    const canvas = guideCanvasRef.current;
    if (!canvas || !canvas.width) return;
    const cx = canvas.getContext('2d');
    const { width: w, height: h } = canvas;

    // Transparent background — user strokes on drawCanvas show through
    cx.clearRect(0, 0, w, h);

    const fs  = Math.min(w * 0.68, h * 0.65, 340);
    const cx2 = w / 2;
    const cy2 = h / 2 + fs * 0.06;

    cx.save();
    cx.globalAlpha  = 0.35;
    cx.font         = `900 ${fs}px ${GUIDE_FONT}`;
    cx.textAlign    = 'center';
    cx.textBaseline = 'middle';
    cx.setLineDash([18, 18]);
    cx.strokeStyle  = '#37474F';
    cx.lineWidth    = fs * 0.07;
    cx.lineJoin     = 'round';
    cx.lineCap      = 'round';
    cx.strokeText(letter, cx2, cy2);
    cx.setLineDash([]);
    cx.globalAlpha  = 1;
    cx.restore();

    // label (slightly transparent)
    cx.save();
    cx.globalAlpha = 0.55;
    cx.font        = `bold 20px ${GUIDE_FONT}`;
    cx.fillStyle   = '#90A4AE';
    cx.textAlign   = 'center';
    cx.fillText(`Trace the letter ${letter}`, w / 2, h - 14);
    cx.restore();
  }, [letter]);

  /* ── resize all three canvases ───────────────────── */
  useEffect(() => {
    function resize() {
      const c = containerRef.current;
      if (!c) return;
      const { width, height } = c.getBoundingClientRect();
      for (const ref of [bgCanvasRef, drawCanvasRef, guideCanvasRef]) {
        if (!ref.current) continue;
        ref.current.width  = Math.round(width);
        ref.current.height = Math.round(height);
      }
      drawBg();
      drawGuide();
    }
    const ro = new ResizeObserver(resize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [letter, drawBg, drawGuide]);

  useEffect(() => { drawBg();    }, [drawBg]);
  useEffect(() => { drawGuide(); }, [drawGuide]);

  /* ── reset draw layer + celebration ─────────────────── */
  function resetDrawLayer() {
    const c = drawCanvasRef.current;
    if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height);
    setCelebrate(false);
  }

  /* ── coverage check ──────────────────────────────── */
  function checkCoverage() {
    const guide = guideCanvasRef.current;
    const draw  = drawCanvasRef.current;
    if (!guide || !draw) return;

    const guideData = guide.getContext('2d').getImageData(0, 0, guide.width, guide.height).data;
    const drawData  = draw.getContext('2d').getImageData(0, 0, draw.width,  draw.height).data;
    const total = guideData.length / 4;

    let guidePixels   = 0;
    let coveredPixels = 0;

    for (let i = 0; i < total; i++) {
      const a = guideData[i * 4 + 3];
      if (a > 20) {                          // guide has ink here
        guidePixels++;
        if (drawData[i * 4 + 3] > 30) coveredPixels++;  // user stroked here
      }
    }

    if (guidePixels > 0 && coveredPixels / guidePixels > COVERAGE_THRESHOLD) {
      if (!celebrate) {
        setCelebrate(true);
        markComplete('trace', letter);
      }
    }
  }

  function handleClear() {
    const c = drawCanvasRef.current;
    if (!c) return;
    c.getContext('2d').clearRect(0, 0, c.width, c.height);
    setCelebrate(false);
  }

  function handleDownload() {
    const merged = document.createElement('canvas');
    merged.width  = bgCanvasRef.current.width;
    merged.height = bgCanvasRef.current.height;
    const ctx = merged.getContext('2d');
    ctx.drawImage(bgCanvasRef.current,    0, 0);
    ctx.drawImage(drawCanvasRef.current,  0, 0);
    ctx.drawImage(guideCanvasRef.current, 0, 0);
    const a = document.createElement('a');
    a.href     = merged.toDataURL('image/png');
    a.download = `kido-trace-${letter}.png`;
    a.click();
  }

  const mergedRef = useRef(null);
  function getMergedRef() {
    const merged = document.createElement('canvas');
    merged.width  = bgCanvasRef.current?.width  ?? 600;
    merged.height = bgCanvasRef.current?.height ?? 480;
    const ctx = merged.getContext('2d');
    if (bgCanvasRef.current)    ctx.drawImage(bgCanvasRef.current,    0, 0);
    if (drawCanvasRef.current)  ctx.drawImage(drawCanvasRef.current,  0, 0);
    if (guideCanvasRef.current) ctx.drawImage(guideCanvasRef.current, 0, 0);
    mergedRef.current = merged;
    return { current: merged };
  }

  return (
    <section className="mode-section" aria-label="Tracing mode">
      {/* selector bar — letters only */}
      <div className="selector-bar">
        <div className="letter-grid" role="group" aria-label="Choose a letter">
          {LETTERS.map(l => (
            <button
              key={l}
              className={`letter-btn${letter === l ? ' active' : ''}${isCompleted('trace', l) ? ' completed' : ''}`}
              onClick={() => { resetDrawLayer(); setLetter(l); }}
              aria-label={`Letter ${l}${isCompleted('trace', l) ? ' (completed)' : ''}`}
              aria-pressed={letter === l}
            >
              {l}
              {isCompleted('trace', l) && <span className="letter-check" aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* canvas stack: bg → draw → guide */}
      <div className="canvas-area" ref={containerRef}>
        <div className="canvas-container">
          <canvas ref={bgCanvasRef}    style={{ pointerEvents: 'none' }} aria-hidden="true"/>
          <canvas ref={drawCanvasRef}  aria-label="Tracing canvas" onPointerUp={checkCoverage}/>
          <canvas ref={guideCanvasRef} style={{ pointerEvents: 'none' }} aria-hidden="true"/>
        </div>

        {/* completion overlay */}
        {celebrate && (
          <>
            <Confetti onDone={() => {}} />
            <div className="completion-overlay">
              <div className="completion-box">
                <span className="completion-stars">⭐⭐⭐</span>
                <p className="completion-text">Amazing! You traced {letter}!</p>
                <div className="completion-actions">
                  <button
                    className="completion-btn"
                    onClick={() => {
                      const next = LETTERS[(LETTERS.indexOf(letter) + 1) % 26];
                      resetDrawLayer();
                      setLetter(next);
                    }}
                  >
                    Next Letter ➡
                  </button>
                  <button
                    className="completion-btn completion-btn-retry"
                    onClick={handleClear}
                  >
                    Try Again 🔄
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <ActionBar
        onUndo={undo}
        onRedo={redo}
        onClear={handleClear}
        clearLabel="Clear"
        onSave={() => { getMergedRef(); setShowSave(true); }}
        onDownload={handleDownload}
      />

      {showSave && <SaveDialog canvasRef={mergedRef} onClose={() => setShowSave(false)} />}
    </section>
  );
}
