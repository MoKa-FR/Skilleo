"use client";

import { Selecteur } from "@/components/Selecteur";
import { useTheme } from "@/lib/state/useTheme";

/**
 * Chrome permanent — 03-navigation.md §3. Identité et bascule de thème
 * seulement (D-35) : pas de menu, pas d'onglet, pas de pastille.
 */
export function Chrome() {
  const [theme, setTheme] = useTheme();

  return (
    <header className="flex items-center justify-between px-[var(--gutter)] py-[var(--space-4)]">
      <span
        className="text-[length:var(--type-label-size)] leading-[var(--type-label-lh)]"
        style={{ color: "var(--text-primary)", fontWeight: "var(--weight-bold)" }}
      >
        Skilleo
      </span>
      <Selecteur
        label="Thème"
        valeur={theme}
        onChange={setTheme}
        options={[
          { valeur: "light", label: "Clair" },
          { valeur: "dark", label: "Sombre" },
        ]}
      />
    </header>
  );
}
