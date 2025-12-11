import "../vitest.front.setup";
import { describe, beforeEach, it } from "vitest";
import { expect } from "@playwright/test";
import { RegistrationrPage } from "./registration.page";

describe("Registration page ", () => {
  let registrationPage: RegistrationrPage;

  beforeEach(async () => {
    registrationPage = new RegistrationrPage(page);

    await registrationPage.open();
  });

  it("title is correct", async () => {
    expect(registrationPage.title).toContainText("Новый пользователь");
  });

  it("email input is visible", async () => {
     expect(registrationPage.emailInput).toBeVisible;
  });

  it("name input is visible", async () => {
     expect(registrationPage.userNameInput).toBeVisible;
  });

  it("password input is visible", async () => {
     expect(registrationPage.passwordInput).toBeVisible;
  });

    it("confirm password input is visible", async () => {
     expect(registrationPage.confirmPasswordInput).toBeVisible;
  });


  it("registration button is visible", async () => {
     expect(registrationPage.registerButton).toBeVisible;
  });

  it("already have an account button is visible", async () => {
     expect(registrationPage.existAccountLink).toBeVisible;
  });
});
