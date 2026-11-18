# REFS.md — Trame (codegeist-trame) · planches v1

Date : 2026-11-15. Méthode : socle `09-planches-5-awwwards.md` §3 + les 11 refs fixes
de `HACKATONS/REFERENCES-DESIGN.md`.

## 1. Parcours Awwwards réellement effectué (Playwright, Chrome headless, 1440×900)

Listing parcouru (HTTP 200, titres relevés) :
- `/websites/` pages 1 → 5 (31 liens/page, 90 slugs uniques collectés)
- Catégories : `/websites/technology/`, `/websites/minimal/`, `/websites/design/`, `/websites/typography/`

Fiches de sites ouvertes + sites réellement visités (outil `.refs/visit.mjs`,
captures `.refs/shots/*.jpg`, métadonnées `.refs/visits.json`) — 13 visites
effectives, 1 échec consigné :

| # | Slug Awwwards | Site visité | Police H1 relevée | Accents relevés | 3 principes transférables | Ce qu'on refuse d'en prendre |
|---|---|---|---|---|---|---|
| 1 | booleansequence | booleansequence.niceunderground.xyz | Archivo 196px / −10.8px | #0000FF sur #FFF | (a) titre géant serré comme image ; (b) grille générative = sujet du site ; (c) 2 couleurs seulement | l'esthétique « generative art » décorative, le bleu pur #0000FF |
| 2 | with-wise | withwise.com | Figtree 10px | #4E1C4F #D81E5B | (a) preuve sociale posée près du CTA ; (b) chapôs courts, densité maîtrisée | le rose/magenta, le ton compliance-marketing |
| 3 | crun-ai | crun.ai | Poppins 60px / −1.5px | — | (a) SaaS lisible sans scroll ; (b) compteurs produits en héros | le look SaaS générique à cartes ombrées |
| 4 | runtimewire | runtimewire.com | Newsreader 44px | — | (a) serif éditoriale pour la voix narrative ; (b) rythme de flux d'actualité | le thème « news » hors sujet |
| 5 | s-c-labs | sc-aesthetic-labs.com | AL Mono 60px | #151616 #F2F4F4 | (a) mono pour les mots techniques ; (b) contraste quasi-noir/quasi-blanc ; (c) « visible trust » = preuve mise en scène | la police propriétaire AL Mono |
| 6 | genomines | genomines.com | Causten 60px / −1.8px | #C9FE7C #EFEBE1 | (a) accent unique acide sur fond crème ; (b) gros chiffres posés en marge | le vert lime, le ton biotech |
| 7 | hyperiux-vault | vault.hyperiux.com | aeonikPro 92px / −3.2px | #FF5F00 #050505 | (a) sombre + un accent chaud unique ; (b) bibliothèque documentée en vitrine | l'orange #FF5F00, l'effet « vault » |
| 8 | vast-1 | vastworld.ai | Instrument Sans 138px / −7.6px | #111 #F5F5F5 | (a) échelle typographique extrême (138px) ; (b) noir/gris strict, la 3D porte la scène | la marque, la vidéo 3D d'entreprise |
| 9 | constellations-s | constellations.icilalune.com | Arimo 42px | #201E1D #EC3013 | (a) scène sombre immersive comme premier écran sans menu ; (b) rouge unique en signal | l'univers expo d'art, le rouge |
| 10 | recursiv-1 | — (404 Not Found) | — | — | — | — (échec consigné, non compté) |
| 11 | glinto | glinto.co.kr | Pretendard 16px | #E7FBC3 | (a) corps 16px très propre, hiérarchie simple | le crème/vert, le ton studio coréen |
| 12 | studio-plato | studioplato.co | Opensaucesans 20px | #000 #fff | (a) N&B strict, la photo/matière porte tout ; (b) grille éditoriale lente | le contenu déco/intérieur |
| 13 | iroom | iroom.devinthehood.com | Poppins 76px / −2.7px | #1F72C7 #0E1117 | (a) **indigo #1F72C7 sur sombre #0E1117** — très proche du sujet Atlassian ; (b) doc/framework présenté comme produit | le bleu exact de leur marque, leur layout de doc |
| 14 | xantium | xantium.com | Space Mono 48px | — | (a) mono en titre = registre technique ; (b) sobriété aérospatiale | le positionnement spatial |

Note : les captures `.refs/shots/*.jpg` existent mais le modèle de session ne peut
pas les relire visuellement (pas d'entrée image) — les principes ci-dessus viennent
des métadonnées réellement mesurées (polices calculées, couleurs inline, titres).

## 2. Les 11 refs fixes de Gaia appliquées à Trame

| Ref | Principe retenu pour Trame | Ce que je refuse d'en prendre |
|---|---|---|
| LogoPoint | N&B strict, clarté d'offre | le layout corporate |
| Igloo | 3D immersive en décor — **refusé ici** : le tissage se lit mieux en 2D topologique (le prompt trame le dit explicitement) | la 3D réaliste |
| Flow Computing | relief doux éclairé latéralement → **traduit** en relief de mailles (ombres CSS sur les fils) | l'onglet Contact vertical |
| Dominic Burt | grande linéale très serrée + un signe graphique unique qui revient → le **fil** (trait horizontal) comme motif D—B | la forme granuleuse crème |
| Teko | un seul mot repris en couleur d'accent → « missing » en indigo | le magenta |
| NexusGPT | lisibilité produit avant tout, N&B strict | le look shadcn générique |
| Noon | fond sombre + UNE couleur d'accent | l'orange, la vidéo de fond |
| Raben Rifaie | scroll narratif | l'orange, la 3D Framer |
| Gapsy Studio | griffonnages par-dessus la scène → annotations « wireframe » sur le tissu | les lettres en relief, la salle blanche |
| Concept Studio | flat clair, hiérarchie simple | le jaune |
| D.FY | sombre + accent, parallax de scroll | le jaune, les grandes photos |

## 3. Synthèse — les 5 principes retenus pour CE projet

1. **Le tissage EST la grille** : fils = lignes de grille, mailles = cellules ; la
   structure du site répète le motif du produit (booleansequence, Concept Studio).
2. **Encre + ivoire + UN accent** : fond encre `#171A21`, chaîne ivoire `#F4F0E8`,
   indigo `#4C8DFF`/`#0052CC` (Jira) réservé aux liaisons et à l'activation —
   jamais décoratif (Noon, iroom, booleansequence).
3. **Titre géant serré, un mot en accent** : « the thread that is **missing** »,
   −0.04em, 120–140px desktop (vast-1, Dominic Burt, Teko).
4. **Premier écran = la scène tissée, sans menu** : un tissu 6×4 dont les trous et
   perforations se lisent comme des formes, pas des couleurs (Igloo via Flow
   Computing, constellations-s).
5. **États = vocabulaire du produit** : machine/attestée/déclarée, trou/perforation/
   fil détendu/infalsifiable — chaque état a glyphe + libellé, jamais la couleur
   seule ; mono pour `AC-n`, tests, dates (s-c-labs, xantium).
