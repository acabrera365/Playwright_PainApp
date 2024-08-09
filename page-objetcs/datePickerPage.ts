import { Locator, Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";



export class DatePickerPage extends HelperBase{

  //private readonly page:Page

  constructor (page: Page){
    super(page)
  }

  //method 1

  async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){

    const inputFieldCalendar = this.page.getByPlaceholder('Form Picker');
    await inputFieldCalendar.click();  
    const dateToAssertReturned = await this.selectDateInTheCalendar(numberOfDaysFromToday);                                       //opening the datepicker box
    await expect(inputFieldCalendar).toHaveValue(dateToAssertReturned)

      


  }

  async selectDatePickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number){
    const inputFieldCalendar = this.page.getByPlaceholder('Range Picker');  //locator for th einput field
    await inputFieldCalendar.click(); 
    const startDayFromTodayateToAssertReturned = await this.selectDateInTheCalendar(startDayFromToday);  
    const endDateToAssertReturned = await this.selectDateInTheCalendar(endDayFromToday);  

    const expectedStringInTheIputField = startDayFromTodayateToAssertReturned+' - '+endDateToAssertReturned;
    await expect(inputFieldCalendar).toHaveValue(expectedStringInTheIputField)




  }

  private async selectDateInTheCalendar(numberOfDaysFromToday: number){

    let date = new Date(); //new date variable 
    //const options: Intl.DateTimeFormatOptions = {month: 'short'};
    date.setDate(date.getDate() + numberOfDaysFromToday );  //seeting the new date current date plus 1 day 
    console.log(date);

    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'});
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'});
    const expectedYear = date.getFullYear().toString();
    const dateToAssert =  expectedMonthShort+' '+expectedDate+', '+expectedYear;

    let calendarmonthAndYear =  await this.page.locator('nb-calendar-view-mode').textContent();
    const expectedMonthAndYEar = expectedMonthLong+' '+expectedYear;
    while(!calendarmonthAndYear.includes(expectedMonthAndYEar)){

         await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();  //clicking the right icon on the date picker
         calendarmonthAndYear =  await this.page.locator('nb-calendar-view-mode').textContent();          //getting the new calendar value displayed

    }
    console.log("this is the wanted date, full fomrat: " +dateToAssert);
    await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click(); //selecting the day in the calendar  values of attribute has two values: 1.day-cell 2.ng-star-inserted
    return dateToAssert;

  }


}