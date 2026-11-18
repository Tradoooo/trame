# DESIGN.md — Trame

## V1 — 2026-11-15

Intention : transformer la couverture des critères d'acceptation en matière visuelle
compréhensible avant lecture. La grille du site est le tissu du produit : chaîne,
trame, maille vide, perforation et fil infalsifiable.

Direction : **Loom on ink** — fond encre, matière ivoire, un accent indigo réservé
aux liaisons et à l'activation, grotesque très grande et serrée, mono pour les clés
techniques. La 3D a été écartée : le brief établit que la topologie 2D aide mieux à
comprendre les trois axes de couverture.

Références appliquées : Flow Computing (relief/lumière), Dominic Burt (échelle et
signe-fil), Noon (sombre + accent unique), Raben Rifaie (scroll narratif), NexusGPT
(lisibilité produit), s-c-labs/iroom (registre technique et mono). Les 11 refs Gaia
et le parcours Awwwards sont détaillés dans `planches/v1/REFS.md`.

Planches produites :
- P1 `01-comprendre.html` : tissu 6×4, couverture et anomalies en 5 secondes.
- P2 `02-probleme.html` : perforation par critère modifié après vérification.
- P3 `03-pipeline.html` : 8 étapes réelles et fichiers source.
- P4 `04-produit.html` : écran Forge réel en production + illustration séparée.
- P5 `05-preuves.html` : métriques, invariants et 2 limites nommées.

Vérification : `node build.mjs`, `node verify.mjs`, audit reduced-motion/contraste,
captures 1440×900 et 390×844, planche-contact. Deux itérations de relecture
programmatiques effectuées ; ce modèle ne prend pas les images en entrée, donc la
relecture visuelle humaine reste recommandée.

Défauts restants :
- Les dates exactes de démonstration sont `inconnu` dans les sources, donc non
  inventées dans P2.
- Le modèle de session ne peut pas inspecter visuellement les PNG ; audit pixel et
  assertions headless OK.
- Les planches sont une proposition design, pas une capture supplémentaire de Forge.

### Changelog vs round précédent

- V1 initiale : aucun round antérieur.
- Création du système visuel, des 5 scènes, du moteur autonome, des captures et de
  l'index de revue.

## V2 — 2026-11-18 (construit 16→18/11)

Intention : refaire le pack en le relisant réellement. Les captures v1 (relues le
16/11) montraient le thème sombre jamais appliqué : titre ivoire sur fond blanc,
illisible ; planche-contact coupée.

Direction : **« Relief loom »**. Fond papier ivoire `#F3EEE4`, encre `#15171C`, un seul
accent `#0052CC` réservé aux passages de trame (= actes de vérification). Archivo variable
serrée (OFL) et IBM Plex Mono (OFL), inlinées. Le tissu est en relief SVG éclairé par la
gauche. Chaque état a sa forme : trou percé, perforation = fil coupé effiloché, fil qui
pend, maille hachurée. Options écartées : B « Night loom » (= v1), C « Weaving draft »
(reprise seulement comme grille de P3). Détail dans `planches/v2/PLAN.md` et `REFS.md`.

Planches (`planches/v2/dist/`) :
- P1 `01-trame.html` : tissu 4 AC × 6 tickets du projet démo + légende des formes + 3 axes.
- P2 `02-probleme.html` : TRAME-104 / AC-2, tissé D−40 (2026-10-03), réécrit D−34
  (2026-10-09), perforé à D0 (2026-11-12) ; registre des 3 perforations.
- P3 `03-pipeline.html` : drawdown 8 passes × 6 couches + fichiers réels (27/27 présents).
- P4 `04-produit.html` : la vraie capture Forge prod annotée, 5 points de montage,
  11 écrans, agent Rovo « Le fil », inset « demo illustration ».
- P5 `05-preuves.html` : 8 chiffres tracés, 6 garanties, 5 limites, inconnus affichés.

Vérification : `node build.mjs` puis `TRAME_REPO=<clone> node verify.mjs` → 38 OK,
0 FAIL. Trois itérations de relecture visuelle des PNG (détail dans STATUS.md).

Défauts restants :
- Le tissu P1 est une **déduction** de `src/sample/demo-project.ts`, cohérente avec les
  totaux du moteur. Ce n'est pas un rendu du moteur.
