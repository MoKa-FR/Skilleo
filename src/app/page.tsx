import { parcoursPrincipal } from "@/lib/content/data";
import { RedirectionAccueil } from "./RedirectionAccueil";

/**
 * 03-navigation.md §2.2 : aucun écran d'accueil. Cette page ne rend rien de
 * visible — elle calcule la destination et redirige (voir
 * `RedirectionAccueil`).
 */
export default function Accueil() {
  const parcours = parcoursPrincipal();
  return <RedirectionAccueil questionIds={parcours?.questions ?? []} />;
}
