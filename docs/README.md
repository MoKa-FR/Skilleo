# Documentation Skilleo

Source unique de vérité pour la conception et le développement de Skilleo.
Ces documents sont **normatifs** : en cas de désaccord entre le code et la doc, l'un des deux est en tort et il faut trancher, pas ignorer.

---

## Index

| Fichier | Périmètre | Statut |
|---|---|---|
| [`DECISIONS.md`](./DECISIONS.md) | Journal des décisions, hypothèses, questions ouvertes | 🟢 vivant |
| [`references/trade-republic-web.md`](./references/trade-republic-web.md) | Journal d'observation de la référence externe + intrants conservés | 🟢 vivant |
| [`00-produit.md`](./00-produit.md) | Définition du produit, feature-noyau, boucle, satellites | 🟢 rédigé |
| [`01-ux-principes.md`](./01-ux-principes.md) | Lois UX transversales, divulgation progressive, hiérarchie des actions | 🟢 rédigé |
| [`02-interactions.md`](./02-interactions.md) | Grammaire de pointeur et de clavier : survol, focus, curseur, raccourcis | 🟢 rédigé |
| [`03-navigation.md`](./03-navigation.md) | Architecture de l'information, destinations, panneaux contextuels | 🟢 rédigé |
| [`src/app/globals.css`](../src/app/globals.css) | **Valeurs canoniques des tokens** — consommé par le code (`D-27`) | 🟢 vivant |
| [`04-tokens.md`](./04-tokens.md) | Pourquoi ces valeurs, et sous quelles règles les employer | 🟢 rédigé |
| [`05-composants.md`](./05-composants.md) | Catalogue des composants, états, contrats comportementaux | 🟢 rédigé |
| [`06-ecrans.md`](./06-ecrans.md) | Gabarits d'écran, ordre du contenu, états transverses | 🟢 rédigé |
| `07-motion.md` | Durées, easings, transitions, réduction du mouvement | 🟠 **à ouvrir** — `D-51` introduit un motif animé en V0. `D-34` ne suffit plus seul |
| `08-conventions-code.md` | Organisation des dossiers, nommage, règles de dépendance | ⚪ non commencé |
| [`09-contenu.md`](./09-contenu.md) | Contrat de contenu : unités, fichiers, champs, validation | 🟢 rédigé |
| `10-architecture.md` | Modèle d'état, persistance, frontière client/serveur | ⚪ non commencé |

Légende : 🟢 rédigé et applicable · 🟡 brouillon, ne pas implémenter · 🔴 bloqué par une décision ou un intrant manquant · ⚪ non commencé

---

## Périmètre de chaque document

Règle absolue : **aucun sujet n'apparaît dans deux documents.** Si un sujet semble appartenir à deux endroits, il appartient au plus abstrait, et l'autre y fait un lien.

- `00-produit` répond à *« qu'est-ce que Skilleo ? »* — pas à *« à quoi ça ressemble ? »*
- `01-ux-principes` répond à *« comment on décide ? »* — pas à *« qu'est-ce qu'on a décidé ? »*
- `02-interactions` répond à *« comment l'utilisateur agit ? »* — souris, clavier, focus
- `03-navigation` répond à *« où va l'utilisateur ? »*
- `tokens/tokens.css` répond à *« quelle valeur ? »* — **canonique**, consommé par le code (`D-27`)
- `04-tokens` répond à *« pourquoi cette valeur, et comment l'employer ? »* — aucun chiffre ici
- `05-composants` répond à *« quelles briques, dans quels états ? »*
- `06-ecrans` répond à *« quel contenu, dans quel ordre ? »*
- `07-motion` répond à *« comment ça bouge ? »*
- `08-conventions-code` répond à *« où on écrit le code ? »*
- `09-contenu` répond à *« dans quelle forme entre ce qui est écrit, et selon quelles règles ? »* — pas à *« quelle matière enseigner ? »*, qui relève de Mohamed
- `10-architecture` répond à *« que retient l'application, et où ? »*
- `references/*` répond à *« qu'a-t-on observé ailleurs ? »* — **descriptif, jamais normatif.** Une valeur y figurant n'est pas applicable tant qu'elle n'est pas entrée dans `tokens/tokens.css`.

---

## Index inversé — quelles décisions contraignent quel document

Généré depuis `DECISIONS.md`. À lire **avant** d'ouvrir un document : il donne les contraintes
sans avoir à parcourir le journal.

