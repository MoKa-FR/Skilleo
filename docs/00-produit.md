# 00 — Produit

> Périmètre : ce qu'est Skilleo, son centre de gravité, sa boucle d'usage, et la place de chaque fonctionnalité.
> Ne contient aucune valeur visuelle, aucun nom de composant, aucune arborescence d'écrans.

---

## 1. Définition

**Skilleo est une plateforme web de formation pratique à l'intelligence artificielle : elle pose une question à la fois, et met la théorie à portée de main quand l'utilisateur bloque.**

Cette phrase est le contrat. Toute fonctionnalité qui oblige à la réécrire est refusée ou reléguée.

### 1.1 Ce que la définition impose

- **Une question à la fois.** Jamais deux décisions simultanées à l'écran.
- **La pratique passe avant la théorie.** L'utilisateur agit d'abord, comprend ensuite. La théorie est un recours, pas un préalable.
- **Le savoir est complet mais silencieux.** Le corpus théorique doit être exhaustif et progressif, et ne jamais s'imposer.

### 1.2 Ce que Skilleo n'est pas

| Skilleo n'est pas | Pourquoi c'est important |
|---|---|
| Un LMS | Pas de catalogue de cours en vitrine, pas de leçon de 40 minutes à lire avant d'agir |
| Un chatbot | L'utilisateur ne vient pas converser, il vient s'entraîner |
| Un réseau social d'apprenants | Aucune fonction communautaire dans le noyau |
| Un quiz de culture générale | La reconnaissance n'est pas la compétence — voir §3.2 |
| Un tableau de bord | La progression est un effet visible de la pratique, pas une destination |

---

## 2. Feature-noyau

**Le noyau de Skilleo est : répondre.**

Une seule action porte le produit. Tout le reste orbite autour.

