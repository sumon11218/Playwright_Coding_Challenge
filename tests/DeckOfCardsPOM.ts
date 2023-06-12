import { expect, Locator, Page, request } from '@playwright/test';

export class DeckOfCardsApi {
    readonly page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }

    async setTheNumbersToDeck(value: string){
      let count = 0
      if(value == "JACK" || value == "KING" || value == "QUEEN"){
         count = 10
      } else if(value == "ACE") {
         count = 11
      } else {
      count = parseInt(value)
      }
      return count
    }//end of setTheNumbersToDeck

   async  verifyPlayerHasBlackJack(player: any, count1: number, count2: number, count3: number){
      console.log("Numbers: " + count1 + ", " + count2 + ", " + count3)
      let totalCount = (count1 + count2 + count3)         
      if(totalCount == 21){
         console.log(player + " has blackjack")
      } else if (totalCount > 21 || totalCount < 21) {
      console.log(player + " doesn't have blackjack")
      }
   }//end of verifyPlayerHasBlackJack

}//end of class