/**
 * 09-contenu.md §7bis (D-42) et §10.1 — cinq compteurs, tous à zéro.
 * Vérifiés à la construction (§8), pas seulement à la relecture humaine.
 */

const TIRETS = /[—–]/g; // — et –
const EMOJI =
  /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}]/gu;
const GUILLEMETS_COURBES = /[‘’“”]/g;
const GRAS = /\*\*[^*]+\*\*/g;
const LISTE_EN_TETE_GRAS = /^[-*]\s+\*\*[^*]+\*\*\s*:/gm;

export interface CompteursCharte {
  tirets: number;
  emojis: number;
  guillemetsCourbes: number;
  gras: number;
  listeEnTeteGras: number;
}

export function compterCharte(texte: string): CompteursCharte {
  return {
    tirets: texte.match(TIRETS)?.length ?? 0,
    emojis: texte.match(EMOJI)?.length ?? 0,
    guillemetsCourbes: texte.match(GUILLEMETS_COURBES)?.length ?? 0,
    gras: texte.match(GRAS)?.length ?? 0,
    listeEnTeteGras: texte.match(LISTE_EN_TETE_GRAS)?.length ?? 0,
  };
}

export function violationsCharte(compteurs: CompteursCharte): string[] {
  const violations: string[] = [];
  if (compteurs.tirets > 0) violations.push(`${compteurs.tirets} tiret(s) cadratin/demi-cadratin`);
  if (compteurs.emojis > 0) violations.push(`${compteurs.emojis} emoji(s)`);
  if (compteurs.guillemetsCourbes > 0)
    violations.push(`${compteurs.guillemetsCourbes} guillemet(s) courbe(s)`);
  if (compteurs.gras > 0) violations.push(`${compteurs.gras} occurrence(s) de gras`);
  if (compteurs.listeEnTeteGras > 0)
    violations.push(`${compteurs.listeEnTeteGras} liste(s) à en-tête gras`);
  return violations;
}
