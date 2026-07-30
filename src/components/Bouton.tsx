import { forwardRef, type ReactNode } from "react";
import { useEnterKeyup } from "@/lib/interaction/useEnterKeyup";
import { FOCUS_RING, MOTION } from "./shared";

type Variante = "primaire" | "secondaire" | "discret";

const VARIANTE_CLASSES: Record<Variante, string> = {
  // D-39 : le remplissage fait un pas vers le fond de page — pas le patron
  // tertiaire → primaire, une surface pleine n'a pas de ton à promouvoir.
  primaire:
    "px-[var(--space-6)] bg-[color:var(--text-primary)] text-[color:var(--canvas)] hover:bg-[color:var(--fill-primary-hover)]",
  // Contour en box-shadow inset (D-39), jamais une propriété border.
  secondaire:
    "px-[var(--space-6)] bg-transparent text-[color:var(--text-primary)] shadow-[inset_0_0_0_var(--border-width)_var(--border-subtle)] hover:shadow-[inset_0_0_0_var(--border-width-strong)_var(--text-primary)] focus-visible:shadow-[inset_0_0_0_var(--border-width-strong)_var(--text-primary)]",
  discret:
    "px-0 bg-transparent text-[color:var(--text-tertiary)] hover:text-[color:var(--text-primary)]",
};

/**
 * `Bouton` — 05-composants.md §5. Un seul primaire par écran (Loi 1). Le
 * libellé nomme un résultat, jamais un mécanisme. La garde `keyup` de D-17
 * s'applique uniformément (Loi 6) : une touche `Entrée` maintenue ne peut
 * jamais déclencher deux activations.
 */
export const Bouton = forwardRef<
  HTMLButtonElement,
  {
    variante: Variante;
    onActivate: () => void;
    children: ReactNode;
    icone?: ReactNode;
    type?: "button" | "submit";
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>(function Bouton({ variante, onActivate, children, icone, type = "button", ...rest }, ref) {
  const enterGuard = useEnterKeyup(onActivate);
  const { className: extraClassName, ...restProps } = rest;

  return (
    <button
      ref={ref}
      type={type}
      onClick={onActivate}
      {...enterGuard}
      className={`inline-flex items-center justify-center gap-[var(--space-2)] h-[var(--h-control)] rounded-[var(--radius)] shadow-[var(--shadow-none)] text-[length:var(--type-body-size)] leading-[var(--type-body-lh)] ${VARIANTE_CLASSES[variante]} ${MOTION} ${FOCUS_RING} ${extraClassName ?? ""}`}
      style={{ fontWeight: "var(--weight-regular)" }}
      {...restProps}
    >
      <span>{children}</span>
      {icone ? <span aria-hidden="true">{icone}</span> : null}
    </button>
  );
});
