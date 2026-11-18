// audit.mjs — iteration 2: pixel-level sanity + reduced-motion + contrast AA.
import { chromium } from "playwright";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = dirname(fileURLToPath(import.meta.url));
const pages = ["01-comprendre.html","02-probleme.html","03-pipeline.html","04-produit.html","05-preuves.html"];
const b = await chromium.launch({ headless: true, channel: "chrome" });
const out = [];
// 1) reduced-motion: no running animations
for (const f of pages) {
  const ctx = await b.newContext({ viewport:{width:1440,height:900}, reducedMotion:"reduce" });
  const p = await ctx.newPage();
  await p.goto("file:///"+join(root,"dist",f).replace(/\\/g,"/"));
  await p.waitForTimeout(400);
  const anims = await p.evaluate(() => document.getAnimations().filter(a => a.playState === "running").length);
  out.push(`${f} | reduced-motion running animations: ${anims}`);
  await ctx.close();
}
// 2) contrast of .lede vs body bg (AA 4.5:1)
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
const p = await ctx.newPage();
await p.goto("file:///"+join(root,"dist","01-comprendre.html").replace(/\\/g,"/"));
const contrast = await p.evaluate(() => {
  function lum(c){const[r,g,bl]=c.match(/\d+/g).map(Number).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*r+.7152*g+.0722*bl}
  const fg = getComputedStyle(document.querySelector(".lede")).color, bg = getComputedStyle(document.body).backgroundColor;
  const L1=lum(fg),L2=lum(bg);const ratio=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);
  return {fg,bg,ratio:+ratio.toFixed(2)};
});
out.push(`contrast .lede vs body: ${contrast.ratio}:1 (${contrast.fg} on ${contrast.bg}) — AA ${contrast.ratio>=4.5?"OK":"FAIL"}`);
// 3) hero fits above the fold at 1440x900 & 390x844
for (const [w,h] of [[1440,900],[390,844]]) {
  const c2 = await b.newContext({ viewport:{width:w,height:h} });
  const p2 = await c2.newPage();
  await p2.goto("file:///"+join(root,"dist","01-comprendre.html").replace(/\\/g,"/"));
  const fold = await p2.evaluate(() => {
    const h1 = document.querySelector("h1").getBoundingClientRect();
    const weave = document.querySelector(".weave").getBoundingClientRect();
    return { h1Visible: h1.top < innerHeight, weaveTop: Math.round(weave.top + scrollY), vh: innerHeight };
  });
  out.push(`fold ${w}x${h}: h1 visible=${fold.h1Visible}, weave top=${fold.weaveTop}px (vh=${fold.vh})`);
  await c2.close();
}
await b.close();
console.log(out.join("\n"));
