import {test, expect} from '@playwright/test'
import { timeout } from 'rxjs-compat/operator/timeout';


//Before each is a hook. will get executed before my test. 
test.beforeEach (async ({page}, testinfo)  => {

    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByText ("Button Triggering AJAX Request").click();
    testinfo.setTimeout(testinfo.timeout + 2000) // with this you can overwritte the toimeout for a complete suite. 
    

})



   //Timeout
test ('timeout', async({page})=>
    {

    /*
       there are 3 layers of timeout 
            1. global timeout --> time for the hole test to execute
            2. test timeout   --> time for a single tets to be executed 
            3.   action timeout: click(), fill();
                 navigation timeout: page.goto();
                 expect timeout:  expect.(locator).toHaveText('Hello');



         how to configure:
             use the playwright .config.ts
                 timeout:  10000 -->  in the global settings
                 globaltimeout: 10000 --> global timeout

                 use{
                   actionTimeout: 10000
                   navigationTimeout: 1000
                 }


                 expect{
                   timeout:10000 //to overwritte the expect timeout for all test
                 }
    */

    test.setTimeout(10000) //this way we can overwritte the test timeout
    test.slow();  // this line will multiply by 3 the defaulted timeout set on playwright.config file

    const successMessage = page.locator('.bg-success'); //--> this button to show up takes 15 sec. 
    await successMessage.click({timeout: 16000})  //this way we can overwritte the global timeout
    await expect(successMessage).toHaveText('Data loaded with AJAX get request.', {timeout: 20000}); //locator assertion, we can give a custom time out 


  })