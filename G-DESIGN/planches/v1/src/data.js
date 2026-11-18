// Trame planches v1 — every number traces to a repo file (data-src), per socle 09 §4.
export const meta = {
  name: "Trame",
  tagline: "the coverage of your acceptance criteria",
  slogan: "le fil qui manque",
  sloganEn: "the thread that is missing",
  badge: "Codegeist 2026 · Apps for Software Teams",
  repo: "https://github.com/Tradoooo/trame",
  demo: "https://tradoooo.github.io/trame/",
};

export const facts = [
  { id: "criteria", label: "acceptance criteria woven (6 tickets × 4)", value: "24", src: "docs/CAPTURES.md" },
  { id: "verifiable", label: "verifiable criteria", value: "18", src: "docs/CAPTURES.md" },
  { id: "covered", label: "covered — declared, on 18 verifiable", value: "13/18", src: "docs/CAPTURES.md" },
  { id: "unfalsifiable", label: "unfalsifiable, counted apart", value: "4", src: "docs/CAPTURES.md" },
  { id: "provisional", label: "provisional coverage", value: "1", src: "docs/CAPTURES.md" },
  { id: "tests", label: "tests green, test files", value: "455", extra: "53 files", src: "README.md" },
  { id: "lint", label: "forge lint", value: "0", extra: "errors, 4 warnings", src: "docs/SUBMISSION.md" },
  { id: "version", label: "app in production", value: "v2.1.0", src: "README.md" },
  { id: "mcp", label: "MCP tools + 4 internal actions", value: "14", src: "README.md" },
  { id: "screens", label: "real screens", value: "11", src: "README.md" },
  { id: "tables", label: "Forge SQL tables", value: "15", src: "src/db/schema.ts" },
  { id: "perms", label: "permissions, of which 10 read:graph:*", value: "18", src: "docs/SUBMISSION.md" },
  { id: "sites", label: "criterion nests (gîtes)", value: "6", src: "README.md" },
  { id: "links", label: "linking paths", value: "4", src: "README.md" },
  { id: "jql", label: "JQL functions", value: "4", src: "README.md" },
  { id: "recipe", label: "acceptance checkpoints §24", value: "20", src: "docs/RECETTE.md" },
];

export const guarantees = [
  "Never blocks ticket closure — it shows and proposes",
  "Never attests on behalf of a human",
  "A derived link stays a proposal until confirmed",
  "Never declares a criterion verifiable without proof",
  "No per-person scoring, ever",
  "Stores no secrets",
];

export const limits = [
  { name: "LLM generation", detail: "reformulation & free-text reading — src/ingest/llm.ts returns notImplemented", src: "README.md" },
  { name: "Certificate in Confluence", detail: "connector refuses to write (publishCertificate → null); manual export", src: "README.md" },
  { name: "Agent refuses below 5 criteria", detail: "no conclusion under five criteria", src: "docs/SUBMISSION.md" },
];

export const steps = [
  { n: 1, t: "Collect criteria", d: "six nests: description, field, table, attachment, Confluence, test ticket", c: "src/collect/" },
  { n: 2, t: "Normalize & fingerprint", d: "stable id AC-n + content fingerprint", c: "src/collect/{normalize,fingerprint}.ts" },
  { n: 3, t: "Ingest verification acts", d: "Jira, Confluence, Bitbucket, comments, pipelines, Graph", c: "src/ingest/" },
  { n: 4, t: "Probe rights & data", d: "no-right ≠ no-data ≠ no-test", c: "src/ingest/probe" },
  { n: 5, t: "Link criterion ↔ act", d: "4 paths, incl. explicit mention & PROJ-12. convention", c: "src/domain/links.ts" },
  { n: 6, t: "Compute coverage", d: "three axes never merged: strength, linkage, freshness", c: "src/domain/coverage.ts" },
  { n: 7, t: "Detect anomalies", d: "holes, perforations, dangling threads, unfalsifiables", c: "src/domain/{holes,perforations,dangling}.ts" },
  { n: 8, t: "Propose & publish", d: "human-validated queue, bulletin, certificate, UI Kit 2", c: "src/actions/ + src/ui/" },
];

export const demoWeave = {
  // 6 tickets × 4 criteria = 24 cells; states match docs/CAPTURES.md story
  rows: [
    ["strong", "declared", "hole", "falsif"],
    ["strong", "strong", "declared", "falsif"],
    ["perf", "strong", "declared", "falsif"],
    ["strong", "declared", "declared", "falsif"],
    ["strong", "strong", "strong", "falsif"],
    ["declared", "strong", "declared", "falsif"],
  ],
  ids: ["AC-1", "AC-2", "AC-3", "AC-4"],
  tickets: ["PROJ-11", "PROJ-12", "PROJ-13", "PROJ-14", "PROJ-15", "PROJ-16"],
};
