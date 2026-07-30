# Référence — Trade Republic, surfaces web

> **Nature de ce document :** journal d'observation d'une référence externe. Il consigne **ce qu'on a constaté**, pas ce qu'on décide pour Skilleo. Les décisions Skilleo vivent dans `DECISIONS.md` et les valeurs applicables dans `04-tokens.md`.
> **Ne jamais implémenter directement depuis ce fichier.** Une valeur observée devient un token Skilleo seulement après arbitrage.

---

## Table des matières

- [1. Ce que couvrent ces intrants — et ce qu'ils ne couvrent pas](#1-ce-que-couvrent-ces-intrants--et-ce-quils-ne-couvrent-pas)
- [2. Méthode de mesure](#2-méthode-de-mesure)
- [3. Couleurs `[MESURÉ]`](#3-couleurs-mesuré)
- [4. Géométrie `[MESURÉ]`](#4-géométrie-mesuré)
- [5. Motifs observés](#5-motifs-observés)
- [6. Ce qui manque encore](#6-ce-qui-manque-encore)

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

**Thème clair**

| Rôle observé | Valeur | Où |
|---|---|---|
| Canvas | `#FFFFFF` **pur** | Sections claires, 58–64 % des pixels |
| Surface subtile | `#F8F8F8` (plage `#F5F5F5`–`#F8F8F8`) | Conteneur d'image, échantillonné au centre |
| Texte primaire | `#000000` | Titres, amorces de paragraphe |
| Texte secondaire | `#9B9B9B` | Suite grise des paragraphes |
| Texte tertiaire / inactif | `#CBCCD2` | `1W` `1M` `1Y` `Max` non sélectionnés |
| Actif d'un sélecteur | `#2D2D2D` (antialiasé, cible `#000000`) | `1D` sélectionné |

**Thème sombre**

| Rôle observé | Valeur | Où |
|---|---|---|
| Canvas | `#000000` **pur** | Sections sombres, 53 % des pixels |
| Texte primaire | `#FFFFFF` **pur** | Titres, amorces de paragraphe (capture 05) |
| Texte secondaire | `#686A70` | Suite grise des paragraphes (capture 05) |
| Surface subtile | **non observée** | Aucune surface élevée dans les sections sombres |

**Le gris secondaire n'est pas le même dans les deux thèmes.** `#9B9B9B` sur blanc, `#686A70` sur noir. Ce n'est pas une inversion mécanique : les deux sont choisis pour leur contraste sur leur fond respectif. Un thème sombre obtenu en inversant les valeurs du thème clair serait faux.

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
| Gouttière latérale, conteneur d'image | 27 px | 13,5 |
| Gouttière droite, carte de téléchargement | 29 px | 14,5 |
| Hauteur du bandeau d'annonce | 117 px | **58** |
| Cap-height du logo | 27 px | 13,5 |
| Largeur du conteneur d'image | 1107 px | **553** |
| Hauteur du conteneur d'image | 1476 px | 738 |
| **Rayon du conteneur d'image** | 24 px | **12** |
| Interligne du titre de section | 136 px | **68** |
| Interligne du corps de texte | 51 px | **25,5** |
| Hauteur de glyphes du corps (ascendante→descendante) | 34–35 px | 17,0–17,5 |
| Hauteur de glyphes du bandeau | 28 px | 14 |

### 4.0 Rectification du 2026-07-30 — le rayon de bouton est retiré

Une première passe avait consigné un « rayon de bouton : 16 px CSS » comme `[MESURÉ]`. **C'était faux et la valeur est retirée.**

La bannière cookies est **coupée par le bord bas de la capture 01** — elle s'étend jusqu'à y = 1847 sur une image de 1848 px de haut. La région analysée mêlait donc le bouton, la carte qui le contient et le bord de l'image. Les 16 px provenaient d'une frontière indéterminée.

**Aucune hauteur ni aucun rayon de contrôle n'est mesurable sur ce lot d'intrants.** Aucun bouton, aucun champ n'apparaît entièrement dans le cadre à une échelle connue.

Le seul rayon fiable est celui du conteneur d'image de la capture 04 : ses deux coins sont dans le cadre et donnent des profils identiques au pixel — insertion de 24 px natifs de chaque côté, largeur pleine atteinte à 24 px de profondeur. Soit **12 px CSS**.

C'est exactement le type d'erreur reproché au rapport de ChatGPT. Elle est consignée ici plutôt que corrigée en silence.

### 4.1 La gouttière est minuscule, et c'est contre-intuitif

**16 px CSS sur un viewport de 1469 px, soit 1,1 % de la largeur.** Le contenu touche presque le bord de l'écran.

C'est l'inverse de ce que suppose le rapport UI de ChatGPT, qui décrit des « marges latérales inhabituellement généreuses ». Sur mobile, c'est probablement vrai. Sur desktop, Trade Republic fait exactement le contraire : **plein cadre**. La respiration ne vient pas des marges — elle vient du découpage en deux colonnes et du vide vertical.

### 4.2 Découpage en colonnes

| Mesure | Valeur |
|---|---|
| Conteneur d'image | 553 px CSS, soit **37,7 %** de la largeur |
| Début de la colonne de texte | à **52,8 %** de la largeur |

Répartition approximative **38 % / 15 % de vide / 47 %**. Les deux colonnes ne se touchent pas et ne sont pas de largeur égale.

### 4.3 Typographie — deux régimes d'interligne opposés

C'est l'observation la plus utile de ce lot, parce qu'elle est **contre-intuitive et systématique**.

| Registre | Interligne | Hauteur de glyphes | Taille `[DÉDUIT]` | Ratio interligne/taille |
|---|---:|---:|---:|---:|
| Titre de section | **68** | 64–68 | 70–76 | **0,90–0,97** |
| Corps de texte | **25,5** | 17,0–17,5 | 17–18 | **~1,45** |

**Le grand texte est serré, le petit texte est aéré.** Les lignes d'un titre se touchent presque ; celles d'un paragraphe respirent normalement. Un système qui appliquerait un ratio unique — même 1,2 — raterait la signature dans les deux sens : titres mous, corps illisible.

Combiné à une graisse forte et à un tracking négatif sur les grandes tailles, c'est ce qui produit l'empreinte typographique de la marque, bien plus que le choix de la police elle-même.

**Rythme des paragraphes `[MESURÉ]`.** Entre deux lignes d'un même paragraphe : 25,5 px. Entre la dernière ligne d'un paragraphe et la première du suivant : **53–54 px**. Soit une marge de paragraphe d'environ **28 px** en plus de l'interligne. Le rythme est rigoureusement identique en thème clair (capture 02) et en thème sombre (capture 05).

**Graisse du paragraphe à deux tons `[DÉDUIT]`.** Les deux tons paraissent de **graisse identique** — seule la couleur les distingue. Implémenter le dispositif avec un changement de graisse en plus de la couleur casserait l'effet : le regard doit accrocher un contraste de valeur, pas d'épaisseur.

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

### 5.3 bis La carte produit est un visuel marketing — rapports uniquement

**Avertissement de méthode.** La carte de la capture 04 (`Compte-Titres`, montant, sélecteur, courbe) est un **asset marketing mis à l'échelle** pour remplir le conteneur d'image. Ses dimensions absolues n'ont aucune valeur : elles dépendent du facteur d'agrandissement de l'illustration, pas d'un rendu à 1:1.

Seuls ses **rapports internes** sont exploitables :

| Rapport `[MESURÉ]` | Valeur |
|---|---|
| Hauteur des chiffres du montant / hauteur du sélecteur | **≈ 2,0** |

Autrement dit : la métrique dominante fait environ le double du texte de contrôle qui l'accompagne. C'est un rapport de hiérarchie transposable ; les pixels, non.

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
| 2026-07-30 | **Rectification §4.0 : le « rayon de bouton 16 px » est retiré** — mesuré sur une région contaminée par le bord bas de la capture. Aucune hauteur ni rayon de contrôle n'est mesurable sur ce lot. |
| 2026-07-30 | Ajouts mesurés : palette du thème sombre (texte secondaire `#686A70`, distinct du clair) · rayon du conteneur d'image = 12 px · interligne du corps = 25,5 px · marge de paragraphe ≈ 28 px · les deux régimes d'interligne opposés (§4.3) · la carte produit est un asset marketing, rapports uniquement (§5.3 bis). |
