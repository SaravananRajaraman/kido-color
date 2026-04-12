/**
 * tracing.js — Kido Color: A–Z Tracing Mode
 *
 * Three tracing styles:
 *   • dotted  — letter outline drawn with a dashed stroke
 *   • arrows  — faint filled letter with start-arrow markers
 *   • faint   — very light grey fill; kids trace directly over it
 *
 * The tracing layer is drawn onto the canvas FIRST (bottom), then the
 * drawing engine lets kids paint on top.  After a stroke ends we check
 * coverage to decide when to show the celebration overlay.
 *
 * Exposed as window.TracingMode.
 */

window.TracingMode = (function () {
  'use strict';

  // ── State ─────────────────────────────────────────────────────────────────

  var engine     = null;
  var letter     = 'A';
  var style      = 'dotted';
  var onComplete = null; // callback fired when tracing is "complete enough"
  var completed  = false;

  // Snapshot of the guide layer so we can re-apply it after any repaint
  var guideSnap  = null;

  // ── Guide renderer ────────────────────────────────────────────────────────

  function render() {
    if (!engine) return;
    completed = false;

    var canvas = engine.canvas;
    var ctx    = engine.ctx;
    var w      = canvas.width;
    var h      = canvas.height;

    engine.fillWhite();
    engine.clearUndoStack();

    ctx.save();

    // Light paper background
    ctx.fillStyle = '#FAFAF8';
    ctx.fillRect(0, 0, w, h);

    // Horizontal guide lines (like lined paper)
    drawGuideLines(ctx, w, h);

    var fontSize = Math.min(w * 0.68, h * 0.56, 260);
    var cx       = w / 2;
    var cy       = h * 0.44;

    ctx.font         = '900 ' + fontSize + 'px "Arial Black", Arial, sans-serif';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';

    switch (style) {
      case 'dotted':  renderDotted(ctx, cx, cy, fontSize);  break;
      case 'arrows':  renderArrows(ctx, cx, cy, fontSize);  break;
      case 'faint':   renderFaint(ctx, cx, cy, fontSize);   break;
    }

    // Corner letter hint (light)
    ctx.font         = 'bold ' + Math.min(28, w * 0.05) + 'px "Arial Black", sans-serif';
    ctx.fillStyle    = 'rgba(0,0,0,0.10)';
    ctx.textAlign    = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(letter, w * 0.04, h * 0.04);

    // Instruction label
    var instructions = {
      dotted: '✏️  Trace over the dotted outline!',
      arrows: '➡️  Follow the arrows to write the letter!',
      faint:  '👻  Trace over the faint letter!',
    };
    ctx.font         = 'bold ' + Math.min(16, h * 0.030) + 'px Arial, sans-serif';
    ctx.fillStyle    = '#AAAAAA';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(instructions[style], w / 2, h * 0.94);

    ctx.restore();

    // Save the guide layer so coverage check has a baseline
    try {
      guideSnap = ctx.getImageData(0, 0, w, h);
    } catch (e) {
      guideSnap = null;
    }
  }

  // ── Lined-paper guide ─────────────────────────────────────────────────────

  function drawGuideLines(ctx, w, h) {
    var lineCount = 5;
    ctx.strokeStyle = 'rgba(173,216,230,0.55)';
    ctx.lineWidth   = 1;
    for (var i = 1; i <= lineCount; i++) {
      var y = h * (i / (lineCount + 1));
      ctx.beginPath();
      ctx.moveTo(20, y);
      ctx.lineTo(w - 20, y);
      ctx.stroke();
    }
  }

  // ── Dotted style ──────────────────────────────────────────────────────────

  function renderDotted(ctx, cx, cy, fontSize) {
    // Draw an off-screen clone to measure/trace the letter
    ctx.save();

    // First render a filled version in a temp layer to get the solid shape,
    // then re-draw as a dashed stroke outline
    ctx.strokeStyle = '#777777';
    ctx.lineWidth   = Math.max(3, fontSize * 0.024);
    ctx.lineJoin    = 'round';
    ctx.lineCap     = 'round';
    ctx.setLineDash([Math.max(6, fontSize * 0.032), Math.max(8, fontSize * 0.042)]);
    ctx.strokeText(letter, cx, cy);

    // Light fill so kids can see the shape
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(220,220,220,0.30)';
    ctx.fillText(letter, cx, cy);

    ctx.restore();
  }

  // ── Arrows style ─────────────────────────────────────────────────────────

  function renderArrows(ctx, cx, cy, fontSize) {
    ctx.save();

    // Very light filled letter
    ctx.fillStyle = 'rgba(180,180,180,0.22)';
    ctx.fillText(letter, cx, cy);

    // Solid light stroke
    ctx.strokeStyle = 'rgba(140,140,140,0.55)';
    ctx.lineWidth   = Math.max(2.5, fontSize * 0.018);
    ctx.lineJoin    = 'round';
    ctx.strokeText(letter, cx, cy);

    // Estimate the bounding box of the letter to place the start arrow
    var metrics  = ctx.measureText(letter);
    var lw       = metrics.width;
    var lh       = fontSize * 0.80;
    var startX   = cx - lw * 0.40;
    var startY   = cy - lh * 0.42;
    var arrowLen = Math.min(40, fontSize * 0.16);

    drawArrow(ctx, startX, startY, startX + arrowLen, startY + arrowLen * 0.5, fontSize);

    // "Start here" dot
    ctx.beginPath();
    ctx.arc(startX, startY, Math.max(5, fontSize * 0.025), 0, Math.PI * 2);
    ctx.fillStyle = '#4CAF50';
    ctx.fill();

    // Label
    var labelFont = Math.min(14, fontSize * 0.055);
    ctx.font      = 'bold ' + labelFont + 'px Arial, sans-serif';
    ctx.fillStyle = '#4CAF50';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('Start ▶', startX + arrowLen + 4, startY + arrowLen * 0.25);

    ctx.restore();
  }

  function drawArrow(ctx, x1, y1, x2, y2, fontSize) {
    var headLen = Math.max(8, fontSize * 0.038);
    var angle   = Math.atan2(y2 - y1, x2 - x1);

    ctx.save();
    ctx.strokeStyle = '#4CAF50';
    ctx.fillStyle   = '#4CAF50';
    ctx.lineWidth   = Math.max(2, fontSize * 0.012);
    ctx.lineCap     = 'round';

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Arrowhead
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headLen * Math.cos(angle - Math.PI / 6), y2 - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x2 - headLen * Math.cos(angle + Math.PI / 6), y2 - headLen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  // ── Faint style ───────────────────────────────────────────────────────────

  function renderFaint(ctx, cx, cy, fontSize) {
    ctx.save();

    // Barely visible fill
    ctx.fillStyle = 'rgba(180,180,180,0.20)';
    ctx.fillText(letter, cx, cy);

    // Very thin, semi-transparent outline
    ctx.strokeStyle = 'rgba(160,160,160,0.35)';
    ctx.lineWidth   = Math.max(2, fontSize * 0.016);
    ctx.lineJoin    = 'round';
    ctx.strokeText(letter, cx, cy);

    ctx.restore();
  }

  // ── Coverage check ────────────────────────────────────────────────────────
  /**
   * Samples a grid of points inside the letter's bounding box.
   * We consider tracing "done" when ≥ 45 % of non-white pixels differ
   * from the original guide snapshot (i.e. the kid has painted over them).
   */
  function checkCoverage() {
    if (completed || !guideSnap || !engine) return;

    var canvas    = engine.canvas;
    var ctx       = engine.ctx;
    var w         = canvas.width;
    var h         = canvas.height;

    try {
      var current = ctx.getImageData(0, 0, w, h);
    } catch (e) {
      return;
    }

    var cpx = current.data;
    var gpx = guideSnap.data;

    // Only sample the central 70 % × 60 % region where the letter lives
    var x0 = Math.round(w * 0.15), x1 = Math.round(w * 0.85);
    var y0 = Math.round(h * 0.12), y1 = Math.round(h * 0.76);

    var total   = 0;
    var changed = 0;
    var step    = 4; // sample every 4th pixel for speed

    for (var y = y0; y < y1; y += step) {
      for (var x = x0; x < x1; x += step) {
        var i = (y * w + x) * 4;
        // If the guide has a non-trivially-white pixel it's part of the letter
        var gR = gpx[i], gG = gpx[i + 1], gB = gpx[i + 2];
        if (gR > 220 && gG > 220 && gB > 220) continue; // skip white/near-white
        total++;
        // Check if the current pixel differs meaningfully from the guide
        var diff = Math.abs(cpx[i] - gR) + Math.abs(cpx[i + 1] - gG) + Math.abs(cpx[i + 2] - gB);
        if (diff > 40) changed++;
      }
    }

    if (total > 0 && changed / total >= 0.45) {
      completed = true;
      if (onComplete) onComplete();
    }
  }

  // ── Public API ────────────────────────────────────────────────────────────

  function init(drawingEngine, completionCallback) {
    engine     = drawingEngine;
    onComplete = completionCallback;
    render();
  }

  function setLetter(l) {
    letter    = l;
    completed = false;
    render();
  }

  function setStyle(s) {
    style     = s;
    completed = false;
    render();
  }

  function strokeEnded() {
    checkCoverage();
  }

  return {
    init:        init,
    setLetter:   setLetter,
    setStyle:    setStyle,
    render:      render,
    strokeEnded: strokeEnded,
  };

}());
