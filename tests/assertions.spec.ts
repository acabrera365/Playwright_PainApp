import {test, expect} from '@playwright/test'


//Before each is a hook. will get executed before my test. 
test.beforeEach (async ({page})  => {

    await page.goto('http://localhost:4200/ ');
    await page.getByText ("Forms").click();
    await page.getByText("Form Layouts").click();

})



//assertions
test ('Assertions', async({page})=>
    {


    /*
     playwright has two types of assertions:
      1. general 
      2. locator

    */

      //general assertions 
      const value = 5;
      expect (value).toEqual(5);  //compare the value on the left with the right

      const basicForm_submit_button =  page.locator('nb-card').filter({hasText: "Basic form"}).locator('button');
      const usingTheGrid = page.locator('nb-card').filter({hasText: "Using the Grid"});
      const buttonText = await basicForm_submit_button.textContent();  //extracting the taxt value of the submit, when value is text in DOM
      expect (buttonText).toEqual('Submit');

      //locator assertion --> need its await keyword. The assertions wait up to 5 seconds. THEY CAN INTERACT WITH THE WEB ELEMENT. 
      await expect (basicForm_submit_button).toHaveText('Submit');

      //soft assertions -->When the test can continue, event after a failure 
      await expect.soft(basicForm_submit_button).toHaveText('Submit_WRONG');   
      await basicForm_submit_button.click();


  })