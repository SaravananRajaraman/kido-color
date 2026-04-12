/**
 * Utility functions extracted from useDrawing.js so they can be
 * unit-tested without a DOM/canvas environment.
 */

export function hexToRgba(hex) {
  const c = hex.replace('#', '');
  const n = parseInt(
    c.length === 3 ? c.split('').map(x => x + x).join('') : c,
    16,
  );
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function colorAlpha(hex, alpha) {
  const { r, g, b } = hexToRgba(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function lighten(hex, amount) {
  const { r, g, b } = hexToRgba(hex);
  return `rgb(${Math.min(255, r + Math.round(255 * amount))},${Math.min(255, g + Math.round(255 * amount))},${Math.min(255, b + Math.round(255 * amount))})`;
}

export function darken(hex, amount) {
  const { r, g, b } = hexToRgba(hex);
  return `rgb(${Math.max(0, r - Math.round(255 * amount))},${Math.max(0, g - Math.round(255 * amount))},${Math.max(0, b - Math.round(255 * amount))})`;
}
