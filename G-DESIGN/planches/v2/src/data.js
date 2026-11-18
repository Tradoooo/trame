// data.js — every figure shown in the planches, with the repo file it comes from
// and a needle that verify.mjs greps in that file (repo: Tradoooo/trame, read-only).

export const META = {
  name: "Trame",
  slogan: "The thread that is missing.",
  tagline: "Acceptance-criteria coverage for Jira, woven from the act that verifies each one.",
  badge: "Codegeist 2026 · Apps for Software Teams",
  repo: "github.com/Tradoooo/trame",
  demo: "tradoooo.github.io/trame",
};

// value, label, src (repo path), needle (string that must appear in src)
export const FACTS = {
  written: { v: "24", l: "criteria written (6 tickets × 4)", src: "docs/CAPTURES.md", n: "24 critères écrits" },
  verifiable: { v: "18", l: "verifiable — the denominator", src: "docs/CAPTURES.md", n: "18 vérifiables" },
  unfalsifiable: { v: "4", l: "unfalsifiable, counted apart", src: "docs/CAPTURES.md", n: "4 infalsifiables" },
  covered: { v: "13/18", l: "covered, declared", src: "docs/CAPTURES.md", n: "13/18 couverts" },
  provisional: { v: "1", l: "provisional — derived, to confirm", src: "docs/CAPTURES.md", n: "1 provisoire" },
  holes: { v: "4", l: "holes — no living verification act", src: "docs/captures/04-trame.png", n: null },
  perforations: { v: "3", l: "perforations", src: "src/sample/demo-project.ts", n: "perforations: ['TRAME-101/AC-4', 'TRAME-102/AC-4', 'TRAME-104/AC-2']" },
  tests: { v: "455", l: "tests green, 53 files", src: "README.md", n: "455 tests verts, 53 fichiers" },
  lint: { v: "0", l: "forge lint errors (4 warnings)", src: "docs/SUBMISSION.md", n: "0 erreur, 4 avertissements" },
  mcp: { v: "14", l: "MCP tools + 4 internal actions", src: "README.md", n: "14 outils MCP réels" },
  screens: { v: "11", l: "real screens, one route", src: "README.md", n: "11 écrans réels" },
  tables: { v: "15", l: "Forge SQL tables", src: "src/db/schema.ts", n: "budget: `CREATE TABLE" },
  perms: { v: "18", l: "permissions, 10 of them read:graph:*", src: "docs/SUBMISSION.md", n: "dix `read:graph:*`" },
  recette: { v: "20/20", l: "acceptance points measured", src: "docs/SUBMISSION.md", n: "20/20 points mesurés" },
  entries: { v: "5", l: "UI Kit 2 entries mounted", src: "README.md", n: "panel,page,project,gadget,certificates" },
  version: { v: "v2.1.0", l: "in production, Jira + Confluence", src: "README.md", n: "(v2.1.0)" },
  jql: { v: "4", l: "JQL functions", src: "README.md", n: "les **4 fonctions JQL**" },
  modules: { v: "18", l: "module types in the manifest", src: "docs/SUBMISSION.md", n: "dix-huit types de" },
};

// The demo cloth: rows = tickets, cols = AC-1..AC-4. Derived from
// src/sample/demo-project.ts; totals match the engine counters of docs/captures/04-trame.png.
// C covered · P perforated (still declared covered) · PH perforated + hole
// H hole · U unfalsifiable · V provisional (derived link) · D deleted
export const CLOTH = {
  src: "src/sample/demo-project.ts",
  cols: ["AC-1", "AC-2", "AC-3", "AC-4"],
  rows: [
    ["TRAME-101", ["C", "C", "U", "PH"]],
    ["TRAME-102", ["C", "C", "V", "P"]],
    ["TRAME-103", ["C", "C", "U", "C"]],
    ["TRAME-104", ["H", "P", "C", "H"]],
    ["TRAME-105", ["C", "C", "U", "H"]],
    ["TRAME-106", ["C", "D", "U", "D"]],
  ],
  loose: 2,
};

export const STATES = {
  C: { name: "covered", say: "a verification act crosses the criterion" },
  P: { name: "perforation", say: "criterion edited after it was verified" },
  PH: { name: "perforation + hole", say: "edited after its test, and the test was disabled" },
  H: { name: "hole", say: "no living verification act" },
  U: { name: "unfalsifiable", say: "nothing could verify it — counted apart" },
  V: { name: "provisional", say: "derived link, waits for a human" },
  E: { name: "rewritten", say: "criterion text changed — new version, new fingerprint" },
  D: { name: "deleted", say: "criterion removed from scope" },
};

