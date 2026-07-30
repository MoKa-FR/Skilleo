import { forwardRef } from "react";
import { FOCUS_RING, MOTION } from "./shared";

/**
 * `Declencheur` — 05-composants.md §7. La ligne discrète qui ouvre un
 * panneau (D-13). Le survol ne déclenche pas — il signale la disponibilité
 * (Loi 5). Toujours atteignable au clavier.
 */
export const Declencheur = forwardRef<
  HTMLButtonElement,
  {
    label: string;
    raccourci?: string;
    ouvert: boolean;
    onActivate: () => void;
  }
>(function Declencheur({ label, raccourci, ouvert, onActivate }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={ouvert}
      data-state={ouvert ? "ouvert" : "repos"}
      onClick={onActivate}
      className={`inline-flex items-center gap-[var(--space-2)] text-[length:var(--type-label-size)] leading-[var(--type-label-lh)] tracking-[var(--type-label-track)] text-[color:var(--text-tertiary)] hover:text-[color:var(--text-primary)] data-[state=ouvert]:text-[color:var(--text-primary)] ${MOTION} ${FOCUS_RING}`}
    >
      <span>{label}</span>
      {raccourci ? (
        <span className="text-[color:var(--text-tertiary)]" aria-hidden="true">
          {raccourci}
        </span>
      ) : null}
    </button>
  );
});
