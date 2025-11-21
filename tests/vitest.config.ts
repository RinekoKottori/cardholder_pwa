import { defineConfig } from "vitest/config";
import * as path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: "./vitest.setup.ts",
  },
  resolve: {
    alias: {
      "@fixtures": path.resolve(__dirname, "./fixtures"),
      "@helpers": path.resolve(__dirname, "./helpers"),
      "@pages": path.resolve(__dirname, "./pages"),
    },
  },
});
