# Skilleo — instructions permanentes

## Ce qu'est le projet

Skilleo est une plateforme web de formation pratique à l'intelligence artificielle :
**elle pose une question à la fois, et met la théorie à portée de main quand
l'utilisateur bloque.** Cette phrase est le contrat. Toute fonctionnalité qui oblige à
la réécrire est refusée ou reléguée.

Le noyau du produit est **répondre**. Une seule action porte le produit ; tout le reste
orbite autour.

Auteur et arbitre unique : **Mohamed**.

---

## Règle numéro un

**Face à un manque : s'arrêter et demander.** Ne jamais combler un trou par une
invention plausible. C'est la règle fondatrice du projet, et la raison pour laquelle
deux rapports externes de 4 680 lignes ont été rejetés (voir `docs/DECISIONS.md`,
« Sources externes rejetées »).

Corollaires :

- Aucune liberté n'est prise en silence. Une décision non écrite dans
  `docs/DECISIONS.md` n'est pas une décision.
- Une hypothèse non écrite dans `docs/DECISIONS.md` est une invention.
- Un élément marqué `[À VALIDER]` **ne s'implémente pas**, sans exception.

---

## Ordre de lecture obligatoire

Avant **toute** production — conception, rédaction, code, contenu — lire dans cet ordre :

1. `docs/DECISIONS.md` — ce qui est tranché et ce qui ne l'est pas
2. `docs/00-produit.md` — si ce qu'on demande appartient au produit
3. `docs/01-ux-principes.md` — comment trancher un arbitrage
4. Le document du périmètre concerné

`docs/README.md` donne l'index, l'état d'avancement de chaque document et le périmètre
exact de chacun.

---

## Système de marqueurs

Toute affirmation factuelle sur une référence externe porte un marqueur.
**Une valeur non marquée est une erreur de rédaction.**

| Marqueur | Signification | Implémentable |
|---|---|---|
| `[CONFIRMÉ]` | Déclaré publiquement par la source, référence vérifiable | Oui |
| `[MESURÉ]` | Mesuré par nous sur un intrant conservé, méthode documentée | Oui |
| `[DÉDUIT]` | Reconstitué par recoupement, raisonnement explicite | Oui, en signalant l'incertitude |
| `[PROPOSÉ]` | Choix Skilleo, aucune prétention à refléter une référence | Oui |
| `[À VALIDER]` | Hypothèse en attente d'arbitrage de Mohamed | **Non** |

Interdits : présenter un `[DÉDUIT]` ou un `[PROPOSÉ]` comme une valeur officielle Trade
Republic ; écrire `[MESURÉ]` sans intrant conservé et référençable.

---

## Stack

Tranchée par `D-04`, `D-19`, `D-20` :

- **Next.js App Router + TypeScript + Tailwind CSS.** Pas Vite, pas de SPA, pas de
  backend séparé. Deux raisons : référencement organique et routes serveur pour le jour
  où un modèle sera appelé (`D-08`).
- **shadcn/ui** retenu mais **non installé** (`D-04`). L'installer est un arbitrage de
  Mohamed, jamais une initiative d'agent.
- **Aucune librairie de mouvement en V0.**
- **Hébergement Vercel.** Hostinger garde le domaine `skilleo.academy` et les mails.
- **Contenu éditorial en fichiers MDX versionnés**, pas en table Supabase. Supabase est
  réservé aux comptes et à la progression, qui n'existent pas en V0.
- Les tokens s'expriment en `rem` / `px`. **Toute mention de Kotlin, Jetpack Compose ou
  Paparazzi dans un document Skilleo est une erreur à corriger.**

## Où vivent les valeurs (`D-27`)

Chaque valeur n'existe **qu'une fois**. C'est le point du projet le plus exposé à la dérive.

