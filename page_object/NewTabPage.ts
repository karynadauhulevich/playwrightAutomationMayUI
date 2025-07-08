import { Page, Locator } from "@playwright/test";

export class NewTabPage {
    page: Page;
    newTabLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newTabLink = page.locator('[href="/windows/new"]');
    }

    async navigate() {
        await this.page.goto('https://practice.expandtesting.com/windows');
    }

    async openNewTab() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.newTabLink.click({ force: true })
        ]);
        await newPage.waitForLoadState();
        return newPage;
    }
}
