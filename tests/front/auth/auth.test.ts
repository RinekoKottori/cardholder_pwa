import { AuthPage } from "./auth.page";
import { expect, test } from "@playwright/test";
import { CardsPage } from "../cards/cards.page";
import { loginUser } from "../_shared/credits";
import { responseRegisterOwner, responseToken } from "../_shared/mock_responses";
import { RegistrationPage } from "../registration/registration.page";
import { RecoveryPage } from "../recovery/recovery.page";
import { mockPublicRequests } from "../_shared/mock_util_request";

test.describe("Auth page ", () => {
  let authPage: AuthPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);

    await mockPublicRequests({ page });
    await authPage.open();
  });

  test("should open", async ({ page }) => {
    await expect(page).toHaveURL(authPage.url);
  });

  test("should have title", async () => {
    await expect(authPage.title).toHaveText("Welcome");
  });

  test("should have login button", async () => {
    await expect(authPage.loginButton).toBeVisible();
  });

  test("should have register button", async () => {
    await expect(authPage.registerLink).toBeVisible();
  });

  test("should have forgot password button", async () => {
    await expect(authPage.passwordRecoveryLink).toBeVisible();
  });

  test("click on login button with valid credentials should login", async ({
    page,
  }) => {
    const cardsPage = new CardsPage(page);

    /* Imitated login response */
    await page.route("**/api/token*", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(responseToken),
      });
    });

    /* Imitated login response */
    await page.route("**/api/user*", (route) => {
      route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify(responseRegisterOwner),
      });
    });

    await authPage.login(loginUser.userName, loginUser.password);

    await expect(page).toHaveURL(cardsPage.url);
  });

  //!!! DO NOT WORK - why?
  test("if user is not registered and try to login should be printed the error", async ({
    page,
  }) => {
    const requestPromise = page.waitForRequest("**/api/token*");
  
    /* Imitated login response */
    await page.route("**/api/token*", (route) => {
      route.fulfill({
        status: 401,
        body: JSON.stringify(responseToken),
      })
    });

    await authPage.login(loginUser.userName, loginUser.password);

    await expect(authPage.authError).toBeVisible();
    await expect(authPage.authError).toContainText("Request error: 401 Unauthorized");

    const req = await requestPromise;

    const reqBodyData = req.postData();

    await expect(req.url()).toContain("/api/token");
    await expect(req.method()).toBe("POST");
    await expect(reqBodyData).toContain("grant_type");
    await expect(reqBodyData).toContain("username");
    await expect(reqBodyData).toContain("password");
    await expect(reqBodyData).toContain("Frodo");
    await expect(reqBodyData).toContain("Beggins");
  });

  test("click on new authorization button should redirect to new authorization page", async ({
    page,
  }) => {
    const registerPage = new RegistrationPage(page);

    await authPage.registerLink.click();

    await expect(page).toHaveURL(registerPage.url);
  });

  test("click on recovery button shold redirect to recovery page", async ({
    page,
  }) => {
    const recoveryPage = new RecoveryPage(page);

    await authPage.passwordRecoveryLink.click();

    await expect(page).toHaveURL(recoveryPage.url);
  });
});
