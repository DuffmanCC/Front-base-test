/* eslint-disable testing-library/prefer-screen-queries */

import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Color Picker Game/);
});

test('loose game', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Enter some letters' }).click();
  await page
    .getByRole('textbox', { name: 'Enter some letters' })
    .fill('fafafa');
  await page.getByRole('button', { name: 'Take a Guess' }).click();

  const statusElement = await page.$('div[data-testid="game-status"]');
  const status = await statusElement?.evaluate((el) => el.textContent);

  expect(status).toContain('Nope. Sorry.');
});

test('win game', async ({ page }) => {
  await page.goto('/');

  // Extraer el color del div
  const colorDiv = await page.$('div[data-testid="color-swatch"]');

  if (!colorDiv) {
    throw new Error('Color div not found');
  }

  const color = await colorDiv.evaluate(
    (el) => getComputedStyle(el).backgroundColor,
  );

  function rgbToHex(rgb) {
    const match = rgb.match(/\d+/g);
    if (!match || match.length < 3) throw new Error('Invalid RGB format');

    return `#${match
      .map((x) => Number(x).toString(16).padStart(2, '0'))
      .join('')}`;
  }

  const hexColor = rgbToHex(color).split('#')[1];

  await page.getByRole('textbox', { name: 'Enter some letters' }).click();
  await page
    .getByRole('textbox', { name: 'Enter some letters' })
    .fill(hexColor);

  await page.getByRole('button', { name: 'Take a Guess' }).click();

  const statusElement = await page.$('div[data-testid="game-status"]');
  const status = await statusElement?.evaluate((el) => el.textContent);

  expect(status).toContain('Wow, you actually won.');
});
