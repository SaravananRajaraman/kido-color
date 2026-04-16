/**
 * components/ColoringMode.jsx
 *
 * A–Z coloring with SVG outline illustrations.
 * Three canvas layers (bottom to top):
 *   1. svgCanvasRef  – the SVG outline (read-only, pointer-events:none)
 *   2. fillCanvasRef – bucket-fill colour regions
 *   3. drawCanvasRef – unused (kept for undo/redo stack compatibility)
 *
 * Tool is locked to FILL.  Color is chosen from the bottom ColorBar.
 * Completion is detected automatically (~75% of white area filled)
 * and can also be triggered with the "I'm Done! ⭐" button.
 */
import { useRef, useEffect, useCallback, useState } from 'react';
import { useApp }         from '../context/AppContext.jsx';
import { COLORING_IMAGES } from '../data/coloringImages.js';
import { TOOLS }          from '../context/AppContext.jsx';
import { useDrawing }     from '../hooks/useDrawing.js';
import ColorBar           from './ColorBar.jsx';
import ActionBar          from './ActionBar.jsx';
import SaveDialog         from './SaveDialog.jsx';
import Confetti           from './Confetti.jsx';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
// Fraction of originally-white SVG pixels that must be covered to auto-complete
const FILL_THRESHOLD = 0.75;

