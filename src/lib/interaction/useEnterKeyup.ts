import { useEffect, useRef, type KeyboardEvent } from "react";

/**
 * D-17 : la garde contre le double `Entrée`. Un `<button>` natif active son
 * `click` au `keydown` de `Entrée` — si la touche reste enfoncée, la
 * répétition du système d'exploitation envoie plusieurs `keydown` pendant
 * qu'un seul relâchement physique ne produit qu'un `keyup`. En liant
 * l'action au `keyup` plutôt qu'au `keydown` natif, une touche maintenue ne
 * peut jamais produire plus d'une activation.
 *
 * Pas de délai temporel (`D-17`) : la discipline keydown/keyup est
 * invisible à un rythme d'appui normal.
 */
export function useEnterKeyup(onActivate: () => void) {
  const handlerRef = useRef(onActivate);
  // Toujours la dernière fonction, sans la remettre en dépendance : la
  // mise à jour se fait en effet (après le rendu), jamais pendant.
  useEffect(() => {
    handlerRef.current = onActivate;
  });

  return {
    onKeyDown: (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        // Empêche l'activation native au keydown ; on n'agit qu'au keyup.
        event.preventDefault();
      }
    },
    onKeyUp: (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handlerRef.current();
      }
    },
  };
}
