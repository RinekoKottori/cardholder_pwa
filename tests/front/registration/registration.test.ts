import { expect as pwExpect,test,  } from "@playwright/test";
import { RegistrationPage } from "./registration.page";
import { registrateUser } from "../_shared/credits";
import { responseRegisterOwner } from "../_shared/mock_responses";
import { AuthPage } from "../auth/auth.page";

test.describe("Registration page ", () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({page}) => {
    registrationPage = new RegistrationPage(page);

    await registrationPage.open();
  });

  test("title is correct", async () => {
    pwExpect(registrationPage.title).toContainText("Новый пользователь");
  });

  test("email input is visible", async () => {
    pwExpect(registrationPage.emailInput).toBeVisible;
  });

  test("name input is visible", async () => {
    pwExpect(registrationPage.userNameInput).toBeVisible;
  });

  test("password input is visible", async () => {
    pwExpect(registrationPage.passwordInput).toBeVisible;
  });

  test("confirm password input is visible", async () => {
    pwExpect(registrationPage.confirmPasswordInput).toBeVisible;
  });

  test("registration button is visible", async () => {
    pwExpect(registrationPage.registerButton).toBeVisible;
  });

  test("already have an account button is visible", async () => {
    pwExpect(registrationPage.existAccountLink).toBeVisible;
  });

  test("click on registrate button with valid credentials should registrate a user", async ({page}) => {
    const authPage = new AuthPage(page);
    const requestPromise = page.waitForRequest("**/api/user*");

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

    pwExpect(req.url()).toContain("/api/user");
    pwExpect(req.method()).toBe("POST");

    pwExpect(reqBodyData).toContainEqual({
      confirm_password: registrateUser.passwordConfirm,
      email: registrateUser.email,
      password: registrateUser.password,
      username: registrateUser.userName,
    });

    pwExpect(page).toHaveURL(authPage.url);
  });

  // user name or email
  test("shows an error after register click with existing credentials", async ({page}) => {
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

    pwExpect(req.url()).toContain("/api/user");
    pwExpect(req.method()).toBe("POST");

    pwExpect(reqBodyData).toContainEqual({
      confirm_password: registrateUser.passwordConfirm,
      email: registrateUser.email,
      password: registrateUser.password,
      username: registrateUser.userName,
    });

    pwExpect(registrationPage.errorMassageDublicate).toBeVisible;
    pwExpect(registrationPage.errorMassageDublicate).toContainText(
      "Username or email already taken",
    );
    pwExpect(page).toHaveURL(registrationPage.url);
  });
});
