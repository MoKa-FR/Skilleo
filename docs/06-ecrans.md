# 06 — Écrans

> Périmètre : quel contenu, dans quel ordre, dans quel état.
> Aucune valeur (voir [`src/app/globals.css`](../src/app/globals.css)), aucun composant redéfini (voir `05-composants.md`), aucune règle de navigation (voir `03-navigation.md`).

---

## Table des matières

- [1. Ce qu'est un gabarit ici](#1-ce-quest-un-gabarit-ici)
- [2. Grammaire commune](#2-grammaire-commune)
- [3. Régimes de largeur](#3-régimes-de-largeur)
- [4. Écran de question — le noyau](#4-écran-de-question--le-noyau)
- [5. Écran de fin de parcours](#5-écran-de-fin-de-parcours)
- [6. Gabarits hors V0](#6-gabarits-hors-v0)
- [7. États transverses](#7-états-transverses)
- [8. Contrôle avant de livrer un écran](#8-contrôle-avant-de-livrer-un-écran)
- [9. Ce qui reste à trancher](#9-ce-qui-reste-à-trancher)

---

## 1. Ce qu'est un gabarit ici

Un gabarit dit **ce qui occupe chaque colonne, dans quel ordre, et comment ça change d'état**. Il ne redéfinit jamais un composant : il le place.

**Quatre règles.**

**G1 — Deux colonnes de rôles asymétriques.** Décision à gauche, contexte à droite (`D-09`, `D-10`). Sans alternance, sur aucun écran.

**G2 — Exactement un P0 par écran**, dans la colonne décisionnelle. Sa **position est stable** sur toute la boucle, seul son libellé change (`01-ux-principes.md` §3.2).

**G3 — L'énoncé ne se décale jamais.** Tout ce qui apparaît en cours de question va dans la colonne passive. C'est la raison d'être de `D-09`.

**G4 — La colonne passive n'est jamais vide.** Son état de repos est défini : le déclencheur `Indice` et la progression (`D-13`).

---

## 2. Grammaire commune

Tout écran suit la même séquence verticale. Un écran qui s'en écarte doit le justifier.

```text
Chrome permanent  ·  identité, progression, bascule de thème
─────────────────────────────────────────────────────────────
COLONNE DÉCISIONNELLE (gauche)     │  COLONNE PASSIVE (droite)
                                    │
1. Repère de position               │  a. Contenu contextuel
2. Information héro                 │     ou état de repos
3. Contenu actionnable              │
4. Action primaire (P0)             │  b. Progression
5. Actions subordonnées (P1)        │
```

Le repère de position est en `--type-micro`, `--text-secondary`. Il informe, il ne décore pas.

---

## 3. Régimes de largeur

`D-28` fixe trois régimes. Conséquences par gabarit :

| Largeur | Ce qui change |
|---|---|
| ≥ 1280 px | Disposition nominale |
| 1024–1279 px | Gouttière et colonne passive resserrées. Aucun contenu ne disparaît |
| < 1024 px | Colonne unique. La colonne passive devient un panneau **en surimpression**, ancré en bas. La progression migre sous l'en-tête |

**Le point à ne pas rater.** Sous 1024 px, le panneau passe **au-dessus** de la colonne décisionnelle, jamais en dessous. L'énoncé est recouvert, pas poussé — `G3` reste vrai par un autre moyen.

Sous 1024 px, le toucher remplace le clavier sans changer le principe : un appui sélectionne, l'action primaire répond (`D-28`, `D-29`).

---

## 4. Écran de question — le noyau

La destination par défaut. L'utilisateur y arrive directement, sans écran d'accueil (`03-navigation.md` §2.2).

### 4.1 Contenu

| Colonne décisionnelle | Colonne passive |
|---|---|
| Repère `Question n sur N` | Déclencheur `Indice` |
| `Enonce` | Déclencheur `Voir la notion` |
| `GroupeOptions` | `Progression` |
| Action primaire | |

### 4.2 Les quatre états

**A — Question posée, rien sélectionné**

- Décisionnelle : repère, énoncé, options au repos, action primaire présente.
- Passive : état de repos — les deux déclencheurs en `--text-tertiary`, la progression.
- Focus initial : le `GroupeOptions`.

L'action primaire est **présente dès le départ**, jamais masquée ni désactivée (`D-29`). Son emploi sans sélection produit un **retour local** pointant le groupe d'options — pas un état désactivé, pas un message global (`05-composants.md` §2).

**B — Option sélectionnée, non validée**

- Une seule option en mise en évidence. Les autres inchangées.
- L'action primaire porte `Valider`.
- **Rien d'autre ne change.** Aucun contenu n'apparaît, la sélection n'est pas une réponse.

**C — Un panneau est ouvert**

- Décisionnelle : **inchangée**. L'utilisateur peut sélectionner et valider sans fermer le panneau (`D-23`).
- Passive : le panneau remplace l'état de repos. Un seul à la fois.
- Le déclencheur employé passe en état ouvert.
- `Échap` revient au contenu précédent, puis au repos. Il ne détruit jamais la sélection en cours.

**D — Réponse validée**

- Décisionnelle : l'option retenue porte un `Marqueur`, les options écartées passent en `--text-tertiary`. Les options restent **lisibles** mais ne sont plus actionnables.
- Passive : le retour s'affiche en `TexteDeuxTons` — l'amorce porte la conclusion en une phrase, la suite l'explication.
- L'action primaire porte `Question suivante`. **Même position qu'à l'état B** (`G2`).
- Le focus passe à l'action primaire, gardé par la discipline `keyup` de `D-17`.
- Le retour est annoncé aux technologies d'assistance par une région live polie.

### 4.3 Interdits sur cet écran

- Deux énoncés simultanés, ou un énoncé dans la colonne passive.
- Une phrase d'introduction au-dessus de l'énoncé.
- Un décalage de l'énoncé entre les états A et D (`G3`).
- Un fond ou une bordure coloré pour signaler juste ou faux (`D-26`).
- Une célébration à chaque bonne réponse (`01-ux-principes.md` §5).
- Un enchaînement automatique vers la question suivante (`D-15`).
- Une action d'avancement dans la colonne passive (`D-09`).

---

## 5. Écran de fin de parcours

Atteint après la dernière question. `D-22` en fixe le contenu.

| Colonne décisionnelle | Colonne passive |
|---|---|
| Titre de fin | Détail par question — réussie ou ratée |
| Récapitulatif : réussies, ratées | |
| Action primaire `Recommencer` | |

Le détail par question est du rang P2 : il permet de relire une question, jamais de relancer le parcours. La relance est P0 et reste à gauche.

**Cet écran est nécessaire indépendamment de sa valeur commerciale.** `00-produit.md` §2.1 définit la Session comme « une unité qu'on peut terminer ». Sans terme, l'objet Session n'existe plus.

**Interdits, explicitement :** capture d'email, formulaire de retour, note de satisfaction — tous hors V0 (`D-22`). Toute célébration disproportionnée. Toute formulation culpabilisante sur les réponses ratées : une erreur est une information, pas un jugement.

---

## 6. Gabarits hors V0

Spécifiés maintenant pour que leur ajout n'improvise pas. **Aucun ne s'implémente en V0**, même en version réduite (`D-22`).

### 6.1 Index de théorie

Corpus complet et parcourable. Anneau 1, atteignable **par la recherche uniquement** — jamais par un onglet (`D-02`).

| Décisionnelle | Passive |
|---|---|
| Hiérarchie des notions (`D-16`) | Résumé de la notion survolée ou sélectionnée |
| | Progression sur le corpus |

`D-16` impose une vraie hiérarchie, pas une liste plate. Sa forme reste à définir.

### 6.2 Recherche

Seul chemin vers l'index. Requête vide, sans résultat et avec résultats sont trois états distincts, chacun avec une action (`01-ux-principes.md` §7).

Une requête sans résultat **conserve la requête** et propose le retrait des filtres — elle ne vide jamais le champ.

### 6.3 Réglages

Anneau 4. Compte, confidentialité, données.

**`Q-11` est résolue par `D-35` :** la bascule de thème n'attend pas cet écran. Elle vit dans le chrome permanent dès la V0, comme premier accès d'anneau 4 (`03-navigation.md` §3). L'écran de réglages reste hors V0 (`D-22`) et n'en est plus le préalable.

### 6.4 Exercice appliqué

`D-01` en fait le climax de la boucle. `D-22` le repousse hors V0, et `D-08` interdit tout champ de saisie libre avant l'arrivée du modèle.

Emplacements réservés : `ChampLibre` et `SortieModele` dans la colonne décisionnelle (`05-composants.md` §12). Le gabarit reste à concevoir — sa forme dépend de la nature retenue pour l'exercice, non tranchée.

---

## 7. États transverses

### 7.1 La V0 a très peu de surface d'échec, et c'est une conséquence de D-20 et D-22

`D-20` met le contenu en MDX versionné, rendu au build. `D-22` exclut compte, serveur et recherche. Conséquence directe : **il n'y a presque rien à charger, donc presque rien qui puisse échouer.**

| État | En V0 |
|---|---|
| Chargement de contenu | **Aucun.** Les questions sont rendues au build |
| Liste vide | **Aucune.** Pas de liste, pas de recherche |
| Latence de modèle | **Aucune.** Pas d'appel de modèle (`D-08`) |
| Erreur réseau après chargement | **Aucune.** Contenu statique |

C'est un bénéfice qu'il faut voir : la V0 n'a pas à spécifier la moitié des états d'une application ordinaire. Ne pas les inventer par réflexe.

### 7.2 Les trois échecs réels de la V0

Nommés parce qu'ils sont les seuls, donc les seuls à traiter.

| Échec | Cause | Comportement |
|---|---|---|
| Stockage indisponible | Navigation privée, stockage refusé | La session fonctionne, la reprise non. **Le dire une fois, sobrement**, sans bloquer ni répéter |
| Progression illisible | Donnée corrompue, format changé | Repartir du début sans message d'erreur technique. Ne jamais afficher un état incohérent |
| URL de question inconnue | Lien obsolète, saisie manuelle | Rediriger vers la question en cours, sans page d'erreur |

Aucun de ces trois cas ne justifie une page d'erreur pleine. Tous sont récupérables sans perte, ce qu'exige `01-ux-principes.md` §6.

### 7.3 Hors ligne

Contenu statique et progression locale : **la V0 fonctionne hors ligne** une fois la page chargée. Aucun indicateur de connexion, aucun message. Une fonctionnalité gratuite qu'il suffit de ne pas casser.

### 7.4 Mouvement réduit

Tout écran respecte `prefers-reduced-motion` : `D-34` fait tomber `--motion-duration` à `1ms`. Le mouvement disparaît, **l'état d'arrivée reste** — aucun contenu ne dépend d'une transition pour apparaître.

---

## 8. Contrôle avant de livrer un écran

**Structure**

- [ ] La décision unique de l'écran est nommable en une phrase.
- [ ] Exactement un P0, dans la colonne décisionnelle.
- [ ] La position du P0 est la même que sur les écrans du même type.
- [ ] La colonne passive ne contient aucune action P0 ni P1.
- [ ] La colonne passive n'est jamais vide.

**Comportement**

- [ ] L'énoncé ne se décale entre aucun état.
- [ ] Chaque état de la §4.2 est implémenté, y compris l'état A sans sélection.
- [ ] `Échap` ne détruit rien.
- [ ] Un rechargement restaure un état équivalent.
- [ ] Les trois échecs de la §7.2 sont traités.

**Largeurs**

- [ ] Vérifié aux trois régimes de `D-28`.
- [ ] Sous 1024 px, le panneau passe au-dessus, pas en dessous.
- [ ] Aucun contenu ne disparaît en régime resserré.

**Thèmes et accessibilité**

- [ ] Vérifié dans les deux thèmes, réellement (`D-24`).
- [ ] Parcours clavier complet et ordonné.
- [ ] Aucune information portée par la couleur seule.
- [ ] Le contenu de panneau fermé est absent de l'arbre d'accessibilité.

**Contenu**

- [ ] Les libellés nomment un résultat, pas un mécanisme.
- [ ] Aucun ton culpabilisant ni triomphaliste.
- [ ] Aucun élément promotionnel.

---

## 9. Ce qui reste à trancher

| Réf | Sujet |
|---|---|
| `D-34` | Quelles transitions existent entre les états de la §4.2 — la paire durée/easing est arrêtée, son emploi ne l'est pas |
| `D-13` | Raccourci clavier du déclencheur `Indice` |
| — | Nombre de questions du parcours : détermine si le récapitulatif de fin défile |
| — | Forme de l'exercice appliqué, donc son gabarit (§6.4) |

---

## Journal du document

| Date | Modification |
|---|---|
| 2026-07-30 | Création. Débloqué par `D-28` (régimes de largeur) et `D-29` (le clic sélectionne). Tous les gabarits, V0 et au-delà. Ouvre `Q-11` : la bascule de thème n'a pas de domicile en V0. |
| 2026-07-30 | `Q-11` résolue par `D-35` (§6.3). Mouvement réduit précisé par `D-34` (§7.4). Le `Marqueur` n'est plus `[AV]` (`D-33`). |
