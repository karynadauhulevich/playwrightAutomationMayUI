import {expect} from "@playwright/test"
import {test as it } from '../../page_object/base_page_DP_TO'


it.describe('lambaTrst',()=> {
    it('date picker',async({page, datePicker})=>{
        await datePicker.goTo()
        await datePicker.verifyHeader()
        await expect(page).toHaveURL(/jquery-date-picker-demo/);
        await datePicker.dataPicker()

    })

})