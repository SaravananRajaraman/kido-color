/**
 * drawing.js — Kido Color Drawing Engine
 *
 * Provides all drawing tools (pencil, sketch pen, crayon, watercolor,
 * poster color, oil paint, eraser, bucket fill) and undo support.
 * Works with both mouse and touch events.
 *
 * Exposed as window.DrawingEngine (singleton factory).
 */

window.DrawingEngine = (function () {
  'use strict';

  // ── Private helpers ──────────────────────────────────────────────────────

  function hexToRgb(hex) {
    const n = hex.replace('#', '');
    return {
      r: parseInt(n.slice(0, 2), 16),
      g: parseInt(n.slice(2, 4), 16),
      b: parseInt(n.slice(4, 6), 16),
    };
  }

  function hexToRGBA(hex, alpha) {
    const { r, g, b } = hexToRgb(hex);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  function lighten(hex, amt) {
    const { r, g, b } = hexToRgb(hex);
    return 'rgb(' + clamp(r + amt, 0, 255) + ',' + clamp(g + amt, 0, 255) + ',' + clamp(b + amt, 0, 255) + ')';
  }

  function darken(hex, amt) {
    return lighten(hex, -amt);
  }

  // ── Factory ──────────────────────────────────────────────────────────────

  /**
   * create(canvasEl, [onStrokeEnd])
   * Returns an engine instance bound to the given <canvas>.
   */
  function create(canvasEl, onStrokeEnd) {

    var canvas  = canvasEl;
    var ctx     = canvas.getContext('2d', { willReadFrequently: true });
    var drawing = false;
    var lastX   = 0;
    var lastY   = 0;

    var tool  = 'pencil';
    var color = '#FF0000';
    var size  = 8;

    var undoStack   = [];
    var MAX_UNDO    = 20;

    // ── Canvas sizing ────────────────────────────────────────────────────

    function resize() {
      var rect = canvas.getBoundingClientRect();
      var w = Math.round(rect.width)  || 800;
      var h = Math.round(rect.height) || 600;
      if (canvas.width === w && canvas.height === h) return;
      // Preserve existing content
      var saved = null;
      try { saved = ctx.getImageData(0, 0, canvas.width, canvas.height); } catch (e) { /* ignore */ }
      canvas.width  = w;
      canvas.height = h;
      fillWhite();
      if (saved) ctx.putImageData(saved, 0, 0);
    }

    function fillWhite() {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }

    // ── Event helpers ────────────────────────────────────────────────────

    function getPos(clientX, clientY) {
      var rect  = canvas.getBoundingClientRect();
      return {
        x: (clientX - rect.left) * (canvas.width  / rect.width),
        y: (clientY - rect.top)  * (canvas.height / rect.height),
      };
    }

    function onDown(e) {
      var p = getPos(e.clientX, e.clientY);
      if (tool === 'bucket') {
        saveState();
        floodFill(Math.round(p.x), Math.round(p.y), color);
        if (onStrokeEnd) onStrokeEnd();
        return;
      }
      saveState();
      drawing = true;
      lastX = p.x;
      lastY = p.y;
      // Draw a dot at the start
      applyStroke(p.x, p.y, p.x, p.y);
    }

    function onMove(e) {
      if (!drawing) return;
      var p = getPos(e.clientX, e.clientY);
      applyStroke(lastX, lastY, p.x, p.y);
      lastX = p.x;
      lastY = p.y;
    }

    function onUp() {
      if (!drawing) return;
      drawing = false;
      ctx.beginPath(); // reset path so next stroke is independent
      if (onStrokeEnd) onStrokeEnd();
    }

    function touchDown(e) { e.preventDefault(); var t = e.touches[0]; onDown({ clientX: t.clientX, clientY: t.clientY }); }
    function touchMove(e) { e.preventDefault(); var t = e.touches[0]; onMove({ clientX: t.clientX, clientY: t.clientY }); }
    function touchUp(e)   { e.preventDefault(); onUp(); }

    canvas.addEventListener('mousedown',  onDown);
    canvas.addEventListener('mousemove',  onMove);
    canvas.addEventListener('mouseup',    onUp);
    canvas.addEventListener('mouseleave', onUp);
    canvas.addEventListener('touchstart', touchDown, { passive: false });
    canvas.addEventListener('touchmove',  touchMove, { passive: false });
    canvas.addEventListener('touchend',   touchUp,   { passive: false });

    // ── Stroke dispatcher ─────────────────────────────────────────────────

    function applyStroke(x1, y1, x2, y2) {
      switch (tool) {
        case 'pencil':     drawPencil(x1, y1, x2, y2);     break;
        case 'sketchpen':  drawSketchPen(x1, y1, x2, y2);  break;
        case 'crayon':     drawCrayon(x1, y1, x2, y2);     break;
        case 'watercolor': drawWatercolor(x1, y1, x2, y2); break;
        case 'postercolor':drawPosterColor(x1, y1, x2, y2);break;
        case 'oilpaint':   drawOilPaint(x1, y1, x2, y2);   break;
        case 'eraser':     drawEraser(x1, y1, x2, y2);     break;
      }
    }

    // ── Tool implementations ──────────────────────────────────────────────

    function drawPencil(x1, y1, x2, y2) {
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth   = size * 0.5 + 1;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    function drawSketchPen(x1, y1, x2, y2) {
      ctx.globalAlpha = 0.92;
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth   = size * 0.65 + 2;
      ctx.lineCap     = 'square';
      ctx.lineJoin    = 'bevel';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      // Faint parallel lines for the "sketch" feel
      ctx.globalAlpha = 0.18;
      ctx.lineWidth   = 1;
      for (var i = -1; i <= 1; i += 2) {
        var off = i * size * 0.28;
        ctx.beginPath();
        ctx.moveTo(x1 + off, y1 + off);
        ctx.lineTo(x2 + off, y2 + off);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    function drawCrayon(x1, y1, x2, y2) {
      var dx    = x2 - x1;
      var dy    = y2 - y1;
      var dist  = Math.sqrt(dx * dx + dy * dy);
      var steps = Math.max(1, Math.ceil(dist / 2));

      ctx.globalCompositeOperation = 'source-over';
      for (var i = 0; i <= steps; i++) {
        var t  = steps > 1 ? i / steps : 0;
        var cx = x1 + dx * t;
        var cy = y1 + dy * t;
        // Scattered waxy blobs
        for (var j = 0; j < 7; j++) {
          var angle  = Math.random() * Math.PI * 2;
          var radius = Math.random() * size * 0.55;
          var bw     = 1 + Math.random() * 2.5;
          var bh     = 1 + Math.random() * 2.5;
          ctx.globalAlpha  = 0.28 + Math.random() * 0.38;
          ctx.fillStyle    = color;
          ctx.fillRect(
            cx + Math.cos(angle) * radius - bw / 2,
            cy + Math.sin(angle) * radius - bh / 2,
            bw, bh
          );
        }
      }
      ctx.globalAlpha = 1;
    }

    function drawWatercolor(x1, y1, x2, y2) {
      var r = size * 2.2;
      ctx.globalCompositeOperation = 'source-over';

      // Central soft blot
      var g0 = ctx.createRadialGradient(x2, y2, 0, x2, y2, r);
      g0.addColorStop(0,   hexToRGBA(color, 0.38));
      g0.addColorStop(0.5, hexToRGBA(color, 0.18));
      g0.addColorStop(1,   hexToRGBA(color, 0));
      ctx.fillStyle = g0;
      ctx.beginPath();
      ctx.arc(x2, y2, r, 0, Math.PI * 2);
      ctx.fill();

      // 3 smaller satellite bleeds
      for (var i = 0; i < 3; i++) {
        var ang = Math.random() * Math.PI * 2;
        var br  = r * (0.28 + Math.random() * 0.28);
        var bx  = x2 + Math.cos(ang) * r * 0.35;
        var by  = y2 + Math.sin(ang) * r * 0.35;
        var g1  = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        g1.addColorStop(0, hexToRGBA(color, 0.14));
        g1.addColorStop(1, hexToRGBA(color, 0));
        ctx.fillStyle = g1;
        ctx.beginPath();
        ctx.arc(bx, by, br, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawPosterColor(x1, y1, x2, y2) {
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth   = size * 1.5 + 3;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    function drawOilPaint(x1, y1, x2, y2) {
      var lw  = size * 1.8 + 4;
      var off = lw * 0.12;

      ctx.globalCompositeOperation = 'source-over';

      // Base coat
      ctx.globalAlpha = 1;
      ctx.strokeStyle = color;
      ctx.lineWidth   = lw;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Highlight (lighter, shifted)
      ctx.globalAlpha = 0.38;
      ctx.strokeStyle = lighten(color, 60);
      ctx.lineWidth   = lw * 0.28;
      ctx.beginPath();
      ctx.moveTo(x1 - off, y1 - off);
      ctx.lineTo(x2 - off, y2 - off);
      ctx.stroke();

      // Shadow
      ctx.globalAlpha = 0.22;
      ctx.strokeStyle = darken(color, 45);
      ctx.lineWidth   = lw * 0.18;
      ctx.beginPath();
      ctx.moveTo(x1 + off, y1 + off);
      ctx.lineTo(x2 + off, y2 + off);
      ctx.stroke();

      ctx.globalAlpha = 1;
    }

    function drawEraser(x1, y1, x2, y2) {
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth   = size * 2 + 8;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // ── Bucket / flood fill (optimised scanline) ──────────────────────────

    function floodFill(startX, startY, fillHex) {
      var w = canvas.width;
      var h = canvas.height;
      if (startX < 0 || startX >= w || startY < 0 || startY >= h) return;

      var imageData = ctx.getImageData(0, 0, w, h);
      var px        = imageData.data;

      var si = (startY * w + startX) * 4;
      var tR = px[si], tG = px[si + 1], tB = px[si + 2];

      var fc = hexToRgb(fillHex);
      var fR = fc.r, fG = fc.g, fB = fc.b;

      if (tR === fR && tG === fG && tB === fB) return;

      var TOL = 28;

      function matches(idx) {
        return (
          Math.abs(px[idx]     - tR) <= TOL &&
          Math.abs(px[idx + 1] - tG) <= TOL &&
          Math.abs(px[idx + 2] - tB) <= TOL
        );
      }

      function paint(idx) {
        px[idx]     = fR;
        px[idx + 1] = fG;
        px[idx + 2] = fB;
        px[idx + 3] = 255;
      }

      var visited = new Uint8Array(w * h);
      var queue   = [[startX, startY]];

      while (queue.length > 0) {
        var pt = queue.pop();
        var qx = pt[0], qy = pt[1];

        if (qy < 0 || qy >= h) continue;

        // Scan left
        var lx = qx;
        while (lx > 0 && !visited[qy * w + (lx - 1)] && matches((qy * w + lx - 1) * 4)) lx--;

        // Scan right
        var rx = qx;
        while (rx < w - 1 && !visited[qy * w + (rx + 1)] && matches((qy * w + rx + 1) * 4)) rx++;

        var needAbove = false, needBelow = false;

        for (var ix = lx; ix <= rx; ix++) {
          var cell = qy * w + ix;
          if (!visited[cell] && matches(cell * 4)) {
            paint(cell * 4);
            visited[cell] = 1;

            if (qy > 0) {
              var aboveCell = (qy - 1) * w + ix;
              if (!visited[aboveCell] && matches(aboveCell * 4)) {
                if (!needAbove) { queue.push([ix, qy - 1]); needAbove = true; }
              } else { needAbove = false; }
            }

            if (qy < h - 1) {
              var belowCell = (qy + 1) * w + ix;
              if (!visited[belowCell] && matches(belowCell * 4)) {
                if (!needBelow) { queue.push([ix, qy + 1]); needBelow = true; }
              } else { needBelow = false; }
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    }

    // ── Undo ──────────────────────────────────────────────────────────────

    function saveState() {
      try {
        var snap = ctx.getImageData(0, 0, canvas.width, canvas.height);
        undoStack.push(snap);
        if (undoStack.length > MAX_UNDO) undoStack.shift();
      } catch (e) { /* cross-origin guard — ignore */ }
    }

    function undo() {
      if (undoStack.length === 0) return false;
      ctx.putImageData(undoStack.pop(), 0, 0);
      return true;
    }

    function clearUndoStack() { undoStack = []; }

    // ── Download ─────────────────────────────────────────────────────────

    function download(filename) {
      var a    = document.createElement('a');
      a.href   = canvas.toDataURL('image/png');
      a.download = filename || 'kido-color-art.png';
      a.click();
    }

    // ── Public API ────────────────────────────────────────────────────────

    return {
      canvas:    canvas,
      ctx:       ctx,
      resize:    resize,
      fillWhite: fillWhite,
      saveState: saveState,
      undo:      undo,
      clearUndoStack: clearUndoStack,
      download:  download,
      setTool:   function (t) { tool  = t; },
      setColor:  function (c) { color = c; },
      setSize:   function (s) { size  = parseInt(s, 10); },
      getTool:   function ()  { return tool;  },
      getColor:  function ()  { return color; },
      getSize:   function ()  { return size;  },
    };
  }

  return { create: create };

}());
