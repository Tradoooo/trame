# STATUS.md — codegeist-trame

## Claude / agent design

- Phase: design · Etat: review · Round: R1 (V1) · Maj: 2026-11-15 21:40
- Packs existants inspectés avant création : aucun pour trame → v1 créée.
- DA proposées : A « Loom on ink » (retenue), B « Paper weave », C « Machine room »
  (dans planches/v1/PLAN.md).

Sortie réelle de `node verify.mjs` (copie intégrale) :

```
OK  01-comprendre.html | 1440x900 | 0 erreur JS | 0 requête externe | marque:1 badge:1 scène:1 | chevauchements:0 | data-src:3 | reduced-motion native:false
OK  01-comprendre.html | 390x844 | 0 erreur JS | 0 requête externe | marque:1 badge:1 scène:1 | chevauchements:0 | data-src:3 | reduced-motion native:false
OK  02-probleme.html | 1440x900 | 0 erreur JS | 0 requête externe | marque:1 badge:1 scène:1 | chevauchements:0 | data-src:2 | reduced-motion native:false
OK  02-probleme.html | 390x844 | 0 erreur JS | 0 requête externe | marque:1 badge:1 scène:1 | chevauchements:0 | data-src:2 | reduced-motion native:false
OK  03-pipeline.html | 1440x900 | 0 erreur JS | 0 requête externe | marque:1 badge:1 scène:1 | chevauchements:0 | data-src:0 | reduced-motion native:false
OK  03-pipeline.html | 390x844 | 0 erreur JS | 0 requête externe | marque:1 badge:1 scène:1 | chevauchements:0 | data-src:0 | reduced-motion native:false
OK 03-pipeline | 8 étapes du pipeline réel présentes (attendu 8)
OK  04-produit.html | 1440x900 | 0 erreur JS | 0 requête externe | marque:1 badge:1 scène:1 | chevauchements:0 | data-src:4 | reduced-motion native:false
OK  04-produit.html | 390x844 | 0 erreur JS | 0 requête externe | marque:1 badge:1 scène:1 | chevauchements:0 | data-src:4 | reduced-motion native:false
OK  05-preuves.html | 1440x900 | 0 erreur JS | 0 requête externe | marque:1 badge:1 scène:1 | chevauchements:0 | data-src:5 | reduced-motion native:false
OK  05-preuves.html | 390x844 | 0 erreur JS | 0 requête externe | marque:1 badge:1 scène:1 | chevauchements:0 | data-src:5 | reduced-motion native:false
OK 05-preuves | chiffres tracés: README.md, README.md, src/db/schema.ts, docs/SUBMISSION.md, docs/RECETTE.md
```

Audit complémentaire (node audit.mjs) : animations running sous reduced-motion = 0
sur les 5 pages ; contraste `.lede` sur fond = 10.16:1 (AA OK) ; h1 et tissu visibles
au-dessus de la ligne de flottaison en 1440×900 (weave top 504px) et 390×844 (476px).

Itérations de relecture captures :
1. `verify.mjs` complet (assertions + captures deux tailles).
2. `audit.mjs` (reduced-motion, contraste, flottaison). Corrigé entre les deux :
   backticks JSX cassant p03/p04 (remplacés par `<code>`), puis rebuild + re-verify OK.

Limite consignée : ce modèle ne lit pas les images → la relecture visuelle humaine
des PNG reste à faire par Gaia (captures/ et planche-contact.jpg fournis).

Prochaine action suggérée : relecture visuelle par Gaia (feedback Garder / Changer /
Essayer), puis `/variantes` (B « Paper weave ») ou `/lock` si A est validée.

### Round R2 (V2) — Phase: design · Etat: review · Maj: 2026-11-18

- v1 laissée intacte ; **v2 créée** : `planches/v2/`. DA « Relief loom » (A) retenue
  sur B « Night loom » et C « Weaving draft ».
- Commandes : `cd planches/v2 && npm install && node build.mjs && TRAME_REPO=<clone Tradoooo/trame> node verify.mjs`

