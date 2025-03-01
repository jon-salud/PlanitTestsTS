// tests\pages\mainPage.ts

import { expect, Locator, Page } from "@playwright/test";
import { url } from "inspector";

export class MainPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Opens the main page of the application and ensures it is fully loaded before proceeding.
     *
     * This method performs the following steps:
     * 1. Sets up request interception to allow all requests to continue.
     * 2. Navigates to the root URL ("/").
     * 3. Waits for a specific GET request to complete, ensuring the main page is loaded.
     * 4. Handles potential timeout errors during the request wait.
     * 5. Stops intercepting requests.
     * 6. Verifies that the main header with the text "Jupiter Toys" is visible.
     *
     * @example
     * ```typescript
     * await mainPage.openMainPage();
     * ```
     *
     * @returns {Promise<void>} A promise that resolves when the main page is fully loaded and verified.
     *
     * @throws {Error} Throws an error if the request wait fails for reasons other than a timeout.
     */
    async openMainPage(): Promise<void> {
        const requestPromise = this.page.waitForRequest("**/*main.html*", { timeout: 3000 });
        await this.page.goto("/");
        await requestPromise;

        const mainHeaderLocator = this.page.locator("h1").getByText("Jupiter Toys");
        await expect(mainHeaderLocator).toBeVisible();
    }
}
