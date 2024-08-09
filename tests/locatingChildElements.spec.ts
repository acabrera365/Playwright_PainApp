import {test} from '@playwright/test'


//Before each is a hook. will get executed before my test. 
test.beforeEach (async ({page})  => {

    await page.goto('http://localhost:4200/ ');
    await page.getByText ("Forms").click();
    await page.getByText("Form Layouts").click();

})



//Child Locators test 
test ('locating Child Elements', async({page})=>{

    //separating the locators by space. 
     await page.locator ('nb-card nb-radio :text-is("Option 1")').click();
 
     //chaning locators 1 by 1 
     await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();

     //finding the sign in button, nested under 
     await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click();  // why first?? if you already limimt it to be np-card --> ANSWER: nb-card  DID NOT LIMIT ANYTHING

     
 
 })