import {test as it, expect} from "@playwright/test"
import {beforeEach} from "node:test";

it.describe ("Pasv Login", ()=> {
    it.beforeEach(async({page})=>{
        await page.goto("https://coding.pasv.us/course");
    })
    it('verify authentication and log out', async ({page, browserName})=>{
        await page.locator('a:has-text("Karyna Dauhulevich") [aria-label="down"]').click();
        await expect (page.locator('[data-qa="logout"]'))
            .toContainText('Выйти')
        await page.screenshot({path: `screenshots/${browserName}-profile.png`})
    })
})