import { test as baseTests } from "@playwright/test";
import { MainPage } from "../pages/mainPage";

const test = baseTests.extend<{
    mainPage: MainPage;
}>({
    mainPage: async ({ page }, use) => {
        await use(new MainPage(page));
    },
});

export default test;
export const expect = test.expect;
