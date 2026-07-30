# 01 — Principes UX

> Périmètre : les lois transversales qui permettent de trancher un arbitrage de conception sans revenir demander.
> Ne contient pas de décisions particulières (voir `DECISIONS.md`), ni de spécification d'écran (voir `06-ecrans.md`).

Ce document répond à *« comment on décide ? »*. Il doit rester assez court pour être relu en entier avant chaque décision importante.

---

## Table des matières

- [1. Les six lois](#1-les-six-lois)
- [2. Divulgation progressive](#2-divulgation-progressive)
- [3. Hiérarchie des actions](#3-hiérarchie-des-actions)
- [4. Procédure d'admission d'une fonctionnalité](#4-procédure-dadmission-dune-fonctionnalité)
- [5. Feedback et perception du système](#5-feedback-et-perception-du-système)
- [6. Erreurs et récupération](#6-erreurs-et-récupération)
- [7. États vides](#7-états-vides)
- [8. Accessibilité et charge cognitive](#8-accessibilité-et-charge-cognitive)
- [9. Anti-patterns interdits](#9-anti-patterns-interdits)
- [10. Checklist d'un écran](#10-checklist-dun-écran)

---

## 1. Les six lois

### Loi 1 — Une décision par écran

L'utilisateur ne prend jamais deux décisions simultanées. Un écran expose une question, un choix, une action dominante. Les autres possibilités existent mais ne se disputent pas son attention.

Test d'échec : si on ne peut pas nommer la décision unique d'un écran, l'écran est mal conçu.

### Loi 2 — La simplicité vient de l'ordonnancement, pas de la soustraction

On ne retire pas de la puissance au produit. On réduit le nombre de choix imposés **au même instant**. Un produit riche peut être simple ; un produit pauvre peut être confus.

Conséquence : « on ne peut pas ajouter ça, ce serait trop compliqué » n'est jamais une conclusion valable. La bonne question est *où* ça va.

### Loi 3 — Rien n'apparaît sans intention

Une fonction s'affiche parce que l'utilisateur l'a demandée, ou parce que son contexte immédiat la rend nécessaire. Jamais parce qu'elle existe, jamais parce qu'on veut la promouvoir.

### Loi 4 — Limiter sans jamais fermer

Restreindre les options d'un débutant est souhaitable. Lui opposer une porte close ne l'est pas. Toute fonction avancée reste atteignable par qui la cherche, au prix d'une interaction supplémentaire — pas au prix d'un changement de mode, d'un abonnement, ou d'une recherche dans les réglages.

Test d'échec : un utilisateur qui sait ce qu'il veut ne doit jamais se heurter à l'absence de la fonction, seulement à sa discrétion.

### Loi 5 — Le survol accélère, il ne porte jamais

Skilleo est une **application desktop**. Le survol, le focus et le curseur sont des dispositifs de premier rang, à spécifier pour chaque composant interactif — pas des raffinements optionnels.

Mais aucun d'eux n'est jamais le **seul** chemin vers une fonction. Ce qui est atteignable au survol est également atteignable au clavier et au clic.

Trois raisons, et la troisième est la plus importante :

- **Découvrabilité.** Une zone qui ne révèle qu'au survol n'annonce rien. Personne ne balaie l'écran à la souris pour voir ce qui s'y cache.
- **Équivalence.** Le survol n'a pas d'équivalent clavier ni tactile. Sur un produit dont le noyau est « répondre », réserver une fonction à la souris est une incohérence.
- **Intention.** Un déplacement de curseur ne vaut pas une décision. Dans une application d'apprentissage, révéler une aide par accident détruit l'acte délibéré de la demander — précisément le signal qu'on veut mesurer.

Détail de la grammaire dans `02-interactions.md`. Voir `DECISIONS.md` D-12 et D-13.

### Loi 6 — Une seule grammaire pour tout le produit

Le même geste produit le même résultat partout. Un composant se comporte identiquement dans tous les contextes. Une exception locale est un défaut, pas une adaptation.

Conséquence : un comportement souhaité localement doit devenir une variante documentée du composant, ou être abandonné. Jamais un cas particulier dans le code d'un écran.

---

## 2. Divulgation progressive

Cinq niveaux. Un écran n'en expose jamais plus de trois.

| Niveau | Contenu | Coût pour l'utilisateur |
|---|---|---|
| **0 — État** | Où il en est | Aucun, c'est affiché |
| **1 — Action** | Ce qu'il devrait faire maintenant | Un geste |
| **2 — Alternatives** | Ce qu'il peut faire à la place | Un geste, visible sans être dominant |
| **3 — Détails** | Explications, indices, théorie, réglages de l'objet | Un geste depuis l'objet concerné |
| **4 — Contrôle fin** | Réglages avancés, données, exports | Deux gestes, après intention explicite |

Règles :

- Les niveaux 0, 1 et 2 sont visibles simultanément. Les niveaux 3 et 4 ne consomment **aucun espace** avant d'être demandés.
- Un niveau n'est jamais sauté : on n'expose pas du niveau 4 sur un écran qui n'a pas de niveau 1 clair.
- Le niveau 2 est **visible mais subordonné**. Il ne doit pas ressembler à une alternative de même poids que le niveau 1 — sinon la Loi 1 est violée.

---

## 3. Hiérarchie des actions

Quatre rangs. Un écran a exactement un P0.

| Rang | Nature | Nombre par écran |
|---|---|---:|
| **P0** | L'action que l'écran existe pour provoquer | Exactement 1 |
| **P1** | Alternative légitime au P0 | 0 à 2 |
| **P2** | Action sur un élément particulier du contenu | Illimité, portée par l'élément |
| **P3** | Action rare, destructive ou administrative | Reléguée, jamais proéminente |

### 3.1 Nommer par le résultat, pas par le mécanisme

Un libellé d'action décrit ce que l'utilisateur obtient, pas ce que le système exécute.

| À écrire | À ne pas écrire |
|---|---|
| Continuer | Lancer la session |
| Voir la théorie | Ouvrir le panneau |
| Réessayer | Soumettre à nouveau |

### 3.2 Stabilité de la position fonctionnelle

Le P0 occupe la même position fonctionnelle sur tous les écrans du même type. Son libellé change, sa place ne change pas. L'utilisateur doit pouvoir agir sans relire.

---

## 4. Procédure d'admission d'une fonctionnalité

Toute demande d'ajout répond aux cinq questions, dans l'ordre, **par écrit**, avant toute maquette et tout code.

**Q1 — Quel problème utilisateur ?**
Formulé du point de vue de l'utilisateur, pas du produit. « On veut augmenter la rétention » n'est pas une réponse. Si le problème n'existe pas, la procédure s'arrête ici.

**Q2 — À quel objet appartient-elle ?**
Question, Session, Progression ou Notion (voir [`00-produit.md`](./00-produit.md) §2.1). Une fonctionnalité qui n'appartient à aucun objet existant est un signal fort : soit il manque un objet au domaine — décision lourde, à arbitrer — soit la fonctionnalité n'a pas sa place.

**Q3 — À quelle fréquence ?**
Chaque session, chaque semaine, chaque mois, une fois dans la vie du compte. La fréquence détermine l'anneau, pas l'enthousiasme de celui qui la propose.

**Q4 — Dans quel contexte l'utilisateur la veut-il ?**
Le lieu d'apparition est ce contexte. Pas l'écran d'accueil par défaut.

**Q5 — Que remplace-t-elle ?**
Si la réponse est « rien », la fonctionnalité s'ajoute en anneau 2 ou plus. Elle ne peut pas rejoindre les anneaux 0 ou 1 sans retirer quelque chose.

### 4.1 Algorithme de placement

```text
Fréquence = chaque session, et l'utilisateur ne peut pas atteindre son but sans ?
  → Anneau 0. Nécessite de retirer une fonction de l'anneau 0.
Fréquence élevée, mais l'utilisateur peut atteindre son but sans ?
  → Anneau 1, en point d'entrée.
Utile seulement quand un objet précis est à l'écran ?
  → Anneau 2, portée par l'objet.
Utile à qui sait ce qu'il fait ?
  → Anneau 3, après intention explicite.
Rare, irréversible ou administrative ?
  → Anneau 4.
Aucun des cas ci-dessus ?
  → Refus.
```

### 4.2 Test d'échec obligatoire

Avant validation, écrire la réponse à : **« si cette fonctionnalité n'existait pas, que ferait l'utilisateur ? »**

Si la réponse est *« la même chose, autrement »*, la fonctionnalité est un doublon.
Si la réponse est *« rien, il ne le remarquerait pas »*, la fonctionnalité est du bruit.

---

## 5. Feedback et perception du système

- **Le feedback est local avant d'être global.** L'élément touché réagit lui-même. Un message global n'apparaît que si aucun élément ne peut porter le retour.
- **Aucune action sans retour perceptible.** Y compris quand rien ne change à l'écran.
- **Optimisme contrôlé.** On peut afficher un résultat avant sa confirmation serveur, à condition que l'échec soit récupérable sans perte de saisie.
- **Pas de célébration disproportionnée.** Un retour juste sur une question fermée est un événement ordinaire. Réserver l'expression forte aux moments réellement rares. Une félicitation systématique cesse d'être un signal en trois jours.
- **Aucune culpabilisation.** Ni sur une mauvaise réponse, ni sur une absence, ni sur un état vide. Une erreur est une information, pas un jugement.

---

## 6. Erreurs et récupération

| Règle | Conséquence concrète |
|---|---|
| Une erreur est actionnable | Elle dit quoi faire, pas seulement ce qui a échoué |
| Une erreur n'efface jamais la saisie | Aucune exception, y compris sur perte de connexion |
| Une erreur locale reste locale | Un champ invalide ne produit pas de bandeau global |
| Réessayer est toujours à un geste | Jamais « rechargez la page » |

---

## 7. États vides

Un état vide est **une transition, pas une impasse**. Il contient toujours : ce qui manque, pourquoi, et l'action qui le résout.

| Type | Traitement |
|---|---|
| Vide initial (rien commencé) | Présenter la première action, pas expliquer le produit |
| Vide filtré (recherche sans résultat) | Proposer le retrait du filtre, conserver la requête |
| Vide temporaire (chargement, panne) | Distinguer clairement « vide » de « pas encore chargé » |

---

## 8. Accessibilité et charge cognitive

- La divulgation progressive doit être **structurelle**, pas visuelle : un contenu masqué est réellement absent de l'arbre d'accessibilité tant qu'il n'est pas ouvert.
- Toute action est atteignable au clavier, dans un ordre qui suit la hiérarchie des actions du §3.
- Aucune information portée par la couleur seule.
- Aucune limite de temps sur une réponse, sauf si l'exercice a explicitement le temps pour objet.
- Le mouvement respecte `prefers-reduced-motion` — détail dans `07-motion.md`.

Skilleo étant une application desktop, la grammaire clavier n'est pas un complément d'accessibilité : c'est **le mode d'interaction principal du noyau** (`D-12`). Elle est spécifiée dans [`02-interactions.md`](./02-interactions.md), et le geste central — flèches puis `Entrée` — est arrêté par `D-14`.

---

## 9. Anti-patterns interdits

Sans exception, et sans arbitrage possible :

1. Un onglet ou une destination dont l'objet est de promouvoir une fonctionnalité.
2. Deux actions de poids visuel égal sur le même écran.
3. Une fonction placée sur l'écran d'accueil parce qu'elle est nouvelle.
4. Un badge ou une pastille de notification sans information réellement nouvelle.
5. Un comportement de composant divergent dans un seul écran.
6. Une saisie perdue à cause d'une erreur, d'un retour ou d'une navigation.
7. Un état vide qui explique le produit au lieu de proposer l'action.
8. Une célébration à chaque bonne réponse.
9. Un message qui culpabilise sur l'assiduité.
10. Un réglage avancé imposé à un débutant.
11. Une fonction avancée rendue introuvable au nom de la simplicité (violation de la Loi 4).
12. Une valeur visuelle codée en dur au lieu d'un token.
13. Une théorie affichée avant que l'utilisateur ait tenté.
14. Une fonctionnalité entrée dans la doc sans passer par la procédure du §4.

---

## 10. Checklist d'un écran

**Compréhension**

- [ ] La décision unique de l'écran est nommable en une phrase.
- [ ] L'état actuel de l'utilisateur est lisible sans action.
- [ ] Le P0 est identifiable en moins de deux secondes.

**Complexité**

- [ ] Au plus trois niveaux de divulgation exposés.
- [ ] Exactement un P0.
- [ ] Toute fonction présente appartient à l'anneau attendu du contexte.

**Navigation**

- [ ] On sait où l'on est et comment revenir.
- [ ] Le retour ne détruit rien.
- [ ] Un rechargement de page restaure un état équivalent.

**Feedback**

- [ ] Chaque action produit un retour perceptible.
- [ ] Les erreurs sont actionnables et conservent la saisie.
- [ ] Les états vides proposent une action.

**Accessibilité**

- [ ] Parcours clavier complet et ordonné.
- [ ] Aucune information portée par la couleur seule.
- [ ] Le contenu masqué est absent de l'arbre d'accessibilité.

**Contenu**

- [ ] Les libellés nomment un résultat.
- [ ] Aucune phrase introductive superflue.
- [ ] Aucun ton culpabilisant ni triomphaliste.

---

## Journal du document

| Date | Modification |
|---|---|
| 2026-07-30 | Création. Question ouverte Q-03 signalée au §8. |
