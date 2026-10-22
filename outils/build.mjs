// =========================================================================
// BUILD DE LA BOX — génère le site publié dans dist/
//   node outils/build.mjs
//
// Les codes des classes viennent, dans l'ordre :
//   1. de la variable d'environnement BOX_CODES (sur Netlify)
//   2. du fichier local codes.json (jamais versionné, voir codes.exemple.json)
// Format : { "2026-2027": { "b3b": "GZM72E", ... } }
//
// Chaque classe reçoit un fichier de contenu nommé d'après l'empreinte de son
// code : sans le code, impossible de deviner l'adresse du fichier.
// =========================================================================
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const SEL = "amos-box|";

export const fileId = (annee, code) =>
  createHash("sha256").update(`${SEL}${annee}|${String(code).trim().toUpperCase()}`).digest("hex").slice(0, 40);

function readCodes() {
  if (process.env.BOX_CODES) return JSON.parse(process.env.BOX_CODES);
  const f = join(ROOT, "codes.json");
  if (existsSync(f)) return JSON.parse(readFileSync(f, "utf8"));
  console.error("✗ Codes introuvables : définir BOX_CODES (Netlify) ou créer codes.json (voir codes.exemple.json).");
  process.exit(1);
}

const codes = readCodes();

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
cpSync(join(ROOT, "site"), DIST, { recursive: true });
cpSync(join(ROOT, "apps"), join(DIST, "apps"), { recursive: true });
if (existsSync(join(ROOT, "ressources"))) cpSync(join(ROOT, "ressources"), join(DIST, "ressources"), { recursive: true });

const annees = readdirSync(join(ROOT, "contenu")).filter((f) => /^\d{4}-\d{4}\.mjs$/.test(f)).map((f) => f.replace(".mjs", "")).sort();
const index = { annees: [], courante: null };

for (const annee of annees) {
  const D = (await import(pathToFileURL(join(ROOT, "contenu", `${annee}.mjs`)).href)).default;
  const out = join(DIST, "data", annee);
  mkdirSync(out, { recursive: true });
  const pub = { annee, intervenant: D.intervenant, archive: D.archive || null, classes: {} };

  for (const [k, cl] of Object.entries(D.classes)) {
    const code = codes[annee] && codes[annee][k];
    if (!code) { console.error(`✗ ${annee} : pas de code pour la classe ${k}.`); process.exit(1); }
    const seances = [...cl.seances].sort((a, b) => (a.date + a.heure).localeCompare(b.date + b.heure));
    const usedCours = [...new Set(seances.map((s) => s.cours))];
    const cours = Object.fromEntries(usedCours.map((c) => [c, D.cours[c]]));
    const usedOutils = [...new Set(usedCours.flatMap((c) => D.cours[c].outils || []))];
    const outils = Object.fromEntries(usedOutils.map((o) => [o, D.outils[o]]).filter(([, v]) => v));

    // Public : de quoi afficher le dossard et les dates des séances, rien de plus
    pub.classes[k] = {
      label: cl.label, niveau: cl.niveau, programme: cl.programme,
      cours: usedCours.map((c) => D.cours[c].titre),
      dates: seances.map((s) => ({ date: s.date, heure: s.heure }))
    };
    // Privé : tout le contenu de la classe
    const priv = { annee, k, cours, outils, seances };
    writeFileSync(join(out, `${fileId(annee, code)}.js`), `window.__BOX_CLASSE = ${JSON.stringify(priv)};\n`);
  }
  writeFileSync(join(out, "public.js"), `window.__BOX_PUBLIC = window.__BOX_PUBLIC || {};\nwindow.__BOX_PUBLIC[${JSON.stringify(annee)}] = ${JSON.stringify(pub)};\n`);
  index.annees.push(annee);
  console.log(`✓ ${annee} : ${Object.keys(D.classes).length} classes`);
}
index.courante = index.annees[index.annees.length - 1];
writeFileSync(join(DIST, "data", "annees.js"), `window.__BOX_ANNEES = ${JSON.stringify(index)};\n`);
console.log(`✓ Site généré dans dist/ (année courante : ${index.courante})`);
