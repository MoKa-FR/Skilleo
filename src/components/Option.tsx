import { forwardRef } from "react";
import { Marqueur } from "./Marqueur";
import { FOCUS_RING, MOTION } from "./shared";

/**
 * `Option` — 05-composants.md §4.2. Le contour est un `box-shadow: inset`,
 * jamais une `border` (D-39) : un épaississement au survol ou à la mise en
 * évidence ne déplace donc jamais le libellé (R5), par construction.
 */
export const Option = forwardRef<
  HTMLButtonElement,
  {
    id?: string;
    texte: string;
    highlighted: boolean;
    repondu: boolean;
    retenue: boolean;
    correcte: boolean;
    tabIndex: number;
    onSelect: () => void;
  }
>(function Option({ id, texte, highlighted, repondu, retenue, correcte, tabIndex, onSelect }, ref) {
  const contour = repondu
    ? retenue
      ? "shadow-[inset_0_0_0_var(--border-width-strong)_var(--text-primary)]"
      : "shadow-[inset_0_0_0_var(--border-width)_var(--border-subtle)]"
    : highlighted
      ? "shadow-[inset_0_0_0_var(--border-width-strong)_var(--text-primary)]"
      : "shadow-[inset_0_0_0_var(--border-width)_var(--border-subtle)] hover:shadow-[inset_0_0_0_var(--border-width)_var(--text-primary)]";

  const texteCouleur =
    repondu && !retenue ? "var(--text-tertiary)" : "var(--text-primary)";

  return (
    <button
      ref={ref}
      id={id}
      type="button"
      role="radio"
      aria-checked={highlighted}
      tabIndex={repondu ? -1 : tabIndex}
      onClick={repondu ? undefined : onSelect}
      className={`flex w-full items-center justify-between gap-[var(--space-3)] min-h-[var(--h-control)] px-[var(--space-4)] py-[var(--space-2)] rounded-[var(--radius)] text-left text-[length:var(--type-body-size)] leading-[var(--type-body-lh)] ${contour} ${repondu ? "" : MOTION} ${FOCUS_RING} ${repondu ? "cursor-default" : "cursor-pointer"}`}
      style={{ color: texteCouleur }}
    >
      <span>{texte}</span>
      {repondu && retenue ? <Marqueur correcte={correcte} /> : null}
    </button>
  );
});
