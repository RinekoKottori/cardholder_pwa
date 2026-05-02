import { Page } from "@playwright/test";

type PublicSetting = {
  key: string;
  value: boolean | string | number | null;
};

type MockPublicRequestsOptions = {
  settings?: PublicSetting[];
  version?: { image_version: string | null };
};

const defaultSettings: PublicSetting[] = [
  { key: "ALLOW_REGISTRATION", value: true },
  { key: "SMTP_DISABLED", value: false },
];

const defaultVersion = { image_version: null };

export const mockPublicRequests = async (
  page: Page,
  options: MockPublicRequestsOptions = {},
) => {
  const settings = options.settings ?? defaultSettings;
  const version = options.version ?? defaultVersion;

  await page.route("**/api/public/settings*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(settings),
    });
  });

  await page.route("**/api/public/version*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(version),
    });
  });
};




