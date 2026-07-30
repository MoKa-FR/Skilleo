import { test, expect, type Page } from "@playwright/test";

function options(page: Page) {
  return page.getByRole("radiogroup", { name: "Options de réponse" }).getByRole("radio");
}

/**
 * D-22 : le parcours complet de la V0, au clavier uniquement, sans jamais
 * toucher la souris. Tourne contre les fixtures de développement
 * (SKILLEO_CONTENT_DIR, voir playwright.config.ts), pas du vrai contenu.
 */
test("D-14/D-17/D-15 : répondre à deux questions puis atteindre l'écran de fin, au clavier seul", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("démonstration");

  // Question 1 : flèche puis Entrée valide, puis Entrée avance.
  await page.keyboard.press("ArrowDown");
  await expect(options(page).and(page.locator('[aria-checked="true"]'))).toHaveText(
    "Seconde option"
  );
  await page.keyboard.press("Enter");
  await expect(page.getByText("La bonne réponse était la première option.")).toBeVisible();
  await page.keyboard.press("Enter");

  // Question 2.
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Seconde question");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.getByText("La bonne réponse était la seconde option.")).toBeVisible();
  await page.keyboard.press("Enter");

  // Fin de parcours.
  await expect(page.getByRole("heading", { name: "Parcours terminé" })).toBeVisible();
});

test("D-17 : une Entrée maintenue sur le bouton primaire ne saute pas le retour", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("démonstration");
  await page.keyboard.press("ArrowDown");
  await expect(options(page).and(page.locator('[aria-checked="true"]'))).toBeVisible();
  await page.keyboard.down("Enter");
  await page.waitForTimeout(50);
  await page.keyboard.up("Enter");

  // Le retour doit être visible : une touche maintenue n'a pas aussi fait avancer.
  await expect(page.getByText("La bonne réponse était la première option.")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("démonstration");
});
