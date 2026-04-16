/**
 * utils/cursorUtils.js
 *
 * Returns a CSS cursor string that visually reflects the active drawing
 * tool and brush size.  Used in FreeDrawMode.
 */

/**
 * Build a data-URL SVG cursor.
 * @param {string} svgContent  – inner SVG markup (no <svg> wrapper)
 * @param {number} size        – total SVG canvas size (width = height)
 * @param {number} hotX        – cursor hot-spot x
 * @param {number} hotY        – cursor hot-spot y
 */
function svgCursor(svgContent, size, hotX, hotY) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${svgContent}</svg>`;
  const encoded = encodeURIComponent(svg);
  return `url("data:image/svg+xml,${encoded}") ${hotX} ${hotY}, crosshair`;
}

/**
 * Returns a CSS cursor string for the given tool and brush size.
 * @param {string} tool
 * @param {number} brushSize  – pixels
 */
export function getCursorStyle(tool, brushSize) {
  // Each case clamps brushSize to its own range and builds a custom cursor SVG.
  switch (tool) {
    case 'pencil':
    case 'sketch': {
      // Thin circle with cross-hair dot
      const s = Math.max(8, Math.min(brushSize, 32));
      const csz = s + 6;
      const ccx = csz / 2;
      return svgCursor(
        `<circle cx="${ccx}" cy="${ccx}" r="${s / 2}" fill="none" stroke="#1C1C1C" stroke-width="1.5"/>
         <circle cx="${ccx}" cy="${ccx}" r="1.5" fill="#1C1C1C"/>`,
        csz, ccx, ccx,
      );
    }

    case 'crayon': {
      const s = Math.max(8, Math.min(brushSize * 1.5, 40));
      const csz = Math.round(s) + 6;
      const ccx = csz / 2;
      return svgCursor(
        `<circle cx="${ccx}" cy="${ccx}" r="${s / 2}" fill="none" stroke="#1C1C1C" stroke-width="1.5" stroke-dasharray="3 2"/>
         <circle cx="${ccx}" cy="${ccx}" r="1.5" fill="#1C1C1C"/>`,
        csz, ccx, ccx,
      );
    }

    case 'water':
    case 'poster':
    case 'oil': {
      const s = Math.max(8, Math.min(brushSize * 1.5, 60));
      const csz = Math.round(s) + 6;
      const ccx = csz / 2;
      return svgCursor(
        `<circle cx="${ccx}" cy="${ccx}" r="${s / 2}" fill="rgba(0,0,0,0.12)" stroke="#1C1C1C" stroke-width="1.5"/>
         <circle cx="${ccx}" cy="${ccx}" r="1.5" fill="#1C1C1C"/>`,
        csz, ccx, ccx,
      );
    }

    case 'fill': {
      // Bucket icon (simple unicode-inspired SVG)
      return svgCursor(
        `<text x="2" y="22" font-size="20" font-family="sans-serif">🪣</text>`,
        28, 2, 24,
      );
    }

    case 'eraser': {
      const raw  = brushSize * 4;
      const s    = Math.max(14, Math.min(raw, 80));
      const csz  = Math.round(s) + 4;
      const ccx  = csz / 2;
      return svgCursor(
        `<rect x="2" y="2" width="${csz - 4}" height="${csz - 4}" rx="4"
               fill="white" stroke="#888" stroke-width="1.5"/>`,
        csz, ccx, ccx,
      );
    }

    default:
      return 'crosshair';
  }
}
