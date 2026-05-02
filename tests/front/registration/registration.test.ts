import { expect as pwExpect, test, } from "@playwright/test";
import { RegistrationPage } from "./registration.page";
import { registrateUser } from "../_shared/credits";
import { responseRegisterOwner, responseToken } from "../_shared/mock_responses";
import { AuthPage } from "../auth/auth.page";
import { mockPublicRequests } from "../_shared/mock_util_request";

test.describe("Registration page ", () => {
  let registrationPage: RegistrationPage;
  const validRegistrateUser = {
    ...registrateUser,
    password: "Beggins1",
    passwordConfirm: "Beggins1",
  };

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);

    await mockPublicRequests({ page });
    
    await registrationPage.open();

    /* Imitated login response */
    await page.route("**/api/token*", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(responseToken),
      });
    });
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

    /* Imitated registation response */
    await page.route("**/api/user*", async (route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify(responseRegisterOwner),
      });
    });

    const [req] = await Promise.all([
      page.waitForRequest((request) =>
        request.url().includes("/api/user") && request.method() === "POST",
      ),
      registrationPage.register(
        validRegistrateUser.userName,
        validRegistrateUser.email,
        validRegistrateUser.password,
        validRegistrateUser.passwordConfirm,
      ),
    ]);

    const reqBodyData = req.postDataJSON();

    await pwExpect(req.url()).toContain("/api/user");
    await pwExpect(req.method()).toBe("POST");

    await pwExpect(reqBodyData).toMatchObject({
      confirm_password: validRegistrateUser.passwordConfirm,
      email: validRegistrateUser.email,
      password: validRegistrateUser.password,
      username: validRegistrateUser.userName,
    });

    await pwExpect(page).toHaveURL(authPage.url);
  });

  // user name or email
  test("shows an error after register click with existing credentials", async ({ page }) => {

    /* Imitated registation response */
    await page.route("**/api/user*", async (route) => {
      await route.fulfill({
        status: 400,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ "detail": "Username or email is already taken" }),
      });
    });

    const [req] = await Promise.all([
      page.waitForRequest((request) =>
        request.url().includes("/api/user") && request.method() === "POST",
      ),
      registrationPage.register(
        validRegistrateUser.userName,
        validRegistrateUser.email,
        validRegistrateUser.password,
        validRegistrateUser.passwordConfirm,
      ),
    ]);

    const reqBodyData = req.postDataJSON();

    await pwExpect(req.url()).toContain("/api/user");
    await pwExpect(req.method()).toBe("POST");

    await pwExpect(reqBodyData).toMatchObject({
      confirm_password: validRegistrateUser.passwordConfirm,
      email: validRegistrateUser.email,
      password: validRegistrateUser.password,
      username: validRegistrateUser.userName,
    });

    const duplicateError = registrationPage.errorMassageDublicate.filter({
      hasText: "Request error: 400 Bad Request",
    });

    await pwExpect(duplicateError).toBeVisible();
    await pwExpect(page).toHaveURL(registrationPage.url);
  });
});
