// e2e\tests\test3.spec.ts

import test from "../fixtures/pages";
import { navigateToPage } from "../helpers/utilities";

test.beforeEach(async ({ mainPage }) => {
    await mainPage.goToMainPage();
});

test.afterEach(async ({ page }, testInfo) => {
    let testStatus = testInfo.status?.toUpperCase();
    if (testStatus == "PASSED") {
        console.log(`   \u001b[32m< PASSED >\u001b[0m ${testInfo.title}`);
    } else {
        console.log(`   \u001b[31m< FAILED >\u001b[0m ${testInfo.title}`);
    }
    await page.close();
});

// the unit price will be updated after adding the product to the cart
let items = [
    { product: "Stuffed Frog", quantity: 2, price: 0 },
    { product: "Fluffy Bunny", quantity: 5, price: 0 },
    { product: "Valentine Bear", quantity: 3, price: 0 },
];
let total = 0;

test("Buy items", { tag: "@RegressionTest" }, async ({ page, shopPage }) => {
    await test.step("Step 1 - Go to Shopping Page", async () => {
        await navigateToPage(page, "Shop");
        await shopPage.ensureShopPageIsVisible();
    });

    await test.step("Step 2 - Add products to cart", async () => {
        for (const item of items) {
            for (let i = 0; i < item.quantity; i++) {
                await test.step(`Step 2-${i + 1} - Add "${item.product}" to cart ${item.quantity} times`, async () => {
                    item.price = await shopPage.addProductToCart(item.product);
                });
            }
        }
    });

    await test.step("Step 3 - Go to Cart Page", async () => {
        await navigateToPage(page, "Cart");
    });

    await test.step(`Step 4 - Verify the quantities for each product are correct`, async () => {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            await test.step(`Step 4-${i + 1} - Verify the quantity for product "${item.product}" is ${item.quantity}`, async () => {
                total = total + (await shopPage.verifySubtotal(item.product, item.quantity, item.price));
            });
        }
    });

    await test.step(`Step 5 - Verify the prices for each product are correct`, async () => {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            for (let i = 0; i < items.length; i++) {
                await test.step(`Step 5-${i + 1} - Verify the price for product "${item.product}" is \$${item.price}`, async () => {
                    await shopPage.verifyPrice(item.product, item.price);
                });
            }
        }
    });

    await test.step(`Step 6 - Verify that total = sum of the sub totals (\$${total})`, async () => {
        await shopPage.verifyTotal(total);
    });
});
