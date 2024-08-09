import { defineConfig, devices } from '@playwright/test';
import type { testOptions } from './test-options'; //importing our own custom file

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

require('dotenv').config(); //with this line we will be able to use .env variables under our test.spec.ts files. 

// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
  //export default defineConfig({
  export default defineConfig<testOptions>({ //we added the <TestOptions> to use our file (filename: test-Option)
  //timeout: 30000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,  //»»  fullyParallel: true,  -->this will execute the test withing each spect file also in parralel, using a same worker
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0, //retries when executing under Continious integration s= 2, other wise =0
  retries: 0, //retries 1 time our test upon fail status
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined, //»»  by default playwright uses 5 workers (max). with those 5 playwright can execute parallel test, 1 worker per each spec file. 
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  reporter: [
              ['json', {outputFile: 'test-results/jsonReport.json'}],
              ['junit', {outputFile: 'test-results/jsonReport.xml'}],
              ['html']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: 'on',
    //baseURL: 'http://localhost:4200/',

    //using javascript to swithc env variables 
    baseURL: process.env.DEV === '1' ? 'http://localhost:4200/' //if the variable DEV under porcess env is 1, then we will use baseURL = 'http://localhost:4200/'
           : process.env.QA === '1' ? 'http://localhost:4201/' //if the variable QA under porcess env is 1, then we will use baseURL = 'http://localhost:4201/'
           : 'http://localhost:4200/',

    globalQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/'
  },

  /* Configure projects for major browsers */
  projects: [

    {
      name: 'mobileDevice',
      testMatch: 'testMobile.spec.ts',
       //specify the device  =======================================mobile devices
      use:
      {
        ...devices['iPhone 12 Mini']
      }
    },
    {
      name: 'dev',
      use: { 
              ...devices['Desktop Chrome'] ,
              baseURL: 'http://localhost:4200/'
           },
      fullyParallel: true //this way chormium project will run in parrallel. 
    },
    {
      name: 'qa',
      use: { 
           ...devices['Desktop Chrome'] ,
           baseURL: 'http://localhost:4201/'
         },
      fullyParallel: true //this way chormium project will run in parrallel. 
    },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      fullyParallel: true //this way chormium project will run in parrallel. 
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  webServer:{
    command : 'npm run start',
    url: 'http://localhost:4200/'
  }

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
