import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";


//Locators inside the methods, do not extract them from method

export class NavigationPage extends HelperBase{
   

   //---------------------->> WITHOUT EXTENDING HELPER BASE CLASS  << ---------------------------------------

   // readonly page1: Page         //Sample: readonly pageP: Page 
   // constructor(page2: Page)     //Page parameter in lowcase is a variable ot type Fixture Page in capital letter 
   //   {    
   //     this.page1 = page2;      //Sample: this.page = pageParameter; 
   //   }


   //---------------------->>  EXTENDING HELPER BASE CLASS  << ---------------------------------------
   
   constructor(page2: Page)
     {    
        super(page2)             //super(page 2), will page 2 to the page instance that is under HelperPage. And test execution will use that instance. (the one under helperPage class)
     }

    /*
         this.page1 --> 
           it means that we will use this.page1 instace 
           of the page that we are going to read from the construcntor 
           and this instance will be bringed from our test. 
           
           with this we make sure we are using the same instalnce across test execution. 
   */

   async formLayoutPage(){

  
      //await this.page1.getByText('Forms').click();
      await this.selectGroupMenuItem('Forms');         
      await this.page.getByText('Form Layouts').click();               //page variable is located under helperBase class
      await this.waitForNumberOfSeconds(2);
        
   }

   async datePickerPage(){

      //await this.page1.getByText('Forms').click(); 
      await this.selectGroupMenuItem('Forms');        
      await this.page.getByText('Datepicker').click();                  //page variable is located under helperBase class
      await this.waitForNumberOfSeconds(2);
  
   }

   async smartTablePage(){

      //await this.page1.getByText('Forms').click(); 
      await this.selectGroupMenuItem('Tables & Data');      
      await this.page.getByText('Smart Table').click();                  //page variable is located under helperBase class
      await this.waitForNumberOfSeconds(2);
  
   }

   

   async toasterPage(){

      //await this.page1.getByText('Modal & Overlays').click();
      await this.selectGroupMenuItem('Modal & Overlays');         
      await this.page.getByText('Toastr').click();;                  //page variable is located under helperBase class
      await this.waitForNumberOfSeconds(2);
  
   }

   async tooltipPage(){

      //await this.page1.getByText('Modal & Overlays').click(); 
      await this.selectGroupMenuItem('Modal & Overlays'); 
      await this.page.getByText('Tooltip').click();                                         //page variable is located under helperBase class
      await this.waitForNumberOfSeconds(2);
  
   }


   //method helper that checks if the form is expanded or not. 
   private async selectGroupMenuItem(groupItemTitle: string){                               //type of groupItemTitle is an string

      const groupItemItem = this.page.getByTitle(groupItemTitle);                           //page variable is located under helperBase class
      const expandedState = await groupItemItem.getAttribute('aria-expanded');
      if(expandedState == "false"){
         await groupItemItem.click();
           
      }

   }


}