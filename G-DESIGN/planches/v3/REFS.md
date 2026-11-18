# REFS.md — Trame · planches v3 (2026-11-18)

v3 reprend intégralement les références de v2 (ci-dessous). Ce qu'elle pousse plus loin :
- **Flow Computing** : relief et lumière gauche, cette fois sur toutes les cartes (frange + ombre dirigée).
- **Teko / Noon** : un seul accent, et désormais une **seule couleur de fond secondaire**
  (denim) qui rythme le scroll, une bande par planche, comme les ruptures sombres de D.FY.
- **Gapsy** : annotations par-dessus la scène, étendues au tissu de P1 (pastilles 1/2).
- **Dominic Burt** : le signe récurrent devient un système (logo, folio, pager, règles,
  tous construits sur le fil interrompu).
Refusé en v3 : la lisière rouge du denim (deuxième accent), la texture sergé sur les
bandes (bruit visuel sans information).

---

## REFS v2 (base)

## 0. Parcours Awwwards

Le parcours réel (5 pages de listing `/websites/`, 4 catégories, 13 sites visités,
1 échec 404) a été fait le 2026-11-15 pour ce même projet et reste documenté dans
`../v1/REFS.md` + `../v1/.refs/visits.json` + `../v1/.refs/shots/*.jpg`. **Pas de
nouveau crawl en v2** : même projet, même sujet, crawl vieux d'un jour.

Ce que v2 ajoute : la v1 ne pouvait pas lire d'images, elle n'avait retenu que des
métadonnées (polices calculées, couleurs). En v2, **j'ai ouvert et regardé les captures**
de 4 sites (booleansequence, genomines, iroom, vast-1). Ces relectures sont la base des
principes ci-dessous.

| Site (capture v1 relue) | Ce que l'image montre | Principe pris | Refusé |
|---|---|---|---|
| booleansequence.niceunderground.xyz | une trame de chevrons `< >` bleu pur / blanc, et un titre géant posé dans des réserves blanches | la **grille comme sujet** ; le titre tient dans une réserve du motif | le bleu `#0000FF`, le motif génératif décoratif |
| genomines.com | des fibres organiques vertes sur fond noir, titre petit en bas à gauche | les **fibres comme matière** (les fils du tissu P1 ont un volume et une ombre) | le fond noir, le vert, la vidéo de fond |
| iroom.devinthehood.com | titre noir très serré sur deux lignes, CTA bleu unique | une **seule action bleue**, le bleu réservé à l'activation | la photo de montagne, le layout centré de doc |
| vastworld.ai | linéale énorme (≈138 px) coupée au ras de la scène 3D | l'**échelle extrême** du H1, qui touche la scène | la 3D réaliste, la marque |

## 1. Les 11 références de Gaia appliquées à Trame

| Ref | Pris pour Trame | Refusé |
|---|---|---|
| Flow Computing | **relief doux éclairé par la gauche** : fils en dégradé clair→ombre, ombres portées dirigées, tissu posé comme un échantillon | l'onglet Contact vertical |
| Dominic Burt | **grande linéale très serrée** (Archivo, wdth 78 %, −0.045em) ; signe récurrent = le fil (logo : 3 fils de chaîne, 1 passage interrompu) | la forme granuleuse crème |
| Teko | **un seul mot en accent** par H1 (missing / changed / certificate / Jira / Honest) | le magenta, la courbe-horizon |
| Noon | **un seul accent** sur fond neutre | le fond sombre, l'orange, la vidéo |
| NexusGPT | lisibilité produit d'abord (P4 = vraie capture Jira, rien de redessiné) | le look shadcn |
| Gapsy Studio | **annotations par-dessus la scène** : pastilles numérotées sur la capture Forge | les lettres en relief, la salle 3D |
| Raben Rifaie / D.FY | scroll narratif (révélations au scroll, chaque section reprend le propos) | orange/jaune, parallax lourd |
| LogoPoint / Concept Studio | hiérarchie simple, offre posée en N&B | le jaune, le flat pur |
| Igloo | **refusée** : la 3D réaliste n'aide pas à lire les trois axes ; le relief CSS/SVG suffit | toute 3D WebGL |

## 2. Synthèse : 5 principes retenus pour Trame

1. **La matière EST l'information** : couvert = fil croisé, trou = maille percée,
   perforation = fil coupé et effiloché, infalsifiable = maille hachurée, fil détendu =
   fil qui pend. La forme seule porte l'état.
2. **Un accent, un sens** : `#0052CC` = un acte de vérification (passage de trame), et
   le mot-clé du titre. Rien d'autre n'est bleu.
3. **Titre-image serré** en premier écran, sans menu (marque + folio + badge).
4. **Relief et lumière dirigée** plutôt que la 3D.
5. **Preuve visible** : chaque chiffre porte son chemin `↳ fichier`, les limites et les
   inconnus sont affichés comme du contenu.
