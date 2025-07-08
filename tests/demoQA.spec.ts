import{test as it, expect} from '@playwright/test'
import{DatePickerDm} from "../page_object/DQdataPicker";
it.describe('demoQA', () => {
    it.skip('fill the form', async ({page}) => {
        await page.goto('https://demoqa.com/automation-practice-form#google_vignette')
        await page.locator('[placeholder="First Name"]').fill('Karyna')
        await page.locator('[placeholder="Last Name"]').fill('Vasil')
        await page.locator('[placeholder="name@example.com"]').fill('fjkfk@gmail.com')
        await page.locator('label[for="gender-radio-2"]').check()
        await page.locator('[placeholder="Mobile Number"]').fill('12758493')
    })
    it('fill the date of birth form', async ({page}) => {
        const datePicker = new DatePickerDm(page)
        await datePicker.goTo()
        await datePicker.verifyHeader()
        await  expect (page).toHaveURL(/automation-practice-form/)
        await datePicker.datePicker()

    })
})