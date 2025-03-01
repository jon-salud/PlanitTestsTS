// e2e\tests\test1.spec.ts

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

test("Validate Error page", { tag: "@RegressionTest" }, async ({ page, contactPage }) => {
    await test.step("Step 1 - Go to Contact Page", async () => {
        await navigateToPage(page, "Contact");
        await contactPage.ensureContactPageIsVisible();
    });

    await test.step("Step 2 - Click submit button", async () => {
        await contactPage.clickSubmitButton();
    });

    await test.step("Step 3 - Verify error messages", async () => {
        await contactPage.verifyHeaderErrorMessage(true);
        await contactPage.verifyFieldErrorMessage(["Forename", "Email", "Message"]);
    });

    await test.step("Step 4 - Populate mandatory fields", async () => {
        await contactPage.setForename("John");
        await contactPage.setEmail("abc@123.com");
        await contactPage.setMessage("This is a test message");
    });

    await test.step("Step 5 - Validate errors are gone", async () => {
        await contactPage.verifyHeaderErrorMessage(false);
        await contactPage.verifyFieldErrorMessage(["Forename", "Email", "Message"], false);
    });
});
