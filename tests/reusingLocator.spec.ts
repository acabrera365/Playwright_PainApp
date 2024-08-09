import {test, expect} from '@playwright/test'


//Before each is a hook. will get executed before my test. 
test.beforeEach (async ({page})  => {

    await page.goto('http://localhost:4200/ ');
    await page.getByText ("Forms").click();
    await page.getByText("Form Layouts").click();

})



//Resusing locators
test ('resuse locators', async({page})=>{

 

    //await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).fill('testUser@Test.com');  //locator for email text box insider form: Basic form
    //await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Password"}).fill('Welcome123');  //locator for email text box insider form: Basic form
   //await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('button').click();  //locator for email text box insider form: Basic form

   const basicForm =  page.locator('nb-card').filter({hasText: "Basic form"});
   const emailField = basicForm.getByRole('textbox', {name: "Email"})

   await emailField.fill('testUser@Test.com');  //locator for email text box insider form: Basic form
   await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123');  //locator for email text box insider form: Basic form
   await basicForm.locator('nb-checkbox').click();
   await basicForm.getByRole('button').click();  //locator for email text box insider form: Basic form


   await expect (emailField).toHaveValue('testUser@Test.com');



 
 })