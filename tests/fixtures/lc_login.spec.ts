import { test as it } from "./lc_login";
import { expect } from '@playwright/test';
it("User lands on profile after login", async ({ loggedInPage }) => {
    await expect(loggedInPage).toHaveURL(/.*\/profile\//);
    await expect(loggedInPage.locator('.me-2 ~ h1')).toContainText('Karyna Dauhulevich');
});
