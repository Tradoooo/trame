// verify-sheet.mjs — contact sheet (5 desktop + 5 mobile captures) and the review index.html.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const img = (p) => `data:image/png;base64,${readFileSync(p).toString("base64")}`;

export async function contact(browser, pages, caps) {
  const cell = (p) => `<figure><img src="${img(join(caps, `${p.slug}-1440x900.png`))}"><img class="m" src="${img(join(caps, `${p.slug}-390x844.png`))}"><figcaption>${p.num} · ${p.file}</figcaption></figure>`;
  const html = `<!doctype html><meta charset="utf-8"><style>
  body{margin:0;background:#15171C;padding:28px;display:grid;grid-template-columns:repeat(3,1fr);gap:28px;font:16px monospace;color:#F3EEE4}
  figure{margin:0;display:grid;grid-template-columns:1fr 26%;gap:10px;align-items:start}
  img{width:100%;display:block;border-radius:6px}figcaption{grid-column:1/-1}</style>${pages.map(cell).join("")}`;
  const ctx = await browser.newContext({ viewport: { width: 2400, height: 1000 } });
  const p = await ctx.newPage();
  await p.setContent(html, { waitUntil: "load" });
  await p.screenshot({ path: join(caps, "planche-contact.jpg"), type: "jpeg", quality: 86, fullPage: true });
  await ctx.close();
}

export function reviewIndex(pages, lines, root, failed) {
  const status = (p) => lines.filter((l) => l.includes(p.file)).every((l) => l.startsWith("OK")) ? "OK" : "FAIL";
  const cards = pages.map((p) => `<li><a href="dist/${p.file}"><img src="captures/${p.slug}-1440x900.png" alt="${p.title}" loading="lazy"></a>
  <p><b>${p.num}</b> <a href="dist/${p.file}">${p.title.replace("Trame — ", "")}</a> <span class="s ${status(p)}">${status(p)}</span></p>
  <p class="l"><a href="captures/${p.slug}-390x844.png">390×844</a> · <a href="captures/full-${p.slug}.png">page entière</a></p></li>`).join("");
  const html = `<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Trame · planches v2 — revue</title><style>
body{margin:0;background:#F3EEE4;color:#15171C;font:17px/1.5 system-ui,sans-serif;padding:32px clamp(16px,4vw,56px)}
h1{font-size:40px;letter-spacing:-.03em;margin:0 0 6px}ul{list-style:none;padding:0;display:grid;gap:28px;grid-template-columns:repeat(auto-fill,minmax(400px,1fr))}
img{width:100%;border-radius:10px;box-shadow:6px 10px 24px rgba(59,47,28,.2)}a{color:#0052CC}.s{font:600 15px monospace;padding:2px 8px;border-radius:6px}
.OK{background:#15171C;color:#F3EEE4}.FAIL{background:#B3261E;color:#fff}pre{background:#15171C;color:#E9E4DA;padding:18px;border-radius:10px;overflow:auto;font-size:14px}</style>
<h1>Trame — 5 planches v2</h1><p>Direction « Relief loom » · ${new Date().toISOString().slice(0, 16).replace("T", " ")} · vérification globale : <b>${failed ? "FAIL" : "OK"}</b> · <a href="captures/planche-contact.jpg">planche-contact.jpg</a> · <a href="PLAN.md">PLAN.md</a> · <a href="REFS.md">REFS.md</a></p>
<ul>${cards}</ul><h2>Sortie de verify.mjs</h2><pre>${lines.join("\n").replace(/</g, "&lt;")}</pre></html>`;
  writeFileSync(join(root, "index.html"), html);
}
