# 04 — Tokens

> Périmètre : **pourquoi** les tokens valent ce qu'ils valent, et sous quelles règles on les emploie.
> Ce document ne contient **aucune valeur chiffrée** — `D-27`.

---

## Table des matières

- [Où trouver quoi](#où-trouver-quoi)
- [1. Provenance et fiabilité](#1-provenance-et-fiabilité)
- [2. Couleur](#2-couleur)
- [3. Typographie](#3-typographie)
- [4. Espacement et colonnes](#4-espacement-et-colonnes)
- [5. Hauteur de contrôle](#5-hauteur-de-contrôle)
- [6. Rayons](#6-rayons)
- [7. Ombres — il n'y en a pas](#7-ombres--il-ny-en-a-pas)
- [8. Anneau de focus](#8-anneau-de-focus)
- [9. Mouvement](#9-mouvement)
- [10. Ce qui manque et ce qu'il faut valider](#10-ce-qui-manque-et-ce-quil-faut-valider)

---

## Où trouver quoi

`D-27` sépare strictement trois choses. Chaque valeur n'existe qu'une fois.

| Vous cherchez | Fichier |
|---|---|
| Une **valeur applicable** | [`tokens/tokens.css`](./tokens/tokens.css) — canonique, consommé par le code |
| Une **mesure** faite sur la référence | [`references/trade-republic-web.md`](./references/trade-republic-web.md) |
| **Pourquoi** cette valeur, et comment l'employer | Ce document |

Toute valeur littérale dans un composant est un défaut, même si elle est juste (`D-24`).

---

## 1. Provenance et fiabilité

Chaque token porte un marqueur dans `tokens.css` :

| Marqueur | Signification |
|---|---|
| `[M]` | Mesuré sur les captures conservées, méthode dans `references/trade-republic-web.md` §2 |
| `[D]` | Déduit d'une mesure, raisonnement donné |
| `[P]` | Choix Skilleo, aucune prétention à refléter la référence |
| `[AV]` | À valider — **ne pas implémenter** |

**Avertissement qui vaut pour tous les `[M]`.** Ils reposent sur la normalisation `DPR 2 / viewport 1469 px CSS`, elle-même `[D]` : cohérente sur trois éléments indépendants, mais non confirmée. C'est `Q-01` point 4. Si elle est fausse, **toutes les valeurs en px sont fausses d'un facteur constant** — les ratios, eux, restent justes.

**Ce que les intrants ne donnent pas du tout :** aucune hauteur de contrôle, aucun rayon de contrôle, aucun état de survol ou de focus, aucune ombre en contexte applicatif, aucune valeur de mouvement. Ces familles sont intégralement `[P]`. Détail au §10.

---

## 2. Couleur

`D-24` impose deux thèmes actifs, clair par défaut.

### 2.1 Les trois règles

**1. Le noir et le blanc sont purs.** Jamais teintés, jamais adoucis en gris très clair ou très foncé. C'est le marqueur le plus fort de la grammaire, et le premier qu'on perd sans y penser.

**2. Il y a deux gris de texte, pour deux rôles qu'il ne faut jamais confondre.**

| Token | Rôle | Employé pour |
|---|---|---|
| `--text-secondary` | Contenu qu'on **veut** faire lire | La suite grise d'un paragraphe à deux tons |
| `--text-tertiary` | État inactif qu'on ne veut **pas** faire lire | Option non retenue, ligne `Indice` au repos |

Les employer l'un pour l'autre détruit la hiérarchie. C'est l'erreur la plus facile à commettre du système.

**3. Le thème sombre n'est pas une inversion.** Les deux gris secondaires sont des choix distincts, chacun calibré pour son fond. Générer le thème sombre en inversant les valeurs du clair donnerait un résultat faux. Les deux palettes ont été observées séparément sur les intrants.

### 2.2 Le marqueur sémantique — le seul écart délibéré à la référence

Aucune couleur d'accent n'apparaît sur les intrants. La référence neutralise même ce qui devrait l'être : la variation `▲ 24,15 %` de sa carte produit est en noir.

Mais Skilleo doit qualifier une réponse, et c'est le signal le plus répété de tout le produit. `D-26` arrête le compromis : **la couleur se limite à un marqueur — une icône, un point. Le texte et les fonds restent monochromes.**

Trois contraintes fermes :

- **Jamais la couleur seule.** Juste ou faux se lit aussi dans le symbole et dans le texte. La couleur **confirme**, elle n'informe pas. Un utilisateur daltonien perd zéro information (`01-ux-principes.md` §8).
- **Jamais décorative.** Ces valeurs ne qualifient qu'une réponse. Aucune extension à un état de succès générique.
- **Jamais sur une surface.** Pas de fond coloré, pas de bordure colorée, pas de bandeau.

`D-33` arrête les deux valeurs, et pose qu'**une seule paire sert dans les deux thèmes**. Le raisonnement est là : le marqueur n'étant jamais du texte, le seuil applicable est celui des éléments non textuels, franchi sur fond blanc comme sur fond noir. Dédoubler aurait ajouté deux valeurs à maintenir sans rien résoudre. Les rapports calculés sont dans `D-33` et en commentaire de `tokens.css`.

---

## 3. Typographie

### 3.1 La famille n'est pas décidée

`[AV]` La police de la référence n'est **pas identifiable de façon fiable** sur les intrants — un grotesque néo-classique, sans plus de précision. `tokens.css` ne porte donc qu'une pile de secours système.

Deux rappels. La signature typographique de la référence vient de **l'interligne et de la graisse**, pas du dessin des lettres : le §3.2 la reproduit sans connaître la police. Et reproduire une grammaire visuelle est licite, redistribuer un fichier de police sous licence ne l'est pas.

### 3.2 Deux régimes d'interligne opposés

**C'est l'observation qui structure toute la typographie du produit :** le grand texte est serré, le petit texte est aéré.

| Registre | Ratio interligne/taille |
|---|---|
| Titre | inférieur à 1 — les lignes se touchent presque |
| Corps | environ 1,45 — respiration normale |

Les deux ratios sont `[M]`. La bascule se fait autour de 24 px de taille de police.

**Un système appliquant un ratio unique — même 1,2 — raterait la signature dans les deux sens :** titres mous, corps illisible. C'est l'erreur la plus probable si quelqu'un reprend l'échelle sans avoir lu cette section.

Les tailles de l'échelle Skilleo sont volontairement **plus petites** que celles de la référence, dont les titres de section dépassent 70 px. Une page promotionnelle crie ; un outil de pratique ne crie pas. Ce sont les **ratios** qui sont repris, pas les tailles. Seul `--type-body` reprend exactement le couple mesuré, taille et interligne.

### 3.3 Deux graisses, pas plus

Aucune graisse intermédiaire. La référence n'en montre aucune, et un système à deux graisses est beaucoup plus difficile à rendre incohérent.

### 3.4 Le paragraphe à deux tons

`D-11` en fait un composant de premier rang. Sa spécification typographique tient en une phrase, et le piège compte :

**Les deux tons ont la même taille, la même graisse et le même interligne. Seule la couleur change.**

`[D]` Les deux tons paraissent de graisse identique sur les intrants. Ajouter un changement de graisse en plus de la couleur casserait l'effet : le regard doit accrocher un contraste de **valeur**, pas d'épaisseur.

### 3.5 Chiffres

Toute valeur numérique qui change sur place — compteur de progression, score — emploie des chiffres tabulaires, pour que sa largeur ne bouge pas à chaque incrément. Classe utilitaire fournie dans `tokens.css`.

---

## 4. Espacement et colonnes

### 4.1 La gouttière est minuscule, et c'est contre-intuitif

`--gutter` représente **1,1 % de la largeur du viewport de référence**. Le contenu touche presque le bord de l'écran.

C'est l'inverse de l'intuition, et l'inverse de ce que prétendait le rapport de ChatGPT, qui décrivait des « marges latérales inhabituellement généreuses ». Sur mobile, c'est probablement vrai. **Sur desktop, la référence fait du plein cadre.** La respiration ne vient pas des marges : elle vient du découpage en colonnes et du vide vertical.

Quiconque trouve la gouttière trop serrée doit relire cette section avant de l'augmenter.

### 4.2 L'échelle

Deux valeurs seulement sont mesurées : la gouttière et la marge de paragraphe. Le reste est une progression `[P]` construite autour d'elles, en multiples de 4.

### 4.3 Colonnes

`[M]` sur la référence : les deux colonnes ne sont **ni de largeur égale, ni jointives**. Un vide franc les sépare.

Skilleo **inverse les rôles** par rapport à la référence : chez elle la colonne large porte le texte, chez nous elle porte la décision (`D-10`, la décisionnelle est à gauche).

---

## 5. Hauteur de contrôle

`--h-control` s'applique à **tout** contrôle interactif : option de réponse, bouton, champ. Une seule valeur, aucune variante par composant.

Aucune hauteur de contrôle n'étant mesurable sur les intrants (`references/trade-republic-web.md` §4.0), c'est un choix Skilleo arrêté sur maquette comparative — `D-25`. Trois raisons :

- elle tombe sur l'échelle d'espacement, donc se compose sans valeur orpheline ;
- `--radius` en vaut exactement **un quart** — le seul rayon mesuré du projet devient une fraction simple du contrôle, relation vérifiable de tête ;
- `--type-question` reste nettement dominant, ce qu'exige la Loi 1.

Elle satisfait aussi les cibles tactiles courantes, donc le régime étroit de `D-28` n'impose pas de seconde valeur.

---

## 6. Rayons

**Une seule valeur de rayon est mesurable sur les intrants** — celle du conteneur d'image de la capture 04, dont les deux coins sont dans le cadre et donnent des profils identiques au pixel. Elle devient `--radius`, valeur par défaut de tout le système : contrôles, panneaux, conteneurs. Les autres rayons existent pour des cas particuliers et doivent se justifier.

**Rectification à connaître.** Une première passe avait consigné un rayon de bouton comme mesuré. C'était faux : la bannière cookies est coupée par le bord bas de la capture, et la région analysée mêlait le bouton, sa carte et le bord de l'image. La valeur est retirée. Détail dans `references/trade-republic-web.md` §4.0.

**Pas de pastilles partout.** `--radius-full` est réservé aux pastilles et aux marqueurs. Un bouton n'est jamais une capsule.

---

## 7. Ombres — il n'y en a pas

Aucune ombre n'apparaît sur les intrants, à deux exceptions près : la bannière cookies et la carte de téléchargement, toutes deux **flottant au-dessus du contenu**. Les conteneurs ne se distinguent pas par une ombre mais par un fond légèrement différent du canvas.

Or `D-23` supprime de Skilleo la catégorie même des surfaces flottantes : les contenus contextuels sont des panneaux en flux, pas des modales.

**Conséquence : Skilleo n'a besoin d'aucune ombre.** La profondeur se fait par contraste de surface. Toute ombre ajoutée devra se justifier contre cette section.

---

## 8. Anneau de focus

Intégralement `[P]` : la référence est tactile, elle n'a aucun état de focus (`D-12`).

**L'anneau emploie la couleur de texte primaire, pas une couleur d'accent.** Noir sur fond clair, blanc sur fond sombre. C'est le choix le plus fidèle à un système sans accent, et il fonctionne dans les deux thèmes sans valeur supplémentaire.

Contraintes, détaillées dans `02-interactions.md` §2.2 : l'anneau ne se dessine qu'au parcours clavier ; il ne pousse aucun voisin, d'où l'offset ; il est **toujours plus visible que le survol**, jamais son égal.

---

## 9. Mouvement

**Une seule paire durée/easing, et rien d'autre** (`D-34`).

Aucune valeur de mouvement n'est déductible d'une image fixe : `Q-01` reste ouverte, et le rapport de ChatGPT avait inventé l'intégralité de ses valeurs de motion. Mais l'alternative au blocage n'était pas « attendre », c'était « chaque composant invente sa durée ». Une valeur unique, assumée `[P]` et non `[D]`, coûte une ligne à réviser quand les enregistrements arriveront.

**Règle d'emploi.** Toute transition du produit emploie `--motion-duration` et `--motion-easing`. Une seconde durée est un défaut, même juste. Sous `prefers-reduced-motion`, la durée tombe à `1ms` — le mouvement disparaît, l'état d'arrivée reste.

---

## 10. Ce qui manque et ce qu'il faut valider

### 10.1 Absent des intrants — entièrement `[P]`

| Famille | Situation |
|---|---|
| Hauteur de contrôle | Comblé par `D-25`, choix Skilleo arrêté sur maquette |
| Rayon de contrôle | Repli sur `--radius`, seule valeur mesurée |
| Survol, focus, curseur | `D-12` : créations Skilleo assumées |
| Ombres | Aucune nécessaire (§7) |
| Durées, courbes | Une paire `[P]` arrêtée par `D-34` — le reste attend `Q-01` |
| Palette sombre hors texte | `--surface-subtle` et `--text-tertiary` extrapolés |

### 10.2 Marqué `[AV]` — ne pas implémenter

| Sujet | Ce qui manque |
|---|---|
| **Police** | Non identifiée sur les intrants |

Le marqueur sémantique en est sorti : `D-33` l'a arrêté.

### 10.3 Conditionne tout le reste

`Q-01` point 4 — confirmation de la largeur de fenêtre et de la densité d'écran des captures. Tant qu'elle manque, chaque valeur en px reste suspendue à une déduction.

---

## Journal du document

| Date | Modification |
|---|---|
| 2026-07-30 | Création. Deux palettes mesurées séparément (`D-24`). Échelle à deux régimes d'interligne. Rayon de référence unique. Aucune ombre. |
| 2026-07-30 | `--h-control` ajouté (`D-25`), arrêté sur maquette comparative 44/48/52. |
| 2026-07-30 | **Réécriture selon `D-27` : toutes les valeurs chiffrées sont retirées** et vivent désormais dans `tokens/tokens.css`, canonique. Ce document ne garde que le raisonnement et les règles. Marqueur sémantique limité à une icône (`D-26`). |
| 2026-07-30 | `D-33` arrête le marqueur sémantique — une seule paire pour les deux thèmes, §2.2 et §10.2 réécrits. `D-34` ouvre le §9 : une paire durée/easing, `Q-01` reste ouverte pour le reste. |
