import {test, expect} from '@playwright/test'


//Before each is a hook. will get executed before my test. 
test.beforeEach (async ({page})  => {

    await page.goto('http://localhost:4200/ ');
})



//ui inoputs

test.describe('Form Laypout Page', ()=>{
    test.beforeEach (async ({page})  => {

        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    })

    test('radio buttons', async({page})=>{
         //write the locarot for the input field
         const usingGridForm = page.locator('nb-card', {hasText: "Using the Grid"});

         //await usingGridForm.getByLabel('Option 1').check({force: true});  //check() method is for radio buttons 
         await usingGridForm.getByRole('radio', {name: "Option 1"}).check({force: true});  //check() method is for radio buttons 


         //-->============= how to validate
         const radioStatus = await usingGridForm.getByRole('radio', {name: "Option 1"}).isChecked();
         expect(radioStatus).toBeTruthy(); //what is to be thruthy 
         await expect (usingGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked();

         await usingGridForm.getByRole('radio', {name: "Option 2"}).check({force: true});      //checking radio button 2 
         expect (await usingGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy();  //radio button should be uiselected 
         expect (await usingGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy(); //radio button 2 should be selected

            
         

    } )


    test('radio buttons _VisualTesting', async({page})=>{
        //write the locarot for the input field
        const usingGridForm = page.locator('nb-card', {hasText: "Using the Grid"});

        //await usingGridForm.getByLabel('Option 1').check({force: true});  //check() method is for radio buttons 
        await usingGridForm.getByRole('radio', {name: "Option 2"}).check({force: true});  //check() method is for radio buttons 


        //-->============= how to validate
        const radioStatus = await usingGridForm.getByRole('radio', {name: "Option 1"}).isChecked();
         
        //made a visual assertion base on the snapshot-Screenshot
        await expect(usingGridForm).toHaveScreenshot();   //this is going to be our baseline screenshot. to use later on the comparission




       

           
        

   } )
      
})
 