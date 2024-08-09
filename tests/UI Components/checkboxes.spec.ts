import {test, expect} from '@playwright/test'


//Before each is a hook. will get executed before my test. 
test.beforeEach (async ({page})  => {

    await page.goto('http://localhost:4200/ ');
})





test ('CHECKBOXES', async ({page})=>{
    await page.getByTitle('Modal & Overlays').click();
    await page.getByTitle('Toastr').click();

    //find the locator for checkbox 
    await page.getByRole('checkbox', {name: 'Hide on click'}).click({force: true}); //clicking the checkbox 
    await page.getByRole('checkbox', {name: 'Hide on click'}).check({force: true}); //will check the checkbox 

    await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true}); //will uncheck the checkbox 
    await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).uncheck({force: true}); //will uncheck the checkbox 
    await page.getByRole('checkbox', {name: 'Show toast with icon'}).check({force: true}); //will uncheck the checkbox 


    //let say we want to select all checkboxes
      //1 create locator for all checkboxes
    const allCheckboxes =  page.getByRole('checkbox');
    for (const box of await allCheckboxes.all()) { //--> on each iteration box will have the locator for each checkbox. 
       await box.check({force: true});
       expect (await box.isChecked()).toBeTruthy();
    } 

    for (const box of await allCheckboxes.all()) { //--> on each iteration box will have the locator for each checkbox. 
        await box.uncheck({force: true});
        expect (await box.isChecked()).toBeFalsy();
     } 



    


})
 