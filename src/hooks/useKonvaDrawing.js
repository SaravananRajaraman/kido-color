/**
 * hooks/useKonvaDrawing.js
 *
 * Konva-based drawing engine.
 *
 * Architecture
 * ───────────
 * The caller provides a `stageRef` (Konva.Stage) and named layer refs:
 *   - drawLayerRef  : user strokes (Konva.Layer)
 *   - fillLayerRef  : bucket fills (Konva.Layer, optional)
 *   - bgLayerRef    : background / outline (Konva.Layer, optional, read-only)
 *
 * Drawing is performed directly on each layer's underlying <canvas> via
 * `layer.getCanvas().getElement()`.  Konva handles DOM layout, pixel-ratio
 * scaling and RAF-batched redraws via `layer.batchDraw()`.
 *
 * Supported tools
 * ───────────────
 *   pencil  – thin clean round stroke
 *   sketch  – hatched square stroke
 *   crayon  – textured scattered dots
 *   water   – radial gradient bleed
 *   poster  – thick opaque flat stroke
 *   oil     – base + highlight + shadow layers
 *   fill    – scanline flood-fill with dilation
 *   eraser  – destination-out composite on draw layer
 *
 * Undo / redo
 * ───────────
 * Each pointer-down snapshots the draw + fill layer pixels into a 25-
 * frame ImageData stack. Undo/redo restores both layers atomically.
 */
import { useRef, useState, useEffect, useCallback } from 'react';
import { TOOLS } from '../context/AppContext.jsx';
import { hexToRgba, colorAlpha, lighten, darken } from '../utils/colorUtils.js';

const UNDO_LIMIT = 25;

