import { test, expect } from '@playwright/test';


//setup my test function which is similar to using @Test annotation in testNG
test('The Checkers Game Test', async ({ page }) => {

    //navigate to checkers game page
    await page.goto('https://www.gamesforthebrain.com/game/checkers/')

   //click on search button
   //await page.locator("xpath=//*[@name='btnK']").nth(0).click({timeout: 10000})


})//end of test

