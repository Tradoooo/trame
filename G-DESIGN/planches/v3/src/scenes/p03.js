// P3 — The real pipeline as a weaving drawdown: 8 passes × 6 layers.
import { PIPELINE, LAYERS, ABSENCES, LINK_PATHS, JQL } from "../data.js";
import { section, rv, esc } from "./common.js";

function row(s, i) {
  const cells = LAYERS.map(([k]) => `<span class="dd ${s.L.includes(k) ? "on" : ""}" title="${k}${s.L.includes(k) ? " — touched" : ""}"></span>`).join("");
  return `<li class="step rv" style="--i:${i}"><span class="num">${String(i + 1).padStart(2, "0")}</span>
  <div class="sn"><h3>${esc(s.n)}</h3><p>${esc(s.d)}</p></div>
  <div class="ddrow" aria-label="layers: ${s.L.join(", ")}">${cells}</div>
  <p class="lay">touches: ${s.L.join(" · ")}</p>
  <code class="files">${esc(s.f.replace(/,/g, ", "))}</code></li>`;
}

function drawdown() {
  const head = LAYERS.map(([k, p]) => `<span title="${p}">${k}</span>`).join("");
  return `<div class="draw" data-src="README.md">
  <div class="dhead" aria-hidden="true"><span></span><span>pass</span><div class="ddrow">${head}</div><span>real files</span></div>
  <ol class="steps">${PIPELINE.map(row).join("")}</ol></div>`;
}

const SOURCES = ["Jira", "Confluence", "Bitbucket", "Comments", "Pipelines (webtrigger)", "Teamwork Graph"];

export default {
  num: "03", file: "03-pipeline.html", slug: "03-pipeline",
  title: "Trame — eight passes, from criterion to certificate",
  desc: "The real pipeline of Trame, from six criterion lairs to the validated bulletin and certificate.",
  sources: ["README.md — architecture, structure, the 4 JQL functions","src/types.ts — LinkPath, AbsenceKind", "src/collect, src/ingest, src/domain, src/actions, src/ui — real file names"],
  main() {
    return `<section class="hero wrap">
  <p class="eyebrow">How it works, end to end — read it like a weaving draft</p>
  <h1 class="h1s">Eight passes,<br>criterion to <span class="acc">certificate.</span></h1>
  ${drawdown()}
</section>
${section("truth", rv("h2", "Sources of truth, at the point of ingestion.") + `<ul class="chips rv">${SOURCES.map((s) => `<li>${s}</li>`).join("")}</ul><span class="src">src/ingest/{jira,confluence,bitbucket,comments,pipeline,graph}.ts</span>`)}
${section("abs", rv("h2", "Four absences. Never confused.") + `<div class="cols">${ABSENCES.map(([k, d]) => `<div class="card rv"><code class="k">${k}</code><p>${d}</p></div>`).join("")}</div><span class="src">src/types.ts — AbsenceKind</span>`)}
${section("paths night", rv("h2", "Four ways a thread gets linked.") + `<ul class="chips rv">${LINK_PATHS.map((s) => `<li class="mono">${s}</li>`).join("")}</ul><span class="src">src/types.ts — LinkPath</span>
  <p class="lede">A <em>similarity</em> link is a proposal with a confidence, never coverage, until a human confirms it. Then ask Jira directly:</p>
  <pre class="term rv" aria-label="JQL functions"><code>${JQL.map((q) => `<span class="pr">jql&gt;</span> ${q}`).join("\n")}</code></pre><span class="src">README.md — 4 JQL functions</span>`)}`;
  },
};
