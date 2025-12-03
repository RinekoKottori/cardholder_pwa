import "../vitest.setup";
import { describe, beforeEach, it } from "vitest";
import { AuthPage } from "./auth.page";
import { expect as pwExpect } from "@playwright/test";

describe("Auth page ", () => {
  let authPage: AuthPage;

  beforeEach(() => {
    authPage = new AuthPage(page);
  });

  it("should open", async () => {
    await authPage.open();
    
    pwExpect(page).toHaveURL(authPage.url);
  });
});
