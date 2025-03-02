// tests\pages\mainPage.ts

import { expect, Locator, Page } from "@playwright/test";

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
        await this.page.goto("/", { waitUntil: "load", timeout: 3000 });
        const response = await responsePromise;
        expect(response.status()).toBe(200);

        const mainHeaderLocator = this.page.locator("h1").getByText("Jupiter Toys");
        await expect(mainHeaderLocator).toBeVisible();
    }
}
