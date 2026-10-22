/* =========================================================================
   MOTEUR COMMUN DES APPLIS DE COURS — chaque cours fournit son index.html et son content.js
   ========================================================================= */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const LETTERS = ["A", "B", "C", "D", "E", "F"];

  /* ---------- Stockage local (facultatif, protégé) ---------- */
  let CLASSE = "";
  try { CLASSE = (new URLSearchParams(location.search).get("classe") || "").toLowerCase().replace(/[^a-z0-9]/g, ""); } catch (e) { /* ignoré */ }

  /* ---------- Adaptation à la classe (?classe=b3a) : date, horaires, textes ---------- */
  const C = (function prepare(raw) {
    const cfg = raw.config, ov = (cfg.classes && cfg.classes[CLASSE]) || null;
    if (ov) {
      if (ov.date) cfg.dateSeance = ov.date;
      cfg.classe = cfg.classe + ", " + CLASSE.toUpperCase();
      if (ov.debut) {   // horaires recalculés à partir de l'heure de début et des durées
        let [h, m] = ov.debut.split(":").map(Number), t = h * 60 + m;
        raw.parcours.forEach((p) => { p.heure = `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`; t += p.duree; });
      }
    }
    const vars = Object.assign({}, cfg.variables || {}, (ov && ov.variables) || {});
    raw.parcours.forEach((p) => (vars["heure:" + p.id] = p.heure.replace(":", "h")));
    const fin = (() => { const l = raw.parcours[raw.parcours.length - 1]; const [h, m] = l.heure.split(":").map(Number); const t = h * 60 + m + l.duree; return `${Math.floor(t / 60)}h${String(t % 60).padStart(2, "0")}`; })();
    vars.debut = raw.parcours[0].heure.replace(":", "h"); vars.fin = fin;
    const json = JSON.stringify(raw).replace(/\{([a-z0-9:_-]+)\}/gi, (s, k) => (k in vars ? String(vars[k]).replace(/"/g, '\\"') : s));
    return JSON.parse(json);
  })(window.CONTENT);
  const KEY = (C.config.id || "amos-cours") + (CLASSE ? "-" + CLASSE : "");   // une sauvegarde par classe (agences, scores, journal)
  const store = {
    load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } },
    save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* stockage indisponible */ } }
  };
  const saved = store.load();
  const S = {
    theme: saved.theme || "nuit",
    names: saved.names && saved.names.length === C.config.agences.length ? saved.names : C.config.agences.slice(),
    scores: saved.scores && saved.scores.length === C.config.agences.length ? saved.scores : C.config.agences.map(() => 0),
    journal: saved.journal || {},
    roster: saved.roster || [],
    members: saved.members && saved.members.length === C.config.agences.length ? saved.members : C.config.agences.map(() => []),
    animated: false
  };
  const persist = () => store.save({ theme: S.theme, names: S.names, scores: S.scores, journal: S.journal, roster: S.roster, members: S.members });

  const PAGES = C.parcours.map((p) => p.id);
  const EXTRA = ["ressources", "glossaire", "pitch"];

  /* ---------- Toast ---------- */
  let toastT;
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 1800);
  }

  /* ---------- En-tête ---------- */
  function initHeader() {
    $("#cours-titre").textContent = C.config.cours;
    $("#seance-label").textContent = `${C.config.seance}, ${C.config.classe}`;
    const img = $("#logo");
    img.onload = () => { img.hidden = false; $("#logo-fallback").hidden = true; };
    img.onerror = () => { img.hidden = true; };
    img.src = C.config.logo;
    applyTheme();
    $("#theme-btn").onclick = () => { S.theme = S.theme === "nuit" ? "jour" : "nuit"; applyTheme(); persist(); };
    $("#menu-btn").onclick = () => {
      const open = $("#rail").classList.toggle("open");
      $("#menu-btn").setAttribute("aria-expanded", open);
    };
  }
  function applyTheme() {
    document.documentElement.dataset.theme = S.theme;
    $("#theme-btn").textContent = S.theme === "nuit" ? "Jour" : "Nuit";
  }

  /* ---------- Scores des agences ---------- */
  function renderBibs() {
    const max = Math.max(...S.scores);
    $("#bibs").innerHTML = S.names.map((n, i) => `
      <button class="bib ${max > 0 && S.scores[i] === max ? "lead" : ""}" data-i="${i}" aria-label="${esc(n)} : ${S.scores[i]} points">
        <span class="bib-name">${esc(n)}</span><span class="bib-pts">${S.scores[i]}</span>
      </button>`).join("");
    $$("#bibs .bib").forEach((b) => (b.onclick = openAgences));
  }
  function addPoints(i, n) {
    S.scores[i] = Math.max(0, S.scores[i] + n); persist(); renderBibs();
    const b = $(`#bibs .bib[data-i="${i}"]`);
    if (b) { b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }
    toast(`${S.names[i]} : ${n > 0 ? "+" : ""}${n} point${Math.abs(n) > 1 ? "s" : ""}`);
    if ($(".podium")) renderPodium();
    refreshEditScores();
  }
  function awardRow(label = "Point pour") {
    return `<div class="award"><span>${label} :</span>${S.names.map((n, i) => `<button class="btn small" data-award="${i}">${esc(n)} +1</button>`).join("")}</div>`;
  }
  function bindAward(root) {
    $$("[data-award]", root).forEach((b) => (b.onclick = () => addPoints(+b.dataset.award, +(b.dataset.pts || 1))));
  }
  function openAgences() {
    const d = $("#agences-dialog");
    $("#agences-edit").innerHTML = S.names.map((n, i) => `
      <div class="edit-row">
        <input value="${esc(n)}" data-name="${i}" aria-label="Nom de l'équipe ${i + 1}">
        <div class="score-ctl">
          <button type="button" class="icon-btn" data-sc="${i}" data-d="-1" aria-label="Retirer un point">−</button>
          <output data-out="${i}">${S.scores[i]}</output>
          <button type="button" class="icon-btn" data-sc="${i}" data-d="1" aria-label="Ajouter un point">+</button>
        </div>
      </div>`).join("");
    $$("[data-name]", d).forEach((inp) => (inp.oninput = () => { S.names[+inp.dataset.name] = inp.value || `Agence ${+inp.dataset.name + 1}`; persist(); renderBibs(); }));
    $$("[data-sc]", d).forEach((b) => (b.onclick = () => addPoints(+b.dataset.sc, +b.dataset.d)));
    $("#scores-reset").onclick = () => { if (confirm("Remettre tous les scores à zéro ?")) { S.scores = S.scores.map(() => 0); persist(); renderBibs(); refreshEditScores(); } };
    d.showModal();
  }
  function refreshEditScores() { $$("[data-out]").forEach((o) => (o.textContent = S.scores[+o.dataset.out])); }

  /* ---------- Chrono ---------- */
  const T = { total: 0, left: 0, running: false, id: null, end: 0 };
  function fmt(s) { const m = Math.floor(Math.abs(s) / 60), r = Math.abs(s) % 60; return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`; }
  function setTimer(min, autostart = false) {
    stopTimer(); T.total = Math.round(min * 60); T.left = T.total; drawTimer();
    if (autostart) startTimer();
  }
  function startTimer() {
    if (T.left <= 0) return;
    T.running = true; T.end = Date.now() + T.left * 1000;
    T.id = setInterval(tick, 250); drawTimer();
  }
  function stopTimer() { T.running = false; clearInterval(T.id); drawTimer(); }
  function tick() {
    const left = Math.max(0, Math.round((T.end - Date.now()) / 1000));
    if (left !== T.left) { T.left = left; drawTimer(); }
    if (left === 0) { stopTimer(); chime(); $("#stage").classList.add("flash"); setTimeout(() => $("#stage").classList.remove("flash"), 3600); }
  }
  function drawTimer() {
    const el = $("#chrono"), txt = fmt(T.left);
    $("#t-display").textContent = txt;
    el.classList.toggle("running", T.running);
    el.classList.toggle("last", T.running && T.left <= 60 && T.left > 0);
    el.classList.toggle("done", T.left === 0 && T.total > 0);
    $("#t-play").textContent = T.running ? "Pause" : "Lancer";
    $$(".live-clock").forEach((c) => (c.textContent = txt));
  }
  function chime() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [0, .28, .56].forEach((d, i) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.frequency.value = i === 2 ? 1046 : 784; o.connect(g); g.connect(ctx.destination);
        g.gain.setValueAtTime(.0001, ctx.currentTime + d);
        g.gain.exponentialRampToValueAtTime(.3, ctx.currentTime + d + .02);
        g.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + d + .25);
        o.start(ctx.currentTime + d); o.stop(ctx.currentTime + d + .3);
      });
    } catch (e) { /* son indisponible */ }
  }
  function initTimer() {
    $("#t-play").onclick = () => (T.running ? stopTimer() : startTimer());
    $("#t-reset").onclick = () => setTimer(T.total / 60);
    $("#t-plus").onclick = () => { T.left += 60; if (T.running) T.end += 60000; drawTimer(); };
    $("#t-minus").onclick = () => { T.left = Math.max(0, T.left - 60); if (T.running) T.end -= 60000; drawTimer(); };
  }

  /* ---------- Parcours (rail) ---------- */
  function renderRail(curId) {
    const idx = PAGES.indexOf(curId);
    $("#course").innerHTML = C.parcours.map((p, i) => `
      <li><button class="cp ${i < idx ? "done" : ""} ${i === idx ? "current" : ""}" data-go="${p.id}" ${i === idx ? 'aria-current="step"' : ""}>
        <span class="dot">${p.id === "pause" ? "·" : i}</span>
        <span><span class="cp-time">${p.heure}</span><span class="cp-title">${esc(p.titre)}</span><span class="cp-sub">${esc(p.sous)}</span></span>
      </button></li>`).join("");
    $$("#course [data-go]").forEach((b) => (b.onclick = () => go(b.dataset.go)));
    $$(".rail-extra a").forEach((a) => a.classList.toggle("active", a.dataset.page === curId));
  }

  /* ---------- Navigation ---------- */
  function go(id) { location.hash = id; }
  function route() {
    let id = location.hash.slice(1) || PAGES[0];
    if (!PAGES.includes(id) && !EXTRA.includes(id)) id = PAGES[0];
    const stage = $("#stage");
    const p = C.parcours.find((x) => x.id === id);
    const type = (p && p.type) || id;
    stage.innerHTML = `<div class="page">${(RENDER[type] || (() => ""))(p)}</div>`;
    (BIND[type] || (() => {}))(stage, p);
    bindAward(stage);
    stage.scrollTop = 0; window.scrollTo(0, 0);
    renderRail(id);
    $("#rail").classList.remove("open");
    const idx = PAGES.indexOf(id);
    $("#prev").disabled = idx <= 0;
    $("#next").disabled = idx === -1 || idx >= PAGES.length - 1;
    $("#next").textContent = idx >= 0 && idx < PAGES.length - 1 ? `Suivant : ${C.parcours[idx + 1].titre}` : "Étape suivante";
    $("#progress-bar").style.width = idx >= 0 ? `${((idx + 1) / PAGES.length) * 100}%` : "0";
    if (p) setTimer(p.duree, id === "pause");
    stage.focus({ preventScroll: true });
  }
  function step(d) {
    const idx = PAGES.indexOf(location.hash.slice(1) || PAGES[0]);
    const n = Math.min(PAGES.length - 1, Math.max(0, (idx === -1 ? 0 : idx) + d));
    go(PAGES[n]);
  }

  /* ---------- Gabarits communs ---------- */
  function head(p, lede) {
    const i = PAGES.indexOf(p.id);
    return `<header class="page-head">
      <span class="cp-badge" aria-hidden="true">${p.id === "pause" ? p.heure : "CP" + i}</span>
      <h1>${esc(p.titre)}</h1>
      ${lede ? `<p class="lede">${lede}</p>` : ""}
    </header>`;
  }
  function src(url, name) { return `<span class="source">Source : <a href="${esc(url)}" target="_blank" rel="noopener">${esc(name || new URL(url).hostname)}</a></span>`; }

  /* ---------- Moteur de quiz ---------- */
  function quizHTML(id) { return `<div class="quiz" id="${id}"></div>`; }
  function mountQuiz(root, qs, opts = {}) {
    let k = 0; const picked = {};
    const draw = () => {
      const q = qs[k], rev = picked[k]?.rev;
      root.innerHTML = `
        <div class="quiz-top">
          <div class="quiz-dots">${qs.map((_, i) => `<button class="${i === k ? "on" : ""}" data-q="${i}" aria-label="Question ${i + 1}">${i + 1}</button>`).join("")}</div>
          <div class="btn-row">
            ${opts.timer ? `<button class="btn small" data-qt>Chrono 30 s</button>` : ""}
            <button class="btn small lamp" data-rev>${rev ? "Masquer la réponse" : "Révéler la réponse"}</button>
            <button class="btn small" data-nx ${k >= qs.length - 1 ? "disabled" : ""}>Question suivante</button>
          </div>
        </div>
        <p class="quiz-q">${esc(q.q)}</p>
        <div class="options ${rev ? "revealed" : ""}">
          ${q.options.map((o, i) => `<button class="opt ${i === q.bonne ? "good" : ""} ${picked[k]?.p === i ? "picked" : ""}" data-o="${i}"><span class="letter">${LETTERS[i]}</span><span>${esc(o)}</span></button>`).join("")}
        </div>
        ${rev && q.explication ? `<p class="explain">${esc(q.explication)}</p>` : ""}
        ${opts.award ? awardRow(opts.awardLabel || "Bonne réponse") : ""}`;
      $$("[data-q]", root).forEach((b) => (b.onclick = () => { k = +b.dataset.q; draw(); }));
      $$("[data-o]", root).forEach((b) => (b.onclick = () => { picked[k] = { ...(picked[k] || {}), p: +b.dataset.o }; draw(); }));
      $("[data-rev]", root).onclick = () => { picked[k] = { ...(picked[k] || {}), rev: !rev }; draw(); };
      const nx = $("[data-nx]", root); if (nx) nx.onclick = () => { if (k < qs.length - 1) { k++; draw(); } };
      const qt = $("[data-qt]", root); if (qt) qt.onclick = () => setTimer(0.5, true);
      bindAward(root);
    };
    draw();
  }

  /* ---------- Vidéo : YouTube, Drive ou fichier ---------- */
  function videoHTML(v) {
    const u = (v.url || "").trim();
    if (!u) return `<div class="video-frame"><div class="video-placeholder"><div><div class="play" aria-hidden="true"></div><strong>${esc(v.titre)}</strong>Vidéo NotebookLM à venir, ${esc(v.duree)}.<br><span style="opacity:.7">Colle l'URL dans content.js, rubrique videos.</span></div></div></div>`;
    let embed = u;
    const yt = u.match(/(?:youtu\.be\/|v=|shorts\/)([\w-]{11})/);
    const dr = u.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (yt) embed = `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0`;
    else if (dr) embed = `https://drive.google.com/file/d/${dr[1]}/preview`;
    else if (/\.(mp4|webm|mov)(\?|$)/i.test(u)) return `<div class="video-frame"><video src="${esc(u)}" controls preload="metadata"></video></div>`;
    return `<div class="video-frame"><iframe src="${esc(embed)}" title="${esc(v.titre)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
  }

  /* =======================================================================
     LES PAGES
     ======================================================================= */
  const RENDER = {}, BIND = {};

  /* --- CP0 Départ --- */
  RENDER.accueil = () => {
    const pts = profilePoints();
    const len = 1400;
    return `
    <section class="hero ${S.animated ? "" : "animate"}">
      <h1>${esc(C.config.cours)}</h1>
      <p class="meta">${esc(C.config.dateSeance)}. ${esc(C.config.classe)}. Avec ${esc(C.config.intervenant)}.</p>
      <svg class="profile" viewBox="0 0 1200 230" role="img" aria-label="Le parcours de la séance, de ${C.parcours[0].heure.replace(":", "h")}, en ${C.parcours.length} étapes">
        <defs><radialGradient id="beam" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#52A86F" stop-opacity=".6"/><stop offset="1" stop-color="#52A86F" stop-opacity="0"/></radialGradient></defs>
        <path class="ground" d="${pts.area}"/>
        <path class="halo" d="${pts.line}" style="--len:${len}"/>
        <path class="trace" d="${pts.line}" style="--len:${len}"/>
        <circle class="lamp-beam" cx="${pts.cps[0][0]}" cy="${pts.cps[0][1]}" r="70"/>
        ${pts.cps.map(([x, y], i) => `<g class="ck ${i === 0 ? "here" : ""}" style="--i:${i}"><circle cx="${x}" cy="${y}" r="9"/><text x="${x}" y="${y - 20}">${C.parcours[i].heure}</text></g>`).join("")}
      </svg>
    </section>

    <div class="client-card" style="margin-top:28px">
      <span class="kicker">${esc(C.client.arrivee)}</span>
      <h2>${esc(C.client.nom)}</h2>
      <p>${esc(C.client.accroche)} ${esc(C.client.teaser)}</p>
    </div>

    <section class="section" id="tirage">
      <h2>Constituer les ${esc(C.config.equipes || "agences")}</h2>
      <p class="intro">Collez la liste de la classe, un nom par ligne, puis tirez au sort. ${esc(C.config.tirageNote || "Mêmes équipes jusqu'à la fin du module.")} Les noms restent dans ce navigateur : rien n'est envoyé.</p>
      <div class="draw">
        <div class="panel draw-input">
          <label for="roster" class="field-label">Liste de la classe <span class="muted" id="roster-count"></span></label>
          <textarea id="roster" rows="10" placeholder="Prénom Nom\nPrénom Nom\n…">${esc(S.roster.join("\n"))}</textarea>
          <div class="btn-row" style="margin-top:12px">
            <button class="btn lamp" id="draw-btn">Tirer au sort</button>
            <button class="btn" id="draw-print">Imprimer les ${esc(C.config.equipes || "agences")}</button>
            <button class="btn" id="draw-clear">Vider les ${esc(C.config.equipes || "agences")}</button>
          </div>
        </div>
        <div class="agences-grid" id="agences-grid"></div>
      </div>
    </section>`;
  };
  BIND.accueil = (root) => {
    S.animated = true;
    const ta = $("#roster", root);
    const parse = () => ta.value.split(/\n|;/).map((s) => s.trim()).filter(Boolean);
    const count = () => { const n = parse().length; $("#roster-count", root).textContent = n ? `(${n})` : ""; };
    ta.oninput = () => { S.roster = parse(); persist(); count(); }; count();
    drawGrid(root, false);
    $("#draw-btn", root).onclick = () => {
      const list = parse();
      if (list.length < S.names.length) { toast(`Il faut au moins ${S.names.length} noms`); return; }
      const sh = list.slice();
      for (let i = sh.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [sh[i], sh[j]] = [sh[j], sh[i]]; }
      S.members = S.names.map(() => []);
      sh.forEach((n, i) => S.members[i % S.names.length].push(n));
      persist(); drawGrid(root, true);
    };
    $("#draw-clear", root).onclick = () => { S.members = S.names.map(() => []); persist(); drawGrid(root, false); };
    $("#draw-print", root).onclick = () => window.print();
  };
  function drawGrid(root, animate) {
    const g = $("#agences-grid", root);
    let k = 0;
    g.innerHTML = S.names.map((n, i) => `
      <div class="agence-col">
        <div class="agence-head"><span class="num">${i + 1}</span><input value="${esc(n)}" data-agname="${i}" aria-label="Nom de l'équipe ${i + 1}"></div>
        <ul>${(S.members[i] || []).map((m) => `<li class="${animate ? "drop" : ""}" style="--d:${(k++ % 99) * 0.09 + Math.floor(0) }s">${esc(m)}</li>`).join("") || `<li class="empty">En attente du tirage</li>`}</ul>
      </div>`).join("");
    if (animate) {   // ordre d'apparition : un nom par agence, à tour de rôle
      const cols = $$(".agence-col ul", g).map((u) => $$("li.drop", u));
      let t = 0; const max = Math.max(...cols.map((c) => c.length));
      for (let r = 0; r < max; r++) cols.forEach((c) => { if (c[r]) { c[r].style.setProperty("--d", `${t * 0.12}s`); t++; } });
    }
    $$("[data-agname]", g).forEach((inp) => (inp.oninput = () => { S.names[+inp.dataset.agname] = inp.value || `Agence ${+inp.dataset.agname + 1}`; persist(); renderBibs(); }));
  }
  function profilePoints() {
    // Profil d'altitude stylisé, un point par étape du parcours
    const motif = [150, 120, 138, 92, 108, 70, 160, 96, 60, 118];
    const ys = C.parcours.map((_, i) => motif[i % motif.length]);
    const n = ys.length, x0 = 30, x1 = 1170, step = (x1 - x0) / (n - 1);
    const cps = ys.map((y, i) => [x0 + i * step, y]);
    let line = `M ${cps[0][0]} ${cps[0][1]}`;
    for (let i = 1; i < n; i++) {
      const [xa, ya] = cps[i - 1], [xb, yb] = cps[i], mx = (xa + xb) / 2;
      line += ` C ${mx} ${ya}, ${mx} ${yb}, ${xb} ${yb}`;
    }
    const area = `${line} L ${x1} 230 L ${x0} 230 Z`;
    return { cps, line, area };
  }

  /* --- CP1 IA ou humain --- */
  RENDER.iahumain = (p) => `
    ${head(p, p.lede)}
    <div class="slots">
      ${C.iaHumain.map((it, i) => `
      <article class="slot" data-slot="${i}">
        <div class="media">${it.src
          ? (it.type === "image" ? `<img src="${esc(it.src)}" alt="${esc(it.legende)}">` : `<p style="text-align:left;color:var(--ink)">${esc(it.src)}</p>`)
          : `<div><span class="num">${i + 1}</span>Emplacement : ${esc(it.legende)}</div>`}</div>
        <div class="body">
          <strong>${esc(it.legende)}</strong>
          <div class="btn-row"><button class="btn small lamp" data-reveal="${i}">Révéler</button></div>
          <div data-res="${i}" hidden>
            <span class="verdict ${it.reponse}">${it.reponse === "ia" ? "Généré par IA" : "Fait par un humain"}</span>
            <p class="hint">${esc(it.indice)}</p>
          </div>
        </div>
      </article>`).join("")}
    </div>
    <section class="section">${awardRow("Point pour")}</section>`;
  BIND.iahumain = (root) => {
    $$("[data-reveal]", root).forEach((b) => (b.onclick = () => {
      const r = $(`[data-res="${b.dataset.reveal}"]`, root); r.hidden = !r.hidden;
      b.textContent = r.hidden ? "Révéler" : "Masquer";
    }));
  };

  /* --- CP2 Vidéo + quiz flash --- */
  RENDER.video = (p) => `
    ${head(p, p.lede)}
    ${videoHTML(C.videos.s1)}
    <section class="section"><h2>Quiz flash</h2>${quizHTML("quiz-flash")}</section>`;
  BIND.video = (root) => mountQuiz($("#quiz-flash", root), C.quizFlash, { award: true, timer: true, awardLabel: "Équipe la plus rapide" });

  /* --- CP3 Rupture 2026 --- */
  RENDER.rupture = (p) => `
    ${head(p, p.lede)}
    <section>
      <div class="btn-row" style="margin-bottom:14px">
        <button class="btn lamp" id="stair-next">Monter d'une marche</button>
        <button class="btn" id="stair-all">Tout afficher</button>
      </div>
      <div class="stairs" id="stairs">
        ${C.marches.map((m) => `<div class="step hidden" data-step="${m.n}"><span class="n">${m.n}</span><h3>${esc(m.titre)}</h3><p>${esc(m.fait)}</p><p class="ex">${esc(m.ex)}</p></div>`).join("")}
      </div>
      <p class="muted" style="margin-top:14px;max-width:80ch">${esc(C.marchesOutils)}</p>
    </section>

    <section class="section">
      <h2>Quelle marche pour quelle tâche ?</h2>
      <p class="intro">${esc(C.quelleMarcheIntro)}</p>
      <div class="btn-row" style="margin-bottom:12px"><button class="btn small lamp" id="tasks-reveal">Tout révéler</button><button class="btn small" id="tasks-reset">Recommencer</button></div>
      <div class="tasks">
        ${C.quelleMarche.map((t, i) => `
        <div class="task" data-task="${i}">
          <span class="t">${esc(t.t)}</span>
          <div class="choices" role="group" aria-label="Choisir une marche">${[1, 2, 3, 4].map((m) => `<button data-pick="${m}" class="${m === t.m ? "answer" : ""}" aria-label="Marche ${m}">${m}</button>`).join("")}</div>
          <button class="btn small" data-tr="${i}">Révéler</button>
          <span class="why" hidden>${esc(t.why)}</span>
        </div>`).join("")}
      </div>
    </section>

    <section class="section">
      <h2>Pourquoi le chat ne suffit plus</h2>
      <div class="facts">${C.limites.map((l) => `<div class="fact"><strong>${esc(l.outil)}</strong><span>${esc(l.val)}</span><br>${src(l.src, "aide officielle")}</div>`).join("")}</div>
      <p class="muted" style="max-width:80ch;margin-top:16px">La vraie différence n'est pas le nombre de fichiers. Avec un agent, les fichiers restent dans votre dossier, les connecteurs donnent accès à des données vivantes, et la tâche peut durer, s'enchaîner, se programmer, sous votre validation.</p>
    </section>

    <section class="section">
      <h2>Donner la main, sans perdre le contrôle</h2>
      <div class="rules">${C.securite.map((r) => `<div class="rule"><strong>${esc(r.t)}</strong><p>${esc(r.d)}</p></div>`).join("")}</div>
    </section>`;
  BIND.rupture = (root) => {
    let lit = 0;
    const steps = $$("[data-step]", root);
    const light = (n) => steps.forEach((s, i) => {
      const was = s.classList.contains("hidden");
      s.classList.toggle("hidden", i >= n); s.classList.toggle("lit", i === n - 1);
      if (was && i < n) { s.classList.remove("rise"); void s.offsetWidth; s.classList.add("rise"); }
    });
    $("#stair-next", root).onclick = () => { lit = Math.min(4, lit + 1); light(lit); };
    $("#stair-all", root).onclick = () => { lit = 4; light(4); };
    $$("[data-task]", root).forEach((row) => {
      const i = +row.dataset.task;
      $$("[data-pick]", row).forEach((b) => (b.onclick = () => { $$("[data-pick]", row).forEach((x) => x.classList.remove("picked")); b.classList.add("picked"); }));
      $("[data-tr]", row).onclick = () => revealTask(row, i);
    });
    $("#tasks-reveal", root).onclick = () => $$("[data-task]", root).forEach((row) => revealTask(row, +row.dataset.task, true));
    $("#tasks-reset", root).onclick = () => $$("[data-task]", root).forEach((row) => { row.className = "task"; $(".why", row).hidden = true; $$("[data-pick]", row).forEach((x) => x.classList.remove("picked")); });
  };
  function revealTask(row, i, force) {
    const t = C.quelleMarche[i], pk = $("[data-pick].picked", row);
    const on = force || !row.classList.contains("reveal");
    row.classList.toggle("reveal", on);
    row.classList.toggle("right", on && pk && +pk.dataset.pick === t.m);
    row.classList.toggle("wrong", on && pk && +pk.dataset.pick !== t.m);
    $(".why", row).hidden = !on;
  }

  /* --- CP4 Panorama et actus --- */
  RENDER.panorama = (p) => `
    ${head(p, p.lede)}
    <div class="tools">${C.panorama.map((r) => `<div class="tool-row"><h3>${esc(r.usage)}</h3><div class="chips">${r.outils.map((o) => `<span class="chip">${esc(o)}</span>`).join("")}</div><span class="note">${esc(r.note)}</span></div>`).join("")}</div>
    <section class="section">
      <h2>Ce qui s'est passé cette année</h2>
      <p class="intro">Ouvrez une actu pour le détail, la question à poser à la classe et la source.</p>
      <div class="news">${C.actus.map((a, i) => `
        <article class="news-item" data-news="${i}">
          <button aria-expanded="false"><span class="date">${esc(a.date)}</span><span class="ttl">${esc(a.titre)}</span><span class="tag">${esc(a.tag)}</span></button>
          <div class="news-body"><div><p>${esc(a.texte)}</p><p class="ask">${esc(a.question)}</p>${src(a.src, a.srcNom)}</div></div>
        </article>`).join("")}</div>
    </section>`;
  BIND.panorama = (root) => $$("[data-news] > button", root).forEach((b) => (b.onclick = () => {
    const it = b.parentElement, open = it.classList.toggle("open"); b.setAttribute("aria-expanded", open);
  }));

  /* --- CP5 Prompt engineering --- */
  RENDER.prompt = (p) => `
    ${head(p, p.lede)}
    <section>
      <h2 style="font-size:2rem;margin-bottom:6px">Le prompt en 5 blocs</h2>
      <p class="muted" style="margin:0 0 18px;max-width:80ch">${esc(C.blocsNote)}</p>
      <div class="builder">
        <div>${C.blocs.map((b) => `<div class="bloc"><label for="b-${b.k}">${esc(b.nom)}<small>${esc(b.aide)}</small></label><textarea id="b-${b.k}" data-bloc="${b.k}" rows="2">${esc(b.ex)}</textarea></div>`).join("")}</div>
        <div class="assembled">
          <pre id="assembled" aria-live="polite"></pre>
          <div class="btn-row"><button class="btn lamp" id="copy-prompt">Copier le prompt</button><button class="btn" id="clear-prompt">Vider</button><button class="btn" id="ex-prompt">Remettre l'exemple</button></div>
        </div>
      </div>
    </section>
    <section class="section">
      <h2>Le premier jet n'est jamais le livrable</h2>
      <div class="tabs" role="tablist">${C.iterations.map((it, i) => `<button class="tab" role="tab" aria-selected="${i === 0}" data-it="${i}">${it.v}</button>`).join("")}</div>
      <div id="iter"></div>
    </section>
    <section class="section">
      <h2>Cinq techniques d'itération</h2>
      <div class="tech">${C.techniques.map((t) => `<div class="rule"><strong>${esc(t.t)}</strong><p>${esc(t.d)}</p></div>`).join("")}</div>
    </section>
    <section class="section">
      <h2>Trois défis chronométrés</h2>
      <p class="intro">${esc(C.defisNote)}</p>
      <div class="grid-3">${C.defis.map((d) => `<div class="panel defi"><span class="n">${d.n}</span><h3>${esc(d.titre)}</h3><p>${esc(d.consigne)}</p><button class="btn lamp" data-defi="${d.min}">Lancer ${d.min} min</button></div>`).join("")}</div>
    </section>
    <section class="section">
      <h2>Prompt battle</h2>
      <p class="intro">Chaque agence projette son meilleur prompt et le résultat obtenu. La classe vote : la gagnante prend 3 points, la deuxième 1 point.</p>
      <div class="award"><span>Gagnante :</span>${S.names.map((n, i) => `<button class="btn small lamp" data-award="${i}" data-pts="3">${esc(n)} +3</button>`).join("")}</div>
      <div class="award" style="margin-top:8px"><span>Deuxième :</span>${S.names.map((n, i) => `<button class="btn small" data-award="${i}" data-pts="1">${esc(n)} +1</button>`).join("")}</div>
    </section>`;
  BIND.prompt = (root) => {
    const out = $("#assembled", root);
    const build = () => {
      const parts = C.blocs.map((b) => $(`[data-bloc="${b.k}"]`, root).value.trim()).filter(Boolean);
      out.textContent = parts.length ? parts.join("\n\n") : "Remplissez les blocs : le prompt se construit ici.";
    };
    const fit = (t) => { t.style.height = "auto"; t.style.height = t.scrollHeight + 2 + "px"; };
    $$("[data-bloc]", root).forEach((t) => { t.oninput = () => { fit(t); build(); }; requestAnimationFrame(() => fit(t)); }); build();
    $("#copy-prompt", root).onclick = async () => { try { await navigator.clipboard.writeText(out.textContent); toast("Prompt copié"); } catch (e) { toast("Copie impossible : sélectionnez le texte"); } };
    $("#clear-prompt", root).onclick = () => { $$("[data-bloc]", root).forEach((t) => (t.value = "")); build(); };
    $("#ex-prompt", root).onclick = () => { C.blocs.forEach((b) => { const t = $(`[data-bloc="${b.k}"]`, root); t.value = b.ex; fit(t); }); build(); };
    const showIt = (i) => {
      const it = C.iterations[i];
      $$("[data-it]", root).forEach((t) => t.setAttribute("aria-selected", +t.dataset.it === i));
      $("#iter", root).innerHTML = `<div class="grid-2" style="grid-template-columns:auto 1fr;align-items:start"><span class="iter-v">${it.v}</span><div><p class="iter-prompt">${esc(it.prompt)}</p><p class="muted" style="margin:0">${esc(it.probleme)}</p></div></div>`;
    };
    $$("[data-it]", root).forEach((t) => (t.onclick = () => showIt(+t.dataset.it))); showIt(0);
    $$("[data-defi]", root).forEach((b) => (b.onclick = () => { setTimer(+b.dataset.defi, true); toast(`Chrono lancé : ${b.dataset.defi} minutes`); }));
  };

  /* --- Pause --- */
  RENDER.pause = (p) => `
    <div class="pause-wrap"><div>
      <p class="muted" style="font-size:1.3rem;margin:0 0 10px">Ravitaillement. Reprise à ${(C.parcours[PAGES.indexOf("pause") + 1] || p).heure.replace(":", "h")}.</p>
      <div class="pause-clock live-clock">${fmt(p.duree * 60)}</div>
      <p class="muted" style="margin-top:14px">Le chrono tourne déjà. Prochaine étape : regard critique.</p>
    </div></div>`;

  /* --- CP7 Regard critique --- */
  RENDER.critique = (p) => `
    ${head(p, p.lede)}
    <section>
      <h2 style="font-size:2rem;margin-bottom:14px">Vrai ou faux ?</h2>
      <div class="vf">${C.vraiFaux.map((v, i) => `
        <div class="vf-item"><span class="s">${esc(v.s)}</span>
          <div class="btn-row"><button class="btn small lamp" data-vf="${i}">Révéler</button></div>
          <div data-vfr="${i}" hidden><span class="ans ${v.v ? "v" : "f"}">${v.v ? "Vrai" : "Faux"}</span><p class="muted" style="margin:6px 0 0">${esc(v.e)}</p></div>
        </div>`).join("")}</div>
    </section>
    <section class="section">
      <h2>La grille pour critiquer un output</h2>
      <div class="criteria">${C.grille.map((g) => `<div class="crit"><strong>${esc(g.k)}</strong><span>${esc(g.q)}</span></div>`).join("")}</div>
    </section>
    <section class="section">
      <h2>Le prompt biaisé</h2>
      <p class="intro">${esc(C.casBiais.contexte)} Lisez le prompt : qu'est-ce qui cloche ?</p>
      <div class="panel bias">
        <p class="iter-prompt" style="margin-top:0">« ${esc(C.casBiais.mauvais)} »</p>
        <div class="btn-row"><button class="btn lamp" data-bias="1">Montrer les défauts</button><button class="btn" data-bias="2">Montrer la version corrigée</button></div>
        <div data-biasr="1" hidden><ul class="defauts">${C.casBiais.defauts.map((d) => `<li>${esc(d)}</li>`).join("")}</ul></div>
        <div data-biasr="2" hidden><dl class="kv" style="margin-top:16px">${C.casBiais.corrige.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl><p class="ask" style="margin-top:14px">${esc(C.casBiais.lecon)}</p></div>
        <p class="source" style="margin:12px 0 0">${esc(C.casBiais.origine)}</p>
      </div>
    </section>

    <section class="section">
      <h2>Deux cas d'école</h2>
      <div class="grid-2">${C.casEcole.map((c) => `<div class="panel"><h3 style="font-size:1.7rem;margin-bottom:8px">${esc(c.titre)}</h3><p style="margin:0 0 10px">${esc(c.texte)}</p>${src(c.src)}</div>`).join("")}</div>
    </section>
    <section class="section">
      <h2>Débat</h2>
      <p class="big-question">${esc(C.questionOuverte)}</p>
      <button class="btn lamp" data-debat>Lancer 5 min de débat</button>
    </section>`;
  BIND.critique = (root) => {
    $$("[data-vf]", root).forEach((b) => (b.onclick = () => { const r = $(`[data-vfr="${b.dataset.vf}"]`, root); r.hidden = !r.hidden; b.textContent = r.hidden ? "Révéler" : "Masquer"; }));
    $("[data-debat]", root).onclick = () => setTimer(5, true);
    $$("[data-bias]", root).forEach((b) => (b.onclick = () => { const r = $(`[data-biasr="${b.dataset.bias}"]`, root); r.hidden = !r.hidden; }));
  };

  /* --- Fil rouge : dossier client --- */
  const CAS_TABS = C.client.onglets || ["Le client", "Les cibles", "La charte", "Le travail", "Le barème", "Journal de prompts"];
  RENDER.cas = (p) => {
    const c = C.client;
    return `
    ${head(p, p.lede)}
    <div class="dossier-head">
      <h2>${esc(c.nom)}</h2>
      <p>${esc(c.accroche)}</p>
      <p class="warn">${esc(c.avertissement)}</p>
    </div>
    <section class="section">
      <div class="tabs" role="tablist">${CAS_TABS.map((t, i) => `<button class="tab" role="tab" aria-selected="${i === 0}" data-ct="${i}">${t}</button>`).join("")}</div>
      <div id="cas-body"></div>
    </section>`;
  };
  BIND.cas = (root) => {
    const show = (i) => {
      $$("[data-ct]", root).forEach((t) => t.setAttribute("aria-selected", +t.dataset.ct === i));
      $("#cas-body", root).innerHTML = CAS[i]();
      if (i === 5) bindJournal(root);
    };
    $$("[data-ct]", root).forEach((t) => (t.onclick = () => show(+t.dataset.ct)));
    show(0);
  };
  const CAS = [
    () => `<div class="grid-2">
      <div class="panel"><dl class="kv">${C.client.fiche.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl></div>
      <div class="panel"><h3 style="font-size:1.6rem;margin-bottom:10px">${esc(C.client.objectifsTitre || "Objectifs")}</h3>
        <div class="facts" style="grid-template-columns:1fr 1fr">${C.client.objectifs.map((o) => `<div class="fact"><strong>${esc(o)}</strong></div>`).join("")}</div></div>
    </div>` + (C.client.contexte ? `<div class="panel" style="margin-top:18px"><h3 style="font-size:1.6rem;margin-bottom:10px">${esc(C.client.contexteTitre || "Le contexte")}</h3><ul class="ctx">${C.client.contexte.map((x) => `<li>${esc(x.t)} ${x.src ? src(x.src, x.nom) : ""}</li>`).join("")}</ul></div>` : ""),
    () => `<div class="targets">${C.client.cibles.map((t) => `<div class="target"><strong>${esc(t.nom)}</strong><span>${esc(t.d)}</span></div>`).join("")}</div>`,
    () => C.client.marge ? margeHTML() : (() => { const ch = C.client.charte; return `<div class="panel">
      <div class="swatches">${ch.couleurs.map(([n, h]) => `<div class="sw"><span style="background:${h}"></span><small>${esc(n)}</small><em>${h}</em></div>`).join("")}</div>
      <dl class="kv" style="margin-top:20px"><dt>Ton</dt><dd>${esc(ch.ton)}</dd><dt>Valeurs</dt><dd>${ch.valeurs.map(esc).join(", ")}</dd><dt>À éviter</dt><dd>${ch.interdits.map(esc).join(", ")}</dd></dl>
      <p class="muted" style="margin:16px 0 0">Charte provisoire : elle servira de référence de cohérence graphique en séance 2.</p></div>`; })(),
    () => `<div class="work">${C.client.travail.map((w, i) => `<div class="rule"><strong>${i + 1}. ${esc(w.t)}</strong><p>${esc(w.d)}</p></div>`).join("")}</div>
      <div class="panel" style="margin-top:16px"><p style="margin:0 0 8px"><strong>${esc(C.client.etape)}</strong></p><p class="muted" style="margin:0">${esc(C.client.seance2)}</p></div>
      <div class="btn-row" style="margin-top:16px"><button class="btn lamp" onclick="window.__setTimer(${C.client.dureeTravail || 45}, true)">Lancer ${C.client.dureeTravail || 45} min de travail</button></div>`,
    () => { const tot = C.client.bareme.reduce((a, b) => a + b.p, 0); return `<div class="panel"><table class="bareme"><tbody>
      ${C.client.bareme.map((b) => `<tr><td>${esc(b.c)}</td><td>${b.p}</td></tr>`).join("")}
      <tr class="total"><td>Total</td><td>${tot}</td></tr></tbody></table>
      <p class="muted" style="margin:10px 0 0">${esc(C.client.baremeNote)}</p></div>`; },
    () => journalHTML()
  ];
  function margeHTML() {
    const M = C.client.marge;
    return `<div class="panel">
      <p style="margin-top:0;max-width:75ch">${esc(M.intro)}</p>
      <div style="overflow-x:auto"><table class="bareme marge"><thead><tr>${M.colonnes.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead>
      <tbody>${M.lignes.map((l) => `<tr>${l.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
      ${M.regles ? `<h3 style="font-size:1.5rem;margin:18px 0 8px">${esc(M.reglesTitre || "Les règles")}</h3><ul class="ctx">${M.regles.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>` : ""}
      ${M.note ? `<p class="muted" style="margin:14px 0 0">${esc(M.note)}</p>` : ""}</div>`;
  }
  const JOURNAL = Object.assign({
    titre: "Journal de prompts",
    etapes: [{ label: "Itération V1" }, { label: "Itération V2", changement: true }, { label: "Itération V3", changement: true }],
    changementLabel: "Ce que nous avons changé, et pourquoi",
    critique: "Critique d'un output (grille en 6 critères)"
  }, C.client.journal || {});
  function journalHTML() {
    const j = S.journal, v = (k) => esc(j[k] || "");
    return `<div class="panel">
      <p class="muted" style="margin-top:0">Rempli au fil de la séance, enregistré dans ce navigateur. Téléchargez-le pour le déposer.</p>
      <div class="field"><label for="j-agence">Équipe</label><select id="j-agence" data-j="agence">${S.names.map((n) => `<option ${j.agence === n ? "selected" : ""}>${esc(n)}</option>`).join("")}</select></div>
      <div class="field"><label for="j-membres">Membres</label><input id="j-membres" data-j="membres" value="${v("membres")}"></div>
      ${JOURNAL.etapes.map((e, i) => { const n = i + 1; return `<div class="iter-block"><h4>${esc(e.label)}</h4>
        ${e.aide ? `<p class="muted" style="margin:0 0 8px">${esc(e.aide)}</p>` : ""}
        <div class="field"><label for="j-p${n}">${esc(e.champ || JOURNAL.champ || "Prompt")}</label><textarea id="j-p${n}" data-j="p${n}" rows="3">${v("p" + n)}</textarea></div>
        ${e.changement ? `<div class="field"><label for="j-c${n}">${esc(JOURNAL.changementLabel)}</label><textarea id="j-c${n}" data-j="c${n}" rows="2">${v("c" + n)}</textarea></div>` : ""}
      </div>`; }).join("")}
      <div class="field"><label for="j-crit">${esc(JOURNAL.critique)}</label><textarea id="j-crit" data-j="crit" rows="4">${v("crit")}</textarea></div>
      <div class="btn-row"><button class="btn lamp" id="j-dl">Télécharger le journal</button><button class="btn" id="j-clear">Effacer</button></div>
    </div>`;
  }
  function bindJournal(root) {
    $$("[data-j]", root).forEach((f) => (f.oninput = f.onchange = () => { S.journal[f.dataset.j] = f.value; persist(); }));
    $("#j-dl", root).onclick = () => {
      const j = S.journal, L = [];
      L.push(`${JOURNAL.titre.toUpperCase()} — ${C.client.nom}`, `${C.config.cours}, ${C.config.seance}`, "", `Équipe : ${j.agence || S.names[0]}`, `Membres : ${j.membres || ""}`, "");
      JOURNAL.etapes.forEach((e, i) => { const n = i + 1; L.push(`--- ${e.label} ---`, `${e.champ || JOURNAL.champ || "Prompt"} : ${j["p" + n] || ""}`); if (e.changement) L.push(`${JOURNAL.changementLabel} : ${j["c" + n] || ""}`); L.push(""); });
      L.push(`--- ${JOURNAL.critique} ---`, j.crit || "");
      const blob = new Blob([L.join("\n")], { type: "text/plain;charset=utf-8" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
      a.download = `journal-${(j.agence || "equipe").toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "-")}.txt`;
      a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); toast("Journal téléchargé");
    };
    $("#j-clear", root).onclick = () => { if (confirm("Effacer le journal enregistré dans ce navigateur ?")) { S.journal = {}; persist(); $("#cas-body", root).innerHTML = journalHTML(); bindJournal(root); } };
  }

  /* --- Gabarit quiz : un quiz seul (positionnement, révision) --- */
  RENDER.quiz = (p) => `${head(p, p.lede)}${C[p.data].intro ? `<p style="max-width:75ch;margin:-6px 0 18px;color:var(--muted)">${esc(C[p.data].intro)}</p>` : ""}${quizHTML("quiz-" + p.id)}`;
  BIND.quiz = (root, p) => mountQuiz($("#quiz-" + p.id, root), C[p.data].questions, { award: !!C[p.data].points, timer: true, awardLabel: "Point pour" });

  /* --- Gabarit fiches : fiches méthode ou consignes, dépliables --- */
  RENDER.fiches = (p) => {
    const F = C[p.data];
    return `${head(p, p.lede)}
      ${F.intro ? `<p style="max-width:75ch;margin:-6px 0 18px;color:var(--muted)">${esc(F.intro)}</p>` : ""}
      <div class="fiches">${F.items.map((f, i) => `
        <article class="fiche ${i === 0 ? "open" : ""}">
          <button class="fiche-head" aria-expanded="${i === 0}"><span class="sigle">${esc(f.sigle || String(i + 1))}</span><span><strong>${esc(f.titre)}</strong>${f.sous ? `<span class="muted">${esc(f.sous)}</span>` : ""}</span></button>
          <div class="fiche-body"><div>
            ${f.points ? `<ul class="fiche-points">${f.points.map((x) => `<li>${Array.isArray(x) ? `<strong>${esc(x[0])}</strong> ${esc(x[1])}` : esc(x)}</li>`).join("")}</ul>` : ""}
            ${f.exemple ? `<p class="ask">${esc(f.exemple)}</p>` : ""}
          </div></div>
        </article>`).join("")}</div>
      ${F.note ? `<p class="muted" style="margin-top:14px;max-width:80ch">${esc(F.note)}</p>` : ""}
      ${F.chrono ? `<div class="btn-row" style="margin-top:14px"><button class="btn lamp" data-fchrono="${F.chrono}">Lancer ${F.chrono} min</button></div>` : ""}`;
  };
  BIND.fiches = (root) => {
    $$(".fiche-head", root).forEach((b) => (b.onclick = () => { const f = b.parentElement, o = f.classList.toggle("open"); b.setAttribute("aria-expanded", o); }));
    const c = $("[data-fchrono]", root); if (c) c.onclick = () => setTimer(+c.dataset.fchrono, true);
  };

  /* --- Gabarit « tri » : classer des situations, puis révéler --- */
  RENDER.tri = (p) => {
    const T = C[p.data];
    return `${head(p, p.lede)}
      <p class="intro" style="color:var(--muted);max-width:75ch">${esc(T.intro)}</p>
      <div class="btn-row" style="margin:12px 0"><button class="btn small lamp" data-tri-all>Tout révéler</button><button class="btn small" data-tri-reset>Recommencer</button></div>
      <div class="tasks">${T.items.map((it, i) => `
        <div class="task tri" data-tri="${i}">
          <span class="t">${esc(it.t)}</span>
          <div class="choices cats" role="group">${T.categories.map((c) => `<button data-cat="${esc(c.k)}" class="${c.k === it.cat ? "answer" : ""}">${esc(c.label)}</button>`).join("")}</div>
          <button class="btn small" data-tr>Révéler</button>
          <span class="why" hidden>${esc(it.why)}</span>
        </div>`).join("")}</div>
      ${T.faits ? `<section class="section"><h2>${esc(T.faitsTitre || "Ce que disent les données")}</h2>
        <div class="btn-row" style="margin-bottom:12px"><button class="btn lamp" data-faits>Révéler l'étude</button></div>
        <div data-faits-body hidden><div class="facts">${T.faits.map((f) => `<div class="fact"><strong>${esc(f.chiffre)}</strong><span>${esc(f.texte)}</span></div>`).join("")}</div>
        ${T.faitsNote ? `<p class="ask" style="margin-top:16px">${esc(T.faitsNote)}</p>` : ""}
        ${T.source ? `<p style="margin-top:10px">${src(T.source.url, T.source.nom)}</p>` : ""}</div></section>` : ""}
      ${awardRow("Point pour")}`;
  };
  BIND.tri = (root, p) => {
    const T = C[p.data];
    const reveal = (row, force) => {
      const it = T.items[+row.dataset.tri], pk = $("[data-cat].picked", row), on = force || !row.classList.contains("reveal");
      row.classList.toggle("reveal", on);
      row.classList.toggle("right", on && !!pk && pk.dataset.cat === it.cat);
      row.classList.toggle("wrong", on && !!pk && pk.dataset.cat !== it.cat);
      $(".why", row).hidden = !on;
    };
    $$("[data-tri]", root).forEach((row) => {
      $$("[data-cat]", row).forEach((b) => (b.onclick = () => { $$("[data-cat]", row).forEach((x) => x.classList.remove("picked")); b.classList.add("picked"); }));
      $("[data-tr]", row).onclick = () => reveal(row);
    });
    $("[data-tri-all]", root).onclick = () => $$("[data-tri]", root).forEach((r) => reveal(r, true));
    $("[data-tri-reset]", root).onclick = () => $$("[data-tri]", root).forEach((r) => { r.className = "task tri"; $(".why", r).hidden = true; $$("[data-cat]", r).forEach((x) => x.classList.remove("picked")); });
    const fb = $("[data-faits]", root); if (fb) fb.onclick = () => { const b = $("[data-faits-body]", root); b.hidden = !b.hidden; fb.textContent = b.hidden ? "Révéler l'étude" : "Masquer l'étude"; };
  };

  /* --- Gabarit « chaîne » : une chaîne de prompts, étape par étape --- */
  RENDER.chaine = (p) => {
    const K = C[p.data];
    return `${head(p, p.lede)}
      <p style="max-width:75ch;margin:-6px 0 18px;color:var(--muted)">${esc(K.intro)}</p>
      <div class="btn-row" style="margin-bottom:14px"><button class="btn lamp" data-run>Dérouler la chaîne</button>${C.client && C.client.ficheTexte ? `<button class="btn" data-fiche>Copier la fiche ${esc(C.client.nom)}</button>` : ""}</div>
      <ol class="chain">${K.etapes.map((e, i) => `
        <li class="link" data-link="${i}">
          <span class="n">${i + 1}</span>
          <h3>${esc(e.titre)}</h3>
          <p class="muted">${esc(e.role)}</p>
          <textarea data-cp="${i}" rows="6" aria-label="Prompt de l'étape ${i + 1}">${esc(e.prompt)}</textarea>
          <button class="btn small" data-copy="${i}">Copier l'étape</button>
        </li>`).join("")}</ol>
      <p class="muted" style="margin-top:12px;max-width:80ch">${esc(K.note)}</p>
      ${K.principes ? `<section class="section"><h2>${esc(K.principesTitre || "Les règles d'une bonne chaîne")}</h2><div class="tech">${K.principes.map((t) => `<div class="rule"><strong>${esc(t.t)}</strong><p>${esc(t.d)}</p></div>`).join("")}</div></section>` : ""}
      ${K.defis ? `<section class="section"><h2>${esc(K.defisTitre || "Défis chronométrés")}</h2>${K.defisNote ? `<p class="intro">${esc(K.defisNote)}</p>` : ""}
        <div class="grid-3">${K.defis.map((d) => `<div class="panel defi"><span class="n">${d.n}</span><h3>${esc(d.titre)}</h3><p>${esc(d.consigne)}</p><button class="btn lamp" data-defi="${d.min}">Lancer ${d.min} min</button></div>`).join("")}</div></section>` : ""}
      ${K.battle ? `<section class="section"><h2>${esc(K.battle.titre)}</h2><p class="intro">${esc(K.battle.texte)}</p>
        <div class="award"><span>Gagnante :</span>${S.names.map((n, i) => `<button class="btn small lamp" data-award="${i}" data-pts="3">${esc(n)} +3</button>`).join("")}</div>
        <div class="award" style="margin-top:8px"><span>Deuxième :</span>${S.names.map((n, i) => `<button class="btn small" data-award="${i}" data-pts="1">${esc(n)} +1</button>`).join("")}</div></section>` : ""}`;
  };
  BIND.chaine = (root) => {
    const fit = (t) => { t.style.height = "auto"; t.style.height = t.scrollHeight + 2 + "px"; };
    $$("[data-cp]", root).forEach((t) => { t.oninput = () => fit(t); requestAnimationFrame(() => fit(t)); });
    $$("[data-copy]", root).forEach((b) => (b.onclick = async () => { try { await navigator.clipboard.writeText($(`[data-cp="${b.dataset.copy}"]`, root).value); toast("Étape copiée"); } catch (e) { toast("Copie impossible : sélectionnez le texte"); } }));
    $("[data-run]", root).onclick = () => {
      const links = $$("[data-link]", root);
      links.forEach((l) => l.classList.remove("lit", "flow"));
      links.forEach((l, i) => setTimeout(() => { l.classList.add("lit"); if (i < links.length - 1) l.classList.add("flow"); }, i * 650));
    };
    $$("[data-defi]", root).forEach((b) => (b.onclick = () => { setTimer(+b.dataset.defi, true); toast(`Chrono lancé : ${b.dataset.defi} minutes`); }));
    const fb = $("[data-fiche]", root);
    if (fb) fb.onclick = async () => { try { await navigator.clipboard.writeText(C.client.ficheTexte); toast("Fiche copiée"); } catch (e) { toast("Copie impossible"); } };
  };

  /* --- Gabarit « audit » : trouver les erreurs dans une sortie d'IA --- */
  RENDER.audit = (p) => {
    const A = C[p.data];
    return `${head(p, p.lede)}
      <p style="max-width:75ch;margin:-6px 0 18px">${esc(A.consigne)}</p>
      <div class="btn-row" style="margin-bottom:14px"><button class="btn lamp" data-audit-time>Lancer ${A.minutes || 8} min de recherche</button><button class="btn" data-audit-all>Tout révéler</button><button class="btn" data-audit-reset>Masquer</button></div>
      <div class="audit-grid">
        <article class="panel audit-doc"><span class="kicker-doc">${esc(A.titreDoc)}</span>
          ${A.texte.map((para) => `<p>${para.map((seg) => typeof seg === "string" ? esc(seg) : `<mark class="err" data-err="${seg.e}">${esc(seg.t)}<sup>${seg.e + 1}</sup></mark>`).join("")}</p>`).join("")}
        </article>
        <ol class="audit-list">${A.erreurs.map((e, i) => `<li data-erritem="${i}"><button class="btn small" data-errbtn="${i}">Erreur ${i + 1}</button><div class="err-body" hidden><strong>${esc(e.titre)}</strong><p>${esc(e.explication)}</p></div></li>`).join("")}</ol>
      </div>
      ${A.lecon ? `<p class="ask" style="margin-top:18px">${esc(A.lecon)}</p>` : ""}
      ${awardRow("Erreur trouvée par")}`;
  };
  BIND.audit = (root, p) => {
    const A = C[p.data];
    const show = (i, on) => {
      $$(`[data-err="${i}"]`, root).forEach((m) => m.classList.toggle("on", on));
      const li = $(`[data-erritem="${i}"]`, root); $(".err-body", li).hidden = !on; li.classList.toggle("on", on);
    };
    $$("[data-errbtn]", root).forEach((b) => (b.onclick = () => { const i = +b.dataset.errbtn; show(i, $(".err-body", b.parentElement).hidden); }));
    $("[data-audit-all]", root).onclick = () => A.erreurs.forEach((_, i) => show(i, true));
    $("[data-audit-reset]", root).onclick = () => A.erreurs.forEach((_, i) => show(i, false));
    $("[data-audit-time]", root).onclick = () => setTimer(A.minutes || 8, true);
  };

  /* --- CP9 Battle finale --- */
  RENDER.final = (p) => `
    ${head(p, p.lede)}
    ${quizHTML("quiz-battle")}
    <section class="section"><h2>Le classement</h2><div class="podium" id="podium"></div></section>
    <section class="section"><h2>Ce qu'il faut retenir</h2><ol class="retenir">${C.aRetenir.map((r) => `<li>${esc(r)}</li>`).join("")}</ol></section>
    <section class="section"><div class="client-card"><span class="kicker">${esc(C.client.seance2Kicker)}</span><h2>${esc(C.client.seance2Titre)}</h2><p>${esc(C.client.seance2)}</p></div></section>`;
  BIND.final = (root) => { mountQuiz($("#quiz-battle", root), C.battle, { award: true, timer: true, awardLabel: "Point pour" }); renderPodium(); };
  function renderPodium() {
    const el = $("#podium"); if (!el) return;
    const order = S.names.map((n, i) => ({ n, s: S.scores[i] })).sort((a, b) => b.s - a.s);
    const max = Math.max(1, order[0].s);
    el.innerHTML = order.map((o, i) => `<div class="pl ${i === 0 && o.s > 0 ? "first" : ""}"><div class="bar" style="height:${40 + (o.s / max) * 150}px">${o.s}</div><div class="name">${esc(o.n)}</div></div>`).join("");
  }

  /* --- Ressources --- */
  RENDER.ressources = () => `
    <header class="page-head"><h1>Ressources</h1><p class="lede">Les documents de la séance, à télécharger.</p></header>
    <div class="res-list">${C.ressources.map((r) => `
      <div class="res"><span class="type">${esc(r.type)}</span><strong>${esc(r.titre)}</strong>
        ${r.dispo ? `<a class="btn small lamp" href="${esc(r.fichier)}" download>Télécharger</a>` : `<span class="soon">Disponible après la séance</span>`}
      </div>`).join("")}</div>
    ${(C.actus || []).length ? `<section class="section"><h2>Les sources</h2>
      <ul>${C.actus.map((a) => `<li><a href="${esc(a.src)}" target="_blank" rel="noopener">${esc(a.titre)}</a> <span class="muted">(${esc(a.date)}, ${esc(a.srcNom)})</span></li>`).join("")}</ul>
    </section>` : ""}`;

  /* --- Simulateur de pitch (séance 2) --- */
  RENDER.pitch = (p) => {
    const P = C.pitch;
    return `
    <header class="page-head"><h1>${esc(P.titre || "Simulateur de pitch")}</h1><p class="lede">${esc(P.lede)}</p></header>
    <div class="pitch-wrap">
      <div class="panel">
        <div class="field"><label for="p-agence">Équipe qui présente</label><select id="p-agence">${S.names.map((n, i) => `<option value="${i}">${esc(n)}</option>`).join("")}</select></div>
        <ol class="roles" id="p-roles"></ol>
      </div>
      <div class="panel pitch-stage">
        ${P.phases ? `<div class="phase" id="p-phase">${esc(P.phases[0].label)}</div>` : ""}
        <div class="pitch-clock" id="p-clock">${fmt(P.duree)}</div>
        <div class="pitch-bar"><span id="p-bar"></span></div>
        <div class="btn-row" style="justify-content:center;margin-top:16px"><button class="btn lamp" id="p-go">Lancer le pitch</button><button class="btn" id="p-reset">Recommencer</button><button class="btn" id="p-now">Objection maintenant</button></div>
        <div class="objection" id="p-obj" hidden></div>
        ${P.cartes ? `<div class="carte-zone"><div class="btn-row" style="justify-content:center"><button class="btn" id="p-draw">${esc(P.cartesBouton || "Tirer la carte du juré")}</button><button class="btn" id="p-show" disabled>Révéler la carte</button></div><div class="carte" id="p-carte" hidden></div></div>` : ""}
      </div>
    </div>
    <p class="source" style="margin-top:14px">${esc(P.origine)}</p>`;
  };
  BIND.pitch = (root) => {
    const P = C.pitch; let left = P.duree, id = null, fired = false, end = 0;
    const roles = () => {
      const i = +$("#p-agence", root).value, mem = (S.members[i] || []);
      $("#p-roles", root).innerHTML = P.roles.map((r, k) => `<li><strong>${esc(r)}</strong><span>${esc(mem[k % Math.max(1, mem.length)] || "À attribuer")}</span></li>`).join("");
    };
    const draw = () => {
      $("#p-clock", root).textContent = fmt(left); $("#p-bar", root).style.width = `${(1 - left / P.duree) * 100}%`; $("#p-clock", root).classList.toggle("hot", left <= 30);
      if (P.phases) { let el = P.duree - left, acc = 0, cur = P.phases[P.phases.length - 1]; for (const ph of P.phases) { acc += ph.sec; if (el < acc) { cur = ph; break; } } $("#p-phase", root).textContent = cur.label; }
    };
    let carte = null;
    const dr = $("#p-draw", root), sh = $("#p-show", root);
    if (dr) dr.onclick = () => {
      carte = P.cartes[Math.floor(Math.random() * P.cartes.length)];
      const c = $("#p-carte", root); c.hidden = false; c.className = "carte dos";
      c.innerHTML = `<span>Carte tirée</span><small>Le juré la lit en silence${carte.consigne ? " : consigne de jeu au dos" : ""}</small>`;
      c.onclick = () => { if (c.classList.contains("dos") && carte.consigne) { c.classList.toggle("juge"); c.innerHTML = c.classList.contains("juge") ? `<strong>${esc(carte.nom)}</strong><small>${esc(carte.consigne)}</small><em>Touchez pour cacher</em>` : `<span>Carte tirée</span><small>Touchez pour lire la consigne (juré uniquement)</small>`; } };
      sh.disabled = false;
    };
    if (sh) sh.onclick = () => { if (!carte) return; const c = $("#p-carte", root); c.className = "carte face"; c.onclick = null; c.innerHTML = `<span>Profil du client</span><strong>${esc(carte.nom)}</strong><small>${esc(carte.indices || "")}</small>`; };
    const fire = () => {
      if (fired) return; fired = true;
      const i = +$("#p-agence", root).value, mem = (S.members[i] || []).filter(Boolean);
      const who = mem.length ? mem[Math.floor(Math.random() * mem.length)] : P.roles[Math.floor(Math.random() * P.roles.length)];
      const ob = P.objections[Math.floor(Math.random() * P.objections.length)];
      const o = $("#p-obj", root); o.hidden = false;
      o.innerHTML = `<span class="kicker">${esc(P.objectionTitre || "Objection")}</span><p>${esc(ob)}</p><span class="who">Répond : <strong>${esc(who)}</strong></span>`;
      o.classList.remove("in"); void o.offsetWidth; o.classList.add("in"); chime();
    };
    const tick = () => {
      left = Math.max(0, Math.round((end - Date.now()) / 1000)); draw();
      if (!fired && left <= P.duree - P.objectionA) fire();
      if (left === 0) { clearInterval(id); id = null; chime(); $("#p-go", root).textContent = "Lancer le pitch"; }
    };
    $("#p-agence", root).onchange = roles; roles(); draw();
    $("#p-go", root).onclick = () => {
      if (id) { clearInterval(id); id = null; $("#p-go", root).textContent = "Reprendre"; return; }
      if (left === 0) return;
      end = Date.now() + left * 1000; id = setInterval(tick, 250); $("#p-go", root).textContent = "Pause";
    };
    $("#p-reset", root).onclick = () => { clearInterval(id); id = null; left = P.duree; fired = false; $("#p-obj", root).hidden = true; $("#p-go", root).textContent = "Lancer le pitch"; draw(); };
    $("#p-now", root).onclick = fire;
  };

  /* --- Glossaire --- */
  RENDER.glossaire = () => `
    <header class="page-head"><h1>Glossaire</h1><p class="lede">Les mots de la séance. Ils reviennent dans la battle finale.</p></header>
    <dl class="gloss">${C.glossaire.map(([t, d]) => `<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join("")}</dl>`;

  /* ---------- Démarrage ---------- */
  window.__setTimer = setTimer;
  initHeader(); initTimer(); renderBibs();
  $("#prev").onclick = () => step(-1);
  $("#next").onclick = () => step(1);
  document.addEventListener("keydown", (e) => {
    if (e.target.closest("input, textarea, select, dialog")) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); step(1); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); step(-1); }
    else if (e.key === " " && !e.target.closest("button")) { e.preventDefault(); T.running ? stopTimer() : startTimer(); }
  });
  window.addEventListener("hashchange", route);
  route();
})();
