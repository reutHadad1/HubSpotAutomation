import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://app.hubspot.com',
    headless: true,
    screenshot: 'on',
    video: 'retain-on-failure',
  },
  testDir: './src/tests',
  reporter: [
    ['list'], // Console output of test results
    ['html', { outputFolder: 'test-results/html', open: 'never' }], // Separate folder for HTML report
  ],
  outputDir: 'test-results/output/', // Change this to avoid conflict
});
