import {test} from '@playwright/test'


//   test.describe ('test_Suite_1', () => {

//     test ('test_S1',()=> {

    
//     })

//     test ('test_S2',()=> {

    
//     })


//   })

//Before each is a hook. will get executed before my test. 
test.beforeEach (async ({page})  => {

    await page.goto('http://localhost:4200/ ');
    await page.getByText ("Forms").click();
    await page.getByText("Form Layouts").click();

})


//my fisrt test
/*   test ('single_test_1',async ({page})=> {  //page is one fixture

    await page.goto('http://localhost:4200/ ');

  }) */

//Locators test 
test ('Locator syntax rules', async({page})=>{

  //by tag name 
  page.locator('input');

  //by id
  page.locator('#inputEmail1');

  //by class value
  page.locator('.shape-rectangle');

  //by attribute
  page.locator('[placeholder="Email"]');

  //combine different locators (id + attribute)
  await page.locator('input[placeholder="Email"]').click();

  //XPAth --> not recomended, since they break easily
  page.locator('//*[@input="inputEmail1"]');

  //by partial match text
  page.locator(':text("Using")');


})