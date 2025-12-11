import "../vitest.front.setup";
import { describe, beforeEach, it } from "vitest";
import { AuthPage } from "./auth.page";
import { expect as pwExpect } from "@playwright/test";
import { CardsPage } from "../cards/cards.page";
import { loginUser } from "../_shared/credits";
import { RegistrationrPage } from "../registration/registration.page";
import { RecoveryPage } from "../recovery/recovery.page";

describe("Auth page ", () => {
  let authPage: AuthPage;

  beforeEach(async () => {
    authPage = new AuthPage(page);

    await authPage.open();
  });

  it("should open", async () => {
    pwExpect(page).toHaveURL(authPage.url);
  });

  it("should have title", async () => {
    pwExpect(authPage.title).toHaveText("Добро пожаловать");
  });

  it("should have login button", async () => {
    pwExpect(authPage.loginButton).toBeVisible();
  });

  it("should have register button", async () => {
    pwExpect(authPage.registerLink).toBeVisible();
  });

  it("should have forgot password button", async () => {
    pwExpect(authPage.passwordRecoveryLink).toBeVisible();
  });

  it("click on login button with valid credentials should login", async () => {
    const cardsPage = new CardsPage(page);

    await page.route("**/api/token*", (route) => {
      route.fulfill({
        status: 200,
      });
    });

    await authPage.login(loginUser.username, loginUser.password);

    pwExpect(page).toHaveURL(cardsPage.url);
  });

  it("if user is not registered and try to login should be printed the error", async () => {
    const requestPromise = page.waitForRequest("**/api/token*");

    await authPage.login(loginUser.username, loginUser.password);

    const req = await requestPromise;


    const reqBodyData = req.postData();

    pwExpect(req.url()).toContain("/api/token");
    pwExpect(req.method()).toBe("POST");

    pwExpect(reqBodyData).toContain("grant_type");
    pwExpect(reqBodyData).toContain("username");
    pwExpect(reqBodyData).toContain("password");
    pwExpect(reqBodyData).toContain("Frodo");
    pwExpect(reqBodyData).toContain("Beggins");

    pwExpect(authPage.authError).toBeVisible;
  });

  it("click on new authorization button should redirect to new authorization page", async () => {
    const registerPage = new RegistrationrPage(page);

    await authPage.registerLink.click();

    pwExpect(page).toHaveURL(registerPage.url);
  });

  it("click on recovery button shold redirect to recovery page", async () => {
    const recoveryPage = new RecoveryPage(page);

    await authPage.passwordRecoveryLink.click();
    
    pwExpect(page).toHaveURL(recoveryPage.url);
  });
});
