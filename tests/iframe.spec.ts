import { test, expect, FrameLocator } from '@playwright/test';

test.describe('iFrame', () => {
    test('iframe test', async ({ page }) => {
        const url = 'https://www.lambdatest.com/selenium-playground/nested-frames/';
        await page.goto(url);

        const frameBottom: FrameLocator = page.frameLocator("[name='frame-bottom']");

        const leftFrameText: string | null = await frameBottom
            .frameLocator("[name='frame-left']")
            .locator('body')
            .textContent()
            .then(text => text?.trim() || null);

        const middleFrameText: string | null = await frameBottom
            .frameLocator("[name='frame-middle']")
            .locator('body')
            .textContent()
            .then(text => text?.trim() || null);

        const rightFrameText: string | null = await frameBottom
            .frameLocator("[name='frame-right']")
            .locator('body')
            .textContent()
            .then(text => text?.trim() || null);

        // Assert the text content of the frames
        expect(leftFrameText).toBe('Left');
        expect(middleFrameText).toContain('Middle');
        expect(rightFrameText).toContain('Right');
    });
});
