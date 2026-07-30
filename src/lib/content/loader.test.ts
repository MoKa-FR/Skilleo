import { describe, it, expect } from "vitest";
import path from "node:path";
import { chargerContenu, ContentError } from "./loader";

const FIXTURES = path.join(__dirname, "__fixtures__");

describe("09-contenu.md §8 : validation à la construction", () => {
  it("charge un contenu valide sans erreur", () => {
    const contenu = chargerContenu(path.join(FIXTURES, "valide"));
    expect(contenu.questions.has("q-exemple")).toBe(true);
    expect(contenu.notions.has("n-exemple")).toBe(true);
    expect(contenu.sources.has("s-exemple")).toBe(true);
    expect(contenu.parcours.get("p-exemple")?.questions).toEqual(["q-exemple", "q-exemple-2"]);
  });

  it("extrait les ancres du module source", () => {
    const contenu = chargerContenu(path.join(FIXTURES, "valide"));
    expect(contenu.sources.get("s-exemple")?.ancres).toEqual(["premier", "second"]);
  });

  it("rejette une question à deux options justes (§4.2)", () => {
    expect(() => chargerContenu(path.join(FIXTURES, "invalide-options"))).toThrowError(
      /2 option\(s\) juste\(s\), attendu exactement 1/
    );
  });

  it("rejette une référence de notion ou de source introuvable (D-37, D-41)", () => {
    let erreur: unknown;
    try {
      chargerContenu(path.join(FIXTURES, "invalide-reference"));
    } catch (e) {
      erreur = e;
    }
    expect(erreur).toBeInstanceOf(ContentError);
    expect((erreur as ContentError).message).toMatch(/notion "n-inexistante" introuvable/);
    expect((erreur as ContentError).message).toMatch(/module source "s-inexistante" introuvable/);
  });

  it("une question orpheline (dans aucun parcours) est une erreur (§8)", () => {
    // Le fixture "invalide-reference" n'a pas de parcours du tout : sa
    // question est donc mécaniquement orpheline.
    expect(() => chargerContenu(path.join(FIXTURES, "invalide-reference"))).toThrowError(
      /orpheline, ne figure dans aucun parcours/
    );
  });
});