| Document | Décisions applicables | Questions bloquantes |
|---|---|---|
| `00-produit.md` | `D-01` `D-02` `D-03` `D-08` `D-21` `D-22` | — |
| `01-ux-principes.md` | `D-12` | — |
| `02-interactions.md` | `D-12` `D-14` `D-15` `D-17` `D-39` `D-49` `D-50` | `Q-14` |
| `03-navigation.md` | `D-09` `D-16` `D-21` `D-22` `D-23` `D-35` `D-49` `D-50` | — |
| `04-tokens.md` | `D-04` `D-11` `D-24` `D-25` `D-26` `D-27` `D-28` `D-33` `D-34` `D-39` `D-45` `D-46` `D-51` | `Q-12` |
| `05-composants.md` | `D-11` `D-12` `D-14` `D-16` `D-23` `D-24` `D-26` `D-28` `D-29` `D-39` `D-48` `D-50` `D-51` | `Q-12` `Q-14` |
| `06-ecrans.md` | `D-08` `D-09` `D-10` `D-14` `D-15` `D-21` `D-22` `D-23` `D-26` `D-28` `D-29` `D-31` `D-35` `D-36` `D-40` `D-45` `D-46` `D-48` `D-49` `D-50` | `Q-13` `Q-14` |
| `07-motion.md` | `D-34` `D-51` | `Q-01` point 2 |
| `08-conventions-code.md` | `D-04` `D-20` `D-27` `D-38` | — |
| `09-contenu.md` | `D-16` `D-20` `D-30` `D-32` `D-36` `D-37` `D-38` `D-41` `D-42` `D-43` `D-44` `D-48` | — |
| `10-architecture.md` | `D-04` `D-08` `D-22` `D-30` `D-31` `D-32` `D-40` | — |

Les décisions transversales `D-05` `D-06` `D-07` `D-18` `D-19` portent sur le projet
et la documentation eux-mêmes, pas sur un document en particulier.

**`Q-01` ne bloque plus que `07-motion.md`.** `D-33`, `D-34`, `D-39` et désormais `D-51` ont tranché
en `[PROPOSÉ]` assumé plutôt que d'attendre les intrants. Leur arrivée déclenchera une **révision**
de ces quatre décisions, pas une réécriture : les valeurs concernées sont localisées dans
`src/app/globals.css` et dans quelques tableaux d'états.

**Quatre questions ouvertes bloquent du code au 31 juillet 2026.** `Q-12` (contraste de
`--text-secondary`), `Q-13` (le compteur affiché deux fois), `Q-14` (le survol porte seul : ni
clavier, ni tactile, ni régime sous 1024 px) et le troisième moment de `D-49`, marqué `[À VALIDER]`.
Aucun ne s'implémente.

⚠️ **`D-13` est révoquée** par `D-50`, et `D-47` est caduque le jour de sa rédaction. Les deux sont
conservées : la première pour son raisonnement sur le signal mesuré, la seconde parce que `Q-12`
en est sortie.

**La charte de style de `09-contenu.md` §7bis ne s'applique pas à `docs/`.** `D-42` exempte la
documentation explicitement. Ne pas réécrire ces onze documents au nom de la charte.

---

## Niveaux de certitude

Toute affirmation de nature factuelle sur une référence externe (notamment Trade Republic) porte un marqueur. **Une valeur non marquée est une erreur de rédaction.**

| Marqueur | Signification | Autorisé en implémentation |
|---|---|---|
| `[CONFIRMÉ]` | Déclaré publiquement par la source, avec référence vérifiable | Oui |
| `[MESURÉ]` | Mesuré par nous sur un intrant fourni, avec méthode documentée | Oui |
| `[DÉDUIT]` | Reconstitué par recoupement, avec raisonnement explicite | Oui, en signalant l'incertitude |
| `[PROPOSÉ]` | Choix Skilleo, aucune prétention à refléter une référence externe | Oui |
| `[À VALIDER]` | Hypothèse en attente d'arbitrage de Mohamed | **Non** |

Interdictions :

- Présenter un `[DÉDUIT]` ou un `[PROPOSÉ]` comme une valeur officielle Trade Republic.
- Écrire `[MESURÉ]` sans que l'intrant mesuré soit référencé et conservé.
- Implémenter un élément marqué `[À VALIDER]`.

---

## Règles de maintenance

1. **Toute décision de conception passe par `DECISIONS.md`** avant d'entrer dans un document normatif. Le journal donne la date, la décision, la raison, et ce qu'elle exclut.
2. **Aucune fonctionnalité n'apparaît dans la doc sans avoir été validée par Mohamed.** Une IA qui a besoin d'un exemple écrit `[À VALIDER]` et pose la question.
3. **Une doc modifiée sans que le code suive est un mensonge**, et l'inverse aussi. Les deux vont dans le même commit.
4. **Les questions ouvertes sont écrites, pas gardées en tête.** Section « Questions ouvertes » de `DECISIONS.md`, avec un identifiant `Q-xx` référençable depuis les autres documents.
5. **On ne supprime pas une décision, on la remplace.** L'ancienne passe en « Révoquée » avec la raison. L'historique de raisonnement a autant de valeur que la décision.

---

## Comment une IA doit utiliser cette doc

À lire dans cet ordre, systématiquement, avant toute production :

1. `DECISIONS.md` — pour savoir ce qui est tranché et ce qui ne l'est pas
2. `00-produit.md` — pour savoir si ce qu'on demande appartient au produit
3. Le document du périmètre concerné

Comportement attendu face à un manque : **s'arrêter et demander.** Ne pas combler un trou par une invention plausible. C'est la règle numéro un de ce projet.
