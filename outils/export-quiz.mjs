// Exporte les quiz des applis de séance vers l'appli de vote par téléphone (quiz.horizonduo.net).
// Usage : node outils/export-quiz.mjs ../horizonduo-formation-supabase/questions-cours.js
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = process.argv[2];
if (!out) { console.error("Chemin de sortie manquant."); process.exit(1); }

const SEANCES = [
  ["ia-communication", "B3 · Séance 1"], ["ia-communication-s2", "B3 · Séance 2"],
  ["ia-automatisation", "M1 · Séance 1"], ["ia-automatisation-s2", "M1 · Séance 2"],
  ["ia-productivite", "M2 · Séance 1"], ["ia-productivite-s2", "M2 · Séance 2"],
  ["concours-vente", "B1 · Concours · Séance 1"], ["concours-vente-s2", "B1 · Concours · Séance 2"],
  ["concours-vente-s3", "B1 · Concours · Séance 3"], ["concours-vente-s4", "B1 · Concours · Séance 4"],
  ["concours-vente-s5", "B1 · Concours · Séance 5"], ["concours-vente-s6", "B1 · Concours · Séance 6"]
];

function load(dir) {
  const html = readFileSync(join(ROOT, "apps", dir, "index.html"), "utf8");
  const ctx = { console }; ctx.window = ctx; vm.createContext(ctx);
  for (const m of html.matchAll(/<script src="([^"]+)"/g)) {
    if (m[1].includes("moteur/")) continue;
    vm.runInContext(readFileSync(normalize(join(ROOT, "apps", dir, m[1])), "utf8"), ctx);
  }
  return ctx.window.CONTENT;
}
// Les compléments qui citent un horaire de la séance ({heure:…}) varient selon la classe : on les retire.
const clean = (t) => (t || "").replace(/\s+/g, " ").trim();
const noVars = (t) => (t && !/\{[a-z0-9:_-]+\}/i.test(t) ? clean(t) : "");
const explain = (q) => [clean(q.explication), noVars(q.complement)].filter(Boolean).join(" ");

const db = {};
const add = (id, title, description, questions) => { if (questions.length) db[id] = { title, description, audience: title.split(" · ")[0], estimatedMinutes: Math.ceil(questions.length * 0.75), questions }; };

for (const [dir, label] of SEANCES) {
  if (!existsSync(join(ROOT, "apps", dir, "content.js"))) continue;
  const C = load(dir);
  const mcq = (arr, prefix, dur = 25) => (arr || []).filter((q) => q.options && q.bonne !== undefined).map((q, i) => ({
    id: `${dir}-${prefix}-${String(i + 1).padStart(2, "0")}`, type: "quiz", text: clean(q.q), options: q.options.map(clean),
    correct: q.bonne, duration: dur, ...(explain(q) ? { explanation: explain(q) } : {})
  }));
  if (C.positionnement) add(`cours-${dir}-positionnement`, `${label} · Quiz de positionnement`, "Dix questions, réponse individuelle : le résultat de la classe décide de la suite.", mcq(C.positionnement.questions, "position", 30));
  add(`cours-${dir}-video`, `${label} · Quiz de la vidéo`, "Questions de la vidéo de la séance. Vote individuel sur téléphone.", mcq(C.quizFlash, "video"));
  add(`cours-${dir}-battle`, `${label} · Battle finale`, "Questions sur toute la séance. Vote individuel sur téléphone.", mcq(C.battle, "battle", 20));
  if (C.iaHumain) add(`cours-${dir}-iahumain`, `${label} · IA ou humain ?`, "Regardez le visuel projeté, puis votez.",
    C.iaHumain.map((it, i) => ({ id: `${dir}-iahumain-${i + 1}`, type: "quiz", text: `${clean(it.legende)} : IA ou humain ?`, options: ["Généré par IA", "Fait par un humain"], correct: it.reponse === "ia" ? 0 : 1, duration: 20, explanation: clean(it.indice) })));
  if (C.quelleMarche && C.marches) add(`cours-${dir}-quellemarche`, `${label} · Quelle marche ?`, "Pour chaque tâche, choisissez la marche de l'escalier de l'autonomie.",
    C.quelleMarche.map((t, i) => ({ id: `${dir}-marche-${i + 1}`, type: "quiz", text: `Quelle marche pour : « ${clean(t.t)} » ?`, options: C.marches.map((m) => `${m.n}. ${clean(m.titre)}`), correct: t.m - 1, duration: 25, explanation: clean(t.why) })));
  if (C.vraiFaux) add(`cours-${dir}-vraifaux`, `${label} · Vrai ou faux`, "Droit, données, biais : vrai ou faux ?",
    C.vraiFaux.map((v, i) => ({ id: `${dir}-vf-${i + 1}`, type: "quiz", text: clean(v.s), options: ["Vrai", "Faux"], correct: v.v ? 0 : 1, duration: 20, explanation: clean(v.e) })));
}

const js = `// Généré automatiquement depuis les applis de séance (dépôt amos2026, outils/export-quiz.mjs). Ne pas modifier à la main.
window.quizDatabase = Object.assign(window.quizDatabase || {}, ${JSON.stringify(db, null, 2)});
`;
writeFileSync(out, js);
console.log(`✓ ${Object.keys(db).length} quiz, ${Object.values(db).reduce((a, q) => a + q.questions.length, 0)} questions → ${out}`);
