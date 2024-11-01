import { expect, test } from '@playwright/test'

test('assert title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Portál dědice/)
  await expect(page.getByRole('link', { name: 'Portál dědice' })).toBeVisible()
})
