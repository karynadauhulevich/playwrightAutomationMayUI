import { test as base, chromium, Page } from '@playwright/test';

type Fixtures = {
    loggedInPage: Page;
};

export const test = base.extend<Fixtures>({
    loggedInPage: async ({}, use) => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://coding.pasv.us/user/login');
        await page.getByPlaceholder('Email').fill('karinadovgulevich@gmail.com');
        await page.getByRole('textbox', { name: 'Пароль' }).fill('Karina2104!');
        await page.getByRole('button', { name: 'Войти', exact: true }).click();

        await page.waitForURL('**/profile/**');
       // await page.pause();
        await use(page);
    },
});

