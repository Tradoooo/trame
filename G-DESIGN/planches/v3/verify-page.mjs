// verify-page.mjs — runs inside the page (serialised by Playwright). Self-contained on purpose.
export function inPage({ badge }) {
  const lum = (c) => {
    const m = c.match(/[\d.]+/g).map(Number);
    const ch = m.slice(0, 3).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
    return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
  };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const bgOf = (el) => {
    for (let e = el; e; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (s.backgroundImage.includes("gradient") && s.backgroundColor.match(/[\d.]+/g)?.[3] === "0") return "rgb(232,224,208)";
      const a = s.backgroundColor.match(/[\d.]+/g);
      if (a && (a.length < 4 || +a[3] > 0.5)) return s.backgroundColor;
    }
    return "rgb(243,238,228)";
  };
  // contrast + size: whole page (denim bands live below the fold); overlaps: first screen only
  const rendered = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== "hidden"; };
  const visible = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight && getComputedStyle(e).visibility !== "hidden"; };
  const texts = [...document.querySelectorAll("body *:not(svg):not(svg *):not(script):not(style)")]
    .filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && !e.closest("[aria-hidden=true]") && rendered(e));
  const lowContrast = [], small = [];
  let minC = 99;
  for (const e of texts) {
    const s = getComputedStyle(e), fs = parseFloat(s.fontSize), big = fs >= 24 || (fs >= 18.66 && +s.fontWeight >= 700);
    const c = ratio(s.color, bgOf(e));
    minC = Math.min(minC, c);
    if (c < (big ? 3 : 4.5)) lowContrast.push(`contraste ${c.toFixed(2)} « ${e.textContent.trim().slice(0, 40)} »`);
    if (fs < 16) small.push(`${fs}px « ${e.textContent.trim().slice(0, 40)} »`);
  }
  return {
    brand: !!document.querySelector(".brand") && /Trame/.test(document.querySelector(".brand").textContent),
    badge: document.querySelector(".badge")?.textContent.trim() === badge,
    h1: !!document.querySelector("h1")?.textContent.trim(),
    scene: !!document.querySelector(".weave, .strip, .draw, .shot, .proof"),
    overlaps: overlaps(), lowContrast, small, minContrast: minC.toFixed(2),
    hscroll: document.documentElement.scrollWidth > innerWidth + 1,
    dataSrc: [...document.querySelectorAll("[data-src]")].map((e) => e.dataset.src),
  };

  function overlaps() {
    const sel = "header.top > *, .hero > *, .hero-txt > *, .p4head > div, .keys > .fact, .proof > .fact, .step, .frame, .shot .pin";
    const els = [...document.querySelectorAll(sel)].filter(visible);
    const bad = [];
    for (let i = 0; i < els.length; i++) for (let j = i + 1; j < els.length; j++) {
      const a = els[i], b = els[j];
      if (a.contains(b) || b.contains(a) || a.classList.contains("pin") !== b.classList.contains("pin")) continue;
      const p = a.getBoundingClientRect(), q = b.getBoundingClientRect();
      const ox = Math.min(p.right, q.right) - Math.max(p.left, q.left), oy = Math.min(p.bottom, q.bottom) - Math.max(p.top, q.top);
      if (ox > 4 && oy > 4) bad.push(`chevauchement ${a.className || a.tagName} × ${b.className || b.tagName}`);
    }
    return bad;
  }
}
