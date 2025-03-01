// e2e\tests\test2.spec.ts

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

test("Validate Successful submission of message on the Contact Page 5 times", { tag: "@RegressionTest" }, async ({ page, contactPage }) => {
    const forename = "Johnny Bravo";
    const email = "abc@123.com";
    const message = "This is a test message";

    for (let i = 0; i < 5; i++) {
        await test.step(`Step ${i + 1}-1 - Go to Contact Page`, async () => {
            await navigateToPage(page, "Contact");
            await contactPage.ensureContactPageIsVisible();
        });

        await test.step(`Step ${i + 1}-2 - Populate mandatory fields`, async () => {
            await contactPage.setForename(forename);
            await contactPage.setEmail(email);
            await contactPage.setMessage(message);
        });

        await test.step(`Step ${i + 1}-3 - Click submit button`, async () => {
            await contactPage.clickSubmitButton();
        });

        await test.step(`Step ${i + 1}-4 - Validate successful submission message`, async () => {
            await contactPage.verifySuccessfulSubmissionMessage(forename);
            await navigateToPage(page, "Home");
        });
    }
});
