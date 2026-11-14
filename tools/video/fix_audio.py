#!/usr/bin/env python3
"""Corrige la piste audio : chaque voix est suivie de sa respiration (PAD),
sinon la piste concaténée dérive d'environ 7 s sur 12 scènes.

Écrit audio/piste.m4a, puis remonte le multiplexage final (vidéo déjà prête).
"""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

from build import AUDIO, FFMPEG, RACINE, cours, SEGMENTS
from scenes import SCENES

PAD = 0.6


def padded(scene_id: str, duree_scene: float) -> Path:
    """La voix de la scène, étirée/tronquée à la durée exacte du segment."""
    brut = AUDIO / (scene_id + ".mp3")
    sortie = AUDIO / (scene_id + ".padded.wav")
    subprocess.run(
        [FFMPEG, "-y", "-i", str(brut),
         "-af", "apad=pad_dur=%.2f,atrim=end=%.3f" % (PAD + 1.0, duree_scene),
         "-ar", "48000", "-ac", "2", str(sortie)],
        check=True, capture_output=True,
    )
    return sortie


def main() -> int:
    pistes, total = [], 0.0
    for scene in SCENES:
        voix_mp3 = AUDIO / (scene["id"] + ".mp3")
        duree = round(cours(voix_mp3) + PAD, 2)
        pistes.append(padded(scene["id"], duree))
        total += duree
    liste = SEGMENTS / "liste-a-pad.txt"
    liste.write_text("".join("file '%s'\n" % p for p in pistes), encoding="utf-8")
    m4a = RACINE / "voix-calee.m4a"
    subprocess.run(
        [FFMPEG, "-y", "-f", "concat", "-safe", "0", "-i", str(liste),
         "-af", "loudnorm=I=-16:TP=-1.5:LRA=11",
         "-c:a", "aac", "-b:a", "192k", "-ar", "48000", str(m4a)],
        check=True, capture_output=True,
    )
    print("piste calée : %s  %.1f s (attendu %.1f s)" % (m4a.name, cours(m4a), total))

    video = RACINE / "video-sans-voix.mp4"
    srt = RACINE / "trame-codegeist.srt"
    sortie = RACINE / "trame-codegeist.mp4"
    subprocess.run(
        [FFMPEG, "-y", "-i", str(video), "-i", str(m4a), "-i", str(srt),
         "-map", "0:v", "-map", "1:a", "-map", "2:s",
         "-c:v", "copy", "-c:a", "copy", "-c:s", "mov_text",
         "-metadata:s:s:0", "language=eng", "-movflags", "+faststart", str(sortie)],
        check=True, capture_output=True,
    )
    print("vidéo finale : %s  %.1f s  %.1f Mo" % (sortie.name, cours(sortie),
                                                   sortie.stat().st_size / 1e6))
    return 0


if __name__ == "__main__":
    sys.exit(main())
