import { Page } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env.test") });

export abstract class BasePage {
  protected readonly page: Page;
  abstract readonly path: string;

  protected readonly baseUrl =
    process.env.BASE_URL && process.env.BASE_URL !== "/"
      ? process.env.BASE_URL
      : "http://localhost:4207";

  constructor(page: Page) {
    this.page = page;
  }

  get url() {
    return new URL(this.path, this.baseUrl).toString();
  }

  async open() {
    await this.page.goto(this.url);
  }
}
