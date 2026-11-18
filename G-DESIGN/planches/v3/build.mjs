// build.mjs — assembles the 5 self-contained pages into dist/ (fonts + image inlined, zero network).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { META } from "./src/data.js";
import { mark, folio, pager, GRAIN } from "./src/identity.js";
import p01 from "./src/scenes/p01.js";
import p02 from "./src/scenes/p02.js";
import p03 from "./src/scenes/p03.js";
import p04 from "./src/scenes/p04.js";
import p05 from "./src/scenes/p05.js";

const root = dirname(fileURLToPath(import.meta.url));
const src = (p) => join(root, "src", p);
const read = (p) => readFileSync(src(p), "utf8");
const b64 = (p) => readFileSync(src(p)).toString("base64");
export const PAGES = [p01, p02, p03, p04, p05];
const NAMES = ["Understand", "The problem", "Pipeline", "Product", "Proof"];

function fonts() {
  const face = (fam, file, extra) => `@font-face{font-family:"${fam}";src:url(data:font/woff2;base64,${b64("fonts/" + file)}) format("woff2");font-display:block;${extra}}`;
  return [
    face("Archivo", "archivo-wdth.woff2", "font-weight:100 900;font-stretch:62% 125%;"),
    face("Plex Mono", "plex-mono-400.woff2", "font-weight:400;"),
    face("Plex Mono", "plex-mono-500.woff2", "font-weight:500 700;"),
  ].join("\n");
}

// Wordmark: three warp threads, one weft pass with a gap — the missing thread.


function render(page, shared) {
  const main = page.main().replace("{{IMG_FORGE}}", `data:image/png;base64,${b64("assets/forge-prod.png")}`);
  const vars = {
    TITLE: page.title, DESC: page.desc, FONTS: shared.fonts, CSS: shared.css, NUM: page.num,
    MARK: mark(), FOLIO: folio(page.num), BADGE: META.badge, MAIN: main, PAGER: pager(PAGES, page, NAMES),
    SOURCES: page.sources.map((s) => `<li>${s}</li>`).join(""), JS: shared.js,
  };
  return shared.tpl.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in vars ? vars[k] : m));
}

function build() {
  const shared = {
    tpl: read("tpl.html"), fonts: fonts(), js: read("runtime.js"),
    css: `:root{--grain:${GRAIN}}\n` + ["theme.css", "base.css", "scenes.css"].map(read).join("\n"),
  };
  mkdirSync(join(root, "dist"), { recursive: true });
  for (const page of PAGES) {
    const html = render(page, shared);
    if (/\{\{\w+\}\}/.test(html)) throw new Error(`unfilled placeholder in ${page.file}`);
    if (/(src|href)="https?:/.test(html)) throw new Error(`external URL in ${page.file}`);
    writeFileSync(join(root, "dist", page.file), html);
    console.log(`built dist/${page.file} (${(html.length / 1024).toFixed(0)} KB)`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) build();
