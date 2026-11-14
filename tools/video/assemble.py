#!/usr/bin/env python3
"""Montage de la vidéo Trame : segments uniformes, concat, voix, sous-titres.

Dépend de build.py (aides : terminal, carte, voix, durée) et de scenes.py.
Les plans « clip » viennent de shots.mjs (site live, Chrome headless).
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

from build import (AUDIO, CLIPS, FRAMES, RACINE, SEGMENTS, SHOTS, TEXTS, W, H, FPS,
                   cartouche, cours, dessiner_terminal, voix)
from build import FFMPEG as FFMPEG_BIN
from scenes import SCENES

PAD = 0.6  # respiration après chaque voix


def srt_horodatage(secondes: float) -> str:
    ms = int(round(secondes * 1000))
    h, reste = divmod(ms, 3_600_000)
    m, reste = divmod(reste, 60_000)
    s, ms = divmod(reste, 1000)
    return "%02d:%02d:%02d,%03d" % (h, m, s, ms)


def image_scene(scene: dict) -> Path:
    """Rend le visuel d'une scène non-clip (carte ou terminal)."""
    sortie = SHOTS / ("%s.png" % scene["id"])
    if scene["type"] == "carte":
        cartouche(sortie, scene["titre"], scene["sous_titre"], scene["ligne"])
    else:
        texte = (TEXTS / scene["texte"]).read_text(encoding="utf-8")
        dessiner_terminal(texte, sortie, scene["titre"], scene["bas"], scene["legende"])
    return sortie


def segment_clip(scene: dict, duree: float) -> Path:
    """Webm du site → segment h264 uniforme, tronqué ou gelé à `duree`."""
    brut = CLIPS / ("%s.webm" % _id_clip(scene))
    if not brut.exists():
        raise SystemExit("clip manquant : %s" % brut)
    sortie = SEGMENTS / ("%s.mp4" % scene["id"])
    reel = cours(brut)
    filtre = ("scale=%d:%d:force_original_aspect_ratio=decrease,"
              "pad=%d:%d:(ow-iw)/2:(oh-ih)/2,fps=%d" % (W, H, W, H, FPS))
    if reel < duree:
        filtre += ",tpad=stop_mode=clone:stop_duration=%.2f" % (duree - reel + 0.5)
    subprocess.run(
        [FFMPEG_BIN, "-y", "-i", str(brut), "-t", "%.3f" % duree, "-vf", filtre,
         "-c:v", "libx264", "-crf", "20", "-preset", "medium", "-pix_fmt", "yuv420p",
         "-an", "-r", str(FPS), str(sortie)],
        check=True, capture_output=True,
    )
    return sortie


def _id_clip(scene: dict) -> str:
    """Le nom du plan enregistré par shots.mjs pour cette scène."""
    table = {
        "c1_counters": "c1_counters", "c2_weave_axes": "c2_weave_axes",
        "c3_sheet": "c3_sheet", "c4_perforations": "c4_perforations",
        "c5_dangling": "c5_dangling", "c6_holes": "c6_holes",
        "c8_certificate": "c7_certificate", "c9_sibling": "c8_sibling",
        "c10_architecture": "c9_architecture",
    }
    return table[scene["id"]]


def segment_image(scene: dict, duree: float, image: Path) -> Path:
    sortie = SEGMENTS / ("%s.mp4" % scene["id"])
    subprocess.run(
        [FFMPEG_BIN, "-y", "-loop", "1", "-t", "%.3f" % duree, "-i", str(image),
         "-vf", "scale=%d:%d,fps=%d,format=yuv420p" % (W, H, FPS),
         "-c:v", "libx264", "-crf", "20", "-preset", "medium", "-pix_fmt", "yuv420p",
         "-an", "-r", str(FPS), str(sortie)],
        check=True, capture_output=True,
    )
    return sortie


def sous_titres(scenes: list[dict]) -> Path:
    """SRT anglais : la voix découpée en lignes courtes, calées au prorata des mots."""
    sortie = RACINE / "trame-codegeist.srt"
    index, horaire = 1, 0.0
    lignes: list[str] = []
    for scene in scenes:
        mots = scene["voix"].split()
        par_mot = scene["duree"] / max(len(mots), 1)
        for depart in range(0, len(mots), 11):
            bloc = " ".join(mots[depart:depart + 11])
            longueur = len(mots[depart:depart + 11]) * par_mot
            lignes.append("%d\n%s --> %s\n%s\n" % (
                index, srt_horodatage(horaire), srt_horodatage(horaire + longueur - 0.05), bloc))
            index += 1
            horaire += longueur
        horaire = scene["fin"]
    sortie.write_text("\n".join(lignes), encoding="utf-8")
    return sortie