Sortie réelle de `node verify.mjs` (copie intégrale, exit 0) :

```
OK   01-trame.html | 1440x900 | 0 erreur JS | 0 requête externe | marque+slogan(h1)+badge:111 scène:1 | chevauchements:0 | contraste min 5.90:1 (<AA:0) | texte<16px:0 | scroll-x:0 | data-src:7
OK   01-trame.html | 390x844 | 0 erreur JS | 0 requête externe | marque+slogan(h1)+badge:111 scène:1 | chevauchements:0 | contraste min 5.90:1 (<AA:0) | texte<16px:0 | scroll-x:0 | data-src:7
OK   01-trame.html | prefers-reduced-motion | animations en cours:0 | éléments masqués:0
OK   02-probleme.html | 1440x900 | 0 erreur JS | 0 requête externe | marque+slogan(h1)+badge:111 scène:1 | chevauchements:0 | contraste min 5.90:1 (<AA:0) | texte<16px:0 | scroll-x:0 | data-src:2
OK   02-probleme.html | 390x844 | 0 erreur JS | 0 requête externe | marque+slogan(h1)+badge:111 scène:1 | chevauchements:0 | contraste min 5.90:1 (<AA:0) | texte<16px:0 | scroll-x:0 | data-src:2
OK   02-probleme.html | prefers-reduced-motion | animations en cours:0 | éléments masqués:0
OK   03-pipeline.html | 1440x900 | 0 erreur JS | 0 requête externe | marque+slogan(h1)+badge:111 scène:1 | chevauchements:0 | contraste min 5.90:1 (<AA:0) | texte<16px:0 | scroll-x:0 | data-src:1
OK   03-pipeline.html | 390x844 | 0 erreur JS | 0 requête externe | marque+slogan(h1)+badge:111 scène:1 | chevauchements:0 | contraste min 5.90:1 (<AA:0) | texte<16px:0 | scroll-x:0 | data-src:1
OK   03-pipeline.html | prefers-reduced-motion | animations en cours:0 | éléments masqués:0
OK   04-produit.html | 1440x900 | 0 erreur JS | 0 requête externe | marque+slogan(h1)+badge:111 scène:1 | chevauchements:0 | contraste min 5.90:1 (<AA:0) | texte<16px:0 | scroll-x:0 | data-src:5
OK   04-produit.html | 390x844 | 0 erreur JS | 0 requête externe | marque+slogan(h1)+badge:111 scène:1 | chevauchements:0 | contraste min 5.90:1 (<AA:0) | texte<16px:0 | scroll-x:0 | data-src:5
OK   04-produit.html | prefers-reduced-motion | animations en cours:0 | éléments masqués:0
OK   05-preuves.html | 1440x900 | 0 erreur JS | 0 requête externe | marque+slogan(h1)+badge:111 scène:1 | chevauchements:0 | contraste min 5.90:1 (<AA:0) | texte<16px:0 | scroll-x:0 | data-src:13
OK   05-preuves.html | 390x844 | 0 erreur JS | 0 requête externe | marque+slogan(h1)+badge:111 scène:1 | chevauchements:0 | contraste min 5.90:1 (<AA:0) | texte<16px:0 | scroll-x:0 | data-src:13
OK   05-preuves.html | prefers-reduced-motion | animations en cours:0 | éléments masqués:0
OK   03-pipeline.html | étapes .step rendues: 8 (attendu 8)
OK   P3 | 8 étapes nommées | 27/27 chemins réels présents dans le repo
OK   chiffre written=24 | docs/CAPTURES.md | extrait trouvé
OK   chiffre verifiable=18 | docs/CAPTURES.md | extrait trouvé
OK   chiffre unfalsifiable=4 | docs/CAPTURES.md | extrait trouvé
OK   chiffre covered=13/18 | docs/CAPTURES.md | extrait trouvé
OK   chiffre provisional=1 | docs/CAPTURES.md | extrait trouvé
OK   chiffre holes=4 | docs/captures/04-trame.png | fichier image présent (lu visuellement)
OK   chiffre perforations=3 | src/sample/demo-project.ts | extrait trouvé
OK   chiffre tests=455 | README.md | extrait trouvé
OK   chiffre lint=0 | docs/SUBMISSION.md | extrait trouvé
OK   chiffre mcp=14 | README.md | extrait trouvé
OK   chiffre screens=11 | README.md | extrait trouvé
OK   chiffre tables=15 | src/db/schema.ts | extrait trouvé
OK   chiffre perms=18 | docs/SUBMISSION.md | extrait trouvé
OK   chiffre recette=20/20 | docs/SUBMISSION.md | extrait trouvé
OK   chiffre entries=5 | README.md | extrait trouvé
OK   chiffre version=v2.1.0 | README.md | extrait trouvé
OK   chiffre jql=4 | README.md | extrait trouvé
OK   chiffre modules=18 | docs/SUBMISSION.md | extrait trouvé
OK   P2 cas | src/sample/demo-project.ts | « editedAgo: 34 »
OK   P2 cas | src/sample/demo-project.ts | « testShouldBeStable', executedAgo: 40 »
OK   P2 cas | src/sample/demo-project.ts | « DEMO_NOW = '2026-11-12 »
```

