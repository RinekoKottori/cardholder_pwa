import { AuthPage } from "./auth.page";
import { expect, test } from "@playwright/test";
import { CardsPage } from "../cards/cards.page";
import { loginUser } from "../_shared/credits";
import { responseRegisterOwner } from "../_shared/mock_responses";
import { RegistrationPage } from "../registration/registration.page";
import { RecoveryPage } from "../recovery/recovery.page";

test.describe("Auth page ", () => {
  let authPage: AuthPage;

  test.beforeEach(async ({page}) => {
    authPage = new AuthPage(page);

    await authPage.open();
  });

  test("should open", async ({page}) => {
    expect(page).toHaveURL(authPage.url);
  });

  test("should have title", async () => {
    expect(authPage.title).toHaveText("Welcome");
  });

  test("should have login button", async () => {
    expect(authPage.loginButton).toBeVisible();
  });

  test("should have register button", async () => {
    expect(authPage.registerLink).toBeVisible();
  });

  test("should have forgot password button", async () => {
    expect(authPage.passwordRecoveryLink).toBeVisible();
  });

  test("click on login button with valid credentials should login", async ({page}) => {
    const cardsPage = new CardsPage(page);

    /* Imitated login response */
    await page.route("**/api/token*", (route) => {
      route.fulfill({
        status: 200,
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

    expect(page).toHaveURL(cardsPage.url);
  });

  test("if user is not registered and try to login should be printed the error", async ({page}) => {
    const requestPromise = page.waitForRequest("**/api/token*");

    await authPage.login(loginUser.userName, loginUser.password);

    const req = await requestPromise;

    const reqBodyData = req.postData();

    expect(req.url()).toContain("/api/token");
    expect(req.method()).toBe("POST");

    expect(reqBodyData).toContain("grant_type");
    expect(reqBodyData).toContain("username");
    expect(reqBodyData).toContain("password");
    expect(reqBodyData).toContain("Frodo");
    expect(reqBodyData).toContain("Beggins");

    expect(authPage.authError).toBeVisible;
  });

  test("click on new authorization button should redirect to new authorization page", async ({page}) => {
    const registerPage = new RegistrationPage(page);

    await authPage.registerLink.click();

    expect(page).toHaveURL(registerPage.url);
  });

  test("click on recovery button shold redirect to recovery page", async ({page}) => {
    const recoveryPage = new RecoveryPage(page);

    await authPage.passwordRecoveryLink.click();

    expect(page).toHaveURL(recoveryPage.url);
  });
});
