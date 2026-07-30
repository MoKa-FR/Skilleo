import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { GroupeOptions, type ReponseState } from "./GroupeOptions";

const OPTIONS = [
  { id: "a", texte: "Option A" },
  { id: "b", texte: "Option B" },
  { id: "c", texte: "Option C" },
];

function Harness({
  onValider,
  onEntreeSansSelection,
}: {
  onValider: () => void;
  onEntreeSansSelection: () => void;
}) {
  const [focusTargetId, setFocusTargetId] = useState("a");
  const [selectionId, setSelectionId] = useState<string | null>(null);
  const [reponse] = useState<ReponseState | null>(null);
  return (
    <GroupeOptions
      options={OPTIONS}
      focusTargetId={focusTargetId}
      onFocusTargetChange={setFocusTargetId}
      selectionId={selectionId}
      onSelectionChange={setSelectionId}
      onValider={onValider}
      onEntreeSansSelection={onEntreeSansSelection}
      reponse={reponse}
    />
  );
}

describe("06-ecrans.md état A : rien n'est sélectionné avant tout geste", () => {
  it("aucune option n'est aria-checked au repos, bien que la première porte le tabindex glissant", () => {
    render(<Harness onValider={vi.fn()} onEntreeSansSelection={vi.fn()} />);
    for (const label of ["Option A", "Option B", "Option C"]) {
      expect(screen.getByRole("radio", { name: label })).toHaveAttribute("aria-checked", "false");
    }
    expect(screen.getByRole("radio", { name: "Option A" })).toHaveAttribute("tabindex", "0");
  });

  it("Entrée sans sélection déclenche le retour local, pas la validation", async () => {
    const onValider = vi.fn();
    const onEntreeSansSelection = vi.fn();
    const user = userEvent.setup();
    render(<Harness onValider={onValider} onEntreeSansSelection={onEntreeSansSelection} />);

    screen.getByRole("radio", { name: "Option A" }).focus();
    await user.keyboard("{Enter}");

    expect(onValider).not.toHaveBeenCalled();
    expect(onEntreeSansSelection).toHaveBeenCalledTimes(1);
  });
});

describe("D-14 : les flèches déplacent la mise en évidence, elles ne valident jamais", () => {
  it("ArrowDown sélectionne l'option suivante sans appeler onValider", async () => {
    const onValider = vi.fn();
    const user = userEvent.setup();
    render(<Harness onValider={onValider} onEntreeSansSelection={vi.fn()} />);

    const a = screen.getByRole("radio", { name: "Option A" });
    const b = screen.getByRole("radio", { name: "Option B" });
    a.focus();

    await user.keyboard("{ArrowDown}");

    expect(b).toHaveAttribute("aria-checked", "true");
    expect(a).toHaveAttribute("aria-checked", "false");
    expect(onValider).not.toHaveBeenCalled();
  });

  it("ArrowDown en fin de liste boucle sur la première option", async () => {
    const user = userEvent.setup();
    render(<Harness onValider={vi.fn()} onEntreeSansSelection={vi.fn()} />);
    const a = screen.getByRole("radio", { name: "Option A" });
    a.focus();

    await user.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}");

    expect(a).toHaveAttribute("aria-checked", "true");
  });
});

describe("D-29 : le clic sélectionne, il ne répond pas", () => {
  it("cliquer une option la sélectionne sans valider", async () => {
    const onValider = vi.fn();
    const user = userEvent.setup();
    render(<Harness onValider={onValider} onEntreeSansSelection={vi.fn()} />);

    await user.click(screen.getByRole("radio", { name: "Option C" }));

    expect(screen.getByRole("radio", { name: "Option C" })).toHaveAttribute(
      "aria-checked",
      "true"
    );
    expect(onValider).not.toHaveBeenCalled();
  });
});

describe("Entrée avec une sélection valide (D-14 §5.1)", () => {
  it("appelle onValider une seule fois pour un appui normal", async () => {
    const onValider = vi.fn();
    const user = userEvent.setup();
    render(<Harness onValider={onValider} onEntreeSansSelection={vi.fn()} />);
    const a = screen.getByRole("radio", { name: "Option A" });
    a.focus();

    await user.keyboard("{ArrowDown}{Enter}");

    expect(onValider).toHaveBeenCalledTimes(1);
  });
});
