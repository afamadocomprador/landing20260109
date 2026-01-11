
import { test, expect } from '@playwright/test';

test('Business logic verification for Premium Calculator', async ({ page }) => {
  await page.goto('/');

  // 1. Open the premium calculator from the Classic card
  const planComparison = page.locator('#plan-comparison');
  await expect(planComparison).toBeVisible();

  // More specific selector for the Classic card's button
  const classicCard = planComparison.locator('.border.border-dkv-grey-light');
  const classicCalculatorTrigger = classicCard.locator('button:has-text("Calcular Precio")');
  await classicCalculatorTrigger.click();

  let calculatorDialog = page.locator('div[role="dialog"]');
  await expect(calculatorDialog).toBeVisible();

  // Verify Classic plan is selected by default
  let classicButton = calculatorDialog.locator('button:has-text("Plan Classic")');
  await expect(classicButton).toHaveClass(/bg-white/);

  // Close the dialog
  await page.locator('button[aria-label="Close"]').click({ force: true });
  await expect(calculatorDialog).not.toBeVisible();

  // 2. Open the premium calculator from the Elite card
  // More specific selector for the Elite card's button
  const eliteCard = planComparison.locator('.border-2.border-dkv-green-digital');
  const eliteCalculatorTrigger = eliteCard.locator('button:has-text("Calcular Precio")');
  await eliteCalculatorTrigger.click();

  calculatorDialog = page.locator('div[role="dialog"]');
  await expect(calculatorDialog).toBeVisible();

  // Verify Elite plan is selected by default
  let eliteButton = calculatorDialog.locator('button:has-text("Plan Élite")');
  await expect(eliteButton).toHaveClass(/bg-white/);

  // 3. Verify unavailable monthly payment for 1 adult on Elite plan
  const monthlyPaymentOption = calculatorDialog.locator('button:has-text("Mensual")');
  await expect(monthlyPaymentOption).toBeVisible();

  const unavailableText = monthlyPaymentOption.locator('span:has-text("No disponible")');
  await expect(unavailableText).toBeVisible();
});
