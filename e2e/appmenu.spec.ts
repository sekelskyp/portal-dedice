import test, { expect } from '@playwright/test'

test('asserts app menu', async ({ page }) => {
  await page.goto('/')
  const header = await page.locator('header')
  await expect(header.getByRole('link', { name: 'Přihlásit se' })).toBeVisible()
  await expect(
    header.getByRole('link', { name: 'Registrovat se' })
  ).toBeVisible()
  await expect(
    header.getByRole('link', { name: 'Jak to funguje' })
  ).toBeVisible()
  await expect(header.getByRole('link', { name: 'O nás' })).toBeVisible()
  await expect(header.getByRole('link', { name: 'Blog' })).toBeVisible()
})
