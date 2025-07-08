import { test as it, expect } from "@playwright/test";
import { DatePicker  } from "../page_object/DataPicker";

it.describe("Date Picker", () => {
    it('Navigate to date picker page', async ({ page }) => {
        const datePicker = new DatePicker(page);
        await datePicker.navigateToDatePicker();
        await datePicker.verifyHeader();
        await datePicker.dateFromToday();
        console.log(page.url());
        await expect(page).toHaveURL(/jquery-date-picker-demo/);
    });
});
