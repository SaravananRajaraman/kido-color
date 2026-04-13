/**
 * components/FreeDrawMode.jsx — blank canvas free drawing (Konva-based)
 *
 * Layer stack (bottom to top):
 *   bgLayer   – white fill (non-interactive)
 *   drawLayer – all user strokes + eraser
 */
import { useRef, useEffect, useState } from 'react';
import { Stage, Layer }                from 'react-konva';
import { useApp }                      from '../context/AppContext.jsx';
import { useKonvaDrawing }             from '../hooks/useKonvaDrawing.js';
import ToolPanel                       from './ToolPanel.jsx';
import ActionBar                       from './ActionBar.jsx';
import SaveDialog                      from './SaveDialog.jsx';

export default function FreeDrawMode() {
  const { tool, color, brushSize, panelOpen, setPanelOpen } = useApp();

  const containerRef = useRef(null);
  const stageRef     = useRef(null);
  const bgLayerRef   = useRef(null);
  const drawLayerRef = useRef(null);
  const [size, setSize]     = useState({ width: 0, height: 0 });
  const [showSave, setShowSave] = useState(false);

  const { undo, redo, clearCanvas,
          handlePointerDown, handlePointerMove, handlePointerUp } = useKonvaDrawing({
    stageRef,
    drawLayerRef,
    tool, color, brushSize,
    enabled: true,
  });

  /* ── paint bg white once draw layer is ready ──── */
  function paintBackground() {
    const dc = drawLayerRef.current?.getCanvas?.()?.getElement?.();
    if (!dc) return;
    const cx = dc.getContext('2d');
    cx.fillStyle = '#ffffff';
    cx.fillRect(0, 0, dc.width, dc.height);
    drawLayerRef.current?.batchDraw();
  }

  /* ── responsive resize ─────────────────────────── */
  useEffect(() => {
    function onResize() {
      const c = containerRef.current;
      if (!c) return;
      const { width, height } = c.getBoundingClientRect();
      const w = Math.round(width);
      const h = Math.round(height);
      if (!w || !h) return;

      // Preserve existing drawing before resize
      const dc = drawLayerRef.current?.getCanvas?.()?.getElement?.();
      let saved = null;
      if (dc && dc.width && dc.height) {
        const tmp = document.createElement('canvas');
        tmp.width  = dc.width;
        tmp.height = dc.height;
        tmp.getContext('2d').drawImage(dc, 0, 0);
        saved = tmp;
      }

      setSize({ width: w, height: h });

      // Restore after Konva re-sizes the stage on next frame
      requestAnimationFrame(() => {
        const dc2 = drawLayerRef.current?.getCanvas?.()?.getElement?.();
        if (!dc2) return;
        const cx = dc2.getContext('2d');
        cx.fillStyle = '#ffffff';
        cx.fillRect(0, 0, dc2.width, dc2.height);
        if (saved) cx.drawImage(saved, 0, 0, dc2.width, dc2.height);
        drawLayerRef.current?.batchDraw();
      });
    }

    const ro = new ResizeObserver(onResize);
    if (containerRef.current) ro.observe(containerRef.current);
    onResize();
    return () => ro.disconnect();
  }, []);

  /* build a merged canvas ref for SaveDialog */
  const mergedRef = useRef(null);
  function getMergedRef() {
    const stage = stageRef.current;
    if (!stage) return { current: null };
    const merged = document.createElement('canvas');
    merged.width  = stage.width();
    merged.height = stage.height();
    const ctx = merged.getContext('2d');
    // White background first, then draw layer
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, merged.width, merged.height);
    const dc = drawLayerRef.current?.getCanvas?.()?.getElement?.();
    if (dc) ctx.drawImage(dc, 0, 0);
    mergedRef.current = merged;
    return { current: merged };
  }

  function handleDownload() {
    getMergedRef();
    const a = document.createElement('a');
    a.href     = mergedRef.current?.toDataURL('image/png') ?? '';
    a.download = `kido-draw-${Date.now()}.png`;
    a.click();
  }

  return (
    <section className="mode-section" aria-label="Free drawing mode">
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
              {/* background layer — white fill, non-interactive */}
              <Layer ref={bgLayerRef} listening={false} />

              {/* draw layer — all user strokes */}
              <Layer
                ref={drawLayerRef}
                onMount={paintBackground}
              />
            </Stage>
          )}
        </div>
      </div>

      <ActionBar
        onUndo={undo}
        onRedo={redo}
        onClear={() => clearCanvas(true)}
        clearLabel="Clear"
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
