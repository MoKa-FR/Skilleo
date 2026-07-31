"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/lib/state/useTheme";

function usePrefersReducedMotion(): boolean {
  // Défaut au rendu serveur : mouvement autorisé. Corrigé côté client dans
  // l'effet, même divergence SSR/client assumée que dans useTheme.ts.
  const [reduit, setReduit] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduit(mq.matches);
    const onChange = () => setReduit(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduit;
}

/**
 * `Motif` — 05-composants.md §7 (D-50, D-51). Remplace `Declencheur`,
 * révoqué. Non interactif : pas de bouton, pas de libellé, pas de focus.
 * Paraît au seuil de latence, centré dans la colonne passive ; le survol
 * révèle le contenu du moment (D-49). Noir et blanc seuls, jamais plus grand
 * que `--type-question`.
 *
 * Intrant fourni : public/motif/skilleo-motif-{clair,sombre}.gif, un par
 * thème (D-24). Sous `prefers-reduced-motion`, un repli statique remplace le
 * GIF — un GIF ne peut pas être mis en pause par CSS, alors que `D-51`
 * exige que « le motif reste, l'animation tombe ».
 */
export function Motif({ onReveal }: { onReveal: () => void }) {
  const [theme] = useTheme();
  const reduit = usePrefersReducedMotion();

  return (
    <div
      aria-hidden="true"
      onMouseEnter={onReveal}
      className="flex items-center justify-center"
      style={{ height: "var(--motif-size)" }}
    >
      {reduit ? (
        <div className="flex items-center gap-[var(--space-2)]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: "var(--space-2)",
                height: "var(--space-2)",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--text-primary)",
              }}
            />
          ))}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- GIF animé, `next/image` ne préserve pas l'animation
        <img
          src={theme === "dark" ? "/motif/skilleo-motif-sombre.gif" : "/motif/skilleo-motif-clair.gif"}
          alt=""
          style={{ height: "var(--motif-size)", width: "auto" }}
        />
      )}
    </div>
  );
}
