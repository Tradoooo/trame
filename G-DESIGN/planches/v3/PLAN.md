# PLAN.md — Trame · 5 planches v3 (2026-11-18)

**v3 = v2 + identité visuelle, couleurs et détails** (demande Gaia du 18/11), **desktop
1440×900 seul** (décision Gaia du 18/11 : pas de version mobile pour Trame). La structure
des 5 planches et les données sont celles de v2 (ci-dessous) ; seuls le système visuel et
les finitions changent.

## Identité v3 — « Linen & Denim »
- **Couleurs** : lin `#F1ECE2` (page), lin-2 `#E7E0D2`, lin brut `#CDBFA4` (règles), encre
  indigo `#12141C`, **denim `#13203F`** pour les bandes sombres (une par planche), accent
  unique `#0052CC` (sur denim : `#8DB3FF`). Le denim est un sergé teint à l'indigo : il
  relie la métaphore du tissage au bleu Jira.
- **Logo** : armure toile 3 chaînes × 2 trames, dont le dernier croisement manque
  (« the thread that is missing »).
- **Folio-lisière** : 5 fils de chaîne, la page courante est traversée par la trame bleue ;
  même logique pour le pager de pied.
- **Badge = étiquette tissée** : fond encre, surpiqûre en pointillés.
- **Détails** : grain de lin inline, règles de section en fil avec un segment manquant,
  index `§ 0N.n`, frange de fils sur les cartes, dénominateurs en petit (`13/18`),
  chiffres tabulaires, étiquette « TRAME · demo swatch » cousue sur l'échantillon P1,
  pastilles 1/2 sur le tissu P1 qui renvoient vers P2.

---

## Base héritée de v2 (2026-11-16)

Langue : EN (Codegeist). Badge : `Codegeist 2026 · Apps for Software Teams`.
Pourquoi une v2 : la v1 (15/11) avait un défaut bloquant visible sur ses captures. Le
thème sombre n'a jamais été appliqué (le fond reste blanc), donc le titre ivoire est
illisible, et la planche-contact est coupée à mi-hauteur. La v1 reste archivée telle quelle.

## 3 directions proposées

- **A — « Relief loom » (retenue)** : papier ivoire, tissu en relief doux éclairé par la
  gauche, linéale Archivo très serrée, un seul accent (bleu Jira `#0052CC`) réservé aux
  passages de trame (= actes de vérification). Les anomalies sont des formes : maille
  percée (trou), fil coupé effiloché (perforation), fil qui pend (fil détendu). La texture
  porte l'état, la couleur ne le porte jamais seule.
- **B — « Night loom »** : la v1 refaite correctement (encre, ivoire, bleu). Écartée :
  même idée que v1, et elle rompt avec l'écran Jira clair de P4.
- **C — « Weaving draft »** : tout en papier quadrillé de tisserand, mono, N&B. Écartée
  comme charte, **reprise comme grille de P3** (la matrice étapes × couches est un
  vrai « drawdown » de tissage).

**Recommandation : A.** Raisons : la métaphore est matérielle (Flow Computing : relief
et lumière), le titre est une image (Dominic Burt), un seul accent (Noon / Teko), et le
produit vit dans Jira clair, donc P4 s'enchaîne sans rupture.

## Système commun

- Papier `#F3EEE4`, encre `#15171C`, gris de texte `#4A4D55`, accent `#0052CC`.
- Archivo variable (wdth 62–125, wght 100–900, OFL) en display serré ; IBM Plex Mono
  (OFL) pour `AC-n`, `TRAME-10x`, tests, chemins. Polices inlinées en base64 dans le HTML.
- Premier écran sans menu : marque + `01 / 05` + badge ; pager + table SRC en pied.
- Mouvement : passages de trame qui se tissent (stroke draw), révélations au scroll ;
  `prefers-reduced-motion` → aucune animation, tout est visible immédiatement.

## Les 5 planches

| # | Fichier | Titre | Fait comprendre | Visuel dominant | Données réelles (source) |
|---|---|---|---|---|---|
| P1 | 01-trame.html | The thread that is missing. | Critères = fils, tests = passages, absences = formes | Tissu 4 AC × 6 tickets (24 mailles) dérivé de `DEMO_TICKETS` | 24 / 18 / 4 / 13-18 / 1 / 4 trous / 3 perf. / 2 fils détendus (`docs/CAPTURES.md`, `docs/captures/04-trame.png`, `src/sample/demo-project.ts`) |
| P2 | 02-probleme.html | Covered. Until the criterion changed. | Le check vert a survécu à son critère | 3 images d'un même fil : tissé → réécrit → perforé, 2 dates | TRAME-104 / AC-2, test D−40, critère modifié D−34, démo figée 2026-11-12 (`src/sample/demo-project.ts`) ; persona : inconnu |
| P3 | 03-pipeline.html | Eight passes, from criterion to certificate. | Le pipeline réel et les couches touchées | Drawdown 8 étapes × 6 couches + fichiers réels | 6 gîtes, 4 chemins de liaison, 4 absences, 4 JQL (`README.md`, `src/types.ts`) |
| P4 | 04-produit.html | The weave, inside Jira. | C'est une vraie app Forge en production | Capture réelle `06-app-jira-production.png` annotée + inset « demo illustration » | v2.1.0 prod, 5 entrées UI Kit 2, 11 écrans, agent « Le fil » (`README.md`, `docs/SUBMISSION.md`) |
| P5 | 05-preuves.html | Measured. Traceable. Honest. | Chiffres, garanties, limites | Grille de preuves, chaque chiffre → fichier + extrait | 455 tests / 53 fichiers, lint 0/4, 14+4 outils, 15 tables, 18/10 permissions, 20 points (`README.md`, `docs/SUBMISSION.md`, `src/db/schema.ts`, `docs/RECETTE.md`) |

P4 : **écran réel** (pas la vue éclatée), parce que la seule preuve d'un rendu Forge
effectif est la capture 06 ; les dessins du site sont étiquetés « illustration ».

Mapping du tissu P1 (déduit de `src/sample/demo-project.ts`, totaux vérifiés contre les
compteurs du moteur dans `docs/captures/04-trame.png`) :

```
          AC-1  AC-2  AC-3  AC-4
TRAME-101  C     C     U     P+H   (test désactivé + critère modifié)
TRAME-102  C     C     V     P
TRAME-103  C     C     U     C
TRAME-104  H     P     C     H
TRAME-105  C     C     U     H
TRAME-106  C     D     U     D
C=couvert(13 avec P) H=trou(4) P=perforation(3) U=infalsifiable(4) V=provisoire(1) D=supprimé(2)
```
