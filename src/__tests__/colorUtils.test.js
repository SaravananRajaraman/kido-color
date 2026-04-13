/**
 * Unit tests for colour utility helpers (hexToRgba, lighten, darken, colorAlpha).
 */
import { describe, it, expect } from 'vitest';
import { hexToRgba, colorAlpha, lighten, darken } from '../utils/colorUtils.js';

describe('hexToRgba', () => {
  it('converts 6-digit hex correctly', () => {
    expect(hexToRgba('#FF0000')).toEqual({ r: 255, g: 0,   b: 0   });
    expect(hexToRgba('#00FF00')).toEqual({ r: 0,   g: 255, b: 0   });
    expect(hexToRgba('#0000FF')).toEqual({ r: 0,   g: 0,   b: 255 });
    expect(hexToRgba('#1C1C1C')).toEqual({ r: 28,  g: 28,  b: 28  });
  });

  it('converts 3-digit short hex correctly', () => {
    expect(hexToRgba('#F00')).toEqual({ r: 255, g: 0,   b: 0   });
    expect(hexToRgba('#0F0')).toEqual({ r: 0,   g: 255, b: 0   });
    expect(hexToRgba('#FFF')).toEqual({ r: 255, g: 255, b: 255 });
  });

  it('strips leading # before parsing', () => {
    expect(hexToRgba('FF0000')).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('handles white and black', () => {
    expect(hexToRgba('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgba('#000000')).toEqual({ r: 0,   g: 0,   b: 0   });
  });
});

describe('colorAlpha', () => {
  it('returns rgba string with correct alpha', () => {
    expect(colorAlpha('#FF0000', 0.5)).toBe('rgba(255,0,0,0.5)');
    expect(colorAlpha('#000000', 0)).toBe('rgba(0,0,0,0)');
    expect(colorAlpha('#FFFFFF', 1)).toBe('rgba(255,255,255,1)');
  });
});

describe('lighten', () => {
  it('lightens a colour by clamping at 255', () => {
    const result = lighten('#800000', 0.5); // r=128 + 0.5*255 = 255 (clamped)
    expect(result).toBe('rgb(255,128,128)'); // r clamped, g and b added
  });

  it('does not exceed 255', () => {
    const result = lighten('#FFFFFF', 1.0);
    expect(result).toBe('rgb(255,255,255)');
  });

  it('lightens by zero leaves colour unchanged', () => {
    expect(lighten('#FF6B6B', 0)).toBe('rgb(255,107,107)');
  });
});

describe('darken', () => {
  it('darkens a colour by clamping at 0', () => {
    const result = darken('#000000', 0.5);
    expect(result).toBe('rgb(0,0,0)');
  });

  it('does not go below 0', () => {
    expect(darken('#000000', 1.0)).toBe('rgb(0,0,0)');
  });

  it('darkens by zero leaves colour unchanged', () => {
    expect(darken('#FF6B6B', 0)).toBe('rgb(255,107,107)');
  });

  it('partially darkens a mid-tone colour', () => {
    // r=200, g=100, b=50: darken by 0.1 → r-26=174, g-26=74, b-26=24
    const result = darken('#C86432', 0.1);
    expect(result).toBe('rgb(174,74,24)');
  });
});
