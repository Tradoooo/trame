# tools/video — la chaîne qui produit la vidéo Codegeist de Trame

La vidéo livrée est décrite dans `docs/VIDEO.md`. Ce dossier contient ce qui la
rend **rejouable** : chaque plan vient d'un artefact réel, rien n'est composé.

## Ce que fait la chaîne

| Étape | Script | Entrée | Sortie (`$TRAME_VIDEO_DIR`, défaut `.video/`) |
|---|---|---|---|
| 1. artefacts réels | `texts.sh` | `manifest.yml`, `vitest`, le site en ligne | `texts/rovo.txt`, `texts/tests.txt` |
| 2. plans du site | `shots.mjs` | https://tradoooo.github.io/trame/ (et l'app sœur) | `clips/*.webm` (1920×1080, 30 fps) |
| 3. visuels terminal | `build.py` (aides) | `texts/*.txt` | `shots/*.png` |
| 4. voix anglaise | `build.py:voix()` | `scenes.py` (le texte narré) | `audio/*.mp3` |
| 5. montage | `assemble.py` | `clips/`, `shots/`, `audio/` | `trame-codegeist.mp4`, `.srt`, `TRANSCRIPT.md` |
| 6. piste calée | `fix_audio.py` | `audio/*.mp3` | la même vidéo, audio aligné sur les segments |

`scenes.py` porte l'ordre des plans, les légendes des filets bas et le texte
narré. `build.py` ne fait que des aides (dessin terminal, carte, voix, durée) :
aucun des deux fichiers ne dépasse 200 lignes, conformément à la garde de taille.

## Rejouer

```sh
python3 -m venv .video-venv && .video-venv/bin/pip install pillow edge-tts
npm i -D playwright-core                      # le paquet n'est pas requis par le CI
.video-venv/bin/python tools/video/texts.sh   # 1. les artefacts (vitest ≈ 10 s)
node tools/video/shots.mjs                    # 2. les neuf plans du site (≈ 7 min)
.video-venv/bin/python tools/video/assemble.py  # 3-5. voix + montage
.video-venv/bin/python tools/video/fix_audio.py # 6. audio aligné sur les segments
```

Trois variables d'environnement pilotent la chaîne : `TRAME_VIDEO_DIR` (dossier
de sortie), `EDGE_TTS` et `FFMPEG` (les binaires), `TRAME_CHROME` (le navigateur).
Le Chrome système est piloté par `TRAME_CHROME` (défaut
`/opt/google/chrome/google-chrome`) : le Playwright embarqué n'est pas installé,
don passe par `playwright-core` + le binaire système, **headless, sans prendre le
focus**.

La densité de pixels est portée par `deviceScaleFactor: 1` du contexte Playwright :
aucun flag `--force-…` sur la ligne de commande. La garde `couche0` refuse tout
argument en `--force` (motif « push forcé sans --force-with-lease ») et le contexte
suffit — vérifié sans le flag, sortie 1920×1080, cadrage `ok:true`.

## Ce qui est interdit dans ces plans

`docs/VIDEO-SCRIPT.md` §0.2 liste les trois choses qui n'existent pas ; la chaîne
ne les montre donc jamais, et le filet bas le dit à l'écran :

1. **aucun écran dessiné par UI Kit 2 dans Jira** — les plans d'écran viennent du
   site public, qui exécute le vrai moteur ; l'app installée n'est filmée que
   comme page, champs, gadget et fonctions JQL ;
2. **aucun texte écrit par un modèle** — `proposeReformulation` et `draftTest`
   renvoient `NOT_IMPLEMENTED` ; le plan `c7_rovo` le montre dans le code ;
3. **aucune publication Confluence** — `publishCertificate` renvoie `null` (repli
   §21) : le certificat est filmé dans le panneau du site, avec la mention
   « export manuel aujourd'hui ».
