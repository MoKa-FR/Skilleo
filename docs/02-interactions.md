# 02 — Interactions

> Périmètre : la grammaire de pointeur et de clavier. Comment l'utilisateur agit, et comment le produit lui répond avant même qu'il agisse.
> Ne contient aucune valeur de couleur ni de dimension (voir `04-tokens.md`), aucune durée d'animation (voir `07-motion.md`), aucun contenu d'écran (voir `06-ecrans.md`).

**Statut de marquage — à lire avant tout le reste.** Trade Republic est une application **tactile**. Elle n'offre **aucun** état de survol, de focus ou de curseur à observer. Tout ce document est donc `[PROPOSÉ]` : des créations Skilleo, conçues pour être cohérentes avec la grammaire visuelle mesurée de la référence, sans prétendre en dériver. Voir `DECISIONS.md` D-12.

C'est la partie du système qui a le moins de référence, et donc celle où l'écrit compte le plus.

---

## Table des matières

- [1. Les deux règles fondatrices](#1-les-deux-règles-fondatrices)
- [2. États d'un élément interactif](#2-états-dun-élément-interactif)
- [3. Le curseur](#3-le-curseur)
- [4. Grammaire clavier globale](#4-grammaire-clavier-globale)
- [5. Grammaire clavier du noyau : répondre](#5-grammaire-clavier-du-noyau--répondre)
- [6. Pointeur grossier et tactile](#6-pointeur-grossier-et-tactile)
- [7. Ce qui n'est pas encore tranché](#7-ce-qui-nest-pas-encore-tranché)

---

## 1. Les deux règles fondatrices

### 1.1 Parité des chemins

**Tout ce qui est atteignable à la souris est atteignable au clavier, et réciproquement.** Sans exception, y compris pour les fonctions secondaires.

Le survol peut *accélérer* ou *enrichir*. Il ne peut jamais *porter* — c'est la Loi 5 de `01-ux-principes.md`.

### 1.2 Le clavier est le mode principal du noyau

Répondre est l'action que l'utilisateur répétera des milliers de fois. Sur une application desktop, ce geste se fait au clavier. La souris est un chemin légitime et pleinement supporté, mais **le clavier n'est pas une concession d'accessibilité : c'est le parcours de référence du noyau.**

Conséquence de conception : si un geste est confortable à la souris mais pénible au clavier, c'est le geste qui est mauvais, pas le clavier.

---

## 2. États d'un élément interactif

Six états. Tout composant interactif du catalogue les définit tous — un état non défini est un défaut de spécification.

| État | Quand | Rendu `[PROPOSÉ]` |
|---|---|---|
| **Repos** | Par défaut | Le rendu nominal du composant |
| **Survol** | Curseur au-dessus | Changement de **couleur et/ou de graisse** — jamais de dimension ni de position |
| **Focus visible** | Atteint au clavier | Le rendu de survol **plus un anneau de focus** |
| **Actif** | Pendant l'appui ou le clic | Retour tactile bref, réversible instantanément |
| **Sélectionné** | Choix en cours, pas encore validé | État persistant, distinct du survol et du focus |
| **Désactivé** | Action indisponible | À éviter — voir §2.4 |

### 2.1 Le survol reprend le motif de sélecteur de la référence

La référence donne un patron directement réutilisable : sur son sélecteur de plage, l'état inactif est en gris clair et l'état actif en noir gras — **couleur et graisse seules, aucun fond, aucune bordure, aucun soulignement, aucun indicateur** (`references/trade-republic-web.md` §5.2).

C'est le modèle du survol Skilleo : `textTertiary` au repos → `textPrimary` au survol. Discret, sans encombrement, cohérent avec un système qui n'emploie presque pas d'ombres.

**Interdit au survol :** changement de dimension, déplacement, apparition d'une ombre, changement de rayon. Tout ce qui déplace un voisin est un défaut — le contenu ne bouge pas sous le curseur.

### 2.2 Le focus doit être plus fort que le survol

Le survol est ambiant : le curseur passe. Le focus est intentionnel : l'utilisateur a navigué jusque là. **Le focus est donc toujours plus visible que le survol**, jamais son égal.

- Le focus n'est **jamais** rendu par le seul changement de couleur du survol. Il porte en plus un anneau.
- L'anneau de focus n'apparaît qu'au parcours clavier (`:focus-visible`), pas au clic à la souris.
- L'anneau ne modifie pas le flux : il se dessine sans pousser aucun voisin.
- Un élément qui reçoit le focus par programme doit être visible sans défilement.

### 2.3 Survol et focus simultanés

Le focus l'emporte. Si un élément est survolé alors qu'un autre a le focus, **l'anneau de focus reste sur le second** : le survol ne déplace jamais le focus.

### 2.4 Éviter l'état désactivé

Un contrôle désactivé est peu contrasté, ne dit pas pourquoi il l'est, et n'est pas atteignable au clavier pour l'expliquer.

**Règle :** garder le contrôle actif et répondre à l'usage par une explication. On ne désactive que si l'action est réellement impossible, et alors la raison est lisible sans survol.

---

## 3. Le curseur

| Zone | Curseur |
|---|---|
| Élément déclenchant une action | `pointer` |
| Texte sélectionnable | `text` |
| Contenu inerte | `default` |
| Action en cours, non annulable | `progress` |

**Règle :** un `pointer` est une promesse. Toute zone qui l'affiche fait quelque chose au clic. Un `pointer` sur une zone inerte est un mensonge à l'utilisateur.

Inversement, **une zone cliquable ne se signale jamais par le seul curseur** — elle a un état de survol visible et est atteignable au clavier.

---

## 4. Grammaire clavier globale

| Touche | Effet |
|---|---|
| `Tab` / `Maj+Tab` | Élément interactif suivant / précédent |
| `Entrée` | Engage l'élément qui a le focus |
| `Espace` | Engage un bouton — jamais un lien |
| `Échap` | Ferme la surface la plus haute, sans rien détruire |
| Flèches | Se déplacent **à l'intérieur** d'un groupe, jamais entre groupes |

### 4.1 Ordre de tabulation

L'ordre suit la hiérarchie des actions de `01-ux-principes.md` §3, pas l'ordre du DOM si les deux diffèrent :

```text
1. Colonne décisionnelle : contenu, puis options, puis P0
2. Colonne passive : uniquement les actions P2 présentes
3. Chrome permanent
```

La colonne décisionnelle est **toujours** parcourue avant la colonne passive — cohérent avec `D-10`.

**Interdits :** un `tabindex` positif ; un piège de focus hors surface modale ; un élément interactif hors du parcours.

### 4.2 Groupes et `Tab`

Un groupe d'options est **une seule étape** de tabulation, pas une par option. On entre dans le groupe avec `Tab`, on se déplace dedans aux flèches, on en sort avec `Tab`. C'est le `tabindex` glissant.

### 4.3 `Échap`

`Échap` ferme la surface la plus haute et **rend le focus à l'élément qui l'avait ouverte**. Il ne détruit jamais un état : une réponse en cours de sélection, un texte saisi, une position de défilement survivent à la fermeture.

Si la fermeture entraînerait une perte, `Échap` demande confirmation au lieu de fermer.

---

## 5. Grammaire clavier du noyau : répondre

C'est le geste central du produit. Il obéit à `D-14`, `D-15` et `D-17`.

### 5.1 Séquence

```text
Flèches ↑ ↓ (et ← →)  →  déplacent la mise en évidence dans le groupe d'options
Entrée                →  valide la réponse
[le retour apparaît dans la colonne passive]
Entrée                →  passe à la question suivante
```

**Deux temps distincts : choisir, puis répondre.**

### 5.2 Le déplacement ne valide jamais

**Point le plus important de cette section.** Un groupe de boutons radio HTML natif **sélectionne au déplacement de flèche**. Ici, ce serait un défaut grave : l'utilisateur qui parcourt les options aurait répondu sans l'avoir décidé.

Les flèches déplacent une **mise en évidence**. Seule `Entrée` engage. La sélection et la soumission sont découplées : `aria-checked` suit la mise en évidence, la soumission est un événement distinct.

### 5.3 La garde contre le double `Entrée`

`Entrée` valide la réponse, puis `Entrée` fait avancer. Une touche maintenue ou deux appuis rapprochés sauteraient donc le retour sans qu'il soit lu — ce qui annulerait exactement l'intention de `D-15`.

**Garde (`D-17`) :** l'action d'avancement ne s'arme qu'après un `keyup` de `Entrée`. Une touche maintenue ne déclenche jamais l'enchaînement.

Pas de délai temporel : un délai est ressenti comme une latence, alors que la discipline `keydown`/`keyup` est invisible pour qui appuie normalement. `[À VALIDER en test]` que la garde soit imperceptible au rythme normal — si elle se sent, revoir la décision plutôt que la contourner.

### 5.4 L'indice

Conformément à `D-13`, la ligne `Indice` de la colonne passive :

- est en `textTertiary` au repos ;
- passe en `textPrimary` **au survol et au focus clavier** ;
- se déclenche au clic **ou** par raccourci clavier, ce dernier affiché discrètement.

Le survol seul **ne révèle pas** l'indice — il signale sa disponibilité. La demande d'aide reste un acte délibéré, parce que c'est le signal qu'on veut mesurer.

`[À VALIDER]` Le raccourci n'est pas retenu. Contraintes : ne pas entrer en conflit avec `Entrée` ni les flèches, être mémorisable, ne pas mobiliser un raccourci navigateur.

### 5.5 Après la réponse

Le focus passe à l'action d'avancement. Le retour apparaît dans la colonne passive **sans déplacer l'énoncé** — c'est le bénéfice propre de `D-09`.

Le retour est annoncé aux technologies d'assistance par une région live polie, de façon à ne pas interrompre une lecture en cours.

---

## 6. Pointeur grossier et tactile

Skilleo est desktop-first. Il recevra malgré tout des portables tactiles et des tablettes.

**Règle :** sous `@media (pointer: coarse)`, aucune fonction ne disparaît. Ce que le survol enrichissait devient visible en permanence ou atteignable au toucher.

**Test :** désactiver mentalement tout état de survol. Si une fonction devient introuvable, la conception viole la Loi 5.

---

## 7. Ce qui n'est pas encore tranché

| Réf | Sujet |
|---|---|
| `D-13` | Le raccourci de l'indice |
| `D-17` | Validation en test de la garde `keyup` |
| `Q-01` | Valeurs de l'anneau de focus — dépendent des tokens de couleur |
| `Q-01` | Durées de transition entre états — dépendent de `07-motion.md`, lui-même bloqué faute d'enregistrements d'écran |
| `Q-03` | Surfaces secondaires : surface centrée ou panneau occupant la colonne passive |

---

## Journal du document

| Date | Modification |
|---|---|
| 2026-07-30 | Création. Cadré par D-12 à D-17. Intégralité du document en `[PROPOSÉ]` : la référence étant tactile, aucun état de pointeur n'y est observable. |
