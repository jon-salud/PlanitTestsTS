# PlanitTestsTS

Automated test suite for Jupiter Toys application using Playwright with TypeScript.

## Project Configuration

The project is configured with:

- Chromium, Firefox, and WebKit browser support
- Base URL: <https://jupiter.cloud.planittesting.com/>
- Parallel test execution (disabled in CI)
- Retries enabled only in CI environment
- Screenshots on test failure
- Trace capture on test failure

## Test Reporting

Multiple report formats are configured:

- HTML report (auto-generated, no auto-open)
- List report (`reports/test-results/test-results.txt`)
- JSON report (`reports/test-results/test-results.json`)
- JUnit report (`reports/test-results/junit.xml`)
- Allure report integration

## Setup & Installation

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

## Running Tests

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

## CI/CD

GitHub Actions workflow is configured to:

- Run on push to main branch
- Run on pull requests to main branch
- Execute tests in Chromium only
- Upload test results as artifacts (30-day retention)
- Use Ubuntu latest runner

## Environment Configuration

The project uses dotenv for environment variables. Create a `.env` file in the root directory with your configuration settings.

## Project Structure

```text
PlanitTestsTS/
├── e2e/               # Test files
├── reports/          
│   └── test-results/  # Test execution reports
├── .github/          
│   └── workflows/     # CI/CD configuration
├── playwright.config.ts
└── package.json
```
