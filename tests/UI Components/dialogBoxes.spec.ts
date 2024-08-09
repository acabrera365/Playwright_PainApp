import {test, expect} from '@playwright/test'


//Before each is a hook. will get executed before my test. 
test.beforeEach (async ({page})  => {

    await page.goto('http://localhost:4200/ ');
})





test ('dialogboxes @junk2', async ({page})=>{


  await page.getByText('Tables & Data').click();
  await page.getByText('Smart Table').click();

  //event listener to check the browser dialog box. 
  page.on('dialog', dialog =>{
    
      expect(dialog.message()).toEqual("Are you sure you want to delete?");
      dialog.accept();


  })

  await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click();
  const tableFisrtRow = page.locator('table tr').first();
  await expect (tableFisrtRow).not.toHaveText("mdo@gmail.com");

  


    


})
 