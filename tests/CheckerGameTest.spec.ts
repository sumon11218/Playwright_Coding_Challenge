import { test, expect } from '@playwright/test';


//setup my test function which is similar to using @Test annotation in testNG
test('The Checkers Game Test', async ({ page }) => {

    //set time llimit for explicit wait
    let timeLimit = 10000

    //navigate to checkers game page
    await page.goto('https://www.gamesforthebrain.com/game/checkers/')

   //click on the first orange
   await page.locator('xpath=//*[@src="you1.gif"]').nth(0).click({timeout: timeLimit})
   //move the first orange to gray space73
   await page.locator('xpath=//*[@onclick="didClick(7, 3)"]').click({timeout: timeLimit})

    //click on the second orange
    await page.waitForTimeout(2000)
    await page.locator('xpath=//*[@src="you1.gif"]').nth(1).click({timeout: timeLimit})
    //move the second orange to gray space33
    await page.locator('xpath=//*[@onclick="didClick(3, 3)"]').click({timeout: timeLimit})
    
    //verify text make a move
    expect(await page.locator('xpath=//*[@id="message"]')).toHaveText("Make a move.",{timeout: timeLimit})
    console.log("Text Verified: Make a move.")

    //verify the count of orange is now 11 instead of 12
    expect(await page.locator('xpath=//*[@src="you1.gif"]')).toHaveCount(11)
    console.log("One Orange checker has been removed. Count is now 11")

    //click on the fifth orange
    await page.waitForTimeout(2000) //need some hard coded timeout to slow down the script orlese it doesn't move the orange
    await page.locator('xpath=//*[@src="you1.gif"]').nth(4).click({timeout: timeLimit})
    //move the fifth orange to gray space33 
    await page.locator('xpath=//*[@onclick="didClick(3, 3)"]').click({timeout: timeLimit})

    //verify the count of blue is now 11 instead of 12
    await page.waitForTimeout(1500) //need some hard coded timeout to slow down the script orlese it doesn't move the orange
    expect(await page.locator('xpath=//*[@src="me1.gif"]')).toHaveCount(11)
    console.log("One Blue checker has been removed. Count is now 11")
    
    //move the orange from gray space71 to space62
    await page.waitForTimeout(1500) //need some hard coded timeout to slow down the script orlese it doesn't move the orange
    await page.locator('xpath=//*[@name="space71"]').click({timeout: timeLimit})
    await page.locator('xpath=//*[@name="space62"]').click({timeout: timeLimit})

    //move the orange from gray space60 to space71
    await page.waitForTimeout(1500) //need some hard coded timeout to slow down the script orlese it doesn't move the orange
    await page.locator('xpath=//*[@name="space60"]').click({timeout: timeLimit})
    await page.locator('xpath=//*[@name="space71"]').click({timeout: timeLimit})

    //move the orange from gray space60 to space71
    await page.waitForTimeout(1500) //need some hard coded timeout to slow down the script orlese it doesn't move the orange
    await page.locator('xpath=//*[@name="space60"]').click({timeout: timeLimit})
    await page.locator('xpath=//*[@name="space71"]').click({timeout: timeLimit})

    //click on restart
    await page.locator('xpath=//*[text()="Restart..."]').click({timeout: timeLimit})

    //verify text Select an orange piece to move
    expect(await page.locator('xpath=//*[@id="message"]')).toHaveText("Select an orange piece to move.",{timeout: timeLimit})
    console.log("Text Verified: Select an orange piece to move.")

    //move orange from gray space 62 to gray space 73
    await page.waitForTimeout(1500) //need some hard coded timeout to slow down the script orlese it doesn't move the orange
    await page.locator('xpath=//*[@name="space62"]').click({timeout: timeLimit})
    await page.locator('xpath=//*[@name="space73"]').click({timeout: timeLimit})

})//end of test