Relecture des captures (PNG ouverts et regardés) :
1. Itér. 1 : chemins de code à 15 px (P2/P3) → 16 px ; débordement mobile P3/P4 ;
   libellés de couches collés en P3 (colonne 330 → 440 px) ; chemins coupés en plein
   mot (espaces après les virgules) ; pastilles P4 qui masquaient « Trame » et
   « Load » → décalées ; fils en « pilules » → cordes continues ; coupure de
   perforation cachée sous la trame → déplacée au-dessus ; P2 étape 2 identique à
   l'étape 1 → nouvel état « rewritten » (étiquette v2) ; tissu sous la ligne de
   flottaison en mobile P1 → remonté sous le titre.
2. Itér. 2 : débordement réel de 1457 px trouvé en page entière (chemins
   `src/ui/frontend/*.tsx` sortant des cartes P4) → corrigé à la source (le `clip`
   provisoire a été retiré) ; « loose ×2 » sous le fil → déplacé ; P5 mobile en
   2 colonnes trop serrées → 1 colonne.
3. Itér. 3 : planche-contact + P5 390×844 relues : plus de défaut visible.

Écarts au brief signalés : `src/ingest/probe` n'existe pas (sonde = `src/ingest/common.ts`
+ `src/handlers/visibility.ts`) ; P1 « 13 mailles couvertes » inclut 2 mailles perforées
(le moteur les compte « couvertes, déclarées »).

Prochaine action suggérée : feedback de Gaia (Garder / Changer / Essayer) sur
`planches/v2/index.html`, puis `/lock` ou `/delta`.

### Round R3 (V3) — Phase: design · Etat: review · Maj: 2026-11-18

- Demande Gaia : pas de version mobile ; améliorer l'identité, les couleurs, les détails.
  → **v3 créée** (`planches/v3/`), v1/v2 intactes. DA « Linen & Denim ». Exception
  « desktop seul » consignée dans DESIGN.md.

Sortie réelle de `node verify.mjs` (copie intégrale, exit 0) :

