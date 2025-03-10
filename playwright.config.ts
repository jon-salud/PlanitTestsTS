import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: "./e2e",
    outputDir: "./reports/test-results",
    timeout: 60 * 1000,
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 10 * 1000,
    } /* Run tests in files in parallel */,
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ["html", { open: "never", host: null }],
        ["list", { outputFile: "./reports/test-results/test-results.txt" }],
        ["json", { outputFile: "./reports/test-results/test-results.json" }],
        [
            "jest-junit",
            {
                outputDirectory: "./reports/test-results",
                outputName: "junit.xml",
            },
        ],
        ["allure-playwright"],
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: "https://jupiter.cloud.planittesting.com/",

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
        video: "off",
        // {
        //     mode: "retain-on-failure",
        //     size: { width: 1538, height: 731 },
        // },
        viewport: {
            height: 731,
            width: 1538,
        },
    },
    /* Configure projects for major browsers */
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },

        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },

        {
            name: "webkit",
            use: { ...devices["Desktop Safari"] },
        },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
