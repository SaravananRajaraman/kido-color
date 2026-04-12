/**
 * Unit tests for coloringImages data — ensures all 26 letters exist in
 * each category and entries have the required fields.
 */
import { describe, it, expect } from 'vitest';
import { COLORING_IMAGES, CATEGORIES } from '../data/coloringImages.js';

const ALL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

describe('COLORING_IMAGES data', () => {
  it('exports an array of entries', () => {
    expect(Array.isArray(COLORING_IMAGES)).toBe(true);
    expect(COLORING_IMAGES.length).toBeGreaterThan(0);
  });

  it('each entry has letter, name, category, and svg or path', () => {
    for (const img of COLORING_IMAGES) {
      expect(img.letter).toMatch(/^[A-Z]$/);
      expect(typeof img.name).toBe('string');
      expect(img.name.length).toBeGreaterThan(0);
      expect(img.category).toBeOneOf(['animals', 'vehicles', 'nature']);
      // Must have either inline SVG string or a path to an SVG file
      expect(typeof img.svg === 'string' || typeof img.path === 'string').toBe(true);
    }
  });

  it('exports CATEGORIES array', () => {
    expect(CATEGORIES).toEqual(['animals', 'vehicles', 'nature']);
  });
});

describe('Category completeness', () => {
  for (const cat of CATEGORIES) {
    it(`${cat} has all 26 letters A–Z`, () => {
      const letters = COLORING_IMAGES
        .filter(img => img.category === cat)
        .map(img => img.letter)
        .sort();
      expect(letters).toEqual(ALL_LETTERS);
    });
  }
});

describe('SVG content quality', () => {
  it('animal SVGs contain closed paths or shapes', () => {
    const animals = COLORING_IMAGES.filter(i => i.category === 'animals' && i.svg);
    for (const img of animals) {
      // Every inline SVG should include at least one shape element
      expect(img.svg).toMatch(/<(ellipse|circle|rect|path|polygon)/i);
      // Should have a white fill for coloring book style
      expect(img.svg).toMatch(/fill="#fff"/i);
      // Should have a black outline
      expect(img.svg).toMatch(/stroke="#1C1C1C"/i);
    }
  });
});
