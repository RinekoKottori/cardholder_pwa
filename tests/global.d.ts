import "@playwright/test";

declare global {
  var page: import("@playwright/test").Page;
}

export {};
