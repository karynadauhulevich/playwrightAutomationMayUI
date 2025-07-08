import {test as base} from '@playwright/test'
import {DatePickerTo} from './DatePickerTo'

type Fixtures = {
    datePicker : DatePickerTo
}

export const test = base.extend<Fixtures>({
    datePicker: async ({page}, use) =>{
        await use(new DatePickerTo(page))
    }

    }
)