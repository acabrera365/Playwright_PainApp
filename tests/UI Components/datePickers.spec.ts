import {test, expect} from '@playwright/test'


//Before each is a hook. will get executed before my test. 
test.beforeEach (async ({page})  => {

    //await page.goto('http://localhost:4200/');
    await page.goto('/'); // using base URL
})





test ('datePickers @junk1', async ({page})=>{
    await page.getByTitle('Forms').click();
    await page.getByTitle('DatePicker').click();


    //locator for datepicker input 
    const inputFieldCalendar = page.getByPlaceholder('Form Picker');
    await inputFieldCalendar.click(); //opening the 
    //await page.locator('.day-cell ng-star-inserted').getByText('1', {exact: true}).click(); //get by
    await page.locator('[class= "day-cell ng-star-inserted"]').getByText('1', {exact: true}).click(); //get by
    await expect(inputFieldCalendar).toHaveValue('Aug 1, 2024');



    


})

test ('datePickersDynamicChosing @junk1', async ({page})=>{
    await page.getByTitle('Forms').click();
    await page.getByTitle('DatePicker').click();


    //locator for datepicker input 
    const inputFieldCalendar = page.getByPlaceholder('Form Picker');
    await inputFieldCalendar.click(); //opening the datepicker 

    let date = new Date(); //new date variable 
    

    //const options: Intl.DateTimeFormatOptions = {month: 'short'};
    date.setDate(date.getDate() + 0 );  //seeting the new date current date plus 1 day 
    console.log(date);

    const currentDay = date.getDate().toString();
    const currentMonth = date.toLocaleString('En-US', {month: 'short'});
    const currentYear = date.getFullYear().toString();
    const givenDate =  currentMonth+' '+currentDay+', '+currentYear;


    console.log(currentMonth + ' '+ currentDay + ', '+currentYear);
    await page.locator('[class="today day-cell ng-star-inserted"]').getByText(currentDay, {exact: true}).click(); //selecting the day in the calendar


    //assetion:
    await expect(inputFieldCalendar).toHaveValue(givenDate); //asserting that the selecteed is correct.


})
 