// P2 — the perforation case, straight from the seeded project.
export const CASE = {
  src: "src/sample/demo-project.ts",
  ticket: "TRAME-104", ac: "AC-2",
  textFr: "un test renommé n’est plus compté",
  textEn: "a renamed test is no longer counted",
  test: "TRAME-104.testShouldBeStable",
  frozen: "2026-11-12", verified: "2026-10-03", edited: "2026-10-09",
  verifiedAgo: 40, editedAgo: 34,
  needles: ["editedAgo: 34", "testShouldBeStable', executedAgo: 40", "DEMO_NOW = '2026-11-12"],
  others: [
    ["TRAME-101", "AC-4", "declared coverage does not drop", "D−12", "D−3"],
    ["TRAME-102", "AC-4", "the bulletin is dated and comparable", "D−6", "D−5"],
  ],
};

export const PIPELINE = [
  { n: "Collect criteria", d: "Six lairs: description, field, table, attachment, Confluence page, test ticket.", f: "src/collect/{description,field,table,attachment,confluence,test-ticket}.ts", L: ["collect"] },
  { n: "Normalise & fingerprint", d: "Stable AC-n identifier, text hash, versions kept.", f: "src/collect/{normalize,fingerprint}.ts", L: ["collect", "db"] },
  { n: "Ingest verification acts", d: "Jira, Confluence, Bitbucket, comments, pipelines, Teamwork Graph.", f: "src/ingest/{jira,confluence,bitbucket,comments,pipeline,graph}.ts", L: ["ingest", "db"] },
  { n: "Probe rights & data", d: "no-right ≠ no-data ≠ no-test ≠ no-criterion.", f: "src/ingest/common.ts · src/handlers/visibility.ts", L: ["ingest"] },
  { n: "Link criterion ↔ act", d: "Four paths: mention, naming convention, similarity, declaration.", f: "src/domain/links.ts · src/domain/confidence.ts", L: ["domain", "db"] },
  { n: "Compute coverage", d: "Strength, link kind, freshness — three axes, never merged.", f: "src/domain/{coverage,timeline}.ts", L: ["domain", "db"] },
  { n: "Detect anomalies", d: "Holes, perforations, loose threads, unfalsifiable criteria.", f: "src/domain/{holes,perforations,dangling,falsifiability}.ts", L: ["domain", "db"] },
  { n: "Propose, validate, publish", d: "Test, rewording, re-weave → human queue → bulletin, certificate, UI Kit 2.", f: "src/domain/proposals.ts · src/actions/ · src/ui/", L: ["actions", "ui", "db"] },
];
export const LAYERS = [
  ["collect", "src/collect"], ["ingest", "src/ingest"], ["domain", "src/domain"],
  ["db", "src/db · Forge SQL"], ["actions", "src/actions"], ["ui", "src/ui"],
];
export const PIPE_FILES = [
  "src/collect/description.ts", "src/collect/fingerprint.ts", "src/ingest/graph.ts",
  "src/ingest/common.ts", "src/handlers/visibility.ts", "src/domain/links.ts",
  "src/domain/coverage.ts", "src/domain/perforations.ts", "src/domain/falsifiability.ts",
  "src/domain/proposals.ts", "src/ui/frontend/panel.tsx",
];

export const ABSENCES = [
  ["no-right", "Trame could not look — not a hole"],
  ["no-data", "the source answered, empty"],
  ["no-test", "data exists, no verification act"],
  ["no-criterion", "nothing to verify against"],
];
export const LINK_PATHS = ["mention", "naming-convention", "similarity", "declaration"];
export const JQL = ["issue in holes()", "issue in perforated()", "issue in dangling()", "issue in uncovered()"];

export const MOUNTS = [
  ["Jira issue panel", "Criteria — the criterion sheet", "panel.tsx"],
  ["Jira global page", "Apps → Trame, eleven screens, one route", "page.tsx"],
  ["Jira project page", "the project weave and risk zones", "project.tsx"],
  ["Dashboard gadget", "Weave bulletin", "gadget.tsx"],
  ["Confluence global page", "Weave certificates", "certificates.tsx"],
];
export const SCREENS = [
  "weave map", "criterion sheet", "hole explorer", "perforation register", "loose threads",
  "weave bulletin", "certificate", "validation queue", "risk zones", "coverage", "history",
];

export const GUARANTEES = [
  "never blocks a ticket from closing",
  "never attests in place of a human",
  "a derived link stays a proposal until confirmed",
  "never declares a criterion verifiable without proof",
  "never scores a person",
  "keeps no secret — a key is flagged before indexing",
];
export const LIMITS = [
  ["LLM generation is a stub", "src/ingest/llm.ts — rewording and free-text reading", "README.md", "src/ingest/llm.ts"],
  ["Certificate write to Confluence is refused", "publishCertificate → null, explicit refusal, manual export", "README.md", "publishCertificate"],
  ["Development environment uninstalled", "Forge SQL quota is shared per install; production stays", "README.md", "désinstallé"],
  ["The public demo runs the domain only", "src/domain/* in the browser — not the Forge integration", "README.md", "importe `src/domain/*`"],
  ["Under five criteria, the agent refuses to conclude", "rule of the Rovo agent prompt", "docs/SUBMISSION.md", "sous cinq critères"],
];
export const UNKNOWN = ["named persona", "brand hex / brand fonts", "developer console URL"];
