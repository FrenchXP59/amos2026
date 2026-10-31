import {unlockClass,loadClass} from "./access.mjs";
/* =========================================================================
   LA BOX IA — moteur.
   Routes : #/                → année courante
            #/2026-2027       → une année
            #/2026-2027/b3b   → une classe (code demandé)
   Le contenu d'une classe n'est chargé qu'avec le bon code : son fichier
   porte l'empreinte du code (voir outils/build.mjs).
   ========================================================================= */
(function () {
  "use strict";
  const IDX = window.__BOX_ANNEES || { annees: [], courante: null };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Stockage local protégé ---------- */
  const KEY = "amos-box";
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const st = load(); st.codes = st.codes || {}; st.grants = st.grants || {};
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* indisponible */ } };

  /* ---------- Chargement de scripts (fonctionne aussi en local, sans serveur) ---------- */
  const cache = {};
  function loadScript(src) {
    if (cache[src]) return cache[src];
    cache[src] = new Promise((ok, ko) => {
      const s = document.createElement("script");
      s.src = src; s.onload = () => ok(); s.onerror = () => { delete cache[src]; s.remove(); ko(new Error("introuvable")); };
      document.head.appendChild(s);
    });
    return cache[src];
  }
  async function getPublic(annee) {
    await loadScript(`data/${annee}/public.js`);
    return window.__BOX_PUBLIC[annee];
  }
  const classes = {};
  let teacherActive = false;
  const teacherURL = new URL('.netlify/functions/formateur', location.href.split('#')[0]);
  async function teacherStatus(){ try{return (await fetch(teacherURL,{cache:'no-store'})).ok;}catch{return false;} }
  async function teacherClass(annee,k){
    const url=new URL(teacherURL); url.searchParams.set('annee',annee); url.searchParams.set('classe',k);
    const response=await fetch(url,{cache:'no-store'});
    if(response.status===401){teacherActive=false;updateTeacherButton();return null;}
    if(!response.ok)throw new Error('Accès formateur indisponible');
    const {id}=await response.json();return loadClass(annee,k,id);
  }
  function updateTeacherButton(){ $('#teacher-btn').textContent=teacherActive?'Quitter le mode formateur':'Espace formateur'; }
  $('#teacher-btn').onclick=async()=>{
    if(teacherActive){try{const response=await fetch(teacherURL,{method:'DELETE'});if(!response.ok)throw new Error('logout');}catch{toast('Déconnexion impossible. Réessayez.');return;} teacherActive=false;Object.keys(classes).forEach(k=>delete classes[k]);updateTeacherButton();toast('Mode formateur quitté');route();return;}
    $('#teacher-error').textContent='';$('#teacher-code').value='';$('#teacher-dialog').showModal();$('#teacher-code').focus();
  };
  $('#teacher-cancel').onclick=()=>$('#teacher-dialog').close();
  $('#teacher-form').onsubmit=async e=>{
    e.preventDefault();const input=$('#teacher-code'),button=e.submitter;button.disabled=true;$('#teacher-error').textContent='';
    try{const res=await fetch(teacherURL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:input.value})});input.value='';if(!res.ok){$('#teacher-error').textContent=res.status===401?'Code incorrect.':'Accès momentanément indisponible. Réessayez.';return;}
      teacherActive=true;updateTeacherButton();$('#teacher-dialog').close();toast('Mode formateur activé');await route(true);
    }catch{$('#teacher-error').textContent='Connexion impossible. Réessayez.';}finally{button.disabled=false;}
  };
  async function getClasse(annee, k, code) {
    const {content, id} = await unlockClass(annee, k, code);
    const key = `${annee}/${k}`;
    classes[key] = content; st.grants[key] = id;
    delete st.codes[key]; save();
    return content;
  }

  /* ---------- Dates ---------- */
  const JOURS = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."];
  const MOIS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
  const parts = (iso) => { const d = new Date(iso + "T12:00:00"); return { j: JOURS[d.getDay()], n: d.getDate(), m: MOIS[d.getMonth()], y: d.getFullYear() }; };
  // Une séance est terminée après son heure de fin : avant, les applis (et leurs réponses) restent masquées.
  const over = (s) => { const fin = ((s.heure || "").split("–")[1] || "23:59").trim(); return new Date() > new Date(`${s.date}T${fin}:00`); };
  const status = (iso) => (iso < today() ? "past" : iso === today() ? "today" : "future");
  const hour = (h) => h.replace(/(^|–)0(\d)/g, "$1$2").replace(/:00/g, "h").replace(/:(\d\d)/g, "h$1").replace("–", " – ");

  /* ---------- Toast et thème ---------- */
  let tT; const toast = (m) => { const t = $("#toast"); t.textContent = m; t.classList.add("show"); clearTimeout(tT); tT = setTimeout(() => t.classList.remove("show"), 1800); };
  const applyTheme = () => { document.documentElement.dataset.theme = st.theme || "nuit"; $("#theme-btn").textContent = (st.theme || "nuit") === "nuit" ? "Jour" : "Nuit"; };
  $("#theme-btn").onclick = () => { st.theme = (st.theme || "nuit") === "nuit" ? "jour" : "nuit"; save(); applyTheme(); };

  /* ---------- Gabarits ---------- */
  const bib = (label, annee) => `<div class="bib"><span class="code">${esc(label)}</span><span class="strip">${esc(annee)}</span></div>`;
  function videoHTML(u) {
    if (!u) return "";
    const yt = u.match(/(?:youtu\.be\/|v=|shorts\/)([\w-]{11})/), dr = u.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (/\.(mp4|webm|mov)(\?|$)/i.test(u)) return `<div class="video"><video src="${esc(u)}" controls preload="metadata"></video></div>`;
    const src = yt ? `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0` : dr ? `https://drive.google.com/file/d/${dr[1]}/preview` : u;
    return `<div class="video"><iframe src="${esc(src)}" title="Vidéo de la séance" allow="fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
  }

  /* ---------- Vue : une année ---------- */
  function yearView(P) {
    const groups = [["Bachelor", (k) => k.startsWith("b")], ["Mastère", (k) => k.startsWith("m")]];
    return `
      <section class="hero"><h1>${esc(P.annee)}</h1><p>Choisissez votre classe. Le code d'accès vous est donné en début de séance.</p></section>
      ${groups.map(([g, f]) => {
        const ks = Object.keys(P.classes).filter(f);
        if (!ks.length) return "";
        return `<section class="group"><h2>${g}</h2><div class="classes">${ks.map((k) => {
          const cl = P.classes[k], nx = cl.dates.find((d) => d.date >= today()), p = nx && parts(nx.date);
          return `<a class="bib-card" href="#/${esc(P.annee)}/${k}">${bib(cl.label, P.annee)}
            <ul class="courses">${cl.cours.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
            <span class="next">${nx ? `Prochaine séance : <strong>${p.j} ${p.n} ${p.m}, ${esc(hour(nx.heure).split(" – ")[0])}</strong>` : "Toutes les séances sont passées"}</span>
          </a>`;
        }).join("")}</div></section>`;
      }).join("")}`;
  }

  /* ---------- Vue : code de la classe ---------- */
  function lockView(P, k) {
    const cl = P.classes[k];
    return `<a class="back" href="#/${esc(P.annee)}">Toutes les classes</a>
      <section class="lock">${bib(cl.label, P.annee)}
        <h1 style="font-size:2.4rem">Code de la classe</h1>
        <p class="muted">${esc(cl.niveau)}, ${esc(cl.programme)}</p>
        <form id="code-form" autocomplete="off">
          <input id="code" maxlength="12" aria-label="Code de la classe" autocapitalize="characters" spellcheck="false">
          <button class="btn primary">Entrer</button>
        </form>
        <p class="err" id="err" role="alert"></p>
      </section>`;
  }
  function bindLock(P, k) {
    const inp = $("#code"); inp.focus();
    $("#code-form").onsubmit = async (e) => {
      e.preventDefault();
      const v = inp.value.trim().toUpperCase().replace(/\s/g, "");
      if (!v) return;
      try {
        await getClasse(P.annee, k, v);
        inp.value = ""; route(true);
      } catch (err) {
        inp.classList.remove("bad"); void inp.offsetWidth; inp.classList.add("bad");
        $("#err").textContent = window.crypto && crypto.subtle ? "Code incorrect. Il est donné en début de séance." : "Ce navigateur ne peut pas vérifier le code. Ouvrez la box en https.";
      }
    };
  }

  /* ---------- Vue : classe ouverte ---------- */
  function classView(P, k, C, justOpened) {
    const cl = P.classes[k], nx = C.seances.find((s) => s.date >= today());
    const byCours = {};
    C.seances.forEach((s) => (byCours[s.cours] = byCours[s.cours] || []).push(s));
    const np = nx && parts(nx.date);
    return `<a class="back" href="#/${esc(P.annee)}">Toutes les classes</a>
      <section class="class-head ${justOpened ? "unlocked" : ""}">${bib(cl.label, P.annee)}
        <div><h1>${esc(cl.niveau)}</h1><p>${esc(cl.programme)}. Intervenant : ${esc(P.intervenant)}.</p>
        ${teacherActive ? '<p class="muted">Mode formateur actif</p>' : '<p><button class="icon-btn" id="lock-btn">Verrouiller sur cet appareil</button></p>'}</div>
      </section>
      ${nx ? `<section class="next-card">
        <div class="day"><b>${np.n}</b><span>${np.m}</span></div>
        <div><h2>${status(nx.date) === "today" ? "Aujourd'hui" : "Prochaine séance"} : ${esc(C.cours[nx.cours].titre)}</h2>
          <p>${np.j} ${np.n} ${np.m} ${np.y}, ${esc(hour(nx.heure))}${nx.titre ? `. ${esc(nx.titre)}` : ""}</p></div>
        <button class="btn primary" data-goto="s-${esc(nx.cours)}-${nx.n}">Voir la séance</button>
      </section>` : ""}
      ${Object.entries(byCours).map(([cid, ss]) => courseHTML(C, cid, ss)).join("")}`;
  }
  function courseHTML(C, cid, ss) {
    const c = C.cours[cid], tools = (c.outils || []).map((o) => C.outils[o]).filter(Boolean);
    return `<section class="course" id="c-${cid}">
      <header><h2>${esc(c.titre)}</h2>
        <p class="meta">${esc(c.ue)}, semestre ${c.semestre}. ${esc(c.volume)}. Évaluation : ${esc(c.evaluation)}.</p>
        <p class="desc">${esc(c.descriptif)}</p>
        <details class="obj"><summary>Les objectifs du cours</summary><ul>${c.objectifs.map((o) => `<li>${esc(o)}</li>`).join("")}</ul></details>
      </header>
      <ol class="timeline">${ss.map((s) => seanceHTML(s, cid)).join("")}</ol>
      ${tools.length ? `<h3 style="font-size:1.6rem;margin-top:8px">Les applis du cours</h3><div class="tools">${tools.map((t) => `<a class="tool" href="${esc(t.url)}" target="_blank" rel="noopener"><strong>${esc(t.nom)}</strong><span>${esc(t.desc)}</span></a>`).join("")}</div>` : ""}
    </section>`;
  }
  function seanceHTML(s, cid) {
    const p = parts(s.date), stt = status(s.date);
    const futur = !teacherActive && s.date > today();
    const fini = teacherActive || over(s);
    const apps = fini
      ? (s.apps || []).map((a) => `<a class="item" href="${esc(a.url)}" target="_blank" rel="noopener"><span class="k">Appli</span><span>${esc(a.label)}</span></a>`)
      : (s.apps || []).length ? [`<span class="item off"><span class="k">Appli</span><span>Projetée en cours, ouverte ici après la séance pour réviser.</span></span>`] : [];
    const res = (futur ? [] : (s.ressources || [])).map((r) => `<a class="item" href="${esc(r.url)}" download><span class="k">${esc(r.type || "PDF")}</span><span>${esc(r.titre)}</span></a>`);
    const quiz = fini && s.video && (s.apps || [])[0] ? [`<a class="item" href="${esc(s.apps[0].url.split("#")[0])}#video" target="_blank" rel="noopener"><span class="k">${s.videoSuite ? "Débat" : "Quiz"}</span><span>${s.videoSuite ? "Débat de la vidéo" : "Quiz de la vidéo"}</span></a>`] : [];
    const items = futur ? [`<span class="item off"><span class="k">Bientôt</span><span>Les ressources seront disponibles le jour de la séance.</span></span>`] : quiz.concat(apps, res);
    return `<li class="seance ${stt}" id="s-${cid}-${s.n}">
      <div class="when"><b>${p.n}</b><span>${p.j} ${p.m}</span></div>
      <div class="body">
        <div class="row"><h3>Séance ${s.n}</h3><span class="pill ${stt === "today" ? "today" : ""}">${stt === "past" ? "Passée" : stt === "today" ? "Aujourd'hui" : "À venir"}</span></div>
        <p class="hour">${esc(hour(s.heure))}${s.titre ? `. ${esc(s.titre)}` : ""}</p>
        ${futur ? "" : videoHTML(s.video)}
        <div class="items">${items.length ? items.join("") : `<span class="item off"><span class="k">Bientôt</span><span>Vidéo, applis et documents mis en ligne autour de la séance.</span></span>`}</div>
      </div>
    </li>`;
  }

  /* ---------- Routeur ---------- */
  async function route(justOpened) {
    const main = $("#main");
    const [, a, k] = (location.hash.match(/^#\/([\d-]+)?\/?([a-z0-9]+)?/) || []);
    const annee = IDX.annees.includes(a) ? a : IDX.courante;
    renderYears(annee);
    const convention = new URL('convention/', location.href);
    if (annee) convention.searchParams.set('annee', annee);
    if (k) convention.searchParams.set('classe', k);
    $('#convention-link').href = convention.href;
    if (!annee) { main.innerHTML = `<p class="muted">Aucune année publiée.</p>`; return; }
    let P;
    try { P = await getPublic(annee); } catch (e) { main.innerHTML = `<p class="muted">Données de l'année ${esc(annee)} introuvables.</p>`; return; }
    $("#foot").innerHTML = `<span>AMOS Sport Business School, ${esc(annee)}. ${esc(P.intervenant)}.</span>${P.archive && P.archive.url ? `<a href="${esc(P.archive.url)}">Espace ${esc(P.archive.label)}</a>` : ""}`;

    if (!k || !P.classes[k]) { main.innerHTML = yearView(P); document.title = `La box IA, AMOS ${annee}`; }
    else {
      const key = `${annee}/${k}`;
      let C = classes[key];
      if (!C && teacherActive) { try { C = await teacherClass(annee,k); if(C)classes[key]=C; } catch { main.innerHTML = `<p class="err">Accès formateur indisponible. Réessayez.</p>`; return; } }
      if (!C && st.grants[key]) {
        try { C = await loadClass(annee, k, st.grants[key]); classes[key] = C; }
        catch { delete st.grants[key]; save(); }
      }
      if (!C && st.codes[key]) { try { C = await getClasse(annee, k, st.codes[key]); } catch (e) { delete st.codes[key]; save(); } }
      document.title = `${P.classes[k].label}, la box IA`;
      if (!C) { main.innerHTML = lockView(P, k); bindLock(P, k); }
      else {
        main.innerHTML = classView(P, k, C, justOpened === true);
        $$("[data-goto]").forEach((b) => (b.onclick = () => { const t = document.getElementById(b.dataset.goto); if (t) t.scrollIntoView({ behavior: "smooth", block: "start" }); }));
        const lock = $("#lock-btn"); if (lock) lock.onclick = () => { delete st.codes[key]; delete st.grants[key]; delete classes[key]; save(); toast("Classe verrouillée sur cet appareil"); route(); };
      }
    }
    if (justOpened !== true) window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }
  function renderYears(cur) {
    $("#years").innerHTML = IDX.annees.length > 1
      ? IDX.annees.map((y) => `<a class="year ${y === cur ? "on" : ""}" href="#/${y}">${y}</a>`).join("")
      : (cur ? `<span class="year on">${esc(cur)}</span>` : "");
  }

  applyTheme();
  window.addEventListener("hashchange", () => route());
  teacherStatus().then(async active=>{teacherActive=active;updateTeacherButton();await route();if(new URL(location.href).searchParams.has('formateur')&&!teacherActive)$('#teacher-btn').click();});
})();
