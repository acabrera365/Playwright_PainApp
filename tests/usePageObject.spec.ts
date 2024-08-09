import { test, expect} from '@playwright/test'
import { NavigationPage} from  '../page-objetcs/navigationPage'  //is the class is highlighted in red is because class should be "exportable"
import { FormLayoutPage } from '../page-objetcs/formLayoutsPage';
import { DatePickerPage } from '../page-objetcs/datePickerPage';

//using fake data generator 
import { faker} from '@faker-js/faker'




//Before each is a hook. will get executed before my test. 
test.beforeEach (async ({page})  => {

    await page.goto('/');
})





test ('navigate to form page', async ({page})=>{
 
    //create a new instance of the Navigation class
    const navigateTo = new NavigationPage(page); //we are passing page(fixture) from our test. 
    await navigateTo.formLayoutPage();
    await navigateTo.datePickerPage();
    await navigateTo.smartTablePage();
    await navigateTo.toasterPage();
    await navigateTo.tooltipPage();



})

test('parametrizedMethods', async ({page})=>{

    const navigateTo = new NavigationPage(page); //we are passing page(fixture) from our test. 
    const onFormLayoutPage = new FormLayoutPage(page);
    const onDatePickerPage = new DatePickerPage(page);

    
   
    const randomFullName = faker.location.city()  //creating fake data
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com`
    

    await navigateTo.formLayoutPage();
    //await onFormLayoutPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', "Welcome 1", "Option 2");
    await onFormLayoutPage.submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, "Option 2"); //using process env variables

    //screenshots
    await page.screenshot({path: "screenshots/onFormLayoutPage.png"})                                                  //creating a hole screen screenhot, need to give a screenshot
    await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: "screenshots/onFormLayoutPage1.png"})    //creating a specif acrea of the screen screehshot
   


    //await onFormLayoutPage.submitInlineFormWithNameAndEmailAndCheckBox('John Smith ','johnSmith@Test.com', false);
    await onFormLayoutPage.submitInlineFormWithNameAndEmailAndCheckBox(randomFullName ,randomEmail, false);
    

    //await navigateTo.datePickerPage();
    //await onDatePickerPage.selectCommonDatePickerDateFromToday(365); 
    //await onDatePickerPage.selectDatePickerWithRangeFromToday(365,367)

})


 