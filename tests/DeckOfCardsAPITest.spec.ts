import { test, expect, chromium, Page, request } from '@playwright/test';
import { DeckOfCardsApi } from './DeckOfCardsPOM'



test.describe.serial("Deck of Cards API Test Scenarios", () => { 

    //declaring global variables
    let page: any
    let context: any
    let deckOfCardsApi = new DeckOfCardsApi(page); //setting instances for page object 
    let deckId: any


    test.beforeAll(async ({browser}) =>{
        //Create a new Page instance
        page = await browser.newPage(); 
        context = await request.newContext();
        await page.goto('https://deckofcardsapi.com/')
        //verify page is up by matching the header title
        expect(await page.locator('xpath=//*[@class="title"]')).toHaveText('Deck of Cards')
        console.log("Header Title Appears: 'Deck of Cards'")
    })//end of before all

    test('Get a new deck & Shuffle it', async () => {
        const response = await context.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1', {
        headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
        }
      })//end of get
      expect(response.status()).toBe(200)
      const body = await response.json();
      deckId = JSON.stringify(body.deck_id).replace(/['"]+/g, '')

      console.log("Deck ID: " + deckId)

    })//end of test 1

    test('Draw 3 cards each for player and verify either of the player has blackjack', async () => {
        const response = await context.get('https://deckofcardsapi.com/api/deck/'+deckId+'/draw/?count=6', {
        headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
        }
      })//end of get
      expect(response.status()).toBe(200)

      //store all six values into variables. First 3 being player 1 and Last 3 being player 2
      const body = await response.json();
      const cardValue1 = JSON.stringify(body.cards[0].value).replace(/['"]+/g, '')
      const cardValue2 = JSON.stringify(body.cards[1].value).replace(/['"]+/g, '')
      const cardValue3 = JSON.stringify(body.cards[2].value).replace(/['"]+/g, '')
      const cardValue4 = JSON.stringify(body.cards[3].value).replace(/['"]+/g, '')
      const cardValue5 = JSON.stringify(body.cards[4].value).replace(/['"]+/g, '')
      const cardValue6 = JSON.stringify(body.cards[5].value).replace(/['"]+/g, '')

      //set the first 3 values for player 1 cards
      var player1Card1 = await deckOfCardsApi.setTheNumbersToDeck(cardValue1)
      let player1Card2 = await deckOfCardsApi.setTheNumbersToDeck(cardValue2)
      let player1Card3 = await deckOfCardsApi.setTheNumbersToDeck(cardValue3)
      //verify if player 1 has black jack
      deckOfCardsApi.verifyPlayerHasBlackJack("Player 1",player1Card1,player1Card2,player1Card3)

      //set the last 3 values for player 2 cards
      var player2Card1 = await deckOfCardsApi.setTheNumbersToDeck(cardValue4)
      let player2Card2 = await deckOfCardsApi.setTheNumbersToDeck(cardValue5)
      let player2Card3 = await deckOfCardsApi.setTheNumbersToDeck(cardValue6)
      //verify if player 1 has black jack
      deckOfCardsApi.verifyPlayerHasBlackJack("Player 2",player2Card1,player2Card2,player2Card3)
    })//end of test 2

})//end of describe