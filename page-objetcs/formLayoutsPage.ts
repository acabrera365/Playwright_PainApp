import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";



export class FormLayoutPage extends HelperBase{

  //private readonly page: Page //variable


  constructor(page:Page){
    //this.page=page;
    super(page)
  }


//methoid 1:
async submitUsingTheGridFormWithCredentialsAndSelectOption(p_email: string, p_password: string, p_optionText: string){
  const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"});

  await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(p_email);
  await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(p_password);
  await usingTheGridForm.getByRole('radio', {name: p_optionText}).check({force: true});
  await usingTheGridForm.getByRole('button').click();
   

}


//methoid 2: below is a description of the method, that will appear upon hover over the methos on the test level. 
/**
 * This method fill out the inline form with the parameters 
 * @param p_name  - Should be first and last name
 * @param p_email - Should be a valid email. 
 * @param p_rememberMe - true/False is session want to be saves
 */

async submitInlineFormWithNameAndEmailAndCheckBox(p_name: string, p_email: string, p_rememberMe: boolean){
    const inlineForm = this.page.locator('nb-card', {hasText: "Inline form"});
  
    await inlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(p_name);
    await inlineForm.getByRole('textbox', {name: "Email"}).fill(p_email);
    if (p_rememberMe)
        await inlineForm.getByRole('checkbox').check({force: true});
    await inlineForm.getByRole('button').click();

  }


}