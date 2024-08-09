import {test, expect} from '@playwright/test'
 


//Before each is a hook. will get executed before my test. 
test.beforeEach (async ({page})  => {

    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/');
    
})





    //test ('drag and drop Frames', async ({page})=>{
    test ('drag and drop Frames', async ({page})=>{  //adding a second fixture
 
     //iFrames 
     const frame = page.frameLocator('[rel-title="Photo Manager"] iframe'); //he is ocming from a parent element and then navigating to iframe element. 
     await frame.locator('li', {hasText: "High Tatras 2"}).dragTo(frame.locator('#trash'));//inside drag to, we need to provide locator
     await frame.locator('li', {hasText: "High Tatras 4"}).dragTo(frame.locator('#trash'));//inside drag to, we need to provide locator

     //more resize control 
     //await frame.locator('li', {hasText: "High Tatras 4"}).hover();
     //await page.mouse.down();
     //await frame.locator('#trash');
    // await page.mouse.up();

    await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2", "High Tatras 4"]);


     


     


})
 