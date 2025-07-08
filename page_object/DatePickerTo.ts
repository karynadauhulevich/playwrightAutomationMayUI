import {Page, Locator, expect} from "@playwright/test";
import _ from "lodash";

export class DatePickerTo {
    page: Page
    url = 'https://www.lambdatest.com/selenium-playground/jquery-date-picker-demo'; // ✅ теперь это поле
    constructor(page: Page) {
        this.page = page; // this.page = page;
    }

    header ='div.text-size-18.text-black'
    inputTo = '#to'
    monthField ='.ui-datepicker-month'
    prevYear='[title="Prev"]'
    dataOfTheYear = '[class="ui-datepicker-year"]'
    dayPicker='#ui-datepicker-div'

    public async goTo(){
       await this.page.goto(this.url)

    }
    async verifyHeader(){
       await expect(this.page.locator(this.header)).toContainText("Data Range Picker")
    }
    randomYearNumber = _.random(1, 50);
    date = _.random(1, 30);

    async dataPicker(){
        const obj = {
            Jan: "01",
            Feb: "02",
            Mar: "03",
            Apr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Aug: "08",
            Sep: "09",
            Oct: "10",
            Nov: "11",
            Dec: "12",
        };
    await this.page.locator(this.inputTo).click()
    for(let i = 0; i < this.randomYearNumber; i++) {
        await this.page.locator(this.prevYear).click()
    }
        let year = await this.page.locator(this.dataOfTheYear).textContent();
        console.log(year)
        let month = await this.page
            .locator('.ui-datepicker-month')
            .locator('[selected="selected"]')
            .textContent()
        console.log(month, "month");
        await this.page
            .locator(this.dayPicker)
            .getByRole('link',  {name: this.date.toString(), exact: true  })
            .click()
        const formattedMonth = obj[month as keyof typeof obj];
        const paddedDay = String(this.date).padStart(2, "0");
        expect(await this.page.locator(this.inputTo).inputValue()).toBe(`${formattedMonth}/${paddedDay}/${year}`);






    }
}


