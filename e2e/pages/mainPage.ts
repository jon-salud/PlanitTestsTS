// tests\pages\mainPage.ts

import { expect, Locator, Page } from "@playwright/test";
import { getMenuLink } from "../helpers/utilities";

export class MainPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Opens the main page of the application and verifies that the main header is visible.
     * Navigates to the root URL ("/") and waits for the main header "Jupiter Toys" to be visible.
     *
     * @example
     * ```typescript
     * await mainPage.goToMainPage();
     * ```
     *
     * @returns {Promise<void>} A promise that resolves when the main page is fully loaded and verified.
     * @throws {Error} Throws an error if the request wait fails for reasons other than a timeout.
     */
    async goToMainPage(): Promise<void> {
        const responsePromise = this.page.waitForResponse("**/main.html*", { timeout: 3000 });
        await this.page.goto("/");
        const response = await responsePromise;
        expect(response.status()).toBe(200);

        const mainHeaderLocator = this.page.locator("h1").getByText("Jupiter Toys");
        await expect(mainHeaderLocator).toBeVisible();
    }

    /**
     * Navigates to a page by clicking on a menu link.
     *
     * @example
     * ```typescript
     * await mainPage.navigateToPage("Contact");
     * ```
     *
     * @param menuLabel - The label of the menu link to click.
     * @returns {Promise<void>} - A promise that resolves when the navigation is complete.
     * @throws {Error} If the menu link with the specified label is not found or the navigation fails.
     */
    async navigateToPage(menuLabel: string): Promise<void> {
        const menuLinkLoc = getMenuLink(this.page, menuLabel);
        await expect(menuLinkLoc).toBeVisible();
        await menuLinkLoc.scrollIntoViewIfNeeded();
        await menuLinkLoc.click();
    }
}
