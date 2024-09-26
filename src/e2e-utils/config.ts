import { devices, PlaywrightTestConfig } from '@playwright/test';

export const playwrightConfig: PlaywrightTestConfig = {
  forbidOnly: true,
  fullyParallel: false,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  reporter: 'html',
  retries: 0,
  testDir: './e2e-tests',
  timeout: 2 * 60 * 1000,
  use: {
    baseURL: 'http://localhost:3000',
    headless: process.env.CI ? true : false,
    trace: 'retain-on-failure',
    video: {
      mode: 'retain-on-failure',
      size: { height: 480, width: 640 },
    },
  },
  workers: 1,
  webServer: {
    command: 'http-server ./build -p 3000 --silent',
    reuseExistingServer: !process.env.CI,
    stderr: 'pipe',
    stdout: 'pipe',
    url: 'http://localhost:3000',
  },
};
