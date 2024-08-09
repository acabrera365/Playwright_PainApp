import {test, expect} from '@playwright/test'


//Before each is a hook. will get executed before my test. 
test.beforeEach (async ({page})  => {

    await page.goto('http://localhost:4200/ ');
    await page.getByText ("Forms").click();
    await page.getByText("Form Layouts").click();

})



//Extract values
test ('Extract values', async({page})=>
    {


        const basicForm =  page.locator('nb-card').filter({hasText: "Basic form"});
        const usingTheGrid = page.locator('nb-card').filter({hasText: "Using the Grid"});
     //single text value 
     const buttonText = await basicForm.locator('button').textContent();  //extracting the taxt value of the submit, when value is text in DOM
     expect(buttonText).toEqual('Submit');

     //get all text values
     const allRadioBtnText = await usingTheGrid.locator('nb-radio').allTextContents();
     expect (allRadioBtnText).toContain('Option 1')

     //find the inputed value of an text field
     const emailfield = basicForm.getByRole('textbox',{name: "Email"});
     await emailfield.fill('test@test.com');
     const emailvalue=  await emailfield.inputValue();
     expect (emailvalue).toEqual('test@test.com');

     //retrieve the value of an attribute
     const placeholderValule = await emailfield.getAttribute('placeholder') //inside the get attribite provide the attribute name
     expect (placeholderValule).toEqual('Email')





 
  })