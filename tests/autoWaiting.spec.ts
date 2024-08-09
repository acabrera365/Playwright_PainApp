import {test, expect} from '@playwright/test'


//Before each is a hook. will get executed before my test. 
test.beforeEach (async ({page})  => {

    await page.goto('http://localhost:4200/ ');
    await page.getByText ("Forms").click();
    await page.getByText("Form Layouts").click();

})



//Auto waiting
test ('Auto waiting', async({page})=>
    {

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
      const basicForm_submit_button =  page.locator('nb-card').filter({hasText: "Basic form"}).locator('button');
      await basicForm_submit_button.click();

  })