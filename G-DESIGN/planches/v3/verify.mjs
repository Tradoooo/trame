// verify.mjs — headless Chrome (Playwright): assertions, traced figures, captures, contact sheet, review index.
// Usage: node verify.mjs   (TRAME_REPO=<read-only clone of Tradoooo/trame> to check figures against the repo)
import { chromium } from "playwright";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { META, FACTS, PIPELINE, CASE } from "./src/data.js";
import { PAGES } from "./build.mjs";
import { inPage } from "./verify-page.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const caps = join(root, "captures");
const REPO = process.env.TRAME_REPO || "";
const SIZES = [[1440, 900]]; // Trame: desktop only (decision Gaia 2026-11-18)
mkdirSync(caps, { recursive: true });
const out = [];
let failed = false;
const log = (ok, s) => { if (!ok) failed = true; out.push(`${ok ? "OK  " : "FAIL"} ${s}`); };

async function open(browser, file, w, h, reduce) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: reduce ? "reduce" : "no-preference" });
  const p = await ctx.newPage();
  const errs = [], ext = [];
  p.on("pageerror", (e) => errs.push(String(e)));
  p.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  p.on("request", (r) => { if (!/^(file|data):/.test(r.url())) ext.push(r.url()); });
  await p.goto(pathToFileURL(join(root, "dist", file)).href, { waitUntil: "load" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(reduce ? 300 : 2200);
  return { ctx, p, errs, ext };
}

async function checkSize(browser, page, w, h) {
  const { ctx, p, errs, ext } = await open(browser, page.file, w, h, false);
  const r = await p.evaluate(inPage, { badge: META.badge });
  await p.screenshot({ path: join(caps, `${page.slug}-${w}x${h}.png`) });
  await ctx.close();
  const ok = !errs.length && !ext.length && r.brand && r.badge && r.h1 && r.scene && !r.overlaps.length && !r.lowContrast.length && !r.small.length && !r.hscroll;
  log(ok, `${page.file} | ${w}x${h} | ${errs.length} erreur JS | ${ext.length} requête externe | marque+slogan(h1)+badge:${+r.brand}${+r.h1}${+r.badge} scène:${+r.scene} | chevauchements:${r.overlaps.length} | contraste min ${r.minContrast}:1 (<AA:${r.lowContrast.length}) | texte<16px:${r.small.length} | scroll-x:${+r.hscroll} | data-src:${r.dataSrc.length}`);
  for (const d of [...errs, ...ext, ...r.overlaps, ...r.lowContrast, ...r.small].slice(0, 6)) out.push(`     · ${d}`);
  return r;
}

async function checkReduced(browser, page) {
  const { ctx, p } = await open(browser, page.file, 1440, 900, true);
  const r = await p.evaluate(() => ({
    running: document.getAnimations().filter((a) => a.playState === "running").length,
    hidden: [...document.querySelectorAll(".rv")].filter((e) => getComputedStyle(e).opacity !== "1").length,
  }));
  await p.screenshot({ path: join(caps, `full-${page.slug}.png`), fullPage: true });
  await ctx.close();
  log(r.running === 0 && r.hidden === 0, `${page.file} | prefers-reduced-motion | animations en cours:${r.running} | éléments masqués:${r.hidden}`);
}

function grepRepo(rel, needle) {
  if (!REPO) return null;
  const f = join(REPO, rel.split(" ")[0]);
  if (!existsSync(f)) return false;
  return needle == null || readFileSync(f, "utf8").includes(needle);
}

function checkFigures() {
  if (!REPO) { log(false, "chiffres | TRAME_REPO absent — traçage non vérifié"); return; }
  for (const [k, f] of Object.entries(FACTS)) {
    const hit = grepRepo(f.src, f.n);
    log(hit, `chiffre ${k}=${f.v} | ${f.src} | ${f.n == null ? "fichier image présent (lu visuellement)" : "extrait trouvé"}`);
  }
  for (const n of CASE.needles) log(grepRepo(CASE.src, n), `P2 cas | ${CASE.src} | « ${n} »`);
}

function checkPipelineFiles() {
  const files = PIPELINE.flatMap((s) => s.f.split(" · ")).flatMap(expand);
  const miss = REPO ? files.filter((f) => !existsSync(join(REPO, f))) : files;
  log(REPO && !miss.length, `P3 | ${PIPELINE.length} étapes nommées | ${files.length - miss.length}/${files.length} chemins réels présents dans le repo${miss.length ? " — manquants: " + miss.join(", ") : ""}`);
}

function expand(f) {
  const m = f.match(/^(.*)\{(.+)\}(.*)$/);
  return m ? m[2].split(",").map((x) => m[1] + x + m[3]) : [f.replace(/\/$/, "")];
}

async function main() {
  const browser = await chromium.launch({ channel: "chrome" });
  for (const page of PAGES) {
    for (const [w, h] of SIZES) await checkSize(browser, page, w, h);
    await checkReduced(browser, page);
  }
  const steps = await countSteps(browser);
  log(steps === 8, `03-pipeline.html | étapes .step rendues: ${steps} (attendu 8)`);
  checkPipelineFiles();
  checkFigures();
  const { contact, reviewIndex } = await import("./verify-sheet.mjs");
  await contact(browser, PAGES, caps);
  await browser.close();
  console.log(out.join("\n"));
  writeFileSync(join(caps, "verify-output.txt"), out.join("\n") + "\n");
  reviewIndex(PAGES, out, root, failed);
  process.exit(failed ? 1 : 0);
}

async function countSteps(browser) {
  const { ctx, p } = await open(browser, "03-pipeline.html", 1440, 900, true);
  const n = await p.$$eval(".step h3", (s) => s.filter((e) => e.textContent.trim()).length);
  await ctx.close();
  return n;
}

main();
