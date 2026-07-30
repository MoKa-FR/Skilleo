"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Enonce } from "@/components/Enonce";
import { GroupeOptions, type ReponseState } from "@/components/GroupeOptions";
import { Bouton } from "@/components/Bouton";
import { TexteDeuxTons } from "@/components/TexteDeuxTons";
import { Declencheur } from "@/components/Declencheur";
import { PanneauPassif } from "@/components/PanneauPassif";
import { Progression } from "@/components/Progression";
import { appendReponse, reponsePour } from "@/lib/state/storage";
import type { Question } from "@/lib/content/schema";
import type { Notion } from "@/lib/content/schema";

type Panneau = "indice" | "notion";

export function EcranQuestion({
  question,
  notion,
  rang,
  total,
  suivanteId,
}: {
  question: Question;
  notion: Notion;
  rang: number;
  total: number;
  suivanteId: string | null;
}) {
  const router = useRouter();

  const [focusTargetId, setFocusTargetId] = useState(question.options[0].id);
  const [selectionId, setSelectionId] = useState<string | null>(null);
  const [reponse, setReponse] = useState<ReponseState | null>(null);
  const [panneauStack, setPanneauStack] = useState<Panneau[]>([]);
  const [indiceConsulte, setIndiceConsulte] = useState(false);
  const [erreurSansSelection, setErreurSansSelection] = useState(false);

  const primaireRef = useRef<HTMLButtonElement>(null);
  const indiceTriggerRef = useRef<HTMLButtonElement>(null);
  const notionTriggerRef = useRef<HTMLButtonElement>(null);
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

  useEffect(() => {
    if (panneauStack.length > 0) panneauRef.current?.focus();
  }, [panneauStack]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setPanneauStack((stack) => {
        if (stack.length === 0) return stack;
        const ferme = stack[stack.length - 1];
        const suite = stack.slice(0, -1);
        (ferme === "indice" ? indiceTriggerRef : notionTriggerRef).current?.focus();
        return suite;
      });
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function valider() {
    if (selectionId === null) return;
    const bonneOptionId = question.options.find((o) => o.juste)?.id;
    const correcte = selectionId === bonneOptionId;
    setReponse({ optionId: selectionId, correcte });
    setPanneauStack([]);
    appendReponse({
      questionId: question.id,
      optionId: selectionId,
      correct: correcte,
      hintUsed: indiceConsulte,
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

  function ouvrirPanneau(panneau: Panneau) {
    if (panneau === "indice") setIndiceConsulte(true);
    setPanneauStack((stack) =>
      stack[stack.length - 1] === panneau ? stack : [...stack, panneau]
    );
  }

  const zoneAffichee: Panneau | "retour" | null =
    panneauStack.length > 0 ? panneauStack[panneauStack.length - 1] : reponse ? "retour" : null;

  return (
    <div
      className="grid flex-1 grid-cols-1 gap-y-[var(--space-8)] px-[var(--gutter)] py-[var(--space-8)] lg:gap-y-0"
      style={{ gridTemplateColumns: "var(--col-decision) var(--col-gap) var(--col-passive)" }}
    >
      {/* Colonne décisionnelle (D-09, D-10) */}
      <div className="flex flex-col gap-[var(--space-6)] lg:col-start-1">
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
        {erreurSansSelection ? (
          <p role="alert" style={{ color: "var(--text-secondary)" }}>
            Choisis une option avant de valider.
          </p>
        ) : null}
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

      {/* Colonne passive (D-09, D-23) */}
      <div className="flex flex-col gap-[var(--space-6)] lg:col-start-3">
        <div className="flex flex-col gap-[var(--space-2)]">
          <Declencheur
            ref={indiceTriggerRef}
            label="Indice"
            raccourci="I"
            ouvert={panneauStack.includes("indice")}
            onActivate={() => ouvrirPanneau("indice")}
          />
          <Declencheur
            ref={notionTriggerRef}
            label="Voir la notion"
            ouvert={panneauStack.includes("notion")}
            onActivate={() => ouvrirPanneau("notion")}
          />
        </div>

        <PanneauPassif ref={panneauRef} live={zoneAffichee === "retour"}>
          {zoneAffichee === "indice" ? <p>{question.indice}</p> : null}
          {zoneAffichee === "notion" ? (
            <div className="flex flex-col gap-[var(--space-2)]">
              <p style={{ fontWeight: "var(--weight-bold)", color: "var(--text-primary)" }}>
                {notion.titre}
              </p>
              <p>{notion.corps}</p>
            </div>
          ) : null}
          {zoneAffichee === "retour" && reponse ? (
            <TexteDeuxTons amorce={question.retour.amorce} suite={question.retour.suite} />
          ) : null}
        </PanneauPassif>

        <Progression rang={rang + 1} total={total} />
      </div>
    </div>
  );
}
