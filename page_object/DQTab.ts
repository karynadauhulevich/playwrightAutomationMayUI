import {test as it, Locator, Page} from "@playwright/test"

export class DQTabs {
    page:Page
    constructor(page:Page) {
        this.page = page;
    }

    async goTO() {
        await this.page.goto('https://demoqa.com/browser-windows')
    }

    async newWindow(selector:string) {
        const [newPage]= await Promise.all([
            this.page.context().waitForEvent('page'),
            this.page.locator(selector).click()
        ])
        await this.page.waitForLoadState();
        return newPage
    }
}