// e2e\tests\test1.spec.ts

import test from "../fixtures/pages";
import { MainPage } from "../pages/mainPage";

test.beforeEach(async ({ mainPage, page }) => {
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

test("Validate Error page", async ({ page, mainPage }) => {
    await test.step("Step 1 - Go to Contact Page", async () => {
        await mainPage.navigateToPage("Contact");
        // await contactPage.ensureContactPageIsVisible();
    });

    await test.step("Step 2 - Click submit button", async () => {
        // Click submit button
    });

    await test.step("Step 3 - Verify error messages", async () => {
        // Verify error messages
    });

    await test.step("Step 4 - Populate mandatory fields", async () => {
        // Populate mandatory fields
    });

    await test.step("Step 5 - Validate errors are gone", async () => {
        // Validate errors are gone
    });
});
