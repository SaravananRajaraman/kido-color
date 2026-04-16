/**
 * components/ColorBar.jsx
 *
 * Horizontal color palette bar rendered below the canvas in Color Mode.
 * Shows round swatches from PALETTE + a custom colour picker.
 */
import { useApp }  from '../context/AppContext.jsx';
import { PALETTE } from '../data/palette.js';

export default function ColorBar() {
  const { color, setColor } = useApp();

  return (
    <div className="color-bar" role="group" aria-label="Colour palette">
      {PALETTE.map(hex => (
        <button
          key={hex}
          className={`color-bar-swatch${color === hex ? ' active' : ''}`}
          style={{ background: hex }}
          onClick={() => setColor(hex)}
          aria-label={`Select colour ${hex}`}
          aria-pressed={color === hex}
        />
      ))}
      <label className="color-bar-custom" aria-label="Custom colour">
        <span className="color-bar-custom-label">+</span>
        <input
          type="color"
          value={color}
          onChange={e => setColor(e.target.value)}
          aria-label="Pick a custom colour"
        />
      </label>
    </div>
  );
}
