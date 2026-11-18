// P2 — The problem, embodied: one criterion, edited after its test.
import { CASE as K } from "../data.js";
import { glyph } from "../weave.js";
import { section, rv, esc } from "./common.js";

function frame(st, when, date, head, body) {
  return `<li class="frame rv"><div class="mesh">${glyph(st, "f" + st + when.length)}</div>
  <p class="when"><b>${when}</b> · ${date}</p><h3>${head}</h3><p>${body}</p></li>`;
}

function strip() {
  return `<ol class="strip" data-src="${K.src}">
  ${frame("C", "D−" + K.verifiedAgo, K.verified, "Woven", `<code>${K.test}</code> passes. Linked by naming convention. Strength: machine.`)}
  ${frame("E", "D−" + K.editedAgo, K.edited, "Rewritten", `The criterion text changes: version 1 → 2, new fingerprint. No test runs again.`)}
  ${frame("P", "D0", K.frozen, "Perforated", `Still “covered” in a checklist. In Trame: the warp is cut — verified ${K.verifiedAgo - K.editedAgo} days before the edit, stale for ${K.editedAgo} days.`)}
</ol>`;
}

function beforeAfter() {
  return `<div class="ba">
  <div class="card rv"><p class="eyebrow">A checklist says</p><p class="big">✓ AC-2 covered</p><p>One word. No date, no strength, no version.</p></div>
  <div class="card rv after"><p class="eyebrow">Trame says</p><p class="big">⌇ AC-2 perforated</p>
  <p>Covered by a <b>machine</b> test, link <b>declared</b>, on a criterion <b>edited ${K.editedAgo} days ago</b> — last verified ${K.verified}, rewritten ${K.edited}.</p></div>
</div>`;
}

function register() {
  const rows = [[K.ticket, K.ac, K.textEn, "D−" + K.verifiedAgo, "D−" + K.editedAgo], ...K.others]
    .map((r) => `<tr>${r.map((c, i) => `<td${i < 2 ? ' class="mono"' : ""}>${esc(c)}</td>`).join("")}</tr>`).join("");
  return `<table class="reg rv" data-src="${K.src}"><caption>Perforation register — demo project, frozen ${K.frozen}</caption>
  <thead><tr><th>Ticket</th><th>Criterion</th><th>Text (EN gloss)</th><th>Verified</th><th>Edited</th></tr></thead><tbody>${rows}</tbody></table>`;
}

export default {
  num: "02", file: "02-probleme.html", slug: "02-probleme",
  title: "Trame — covered, until the criterion changed",
  desc: "A criterion edited after its last verification still looks covered. Trame shows the cut.",
  sources: [`${K.src} — TRAME-104 / AC-2, executedAgo 40, editedAgo 34, DEMO_NOW 2026-11-12`, "README.md — perforation, the problem statement"],
  main() {
    return `<section class="hero wrap">
  <p class="eyebrow">The problem, embodied — <span class="mono">${K.ticket} · ${K.ac}</span></p>
  <h1>Covered.<br>Until it <span class="acc">changed.</span></h1>
  <p class="lede"><span class="mono">“${K.textFr}”</span> — <em>${K.textEn}</em>. The test passed. Then the criterion was rewritten, and nobody re-ran anything.</p>
  ${strip()}
</section>
${section("pain", rv("h2", "A green check that outlived its criterion.") + beforeAfter())}
${section("regs night", rv("h2", "Three perforations in the demo.") + register() + `<p class="lede">Dates are relative to the demo’s frozen instant (D0 = ${K.frozen}). Persona: <span class="unknown">unknown</span> — the repo names no user; the story is the seeded ticket, not an invented person.</p>`)}`;
  },
};
