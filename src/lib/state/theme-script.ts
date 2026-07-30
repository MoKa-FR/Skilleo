import { STORAGE_KEY, SCHEMA_VERSION } from "./storage";

/**
 * D-35 : au premier chargement le thème suit la préférence système ; un
 * choix explicite l'emporte et persiste. Doit s'exécuter avant la peinture
 * pour éviter un flash — d'où un script inline plutôt qu'un effet React.
 */
export function themeInitScript(): string {
  return `(function(){try{var raw=localStorage.getItem(${JSON.stringify(
    STORAGE_KEY
  )});var theme=null;if(raw){var s=JSON.parse(raw);if(s&&s.schemaVersion===${SCHEMA_VERSION}&&(s.theme==="light"||s.theme==="dark")){theme=s.theme;}}if(!theme){theme=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.setAttribute("data-theme",theme);}catch(e){}})();`;
}
