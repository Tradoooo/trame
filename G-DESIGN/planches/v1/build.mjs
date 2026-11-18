// build.mjs — assemble 5 standalone pages into dist/ (zero network at render).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "dist"); mkdirSync(dist, { recursive: true });
const read = p => readFileSync(join(root, p), "utf8");
const css = read("src/base.css") + "\n" + read("src/theme.css") + "\n" + read("src/scenes.css");
const tpl = read("src/tpl.html");
const sharedJS = `
const io = ("IntersectionObserver" in window) ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.15 }) : null;
document.querySelectorAll(".reveal").forEach(el => io ? io.observe(el) : el.classList.add("in"));
document.querySelectorAll("a[href^='http']").forEach(a => a.setAttribute("rel", "noreferrer noopener"));
`;
const pages = [
  { mod: await import("./src/scenes/p01.js"), file: "01-comprendre.html", title: "Trame — the thread that is missing", desc: "Understand Trame in five seconds: coverage of acceptance criteria as a visible weave.", page: "01" },
  { mod: await import("./src/scenes/p02.js"), file: "02-probleme.html", title: "Trame — the coverage that quietly disappears", desc: "The problem Trame solves: criteria changed after their last verification.", page: "02" },
  { mod: await import("./src/scenes/p03.js"), file: "03-pipeline.html", title: "Trame — the real pipeline, end to end", desc: "Eight real steps from raw criterion in Jira to a dated bulletin.", page: "03" },
  { mod: await import("./src/scenes/p04.js"), file: "04-produit.html", title: "Trame — a real Forge app in production", desc: "The production Forge app: scope selection, load, coverage screens.", page: "04" },
  { mod: await import("./src/scenes/p05.js"), file: "05-preuves.html", title: "Trame — measured, traceable, honest", desc: "Evidence with sources, invariants, and the two named limits.", page: "05" },
];
for (const p of pages) {
  const body = typeof p.mod.scene === "function" ? p.mod.scene() : p.mod.scene;
  const html = tpl
    .replaceAll("{{TITLE}}", p.title)
    .replaceAll("{{DESC}}", p.desc)
    .replaceAll("{{CSS}}", css)
    .replaceAll("{{SLUG}}", p.file.replace(".html", ""))
    .replaceAll("{{PAGE}}", p.page)
    .replaceAll("{{BODY}}", body)
    .replaceAll("{{JS}}", sharedJS);
  writeFileSync(join(dist, p.file), html);
  console.log("BUILT", p.file, html.length, "bytes");
}
