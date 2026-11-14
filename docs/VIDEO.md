# VIDEO — Trame, soumission Codegeist 2026

> Fiche mesurée le **14 novembre 2026** sur `origin/main` @ `eca0b38`.
> La vidéo, les sous-titres anglais et la transcription sont des artefacts
> **livrés**, pas un plan : chaque chiffre ci-dessous est lu dans le fichier.
> La chaîne qui les produit est dans `tools/video/` et se rejoue en local.

## 1. Le fichier

| Champ | Valeur mesurée |
|---|---|
| Durée | **276,9 s = 4:37** (cible §25 : 4:45 — 8 s en dessous, rien n'est coupé au montage) |
| Résolution / cadence | 1920×1080, 30 fps |
| Pistes | `h264` (vidéo) · `aac` 48 kHz stéréo (voix) · `mov_text` (sous-titres anglais, piste 2) |
| Taille | 21,4 Mo |
| Voix | `edge-tts`, `en-US-AndrewNeural`, débit −8 % ; normalisation `loudnorm I=-16 TP=-1.5 LRA=11` appliquée **une fois** sur la piste entière, pas par scène |
| Où | https://github.com/Tradoooo/trame/releases/tag/video-2026-11-14 — assets `trame-codegeist.mp4` et `trame-codegeist.srt` (l'URL du `.mp4` se colle tel quel dans le champ « video URL » du formulaire) |
| Fichier | [`trame-codegeist.mp4`](https://github.com/Tradoooo/trame/releases/download/video-2026-11-14/trame-codegeist.mp4) · [`trame-codegeist.srt`](https://github.com/Tradoooo/trame/releases/download/video-2026-11-14/trame-codegeist.srt) |

Le niveau moyen mesuré est **−19,2 dB** avec un crête à **−1,5 dB** : la voix est
audible sans écraser les silences entre les plans.

## 2. Les douze plans, dans l'ordre

`docs/VIDEO-SCRIPT.md` §1 donne l'ordre et le minutage visés. L'ordre est
respecté ; le minutage est celui que la voix mesure, plan par plan :

| Plan | Type | Visé (§25) | Réel | Durée | Écart au départ |
|---|---|---|---|---|---|
| `c0_carte` | carte | — | 0:00–0:08 | 7,5 s | slot ajouté (titre + slogan) |
| `c1_counters` | site | 0:00–0:25 | 0:08–0:33 | 25,4 s | +8 s |
| `c2_weave_axes` | site | 0:25–1:00 | 0:33–1:00 | 27,4 s | +8 s |
| `c3_sheet` | site | 1:00–1:35 | 1:00–1:27 | 27,0 s | ±0 s |
| `c4_perforations` | site | 1:35–2:10 | 1:27–1:54 | 26,9 s | −8 s |
| `c5_dangling` | site | 2:10–2:40 | 1:54–2:16 | 22,1 s | −16 s |
| `c6_holes` | site | 2:40–3:05 | 2:16–2:39 | 22,8 s | −24 s |
| `c7_rovo` | terminal | 3:05–3:25 | 2:39–3:03 | 24,3 s | −26 s |
| `c8_certificate` | site | 3:25–3:50 | 3:03–3:30 | 26,9 s | −22 s |
| `c9_sibling` | site (app sœur) | 3:50–4:15 | 3:30–3:50 | 19,7 s | −20 s |
| `c10_architecture` | site | 4:15–4:45 | 3:50–4:22 | 32,0 s | −25 s |
| `c11_tests` | terminal | — | 4:22–4:37 | 15,0 s | slot ajouté (suite de tests + repo) |

Deux slots ajoutés (ouverture et chute) et sept plans plus courts que la cible :
la voix dicte la durée, pas l'inverse. Aucun plan n'est tronqué pour rentrer
dans le minutage — le texte narré est celui de `tools/video/scenes.py`, mot à mot.

## 3. Ce que chaque plan montre, et d'où ça vient

Neuf plans sont des **enregistrements du site en ligne** (`shots.mjs`, Chrome
système headless via `playwright-core`, 1920×1080, sans prendre le focus) :
aucune maquette, aucun PNG animé, aucune composition. Les trois autres sont une
carte de titre et deux rendus **terminal** dont le contenu est la sortie réelle
de commandes relancées le 14 novembre (`texts.sh`).

| Plan | Source réelle | Ce que l'écran lit |
|---|---|---|
| `c1_counters` | `https://tradoooo.github.io/trame/#demo`, sélecteur *Whole project* | 24 écrits · 18 vérifiables · 4 infalsifiables · 13/18 couverts · 1 provisoire · 4 trous · 11 prouvés · 3 perforations · 2 fils détendus |
| `c2_weave_axes` | `#weave` puis *The three axes, never merged* | le dessin (échantillon semé) puis les trois axes séparés |
| `c3_sheet` | la fiche `TRAME-102 / AC-2` | un seul acte, `manual test case`, force **attested** : couvert, pas prouvé |
| `c4_perforations` | *The perforation registry* | `TRAME-104/AC-2` 34 d `dry` · `TRAME-102/AC-4` 5 d `fresh` · `TRAME-101/AC-4` 3 d `fresh` |
| `c5_dangling` | *The loose thread queue* | `TRAME-101.testShouldCountHoles` et `TRAME-104.testShouldDropDanglingCoverage`, impact 1 chacun |
| `c6_holes` | *The holes, ranked by the métré* | 0,6840 · 0,6050 · 0,4500 · 0,3125, avec la formule affichée |
| `c7_rovo` | `manifest.yml` + `npx vitest run tests/contract/entry-points.test.ts` | 14 outils MCP, 5 tests verts, et les `NOT_IMPLEMENTED` de `src/ingest/llm.ts` |
| `c8_certificate` | *The weave certificate* → *What is NOT covered* | les actes qui tiennent maille, puis ce qui ne l'est pas |
| `c9_sibling` | `https://tradoooo.github.io/preuve-a-l-appui/` | l'app sœur qui tient la porte de Done |
| `c10_architecture` | `#architecture` puis `#recipe` | les quatre chemins de liaison, la recette |
| `c11_tests` | `npx vitest run` + `tools/check-file-limits.py` + le site | **54 fichiers, 455 tests verts** · 246 fichiers dans la limite · site `200` |

Les compteurs du plan 1 sont les mêmes que ceux de `tests/site/demo-numbers.test.ts`
(6 tests verts) : la vidéo montre des chiffres que le moteur calcule, et un test
les atteste dans le dépôt.

## 4. Les trois choses que la vidéo ne montre pas

`docs/VIDEO-SCRIPT.md` §0.2 les nomme ; la chaîne les respecte, et le filet bas
de chaque plan concerné le dit à l'écran, en anglais (langue de la soumission) :

1. **aucun écran dessiné par UI Kit 2 dans Jira** — les écrans sont filmés sur le
   site public, qui exécute le vrai moteur ; l'app installée n'apparaît pas comme
   un dessin ;
2. **aucun texte écrit par un modèle** — `proposeReformulation` et `draftTest`
   renvoient `NOT_IMPLEMENTED` ; le plan `c7_rovo` le montre dans le code plutôt
   que de simuler une réponse ;
3. **aucune publication Confluence** — `publishCertificate` renvoie `null` (repli
   §21) : le certificat est montré dans le panneau du site, avec la mention
   « export manuel aujourd'hui ».

Le plan `c9_sibling` montre l'app sœur **telle qu'elle est en ligne** ; rien dans
le dépôt de Trame n'implémente l'intégration, et la voix le dit (« Trame is a
measurement layer, not a gate ») sans prétendre qu'un pont de code existe.

## 5. Contrôle de cadrage

Chaque plan vérifie son cadrage avant de fermer : `shots.mjs` recherche **le plus
petit conteneur** qui porte le texte cible (un `div` géant contiendrait la page
entière et ramènerait le défilement en haut), défile, puis lit le rectangle final
et l'imprime (`CADRAGE … {"ok":true,…}`). Le journal de la dernière prise est
`ok:true` sur les onze cibles. Deux défauts trouvés et corrigés ainsi, le
14 novembre :

- le site choisit la langue du navigateur : sans `locale: "en-US"` et sans
  `localStorage["trame-site-lang"]="en"`, les plans étaient **en français** alors
  que la voix est anglaise ;
- le filet bas masquait une ligne de tableau : il réserve désormais 120 px de
  `padding-bottom` au corps de page au lieu de recouvrir le contenu.

## 6. Ce que ça change à la checklist

`docs/SUBMISSION.md` §6, points 5 et 8 : le scénario **et** la vidéo sont faits,
la vidéo est publiée (https://github.com/Tradoooo/trame/releases/tag/video-2026-11-14).
L'échéance est le 22 décembre 2026 ; il reste à soumettre le formulaire Codegeist
avec les trois liens : le dépôt, la démonstration
(`https://tradoooo.github.io/trame/`) et la vidéo (l'URL directe du `.mp4`, ligne 18).
