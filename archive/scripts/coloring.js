/**
 * coloring.js — Kido Color: A–Z Coloring Mode
 *
 * Renders a large, outline-style letter on the canvas for kids to colour in.
 * Three themes: Animals 🦁 | Objects 🚗 | Fruits 🍎
 *
 * Exposed as window.ColoringMode.
 */

window.ColoringMode = (function () {
  'use strict';

  // ── Theme data ────────────────────────────────────────────────────────────

  var THEMES = {
    animals: {
      A: { emoji: '🐊', name: 'Alligator'  },
      B: { emoji: '🦋', name: 'Butterfly'  },
      C: { emoji: '🐱', name: 'Cat'        },
      D: { emoji: '🐶', name: 'Dog'        },
      E: { emoji: '🐘', name: 'Elephant'   },
      F: { emoji: '🐸', name: 'Frog'       },
      G: { emoji: '🦒', name: 'Giraffe'    },
      H: { emoji: '🐹', name: 'Hamster'    },
      I: { emoji: '🦎', name: 'Iguana'     },
      J: { emoji: '🦘', name: 'Joey'       },
      K: { emoji: '🐨', name: 'Koala'      },
      L: { emoji: '🦁', name: 'Lion'       },
      M: { emoji: '🐒', name: 'Monkey'     },
      N: { emoji: '🦏', name: 'Narwhal'    },
      O: { emoji: '🦦', name: 'Otter'      },
      P: { emoji: '🐧', name: 'Penguin'    },
      Q: { emoji: '🦆', name: 'Quail'      },
      R: { emoji: '🐇', name: 'Rabbit'     },
      S: { emoji: '🐍', name: 'Snake'      },
      T: { emoji: '🐯', name: 'Tiger'      },
      U: { emoji: '🦄', name: 'Unicorn'    },
      V: { emoji: '🦊', name: 'Vixen'      },
      W: { emoji: '🐺', name: 'Wolf'       },
      X: { emoji: '🦩', name: 'X-bird'     },
      Y: { emoji: '🦬', name: 'Yak'        },
      Z: { emoji: '🦓', name: 'Zebra'      },
    },
    objects: {
      A: { emoji: '✈️',  name: 'Airplane'  },
      B: { emoji: '🚌',  name: 'Bus'       },
      C: { emoji: '🚗',  name: 'Car'       },
      D: { emoji: '🥁',  name: 'Drum'      },
      E: { emoji: '✏️',  name: 'Eraser'    },
      F: { emoji: '⚽',  name: 'Football'  },
      G: { emoji: '🎮',  name: 'Game'      },
      H: { emoji: '🎩',  name: 'Hat'       },
      I: { emoji: '💡',  name: 'Idea Bulb' },
      J: { emoji: '🏺',  name: 'Jar'       },
      K: { emoji: '🪁',  name: 'Kite'      },
      L: { emoji: '🪔',  name: 'Lamp'      },
      M: { emoji: '🔭',  name: 'Moon Glass'},
      N: { emoji: '📔',  name: 'Notebook'  },
      O: { emoji: '🌊',  name: 'Ocean'     },
      P: { emoji: '🎯',  name: 'Pin'       },
      Q: { emoji: '👑',  name: 'Queen\'s Crown'},
      R: { emoji: '🚀',  name: 'Rocket'    },
      S: { emoji: '⭐',  name: 'Star'      },
      T: { emoji: '🚂',  name: 'Train'     },
      U: { emoji: '☂️',  name: 'Umbrella'  },
      V: { emoji: '🎻',  name: 'Violin'    },
      W: { emoji: '⌚',  name: 'Watch'     },
      X: { emoji: '🎵',  name: 'Xylophone' },
      Y: { emoji: '🪀',  name: 'Yo-yo'     },
      Z: { emoji: '🤐',  name: 'Zipper'    },
    },
    fruits: {
      A: { emoji: '🍎', name: 'Apple'       },
      B: { emoji: '🍌', name: 'Banana'      },
      C: { emoji: '🍒', name: 'Cherry'      },
      D: { emoji: '🍇', name: 'Grapes'      },
      E: { emoji: '🫐', name: 'Elderberry'  },
      F: { emoji: '🍓', name: 'Forest Berry'},
      G: { emoji: '🍊', name: 'Grapefruit'  },
      H: { emoji: '🍈', name: 'Honeydew'    },
      I: { emoji: '🍦', name: 'Ice Pop'     },
      J: { emoji: '🍊', name: 'Juice Fruit' },
      K: { emoji: '🥝', name: 'Kiwi'        },
      L: { emoji: '🍋', name: 'Lemon'       },
      M: { emoji: '🥭', name: 'Mango'       },
      N: { emoji: '🥥', name: 'Coconut'      },
      O: { emoji: '🍊', name: 'Orange'      },
      P: { emoji: '🍑', name: 'Peach'       },
      Q: { emoji: '🍏', name: 'Quince'      },
      R: { emoji: '🍓', name: 'Raspberry'   },
      S: { emoji: '🍓', name: 'Strawberry'  },
      T: { emoji: '🍅', name: 'Tomato'      },
      U: { emoji: '🍇', name: 'Ugli Fruit'  },
      V: { emoji: '🍇', name: 'Vine Fruit'  },
      W: { emoji: '🍉', name: 'Watermelon'  },
      X: { emoji: '🥝', name: 'Xi Melon'    },
      Y: { emoji: '🍋', name: 'Yuzu'        },
      Z: { emoji: '🫐', name: 'Zucchini'    },
    },
  };

  // ── Background decoration colours per style ──────────────────────────────

  var BG_ACCENT = {
    animals: ['#FFD93D', '#FF6B6B', '#4ECDC4', '#A855F7', '#FF9F43'],
    objects: ['#4ECDC4', '#FF6B6B', '#A855F7', '#FFD93D', '#3498DB'],
    fruits:  ['#FF6B6B', '#FFD93D', '#A855F7', '#4ECDC4', '#E84393'],
  };

  // ── State ─────────────────────────────────────────────────────────────────

  var engine = null;
  var letter = 'A';
  var style  = 'animals';

  // ── Renderer ──────────────────────────────────────────────────────────────

  function render() {
    if (!engine) return;

    var canvas = engine.canvas;
    var ctx    = engine.ctx;
    var w      = canvas.width;
    var h      = canvas.height;

    engine.fillWhite();
    engine.clearUndoStack();

    ctx.save();

    // Soft gradient background
    var grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#FFFEF5');
    grad.addColorStop(1, '#F0F8FF');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Decorative dots in the corners and top-centre
    var accents = BG_ACCENT[style];
    var dots = [
      [w * 0.07, h * 0.07],
      [w * 0.93, h * 0.07],
      [w * 0.07, h * 0.93],
      [w * 0.93, h * 0.93],
      [w * 0.50, h * 0.04],
    ];
    dots.forEach(function (pt, i) {
      ctx.beginPath();
      ctx.arc(pt[0], pt[1], Math.min(14, w * 0.022), 0, Math.PI * 2);
      ctx.fillStyle = accents[i % accents.length];
      ctx.fill();
    });

    // Dashed border
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = '#DDDDDD';
    ctx.lineWidth   = 2;
    ctx.strokeRect(10, 10, w - 20, h - 20);
    ctx.setLineDash([]);

    // ── Large outline letter for coloring ──────────────────────────────────
    var letterFontSize = Math.min(w * 0.72, h * 0.58, 280);
    var cx = w / 2;
    var cy = h * 0.42;

    ctx.font      = '900 ' + letterFontSize + 'px "Arial Black", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // White interior (the area kids will colour)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(letter, cx, cy);

    // Black outline
    ctx.strokeStyle = '#1C1C1C';
    ctx.lineWidth   = Math.max(4, letterFontSize * 0.026);
    ctx.lineJoin    = 'round';
    ctx.strokeText(letter, cx, cy);

    // ── Emoji + label ──────────────────────────────────────────────────────
    var theme      = THEMES[style][letter];
    var emojiSize  = Math.min(h * 0.1, 64);
    var labelSize  = Math.min(h * 0.038, 22);
    var emojiY     = h * 0.80;

    ctx.font         = emojiSize + 'px serif';
    ctx.textBaseline = 'middle';
    ctx.fillStyle    = '#000'; // required for emoji on some browsers
    ctx.fillText(theme.emoji, cx, emojiY);

    ctx.font         = 'bold ' + labelSize + 'px "Arial Rounded MT Bold", Arial, sans-serif';
    ctx.fillStyle    = '#555555';
    ctx.textBaseline = 'top';
    ctx.fillText(letter + ' is for ' + theme.name + '!', cx, emojiY + emojiSize * 0.65);

    ctx.restore();
  }

  // ── Public API ────────────────────────────────────────────────────────────

  function init(drawingEngine) {
    engine = drawingEngine;
    render();
  }

  function setLetter(l) {
    letter = l;
    render();
  }

  function setStyle(s) {
    style = s;
    render();
  }

  return {
    init:      init,
    setLetter: setLetter,
    setStyle:  setStyle,
    render:    render,
  };

}());
