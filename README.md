# PlanitTestsTS

This repository contains automated tests for the Jupiter Toys application using Playwright with TypeScript.

## Packages

The following packages are used in this project:

- `@playwright/test`: For end-to-end testing
- `allure-playwright`: For test reporting with Allure
- `jest-allure`: For Jest integration with Allure
- `jest-junit`: For JUnit test reporting
- `dotenv`: For managing environment variables

## Getting Started

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/PlanitTestsTS.git
    cd PlanitTestsTS
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Install Playwright browsers:

    ```sh
    npx playwright install
    ```

4. Run the tests:

    ```sh
    # Run tests in all browsers
    npx playwright test

    # Run tests in specific browser
    npx playwright test --project=chromium
    npx playwright test --project=firefox
    npx playwright test --project=webkit

    # Run tests in headed mode
    npx playwright test --headed

    # Run tests specific to a tag
    npx playwright test --grep="@RegressionTest" 
    ```

## Project Structure

- `e2e/`: Contains the end-to-end test files
- `reports/test-results/`: Contains test execution reports
- `playwright.config.ts`: Playwright configuration
- `.env`: Environment variables (create this file based on your needs)

## Test Reports

The project generates several types of reports:

- HTML report
- List report (test-results.txt)
- JSON report (test-results.json)
- JUnit report (junit.xml)
- Allure report

## GitHub Actions

The project includes automated CI/CD using GitHub Actions, which runs tests on:

- Push to main branch
- Pull requests to main branch

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
