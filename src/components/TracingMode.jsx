/**
 * components/TracingMode.jsx — A–Z tracing with Konva layers
 *
 * Layer stack (bottom → top):
 *   bgLayer   – lined paper + guide letter  (non-interactive)
 *   drawLayer – user strokes                (interactive)
 *
 * Three tracing styles:
 *   dotted  – dashed letter outline on lined paper
 *   arrows  – faint letter + "▶ Start" hint
 *   faint   – very light grey fill
 *
 * Coverage detection: measures painted draw-layer pixels over the guide-
 * letter pixels in the bg layer (same algorithm as before, just reads
 * Konva layer canvases instead of plain <canvas> refs).
 */
import { useRef, useEffect, useCallback, useState } from 'react';
import { Stage, Layer }                             from 'react-konva';
import { useApp }                                   from '../context/AppContext.jsx';
import { useKonvaDrawing }                          from '../hooks/useKonvaDrawing.js';
import ToolPanel                                    from './ToolPanel.jsx';
import ActionBar                                    from './ActionBar.jsx';
import SaveDialog                                   from './SaveDialog.jsx';
import Confetti                                     from './Confetti.jsx';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const STYLES  = [
  { id: 'dotted', label: '⋯ Dotted' },
  { id: 'arrows', label: '➡ Arrows' },
  { id: 'faint',  label: '👻 Faint'  },
];

const GUIDE_FONT       = '"Fredoka One","Arial Rounded MT Bold",Arial,sans-serif';
const COVERAGE_THRESHOLD = 0.65;

