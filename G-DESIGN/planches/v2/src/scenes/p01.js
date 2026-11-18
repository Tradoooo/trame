// P1 — Understand in 5 seconds: the cloth carries the concept.
import { META, CLOTH, STATES } from "../data.js";
import { cloth, glyph } from "../weave.js";
import { fact, section, rv } from "./common.js";

const LEGEND = ["C", "H", "P", "U", "V", "D"];

function legend() {
  const cards = LEGEND.map((k) => `<li class="card lg">${glyph(k)}<div><h3>${STATES[k].name}</h3><p>${STATES[k].say}</p></div></li>`);
  cards.push(`<li class="card lg"><svg class="glyph" viewBox="0 0 64 64" aria-hidden="true"><path d="M4 32 q 30 0 38 26" fill="none" stroke="#0052CC" stroke-width="12" stroke-linecap="round"/></svg><div><h3>loose thread</h3><p>a verification act that crosses nothing any more — coverage goes down</p></div></li>`);
  return `<ul class="legend">${cards.join("")}</ul>`;
}

const AXES = [
  ["Strength", [["12", "machine — automated run, green"], ["2", "attested — third party + artefact"], ["0", "declared — an assertion"]]],
  ["Link kind", [["13", "declared"], ["0", "confirmed (re-woven)"], ["1", "derived, to confirm"]]],
  ["Freshness", [["12", "up to date"], ["2", "out of date"]]],
];

function axes() {
  return AXES.map(([t, rows]) => `<div class="card axis rv" data-src="docs/captures/04-trame.png"><h3>${t}</h3><ul>${rows.map(([n, l]) => `<li><b>${n}</b> ${l}</li>`).join("")}</ul></div>`).join("");
}

export default {
  num: "01", file: "01-trame.html", slug: "01-trame",
  title: "Trame — the thread that is missing",
  desc: "Trame weaves every acceptance criterion with the act that verifies it, then shows the holes.",
  sources: ["docs/CAPTURES.md — engine counters 24 / 18 / 4 / 13-18 / 1", "docs/captures/04-trame.png — holes, perforations, three axes", "src/sample/demo-project.ts — DEMO_TICKETS, cell states"],
  main() {
    return `<section class="hero wrap">
  <div class="hero-txt">
    <p class="eyebrow">Forge app for Jira · acceptance-criteria coverage</p>
    <h1>The thread<br>that is <span class="acc">missing.</span></h1>
    <p class="lede">${META.tagline} Then it shows what is <em>not</em> woven.</p>
    <div class="keys">${fact("covered")}${fact("holes")}${fact("perforations")}${fact("unfalsifiable")}</div>
    <span class="scroll">Scroll to read the cloth</span>
  </div>
  <figure class="loom">${cloth(CLOTH)}
    <figcaption>Demo project <code>TRAME</code> — 6 tickets × 4 criteria. Warp = criterion, weft = verification act.<span class="src">${CLOTH.src}</span></figcaption>
  </figure>
</section>
${section("read", rv("h2", "Read the cloth, not a gauge.") + rv("p", "Every state has its own shape. Colour is only ever the weft — the act of verifying.", "lede") + legend())}
${section("axes", rv("h2", "“Covered” is never one word.") + rv("p", "Three axes, computed by the engine on the demo project, never merged into one score.", "lede") + `<div class="cols">${axes()}</div><span class="src">docs/captures/04-trame.png — engine output, public site</span>`)}`;
  },
};
