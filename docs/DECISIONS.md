# Journal des décisions et questions ouvertes

> Ce fichier existe pour une seule raison : **aucune liberté ne doit être prise en silence.**
> Une décision non écrite ici n'est pas une décision. Une hypothèse non écrite ici est une invention.

Lire ce fichier avant tout travail de conception ou de développement.

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
**Date :** 2026-07-30 · **Statut :** actif · **Répond à :** `Q-06` · **Impacte :** `05-composants.md`

Amorce en `textPrimary`, suite en `textSecondary` — même taille, même graisse, même paragraphe. Employé partout où un texte a deux profondeurs de lecture : énoncés, retours après réponse, notions de théorie, libellés de champ.

**Raison :** divulgation progressive à l'intérieur d'un bloc de texte, sans accordéon, sans interaction, sans coût. En ne lisant que le premier ton on obtient le résumé ; en lisant le second, le détail. Observé sur toutes les sections de la référence — voir `references/trade-republic-web.md` §5.1.

**Contrainte d'accessibilité :** les deux tons forment **une seule phrase** pour un lecteur d'écran. La distinction est visuelle uniquement et ne doit jamais porter d'information à elle seule (`01-ux-principes.md` §8).

---

### D-12 — Le survol est un dispositif de premier rang, mais ne porte jamais seul
**Date :** 2026-07-30 · **Statut :** actif · **Impacte :** `02-interactions.md`, `05-composants.md`

Skilleo est une **application desktop**. Le survol, le focus, le curseur et le clavier font partie intégrante de sa grammaire d'interaction, au même titre que les couleurs et les rayons.

**Règle :** le survol peut *accélérer* ou *enrichir* une révélation. Il ne peut jamais être le **seul** chemin vers une fonction. Tout ce qui est atteignable au survol est également atteignable au clavier et au clic.

**Statut de la référence sur ce point.** Trade Republic étant une application tactile, elle n'offre **aucun** état de survol, de focus ou de curseur à observer. Ce n'est pas une raison de s'en priver — c'est une raison de les **concevoir délibérément** plutôt que de les déduire. Toutes les valeurs de cette famille seront donc marquées `[PROPOSÉ]`, jamais `[DÉDUIT]`, et assumées comme des créations Skilleo cohérentes avec la grammaire de la référence.

**Conséquence :** la grammaire de pointeur et de clavier mérite son propre document, `02-interactions.md`. C'est la partie du système qui a le moins de référence et donc le plus besoin d'être écrite.

---

### D-13 — Déclenchement de l'indice
**Date :** 2026-07-30 · **Statut :** actif · **Résout :** `Q-07` · **Impacte :** `02-interactions.md`, `06-ecrans.md`

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

### D-21 — Périmètre de la V0 : un seul parcours, sans compte, sans progression persistée
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

## Questions ouvertes

Ordre de priorité décroissante. Rien de bloqué par ces questions ne doit être implémenté.

### Q-09 — Comment apprend-on quelque chose de la V0 ?
**Découle de :** `D-22` · **Ne bloque aucun document**, mais bloque l'utilité de la V0

`D-22` exclut le compte, la capture d'email, le formulaire de retour et les statistiques d'usage. **La V0 n'a donc plus aucun instrument de mesure.** Mise en ligne telle quelle, elle sera utilisée sans qu'on sache par combien de personnes, ni où elles décrochent, ni si elles ont trouvé l'indice.

Ce n'est pas un défaut si le plan est de **s'asseoir à côté de trois ou quatre personnes** et de les regarder faire — c'est même la meilleure méthode à ce stade, et elle ne demande aucun développement. Mais ça devient un problème si la V0 est mise en ligne pour être découverte seule.

Trois voies, aucune retenue :

| Voie | Coût | Ce qu'on apprend |
|---|---|---|
| Sessions observées, sans instrumentation | Nul en développement, du temps de Mohamed | Le plus riche : les hésitations, les phrases dites à voix haute |
| Événements anonymes minimaux | ~2 h | Où on décroche, taux d'usage de l'indice, taux d'achèvement |
| Rien | Nul | Rien |

**À trancher avant la mise en ligne, pas avant le développement.** La question n'est donc pas bloquante pour commencer.

---

### Q-01 — Intrants de mesure Trade Republic
**Bloque :** `04-tokens.md`, `05-composants.md`, `07-motion.md`
**Avancement 2026-07-30 :** premier lot reçu — 6 captures du **site marketing** + 1 page de connexion. Dépouillé dans [`references/trade-republic-web.md`](./references/trade-republic-web.md). Couleurs et géométrie desktop mesurées. **Reste bloquant.**

