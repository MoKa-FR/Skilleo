import { forwardRef, type ReactNode } from "react";

/**
 * `PanneauPassif` — 05-composants.md §8. Le conteneur de la colonne
 * passive (D-09, D-23). Pas modal, aucun voile, aucune ombre, un seul
 * contenu à la fois — l'orchestration (quel contenu, la pile d'`Échap`, le
 * retour de focus au déclencheur) vit dans l'écran qui l'utilise, pas ici.
 *
 * `live` : réservé au retour après réponse (D-15) — une région live polie
 * qui n'interrompt pas une lecture en cours. L'indice et la notion ne
 * l'emploient pas, ce sont des ouvertures délibérées, pas des annonces.
 */
export const PanneauPassif = forwardRef<HTMLDivElement, { children: ReactNode; live?: boolean }>(
  function PanneauPassif({ children, live = false }, ref) {
    return (
      <div
        ref={ref}
        role="region"
        aria-live={live ? "polite" : undefined}
        tabIndex={-1}
        className="outline-none"
      >
        {children}
      </div>
    );
  }
);
