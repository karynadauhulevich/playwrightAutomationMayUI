import { test, expect } from '@playwright/test';
import { NewTabPage } from '../page_object/NewTabPage';
import { blockAds } from '../data/abortAd';

test.describe("New Tab Page", () => {
    test('should open a new tab and verify content', async ({ page }) => {
        await blockAds(page);

        // first tab
        const newTabPage = new NewTabPage(page);
        await newTabPage.navigate();

        // second tab
        const newPage = await newTabPage.openNewTab();
        const textContent: string | null = await newPage.locator('h1').textContent();
        expect(textContent).toBe('Example of a new window page for Automation Testing Practice');

        console.log(`✅ Test passed for project: ${test.info().project.name}`);
    });
});