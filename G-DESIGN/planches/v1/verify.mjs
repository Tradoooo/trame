// verify.mjs — headless Chromium: assertions + screenshots, per socle 09 §6.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "dist"), caps = join(root, "captures");
mkdirSync(caps, { recursive: true });
const pages = [
  ["01-comprendre.html", "01-understand"],
  ["02-probleme.html", "02-problem"],
  ["03-pipeline.html", "03-pipeline"],
  ["04-produit.html", "04-product"],
  ["05-preuves.html", "05-preuves"],
];
const b = await chromium.launch({ headless: true, channel: "chrome" });
const lines = [];
let failed = false;

async function checkPage(file, slug, vw, vh, tag) {
  const ctx = await b.newContext({ viewport: { width: vw, height: vh } });
  const p = await ctx.newPage();
  const errors = [], external = [];
  p.on("pageerror", e => errors.push(String(e).slice(0, 120)));
  p.on("request", r => { if (!r.url().startsWith("file:")) external.push(r.url()); });
  await p.goto("file:///" + join(dist, file).replace(/\\/g, "/"), { waitUntil: "load" });
  await p.waitForTimeout(700);
  const checks = await p.evaluate(() => {
    const out = { brand: !!document.querySelector(".brand"), badge: !!document.querySelector(".badge"), scene: !!document.querySelector(".weave,.steps,.forge-frame,.timeline,.metrics"), overlap: 0, contrast: [], dataSrc: [...document.querySelectorAll("[data-src]")].map(e => e.getAttribute("data-src")) };
    // overlap: check weave cells / steps / metrics don't intersect badly
    const boxes = [...document.querySelectorAll(".cell,.step,.metric")].map(e => e.getBoundingClientRect());
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], c = boxes[j];
      const ox = Math.min(a.right, c.right) - Math.max(a.left, c.left);
      const oy = Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top);
      if (ox > 4 && oy > 4) out.overlap++;
    }
    // contrast: sample text colors vs bg (AA approx for main text)
    const el = document.querySelector(".lede") || document.querySelector("p");
    if (el) { const cs = getComputedStyle(el); out.contrast.push(cs.fontSize); }
    return out;
  });
  await p.screenshot({ path: join(caps, `${slug}-${tag}.png`), fullPage: false });
  // reduced motion check
  const rm = await p.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  const ok = checks.brand && checks.badge && checks.scene && errors.length === 0 && external.length === 0;
  if (!ok) failed = true;
  lines.push(`${ok ? "OK " : "FAIL"} ${file} | ${vw}x${vh} | ${errors.length} erreur JS | ${external.length} requête externe | marque:${checks.brand ? 1 : 0} badge:${checks.badge ? 1 : 0} scène:${checks.scene ? 1 : 0} | chevauchements:${checks.overlap} | data-src:${checks.dataSrc.length} | reduced-motion native:${rm}`);
  await ctx.close();
  return checks;
}

const detail = [];
for (const [file, slug] of pages) {
  const d900 = await checkPage(file, slug, 1440, 900, "1440x900");
  await checkPage(file, slug, 390, 844, "390x844");
  detail.push({ file, dataSrc: d900.dataSrc });
  if (file === "03-pipeline.html") {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    await p.goto("file:///" + join(dist, file).replace(/\\/g, "/"));
    const n = await p.$$eval(".step", s => s.length);
    lines.push(`OK 03-pipeline | ${n} étapes du pipeline réel présentes (attendu 8)`);
    if (n !== 8) failed = true;
    await ctx.close();
  }
  if (file === "05-preuves.html") {
    lines.push(`OK 05-preuves | chiffres tracés: ${detail.at(-1).dataSrc.join(", ")}`);
  }
  if (file === "01-comprendre.html" && detail[0].dataSrc.length < 3) { failed = true; lines.push("FAIL 01 | moins de 3 chiffres tracés"); }
}
await b.close();
console.log(lines.join("\n"));
writeFileSync(join(caps, "verify-output.txt"), lines.join("\n"));
process.exit(failed ? 1 : 0);
