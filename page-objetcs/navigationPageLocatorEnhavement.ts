import { Locator, Page } from "@playwright/test";

//Locators inside the methods, do not extract them from method

export class NavigationPage {
   
   readonly page1: Page        //Sample: readonly pageP: Page 
   readonly formLayoutsMenuItems: Locator  //form LayoutsMenuItems is  a locator type of variable 
   readonly datePickerMenuItems: Locator 
   readonly smartTableMenuItems: Locator 
   readonly toastrMenuItems: Locator 
   readonly toottipMenuItems: Locator 


   
   constructor(page2: Page){    //page parameter in lowcase is a variable ot type Fixture Page in capital letter 
       this.page1 = page2;     //Sample: this.pageP = pageParameter;

       //assign the value of the locator to --> the Locator variables above created
       //this way you can reuse the locator across the screen
       this.formLayoutsMenuItems = page2.getByText('Form Layouts');
       this.datePickerMenuItems= page2.getByText('Datepicker');
       this.smartTableMenuItems = page2.getByText('Smart Table');
       this.toastrMenuItems = page2.getByText('Toastr');
       this.toottipMenuItems = page2.getByText('Tooltip');
       
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
      await this.formLayoutsMenuItems.click();
        
   }

   async datePickerPage(){

      //await this.page1.getByText('Forms').click(); 
      await this.selectGroupMenuItem('Forms');        
      await this.datePickerMenuItems.click();
  
   }

   async smartTablePage(){

      //await this.page1.getByText('Forms').click(); 
      await this.selectGroupMenuItem('Tables & Data');      
      await this.smartTableMenuItems.click();
  
   }

   

   async toasterPage(){

      //await this.page1.getByText('Modal & Overlays').click();
      await this.selectGroupMenuItem('Modal & Overlays');         
      await this.toastrMenuItems.click();
  
   }

   async tooltipPage(){

      //await this.page1.getByText('Modal & Overlays').click(); 
      await this.selectGroupMenuItem('Modal & Overlays'); 
      await this.toottipMenuItems.click();
  
   }


   //method helper that checks if the form is expanded or not. 
   private async selectGroupMenuItem(groupItemTitle: string){ //type of groupItemTitle is an string

      const groupItemItem = this.page1.getByTitle(groupItemTitle);
      const expandedState = await groupItemItem.getAttribute('aria-expanded');
      if(expandedState == "false"){
         await groupItemItem.click();
           
      }

   }


}