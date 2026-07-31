import { redirect } from "next/navigation";
import { getContenu, localiserQuestion } from "@/lib/content/data";
import { EcranQuestion } from "./EcranQuestion";

export default async function PageQuestion({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { questions } = getContenu();
  const question = questions.get(id);
  const position = localiserQuestion(id);

  // 06-ecrans.md §7.2 : URL de question inconnue — retour à la question en
  // cours plutôt qu'une page d'erreur. `/` recalcule la bonne destination.
  if (!question || !position) {
    redirect("/");
  }

  // La notion (D-37) reste validée à la construction par le chargeur — elle
  // n'a simplement plus d'écran qui la révèle en V0 : D-49 marque son
  // troisième moment `[À VALIDER]`, non implémentable tant que Q-14 est ouverte.
  return (
    <EcranQuestion
      question={question}
      rang={position.rang}
      total={position.total}
      suivanteId={position.suivanteId}
    />
  );
}
