import { defineConfig, PlaywrightTestConfig } from '@playwright/test'

require('dotenv').config()

const defaultFEUrl = 'http://localhost:3000'
const defaultBEUrl = 'http://localhost:4000'

console.log('Running E2E tests on: ', process.env.FRONTEND_URL ?? defaultFEUrl)

const config: PlaywrightTestConfig = {
  testDir: './e2e', // Directory where tests will be placed
  webServer: [],
  use: {
    baseURL: process.env.FRONTEND_URL ?? defaultFEUrl,
    headless: true,
    video: 'on-first-retry',
  },
}

if (!process.env.FRONTEND_URL && Array.isArray(config.webServer)) {
  config.webServer.push({
    command: 'yarn frontend dev',
    url: defaultFEUrl,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  })
  config.webServer.push({
    command: 'yarn backend dev',
    url: defaultBEUrl,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
    env: {
      MOCKS: 'true',
    },
  })
}

export default defineConfig(config)
