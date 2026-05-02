import { expect as pwExpect, test, } from "@playwright/test";
import { RecoveryPage } from "./recovery.page";
import { mockPublicRequests } from "../../_shared/mock_util_request";
import { authorizedUser } from "../../_shared/credits";
import { AuthPage } from "../../auth/auth.page";
import { SubmitPage } from "../submit/submit.page";

test.describe("Recovery page ", () => {
    let recoveryPage: RecoveryPage;

    test.beforeEach(async ({ page }) => {
        recoveryPage = new RecoveryPage(page);

        await mockPublicRequests(page);

        await recoveryPage.open();
    });

    test("title is correct", async () => {
        await pwExpect(recoveryPage.title).toContainText("Password recovery");
    });

    test("reject button is visible", async () => {
        await pwExpect(recoveryPage.cancelButton).toBeVisible();
    });

    test("got code button is visible", async () => {
        await pwExpect(recoveryPage.gotCodeButton).toBeVisible();
    });

    test("email input is visible", async () => {
        await pwExpect(recoveryPage.emailInput).toBeVisible();
    });

    test("submit button is visible", async () => {
        await pwExpect(recoveryPage.submitButton).toBeVisible();
    });

    test("click on Cancel button shoud redirect to /auth page", async ({ page }) => {
        const authPage = new AuthPage(page);

        await recoveryPage.cancelButton.click();

        await pwExpect(page).toHaveURL(authPage.url);
    })

    test("click on got code button shoud redirect to /password-recovery/submit page", async ({page}) => {
        const submitPage = new SubmitPage(page);

        await recoveryPage.gotCodeButton.click();
        
        await pwExpect(page).toHaveURL(submitPage.url);
    })

    test("should send recovery code to email", async ({ page }) => {
        await page.route("**/api/recovery/code*", async (route) => {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
            });
        });

        const [req] = await Promise.all([
            page.waitForRequest(
                (request) =>
                    request.url().includes("/api/recovery/code") &&
                    request.method() === "POST",
            ),
            recoveryPage.recoverPassword(authorizedUser.email),
        ]);

        await pwExpect(req.postDataJSON()).toMatchObject({
            email: authorizedUser.email,
        });
    });

    test("should show popup when send recover mail is correct", async ({ page }) => {
        await page.route("**/api/recovery/code*", async (route) => {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
            });
        });

        await Promise.all([
            page.waitForRequest(
                (request) =>
                    request.url().includes("/api/recovery/code") &&
                    request.method() === "POST",
            ),
            recoveryPage.recoverPassword(authorizedUser.email),
        ]);

        await pwExpect(recoveryPage.recoveryInfoPopup).toBeInViewport;
    });
});
