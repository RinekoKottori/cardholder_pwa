import { beforeEach, afterEach } from "vitest";
import { chromium, Browser, Page } from "@playwright/test";

let browser: Browser;
let page: Page;

beforeEach(async () => {
  browser = await chromium.launch();
  const context = await browser.newContext();
  page = await context.newPage();

  // делаем глобально доступным
  globalThis.page = page;
});

afterEach(async () => {
  await browser.close();
});
