/**
 * `Enonce` — 05-composants.md §3. L'information héro de l'écran. Un seul
 * par écran, ne se décale jamais (D-09). Non interactif, aucun état.
 */
export function Enonce({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className="text-[length:var(--type-question-size)] leading-[var(--type-question-lh)] tracking-[var(--type-question-track)]"
      style={{ color: "var(--text-primary)", fontWeight: "var(--weight-bold)" }}
    >
      {children}
    </h1>
  );
}
