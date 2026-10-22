// =========================================================================
// GÉNÉRATEUR DES PDF DE COURS — à partir des content.js des applis
//   node outils/pdf/generer.mjs                  → PDF étudiants dans apps/<appli>/ressources/
//   node outils/pdf/generer.mjs --intervenant D  → en plus, le pack intervenant (corrigés,
//                                                  cartes de profil) dans le dossier D, HORS du dépôt
// Le contenu vient des applis : modifier une appli puis relancer suffit.
// Nécessite Playwright (Chromium).
// =========================================================================
import vm from "node:vm";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const APPS = join(ROOT, "apps");
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require("playwright")); }
catch (e) { ({ chromium } = require(join(execSync("npm root -g").toString().trim(), "playwright"))); }

/* ---------- Chargement des contenus (même logique que le navigateur) ---------- */
function load(files, classe) {
  const ctx = { window: {} }; vm.createContext(ctx);
  for (const f of files) {
    vm.runInContext(readFileSync(join(APPS, f), "utf8"), ctx);
    if (ctx.window.KN) ctx.KN = ctx.window.KN;
  }
  const raw = ctx.window.CONTENT, cfg = raw.config;
  const ov = classe && cfg.classes && cfg.classes[classe];
  const vars = Object.assign({}, cfg.variables || {}, (ov && ov.variables) || {});
  let json = JSON.stringify(raw);
  json = json.replace(/\{heure:[a-z0-9_-]+\}/gi, "pendant la séance");
  json = json.replace(/\{([a-z0-9_-]+)\}/gi, (s, k) => (k in vars ? String(vars[k]).replace(/"/g, '\\"') : s));
  return JSON.parse(json);
}
const C = {
  b3s1: load(["ia-communication/content.js"]),
  b3s2: load(["ia-communication-s2/content.js"]),
  m1s1: load(["ia-automatisation/content.js"], "m1a"),
  m1s2: load(["ia-automatisation-s2/content.js"], "m1a"),
  m2s1: load(["ia-productivite/content.js"]),
  m2s2: load(["ia-productivite/content.js", "ia-productivite-s2/content.js"]),
  b1s1: load(["concours-vente/commun.js", "concours-vente/content.js"], "b1a"),
  b1s4: load(["concours-vente/commun.js", "concours-vente-s4/content.js"], "b1a"),
  b1s6: load(["concours-vente/commun.js", "concours-vente-s6/content.js"], "b1a")
};

/* ---------- Petits outils HTML ---------- */
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const h2 = (t) => `<h2>${esc(t)}</h2>`;
const h3 = (t) => `<h3>${esc(t)}</h3>`;
const p = (t, cls = "") => (t ? `<p class="${cls}">${esc(t)}</p>` : "");
const li = (x) => `<li>${Array.isArray(x) ? `<strong>${esc(x[0])}</strong> ${esc(x[1])}` : esc(x)}</li>`;
const ul = (a, cls = "") => `<ul class="${cls}">${a.map(li).join("")}</ul>`;
const ol = (a) => `<ol>${a.map(li).join("")}</ol>`;
const kv = (pairs) => `<table class="kv">${pairs.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}</table>`;
const table = (head, rows, opt = {}) => `<table class="grid ${opt.cls || ""}">${head ? `<thead><tr>${head.map((h, i) => `<th${opt.w && opt.w[i] ? ` style="width:${opt.w[i]}"` : ""}>${esc(h)}</th>`).join("")}</tr></thead>` : ""}<tbody>${rows.map((r) => `<tr${r.cls ? ` class="${r.cls}"` : ""}>${(r.cells || r).map((c) => `<td>${c && c.html ? c.html : esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const note = (t) => (t ? `<div class="note">${esc(t)}</div>` : "");
const lines = (n) => `<div class="lines">${"<span></span>".repeat(n)}</div>`;
const card = (title, sub, body) => `<div class="card"><div class="card-h"><strong>${esc(title)}</strong>${sub ? `<span>${esc(sub)}</span>` : ""}</div>${body}</div>`;
const fiches = (items) => items.map((f) => card(`${f.sigle ? f.sigle + " · " : ""}${f.titre}`, f.sous, `${f.points ? ul(f.points) : ""}${f.exemple ? `<p class="ex">${esc(f.exemple)}</p>` : ""}`)).join("");
const bareme = (rows, noteTxt) => {
  const tot = rows.reduce((a, b) => a + (b.p || 0), 0);
  return table(["Critère", "Points"], rows.map((b) => (b.g ? { cls: "grp", cells: [b.g, ""] } : [b.c, String(b.p)])).concat([{ cls: "tot", cells: ["Total", String(tot)] }]), { w: ["", "70px"], cls: "bareme" }) + note(noteTxt);
};
const glossaire = (g) => table(["Terme", "Définition"], g.map(([t, d]) => [t, d]), { w: ["28%", ""] });
const prompts5 = (Cx) => h2("Le prompt en 5 blocs") + p(Cx.blocsNote) + table(["Bloc", "La question à se poser", "Exemple"], Cx.blocs.map((b) => [b.nom, b.aide, b.ex]), { w: ["14%", "28%", ""] })
  + h2("Le premier jet n'est jamais le livrable") + table(["Version", "Prompt", "Ce qui ne va pas"], Cx.iterations.map((i) => [i.v, i.prompt, i.probleme]), { w: ["10%", "45%", ""] })
  + h2("Cinq techniques d'itération") + ul(Cx.techniques.map((t) => [t.t + " :", t.d]));
const chaine = (K) => p(K.intro) + table(["Étape", "Rôle", "Prompt type"], K.etapes.map((e, i) => [`${i + 1}. ${e.titre}`, e.role, e.prompt]), { w: ["14%", "22%", ""] }) + p(K.note, "muted")
  + (K.principes ? h2(K.principesTitre || "Les règles") + ul(K.principes.map((x) => [x.t + " :", x.d])) : "");
const charteBlock = (ch) => `<div class="sw">${ch.couleurs.map(([n, h]) => `<span><i style="background:${h}"></i>${esc(n)} <em>${h}</em></span>`).join("")}</div>` + kv([["Ton", ch.ton], ["Valeurs", ch.valeurs.join(", ")], ["À éviter", ch.interdits.join(", ")]]);
const cibles = (c) => table(["Cible", "Ce qu'il faut savoir"], c.map((x) => [x.nom, x.d]), { w: ["28%", ""] });
const auditTexte = (A, corrige) => `<div class="doc"><div class="doc-t">${esc(A.titreDoc)}</div>${A.texte.map((para) => `<p>${para.map((s) => (typeof s === "string" ? esc(s) : corrige ? `<mark>${esc(s.t)}<sup>${s.e + 1}</sup></mark>` : esc(s.t))).join("")}</p>`).join("")}</div>`;
const auditCorrige = (A) => auditTexte(A, true) + table(["N°", "Erreur", "Explication"], A.erreurs.map((e, i) => [String(i + 1), e.titre, e.explication]), { w: ["6%", "24%", ""] }) + note(A.lecon);

/* ---------- Gabarit de page ---------- */
const FONTS = pathToFileURL(join(APPS, "moteur", "fonts")).href;
const LOGO = pathToFileURL(join(APPS, "moteur", "assets", "logo-amos.png")).href;
function page({ cours, classe, titre, sous, body, interne }) {
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>
@font-face{font-family:BS;font-weight:800;src:url(${FONTS}/big-shoulders-display-latin-800-normal.woff2)}
@font-face{font-family:BS;font-weight:900;src:url(${FONTS}/big-shoulders-display-latin-900-normal.woff2)}
@font-face{font-family:AH;font-weight:400;src:url(${FONTS}/atkinson-hyperlegible-latin-400-normal.woff2)}
@font-face{font-family:AH;font-weight:400;font-style:italic;src:url(${FONTS}/atkinson-hyperlegible-latin-400-italic.woff2)}
@font-face{font-family:AH;font-weight:700;src:url(${FONTS}/atkinson-hyperlegible-latin-700-normal.woff2)}
@page{size:A4;margin:16mm 15mm 18mm}
*{box-sizing:border-box}
body{font:10.5pt/1.45 AH,sans-serif;color:#13241E;margin:0}
.top{display:flex;align-items:center;gap:14px;border-bottom:3px solid #008B57;padding-bottom:10px;margin-bottom:14px}
.top img{height:34px}
.top .c{font:800 11pt/1.1 BS,sans-serif;text-transform:uppercase;letter-spacing:.04em;color:#2C675B}
.top .c small{display:block;font:400 8.5pt AH,sans-serif;text-transform:none;letter-spacing:0;color:#536A61}
.top .tag{margin-left:auto;background:${interne ? "#B5452B" : "#008B57"};color:#fff;font:800 9pt BS,sans-serif;text-transform:uppercase;letter-spacing:.05em;padding:3px 9px;border-radius:4px}
h1{font:900 26pt/1 BS,sans-serif;text-transform:uppercase;margin:6px 0 4px;color:#0B1512}
.sous{color:#536A61;margin:0 0 12px;font-size:11pt}
h2{font:900 15pt/1.1 BS,sans-serif;text-transform:uppercase;color:#008B57;margin:16px 0 6px;break-after:avoid}
h3{font:800 12pt/1.1 BS,sans-serif;text-transform:uppercase;margin:12px 0 4px;break-after:avoid}
p{margin:0 0 7px} ul,ol{margin:0 0 8px;padding-left:18px} li{margin:2px 0}
.muted{color:#536A61;font-style:italic}
table{width:100%;border-collapse:collapse;margin:4px 0 10px;break-inside:auto}
tr{break-inside:avoid}
.grid th{background:#E5F4E4;text-align:left;font:800 10pt BS,sans-serif;text-transform:uppercase;letter-spacing:.03em;padding:5px 7px;border:1px solid #B9D6C3}
.grid td{padding:5px 7px;border:1px solid #CFDDD5;vertical-align:top}
.grid tr.grp td{background:#F0F6F2;font-weight:700;color:#2C675B}
.grid tr.tot td{font-weight:700;border-top:2px solid #008B57}
.bareme td:last-child{text-align:center;font:900 13pt BS,sans-serif;color:#008B57}
.kv th{width:30%;text-align:left;vertical-align:top;padding:4px 8px 4px 0;color:#2C675B;border-bottom:1px solid #E1EAE5}
.kv td{padding:4px 0;border-bottom:1px solid #E1EAE5}
.note{border-left:4px solid #FFC93C;background:#FFF8E5;padding:7px 10px;margin:6px 0 10px;font-size:10pt}
.card{border:1px solid #CFDDD5;border-radius:6px;padding:8px 11px;margin:0 0 9px;break-inside:avoid}
.card-h{display:flex;gap:10px;align-items:baseline;margin-bottom:4px}
.card-h strong{font:800 12.5pt BS,sans-serif;text-transform:uppercase;color:#0B1512}
.card-h span{color:#536A61;font-size:9.5pt}
.ex{background:#F0F6F2;padding:5px 8px;border-radius:4px;font-style:italic;margin:4px 0 0}
.sw{display:flex;flex-wrap:wrap;gap:12px;margin:4px 0 8px} .sw span{display:flex;align-items:center;gap:5px;font-size:9.5pt}
.sw i{width:18px;height:18px;border-radius:3px;border:1px solid #999;display:inline-block} .sw em{color:#536A61}
.lines span{display:block;border-bottom:1px solid #9FB3AA;height:22px}
.fill td{height:52px}
.doc{border:1px solid #CFDDD5;padding:10px 14px;border-radius:6px;margin:6px 0 12px;background:#FBFCFB}
.doc-t{font:800 12pt BS,sans-serif;text-transform:uppercase;margin-bottom:6px;color:#2C675B}
mark{background:#FFE3DC;padding:0 2px} sup{color:#B5452B;font-weight:700}
.cartes{display:grid;grid-template-columns:1fr 1fr;gap:0}
.carte{border:1.5px dashed #888;padding:14px;min-height:62mm;break-inside:avoid;display:flex;flex-direction:column;gap:6px}
.carte b{font:900 22pt BS,sans-serif;text-transform:uppercase;color:#14213D}
.carte .k{font:800 9pt BS,sans-serif;text-transform:uppercase;color:#B5452B;letter-spacing:.05em}
.carte.obj{min-height:38mm;justify-content:center} .carte.obj p{font:800 14pt/1.15 BS,sans-serif}
.pb{break-before:page}
.check td:first-child{width:22px;text-align:center;font-size:13pt}
</style></head><body>
<div class="top"><img src="${LOGO}" alt="AMOS"><div class="c">${esc(cours)}<small>${esc(classe)}</small></div><span class="tag">${interne ? "Intervenant" : "Ressource"}</span></div>
<h1>${esc(titre)}</h1>${sous ? `<p class="sous">${esc(sous)}</p>` : ""}
${body}
</body></html>`;
}

/* ---------- Les documents ---------- */
const B3 = "B3 Bachelor marketing, commercial & événementiel sport", M1 = "M1 Mastère Management du Sport", M2 = "M2 Mastère Management du Sport, Marketing & Communication", B1 = "B1 Bachelor marketing, commercial & événementiel sport";
const KN = C.b1s1;
const DOCS = [
  /* --- B3, séance 1 --- */
  { app: "ia-communication", f: "fiche-methode-prompt.pdf", cours: "IA appliquée à la communication", classe: B3, titre: "Le prompt en 5 blocs", sous: "Fiche méthode, séance 1",
    body: () => prompts5(C.b3s1) + h2("À retenir") + ul(C.b3s1.aRetenir) },
  { app: "ia-communication", f: "dossier-client-citanuit.pdf", cours: "IA appliquée à la communication", classe: B3, titre: "Dossier client CITANUIT", sous: C.b3s1.client.accroche,
    body: () => { const c = C.b3s1.client; return note(c.avertissement) + h2("La commande") + kv(c.fiche) + h2(c.objectifsTitre || "Objectifs") + ul(c.objectifs) + h2("Les cibles") + cibles(c.cibles) + h2("La charte") + charteBlock(c.charte) + h2("Le travail") + ul(c.travail.map((w) => [w.t + " :", w.d])) + p(c.etape) + p(c.seance2); } },
  { app: "ia-communication", f: "grille-evaluation.pdf", cours: "IA appliquée à la communication", classe: B3, titre: "Grille d'évaluation", sous: "Note unique sur 20, en fin de séance 2",
    body: () => bareme(C.b3s1.client.bareme, C.b3s1.client.baremeNote) },
  { app: "ia-communication", f: "glossaire.pdf", cours: "IA appliquée à la communication", classe: B3, titre: "Glossaire", sous: "Les mots de la séance 1",
    body: () => glossaire(C.b3s1.glossaire) },
  { app: "ia-communication", f: "sources-seance-1.pdf", cours: "IA appliquée à la communication", classe: B3, titre: "Sources et actus", sous: "Ce qui a changé en 2026, avec les sources",
    body: () => C.b3s1.actus.map((a) => card(`${a.date} · ${a.titre}`, a.tag, `${p(a.texte)}<p class="muted">Source : ${esc(a.srcNom || "")} — ${esc(a.src)}</p>`)).join("") },
  /* --- B3, séance 2 --- */
  { app: "ia-communication-s2", f: "fiche-prompt-visuel.pdf", cours: "IA appliquée à la communication", classe: B3, titre: "Le prompt visuel", sous: "Fiche méthode, séance 2",
    body: () => prompts5(C.b3s2) + h2("Les outils") + fiches(C.b3s2.outilsVisuels.items) },
  { app: "ia-communication-s2", f: "brief-mini-kit.pdf", cours: "IA appliquée à la communication", classe: B3, titre: "Brief du mini-kit CITANUIT", sous: "Ce que le client attend en fin de séance 2",
    body: () => { const c = C.b3s2.client; return note(c.avertissement) + h2("Le brief") + kv(c.fiche) + h2("Les livrables") + table(["Livrable", "Attendu"], c.travail.map((w) => [w.t, w.d]), { w: ["24%", ""] }) + h2("La charte") + charteBlock(c.charte) + h2("Les cibles") + cibles(c.cibles) + h2("La grille") + bareme(c.bareme, c.baremeNote); } },
  { app: "ia-communication-s2", f: "checklist-visuel-ia.pdf", cours: "IA appliquée à la communication", classe: B3, titre: "Valider un visuel IA", sous: "Check-list à passer avant de montrer un visuel au client",
    body: () => { const ch = C.b3s2.client.charte; const rows = [
      "Couleurs et ambiance de la charte : " + ch.couleurs.map((x) => x[0]).join(", ") + ".",
      "Ton : " + ch.ton,
      "Aucun texte généré dans l'image : titre et infos pratiques ajoutés en mise en page.",
      "Aucun logo de marque, aucune personne réelle reconnaissable.",
      "Diversité vérifiée : âges, genres, corps. Pas de corps stéréotypés.",
      "Aucune promesse de performance, aucun jargon de coureur.",
      "Le visuel n'est pas présenté comme une photo de l'événement réel.",
      "Mention « visuel créé avec l'IA » quand il pourrait tromper (AI Act, article 50).",
      "Le format correspond au support : 4:5 ou carré pour un post, 9:16 pour une story.",
      "Le prompt final est noté dans le journal, avec ce qui a été corrigé."];
      return table(["✓", "Point de contrôle"], rows.map((r) => ["☐", r]), { cls: "check" }) + h2("Exemples : conforme ou à corriger ?") + table(["Visuel ou texte", "Verdict", "Pourquoi"], C.b3s2.coherence.items.map((i) => [i.t, i.cat === "ok" ? "Conforme" : "À corriger", i.why]), { w: ["42%", "14%", ""] }); } },
  /* --- M1, séance 1 --- */
  { app: "ia-automatisation", f: "fiche-prompt-pro.pdf", cours: "IA et automatisation", classe: M1, titre: "Le prompt professionnel", sous: "Fiche méthode, séance 1",
    body: () => prompts5(C.m1s1) + `<div class="pb"></div>` + h2("La chaîne de prompts") + chaine(C.m1s1.chaine) },
  { app: "ia-automatisation", f: "appel-offres-lys-padel-open.pdf", cours: "IA et automatisation", classe: M1, titre: "Appel d'offres Lys Padel Open", sous: C.m1s1.client.accroche,
    body: () => { const c = C.m1s1.client; return note(c.avertissement) + h2("Le client et sa demande") + kv(c.fiche) + h2(c.objectifsTitre || "Les objectifs") + ul(c.objectifs) + h2("Les publics") + cibles(c.cibles) + h2("L'identité") + charteBlock(c.charte) + h2("Ce que votre agence remet") + table(["Livrable", "Attendu"], c.travail.map((w) => [w.t, w.d]), { w: ["26%", ""] }) + p(c.etape) + p(c.seance2) + h2("Critères d'évaluation") + bareme(c.bareme, c.baremeNote); } },
  { app: "ia-automatisation", f: "grille-participation.pdf", cours: "IA et automatisation", classe: M1, titre: "Grille de participation", sous: "Évaluation par la participation, sur les deux séances",
    body: () => bareme(C.m1s1.client.bareme, C.m1s1.client.baremeNote) },
  { app: "ia-automatisation", f: "glossaire.pdf", cours: "IA et automatisation", classe: M1, titre: "Glossaire", sous: "Les mots du module",
    body: () => glossaire(C.m1s1.glossaire.concat(C.m1s2.glossaire.filter(([t]) => !C.m1s1.glossaire.some(([u]) => u === t)))) },
  /* --- M1, séance 2 --- */
  { app: "ia-automatisation-s2", f: "fiche-veille.pdf", cours: "IA et automatisation", classe: M1, titre: "La veille augmentée", sous: "Fiche méthode, séance 2",
    body: () => p(C.m1s2.veille.intro) + fiches(C.m1s2.veille.items) + h2("Que faut-il automatiser ?") + table(["Tâche", "Verdict", "Pourquoi"], C.m1s2.automatisable.items.map((i) => [i.t, (C.m1s2.automatisable.categories.find((c) => c.k === i.cat) || {}).label || i.cat, i.why]), { w: ["40%", "18%", ""] }) },
  { app: "ia-automatisation-s2", f: "modele-flux.pdf", cours: "IA et automatisation", classe: M1, titre: "Dessiner un flux", sous: "Déclencheur, actions, filtre, validation humaine",
    body: () => { const F = C.m1s2.flux; return p(F.intro) + h2("Exemple : la veille du lundi") + table(["Étape", "Rôle", "Ce que fait le flux"], F.etapes.map((e) => [e.titre, e.role, e.prompt]), { w: ["16%", "22%", ""] }) + h2(F.principesTitre) + ul(F.principes.map((x) => [x.t + " :", x.d])) + `<div class="pb"></div>` + h2("Votre flux") + kv([["Agence", ""], ["Objectif du flux", ""]]) + table(["Étape", "Ce que fait le flux", "Outil"], [["Déclencheur", "", ""], ["Action 1", "", ""], ["Action 2", "", ""], ["Filtre", "", ""], ["Validation humaine", "", ""], ["Envoi ou publication", "", ""]], { cls: "fill", w: ["22%", "", "20%"] }) + h3("Données personnelles : où passent-elles ?") + lines(3) + h3("Qu'est-ce qui pourrait mal tourner ?") + lines(3); } },
  /* --- M2, séance 1 --- */
  { app: "ia-productivite", f: "fiche-chaine-prompts.pdf", cours: "IA et productivité", classe: M2, titre: "La chaîne de prompts", sous: "Fiche méthode, séance 1",
    body: () => chaine(C.m2s1.chaine) + h2("La frontière irrégulière") + p(C.m2s1.frontiere.faitsNote) + table(["Chiffre", "Ce qu'il dit"], C.m2s1.frontiere.faits.map((f) => [f.chiffre, f.texte]), { w: ["26%", ""] }) + p(`Source : ${C.m2s1.frontiere.source.nom} — ${C.m2s1.frontiere.source.url}`, "muted") + h2("À retenir") + ul(C.m2s1.aRetenir) },
  { app: "ia-productivite", f: "dossier-nordval.pdf", cours: "IA et productivité", classe: M2, titre: "Dossier Olympique Nordval", sous: C.m2s1.client.accroche,
    body: () => { const c = C.m2s1.client; return note(c.avertissement) + h2("Le club") + kv(c.fiche) + h2(c.contexteTitre) + ul(c.contexte.map((x) => `${x.t} (${x.nom} — ${x.src})`)) + h2(c.objectifsTitre) + ul(c.objectifs) + h2("Les parties prenantes") + cibles(c.cibles) + h2("Identité et contraintes") + charteBlock(c.charte) + h2("Le travail") + ul(c.travail.map((w) => [w.t + " :", w.d])) + p(c.etape) + p(c.seance2); } },
  { app: "ia-productivite", f: "grille-evaluation.pdf", cours: "IA et productivité", classe: M2, titre: "Grille d'évaluation", sous: "Note unique sur 20, en fin de séance 2",
    body: () => bareme(C.m2s1.client.bareme, C.m2s1.client.baremeNote) },
  { app: "ia-productivite", f: "glossaire.pdf", cours: "IA et productivité", classe: M2, titre: "Glossaire", sous: "Les mots du module",
    body: () => glossaire(C.m2s2.glossaire) },
  /* --- M2, séance 2 --- */
  { app: "ia-productivite-s2", f: "fiche-modelisation.pdf", cours: "IA et productivité", classe: M2, titre: "Modéliser un scénario avec l'IA", sous: "Fiche méthode, séance 2",
    body: () => chaine(C.m2s2.modele) + h2("Les trois pièges") + ul([["Double comptage :", "les mêmes personnes comptées sur plusieurs canaux."], ["Montée en charge oubliée :", "aucun produit n'atteint son rythme de croisière le premier mois."], ["Coûts oubliés :", "un revenu n'est pas un résultat."]]) + note(C.m2s2.audit.lecon) },
  { app: "ia-productivite-s2", f: "modele-charte-ia.pdf", cours: "IA et productivité", classe: M2, titre: "Charte d'usage de l'IA", sous: "Modèle à remplir : une page, des règles précises et vérifiables",
    body: () => p(C.m2s2.charte.intro) + kv([["Équipe", ""], ["Date et version", ""], ["Référent IA", ""]]) + C.m2s2.charte.blocs.map((b) => h3(b.nom) + p(b.aide + ". Exemple : " + b.ex, "muted") + lines(3)).join("") },
  /* --- B1, concours de vente --- */
  { app: "concours-vente", f: "fiches-methode.pdf", cours: "Concours de vente", classe: B1, titre: "Les méthodes de vente", sous: "AIDA, SONCAS, CAB, découverte, objections",
    body: () => fiches(KN.methodes.items) + h2("Glossaire") + glossaire(KN.glossaire) },
  { app: "concours-vente", f: "sujet-kilometre-nord.pdf", cours: "Concours de vente", classe: B1, titre: "Le défi Kilomètre Nord", sous: "Sujet du concours de vente",
    body: () => { const c = KN.client, M = c.marge; return note(c.avertissement) + h2("L'enseigne") + kv(c.fiche) + h2(c.objectifsTitre) + ul(c.objectifs) + h2("Ses clients") + cibles(c.cibles) + h2("Fiche de marge") + p(M.intro) + table(M.colonnes, M.lignes) + ul(M.regles) + note(M.note) + h2("Votre travail") + ul(c.travail.map((w) => [w.t + " :", w.d])) + h2("La soutenance") + ul(["15 minutes par équipe, le vendredi 27 novembre après-midi.", "Pitch de 2 minutes, puis 10 minutes de négociation avec l'acheteur, puis les questions du jury.", "Le profil de l'acheteur est tiré au sort ; une objection imposée tombe vers la 7e minute.", "Aucun support en dehors des livrables remis au jury."]) + h2("La note sur 20") + bareme(c.bareme, c.baremeNote); } },
  { app: "concours-vente", f: "grille-client-mystere.pdf", cours: "Concours de vente", classe: B1, titre: "Grille client mystère", sous: "Une grille par visite, à joindre au compte-rendu d'analyse terrain",
    body: () => { const T = C.b1s1.terrain; const etapes = T.items[1].points; return kv([["Équipe et visiteur", ""], ["Magasin (type d'enseigne, ville)", ""], ["Date et heure", ""], ["Mon scénario de client", ""]]) + table(["Étape", "Ce que j'observe", "Ce qui marche", "À améliorer"], etapes.map((x) => [`${x[0]} ${x[1]}`, "", "", ""]), { cls: "fill", w: ["28%", "", "", ""] }) + h3("L'objection que j'ai glissée, et la réponse du vendeur") + lines(3) + h3("Ce que cette visite change pour notre pitch") + lines(3) + h2("Les règles") + ul(T.items[3].points) + note(T.note); } },
  { app: "concours-vente", f: "grille-jury.pdf", cours: "Concours de vente", classe: B1, titre: "Grille du jury", sous: "Soutenance sur 14 points, commune à l'équipe",
    body: () => { const J = KN.jury; return table(["Critère", "Points", "Équipe 1", "Équipe 2", "Équipe 3", "Équipe 4", "Équipe 5"], J.criteres.map((c) => [c.c, String(c.p), "", "", "", "", ""]).concat([{ cls: "tot", cells: ["Total", "14", "", "", "", "", ""] }]), { cls: "fill", w: ["30%", "8%"] }) + note(J.note) + h2("Observations") + lines(8); } },
  { app: "concours-vente", f: "grille-auto-evaluation.pdf", cours: "Concours de vente", classe: B1, titre: "Grille d'auto-évaluation", sous: "La grille du jury, appliquée à votre équipe",
    body: () => { const A = C.b1s4.autoEval; const crit = A.blocs.filter((b) => b.k !== "priorites"); return p(A.intro) + kv([["Équipe", ""], ["Date", ""]]) + table(["Critère", "Note", "Une force", "À travailler"], crit.map((b) => [b.nom, "", "", ""]), { cls: "fill", w: ["26%", "10%", "", ""] }) + h3("Nos 3 priorités d'ici au concours") + lines(4) + p("Exemple : " + crit[1].ex, "muted"); } },
  { app: "concours-vente", f: "fiche-objections.pdf", cours: "Concours de vente", classe: B1, titre: "Traiter une objection", sous: "La méthode en cinq temps et sept techniques",
    body: () => fiches(C.b1s4.techniques.items) + h2("Les objections les plus probables") + ul(C.b1s4.duel.objections) },
  { app: "concours-vente", f: "note-reflexive.pdf", cours: "Concours de vente", classe: B1, titre: "La note réflexive", sous: "Individuelle, 4 points, rédigée en classe le jour du concours",
    body: () => p(C.b1s6.noteReflexive.intro.replace("Votre page de notes préparée ce matin est autorisée. Nom, prénom et équipe en haut de la feuille.", "Une page de notes personnelles, préparée le matin, est autorisée.")) + fiches(C.b1s6.noteReflexive.items) + h2("Ma page de notes (à préparer le matin)") + lines(14) }
];

/* ---------- Pack intervenant (jamais dans le dépôt) ---------- */
const INTERNE = [
  { f: "cartes-profils-soncas.pdf", cours: "Concours de vente", classe: B1, titre: "Cartes de l'acheteur", sous: "À imprimer et découper. Profils (5) puis objections",
    body: () => `<div class="cartes">${KN.pitch.cartes.map((c) => `<div class="carte"><span class="k">Profil de l'acheteur, à garder secret</span><b>${esc(c.nom)}</b><p>${esc(c.consigne)}</p><p class="muted">À révéler à la fin : ${esc(c.indices)}</p></div>`).join("")}</div><div class="pb"></div><div class="cartes">${C.b1s4.duel.objections.map((o) => `<div class="carte obj"><span class="k">Objection</span><p>${esc(o)}</p></div>`).join("")}</div>` },
  { f: "audit-m1-texte.pdf", cours: "IA et automatisation", classe: M1, titre: "Audit : le texte", sous: "Version à imprimer pour les agences",
    body: () => p(C.m1s1.audit.consigne) + auditTexte(C.m1s1.audit, false) + h3("Les erreurs que nous avons trouvées") + lines(10) },
  { f: "audit-m1-corrige.pdf", cours: "IA et automatisation", classe: M1, titre: "Audit : le corrigé", sous: "Intervenant", body: () => auditCorrige(C.m1s1.audit) },
  { f: "audit-m2-s1-texte.pdf", cours: "IA et productivité", classe: M2, titre: "Audit : le texte", sous: "Séance 1, version à imprimer pour les cellules",
    body: () => p(C.m2s1.audit.consigne) + auditTexte(C.m2s1.audit, false) + h3("Les erreurs que nous avons trouvées") + lines(10) },
  { f: "audit-m2-s1-corrige.pdf", cours: "IA et productivité", classe: M2, titre: "Audit : le corrigé", sous: "Séance 1. L'« étude Deloitte 2026 » est volontairement inventée.", body: () => auditCorrige(C.m2s1.audit) },
  { f: "audit-m2-s2-texte.pdf", cours: "IA et productivité", classe: M2, titre: "Audit d'un modèle : le texte", sous: "Séance 2, version à imprimer pour les cellules",
    body: () => p(C.m2s2.audit.consigne) + auditTexte(C.m2s2.audit, false) + h3("Les erreurs que nous avons trouvées") + lines(10) },
  { f: "audit-m2-s2-corrige.pdf", cours: "IA et productivité", classe: M2, titre: "Audit d'un modèle : le corrigé", sous: "Séance 2. L'« étude Statista » est volontairement vague.", body: () => auditCorrige(C.m2s2.audit) }
];

/* ---------- Impression ---------- */
const args = process.argv.slice(2);
const dirInterne = args.includes("--intervenant") ? args[args.indexOf("--intervenant") + 1] : null;
const browser = await chromium.launch();
const pg = await browser.newPage();
async function print(doc, out, interne) {
  // Fichier temporaire : depuis about:blank, Chromium refuse de charger les polices et le logo locaux
  const tmp = join(tmpdir(), `amos-pdf-${process.pid}.html`);
  writeFileSync(tmp, page({ ...doc, body: doc.body(), interne }));
  await pg.goto(pathToFileURL(tmp).href, { waitUntil: "load" });
  await pg.evaluate(() => document.fonts.ready);
  mkdirSync(dirname(out), { recursive: true });
  await pg.pdf({ path: out, format: "A4", printBackground: true, displayHeaderFooter: true, headerTemplate: "<span></span>",
    footerTemplate: `<div style="width:100%;font:8px sans-serif;color:#536A61;padding:0 15mm;display:flex;justify-content:space-between"><span>AMOS Sport Business School · ${esc(doc.cours)} · Frédéric Legrand · 2026-2027</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
    margin: { top: "16mm", bottom: "18mm", left: "15mm", right: "15mm" } });
  console.log("✓", out.replace(ROOT + "/", ""));
}
for (const d of DOCS) await print(d, join(APPS, d.app, "ressources", d.f), false);
if (dirInterne) for (const d of INTERNE) await print(d, join(dirInterne, d.f), true);
await browser.close();
