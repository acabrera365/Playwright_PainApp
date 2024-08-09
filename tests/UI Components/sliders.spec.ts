import {test, expect} from '@playwright/test'


//Before each is a hook. will get executed before my test. 
test.beforeEach (async ({page})  => {

    await page.goto('http://localhost:4200/ ');
})





test ('CHECKBOXES', async ({page})=>{
      //1st aproach, setting the attribute of the slider 
    //   const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');
    //   await tempGauge.evaluate(node => {

    //        node.setAttribute('cx', '232.63098833543773' );
    //        node.setAttribute('cy', '232.6309883354377');

    //   })
    //   await tempGauge.click(); //trigerring an action to see new values 


      //2nd approach, simulate the mouse movement 
      const tempbox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
      await tempbox.scrollIntoViewIfNeeded();  //scrolling into view the gauge

      const box = await tempbox.boundingBox(); //ngx-temperature-dragger is a box of 300x300  
      const xCenter =  (box.x + box.width)/2;
      const yCenter =  (box.y + box.height)/2;

      await page.mouse.move(xCenter,yCenter) //putting the mouse in the center coordinate
      await page.mouse.down()//like presing the click and holding
      await page.mouse.move(xCenter+100, yCenter)
      await page.mouse.move(xCenter, yCenter+150)
      await page.mouse.up()


      await expect(tempbox).toContainText('24')





    


})
 