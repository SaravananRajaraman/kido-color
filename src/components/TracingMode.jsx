/**
 * components/TracingMode.jsx
 *
 * A–Z tracing with 3 styles:
 *   dotted  – dashed letter outline on lined paper
 *   arrows  – faint letter + a green "Start ▶" arrow
 *   faint   – very light grey fill, trace with any colour
 *
 * Guide letter uses "Fredoka One" (loaded via Google Fonts in index.html)
 * for a consistent, child-friendly rounded look on every browser/OS.
 *
 * Coverage detection: measures painted pixels inside the letter's
 * bounding-box area compared to the guide letter's non-paper pixels.
 */
import { useRef, useEffect, useCallback, useState } from 'react';
import { useApp }       from '../context/AppContext.jsx';
import { useDrawing }   from '../hooks/useDrawing.js';
import ToolPanel        from './ToolPanel.jsx';
import ActionBar        from './ActionBar.jsx';
import SaveDialog       from './SaveDialog.jsx';
import Confetti         from './Confetti.jsx';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const STYLES  = [
  { id:'dotted', label:'⋯ Dotted'  },
  { id:'arrows', label:'➡ Arrows'  },
  { id:'faint',  label:'👻 Faint'   },
];

// Font stack: Fredoka One (Google Fonts) → Arial Rounded MT Bold → sans-serif
const GUIDE_FONT = '"Fredoka One","Arial Rounded MT Bold",Arial,sans-serif';

// Minimum fraction of guide pixels that must be covered to trigger completion.
// ~65% gives kids a meaningful challenge without being frustrating.
const COVERAGE_THRESHOLD = 0.65;

