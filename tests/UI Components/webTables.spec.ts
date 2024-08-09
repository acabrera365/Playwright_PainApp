import {test, expect} from '@playwright/test'


//Before each is a hook. will get executed before my test. 
test.beforeEach (async ({page})  => {

    await page.goto('http://localhost:4200/ ');
})





test ('webTables', async ({page})=>{


  await page.getByText('Tables & Data').click();
  await page.getByText('Smart Table').click();

//1 Example. how to get the row by any text in the row 

const row = page.getByRole('row',{name: "twitter@outlook.com"}); //finding a row with a specific text.
await row.locator('.nb-edit').click();

await page.locator('input-editor').getByPlaceholder('Age').clear();  //clear the input field
await page.locator('input-editor').getByPlaceholder('Age').fill('85');  //send the new value 
await page.locator('.nb-checkmark').click();


//2 Example. select a row by an id value. an edit its age
 await page.locator('.ng2-smart-pagination-nav').getByText('2').click();
 //const targetRowById = page.getByRole('row',{name: "11"}).filter({has: page.locator('td').nth(1).getByText('12')}); //finding a row with a specific text. then, all columns, then only forts column, then the one that has text 11. 
 const targetRowById = page.getByRole('row').filter({has: page.locator('td').nth(1).getByText('12')}); //finding a row with a specific text. then, all columns, then only forts column, then the one that has text 11. 

await targetRowById.locator('.nb-edit').click();
await page.locator('input-editor').getByPlaceholder('Age').clear();  //clear the input field
await page.locator('input-editor').getByPlaceholder('Age').fill('85');  //send the new value 
await page.locator('input-editor').getByPlaceholder('E-mail').clear();  //clear the input field
await page.locator('input-editor').getByPlaceholder('E-mail').fill('david@test.com');  //send the new value
await page.locator('.nb-checkmark').click();
//assertion
await expect(targetRowById.locator('td').nth(5)).toHaveText('david@test.com'); //nth is the 4th column that is the one for email. 

})

//second test how to loop a table. 
test ('LoopingTable', async ({page})=>{


  await page.getByText('Tables & Data').click();
  await page.getByText('Smart Table').click();

const ages = ["20","30","-1"]

for (let age of ages){
   
  await page.locator('input-filter').getByPlaceholder('Age').clear();  //clear the input field
  await page.locator('input-filter').getByPlaceholder('Age').fill(age);  //send the new value 
  await page.waitForTimeout(500);  //hardcore the wait to see, animation

  //get all the rows from the table, and assert each row
      const resultsRows = page.locator('tbody tr');  //this locator get all the rows of the table. 
      for (let row of await resultsRows.all()){  //rows result are web elements
          const cellValue = await row.locator('td').last().textContent();  //the age is the last column of each row. 

          if(age == '-1'){  //-1 is value for edge case
             //expect (await page.getByRole('table').textContent()).toContain('No data found');
             expect (await resultsRows.textContent()).toContain('No data found'); //using my David locator wuju!!!
          }
          else{
             expect (cellValue).toEqual(age);
          }
         

      }


}

})
 