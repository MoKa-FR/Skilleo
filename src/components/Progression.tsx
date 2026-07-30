/**
 * `Progression` — 05-composants.md §10. Une propriété, pas une
 * destination (`00-produit.md` §2.1). Chiffres tabulaires : la largeur ne
 * bouge pas à l'incrément. Non interactif, aucune décoration.
 */
export function Progression({ rang, total }: { rang: number; total: number }) {
  return (
    <p
      className="tabular text-[length:var(--type-micro-size)] leading-[var(--type-micro-lh)] tracking-[var(--type-micro-track)]"
      style={{ color: "var(--text-secondary)" }}
    >
      Question {rang} sur {total}
    </p>
  );
}
