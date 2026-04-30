import { expect as pwExpect, test, } from "@playwright/test";
import { RegistrationPage } from "./registration.page";
import { registrateUser } from "../_shared/credits";
import { responseRegisterOwner, responseToken } from "../_shared/mock_responses";
import { AuthPage } from "../auth/auth.page";

test.describe("Registration page ", () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);

    await registrationPage.open();
  });

  test("title is correct", async () => {
    await pwExpect(registrationPage.title).toContainText("New account");
  });

  test("email input is visible", async () => {
    await pwExpect(registrationPage.emailInput).toBeVisible();
  });

  test("name input is visible", async () => {
    await pwExpect(registrationPage.userNameInput).toBeVisible();
  });

  test("password input is visible", async () => {
    await pwExpect(registrationPage.passwordInput).toBeVisible();
  });

  test("confirm password input is visible", async () => {
    await pwExpect(registrationPage.confirmPasswordInput).toBeVisible();
  });

  test("registration button is visible", async () => {
    await pwExpect(registrationPage.registerButton).toBeVisible();
  });

  test("already have an account button is visible", async () => {
    await pwExpect(registrationPage.existAccountLink).toBeVisible();
  });

  test("click on registrate button with valid credentials should registrate a user", async ({ page }) => {
    const authPage = new AuthPage(page);
    const requestPromise = page.waitForRequest("**/api/user*");

    /* Imitated login response */
    await page.route("**/api/token*", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(responseToken),
      });
    });

    /* Imitated registation response */
    await page.route("**/api/user*", (route) => {
      route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify(responseRegisterOwner),
      });
    });

    await registrationPage.register(
      registrateUser.email,
      registrateUser.userName,
      registrateUser.password,
      registrateUser.passwordConfirm,
    );

    const req = await requestPromise;

    const reqBodyData = req.postDataJSON();

    await pwExpect(req.url()).toContain("/api/user");
    await pwExpect(req.method()).toBe("POST");

    await pwExpect(reqBodyData).toContainEqual({
      confirm_password: registrateUser.passwordConfirm,
      email: registrateUser.email,
      password: registrateUser.password,
      username: registrateUser.userName,
    });

    await pwExpect(page).toHaveURL(authPage.url);
  });

  // user name or email
  test("shows an error after register click with existing credentials", async ({ page }) => {
    const requestPromise = page.waitForRequest("**/api/user*");

    /* Imitated registation response */
    await page.route("**/api/user*", (route) => {
      route.fulfill({
        status: 400,
        contentType: "application/json",
      });
    });

    await registrationPage.register(
      registrateUser.email,
      registrateUser.userName,
      registrateUser.password,
      registrateUser.passwordConfirm,
    );

    const req = await requestPromise;

    const reqBodyData = req.postDataJSON();

    await pwExpect(req.url()).toContain("/api/user");
    await pwExpect(req.method()).toBe("POST");

    await pwExpect(reqBodyData).toContainEqual({
      confirm_password: registrateUser.passwordConfirm,
      email: registrateUser.email,
      password: registrateUser.password,
      username: registrateUser.userName,
    });

    await pwExpect(registrationPage.errorMassageDublicate).toBeVisible();
    await pwExpect(registrationPage.errorMassageDublicate).toContainText(
      "Username or email already taken",
    );
    await pwExpect(page).toHaveURL(registrationPage.url);
  });
});
