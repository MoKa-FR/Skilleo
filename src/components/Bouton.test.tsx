import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Bouton } from "./Bouton";

describe("D-17 : une touche Entrée maintenue ne saute pas le retour", () => {
  it("une répétition de keydown pendant l'appui ne produit qu'une seule activation", async () => {
    const onActivate = vi.fn();
    const user = userEvent.setup();
    render(
      <Bouton variante="primaire" onActivate={onActivate}>
        Valider
      </Bouton>
    );
    screen.getByRole("button", { name: "Valider" }).focus();

    // {Enter>3/} : keydown répété trois fois (touche maintenue), puis un seul keyup.
    await user.keyboard("{Enter>3/}");

    expect(onActivate).toHaveBeenCalledTimes(1);
  });

  it("un appui normal (keydown puis keyup) active une seule fois", async () => {
    const onActivate = vi.fn();
    const user = userEvent.setup();
    render(
      <Bouton variante="primaire" onActivate={onActivate}>
        Question suivante
      </Bouton>
    );
    screen.getByRole("button", { name: "Question suivante" }).focus();

    await user.keyboard("{Enter}");

    expect(onActivate).toHaveBeenCalledTimes(1);
  });

  it("le clic active normalement", async () => {
    const onActivate = vi.fn();
    const user = userEvent.setup();
    render(
      <Bouton variante="primaire" onActivate={onActivate}>
        Valider
      </Bouton>
    );
    await user.click(screen.getByRole("button", { name: "Valider" }));
    expect(onActivate).toHaveBeenCalledTimes(1);
  });
});
