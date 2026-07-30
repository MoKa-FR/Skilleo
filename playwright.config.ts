import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  webServer: {
    // Fixtures de dev, jamais du vrai contenu (voir src/lib/content/__fixtures__).
    command: "npx next dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    env: { SKILLEO_CONTENT_DIR: "src/lib/content/__fixtures__/valide" },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
