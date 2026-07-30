# Référence — Trade Republic, surfaces web

> **Nature de ce document :** journal d'observation d'une référence externe. Il consigne **ce qu'on a constaté**, pas ce qu'on décide pour Skilleo. Les décisions Skilleo vivent dans `DECISIONS.md` et les valeurs applicables dans `04-tokens.md`.
> **Ne jamais implémenter directement depuis ce fichier.** Une valeur observée devient un token Skilleo seulement après arbitrage.

---

## 1. Ce que couvrent ces intrants — et ce qu'ils ne couvrent pas

Les captures fournies le 2026-07-30 sont celles du **site marketing** `traderepublic.com/fr-fr`, plus **une page de connexion** de `app.traderepublic.com`.

**Distinction déterminante :** un site marketing est une surface promotionnelle — titres géants, sections alternées, paires image-texte, une seule action par section. Skilleo est un **outil**. Transposer la grammaire du site marketing sur un écran de pratique serait une erreur de nature.

Cela dit, ces intrants apportent quelque chose que l'application mobile ne pourra jamais donner : **l'interprétation desktop de leur propre langage visuel.** C'est exactement le trou identifié en `Q-03`. Ce document est donc utile pour la question desktop, et faible pour tout le reste.

| Question | Ces intrants répondent ? |
|---|---|
| Couleurs de canvas et de texte | Oui, mesuré |
| Grammaire typographique (échelle, interligne, graisses) | Partiellement — titres promotionnels uniquement |
| Rayons, hauteurs de contrôle | Un bouton, un champ. Insuffisant |
| Gouttières et découpage en colonnes sur desktop | Oui, mesuré |
| Sélecteur, courbe, carte | Oui, un exemplaire de chacun |
| États de survol, focus, clavier | **Non.** Captures statiques |
| Mouvement, durées, easings | **Non.** Captures statiques |
| Listes, surfaces secondaires, états vides, erreurs, chargement | **Non** |
| UI de l'application elle-même | **Non.** Le fond de la page de connexion est flouté |

---

## 2. Méthode de mesure

Fichiers conservés dans [`captures/`](./captures/), recadrages dans [`captures/crops/`](./captures/crops/).

| Fichier | Contenu |
|---|---|
| `01-site-hero-sombre.png` | Hero sombre, bandeau d'annonce, nav, bannière cookies |
| `02-site-section-clair-image-gauche.png` | Section claire, image à gauche, texte à droite |
| `03-site-section-clair-titre-gauche.png` | Section claire, titre à gauche, image à droite |
| `04-site-section-clair-carte-app.png` | Carte produit : sélecteur de plage, montant, courbe |
| `05-site-section-sombre.png` | Section sombre, titre à gauche, image à droite |
| `06-app-login.png` | Page de connexion `app.traderepublic.com` |

**Normalisation.** Toutes les captures font 2938 × 1848 px natifs.

Les captures **01, 02, 03, 04 et 05** sont rigoureusement à la même échelle : le bandeau d'annonce y occupe exactement les mêmes coordonnées. Trois éléments indépendants et sans rapport entre eux — le texte du bandeau, le logo, et le conteneur d'image de la capture 02 — placent tous la gouttière latérale à **32 px natifs**. Une gouttière de 16 px CSS étant une valeur canonique (`1rem`), l'hypothèse retenue est :

```text
DPR = 2   →   1 px CSS = 2 px natifs
viewport ≈ 1469 × 924 px CSS
```

`[DÉDUIT]` Cette normalisation reste une déduction. Elle est cohérente sur tous les éléments mesurés, mais **Mohamed doit confirmer la largeur de fenêtre et la densité d'écran** pour qu'elle devienne `[CONFIRMÉ]`. Toutes les valeurs en px CSS ci-dessous en dépendent : si la normalisation est fausse, elles sont fausses d'un facteur constant. Les **ratios**, eux, restent valides dans tous les cas.

**Capture 06 exclue des mesures absolues.** Son logo mesure 20 px natifs de haut contre 27 px sur la capture 01 — soit une échelle à ~74 %. Le navigateur était dézoomé. Seules ses observations qualitatives sont retenues.

---

## 3. Couleurs `[MESURÉ]`

