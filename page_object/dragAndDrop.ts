import { Page, Locator, expect } from "@playwright/test";

export class DragAndDrop {
    private readonly page: Page;
    private readonly dragEl: Locator;
    private readonly dropZone: Locator;
    private readonly dropList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dragEl = page.locator('[draggable="true"]');
        this.dropZone = page.locator('#mydropzone');
        this.dropList = page.locator('#droppedlist');
    }

    /**
     * Drag and drop using direct dragTo
     */
    public async dragAndDropElement(text: string) {
        const dragSource = this.dragEl.filter({ hasText: text });
        await dragSource.dragTo(this.dropZone);
        await this.verifyDrop(text);
    }

    /**
     * Drag and drop using hover and mouse events
     */
    public async dragAndDropElementOption2(text: string) {
        const dragSource = this.dragEl.filter({ hasText: text });
        await dragSource.hover();
        await this.page.mouse.down();
        await this.dropZone.hover();
        await this.page.mouse.up();
        await this.verifyDrop(text);
    }

    /**
     * Verify that the dragged item appears in the drop list
     */
    private async verifyDrop(text: string) {
        const dropListText = await this.dropList.textContent();
        expect(dropListText).toContain(text);
    }
}
