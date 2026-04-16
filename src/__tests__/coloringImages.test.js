/**
 * Unit tests for coloringImages data — ensures all 26 letters exist
 * and entries have the required fields.
 */
import { describe, it, expect } from 'vitest';
import { COLORING_IMAGES } from '../data/coloringImages.js';

const ALL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

describe('COLORING_IMAGES data', () => {
  it('exports an array of entries', () => {
    expect(Array.isArray(COLORING_IMAGES)).toBe(true);
  });

  it('contains exactly 26 entries, one per letter A–Z', () => {
    expect(COLORING_IMAGES.length).toBe(26);
    const letters = COLORING_IMAGES.map(img => img.letter).sort();
    expect(letters).toEqual(ALL_LETTERS);
  });

  it('each entry has letter, name, and svg fields', () => {
    for (const img of COLORING_IMAGES) {
      expect(img.letter).toMatch(/^[A-Z]$/);
      expect(typeof img.name).toBe('string');
      expect(img.name.length).toBeGreaterThan(0);
      expect(typeof img.svg).toBe('string');
    }
  });
});

describe('SVG content quality', () => {
  it('all SVGs contain closed paths or shapes', () => {
    for (const img of COLORING_IMAGES) {
      // Every inline SVG should include at least one shape element
      expect(img.svg).toMatch(/<(ellipse|circle|rect|path|polygon)/i);
      // Should have a white fill for coloring book style
      expect(img.svg).toMatch(/fill="#fff"/i);
      // Should have a dark outline
      expect(img.svg).toMatch(/stroke="#1C1C1C"/i);
    }
  });
});
