/**
 * `Marqueur` — 05-composants.md §11. Le seul endroit du système où la
 * couleur apparaît (D-26, D-33). Jamais seul porteur d'information : le
 * symbole (coche / croix) et un libellé pour lecteur d'écran l'accompagnent
 * toujours. Jamais sur une surface — aucun fond, aucune bordure colorée.
 */
export function Marqueur({ correcte }: { correcte: boolean }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center w-[var(--space-4)] h-[var(--space-4)] rounded-[var(--radius-full)]"
      style={{ color: correcte ? "var(--marker-positive)" : "var(--marker-negative)" }}
    >
      <svg viewBox="0 0 16 16" fill="none" className="w-full h-full" aria-hidden="true">
        {correcte ? (
          <path
            d="M3 8.5L6.5 12L13 4.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M4 4l8 8M12 4l-8 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
      </svg>
      <span className="sr-only">{correcte ? "Réponse correcte" : "Réponse incorrecte"}</span>
    </span>
  );
}
