import {test as base} from '@playwright/test'
import { PageManager } from '../pw-practice-app/page-objetcs/pageManager';


export type testOptions = {
    globalQaURL
    formLayoutsPage    //new test option type
    pageManager: PageManager
    pageManager2: PageManager


}

export const test = base.extend<testOptions>({  //experting the constant , we want to extend the type: TestOptions
    
  //=========================FIXTURES =======================================
    //All lines coded before the await use(), line, will be executed as a precondition, and settiong up the nevironment for the test. 
    //All lines after the await use() line, will work as a tear down, something that happen after test is completed. 



    globalQaURL: ['',{option:'true'}], // value is array, inside we need to put default vale, and the object: Optiontrie

    formLayoutsPage: async({page}, use) => {

        await page.goto('/');
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click();
        await use('');                              // to be able to use the fixture. --in here the test steps will be executed. 
        console.log('TEAR DOWN....Ending test')

    },

    pageManager: async({page}, use) =>{
        const pm = new PageManager(page);  //It is responsible of handling all instances of pages objest on a single class
        await use (pm) //
    },

    //========================= Dependency between fixtures 
    pageManager2: async({page, formLayoutsPage}, use) =>{     //--->> Now pageManager2 will call fixture:FormLayoutsPage 
        const pm = new PageManager(page);  
        await use (pm) //
    }

})

