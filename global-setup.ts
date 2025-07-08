// import { chromium, FullConfig } from '@playwright/test';
// //import fs from 'fs';
//
// async function globalSetup(config: FullConfig) {
//     const browser = await chromium.launch({headless:false});
//     const context = await browser.newContext();
//     const page = await context.newPage();
//
//     // Perform login
//     await page.goto('https://demoqa.com/login', { waitUntil: 'domcontentloaded' });
//     await page.getByPlaceholder('UserName').fill('MichaelPasv');
//     await page.getByPlaceholder('Password').fill('m!chael12SH');
//     await page.getByRole('button', { name: 'Login' }).click();
//
//     // Wait until fully logged in
//     await page.waitForURL('https://demoqa.com/profile', { waitUntil: 'domcontentloaded' });
//
//     // Optional: validate login was successful
//     const user = await page.locator('#userName-value').textContent();
//     console.log('✅ Logged in as:', user);
//
//     // Save storage state to use in all tests
//     await context.storageState({ path: './.auth/user.json' });
//
//     await browser.close();
// }
//
// export default globalSetup;

import {chromium, FullConfig} from "@playwright/test";

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch({headless: false});
    const page = await browser.newPage();
    const context = await browser.newContext()

    await page.goto('https://coding.pasv.us/user/login')
    await page.locator('[id="normal_login_email"]').fill('karinadovgulevich@gmail.com')
    await page.locator('[id="normal_login_password"]').fill('Karina2104!')
    await page.locator('[type="submit"]').click()

     const user = await page.locator('.d-flex.align-items-center.mb-3').textContent()
    console.log('✅ Logged in as:', user);

    await context.storageState({ path: './.auth/user.json'})


}
export default globalSetup;