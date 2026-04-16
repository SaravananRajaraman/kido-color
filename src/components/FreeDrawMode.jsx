/**
 * components/FreeDrawMode.jsx — blank canvas free drawing
 */
import { useRef, useEffect, useState } from 'react';
import { useApp }           from '../context/AppContext.jsx';
import { useDrawing }       from '../hooks/useDrawing.js';
import { getCursorStyle }   from '../utils/cursorUtils.js';
import ToolPanel            from './ToolPanel.jsx';
import ActionBar            from './ActionBar.jsx';
import SaveDialog           from './SaveDialog.jsx';

export default function FreeDrawMode() {
  const { tool, color, brushSize, panelOpen, setPanelOpen } = useApp();

  const canvasRef    = useRef(null);
  const containerRef = useRef(null);
  const [showSave, setShowSave] = useState(false);

  const { undo, redo, clearCanvas } = useDrawing({
    canvasRef,
    tool, color, brushSize,
    enabled: true,
  });

  /* ── resize ──────────────────────────────────── */
  useEffect(() => {
    function resize() {
      const c = containerRef.current;
      const cv = canvasRef.current;
      if (!c || !cv) return;
      const { width, height } = c.getBoundingClientRect();
      const ctx  = cv.getContext('2d');
      const prev = ctx.getImageData(0, 0, cv.width, cv.height);
      cv.width  = Math.round(width);
      cv.height = Math.round(height);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, cv.width, cv.height);
      if (prev.width && prev.height) {
        const tmp  = document.createElement('canvas');
        tmp.width  = prev.width; tmp.height = prev.height;
        tmp.getContext('2d').putImageData(prev, 0, 0);
        ctx.drawImage(tmp, 0, 0, cv.width, cv.height);
      }
    }
    const ro = new ResizeObserver(resize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  function handleDownload() {
    const a = document.createElement('a');
    a.href     = canvasRef.current?.toDataURL('image/png') ?? '';
    a.download = `kido-draw-${Date.now()}.png`;
    a.click();
  }

  return (
    <section className="mode-section" aria-label="Free drawing mode">
      <div className="canvas-area" ref={containerRef}>
        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            aria-label="Free drawing canvas"
            style={{ cursor: getCursorStyle(tool, brushSize) }}
          />
        </div>
      </div>

      <ActionBar
        onUndo={undo}
        onRedo={redo}
        onClear={() => clearCanvas(true)}
        clearLabel="Clear"
        onSave={() => setShowSave(true)}
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
      {showSave && <SaveDialog canvasRef={canvasRef} onClose={() => setShowSave(false)} />}
    </section>
  );
}
