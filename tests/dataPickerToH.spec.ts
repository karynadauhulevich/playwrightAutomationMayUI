import{DatePickerTo} from "../page_object/DatePickerTo";
import {expect, test as it} from "@playwright/test"


it.describe('lambaTrst',()=> {
    it('date picker',async({page})=>{
        const datePicker = new DatePickerTo(page)
        await datePicker.goTo()
        await datePicker.verifyHeader()
        await expect(page).toHaveURL(/jquery-date-picker-demo/);
        await datePicker.dataPicker()

    })

})