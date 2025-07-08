import {expect, selectors, test as it} from '@playwright/test'

it("complete form", async({page})=>{
    await page.goto('https://testpages.eviltester.com/styled/basic-html-form-test.html')
    await page.locator('[name="username"]').fill('Karyna')
    await page.locator('[type="password"]').fill('123SLA')
    await page.locator('[name="comments"]').fill('Sunny weather')
    await page.locator('[name="filename"]').setInputFiles('photo/example.png')
    await page.locator('input[value="cb2"]').check()
    await page.locator('input[value = "rd3"]').check()
    await page.locator('[name="multipleselect[]"]').selectOption([ 'ms4'])
    await page.locator('[name="dropdown"]').selectOption([ 'dd2' ])
    await page.locator('[type="submit"]').click()
    await expect(page.locator('h1')).toHaveText('Processed Form Details');
})