| Fichier | Contient | Nature |
|---|---|---|
| `docs/references/trade-republic-web.md` | Ce qu'on a **observé** | Descriptif — jamais applicable tel quel |
| `docs/tokens/tokens.css` | Ce qu'on **applique** | Exécutable, consommé directement par le code |
| `docs/04-tokens.md` | **Pourquoi**, et sous quelles règles | Normatif, **aucun chiffre** |

Aucune valeur littérale dans un composant. Aucun `tokens.json` en parallèle. Au moment de
l'échafaudage Next.js, `tokens.css` se déplace dans la feuille de styles globale et reste
canonique — il n'est jamais dupliqué.

---

## Périmètre V0 (`D-21`, `D-22`)

Un seul parcours, « Premiers pas avec l'IA ». Sans compte, sans authentification.
Progression persistée en `localStorage` — elle survit au rafraîchissement et à la
fermeture de l'onglet, mais pas au changement d'appareil.

Contenu de la V0 : gabarit à deux colonnes, questions fermées répondues aux flèches puis
`Entrée`, indice et résumé de notion dans la colonne passive, retour court après chaque
réponse, écran de fin avec récapitulatif et possibilité de recommencer.

**Hors V0, sans « petite version de » :** compte, progression serveur, plusieurs
parcours, exercice appliqué, champ de saisie libre, appel de modèle, pages complètes de
notion, index, recherche, capture d'email, formulaire de retour, back-office,
notifications, statistiques, favoris, partage.

Le vrai coût de la V0 n'est pas le développement — c'est la rédaction du contenu, et
elle repose sur Mohamed.

---

## Blocages actifs

Les statuts bougent. **Lire `docs/README.md` à chaque session** plutôt que se fier à ce
tableau, qui n'en est qu'un rappel.

| Réf | Ce qui est bloqué |
|---|---|
| `Q-10` | `06-ecrans.md` — comportement sous 1024 px |
| `Q-09` | Comment on apprend quelque chose de la V0 — à trancher avant mise en ligne |
| `Q-01` | `07-motion.md` — aucune valeur de mouvement sans enregistrement d'écran |
| `Q-03` | États de survol et de focus : à concevoir, la référence étant tactile |

Ne rien implémenter qui dépende d'une question ouverte, ni d'un document qui n'est pas 🟢.

---

## Discipline de commit

`docs/README.md` règle 3 : **une doc modifiée sans que le code suive est un mensonge, et
l'inverse aussi. Les deux vont dans le même commit.**

Les agents peuvent commiter **et pousser** sur `origin`. Jamais de `--force`, jamais sur
une branche autre que celle en cours.

---

## Répartition du travail entre Cowork et Claude Code

Le projet est mené depuis deux endroits, avec une frontière nette. **La même règle que pour
les documents : aucun sujet dans deux endroits.**

| Amont — agents Cowork | Aval — agents Claude Code (`.claude/agents/`) |
|---|---|
| Cadrer le produit et écrire la spec | Traduire la spec en code |
| Rédiger les documents normatifs de `docs/` | Vérifier que le code et la doc concordent |
| Écrire le contenu pédagogique MDX | Juger la conformité, relire le diff, commiter |

Conséquence : **aucun agent Claude Code ne rédige de documentation ni de contenu.** S'il en
manque, il s'arrête et le signale — la rédaction remonte en amont.

## Agents Claude Code

| Agent | Rôle | Écrit ? |
|---|---|---|
| `ui-ux` | Conception d'interface, mesure de la référence, tokens. S'appuie sur les skills `ui-ux-pro-max` pour la méthode, jamais pour les valeurs | Oui |
| `implementeur` | Écrit le code Next.js à partir d'une spec existante | Oui |
| `archiviste-decisions` | Tient `DECISIONS.md` et les journaux de document | Oui, ce fichier seul |
| `relecteur` | Relit le diff avant commit | Non |
| `ecart-doc-code` | Compare `docs/` au code et localise les dérives | Non |
| `gardien-conformite` | Juge la conformité au socle | Non |
