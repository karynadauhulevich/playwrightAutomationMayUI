import {test as it, Locator, expect} from "@playwright/test"
import {DQTabs} from "../page_object/DQTab";


it.describe ('demqa tabs', ()=>{
     let newTab: DQTabs
    it.beforeEach (async({page})=>{
         newTab = new DQTabs(page)
        await newTab.goTO()
    })
    it('New Tab',async({page})=> {
      // await page.goto('https://demoqa.com/browser-windows')
        const [newPage]= await Promise.all([
          page.context().waitForEvent('page'),
          page.locator('[id="tabButton"]').click()
        ])
          await page.waitForLoadState();
         const text = await newPage.locator('[id="sampleHeading"]').textContent()
         expect(text).toContain('This is a sample page')
    })

    it('New Window',async({page})=> {
       // await page.goto('https://demoqa.com/browser-windows')
        const [newWindow] = await Promise.all([
            page.context().waitForEvent('page'),
            page.locator('[id="windowButton"]').click(),
        ])
        await page.waitForLoadState();
        const text = await newWindow.locator('[id="sampleHeading"]').textContent()
        expect(text).toContain('This is a sample page')
    })

    it('New Window Message',async({page})=> {
       // await page.goto('https://demoqa.com/browser-windows')
        const [newWindowMessage] = await Promise.all([
            page.context().waitForEvent('page'),
            page.locator('[id="messageWindowButton"]').click()
        ])
        await page.waitForLoadState();
        const text = await newWindowMessage.locator('body').textContent()
        expect(text).toContain('Knowledge increases by sharing but not by saving')
    })

    it('New Tab with Class',async({page})=> {
      //  await page.goto('https://demoqa.com/browser-windows')
       // await newTab.goTO()
        const tabNew = await newTab.newWindow('[id="tabButton"]')
        const textContext = await tabNew.locator('[id="sampleHeading"]').textContent()
        expect(textContext).toContain('This is a sample page')
    })

    it('New Window with Class',async({page})=> {
        const newWindow = await  newTab.newWindow('[id="windowButton"]')
        const textContext = await  newWindow.locator('[id="sampleHeading"]').textContent()
        expect(textContext).toContain('This is a sample page')

    })

    it('New Window Message with Class',async({page})=> {
        const windowMessage = await newTab.newWindow('[id="messageWindowButton"]')
        const textContext = await windowMessage.locator('body').textContent()
        expect(textContext).toContain('Knowledge increases by sharing but not by saving')
    })

})