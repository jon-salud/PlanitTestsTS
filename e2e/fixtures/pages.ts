import { test as baseTests } from "@playwright/test";
import { MainPage } from "../pages/mainPage";
import { ContactPage } from "../pages/contactPage";

const test = baseTests.extend<{
    mainPage: MainPage;
    contactPage: ContactPage;
}>({
    mainPage: async ({ page }, use) => {
        await use(new MainPage(page));
    },
    contactPage: async ({ page }, use) => {
        await use(new ContactPage(page));
    },
});

export default test;
export const expect = test.expect;
