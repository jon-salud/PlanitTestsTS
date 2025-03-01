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
        // Set up request interception ensuring that the page is loaded before continuing
        await this.page.route('**/views/*', route => {
            route.continue(); // Allow the request to continue
        });

        await this.page.goto("/");
                
        try {
            await this.page.waitForRequest(
                async (request) => {
                    if (request.method() === "GET") {
                        const response = await request.response();
                        return request.url().includes("main.html") && response?.status() === 200;
                    }
                    return false;
                },
                { timeout: 3000 }
            ); // 3 second timeout
        } catch (error: any) {
            let msg = error.message.toLowerCase();
            if (msg.includes("timeout") || msg.includes("time out") || msg.includes("timed out")) {
                console.warn("Request timeout occurred while waiting for the mnain page to load.");
            } else {
                throw error;
            }
        }
        
        // Stop intercepting requests
        await this.page.unroute("**/views/*");
        
        const mainHeaderLocator = this.page.locator("h1").getByText("Jupiter Toys")
        await expect(mainHeaderLocator).toBeVisible();
    }
}