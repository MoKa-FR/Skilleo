/**
 * `Motif` — 05-composants.md §7 (D-50, D-51). Remplace `Declencheur`,
 * révoqué. Non interactif : pas de bouton, pas de libellé, pas de focus.
 * Paraît au seuil de latence, centré dans la colonne passive ; le survol
 * révèle le contenu du moment (D-49). Noir et blanc seuls, jamais plus grand
 * que `--type-question`.
 */
export function Motif({ onReveal }: { onReveal: () => void }) {
  return (
    <div
      aria-hidden="true"
      onMouseEnter={onReveal}
      className="flex items-center justify-center gap-[var(--space-2)]"
      style={{ height: "var(--motif-size)" }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="motif-point"
          style={{
            width: "var(--space-2)",
            height: "var(--space-2)",
            borderRadius: "var(--radius-full)",
            backgroundColor: "var(--text-primary)",
          }}
        />
      ))}
    </div>
  );
}
