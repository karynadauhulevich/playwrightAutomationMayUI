import {Page, Locator, expect} from "@playwright/test"

export class dragAndDrop {
    page:Page
    constructor (page: Page) {
        this.page = page
}
    simpleDrag = '[id="draggable"]'
    simpleDroppable = '#simpleDropContainer #droppable'

    acceptClick = '[id="droppableExample-tab-accept"]'
    notAcceptable = '[id="notAcceptable"]'
    acceptDroppable = '#droppableExample-tabpane-accept #droppable'
    acceptable = '[id="acceptable"]'
    propogationClick = '[id="droppableExample-tab-preventPropogation"]'
    propogationDragable = '[id="dragBox"]'
    notGreedyDroppable = '[id="notGreedyInnerDropBox"]'
    greedyDropBox = '#greedyDropBox'
    notGreedyDropBox = '[id="notGreedyDropBox"]'
    greedyDropBoxInner =  '#greedyDropBoxInner'


    public async goTo(url:string){
      await  this.page.goto(url);
    }

    public async dragAndDropSimple(){
        await this.page.locator(this.simpleDrag).dragTo(this.page.locator(this.simpleDroppable));
        await expect(this.page.locator(this.simpleDroppable)).toHaveText('Dropped!')
    }

    public async dragAndDropNotAcceptable(selector:string, title:string, property:string, propertyValue:string,){
        await this.page.locator(this.acceptClick).click()
        await this.page.locator(this.notAcceptable).dragTo(this.page.locator(this.acceptDroppable));
        await this.assertion(selector, title, property, propertyValue,)

    }

    public async dragAndDropAcceptable(selector:string, title:string, property:string, propertyValue:string,){
        await this.page.locator(this.acceptClick).click()
        await this.page.locator(this.acceptable).dragTo(this.page.locator(this.acceptDroppable));
        await this.assertion(selector, title, property, propertyValue,)

    }

    public async preventPropogationNotGreedyInner(){
        await this.page.locator(this.propogationClick).click()
        await this.page.locator(this.propogationDragable).dragTo(this.page.locator(this.notGreedyDroppable));

    }

    public async preventPropogationNotGreedyOuter(){
        await this.page.locator(this.propogationClick).click()
        await this.page.locator(this.propogationDragable).dragTo(this.page.locator(this.notGreedyDropBox), { targetPosition: { x: 50, y: 20 } });
    }

    public async preventPropogationGreedyInner(){
        await this.page.locator(this.propogationClick).click()
        await this.page.locator(this.propogationDragable).dragTo(this.page.locator(this.greedyDropBoxInner));

    }

    public async preventPropogationGreedyOuter(){
        await this.page.locator(this.propogationClick).click()
        await this.page.locator(this.propogationDragable).dragTo(this.page.locator(this.greedyDropBox), { targetPosition: { x: 50, y: 20 } });
    }

    public async assertion(selector: string, expectedText: string, cssProperty: string, expectedCssValue: string) {
        const locator = this.page.locator(selector);
        await expect(locator).toHaveText(expectedText);
        await expect(locator).toHaveCSS(cssProperty, expectedCssValue);
    }


}