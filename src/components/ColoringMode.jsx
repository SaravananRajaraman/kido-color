/**
 * components/ColoringMode.jsx — A–Z coloring with Konva layers
 *
 * Layer stack (bottom → top):
 *   bgLayer   – SVG outline stamped onto a plain canvas  (non-interactive)
 *   fillLayer – bucket-fill colour regions               (non-interactive)
 *   drawLayer – pencil / brush strokes                   (interactive)
 *
 * Switching letter/category clears the fill + draw layers and re-stamps
 * the SVG outline.
 */
import { useRef, useEffect, useCallback, useState } from 'react';
import { Stage, Layer }                             from 'react-konva';
import { useApp }                                   from '../context/AppContext.jsx';
import { COLORING_IMAGES, CATEGORIES }              from '../data/coloringImages.js';
import { useKonvaDrawing }                          from '../hooks/useKonvaDrawing.js';
import ToolPanel                                    from './ToolPanel.jsx';
import ActionBar                                    from './ActionBar.jsx';
import SaveDialog                                   from './SaveDialog.jsx';

export default function ColoringMode() {
  const {
    tool, color, brushSize,
    letter, setLetter,
    category, setCategory,
    panelOpen, setPanelOpen,
    markComplete, isCompleted,
  } = useApp();

  const containerRef = useRef(null);
  const stageRef     = useRef(null);
  const bgLayerRef   = useRef(null);   // bottom: SVG outline
  const fillLayerRef = useRef(null);   // middle: fill
  const drawLayerRef = useRef(null);   // top: strokes

  const [size,     setSize]     = useState({ width: 0, height: 0 });
  const [showSave, setShowSave] = useState(false);

  const {
    undo, redo, isFilling,
    handlePointerDown, handlePointerMove, handlePointerUp,
  } = useKonvaDrawing({
    stageRef,
    drawLayerRef,
    fillLayerRef,
    bgLayerRef,
    tool, color, brushSize,
    enabled: true,
  });

  /* ── stamp SVG outline onto bg layer ──────────── */
  const stampSvg = useCallback(() => {
    const layer = bgLayerRef.current;
    if (!layer) return;
    const canvas = layer.getCanvas?.()?.getElement?.();
    if (!canvas || !canvas.width) return;

    const image = COLORING_IMAGES.find(
      img => img.letter === letter && img.category === category,
    ) ?? COLORING_IMAGES.find(img => img.letter === letter);
    if (!image) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function drawLabel() {
      ctx.save();
      ctx.font         = 'bold 22px "Arial Rounded MT Bold",Arial,sans-serif';
      ctx.fillStyle    = '#1C1C1C';
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`${image.letter} is for ${image.name}`, canvas.width / 2, canvas.height - 6);
      ctx.restore();
      layer.batchDraw();
    }

    function renderImg(img) {
      const pad   = 20;
      const scale = Math.min(
        (canvas.width  - pad * 2) / img.naturalWidth,
        (canvas.height - pad * 2) / img.naturalHeight,
      );
      const dw = img.naturalWidth  * scale;
      const dh = img.naturalHeight * scale;
      const dx = (canvas.width  - dw) / 2;
      const dy = (canvas.height - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
      drawLabel();
    }

    if (image.path) {
      const img  = new Image();
      img.onload = () => renderImg(img);
      img.src    = image.path;
    } else if (image.svg) {
      const blob   = new Blob([image.svg], { type: 'image/svg+xml' });
      const url    = URL.createObjectURL(blob);
      const img    = new Image();
      img.onload  = () => { renderImg(img); URL.revokeObjectURL(url); };
      img.onerror = () => URL.revokeObjectURL(url);
      img.src     = url;
    }
  }, [letter, category]);

  /* ── responsive resize ─────────────────────────── */
  useEffect(() => {
    function onResize() {
      const c = containerRef.current;
      if (!c) return;
      const { width, height } = c.getBoundingClientRect();
      const w = Math.round(width);
      const h = Math.round(height);
      if (!w || !h) return;

      // Preserve fill + draw layers
      const layerRefs = [fillLayerRef, drawLayerRef];
      const saved = layerRefs.map(ref => {
        const el = ref.current?.getCanvas?.()?.getElement?.();
        if (!el || !el.width) return null;
        const tmp = document.createElement('canvas');
        tmp.width  = el.width;
        tmp.height = el.height;
        tmp.getContext('2d').drawImage(el, 0, 0);
        return tmp;
      });

      setSize({ width: w, height: h });

      requestAnimationFrame(() => {
        layerRefs.forEach((ref, i) => {
          const el = ref.current?.getCanvas?.()?.getElement?.();
          if (!el || !saved[i]) return;
          const cx = el.getContext('2d');
          cx.clearRect(0, 0, el.width, el.height);
          cx.drawImage(saved[i], 0, 0, el.width, el.height);
          ref.current?.batchDraw();
        });
        stampSvg();
      });
    }

    const ro = new ResizeObserver(onResize);
    if (containerRef.current) ro.observe(containerRef.current);
    onResize();
    return () => ro.disconnect();
  }, [letter, category, stampSvg]);

  /* re-stamp when letter/category changes */
  useEffect(() => { stampSvg(); }, [stampSvg]);

  /* clear paint layers when subject changes */
  useEffect(() => {
    for (const ref of [drawLayerRef, fillLayerRef]) {
      const el = ref.current?.getCanvas?.()?.getElement?.();
      if (el) el.getContext('2d').clearRect(0, 0, el.width, el.height);
      ref.current?.batchDraw();
    }
  }, [letter, category]);

  /* ── derived data ──────────────────────────────── */
  const filteredImages = COLORING_IMAGES.filter(i => i.category === category);
  const lettersInCat   = [...new Set(filteredImages.map(i => i.letter))];

  /* ── action handlers ───────────────────────────── */
  function handleClear() {
    for (const ref of [drawLayerRef, fillLayerRef]) {
      const el = ref.current?.getCanvas?.()?.getElement?.();
      if (el) el.getContext('2d').clearRect(0, 0, el.width, el.height);
      ref.current?.batchDraw();
    }
  }

  function handleMarkDone() {
    markComplete('color', letter);
    const idx  = lettersInCat.indexOf(letter);
    const next = lettersInCat[(idx + 1) % lettersInCat.length];
    if (next && next !== letter) setLetter(next);
  }

  function buildMergedCanvas() {
    const stage = stageRef.current;
    if (!stage) return null;
    const merged = document.createElement('canvas');
    merged.width  = stage.width();
    merged.height = stage.height();
    const ctx = merged.getContext('2d');
    for (const ref of [bgLayerRef, fillLayerRef, drawLayerRef]) {
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
    a.download = `kido-color-${letter}.png`;
    a.click();
  }

  const mergedRef = useRef(null);
  function getMergedRef() {
    mergedRef.current = buildMergedCanvas();
    return { current: mergedRef.current };
  }

  return (
    <section className="mode-section" aria-label="Coloring mode">
      {/* selector bar */}
      <div className="selector-bar">
        <div className="style-selector" role="group" aria-label="Category">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`style-btn${category === cat ? ' active' : ''}`}
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
            >
              {{ animals:'🐾 Animals', vehicles:'🚗 Vehicles', nature:'🌿 Nature' }[cat]}
            </button>
          ))}
        </div>
        <div className="letter-grid" role="group" aria-label="Choose a letter">
          {lettersInCat.map(l => (
            <button
              key={l}
              className={`letter-btn${letter === l ? ' active' : ''}${isCompleted('color', l) ? ' completed' : ''}`}
              onClick={() => setLetter(l)}
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
        <div className="canvas-container" style={{ width: '100%', height: '100%' }}>
          {size.width > 0 && size.height > 0 && (
            <Stage
              ref={stageRef}
              width={size.width}
              height={size.height}
              style={{ display: 'block' }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              <Layer ref={bgLayerRef}   listening={false} />
              <Layer ref={fillLayerRef} listening={false} />
              <Layer ref={drawLayerRef} />
            </Stage>
          )}
        </div>

        {isFilling && (
          <div className="fill-overlay" aria-live="polite" aria-label="Filling…">
            <span className="spinner fill-spinner" />
          </div>
        )}
        <div
          className={`tool-indicator${panelOpen ? '' : ' visible'}`}
          aria-live="polite"
        >
          {tool === 'eraser' ? '🧹 Eraser' : `✏️ ${tool.charAt(0).toUpperCase()+tool.slice(1)}`}
        </div>
      </div>

      <ActionBar
        onUndo={undo}
        onRedo={redo}
        onClear={handleClear}
        clearLabel="Clear Paint"
        onDone={handleMarkDone}
        onSave={() => { getMergedRef(); setShowSave(true); }}
        onDownload={handleDownload}
      />
      <button
        className="action-btn btn-tools"
        style={{ position:'fixed', bottom:'72px', right:'12px', zIndex:200 }}
        onClick={() => setPanelOpen(true)}
        aria-label="Open tools panel"
        aria-expanded={panelOpen}
      >
        🛠️ Tools
      </button>

      <ToolPanel />
      {showSave && <SaveDialog canvasRef={mergedRef} onClose={() => setShowSave(false)} />}
    </section>
  );
}