def transcript(scenes: list[dict]) -> Path:
    sortie = RACINE / "TRANSCRIPT.md"
    lignes = ["# TRANSCRIPT — Trame, vidéo Codegeist 2026", "",
              "> Voix anglaise (`%s`), durée %.2f min. Chaque plan montre un artefact réel ;" % (
                  "en-US-AndrewNeural", sum(s["duree"] for s in scenes) / 60),
              "> les mentions d'honnêteté sont dans le filet bas de chaque plan.", ""]
    for scene in scenes:
        lignes.append("## %s — %.0f s → %.0f s (%s)" % (
            scene["id"], scene["debut"], scene["fin"], scene["type"]))
        if "legende" in scene:
            lignes.append("- filet bas : %s" % scene["legende"])
        lignes.append("- voix : %s" % scene["voix"])
        lignes.append("")
    sortie.write_text("\n".join(lignes), encoding="utf-8")
    return sortie


def assembler(segments: list[Path], pistes: list[Path]) -> tuple[Path, Path]:
    liste_v = SEGMENTS / "liste-v.txt"
    liste_a = SEGMENTS / "liste-a.txt"
    liste_v.write_text("".join("file '%s'\n" % s for s in segments), encoding="utf-8")
    liste_a.write_text("".join("file '%s'\n" % s for s in pistes), encoding="utf-8")
    video = RACINE / "video-sans-voix.mp4"
    subprocess.run([FFMPEG_BIN, "-y", "-f", "concat", "-safe", "0", "-i", str(liste_v),
                    "-c", "copy", str(video)], check=True, capture_output=True)
    voix_piste = RACINE / "voix.m4a"
    subprocess.run([FFMPEG_BIN, "-y", "-f", "concat", "-safe", "0", "-i", str(liste_a),
                    "-c:a", "aac", "-b:a", "160k", str(voix_piste)],
                   check=True, capture_output=True)
    return video, voix_piste


def final(video: Path, piste: Path, srt: Path) -> Path:
    sortie = RACINE / "trame-codegeist.mp4"
    subprocess.run(
        [FFMPEG_BIN, "-y", "-i", str(video), "-i", str(piste),
         "-i", str(srt),
         "-map", "0:v", "-map", "1:a", "-map", "2:s",
         "-c:v", "copy", "-c:a", "copy", "-c:s", "mov_text",
         "-metadata:s:s:0", "language=eng",
         "-movflags", "+faststart", str(sortie)],
        check=True, capture_output=True,
    )
    return sortie


def main() -> int:
    for dossier in (SHOTS, AUDIO, SEGMENTS, FRAMES):
        dossier.mkdir(parents=True, exist_ok=True)
    scenes: list[dict] = []
    for scene in SCENES:
        audio = voix(scene["id"], scene["voix"])
        duree = round(cours(audio) + PAD, 2)
        if scene["type"] == "clip":
            seg = segment_clip(scene, duree)
        else:
            seg = segment_image(scene, duree, image_scene(scene))
        scenes.append({**scene, "duree": duree, "segment": str(seg)})
        print("%-18s %-9s %5.1f s" % (scene["id"], scene["type"], duree))

    horaire = 0.0
    for scene in scenes:
        scene["debut"] = horaire
        horaire += scene["duree"]
        scene["fin"] = horaire
    total = horaire
    print("durée totale : %.1f s (%.2f min)" % (total, total / 60))

    segments = [Path(s["segment"]) for s in scenes]
    pistes = [AUDIO / (s["id"] + ".mp3") for s in scenes]
    video, piste = assembler(segments, pistes)
    srt = sous_titres(scenes)
    transcript(scenes)
    sortie = final(video, piste, srt)
    print("vidéo :", sortie, "%.1f Mo" % (sortie.stat().st_size / 1e6),
          "durée réelle %.1f s" % cours(sortie))
    return 0


if __name__ == "__main__":
    sys.exit(main())
