"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bouton } from "@/components/Bouton";
import { Marqueur } from "@/components/Marqueur";
import { readState, reinitialiserReponses, type ReponseEntry } from "@/lib/state/storage";

export function EcranFin({ questions }: { questions: { id: string; enonce: string }[] }) {
  const router = useRouter();
  const [reponses, setReponses] = useState<ReponseEntry[]>([]);

  useEffect(() => {
    // Le journal vit en localStorage, indisponible en SSR : lecture au
    // montage, nécessairement côté client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReponses(readState().reponses);
  }, []);

  const parQuestion = new Map(reponses.map((r) => [r.questionId, r]));
  const reussies = questions.filter((q) => parQuestion.get(q.id)?.correct).length;
  const ratees = questions.filter((q) => parQuestion.get(q.id) && !parQuestion.get(q.id)?.correct).length;

  return (
    <div className="mx-auto flex w-full flex-1 flex-col" style={{ maxWidth: "var(--frame-max-width)" }}>
    <div className="grid flex-1 grid-cols-1 gap-y-[var(--space-8)] px-[var(--gutter)] py-[var(--space-8)] lg:gap-y-0" style={{ gridTemplateColumns: "var(--col-decision) var(--col-gap) var(--col-passive)" }}>
      <div className="flex flex-col justify-center gap-[var(--space-6)] lg:col-start-1">
        <h1
          className="text-[length:var(--type-question-size)] leading-[var(--type-question-lh)] tracking-[var(--type-question-track)]"
          style={{ color: "var(--text-primary)", fontWeight: "var(--weight-bold)" }}
        >
          Parcours terminé
        </h1>
        <p className="tabular" style={{ color: "var(--text-secondary)" }}>
          {reussies} réussie{reussies > 1 ? "s" : ""}, {ratees} ratée{ratees > 1 ? "s" : ""} sur {questions.length}
        </p>
        <div>
          <Bouton
            variante="primaire"
            onActivate={() => {
              reinitialiserReponses();
              router.push("/");
            }}
          >
            Recommencer
          </Bouton>
        </div>
      </div>

      <div aria-hidden="true" className="hidden lg:block" />

      <div className="flex flex-col gap-[var(--space-4)] lg:col-start-3">
        <ul className="flex flex-col gap-[var(--space-3)]">
          {questions.map((q) => {
            const r = parQuestion.get(q.id);
            return (
              <li key={q.id} className="flex items-center gap-[var(--space-2)]">
                {r ? <Marqueur correcte={r.correct} /> : null}
                <button
                  type="button"
                  onClick={() => router.push(`/q/${q.id}`)}
                  className="text-left"
                  style={{ color: "var(--text-primary)" }}
                >
                  {q.enonce}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
    </div>
  );
}
