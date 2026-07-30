import fs from "node:fs";
import path from "node:path";
import { load as parseYaml } from "js-yaml";
import matter from "gray-matter";
import {
  questionSchema,
  type Question,
  notionFrontmatterSchema,
  type Notion,
  parcoursSchema,
  type Parcours,
  sourceFrontmatterSchema,
  type ModuleSource,
} from "./schema";
import { compterCharte, violationsCharte } from "./charte";

/**
 * Chargement et validation de `content/` — 09-contenu.md §8 : "une
 * violation arrête la construction ; elle ne dégrade jamais l'affichage."
 * Toutes les erreurs sont rassemblées puis levées ensemble, pour ne pas
 * faire corriger un fichier à la fois.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");
const ANCRE_RE = /\{#([a-z0-9-]+)\}/gi;

export class ContentError extends Error {
  constructor(erreurs: string[]) {
    super(`Contenu invalide (content/) :\n- ${erreurs.join("\n- ")}`);
    this.name = "ContentError";
  }
}

function fichiers(baseDir: string, sousDir: string, extension: string): string[] {
  const dir = path.join(baseDir, sousDir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(extension))
    .map((f) => path.join(dir, f));
}

function extraireAncres(corps: string): string[] {
  return Array.from(corps.matchAll(ANCRE_RE)).map((m) => m[1]);
}

export interface Contenu {
  sources: Map<string, ModuleSource>;
  notions: Map<string, Notion>;
  questions: Map<string, Question>;
  parcours: Map<string, Parcours>;
}

/**
 * Charge tout `content/` et valide le contrat de 09-contenu.md. Lève
 * `ContentError` avec la liste complète des violations, ou retourne le
 * contenu prêt à consommer.
 */
