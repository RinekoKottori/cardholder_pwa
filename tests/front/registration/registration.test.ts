import "../vitest.front.setup";
import { describe, beforeEach, it } from "vitest";
import { expect as pwExpect } from "@playwright/test";
import { RegistrationrPage } from "./registration.page";
import { registrateUser } from "../_shared/credits";
import { responseRegisterOwner } from "../_shared/mock_responses";
import { AuthPage } from "../auth/auth.page";

describe("Registration page ", () => {
  let registrationPage: RegistrationrPage;

  beforeEach(async () => {
    registrationPage = new RegistrationrPage(page);

    await registrationPage.open();
  });

  it("title is correct", async () => {
    pwExpect(registrationPage.title).toContainText("Новый пользователь");
  });

  it("email input is visible", async () => {
    pwExpect(registrationPage.emailInput).toBeVisible;
  });

  it("name input is visible", async () => {
    pwExpect(registrationPage.userNameInput).toBeVisible;
  });

  it("password input is visible", async () => {
    pwExpect(registrationPage.passwordInput).toBeVisible;
  });

  it("confirm password input is visible", async () => {
    pwExpect(registrationPage.confirmPasswordInput).toBeVisible;
  });

  it("registration button is visible", async () => {
    pwExpect(registrationPage.registerButton).toBeVisible;
  });

  it("already have an account button is visible", async () => {
    pwExpect(registrationPage.existAccountLink).toBeVisible;
  });

  it("click on registrate button with valid credentials should registrate a user", async () => {
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

  /* TODO: Есть ли какое-то поведение на фронте на уже зарегистрированного пользователя? Если да, то какие данные должны быть уникальными? 
  Дописать положительно-негативные тесты в соответствии с ответом  Username or email  - uniq - 400 Bad Request
  */
});
