import { Locator, Page, expect } from "@playwright/test";


export class HelperBase{

  readonly page: Page

  constructor (page:Page){
    this.page = page;
  }

  async waitForNumberOfSeconds(timeOutInSecionds : number){

    await this.page.waitForTimeout(timeOutInSecionds * 1000);


  }



}