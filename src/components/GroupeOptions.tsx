import { useRef } from "react";
import { Option } from "./Option";
import { useEnterKeyup } from "@/lib/interaction/useEnterKeyup";

export interface OptionDonnee {
  id: string;
  texte: string;
}

export interface ReponseState {
  optionId: string;
  correcte: boolean;
}

/**
 * `GroupeOptions` — 05-composants.md §4.1 (D-14, D-29). Une seule étape de
 * tabulation, `tabindex` glissant.
 *
 * `focusTargetId` porte le `tabindex` glissant (toujours une option, dès le
 * montage, pour que le groupe soit atteignable). `selectionId` porte
 * `aria-checked` et ne devient non nul qu'une fois qu'une flèche a bougé ou
 * qu'un clic a eu lieu — 06-ecrans.md état A : rien n'est sélectionné tant
 * que l'utilisateur n'a rien fait, et l'action primaire employée dans cet
 * état produit un retour local (`onEntreeSansSelection`), pas une
 * validation silencieuse d'un premier choix qu'il n'a pas fait.
 */
export function GroupeOptions({
  options,
  focusTargetId,
  onFocusTargetChange,
  selectionId,
  onSelectionChange,
  onValider,
  onEntreeSansSelection,
  reponse,
}: {
  options: OptionDonnee[];
  focusTargetId: string;
  onFocusTargetChange: (id: string) => void;
  selectionId: string | null;
  onSelectionChange: (id: string) => void;
  onValider: () => void;
  onEntreeSansSelection: () => void;
  reponse: ReponseState | null;
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const repondu = reponse !== null;

  function move(delta: number) {
    const idx = options.findIndex((o) => o.id === focusTargetId);
    const nextIndex = (idx + delta + options.length) % options.length;
    const next = options[nextIndex];
    onFocusTargetChange(next.id);
    onSelectionChange(next.id);
    refs.current[next.id]?.focus();
  }

  const enterGuard = useEnterKeyup(() => {
    if (repondu) return;
    if (selectionId === null) onEntreeSansSelection();
    else onValider();
  });

  return (
    <div
      role="radiogroup"
      aria-label="Options de réponse"
      className="flex flex-col gap-[var(--space-3)]"
      onKeyDown={(event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          event.preventDefault();
          if (!repondu) move(1);
        } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          event.preventDefault();
          if (!repondu) move(-1);
        } else {
          enterGuard.onKeyDown(event);
        }
      }}
      onKeyUp={enterGuard.onKeyUp}
    >
      {options.map((option) => (
        <Option
          key={option.id}
          id={`option-${option.id}`}
          ref={(el) => {
            refs.current[option.id] = el;
          }}
          texte={option.texte}
          highlighted={option.id === selectionId}
          repondu={repondu}
          retenue={repondu && reponse.optionId === option.id}
          correcte={repondu && reponse.optionId === option.id ? reponse.correcte : false}
          tabIndex={option.id === focusTargetId ? 0 : -1}
          onSelect={() => {
            onFocusTargetChange(option.id);
            onSelectionChange(option.id);
          }}
        />
      ))}
    </div>
  );
}
