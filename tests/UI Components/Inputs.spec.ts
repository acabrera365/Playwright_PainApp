import {test, expect} from '@playwright/test'


//Before each is a hook. will get executed before my test. 
test.beforeEach (async ({page})  => {

    await page.goto('http://localhost:4200/ ');
})



//ui inoputs

test.describe('Form Laypout Page', ()=>{
    test.describe.configure({retries: 2}) //overwritting the execution, to retry 2 times after failure. 


    test.beforeEach (async ({page})  => {

        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    })

    test('inputs fields', async({page}, testInfo)=>{

        
         //write the locarot for the input field
         const usingGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"});
            await usingGridEmailInput.fill('test@test.com');

            //clear the value 
            await usingGridEmailInput.clear();

            //simoulate keyboard
            await usingGridEmailInput.pressSequentially('test@test.com', {delay: 10});

            //how to make assestions of the input field
               //generic assertion

             //const inputValue = await usingGridEmailInput.inputValue(); //now the value of the locator is saved in the const. 
             //expect(inputValue).toEqual('test@test.com');

                //locator assertion 

           
                //await expect(usingGridEmailInput).toHaveValue('test@test.com');
                console.log(testInfo.retry)
                if(testInfo.retry>0){
                    //in here we will put the code that will be diferent on the retry?
                    await expect(usingGridEmailInput).toHaveValue('test@test.com');
                }
                else{
                    await expect(usingGridEmailInput).toHaveValue('test@test.com123');
                }
                
          
         

    } )
      
})
 