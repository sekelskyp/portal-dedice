import { expect, test } from '@playwright/test'

test('assert title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Portál dědice/)
  await expect(page.getByRole('link', { name: 'Portál dědice' })).toBeVisible()
})

test('asserts app menu', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'Přihlásit se' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Registrovat se' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Jak to funguje' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'O nás' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Blog' })).toBeVisible()
})
