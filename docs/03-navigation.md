# 03 — Navigation

> Périmètre : où va l'utilisateur, et comment il y va. Destinations, panneaux contextuels, retour, restauration d'état.
> Ne contient aucune valeur visuelle (voir `04-tokens.md`), aucun contenu d'écran (voir `06-ecrans.md`), aucune mécanique de pointeur ou de clavier (voir `02-interactions.md`).

---

## Table des matières

- [1. Le principe qui gouverne tout le reste](#1-le-principe-qui-gouverne-tout-le-reste)
- [2. Destinations](#2-destinations)
- [3. Chrome permanent](#3-chrome-permanent)
- [4. Panneaux contextuels](#4-panneaux-contextuels)
- [5. Retour, URL et restauration d'état](#5-retour-url-et-restauration-détat)
- [6. Ce qui se passe au terme du parcours](#6-ce-qui-se-passe-au-terme-du-parcours)
- [7. Périmètre V0](#7-périmètre-v0)
- [8. Ce qui n'est pas encore tranché](#8-ce-qui-nest-pas-encore-tranché)

---

## 1. Le principe qui gouverne tout le reste

**Skilleo a une seule destination : la question en cours.**

Tout le reste est soit un panneau qui s'ouvre à côté d'elle, soit une destination rare qu'on atteint volontairement et dont on revient. Il n'y a pas de menu à explorer, pas d'arborescence à mémoriser, pas de tableau de bord d'où l'on partirait.

C'est la transposition directe de `00-produit.md` §2 : le noyau est *répondre*. Une architecture de navigation qui offrirait plusieurs points de départ équivalents contredirait la définition du produit.

### 1.1 Le test de conformité

Avant d'ajouter une destination, répondre par écrit : **« qu'est-ce que l'utilisateur ne peut pas faire sans elle ? »**

Si la réponse est « accéder à quelque chose qui pourrait être un panneau », c'est un panneau. Si la réponse est « rien », c'est un refus.

---

## 2. Destinations

Une **destination** change l'URL et remplace le contenu principal. Un **panneau** ne change ni l'un ni l'autre.

| Destination | Rôle | Anneau | En V0 |
|---|---|---|---|
| **Question en cours** | Le noyau. Point d'entrée par défaut. | 0 | Oui |
| **Fin de parcours** | Récapitulatif, relance | 0 | Oui |
| **Index de théorie** | Corpus complet, parcourable | 1 | **Non** (`D-22`) |
| **Recherche** | Accès direct à une notion ou une question | 1 | **Non** (`D-22`) |
| **Compte et réglages** | Administration | 4 | **Non** (`D-22`) |

Les anneaux sont définis dans `00-produit.md` §4.

### 2.1 Il n'y a pas de destination « théorie »

`D-02` l'interdit, et la raison mérite d'être répétée ici parce que c'est la tentation la plus forte du projet : **une destination de savoir devient une échappatoire à l'action.** L'index de théorie (anneau 1) n'est pas une destination de navigation principale — il s'atteint par la recherche, pas par un onglet.

C'est le comportement de la référence : Trade Republic n'a aucune destination « éducation » malgré une masse considérable de contenu explicatif. Tout est attaché à l'objet.

### 2.2 Il n'y a pas d'écran d'accueil

L'utilisateur arrive **directement sur sa question**. Aucun écran intermédiaire, aucun tableau de bord, aucune page « reprendre ou explorer ».

`00-produit.md` §3.3 l'exige : rien ne s'interpose entre l'intention de reprendre et la question. Un écran d'accueil est précisément cette interposition.

---

## 3. Chrome permanent

Le chrome permanent est réduit au strict minimum. Sur la référence, la barre de navigation contient un logo, **un** lien et une carte de téléchargement — aucun menu horizontal (`references/trade-republic-web.md` §5.5).

**Contenu autorisé du chrome permanent :**

- l'identité du produit ;
- l'état de progression, sous forme non décorative ;
- un accès discret aux destinations d'anneau 1 et 4, quand elles existeront.

**Interdits :** un menu de navigation horizontal ; un onglet par fonctionnalité ; une pastille de notification ; tout élément promotionnel.

**Amendement `D-35` — la bascule de thème.** `Q-11` opposait `D-24` (deux thèmes, bascule accessible) à la restriction ci-dessus. `D-24` l'emporte : la bascule est le **premier accès d'anneau 4 à exister**, et elle entre dans le chrome permanent sans qu'un écran de réglages soit nécessaire.

Elle vit en anneau 3 ou 4, jamais 0 ni 1 : dernier élément du chrome, à l'opposé de l'identité, en typographie de label, sans couleur propre. Elle ne concurrence ni l'énoncé, ni les options, ni l'action primaire.

Au premier chargement, le thème suit la **préférence système** ; le thème clair de `D-24` est le défaut quand le système n'exprime rien. Un choix explicite l'emporte ensuite et persiste.

En V0, le chrome se limite donc à l'identité, à la progression et à cette bascule — les autres destinations n'existent pas.

---

## 4. Panneaux contextuels

`D-23` arrête la forme : **tout contenu contextuel s'ouvre en panneau dans la colonne passive** de `D-09`. Aucune modale, aucun voile, aucune feuille montant du bas.

### 4.1 Contenus qui passent par un panneau

| Contenu | Déclenché par | En V0 |
|---|---|---|
| Indice | La ligne `Indice`, au clic ou au raccourci (`D-13`) | Oui |
| Résumé de notion | Une demande explicite depuis la question | Oui |
| Page complète de notion | Un lien depuis le résumé (`D-16`) | Non |
| Retour après réponse | La validation d'une réponse (`D-15`) | Oui |

### 4.2 Règles d'empilement

**Un seul panneau à la fois.** La colonne passive n'affiche jamais deux contenus superposés.

- Ouvrir un contenu depuis un autre le **remplace**, sans empiler de couche visuelle.
- Le chemin de retour est mémorisé : `Échap` revient au contenu précédent, puis à l'état de repos.
- L'état de repos de la colonne passive est défini par `D-13` : la ligne `Indice`, discrète.

### 4.3 Le panneau n'est pas modal

Conséquence directe et importante : **l'utilisateur peut répondre à sa question sans fermer le panneau.** La théorie reste ouverte à côté pendant qu'il agit.

- Aucun piège de focus. La colonne décisionnelle demeure atteignable au clavier.
- Le focus entre dans le panneau à l'ouverture et **revient à son déclencheur** à la fermeture (`02-interactions.md` §4.3).
- Aucun assombrissement de la colonne décisionnelle.

### 4.4 Ce qu'un panneau ne peut pas contenir

`D-09` limite la colonne passive aux actions de rang P2. Un panneau ne contient donc **jamais** l'action dominante de l'écran, ni une alternative de rang P1.

Un panneau qui contiendrait un bouton d'avancement dans le parcours serait un défaut : l'avancement est P0 et appartient à la colonne décisionnelle.

---

## 5. Retour, URL et restauration d'état

### 5.1 Le retour navigateur ne détruit rien

Le bouton retour du navigateur est un geste attendu sur le web. Il ne doit jamais faire perdre une réponse en cours de sélection, ni la position dans le parcours.

| Geste | Effet |
|---|---|
| `Échap` | Ferme le panneau ouvert. Ne quitte jamais la question |
| Retour navigateur, panneau ouvert | Ferme le panneau — l'ouverture d'un panneau crée une entrée d'historique |
| Retour navigateur, aucun panneau | Recule d'une question, si l'utilisateur en a déjà répondu |
| Rechargement | Restaure la question en cours et la progression |

### 5.2 La question en cours est adressable

Chaque question a une URL propre. Trois bénéfices : le rechargement fonctionne, le retour navigateur a un sens, et un lien peut pointer vers une question précise.

**L'URL ne porte jamais de réponse ni de résultat.** Elle identifie une position dans un parcours, rien de plus — c'est aussi une exigence de confidentialité.

### 5.3 Restauration

`D-22` acte une progression persistée dans le navigateur. Conséquences pour la navigation :

- au retour sur l'application, l'utilisateur reprend **à sa question**, sans écran intermédiaire ni confirmation ;
- la restauration est silencieuse — aucun message « nous avons restauré votre session » ;
- la limite est assumée et documentée : la reprise fonctionne dans le même navigateur, pas d'un appareil à l'autre. Le multi-appareil attend le compte.

---

## 6. Ce qui se passe au terme du parcours

`D-22` définit la destination de fin : récapitulatif — ce qui a été réussi, ce qui a été raté — et possibilité de recommencer.

Cette destination est **nécessaire indépendamment de sa valeur commerciale** : `00-produit.md` §2.1 définit la Session comme « une unité qu'on peut terminer ». Sans terme, l'objet Session n'existe plus.

**Interdits sur cet écran :** toute capture d'email et tout formulaire de retour en V0 (`D-22`) ; toute célébration disproportionnée (`01-ux-principes.md` §5) ; toute formulation culpabilisante sur les réponses ratées.

---

## 7. Périmètre V0

Ce que ce document décrit vaut pour la cible. En V0, l'architecture se réduit à :

```text
Question en cours  ──(dernière question répondue)──►  Fin de parcours
       │                                                    │
       │ panneaux : indice, résumé de notion, retour        │ recommencer
       └────────────────────────────────────────────────────┘
```

Deux destinations, trois panneaux. Aucune recherche, aucun index, aucun compte, aucun choix de parcours (`D-22`).

**Conséquence à ne pas perdre de vue :** cette architecture est volontairement trop simple pour avoir besoin d'être conçue. Elle le deviendra quand l'index, la recherche et les parcours multiples arriveront — et c'est à ce moment que les règles des §1 à §4 vaudront leur coût de rédaction. Elles sont écrites maintenant pour que ces ajouts n'improvisent pas.

---

## 8. Ce qui n'est pas encore tranché

| Réf | Sujet |
|---|---|
| `D-28` | **Tranché** — trois régimes de largeur, panneau en surimpression sous 1024 px |
| — | Structure de l'index de théorie : `D-16` impose une hiérarchie, sa forme reste à définir. Hors V0, non urgent |

---

## Journal du document

| Date | Modification |
|---|---|
| 2026-07-30 | Création. Cadré par D-02, D-09, D-10, D-13, D-16, D-22, D-23. Débloqué par D-23 qui résout Q-03 pt 4. |
| 2026-07-30 | Amendement du §3 par `D-35` : la bascule de thème entre dans le chrome permanent, `Q-11` est résolue. |
