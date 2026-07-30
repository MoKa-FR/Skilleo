import { describe, it, expect, beforeEach } from "vitest";
import { appendReponse, curseur, readState, setTheme, STORAGE_KEY } from "./storage";

beforeEach(() => {
  window.localStorage.clear();
});

describe("D-31 : journal en ajout seul, versionné", () => {
  it("commence vide", () => {
    expect(readState().reponses).toEqual([]);
  });

  it("ajoute une entrée par réponse validée", () => {
    appendReponse({
      questionId: "q-1",
      optionId: "a",
      correct: true,
      hintUsed: false,
      timestamp: "2026-07-30T00:00:00.000Z",
    });
    expect(readState().reponses).toHaveLength(1);
    expect(readState().reponses[0].questionId).toBe("q-1");
  });

  it("un journal de version inconnue est ignoré, pas réparé", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ schemaVersion: 999, reponses: [{ bogus: true }] })
    );
    expect(readState().reponses).toEqual([]);
  });

  it("une valeur illisible produit un état vide plutôt qu'une erreur", () => {
    window.localStorage.setItem(STORAGE_KEY, "{ceci n'est pas du json");
    expect(readState().reponses).toEqual([]);
  });
});

describe("D-32 : séquence fixe, le curseur est la première question sans entrée", () => {
  const sequence = ["q-1", "q-2", "q-3"];

  it("pointe sur la première question si rien n'a été répondu", () => {
    expect(curseur(sequence)).toBe(0);
  });

  it("avance au rang de la première question sans entrée", () => {
    appendReponse({
      questionId: "q-1",
      optionId: "a",
      correct: true,
      hintUsed: false,
      timestamp: "t",
    });
    expect(curseur(sequence)).toBe(1);
  });

  it("vaut la longueur du parcours une fois toutes les questions répondues", () => {
    for (const questionId of sequence) {
      appendReponse({ questionId, optionId: "a", correct: true, hintUsed: false, timestamp: "t" });
    }
    expect(curseur(sequence)).toBe(sequence.length);
  });
});

describe("D-35 : le thème persiste comme entrée distincte du journal", () => {
  it("ne modifie pas les réponses déjà écrites", () => {
    appendReponse({
      questionId: "q-1",
      optionId: "a",
      correct: true,
      hintUsed: false,
      timestamp: "t",
    });
    setTheme("dark");
    const state = readState();
    expect(state.theme).toBe("dark");
    expect(state.reponses).toHaveLength(1);
  });
});
