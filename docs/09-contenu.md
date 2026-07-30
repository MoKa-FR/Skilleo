# 09 — Contenu

> Périmètre : la forme du contenu éditorial — unités, fichiers, champs, contraintes de
> rédaction, validation à la construction.
> Ce document ne dit pas **quoi** écrire. Il dit **dans quelle forme** ce qui est écrit
> doit entrer. La matière pédagogique elle-même relève de Mohamed (`D-22`).
> Aucun gabarit d'écran ici (voir `06-ecrans.md`), aucune valeur de token
> (voir [`tokens/tokens.css`](./tokens/tokens.css)).

---

## Table des matières

- [1. Pourquoi ce document existe](#1-pourquoi-ce-document-existe)
- [2. Les trois unités](#2-les-trois-unités)
- [3. Arborescence](#3-arborescence)
- [4. Contrat de la question](#4-contrat-de-la-question)
- [5. Contrat de la notion](#5-contrat-de-la-notion)
- [6. Contrat du parcours](#6-contrat-du-parcours)
- [7. Contraintes de rédaction](#7-contraintes-de-rédaction)
- [8. Validation à la construction](#8-validation-à-la-construction)
- [9. Projection en tables](#9-projection-en-tables)
- [10. Contrôle avant de livrer une question](#10-contrôle-avant-de-livrer-une-question)
- [11. Ce qui reste à trancher](#11-ce-qui-reste-à-trancher)

---

## 1. Pourquoi ce document existe

Deux raisons, et la seconde est la plus importante.

**Sans contrat, l'implémenteur invente.** Un composant de question a besoin de savoir combien
d'options il reçoit, si l'une est nécessairement juste, d'où vient l'indice. En l'absence de
réponse écrite, il choisit — et son choix devient de fait la spécification.

**Sans contrat, la rédaction ne peut pas commencer.** `D-22` établit que la rédaction est le
goulot d'étranglement du projet, pas le code. Écrire trente questions puis découvrir qu'il
manque un champ à chacune coûte plus cher que tout le développement de la V0.

Ce document est donc écrit **avant** la première question rédigée et **avant** la première
ligne du composant.

---

## 2. Les trois unités

| Unité | Ce que c'est | Multiplicité |
|---|---|---|
| **Parcours** | Une séquence ordonnée de questions, avec un début et un terme | Un seul en V0 (`D-21`) |
| **Question** | Un énoncé, ses options, son indice, son retour | Plusieurs par parcours |
| **Notion** | Le résumé théorique de `D-16` niveau 1 | Partagée entre questions (`D-37`) |

**Trois règles de rapport, non négociables.**

1. Une question désigne **exactement une** notion (`D-37`). Ni zéro, ni deux.
2. Une notion peut être désignée par **autant de questions** qu'on veut, et n'est écrite qu'une fois.
3. Le parcours **ordonne** les questions ; il ne les contient pas. L'ordre est une propriété du
   parcours, pas de la question (`D-32`). Déplacer une question ne la modifie pas.

**Ce que ces règles achètent.** La troisième est celle qu'on oublie : si le rang vivait dans la
question, réordonner le parcours modifierait chaque fichier, et l'identité d'une question
dépendrait de sa position — ce que `D-30` interdit explicitement.

---

## 3. Arborescence

```
content/
  parcours/
    premiers-pas-avec-l-ia.yaml
  questions/
    q-hallucination-definition.yaml
    q-prompt-contexte.yaml
    …
  notions/
    n-hallucination.mdx
    n-fenetre-de-contexte.mdx
    …
```

**Deux formats, et la frontière a une raison.** Une question ne contient aucune prose demandant
une mise en forme : chacun de ses textes est une phrase courte, sans titre, sans liste, sans
lien. C'est de la donnée structurée, et le YAML la montre telle quelle. Une notion, elle, est de
la prose — elle peut porter de l'emphase, un exemple, une énumération. Elle est en MDX
(`D-38`).

**Le nom de fichier ne porte aucune information.** Il vaut par convention l'identifiant, pour la
lisibilité d'un `git diff` ; l'identifiant qui fait foi est celui écrit **dans** le fichier
(`D-30`). Renommer un fichier sans toucher son champ `id` ne change rien pour le produit — et
c'est voulu.

**Emplacement.** `content/` est à la racine du dépôt, hors de `src/`. Le contenu n'est pas du
code : il est relu, corrigé et complété par quelqu'un qui n'ouvre pas `src/`.

---

## 4. Contrat de la question

```yaml
id: q-hallucination-definition
notion: n-hallucination

enonce: >-
  Un modèle affirme avec assurance une date historique fausse.
  Comment appelle-t-on ce comportement ?

options:
  - id: a
    texte: Une hallucination
    juste: true
  - id: b
    texte: Un biais d'entraînement
  - id: c
    texte: Une fuite de données

indice: >-
  Le mot décrit ce que le modèle produit, pas la raison pour laquelle il le produit.

retour:
  amorce: >-
    On parle d'hallucination.
  suite: >-
    Le modèle ne ment pas et ne se trompe pas au sens humain : il produit la suite
    la plus probable, et une suite probable peut être fausse.
```

### 4.1 Les champs

| Champ | Obligatoire | Rôle |
|---|---|---|
| `id` | oui | Identité stable et définitive. S'écrit dans le journal de `D-31` |
| `notion` | oui | Identifiant de la notion associée (`D-37`) |
| `enonce` | oui | Le texte du composant `Enonce` (`05-composants.md` §3) |
| `options` | oui | 2 à 4 entrées, **exactement une** portant `juste: true` |
| `options[].id` | oui | Stable à l'intérieur de la question. S'écrit dans le journal |
| `options[].texte` | oui | Le libellé de l'`Option` |
| `options[].juste` | non | Absent vaut `false`. Une seule option le porte |
| `indice` | oui | Le contenu du panneau ouvert par le déclencheur `Indice` (`D-13`) |
| `retour.amorce` | oui | L'amorce du `TexteDeuxTons` — la conclusion en une phrase |
| `retour.suite` | oui | L'explication qui suit l'amorce |

### 4.2 Ce que le contrat interdit

- **Un retour par option.** `D-36` l'exclut : le retour est unique et lu quel que soit le choix.
  Il n'existe aucun champ pour une réfutation ciblée, et en ajouter un créerait un contenu à
  deux régimes.
- **Zéro ou deux options justes.** Le produit mesure des réponses ; une question sans réponse
  juste n'est pas mesurable.
- **Un `id` réutilisé, même après suppression de la question.** Le journal de `D-31` porte des
  identifiants de questions déjà répondues : recycler un `id` réécrirait le passé d'un
  utilisateur.
- **Un rang, une difficulté, un `tag`, un compteur.** Aucun champ qui ne serve à rien en V0.
  `01-ux-principes.md` §4 s'applique au schéma comme au reste.

### 4.3 Pourquoi l'indice est obligatoire

`D-13` fait de l'indice un dispositif de premier rang, et `06-ecrans.md` G4 pose que la colonne
passive n'est jamais vide : son état de repos **est** le déclencheur `Indice`. Une question sans
indice laisserait donc un déclencheur inerte à l'écran, ou obligerait à le masquer — c'est-à-dire
à ajouter un état à un écran qui en compte quatre.

Le coût est reporté sur la rédaction, en connaissance de cause.

---

## 5. Contrat de la notion

```mdx
---
id: n-hallucination
titre: L'hallucination
---

Un modèle de langage produit la suite de mots la plus probable. Il n'a **aucun
mécanisme de vérification** : rien, dans son fonctionnement, ne distingue une suite
vraie d'une suite vraisemblable.

Une hallucination n'est donc pas une panne. C'est le comportement normal du modèle,
observé sur un cas où le vraisemblable et le vrai divergent.
```

| Champ | Obligatoire | Rôle |
|---|---|---|
| `id` | oui | Cible des références `notion:` des questions |
| `titre` | oui | En-tête du panneau. Un groupe nominal, pas une phrase |
| *corps* | oui | Le résumé de `D-16` niveau 1 |

**Contrainte de forme, qui vient de `D-16` :** le résumé **tient sans défiler** dans la colonne
passive. C'est une contrainte de rédaction, pas d'affichage — on n'ajoute pas de défilement pour
absorber un résumé trop long, on raccourcit le résumé.

**Mise en forme admise dans le corps :** paragraphes, emphase forte, énumération à puces, code
en ligne. **Interdits :** titres de section, images, liens sortants, tableaux — un résumé qui
demande une de ces choses est une page complète, donc `D-16` niveau 2, donc hors V0 (`D-22`).

Le champ pointant vers la page complète n'existe pas encore : il s'ajoutera avec elle.

---

## 6. Contrat du parcours

```yaml
id: premiers-pas-avec-l-ia
titre: Premiers pas avec l'IA
questions:
  - q-hallucination-definition
  - q-prompt-contexte
  - …
```

L'ordre de la liste **est** l'ordre du parcours (`D-32`). Il n'y a pas d'autre mécanisme, et il
n'y en aura pas en V0.

Le nombre de questions n'est pas fixé par ce document — c'est un arbitrage de Mohamed, et il
détermine directement la charge de rédaction (`D-22`, « reste ouvert »). Le contrat, lui,
fonctionne à cinq comme à cinquante.

---

## 7. Contraintes de rédaction

Ces limites sont `[PROPOSÉ]`. Elles ne sont pas décoratives : chacune protège une décision de
conception qui casserait sans elle. Elles sont **vérifiées à la construction** (§8).

| Champ | Limite | Ce qu'elle protège |
|---|---|---|
| `enonce` | ≤ 140 caractères | `05-composants.md` §3 : un seul `Enonce`, qui ne se décale jamais. Au-delà, il déborde du registre typographique de 36 px sur la colonne décisionnelle |
| `options[].texte` | ≤ 60 caractères | `05-composants.md` §4 admet deux lignes ; trois transforment le groupe d'options en pavé de lecture, et la question cesse d'être fermée |
| `indice` | 1 phrase | `D-13` : l'indice oriente, il ne résout pas. Deux phrases deviennent une explication |
| `retour.amorce` | 1 phrase, ≤ 90 caractères | `06-ecrans.md` §4.2 D : l'amorce **est** la conclusion. Elle doit se lire d'un coup d'œil |
| `retour.suite` | ≤ 2 phrases | Le retour est un retour, pas un cours. La théorie a son panneau |
| corps de notion | ≤ 600 caractères | `D-16` : tient sans défiler dans la colonne passive |

### 7.1 Trois règles de ton

**Le retour ne félicite ni ne sanctionne.** Il est lu autant après une erreur qu'après une
réussite (`D-36`). « Bravo », « Raté », « Attention » sont exclus — `01-ux-principes.md` §5
interdisait déjà la célébration, la structure du contenu la rend ici impossible.

**L'indice ne contient jamais le libellé d'une option.** Sinon il ne guide pas, il désigne.

**L'énoncé pose une question.** Pas un titre, pas une affirmation à compléter, pas un préambule
suivi d'une question. Une phrase, un point d'interrogation.

---

## 8. Validation à la construction

Le contenu est vérifié au `build`. **Une violation arrête la construction ; elle ne dégrade
jamais l'affichage.** C'est la règle numéro un appliquée au contenu : un manque s'arrête et se
signale, il ne se comble pas silencieusement.

| Vérification | Motif |
|---|---|
| Tout `notion:` cible une notion existante | `D-37` |
| Tout `id` de question est unique dans `content/` | `D-31` — collision = journal corrompu |
| Tout `id` d'option est unique dans sa question | `D-31` |
| Exactement une option `juste: true` | §4.2 |
| Entre 2 et 4 options | §4.2 |
| Tous les champs obligatoires présents et non vides | §4.1, §5 |
| Toute question du parcours existe | §6 |
| Toute limite du §7 respectée | §7 |
| Toute question de `content/` figure dans un parcours | Une question orpheline est une rédaction perdue, pas un choix |

Ces vérifications sont écrites une fois et ne changent pas : elles décrivent le contrat, et le
contrat est ce document.

---

## 9. Projection en tables

`D-30` rend la migration vers une base **certaine**. Le schéma ci-dessus s'y projette sans
réécriture éditoriale :

| Fichier | Table | Clé |
|---|---|---|
| `notions/*.mdx` | `notion` | `id` |
| `questions/*.yaml` | `question` + `option` | `id`, `(question_id, option_id)` |
| `parcours/*.yaml` | `parcours` + `parcours_question(rang)` | `(parcours_id, question_id)` |
| journal de `D-31` | `reponse` | `(utilisateur_id, question_id, horodatage)` |

**Ce qui rend la projection triviale**, et qui est la raison d'être des choix ci-dessus : aucune
information ne vit dans un chemin de fichier, aucune relation ne passe par un emplacement, aucun
identifiant n'est dérivé d'un rang. La migration déplace des lignes ; elle ne réinterprète rien.

**Ce qui ne se projette pas, et qu'on assume :** le corps MDX d'une notion devient une colonne de
texte. Le jour où un formateur écrira depuis une interface (`D-30`), il faudra décider ce qu'il
peut mettre en forme. Ce n'est pas une question de V0.

---

## 10. Contrôle avant de livrer une question

- [ ] L'énoncé se lit sans contexte, sans référence à la question précédente.
- [ ] Une seule option est juste, et les autres sont **plausibles** — une option manifestement
      absurde ne mesure rien.
- [ ] L'indice oriente sans nommer aucune option.
- [ ] L'amorce du retour se suffit à elle-même : lue seule, elle donne la réponse.
- [ ] La suite explique **pourquoi**, elle ne répète pas l'amorce.
- [ ] Le retour se lit correctement après une erreur **comme** après une réussite.
- [ ] La notion visée est celle que l'énoncé mobilise, pas celle qui s'en approche.
- [ ] Aucune limite du §7 n'est franchie.

---

## 11. Ce qui reste à trancher

| Réf | Sujet |
|---|---|
| — | Nombre de questions du parcours (`D-22`, reste ouvert) — n'empêche pas d'écrire les premières |
| — | Les limites du §7 sont `[PROPOSÉ]`. À confronter aux dix premières questions rédigées, et à réviser une fois, pas dix |
| `Q-09` | Ce qu'on mesure décidera peut-être d'ajouter un champ au journal, pas au contenu |
| `D-36` | Le retour par option est exclu de la V0, pas du produit. À réexaminer après `Q-09` |

---

## Journal du document

| Date | Modification |
|---|---|
| 2026-07-30 | Création. Rendu possible par `D-36` (retour unique) et `D-37` (notion partagée), contraint par `D-30` (projection en tables) et `D-32` (séquence fixe). Ouvre `D-38` sur le partage YAML/MDX. |
