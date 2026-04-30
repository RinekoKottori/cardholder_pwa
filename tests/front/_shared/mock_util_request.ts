import { Page } from "@playwright/test";

export const mockPublicRequests = async ({ page }: { page: Page }) => {
    await page.route("**/api/public/settings*", async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify([
                {
                    "key": "ALLOW_REGISTRATION",
                    "value": true
                },
                {
                    "key": "SMTP_DISABLED",
                    "value": false
                }
            ]),
        });
    });

    await page.route("**/api/public/version*", async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ "image_version": null }),
        });
    });
};




