#!/usr/bin/env python3
"""Les scènes de la vidéo Trame : ordre, plans, voix anglaise.

Le texte narré suit `trame/docs/VIDEO-SCRIPT.md` (§1), plan par plan ; les
chiffres sont ceux mesurés sur `main` le 14/11/2026 (54 fichiers, 455 tests ;
compteurs de la démo : 24 / 18 / 4 / 13-18 / 1 / 11 / 3 / 2).
"""

from __future__ import annotations

SCENES: list[dict] = [
    {
        "id": "c0_carte",
        "type": "carte",
        "titre": "Trame",
        "sous_titre": "the coverage of your acceptance criteria — le fil qui manque",
        "ligne": "Forge app for Jira · Codegeist 2026 · github.com/Tradoooo/trame",
        "voix": (
            "Trame. The coverage of your acceptance criteria. Not of your tests: "
            "of the contract written on the ticket."
        ),
    },
    {
        "id": "c1_counters",
        "type": "clip",
        "legende": "live public site · the demo runs the real engine in this page",
        "voix": (
            "On the third of November, a team closed a release. Six tickets, a green "
            "pipeline, and the message was: all acceptance criteria are covered. Trame "
            "reads the same release. Twenty-four criteria written, eighteen that can "
            "actually be verified, four that cannot be falsified at all — and four holes. "
            "Nobody could have said so, because the information did not exist."
        ),
    },
    {
        "id": "c2_weave_axes",
        "type": "clip",
        "legende": "the drawing is the seeded sample; the numbers come from the engine",
        "voix": (
            "Each acceptance criterion is a warp thread. Each act that verifies it is a "
            "weft pass. Trame weaves the two, and a hole is where the background shows "
            "through. Strength, link kind and freshness stay three separate lines, never "
            "one score: thirteen criteria covered by a declaration, one provisional, "
            "eleven proven, out of eighteen verifiable. A single percentage would hide "
            "all three."
        ),
    },
    {
        "id": "c3_sheet",
        "type": "clip",
        "legende": "TRAME-102 / AC-2 · one act only, a manual case: covered, not proven",
        "voix": (
            "Covered, but not proven. A criterion is covered when a verification act "
            "exists. It is proven only when the act is strong — a machine execution —, "
            "when the link is declared, and when the criterion has not changed since. "
            "Here the only act is a manual case: attested, not machine. So the counters "
            "keep the two apart — thirteen covered, eleven proven. The gap is the product."
        ),
    },
    {
        "id": "c4_perforations",
        "type": "clip",
        "legende": "3 perforations · both dates, the gap in days, the class",
        "voix": (
            "Here is the judgement nobody makes. This criterion was edited after its "
            "test ran. The link is still there, so the weave still looks full — but it "
            "does not hold any more: the test verified an older version of the criterion. "
            "Trame calls it a perforation, and it carries both dates, the gap in days, "
            "and a class: fresh, dry, or multiple. Three of them here. None of them moves "
            "a percentage."
        ),
    },
    {
        "id": "c5_dangling",
        "type": "clip",
        "legende": "2 loose threads, 2 deleted criteria · the coverage goes down, on purpose",
        "voix": (
            "And the opposite: verification acts that no longer cover anything. A test "
            "was disabled. A criterion was deleted. The old report still counts them, so "
            "the coverage still looks fine — and the comfort is empty. Trame removes them "
            "from the figure. Two loose threads, two deleted criteria: the number goes "
            "down, on purpose."
        ),
    },
    {
        "id": "c6_holes",
        "type": "clip",
        "legende": "métré: score = Σ(weight × value) ÷ Σ(weight), term by term",
        "voix": (
            "Trame does not count holes. It ranks them. A hole in a zone that has already "
            "broken is not the same hole as a hole in a zone that never has. The score is "
            "shown term by term: kind, zone risk, recurrence. The first one here, zero "
            "point six eight four, is a non-regression criterion in a zone that already "
            "shipped three defects."
        ),
    },
    {
        "id": "c7_rovo",
        "type": "terminal",
        "texte": "rovo.txt",
        "titre": "Trame — the agent “Le fil” and its fourteen tools (manifest.yml)",
        "bas": "14 agent actions = 14 MCP tools, checked by a contract test",
        "legende": "the tools are real; what a model would write is not: NOT_IMPLEMENTED",
        "voix": (
            "The same measure, asked in words. The agent is configured with fourteen "
            "tools, all real, and the contract test refuses a fifteenth. It answers with "
            "counts, the criterion and its source, and it refuses to conclude when the "
            "sample is too small. Two writing actions stay unimplemented on purpose: "
            "nothing is generated behind your back."
        ),
    },
    {
        "id": "c8_certificate",
        "type": "clip",
        "legende": "the certificate also states what is NOT covered · manual Confluence export (§21 fallback)",
        "voix": (
            "And the certificate: dated, scoped, auditable. It lists every act of "
            "verification — its form, its strength, its date, the link path that holds it "
            "— the open perforations and the loose threads. And it states, explicitly, "
            "what is not covered: the four holes, and the four criteria that cannot be "
            "falsified. A certificate that hides its gaps is not a certificate."
        ),
    },
    {
        "id": "c9_sibling",
        "type": "clip",
        "legende": "sibling app: proof-on-demand — the Done gate",
        "voix": (
            "Trame is a measurement layer, not a gate. It never blocks a closure. But a "
            "sibling app can now ask it: for this criterion, which proof exists, and at "
            "which strength? Trame answers — machine, attested, or declared. Two apps, "
            "one contract, no double bookkeeping."
        ),
    },
    {
        "id": "c10_architecture",
        "type": "clip",
        "legende": "four link paths · no per-person statistic, anywhere",
        "voix": (
            "How it is built. The Atlassian graph gives the executions — but no direct "
            "link between a criterion and a test. Trame rebuilds that link in four paths: "
            "an explicit mention, a naming convention, a similarity proposal — never "
            "counted as coverage — and a human declaration. Every criterion is "
            "fingerprinted, so a change recomputes only what changed. The measures live "
            "in Forge SQL, fifteen tables, no per-person statistic anywhere."
        ),
    },
    {
        "id": "c11_tests",
        "type": "terminal",
        "texte": "tests.txt",
        "titre": "Trame — the test suite, on main (14 Nov 2026)",
        "bas": "54 files, 455 green tests · guards: 500 lines/file, 50 lines/function",
        "legende": "everything this video shows is in the public repo, and replays",
        "voix": (
            "Everything you saw is in one public repository: fifty-four test files, four "
            "hundred fifty-five tests, the live site, the recipe, and the limits written "
            "next to the claims. Trame — the thread that is missing."
        ),
    },
]


def totaux() -> dict:
    """Résumé des plans par type (contrôle de cohérence, pas un test)."""
    types: dict[str, int] = {}
    for scene in SCENES:
        types[scene["type"]] = types.get(scene["type"], 0) + 1
    return {"scenes": len(SCENES), "types": types}
