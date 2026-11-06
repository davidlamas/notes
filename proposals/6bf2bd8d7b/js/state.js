/* Shared core: data assembly, helpers, selection, detail panel, URL state. No dependencies. */
(function () {
  const M = window.MOZ = window.MOZ || {};
  const nodes = [].concat(M.partners, M.objectives, M.wps, M.tasks, M.deliverables, M.milestones, M.decisions, M.esr, M.evidence, M.partb);
  const N = {}; nodes.forEach(n => N[n.id] = n);
  const adj = {};
  M.links.forEach(([a, b]) => { if (!N[a] || !N[b]) return; (adj[a] = adj[a] || new Set()).add(b); (adj[b] = adj[b] || new Set()).add(a); });

  const LAYERS = [
    { k: "tasks", label: "Tasks" },
    { k: "time", label: "Deliverables and milestones" },
    { k: "decisions", label: "2027 decisions" },
    { k: "weak", label: "2026 reviewer weaknesses" },
    { k: "evid", label: "Documents to secure" },
    { k: "partners", label: "Partners and leads" },
    { k: "status", label: "Keep, revise, new" }
  ];
  const PRESETS = [
    { k: "default", label: "Start view", layers: ["time", "status"] },
    { k: "plan", label: "Plan", layers: ["tasks", "time", "partners"] },
    { k: "changes", label: "What changed from 2026", layers: ["tasks", "status", "decisions"] },
    { k: "reviewers", label: "What reviewers said", layers: ["weak", "decisions"] },
    { k: "secure", label: "What we must secure", layers: ["evid", "decisions", "weak"] }
  ];
  const LENSES = [["eval", "Evaluation"], ["plan", "Plan"], ["partners", "Partners"], ["evid", "Evidence"], ["partb", "Part B"], ["cost", "Budget"]];

  const A = window.App = {
    M, nodes, N, adj, LAYERS, PRESETS, LENSES, views: {},
    state: { mode: "overview", lens: "eval", sel: null, rc: null, layers: PRESETS[0].layers.slice() },
    PR: { Critical: 0, High: 1, Medium: 2, Low: 3 }
  };
  A.esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  A.nb = id => [...(adj[id] || [])].map(x => N[x]).filter(Boolean);
  A.isW = n => !!n && n.type === "esr" && n.kind === "Weakness";
  A.byType = t => nodes.filter(n => n.type === t);
  A.byId = id => N[id];
  A.num = (a, b) => a.id.localeCompare(b.id, undefined, { numeric: true });
  /* Everything that belongs to a work package: itself, its tasks, deliverables and milestones. */
  A.members = wp => [wp].concat(nodes.filter(n => n.wp === wp));
  /* Neighbours of a work package or of any of its tasks, filtered by test. */
  A.reach = (wp, test) => {
    const seen = new Map();
    A.members(wp).forEach(id0 => { const id = id0.id || id0; A.nb(id).forEach(x => { if (test(x)) seen.set(x.id, x); }); });
    return [...seen.values()].sort(A.num);
  };
  const wc = {}; nodes.forEach(n => { wc[n.id] = A.nb(n.id).filter(A.isW).length; });
  A.dot = id => wc[id] ? `<span class="dot" title="${wc[id]} reviewer weakness(es) linked to this item"><span class="sr-only">Linked to </span>${wc[id]}<span class="sr-only"> weaknesses</span></span>` : "";
  A.wc = wc;
  A.dtag = n => n.disposition ? `<span class="tag ${n.disposition}">${{ keep: "Keep", revise: "Revise", new: "New" }[n.disposition]}</span>` : "";
  A.ptag = n => (A.isW(n) && n.priority) ? `<span class="tag ${n.priority === "Critical" ? "crit" : n.priority === "High" ? "high" : ""}">${A.esc(n.priority)}</span>` : "";
  A.fmt = v => "€" + v.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  /* ---------- selection and highlighting ---------- */
  A.root = () => document.getElementById(A.state.mode === "overview" ? "overview" : "explore");
  A.hl = function () {
    const s = A.state.sel, nbs = s ? new Set([s].concat([...(adj[s] || [])])) : null;
    document.querySelectorAll("#overview [data-id], #overview [data-has], #stage [data-id]").forEach(e => {
      e.classList.remove("sel", "lk", "dim");
      if (!nbs) return;
      const id = e.dataset.id, has = e.dataset.has;
      if (id === s) e.classList.add("sel");
      else if (nbs.has(id) || (has && has.split(" ").some(x => nbs.has(x)))) e.classList.add("lk");
      else e.classList.add("dim");
    });
    const tr = document.getElementById("trace");
    if (tr) A.trace(tr);
  };
  A.select = function (id, toggle) {
    A.state.sel = (toggle && A.state.sel === id) ? null : id;
    A.hl(); A.panels(); A.url();
  };
  A.trace = function (el) {
    const n = N[A.state.sel];
    if (!n) { el.hidden = true; return; }
    const L = A.nb(n.id).sort((a, b) => (A.isW(b) - A.isW(a)) || A.num(a, b));
    el.hidden = false;
    el.innerHTML = `<b>${n.id} ${A.esc(n.title)}</b> connects to ${L.length}: ` +
      L.map(x => `<button type="button" class="${A.isW(x) ? "w" : x.type === "esr" ? "s" : ""}" data-go="${x.id}" title="${A.esc(x.title)}">${x.id}</button>`).join("") +
      `<button type="button" class="x" data-clear="1">Clear selection</button>`;
  };

  /* ---------- detail panel ---------- */
  const TL = { esr: "Reviewer observations", task: "Tasks", deliverable: "Deliverables", milestone: "Milestones", wp: "Work packages", decision: "Decisions", evidence: "Documents to secure", partb: "Part B sections", partner: "Partners", objective: "Objectives" };
  const TS = { esr: "Reviewer observation", task: "Task", deliverable: "Deliverable", milestone: "Milestone", wp: "Work package", decision: "Decision", evidence: "Document to secure", partb: "Part B section", partner: "Partner", objective: "Objective" };
  const ORIG = { decided: "Decided by David (decision log)", proposed: "Proposed by the assistant, not yet confirmed by partners", "sealed-2026": "From the sealed 2026 proposal", evaluator: "EACEA evaluation of the 2026 proposal", matrix: "From the ESR response matrix evidence list" };
  A.TL = TL;
  A.panels = function () {
    ["panel-overview", "panel-explore"].forEach(pid => {
      const el = document.getElementById(pid); if (el) A.renderPanel(el);
    });
  };
  A.renderPanel = function (p) {
    const n = N[A.state.sel], esc = A.esc;
    if (!n) {
      p.innerHTML = `<p class="eyebrow">Details</p><h2>Select anything</h2><p class="hint">Pick a work package, task, reviewer comment or document. What it connects to is highlighted and listed here.</p><p class="hint"><span class="dot">3</span> A number in a brown-orange circle shows how many reviewer weaknesses from 2026 are tied to the item.</p>`;
      return;
    }
    const f = (l, v) => v ? `<div class="f"><b>${l}</b>${esc(v)}</div>` : "";
    let h = `<p class="eyebrow">${TS[n.type] || n.type}</p><div>${A.dtag(n)}${n.type === "esr" ? `<span class="tag ${n.kind === "Weakness" ? "high" : "keep"}">${n.kind}</span>` : ""}${A.ptag(n)}</div><h2>${n.id} · ${esc(n.title)}</h2>`;
    if (n.type === "esr") {
      h += f("Evaluator observation", n.observation) + f("What the 2026 proposal said", n.proposal_ref) + f("Diagnosis", n.diagnosis) + f("Evidence now available", n.baseline);
      h += `<div class="f"><b>Required 2027 response</b><div class="resp">${esc(n.response)}</div></div>` + f("Owner and validation needed", n.owner) + f("Proof or indicator", n.indicator) + f("Root causes", (n.root_causes || []).map(r => r + " " + M.meta.rc[r]).join(" · "));
    } else {
      h += f("Detail", n.detail) + f("Why it is needed", n.use) + f("Location", n.location);
      if (n.type === "wp") h += f("Proposed 2027 summary", n.blurb) + f("Lead", `2026: ${n.lead2026} · 2027 proposed: ${n.lead2027}`) + f("Duration", n.duration);
      if (n.type === "partner") h += f("2026 role", n.role2026) + f("2027 role", n.role2027);
      if (n.type === "deliverable" || n.type === "milestone") h += f("Due", `Month ${n.month} · lead ${n.lead}`);
      if (n.type === "evidence") h += f("From", n.owner) + f("Held in baseline folder", n.held) + f("Priority", n.priority);
      if (n.type === "partb") h += f("Drafting", n.draft);
      h += f("Note", n.note);
    }
    h += `<div class="f"><b>Origin</b>${ORIG[n.origin] || ""}</div>`;
    const g = {}; A.nb(n.id).forEach(x => (g[x.type] = g[x.type] || []).push(x));
    for (const t of ["esr", "decision", "task", "deliverable", "milestone", "wp", "partb", "evidence", "partner", "objective"]) {
      if (!g[t]) continue;
      h += `<div class="lk-g">${TL[t]} (${g[t].length})</div>`;
      g[t].sort((a, b) => (A.isW(b) - A.isW(a)) || A.num(a, b)).forEach(x => h += `<button type="button" class="lk-b ${A.isW(x) ? "w" : x.type === "esr" ? "s" : ""}" data-go="${x.id}"><b>${x.id}</b> ${esc(x.title)}${A.isW(x) ? ' <span class="tag high">Weakness</span>' : ""}</button>`);
    }
    h += `<button type="button" class="secondary-button" data-clear="1">Clear selection</button>`;
    p.innerHTML = h;
  };

  /* ---------- URL state (query string, like the other notes pages) ---------- */
  A.url = function () {
    const s = A.state, p = new URLSearchParams();
    if (s.mode === "explore") p.set("mode", "explore");
    if (s.mode === "explore" && s.lens !== "eval") p.set("lens", s.lens);
    if (s.mode === "overview" && s.layers.slice().sort().join() !== PRESETS[0].layers.slice().sort().join()) p.set("layers", s.layers.join(",") || "none");
    if (s.sel) p.set("sel", s.sel);
    if (s.rc && s.mode === "explore") p.set("rc", s.rc);
    try { history.replaceState(null, "", location.pathname + (p.toString() ? "?" + p : "")); } catch (e) { /* sandboxed frame */ }
  };
  A.restore = function () {
    const p = new URLSearchParams(location.search), s = A.state;
    s.mode = p.get("mode") === "explore" ? "explore" : "overview";
    if (LENSES.some(l => l[0] === p.get("lens"))) s.lens = p.get("lens");
    if (N[p.get("sel")]) s.sel = p.get("sel");
    if (p.has("layers")) s.layers = p.get("layers").split(",").filter(k => LAYERS.some(l => l.k === k));
    if (M.meta.rc[p.get("rc")]) s.rc = p.get("rc");
  };
})();
