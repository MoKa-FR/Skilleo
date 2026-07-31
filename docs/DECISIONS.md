# Journal des décisions et questions ouvertes

> Ce fichier existe pour une seule raison : **aucune liberté ne doit être prise en silence.**
> Une décision non écrite ici n'est pas une décision. Une hypothèse non écrite ici est une invention.

Lire ce fichier avant tout travail de conception ou de développement.

---

## Index des décisions

Une ligne par décision. Le raisonnement complet et « ce que ça exclut » sont dans la décision elle-même.

| Réf | Décision | Documents concernés |
|---|---|---|
| [D-01](#d-01--la-question-fermée-donne-le-tempo-lexercice-appliqué-est-le-climax) | La question fermée donne le tempo, l'exercice appliqué est le climax | `00-produit.md` |
| [D-02](#d-02--la-théorie-est-contextuelle-en-chemin-principal-indexée-en-chemin-secondaire) | La théorie est contextuelle en chemin principal, indexée en chemin secondaire | `00-produit.md` |
| [D-03](#d-03--différenciation-par-profondeur-révélée-pas-par-mode-utilisateur) | Différenciation par profondeur révélée, pas par mode utilisateur | `00-produit.md` |
| [D-04](#d-04--stack-cible--nextjs-app-router--typescript--tailwind-css) | Stack cible : Next.js App Router + TypeScript + Tailwind CSS | `04-tokens.md`, `08-conventions-code.md` |
| [D-05](#d-05--documentation-maintenue-dans-le-repo-sous-docs) | Documentation maintenue dans le repo, sous `docs/` | — |
| [D-06](#d-06--documentation-modulaire-et-courte) | Documentation modulaire et courte | `README.md` |
| [D-07](#d-07--fidélité-trade-republic--mesure-sur-intrants-fournis) | Fidélité Trade Republic : mesure sur intrants fournis ⚠️ | — |
| [D-08](#d-08--le-modèle-ia-manipulable-est-prévu-mais-hors-v0) | Le modèle IA manipulable est prévu, mais hors V0 | `00-produit.md`, `06-ecrans.md` |
| [D-09](#d-09--écran-en-deux-colonnes-de-rôles-asymétriques) | Écran en deux colonnes de rôles asymétriques | `03-navigation.md`, `06-ecrans.md` |
| [D-10](#d-10--la-colonne-décisionnelle-est-à-gauche-définitivement) | La colonne décisionnelle est à gauche, définitivement | `06-ecrans.md` |
| [D-11](#d-11--le-paragraphe-à-deux-tons-est-un-composant-de-premier-rang) | Le paragraphe à deux tons est un composant de premier rang | `04-tokens.md`, `05-composants.md` |
| [D-12](#d-12--le-survol-est-un-dispositif-de-premier-rang-mais-ne-porte-jamais-seul) | Le survol est un dispositif de premier rang, mais ne porte jamais seul | `01-ux-principes.md` (Loi 5), `02-interactions.md`, `05-composants.md` |
| [D-13](#d-13--déclenchement-de-lindice) | Déclenchement de l'indice | `02-interactions.md`, `06-ecrans.md` |
| [D-14](#d-14--on-répond-aux-flèches-on-valide-à-entrée) | On répond aux flèches, on valide à Entrée | `02-interactions.md`, `05-composants.md`, `06-ecrans.md` |
| [D-15](#d-15--le-retour-saffiche-lutilisateur-enchaîne-lui-même) | Le retour s'affiche, l'utilisateur enchaîne lui-même | `02-interactions.md`, `06-ecrans.md` |
| [D-16](#d-16--corpus-théorique-à-deux-niveaux) | Corpus théorique à deux niveaux | `03-navigation.md`, `05-composants.md` |
| [D-17](#d-17--garde-contre-le-double-entrée) | Garde contre le double `Entrée` ⚠️ | `02-interactions.md` |
| [D-18](#d-18--domaine--skilleoacademy) | Domaine : `skilleo.academy` | — |
| [D-19](#d-19--hébergement-vercel--hostinger-réduit-au-domaine-et-aux-mails) | Hébergement Vercel · Hostinger réduit au domaine et aux mails | — |
| [D-20](#d-20--contenu-de-la-v0-en-fichiers-mdx-versionnés-pas-en-table-supabase) | Contenu de la V0 en fichiers MDX versionnés, pas en table Supabase | modèle de données, `08-conventions-code.md` |
| [D-21](#d-21--périmètre-de-la-v0--un-seul-parcours-sans-compte) | Périmètre de la V0 : un seul parcours, sans compte | `00-produit.md`, `03-navigation.md`, `06-ecrans.md` |
| [D-22](#d-22--périmètre-détaillé-de-la-v0) | Périmètre détaillé de la V0 | `00-produit.md`, `03-navigation.md`, `06-ecrans.md` |
| [D-23](#d-23--les-surfaces-secondaires-sont-des-panneaux-dans-la-colonne-passive) | Les surfaces secondaires sont des panneaux dans la colonne passive | `03-navigation.md`, `05-composants.md`, `06-ecrans.md` |
| [D-24](#d-24--deux-thèmes-actifs-en-v0-clair-par-défaut) | Deux thèmes actifs en V0, clair par défaut | `04-tokens.md`, `05-composants.md` |
| [D-25](#d-25--hauteur-de-contrôle--48-px) | Hauteur de contrôle : 48 px | `04-tokens.md` |
| [D-26](#d-26--la-couleur-sémantique-se-limite-à-un-marqueur) | La couleur sémantique se limite à un marqueur | `04-tokens.md`, `05-composants.md`, `06-ecrans.md` |
| [D-27](#d-27--les-valeurs-de-tokens-vivent-dans-un-fichier-css-canonique) | Les valeurs de tokens vivent dans un fichier CSS canonique | `04-tokens.md`, `08-conventions-code.md` |
| [D-28](#d-28--trois-régimes-de-largeur-la-colonne-passive-passe-au-dessus) | Trois régimes de largeur, la colonne passive passe au-dessus | `04-tokens.md`, `05-composants.md`, `06-ecrans.md` |
| [D-29](#d-29--le-clic-sélectionne-il-ne-répond-pas) | Le clic sélectionne, il ne répond pas | `05-composants.md`, `06-ecrans.md` |
| [D-30](#d-30--la-trajectoire-du-produit-est-connue-et-elle-contraint-la-v0) | La trajectoire du produit est connue, et elle contraint la V0 | `09-contenu.md`, `10-architecture.md` |
| [D-31](#d-31--la-progression-v0-est-un-journal-de-réponses-en-ajout-seul) | La progression V0 est un journal de réponses en ajout seul | `10-architecture.md`, `06-ecrans.md` |
| [D-32](#d-32--séquence-fixe-aucun-moteur-de-sélection-en-v0) | Séquence fixe, aucun moteur de sélection en V0 | `09-contenu.md`, `10-architecture.md` |
| [D-33](#d-33--les-deux-couleurs-de-marqueur-sont-arrêtées-identiques-dans-les-deux-thèmes) | Les deux couleurs de marqueur sont arrêtées, identiques dans les deux thèmes | `04-tokens.md` |
| [D-34](#d-34--une-seule-paire-duréeeasing-en-v0) | Une seule paire durée/easing en V0 | `04-tokens.md`, `07-motion.md` |
| [D-35](#d-35--deux-thèmes-et-une-bascule--d-24-lemporte) | Deux thèmes et une bascule : `D-24` l'emporte | `03-navigation.md`, `06-ecrans.md` |
| [D-36](#d-36--un-seul-retour-par-question) | Un seul retour par question | `09-contenu.md`, `06-ecrans.md` |
| [D-37](#d-37--la-notion-est-partagée-référencée-par-identifiant) | La notion est partagée, référencée par identifiant | `09-contenu.md` |
| [D-38](#d-38--questions-en-yaml-notions-en-mdx) | Questions en YAML, notions en MDX | `09-contenu.md`, `08-conventions-code.md` |
| [D-39](#d-39--survol-et-focus-sont-tranchés-en-proposé-sans-attendre-la-référence) | Survol et focus tranchés en `[PROPOSÉ]`, sans attendre la référence | `tokens/tokens.css`, `02-interactions.md`, `05-composants.md` |
| [D-40](#d-40--la-v0-sévalue-en-sessions-observées-sans-aucun-instrument-de-mesure) | La V0 s'évalue en sessions observées, sans aucun instrument de mesure | `10-architecture.md`, `06-ecrans.md` |
| [D-41](#d-41--le-module-source-est-un-niveau-0-jamais-publié) | Le module source est un niveau 0, jamais publié | `09-contenu.md` |
| [D-42](#d-42--charte-de-rédaction-du-contenu-opposable-limitée-au-contenu) | Charte de rédaction du contenu, opposable, limitée au contenu | `09-contenu.md` |
| [D-43](#d-43--fidélité-factuelle-du-contenu--aucun-chiffre-sans-source) | Fidélité factuelle du contenu : aucun chiffre sans source | `09-contenu.md` |
| [D-44](#d-44--on-contextualise-avant-de-vulgariser-et-jamais-par-la-syntaxe) | On contextualise avant de vulgariser, et jamais par la syntaxe | `09-contenu.md` |
| [D-45](#d-45--le-cadre-est-plafonné-en-largeur-puis-centré) | Le cadre est plafonné en largeur, puis centré | `04-tokens.md`, `06-ecrans.md` |
| [D-46](#d-46--le-bloc-décisionnel-est-centré-verticalement-à-hauteur-constante) | Le bloc décisionnel est centré verticalement, à hauteur constante | `04-tokens.md`, `06-ecrans.md` |
| [D-47](#d-47--le-déclencheur-au-repos-est-lisible) | ~~Le déclencheur au repos est lisible~~ — **caduque, `D-50`** | `02-interactions.md`, `05-composants.md`, `06-ecrans.md` |
| [D-48](#d-48--lindice-et-lexplication-sécrivent-à-deux-tons) | L'indice et l'explication s'écrivent à deux tons | `05-composants.md`, `09-contenu.md`, `06-ecrans.md` |
| [D-49](#d-49--trois-moments-exclusifs-jamais-deux-contenus-à-la-fois) | Trois moments exclusifs, jamais deux contenus à la fois | `02-interactions.md`, `06-ecrans.md` |
| [D-50](#d-50--le-contenu-passif-est-appelé-par-la-latence-plus-par-un-déclencheur) | Le contenu passif est appelé par la latence, plus par un déclencheur ⚠️ | `02-interactions.md`, `05-composants.md`, `06-ecrans.md` |
| [D-51](#d-51--un-motif-animé-noir-et-blanc-tranché-en-proposé) | Un motif animé noir et blanc, tranché en `[PROPOSÉ]` | `04-tokens.md`, `05-composants.md`, `07-motion.md` |

⚠️ = comporte un point en attente d'arbitrage ou de validation en test.

**Questions ouvertes**

| Réf | Question | Bloque |
|---|---|---|
| [Q-01](#q-01--intrants-de-mesure-trade-republic) | Intrants de mesure Trade Republic | `07-motion.md` — et déclenche la révision de `D-34` et `D-39` |
| [Q-12](#q-12----text-secondary-ne-franchit-pas-le-seuil-de-texte) | `--text-secondary` ne franchit pas le seuil de contraste du texte | la case « thèmes et accessibilité » de `06-ecrans.md` §8 |
| [Q-13](#q-13--le-repère-de-position-et-progression-disent-la-même-chose) | Le repère de position et `Progression` portent la même phrase | l'écran de question |
| [Q-14](#q-14--le-trou-clavier-tactile-et-sous-1024-px) | Le trou clavier, tactile et sous 1024 px | la case « parcours clavier » de `06-ecrans.md` §8 et le régime étroit de `D-28` |

**Questions résolues** — conservées pour l'historique de raisonnement (règle 5 du `README`).

| Réf | Question | Résolue par |
|---|---|---|
| `Q-03` | Grammaire desktop : ce qui reste à inventer | `D-09`, `D-14`, `D-17`, `D-23`, `D-29`, `D-39` |
| `Q-09` | Comment apprend-on quelque chose de la V0 ? | `D-40` |
| `Q-10` | Comportement sous 1024 px | `D-28` |
| `Q-11` | Où vit la bascule de thème | `D-35` |

---
## Décisions arrêtées

### D-01 — La question fermée donne le tempo, l'exercice appliqué est le climax
**Date :** 2026-07-30 · **Statut :** actif · **Documenté dans :** `00-produit.md` §3.2

La mécanique dominante en volume est la question à options restreintes. Elle est ponctuée d'un exercice appliqué qui constitue la preuve de compétence.

**Raison :** la question fermée rend la pratique quotidienne soutenable mais ne mesure que la reconnaissance. La compétence réelle en IA relève de la production. Un produit uniquement fait de questions fermées trahirait sa promesse de formation pratique.

**Ce que ça exclut :** un produit purement QCM ; un produit uniquement fait d'exercices longs.

---

### D-02 — La théorie est contextuelle en chemin principal, indexée en chemin secondaire
**Date :** 2026-07-30 · **Statut :** actif · **Documenté dans :** `00-produit.md` §3.4

La notion s'ouvre depuis la question, en surface secondaire, sans quitter la session. Un index complet et progressif existe, atteignable par la recherche, sans occuper la navigation principale.

**Raison :** permet un corpus théorique exhaustif sans en faire une échappatoire à l'action. Trade Republic n'a aucune destination « éducation » malgré une masse importante de contenu explicatif : tout est attaché à l'objet.

**Ce que ça exclut :** un onglet « Cours », « Théorie » ou « Bibliothèque » dans la navigation principale.

---

### D-03 — Différenciation par profondeur révélée, pas par mode utilisateur
**Date :** 2026-07-30 · **Statut :** actif · **Documenté dans :** `00-produit.md` §5

Débutants et avancés utilisent la même interface sur les mêmes objets, à des profondeurs différentes.

**Raison :** un sélecteur de mode oblige l'utilisateur à s'auto-évaluer avant d'avoir utilisé le produit, et fige un choix mal informé. La profondeur révélée par les actes ne se trompe pas.

**Ce que ça exclut :** un sélecteur « débutant / expert » ; deux jeux d'écrans ; une fonctionnalité réservée à un niveau.

---

### D-04 — Stack cible : Next.js App Router + TypeScript + Tailwind CSS
**Date :** 2026-07-30 · **Statut :** actif, **précisé le 30/07/2026** · **Documenté dans :** `04-tokens.md` (à rédiger), `08-conventions-code.md` (à rédiger)

**Raison initiale :** choix de Mohamed.

**Précision du 30/07.** Mohamed a explicitement délégué l'arbitrage technique
(« j'ai pas de préférences, à toi de me dire le plus adapté »). **Next.js App Router**
est retenu sans ambiguïté — **pas Vite, pas d'application rendue uniquement côté client.**

Deux besoins énoncés y mènent indépendamment :

1. **Référencement.** Une plateforme de formation freemium grand public vit de
   l'acquisition organique. Next.js rend les pages sur le serveur, donc les moteurs
   lisent le contenu des leçons. Une application rendue côté client sert une page
   quasi vide au premier passage.
2. **Routes serveur.** `D-08` prévoit qu'à terme l'utilisateur prompte un modèle. La
   clé d'API ne doit jamais atteindre le navigateur. Next.js fournit des routes
   serveur dans le même projet, disponibles le jour du besoin, sans backend séparé
   ni réarchitecture.

**Ce que ça exclut :** Vite, Create React App, une SPA pure, un backend séparé pour
les appels de modèle.

**Composants :** `shadcn/ui` retenu mais **non installé** — son initialisation impose
de choisir une couleur de base, décision de token bloquée par `Q-01`.

**Animations :** aucune librairie de mouvement en V0.

**Conséquence documentaire :** les tokens s'expriment en `rem` / `px`, pas en `dp`. La référence d'ingénierie Trade Republic (Kotlin, Jetpack Compose, Paparazzi) est **hors périmètre** — on copie leur grammaire visuelle, pas leur chaîne technique. Toute mention de Compose dans un document Skilleo est une erreur à corriger.

---

### D-05 — Documentation maintenue dans le repo, sous `docs/`
**Date :** 2026-07-30 · **Statut :** actif

**Raison :** la doc est versionnée avec le code, lue en contexte par les IA de développement, et ne peut pas dériver silencieusement. Le dossier `Documents/MRM holding/Skilleo` reste réservé au non-technique (business, pricing, roadmap).

---

### D-06 — Documentation modulaire et courte
**Date :** 2026-07-30 · **Statut :** actif · **Documenté dans :** `README.md`

Un fichier par périmètre, aucun chevauchement, chaque document relisable en entier.

**Raison :** les deux rapports produits par ChatGPT totalisaient 4 680 lignes avec ~30 % de contenu dupliqué entre eux. Un document qu'on ne relit pas n'est plus normatif.

---

### D-07 — Fidélité Trade Republic : mesure sur intrants fournis
**Date :** 2026-07-30 · **Statut :** actif, **en attente d'intrants** · **Voir Q-01**

Les valeurs visuelles seront mesurées sur des captures fournies par Mohamed, avec méthode documentée. Aucune valeur ne portera le marqueur `[MESURÉ]` sans intrant conservé et référençable.

**Raison :** les valeurs présentées comme « mesurées » dans le rapport UI de ChatGPT (marge 32 dp, hauteur de contrôle 52 dp, rayon 16 dp) étaient obtenues en arrondissant des pixels lus sur une capture redimensionnée, via un ratio supposé. Ce sont des hypothèses plausibles, pas des mesures. Elles seront reprises comme point de départ mais reclassées en `[DÉDUIT]` tant qu'aucune mesure réelle ne les confirme.

---

### D-08 — Le modèle IA manipulable est prévu, mais hors V0
**Date :** 2026-07-30 · **Statut :** actif · **Répond à :** `Q-02` · **Impacte :** `00-produit.md` §3.2, `06-ecrans.md`

À terme, l'utilisateur écrira des prompts et verra de vraies sorties, évaluées. **La V0 ne contient aucun champ de saisie libre.**

**Conséquences documentaires, à respecter dès maintenant :**

1. L'exercice appliqué de la V0 doit fonctionner **sans appel de modèle** : correction d'une sortie pré-générée, remise en ordre, choix argumenté sur un cas concret. À trancher.
2. La place du champ libre est **réservée** dans l'architecture des écrans et le catalogue de composants, sans être implémentée. On ne redessine pas le noyau au moment de l'ajouter.
3. Les états que le modèle imposera — latence, flux progressif, échec de génération, contenu signalé comme généré — sont **spécifiés mais marqués hors V0**. Les spécifier tard coûte plus cher que les spécifier vides.

**Ce que ça exclut :** un produit conçu comme purement statique, dont l'ajout ultérieur de génération casserait la grammaire.

---

### D-09 — Écran en deux colonnes de rôles asymétriques
**Date :** 2026-07-30 · **Statut :** actif · **Répond à :** `Q-03` · **Impacte :** `03-navigation.md`, `06-ecrans.md`

Mise en page à deux colonnes en plein cadre, à la manière du desktop Trade Republic. **Une seule colonne est décisionnelle.**

| | Colonne décisionnelle | Colonne passive |
|---|---|---|
| Contenu | Énoncé, options, action dominante | Contexte, retour, progression, théorie ouverte |
| Actions autorisées | P0, P1, P2 | **P2 uniquement** — jamais de P0 ni de P1 |
| Rôle dans la Loi 1 | Porte la décision unique | Ne porte aucune décision |

**Raison.** J'avais d'abord signalé que deux colonnes contredisaient la Loi 1 (une décision par écran). L'examen des captures montre le contraire : chez Trade Republic les deux colonnes ne sont **jamais** deux décisions. Une image passive à gauche, le texte et l'unique action à droite ; sur la page de connexion, une capture floutée inerte à gauche, le panneau d'action à droite. Ce sont deux **rôles asymétriques**, pas deux poids égaux. La Loi 1 est respectée dès lors que la colonne passive ne peut pas accueillir d'action de rang P0 ou P1.

**Bénéfice propre à Skilleo :** placer le retour après réponse dans la colonne passive évite que l'énoncé ne se décale à l'apparition du retour. Aucun déplacement de contenu au moment le plus sensible de la boucle.

**Ce que ça exclut :** une colonne centrée bridée ; deux colonnes de poids égal ; toute action dominante dans la colonne passive.

**Complété par :** `D-10` (côté), `D-13` (indice).

---

### D-10 — La colonne décisionnelle est à gauche, définitivement
**Date :** 2026-07-30 · **Statut :** actif · **Complète :** `D-09` · **Impacte :** `06-ecrans.md`

Énoncé, options et action dominante à gauche. Contexte, retour et progression à droite. **Sur tous les écrans, sans alternance.**

**Raison :** sens de lecture — l'utilisateur rencontre la décision avant le contexte. Et `01-ux-principes.md` §3.2 impose une position fonctionnelle stable : Trade Republic alterne gauche/droite d'une section à l'autre, ce qu'un site promotionnel peut se permettre et qu'un outil ne peut pas.

**Ce que ça exclut :** toute alternance, y compris « pour aérer ».

---

### D-11 — Le paragraphe à deux tons est un composant de premier rang
**Date :** 2026-07-30 · **Statut :** actif · **Répond à :** `Q-06` · **Impacte :** `04-tokens.md`, `05-composants.md`

Amorce en `textPrimary`, suite en `textSecondary` — même taille, même graisse, même paragraphe. Employé partout où un texte a deux profondeurs de lecture : énoncés, retours après réponse, notions de théorie, libellés de champ.

**Raison :** divulgation progressive à l'intérieur d'un bloc de texte, sans accordéon, sans interaction, sans coût. En ne lisant que le premier ton on obtient le résumé ; en lisant le second, le détail. Observé sur toutes les sections de la référence — voir `references/trade-republic-web.md` §5.1.

**Contrainte d'accessibilité :** les deux tons forment **une seule phrase** pour un lecteur d'écran. La distinction est visuelle uniquement et ne doit jamais porter d'information à elle seule (`01-ux-principes.md` §8).

---

### D-12 — Le survol est un dispositif de premier rang, mais ne porte jamais seul
**Date :** 2026-07-30 · **Statut :** actif · **Impacte :** `01-ux-principes.md` (Loi 5), `02-interactions.md`, `05-composants.md`

Skilleo est une **application desktop**. Le survol, le focus, le curseur et le clavier font partie intégrante de sa grammaire d'interaction, au même titre que les couleurs et les rayons.

**Règle :** le survol peut *accélérer* ou *enrichir* une révélation. Il ne peut jamais être le **seul** chemin vers une fonction. Tout ce qui est atteignable au survol est également atteignable au clavier et au clic.

**Statut de la référence sur ce point.** Trade Republic étant une application tactile, elle n'offre **aucun** état de survol, de focus ou de curseur à observer. Ce n'est pas une raison de s'en priver — c'est une raison de les **concevoir délibérément** plutôt que de les déduire. Toutes les valeurs de cette famille seront donc marquées `[PROPOSÉ]`, jamais `[DÉDUIT]`, et assumées comme des créations Skilleo cohérentes avec la grammaire de la référence.

**Conséquence :** la grammaire de pointeur et de clavier mérite son propre document, `02-interactions.md`. C'est la partie du système qui a le moins de référence et donc le plus besoin d'être écrite.

---

### D-13 — Déclenchement de l'indice
**Date :** 2026-07-30 · **Statut :** ~~actif~~ **révoquée par `D-50`** — conservée pour son raisonnement sur le signal mesuré · **Résout :** `Q-07` · **Impacte :** `02-interactions.md`, `06-ecrans.md`

> ⚠️ La ligne « Repos » du tableau ci-dessous est **caduque** : `D-47` remplace `textTertiary` par `textSecondary`. Le reste de la décision est inchangé.

La colonne passive contient, avant toute réponse, **une seule ligne discrète** : `Indice`.

| État | Rendu |
|---|---|
| Repos | `textTertiary` (`#CBCCD2`) — présente, silencieuse, ignorable sans coût |
| Survol **ou** focus clavier | `textPrimary` — motif de sélecteur mesuré sur la référence (`references/trade-republic-web.md` §5.2) : couleur et graisse seules, aucun fond, aucune bordure |
| Déclenchement | Clic **ou** raccourci clavier, affiché discrètement |

**Raison :** corrige les quatre défauts du survol-seul — découvrabilité nulle sur une zone vide, absence d'équivalent clavier, absence de tactile, et révélation accidentelle au passage du curseur. Ce dernier point est le plus important sur le plan pédagogique : la demande d'aide doit rester un **acte délibéré**, parce que c'est le signal qu'on veut mesurer.

**Ce que ça exclut :** une colonne passive entièrement vide ; un indice révélé par le seul déplacement du curseur ; un bouton d'indice proéminent.

**Reste à trancher :** le raccourci retenu, et si le survol seul révèle l'indice ou se limite à en signaler la disponibilité.

---

### D-14 — On répond aux flèches, on valide à Entrée
**Date :** 2026-07-30 · **Statut :** actif · **Impacte :** `02-interactions.md`, `05-composants.md`, `06-ecrans.md`

Les flèches déplacent la sélection dans le groupe d'options. `Entrée` valide la réponse. **Deux temps distincts : choisir, puis répondre.**

**Raison :** s'adapte à n'importe quel nombre d'options, et reste la convention native d'un groupe de boutons radio — donc gratuite en apprentissage et attendue par les lecteurs d'écran.

**Nuance impérative.** Un groupe radio HTML natif **sélectionne au déplacement de flèche**. Ici, ce serait un défaut grave : déplacer la sélection ne doit **jamais** valider la réponse. Les flèches déplacent une mise en évidence ; seule `Entrée` engage. À implémenter en `tabindex` glissant avec `aria-checked` porté par l'option mise en évidence, et soumission découplée.

**Ce que ça exclut :** un chiffre par option comme chemin principal ; toute validation au simple déplacement.

---

### D-15 — Le retour s'affiche, l'utilisateur enchaîne lui-même
**Date :** 2026-07-30 · **Statut :** actif · **Impacte :** `02-interactions.md`, `06-ecrans.md`

Après validation, le retour apparaît dans la colonne passive. **Aucun enchaînement automatique.** L'utilisateur passe à la question suivante quand il a lu.

**Raison :** le retour court est le seul moment d'apprentissage de la boucle rapide. Un enchaînement automatique le rendrait illisible et viderait la mécanique de sa valeur pédagogique. L'utilisateur garde la main sur le rythme.

**Ce que ça exclut :** tout délai automatique, y compris paramétrable ; toute variation du comportement selon que la réponse est juste ou fausse.

---

### D-16 — Corpus théorique à deux niveaux
**Date :** 2026-07-30 · **Statut :** actif · **Résout :** `Q-04` · **Impacte :** `03-navigation.md`, `05-composants.md`

Chaque notion existe à deux profondeurs :

| Niveau | Contenu | Où |
|---|---|---|
| **Résumé** | Atomique, lisible sans défiler | Colonne passive, ouvert depuis la question |
| **Page complète** | Développement, exemples | Atteignable depuis le résumé, et par l'index |

**Raison :** c'est le paragraphe à deux tons de `D-11` étendu à l'échelle du corpus — même logique de double profondeur de lecture, appliquée à l'architecture du contenu plutôt qu'à une phrase. Préserve `D-02` : la théorie reste en support, sans jamais s'imposer.

**Conséquences :** l'index a besoin d'une vraie hiérarchie, pas d'une simple liste. Le résumé doit tenir sans défilement dans la colonne passive — contrainte rédactionnelle, à documenter dans `03-navigation.md`.

**Ce que ça exclut :** une notion à profondeur unique ; un résumé qui exige de défiler.

---

### D-17 — Garde contre le double `Entrée`
**Date :** 2026-07-30 · **Statut :** actif, `[PROPOSÉ]` **à valider en test** · **Découle de :** `D-14` + `D-15` · **Impacte :** `02-interactions.md`

`D-14` valide la réponse à `Entrée`. `D-15` fait avancer l'utilisateur lui-même — vraisemblablement aussi à `Entrée`. **Risque : une touche maintenue ou deux appuis rapides sautent le retour sans qu'il soit lu**, ce qui annulerait précisément l'intention de `D-15`.

**Garde retenue :** l'action d'avancement ne s'arme qu'après un `keyup` de `Entrée`. Une touche maintenue ne déclenche donc jamais l'enchaînement. Pas de délai temporel — un délai est ressenti comme une latence, alors que la discipline `keydown`/`keyup` est invisible pour qui appuie normalement.

**À vérifier en test réel :** que la garde soit imperceptible pour un utilisateur au rythme normal. Si elle se sent, revoir la décision plutôt que la contourner.

---

### D-18 — Domaine : `skilleo.academy`
**Date :** 2026-07-30 · **Statut :** actif · **Choix de Mohamed**

**Raison :** l'extension nomme la nature du produit avant le premier clic, ce qui a une
valeur réelle sur une plateforme de formation. Évite aussi la contrainte de
disponibilité du `.com`.

**Ce que ça exclut :** `skilleo.io` et `skilleo.com` comme domaines principaux. S'ils
sont acquis, ils redirigent — ils ne servent jamais de canonique. Une seule URL
canonique, sinon le référencement se dilue.

**À confirmer :** le domaine est-il déjà enregistré ? La configuration DNS de `D-19`
en dépend.

---

### D-19 — Hébergement Vercel · Hostinger réduit au domaine et aux mails
**Date :** 2026-07-30 · **Statut :** actif · **Arbitrage délégué à Claude**

L'application est hébergée par **Vercel**. **Hostinger conserve le nom de domaine et
les adresses mail**, et son DNS pointe vers Vercel.

**Raison.** Mohamed envisageait d'héberger le build sur Hostinger, dont il paie déjà
l'abonnement. Ce n'est pas praticable : un hébergement mutualisé sert des fichiers,
alors que Next.js a besoin d'un runtime Node pour le rendu serveur et les routes
d'API. Un export statique contournerait le problème mais annulerait **les deux seules
raisons** d'avoir retenu Next.js en `D-04`.

Bénéfice de Vercel au-delà du runtime : déploiement à chaque poussée, URL de
prévisualisation par branche, retour arrière immédiat.

**Ce que ça exclut :** héberger l'application sur Hostinger ; un export statique de
Next.js ; deux hébergements pour un même produit.

---

### D-20 — Contenu de la V0 en fichiers MDX versionnés, pas en table Supabase
**Date :** 2026-07-30 · **Statut :** actif · **Répond à :** `Q-08` · **Impacte :** modèle de données, `08-conventions-code.md`

Les questions et notions sont des fichiers MDX versionnés dans le repo, au même titre que le code. La progression, les comptes et les réponses de l'utilisateur (quand ils existeront — voir `D-21`) resteront dans Supabase : seul le **contenu éditorial** est en fichiers.

**Raison :** Mohamed est l'auteur unique du contenu. Construire un back-office pour un auteur unique remplace un éditeur de texte par un formulaire web moins confortable, pour un coût de départ d'environ une semaine. Le MDX donne un historique versionné, un référencement optimal au build, et un coût de départ nul.

**Ce que ça exclut :** une table Supabase pour les questions/notions en V0 ; un back-office éditorial en V0.

**Révisable :** si un second formateur arrive, ou si le contenu doit varier par utilisateur, migration vers Supabase à reconsidérer.

---

### D-21 — Périmètre de la V0 : un seul parcours, sans compte
**Date :** 2026-07-30 · **Statut :** actif · **Répond à :** `Q-05` · **Impacte :** `00-produit.md`, `03-navigation.md`, `06-ecrans.md`

La V0 contient un seul parcours (« Premiers pas avec l'IA ») : une série de questions fermées ponctuée d'un exercice appliqué en climax (`D-01`). Aucune authentification. Aucune progression persistée — elle se perd au rafraîchissement de la page.

**Raison :** tester la boucle noyau (`00-produit.md` §2) avant d'investir dans compte et persistance. Le plus petit produit qui reste fidèle à la définition du §1 sans engager d'infrastructure Supabase avant d'avoir validé que la boucle elle-même fonctionne.

**Ce que ça exclut :** inscription/connexion en V0 ; table de progression en V0 ; plusieurs parcours en V0.

**Complétée et corrigée sur un point par `D-22`.** La clause « aucune progression persistée — elle se perd au rafraîchissement de la page » est **remplacée** : la progression est persistée dans le navigateur, sans compte. Le reste de D-21 tient.

---

### D-22 — Périmètre détaillé de la V0
**Date :** 2026-07-30 · **Statut :** actif · **Complète et corrige :** `D-21` · **Impacte :** `00-produit.md`, `03-navigation.md`, `06-ecrans.md`

`D-21` disait ce que la V0 n'a pas. Cette décision dit ce qu'on y fait de bout en bout, ce qui se passe à la fin, et où passe exactement la frontière.

#### Le parcours complet de la V0

1. L'utilisateur arrive sur l'application. **Aucune inscription, aucun écran d'accueil intermédiaire.**
2. Il entre dans le parcours unique « Premiers pas avec l'IA ».
3. Il répond à une série de questions fermées — flèches puis `Entrée` (`D-14`).
4. À tout moment il peut demander **l'indice** (`D-13`) et **le résumé de la notion** concernée (`D-16` niveau 1), dans la colonne passive.
5. Après chaque réponse, un retour court s'affiche à droite ; il enchaîne lui-même (`D-15`).
6. Sa progression **survit au rafraîchissement et à la fermeture de l'onglet.**
7. Au terme du parcours, un **écran de fin** présente le récapitulatif — ce qu'il a réussi, ce qu'il a raté — et lui permet de **recommencer**.

#### Progression persistée en navigateur, sans compte

La progression est stockée côté navigateur (`localStorage`). Elle survit au rafraîchissement et à la fermeture de l'onglet, sans authentification et sans table Supabase.

**Raison :** `D-21` dans sa version initiale contredisait `00-produit.md` §3.3, qui pose comme exigence forte qu'« une session interrompue se reprend exactement là où elle s'est arrêtée, question comprise ». Or la reprise est **un tiers de la boucle** du §3.1. Une V0 qui ne la teste pas ne teste pas le noyau qu'elle est censée valider — pour environ deux heures de travail économisées.

Avec cette correction, `00-produit.md` §3.3 est **vrai en V0**, à une limite près, à assumer : la reprise fonctionne dans le même navigateur, pas d'un appareil à l'autre. Le multi-appareil attend le compte.

#### Fin de parcours : récapitulatif seul

L'écran de fin donne le bilan et permet de recommencer. **Aucune capture d'email, aucun formulaire de retour.**

Cet écran est nécessaire indépendamment de sa valeur commerciale : `00-produit.md` §2.1 définit la Session comme « une unité qu'on peut terminer ». Sans terme, l'objet Session n'existe plus.

#### Ce que ça exclut

Frontière explicite. Tout ce qui suit est **hors V0**, sans exception ni « petite version de » :

| Domaine | Hors V0 |
|---|---|
| Compte | Inscription, connexion, mot de passe, récupération |
| Données | Progression serveur, reprise multi-appareil, table de progression |
| Contenu | Plusieurs parcours, choix de parcours, parcours recommandé |
| Pratique | **L'exercice appliqué de `D-01`** — voir la limite ci-dessous |
| IA | Champ de saisie libre, appel de modèle (déjà exclu par `D-08`) |
| Théorie | Pages complètes de notion (`D-16` niveau 2), index navigable, recherche |
| Acquisition | Capture d'email, liste de diffusion, parrainage |
| Écoute | Formulaire de retour, note de satisfaction |
| Édition | Back-office éditorial (déjà exclu par `D-20`) |
| Rétention | Notifications, relances, série de jours consécutifs |
| Mesure | Statistiques d'usage, comparaisons, tableau de progression |
| Confort | Favoris, notes personnelles, partage |

#### Limite assumée : la V0 ne valide que le tempo

L'exercice appliqué est repoussé. Or `D-01` établit que la question fermée donne le **tempo** et que l'exercice appliqué est le **climax**, et qu'un produit uniquement fait de questions fermées trahirait la promesse de formation pratique.

**Conséquence à garder en tête en lisant les résultats de la V0 :** un signal positif validera que la boucle rapide est agréable et soutenable. Il ne dira **rien** sur la promesse de compétence réelle. Ne pas conclure de « les gens jouent » que « le produit forme ».

`D-01` reste la cible et n'est pas révisée.

#### Le vrai coût n'est pas le développement

Le développement de la V0 est modeste : un gabarit d'écran, un composant de question, un composant de retour, un écran de fin, un stockage navigateur.

**Le coût, c'est la rédaction du contenu, et elle repose entièrement sur Mohamed** — questions, options, indices, retours courts, résumés de notions. C'est le goulot d'étranglement du projet, pas le code. Toute estimation de la V0 qui chiffre le développement sans chiffrer la rédaction est fausse.

#### Reste ouvert

| Sujet | Statut |
|---|---|
| Nombre de questions du parcours | Non tranché — détermine directement la charge de rédaction |
| Thème sombre en V0 | Non tranché. Les tokens prévoient les deux thèmes ; leur présence en V0 est une autre question |
| Comportement sous 1024 px de large | Non tranché. Desktop-first ne dit pas ce qui se passe sur un écran étroit |
| Comment on apprend quelque chose de la V0 | `Q-09` |

---

### D-23 — Les surfaces secondaires sont des panneaux dans la colonne passive
**Date :** 2026-07-30 · **Statut :** actif · **Résout :** `Q-03` pt 4 · **Impacte :** `03-navigation.md`, `05-composants.md`, `06-ecrans.md`

Indice, résumé de notion, page complète de notion et récapitulatif s'ouvrent **dans la colonne passive de `D-09`**. Aucune modale, aucun voile, aucune feuille montant du bas.

**Raison.** Une surface centrée sur voile interrompt : l'utilisateur quitte visuellement sa question pour lire la théorie, ce qui contredit `D-02` (« la théorie est en support, elle ne s'impose pas ») et annule le bénéfice de `D-09` (l'énoncé ne bouge pas). Le panneau, lui, remplit une colonne qui existe déjà pour ça — la théorie apparaît **à côté** de la question, pas **par-dessus**.

Bénéfice secondaire : une seule mécanique d'ouverture à spécifier pour tous les contenus contextuels, ce qui satisfait la Loi 6 (une seule grammaire).

**Conséquences :**

- La colonne passive n'affiche **qu'un panneau à la fois**. Ouvrir la notion depuis l'indice remplace l'indice ; `Échap` revient au contenu précédent, puis au repos.
- `Échap` ne détruit jamais l'état de la question (`02-interactions.md` §4.3).
- Le focus entre dans le panneau à l'ouverture et **revient à son déclencheur** à la fermeture. Pas de piège de focus : le panneau n'est pas modal, la colonne décisionnelle reste atteignable.
- Le panneau n'est pas modal, donc l'utilisateur peut répondre sans le fermer.

**Ce que ça exclut :** toute modale ; tout voile assombrissant ; toute feuille montant du bas au-dessus de 1024 px ; deux panneaux simultanés.

---

### D-24 — Deux thèmes actifs en V0, clair par défaut
**Date :** 2026-07-30 · **Statut :** actif · **Impacte :** `04-tokens.md`, `05-composants.md`

Les deux thèmes sont définis **et actifs** en V0, avec une bascule accessible à l'utilisateur. Le thème **clair** est celui par défaut.

**Raison.** Les deux palettes sont directement observables sur les intrants : les captures 01 et 05 sont sur canvas noir pur, 02, 03 et 04 sur canvas blanc pur. Définir les deux ne coûte donc presque rien de plus que d'en définir un seul, et réintroduire un second thème après coup obligerait à reprendre tous les tokens. Le clair par défaut correspond à la convention d'un outil de travail et au confort de lecture prolongée d'un contenu pédagogique.

**Conséquence de coût, à assumer :** chaque composant du catalogue doit être vérifié dans les deux thèmes. C'est un doublement du travail de contrôle visuel, pas du travail de conception.

**Règle de rédaction :** aucun composant ne référence une couleur littérale. Tout passe par un token sémantique qui se résout dans les deux thèmes. Un `#FFFFFF` codé en dur dans un composant est un défaut, même s'il est juste en thème clair.

**Ce que ça exclut :** un thème unique ; un jeu de tokens qui ne se résout que dans un thème ; une bascule reportée après la V0.

---

### D-25 — Hauteur de contrôle : 48 px
**Date :** 2026-07-30 · **Statut :** actif · `[PROPOSÉ]` · **Débloque :** `05-composants.md` · **Impacte :** `04-tokens.md`

Tout contrôle interactif — option de réponse, bouton, champ — mesure **48 px** de haut.

**Raison.** Aucune hauteur de contrôle n'est mesurable sur les intrants : ni bouton ni champ n'apparaît entier dans le cadre à une échelle connue (`references/trade-republic-web.md` §4.0). La valeur est donc un choix Skilleo, arrêté sur maquette comparative à 44, 48 et 52 px.

Trois arguments l'ont emporté :

- **48 tombe sur l'échelle d'espacement** — multiple de 4 et de 8, donc composable sans valeur orpheline.
- **Rapport propre au rayon mesuré :** 12 px, soit exactement un quart de la hauteur. Le seul rayon fiable du projet devient une fraction simple du contrôle.
- **Hiérarchie préservée :** l'énoncé à 36 px (`--type-question`) reste nettement dominant. À 44 px, l'option approchait le poids d'une ligne de titre et se mettait à lui disputer l'attention, ce que la Loi 1 interdit.

52 px a été écarté : c'est plausiblement la valeur de l'application **mobile** de la référence, où un pouce a besoin de cette surface. À la souris c'est lourd, et avec deux options par question il n'y a aucun problème de défilement à résoudre.

**Ce que ça exclut :** une hauteur de contrôle variable selon le composant ; un bouton plus haut que son option voisine ; toute justification de 44 ou 52 px par un renvoi à la référence, qui ne dit rien sur ce point.

**Compatible tactile.** 48 px satisfait les recommandations de cible tactile courantes (44 px côté Apple, 48 px côté Material). Le régime sous 1024 px de `D-28` n'impose donc **pas** de hauteur différente — seule la largeur des cibles restera à vérifier, puisqu'une option occupe alors toute la colonne.

**Révisable si :** des questions à quatre ou cinq options apparaissent, ou si des énoncés longs comprimaient trop la colonne décisionnelle.

---

### D-26 — La couleur sémantique se limite à un marqueur
**Date :** 2026-07-30 · **Statut :** actif · `[PROPOSÉ]` · **Impacte :** `04-tokens.md`, `05-composants.md`, `06-ecrans.md`

Juste et faux se signalent par **un marqueur coloré unique** — une icône ou un point. **Le texte et les fonds restent monochromes.**

**Raison.** Aucune couleur d'accent n'apparaît sur les intrants : la référence neutralise même ce qui devrait l'être, la variation `▲ 24,15 %` de la carte produit étant en noir. Mais Skilleo a un besoin que la référence n'a pas — qualifier une réponse — et c'est le signal le plus répété de tout le produit.

Le compromis retenu préserve les deux exigences : la discipline monochrome qui fait l'identité, et une reconnaissance instantanée. Le risque écarté est précis : du vert et du rouge sur le texte des retours ferait ressembler Skilleo à n'importe quelle application de quiz.

**Contraintes fermes :**

- **Jamais la couleur seule.** `01-ux-principes.md` §8. Juste ou faux se lit aussi dans le symbole et dans le texte. La couleur **confirme**, elle n'informe pas. Un utilisateur daltonien perd zéro information.
- **Jamais décorative.** Ces valeurs ne qualifient qu'une réponse. Aucun autre emploi, aucune extension à un état de succès générique.
- **Jamais sur une surface.** Pas de fond vert clair, pas de bordure rouge, pas de bandeau coloré.

**Ce que ça exclut :** du texte de retour coloré ; un fond ou une bordure coloré ; une palette sémantique étendue (avertissement, information) ; l'emploi de ces couleurs hors qualification d'une réponse.

**Reste à trancher :** les valeurs exactes, et leur équivalent en thème sombre. Le marqueur étant petit, elles devront être plus saturées qu'une couleur de texte pour rester lisibles à cette taille.

---

### D-27 — Les valeurs de tokens vivent dans un fichier CSS canonique
**Date :** 2026-07-30 · **Statut :** actif · **Impacte :** `04-tokens.md`, `08-conventions-code.md`

`docs/tokens/tokens.css` porte les valeurs et **est consommé directement par le code**. `04-tokens.md` garde le raisonnement, la provenance et les règles, et **ne répète plus aucun chiffre**.

**Raison.** Une valeur écrite dans un markdown et recopiée dans du code existe à deux endroits, et la règle 3 du `README` est explicite : une doc désynchronisée du code est un mensonge. Le format CSS est retenu plutôt que JSON parce que Tailwind consomme des propriétés personnalisées sans étape de compilation — pas de script d'extraction à écrire ni à maintenir.

**Séparation en trois, désormais stricte :**

| Fichier | Contient | Nature |
|---|---|---|
| `references/trade-republic-web.md` | Ce qu'on a **observé** — valeurs mesurées sur les captures | Descriptif |
| `docs/tokens/tokens.css` | Ce qu'on **applique** — valeurs canoniques | Exécutable |
| `04-tokens.md` | **Pourquoi** et sous quelles règles | Normatif |

Chaque valeur n'existe donc qu'une fois, ce qui satisfait enfin « aucun sujet dans deux documents » sur le seul point où la règle était violée.

**Emplacement.** Le fichier vit sous `docs/tokens/` tant qu'il n'y a pas d'application. Au moment de l'échafaudage Next.js, il **se déplace** dans la feuille de styles globale de l'application et reste canonique — il n'est jamais dupliqué.

**Ce que ça exclut :** toute valeur littérale dans un composant ; toute valeur chiffrée dans `04-tokens.md` ; un second fichier de tokens ; un `tokens.json` en parallèle du CSS.

---

### D-28 — Trois régimes de largeur, la colonne passive passe au-dessus
**Date :** 2026-07-30 · **Statut :** actif, **partiellement révoquée de fait par `D-50`** (`Q-14` point 2) · `[PROPOSÉ]` · **Résout :** `Q-10` · **Impacte :** `04-tokens.md`, `05-composants.md`, `06-ecrans.md`

| Largeur | Régime |
|---|---|
| ≥ 1280 px | Deux colonnes, disposition nominale de `D-09` |
| 1024–1279 px | Deux colonnes, gouttière et colonne passive resserrées |
| < 1024 px | Colonne unique, colonne passive convertie en panneau **en surimpression** |

**Le constat qui a orienté la décision.** Le noyau de Skilleo est intrinsèquement adapté aux écrans étroits : un énoncé et deux options est la disposition la plus naturelle qui existe sur un petit écran. Ce n'est pas la question qui pose problème sous 1024 px, **c'est uniquement la colonne passive.**

**La colonne passive passe au-dessus, jamais en dessous.** Sous 1024 px, indice, notion et retour s'ouvrent en panneau **par-dessus** la colonne décisionnelle, ancré en bas. L'énoncé ne se décale donc pas : il est recouvert, pas poussé. Le bénéfice central de `D-09` est préservé par un autre moyen.

L'empilement vertical naïf est explicitement rejeté : il ferait passer le retour sous l'énoncé, donc décalerait le contenu au moment le plus sensible de la boucle.

La progression, seul contenu permanent de la colonne passive, migre vers une ligne fine sous l'en-tête.

**Où la référence mobile redevient légitime.** La feuille montant du bas, que `D-23` interdit au-dessus de 1024 px parce qu'elle n'a aucun sens sur un écran large, est exactement le bon dispositif en dessous. `D-23` l'avait anticipé en bornant son interdiction. La référence n'était pas inutile — elle était appliquée au mauvais viewport.

**Le toucher conserve le principe de `D-14`.** Un appui **sélectionne**, une validation explicite **répond**. Sur un écran tactile, un appui mal placé est plus probable qu'une erreur de flèche : le principe « le déplacement ne valide jamais » est donc **plus** nécessaire, pas moins.

**Ce que ça exclut :** l'empilement vertical de la colonne passive sous la colonne décisionnelle ; un écran d'invitation à élargir la fenêtre ; un appui unique valant réponse ; l'absence de spécification sous 1024 px ; une hauteur de contrôle différente en régime étroit (`D-25` couvre les deux, seule la largeur des cibles est à vérifier).

---

### D-29 — Le clic sélectionne, il ne répond pas
**Date :** 2026-07-30 · **Statut :** actif · `[PROPOSÉ]` · **Découle de :** `D-14` + `D-28` · **Impacte :** `05-composants.md`, `06-ecrans.md`

Cliquer une option la **sélectionne**. Répondre demande une **action de validation explicite**. Les trois chemins d'entrée se comportent identiquement.

| Chemin | Sélectionner | Répondre |
|---|---|---|
| Clavier | Flèches | `Entrée` |
| Souris | Clic sur l'option | Clic sur l'action primaire |
| Tactile | Appui sur l'option | Appui sur l'action primaire |

**Raison — un trou révélé en rédigeant `06-ecrans.md`.** `D-14` spécifiait le clavier, `D-28` le tactile. **Personne n'avait spécifié la souris.** Deux défauts en découlaient :

1. **Asymétrie.** La souris aurait été à un temps quand le clavier et le tactile en demandent deux. La Loi 6 exige une grammaire unique.
2. **Irréversibilité, et c'est le motif décisif.** Un clic mal placé aurait enregistré une réponse fausse sans retour possible. Dans une application dont le noyau est de répondre et qui mesure les réponses, c'est inacceptable — bien plus grave que le temps supplémentaire que la validation coûte.

**Conséquence de conception, bénéfique.** L'emplacement de l'action primaire devient **stable sur toute la boucle** : il porte « Valider » avant la réponse, « Question suivante » après. Position fonctionnelle inchangée, libellé changeant — exactement ce qu'exige `01-ux-principes.md` §3.2. L'utilisateur agit sans relire.

**Ce que ça exclut :** un clic valant réponse ; un double-clic comme raccourci de validation ; une action primaire qui apparaît seulement après sélection — elle est présente dès le départ, et son emploi sans sélection est traité par un retour, pas par un état désactivé (`05-composants.md` §2).

---

### D-30 — La trajectoire du produit est connue, et elle contraint la V0
**Date :** 2026-07-30 · **Statut :** actif · **Choix de Mohamed** · **Requalifie :** `D-20` · **Impacte :** `09-contenu.md`, `10-architecture.md`

Quatre orientations arbitrées, qui ne s'implémentent pas en V0 mais dictent la forme de ce qu'on y écrit :

| Orientation | Horizon |
|---|---|
| Le produit servira aussi des **formateurs**, pas seulement des apprenants | À terme |
| Un **modèle génératif** sera appelé pour produire ou adapter du contenu | À terme, déjà cadré par `D-08` |
| Les **comptes** arrivent **juste après la V0** | Immédiatement après |
| Les **entreprises** deviennent un client, avec une notion d'organisation | À terme |

**Ce que ça change, et c'est le point.** `D-20` mettait le contenu en MDX versionné. Cette décision était formulée comme un principe ; elle redevient ce qu'elle est : **un choix de V0.** La migration vers une base est désormais **certaine**, pas hypothétique — trois des quatre orientations la rendent inévitable, et deux d'entre elles arrivent tôt.

**Conséquence structurante :** le schéma de contenu doit se projeter en tables **sans réécriture éditoriale.** Concrètement, toute unité de contenu porte un identifiant stable, les relations passent par identifiant et non par emplacement de fichier, et rien de significatif ne vit dans un nom de dossier. C'est la contrainte fondatrice de `09-contenu.md`.

La notion d'**organisation** est posée dès la première migration, pas rétro-ajoutée. Elle n'existe sous aucune forme en V0.

**Ce que ça exclut :** traiter le MDX comme définitif ; un schéma dont l'identité d'une question dépendrait de son chemin de fichier ou de son rang dans la séquence ; construire quoi que ce soit de multi-utilisateur, de multi-rôle ou d'organisation en V0 — `D-22` reste la frontière.

---

### D-31 — La progression V0 est un journal de réponses en ajout seul
**Date :** 2026-07-30 · **Statut :** actif · `[PROPOSÉ]` · **Découle de :** `D-30` + `D-22` · **Impacte :** `10-architecture.md`, `06-ecrans.md`

Le stockage navigateur de `D-22` contient un **journal d'événements en ajout seul** — une entrée par réponse validée — et non un état agrégé.

Chaque entrée porte : l'identifiant de la question, l'option retenue, sa justesse, l'horodatage, et si l'indice avait été consulté avant de répondre. Le journal porte en tête une **version de schéma**.

**Raison.** Les comptes arrivent juste après la V0 (`D-30`). Un journal en ajout seul se rejoue tel quel côté serveur : la migration consiste à envoyer les entrées, dans l'ordre, à un point d'entrée qui les insère. Un état agrégé, lui, aurait perdu l'information nécessaire pour reconstituer l'historique. Le surcoût aujourd'hui est nul — c'est la même quantité de code.

**Tout le reste se calcule.** La question courante, le récapitulatif de fin, le compte de réussites : aucun n'est stocké. Un état dérivé qu'on stocke est un état qui peut diverger de sa source.

**Version de schéma obligatoire.** Un journal dont la version est inconnue ou supérieure à celle que le code sait lire est **ignoré, pas réparé** : le parcours repart de zéro. Une tentative de réparation silencieuse produirait un état inventé, ce qu'interdit la règle numéro un.

**Ce que ça exclut :** un état agrégé comme source de vérité ; un stockage sans version ; une migration de schéma côté client en V0 ; l'écriture du journal ailleurs qu'au moment d'une réponse validée — la sélection ne s'écrit pas (`D-29`).

---

### D-32 — Séquence fixe, aucun moteur de sélection en V0
**Date :** 2026-07-30 · **Statut :** actif · **Choix de Mohamed** · **Impacte :** `09-contenu.md`, `10-architecture.md`

L'ordre des questions du parcours est **écrit**, pas calculé. L'avancement est un **curseur** : le rang de la première question du parcours qui n'a pas d'entrée dans le journal de `D-31`.

**Raison.** Un moteur de sélection est une fonctionnalité à part entière, avec ses propres questions de conception, et la V0 ne cherche pas à le valider. Elle valide le tempo de la boucle (`D-22`). Un ordre fixe rend en outre chaque session comparable à la précédente, ce dont `Q-09` aura besoin.

**Ce que ça exclut :** l'adaptativité, le tirage aléatoire, la répétition espacée, la difficulté dynamique, le saut de question, le retour en arrière sur une question déjà répondue. Aucune de ces fonctions n'a de « petite version » en V0.

---

### D-33 — Les deux couleurs de marqueur sont arrêtées, identiques dans les deux thèmes
**Date :** 2026-07-30 · **Statut :** actif · **Choix de Mohamed** pour les valeurs · **Complète :** `D-26` · **Impacte :** `tokens/tokens.css`, `04-tokens.md`

`--marker-positive: #00A631` et `--marker-negative: #E02B20` passent de `[AV]` à `[PROPOSÉ]`. **Les mêmes deux valeurs servent en thème clair et en thème sombre.**

**Pourquoi une seule paire suffit, alors que `#9B9B9B` / `#686A70` ont dû être dédoublés.** `D-26` restreint le marqueur à une icône ou un point — jamais du texte. Le seuil applicable est donc celui des éléments non textuels, 3:1, et non 4,5:1. Rapports calculés :

| Couleur | Sur `#FFFFFF` | Sur `#000000` |
|---|---|---|
| `#00A631` | 3,23:1 | 6,50:1 |
| `#E02B20` | 4,63:1 | 4,54:1 |

Les quatre franchissent le seuil. Dédoubler aurait ajouté deux valeurs à maintenir sans rien résoudre.

**Ce qui reste vrai malgré tout.** `D-26` n'est pas assoupli : le marqueur ne porte jamais l'information seul. La justesse d'une réponse reste lisible sans percevoir la couleur — forme du marqueur et retour rédigé. Un daltonien profond doit pouvoir faire le parcours entier.

**Ce que ça exclut :** un fond coloré de bonne ou mauvaise réponse ; l'emploi de ces deux couleurs ailleurs que sur le marqueur ; une troisième couleur sémantique ; un recalibrage par thème tant que le marqueur reste non textuel — s'il devenait un jour du texte, cette décision tombe et le seuil redevient 4,5:1.

---

### D-34 — Une seule paire durée/easing en V0
**Date :** 2026-07-30 · **Statut :** actif · `[PROPOSÉ]` · **Débloque partiellement :** `Q-01` · **Impacte :** `tokens/tokens.css`, `07-motion.md`

La V0 dispose d'**une** durée et d'**un** easing, employés partout où quelque chose bouge :

- `--motion-duration: 150ms`
- `--motion-easing: cubic-bezier(0.2, 0, 0, 1)` — sortie décélérée
- Sous `prefers-reduced-motion: reduce`, la durée passe à `1ms`.

**Raison.** `Q-01` bloquait `07-motion.md` faute d'enregistrement d'écran de la référence, et le blocage était juste : on ne déduit pas une courbe d'une image fixe. Mais l'alternative n'était pas « attendre », c'était « chaque composant invente sa durée » — soit exactement la dérive que `D-27` cherche à empêcher. Une valeur unique, assumée comme un choix Skilleo et non comme une mesure, coûte une ligne à réviser le jour où les enregistrements arrivent.

**Ces valeurs ne prétendent rien de Trade Republic.** Elles sont marquées `[PROPOSÉ]`, pas `[DÉDUIT]`. `Q-01` reste ouverte pour tout le reste.

**Ce que ça exclut :** une seconde durée, un second easing, un rebond, un délai en cascade, une animation d'entrée d'écran ; toute durée écrite dans un composant.

---

### D-35 — Deux thèmes et une bascule : `D-24` l'emporte
**Date :** 2026-07-30 · **Statut :** actif · **Choix de Mohamed** · **Résout :** `Q-11` · **Impacte :** `03-navigation.md`, `06-ecrans.md`

`Q-11` opposait `D-24` (deux thèmes actifs, bascule accessible) à `D-22` (pas d'écran de réglages) et à `03-navigation.md` §3 (chrome minimal). **`D-24` est confirmée sans réserve.** C'est `03-navigation.md` §3 qui est amendé.

**Domicile de la bascule :** le chrome permanent, comme accès discret d'anneau 4. Le §3 autorisait déjà « un accès discret aux destinations d'anneau 1 et 4, quand elles existeront » — la bascule est la première à exister. L'amendement consiste à lever la restriction « en V0, le chrome se limite à l'identité et à la progression ».

**Contrainte d'anneau, explicite.** La bascule vit en anneau 3 ou 4. Elle n'entre jamais en anneau 0 ni 1 : elle ne concurrence ni l'énoncé, ni les options, ni l'action primaire. Concrètement, elle est le dernier élément du chrome, à l'opposé de l'identité, en typographie de label et sans couleur propre.

**Défaut au premier chargement :** la préférence système. Le thème clair de `D-24` est le défaut **quand le système n'exprime rien**. Le choix explicite de l'utilisateur, lui, l'emporte sur le système et persiste — même mécanisme de stockage que `D-31`, entrée distincte du journal.

**Ce que ça exclut :** un écran de réglages en V0 (`D-22` tient sur tout le reste) ; une bascule en position d'action ; une transition de thème animée ; un thème imposé sans possibilité de changer.

---

### D-36 — Un seul retour par question
**Date :** 2026-07-30 · **Statut :** actif · **Choix de Mohamed** · **Précise :** `D-15` · **Impacte :** `09-contenu.md`, `06-ecrans.md`

Le retour court de `D-15` est **un texte unique par question**, affiché quelle que soit l'option retenue. Le marqueur dit si c'est juste ; le retour explique la bonne réponse.

**Raison.** Un retour par option aurait multiplié la charge de rédaction par le nombre d'options, et `D-22` établit que **la rédaction est le goulot d'étranglement du projet, pas le code.** À budget de rédaction constant, un retour unique sur un parcours entier vaut mieux qu'un retour ciblé sur un tiers de parcours.

**La limite, à assumer.** L'utilisateur qui se trompe apprend ce qui était juste, pas pourquoi *son* choix était faux. C'est une perte pédagogique réelle. Elle est acceptée pour la V0 et doit être réexaminée quand `Q-09` livrera ses résultats.

**Conséquence rédactionnelle.** Le retour étant lu autant après une erreur qu'après une réussite, il ne peut ni féliciter, ni sanctionner : il énonce. `01-ux-principes.md` §5 interdisait déjà la célébration ; ici c'est la structure du contenu qui l'interdit en plus.

**Ce que ça exclut :** un retour par option ; un champ facultatif de réfutation par option — le schéma ne le prévoit pas, pour ne pas créer un contenu à deux régimes ; un retour différent selon que l'indice a été consulté.

---

### D-37 — La notion est partagée, référencée par identifiant
**Date :** 2026-07-30 · **Statut :** actif · **Choix de Mohamed** · **Précise :** `D-16` · **Impacte :** `09-contenu.md`

Les notions vivent dans leurs **propres fichiers**. Chaque question **pointe vers un identifiant de notion**. Plusieurs questions peuvent viser la même notion ; chaque résumé n'est écrit qu'une fois.

**Raison.** C'est `D-27` appliqué au contenu : une chose n'existe qu'à un endroit. Écrire le résumé dans le fichier de la question aurait dupliqué tout résumé réutilisé, et une duplication finit toujours par diverger. C'est aussi ce qui rend la projection en tables de `D-30` immédiate — une table de questions, une table de notions, une clé étrangère.

**La référence est obligatoire.** Toute question désigne exactement une notion. Aucune question sans notion : le panneau de la colonne passive n'a donc jamais d'état vide à traiter, ce qui retire un état à `06-ecrans.md` plutôt que d'en ajouter un.

**Une référence brisée arrête la construction.** Une question pointant vers un identifiant inexistant fait échouer le `build`, elle ne dégrade pas l'affichage. Un contenu manquant ne se rattrape pas silencieusement.

**Ce que ça exclut :** un résumé de notion écrit dans le fichier d'une question ; une question sans notion ; une notion référencée par son chemin de fichier plutôt que par son identifiant ; plusieurs notions par question — si une question en demande deux, elle demande à être scindée.

---

### D-38 — Questions en YAML, notions en MDX
**Date :** 2026-07-30 · **Statut :** actif · `[PROPOSÉ]` · **Précise :** `D-20` · **Impacte :** `09-contenu.md`, `08-conventions-code.md`

Le contenu éditorial reste en fichiers versionnés (`D-20`), réparti en deux formats :

| Unité | Format | Pourquoi |
|---|---|---|
| Parcours, question | `.yaml` | Aucune prose à mettre en forme — un énoncé, des libellés, deux phrases de retour, tous sans titre ni lien |
| Notion | `.mdx` | De la prose : emphase, énumération, exemple |

**Raison.** `D-20` disait « MDX » quand la seule alternative envisagée était une table Supabase ; le point de la décision était « fichiers versionnés », pas le format. Or une question est de la donnée structurée : la mettre en MDX obligerait soit à tout empiler dans le frontmatter en laissant un corps vide, soit à inventer des séparateurs dans le corps pour délimiter l'énoncé, l'indice et le retour. Les deux ajoutent une convention à respecter sans rien apporter.

**Ce que ça ne change pas.** Le contenu reste dans le dépôt, relu en `diff`, sans back-office (`D-22`). La projection en tables de `D-30` est identique pour les deux formats.

**Ce que ça exclut :** une notion en YAML ; une question en MDX ; un troisième format ; du JSON, qui n'admet pas de commentaire et supporte mal les textes multilignes.

---

### D-39 — Survol et focus sont tranchés en `[PROPOSÉ]`, sans attendre la référence
**Date :** 2026-07-30 · **Statut :** actif · `[PROPOSÉ]` · **Choix de Mohamed** · **Résout :** `Q-03` · **Résout :** le point `[À VALIDER]` de `D-13` · **Impacte :** `tokens/tokens.css`, `02-interactions.md`, `05-composants.md`

`Q-03` attendait des enregistrements d'écran pour spécifier le survol et le focus. **La méthode de `D-34` est appliquée telle quelle :** on tranche maintenant en choix Skilleo assumé, on écrit `[PROPOSÉ]`, et on révisera le jour où `Q-01` point 3 livrera ses intrants.

**Raison, identique à `D-34`.** L'alternative à « trancher » n'était pas « attendre » : c'était « chaque composant invente son survol au moment de l'écrire ». Une valeur inventée dans un composant est plus difficile à corriger qu'une valeur inventée dans `tokens.css`, parce qu'elle est invisible depuis la doc. Le coût de révision d'un token est d'une ligne.

**Ce qui manquait réellement.** `02-interactions.md` §2 et `05-composants.md` §2 décrivaient déjà le patron de survol qualitativement — promotion de ton, couleur et graisse seules. Trois trous concrets subsistaient, et ce sont eux que cette décision comble.

**1. L'épaisseur de contour n'avait aucune valeur.** `05-composants.md` §4.2 écrivait « contour épaissi » sans dire de combien. Deux tokens : `--border-width` et `--border-width-strong`.

**2. Un contour qui s'épaissit pousse le contenu — ce qui viole R5.** Passer une `border` de 1 à 2 px déplace le texte de l'option d'un pixel. Le remède n'est pas de compenser par un `padding`, qui oblige à maintenir deux valeurs en miroir : **le contour d'un contrôle est un `box-shadow` en `inset`, jamais une propriété `border`.** Une ombre portée ne participe pas au modèle de boîte, donc son épaisseur ne déplace rien, par construction et non par compensation. C'est le seul emploi de `box-shadow` autorisé dans le système — il ne contredit pas `04-tokens.md` §7, qui interdit les ombres *portées*, c'est-à-dire l'illusion de relief.

**3. Le bouton primaire n'avait pas de survol possible.** Le patron « ton tertiaire → ton primaire » suppose un texte dont le ton peut monter. Un bouton primaire est une surface pleine : il n'a pas de ton à promouvoir. Règle : **le remplissage fait un pas vers le fond de page.** `--fill-primary-hover` vaut `#262626` en thème clair et `#D9D9D9` en thème sombre. Le contraste du libellé reste au-dessus de 14:1 dans les deux cas — la lisibilité n'est jamais l'ajustement de variable.

**4. Le raccourci de l'indice est `I`.** `D-13` le laissait `[À VALIDER]`. Une lettre nue est sans risque parce que `D-22` exclut tout champ de saisie libre de la V0 : aucune frappe ne peut être destinée à autre chose. `I` n'entre en conflit ni avec les flèches, ni avec `Entrée`, ni avec `Échap`, ni avec `Tab`, n'est un raccourci navigateur sous aucun modificateur, occupe la même position physique en AZERTY et en QWERTY, et porte l'initiale du mot affiché. Le raccourci reste **affiché** à côté de la ligne `Indice` : un raccourci non montré n'existe pas.

**Ce que ça ne change pas.** Le focus reste toujours plus fort que le survol (`02-interactions.md` §2.2), l'anneau reste en `--focus-ring-color` sans couleur d'accent, et rien ne devient atteignable au survol seul (Loi 5).

**Ce que ça exclut :** une `border` sur un contrôle ; une compensation de `padding` pour absorber un épaississement ; une troisième épaisseur ; un survol qui modifie une dimension, une position ou un rayon ; un survol de bouton primaire par changement de teinte plutôt que de clarté ; un raccourci d'indice non affiché.

**Ce qui reste ouvert malgré cette décision :** ces valeurs ne prétendent rien de Trade Republic. `Q-01` point 3 reste ouverte, et son arrivée déclenche une révision — pas une réécriture, les quatre points ci-dessus sont localisés dans `tokens.css` et dans deux tableaux d'états.

---

### D-40 — La V0 s'évalue en sessions observées, sans aucun instrument de mesure
**Date :** 2026-07-30 · **Statut :** actif · **Choix de Mohamed** · **Résout :** `Q-09` · **Impacte :** `10-architecture.md`, `06-ecrans.md`

`Q-09` constatait que `D-22`, en excluant compte, capture d'email, formulaire de retour et statistiques, privait la V0 de tout moyen de savoir si elle fonctionne. **La voie retenue est l'observation directe : Mohamed s'assoit à côté de trois ou quatre personnes et les regarde faire.** Aucun événement n'est émis, aucune donnée ne quitte le navigateur.

**Raison.** À ce volume, l'observation est strictement plus informative que l'instrumentation. Un taux de décrochage dit *où* ; une personne qui hésite à voix haute dit *pourquoi*. Et la V0 cherche à valider le tempo de la boucle (`D-22`), qui est précisément ce qu'un compteur ne mesure pas.

**Trois conséquences, qui sont le vrai contenu de la décision.**

**1. La V0 n'est pas diffusée.** Elle est montrée. Une adresse publique qu'on ne communique pas reste acceptable ; une annonce ne l'est pas. C'est une contrainte sur Mohamed, pas sur le code.

**2. Le régime étroit de `D-28` cesse d'être urgent.** Les sessions ont lieu devant un ordinateur. `D-28` reste spécifiée et n'est pas révoquée — la spécification est écrite, elle coûte désormais zéro à conserver — mais son implémentation peut suivre celle des largeurs nominales au lieu de l'accompagner.

**3. Le journal de `D-31` ne sert à rien pour cette évaluation, et c'est voulu.** Il reste conçu pour la migration vers les comptes, pas pour la mesure. Aucun point d'entrée serveur, aucun envoi, aucune agrégation n'entre en V0.

**Ce que l'observation ne dira pas.** Rien sur le comportement d'inconnus, rien sur la rétention, rien à un volume statistique. C'est accepté : ces questions n'appartiennent pas à une V0 dont le seul enjeu est de savoir si la boucle tient debout.

**Ce que ça exclut :** toute analytique, y compris anonyme et auto-hébergée ; un compteur envoyé au serveur ; un ping de démarrage de session ; une capture d'email « juste pour savoir qui essaie » ; un formulaire de retour en fin de parcours. Aucun de ces éléments n'a de « petite version » en V0.

**Réexamen.** Cette décision vaut pour la V0 seule. Les comptes arrivent juste après (`D-30`) et rouvrent entièrement le sujet, avec une base sur laquelle mesurer.

---

### D-41 — Le module source est un niveau 0, jamais publié
**Date :** 2026-07-30 · **Statut :** actif · **Choix de Mohamed** · **Étend :** `D-16` · **Impacte :** `09-contenu.md`

Une session de rédaction menée hors de ce dépôt a produit un module de formation long, expert et sourcé (« Les Skills de Claude », douze parties). Cet objet n'entrait dans aucun des deux niveaux de `D-16`. Il en devient le **niveau 0** :

| Niveau | Objet | Publié ? |
|---|---|---|
| **0 — module source** | Le corpus expert complet sur un sujet, sourcé, long | **Jamais** |
| **1 — résumé** | Atomique, tient sans défiler dans la colonne passive | Oui, V0 |
| **2 — page complète** | Développement, exemples | Hors V0 (`D-22`) |

**Le module ne s'affiche nulle part.** Questions, options, indices, retours et résumés en sont **extraits**. C'est la matière première, pas un écran.

**Raison.** Sans lui, la règle de fidélité factuelle de `D-42` n'a nulle part où s'appliquer : on ne source pas une phrase de dix mots. Le module est l'endroit où l'expertise est établie et vérifiée une fois, pour que les unités publiées puissent être courtes sans être creuses. Il explique en outre pourquoi une question est posée, ce que l'écran n'a pas la place de dire.

**Traçabilité obligatoire.** Toute question et toute notion désigne le module dont elle est extraite. Une unité de contenu sans source déclarée est un défaut de rédaction, au même titre qu'une valeur non marquée dans la documentation.

**Emplacement : dans le dépôt**, aux côtés des questions et des notions, malgré son statut non publié. Une source qui vit hors du dépôt peut changer sans que rien ne le signale, et la traçabilité devient une déclaration invérifiable. Le format est le `.mdx` des notions (`D-38`) : c'est de la prose.

**La V0 n'en tire qu'une fraction.** Un module couvre bien plus que ce qu'un parcours de V0 emploie. C'est normal et voulu : le surplus sert les parcours suivants sans être réécrit.

**Ce que ça exclut :** un module rendu à l'écran, même partiellement ; un module hors du dépôt ; une question sans source déclarée ; l'emploi d'un module comme page complète de notion — le niveau 2 se rédige, il ne se découpe pas depuis le niveau 0.

---

### D-42 — Charte de rédaction du contenu, opposable, limitée au contenu
**Date :** 2026-07-30 · **Statut :** actif · **Choix de Mohamed** · **Impacte :** `09-contenu.md`

Tout contenu de formation Skilleo respecte une charte de style **opposable** : un contenu qui la viole se corrige, il ne se discute pas.

**Périmètre exact.** La charte régit les énoncés, les libellés d'options, les indices, les retours, les résumés de notions et les modules sources. **Elle ne régit pas `docs/`.** La documentation interne est dense, structurante, et vit de tableaux et d'emphase ; lui appliquer une charte conçue pour de la prose pédagogique imposerait la réécriture des onze documents sans bénéfice pour un seul lecteur. Cette exemption est écrite ici pour qu'aucun agent ne l'entreprenne au nom de la charte.

**Les règles elles-mêmes sont dans `09-contenu.md`**, pas ici, conformément à `D-27` : une règle n'existe qu'à un endroit. Cette décision fixe leur statut, pas leur contenu.

**Origine.** La charte est née d'un audit du skill `humanizer` sur un premier jet, dont elle a listé les tics. Ce sont donc des défauts observés sur notre propre production, pas des préférences théoriques.

**Ce que ça ne coûte pas.** L'interdiction quasi totale du gras est indolore pour Skilleo : `D-11` fait du paragraphe à deux tons un composant de premier rang, ce qui donne déjà un mécanisme d'emphase, meilleur parce qu'il tient sur deux niveaux de lecture au lieu d'un. La charte retire un outil que le système avait déjà remplacé.

**Ce que ça exclut :** une dérogation ponctuelle « parce que ça se lit mieux ici » ; une charte appliquée à `docs/` ; une charte gardée en tête plutôt qu'écrite.

---

### D-43 — Fidélité factuelle du contenu : aucun chiffre sans source
**Date :** 2026-07-30 · **Statut :** actif · **Choix de Mohamed** · **Applique :** la règle numéro un au contenu · **Impacte :** `09-contenu.md`

Aucun chiffre, aucun nom, aucune date n'entre dans un contenu Skilleo sans provenir d'une source vérifiable. **Quand un chiffre rendrait la phrase plus convaincante mais n'existe pas, on écrit la phrase sans chiffre.**

**Ce n'est pas une précaution théorique.** L'audit du premier jet a trouvé deux fabrications pures (« là où 80 % des skills échouent », « le skill tournera sur 10 000 cas ») et une infidélité à la source (dix requêtes de test annoncées là où la documentation en dit huit à dix). Les trois étaient plausibles, et c'est exactement ce qui les rendait dangereuses.

**Pourquoi la règle est plus stricte pour le contenu que pour le reste du projet.** Une erreur dans `docs/` gêne trois personnes qui la corrigent. Une erreur dans un contenu de formation est enseignée, retenue, puis répétée par ceux qui l'ont apprise. Le contenu est le seul endroit du projet où une erreur se propage toute seule.

**La règle numéro un s'applique donc mot pour mot au contenu :** face à un manque, on s'arrête et on demande, on ne comble pas par une invention plausible.

**Ce que ça exclut :** un chiffre d'illustration ; un ordre de grandeur non sourcé ; une citation reconstituée de mémoire ; une statistique sans référence ; un exemple présenté comme réel s'il est inventé — un exemple inventé se présente comme tel.

---

### D-44 — On contextualise avant de vulgariser, et jamais par la syntaxe
**Date :** 2026-07-30 · **Statut :** actif · **Choix de Mohamed** · **Impacte :** `09-contenu.md`

Tout contenu Skilleo suit une progression imposée : **contextualiser, puis vulgariser, puis détailler, puis aller vers l'ingénierie.** Jamais l'inverse, et jamais un saut.

**La règle négative est la partie utile :** on n'entre jamais par la syntaxe. Un apprenant qui voit la forme d'un fichier avant d'avoir compris à quoi il répond a mémorisé une recette. Il saura la reproduire et pas la transposer, ce qui est exactement l'échec que Skilleo existe pour éviter (`00-produit.md`).

**Chaque sujet se rattache explicitement à un fil conducteur.** Sur le corpus IA, ce fil est la **mise en contexte** : un modèle ne travaille qu'à partir de ce qui se trouve dans sa fenêtre au moment où il répond, et tous les mécanismes de l'écosystème sont des réponses différentes à cette même question. Un module qui ne se rattache à rien produit des connaissances isolées, donc inutilisables.

**Outil de diagnostic réutilisable, dérivé du fil.** Devant un mécanisme ou devant un besoin, quatre questions : **quoi** (quelle information est injectée), **quand** (toujours, ou sous condition), **où** (quelle portée), **pour qui** (l'assistant principal, ou un exécutant secondaire). L'intérêt est qu'elle transforme une question de conception en réflexe, sans rien à mémoriser.

**Ce que ça exclut :** un contenu qui ouvre sur un extrait de code ou de configuration ; un module sans rattachement explicite à son fil conducteur ; une progression qui détaille avant d'avoir vulgarisé ; l'enseignement d'un mécanisme comme une liste d'options plutôt que comme une réponse à un besoin.

---

### D-45 — Le cadre est plafonné en largeur, puis centré
**Date :** 2026-07-31 · **Statut :** actif · `[DÉDUIT]` · **Choix de Mohamed** · **Amende :** `D-09` · **Impacte :** `04-tokens.md`, `06-ecrans.md`

Les pourcentages de colonnes de `D-09` ne s'appliquent plus au viewport mais à un **cadre plafonné en largeur, centré**. En deçà du plafond rien ne change, le plein cadre reste vrai. Au-delà, le cadre cesse de se dilater et le reste se répartit également de chaque côté.

**Le plafond n'est pas un choix esthétique, c'est une réconciliation.** `--gutter` a été **mesuré en relatif** — 1,1 % du viewport de référence — puis figé en **absolu**, 16 px. Les deux ne coïncident qu'à une seule largeur : celle du viewport de référence normalisé, **1469 px CSS**. Plafonner le cadre là rend au token sa mesure — au plafond, `--gutter` vaut de nouveau 1,1 % du cadre. À 2560 px il n'en valait plus que 0,6 %, et l'argument de `04-tokens.md` §4.1 était devenu faux sans que rien ne le signale.

**Cohérence avec `D-28` :** 1469 px est supérieur à 1280 px, seuil de la disposition nominale. Les trois régimes de largeur continuent de se lire sur le **viewport**, jamais sur le cadre — le plafond ne crée pas un quatrième régime.

**Ce que ça n'améliore pas.** Sous 1469 px — donc sur la capture qui a motivé cette décision — `D-45` ne change **rien**. Elle empêche une dégradation sur écran large, elle ne remplit aucun vide. Le vide constaté relève de `D-46`.

⚠️ **Le plafond hérite de l'incertitude de `Q-01` point 4.** 1469 px est `[DÉDUIT]` et non confirmé. Si la normalisation est fausse, le plafond l'est du même facteur constant que tous les px du projet. Il ne dégrade rien de plus, mais il ne se présente pas comme mesuré.

**Ce que ça exclut :** un cadre plafonné dont les colonnes repasseraient en largeurs fixes ; un plafond inférieur à 1280 px, qui écraserait le régime nominal de `D-28` ; une valeur de plafond par gabarit.

---

### D-46 — Le bloc décisionnel est centré verticalement, à hauteur constante
**Date :** 2026-07-31 · **Statut :** actif · `[PROPOSÉ]` · **Choix de Mohamed** · **Comble :** l'absence totale de règle verticale · **Impacte :** `04-tokens.md`, `06-ecrans.md`

**Le trou que cette décision comble.** `04-tokens.md` §4.1 affirmait que la respiration vient « du découpage en colonnes **et du vide vertical** ». Le projet spécifiait ensuite 100 % des colonnes et 0 % du vertical. L'implémentation a donc aligné en haut dans un conteneur étiré, produisant une zone morte de plus de la moitié de la hauteur. C'est la conséquence mécanique d'un manque, pas une liberté prise par l'implémenteur.

**La règle.** Le bloc décisionnel — repère, énoncé, groupe d'options, action primaire — est **centré verticalement dans la hauteur disponible sous le chrome**. La colonne passive partage son bord supérieur et s'écoule vers le bas ; la progression reste le dernier élément de ce flux et n'est **jamais** ancrée au bas de la fenêtre.

**La contrainte qui rend la règle applicable, et qui n'est pas négociable : `G3`.** Un bloc centré dont la hauteur varie déplace l'énoncé, ce que `G3` interdit. Donc **la hauteur du bloc décisionnel ne varie pas entre les états d'une même question.** Conséquence directe : le retour local « choisis une option avant de valider » occupe un **emplacement à hauteur réservée**, présent et vide tant qu'il ne s'affiche pas. Sans cette réserve, centrage et `G3` sont incompatibles — et c'est `G3` qui l'emporterait.

**Dégradation.** Si le bloc dépasse la hauteur disponible, le centrage cède : alignement en haut, la page défile. Un contenu tronqué ou un bloc centré en débordement sont deux échecs, pas des cas limites.

**Ce que ça exclut :** un centrage calculé sur un contenu de hauteur variable ; une progression collée au bas de la fenêtre ; le remplissage du vide par un élément décoratif. Le vide vertical reste un moyen de respiration — il est désormais **réparti**, au lieu d'être accumulé en bas.

---

### D-47 — Le déclencheur au repos est lisible
**Date :** 2026-07-31 · **Statut :** ~~actif~~ **caduque le jour même, `D-50` supprime le composant** · `[PROPOSÉ]` · **Choix de Mohamed** · **Amende :** `D-13` · **Ouvre :** `Q-12` · **Impacte :** `02-interactions.md`, `05-composants.md`, `06-ecrans.md`

| État | `D-13` | `D-47` |
|---|---|---|
| Repos | `--text-tertiary` — 1,60:1 clair · 2,23:1 sombre | `--text-secondary` — 2,78:1 clair · 3,88:1 sombre |
| Survol **ou** focus | `--text-primary` | inchangé |
| Ouvert | `--text-primary` | inchangé |

**Raison.** `globals.css` classe lui-même `--text-tertiary` comme « **non destiné à être lu** », et l'emploie pour les options écartées après réponse — c'est-à-dire pour du contenu dont on ne veut plus. Y peindre le seul accès à l'indice et à la théorie contredit `D-13` dans son intention même : « présente, silencieuse, ignorable sans coût » suppose qu'on puisse la voir avant de choisir de l'ignorer. À 1,60:1 sur un rendu réel, la colonne passive se lit comme vide.

**Ce qui ne change pas :** la demande d'aide reste un acte délibéré — clic ou raccourci, jamais le survol — et le motif de mise en évidence reste couleur et graisse seules, sans fond ni bordure (`D-13`, `references/trade-republic-web.md` §5.2).

**Ce que ça exclut :** un déclencheur en `--text-primary` au repos, qui en ferait un appel à l'action ; un fond, une bordure ou une icône pour le rendre visible ; l'emploi de `--text-tertiary` pour tout élément que l'utilisateur doit pouvoir **trouver**.

---

### D-48 — L'indice et l'explication s'écrivent à deux tons
**Date :** 2026-07-31 · **Statut :** actif · **Choix de Mohamed** · **Étend :** `D-11` · **Impacte :** `05-composants.md`, `09-contenu.md`, `06-ecrans.md`

`D-11` faisait de `TexteDeuxTons` la forme du retour après réponse. Il devient la forme de **tout** contenu de la colonne passive — indice, retour, notion.

L'amorce en `--text-primary` porte l'idée phare et **se suffit à elle-même** ; la suite en `--text-secondary` développe. Un lecteur qui ne lit que le noir a déjà l'essentiel ; c'est le critère de recette, pas une intention.

**Conséquence de rédaction, opposable.** Tout contenu passif se rédige en **deux fragments distincts dans le fichier source**, jamais en une phrase que le rendu découperait. Le contrat vit dans `09-contenu.md`.

**Ce que ça exclut :** un indice d'un seul ton ; une amorce incompréhensible sans sa suite ; `--text-tertiary` en second ton (`05-composants.md` §6) ; un troisième ton.

---

### D-49 — Trois moments exclusifs, jamais deux contenus à la fois
**Date :** 2026-07-31 · **Statut :** actif · **Choix de Mohamed** · **Révoque :** l'offre simultanée de `D-13` · **Impacte :** `02-interactions.md`, `06-ecrans.md`

| Moment | Contenu | Disponibilité |
|---|---|---|
| Avant validation | Indice | Uniquement avant |
| Après validation | Retour (`D-15`, `D-36`) | Uniquement après |
| Troisième temps | Notion | `[À VALIDER]` — `Q-14` |

Aujourd'hui l'indice et la notion sont offerts **en même temps**, par deux déclencheurs empilés. C'est fini : la colonne passive ne porte qu'un contenu, déterminé par **le moment de la boucle**, jamais par un choix de l'utilisateur.

**Raison.** Deux portes ouvertes simultanément obligent à choisir avant de savoir ce qu'il y a derrière. C'est un coût de décision, et `D-09` interdit à cette colonne d'en porter un seul.

**Ce que ça exclut :** un indice après validation ; un retour avant ; deux contenus empilés ; un moyen de revenir au contenu précédent — `Échap` n'a plus de pile à dépiler.

⚠️ **Le passage du retour à la notion n'est pas tranché** (`Q-14`). Marqué `[À VALIDER]`, donc **non implémentable** : la V0 s'arrête au deuxième moment tant que rien n'est décidé.

---

### D-50 — Le contenu passif est appelé par la latence, plus par un déclencheur
**Date :** 2026-07-31 · **Statut :** actif · `[PROPOSÉ]` · **Choix de Mohamed** · **Révoque :** `D-13`, `D-47` · **Amende :** `D-12` (Loi 5), `G4`, `D-28` · **Ouvre :** `Q-14`

Les lignes cliquables `Indice` et `Voir la notion` disparaissent. Le composant `Declencheur` sort de la V0.

| Étape | Ce qui se passe |
|---|---|
| Avant le seuil | Colonne passive au repos, sans contenu ni appel |
| Au seuil — **10 s** `[P]` sans réponse | Un motif animé paraît au centre de la colonne (`D-51`) |
| Au survol du motif | Le contenu du moment se révèle en `TexteDeuxTons` (`D-48`, `D-49`) |

**Ce que ça coûte, écrit pour que personne ne le redécouvre en recette.** `D-13` justifiait le clic ainsi : « la demande d'aide doit rester un acte délibéré, parce que c'est le **signal qu'on veut mesurer** ». Ce signal-là disparaît, alors que `D-40` fait reposer l'évaluation de la V0 sur des sessions observées.

**Ce qui le remplace vaut mieux, et c'est la raison d'accepter le coût.** Le seuil **est** une mesure : « a hésité plus de dix secondes » est un fait observable, là où « a cliqué sur Indice » mêlait l'hésitation, la curiosité et le hasard du curseur. Le signal change de nature ; `D-40` doit être relue à cette lumière, non contredite.

**La Loi 5 est amendée, pas contournée.** `D-12` posait que le survol « ne porte jamais seul ». Il porte désormais seul, et `Q-14` en constate le prix au lieu de le taire.

**`G4` est révoquée sur l'écran de question.** La colonne passive est vide avant le seuil, délibérément. Le vide devient l'état de repos — c'est lui qui donne son sens à l'apparition.

**Ce que ça exclut :** tout élément cliquable pour dévoiler ; un libellé « Indice » ou « Théorie » ; une révélation avant le seuil ; un rappel de l'aide une fois le curseur reparti ; un second seuil — sauf si `Q-14` en décide autrement.

---

### D-51 — Un motif animé noir et blanc, tranché en `[PROPOSÉ]`
**Date :** 2026-07-31 · **Statut :** actif · `[PROPOSÉ]` · **Choix de Mohamed** · **Débloque partiellement :** `07-motion.md` · **Impacte :** `04-tokens.md`, `05-composants.md`

`Q-01` point 2 reste ouverte — aucune valeur de mouvement ne se déduit d'une image fixe. Le projet a déjà tranché deux fois dans cette situation plutôt qu'attendre (`D-34`, `D-39`). Il tranche une troisième.

| Propriété | Règle |
|---|---|
| Palette | Noir et blanc seuls. Aucune couleur, `--marker-*` compris (`D-26`) |
| Emplacement | Centré dans la colonne passive, horizontalement **et** verticalement |
| Volume | Visible sans concurrencer l'énoncé — **jamais plus grand que le registre `--type-question`** |
| Durée, courbe | La paire unique de `D-34`. Aucune valeur nouvelle |
| Mouvement | Continu tant que le contenu n'est pas révélé ; s'arrête à la révélation |
| Mouvement réduit | `D-34` : le motif **reste**, l'animation tombe. Il ne disparaît jamais |

**Raison du noir et blanc.** `D-26` limite la couleur à un marqueur de justesse. Un motif animé coloré au centre de l'écran en ferait la chose la plus saillante de la page, au moment précis où l'attention doit rester sur l'énoncé.

**Ce que ça exclut :** une couleur d'accent ; un compte à rebours visible, qui changerait l'attente en pression ; un motif qui subsiste après révélation ; une seconde paire durée/easing.

⚠️ **Révision garantie à l'arrivée de `Q-01` point 2.** Choix Skilleo assumé, sans prétention à refléter la référence.

---

## Questions ouvertes

Ordre de priorité décroissante. Rien de bloqué par ces questions ne doit être implémenté.

### Q-01 — Intrants de mesure Trade Republic
**Bloque :** `07-motion.md` seul. `04-tokens.md` et `05-composants.md` sont **débloqués** par `D-33`, `D-34` et `D-39`, qui tranchent en `[PROPOSÉ]` assumé plutôt que d'attendre.
**Avancement 2026-07-30 :** premier lot reçu — 6 captures du **site marketing** + 1 page de connexion. Dépouillé dans [`references/trade-republic-web.md`](./references/trade-republic-web.md). Couleurs et géométrie desktop mesurées.

**Ce que son arrivée déclenchera :** une **révision** de `D-34` et `D-39`, pas une réécriture. Les valeurs concernées sont localisées dans `tokens/tokens.css` et dans deux tableaux d'états.

Ce qui manque encore, par ordre d'utilité :

1. **Captures de `app.traderepublic.com`** — l'application web, pas le site marketing. C'est l'intrant décisif : deux produits web desktop, exactement le même problème de transposition à résoudre. Écrans utiles : une vue principale avec information dominante · une surface secondaire ouverte par-dessus · une liste · un champ de recherche · un formulaire · un état de chargement · un état vide · un état d'erreur. *(Penser à masquer les montants personnels — seule la structure m'intéresse.)*
2. **Enregistrements d'écran** des transitions. **Aucune valeur de mouvement n'est déductible d'une image fixe.** Le rapport ChatGPT avait inventé l'intégralité de ses durées et easings.
3. **États de survol et de focus.** Invisibles sur une capture statique — et c'est précisément le trou desktop de `Q-03`. Il faut une vidéo, ou l'accès navigateur.
4. **Confirmation de la normalisation :** largeur de la fenêtre du navigateur et densité d'écran lors des captures 01–05. L'hypothèse DPR 2 / viewport 1469 px CSS est cohérente sur trois éléments indépendants, mais reste `[DÉDUIT]`. Si elle est fausse, toutes les valeurs en px CSS sont fausses d'un facteur constant — les ratios, eux, restent valides.
5. **Accès navigateur (option la plus efficace).** Avec l'extension Claude in Chrome installée et connectée, je lis directement les styles calculés : polices, tailles, rayons, couleurs, durées de transition. On passerait de `[DÉDUIT]` à `[CONFIRMÉ]` sur presque tout, sans mesure au pixel. Extension : `https://chromewebstore.google.com/detail/fcoeoabgfenejglbffodgkkbkcdhcgfn`

---

### Q-12 — `--text-secondary` ne franchit pas le seuil de texte
**Ouverte par :** `D-47` · **Bloque :** la case « aucune information portée par la couleur seule / vérifié dans les deux thèmes » de `06-ecrans.md` §8

Mesures : `--text-secondary` donne **2,78:1** en clair (#9B9B9B sur #FFFFFF) et **3,88:1** en sombre (#686A70 sur #000000). Le seuil applicable au texte courant est **4,5:1**. Les deux thèmes échouent, et cette couleur porte le repère de position, la progression, le corps des panneaux, et désormais les déclencheurs.

**Ce n'est pas un effet de `D-47`**, qui fait passer le déclencheur de 1,60 à 2,78. C'est une dette antérieure que `D-47` rend visible.

**La tension est réelle :** `--text-secondary` est `[MESURÉ]` sur la référence. L'assombrir, c'est s'écarter d'une valeur mesurée pour une raison qui n'a rien à voir avec la fidélité. Trois issues, aucune tranchée :

1. assombrir la valeur appliquée et consigner l'écart à la mesure ;
2. assumer l'échec et l'écrire, en acceptant qu'il figure dans tout audit ;
3. séparer un ton **mesuré** (fidélité, documentation) d'un ton **appliqué** (lisibilité, code) — ce qui contredirait `D-27`, une valeur n'existant qu'une fois.

**Rien ne s'implémente sur ce point avant arbitrage.**

**Cas adjacent, à traiter dans le même mouvement :** le `Selecteur` (`05-composants.md` §9) emploie `--text-tertiary` pour sa valeur non retenue — c'est la bascule de thème du chrome permanent, où « Sombre » est aujourd'hui presque invisible. Même symptôme que celui corrigé par `D-47`, mais **pas le même statut** : ce motif-là est `[MESURÉ]` sur la référence, le déclencheur ne l'était pas. Le corriger, c'est s'écarter d'une mesure ; ne pas le corriger, c'est publier un contrôle qu'on ne voit pas. Non tranché.

---
### Q-13 — Le repère de position et `Progression` disent la même chose
**Ouverte par :** la relecture du rendu · **Bloque :** l'écran de question

Sur le rendu actuel, « Question 1 sur 2 » s'affiche **deux fois**, au mot près, dans la même typographie et la même couleur : à gauche comme repère de position (`06-ecrans.md` §2), à droite comme `Progression` (§4.1).

**Aucun des deux documents n'a tort.** `06-ecrans.md` §2 place un repère de position en tête de la colonne décisionnelle ; `05-composants.md` §10 fait de `Progression` le « seul contenu permanent de la colonne passive ». Les deux règles sont écrites, elles n'ont simplement jamais été confrontées.

Trois issues, aucune tranchée :

1. **Le repère disparaît**, `Progression` reste le seul porteur — mais `06-ecrans.md` §2 place le repère en tête de séquence sur **tous** les gabarits, pas seulement celui-ci.
2. **`Progression` disparaît de l'écran de question** — mais `05-composants.md` §10 la dit permanente, et `G4` s'appuie dessus pour que la colonne passive ne soit jamais vide.
3. **Les deux restent et cessent de porter la même phrase** — ce qui suppose de dire ce que `Progression` affiche alors, et rien ne le dit aujourd'hui.

**En attendant l'arbitrage, l'affichage en double reste.** Il est laid, il n'est pas faux : le corriger au jugé reviendrait à trancher en silence l'une des trois issues.

---
### Q-14 — Le trou clavier, tactile et sous 1024 px
**Ouverte par :** `D-50` · **Bloque :** la case « parcours clavier complet » de `06-ecrans.md` §8, le régime `< 1024 px` de `D-28`, et le troisième moment de `D-49`

Le survol n'existe ni au clavier, ni au doigt. Arbitrage rendu : **desktop à la souris seulement en V0.** Les conséquences sont écrites ici parce qu'elles ne doivent pas se découvrir en recette.

1. Un utilisateur au clavier ne voit **aucun** indice et **aucune** explication. Ce n'est pas une dégradation, c'est une fonction absente.
2. Sous 1024 px, `D-28` spécifie un panneau en surimpression qui n'a plus rien pour l'ouvrir. Le régime existe et ne mène nulle part : `D-28` est **partiellement révoquée de fait**.
3. La checklist `06-ecrans.md` §8 affirme un parcours clavier complet. Tant que ce point n'est pas traité, **cette case ne peut pas être cochée** — et une doc qu'on ne peut pas honorer est ce que `README.md` règle 3 appelle un mensonge.
4. Le passage du **retour à la notion** (`D-49`, troisième moment) n'a aucun mécanisme : le survol est déjà consommé par le deuxième. Marqué `[À VALIDER]`.

**Une sortie à une ligne, proposée et non tranchée : le second palier.** Le motif paraît au premier seuil ; si aucun survol n'a lieu, le contenu se révèle **de lui-même** à un second. L'expérience souris décrite par `D-50` est inchangée au pixel près, et le clavier, le tactile et le régime étroit sont couverts sans rien ajouter à l'écran. Elle ne résout pas le point 4.

---
### ~~Q-03~~ — Grammaire desktop : **résolue le 2026-07-30**

Résolue en quatre temps : `D-09` (mise en page), `D-14`/`D-17`/`D-29` (grammaire clavier), `D-23` (surfaces secondaires), `D-39` (survol, focus, contour, raccourci de l'indice).

**Ce qui se transpose sans difficulté** — établi par les mesures, voir `references/trade-republic-web.md` : noir et blanc purs, typographie lourde à interligne serré, information principale très grande, plein cadre à gouttière fine, aucune carte décorative, couleur strictement fonctionnelle, quasi-absence d'ombres, icône à droite du libellé.

**Ce qui ne se transpose pas :** dock d'actions flottant en bas (la souris n'a pas de zone de pouce), gestes de balayage, colonne unique pleine largeur.

**Attention en lisant `D-39` :** ses valeurs sont `[PROPOSÉ]`, pas mesurées. `Q-01` point 3 reste ouverte et déclenchera une révision.

---

## Décisions révoquées

Aucune à ce jour.

---

## Sources externes rejetées

| Source | Raison du rejet |
|---|---|
| `Rapport UX Skilleo.md` (ChatGPT, juillet 2026) | Bâti sur un produit inventé : cours, parcours, laboratoire de prompts, certifications, communauté, choix de modèle IA, température et paramètres d'échantillonnage, exports, intégrations. Aucun de ces éléments n'avait été spécifié. Méthode et checklists conservées, contenu fonctionnel écarté. |
| `Rapport UI Skilleo.md` (ChatGPT, juillet 2026) | Stack inventée (Kotlin, Jetpack Compose, Android natif, snapshot testing Paparazzi) alors que la cible est le web. Valeurs présentées comme `MESURÉ` alors qu'elles sont déduites d'arrondis sur capture redimensionnée. Mélange UI / UX / architecture de code dans un même document. Grammaire visuelle et système de marqueurs conservés. |
