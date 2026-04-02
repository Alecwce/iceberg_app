import { test, expect } from '@playwright/test';

test.describe('Iceberg App Basic Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Assuming the app is running (npm start)
    await page.goto('/');
  });

  test('should load the app and show the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Iceberg/);
    const header = page.locator('h1');
    await expect(header).toContainText('Iceberg Prompts');
  });

  test('should have the model selector with default value 2.5 Flash', async ({ page }) => {
    const selector = page.locator('select');
    await expect(selector).toBeVisible();
    await expect(selector).toHaveValue('gemini-2.5-flash');
  });

  test('should have navigation buttons', async ({ page }) => {
    const navButtons = page.locator('.nav-btn');
    await expect(navButtons).toHaveCount(2);
    await expect(navButtons.first()).toContainText('Instrumental');
    await expect(navButtons.last()).toContainText('Conocimiento');
  });

  test('should show API key entry', async ({ page }) => {
    const keyLabel = page.locator('text=Secret Key Entry');
    await expect(keyLabel).toBeVisible();
    
    const keyInput = page.locator('input[placeholder*="Enter Gemini API Key"]');
    await expect(keyInput).toBeVisible();
  });
});
