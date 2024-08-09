import {test} from '../test-options'   //we are using out file that already have expended test from '@playwright/test'
import { PageManager } from '../page-objetcs/pageManager';  //we are importing this under fixture pageManager Fixture


// //Before each is a hook. will get executed before my test. 
// test.beforeEach (async ({page})  => {

//     await page.goto('http://localhost:4200/ ');
    
// })




test('parametrizedMethods', async ({pageManager, formLayoutsPage})=>{  //the fisture formLayoutPage is initialized before the browser is lauched, it is a precondition. 

    //using the pageManager instance
    //const pm = new PageManager(page);  //It is responsible of handling all instances of pages objest on a single class
    //await pm.navigateTo().formLayoutPage();
    await pageManager.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', "Welcome 1", "Option 2");
    await pageManager.onFormLayoutPage().submitInlineFormWithNameAndEmailAndCheckBox('John Smith ','johnSmith@Test.com', false);
    

})


 