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

const items = [
    { product: "Stuffed Frog", quantity: 2 },
    { product: "Fluffy Bunny", quantity: 5 },
    { product: "Valentine Bear", quantity: 3 },
];

test("Buy items", { tag: "@RegressionTest" }, async ({ page }) => {
    await test.step("Step 1 - Go to Shopping Page", async () => {
        await navigateToPage(page, "Shop");
        // await shopPage.ensureShopPageIsVisible();
    });

    for (const item of items) {
        for (let i = 0; i < item.quantity; i++) {
            await test.step(`Step 2-${i + 1} for ${item.product} - Add to cart ${item.quantity} times`, async () => {
                // Populate mandatory fields
            });
        }
    }

    await test.step("Step 3 - Go to Cart Page", async () => {
        // Go to Cart Page
    });

    await test.step("Step 4 - Verify the subtotal for each product is correct", async () => {
        // Verify the subtotal for each product is correct
    });

    await test.step("Step 4 - Verify the price for each product", async () => {
        // Verify the price for each product
    });

    await test.step("Step 4 - Verify that total = sum(sub totals)", async () => {
        // Verify that total = sum(sub totals)
    });
});