export function chargerContenu(baseDir: string = CONTENT_DIR): Contenu {
  const erreurs: string[] = [];

  const sources = new Map<string, ModuleSource>();
  for (const fichier of fichiers(baseDir, "sources", ".mdx")) {
    const brut = fs.readFileSync(fichier, "utf-8");
    const { data, content } = matter(brut);
    const parsed = sourceFrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      erreurs.push(`${fichier} : ${parsed.error.message}`);
      continue;
    }
    if (sources.has(parsed.data.id)) {
      erreurs.push(`${fichier} : id de module source dupliqué "${parsed.data.id}"`);
      continue;
    }
    sources.set(parsed.data.id, { ...parsed.data, corps: content, ancres: extraireAncres(content) });
  }

  const notions = new Map<string, Notion>();
  for (const fichier of fichiers(baseDir, "notions", ".mdx")) {
    const brut = fs.readFileSync(fichier, "utf-8");
    const { data, content } = matter(brut);
    const parsed = notionFrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      erreurs.push(`${fichier} : ${parsed.error.message}`);
      continue;
    }
    if (notions.has(parsed.data.id)) {
      erreurs.push(`${fichier} : id de notion dupliqué "${parsed.data.id}"`);
      continue;
    }
    const corps = content.trim();
    if (corps.length > 600) {
      erreurs.push(`${fichier} : corps de notion de ${corps.length} caractères (limite 600, §7)`);
    }
    if (/^#{1,6}\s/m.test(corps)) erreurs.push(`${fichier} : un résumé de notion ne peut pas contenir de titre (§5)`);
    if (/!\[[^\]]*\]\(/.test(corps)) erreurs.push(`${fichier} : un résumé de notion ne peut pas contenir d'image (§5)`);
    if (/(?<!!)\[[^\]]*\]\([^)]*\)/.test(corps)) erreurs.push(`${fichier} : un résumé de notion ne peut pas contenir de lien sortant (§5)`);
    if (/^\|.*\|$/m.test(corps)) erreurs.push(`${fichier} : un résumé de notion ne peut pas contenir de tableau (§5)`);
    violationsCharte(compterCharte(corps)).forEach((v) =>
      erreurs.push(`${fichier} (charte §7bis) : ${v}`)
    );
    notions.set(parsed.data.id, { ...parsed.data, corps });
  }

  const questions = new Map<string, Question>();
  for (const fichier of fichiers(baseDir, "questions", ".yaml")) {
    const brut = fs.readFileSync(fichier, "utf-8");
    const data = parseYaml(brut);
    const parsed = questionSchema.safeParse(data);
    if (!parsed.success) {
      erreurs.push(`${fichier} : ${parsed.error.message}`);
      continue;
    }
    const q = parsed.data;
    if (questions.has(q.id)) {
      erreurs.push(`${fichier} : id de question dupliqué "${q.id}"`);
      continue;
    }
    const idsOptions = new Set<string>();
    for (const option of q.options) {
      if (idsOptions.has(option.id)) {
        erreurs.push(`${fichier} : id d'option dupliqué "${option.id}" dans "${q.id}"`);
      }
      idsOptions.add(option.id);
    }
    const justes = q.options.filter((o) => o.juste).length;
    if (justes !== 1) {
      erreurs.push(`${fichier} : "${q.id}" a ${justes} option(s) juste(s), attendu exactement 1 (§4.2)`);
    }
    const textesCharte = [q.enonce, q.indice, q.retour.amorce, q.retour.suite, ...q.options.map((o) => o.texte)].join("\n");
    violationsCharte(compterCharte(textesCharte)).forEach((v) =>
      erreurs.push(`${fichier} (charte §7bis) : ${v}`)
    );
    questions.set(q.id, q);
  }

  const parcours = new Map<string, Parcours>();
  for (const fichier of fichiers(baseDir, "parcours", ".yaml")) {
    const brut = fs.readFileSync(fichier, "utf-8");
    const data = parseYaml(brut);
    const parsed = parcoursSchema.safeParse(data);
    if (!parsed.success) {
      erreurs.push(`${fichier} : ${parsed.error.message}`);
      continue;
    }
    if (parcours.has(parsed.data.id)) {
      erreurs.push(`${fichier} : id de parcours dupliqué "${parsed.data.id}"`);
      continue;
    }
    parcours.set(parsed.data.id, parsed.data);
  }

  // Références croisées (§8) — seulement si le chargement de base n'a pas déjà échoué.
  for (const [id, q] of questions) {
    if (!notions.has(q.notion)) {
      erreurs.push(`question "${id}" : notion "${q.notion}" introuvable (D-37)`);
    }
    const [sourceId, ancre] = q.source.split("#");
    const moduleSource = sources.get(sourceId);
    if (!moduleSource) {
      erreurs.push(`question "${id}" : module source "${sourceId}" introuvable (D-41)`);
    } else if (!moduleSource.ancres.includes(ancre)) {
      erreurs.push(`question "${id}" : ancre "#${ancre}" introuvable dans "${sourceId}"`);
    }
  }
  for (const [id, n] of notions) {
    const [sourceId, ancre] = n.source.split("#");
    const moduleSource = sources.get(sourceId);
    if (!moduleSource) {
      erreurs.push(`notion "${id}" : module source "${sourceId}" introuvable (D-41)`);
    } else if (!moduleSource.ancres.includes(ancre)) {
      erreurs.push(`notion "${id}" : ancre "#${ancre}" introuvable dans "${sourceId}"`);
    }
  }

  const questionsDansParcours = new Set<string>();
  for (const [id, p] of parcours) {
    for (const questionId of p.questions) {
      questionsDansParcours.add(questionId);
      if (!questions.has(questionId)) {
        erreurs.push(`parcours "${id}" : question "${questionId}" introuvable (§6)`);
      }
    }
  }
  for (const id of questions.keys()) {
    if (!questionsDansParcours.has(id)) {
      erreurs.push(`question "${id}" : orpheline, ne figure dans aucun parcours (§8)`);
    }
  }

  if (erreurs.length > 0) throw new ContentError(erreurs);

  return { sources, notions, questions, parcours };
}
