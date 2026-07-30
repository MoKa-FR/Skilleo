import type { ElementType } from "react";

type Registre = "body" | "bodyLg" | "label";

const REGISTRE_CLASSES: Record<Registre, string> = {
  body: "text-[length:var(--type-body-size)] leading-[var(--type-body-lh)] tracking-[var(--type-body-track)]",
  bodyLg:
    "text-[length:var(--type-body-lg-size)] leading-[var(--type-body-lg-lh)] tracking-[var(--type-body-lg-track)]",
  label:
    "text-[length:var(--type-label-size)] leading-[var(--type-label-lh)] tracking-[var(--type-label-track)]",
};

/**
 * `TexteDeuxTons` — 05-composants.md §6 (D-11). Amorce en `--text-primary`,
 * suite en `--text-secondary` : même taille, même graisse, même interligne,
 * seule la couleur change. Une seule phrase pour un lecteur d'écran — pas
 * de découpage sémantique, pas d'`aria-label` séparé.
 */
export function TexteDeuxTons({
  amorce,
  suite,
  registre = "body",
  as: Tag = "p",
}: {
  amorce: string;
  suite: string;
  registre?: Registre;
  as?: ElementType;
}) {
  return (
    <Tag className={REGISTRE_CLASSES[registre]}>
      <span style={{ color: "var(--text-primary)" }}>{amorce} </span>
      <span style={{ color: "var(--text-secondary)" }}>{suite}</span>
    </Tag>
  );
}