| Rôle observé | Valeur | Où |
|---|---|---|
| Canvas clair | `#FFFFFF` **pur** | Sections claires, 58–64 % des pixels |
| Canvas sombre | `#000000` **pur** | Sections sombres, 53 % des pixels |
| Surface subtile claire | `#F5F5F5` à `#F8F8F8` | Conteneurs d'image, fond de carte |
| Texte secondaire sur clair | `#9B9B9B` | Suite grise des paragraphes |
| Inactif d'un sélecteur | `#CBCCD2` | `1W` `1M` `1Y` `Max` non sélectionnés |
| Actif d'un sélecteur | `#2D2D2D` (antialiasé, cible `#000000`) | `1D` sélectionné |

**Trois constats à ne pas manquer.**

1. **Le noir et le blanc sont purs.** Aucune teinte, aucun gris de substitution. C'est le marqueur le plus fort et le plus facile à rater.
2. **Il y a deux gris de texte distincts, pour deux rôles distincts.** `#9B9B9B` pour du contenu secondaire qu'on veut faire lire, `#CBCCD2` pour un état inactif qu'on ne veut pas faire lire. Confondre les deux détruit la hiérarchie.
3. **Aucune couleur d'accent sur l'ensemble des captures.** Y compris là où on l'attendrait : la variation `▲ 24,15 %` de la carte produit est en **noir**, pas en vert. Le site marketing neutralise entièrement la couleur. `[DÉDUIT]` Dans l'application elle est probablement verte — ne pas conclure que le vert n'existe pas chez eux.

Le fond de la capture 06 mesure `#0C0A07`, un noir légèrement chaud. **Ne pas en tirer un token** : c'est le résultat du dégradé appliqué par-dessus la capture floutée en arrière-plan.

---

## 4. Géométrie `[MESURÉ]`

| Élément | Natif | **px CSS** |
|---|---:|---:|
| Gouttière latérale, texte du bandeau | 32 px | **16** |
| Gouttière latérale, logo | 34 px | 17 |
| Gouttière droite, carte de téléchargement | 29 px | 14,5 |
| Hauteur du bandeau d'annonce | 117 px | **58** |
| Cap-height du logo | 27 px | 13,5 |
| Centre vertical du logo | — | 92 |
| **Rayon de bouton** | 31 px | **16** |
| Largeur du conteneur d'image (capture 02) | 1107 px | 553 |
| Interligne du titre de section | 136 px | **68** |

### 4.1 La gouttière est minuscule, et c'est contre-intuitif

**16 px CSS sur un viewport de 1469 px, soit 1,1 % de la largeur.** Le contenu touche presque le bord de l'écran.

C'est l'inverse de ce que suppose le rapport UI de ChatGPT, qui décrit des « marges latérales inhabituellement généreuses ». Sur mobile, c'est probablement vrai. Sur desktop, Trade Republic fait exactement le contraire : **plein cadre**. La respiration ne vient pas des marges — elle vient du découpage en deux colonnes et du vide vertical.

### 4.2 Découpage en colonnes

| Mesure | Valeur |
|---|---|
| Conteneur d'image | 553 px CSS, soit **37,7 %** de la largeur |
| Début de la colonne de texte | à **52,8 %** de la largeur |

Répartition approximative **38 % / 15 % de vide / 47 %**. Les deux colonnes ne se touchent pas et ne sont pas de largeur égale.

### 4.3 Typographie de titre

Interligne mesuré à **68 px CSS**, pour une taille de police `[DÉDUIT]` de **70 à 76 px CSS** — d'où un ratio interligne/taille de **0,90 à 0,97**.

C'est le point à retenir : **l'interligne est inférieur à la taille de police.** Les lignes se touchent presque. Combiné à une graisse très forte et à un tracking négatif, c'est ce qui produit la signature typographique de la marque, bien plus que le choix de la police elle-même.

`[À VALIDER]` La police n'est pas identifiable de façon fiable sur ces captures. Un grotesque néo-classique, sans plus de précision. **Ne pas nommer de police dans la doc Skilleo tant qu'elle n'est pas identifiée.** Rappel : reproduire une grammaire visuelle est licite, redistribuer un fichier de police sous licence ne l'est pas.

---

## 5. Motifs observés

### 5.1 Le paragraphe à deux tons — l'observation la plus exploitable

Sur les captures 02, 03 et 05, chaque paragraphe suit la même structure : **amorce en noir, suite en gris `#9B9B9B`** — même taille, même graisse forte, même paragraphe, aucune puce, aucun séparateur.

> **Activez les 3 % d'intérêt** <span style="color:#9B9B9B">pour les nouveaux clients sur vos liquidités, jusqu'à 50 000 €, de nos banques partenaires…</span>

