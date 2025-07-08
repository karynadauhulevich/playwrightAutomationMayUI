import {Page, FrameLocator} from "@playwright/test"

export class Iframe {
   page:Page
   frameBottom: FrameLocator
    constructor(page: Page) {
        this.page = page
        this.frameBottom = page.frameLocator("[name='frame-bottom']")
    }

     async goto(){
       await this.page.goto('https://www.lambdatest.com/selenium-playground/nested-frames/')
     }

     async getLeftFrameText(){
      return this.frameBottom
           .frameLocator('[name="frame-left"]')
           .locator('body')
           .textContent()
           .then(text => text?.trim() || null);
     }
     async getMiddleFrameText(){
       return this.frameBottom
           .frameLocator('[name="frame-middle"]')
           .locator('body')
           .textContent()
           .then(text => text?.trim() || null);
     }
     async getRightFrameText(){
       return this.frameBottom
         .frameLocator('[name="frame-right"]')
         .locator('body')
         .textContent()
         .then(text => text?.trim() || null);

     }

}