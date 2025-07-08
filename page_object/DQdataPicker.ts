import{Page, Locator, expect} from "@playwright/test";
import _ from "lodash";

export class DatePickerDm{
    page:Page
    url = 'https://demoqa.com/automation-practice-form'
    constructor(page: Page) {
        this.page = page; // this.page = page;
    }
    //selectors
    labelName = '#dateOfBirth-label'
    inputTo = '[id="dateOfBirthInput"]'
    prevMonth = '[aria-label="Previous Month"]'
    selectedYear = '.react-datepicker__year-select'
    selectedMonth = '.react-datepicker__month-select'
    selectDay = '.react-datepicker__day'

    async goTo(){
        await this.page.goto(this.url);
    }
    async verifyHeader(){
        await expect(this.page.locator(this.labelName)).toContainText("Date of Birth")
    }
    randomYearNumber = _.random(1, 50);
    randomDay = _.random(1,30)
    async datePicker() {
        const obj = {
            "0": "Jan",
            "1": "Feb",
            "2": "Mar",
            "3": "Apr",
            "4": "May",
            "5": "Jun",
            "6": "Jul",
            "7": "Aug",
            "8": "Sep",
            "9": "Oct",
            "10": "Nov",
            "11": "Dec",
        };

        await this.page.locator(this.inputTo).click();
        await this.page.locator(this.prevMonth).waitFor({ state: 'visible' });

        for (let i = 0; i < this.randomYearNumber; i++) {
            await this.page.locator(this.prevMonth).click();
        }
        let year = await this.page.locator(this.selectedYear).inputValue()
        console.log(year, "year");
        let month = await this.page.locator(this.selectedMonth).inputValue()
        console.log(month, "month");
        await this.page
            .locator('.react-datepicker__day:not(.react-datepicker__day--outside-month)')
            .getByText(this.randomDay.toString(), { exact: true })
            .click();

        console.log(this.randomDay, "day");

        const formattedMonth = obj[month]; // "May"

        const paddedDay = String(this.randomDay).padStart(2, "0");
        const expectedDate = `${paddedDay} ${formattedMonth} ${year}`;

        await expect(this.page.locator(this.inputTo)).toHaveValue(expectedDate);

// проверка




    }
}