export default function TracingMode() {
  const {
    tool, color, brushSize,
    letter, setLetter,
    traceStyle, setTraceStyle,
    setPanelOpen,
    markComplete, isCompleted,
  } = useApp();

  const containerRef = useRef(null);
  const stageRef     = useRef(null);
  const bgLayerRef   = useRef(null);
  const drawLayerRef = useRef(null);
  const letterBBoxRef = useRef(null);

  const [size,      setSize]      = useState({ width: 0, height: 0 });
  const [celebrate, setCelebrate] = useState(false);
  const [showSave,  setShowSave]  = useState(false);

  const { undo, redo, handlePointerDown, handlePointerMove, handlePointerUp } = useKonvaDrawing({
    stageRef,
    drawLayerRef,
    bgLayerRef,
    tool, color, brushSize,
    enabled: true,
  });

  /* ── draw guide ─────────────────────────────────── */
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const drawGuide = useCallback(() => {
    const layer = bgLayerRef.current;
    if (!layer) return;
    const konvaCanvas = layer.getCanvas?.();
    const canvas = konvaCanvas?.getElement?.();
    if (!canvas || !canvas.width) return;

    // Use CSS pixel dimensions: the raw context has scale(pixelRatio) already applied
    const pixelRatio = konvaCanvas.pixelRatio || 1;
    const cx = canvas.getContext('2d');
    const w = canvas.width  / pixelRatio;
    const h = canvas.height / pixelRatio;

    // cream lined paper
    cx.fillStyle = '#FFFDE7';
    cx.fillRect(0, 0, w, h);
    cx.strokeStyle = '#C8E6C9';
    cx.lineWidth   = 1.2;
    for (let y = 40; y < h; y += 38) {
      cx.beginPath(); cx.moveTo(0, y); cx.lineTo(w, y); cx.stroke();
    }
    // margin line
    cx.strokeStyle = '#FFCDD2';
    cx.lineWidth   = 2.5;
    cx.beginPath(); cx.moveTo(60, 0); cx.lineTo(60, h); cx.stroke();

    const fs  = Math.min(w * 0.68, h * 0.65, 340);
    const cx2 = w / 2;
    const cy2 = h / 2 + fs * 0.06;

    cx.save();
    cx.font          = `900 ${fs}px ${GUIDE_FONT}`;
    cx.textAlign     = 'center';
    cx.textBaseline  = 'middle';

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
      cx.fillStyle = 'rgba(55,71,79,0.12)';
      cx.fillText(letter, cx2, cy2);
      const arrowX = cx2 - fs * 0.18;
      const arrowY = cy2 - fs * 0.42;
      cx.font      = `bold ${Math.round(fs * 0.14)}px ${GUIDE_FONT}`;
      cx.fillStyle = '#43A047';
      cx.fillText('▶ Start', arrowX, arrowY);

    } else {
      cx.fillStyle = 'rgba(55,71,79,0.13)';
      cx.fillText(letter, cx2, cy2);
    }
    cx.restore();

    cx.font      = `bold 20px ${GUIDE_FONT}`;
    cx.fillStyle = '#90A4AE';
    cx.textAlign = 'center';
    cx.fillText(`Trace the letter ${letter}`, w / 2, h - 14);
  }, [letter, traceStyle]);

  /* ── responsive resize ─────────────────────────── */
  useEffect(() => {
    function onResize() {
      const c = containerRef.current;
      if (!c) return;
      const { width, height } = c.getBoundingClientRect();
      const w = Math.round(width);
      const h = Math.round(height);
      if (!w || !h) return;
      setSize({ width: w, height: h });
      requestAnimationFrame(() => { drawGuide(); });
    }
    const ro = new ResizeObserver(onResize);
    if (containerRef.current) ro.observe(containerRef.current);
    onResize();
    return () => ro.disconnect();
  }, [letter, traceStyle, drawGuide]);

  useEffect(() => { drawGuide(); }, [drawGuide]);

  /* ── reset draw layer + celebration ─────────────── */
  function resetDrawLayer() {
    const el = drawLayerRef.current?.getCanvas?.()?.getElement?.();
    if (el) el.getContext('2d').clearRect(0, 0, el.width, el.height);
    drawLayerRef.current?.batchDraw();
    setCelebrate(false);
  }

  /* ── coverage check ─────────────────────────────── */
  function checkCoverage() {
    const bgEl   = bgLayerRef.current?.getCanvas?.()?.getElement?.();
    const drawEl = drawLayerRef.current?.getCanvas?.()?.getElement?.();
    if (!bgEl || !drawEl) return;

    const bbox     = letterBBoxRef.current;
    const bgData   = bgEl.getContext('2d').getImageData(0, 0, bgEl.width,   bgEl.height).data;
    const drawData = drawEl.getContext('2d').getImageData(0, 0, drawEl.width, drawEl.height).data;
    const w = bgEl.width;

    const BG_R = 0xFF, BG_G = 0xFD, BG_B = 0xE7;
    const COLOR_THRESH = 20;
    let guide = 0, covered = 0;

    const x0 = bbox ? Math.max(0, Math.round(bbox.x))         : 0;
    const y0 = bbox ? Math.max(0, Math.round(bbox.y))         : 0;
    const x1 = bbox ? Math.min(bgEl.width  - 1, Math.round(bbox.x + bbox.w)) : bgEl.width  - 1;
    const y1 = bbox ? Math.min(bgEl.height - 1, Math.round(bbox.y + bbox.h)) : bgEl.height - 1;

    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const i = (y * w + x) * 4;
        const isGuide =
          Math.abs(bgData[i]   - BG_R) > COLOR_THRESH ||
          Math.abs(bgData[i+1] - BG_G) > COLOR_THRESH ||
          Math.abs(bgData[i+2] - BG_B) > COLOR_THRESH;
        if (isGuide) {
          guide++;
          if (drawData[i+3] > 30) covered++;
        }
      }
    }

    if (guide > 0 && covered / guide > COVERAGE_THRESHOLD && !celebrate) {
      setCelebrate(true);
      markComplete('trace', letter);
    }
  }

  /* ── action handlers ───────────────────────────── */
  function handleClear() {
    const el = drawLayerRef.current?.getCanvas?.()?.getElement?.();
    if (el) el.getContext('2d').clearRect(0, 0, el.width, el.height);
    drawLayerRef.current?.batchDraw();
    setCelebrate(false);
  }

  function buildMergedCanvas() {
    const stage = stageRef.current;
    if (!stage) return null;
    const merged = document.createElement('canvas');
    merged.width  = stage.width();
    merged.height = stage.height();
    const ctx = merged.getContext('2d');
    for (const ref of [bgLayerRef, drawLayerRef]) {
      const el = ref.current?.getCanvas?.()?.getElement?.();
      if (el) ctx.drawImage(el, 0, 0);
    }
    return merged;
  }

  function handleDownload() {
    const merged = buildMergedCanvas();
    if (!merged) return;
    const a = document.createElement('a');
    a.href     = merged.toDataURL('image/png');
    a.download = `kido-trace-${letter}.png`;
    a.click();
  }

  const mergedRef = useRef(null);
  function getMergedRef() {
    mergedRef.current = buildMergedCanvas();
    return { current: mergedRef.current };
  }

  /* Combined pointer-up: finish stroke + check coverage */
  function onPointerUp(e) {
    handlePointerUp(e);
    checkCoverage();
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
        <div className="canvas-container" style={{ width: '100%', height: '100%' }}>
          {size.width > 0 && size.height > 0 && (
            <Stage
              ref={stageRef}
              width={size.width}
              height={size.height}
              style={{ display: 'block' }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={handlePointerUp}
            >
              <Layer ref={bgLayerRef}   listening={false} clearBeforeDraw={false} />
              <Layer ref={drawLayerRef} />
            </Stage>
          )}
        </div>

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
