/**
 * Stockage navigateur de la progression V0 (D-22) et du thème (D-35).
 *
 * Un seul objet, sous une seule clé — "même mécanisme de stockage" pour les
 * deux (D-35), le thème étant une entrée distincte du journal (D-31), pas
 * mélangée aux réponses.
 *
 * Le journal des réponses est en ajout seul (D-31). Rien d'autre n'est
 * stocké : la question courante, le récapitulatif de fin et le compte de
 * réussites se calculent depuis ce journal (D-31, "tout le reste se
 * calcule").
 */

export const STORAGE_KEY = "skilleo:state";
export const SCHEMA_VERSION = 1 as const;

export type Theme = "light" | "dark";

export interface ReponseEntry {
  questionId: string;
  optionId: string;
  correct: boolean;
  hintUsed: boolean;
  timestamp: string;
}

export interface SkilleoState {
  schemaVersion: typeof SCHEMA_VERSION;
  reponses: ReponseEntry[];
  /** null = suit la préférence système (D-35) */
  theme: Theme | null;
}

function emptyState(): SkilleoState {
  return { schemaVersion: SCHEMA_VERSION, reponses: [], theme: null };
}

/**
 * D-31 : "un journal dont la version est inconnue ou supérieure à celle que
 * le code sait lire est ignoré, pas réparé". Toute forme inattendue produit
 * un état vide plutôt qu'une tentative de réparation.
 */
export function readState(): SkilleoState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      (parsed as { schemaVersion?: unknown }).schemaVersion === SCHEMA_VERSION &&
      Array.isArray((parsed as { reponses?: unknown }).reponses)
    ) {
      return parsed as SkilleoState;
    }
    return emptyState();
  } catch {
    return emptyState();
  }
}

function writeState(state: SkilleoState): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    // D-38 (06-ecrans.md §7.2) : stockage indisponible (navigation privée).
    // La session fonctionne, la reprise non — à signaler une fois, sobrement.
    return false;
  }
}

/** L'écriture du journal n'a lieu qu'à une réponse validée (D-31) — jamais à la sélection (D-29). */
export function appendReponse(entry: ReponseEntry): boolean {
  const state = readState();
  state.reponses.push(entry);
  return writeState(state);
}

/** 06-ecrans.md §5 : "Recommencer" vide le journal des réponses. Le thème n'est pas une donnée de session (D-35), il survit. */
export function reinitialiserReponses(): boolean {
  const state = readState();
  state.reponses = [];
  return writeState(state);
}

export function setTheme(theme: Theme): boolean {
  const state = readState();
  state.theme = theme;
  return writeState(state);
}

/**
 * D-32 : "l'avancement est un curseur : le rang de la première question du
 * parcours qui n'a pas d'entrée dans le journal." La séquence est fixe et
 * vient du parcours, pas du journal.
 */
export function curseur(questionIds: readonly string[]): number {
  const state = readState();
  const repondues = new Set(state.reponses.map((r) => r.questionId));
  const rang = questionIds.findIndex((id) => !repondues.has(id));
  return rang === -1 ? questionIds.length : rang;
}

export function reponsePour(questionId: string): ReponseEntry | undefined {
  const state = readState();
  return state.reponses.find((r) => r.questionId === questionId);
}
