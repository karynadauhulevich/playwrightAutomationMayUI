import{test as it} from './demoQa_fixture'
import {expect, Locator} from '@playwright/test'



    it ('login with fixtures', async({loggedPage}) =>{
        await expect(loggedPage).toHaveURL(/\/profile/);
        await expect(loggedPage.locator('[id="userName-value"]')).toContainText('Karina')

    })

