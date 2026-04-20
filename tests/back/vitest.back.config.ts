import { defineConfig } from "vitest/config";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env.test") });

export default defineConfig({
  root: __dirname,

  test: {
    include: ["**/*.test.ts"],

    globals: true,

    setupFiles: ["vitest.setup.ts"],

    reporters: ["default", "allure-vitest"],
  },

  resolve: {
    alias: {
      "@shared-back": path.resolve(__dirname, "_shared"),
    },
  },
});
