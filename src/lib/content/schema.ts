import { z } from "zod";

/**
 * Schémas de 09-contenu.md §4, §5, §6, §6bis. Limites du §7 incluses ici —
 * une violation doit être visible au même endroit que le champ qu'elle
 * contraint.
 */

export const optionSchema = z.object({
  id: z.string().min(1),
  texte: z.string().min(1).max(60),
  juste: z.boolean().optional(),
});

export const questionSchema = z.object({
  id: z.string().min(1),
  notion: z.string().min(1),
  source: z.string().min(1).regex(/^[^#]+#[^#]+$/, "attendu : identifiant#ancre"),
  enonce: z.string().min(1).max(140),
  options: z.array(optionSchema).min(2).max(4),
  indice: z.string().min(1),
  retour: z.object({
    amorce: z.string().min(1).max(90),
    suite: z.string().min(1),
  }),
});

export type Question = z.infer<typeof questionSchema>;

export const notionFrontmatterSchema = z.object({
  id: z.string().min(1),
  titre: z.string().min(1),
  source: z.string().min(1).regex(/^[^#]+#[^#]+$/, "attendu : identifiant#ancre"),
});

export interface Notion extends z.infer<typeof notionFrontmatterSchema> {
  corps: string;
}

export const parcoursSchema = z.object({
  id: z.string().min(1),
  titre: z.string().min(1),
  questions: z.array(z.string().min(1)).min(1),
});

export type Parcours = z.infer<typeof parcoursSchema>;

export const sourceFrontmatterSchema = z.object({
  id: z.string().min(1),
  titre: z.string().min(1),
  fil: z.string().min(1),
  sources_externes: z.array(z.string().min(1)).min(1),
});

export interface ModuleSource extends z.infer<typeof sourceFrontmatterSchema> {
  corps: string;
  ancres: string[];
}
