// P4 — The product: the one real Forge render (capture 06), annotated. Not the marketing drawings.
import { MOUNTS, SCREENS, CLOTH } from "../data.js";
import { cloth } from "../weave.js";
import { fact, section, rv } from "./common.js";

// pin positions as % of the cropped capture (1500×500)
const PINS = [
  [22.4, 92, "Jira → Apps → Trame — the production install, not Dev"],
  [94, 41.6, "Scope — tell Trame what to measure"],
  [32, 66, "Scope type — Ticket · Sprint · Project · Version"],
  [66, 81.6, "Load stays disabled while the scope is empty"],
];

function shot() {
  const pins = PINS.map(([x, y], i) => `<span class="pin" style="left:${x}%;top:${y}%" aria-hidden="true">${i + 1}</span>`).join("");
  const notes = PINS.map(([, , t]) => `<li>${t}</li>`).join("");
  return `<figure class="shot" data-src="docs/captures/06-app-jira-production.png">
  <div class="frame"><img src="{{IMG_FORGE}}" width="1500" height="500" alt="The Trame global page inside Jira, production: title Trame, a Scope field, Scope type radios Ticket, Sprint, Project (selected), Version, and a disabled Load button.">${pins}</div>
  <figcaption><ol class="notes">${notes}</ol><span class="src">docs/captures/06-app-jira-production.png — real capture, one-atlas-cndz.atlassian.net</span></figcaption></figure>`;
}

function mounts() {
  return `<ul class="mounts">${MOUNTS.map(([w, d, f]) => `<li class="card rv"><h3>${w}</h3><p>${d}</p><code>frontend/${f}</code></li>`).join("")}</ul>`;
}

function agent() {
  return `<div class="card agent rv" data-src="manifest.yml"><p class="eyebrow">Rovo agent · <code>le-fil</code></p><h3>“Le fil”</h3>
  <p class="q">Which criteria of this release are covered only by a declaration?</p>
  <p>Skill <code>before-closing-a-ticket</code> · follow-up: <em>Ask what is still not proven in this scope.</em></p>
  <span class="src">manifest.yml — rovo:agent, conversationStarters, followUpPrompt</span></div>`;
}

export default {
  num: "04", file: "04-produit.html", slug: "04-produit",
  title: "Trame — the weave, inside Jira",
  desc: "The real Trame Forge app in Jira production, its five mount points and eleven screens.",
  sources: ["docs/captures/06-app-jira-production.png — the only real Forge render", "README.md — v2.1.0 production, 5 UI Kit 2 entries, 11 screens", "manifest.yml — rovo:agent le-fil"],
  main() {
    return `<section class="hero wrap">
  <div class="p4head"><div><p class="eyebrow">The product — chosen over an exploded architecture: this is the screen that really renders</p>
  <h1 class="h1s">The weave,<br>inside <span class="acc">Jira.</span></h1></div>
  <div class="keys k2">${fact("version")}${fact("screens")}${fact("entries")}</div></div>
  ${shot()}
</section>
${section("mount", rv("h2", "Five places it mounts.") + mounts() + `<span class="src">README.md — src/ui/frontend/{panel,page,project,gadget,certificates}.tsx</span>`)}
${section("screens night", `<div class="split"><div>${rv("h2", "Eleven screens, one route.")}<ul class="chips rv">${SCREENS.map((s) => `<li>${s}</li>`).join("")}</ul><span class="src">README.md — src/handlers/resolver.ts</span>${agent()}</div>
  <figure class="inset rv"><p class="tag">Demo illustration — drawn from the seeded project, not a Forge render</p>${cloth(CLOTH, { id: "i", s: 60 })}</figure></div>`)}`;
  },
};
