import { cache } from "react";
import { chargerContenu } from "./loader";

/**
 * Accès serveur au contenu, mémoïsé par requête (`react.cache`). Le
 * chemin de `content/` peut être remplacé par `SKILLEO_CONTENT_DIR` — utile
 * pour prévisualiser l'écran avec des fixtures de développement sans
 * jamais écrire de contenu réel dans `content/` (voir
 * `src/lib/content/__fixtures__`, qui ne sont pas du contenu Skilleo).
 */
export const getContenu = cache(() => {
  return chargerContenu(process.env.SKILLEO_CONTENT_DIR || undefined);
});

export interface QuestionDansParcours {
  parcoursId: string;
  rang: number; // 0-indexé
  total: number;
  precedenteId: string | null;
  suivanteId: string | null;
}

export function localiserQuestion(questionId: string): QuestionDansParcours | null {
  const { parcours } = getContenu();
  for (const [parcoursId, p] of parcours) {
    const idx = p.questions.indexOf(questionId);
    if (idx !== -1) {
      return {
        parcoursId,
        rang: idx,
        total: p.questions.length,
        precedenteId: idx > 0 ? p.questions[idx - 1] : null,
        suivanteId: idx < p.questions.length - 1 ? p.questions[idx + 1] : null,
      };
    }
  }
  return null;
}

/** Le seul parcours de la V0 (D-21) — premier trouvé, ordre de fichier. */
export function parcoursPrincipal() {
  const { parcours } = getContenu();
  const [premier] = parcours.values();
  return premier ?? null;
}
