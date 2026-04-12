/**
 * app.js — Kido Color: Main Application Entry Point
 *
 * Responsibilities:
 *   • Navigation between modes (Home / Coloring / Tracing / Free Draw)
 *   • Building the A–Z letter grids
 *   • Wiring up the Tool Panel (right-side drawer, auto-close on selection)
 *   • Building & wiring the colour palette
 *   • Connecting DrawingEngine, ColoringMode and TracingMode to their canvases
 *   • Sound feedback via Web Audio API
 *   • Confetti celebration
 *   • Download / Undo / Clear actions
 *   • Resize handling
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════
  //  COLOUR PALETTE DATA
  // ═══════════════════════════════════════════════════════════════════════

  var PALETTE = [
    // Row 1 – basics
    '#FF0000', '#FF6600', '#FFCC00', '#00CC00',
    '#0066FF', '#6600CC', '#FF00CC', '#FFFFFF',
    // Row 2 – pastels / vibrant
    '#FF6B6B', '#FFA94D', '#FFD93D', '#6BCB77',
    '#4ECDC4', '#A855F7', '#F72585', '#ADB5BD',
    // Row 3 – rich tones
    '#C0392B', '#E67E22', '#F1C40F', '#27AE60',
    '#2980B9', '#8E44AD', '#1A1A2E', '#795548',
  ];

  // ═══════════════════════════════════════════════════════════════════════
  //  SOUND  (Web Audio API – no files needed)
  // ═══════════════════════════════════════════════════════════════════════

  var audioCtx = null;

  function getAudioCtx() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) { /* Safari / older browsers */ }
    }
    return audioCtx;
  }

  function playTone(freq, type, duration, vol) {
    var ac = getAudioCtx();
    if (!ac) return;
    try {
      var osc  = ac.createOscillator();
      var gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type      = type || 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol || 0.18, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);
      osc.start();
      osc.stop(ac.currentTime + duration);
    } catch (e) { /* ignore */ }
  }

  function soundClick()     { playTone(660,  'sine',     0.10, 0.20); }
  function soundSelect()    { playTone(880,  'sine',     0.12, 0.18); }
  function soundCelebrate() {
    [523, 659, 784, 1047].forEach(function (f, i) {
      setTimeout(function () { playTone(f, 'triangle', 0.22, 0.22); }, i * 120);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  CONFETTI
  // ═══════════════════════════════════════════════════════════════════════

  var CONFETTI_COLORS = ['#FF6B6B','#FFD93D','#4ECDC4','#A855F7','#FF9F43','#6BCB77','#F72585'];

  function launchConfetti() {
    var container = document.getElementById('confettiContainer');
    container.innerHTML = '';
    for (var i = 0; i < 80; i++) {
      (function (idx) {
        setTimeout(function () {
          var el = document.createElement('div');
          el.className = 'confetti-piece';
          el.style.left       = Math.random() * 100 + 'vw';
          el.style.top        = '-14px';
          el.style.background = CONFETTI_COLORS[idx % CONFETTI_COLORS.length];
          el.style.width      = (8 + Math.random() * 8) + 'px';
          el.style.height     = (8 + Math.random() * 8) + 'px';
          el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
          el.style.animationDuration  = (1.8 + Math.random() * 1.4) + 's';
          el.style.animationDelay     = '0s';
          container.appendChild(el);
          setTimeout(function () {
            if (el.parentNode) el.parentNode.removeChild(el);
          }, 4000);
        }, idx * 28);
      })(i);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  TOOL PANEL
  // ═══════════════════════════════════════════════════════════════════════

  var panel   = document.getElementById('toolPanel');
  var overlay = document.getElementById('panelOverlay');
  // Shared "active" engine — whichever canvas is currently visible
  var activeEngine = null;

  function openPanel() {
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    overlay.classList.add('visible');
  }

  function closePanel() {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('visible');
  }

  document.getElementById('panelCloseBtn').addEventListener('click', function () {
    soundClick();
    closePanel();
  });
  overlay.addEventListener('click', closePanel);

  // ── Tool buttons ─────────────────────────────────────────────────────────

  var TOOL_LABELS = {
    pencil:     '✏️ Pencil',
    sketchpen:  '🖊️ Sketch Pen',
    crayon:     '🖍️ Crayon',
    watercolor: '💧 Watercolor',
    postercolor:'🎨 Poster Color',
    oilpaint:   '🖌️ Oil Paint',
    bucket:     '🪣 Bucket Fill',
    eraser:     '🧹 Eraser',
  };

  var toolBtns = document.querySelectorAll('.tool-btn');

  toolBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var t = btn.dataset.tool;
      selectTool(t);
      soundSelect();
      closePanel(); // auto-hide after selection
    });
  });

  function selectTool(t) {
    toolBtns.forEach(function (b) {
      var active = b.dataset.tool === t;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    if (activeEngine) {
      activeEngine.setTool(t);
      showToolIndicator(t);
    }
  }

  function showToolIndicator(t) {
    var indicators = document.querySelectorAll('.tool-indicator');
    var label = TOOL_LABELS[t] || t;
    indicators.forEach(function (el) {
      el.textContent = label;
      el.classList.add('visible');
      clearTimeout(el._timer);
      el._timer = setTimeout(function () {
        el.classList.remove('visible');
      }, 2000);
    });
  }

  // ── Brush size buttons ───────────────────────────────────────────────────

  var sizeBtns = document.querySelectorAll('.size-btn');

  sizeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      sizeBtns.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      if (activeEngine) activeEngine.setSize(btn.dataset.size);
      soundClick();
    });
  });

  // ── Colour palette ────────────────────────────────────────────────────────

  var paletteContainer = document.getElementById('colorPalette');
  var activeSwatchEl   = null;

  PALETTE.forEach(function (hex) {
    var sw = document.createElement('button');
    sw.className   = 'color-swatch';
    sw.style.background = hex;
    sw.title       = hex;
    sw.setAttribute('aria-label', 'Select colour ' + hex);
    sw.addEventListener('click', function () {
      selectColor(hex, sw);
      soundClick();
      // Keep panel open so kids can pick colour and then tool
    });
    paletteContainer.appendChild(sw);
  });

  // Pre-select first colour
  var firstSwatch = paletteContainer.querySelector('.color-swatch');
  if (firstSwatch) selectColor('#FF0000', firstSwatch);

  function selectColor(hex, swatchEl) {
    if (activeSwatchEl) activeSwatchEl.classList.remove('active');
    activeSwatchEl = swatchEl;
    if (swatchEl) swatchEl.classList.add('active');
    if (activeEngine) activeEngine.setColor(hex);
  }

  var customPicker = document.getElementById('customColorPicker');
  customPicker.addEventListener('input', function () {
    if (activeSwatchEl) activeSwatchEl.classList.remove('active');
    activeSwatchEl = null;
    if (activeEngine) activeEngine.setColor(customPicker.value);
  });

  // ═══════════════════════════════════════════════════════════════════════
  //  A–Z LETTER GRID BUILDER
  // ═══════════════════════════════════════════════════════════════════════

  function buildLetterGrid(containerId, onSelect) {
    var container = document.getElementById(containerId);
    var letters   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    letters.forEach(function (l, idx) {
      var btn = document.createElement('button');
      btn.className    = 'letter-btn' + (idx === 0 ? ' active' : '');
      btn.textContent  = l;
      btn.dataset.letter = l;
      btn.setAttribute('aria-label', 'Letter ' + l);
      btn.addEventListener('click', function () {
        container.querySelectorAll('.letter-btn').forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        soundClick();
        onSelect(l);
      });
      container.appendChild(btn);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  NAVIGATION
  // ═══════════════════════════════════════════════════════════════════════

  var navBtns  = document.querySelectorAll('.nav-btn[data-mode]');
  var sections = document.querySelectorAll('.mode-section');

  function switchMode(mode) {
    navBtns.forEach(function (b) {
      var active = b.dataset.mode === mode;
      b.classList.toggle('active', active);
      b.setAttribute('aria-current', active ? 'page' : 'false');
    });
    sections.forEach(function (s) {
      var id     = s.id; // e.g. "mode-coloring"
      var active = id === 'mode-' + mode;
      s.classList.toggle('active', active);
      // Use hidden attribute for accessibility (mode-section.active = display:flex)
      if (active) s.removeAttribute('hidden'); else s.setAttribute('hidden', '');
    });
    // Update active engine
    switch (mode) {
      case 'coloring': activeEngine = colorEngine; break;
      case 'tracing':  activeEngine = traceEngine; break;
      case 'freedraw': activeEngine = drawEngine;  break;
      default:         activeEngine = null;
    }
    // Sync currently selected tool to the new active engine
    if (activeEngine) {
      var currentTool = getActiveTool();
      activeEngine.setTool(currentTool);
      activeEngine.setColor(getActiveColor());
      activeEngine.setSize(getActiveSize());
      // Resize canvas to match its container (might have changed)
      setTimeout(function () {
        activeEngine.resize();
        if (mode === 'coloring') ColoringMode.render();
        if (mode === 'tracing')  TracingMode.render();
      }, 50);
    }
    closePanel();
    soundClick();
  }

  navBtns.forEach(function (btn) {
    btn.addEventListener('click', function () { switchMode(btn.dataset.mode); });
  });

  // Home-logo button
  document.getElementById('homeBtn').addEventListener('click', function () {
    switchMode('home');
    soundClick();
  });

  // Home mode-card buttons
  document.querySelectorAll('.home-card[data-mode]').forEach(function (card) {
    card.addEventListener('click', function () { switchMode(card.dataset.mode); });
  });

  // ── Helper getters ────────────────────────────────────────────────────────

  function getActiveTool() {
    var btn = document.querySelector('.tool-btn.active');
    return btn ? btn.dataset.tool : 'pencil';
  }

  function getActiveColor() {
    if (activeSwatchEl) return activeSwatchEl.style.background;
    return customPicker.value || '#FF0000';
  }

  function getActiveSize() {
    var btn = document.querySelector('.size-btn.active');
    return btn ? parseInt(btn.dataset.size, 10) : 8;
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  CANVAS / ENGINE INITIALISATION
  // ═══════════════════════════════════════════════════════════════════════

  // ── Coloring ──────────────────────────────────────────────────────────────

  var colorCanvas = document.getElementById('colorCanvas');
  var colorEngine = DrawingEngine.create(colorCanvas, function () { /* onStrokeEnd */ });
  colorEngine.resize();
  colorEngine.fillWhite();

  buildLetterGrid('colorLetterGrid', function (l) {
    ColoringMode.setLetter(l);
  });

  document.querySelectorAll('#colorStyleSelector .style-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#colorStyleSelector .style-btn').forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      soundClick();
      ColoringMode.setStyle(btn.dataset.style);
    });
  });

  document.getElementById('colorToolsBtn').addEventListener('click', function () {
    activeEngine = colorEngine;
    openPanel();
    soundClick();
  });
  document.getElementById('colorClearBtn').addEventListener('click', function () {
    colorEngine.saveState();
    ColoringMode.render();
    soundClick();
  });
  document.getElementById('colorUndoBtn').addEventListener('click', function () {
    colorEngine.undo();
    soundClick();
  });
  document.getElementById('colorDownloadBtn').addEventListener('click', function () {
    colorEngine.download('kido-color-' + (new Date().getTime()) + '.png');
    soundClick();
  });

  ColoringMode.init(colorEngine);

  // ── Tracing ───────────────────────────────────────────────────────────────

  var traceCanvas = document.getElementById('traceCanvas');
  var traceEngine = DrawingEngine.create(traceCanvas, function () {
    TracingMode.strokeEnded();
  });
  traceEngine.resize();
  traceEngine.fillWhite();

  var completionOverlay = document.getElementById('completionOverlay');

  buildLetterGrid('traceLetterGrid', function (l) {
    completionOverlay.setAttribute('hidden', '');
    TracingMode.setLetter(l);
  });

  document.querySelectorAll('#traceStyleSelector .style-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#traceStyleSelector .style-btn').forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      soundClick();
      completionOverlay.setAttribute('hidden', '');
      TracingMode.setStyle(btn.dataset.style);
    });
  });

  document.getElementById('traceToolsBtn').addEventListener('click', function () {
    activeEngine = traceEngine;
    openPanel();
    soundClick();
  });
  document.getElementById('traceClearBtn').addEventListener('click', function () {
    completionOverlay.setAttribute('hidden', '');
    traceEngine.saveState();
    TracingMode.render();
    soundClick();
  });
  document.getElementById('traceUndoBtn').addEventListener('click', function () {
    traceEngine.undo();
    soundClick();
  });
  document.getElementById('traceDownloadBtn').addEventListener('click', function () {
    traceEngine.download('kido-trace-' + (new Date().getTime()) + '.png');
    soundClick();
  });

  // Completion overlay
  document.getElementById('completionNextBtn').addEventListener('click', function () {
    completionOverlay.setAttribute('hidden', '');
    // Advance to next letter
    var grid      = document.getElementById('traceLetterGrid');
    var active    = grid.querySelector('.letter-btn.active');
    var allBtns   = grid.querySelectorAll('.letter-btn');
    var nextIndex = 0;
    allBtns.forEach(function (b, i) {
      if (b === active) nextIndex = (i + 1) % allBtns.length;
    });
    allBtns[nextIndex].click();
    soundClick();
  });

  TracingMode.init(traceEngine, function () {
    // Called when tracing coverage is sufficient
    completionOverlay.removeAttribute('hidden');
    launchConfetti();
    soundCelebrate();
  });

  // ── Free Drawing ─────────────────────────────────────────────────────────

  var drawCanvas = document.getElementById('drawCanvas');
  var drawEngine = DrawingEngine.create(drawCanvas, function () { /* onStrokeEnd */ });
  drawEngine.resize();
  drawEngine.fillWhite();

  document.getElementById('drawToolsBtn').addEventListener('click', function () {
    activeEngine = drawEngine;
    openPanel();
    soundClick();
  });
  document.getElementById('drawClearBtn').addEventListener('click', function () {
    drawEngine.saveState();
    drawEngine.fillWhite();
    soundClick();
  });
  document.getElementById('drawUndoBtn').addEventListener('click', function () {
    drawEngine.undo();
    soundClick();
  });
  document.getElementById('drawDownloadBtn').addEventListener('click', function () {
    drawEngine.download('kido-draw-' + (new Date().getTime()) + '.png');
    soundClick();
  });

  // ── Active engine for tool panel defaults to coloring ─────────────────────
  activeEngine = colorEngine;
  selectTool('pencil');

  // ═══════════════════════════════════════════════════════════════════════
  //  RESIZE HANDLER
  // ═══════════════════════════════════════════════════════════════════════

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      [colorEngine, traceEngine, drawEngine].forEach(function (eng) {
        eng.resize();
      });
      ColoringMode.render();
      TracingMode.render();
    }, 200);
  });

  // ═══════════════════════════════════════════════════════════════════════
  //  INITIAL STATE — show home, initialise
  // ═══════════════════════════════════════════════════════════════════════

  // All sections except home start as hidden
  document.querySelectorAll('.mode-section').forEach(function (s) {
    if (!s.classList.contains('active')) s.setAttribute('hidden', '');
  });

  // Small delay so layout is settled before sizing canvases
  setTimeout(function () {
    colorEngine.resize();
    traceEngine.resize();
    drawEngine.resize();
    ColoringMode.render();
    TracingMode.render();
  }, 120);

}());
