import { test as it, expect } from "@playwright/test";



it.beforeAll(() => {
    console.log("Before all tests");
});

it.describe("Form Page", () => {
    it.afterEach(() => {
        console.log("After each test");
    });

    it.afterAll(() => {
        console.log("After all tests");
    });

    it("test 1", () => {
        console.log("test 1");
    });

    it("test 2", () => {
        console.log("test 2");
    });
});

it.describe("FORM PAGE TYPE", () => {
    it("Fill all fields", async ({ page }) => {
        await page.goto("https://www.lambdatest.com/selenium-playground/input-form-demo");

        await page.locator('[id="name"]').fill("Mike");
        await page.locator('[class="w-full border border-gray-90 text-size-14 rounded mt-10 px-10 py-5"][type="email"]')
            .pressSequentially("michael@gmail.com", { delay: 500 });
        await page.locator('input[placeholder="Password"]').fill("test1234");
        await page.locator('[placeholder="Company"]').fill("LLC Happy");
        await page.locator('[placeholder="Website"]').fill('https://www.happy.com')
        await page.selectOption('[name="country"]', { label: "United States" });
        await page.locator('[placeholder="City"]').fill("Orlando");
        await page.getByPlaceholder("Address 1").fill("123 Happy Lane");
        await page.getByPlaceholder("Address 2").fill("321 Happy Lane");
        await page.getByRole("textbox", { name: "Zip Code" }).fill("32825");
        await page.getByRole("textbox", { name: "State" }).fill("Florida");
        await page.getByRole("button", { name: "Submit" }).click();
        await expect(page.locator('h2:has-text("Input form validation")')).toBeVisible();

        await page.pause();

    });
});
