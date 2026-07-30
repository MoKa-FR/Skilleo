import { describe, it, expect } from "vitest";
import { compterCharte, violationsCharte } from "./charte";

describe("09-contenu.md §7bis / §10.1 : les cinq compteurs de la charte", () => {
  it("un texte conforme a les cinq compteurs à zéro", () => {
    const compteurs = compterCharte("Une phrase de démonstration, simple et sans tic d'écriture.");
    expect(violationsCharte(compteurs)).toEqual([]);
  });

  it("détecte un tiret cadratin", () => {
    expect(violationsCharte(compterCharte("Une phrase — avec un tiret cadratin."))).toEqual([
      "1 tiret(s) cadratin/demi-cadratin",
    ]);
  });

  it("détecte un emoji", () => {
    expect(violationsCharte(compterCharte("Attention ⚠️ à ceci."))).toContainEqual(
      expect.stringMatching(/emoji/)
    );
  });

  it("détecte le gras décoratif", () => {
    expect(violationsCharte(compterCharte("Ceci est **important** à retenir."))).toEqual([
      "1 occurrence(s) de gras",
    ]);
  });

  it("détecte une liste à en-tête gras", () => {
    const texte = "- **Titre** : le reste de la ligne";
    const violations = violationsCharte(compterCharte(texte));
    expect(violations).toContainEqual(expect.stringMatching(/en-tête gras/));
  });

  it("détecte les guillemets courbes", () => {
    expect(violationsCharte(compterCharte("Il a dit “bonjour” à tout le monde."))).toEqual([
      "2 guillemet(s) courbe(s)",
    ]);
  });
});
