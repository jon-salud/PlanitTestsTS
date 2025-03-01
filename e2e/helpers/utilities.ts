// e2e\helpers\utilities.ts

import { expect, Locator, Page } from "@playwright/test";

/**
 * Retrieves a menu link Locator based on the provided menu label. It scrolls into view when found.
 *
 * @param {string} menuLabel - The text of the menu item to locate.
 * @returns {Promise<Locator>} A Promise that resolves to the Locator representing the menu link.
 *
 * @example
 * ```typescript
 * const homeMenuLink = await getMenuLink("Home");
 * await homeMenuLink.click();
 * ```
 *
 * @throws {Error} If the menu link with the specified label is not found.  The promise will reject if the locator does not resolve.
 */
export function getMenuLink(page: Page, menuLabel: string): Locator {
    const menuLinkLoc = page.locator("ul > li").filter({ hasText: menuLabel });

    return menuLinkLoc;
}

/**
 * Populates a specified field on a page with a given value, then verifies the value has been entered.
 *
 * This function locates an element on the page using the provided selector, scrolls it into view, fills it with the specified value,
 *      and then presses the "Tab" key to trigger any associated events. Finally, it asserts that the field's value matches the input value.
 *
 * @usage
 * ```typescript
 * await populateField(page, '#forename', 'John');
 * ```
 *
 * @param page - The Playwright Page object representing the current page.
 * @param selectorId - The selector (e.g., CSS selector or XPath) used to locate the input field.
 * @param value - The string value to fill into the input field.
 * @throws {Error} Can throw an error if the element specified by `selectorId` is not found, is not visible, or if the value is not correctly entered into the field.
 * @returns A Promise that resolves when the field has been populated and the value has been verified.
 */
export async function populateField(page: Page, selectorId: string, value: string) {
    const forenameLocator = page.locator(selectorId);
    await forenameLocator.scrollIntoViewIfNeeded();
    await forenameLocator.fill(value);
    await forenameLocator.press("Tab");
    await expect(page.locator(selectorId)).toHaveValue(value);
}

/**
 * Navigates to a page by clicking on a menu link.
 *
 * @example
 * ```typescript
 * await navigateToPage("Contact");
 * ```
 *
 * @param menuLabel - The label of the menu link to click.
 * @returns {Promise<void>} - A promise that resolves when the navigation is complete.
 * @throws {Error} If the menu link with the specified label is not found or the navigation fails.
 */
export async function navigateToPage(page: Page, menuLabel: string): Promise<void> {
    const menuLinkLoc = getMenuLink(page, menuLabel);
    await expect(menuLinkLoc).toBeVisible();
    await menuLinkLoc.scrollIntoViewIfNeeded();
    await menuLinkLoc.click();
}
