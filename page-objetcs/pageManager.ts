import { Locator, Page, expect } from "@playwright/test";


import {NavigationPage} from  './navigationPage'  //is the class is highlighted in red is because class should be "exportable"
import { FormLayoutPage } from '../page-objetcs/formLayoutsPage';
import { DatePickerPage } from '../page-objetcs/datePickerPage';
import { HelperBase } from "./helperBase";


export class PageManager extends HelperBase{

    //private readonly page: Page 
    private readonly navigatioPage : NavigationPage //1  variables that are type of our page objects. 
    private readonly formLayoutPage: FormLayoutPage //1. variables that are type of our page objects.
    private readonly datePickerPage: DatePickerPage //1. variables that are type of our page objects.

    constructor (page: Page){
        
                                                    //2. Call all our pages in the constructor including the page Fixture. 
         //this.page = page;
         super(page)

        //We pass the page fixture. But we will pass the page fixture related to the pageObject Manager Class. 
        //This way, the page ficture will be transmited from the  *** test code> PageManager > (NavigaionPage / FromLayoputPage / DatePicker Page) ***
        this.navigatioPage  =  new NavigationPage(this.page); 
        this.formLayoutPage =  new FormLayoutPage(this.page);
        this.datePickerPage =  new DatePickerPage(this.page);

    }

                                                    //3. Create methods that will returns all the instances of the page objects. 

    navigateTo()       { return this.navigatioPage; }
    onFormLayoutPage() { return this.formLayoutPage; }
    onDatepickerPage() { return this.datePickerPage; }

}