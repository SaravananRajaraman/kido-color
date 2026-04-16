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
 *   fill      – scanline flood-fill with tolerance + dilation
 *   eraser    – white stroke
 *
 * Undo/redo: 25-frame ImageData stack.
 *
 * Optional `fillCanvasRef`: when provided, bucket-fill operations are
 * painted onto this separate canvas layer instead of the main draw
 * canvas so that strokes and fills can be cleared independently.
 */
import { useEffect, useRef, useState } from 'react';
import { TOOLS } from '../context/AppContext.jsx';
import { hexToRgba, colorAlpha, lighten, darken } from '../utils/colorUtils.js';

const UNDO_LIMIT = 25;

export function useDrawing({ canvasRef, fillCanvasRef, outlineCanvasRef, tool, color, brushSize, enabled = true }) {
  const undoStack = useRef([]);
  const redoStack = useRef([]);
  const drawing   = useRef(false);
  const lastPos   = useRef(null);
  const ctx       = useRef(null);
  const [isFilling, setIsFilling] = useState(false);

  // Keep mutable refs for tool/color/brushSize so stable event handlers
  // always read the latest values without needing re-registration.
  const toolRef              = useRef(tool);
  const colorRef             = useRef(color);
  const brushSizeRef         = useRef(brushSize);
  const enabledRef           = useRef(enabled);
  const fillCanvasRefMut     = useRef(fillCanvasRef);
  const outlineCanvasRefMut  = useRef(outlineCanvasRef);
  useEffect(() => { toolRef.current             = tool;             }, [tool]);
  useEffect(() => { colorRef.current            = color;            }, [color]);
  useEffect(() => { brushSizeRef.current        = brushSize;        }, [brushSize]);
  useEffect(() => { enabledRef.current          = enabled;          }, [enabled]);
  useEffect(() => { fillCanvasRefMut.current    = fillCanvasRef;    }, [fillCanvasRef]);
  useEffect(() => { outlineCanvasRefMut.current = outlineCanvasRef; }, [outlineCanvasRef]);

  /* ── helpers ─────────────────────────────────── */
  function getCanvas() { return canvasRef.current; }
  function getFillCanvas() { return fillCanvasRefMut.current?.current ?? null; }
  function getCtx()    {
    if (ctx.current) return ctx.current;
    const c = getCanvas();
    if (!c) return null;
    ctx.current = c.getContext('2d');
    return ctx.current;
  }
  function getOutlineCanvas() { return outlineCanvasRefMut.current?.current ?? null; }

  function snapshot() {
    const c = getCanvas();
    if (!c) return;
    const entry = { draw: getCtx().getImageData(0, 0, c.width, c.height) };
    const fc = getFillCanvas();
    if (fc) entry.fill = fc.getContext('2d').getImageData(0, 0, fc.width, fc.height);
    undoStack.current.push(entry);
    if (undoStack.current.length > UNDO_LIMIT) undoStack.current.shift();
    redoStack.current = [];
  }

  function undo() {
    if (!undoStack.current.length) return;
    const c = getCanvas();
    const cx = getCtx();
    if (!c || !cx) return;
    const current = { draw: cx.getImageData(0, 0, c.width, c.height) };
    const fc = getFillCanvas();
    if (fc) current.fill = fc.getContext('2d').getImageData(0, 0, fc.width, fc.height);
    redoStack.current.push(current);
    const prev = undoStack.current.pop();
    cx.putImageData(prev.draw, 0, 0);
    if (fc && prev.fill) fc.getContext('2d').putImageData(prev.fill, 0, 0);
  }

  function redo() {
    if (!redoStack.current.length) return;
    const c = getCanvas();
    const cx = getCtx();
    if (!c || !cx) return;
    const current = { draw: cx.getImageData(0, 0, c.width, c.height) };
    const fc = getFillCanvas();
    if (fc) current.fill = fc.getContext('2d').getImageData(0, 0, fc.width, fc.height);
    undoStack.current.push(current);
    const next = redoStack.current.pop();
    cx.putImageData(next.draw, 0, 0);
    if (fc && next.fill) fc.getContext('2d').putImageData(next.fill, 0, 0);
  }

  function clearCanvas(fillWhite = true) {
    const c  = getCanvas();
    const cx = getCtx();
    if (!c || !cx) return;
    snapshot();
    cx.clearRect(0, 0, c.width, c.height);
    if (fillWhite) {
      cx.fillStyle = '#ffffff';
      cx.fillRect(0, 0, c.width, c.height);
    }
    const fc = getFillCanvas();
    if (fc) fc.getContext('2d').clearRect(0, 0, fc.width, fc.height);
  }

  function clearFillLayer() {
    const fc = getFillCanvas();
    if (!fc) return;
    snapshot();
    fc.getContext('2d').clearRect(0, 0, fc.width, fc.height);
  }

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
  /**
   * Flood-fill `canvas` (via `cx`) starting from (startX, startY).
   * When `sampleCanvas` is provided the seed colour is sampled from
   * it instead — useful when painting the fill onto a separate layer
   * while the outline lives on the draw canvas.
   */
  function floodFill(cx, canvas, startX, startY, fillColor, sampleCtx, sampleCanvas) {
    startX = Math.round(startX); startY = Math.round(startY);

    // Sample source for the seed colour (may differ from the paint target)
    const srcCtx    = sampleCtx    ?? cx;
    const srcCanvas = sampleCanvas ?? canvas;
    const srcData   = srcCtx.getImageData(0, 0, srcCanvas.width, srcCanvas.height).data;
    const sw = srcCanvas.width;

    const imgData = cx.getImageData(0, 0, canvas.width, canvas.height);
    const data    = imgData.data;
    const w       = canvas.width;
    const h       = canvas.height;

    function idx(x, y)    { return (y * w  + x) * 4; }
    function srcIdx(x, y) { return (y * sw + x) * 4; }

    // Clamp start coords to valid range
    startX = Math.max(0, Math.min(w - 1, startX));
    startY = Math.max(0, Math.min(h - 1, startY));

    const si = srcIdx(startX, startY);
    const [sr, sg, sb, sa] = [srcData[si], srcData[si+1], srcData[si+2], srcData[si+3]];

    const fc = hexToRgba(fillColor);
    // If clicking on the fill canvas itself, also guard against re-filling same colour
    const di = idx(startX, startY);
    if (data[di] === fc.r && data[di+1] === fc.g && data[di+2] === fc.b && data[di+3] === 255) return;

    // Raised tolerance (was 28) to handle anti-aliased SVG outline edges
    const TOLERANCE = 40;
    function matches(x, y) {
      const i = srcIdx(x, y);
      return (
        Math.abs(srcData[i]   - sr) <= TOLERANCE &&
        Math.abs(srcData[i+1] - sg) <= TOLERANCE &&
        Math.abs(srcData[i+2] - sb) <= TOLERANCE &&
        Math.abs(srcData[i+3] - sa) <= TOLERANCE
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
      while (left  > 0    && !visited[y * w + (left-1)]  && matches(left-1,  y)) left--;
      while (right < w-1  && !visited[y * w + (right+1)] && matches(right+1, y)) right++;

      for (let cx2 = left; cx2 <= right; cx2++) {
        const i2 = idx(cx2, y);
        if (!visited[y * w + cx2] && matches(cx2, y)) {
          data[i2]   = fc.r;
          data[i2+1] = fc.g;
          data[i2+2] = fc.b;
          data[i2+3] = 255;
          visited[y * w + cx2] = 1;
        }
      }
      // enqueue adjacent rows
      for (let cx2 = left; cx2 <= right; cx2++) {
        if (y > 0   && !visited[(y-1) * w + cx2] && matches(cx2, y-1)) queue.push([cx2, y-1]);
        if (y < h-1 && !visited[(y+1) * w + cx2] && matches(cx2, y+1)) queue.push([cx2, y+1]);
      }
    }

    // 1-pixel dilation pass: fill any remaining anti-aliased border pixels
    // adjacent to newly-filled cells so there are no fringe gaps.
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        if (visited[y * w + x]) continue;
        if (
          visited[y * w + (x-1)] ||
          visited[y * w + (x+1)] ||
          visited[(y-1) * w + x] ||
          visited[(y+1) * w + x]
        ) {
          const i = idx(x, y);
          // Only overwrite semi-transparent / near-white border pixels
          if (data[i+3] < 200 || (data[i] > 200 && data[i+1] > 200 && data[i+2] > 200)) {
            data[i]   = fc.r;
            data[i+1] = fc.g;
            data[i+2] = fc.b;
            data[i+3] = 255;
          }
        }
      }
    }

    cx.putImageData(imgData, 0, 0);
  }

  /* ── event handlers ──────────────────────────── */
  function onStart(e) {
    if (!enabledRef.current) return;
    e.preventDefault();
    const pos = getPos(e);

    if (toolRef.current === TOOLS.FILL) {
      const fc  = getFillCanvas();
      const oc  = getOutlineCanvas();
      const target    = fc ?? getCanvas();
      const targetCtx = target.getContext('2d');

      // Prefer the outline canvas (SVG layer) as the pixel-sample source so
      // the flood-fill reads actual shape boundaries rather than an empty canvas.
      let sampleCtx    = null;
      let sampleCanvas = null;
      if (oc) {
        sampleCtx    = oc.getContext('2d');
        sampleCanvas = oc;
      } else if (fc) {
        sampleCtx    = getCtx();
        sampleCanvas = getCanvas();
      }

      snapshot();
      setIsFilling(true);
      setTimeout(() => {
        floodFill(targetCtx, target, pos.x, pos.y, colorRef.current, sampleCtx, sampleCanvas);
        setIsFilling(false);
      }, 0);
      return;
    }

    const cx = getCtx();
    if (!cx) return;
    snapshot();
    drawing.current = true;
    lastPos.current = pos;
    drawSegment(cx, pos, pos, toolRef.current, colorRef.current, brushSizeRef.current);
  }

  function onMove(e) {
    if (!drawing.current || !enabledRef.current) return;
    e.preventDefault();
    const pos = getPos(e);
    const cx  = getCtx();
    if (!cx) return;
    drawSegment(cx, lastPos.current, pos, toolRef.current, colorRef.current, brushSizeRef.current);
    lastPos.current = pos;
  }

  function onEnd(e) {
    e?.preventDefault();
    drawing.current = false;
    lastPos.current = null;
  }

  /* ── attach events ───────────────────────────── */
  // Handlers read tool/color/brushSize via refs so the listeners only need
  // to be registered once per canvas instance, not on every render.
  // Refs are updated via useLayoutEffect (not during render) to satisfy
  // the react-hooks/refs lint rule.
  const onStartRef = useRef(onStart);
  const onMoveRef  = useRef(onMove);
  const onEndRef   = useRef(onEnd);

  useEffect(() => {
    onStartRef.current = onStart;
    onMoveRef.current  = onMove;
    onEndRef.current   = onEnd;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const start = e => onStartRef.current(e);
    const move  = e => onMoveRef.current(e);
    const end   = e => onEndRef.current(e);
    canvas.addEventListener('pointerdown', start, { passive: false });
    canvas.addEventListener('pointermove', move,  { passive: false });
    canvas.addEventListener('pointerup',   end,   { passive: false });
    canvas.addEventListener('pointerleave',end,   { passive: false });
    return () => {
      canvas.removeEventListener('pointerdown', start);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup',   end);
      canvas.removeEventListener('pointerleave',end);
    };
  }, [canvasRef]); // only re-attach when the canvas element changes

  return { undo, redo, clearCanvas, clearFillLayer, isFilling };
}

/* ── colour helpers are in ../utils/colorUtils.js ── */