Ce qui manque encore, par ordre d'utilité :

1. **Captures de `app.traderepublic.com`** — l'application web, pas le site marketing. C'est l'intrant décisif : deux produits web desktop, exactement le même problème de transposition à résoudre. Écrans utiles : une vue principale avec information dominante · une surface secondaire ouverte par-dessus · une liste · un champ de recherche · un formulaire · un état de chargement · un état vide · un état d'erreur. *(Penser à masquer les montants personnels — seule la structure m'intéresse.)*
2. **Enregistrements d'écran** des transitions. **Aucune valeur de mouvement n'est déductible d'une image fixe.** Le rapport ChatGPT avait inventé l'intégralité de ses durées et easings.
3. **États de survol et de focus.** Invisibles sur une capture statique — et c'est précisément le trou desktop de `Q-03`. Il faut une vidéo, ou l'accès navigateur.
4. **Confirmation de la normalisation :** largeur de la fenêtre du navigateur et densité d'écran lors des captures 01–05. L'hypothèse DPR 2 / viewport 1469 px CSS est cohérente sur trois éléments indépendants, mais reste `[DÉDUIT]`. Si elle est fausse, toutes les valeurs en px CSS sont fausses d'un facteur constant — les ratios, eux, restent valides.
5. **Accès navigateur (option la plus efficace).** Avec l'extension Claude in Chrome installée et connectée, je lis directement les styles calculés : polices, tailles, rayons, couleurs, durées de transition. On passerait de `[DÉDUIT]` à `[CONFIRMÉ]` sur presque tout, sans mesure au pixel. Extension : `https://chromewebstore.google.com/detail/fcoeoabgfenejglbffodgkkbkcdhcgfn`

---

### Q-03 — Grammaire desktop : ce qui reste à inventer
**Partiellement résolue par `D-09`** (mise en page). **Reste bloquant** pour `05-composants.md` et `07-motion.md`.

Skilleo est desktop-first ; Trade Republic est une application mobile. La mise en page est tranchée par `D-09`. Ce qui suit ne l'est pas, et **n'a aucune référence copiable** — ni dans l'app mobile, ni dans les captures du site.

1. **Les états de survol.** Trade Republic n'en a aucun : c'est une app tactile. Sur desktop, c'est une part majeure de la sensation d'interface. À définir de zéro, dans l'esprit de la référence. Nécessite `Q-01` point 3.
2. **La grammaire clavier.** Répondre à une question au clavier est vraisemblablement le mode d'interaction principal du noyau : choisir une option, valider, ouvrir un indice, fermer une surface. À inventer entièrement.
3. **Le curseur et le focus.** Anneaux de focus, affordances de curseur : absents de la référence.
4. **Les surfaces secondaires.** Une feuille montant du bas n'a pas de sens sur 924 px de haut. Surface centrée, ou panneau latéral occupant la colonne passive de `D-09` ? Cette seconde option serait plus cohérente avec la mise en page retenue.

**Ce qui se transpose sans difficulté** — établi par les mesures, voir `references/trade-republic-web.md` : noir et blanc purs, typographie lourde à interligne serré, information principale très grande, plein cadre à gouttière fine, aucune carte décorative, couleur strictement fonctionnelle, quasi-absence d'ombres, icône à droite du libellé.

**Ce qui ne se transpose pas :** dock d'actions flottant en bas (la souris n'a pas de zone de pouce), gestes de balayage, colonne unique pleine largeur.

---

## Décisions révoquées

Aucune à ce jour.

---

## Sources externes rejetées

| Source | Raison du rejet |
|---|---|
| `Rapport UX Skilleo.md` (ChatGPT, juillet 2026) | Bâti sur un produit inventé : cours, parcours, laboratoire de prompts, certifications, communauté, choix de modèle IA, température et paramètres d'échantillonnage, exports, intégrations. Aucun de ces éléments n'avait été spécifié. Méthode et checklists conservées, contenu fonctionnel écarté. |
| `Rapport UI Skilleo.md` (ChatGPT, juillet 2026) | Stack inventée (Kotlin, Jetpack Compose, Android natif, snapshot testing Paparazzi) alors que la cible est le web. Valeurs présentées comme `MESURÉ` alors qu'elles sont déduites d'arrondis sur capture redimensionnée. Mélange UI / UX / architecture de code dans un même document. Grammaire visuelle et système de marqueurs conservés. |
