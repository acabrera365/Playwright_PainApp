import {test, expect} from '@playwright/test'
import { timeout } from 'rxjs-compat/operator/timeout';


//Before each is a hook. will get executed before my test. 
test.beforeEach (async ({page})  => {

    //await page.goto('http://uitestingplayground.com/ajax');
    //await page.goto(process.env.URL);  //using process environment variavles form file .env
    await page.goto('/');  //using playwright.config file baseURL value
    await page.getByText ("Button Triggering AJAX Request").click();
    

})

  //On the line below, the click funtion is waiting (Defaulted, 30 sec), for below conditions to be meet before clicking on the button:
        /*
           -attached
           -visible
           -stable 
           -recieve events
           -enabled
           -editable

         not all methods wait for the same condition. find more detaile here -> https://playwright.dev/docs/actionability
         There are methods that do not wait for enything. Example: .allTextContents(); 


       */



//Auto waiting
//How to reduce the defaulted timeout: 
         //playwright.config.ts file  >  defineConfig > timeout: 10000
test ('Auto waiting', async({page})=>
    {

      const successMessage = page.locator('.bg-success'); //LOCATOR FOR THE SUCCESS MESAGE

      //await successButton.click(); //playwright will wait up to 30 sec. 


      
      //await successMessage.waitFor({state: "visible"});  //frocing wait element to be visible
        const text = await successMessage.allTextContents(); // all text content DONT support autowait, so it fails right away. --> lets force an autowait 
      //const text = await successButton.textContent(); // text content support autowait we dont need to force the wait



      //expect (text).toContain('Data loaded with AJAX get request.');  //general assertion with string 
      await expect(successMessage).toHaveText('Data loaded with AJAX get request.', {timeout: 20000}); //locator assertion, we can give a custom time out 
      
      
      
    

  })

   //Alternative waits
   //How to reduce the defaulted timeout:  //playwright.config.ts file  >  defineConfig > timeout: 10000
test ('Alternatives waits', async({page})=>
    {

    //===============1. wait for element
    //   const successMessage = page.locator('.bg-success'); //LOCATOR FOR THE SUCCESS MESAGE
    //   await page.waitForSelector('.bg-success');  //waiting for the element
    //   const text = await successMessage.allTextContents(); // all text content DONT support autowait
    //   expect (text).toContain('Data loaded with AJAX get request.');  //general assertion with string 


    //=============2. wait for particular response of a particular call method --use the network tab on dev debug tool. 
        // const successMessage = page.locator('.bg-success'); //LOCATOR FOR THE SUCCESS MESAGE
        // await page.waitForResponse('http://uitestingplayground.com/ajaxdata'); //i got the url from the requets body of the url. 
        // const text = await successMessage.allTextContents(); // all text content DONT support autowait
        // expect (text).toContain('Data loaded with AJAX get request.');  //general assertion with string 


    //=============3. wait for networks call are compleyted (NOT RECOMENDED). It wait for ALL API call are completed
    const successMessage = page.locator('.bg-success'); //LOCATOR FOR THE SUCCESS MESAGE
    await page.waitForLoadState('networkidle');
    const text = await successMessage.allTextContents(); // all text content DONT support autowait
    expect (text).toContain('Data loaded with AJAX get request.');  //general assertion with string 


  })