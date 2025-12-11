import { beforeEach, afterEach, beforeAll, afterAll } from "vitest";
import { chromium, Browser } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import waitOn from "wait-on";

dotenv.config({ path: path.resolve(__dirname, "../.env.test") });
const base_url = process.env.URL;

export default async () => {
  await waitOn({
    resources: [base_url as any],
    timeout: 60000,
    interval: 500,
  });
};

let browser: Browser;

beforeAll(() => {});

beforeEach(async () => {
  browser = await chromium.launch({
    headless: process.env.HEADLESS !== "false", // 👈 если HEADLESS=false -> headful
    slowMo: process.env.HEADLESS === "false" ? 500 : 0, // медленно только в headful режиме
  });
  const context = await browser.newContext();
  globalThis.page = await context.newPage();
});

afterEach(async () => {
  await browser.close();
});

afterAll(() => {
  console.log("All tests finished");
});