export default function TracingMode() {
  const { tool, color, brushSize, letter, setLetter, traceStyle, setTraceStyle, setPanelOpen,
          markComplete, isCompleted } = useApp();

  const bgCanvasRef   = useRef(null);   // lined paper + guide letter
  const drawCanvasRef = useRef(null);   // user strokes
  const containerRef  = useRef(null);

  const [celebrate, setCelebrate] = useState(false);
  const [showSave,  setShowSave]  = useState(false);
  // Track bounding box of the guide letter so coverage check is accurate
  const letterBBoxRef = useRef(null);

  const { undo, redo } = useDrawing({
    canvasRef: drawCanvasRef,
    tool, color, brushSize,
    enabled: true,
  });

  /* ── draw guide letter ───────────────────────── */
  const drawGuide = useCallback(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas || !canvas.width) return;
    const cx = canvas.getContext('2d');
    const { width: w, height: h } = canvas;

    // background – cream lined paper
    cx.fillStyle = '#FFFDE7';
    cx.fillRect(0, 0, w, h);
    cx.strokeStyle = '#C8E6C9';
    cx.lineWidth = 1.2;
    for (let y = 40; y < h; y += 38) {
      cx.beginPath(); cx.moveTo(0, y); cx.lineTo(w, y); cx.stroke();
    }
    // margin line
    cx.strokeStyle = '#FFCDD2';
    cx.lineWidth = 2.5;
    cx.beginPath(); cx.moveTo(60, 0); cx.lineTo(60, h); cx.stroke();

    const fs   = Math.min(w * 0.68, h * 0.65, 340);
    const cx2  = w / 2;
    const cy2  = h / 2 + fs * 0.06;

    cx.save();
    cx.font        = `900 ${fs}px ${GUIDE_FONT}`;
    cx.textAlign   = 'center';
    cx.textBaseline= 'middle';

    // Measure the letter for accurate coverage detection
    const metrics = cx.measureText(letter);
    const lh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    const lw = metrics.width;
    letterBBoxRef.current = {
      x: cx2 - lw / 2,
      y: cy2 - metrics.actualBoundingBoxAscent,
      w: lw,
      h: lh,
    };

    if (traceStyle === 'dotted') {
      cx.setLineDash([18, 18]);
      cx.strokeStyle = '#37474F';
      cx.lineWidth   = fs * 0.07;
      cx.lineJoin    = 'round';
      cx.lineCap     = 'round';
      cx.strokeText(letter, cx2, cy2);
      cx.setLineDash([]);

    } else if (traceStyle === 'arrows') {
      cx.fillStyle   = 'rgba(55,71,79,0.12)';
      cx.fillText(letter, cx2, cy2);
      // draw a green arrow at top-left of the letter
      const arrowX = cx2 - fs * 0.18;
      const arrowY = cy2 - fs * 0.42;
      cx.font = `bold ${Math.round(fs * 0.14)}px ${GUIDE_FONT}`;
      cx.fillStyle = '#43A047';
      cx.fillText('▶ Start', arrowX, arrowY);

    } else { // faint
      cx.fillStyle = 'rgba(55,71,79,0.13)';
      cx.fillText(letter, cx2, cy2);
    }
    cx.restore();

    // label
    cx.font = `bold 20px ${GUIDE_FONT}`;
    cx.fillStyle = '#90A4AE';
    cx.textAlign = 'center';
    cx.fillText(`Trace the letter ${letter}`, w / 2, h - 14);
  }, [letter, traceStyle]);

  /* ── resize ──────────────────────────────────── */
  useEffect(() => {
    function resize() {
      const c = containerRef.current;
      if (!c) return;
      const { width, height } = c.getBoundingClientRect();
      for (const ref of [bgCanvasRef, drawCanvasRef]) {
        if (!ref.current) continue;
        ref.current.width  = Math.round(width);
        ref.current.height = Math.round(height);
      }
      drawGuide();
    }
    const ro = new ResizeObserver(resize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [letter, traceStyle, drawGuide]);

  useEffect(() => { drawGuide(); }, [drawGuide]);

  /* ── reset draw layer + celebration ─────────────
     Called from event handlers when letter/style changes
     so setState isn't called inside an effect body.     */
  function resetDrawLayer() {
    const c = drawCanvasRef.current;
    if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height);
    setCelebrate(false);
  }

  /* ── coverage check (fired via pointer-up on draw canvas) ─ */
  function checkCoverage() {
    const bg   = bgCanvasRef.current;
    const draw = drawCanvasRef.current;
    if (!bg || !draw) return;

    const bbox = letterBBoxRef.current;
    const bgData   = bg.getContext('2d').getImageData(0, 0, bg.width, bg.height).data;
    const drawData = draw.getContext('2d').getImageData(0, 0, draw.width, draw.height).data;
    const w = bg.width;

    // Only scan pixels inside the letter's bounding box for accuracy.
    // A guide pixel is "ink" if it differs from the cream background (#FFFDE7).
    const BG_R = 0xFF, BG_G = 0xFD, BG_B = 0xE7;
    const COLOR_THRESH = 20;
    let guide   = 0;
    let covered = 0;

    const x0 = bbox ? Math.max(0, Math.round(bbox.x)) : 0;
    const y0 = bbox ? Math.max(0, Math.round(bbox.y)) : 0;
    const x1 = bbox ? Math.min(bg.width  - 1, Math.round(bbox.x + bbox.w)) : bg.width  - 1;
    const y1 = bbox ? Math.min(bg.height - 1, Math.round(bbox.y + bbox.h)) : bg.height - 1;

    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const i = (y * w + x) * 4;
        const r = bgData[i], g = bgData[i+1], b = bgData[i+2];
        const isGuide =
          Math.abs(r - BG_R) > COLOR_THRESH ||
          Math.abs(g - BG_G) > COLOR_THRESH ||
          Math.abs(b - BG_B) > COLOR_THRESH;
        if (isGuide) {
          guide++;
          if (drawData[i+3] > 30) covered++;
        }
      }
    }

    if (guide > 0 && covered / guide > COVERAGE_THRESHOLD) {
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
    ctx.drawImage(bgCanvasRef.current,   0, 0);
    ctx.drawImage(drawCanvasRef.current, 0, 0);
    const a = document.createElement('a');
    a.href     = merged.toDataURL('image/png');
    a.download = `kido-trace-${letter}.png`;
    a.click();
  }

  // merged canvas ref for SaveDialog
  const mergedRef = useRef(null);
  function getMergedRef() {
    const merged = document.createElement('canvas');
    merged.width  = bgCanvasRef.current?.width  ?? 600;
    merged.height = bgCanvasRef.current?.height ?? 480;
    const ctx = merged.getContext('2d');
    if (bgCanvasRef.current)   ctx.drawImage(bgCanvasRef.current,   0, 0);
    if (drawCanvasRef.current) ctx.drawImage(drawCanvasRef.current, 0, 0);
    mergedRef.current = merged;
    return { current: merged };
  }

  return (
    <section className="mode-section" aria-label="Tracing mode">
      {/* selector bar */}
      <div className="selector-bar">
        <div className="style-selector" role="group" aria-label="Tracing style">
          {STYLES.map(s => (
            <button
              key={s.id}
              className={`style-btn${traceStyle === s.id ? ' active' : ''}`}
              onClick={() => { resetDrawLayer(); setTraceStyle(s.id); }}
              aria-pressed={traceStyle === s.id}
            >
              {s.label}
            </button>
          ))}
        </div>
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

      {/* canvas */}
      <div className="canvas-area" ref={containerRef}>
        <div className="canvas-container">
          <canvas ref={bgCanvasRef}   style={{ pointerEvents:'none' }} aria-hidden="true"/>
          <canvas ref={drawCanvasRef}
            aria-label="Tracing canvas"
            onPointerUp={checkCoverage}
          />
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
      <button
        className="action-btn btn-tools"
        style={{ position:'fixed', bottom:'72px', right:'12px', zIndex:200 }}
        onClick={() => setPanelOpen(true)}
        aria-label="Open tools panel"
      >
        🛠️ Tools
      </button>

      <ToolPanel />
      {showSave && <SaveDialog canvasRef={mergedRef} onClose={() => setShowSave(false)} />}
    </section>
  );
}
