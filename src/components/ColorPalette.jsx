/**
 * components/ColorPalette.jsx
 */
import { useApp }     from '../context/AppContext.jsx';
import { PALETTE }    from '../data/palette.js';

export default function ColorPalette() {
  const { color, setColor } = useApp();

  return (
    <div className="panel-section">
      <p className="panel-title">🎨 Colours</p>
      <div className="color-palette" role="group" aria-label="Colour palette">
        {PALETTE.map(hex => (
          <button
            key={hex}
            className={`color-swatch${color === hex ? ' active' : ''}`}
            style={{ background: hex }}
            onClick={() => setColor(hex)}
            aria-label={`Select colour ${hex}`}
            aria-pressed={color === hex}
          />
        ))}
      </div>
      <div className="custom-color-row">
        <span className="custom-color-label">Custom:</span>
        <input
          id="customColorPicker"
          type="color"
          value={color}
          onChange={e => setColor(e.target.value)}
          aria-label="Pick a custom colour"
        />
      </div>
    </div>
  );
}
