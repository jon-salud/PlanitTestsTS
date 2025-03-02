import { test as baseTests } from "@playwright/test";
import { MainPage } from "../pages/mainPage";
import { ContactPage } from "../pages/contactPage";
import { ShopPage } from "../pages/shopPage";

const test = baseTests.extend<{
    mainPage: MainPage;
    contactPage: ContactPage;
    shopPage: ShopPage;
}>({
    mainPage: async ({ page }, use) => {
        await use(new MainPage(page));
    },
    contactPage: async ({ page }, use) => {
        await use(new ContactPage(page));
    },
    shopPage: async ({ page }, use) => {
        await use(new ShopPage(page));
    },
});

export default test;
export const expect = test.expect;
