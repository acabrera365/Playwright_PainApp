import { chromium, defineConfig, devices } from '@playwright/test';   //»» To use this config file we use cli : npx playwright test usePageObject.spec.ts --config=playwrightAngel.config.ts --headed
import type { testOptions } from './test-options';                    //»» Importing our own custom file


require('dotenv').config();                                           //»» With this line we will be able to use .env variables under our test.spec.ts files. 


  export default defineConfig<testOptions>({                          //»» We added the <TestOptions> to use our file (filename: test-Option). We can also use .env file

  //==============================Global Settings ===============================================================================

  fullyParallel: false,                                             //»»  FullyParallel: true,  -->this will execute the test withing each spect file also in parralel, using a same worker.
  retries: process.env.CI ? 2 : 0,                                  //»»  Retries when executing under Continious integration s= 2, other wise = 0.
  workers: process.env.CI ? 1 : undefined,                          //»»  By default playwright uses 5 workers (max). with those 5 playwright can execute parallel test, 1 worker per each spec file. 
  reporter: 'html',                                                 //»»  This is the guy who throws the reporter after each execution.
  

  use: {
    trace: 'on-first-retry',                                        //»» Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    video: 'on',
    
    baseURL: process.env.DEV === '1' ? 'http://localhost:4200/'     //»» If the variable DEV under porcess env is 1, then we will use baseURL = 'http://localhost:4200/'
           : process.env.QA === '1' ? 'http://localhost:4201/'      //»» If the variable QA under porcess env is 1, then we will use baseURL  = 'http://localhost:4201/'
           : 'http://localhost:4200/',

    globalQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/'
  },


//==============================Project Settings ===============================================================================
  projects: [
    {
      name: 'Dev_Env',                                               //»»  Project is just a way to gropu test, it can be by browser, by env, by module, etc. 
      
      use: { 
              browserName: 'chromium',
              baseURL: 'http://localhost:4200/'
           },
       fullyParallel: true                                          //»» This way chormium project will run in parrallel.
       
    },

  ],


});
