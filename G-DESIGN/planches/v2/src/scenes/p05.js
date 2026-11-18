// P5 — Proof, guarantees, limits: every figure points at its file.
import { GUARANTEES, LIMITS, UNKNOWN } from "../data.js";
import { fact, section, rv } from "./common.js";

const PROOF = ["tests", "lint", "mcp", "tables", "perms", "recette", "modules", "jql"];

export default {
  num: "05", file: "05-preuves.html", slug: "05-preuves",
  title: "Trame — measured, traceable, honest",
  desc: "Measured figures, guarantees and the limits Trame states itself, each traced to the repo.",
  sources: ["README.md — tests, MCP, screens, limits, guarantees", "docs/SUBMISSION.md — lint, permissions, 18 module types, recette", "src/db/schema.ts — 15 tables", "src/ingest/llm.ts, src/ingest/confluence.ts — the two named limits"],
  main() {
    return `<section class="hero wrap">
  <p class="eyebrow">Proof, guarantees, synthesis — measured 13 Nov 2026 on <code>main</code></p>
  <h1 class="h1s">Measured.<br>Traceable. <span class="acc">Honest.</span></h1>
  <div class="proof">${PROOF.map((k) => fact(k, "rv")).join("")}</div>
</section>
${section("guar", rv("h2", "What Trame will never do.") + `<ul class="guar">${GUARANTEES.map((g) => `<li class="rv"><span class="no" aria-hidden="true">✕</span>${g}</li>`).join("")}</ul><span class="src">README.md — “Ce que l’app ne fait pas”</span>`)}
${section("lim", rv("h2", "Limits, stated by the repo itself.") + `<div class="cols">${LIMITS.map(([t, d, s]) => `<div class="card lim rv" data-src="${s}"><h3>${t}</h3><p>${d}</p><span class="src">${s}</span></div>`).join("")}</div>`)}
${section("next", `<div class="split"><div>${rv("h2", "Where it stands.")}<p class="lede">Codegeist 2026 · Apps for Software Teams, main bonus <b>Teamwork Graph</b>, also Rovo agents, Atlassian MCP, Marketplace. Deadline 22 Dec 2026, 12:00 PST — 21:00 Paris.</p><span class="src">docs/SUBMISSION.md — Échéance, bonus</span></div>
  <div class="card rv"><h3>Not in the sources — shown as unknown</h3><ul class="unk">${UNKNOWN.map((u) => `<li>${u}: <span class="unknown">unknown</span></li>`).join("")}</ul></div></div>`)}`;
  },
};