L'analogie de référence est explicite : chez Trade Republic, le noyau est *acheter un titre*. Un écran, un chiffre dominant, une action principale, et l'intégralité du savoir (informations sur l'instrument, graphiques, analyses) accessible en surface secondaire depuis l'objet — **jamais en destination de navigation.** Skilleo applique le même schéma en remplaçant *acheter* par *répondre*.

### 2.1 Objets du domaine

| Objet | Rôle | Manipulé par l'utilisateur |
|---|---|---|
| **Question** | Unité atomique. Le grain le plus fin de l'expérience. | Oui — il y répond |
| **Session** | Suite de questions formant une unité qu'on peut terminer. | Oui — il la démarre, la reprend, la termine |
| **Progression** | Ce que l'utilisateur possède. État accumulé de ses sessions. | Non — elle résulte de ses actes |
| **Notion** | Unité de théorie. Rattachée à une ou plusieurs questions. | Oui — il la consulte |

Conséquence de conception : **la progression n'est pas une fonctionnalité, c'est une propriété.** Elle s'affiche là où elle informe une décision, jamais comme une section à visiter.

### 2.2 Composition d'une question

Une question est un objet à cinq faces, dont une seule est visible par défaut.

| Face | Visibilité | Rôle |
|---|---|---|
| L'énoncé | Toujours | Ce à quoi il faut répondre |
| Les options de réponse | Toujours | Nombre volontairement restreint |
| L'indice | Sur demande | Aiguille sans donner la réponse |
| La notion liée | Sur demande | Ouvre la théorie concernée |
| Le retour après réponse | Après action | Explication très courte, correcte ou non |

Règle : **les trois dernières faces ne consomment aucun espace visuel avant d'être demandées.**

---

## 3. Boucle d'usage

### 3.1 La boucle

```text
   ┌──────────────────────────────────────────────┐
   │                                              │
   ▼                                              │
Question ──► Réponse ──► Retour court ────────────┘
   │                         │
   │ (si blocage)            │ (fin de série)
   ▼                         ▼
Indice, puis Notion    Exercice appliqué
                             │
                             ▼
                       Session terminée
                             │
                             ▼
                    Reprise proposée
```

### 3.2 Deux mécaniques, une seule boucle

**Décision D-01.** La question à options limitées donne le **tempo**. L'exercice appliqué est le **climax**.

Raisonnement : une question à deux options est rapide, sans friction, et rend la pratique quotidienne soutenable. Mais elle ne mesure que la reconnaissance. La compétence réelle en IA — formuler une consigne, juger une sortie, itérer — ne s'acquiert pas par reconnaissance. Un produit uniquement fait de questions fermées trahirait sa propre promesse de « formation pratique qui pousse à l'action ».

| | Question fermée | Exercice appliqué |
|---|---|---|
| Rôle | Tempo, échauffement, contrôle | Preuve de compétence |
| Durée cible | Quelques secondes | Plusieurs minutes |
| Fréquence | La majorité des interactions | Ponctuation de fin de série |
| Ce qu'on mesure | Reconnaissance | Production |
| Échec possible sans blesser | Oui, immédiatement rejouable | Oui, mais avec accompagnement |

### 3.2.1 Nature de l'exercice appliqué

`D-08` tranche le cadre : la production libre évaluée par un modèle est **prévue, mais hors V0**. La V0 ne contient donc **aucun champ de saisie libre**.

| Horizon | Forme de l'exercice appliqué |
|---|---|
| **V0** | Doit fonctionner sans appel de modèle : correction d'une sortie pré-générée, remise en ordre, ou choix argumenté sur un cas concret. `[À VALIDER]` — laquelle, ou plusieurs. |
| **Ultérieur** | Production libre : l'utilisateur écrit, obtient une vraie sortie, est évalué dessus. |

Contrainte de conception à respecter dès la V0 : **la place du champ libre est réservée** dans l'architecture des écrans et le catalogue de composants. On ne redessine pas le noyau au moment de l'ajouter.

### 3.3 Continuité

La boucle a une seule exigence forte : **reprendre ne doit demander aucune réflexion.**

- L'action dominante de l'écran d'entrée est toujours la continuation de ce qui est en cours.
- Une session interrompue se reprend exactement là où elle s'est arrêtée, question comprise.
- L'utilisateur n'a jamais à retrouver où il en était : le produit le lui présente.
- Aucun écran intermédiaire de confirmation entre l'intention de reprendre et la question.

### 3.4 La théorie dans la boucle

**Décision D-02.** La théorie a deux chemins d'accès, de statuts très inégaux.

1. **Chemin principal — contextuel.** Depuis une question, l'utilisateur ouvre la notion concernée dans une surface secondaire. Il ne quitte pas sa session. À la fermeture, il retrouve sa question intacte. C'est ce chemin que le produit met en avant.
2. **Chemin secondaire — index.** Le corpus complet est consultable et progressif, atteignable par la recherche. Il existe pour permettre la révision libre, mais **n'occupe pas la navigation principale** et n'est jamais proposé comme alternative à la pratique.

Ce que cette décision exclut : un onglet « Cours », « Théorie » ou « Bibliothèque » dans la navigation principale. La raison est la même que chez Trade Republic, qui n'a aucune destination « éducation » malgré une quantité considérable de contenu explicatif : une destination de savoir devient une échappatoire à l'action.

---

## 4. Modèle noyau et satellites

Toute fonctionnalité appartient à un anneau. L'anneau détermine sa proximité visuelle et son coût d'accès.

| Anneau | Nature | Coût d'accès max | Présence permanente |
|---|---|---:|---|
| **0 — Noyau** | Répondre, reprendre | 0 interaction | Oui |
| **1 — Fréquent** | Recherche, choix de ce sur quoi on travaille, progression | 1 interaction | Point d'entrée seulement |
| **2 — Contextuel** | Indice, notion, retour, révision d'une question | 1 interaction, **depuis l'objet** | Non |
| **3 — Expert** | Réglages fins de la pratique, données, exports | 2 interactions | Non |
| **4 — Administration** | Compte, sécurité, abonnement, confidentialité, notifications | 3 interactions | Non |

### 4.1 Loi orbitale

Plus une fonction est éloignée de l'intention immédiate de l'utilisateur, plus elle est éloignée du premier niveau visuel — **sans jamais devenir profonde.** Éloigner n'est pas enterrer.

### 4.2 Ce que le noyau contient, exhaustivement

L'anneau 0 contient **uniquement** :

- l'état de progression de l'utilisateur ;
- l'action de continuation ;
- la question en cours, quand une session est active.

Aucune autre fonction ne mérite une présence permanente. Une demande d'ajout à l'anneau 0 doit d'abord expliquer ce qu'elle en retire.

### 4.3 Interdiction d'empilement

Une nouvelle fonctionnalité **ne peut pas** être ajoutée en juxtaposition à l'existant. Elle doit :

- soit se rattacher à un objet existant (Question, Session, Progression, Notion) et vivre dans son anneau contextuel ;
- soit remplacer explicitement quelque chose ;
- soit être refusée.

La procédure complète d'admission d'une fonctionnalité est dans [`01-ux-principes.md`](./01-ux-principes.md).

---

## 5. Profils d'utilisateurs

Le produit sert deux profils sur les mêmes objets, à des profondeurs différentes. Il n'y a **pas** deux interfaces.

| | Débutant | Avancé |
|---|---|---|
| Ce qu'il veut | Qu'on lui dise quoi faire | Choisir sur quoi il travaille |
| Options offertes | Restreintes, sans sensation de mur | Réglables, après intention explicite |
| Théorie | Proposée quand il hésite | Cherchée quand il en a besoin |
| Retour après réponse | Explication systématique | Explication consultable, non imposée |

**Décision D-03.** La différenciation se fait par **profondeur révélée**, pas par mode utilisateur. Aucun sélecteur « débutant / expert ». Le produit s'ouvre en fonction des actes, et toute fonction avancée reste atteignable par un utilisateur débutant qui la cherche — la restriction ne doit jamais être une porte fermée.

---

## 6. Test de conformité

Un écran, une fonctionnalité ou une modification est conforme si :

- [ ] La définition du §1 reste vraie sans réécriture.
- [ ] L'écran a une seule action dominante.
- [ ] Toute fonction affichée appartient à l'anneau attendu du contexte.
- [ ] Rien ne s'interpose entre l'intention de reprendre et la question.
- [ ] Aucune fonctionnalité n'a été ajoutée sans qu'une autre soit retirée ou rattachée à un objet.
- [ ] Aucun élément marqué `[À VALIDER]` n'a été implémenté.

---

## Journal du document

| Date | Modification |
|---|---|
| 2026-07-30 | Création. Décisions D-01, D-02, D-03. |
| 2026-07-30 | §3.2.1 ajouté : D-08 ferme Q-02 (modèle IA prévu mais hors V0, place du champ libre réservée). |
