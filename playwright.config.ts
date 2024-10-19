import { defineConfig, PlaywrightTestConfig } from '@playwright/test'

require('dotenv').config()

const config: PlaywrightTestConfig = {
  testDir: './e2e', // Directory where tests will be placed
  webServer: [],
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    video: 'on-first-retry',
  },
}

if (!process.env.FRONTEND_URL && Array.isArray(config.webServer)) {
  config.webServer.push({
    command: 'yarn frontend dev',
    url: process.env.FRONTEND_URL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  })
}

if (!process.env.BACKEND_URL && Array.isArray(config.webServer)) {
  config.webServer.push({
    command: 'yarn backend dev',
    url: process.env.BACKEND_URL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
    env: {
      MOCKS: 'true',
    },
  })
}

export default defineConfig(config)
