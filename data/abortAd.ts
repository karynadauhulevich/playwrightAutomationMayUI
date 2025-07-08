import { Page } from "@playwright/test";

export async function blockAds(page: Page) {
    await page.route("**/*adsk*", (route) => route.abort());
    await page.route("**/*ads/*", (route) => route.abort());
    await page.route("**/*doubleclick.net/*", (route) => route.abort());
    await page.route("**/*googlesyndication/**", (route) => route.abort());
    await page.route("**/*pagead/*", (route) => route.abort());
    await page.route("**/*securepubads.g.doubleclick.net/**", (route) => route.abort());
}