export function useKonvaDrawing({
  stageRef,
  drawLayerRef,
  fillLayerRef,
  bgLayerRef,
  tool,
  color,
  brushSize,
  enabled = true,
}) {
  const undoStack  = useRef([]);
  const redoStack  = useRef([]);
  const drawing    = useRef(false);
  const lastPos    = useRef(null);
  const [isFilling, setIsFilling] = useState(false);

  // Mutable refs so event handlers always read the latest values.
  const toolRef      = useRef(tool);
  const colorRef     = useRef(color);
  const sizeRef      = useRef(brushSize);
  const enabledRef   = useRef(enabled);

  useEffect(() => { toolRef.current    = tool;      }, [tool]);
  useEffect(() => { colorRef.current   = color;     }, [color]);
  useEffect(() => { sizeRef.current    = brushSize; }, [brushSize]);
  useEffect(() => { enabledRef.current = enabled;   }, [enabled]);

  /* ── layer canvas helpers ──────────────────────── */
  function getDrawCanvas()  { return drawLayerRef?.current?.getCanvas?.()?.getElement?.() ?? null; }
  function getFillCanvas()  { return fillLayerRef?.current?.getCanvas?.()?.getElement?.() ?? null; }
  function getBgCanvas()    { return bgLayerRef?.current?.getCanvas?.()?.getElement?.() ?? null; }
  function getDrawCtx()     { return getDrawCanvas()?.getContext('2d') ?? null; }


  function batchDraw() {
    drawLayerRef?.current?.batchDraw();
    fillLayerRef?.current?.batchDraw();
  }

  /* ── snapshot ──────────────────────────────────── */
  function snapshot() {
    const dc = getDrawCanvas();
    if (!dc) return;
    const entry = { draw: dc.getContext('2d').getImageData(0, 0, dc.width, dc.height) };
    const fc = getFillCanvas();
    if (fc) entry.fill = fc.getContext('2d').getImageData(0, 0, fc.width, fc.height);
    undoStack.current.push(entry);
    if (undoStack.current.length > UNDO_LIMIT) undoStack.current.shift();
    redoStack.current = [];
  }

  const undo = useCallback(() => {
    if (!undoStack.current.length) return;
    const dc = getDrawCanvas(); const dcx = getDrawCtx();
    if (!dc || !dcx) return;
    const current = { draw: dcx.getImageData(0, 0, dc.width, dc.height) };
    const fc = getFillCanvas();
    if (fc) current.fill = fc.getContext('2d').getImageData(0, 0, fc.width, fc.height);
    redoStack.current.push(current);
    const prev = undoStack.current.pop();
    dcx.putImageData(prev.draw, 0, 0);
    if (fc && prev.fill) fc.getContext('2d').putImageData(prev.fill, 0, 0);
    batchDraw();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawLayerRef, fillLayerRef]);

  const redo = useCallback(() => {
    if (!redoStack.current.length) return;
    const dc = getDrawCanvas(); const dcx = getDrawCtx();
    if (!dc || !dcx) return;
    const current = { draw: dcx.getImageData(0, 0, dc.width, dc.height) };
    const fc = getFillCanvas();
    if (fc) current.fill = fc.getContext('2d').getImageData(0, 0, fc.width, fc.height);
    undoStack.current.push(current);
    const next = redoStack.current.pop();
    dcx.putImageData(next.draw, 0, 0);
    if (fc && next.fill) fc.getContext('2d').putImageData(next.fill, 0, 0);
    batchDraw();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawLayerRef, fillLayerRef]);

  const clearCanvas = useCallback((fillWhite = true) => {
    const dc = getDrawCanvas(); const dcx = getDrawCtx();
    if (!dc || !dcx) return;
    snapshot();
    dcx.clearRect(0, 0, dc.width, dc.height);
    if (fillWhite) {
      dcx.fillStyle = '#ffffff';
      dcx.fillRect(0, 0, dc.width, dc.height);
    }
    const fc = getFillCanvas();
    if (fc) fc.getContext('2d').clearRect(0, 0, fc.width, fc.height);
    batchDraw();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawLayerRef, fillLayerRef]);

  /* ── pointer position ──────────────────────────── */
  function getPos() {
    const stage = stageRef?.current;
    if (!stage) return { x: 0, y: 0 };
    // Use Konva's pointer position so scaling / offset are handled.
    const pos = stage.getPointerPosition();
    return pos ?? { x: 0, y: 0 };
  }

  /* ── draw segment ──────────────────────────────── */
  function drawSegment(cx, from, to, t, c, size) {
    if (t === TOOLS.ERASER) {
      cx.save();
      cx.globalCompositeOperation = 'destination-out';
      cx.strokeStyle = 'rgba(0,0,0,1)';
      cx.lineWidth   = size * 4;
      cx.lineCap     = 'round';
      cx.lineJoin    = 'round';
      cx.beginPath();
      cx.moveTo(from.x, from.y);
      cx.lineTo(to.x, to.y);
      cx.stroke();
      cx.restore();
      return;
    }

    cx.save();
    cx.globalCompositeOperation = 'source-over';

    switch (t) {
      case TOOLS.PENCIL:
        cx.strokeStyle = c;
        cx.lineWidth   = size;
        cx.lineCap     = 'round';
        cx.lineJoin    = 'round';
        cx.globalAlpha = 0.92;
        cx.beginPath(); cx.moveTo(from.x, from.y); cx.lineTo(to.x, to.y); cx.stroke();
        break;

      case TOOLS.SKETCH:
        cx.lineWidth   = size * 1.4;
        cx.lineCap     = 'square';
        cx.lineJoin    = 'bevel';
        cx.globalAlpha = 0.80;
        for (let i = 0; i < 3; i++) {
          const off = (i - 1) * (size * 0.5);
          cx.strokeStyle = c;
          cx.beginPath();
          cx.moveTo(from.x + off, from.y + off);
          cx.lineTo(to.x   + off, to.y   + off);
          cx.stroke();
        }
        break;

      case TOOLS.CRAYON: {
        const dist  = Math.hypot(to.x - from.x, to.y - from.y);
        const steps = Math.max(1, Math.ceil(dist / 2));
        for (let i = 0; i <= steps; i++) {
          const tt = steps ? i / steps : 0;
          const px = from.x + (to.x - from.x) * tt;
          const py = from.y + (to.y - from.y) * tt;
          for (let j = 0; j < 6; j++) {
            const angle = Math.random() * Math.PI * 2;
            const r     = Math.random() * size * 1.8;
            cx.fillStyle   = c;
            cx.globalAlpha = 0.35 + Math.random() * 0.35;
            cx.beginPath();
            cx.arc(
              px + Math.cos(angle) * r,
              py + Math.sin(angle) * r,
              Math.random() * size * 0.8 + 0.5, 0, Math.PI * 2,
            );
            cx.fill();
          }
        }
        break;
      }

      case TOOLS.WATER: {
        const dist  = Math.hypot(to.x - from.x, to.y - from.y);
        const steps = Math.max(1, Math.ceil(dist / 4));
        for (let i = 0; i <= steps; i++) {
          const tt = steps ? i / steps : 0;
          const px = from.x + (to.x - from.x) * tt;
          const py = from.y + (to.y - from.y) * tt;
          const r  = size * 3;
          const g  = cx.createRadialGradient(px, py, 0, px, py, r);
          g.addColorStop(0,   colorAlpha(c, 0.22));
          g.addColorStop(0.5, colorAlpha(c, 0.10));
          g.addColorStop(1,   colorAlpha(c, 0.00));
          cx.fillStyle = g;
          cx.beginPath(); cx.arc(px, py, r, 0, Math.PI * 2); cx.fill();
          for (let k = 0; k < 2; k++) {
            const angle = Math.random() * Math.PI * 2;
            const d     = Math.random() * r * 0.8;
            const r2    = r * 0.6;
            const g2    = cx.createRadialGradient(
              px + Math.cos(angle)*d, py + Math.sin(angle)*d, 0,
              px + Math.cos(angle)*d, py + Math.sin(angle)*d, r2,
            );
            g2.addColorStop(0, colorAlpha(c, 0.12));
            g2.addColorStop(1, colorAlpha(c, 0.00));
            cx.fillStyle = g2;
            cx.beginPath();
            cx.arc(px + Math.cos(angle)*d, py + Math.sin(angle)*d, r2, 0, Math.PI * 2);
            cx.fill();
          }
        }
        break;
      }

      case TOOLS.POSTER:
        cx.strokeStyle = c;
        cx.lineWidth   = size * 2.5;
        cx.lineCap     = 'round';
        cx.lineJoin    = 'round';
        cx.beginPath(); cx.moveTo(from.x, from.y); cx.lineTo(to.x, to.y); cx.stroke();
        break;

      case TOOLS.OIL:
        cx.strokeStyle = c;
        cx.lineWidth   = size * 2;
        cx.lineCap     = 'round';
        cx.globalAlpha = 0.85;
        cx.beginPath(); cx.moveTo(from.x, from.y); cx.lineTo(to.x, to.y); cx.stroke();
        cx.strokeStyle = lighten(c, 0.35);
        cx.lineWidth   = size * 0.6;
        cx.globalAlpha = 0.5;
        cx.beginPath(); cx.moveTo(from.x-1, from.y-1); cx.lineTo(to.x-1, to.y-1); cx.stroke();
        cx.strokeStyle = darken(c, 0.28);
        cx.lineWidth   = size * 0.5;
        cx.globalAlpha = 0.4;
        cx.beginPath(); cx.moveTo(from.x+1, from.y+1); cx.lineTo(to.x+1, to.y+1); cx.stroke();
        break;

      default: break;
    }
    cx.restore();
  }

  /* ── flood fill ────────────────────────────────── */
  /**
   * Scanline flood fill with 1-pixel dilation to seal anti-aliased edges.
   *
   * `sampleCanvas` / `sampleCtx`: where to READ the seed colour from
   *   (usually the composited bg+outline canvas).
   * `targetCtx`   / `targetCanvas`: where to WRITE the fill colour.
   */
  function floodFill(targetCtx, targetCanvas, startX, startY, fillColor, sampleCtx, sampleCanvas) {
    startX = Math.max(0, Math.min(targetCanvas.width  - 1, Math.round(startX)));
    startY = Math.max(0, Math.min(targetCanvas.height - 1, Math.round(startY)));

    const srcCtx    = sampleCtx    ?? targetCtx;
    const srcCanvas = sampleCanvas ?? targetCanvas;

    const srcData = srcCtx.getImageData(0, 0, srcCanvas.width, srcCanvas.height).data;
    const imgData = targetCtx.getImageData(0, 0, targetCanvas.width, targetCanvas.height);
    const data    = imgData.data;
    const w       = targetCanvas.width;
    const h       = targetCanvas.height;
    const sw      = srcCanvas.width;

    const si = (startY * sw + startX) * 4;
    const [sr, sg, sb, sa] = [srcData[si], srcData[si+1], srcData[si+2], srcData[si+3]];

    const fc  = hexToRgba(fillColor);
    const di  = (startY * w + startX) * 4;
    if (data[di] === fc.r && data[di+1] === fc.g && data[di+2] === fc.b && data[di+3] === 255) return;

    const TOLERANCE = 40;
    function matches(x, y) {
      const i = (y * sw + x) * 4;
      return (
        Math.abs(srcData[i]   - sr) <= TOLERANCE &&
        Math.abs(srcData[i+1] - sg) <= TOLERANCE &&
        Math.abs(srcData[i+2] - sb) <= TOLERANCE &&
        Math.abs(srcData[i+3] - sa) <= TOLERANCE
      );
    }

    const visited = new Uint8Array(w * h);
    const queue   = [[startX, startY]];

    while (queue.length) {
      const [x, y] = queue.pop();
      if (x < 0 || x >= w || y < 0 || y >= h) continue;
      if (visited[y * w + x]) continue;

      let left = x, right = x;
      while (left  > 0   && !visited[y * w + (left -1)] && matches(left -1, y)) left--;
      while (right < w-1 && !visited[y * w + (right+1)] && matches(right+1, y)) right++;

      for (let cx2 = left; cx2 <= right; cx2++) {
        if (!visited[y * w + cx2] && matches(cx2, y)) {
          const i2 = (y * w + cx2) * 4;
          data[i2]   = fc.r;
          data[i2+1] = fc.g;
          data[i2+2] = fc.b;
          data[i2+3] = 255;
          visited[y * w + cx2] = 1;
        }
      }
      for (let cx2 = left; cx2 <= right; cx2++) {
        if (y > 0   && !visited[(y-1) * w + cx2] && matches(cx2, y-1)) queue.push([cx2, y-1]);
        if (y < h-1 && !visited[(y+1) * w + cx2] && matches(cx2, y+1)) queue.push([cx2, y+1]);
      }
    }

    // 1-pixel dilation: seal anti-aliased edge fringe
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        if (visited[y * w + x]) continue;
        if (
          visited[y * w + (x-1)] || visited[y * w + (x+1)] ||
          visited[(y-1) * w + x] || visited[(y+1) * w + x]
        ) {
          const i = (y * w + x) * 4;
          if (data[i+3] < 200 || (data[i] > 200 && data[i+1] > 200 && data[i+2] > 200)) {
            data[i]   = fc.r;
            data[i+1] = fc.g;
            data[i+2] = fc.b;
            data[i+3] = 255;
          }
        }
      }
    }

    targetCtx.putImageData(imgData, 0, 0);
  }

  /* ── event handlers ────────────────────────────── */
  const handlePointerDown = useCallback((konvaEvent) => {
    if (!enabledRef.current) return;
    konvaEvent.evt.preventDefault();

    const pos = getPos(konvaEvent);

    if (toolRef.current === TOOLS.FILL) {
      const fc  = getFillCanvas();
      const dc  = getDrawCanvas();
      const bg  = getBgCanvas();
      const target    = fc ?? dc;
      if (!target) return;
      const targetCtx = target.getContext('2d');

      // Sample colour from the bg (outline) layer when available; fall back
      // to the draw layer so fill works in free-draw mode too.
      const sampleCanvas = bg ?? dc ?? target;
      const sampleCtx    = sampleCanvas.getContext('2d');

      snapshot();
      setIsFilling(true);
      setTimeout(() => {
        floodFill(targetCtx, target, pos.x, pos.y, colorRef.current, sampleCtx, sampleCanvas);
        fillLayerRef?.current?.batchDraw();
        drawLayerRef?.current?.batchDraw();
        setIsFilling(false);
      }, 0);
      return;
    }

    const dc = getDrawCanvas();
    const cx = getDrawCtx();
    if (!dc || !cx) return;
    snapshot();
    drawing.current  = true;
    lastPos.current  = pos;
    drawSegment(cx, pos, pos, toolRef.current, colorRef.current, sizeRef.current);
    drawLayerRef?.current?.batchDraw();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageRef, drawLayerRef, fillLayerRef, bgLayerRef]);

  const handlePointerMove = useCallback((konvaEvent) => {
    if (!drawing.current || !enabledRef.current) return;
    konvaEvent.evt.preventDefault();
    const pos = getPos(konvaEvent);
    const cx  = getDrawCtx();
    if (!cx) return;
    drawSegment(cx, lastPos.current, pos, toolRef.current, colorRef.current, sizeRef.current);
    lastPos.current = pos;
    drawLayerRef?.current?.batchDraw();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageRef, drawLayerRef]);

  const handlePointerUp = useCallback(() => {
    drawing.current = false;
    lastPos.current = null;
  }, []);

  return {
    isFilling,
    undo,
    redo,
    clearCanvas,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}
