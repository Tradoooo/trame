# PLAN.md — Trame · 5 planches v1

Langue : EN (Codegeist). Badge : `Codegeist 2026 · Apps for Software Teams`.
Système commun : encre `#171A21` / ivoire `#F4F0E8` / accent indigo (liaisons), mono
pour les identifiants techniques, tissage 2D comme grille, scroll narratif, reduced-motion
coupe tout. Zéro réseau, zéro image externe — tout dessiné en SVG/CSS.

## Les 3 options de direction artistique (proposées avant construction)

- **A — « Loom on ink » (recommandée)** : sombre encre, tissu ivoire en relief doux
  (ombres dirigées à la Flow Computing), indigo Jira en accent unique, titre géant
  serré, un fil horizontal comme signe récurrent (Dominic Burt). La matière porte la
  métaphore : le tissu clair flotte sur le fond sombre, les trous sont des absences
  réelles dans la scène.
- **B — « Paper weave »** : fond ivoire strict, tissage encre en flat, accent indigo,
  registre éditorial (serif pour la voix, mono pour les tests — runtimewire, Plato).
  Plus calme, moins spectaculaire en premier écran.
- **C — « Machine room »** : tout mono, terminal éditorial, chiffres en héros
  (xantium, s-c-labs). Très technique, mais risque de perdre la métaphore textile.

**Choix : A.** Raisons : la métaphore (couverture = tissu) gagne à être une matière
visible sur fond sombre ; les 11 refs fixes (Noon, D.FY, Flow Computing) et 3 sites
visités (iroom, hyperiux, constellations) confirment que sombre + un accent + scène
porteuse fonctionne pour un produit dev-tools ; B et C restent notés pour un round 2
(`/variantes`).

## Les 5 planches

| # | Fichier | Titre | Ce qu'elle fait comprendre | Visuel dominant | Principe appliqué | Données réelles affichées (source) |
|---|---|---|---|---|---|---|
| P1 | 01-comprendre.html | Trame — the coverage of your acceptance criteria | En 5 s : les critères sont des fils, les tests les traversent, les absences sont des formes | Tissu 6×4 = 24 mailles : 13 couvertes, 4 infalsifiables séparées, 1 trou, 1 perforation dessinés comme topologie | Premier écran = scène sans menu ; titre 120px serré, « missing » en indigo | 24 critères, 13/18 couverts déclarés, 4 infalsifiables (docs/CAPTURES.md) ; badge Codegeist · Apps for Software Teams |
| P2 | 02-probleme.html | The coverage that quietly disappears | Un critère modifié après son test paraît couvert alors que la preuve est périmée | Scénario DEMO_TICKETS : un critère, deux dates, le fil qui casse entre elles | Scroll narratif avant/après ; glyphe perforation + libellé | 6 tickets × 4 critères = 24 ; 18 vérifiables ; 1 provisoire (docs/CAPTURES.md) ; persona : inconnu (non inventé) |
| P3 | 03-pipeline.html | How Trame weaves, end to end | Le pipeline réel en 8 étapes, des gîtes au bulletin | 8 nœuds sur la trame, un passage de trame anime la liaison | Grille = tissage ; mono pour les chemins src/ | 8 étapes nommées avec fichiers réels (README, docs/SUBMISSION.md) ; 6 gîtes ; 4 chemins de liaison |
| P4 | 04-produit.html | A real Forge app, in production | L'app Forge rendue dans Jira, pas une maquette | Reproduction fidèle de la capture 06 (Scope/Scope type/Load) + inset carte de trame étiqueté « demo illustration » | Matière et lumière : l'écran comme objet posé | v2.1.0 production, one-atlas-cndz.atlassian.net (README, docs/captures/06) ; 11 écrans ; 5 entrées UI Kit 2 |
| P5 | 05-preuves.html | Measured, assumed, honest | Chiffres mesurés, garanties, limites assumées | Tableau de preuves tracées + les 2 souches nommées | N&B strict, chiffres en marge (genomines) ; chaque chiffre → chemin source | 455 tests/53 fichiers ; 14 MCP + 4 actions ; 15 tables ; 18 permissions/10 graph ; 20 points recette ; forge lint 0 err/4 av (README, docs/SUBMISSION.md) ; limites LLM + certificat Confluence |

## Contrat technique (socle 09 §4)

- 1440×900 + 390×844, zéro requête réseau, polices système (ui-sans + ui-mono).
- 3D : non — le tissage se lit mieux en 2D topologique (décision justifiée §REFS).
- `prefers-reduced-motion` coupe les animations ; focus visible ; AA ; corps ≥16px.
- Chaque chiffre porte `data-src` vers son chemin de repo ; `verify.mjs` le contrôle.
