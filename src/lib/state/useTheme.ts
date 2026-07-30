"use client";

import { useEffect, useState } from "react";
import { setTheme as persistTheme, type Theme } from "./storage";

/**
 * D-35 : la bascule change le thème immédiatement et le fait persister.
 * L'attribut `data-theme` est déjà posé avant l'hydratation par le script
 * de `theme-script.ts` — ce hook se contente de le lire puis de le tenir à
 * jour.
 */
export function useTheme(): [Theme, (t: Theme) => void] {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    // Lecture d'un attribut posé côté client avant l'hydratation (script de
    // theme-script.ts) : indisponible en SSR, donc nécessairement en effet.
    const current = document.documentElement.getAttribute("data-theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (current === "dark" || current === "light") setThemeState(current);
  }, []);

  function changer(next: Theme) {
    document.documentElement.setAttribute("data-theme", next);
    setThemeState(next);
    persistTheme(next);
  }

  return [theme, changer];
}
