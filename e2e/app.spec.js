// @ts-check
/* global require */
const { test, expect } = require('@playwright/test');

/**
 * E2E tests for Kido Color.
 *
 * These tests run against the production preview build (`npm run preview`).
 * The Playwright config starts the server automatically via `webServer`.
 */

test.describe('Home screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows the Kido Color heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Kido Color');
  });

  test('shows all three mode cards', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Color/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Trace/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Draw/i })).toBeVisible();
  });

  test('Sign In button is visible', async ({ page }) => {
    const signIn = page.getByRole('button', { name: /Sign In/i }).first();
    await expect(signIn).toBeVisible();
  });
});

test.describe('Free Draw mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Free drawing mode/i }).click();
  });

  test('navigates to draw mode', async ({ page }) => {
    const canvas = page.locator('canvas[aria-label="Free drawing canvas"]');
    await expect(canvas).toBeVisible();
  });

  test('user can draw on the canvas', async ({ page }) => {
    const canvas = page.locator('canvas[aria-label="Free drawing canvas"]');
    const box    = await canvas.boundingBox();
    expect(box).not.toBeNull();

    // Draw a line from left to right
    await page.mouse.move(box.x + 50, box.y + 100);
    await page.mouse.down();
    await page.mouse.move(box.x + 200, box.y + 100, { steps: 10 });
    await page.mouse.up();
    // If no error was thrown the draw completed successfully
  });

  test('Undo button is present and clickable', async ({ page }) => {
    const undo = page.getByRole('button', { name: /Undo/i });
    await expect(undo).toBeVisible();
    await undo.click(); // Should not throw
  });

  test('Save button opens save dialog', async ({ page }) => {
    const saveBtn = page.getByRole('button', { name: /Save/i }).first();
    await saveBtn.click();
    await expect(page.locator('role=dialog')).toBeVisible();
  });

  test('Save dialog closes when Close is clicked', async ({ page }) => {
    await page.getByRole('button', { name: /Save/i }).first().click();
    await page.getByRole('button', { name: /Close/i }).click();
    await expect(page.locator('role=dialog')).not.toBeVisible();
  });
});

test.describe('Coloring mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Coloring mode/i }).click();
  });

  test('shows letter A by default', async ({ page }) => {
    const activeBtn = page.locator('.letter-btn.active');
    await expect(activeBtn).toHaveText('A');
  });

  test('all three category tabs are visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Animals/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Vehicles/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Nature/i })).toBeVisible();
  });

  test('switching to Vehicles category shows all 26 letters', async ({ page }) => {
    await page.getByRole('button', { name: /Vehicles/i }).click();
    const letterBtns = page.locator('.letter-btn');
    await expect(letterBtns).toHaveCount(26);
  });

  test('switching to Nature category shows all 26 letters', async ({ page }) => {
    await page.getByRole('button', { name: /Nature/i }).click();
    const letterBtns = page.locator('.letter-btn');
    await expect(letterBtns).toHaveCount(26);
  });

  test('clicking letter B switches to B', async ({ page }) => {
    await page.getByRole('button', { name: 'Letter B', exact: true }).click();
    const activeBtn = page.locator('.letter-btn.active');
    await expect(activeBtn).toHaveText('B');
  });

  test('Tools button opens the tool panel', async ({ page }) => {
    await page.getByRole('button', { name: /Open tools panel/i }).click();
    await expect(page.locator('.tool-panel.open')).toBeVisible();
  });
});

test.describe('Tracing mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Tracing mode/i }).click();
  });

  test('shows tracing canvas', async ({ page }) => {
    await expect(page.locator('canvas[aria-label="Tracing canvas"]')).toBeVisible();
  });

  test('style selector has 3 options', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Dotted/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Arrows/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Faint/i })).toBeVisible();
  });
});