- « 4 trous » et les 3 axes viennent d'une **image** (`docs/captures/04-trame.png`), donc
  pas de grep possible : c'est signalé dans la sortie de vérif.
- Sur mobile, la capture Forge est petite (illisible sans zoom ; les notes numérotées
  portent l'info).
- Pas de nouveau crawl Awwwards (celui du 15/11 est réutilisé, ses captures relues).
- Persona nommé : inconnu (rien dans le repo).

### Changelog vs V1
- Fond ivoire au lieu d'un sombre cassé : contraste minimal mesuré 5.90:1 (v1 : titre ~1.1:1).
- Polices auto-hébergées (Archivo / Plex Mono) au lieu des polices système.
- Tissu en relief à formes distinctes (v1 : barres colorées vert/ambre).
- P2 avec dates réelles calculées depuis la démo (v1 : « date unknown »).
- P3 en drawdown couches × étapes, chemins vérifiés un par un dans le repo
  (le brief citait `src/ingest/probe`, inexistant → corrigé en
  `src/ingest/common.ts` + `src/handlers/visibility.ts`).
- P4 : la vraie capture PNG embarquée et annotée (v1 : une reproduction redessinée).
- verify.mjs : vérifie aussi contraste AA, texte ≥ 16 px, scroll horizontal, extraits
  greppés dans le repo, reduced-motion ; génère la planche-contact complète et l'index.

## Exception projet — desktop seul (décidée par Gaia le 2026-11-18)

Trame est une app Forge qui vit dans Jira, sur ordinateur, et le jury Codegeist regarde sur
desktop. **À partir de v3, les planches de Trame sont livrées et vérifiées en 1440×900 seul.**
Le socle 09 (1440×900 + 390×844) reste inchangé pour les autres projets. v1 et v2 gardent
leurs captures mobiles.

## V3 — 2026-11-18

Intention : à la demande de Gaia, travailler l'identité visuelle, les couleurs et les détails
sur la base v2, validée (« c'est top »).

Direction : **« Linen & Denim »**, une évolution de « Relief loom ».
- Couleurs : lin `#F1ECE2` + encre indigo `#12141C` + denim `#13203F` en bandes sombres
  (une par planche), accent unique `#0052CC` (`#8DB3FF` sur denim).
- Identité : logo en armure toile avec un croisement manquant ; folio-lisière ; pager en
  fils ; badge en étiquette tissée cousue.
- Détails : grain de lin, règles de section avec un segment manquant, index `§ 0N.n`,
  frange sur les cartes, dénominateurs réduits, chiffres tabulaires, étiquette
  « demo swatch » sur l'échantillon P1, pastilles 1/2 sur le tissu P1 qui renvoient vers P2.
Détail : `planches/v3/PLAN.md`, `planches/v3/REFS.md`.

Vérification : `node build.mjs` puis `TRAME_REPO=<clone> node verify.mjs` → 33 OK, 0 FAIL
(desktop seul). Le contraste et la taille du texte sont maintenant contrôlés **sur toute la
page** (en v2, seulement sur le premier écran).

Défauts restants :
- Le logo, à 34 px, se lit comme « une grille tissée » ; le croisement manquant ne se voit
  qu'au zoom. Une version plus grande (favicon/hero) reste à faire.
- Les captures pleine page montrent une couture du dégradé de fond (artefact du fond
  `position: fixed` en capture fullPage, invisible en navigation réelle).
- Le tissu P1 reste une déduction de `src/sample/demo-project.ts`.

### Changelog vs V2
- Palette : ivoire → lin, noir → encre indigo, ajout du denim en bandes sombres.
- Logo, folio, pager et badge redessinés comme un système tissé.
- Cartes « échantillon » à frange ; règles de section en fil interrompu ; index `§`.
- P1 : pastilles 1/2 + légende sur le tissu, étiquette cousue, filets au-dessus des chiffres.
- P2 : fil reliant les 3 étapes ; carte « Trame says » en denim.
- P3 : brins de chaîne en encre dans le drawdown, terminal JQL sur denim.
- P4 : encart « demo illustration » posé en lin sur la bande denim ; chemins raccourcis.
- P5 : grille de preuves en filets (sans boîtes) ; limites sur denim avec barre interrompue.
- Mobile retiré (exception projet ci-dessus).
- Correctif : collision des noms de classe entre sections et composants (`guar`, `lim`),
  résolue par un préfixe `s-`.
