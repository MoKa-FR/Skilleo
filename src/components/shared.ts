/**
 * Fragments Tailwind partagés entre composants du catalogue — évite de
 * retaper la même combinaison de tokens à chaque composant interactif.
 * Aucune valeur littérale : chaque fragment ne référence que des tokens de
 * src/app/globals.css (D-27).
 */

/** Anneau de focus (`02-interactions.md` §2.2) : seulement au clavier, jamais au clic. */
export const FOCUS_RING =
  "outline-none focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-[color:var(--focus-ring-color)] focus-visible:outline-offset-[length:var(--focus-ring-offset)]";

/** Transition unique du produit (D-34) — jamais une seconde durée. */
export const MOTION = "transition-[color,box-shadow,background-color] duration-[var(--motion-duration)] ease-[var(--motion-easing)]";
