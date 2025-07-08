import {Page, Locator, test} from '@playwright/test'
import{dragAndDrop} from "../page_object/DemoDragAndDrop";
import {beforeEach} from "node:test";

test.describe('DragAndDropWithClass', () => {
    let dragAndDropN: dragAndDrop;
    const url = 'https://demoqa.com/droppable#google_vignette'
    test.beforeEach('go to page',async({page})=> {
        dragAndDropN = new dragAndDrop(page);
        await dragAndDropN.goTo(url)
    })

    test('drag and drop simple',async({page})=>{
    await dragAndDropN.dragAndDropSimple()

})
    test('drag and drop not accept', async({page}) => {
        await dragAndDropN.dragAndDropNotAcceptable(dragAndDropN.acceptDroppable, 'Drop here', 'border-bottom-color', 'rgb(0, 0, 0)')
    })

    test('drag and drop accept', async({page}) => {
        await dragAndDropN.dragAndDropAcceptable(dragAndDropN.acceptDroppable, 'Dropped!', 'background-color', 'rgb(70, 130, 180)')
    })
    test('drag and drop accept preventPropogation not gready inner ', async({page}) => {
        await dragAndDropN.preventPropogationNotGreedyInner()
        await dragAndDropN.assertion(dragAndDropN.notGreedyDroppable, 'Dropped!', 'background-color', 'rgb(70, 130, 180)')
        await dragAndDropN.assertion(dragAndDropN.notGreedyDropBox, 'Dropped!Dropped!', 'background-color', 'rgb(70, 130, 180)')
    })

    test('drag and drop accept preventPropogation not gready outer ', async({page}) => {
        await dragAndDropN.preventPropogationNotGreedyOuter()
        await dragAndDropN.assertion(
            dragAndDropN.notGreedyDropBox,
            'Dropped!Inner droppable (not greedy)',
            'background-color',
            'rgb(70, 130, 180)'
        );
    })

    test('drag and drop accept preventPropogation gready inner ', async({page}) => {
        await dragAndDropN.preventPropogationGreedyInner()
        await dragAndDropN.assertion(dragAndDropN.greedyDropBoxInner, "Dropped!", 'background-color', 'rgb(70, 130, 180)')

    })


    test('drag and drop accept preventPropogation gready outer ', async({page}) => {
        await dragAndDropN.preventPropogationGreedyInner()
        await dragAndDropN.assertion(dragAndDropN.greedyDropBox, "Outer droppableDropped!", 'background-color', 'rgba(0, 0, 0, 0)')

    })


})