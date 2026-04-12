/**
 * hooks/useDrawing.js
 *
 * Core drawing engine hook.
 * Attaches pointer/touch events to a canvas ref and draws with the
 * currently active tool.
 *
 * Supports:
 *   pencil    – thin, clean round stroke
 *   sketch    – medium, slightly rough square stroke
 *   crayon    – textured scattered dots
 *   water     – radial gradient bleeds with opacity
 *   poster    – thick opaque flat stroke
 *   oil       – base + highlight + shadow layers
 *   fill      – scanline flood-fill with tolerance
 *   eraser    – white stroke
 *
 * Undo/redo: 25-frame ImageData stack.
 */
import { useEffect, useRef, useCallback } from 'react';
import { TOOLS } from '../context/AppContext.jsx';

const UNDO_LIMIT = 25;

export function useDrawing({ canvasRef, tool, color, brushSize, enabled = true }) {
  const undoStack = useRef([]);
  const redoStack = useRef([]);
  const drawing   = useRef(false);
  const lastPos   = useRef(null);
  const ctx       = useRef(null);

  /* ── helpers ─────────────────────────────────── */
  function getCanvas() { return canvasRef.current; }
  function getCtx()    {
    if (ctx.current) return ctx.current;
    const c = getCanvas();
    if (!c) return null;
    ctx.current = c.getContext('2d');
    return ctx.current;
  }

  function snapshot() {
    const c = getCanvas();
    if (!c) return;
    undoStack.current.push(getCtx().getImageData(0, 0, c.width, c.height));
    if (undoStack.current.length > UNDO_LIMIT) undoStack.current.shift();
    redoStack.current = [];
  }

  const undo = useCallback(() => {
    if (!undoStack.current.length) return;
    const c = getCanvas();
    const cx = getCtx();
    if (!c || !cx) return;
    redoStack.current.push(cx.getImageData(0, 0, c.width, c.height));
    cx.putImageData(undoStack.current.pop(), 0, 0);
  }, []);

  const redo = useCallback(() => {
    if (!redoStack.current.length) return;
    const c = getCanvas();
    const cx = getCtx();
    if (!c || !cx) return;
    undoStack.current.push(cx.getImageData(0, 0, c.width, c.height));
    cx.putImageData(redoStack.current.pop(), 0, 0);
  }, []);

  const clearCanvas = useCallback((fillWhite = true) => {
    const c  = getCanvas();
    const cx = getCtx();
    if (!c || !cx) return;
    snapshot();
    cx.clearRect(0, 0, c.width, c.height);
    if (fillWhite) {
      cx.fillStyle = '#ffffff';
      cx.fillRect(0, 0, c.width, c.height);
    }
  }, []);

  /* ── pointer position ────────────────────────── */
  function getPos(e) {
    const c    = getCanvas();
    const rect = c.getBoundingClientRect();
    const scaleX = c.width  / rect.width;
    const scaleY = c.height / rect.height;
    const src = e.touches ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left) * scaleX,
      y: (src.clientY - rect.top)  * scaleY,
    };
  }

  /* ── draw segment ────────────────────────────── */
  function drawSegment(cx, from, to, currentTool, currentColor, currentSize) {
    if (currentTool === TOOLS.ERASER) {
      cx.globalCompositeOperation = 'source-over';
      cx.strokeStyle = '#ffffff';
      cx.lineWidth   = currentSize * 4;
      cx.lineCap     = 'round';
      cx.lineJoin    = 'round';
      cx.beginPath();
      cx.moveTo(from.x, from.y);
      cx.lineTo(to.x, to.y);
      cx.stroke();
      return;
    }

    cx.globalCompositeOperation = 'source-over';

    switch (currentTool) {
      case TOOLS.PENCIL: {
        cx.strokeStyle = currentColor;
        cx.lineWidth   = currentSize;
        cx.lineCap     = 'round';
        cx.lineJoin    = 'round';
        cx.globalAlpha = 0.92;
        cx.beginPath();
        cx.moveTo(from.x, from.y);
        cx.lineTo(to.x, to.y);
        cx.stroke();
        cx.globalAlpha = 1;
        break;
      }
      case TOOLS.SKETCH: {
        cx.strokeStyle = currentColor;
        cx.lineWidth   = currentSize * 1.4;
        cx.lineCap     = 'square';
        cx.lineJoin    = 'bevel';
        cx.globalAlpha = 0.80;
        for (let i = 0; i < 3; i++) {
          const off = (i - 1) * (currentSize * 0.5);
          cx.beginPath();
          cx.moveTo(from.x + off, from.y + off);
          cx.lineTo(to.x  + off, to.y  + off);
          cx.stroke();
        }
        cx.globalAlpha = 1;
        break;
      }
      case TOOLS.CRAYON: {
        const dist = Math.hypot(to.x - from.x, to.y - from.y);
        const steps = Math.max(1, Math.ceil(dist / 2));
        for (let i = 0; i <= steps; i++) {
          const t = steps ? i / steps : 0;
          const px = from.x + (to.x - from.x) * t;
          const py = from.y + (to.y - from.y) * t;
          for (let j = 0; j < 6; j++) {
            const angle = Math.random() * Math.PI * 2;
            const r     = Math.random() * currentSize * 1.8;
            cx.fillStyle  = currentColor;
            cx.globalAlpha = 0.35 + Math.random() * 0.35;
            cx.beginPath();
            cx.arc(
              px + Math.cos(angle) * r,
              py + Math.sin(angle) * r,
              Math.random() * currentSize * 0.8 + 0.5,
              0, Math.PI * 2,
            );
            cx.fill();
          }
        }
        cx.globalAlpha = 1;
        break;
      }
      case TOOLS.WATER: {
        const dist  = Math.hypot(to.x - from.x, to.y - from.y);
        const steps = Math.max(1, Math.ceil(dist / 4));
        for (let i = 0; i <= steps; i++) {
          const t  = steps ? i / steps : 0;
          const px = from.x + (to.x - from.x) * t;
          const py = from.y + (to.y - from.y) * t;
          const r  = currentSize * 3;
          const grad = cx.createRadialGradient(px, py, 0, px, py, r);
          grad.addColorStop(0,   colorAlpha(currentColor, 0.22));
          grad.addColorStop(0.5, colorAlpha(currentColor, 0.10));
          grad.addColorStop(1,   colorAlpha(currentColor, 0.00));
          cx.fillStyle = grad;
          cx.beginPath();
          cx.arc(px, py, r, 0, Math.PI * 2);
          cx.fill();
          // satellite bleeds
          for (let k = 0; k < 2; k++) {
            const angle = Math.random() * Math.PI * 2;
            const d     = Math.random() * r * 0.8;
            const r2    = r * 0.6;
            const g2    = cx.createRadialGradient(
              px + Math.cos(angle)*d, py + Math.sin(angle)*d, 0,
              px + Math.cos(angle)*d, py + Math.sin(angle)*d, r2,
            );
            g2.addColorStop(0,   colorAlpha(currentColor, 0.12));
            g2.addColorStop(1,   colorAlpha(currentColor, 0.00));
            cx.fillStyle = g2;
            cx.beginPath();
            cx.arc(px + Math.cos(angle)*d, py + Math.sin(angle)*d, r2, 0, Math.PI * 2);
            cx.fill();
          }
        }
        break;
      }
      case TOOLS.POSTER: {
        cx.strokeStyle = currentColor;
        cx.lineWidth   = currentSize * 2.5;
        cx.lineCap     = 'round';
        cx.lineJoin    = 'round';
        cx.globalAlpha = 1;
        cx.beginPath();
        cx.moveTo(from.x, from.y);
        cx.lineTo(to.x, to.y);
        cx.stroke();
        break;
      }
      case TOOLS.OIL: {
        // base coat
        cx.strokeStyle = currentColor;
        cx.lineWidth   = currentSize * 2;
        cx.lineCap     = 'round';
        cx.globalAlpha = 0.85;
        cx.beginPath(); cx.moveTo(from.x, from.y); cx.lineTo(to.x, to.y); cx.stroke();
        // highlight (offset lighter)
        cx.strokeStyle = lighten(currentColor, 0.35);
        cx.lineWidth   = currentSize * 0.6;
        cx.globalAlpha = 0.5;
        cx.beginPath(); cx.moveTo(from.x-1, from.y-1); cx.lineTo(to.x-1, to.y-1); cx.stroke();
        // shadow
        cx.strokeStyle = darken(currentColor, 0.28);
        cx.lineWidth   = currentSize * 0.5;
        cx.globalAlpha = 0.4;
        cx.beginPath(); cx.moveTo(from.x+1, from.y+1); cx.lineTo(to.x+1, to.y+1); cx.stroke();
        cx.globalAlpha = 1;
        break;
      }
      default: break;
    }
  }

  /* ── flood fill ──────────────────────────────── */
  function floodFill(cx, canvas, startX, startY, fillColor) {
    startX = Math.round(startX); startY = Math.round(startY);
    const imgData = cx.getImageData(0, 0, canvas.width, canvas.height);
    const data    = imgData.data;
    const w       = canvas.width;
    const h       = canvas.height;

    function idx(x, y) { return (y * w + x) * 4; }
    const si = idx(startX, startY);
    const [sr, sg, sb, sa] = [data[si], data[si+1], data[si+2], data[si+3]];

    const fc = hexToRgba(fillColor);
    if (sr === fc.r && sg === fc.g && sb === fc.b) return;

    const TOLERANCE = 28;
    function matches(i) {
      return (
        Math.abs(data[i]   - sr) <= TOLERANCE &&
        Math.abs(data[i+1] - sg) <= TOLERANCE &&
        Math.abs(data[i+2] - sb) <= TOLERANCE &&
        Math.abs(data[i+3] - sa) <= TOLERANCE
      );
    }

    // Scanline fill
    const visited = new Uint8Array(w * h);
    const queue   = [];
    queue.push([startX, startY]);

    while (queue.length) {
      let [x, y] = queue.pop();
      if (x < 0 || x >= w || y < 0 || y >= h) continue;
      if (visited[y * w + x]) continue;

      let left = x, right = x;
      while (left  > 0    && !visited[y * w + (left-1)]  && matches(idx(left-1,  y))) left--;
      while (right < w-1  && !visited[y * w + (right+1)] && matches(idx(right+1, y))) right++;

      for (let cx2 = left; cx2 <= right; cx2++) {
        const i2 = idx(cx2, y);
        if (!visited[y * w + cx2] && matches(i2)) {
          data[i2]   = fc.r;
          data[i2+1] = fc.g;
          data[i2+2] = fc.b;
          data[i2+3] = 255;
          visited[y * w + cx2] = 1;
        }
      }
      // enqueue adjacent rows
      for (let cx2 = left; cx2 <= right; cx2++) {
        if (y > 0   && !visited[(y-1) * w + cx2] && matches(idx(cx2, y-1))) queue.push([cx2, y-1]);
        if (y < h-1 && !visited[(y+1) * w + cx2] && matches(idx(cx2, y+1))) queue.push([cx2, y+1]);
      }
    }
    cx.putImageData(imgData, 0, 0);
  }

  /* ── event handlers ──────────────────────────── */
  function onStart(e) {
    if (!enabled) return;
    e.preventDefault();
    const pos = getPos(e);
    const cx  = getCtx();
    if (!cx) return;

    if (tool === TOOLS.FILL) {
      snapshot();
      floodFill(cx, getCanvas(), pos.x, pos.y, color);
      return;
    }

    snapshot();
    drawing.current = true;
    lastPos.current = pos;
    drawSegment(cx, pos, pos, tool, color, brushSize);
  }

  function onMove(e) {
    if (!drawing.current || !enabled) return;
    e.preventDefault();
    const pos = getPos(e);
    const cx  = getCtx();
    if (!cx) return;
    drawSegment(cx, lastPos.current, pos, tool, color, brushSize);
    lastPos.current = pos;
  }

  function onEnd(e) {
    e?.preventDefault();
    drawing.current = false;
    lastPos.current = null;
  }

  /* ── attach events ───────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener('pointerdown', onStart, { passive: false });
    canvas.addEventListener('pointermove', onMove,  { passive: false });
    canvas.addEventListener('pointerup',   onEnd,   { passive: false });
    canvas.addEventListener('pointerleave',onEnd,   { passive: false });
    return () => {
      canvas.removeEventListener('pointerdown', onStart);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup',   onEnd);
      canvas.removeEventListener('pointerleave',onEnd);
    };
  });                     // re-attach on every render so tool/color/size refs are fresh

  return { undo, redo, clearCanvas };
}

/* ── colour helpers ───────────────────────────── */
function hexToRgba(hex) {
  const c = hex.replace('#', '');
  const n = parseInt(c.length === 3
    ? c.split('').map(x => x+x).join('') : c, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function colorAlpha(hex, alpha) {
  const { r, g, b } = hexToRgba(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}
function lighten(hex, amount) {
  const { r, g, b } = hexToRgba(hex);
  return `rgb(${Math.min(255,r+Math.round(255*amount))},${Math.min(255,g+Math.round(255*amount))},${Math.min(255,b+Math.round(255*amount))})`;
}
function darken(hex, amount) {
  const { r, g, b } = hexToRgba(hex);
  return `rgb(${Math.max(0,r-Math.round(255*amount))},${Math.max(0,g-Math.round(255*amount))},${Math.max(0,b-Math.round(255*amount))})`;
}
