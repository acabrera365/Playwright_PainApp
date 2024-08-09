import {test} from '@playwright/test'


//Before each is a hook. will get executed before my test. 
test.beforeEach (async ({page})  => {

    await page.goto('http://localhost:4200/ ');
    await page.getByText ("Forms").click();
    await page.getByText("Form Layouts").click();

})



//Parent Locators test 
test ('locating Parent Elements', async({page})=>{

    // playwright the nb-card that had the tx 
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click();  //locator for email text box insider form: Using the grid 
    await page.locator('nb-card', {hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click();  //locator for email text box insider form: Basic form


    //provide secoind attribute as a locator 
    await page.locator('nb-card', {has: page.locator("#inputEmail1")}).getByRole('textbox', {name: "Email"}).click();  //locator for email text box insider form: Basic form


    //using biuld in filter
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click(); 
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Password"}).click(); 


    //we wamnt to find a button with specific conbination 
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click(); 


    //when you want to go only one level up  (NOT RECOMENDED)
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click(); 

 
 })