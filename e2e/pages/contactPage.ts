// e2e\pages\contactPage.ts

import { expect, Locator, Page } from "@playwright/test";
import { getMenuLink, populateField } from "../helpers/utilities";

export class ContactPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Ensures that the contact page is visible by waiting for the page to load,
     *      checking for the visibility of the contact header, and verifying that the URL contains "/contact".
     *
     * @usage
     * ```typescript
     * await contactPage.ensureContactPageIsVisible();
     * ```
     *
     * @returns {Promise<void>} - A promise that resolves when the contact page is verified to be visible.
     * @throws {Error} - Throws an error if the page fails to load, the contact header is not visible,
     *                   or the URL does not contain "/contact".
     */
    async ensureContactPageIsVisible(): Promise<void> {
        await this.page.waitForLoadState();
        const contactHeaderLocator = this.page.locator("#header-message").getByText("We welcome your feedback - tell it how it is.");
        await expect(contactHeaderLocator).toBeVisible();
        expect(this.page.url()).toContain("/contact");
    }

    /**
     * Clicks the Submit button on the contact page.
     *
     * @usage
     * ```typescript
     * await contactPage.clickSubmitButton();
     * ```
     *
     * @returns {Promise<void>} - A promise that resolves after clicking the Submit button.
     */
    async clickSubmitButton(): Promise<void> {
        const submitButtonLocator = this.page.locator(".btn-contact.btn.btn-primary").filter({ hasText: "Submit" });
        await submitButtonLocator.scrollIntoViewIfNeeded();
        await submitButtonLocator.click();
        if (await this.page.locator(".alert").isHidden({ timeout: 2000 })) {
            await submitButtonLocator.waitFor({ state: "hidden" });
        }
    }

    /**
     * @description Verifies the header error message displayed on the contact page.
     *
     * @example
     * // Verify the default error message is displayed
     * await contactPage.verifyHeaderErrorMessage();
     *
     * @example
     * // Verify a custom error message is displayed
     * await contactPage.verifyHeaderErrorMessage(true, "Custom error message");
     *
     * @example
     * // Verify that no error message is displayed
     * await contactPage.verifyHeaderErrorMessage(false);
     *
     * @param {string} [message="We welcome your feedback - but we won't get it unless you complete the form correctly."] - The expected error message.
     * @param {boolean} [expected=true] - If true, asserts that the error message is present; otherwise, asserts that it is not.
     * @returns {Promise<void>} - A promise that resolves when the verification is complete.
     * @throws {Error} - Throws an error if the assertion fails.
     */
    async verifyHeaderErrorMessage(expected: boolean = true, message: string = "We welcome your feedback - but we won't get it unless you complete the form correctly."): Promise<void> {
        const errorMessagesLocator = this.page.locator(".alert");
        if (expected) {
            await expect(errorMessagesLocator).toHaveText(message);
        } else {
            await expect(errorMessagesLocator).not.toHaveText(message);
        }
    }

    /**
     * Verifies if the error messages for required fields are displayed or not.
     *
     * @description This method iterates through the provided array of field names and checks if the corresponding error message is visible based on the expected boolean value.
     * It also verifies the total number of error messages displayed on the page.
     *
     *
     * @usage
     * ```typescript
     * // To verify that error messages for 'Name' and 'Email' fields are visible:
     * await contactPage.verifyFieldErrorMessage(['Name', 'Email']);
     *
     * // To verify that error messages for 'Name' and 'Email' fields are not visible:
     * await contactPage.verifyFieldErrorMessage(['Name', 'Email'], false);
     * ```
     *
     * @param {string[]} fields - An array of field names for which to verify the error messages.
     * @param {boolean} [expected=true] - A boolean indicating whether the error messages are expected to be visible (true) or not visible (false). Defaults to true.
     * @returns {Promise<void>} - A promise that resolves when all verifications are complete.
     * @throws {Error} - Throws an error if any of the assertions fail.
     */
    async verifyFieldErrorMessage(fields: string[], expected: boolean = true): Promise<void> {
        for (const field of fields) {
            const fieldErrorMessageLocator = this.page.getByText(`${field} is required`, { exact: true });
            if (expected) {
                await expect(fieldErrorMessageLocator).toBeVisible();
            } else {
                await expect(fieldErrorMessageLocator).not.toBeVisible();
            }
        }

        const numberOfErrorMessages = await this.page.getByText(" is required").count();
        if (expected) {
            expect(numberOfErrorMessages).toBe(fields.length);
        } else {
            expect(numberOfErrorMessages).toBe(0);
        }
    }

    /**
     * Sets the Forename field in the contact form. Ensures that the error message is not visible after setting the value.
     *
     * @example
     * ```typescript
     * await contactPage.setForename('John');
     * ```
     *
     * @param {string} forename - The forename to set.
     * @returns {Promise<void>} - A promise that resolves when the forename is set.
     * @throws {Error} - If the element with selector '#forename' is not found or is not visible.
     */
    async setForename(forename: string): Promise<void> {
        const selectorId = "#forename";
        await populateField(this.page, selectorId, forename);
        await expect(this.page.getByText("Forename is required")).not.toBeVisible();
    }

    /**
     * Sets the Email field in the contact form. Ensures that the error message is not visible after setting the value.
     *
     * @example
     * ```typescript
     * await contactPage.setEmail('abc@123.com');
     * ```
     *
     * @param {string} email - The email to set.
     * @returns {Promise<void>} - A promise that resolves when the email is set.
     * @throws {Error} - If the element with selector '#email' is not found or is not visible.
     */
    async setEmail(email: string): Promise<void> {
        const selectorId = "#email";
        await populateField(this.page, selectorId, email);
        await expect(this.page.getByText("Email is required")).not.toBeVisible();
    }

    /**
     * Sets the Message field in the contact form. Ensures that the error message is not visible after setting the value.
     *
     * @example
     * ```typescript
     * await contactPage.setMessage('This is a test message');
     * ```
     *
     * @param {string} message - The message to set.
     * @returns {Promise<void>} - A promise that resolves when the message is set.
     * @throws {Error} - If the element with selector '#message' is not found or is not visible.
     */
    async setMessage(message: string): Promise<void> {
        const selectorId = "#message";
        await populateField(this.page, selectorId, message);
        await expect(this.page.getByText("Message is required")).not.toBeVisible();
    }

    /**
     * Verifies the successful submission message is displayed on the contact page.
     * Use this method after submitting the contact form to ensure the success message is visible.
     *
     * @example
     * ```typescript
     * await contactPage.verifySuccessfulSubmissionMessage('John');
     * ```
     *
     * @param {string} forename - The forename of the user, which should be included in the success message.
     * @returns {Promise<void>} - A promise that resolves when the success message is verified to be visible.
     * @throws {Error} - Throws an error if the success message is not visible.
     */
    async verifySuccessfulSubmissionMessage(forename: string): Promise<void> {
        await this.page.getByText("Sending Feedback").waitFor({ state: "hidden" });
        const successMessageLocator = this.page.locator(".alert.alert-success").getByText(`Thanks ${forename}, we appreciate your feedback.`);

        await expect(successMessageLocator).toBeVisible({ timeout: 20000 });
    }
}
