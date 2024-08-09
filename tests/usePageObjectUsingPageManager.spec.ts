import {test, expect} from '@playwright/test'


import { PageManager } from '../page-objetcs/pageManager';


//Before each is a hook. will get executed before my test. 
test.beforeEach (async ({page})  => {

    await page.goto('http://localhost:4200/ ');
    
})





test ('navigate to form page', async ({page})=>{
 
    //using the pageManager instance
    const pm = new PageManager(page);

    await pm.navigateTo().formLayoutPage();
    await pm.navigateTo().datePickerPage();
    await pm.navigateTo().smartTablePage();
    await pm.navigateTo().toasterPage();
    await pm.navigateTo().tooltipPage();
    


})

test('parametrizedMethods', async ({page})=>{

    //using the pageManager instance
    const pm = new PageManager(page);  //It is responsible of handling all instances of pages objest on a single class
    await pm.navigateTo().formLayoutPage();
    await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', "Welcome 1", "Option 2");
    await pm.onFormLayoutPage().submitInlineFormWithNameAndEmailAndCheckBox('John Smith ','johnSmith@Test.com', false);
    await pm.navigateTo().datePickerPage();
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(365); 
    await pm.onDatepickerPage().selectDatePickerWithRangeFromToday(365,367)

})


 