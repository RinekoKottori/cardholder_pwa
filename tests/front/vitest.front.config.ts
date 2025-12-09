import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env.test") });

export default defineConfig({
  root: __dirname,
  test: {
    environment: "browser",
    include: ["tests/front/**/*.test.ts"],
    setupFiles: [path.resolve(__dirname, "vitest.setup.ts")],
    browser: {
      provider: playwright({
        launchOptions: {
          headless: process.env.HEADLESS !== "false",
        },
      }),
      instances: [
        {
          browser: "chromium",
        },
      ],
    },
    globals: true,
    reporters: ["default", "junit"],
  },
  resolve: {
    alias: {
      "@shared-front": path.resolve(__dirname, "_shared"),
    },
  },
});
