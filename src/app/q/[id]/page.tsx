import { redirect } from "next/navigation";
import { getContenu, localiserQuestion } from "@/lib/content/data";
import { EcranQuestion } from "./EcranQuestion";

export default async function PageQuestion({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { questions, notions } = getContenu();
  const question = questions.get(id);
  const position = localiserQuestion(id);

  // 06-ecrans.md §7.2 : URL de question inconnue — retour à la question en
  // cours plutôt qu'une page d'erreur. `/` recalcule la bonne destination.
  if (!question || !position) {
    redirect("/");
  }

  const notion = notions.get(question.notion);
  if (!notion) {
    // Ne peut pas arriver si le contenu a passé la validation de construction.
    redirect("/");
  }

  return (
    <EcranQuestion
      question={question}
      notion={notion}
      rang={position.rang}
      total={position.total}
      suivanteId={position.suivanteId}
    />
  );
}
