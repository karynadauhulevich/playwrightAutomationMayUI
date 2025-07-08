import { test as base } from '@playwright/test';
import {DatePicker} from './DataPicker';

type Fixtures = {
    datePicker: DatePicker;
};

export const test = base.extend<Fixtures>({
    datePicker: async ({ page }, use) => {
        await use(new DatePicker(page));
    },
});
