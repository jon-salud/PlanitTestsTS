// e2e\pages\shopPage.ts

import { expect, Locator, Page } from "@playwright/test";
import { getMenuLink, getTheColumnValue, populateField } from "../helpers/utilities";

export class ShopPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Ensures that the shop page is visible by waiting for the page to load,
     *      checking for the visibility of the first shop item, and verifying that there are at least 1 shop items and that the URL contains "/shop".
     *
     * @usage
     * ```typescript
     * await shopPage.ensureShopPageIsVisible();
     * ```
     *
     * @returns {Promise<void>} - A promise that resolves when the shop page is verified to be visible.
     * @throws {Error} - Throws an error if the page fails to load, the first shop item is not visible, there are no shop items,
     *                   or the URL does not contain "/shop".
     */
    async ensureShopPageIsVisible(): Promise<void> {
        await this.page.waitForLoadState();
        const shopItemsLocator = this.page.locator(".product.ng-scope");
        await expect(shopItemsLocator.first()).toBeVisible();
        expect(await shopItemsLocator.count()).toBeGreaterThan(0);
        expect(this.page.url()).toContain("/shop");
    }

    /**
     * Adds a specified product to the cart.
     *
     * 1. Locates the Product that contains the specified product name.
     * 2. Verifies Product Visibility.
     * 3. Gets Current Cart Number.
     * 4. Locates then clicks the 'Buy' Button of the product.
     * 5. Increases Cart Number by 1
     * 6. Verifies Cart Number Update
     *
     * @param {string} product - The name of the product to add to the cart.
     *
     * @example
     * ```typescript
     * await shopPage.addProductToCart("Example Product");
     * ```
     *
     * @throws {Error} If the product is not found or the cart number cannot be updated.
     * @returns {Promise<number>} - The numerical value of the product unit price.
     */
    async addProductToCart(product: string): Promise<number> {
        const productItemLocator = this.page.locator(".product.ng-scope").filter({ hasText: product });
        await expect(productItemLocator).toBeVisible();
        const cartNumberLocator = this.page.locator("#nav-cart > a > span");
        await expect(cartNumberLocator).toBeVisible();
        let cartNumber: number = Number(await cartNumberLocator.innerText());
        const productUnitPrice = Number((await productItemLocator.locator(".product-price.ng-binding").innerText()).replace("$", ""));
        const buyButtonLocator = productItemLocator.locator(".btn.btn-success");
        await buyButtonLocator.scrollIntoViewIfNeeded();
        await buyButtonLocator.click();
        cartNumber++;
        expect(await cartNumberLocator.innerText()).toBe(String(cartNumber));
        return productUnitPrice;
    }

    /**
     * @description Verifies the subtotal for a specific product in the shopping cart.
     * It locates the product row, extracts the subtotal value, and compares it against the expected value.
     *
     * @example
     * ```typescript
     * await shopPage.verifySubtotal("Product Name", 2, 10.95);
     * ```
     *
     * @param {string} product - The name of the product to verify.
     * @param {number} quantity - The quantity of the product in the cart.
     * @param {number} price - The price of the product (per unit).
     * @returns {Promise<number>} - the subtotal to be available for use within the test.
     * @throws {Error} - Throws an error if the product row is not visible, the quantity input is not visible, the headers are not visible, or if the subtotal does not match the expected value.
     */
    async verifySubtotal(product: string, quantity: number, price: number): Promise<number> {
        let subtotalValueFromPage: number = await getTheColumnValue(this.page, product, "Subtotal");
        expect(subtotalValueFromPage).toBe(price * quantity);
        return price * quantity;
    }

    /**
     * @description Verifies the price for a specific product in the shopping cart.
     * It locates the product row, extracts the price value, and compares it against the expected value.
     *
     * @example
     * ```typescript
     * await shopPage.verifyPrice("Product Name", 2, 10.95);
     * ```
     *
     * @param {string} product - The name of the product to verify.
     * @param {number} expectedPrice - The expected price value of the product (per unit).
     * @returns {Promise<void>} - A promise that resolves when the price verification is complete.
     * @throws {Error} - Throws an error if the product row is not visible, the headers are not visible, or if the price does not match the expected price value.
     */
    async verifyPrice(product: string, expectedPrice: number): Promise<void> {
        let priceValueFromPage: number = await getTheColumnValue(this.page, product, "Price");
        expect(priceValueFromPage).toBe(expectedPrice);
    }

    /**
     * Verifies that the total displayed on the page matches the expected total.
     *
     * @example
     * ```typescript
     * await shopPage.verifyTotal(150.00);
     * ```
     *
     * @param {number} total - The expected total value to be displayed on the page.
     * @throws {Error} - If the total locator is not visible or if the displayed total does not match the expected total.
     * @returns {Promise<void>} - A promise that resolves when the verification is complete.
     */
    async verifyTotal(total: number): Promise<void> {
        const totalLocator = this.page.locator(".total.ng-binding");
        await expect(totalLocator).toBeVisible();
        expect(Number((await totalLocator.innerText()).replace("Total: ", ""))).toBe(total);
    }
}
