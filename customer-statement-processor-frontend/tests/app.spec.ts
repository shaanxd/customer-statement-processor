import { test, expect, type Page } from "@playwright/test";
import path from "path";

const submitFiles = async (page: Page, filename: string) => {
  /** Upload a file based on given parameters  */
  const filePath = path.resolve(path.resolve(), `tests/data/${filename}`);
  await page.setInputFiles('input[type="file"]', filePath);

  /** Submit the form */
  await page.click('button[type="submit"]');

  await expect(page.getByTestId("statement-validation-result")).toBeVisible();
};

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5175/");
});

/** Check if validation form at the start exists */
test("Renders validation form on initial render", async ({ page }) => {
  const validationForm = page.getByTestId("statement-validation-form");
  await expect(validationForm).toBeVisible();

  const input = page.locator('input[name="file"]');
  await expect(input).toBeVisible();

  const submit = page.locator('button[type="submit"]');
  await expect(submit).toBeVisible();
});

[
  { filetype: "csv", invalidCount: 3 },
  { filetype: "xml", invalidCount: 2 },
].forEach(({ filetype, invalidCount }) => {
  test(`Upload a valid ${filetype.toUpperCase()} file with invalid transactions.`, async ({
    page,
  }) => {
    await submitFiles(page, `invalid.${filetype}`);
    await expect(
      page.getByText(`${invalidCount} invalid transactions`)
    ).toBeVisible();
  });
});

["csv", "xml"].forEach((filetype) => {
  test(`Upload a valid ${filetype.toUpperCase()} file with valid transactions.`, async ({
    page,
  }) => {
    await submitFiles(page, `valid.${filetype}`);

    await expect(
      page.getByText(
        "No issues with the transaction statement. No report has been generated for this validation."
      )
    ).toBeVisible();
  });
});
