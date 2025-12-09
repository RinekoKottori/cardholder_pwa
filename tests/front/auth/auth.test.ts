import "../vitest.front,setup";
import { describe, beforeEach, it, expect } from "vitest";
import { AuthPage } from "./auth.page";
import { expect as pwExpect } from "@playwright/test";
import { CardsPage } from "../cards/cards.page";


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

  it("should login", async () => {
    const cardsPage = new CardsPage(page);

    await page.route("**/api/token*", (route) => {
      route.fulfill({
        status: 200,
      });
    });

    await authPage.login("Frodo", "Beggins");

    pwExpect(page).toHaveURL(cardsPage.url);
  });

  it("if user is not registered and try to login should be printed the error", async () => {
    const requestPromise = page.waitForRequest("**/api/token*");

    await authPage.login("Frodo", "Beggins");

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
});
