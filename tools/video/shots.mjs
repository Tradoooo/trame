/**
 * shots.mjs — enregistre les plans vidéo de Trame depuis le site LIVE.
 *
 * Un contexte Playwright par plan (recordVideo webm 1920×1080), Chrome système
 * headless, sans prendre le focus. Chaque plan porte un filet bas injecté
 * (légende d'honnêteté : ce qui est montré, et ce qui ne l'est pas).
 *
 * Usage : node shots.mjs [id ...]   (sans argument : tous les plans)
 * Sortie : clips/<id>.webm + clips/<id>.json (durée réelle)
 */
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const SITE = "https://tradoooo.github.io/trame/";
const SIBLING = "https://tradoooo.github.io/preuve-a-l-appui/";
const DOSSORTIE = process.env.TRAME_VIDEO_DIR || path.resolve("..", "..", ".video");
const OUT = path.join(DOSSORTIE, "clips");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const t0 = () => performance.now();

/** Filet bas injecté dans la page : légende + mention d'honnêteté. */
async function filet(page, texte, marque) {
  await page.addStyleTag({
    content: `.__cap{position:fixed;left:0;right:0;bottom:0;z-index:9999;
      background:rgba(12,14,20,.88);color:#e8ecf4;font:600 26px/1.35 system-ui,sans-serif;
      padding:18px 40px;display:flex;gap:28px;align-items:baseline;
      border-top:2px solid rgba(120,160,255,.35)}
      .__cap b{color:#9fc0ff;font-weight:700}.__cap span{color:#aab4c6;font-weight:500;font-size:22px}`,
  });
  await page.evaluate(
    ([texte, marque]) => {
      const div = document.createElement("div");
      div.className = "__cap";
      div.innerHTML = `<b>${texte}</b><span>${marque}</span>`;
      document.body.appendChild(div);
      document.body.style.paddingBottom = "120px";
    },
    [texte, marque],
  );
}

/**
 * Défilement doux jusqu'à la cible. La cible est LE plus petit conteneur qui
 * porte le texte : un `div` géant contiendrait tout et ramènerait le scroll en
 * haut de page. Recherche, scroll et contrôle se font dans la même passe, donc
 * aucun handle d'élément ne traverse Node↔page.
 */
async function versTexte(page, texte, { bloc = "start", pas = 400, pause = 900 } = {}) {
  const etat = await page.evaluate(
    async ([txt, b, step, wait]) => {
      const propres = [...document.querySelectorAll("caption,h2,h3,h4,th,li,p,dt,dd,span,b")]
        .filter((e) => e.textContent.replace(/\s+/g, " ").trim().includes(txt));
      const el = propres.length
        ? propres[0]
        : [...document.querySelectorAll("div,section,td")]
            .filter((e) => e.textContent.replace(/\s+/g, " ").includes(txt))
            .sort((a, c) => a.textContent.length - c.textContent.length)[0] ?? null;
      if (!el) return { ok: false, raison: "introuvable" };
      const haut = el.getBoundingClientRect().top + window.scrollY - 100;
      for (let i = 0; i < 60; i++) {
        const ecart = haut - window.scrollY;
        if (Math.abs(ecart) <= step) break;
        window.scrollTo(0, window.scrollY + Math.sign(ecart) * step);
        await new Promise((r) => setTimeout(r, wait));
      }
      el.scrollIntoView({ behavior: "auto", block: b });
      const rect = el.getBoundingClientRect();
      return {
        ok: rect.top > -rect.height * 0.5 && rect.top < window.innerHeight - 40,
        haut: Math.round(rect.top), hauteur: Math.round(rect.height),
        scrollY: Math.round(window.scrollY), tag: el.tagName.toLowerCase(),
      };
    },
    [texte, bloc, pas, pause],
  );
  console.log(`  CADRAGE ${texte} -> ${JSON.stringify(etat)}`);
  await sleep(500);
  return etat.ok;
}

