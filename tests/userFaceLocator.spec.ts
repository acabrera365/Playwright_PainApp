import {test} from '@playwright/test'


//Before each is a hook. will get executed before my test. 
test.beforeEach (async ({page})  => {

    await page.goto('http://localhost:4200/ ');
    await page.getByText ("Forms").click();
    await page.getByText("Form Layouts").click();

})






//Locators test 
test ('User Face Locator syntax rules', async({page})=>{

  //role is the type of element we are trying to interact with. 
await page.getByRole ('textbox', {name: "Email"}).first().click(); //we are looking for a text box with the name email, since there are two, we will use the 1st one

await page.getByRole('button',{name: "Sign in"}).first().click(); //we are looking for a butto with the name Sign in, since there are two, we will use the 1st one

await page.getByLabel('Email').first().click(); 

await page.getByPlaceholder('Jane Doe').click();

await page.getByText('Using the Grid').click();

//await page.getByTitle('IoT Dashboard').click();

//can make your code very resiliant 
await page.getByTestId('SignIn').click();


})