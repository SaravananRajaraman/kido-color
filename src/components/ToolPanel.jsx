/**
 * components/ToolPanel.jsx
 * Slide-in right-hand panel for tool, size and colour selection.
 */
import { useApp, TOOLS, SIZES } from '../context/AppContext.jsx';
import ColorPalette              from './ColorPalette.jsx';

const TOOL_LIST = [
  { id: TOOLS.PENCIL, icon:'✏️', label:'Pencil'  },
  { id: TOOLS.SKETCH, icon:'🖊️', label:'Sketch'  },
  { id: TOOLS.CRAYON, icon:'🖍️', label:'Crayon'  },
  { id: TOOLS.WATER,  icon:'💧', label:'Water'   },
  { id: TOOLS.POSTER, icon:'🎨', label:'Poster'  },
  { id: TOOLS.OIL,    icon:'🖌️', label:'Oil'     },
  { id: TOOLS.FILL,   icon:'🪣', label:'Fill'    },
  { id: TOOLS.ERASER, icon:'🧹', label:'Erase'   },
];

const SIZE_LIST = [
  { id: SIZES.S,  label:'S'  },
  { id: SIZES.M,  label:'M'  },
  { id: SIZES.L,  label:'L'  },
  { id: SIZES.XL, label:'XL' },
];

// Brush size slider range (pixels)
const BRUSH_MIN = 1;
const BRUSH_MAX = 40;

export default function ToolPanel() {
  const { tool, setTool, brushSize, setBrushSize, panelOpen, setPanelOpen } = useApp();

  return (
    <>
      {/* backdrop */}
      <div
        className={`panel-overlay${panelOpen ? ' visible' : ''}`}
        onClick={() => setPanelOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`tool-panel${panelOpen ? ' open' : ''}`}
        aria-label="Drawing tools panel"
        aria-expanded={panelOpen}
      >
        <button
          className="panel-close"
          onClick={() => setPanelOpen(false)}
          aria-label="Close tools panel"
        >✕</button>

        {/* Tools */}
        <div className="panel-section">
          <p className="panel-title">🛠️ Tools</p>
          <div className="tool-grid" role="group" aria-label="Drawing tools">
            {TOOL_LIST.map(t => (
              <button
                key={t.id}
                className={`tool-btn${tool === t.id ? ' active' : ''}`}
                onClick={() => setTool(t.id)}
                aria-label={t.label}
                aria-pressed={tool === t.id}
              >
                <span className="tool-icon">{t.icon}</span>
                <span className="tool-name">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Brush size */}
        <div className="panel-section">
          <p className="panel-title">📏 Brush Size <span className="brush-size-value">{brushSize}px</span></p>
          {/* Continuous slider */}
          <input
            type="range"
            className="brush-slider"
            min={BRUSH_MIN}
            max={BRUSH_MAX}
            value={brushSize}
            onChange={e => setBrushSize(Number(e.target.value))}
            aria-label={`Brush size: ${brushSize} pixels`}
          />
          {/* Quick-pick presets */}
          <div className="size-options" role="group" aria-label="Brush size presets">
            {SIZE_LIST.map(s => (
              <button
                key={s.id}
                className={`size-btn${brushSize === s.id ? ' active' : ''}`}
                onClick={() => setBrushSize(s.id)}
                aria-label={`${s.label} brush`}
                aria-pressed={brushSize === s.id}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Colour palette */}
        <ColorPalette />
      </aside>
    </>
  );
}