/** Défilement vers une section par son id, avec le même contrôle de cadrage. */
async function versId(page, id) {
  const etat = await page.evaluate((x) => {
    const el = document.getElementById(x);
    if (!el) return { ok: false, raison: "id absent" };
    el.scrollIntoView({ behavior: "auto", block: "start" });
    const rect = el.getBoundingClientRect();
    return {
      ok: rect.top > -rect.height * 0.5 && rect.top < window.innerHeight - 40,
      haut: Math.round(rect.top), hauteur: Math.round(rect.height),
      scrollY: Math.round(window.scrollY),
    };
  }, id);
  console.log(`  CADRAGE #${id} -> ${JSON.stringify(etat)}`);
  await sleep(1400);
  return etat.ok;
}

async function pan(page, px, pas = 260, attente = 700) {
  const etapes = Math.round(px / pas);
  for (let i = 0; i < etapes; i++) {
    await page.evaluate((y) => window.scrollBy(0, y), pas);
    await sleep(attente);
  }
}

async function ouvreSite(page, caption, marque) {
  await page.goto(SITE, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForSelector("#demo", { timeout: 30000 });
  await filet(page, caption, marque);
}

/** Les deux listes de la démo : ticket (par valeur), puis critère (par texte). */
async function choisisCritere(page, ticket, motif) {
  const selects = page.locator("#demo select");
  if (ticket) {
    await selects.nth(0).selectOption({ value: ticket });
    await sleep(1800);
  }
  const valeur = await selects.nth(1).evaluate(
    (sel, txt) => {
      const opt = [...sel.options].find((o) => o.textContent.replace(/\s+/g, " ").includes(txt));
      return opt ? opt.value : null;
    },
    motif,
  );
  if (!valeur) {
    console.warn(`  ! critère introuvable : ${motif}`);
    return false;
  }
  await selects.nth(1).selectOption({ value: valeur });
  await sleep(2500);
  return true;
}

const PLANS = [
  {
    id: "c1_counters",
    seconde: 27,
    caption: "Trame — the coverage of your acceptance criteria",
    marque: "live public site · the demo runs the real engine in this page",
    async run(page, marque) {
      await ouvreSite(page, this.caption, marque);
      await sleep(5000);
      await versId(page, "demo");
      await sleep(600);
      await versTexte(page, "The counters", { bloc: "start" });
      await sleep(200);
    },
  },
  {
    id: "c2_weave_axes",
    seconde: 37,
    caption: "Each criterion is a warp thread, each verification act a weft pass",
    marque: "drawn sample on the seeded project · three axes, never merged",
    async run(page, marque) {
      await ouvreSite(page, this.caption, marque);
      await versId(page, "weave");
      await sleep(3000);
      await pan(page, 700, 220, 1100);
      await sleep(2500);
      await versTexte(page, "The three axes, never merged");
      await sleep(4000);
      await pan(page, 380, 190, 900);
      await sleep(2500);
    },
  },
  {
    id: "c3_sheet",
    seconde: 36,
    caption: "TRAME-102 / AC-2 — covered, not proven",
    marque: "one act, a manual test case: attested strength, no machine execution",
    async run(page, marque) {
      await ouvreSite(page, this.caption, marque);
      await versId(page, "demo");
      await sleep(2000);
      await choisisCritere(page, "TRAME-102", "TRAME-102 / AC-2");
      await versTexte(page, "TRAME-102 / AC-2", { bloc: "center" });
      await sleep(5000);
      await pan(page, 300, 150, 900);
      await sleep(3000);
    },
  },
  {
    id: "c4_perforations",
    seconde: 36,
    caption: "The perforation registry — the criterion changed after its test",
    marque: "3 perforations · both dates, the gap, the class — never one score",
    async run(page, marque) {
      await ouvreSite(page, this.caption, marque);
      await versTexte(page, "The perforation registry");
      await sleep(6000);
      await pan(page, 420, 160, 1000);
      await sleep(5000);
    },
  },
  {
    id: "c5_dangling",
    seconde: 32,
    caption: "The loose thread queue — the coverage goes down",
    marque: "2 loose threads, 2 deleted criteria: removed from the figure, on purpose",
    async run(page, marque) {
      await ouvreSite(page, this.caption, marque);
      await versTexte(page, "The loose thread queue");
      await sleep(6000);
      await pan(page, 380, 150, 1000);
      await sleep(4000);
    },
  },
  {
    id: "c6_holes",
    seconde: 27,
    caption: "The métré — which hole comes first",
    marque: "score = Σ(weight × value) ÷ Σ(weight), shown term by term",
    async run(page, marque) {
      await ouvreSite(page, this.caption, marque);
      await versTexte(page, "The holes, ranked by the métré");
      await sleep(6000);
      await pan(page, 460, 150, 1000);
      await sleep(4000);
    },
  },
  {
    id: "c7_certificate",
    seconde: 27,
    caption: "The weave certificate — dated, scoped, and it says what is NOT covered",
    marque: "the Confluence export is manual today (§21 fallback): nothing is staged",
    async run(page, marque) {
      await ouvreSite(page, this.caption, marque);
      await versTexte(page, "The weave certificate");
      await sleep(5000);
      await versTexte(page, "What is NOT covered", { bloc: "center" });
      await sleep(6000);
    },
  },
  {
    id: "c8_sibling",
    seconde: 27,
    caption: "The sibling app: proof-on-demand — the Done gate",
    marque: "Trame measures, it never blocks: the sibling app holds the gate",
    async run(page) {
      await page.goto(SIBLING, { waitUntil: "domcontentloaded", timeout: 60000 });
      await sleep(4000);
      await filet(page, this.caption, this.marque);
      await page.evaluate(() => window.scrollBy(0, 600));
      await sleep(3000);
      await pan(page, 900, 250, 1000);
      await sleep(3000);
    },
    marque: "",
  },
  {
    id: "c9_architecture",
    seconde: 34,
    caption: "How it is built — four link paths, no per-person statistic",
    marque: "github.com/Tradoooo/trame · 54 test files, 455 green tests",
    async run(page, marque) {
      await ouvreSite(page, this.caption, marque);
      await versId(page, "architecture");
      await sleep(4000);
      await pan(page, 900, 240, 1000);
      await sleep(3000);
      await versId(page, "recipe");
      await sleep(3000);
      await page.evaluate(() => window.scrollBy(0, 400));
      await sleep(3000);
    },
  },
];

async function enregistre(browser, plan) {
  const dir = path.join(OUT, plan.id);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const ctx = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    locale: "en-US",
    recordVideo: { dir, size: { width: 1920, height: 1080 } },
  });
  // Le site choisit la langue du navigateur : on force l'anglais (langue de la soumission).
  await ctx.addInitScript(() => {
    try { localStorage.setItem("trame-site-lang", "en"); } catch { /* ignore */ }
  });
  const page = await ctx.newPage();
  page.setDefaultTimeout(60000);
  const debut = Date.now();
  try {
    await plan.run(page, plan.marque);
  } catch (erreur) {
    console.error(`  ! plan ${plan.id} interrompu : ${erreur.message}`);
  } finally {
    const reste = plan.seconde * 1000 - (Date.now() - debut);
    if (reste > 0) await sleep(reste);
    await ctx.close();
    const brut = await page.video().path();
    const cible = path.join(OUT, plan.id + ".webm");
    fs.renameSync(brut, cible);
    fs.writeFileSync(
      path.join(OUT, plan.id + ".json"),
      JSON.stringify({ id: plan.id, webm: cible, voulu: plan.seconde }, null, 1),
    );
    const reel = ((Date.now() - debut) / 1000).toFixed(1);
    console.log(`PLAN=${plan.id} FICHIER=${cible} voulu=${plan.seconde}s reel=${reel}s`);
  }
}

async function main() {
  const filtres = process.argv.slice(2);
  const plans = PLANS.filter((p) => filtres.length === 0 || filtres.includes(p.id));
  fs.mkdirSync(OUT, { recursive: true });
  const CHROME = process.env.TRAME_CHROME || "/opt/google/chrome/google-chrome";
  const browser = await chromium.launch({
    executablePath: CHROME,
    headless: true,
    args: ["--force-device-scale-factor=1", "--hide-scrollbars", "--no-sandbox", "--disable-gpu"],
  });
  for (const plan of plans) {
    await enregistre(browser, plan);
  }
  await browser.close();
}

main().catch((e) => {
  console.error("ECHEC_ENREGISTREMENT", e);
  process.exit(1);
});