export default function ColoringMode() {
  const { color, letter, setLetter, markComplete, isCompleted } = useApp();

  const svgCanvasRef  = useRef(null);   // bottom: SVG outline
  const fillCanvasRef = useRef(null);   // middle: fill layer
  const drawCanvasRef = useRef(null);   // top: (empty, for hook compat)
  const containerRef  = useRef(null);

  const [celebrate, setCelebrate] = useState(false);
  const [showSave,  setShowSave]  = useState(false);

  // Cache the set of white pixel indices from the SVG canvas so we don't
  // recompute it on every pointer-up — only refresh when letter changes.
  const whitePixelsRef = useRef(null);

  const { undo, redo, isFilling } = useDrawing({
    canvasRef:        drawCanvasRef,
    fillCanvasRef:    fillCanvasRef,
    outlineCanvasRef: svgCanvasRef,
    tool:             TOOLS.FILL,
    color,
    brushSize:        6,
    enabled:          true,
  });

  /* ── stamp SVG onto bottom canvas ──────────────────── */
  const stampSvg = useCallback(() => {
    const canvas = svgCanvasRef.current;
    if (!canvas || !canvas.width) return;
    const image = COLORING_IMAGES.find(img => img.letter === letter);
    if (!image) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function drawLabel() {
      ctx.save();
      ctx.font = 'bold 22px "Arial Rounded MT Bold",Arial,sans-serif';
      ctx.fillStyle = '#1C1C1C';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`${image.letter} is for ${image.name}`, canvas.width / 2, canvas.height - 6);
      ctx.restore();
      // Invalidate white-pixel cache
      whitePixelsRef.current = null;
    }

    if (image.svg) {
      const svgBlob = new Blob([image.svg], { type: 'image/svg+xml' });
      const url     = URL.createObjectURL(svgBlob);
      const img     = new Image();
      img.onload = () => {
        const pad   = 20;
        const scale = Math.min(
          (canvas.width  - pad * 2) / img.naturalWidth,
          (canvas.height - pad * 2 - 30) / img.naturalHeight,
        );
        const dw = img.naturalWidth  * scale;
        const dh = img.naturalHeight * scale;
        const dx = (canvas.width  - dw) / 2;
        const dy = (canvas.height - dh) / 2 - 15;
        ctx.drawImage(img, dx, dy, dw, dh);
        drawLabel();
        URL.revokeObjectURL(url);
      };
      img.onerror = () => URL.revokeObjectURL(url);
      img.src = url;
    }
  }, [letter]);

  /* ── resize canvases ───────────────────────────────── */
  useEffect(() => {
    function resize() {
      const c = containerRef.current;
      if (!c) return;
      const { width, height } = c.getBoundingClientRect();
      for (const ref of [svgCanvasRef, fillCanvasRef, drawCanvasRef]) {
        if (!ref.current) continue;
        const canvas = ref.current;
        canvas.width  = Math.round(width);
        canvas.height = Math.round(height);
      }
      stampSvg();
    }
    const ro = new ResizeObserver(resize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [letter, stampSvg]);

  /* re-stamp + clear fill/draw layers when letter changes */
  useEffect(() => {
    for (const ref of [drawCanvasRef, fillCanvasRef]) {
      const c = ref.current;
      if (!c) continue;
      c.getContext('2d').clearRect(0, 0, c.width, c.height);
    }
    whitePixelsRef.current = null;
  }, [letter]);

  useEffect(() => { stampSvg(); }, [stampSvg]);

  /* ── build white-pixel cache from SVG canvas ────────── */
  function buildWhitePixelCache() {
    const canvas = svgCanvasRef.current;
    if (!canvas) return null;
    const { width, height } = canvas;
    const data = canvas.getContext('2d').getImageData(0, 0, width, height).data;
    const indices = [];
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240 && data[i + 3] > 200) {
        indices.push(i);
      }
    }
    return indices;
  }

  /* ── check fill coverage ────────────────────────────── */
  function checkCompletion() {
    if (celebrate) return;
    const fillCanvas = fillCanvasRef.current;
    if (!fillCanvas) return;

    if (!whitePixelsRef.current) {
      whitePixelsRef.current = buildWhitePixelCache();
    }
    const whiteIndices = whitePixelsRef.current;
    if (!whiteIndices || whiteIndices.length === 0) return;

    const fillData = fillCanvas.getContext('2d').getImageData(
      0, 0, fillCanvas.width, fillCanvas.height,
    ).data;

    let covered = 0;
    for (const i of whiteIndices) {
      if (fillData[i + 3] > 30) covered++;
    }

    if (covered / whiteIndices.length >= FILL_THRESHOLD) {
      triggerCompletion();
    }
  }

  function triggerCompletion() {
    setCelebrate(true);
    markComplete('color', letter);
  }

  /* ── auto-check when a fill operation finishes ───────── */
  const prevFillingRef = useRef(false);
  useEffect(() => {
    if (prevFillingRef.current && !isFilling) {
      checkCompletion();
    }
    prevFillingRef.current = isFilling;
  });

  /* ── advance to next letter ─────────────────────────── */
  function goNext() {
    const idx  = LETTERS.indexOf(letter);
    const next = LETTERS[(idx + 1) % 26];
    setCelebrate(false);
    setLetter(next);
  }

  /* ── UI handlers ────────────────────────────────────── */
  function handleClear() {
    const c = drawCanvasRef.current;
    if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height);
    const f = fillCanvasRef.current;
    if (f) f.getContext('2d').clearRect(0, 0, f.width, f.height);
    whitePixelsRef.current = null;
    setCelebrate(false);
  }

  function handleMarkDone() {
    triggerCompletion();
  }

  function handleDownload() {
    const merged = document.createElement('canvas');
    merged.width  = svgCanvasRef.current.width;
    merged.height = svgCanvasRef.current.height;
    const ctx = merged.getContext('2d');
    ctx.drawImage(svgCanvasRef.current,  0, 0);
    if (fillCanvasRef.current) ctx.drawImage(fillCanvasRef.current, 0, 0);
    ctx.drawImage(drawCanvasRef.current, 0, 0);
    const a = document.createElement('a');
    a.href     = merged.toDataURL('image/png');
    a.download = `kido-color-${letter}.png`;
    a.click();
  }

  const mergedRef = useRef(null);
  function getMergedCanvas() {
    const merged = document.createElement('canvas');
    merged.width  = svgCanvasRef.current?.width  ?? 600;
    merged.height = svgCanvasRef.current?.height ?? 480;
    const ctx = merged.getContext('2d');
    if (svgCanvasRef.current)  ctx.drawImage(svgCanvasRef.current,  0, 0);
    if (fillCanvasRef.current) ctx.drawImage(fillCanvasRef.current, 0, 0);
    if (drawCanvasRef.current) ctx.drawImage(drawCanvasRef.current, 0, 0);
    mergedRef.current = merged;
    return { current: merged };
  }

  const currentImage = COLORING_IMAGES.find(img => img.letter === letter);

  return (
    <section className="mode-section" aria-label="Coloring mode">
      {/* letter selector */}
      <div className="selector-bar">
        <div className="letter-grid" role="group" aria-label="Choose a letter">
          {LETTERS.map(l => (
            <button
              key={l}
              className={`letter-btn${letter === l ? ' active' : ''}${isCompleted('color', l) ? ' completed' : ''}`}
              onClick={() => { setCelebrate(false); setLetter(l); }}
              aria-label={`Letter ${l}${isCompleted('color', l) ? ' (colored)' : ''}`}
              aria-pressed={letter === l}
            >
              {l}
              {isCompleted('color', l) && <span className="letter-check" aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* canvas area */}
      <div className="canvas-area" ref={containerRef}>
        <div className="canvas-container">
          <canvas ref={svgCanvasRef}  style={{ pointerEvents: 'none' }} aria-hidden="true"/>
          <canvas ref={fillCanvasRef} style={{ pointerEvents: 'none' }} aria-hidden="true"/>
          <canvas ref={drawCanvasRef} aria-label="Coloring canvas" style={{ cursor: 'crosshair' }}/>
        </div>

        {isFilling && (
          <div className="fill-overlay" aria-live="polite" aria-label="Filling…">
            <span className="spinner fill-spinner"/>
          </div>
        )}

        {/* completion overlay */}
        {celebrate && (
          <>
            <Confetti onDone={() => {}} />
            <div className="completion-overlay">
              <div className="completion-box">
                <span className="completion-stars">⭐⭐⭐</span>
                <p className="completion-text">
                  Amazing! {letter} is for {currentImage?.name ?? letter}!
                </p>
                <div className="completion-actions">
                  <button className="completion-btn" onClick={goNext}>
                    Next Letter ➡
                  </button>
                  <button className="completion-btn completion-btn-retry" onClick={handleClear}>
                    Color Again 🔄
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* color palette bar */}
      <ColorBar />

      {/* action bar */}
      <ActionBar
        onUndo={undo}
        onRedo={redo}
        onClear={handleClear}
        clearLabel="Clear Paint"
        onDone={handleMarkDone}
        onSave={() => { getMergedCanvas(); setShowSave(true); }}
        onDownload={handleDownload}
      />

      {showSave && <SaveDialog canvasRef={mergedRef} onClose={() => setShowSave(false)} />}
    </section>
  );
}
