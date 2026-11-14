#!/usr/bin/env python3
"""Construit la vidéo Codegeist de Trame (4:45 cible, voix anglaise).

Tout est local et gratuit : plans du site LIVE (Playwright + Chrome système,
enregistrements faits par shots.mjs), rendus terminal (PIL), voix anglaise
(edge-tts), montage (ffmpeg statique). Rien n'est simulé : chaque plan montre
un artefact réel, et le filet bas dit ce qui ne se voit pas.

Usage : python3 build.py            # toute la chaîne
       python3 build.py --voix     # régénère seulement l'audio
"""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

REPO = Path(__file__).resolve().parents[2]
# Le dossier de sortie est hors de l'index git (.video/) : artefacts lourds.
RACINE = Path(os.environ.get("TRAME_VIDEO_DIR") or (REPO / ".video"))
CLIPS = RACINE / "clips"
TEXTS = RACINE / "texts"
SHOTS = RACINE / "shots"
AUDIO = RACINE / "audio"
SEGMENTS = RACINE / "segments"
FRAMES = RACINE / "frames"
FFMPEG = os.environ.get("FFMPEG", str(Path.home() / ".local/bin/ffmpeg"))
EDGE_TTS = os.environ.get("EDGE_TTS", "edge-tts")
VOIX = "en-US-AndrewNeural"
DEBIT = "-8%"

W, H = 1920, 1080
FPS = 30
MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"
MONO_B = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf"
SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
SANS_B = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
POLICE, INTERLIGNE = 21, 30

BLEU = (12, 102, 228)
CLAIR = (214, 220, 232)
SURLIGNAGES = [
    ("NOT_IMPLEMENTED", (255, 209, 122)),
    ("455 passed", (126, 231, 135)),
    ("54 passed", (126, 231, 135)),
    ("5 passed", (126, 231, 135)),
    ("OK :", (126, 231, 135)),
    ("200", (126, 231, 135)),
    ("holes", (255, 122, 122)),
    ("perforation", (255, 209, 122)),
    ("loose thread", (255, 209, 122)),
]


def police(taille: int, gras: bool = False, sans: bool = False) -> ImageFont.FreeTypeFont:
    if sans:
        return ImageFont.truetype(SANS_B if gras else SANS, taille)
    return ImageFont.truetype(MONO_B if gras else MONO, taille)


def cours(chemin: str | Path) -> float:
    """Durée (s) d'un média, lue dans la sortie d'ffmpeg."""
    sortie = subprocess.run([FFMPEG, "-i", str(chemin)], capture_output=True, text=True).stderr
    trouve = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", sortie)
    if not trouve:
        return 0.0
    h, m, s = trouve.groups()
    return int(h) * 3600 + int(m) * 60 + float(s)


def voix(id_scene: str, texte: str) -> Path:
    """Synthétise la voix d'une scène (3 essais : edge-tts est parfois pris de court)."""
    sortie = AUDIO / (id_scene + ".mp3")
    if sortie.exists() and sortie.stat().st_size > 2000:
        return sortie
    commande = [EDGE_TTS, "--voice", VOIX, "--rate=%s" % DEBIT, "--text", texte,
                "--write-media", str(sortie)]
    dernier = ""
    for essai in range(3):
        procedure = subprocess.run(commande, capture_output=True, text=True)
        if procedure.returncode == 0 and sortie.exists():
            return sortie
        dernier = procedure.stderr.strip()[-300:]
        time.sleep(3 + 3 * essai)
    raise RuntimeError("edge-tts KO sur %s : %s" % (id_scene, dernier))


LARGEUR_MAX = 108  # caractères : la police mono 21 px à 1920 px de large


def découpe(lignes: list[str]) -> list[str]:
    """Replie les lignes trop longues (une liste d'outils, un chemin) en continuations."""
    rendu: list[str] = []
    for ligne in lignes:
        while len(ligne) > LARGEUR_MAX:
            coupe = ligne.rfind(",", 0, LARGEUR_MAX)
            coupe = coupe + 1 if coupe > 40 else LARGEUR_MAX
            rendu.append(ligne[:coupe].rstrip())
            ligne = "      " + ligne[coupe:].lstrip()
        rendu.append(ligne)
    return rendu


def dessiner_terminal(texte: str, sortie: Path, titre: str, bas: str, legende: str) -> None:
    lignes = découpe([l.rstrip() for l in texte.splitlines()])[:30]
    image = Image.new("RGB", (W, H), (14, 16, 22))
    d = ImageDraw.Draw(image)
    d.rectangle([0, 0, W, 58], fill=(30, 34, 44))
    for i, c in enumerate([(255, 95, 86), (255, 189, 46), (39, 201, 63)]):
        d.ellipse([28 + i * 34, 21, 48 + i * 34, 41], fill=c)
    d.text((150, 18), titre, font=police(19), fill=(198, 204, 216))
    if bas:
        d.text((W - 24 - d.textlength(bas, font=police(19)), 18), bas, font=police(19),
               fill=(120, 128, 142))
    y = 58 + max(28, (H - 150 - len(lignes) * INTERLIGNE) // 2)
    for ligne in lignes:
        x = 56
        if ligne.startswith("$"):
            d.text((x, y), "$", font=police(POLICE, gras=True), fill=(126, 231, 135))
            x += 24
            ligne = ligne[1:]
        reste = ligne
        while reste:
            trouve = None
            for mot, c in SURLIGNAGES:
                p = reste.find(mot)
                if p >= 0 and (trouve is None or p < trouve[0]):
                    trouve = (p, mot, c)
            if trouve is None:
                d.text((x, y), reste, font=police(POLICE), fill=CLAIR)
                break
            p, mot, c = trouve
            if p:
                d.text((x, y), reste[:p], font=police(POLICE), fill=CLAIR)
                x += d.textlength(reste[:p], font=police(POLICE))
            gras = mot in ("NOT_IMPLEMENTED", "455 passed", "OK :")
            d.text((x, y), mot, font=police(POLICE, gras=gras), fill=c)
            x += d.textlength(mot, font=police(POLICE))
            reste = reste[p + len(mot):]
        y += INTERLIGNE
    d.rectangle([0, H - 92, W, H], fill=(20, 23, 31))
    d.text((56, H - 82), legende, font=police(19, sans=True), fill=(150, 160, 178))
    d.text((56, H - 46), "Trame — github.com/Tradoooo/trame · " + bas,
           font=police(17, sans=True), fill=(110, 120, 138))
    image.save(sortie)


def cartouche(sortie: Path, titre: str, sous_titre: str, ligne: str) -> None:
    """Carte de titre (fond bleu Trame), utilisée pour l'ouverture et la fin."""
    image = Image.new("RGB", (W, H), (10, 14, 24))
    d = ImageDraw.Draw(image)
    for i in range(0, W, 8):
        d.line([i, 0, i, H], fill=(12 + i // 60, 20 + i // 90, 34 + i // 60))
    d.rectangle([0, H // 2 - 4, W, H // 2 + 4], fill=BLEU)
    d.text((W // 2 - d.textlength(titre, font=police(84, gras=True, sans=True)) // 2,
            H // 2 - 150), titre, font=police(84, gras=True, sans=True), fill=(238, 243, 252))
    d.text((W // 2 - d.textlength(sous_titre, font=police(34, sans=True)) // 2,
            H // 2 + 60), sous_titre, font=police(34, sans=True), fill=(160, 190, 245))
    d.text((W // 2 - d.textlength(ligne, font=police(24, sans=True)) // 2,
            H - 120), ligne, font=police(24, sans=True), fill=(120, 132, 155))
    image.save(sortie)
