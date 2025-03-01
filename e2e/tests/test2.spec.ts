// e2e\tests\test2.spec.ts

import test from "../fixtures/pages";

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

test("Validate Successful submission of message on the Contact Page", async ({ page }) => {
    for (let i = 0; i < 5; i++) {
        await test.step("Step 1 - Go to Contact Page", async () => {
            // From the home page go to contact page
        });

        await test.step("Step 2 - Populate mandatory fields", async () => {
            // Populate mandatory fields
        });

        await test.step("Step 3 - Click submit button", async () => {
            // Click submit button
        });

        await test.step("Step 4 - Validate successful submission message", async () => {
            // Validate successful submission message
        });
    }
});
