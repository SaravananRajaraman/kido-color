/**
 * components/TracingMode.jsx
 *
 * A–Z tracing with 3 styles:
 *   dotted  – dashed letter outline on lined paper
 *   arrows  – faint letter + a green "Start ▶" arrow
 *   faint   – very light grey fill, trace with any colour
 *
 * Coverage detection: if the user has painted over enough of the
 * letter's bounding box a completion celebration triggers.
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

export default function TracingMode() {
  const { tool, color, brushSize, letter, setLetter, traceStyle, setTraceStyle, panelOpen, setPanelOpen } = useApp();

  const bgCanvasRef   = useRef(null);   // lined paper + guide letter
  const drawCanvasRef = useRef(null);   // user strokes
  const containerRef  = useRef(null);

  const [celebrate, setCelebrate] = useState(false);
  const [showSave,  setShowSave]  = useState(false);

  const { undo, redo, clearCanvas } = useDrawing({
    canvasRef: drawCanvasRef,
    tool, color, brushSize,
    enabled: true,
  });

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
  }, [letter, traceStyle]);

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
    cx.font        = `900 ${fs}px "Arial Rounded MT Bold",Arial,sans-serif`;
    cx.textAlign   = 'center';
    cx.textBaseline= 'middle';

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
      cx.font = `bold ${Math.round(fs * 0.14)}px Arial`;
      cx.fillStyle = '#43A047';
      cx.fillText('▶ Start', arrowX, arrowY);

    } else { // faint
      cx.fillStyle = 'rgba(55,71,79,0.13)';
      cx.fillText(letter, cx2, cy2);
    }
    cx.restore();

    // label
    cx.font = `bold 20px Arial`;
    cx.fillStyle = '#90A4AE';
    cx.textAlign = 'center';
    cx.fillText(`Trace the letter ${letter}`, w / 2, h - 14);
  }, [letter, traceStyle]);

  useEffect(() => { drawGuide(); }, [drawGuide]);

  /* ── clear draw layer on letter/style change ─── */
  useEffect(() => {
    const c = drawCanvasRef.current;
    if (!c) return;
    c.getContext('2d').clearRect(0, 0, c.width, c.height);
    setCelebrate(false);
  }, [letter, traceStyle]);

  /* ── coverage check (fired via pointer-up on draw canvas) ─ */
  function checkCoverage() {
    const bg   = bgCanvasRef.current;
    const draw = drawCanvasRef.current;
    if (!bg || !draw) return;
    const bgData   = bg.getContext('2d').getImageData(0, 0, bg.width, bg.height).data;
    const drawData = draw.getContext('2d').getImageData(0, 0, draw.width, draw.height).data;
    // find how many guide pixels (non-white, non-background) are covered by user strokes
    let guide   = 0;
    let covered = 0;
    for (let i = 0; i < bgData.length; i += 4) {
      const r = bgData[i], g = bgData[i+1], b = bgData[i+2], a = bgData[i+3];
      const isGuide = !(r > 220 && g > 220 && b > 200); // not paper-coloured
      if (isGuide) {
        guide++;
        if (drawData[i+3] > 30) covered++;
      }
    }
    if (guide > 0 && covered / guide > 0.35) {
      if (!celebrate) setCelebrate(true);
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
              onClick={() => setTraceStyle(s.id)}
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
              className={`letter-btn${letter === l ? ' active' : ''}`}
              onClick={() => setLetter(l)}
              aria-label={`Letter ${l}`}
              aria-pressed={letter === l}
            >
              {l}
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
                <button
                  className="completion-btn"
                  onClick={() => {
                    setCelebrate(false);
                    const next = LETTERS[(LETTERS.indexOf(letter) + 1) % 26];
                    setLetter(next);
                  }}
                >
                  Next Letter ➡
                </button>
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
