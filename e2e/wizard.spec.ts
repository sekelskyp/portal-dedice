import { expect, test } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('/wizard')
  let main = await page.locator('main')
  await main
    .locator('[id="radio-group\\:\\:r7\\:\\:radio\\:control\\:female"]')
    .click()
  await page.getByLabel('Open calendar').click()
  await page.getByRole('button', { name: '10' }).click()
  await main
    .getByRole('combobox', { name: 'Trvalé bydliště' })
    .fill('Biskupcova 1809')
  await page.getByRole('option', { name: 'Biskupcova 1809/45 Praha 3' }).click()
  await main.getByRole('button', { name: 'Potvrdit údaje' }).click()

  main = await page.locator('main')
  await expect(main.getByRole('heading', { name: 'Iva Šídová' })).toBeVisible()
  await expect(main.getByText('+420')).toBeVisible()
  await expect(main.getByRole('link', { name: '@' })).toBeVisible()
  await main.getByText('13000').isVisible()
  await main.getByRole('button', { name: 'OK' }).click()
})
