import {test, expect} from '@playwright/test'


//Before each is a hook. will get executed before my test. 
test.beforeEach (async ({page})  => {

    await page.goto('http://localhost:4200/ ');
})





test ('listDropdowns', async ({page})=>{


  await page.getByText('Modal & Overlays').click();
  await page.getByText('Toastr').click();
  const dropDown = await page.locator('ngx-header nb-select')
  await dropDown.click();


  //how to select items from the list 

  page.getByRole('list'); //when the list has a UL tag
  page.getByRole('listitem')//has the Li tag. will represent the array of lisyt elements


  //const optionList = page.getByRole('list').locator('nb-option'); //first we found the list, then we found it elements 
  const optionList2 = page.locator('nb-option-list nb-option');
  await expect(optionList2).toHaveText(["Light","Dark","Cosmic","Corporate"]); //validateting that the dropdoqn has all elements 


  await optionList2.filter({hasText: "Cosmic"}).click(); //selecting cosmic from the list of elements 

  //make validation of backgroudn color
  const header = page.locator('nb-layout-header')
  await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)') //validating the ccs property


  //================   validating every color
  //1. create an object with all the color values. 
  const colors = {
     "Light": "rgb(255, 255, 255)"
     ,"Dark": "rgb(34, 43, 69)"
     ,"Cosmic": "rgb(50, 50, 89)"
     ,"Corporate": "rgb(255, 255, 255)"

  }
    

  //2Loop for ecah item in the object. 
  await dropDown.click();
  for (const color in colors ){
    await optionList2.filter({hasText: color}).click(); //Light, Dark, Cosmic, Corporate
    await expect(header).toHaveCSS('background-color', colors[color]) //validating the ccs property
    await dropDown.click();

  }


    


})
 