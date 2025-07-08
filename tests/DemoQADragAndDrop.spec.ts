import {Page, Locator, test as it, expect} from '@playwright/test'


it.describe('DemoQADragAndDrop', () => {
    it('drag and drop simple', async({page}) =>{
       await page.goto('https://demoqa.com/droppable#google_vignette')
        await page.locator('[id="draggable"]').dragTo(page.locator('#simpleDropContainer #droppable'))
        await expect(page.locator('#simpleDropContainer #droppable')).toHaveText('Dropped!')
        await expect(page.locator('#simpleDropContainer #droppable')).toHaveCSS('background-color', 'rgb(70, 130, 180)')
    })

    it('drag and drop accept', async ({ page }) => {
        await page.goto('https://demoqa.com/droppable#google_vignette');
        await page.locator('[id="droppableExample-tab-accept"]').click();

        // Drag NOT acceptable element
        await page.locator('[id="notAcceptable"]').dragTo(page.locator('#droppableExample-tabpane-accept #droppable'));
        await expect(page.locator('#droppableExample-tabpane-accept #droppable')).toHaveText('Drop here');
        await expect(page.locator('#droppableExample-tabpane-accept #droppable')).toHaveCSS('border-bottom-color', 'rgb(0, 0, 0)');

        await page.reload();
        await page.locator('[id="droppableExample-tab-accept"]').click();

        // Drag ACCEPTABLE element
        await page.locator('[id="acceptable"]').dragTo(page.locator('#droppableExample-tabpane-accept #droppable'));
        await expect(page.locator('#droppableExample-tabpane-accept #droppable')).toHaveText('Dropped!');
        await expect(page.locator('#droppableExample-tabpane-accept #droppable')).toHaveCSS('background-color', 'rgb(70, 130, 180)');
    });

    it('drag and drop accept preventPropogation not greedy inner', async ({ page }) => {
        await page.goto('https://demoqa.com/droppable#google_vignette');
        await page.locator('[id="droppableExample-tab-preventPropogation"]').click();
        await page.locator('[id="dragBox"]').dragTo(page.locator('[id="notGreedyInnerDropBox"]'));
        await expect(page.locator('[id="notGreedyInnerDropBox"]')).toHaveText('Dropped!');
        await expect(page.locator('[id="notGreedyDropBox"]')).toHaveText('Dropped!Dropped!');
        await expect(page.locator('[id="notGreedyInnerDropBox"]')).toHaveCSS('background-color', 'rgb(70, 130, 180)')
        await expect(page.locator('[id="notGreedyDropBox"]')).toHaveCSS('background-color', 'rgb(70, 130, 180)')
    })
    it('drag and drop accept preventPropogation not greedy outer', async ({ page }) => {
        await page.goto('https://demoqa.com/droppable#google_vignette');
        await page.locator('[id="droppableExample-tab-preventPropogation"]').click();
        await page.locator('#dragBox').dragTo(
            page.locator('#notGreedyDropBox'), { targetPosition: { x: 50, y: 20 } }
        );

        // Verify inner droppable text is unchanged
        await expect(page.locator('[id="notGreedyInnerDropBox"]')).toHaveText('Inner droppable (not greedy)');

        // Verify outer droppable text changed to Dropped!
        await expect(page.locator('[id="notGreedyDropBox"]')).toHaveText('Dropped!Inner droppable (not greedy)');


        //Optionally verify background colors
        await expect(page.locator('[id="notGreedyDropBox"]')).toHaveCSS('background-color', 'rgb(70, 130, 180)');
    });
    it('drag and drop accept preventPropogation gready inner ', async ({ page }) => {
        await page.goto('https://demoqa.com/droppable#google_vignette');
        await page.locator('[id="droppableExample-tab-preventPropogation"]').click();
        await page.locator('#dragBox').dragTo(page.locator('#greedyDropBoxInner'));
        await expect(page.locator('#greedyDropBoxInner')).toHaveText('Dropped!');
        await expect(page.locator('#greedyDropBox')).toContainText("Outer droppableDropped!");
        await expect(page.locator('#greedyDropBoxInner')).toHaveCSS('background-color', 'rgb(70, 130, 180)');

    });
    it('drag and drop accept preventPropogation gready outer ', async ({ page }) => {
        await page.goto('https://demoqa.com/droppable#google_vignette');
        await page.locator('[id="droppableExample-tab-preventPropogation"]').click();
        await page.locator('#dragBox').dragTo(page.locator('#greedyDropBox'), { targetPosition: { x: 50, y: 20 }}
        );
        await expect(page.locator('#greedyDropBoxInner')).toHaveText("Inner droppable (greedy)");
        await expect(page.locator('#greedyDropBox')).toContainText( "Dropped!Inner droppable (greedy)");

    });

    it('drag and drop revertable', async({page}) => {
        await page.goto('https://demoqa.com/droppable#google_vignette');
        await page.locator('#droppableExample-tab-revertable').click();
        await page.locator('#revertable').dragTo(page.locator('#revertableDropContainer #droppable' ))
        await expect(page.locator('#revertableDropContainer #droppable')).toHaveText('Dropped!');
        await expect(page.locator('#revertableDropContainer #droppable')).toHaveCSS('background-color', 'rgb(70, 130, 180)');
        await expect(page.locator('#revertable')).toHaveAttribute('style',"position: relative; left: 0px; top: 0px;")

    })

    it('drag and drop non revertable', async({page}) => {
        await page.goto('https://demoqa.com/droppable#google_vignette');
        await page.locator('#droppableExample-tab-revertable').click();
        await page.locator('#notRevertable').dragTo(page.locator('#revertableDropContainer #droppable' ))
        await expect(page.locator('#revertableDropContainer #droppable')).toHaveText('Dropped!');
        await expect(page.locator('#revertableDropContainer #droppable')).toHaveCSS('background-color', 'rgb(70, 130, 180)');
        expect(await page.locator('#notRevertable').getAttribute('style')).not.toContain('left: 0px; top: 0px;');


    })
})