/**
 * components/ColoringMode.jsx
 *
 * A–Z coloring with SVG outline illustrations.
 * The SVG is rendered to the bottom canvas layer; the user paints
 * on the top drawing canvas. On letter/category change the SVG
 * is re-stamped and the drawing layer is cleared.
 */
import { useRef, useEffect, useCallback, useState } from 'react';
import { useApp }                   from '../context/AppContext.jsx';
import { COLORING_IMAGES, CATEGORIES } from '../data/coloringImages.js';
import { useDrawing }               from '../hooks/useDrawing.js';
import ToolPanel                    from './ToolPanel.jsx';
import ActionBar                    from './ActionBar.jsx';
import SaveDialog                   from './SaveDialog.jsx';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function ColoringMode() {
  const { tool, color, brushSize, letter, setLetter, category, setCategory, panelOpen, setPanelOpen } = useApp();

  const svgCanvasRef  = useRef(null);   // bottom: SVG outline
  const drawCanvasRef = useRef(null);   // top: user paint
  const containerRef  = useRef(null);

  const [showSave, setShowSave] = useState(false);

  const { undo, redo, clearCanvas } = useDrawing({
    canvasRef: drawCanvasRef,
    tool, color, brushSize,
    enabled: true,
  });

  /* ── resize canvases ─────────────────────────── */
  useEffect(() => {
    function resize() {
      const c = containerRef.current;
      if (!c) return;
      const { width, height } = c.getBoundingClientRect();
      for (const ref of [svgCanvasRef, drawCanvasRef]) {
        if (!ref.current) continue;
        const canvas = ref.current;
        const ctx    = canvas.getContext('2d');
        const imgData = canvas === drawCanvasRef.current
          ? ctx.getImageData(0, 0, canvas.width, canvas.height)
          : null;
        canvas.width  = Math.round(width);
        canvas.height = Math.round(height);
        if (imgData) {
          const tmp  = document.createElement('canvas');
          tmp.width  = imgData.width;
          tmp.height = imgData.height;
          tmp.getContext('2d').putImageData(imgData, 0, 0);
          ctx.drawImage(tmp, 0, 0, canvas.width, canvas.height);
        }
        if (canvas === drawCanvasRef.current && !imgData?.data.some(Boolean)) {
          ctx.fillStyle = 'rgba(0,0,0,0)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
      stampSvg();
    }
    const ro = new ResizeObserver(resize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [letter, category]);

  /* ── stamp SVG onto bottom canvas ─────────────── */
  const stampSvg = useCallback(() => {
    const canvas = svgCanvasRef.current;
    if (!canvas || !canvas.width) return;
    const image = COLORING_IMAGES.find(
      img => img.letter === letter && img.category === category
    ) ?? COLORING_IMAGES.find(img => img.letter === letter);
    if (!image) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const svgBlob = new Blob([image.svg], { type: 'image/svg+xml' });
    const url     = URL.createObjectURL(svgBlob);
    const img     = new Image();
    img.onload = () => {
      // centre and fit with padding
      const pad  = 20;
      const scale = Math.min(
        (canvas.width  - pad * 2) / img.naturalWidth,
        (canvas.height - pad * 2) / img.naturalHeight,
      );
      const dw = img.naturalWidth  * scale;
      const dh = img.naturalHeight * scale;
      const dx = (canvas.width  - dw) / 2;
      const dy = (canvas.height - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);

      // draw letter + name label
      ctx.save();
      ctx.font = 'bold 22px "Arial Rounded MT Bold",Arial,sans-serif';
      ctx.fillStyle = '#1C1C1C';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`${image.letter} is for ${image.name}`, canvas.width / 2, canvas.height - 6);
      ctx.restore();

      URL.revokeObjectURL(url);
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
  }, [letter, category]);

  /* re-stamp when letter or category changes */
  useEffect(() => { stampSvg(); }, [stampSvg]);

  /* clear draw layer when letter/category changes */
  useEffect(() => {
    const c  = drawCanvasRef.current;
    if (!c) return;
    const cx = c.getContext('2d');
    cx.clearRect(0, 0, c.width, c.height);
  }, [letter, category]);

  function handleClear() {
    const c  = drawCanvasRef.current;
    if (!c) return;
    const cx = c.getContext('2d');
    cx.clearRect(0, 0, c.width, c.height);
  }

  function handleDownload() {
    // merge SVG canvas + draw canvas
    const merged = document.createElement('canvas');
    merged.width  = svgCanvasRef.current.width;
    merged.height = svgCanvasRef.current.height;
    const ctx = merged.getContext('2d');
    ctx.drawImage(svgCanvasRef.current,  0, 0);
    ctx.drawImage(drawCanvasRef.current, 0, 0);
    const a = document.createElement('a');
    a.href     = merged.toDataURL('image/png');
    a.download = `kido-color-${letter}.png`;
    a.click();
  }

  // Merged canvas ref for SaveDialog
  const mergedRef = useRef(null);
  function getMergedCanvas() {
    const merged = document.createElement('canvas');
    merged.width  = svgCanvasRef.current?.width  ?? 600;
    merged.height = svgCanvasRef.current?.height ?? 480;
    const ctx = merged.getContext('2d');
    if (svgCanvasRef.current)  ctx.drawImage(svgCanvasRef.current,  0, 0);
    if (drawCanvasRef.current) ctx.drawImage(drawCanvasRef.current, 0, 0);
    mergedRef.current = merged;
    return { current: merged };
  }

  const filteredImages = COLORING_IMAGES.filter(i => i.category === category);
  const lettersInCat   = [...new Set(filteredImages.map(i => i.letter))];

  return (
    <section className="mode-section" aria-label="Coloring mode">
      {/* selector bar */}
      <div className="selector-bar">
        {/* category tabs */}
        <div className="style-selector" role="group" aria-label="Category">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`style-btn${category === cat ? ' active' : ''}`}
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
            >
              {{animals:'🐾 Animals', vehicles:'🚗 Vehicles', nature:'🌿 Nature'}[cat]}
            </button>
          ))}
        </div>
        {/* letter strip */}
        <div className="letter-grid" role="group" aria-label="Choose a letter">
          {lettersInCat.map(l => (
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

      {/* canvas area */}
      <div className="canvas-area" ref={containerRef}>
        <div className="canvas-container">
          <canvas ref={svgCanvasRef}  style={{ pointerEvents:'none' }} aria-hidden="true"/>
          <canvas ref={drawCanvasRef} aria-label="Coloring canvas"/>
        </div>
        <div
          className={`tool-indicator${panelOpen ? '' : ' visible'}`}
          aria-live="polite"
        >
          {tool === 'eraser' ? '🧹 Eraser' : `✏️ ${tool.charAt(0).toUpperCase()+tool.slice(1)}`}
        </div>
      </div>

      {/* action bar */}
      <ActionBar
        onUndo={undo}
        onRedo={redo}
        onClear={handleClear}
        clearLabel="Clear Paint"
        onSave={() => { getMergedCanvas(); setShowSave(true); }}
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
