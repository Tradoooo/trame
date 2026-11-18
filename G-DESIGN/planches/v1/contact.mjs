// contact.mjs — assemble planche-contact.jpg from the 5 desktop captures.
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = dirname(fileURLToPath(import.meta.url));
const shots = ["01-understand","02-problem","03-pipeline","04-product","05-preuves"].map(s => join(root,"captures",`${s}-1440x900.png`));
const html = `<!doctype html><meta charset="utf-8"><body style="margin:0;background:#0C0E13;display:flex;gap:8px;align-items:flex-start">
${shots.map(p=>`<img src="file:///${p.replace(/\\/g,"/")}" style="width:480px;display:block">`).join("")}</body>`;
const tmp = join(root,".refs","contact.html");
writeFileSync(tmp, html);
const b = await chromium.launch({ headless:true, channel:"chrome" });
const p = await b.newPage({ viewport:{ width:2456, height:940 } });
await p.goto("file:///"+tmp.replace(/\\/g,"/"));
await p.waitForTimeout(600);
await p.screenshot({ path: join(root,"captures","planche-contact.jpg"), quality: 82, type:"jpeg", fullPage:true });
await b.close();
console.log("WROTE captures/planche-contact.jpg");
