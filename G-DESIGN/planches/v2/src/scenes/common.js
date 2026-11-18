// common.js — small helpers shared by the five scenes (they only describe their subject).
import { FACTS } from "../data.js";

export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// A traced figure: value + label + source path (data-src checked by verify.mjs).
export function fact(key, cls = "") {
  const f = FACTS[key];
  return `<div class="fact ${cls}" data-fact="${key}" data-src="${f.src}"><!-- preuve: ${f.src} -->
  <span class="figure">${esc(f.v)}</span><span class="fl">${esc(f.l)}</span><span class="src">${f.src}</span></div>`;
}

export const section = (cls, inner) => `<section class="band wrap ${cls}">${inner}</section>`;
export const rv = (tag, inner, cls = "") => `<${tag} class="rv ${cls}">${inner}</${tag}>`;
