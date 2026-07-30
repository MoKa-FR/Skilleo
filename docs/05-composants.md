# 05 — Composants

> Périmètre : les briques, leurs états, et le contrat de comportement de chacune.
> Aucune valeur chiffrée (voir [`tokens/tokens.css`](./tokens/tokens.css)), aucun contenu d'écran (voir `06-ecrans.md`), aucune durée (voir `07-motion.md`).

---

## Table des matières

- [1. Règles du catalogue](#1-règles-du-catalogue)
- [2. Les six états obligatoires](#2-les-six-états-obligatoires)
- [3. `Enonce`](#3-enonce)
- [4. `GroupeOptions` et `Option`](#4-groupeoptions-et-option)
- [5. `Bouton`](#5-bouton)
- [6. `TexteDeuxTons`](#6-textedeuxtons)
- [7. `Declencheur`](#7-declencheur)
- [8. `PanneauPassif`](#8-panneaupassif)
- [9. `Selecteur`](#9-selecteur)
- [10. `Progression`](#10-progression)
- [11. `Marqueur`](#11-marqueur)
- [12. Emplacements réservés](#12-emplacements-réservés)
- [13. Contrôle avant d'ajouter un composant](#13-contrôle-avant-dajouter-un-composant)
- [14. Ce qui reste à trancher](#14-ce-qui-reste-à-trancher)

---

## 1. Règles du catalogue

**R1 — Aucune valeur littérale.** Tout passe par un token (`D-24`). Un `#FFFFFF` ou un `12px` codé en dur est un défaut, même s'il est juste.

**R2 — Six états, toujours.** Un composant interactif définit les six états du §2. Un état non défini est un défaut de spécification, pas un oubli acceptable.

**R3 — Les deux thèmes, toujours.** Chaque composant est vérifié en clair et en sombre (`D-24`). Le thème sombre n'étant pas une inversion, la vérification est réelle, pas mécanique.

**R4 — Aucune exception locale.** Loi 6 : un comportement souhaité dans un seul écran devient une **variante documentée** du composant, ou est abandonné. Jamais un cas particulier dans le code d'un écran.

**R5 — Rien ne bouge sous le curseur.** Aucun état de survol ne modifie une dimension ni une position. Un composant qui grandit au survol pousse ses voisins : défaut.

**R6 — Le rang détermine l'emplacement.** Un composant portant une action P0 ou P1 ne peut pas vivre dans la colonne passive (`D-09`).

---

## 2. Les six états obligatoires

| État | Déclenché par | Rendu |
|---|---|---|
| **Repos** | Défaut | Rendu nominal |
| **Survol** | Curseur au-dessus | Changement de **couleur et/ou de graisse** uniquement |
| **Focus visible** | Parcours clavier | Le rendu de survol **plus l'anneau de focus** |
| **Actif** | Pendant l'appui | Retour bref, réversible instantanément |
| **Sélectionné** | Choix en cours, non validé | Persistant, distinct du survol et du focus |
| **Désactivé** | Action indisponible | **À éviter** — voir ci-dessous |

**Le focus est toujours plus fort que le survol.** Le survol est ambiant, le curseur passe. Le focus est intentionnel, l'utilisateur a navigué jusque là. Un focus rendu par le seul changement de couleur du survol est un défaut. Détail dans `02-interactions.md` §2.2.

**L'état désactivé est à éviter.** Peu contrasté, muet sur sa raison, et injoignable au clavier pour l'expliquer. On garde le contrôle actif et on répond à l'usage par une explication. On ne désactive que si l'action est réellement impossible, et alors la raison est lisible **sans survol**.

Le patron de survol du système est celui mesuré sur la référence : `--text-tertiary` au repos → `--text-primary` au survol, **couleur et graisse seules, aucun fond, aucune bordure, aucun soulignement** (`references/trade-republic-web.md` §5.2).

---

## 3. `Enonce`

L'information héro de l'écran. Le pendant du montant dominant de la référence.

| Propriété | Valeur |
|---|---|
| Typographie | `--type-question` — grand, gras, interligne serré |
| Emplacement | Colonne décisionnelle, en haut (`D-10`) |
| Interactif | Non |
| États | Aucun |

**Contrat.** Un seul `Enonce` par écran — c'est ce qui rend la Loi 1 vérifiable visuellement. Il ne se décale **jamais** en cours de question : c'est la raison d'être de `D-09`, et tout ce qui apparaît après une réponse va dans la colonne passive.

**Interdits :** deux énoncés simultanés ; un énoncé dans la colonne passive ; une phrase d'introduction au-dessus de lui.

---

## 4. `GroupeOptions` et `Option`

Le composant central du produit. Celui que l'utilisateur manipulera des milliers de fois.

### 4.1 `GroupeOptions`

| Propriété | Valeur |
|---|---|
| Sémantique | Groupe de boutons radio |
| Tabulation | **Une seule étape** — `tabindex` glissant (`02-interactions.md` §4.2) |
| Navigation interne | Flèches |
| Validation | `Entrée` uniquement |
| Emplacement | Colonne décisionnelle |

**Le contrat le plus important du catalogue.** Un groupe radio HTML natif **sélectionne au déplacement de flèche**. Ici, ce serait un défaut grave : l'utilisateur qui parcourt les options aurait répondu sans l'avoir décidé.

Les flèches déplacent une **mise en évidence**. Seule `Entrée` engage. Sélection et soumission sont **découplées** : `aria-checked` suit la mise en évidence, la soumission est un événement distinct (`D-14`).

### 4.2 `Option`

| État | Rendu |
|---|---|
| Repos | Contour `--border-subtle`, texte `--text-primary` |
| Survol | Contour `--text-primary` |
| Focus visible | Contour `--text-primary` + anneau de focus |
| Mise en évidence | Contour `--text-primary`, épaissi — **ne vaut pas réponse** |
| Retenue après validation | Contour `--text-primary` + `Marqueur` |
| Écartée après validation | Contour `--border-subtle`, texte `--text-tertiary` |

Hauteur `--h-control`, rayon `--radius`.

**Contrat.**

- Toute la surface de l'option est cliquable, pas seulement son libellé.
- Aucun changement de dimension entre les états (R5).
- Après validation, les options ne sont plus actionnables mais **restent lisibles** — l'utilisateur doit pouvoir relire ce qu'il a choisi.
- L'option écartée passe en `--text-tertiary` : c'est le rôle exact de ce token, un contenu qu'on ne veut plus faire lire.

**Interdits :** une couleur de fond pour signaler juste ou faux (`D-26`) ; une option désactivée avant validation ; un libellé tronqué — une option trop longue passe sur deux lignes, la hauteur du groupe s'adapte, `--h-control` devient alors une hauteur minimale.

---

## 5. `Bouton`

| Variante | Emploi | Rendu |
|---|---|---|
| **Primaire** | L'action P0 de l'écran | Fond `--text-primary`, texte inversé |
| **Secondaire** | Action P1 | Contour, fond transparent |
| **Discret** | Action P2 | Texte seul, patron de survol du §2 |

Hauteur `--h-control`, rayon `--radius`, aucune ombre (`04-tokens.md` §7).

**Contrat.**

- **Un seul bouton primaire par écran.** C'est la traduction directe de la Loi 1.
- Le libellé nomme un **résultat**, jamais un mécanisme : « Question suivante », pas « Soumettre » (`01-ux-principes.md` §3.1).
- **L'icône est à droite du libellé**, détachée — jamais à gauche. C'est le motif mesuré sur la référence (`references/trade-republic-web.md` §5.7).
- Un bouton n'est **jamais** une capsule. `--radius-full` est réservé aux pastilles.

**Cas particulier — la garde `Entrée`.** Le bouton primaire qui fait avancer après une réponse ne s'arme qu'après un `keyup` de `Entrée` (`D-17`). Sans cette garde, une touche maintenue sauterait le retour sans qu'il soit lu, ce qui annulerait `D-15`. À valider en test : la garde doit être imperceptible au rythme normal.

---

## 6. `TexteDeuxTons`

Composant de premier rang (`D-11`). Le meilleur emprunt à la référence.

**Amorce en `--text-primary`, suite en `--text-secondary`. Même taille, même graisse, même interligne. Seule la couleur change.**

On lit le premier ton seul pour le résumé, les deux pour le détail. Divulgation progressive **à l'intérieur d'un bloc de texte**, sans accordéon, sans interaction, sans coût.

| Emploi | Amorce porte |
|---|---|
| Retour après réponse | La conclusion en une phrase |
| Résumé de notion | La définition |
| Libellé de champ | La valeur, la suite portant l'aide |

**Contrat.**

- Les deux tons forment **une seule phrase** pour un lecteur d'écran. Aucun découpage sémantique, aucun `aria-label` séparé.
- La distinction est **visuelle uniquement** et ne porte jamais d'information à elle seule (`01-ux-principes.md` §8). Un utilisateur qui ne perçoit pas le contraste lit une phrase complète et correcte.
- **Aucun changement de graisse.** Le regard doit accrocher un contraste de valeur, pas d'épaisseur — ajouter du gras casserait l'effet (`04-tokens.md` §3.4).

**Interdits :** plus de deux tons ; une amorce qui ne se suffit pas à elle-même ; l'emploi de `--text-tertiary` comme second ton, qui signifierait « ne lisez pas ».

---

## 7. `Declencheur`

La ligne discrète qui ouvre un panneau. Son cas de référence est la ligne `Indice` (`D-13`).

| État | Rendu |
|---|---|
| Repos | `--text-tertiary` — présent, silencieux, ignorable sans coût |
| Survol | `--text-primary` |
| Focus visible | `--text-primary` + anneau |
| Ouvert | `--text-primary`, marqué comme actif |

**Contrat.**

- **Le survol ne déclenche pas** — il signale la disponibilité. L'ouverture demande un clic ou un raccourci (`D-12`, Loi 5).
- Découvrable au repos : `--text-tertiary` est discret, **pas invisible**. Un déclencheur qu'on ne voit pas est une fonction qui n'existe pas.
- Atteignable au clavier, toujours.

**Pourquoi ce composant existe.** Il matérialise la Loi 5. Une révélation au survol seul aurait quatre défauts : découvrabilité nulle, aucun équivalent clavier, aucun équivalent tactile, et révélation accidentelle au passage du curseur. Ce dernier point est le plus important : dans une application d'apprentissage, la demande d'aide doit rester un **acte délibéré**, parce que c'est le signal qu'on veut mesurer.

---

## 8. `PanneauPassif`

Le conteneur de la colonne passive (`D-09`, `D-23`).

| Propriété | Valeur |
|---|---|
| Emplacement | Colonne passive, à droite (`D-10`) |
| Modal | **Non** |
| Voile | **Aucun** |
| Ombre | **Aucune** |
| Simultanéité | **Un seul contenu à la fois** |

**Contrat.**

- **Pas modal, donc l'utilisateur peut répondre sans le fermer.** La théorie reste ouverte à côté pendant qu'il agit. C'est le cœur de « la théorie est en support » (`D-02`).
- Aucun piège de focus. La colonne décisionnelle reste atteignable au clavier.
- Le focus entre à l'ouverture et **revient à son déclencheur** à la fermeture.
- `Échap` revient au contenu précédent, puis à l'état de repos. **Il ne détruit jamais l'état de la question.**
- Ouvrir un contenu depuis un autre le **remplace**, sans empiler de couche visuelle.
- État de repos : le `Declencheur` `Indice`, plus la progression.

**Interdits (R6) :** toute action P0 ou P1 à l'intérieur. Un panneau qui contiendrait un bouton d'avancement serait un défaut — l'avancement est P0 et appartient à la colonne décisionnelle.

**Contenus admis :** indice, résumé de notion, page complète de notion, retour après réponse. Rien d'autre sans passer par la procédure d'admission de `01-ux-principes.md` §4.

---

## 9. `Selecteur`

Choix parmi quelques valeurs mutuellement exclusives. Directement repris de la référence.

| État | Rendu |
|---|---|
| Non retenu | `--text-tertiary`, graisse normale |
| Retenu | `--text-primary`, graisse forte |
| Survol | `--text-primary` |
| Focus visible | + anneau |

**Aucun fond, aucune pilule, aucune bordure, aucun soulignement, aucun indicateur.** Couleur et graisse seules. C'est exactement le motif mesuré (`references/trade-republic-web.md` §5.2), et il est réutilisable tel quel.

**Contrat.** Une seule étape de tabulation pour le groupe, flèches à l'intérieur — comme `GroupeOptions`. À la différence de celui-ci, **le changement de valeur est immédiat** : un sélecteur n'a pas d'étape de validation, parce qu'il n'engage rien d'irréversible.

**Hors V0** — aucun sélecteur n'est nécessaire au périmètre de `D-22`. Spécifié maintenant parce que la bascule de thème (`D-24`) en emploiera un.

---

## 10. `Progression`

L'état de l'utilisateur. Seul contenu permanent de la colonne passive.

| Propriété | Valeur |
|---|---|
| Interactif | Non |
| Chiffres | Tabulaires — la largeur ne bouge pas à l'incrément |
| Emplacement | Colonne passive, ou chrome permanent |

**Contrat.** La progression est une **propriété, pas une destination** (`00-produit.md` §2.1). Elle s'affiche là où elle informe, jamais comme une section à visiter.

**Interdits :** toute décoration — barre animée, cercle de complétion, jauge ; toute formulation d'assiduité ou de série de jours ; toute célébration à l'incrément.

---

## 11. `Marqueur`

Le **seul** endroit du système où la couleur apparaît (`D-26`).

| Propriété | Valeur |
|---|---|
| Forme | Icône ou point, `--radius-full` autorisé |
| Couleur | `--marker-positive` ou `--marker-negative` |
| Taille | Petite — accompagne, ne domine pas |

**Contrat — trois interdits absolus.**

1. **Jamais seul porteur d'information.** Juste ou faux se lit aussi dans le symbole et dans le texte qui l'accompagne. La couleur **confirme**. Un utilisateur daltonien perd zéro information.
2. **Jamais décoratif.** Ne qualifie qu'une réponse. Aucune extension à un état de succès générique, aucun emploi ailleurs dans le produit.
3. **Jamais sur une surface.** Pas de fond coloré, pas de bordure colorée, pas de bandeau.

`[P]` Les deux valeurs sont arrêtées par `D-33`, **identiques dans les deux thèmes**. Le contrat ci-dessus est ce qui le permet : l'interdit n°1 maintient le marqueur hors du texte, donc sous le seuil de contraste des éléments non textuels. **Si le marqueur devenait un jour du texte, `D-33` tombe et les valeurs sont à recalibrer.**

---

## 12. Emplacements réservés

`D-08` impose de réserver la place de ce qui viendra, sans l'implémenter — pour ne pas redessiner le noyau au moment de l'ajouter.

| Composant | Statut | Pourquoi il est mentionné ici |
|---|---|---|
| `ChampLibre` | **Hors V0** (`D-08`) | Le champ de prompt. Sa place dans la colonne décisionnelle est réservée. Le motif de champ de la référence — préfixe en primaire, indication en secondaire — est un `TexteDeuxTons` appliqué à un formulaire |
| `SortieModele` | **Hors V0** (`D-08`) | Affichage d'une génération. Imposera des états de latence, de flux progressif, d'échec, et un marquage « généré » |
| `IndexNotions` | **Hors V0** (`D-22`) | Corpus parcourable. `D-16` impose une hiérarchie, sa forme reste à définir |
| `Recherche` | **Hors V0** (`D-22`) | Seul chemin vers l'index (`D-02`) |

**Aucun de ces composants ne s'implémente en V0**, même en version réduite. `00-produit.md` est explicite : hors périmètre, sans « petite version de ».

---

## 13. Contrôle avant d'ajouter un composant

- [ ] Les six états du §2 sont définis, y compris ceux qu'on croit inutiles.
- [ ] Vérifié dans les deux thèmes, réellement — pas par inversion.
- [ ] Aucune valeur littérale : tout passe par un token.
- [ ] Le survol ne modifie ni dimension ni position.
- [ ] Le focus est plus visible que le survol.
- [ ] Rien n'est atteignable au survol seul.
- [ ] Parcours clavier complet, groupes en une étape de tabulation.
- [ ] Aucune information portée par la couleur seule.
- [ ] Le rang de l'action est compatible avec la colonne qui l'accueille (R6).
- [ ] Aucun comportement local divergent (R4).
- [ ] La procédure d'admission de `01-ux-principes.md` §4 a été suivie.

---

## 14. Ce qui reste à trancher

| Réf | Sujet |
|---|---|
| `D-13` | Le raccourci clavier du `Declencheur` `Indice` |
| `D-17` | Validation en test réel de la garde `keyup` du `Bouton` primaire |
| `D-34` | Quelles transitions existent — la paire durée/easing est arrêtée, leur emploi ne l'est pas |
| `D-28` | Largeur des cibles en régime étroit — la hauteur est couverte par `D-25` |

---

## Journal du document

| Date | Modification |
|---|---|
| 2026-07-30 | Création. Débloqué par `D-25` (hauteur de contrôle). Neuf composants, quatre emplacements réservés. Cadré par D-08 à D-27. |
| 2026-07-30 | `Marqueur` sort de `[AV]` (`D-33`) : valeurs arrêtées, identiques dans les deux thèmes, le contrat « jamais du texte » étant ce qui le permet. |
