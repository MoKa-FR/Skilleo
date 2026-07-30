# 09 — Contenu

> Périmètre : la forme du contenu éditorial — unités, fichiers, champs, contraintes de
> rédaction, charte de style, validation à la construction.
> Ce document ne dit pas **quelle matière** enseigner. Il dit **dans quelle forme** elle
> entre, et **selon quelles règles** elle s'écrit. Le choix des sujets relève de
> Mohamed (`D-22`).
> Aucun gabarit d'écran ici (voir `06-ecrans.md`), aucune valeur de token
> (voir [`tokens/tokens.css`](./tokens/tokens.css)).

**Ce document n'est pas soumis à la charte qu'il énonce.** `D-42` limite la charte de style au
contenu de formation et **exempte `docs/` explicitement**. Aucun agent ne doit réécrire la
documentation au nom du §7bis.

---

## Table des matières

- [1. Pourquoi ce document existe](#1-pourquoi-ce-document-existe)
- [2. Les quatre unités](#2-les-quatre-unités)
- [3. Arborescence](#3-arborescence)
- [4. Contrat de la question](#4-contrat-de-la-question)
- [5. Contrat de la notion](#5-contrat-de-la-notion)
- [6. Contrat du parcours](#6-contrat-du-parcours)
- [6bis. Contrat du module source](#6bis-contrat-du-module-source)
- [7. Contraintes de rédaction](#7-contraintes-de-rédaction)
- [7bis. Charte de style](#7bis-charte-de-style)
- [7ter. Fidélité factuelle](#7ter-fidélité-factuelle)
- [7quater. Progression pédagogique](#7quater-progression-pédagogique)
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

## 2. Les quatre unités

| Unité | Ce que c'est | Publiée ? | Multiplicité |
|---|---|---|---|
| **Module source** | Le corpus expert complet sur un sujet, long et sourcé | **Jamais** (`D-41`) | Plusieurs |
| **Parcours** | Une séquence ordonnée de questions, avec un début et un terme | Oui | Un seul en V0 (`D-21`) |
| **Question** | Un énoncé, ses options, son indice, son retour | Oui | Plusieurs par parcours |
| **Notion** | Le résumé théorique de `D-16` niveau 1 | Oui | Partagée entre questions (`D-37`) |

**Cinq règles de rapport, non négociables.**

1. Une question désigne **exactement une** notion (`D-37`). Ni zéro, ni deux.
2. Une notion peut être désignée par **autant de questions** qu'on veut, et n'est écrite qu'une fois.
3. Le parcours **ordonne** les questions ; il ne les contient pas. L'ordre est une propriété du
   parcours, pas de la question (`D-32`). Déplacer une question ne la modifie pas.
4. Toute question et toute notion **désigne le module source dont elle est extraite** (`D-41`).
   Une unité sans source déclarée est un défaut de rédaction, au même titre qu'une valeur non
   marquée dans la documentation.
5. Le module source **ne s'affiche nulle part**. Ce n'est pas un écran, c'est de la matière.

**Ce que ces règles achètent.** La troisième est celle qu'on oublie : si le rang vivait dans la
question, réordonner le parcours modifierait chaque fichier, et l'identité d'une question
dépendrait de sa position — ce que `D-30` interdit explicitement.

### 2.1 Pourquoi le module source existe

`D-16` définissait deux niveaux de profondeur ; `D-41` en ajoute un en amont :

| Niveau | Objet | Où il apparaît |
|---|---|---|
| **0** | Module source | Nulle part |
| **1** | Résumé de notion | Colonne passive, sans défilement |
| **2** | Page complète de notion | Hors V0 (`D-22`) |

La raison tient en une phrase : **on ne source pas une phrase de dix mots.** Le §7ter exige que
chaque chiffre remonte à une source vérifiable ; sans un endroit où l'expertise est établie et
vérifiée une fois, cette exigence n'a nulle part où s'appliquer. Le module permet aux unités
publiées d'être courtes sans être creuses, et porte le *pourquoi* d'une question, que l'écran n'a
pas la place de dire.

Le niveau 2 **se rédige, il ne se découpe pas** depuis le niveau 0. Un module découpé en pages
donne des pages qui se lisent mal isolément, parce qu'elles ont été écrites pour être lues dans
l'ordre.

**La V0 n'emploiera qu'une fraction de chaque module.** C'est voulu, pas gaspillé : le surplus
sert les parcours suivants sans être réécrit.

---

## 3. Arborescence

```
content/
  sources/
    s-mise-en-contexte.mdx
    s-skills-de-claude.mdx
    …
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

**`sources/` est dans le dépôt malgré son statut non publié**, et `D-41` en donne la raison : une
source qui vit ailleurs peut changer sans que rien ne le signale, et la traçabilité de la règle 4
du §2 devient une déclaration invérifiable. Une question et la source dont elle sort doivent être
relisibles dans le même `diff`.

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
source: s-mise-en-contexte#hallucination

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
| `source` | oui | Module source et repère de passage (`D-41`). Forme `identifiant#ancre` |
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
source: s-mise-en-contexte#hallucination
---

Un modèle de langage produit la suite de mots la plus probable. Rien, dans son
fonctionnement, ne distingue une suite vraie d'une suite vraisemblable.

Une hallucination n'est donc pas une panne. C'est le comportement normal du modèle,
observé sur un cas où le vraisemblable et le vrai divergent.
```

| Champ | Obligatoire | Rôle |
|---|---|---|
| `id` | oui | Cible des références `notion:` des questions |
| `titre` | oui | En-tête du panneau. Un groupe nominal, pas une phrase |
| `source` | oui | Module source et repère de passage (`D-41`) |
| *corps* | oui | Le résumé de `D-16` niveau 1 |

**Contrainte de forme, qui vient de `D-16` :** le résumé **tient sans défiler** dans la colonne
passive. C'est une contrainte de rédaction, pas d'affichage — on n'ajoute pas de défilement pour
absorber un résumé trop long, on raccourcit le résumé.

**Mise en forme admise dans le corps :** paragraphes, énumération à puces, code en ligne.
**Interdits :** titres de section, images, liens sortants, tableaux — un résumé qui demande une
de ces choses est une page complète, donc `D-16` niveau 2, donc hors V0 (`D-22`).

**Le gras est exclu du corps** par la charte du §7bis, et l'exemple ci-dessus a été écrit sans.
Ce n'est pas une perte : `D-11` fait du paragraphe à deux tons un composant de premier rang, et
c'est **lui** qui porte l'emphase dans le rendu. Un gras écrit dans le MDX entrerait en
concurrence avec ce mécanisme, en moins bien, puisqu'il ne tient que sur un niveau de lecture.

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

## 6bis. Contrat du module source

```mdx
---
id: s-mise-en-contexte
titre: La mise en contexte
fil: mise-en-contexte
sources_externes:
  - Fichier de définition lu dans l'environnement, chemin et date
  - Documentation publique, URL et date de consultation
---

## Ce que le modèle voit quand il répond   {#fenetre}

…

## L'hallucination   {#hallucination}

…
```

| Champ | Obligatoire | Rôle |
|---|---|---|
| `id` | oui | Cible des références `source:` des questions et des notions |
| `titre` | oui | Nom du module |
| `fil` | oui | Le fil conducteur auquel il se rattache (§7quater) |
| `sources_externes` | oui | D'où vient la matière. Applique `D-43` |
| *corps* | oui | Le développement, en sections ancrées |

**Les ancres de section sont le point technique du contrat.** Une question écrit
`source: s-mise-en-contexte#hallucination`. Sans ancre explicite et stable, la référence
désignerait le module entier, ce qui ne vaut pas mieux que rien : sur un module long, « c'est
quelque part là-dedans » n'est pas une traçabilité.

**Le module n'a aucune limite de longueur**, contrairement à toutes les autres unités du §7. Il
n'entre dans aucun gabarit, donc aucune géométrie ne le contraint. C'est le seul endroit du
contenu où l'on peut développer.

**Ce que le contrat interdit :** un module rendu à l'écran, même partiellement ; un module sans
`sources_externes` ; une section sans ancre ; un module hors de `content/sources/`.

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

## 7bis. Charte de style

`D-42`. **Opposable :** un contenu qui la viole se corrige, il ne se discute pas.

**Périmètre :** énoncés, options, indices, retours, résumés de notions, modules sources.
**Pas `docs/`**, exempté explicitement.

**Origine.** Ces règles sortent d'un audit du skill `humanizer` sur un premier jet réel. Ce sont
des défauts constatés sur notre propre production, pas des préférences théoriques.

### 7bis.1 Les interdits de forme

| Interdit | Pourquoi |
|---|---|
| Tiret cadratin et demi-cadratin | Le marqueur d'écriture machine le plus fiable. On remplace par un point, une virgule, deux-points ou une parenthèse |
| Liste à en-tête gras suivi de deux-points | Le format qui fait immédiatement « sortie de chatbot ». On écrit en prose, ou en liste simple |
| Gras décoratif | Avec parcimonie, voire pas du tout. Le module de référence n'en contient aucun et se lit très bien |
| Emoji | Sans exception |
| Guillemets courbes | Sans exception |
| Groupe de trois systématique | Le rythme ternaire répété est un tic, pas une structure |
| Phrase-punchline, annonce théâtrale | « Le point que tout le monde rate », « voyons maintenant » |
| Rythme uniforme | Varier la longueur des phrases. Le milieu de gamme constant est un tell |

### 7bis.2 Vocabulaire proscrit

`incontournable`, `riche`, `au cœur de`, `paysage`, `robuste`, `souligner`,
`mettre en lumière`, `témoignage de`.

### 7bis.3 Ce que l'interdiction du gras ne coûte pas

Rien, et c'est le point. `D-11` fait du paragraphe à deux tons un composant de premier rang :
l'emphase Skilleo se fait par le **ton**, pas par la graisse. La charte retire un outil que le
système avait déjà remplacé par un meilleur, qui tient sur deux niveaux de lecture au lieu d'un.

### 7bis.4 Les tics constatés sur le premier jet

Utiles à connaître parce que ce sont ceux qui reviendront : tirets cadratins sur presque chaque
paragraphe, listes à en-tête gras sur toutes les sections, gras décoratif toutes les trois
lignes, un emoji d'alerte, des annonces théâtrales, des phrases conçues comme des punchlines.

---

## 7ter. Fidélité factuelle

`D-43`. **Aucun chiffre, aucun nom, aucune date qui ne provienne d'une source vérifiable.**

**Quand un chiffre rendrait la phrase plus convaincante mais n'existe pas, on écrit la phrase
sans chiffre.**

### 7ter.1 Pourquoi la règle est plus dure ici qu'ailleurs

Une erreur dans `docs/` gêne trois personnes qui la corrigent. Une erreur dans un contenu de
formation est enseignée, retenue, puis répétée par ceux qui l'ont apprise. **Le contenu est le
seul endroit du projet où une erreur se propage toute seule.**

### 7ter.2 Ce que l'audit a réellement trouvé

Sur un premier jet, trois défauts, tous plausibles, et c'est précisément ce qui les rendait
dangereux :

- deux fabrications pures, un taux d'échec et un volume de traitement, aucun des deux n'existant
  nulle part ;
- une infidélité à la source, un nombre de requêtes de test annoncé sans correspondre à ce que
  la documentation dit.

Les sources réellement employées pour ce module ont été les fichiers de définition lus dans
l'environnement, pas la mémoire du rédacteur. C'est le standard, et c'est ce que consigne le
champ `sources_externes` du §6bis.

### 7ter.3 Un exemple inventé se présente comme tel

Un exemple pédagogique n'a pas besoin d'être réel. Il a besoin de ne pas se faire passer pour
réel.

---

## 7quater. Progression pédagogique

`D-44`. **Contextualiser, puis vulgariser, puis détailler, puis aller vers l'ingénierie.**
Jamais l'inverse, jamais un saut.

### 7quater.1 La règle négative est la partie utile

**On n'entre jamais par la syntaxe.** Un apprenant qui voit la forme d'un fichier avant d'avoir
compris à quoi elle répond a mémorisé une recette. Il saura la reproduire, pas la transposer, ce
qui est exactement l'échec que Skilleo existe pour éviter (`00-produit.md`).

### 7quater.2 Chaque module se rattache à un fil conducteur

C'est le rôle du champ `fil` du §6bis. Sur le corpus IA, ce fil est la **mise en contexte** : un
modèle ne travaille qu'à partir de ce qui se trouve dans sa fenêtre au moment où il répond. Il
n'a pas de mémoire persistante, pas d'accès spontané aux fichiers, aucune connaissance de
l'entreprise. Cette fenêtre est donc la seule variable que l'utilisateur contrôle réellement, et
tous les objets de l'écosystème sont des réponses différentes à cette même question.

Un module qui ne se rattache à rien produit des connaissances isolées, donc inutilisables.

### 7quater.3 La grille des quatre questions

Outil de diagnostic réutilisable, dérivé du fil. Devant un mécanisme, ou devant un besoin :

| Question | Ce qu'elle établit |
|---|---|
| **Quoi** | Quelle information est injectée |
| **Quand** | Toujours, ou sous condition |
| **Où** | Quelle portée |
| **Pour qui** | L'assistant principal, ou un exécutant secondaire |

Son intérêt est de transformer une question de conception en réflexe, sans rien à mémoriser.

---

## 8. Validation à la construction

Le contenu est vérifié au `build`. **Une violation arrête la construction ; elle ne dégrade
jamais l'affichage.** C'est la règle numéro un appliquée au contenu : un manque s'arrête et se
signale, il ne se comble pas silencieusement.

| Vérification | Motif |
|---|---|
| Tout `notion:` cible une notion existante | `D-37` |
| Tout `source:` cible un module et une ancre existants | `D-41`, §6bis |
| Tout `id` de question est unique dans `content/` | `D-31` — collision = journal corrompu |
| Tout `id` d'option est unique dans sa question | `D-31` |
| Exactement une option `juste: true` | §4.2 |
| Entre 2 et 4 options | §4.2 |
| Tous les champs obligatoires présents et non vides | §4.1, §5, §6bis |
| Toute question du parcours existe | §6 |
| Toute limite du §7 respectée | §7 |
| Toute question de `content/` figure dans un parcours | Une question orpheline est une rédaction perdue, pas un choix |
| Les cinq compteurs de la charte sont à zéro | §7bis, §10.1 |

Ces vérifications sont écrites une fois et ne changent pas : elles décrivent le contrat, et le
contrat est ce document.

**Les compteurs de la charte sont vérifiés au `build` comme le reste.** Une charte opposable
(`D-42`) qui ne serait contrôlée que par une relecture humaine n'est pas opposable, c'est un
souhait. L'ancre d'une référence `source:` est vérifiée par la même occasion — une ancre brisée
casse la traçabilité de `D-43` sans rien changer à l'écran, donc rien ne la signalerait autrement.

---

## 9. Projection en tables

`D-30` rend la migration vers une base **certaine**. Le schéma ci-dessus s'y projette sans
réécriture éditoriale :

| Fichier | Table | Clé |
|---|---|---|
| `sources/*.mdx` | `module_source` | `id` |
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

Deux passes. Aucun contenu ne part sans les deux.

### 10.1 Passe mécanique

Compter dans le fichier. Cinq compteurs, **tous doivent être à zéro** :

| Compteur | Attendu |
|---|---|
| Tirets cadratins et demi-cadratins | 0 |
| Emojis | 0 |
| Guillemets courbes | 0 |
| Occurrences de gras | 0 |
| Listes à en-tête gras | 0 |

Ça prend dix secondes et ça évite de publier un contenu de formation qui contredit sa propre
charte. Le module de référence est ressorti à zéro sur les cinq compteurs. Le §8 l'automatise ;
la passe manuelle reste utile pendant la rédaction, avant de lancer une construction.

### 10.2 Passe de fond

- [ ] Chaque chiffre, nom et date remonte à une source vérifiable (§7ter).
- [ ] Le contenu ne s'ouvre pas sur de la syntaxe (§7quater.1).
- [ ] Le module dont la question est extraite se rattache à un fil (§7quater.2).
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
| — | La liste des modules sources n'est pas arrêtée. Candidats dans l'ordre de dépendance : la mise en contexte comme module fondateur, la mémoire de projet, les connecteurs, les agents, les plugins, l'ingénierie d'évaluation |
| `D-36` | Le retour par option est exclu de la V0, pas du produit. À réexaminer quand les sessions observées de `D-40` auront livré leurs résultats |

**Ce qui a cessé d'être ouvert.** `Q-09` est tranchée par `D-40` : la V0 s'évalue en sessions
observées, sans aucun instrument de mesure. Aucun champ ne s'ajoute au contenu ni au journal
pour la mesure.

**Le sujet du parcours V0 reste « Premiers pas avec l'IA » (`D-21`).** Le module « Les Skills de
Claude », produit hors dépôt, était une démonstration de méthode. Il garde sa valeur comme
module source futur, pas comme contenu de V0 : c'est un sujet avancé, et la V0 s'adresse à des
débutants.

---

## Journal du document

| Date | Modification |
|---|---|
| 2026-07-30 | Création. Rendu possible par `D-36` (retour unique) et `D-37` (notion partagée), contraint par `D-30` (projection en tables) et `D-32` (séquence fixe). Ouvre `D-38` sur le partage YAML/MDX. |
| 2026-07-30 | Enrichi depuis une session de production menée hors dépôt, arbitrée en `D-41` à `D-44`. Ajouts : le module source comme quatrième unité et niveau 0 non publié (§2.1, §6bis), le champ `source` sur les questions et les notions, la charte de style opposable (§7bis), la fidélité factuelle (§7ter), la progression pédagogique et le fil conducteur (§7quater), la passe mécanique à cinq compteurs (§10.1). Correction : l'exemple de notion du §5 employait du gras, que la charte exclut. |