Ce dispositif permet de lire le document deux fois à deux profondeurs différentes : **en ne lisant que le noir**, on obtient le résumé ; **en lisant le gris**, on obtient le détail. C'est de la divulgation progressive **à l'intérieur d'un bloc de texte**, sans accordéon, sans interaction, sans coût.

**C'est directement transposable à Skilleo**, et sans doute le meilleur emprunt de tout ce lot d'intrants : énoncés de questions, retours après réponse, notions de théorie. **Adopté** par `DECISIONS.md` `D-11`.

### 5.2 Sélecteur : couleur et graisse, rien d'autre

`1D` `1W` `1M` `1Y` `Max` : l'état sélectionné est **noir et gras**, les autres sont **gris clair et de graisse normale**. Aucun fond, aucune pilule, aucune bordure, aucun soulignement, aucun indicateur.

Confirme la règle « pas de pilules partout », et donne un patron réutilisable tel quel pour les sélecteurs de Skilleo.

### 5.3 Visualisation : trait nu

Courbe de la carte produit : **un seul trait noir épais, fortement lissé.** Aucun axe, aucune grille, aucun libellé, aucun remplissage sous la courbe, aucune ombre. Une unique ligne pointillée gris clair sert de référence basse.

### 5.4 Métrique dominante

Structure verticale de la carte produit, de haut en bas : libellé gris petit (`Compte-Titres`) → **montant noir très grand et très gras** (`10.849,93 €`) → variation noire petite et gras avec triangle (`▲ 24,15 %`) → sélecteur de plage → courbe.

Le libellé qui identifie la valeur est **au-dessus** et discret ; la valeur domine. Un chevron d'ouverture est aligné à droite, à hauteur du montant.

### 5.5 Chrome permanent : quasi inexistant

Barre de navigation : logo à gauche, **un** lien (`Connexion`), une carte de téléchargement à droite. **Aucun menu horizontal.** La navigation du site vit dans le pied de page.

### 5.6 Ombres

Aucune ombre sur l'ensemble des captures, à deux exceptions près : la bannière cookies et la carte de téléchargement, toutes deux flottantes au-dessus du contenu. Les conteneurs d'image ne se distinguent pas par une ombre mais par un **fond légèrement plus clair** (`#F5F5F5` sur `#FFFFFF`).

### 5.7 Boutons

Bannière cookies : `Refuser ×` sur fond gris très clair, texte noir. `Accepter ✓` sur fond noir, texte blanc. Rayon **16 px CSS** pour les deux. **L'icône est à droite du libellé**, détachée — jamais à gauche.

### 5.8 Page de connexion — la seule surface produit `[qualitatif uniquement]`

Échelle non fiable, mais les motifs sont lisibles :

- **Champ de saisie** au rayon franchement arrondi, fond légèrement plus clair que le canvas, drapeau circulaire, préfixe `+33` en **blanc gras**, placeholder en **gris** — le motif deux-tons du §5.1, appliqué à un champ de formulaire.
- **Bouton icône seul** (chevron bas), carré à coins arrondis, même hauteur et même fond que le champ.
- **Carte élevée** au rayon plus généreux que celui des boutons, contenant QR + titre blanc gras sur deux lignes + paragraphe gris.
- **Mise en page scindée** : ~70 % capture produit floutée, ~30 % panneau d'action. Procédé notable — montrer le produit sans le révéler.
- Aucune couleur hormis le drapeau.

---

## 6. Ce qui manque encore

Par ordre d'utilité pour Skilleo. Détail dans `DECISIONS.md` `Q-01`.

1. **Captures de `app.traderepublic.com`** — l'application web. C'est le seul intrant qui compte vraiment : deux produits web desktop, même problème de transposition. Listes, surfaces secondaires, formulaires, états de chargement, états vides, erreurs.
2. **Enregistrements d'écran** — aucune valeur de mouvement n'est déductible d'une image fixe. Le rapport de ChatGPT avait inventé l'intégralité de ses durées et easings.
3. **États de survol et de focus** — invisibles sur une capture. Il faut une vidéo, ou l'accès navigateur.
4. **Confirmation de la normalisation** — largeur de fenêtre et densité d'écran des captures 01–05.

---

## Journal du document

| Date | Modification |
|---|---|
| 2026-07-30 | Création. 6 captures du site marketing + page de connexion. Normalisation DPR 2 / 1469 px CSS déduite et cohérente sur 3 éléments indépendants. Couleurs et géométrie mesurées. Capture 06 exclue des mesures absolues. |
