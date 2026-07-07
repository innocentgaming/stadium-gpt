import { test, expect } from '@playwright/test';

test.describe('StadiumGPT E2E Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Open application homepage
    await page.goto('/');
  });

  test('should load landing page successfully and render hero title', async ({ page }) => {
    await expect(page).toHaveTitle(/StadiumGPT/);
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toContainText('The AI Operating System for FIFA World Cup Stadiums');
  });

  test('should handle keyboard accessibility skip link', async ({ page }) => {
    // Focus the skip link via keyboard tab
    await page.keyboard.press('Tab');
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeFocused();
    
    // Press Enter and check main content focus
    await page.keyboard.press('Enter');
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeVisible();
  });

  test('should navigate to dashboard and interact with AI Chat Assistant', async ({ page }) => {
    // Navigate to dashboard
    await page.locator('nav a:has-text("Dashboard")').first().click();
    await expect(page).toHaveURL(/\/dashboard/);

    // Navigate to AI Chat
    await page.locator('aside a:has-text("AI Chat")').click();
    await expect(page).toHaveURL(/\/dashboard\/ai-chat/);

    // Chat Suggestion Interaction
    const firstSuggestion = page.locator('button:has-text("Where is the nearest restroom?")');
    await expect(firstSuggestion).toBeVisible();
    await firstSuggestion.click();

    // Verify user message appears in chat log
    const userMessage = page.locator('div:has-text("Where is the nearest restroom?")').last();
    await expect(userMessage).toBeVisible();

    // Verify assistant responds (waiting for simulation delay)
    const assistantMessage = page.locator('div:has-text("The nearest restroom is 45 meters ahead")').last();
    await expect(assistantMessage).toBeVisible({ timeout: 5000 });
  });

  test('should interact with dashboard settings and toggle modes', async ({ page }) => {
    await page.goto('/dashboard/settings');

    const darkModeToggle = page.locator('button[aria-label="Toggle Dark Mode"]');
    await expect(darkModeToggle).toBeVisible();
    
    // Toggle dark mode off
    await darkModeToggle.click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    // Toggle back on
    await darkModeToggle.click();
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('should load crowd analytics page and show active zones', async ({ page }) => {
    await page.goto('/dashboard/crowd-analytics');
    
    const zoneHeader = page.locator('h4:has-text("North Stand")');
    await expect(zoneHeader).toBeVisible();

    const densityWidget = page.locator('text=/\\d+%/').first();
    await expect(densityWidget).toBeVisible();
  });
});
