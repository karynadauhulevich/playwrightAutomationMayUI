import {test as base, chromium, Page} from '@playwright/test'

type Fixture = {
    loggedPage: Page
}

export const test = base.extend<Fixture>({
    loggedPage: async ({}, use)=>{
        const browser = await chromium.launch()
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://demoqa.com/login');
        await page.locator('[id="userName"]').fill('Karina')
        await page.locator('[id="password"]').fill('Karina2104!')
        await page.locator('[id="login"]').click()

        await page.waitForURL(/.*\/profile/); // RegExp — надёжнее, чем '**/profile/**'
        await use(page);

}
})