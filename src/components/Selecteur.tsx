import { useRef } from "react";
import { FOCUS_RING, MOTION } from "./shared";

export interface SelecteurOption<T extends string> {
  valeur: T;
  label: string;
}

/**
 * `Selecteur` — 05-composants.md §9. Hors V0 pour la pratique elle-même,
 * mais la bascule de thème de D-35 en a besoin dès la V0 : implémenté tel
 * qu'écrit dans la spec, sans rien y ajouter. Changement immédiat, sans
 * étape de validation — à la différence de `GroupeOptions`, rien
 * d'irréversible n'est engagé.
 */
export function Selecteur<T extends string>({
  options,
  valeur,
  onChange,
  label,
}: {
  options: SelecteurOption<T>[];
  valeur: T;
  onChange: (v: T) => void;
  label: string;
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  function move(delta: number) {
    const idx = options.findIndex((o) => o.valeur === valeur);
    const next = options[(idx + delta + options.length) % options.length];
    onChange(next.valeur);
    refs.current[next.valeur]?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex items-center gap-[var(--space-3)]"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          move(1);
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          move(-1);
        }
      }}
    >
      {options.map((option) => {
        const retenu = option.valeur === valeur;
        return (
          <button
            key={option.valeur}
            ref={(el) => {
              refs.current[option.valeur] = el;
            }}
            type="button"
            role="radio"
            aria-checked={retenu}
            tabIndex={retenu ? 0 : -1}
            onClick={() => onChange(option.valeur)}
            className={`text-[length:var(--type-label-size)] leading-[var(--type-label-lh)] tracking-[var(--type-label-track)] ${FOCUS_RING} ${MOTION}`}
            style={{
              color: retenu ? "var(--text-primary)" : "var(--text-tertiary)",
              fontWeight: retenu ? "var(--weight-bold)" : "var(--weight-regular)",
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
