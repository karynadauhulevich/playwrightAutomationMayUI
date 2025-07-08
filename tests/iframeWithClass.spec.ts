import {test as it, expect} from '@playwright/test'
import {Iframe}  from '../page_object/iframe'

it.describe('IframeWithClass', () => {
    it('iframe with class', async({page})=> {
       const newIframe = new Iframe(page)
        await newIframe.goto()
       const leftText =  await newIframe.getLeftFrameText()
       const middleText =  await newIframe.getMiddleFrameText()
       const rightText =  await newIframe.getRightFrameText()

        expect(leftText).toBe('Left');
        expect(middleText).toContain('Middle');
        expect(rightText).toContain('Right');


    })
})


