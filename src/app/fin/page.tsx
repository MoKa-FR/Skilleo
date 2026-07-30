import { getContenu, parcoursPrincipal } from "@/lib/content/data";
import { EcranFin } from "./EcranFin";

export default function PageFin() {
  const { questions } = getContenu();
  const parcours = parcoursPrincipal();
  const liste = (parcours?.questions ?? []).map((id) => ({
    id,
    enonce: questions.get(id)?.enonce ?? id,
  }));

  return <EcranFin questions={liste} />;
}
