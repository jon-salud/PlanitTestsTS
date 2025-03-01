// e2e\helpers\utilities.ts

import { Locator, Page } from "@playwright/test";

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
