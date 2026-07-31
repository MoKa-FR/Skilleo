"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Enonce } from "@/components/Enonce";
import { GroupeOptions, type ReponseState } from "@/components/GroupeOptions";
import { Bouton } from "@/components/Bouton";
import { TexteDeuxTons } from "@/components/TexteDeuxTons";
import { Motif } from "@/components/Motif";
import { PanneauPassif } from "@/components/PanneauPassif";
import { Progression } from "@/components/Progression";
import { appendReponse, reponsePour } from "@/lib/state/storage";
import type { Question } from "@/lib/content/schema";

export function EcranQuestion({
  question,
  rang,
  total,
  suivanteId,
}: {
  question: Question;
  rang: number;
  total: number;
  suivanteId: string | null;
}) {
  const router = useRouter();

  const [focusTargetId, setFocusTargetId] = useState(question.options[0].id);
  const [selectionId, setSelectionId] = useState<string | null>(null);
  const [reponse, setReponse] = useState<ReponseState | null>(null);
  const [indiceRevele, setIndiceRevele] = useState(false);
  const [seuilAtteint, setSeuilAtteint] = useState(false);
  const [erreurSansSelection, setErreurSansSelection] = useState(false);

  const primaireRef = useRef<HTMLButtonElement>(null);
  const panneauRef = useRef<HTMLDivElement>(null);

  // Re-visite (retour navigateur, D-32) : l'état D se restaure depuis le
  // journal localStorage, indisponible en SSR — nécessairement en effet.
  useEffect(() => {
    const existante = reponsePour(question.id);
    if (existante) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReponse({ optionId: existante.optionId, correcte: existante.correct });
      setSelectionId(existante.optionId);
      primaireRef.current?.focus();
    } else {
      const cible = document.getElementById(`option-${question.options[0].id}`);
      (cible as HTMLButtonElement | null)?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  // D-50 : le motif paraît au seuil de latence, avant toute réponse. Annulé
  // si la question change ou si l'utilisateur répond entre-temps.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSeuilAtteint(false);
    setIndiceRevele(false);
    const minuteur = window.setTimeout(() => {
      setSeuilAtteint(true);
    }, Number.parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--motif-delay") || "10000",
      10
    ));
    return () => window.clearTimeout(minuteur);
  }, [question.id]);

  function valider() {
    if (selectionId === null) return;
    const bonneOptionId = question.options.find((o) => o.juste)?.id;
    const correcte = selectionId === bonneOptionId;
    setReponse({ optionId: selectionId, correcte });
    appendReponse({
      questionId: question.id,
      optionId: selectionId,
      correct: correcte,
      hintUsed: indiceRevele,
      timestamp: new Date().toISOString(),
    });
    // Le bouton primaire est un nœud DOM stable (seuls son libellé et son
    // geste changent) : le focus se pose immédiatement, sans attendre un
    // repaint (06-ecrans.md état D — "le focus passe à l'action primaire").
    primaireRef.current?.focus();
  }

  function suivant() {
    router.push(suivanteId ? `/q/${suivanteId}` : "/fin");
  }

  // D-49 : un seul contenu passif, déterminé par le moment de la boucle —
  // jamais un choix de l'utilisateur, jamais deux à la fois.
  const contenuPassif: "indice" | "retour" | null = reponse
    ? "retour"
    : indiceRevele
      ? "indice"
      : null;

  return (
    <div
      className="mx-auto flex w-full flex-1 flex-col"
      style={{ maxWidth: "var(--frame-max-width)" }}
    >
      <div
        className="grid flex-1 grid-cols-1 gap-y-[var(--space-8)] px-[var(--gutter)] py-[var(--space-8)] lg:gap-y-0"
        style={{ gridTemplateColumns: "var(--col-decision) var(--col-gap) var(--col-passive)" }}
      >
        {/* Colonne décisionnelle (D-09, D-10), centrée verticalement à
            hauteur constante (D-46) : G3 l'exige, donc rien ici ne varie de
            hauteur d'un état à l'autre. */}
        <div className="flex flex-col justify-center gap-[var(--space-6)] lg:col-start-1">
          <p
            className="text-[length:var(--type-micro-size)] leading-[var(--type-micro-lh)] tracking-[var(--type-micro-track)]"
            style={{ color: "var(--text-secondary)" }}
          >
            Question {rang + 1} sur {total}
          </p>
          <Enonce>{question.enonce}</Enonce>
          <GroupeOptions
            options={question.options.map((o) => ({ id: o.id, texte: o.texte }))}
            focusTargetId={focusTargetId}
            onFocusTargetChange={setFocusTargetId}
            selectionId={selectionId}
            onSelectionChange={(id) => {
              setSelectionId(id);
              setErreurSansSelection(false);
            }}
            onValider={valider}
            onEntreeSansSelection={() => setErreurSansSelection(true)}
            reponse={reponse}
          />
          {/* Emplacement à hauteur réservée (D-46) : présent et vide tant que
              rien ne s'affiche, pour que son apparition ne décale pas
              l'énoncé (G3). */}
          <p
            role={erreurSansSelection ? "alert" : undefined}
            style={{
              color: "var(--text-secondary)",
              visibility: erreurSansSelection ? "visible" : "hidden",
            }}
          >
            Choisis une option avant de valider.
          </p>
          <div>
            <Bouton
              ref={primaireRef}
              variante="primaire"
              onActivate={() => {
                if (reponse) suivant();
                else if (selectionId === null) setErreurSansSelection(true);
                else valider();
              }}
            >
              {reponse ? "Question suivante" : "Valider"}
            </Bouton>
          </div>
        </div>

        {/* Colonne de gouttière — aucun contenu (D-09) */}
        <div aria-hidden="true" className="hidden lg:block" />

        {/* Colonne passive (D-09, D-23) — vide au repos (D-50 révoque G4) */}
        <div className="flex flex-col gap-[var(--space-6)] lg:col-start-3">
          <PanneauPassif ref={panneauRef} live={contenuPassif === "retour"}>
            {contenuPassif === null && seuilAtteint ? (
              <Motif onReveal={() => setIndiceRevele(true)} />
            ) : null}
            {contenuPassif === "indice" ? (
              <TexteDeuxTons amorce={question.indice.amorce} suite={question.indice.suite} />
            ) : null}
            {contenuPassif === "retour" && reponse ? (
              <TexteDeuxTons amorce={question.retour.amorce} suite={question.retour.suite} />
            ) : null}
          </PanneauPassif>

          <Progression rang={rang + 1} total={total} />
        </div>
      </div>
    </div>
  );
}