```
OK   01-trame.html | 1440x900 | 0 erreur JS | 0 requête externe | marque+slogan(h1)+badge:111 scène:1 | chevauchements:0 | contraste min 5.20:1 (<AA:0) | texte<16px:0 | scroll-x:0 | data-src:7
OK   01-trame.html | prefers-reduced-motion | animations en cours:0 | éléments masqués:0
OK   02-probleme.html | 1440x900 | 0 erreur JS | 0 requête externe | marque+slogan(h1)+badge:111 scène:1 | chevauchements:0 | contraste min 5.79:1 (<AA:0) | texte<16px:0 | scroll-x:0 | data-src:2
OK   02-probleme.html | prefers-reduced-motion | animations en cours:0 | éléments masqués:0
OK   03-pipeline.html | 1440x900 | 0 erreur JS | 0 requête externe | marque+slogan(h1)+badge:111 scène:1 | chevauchements:0 | contraste min 5.79:1 (<AA:0) | texte<16px:0 | scroll-x:0 | data-src:1
OK   03-pipeline.html | prefers-reduced-motion | animations en cours:0 | éléments masqués:0
OK   04-produit.html | 1440x900 | 0 erreur JS | 0 requête externe | marque+slogan(h1)+badge:111 scène:1 | chevauchements:0 | contraste min 5.79:1 (<AA:0) | texte<16px:0 | scroll-x:0 | data-src:5
OK   04-produit.html | prefers-reduced-motion | animations en cours:0 | éléments masqués:0
OK   05-preuves.html | 1440x900 | 0 erreur JS | 0 requête externe | marque+slogan(h1)+badge:111 scène:1 | chevauchements:0 | contraste min 5.79:1 (<AA:0) | texte<16px:0 | scroll-x:0 | data-src:13
OK   05-preuves.html | prefers-reduced-motion | animations en cours:0 | éléments masqués:0
OK   03-pipeline.html | étapes .step rendues: 8 (attendu 8)
OK   P3 | 8 étapes nommées | 27/27 chemins réels présents dans le repo
OK   chiffre written=24 | docs/CAPTURES.md | extrait trouvé
OK   chiffre verifiable=18 | docs/CAPTURES.md | extrait trouvé
OK   chiffre unfalsifiable=4 | docs/CAPTURES.md | extrait trouvé
OK   chiffre covered=13/18 | docs/CAPTURES.md | extrait trouvé
OK   chiffre provisional=1 | docs/CAPTURES.md | extrait trouvé
OK   chiffre holes=4 | docs/captures/04-trame.png | fichier image présent (lu visuellement)
OK   chiffre perforations=3 | src/sample/demo-project.ts | extrait trouvé
OK   chiffre tests=455 | README.md | extrait trouvé
OK   chiffre lint=0 | docs/SUBMISSION.md | extrait trouvé
OK   chiffre mcp=14 | README.md | extrait trouvé
OK   chiffre screens=11 | README.md | extrait trouvé
OK   chiffre tables=15 | src/db/schema.ts | extrait trouvé
OK   chiffre perms=18 | docs/SUBMISSION.md | extrait trouvé
OK   chiffre recette=20/20 | docs/SUBMISSION.md | extrait trouvé
OK   chiffre entries=5 | README.md | extrait trouvé
OK   chiffre version=v2.1.0 | README.md | extrait trouvé
OK   chiffre jql=4 | README.md | extrait trouvé
OK   chiffre modules=18 | docs/SUBMISSION.md | extrait trouvé
OK   P2 cas | src/sample/demo-project.ts | « editedAgo: 34 »
OK   P2 cas | src/sample/demo-project.ts | « testShouldBeStable', executedAgo: 40 »
OK   P2 cas | src/sample/demo-project.ts | « DEMO_NOW = '2026-11-12 »
```

Relecture des captures (PNG ouverts et regardés) :
1. Itér. 1 : logo trop dense à 34 px → simplifié (3×2) ; fils du pager mal étirés
   (`preserveAspectRatio`) ; notes de pastilles P1 coupées → empilées ; P5 cassée
   (collision des classes `guar`/`lim` entre section et composant) → préfixe `s-`.
2. Itér. 2 : encart P4 sur denim aux libellés invisibles (jetons clairs hérités) → jetons
   réinitialisés dans l'encart ; chemins des cartes de montage coupés en plein mot →
   raccourcis (`frontend/*.tsx`).
3. Itér. 3 : P3 en page entière et zoom sur l'encart P4 : plus de défaut visible.
- Contrôle durci : contraste et taille du texte vérifiés sur toute la page, bandes denim comprises.

Prochaine action suggérée : retour de Gaia sur `planches/v3/index.html`, puis `/lock v3` ou `/delta`.
