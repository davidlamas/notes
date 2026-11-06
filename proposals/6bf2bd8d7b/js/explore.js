/* Explore mode: six lenses over the same linked data. */
(function () {
  const A = window.App, esc = A.esc, N = A.N, M = A.M;
  const nb = A.nb, isW = A.isW, wc = A.wc, byType = A.byType, dot = A.dot, dtag = A.dtag, ptag = A.ptag;

  function lensEval() {
    const S = A.state, sc = M.meta.scores;
    let h = `<div class="cols c4">`;
    for (const c of ["Relevance", "Design", "Partnership", "Impact"]) {
      const its = byType("esr").filter(n => n.criterion === c && (!S.rc || (n.kind === "Weakness" && (n.root_causes || []).includes(S.rc))));
      its.sort((a, b) => (a.kind === b.kind ? 0 : a.kind === "Weakness" ? -1 : 1) || A.PR[a.priority] - A.PR[b.priority] || a.id.localeCompare(b.id));
      const [s, m] = sc[c];
      h += `<div><div class="colh"><span>${c}</span><span>${s}/${m}</span></div><div class="bar" role="img" aria-label="${s} of ${m} points"><i style="width:${s / m * 100}%"></i></div>`;
      for (const n of its) {
        const resp = nb(n.id).filter(x => ["task", "decision", "evidence"].includes(x.type)).length;
        h += `<button type="button" class="nd card ${n.kind === "Weakness" ? "weak" : "strong"}" data-id="${n.id}"><span class="id">${n.id} · ${n.kind}${n.kind === "Weakness" ? " · " + esc(n.priority) : ""}</span><span class="ti">${esc(n.title)}</span><span class="id">${resp} linked responses and documents</span></button>`;
      }
      h += `</div>`;
    }
    h += `</div>`;
    const rcs = `<div class="chips" role="group" aria-label="Filter by root cause"><span class="hint">Root cause:</span><button type="button" class="chipb${S.rc ? "" : " on"}" data-rc="" aria-pressed="${!S.rc}">All</button>` +
      Object.entries(M.meta.rc).map(([k, v]) => `<button type="button" class="chipb${S.rc === k ? " on" : ""}" data-rc="${k}" aria-pressed="${S.rc === k}" title="${esc(v)}">${k} ${esc(v.split(":")[0])}</button>`).join("") + `</div>`;
    return `<div class="note"><b>2026 result:</b> ${sc.total[0]} of ${sc.total[1]} points (threshold ${sc.threshold}). The application was rejected only because the call budget ran out. Cards with a solid brown-orange edge and the label Weakness are the 20 weaknesses and risks the 2027 text must answer. Dashed blue edges are strengths to keep. Select one to see what answers it.</div>` + rcs + h;
  }

  function lensPlan() {
    let h = `<p class="eyebrow">Work packages</p>`;
    h += `<div class="sech">Specific objectives (2026)</div><div class="strip">` + byType("objective").map(n => `<button type="button" class="nd so" data-id="${n.id}">${n.id} · ${esc(n.title)}</button>`).join("") + `</div>`;
    h += `<div class="sech">Decisions taken for 2027</div><div class="strip">` + byType("decision").map(n => `<button type="button" class="nd" data-id="${n.id}">${n.id} · ${esc(n.title)}${dot(n.id)}</button>`).join("") + `</div>`;
    h += `<div class="cols c5">`;
    for (const w of byType("wp")) {
      const tasks = A.nodes.filter(n => n.type === "task" && n.wp === w.id).sort((a, b) => (a.disposition === "new") - (b.disposition === "new") || A.num(a, b));
      const ds = A.nodes.filter(n => n.type === "deliverable" && n.wp === w.id).sort((a, b) => a.month - b.month);
      const ms = A.nodes.filter(n => n.type === "milestone" && n.wp === w.id).sort((a, b) => a.month - b.month);
      const it = n => `<button type="button" class="nd item${n.disposition === "new" ? " new" : ""}${wc[n.id] ? " hw" : ""}" data-id="${n.id}"><b>${n.id.startsWith("NT") ? "New" : n.id}</b> ${esc(n.title)}${n.month ? ` <span class="m">month ${n.month}${n.lead ? ", " + n.lead : ""}</span>` : ""}${n.disposition === "new" ? " " + dtag(n) : ""}</button>`;
      h += `<div><button type="button" class="nd card wp-card" data-id="${w.id}"><span class="id">${w.id} · lead ${w.lead2026} → ${w.lead2027} (proposed) ${dtag(w)}${dot(w.id)}</span><span class="ti">${esc(w.title)}</span></button>` +
        `<div class="sech">Tasks</div>${tasks.map(it).join("")}<div class="sech">Deliverables</div>${ds.map(it).join("")}<div class="sech">Milestones</div>${ms.map(it).join("")}</div>`;
    }
    h += `</div><p class="eyebrow tl-title">Timeline</p><div class="note">Months 1 to 36 of the 2026 plan. Task windows exist only in the graphic timetable of the 2026 proposal, so tasks are not drawn here.</div>` + A.timeline(false);
    return h;
  }

  function lensPartners() {
    const ws = byType("wp");
    let h = `<div class="note">Roles are the sealed 2026 roles and the proposed 2027 shifts that follow from decisions 1 and 3. Anything marked "to validate" is not agreed with the partner. Only the TLU–UEM MoU and addendum are signed.</div><div class="tablewrap"><table><caption class="sr-only">Partners by work package</caption><tr><th scope="col">Partner</th>${ws.map(w => `<th scope="col"><button type="button" class="nd plain" data-id="${w.id}">${w.id}</button></th>`).join("")}<th scope="col">2027 role (proposed)</th></tr>`;
    for (const p of byType("partner")) {
      h += `<tr class="nd" data-id="${p.id}"><th scope="row"><b>${p.id}</b><br><span class="sub">${esc(p.title)}</span></th>`;
      for (const w of ws) {
        const dn = A.nodes.filter(n => n.type === "deliverable" && n.wp === w.id && n.lead === p.id).length, mn = A.nodes.filter(n => n.type === "milestone" && n.wp === w.id && n.lead === p.id).length;
        h += `<td>${w.lead2026 === p.id ? '<span class="tag">Lead 2026</span>' : ""}${w.lead2027 === p.id ? '<span class="tag new">Lead 2027</span>' : ""}${dn || mn ? `<div class="sub">${dn} deliverable${dn === 1 ? "" : "s"}, ${mn} milestone${mn === 1 ? "" : "s"} in 2026</div>` : ""}</td>`;
      }
      h += `<td>${esc(p.role2027)}${dot(p.id)}</td></tr>`;
    }
    return h + `</table></div>`;
  }

  function lensEvid() {
    const ev = byType("evidence").sort((a, b) => A.PR[a.priority] - A.PR[b.priority] || a.id.localeCompare(b.id));
    let h = `<div class="note"><b>The application accepts only Part A, Part B and the budget.</b> No support letters or annexes. These documents are for our own assurance: each one must end up as a precise statement in Part B. "Held: partial" means some of it is already in the baseline folder.</div>
    <div class="tablewrap"><table><caption class="sr-only">Documents to secure</caption><tr><th scope="col">ID</th><th scope="col">Document to secure</th><th scope="col">From</th><th scope="col">Held</th><th scope="col">Priority</th><th scope="col">Reviewer weaknesses</th><th scope="col">Lands in Part B</th></tr>`;
    for (const e of ev) {
      const w = nb(e.id).filter(isW).length, pb = nb(e.id).filter(x => x.type === "partb").map(x => x.id.slice(3));
      h += `<tr class="nd" data-id="${e.id}"><td>${e.id}</td><td>${esc(e.title)}</td><td>${e.owner}</td><td>${e.held}</td><td><span class="tag ${e.priority === "Critical" ? "crit" : e.priority === "High" ? "high" : ""}">${e.priority}</span></td><td>${w ? dot(e.id) : "none"}</td><td>${pb.join(", ")}</td></tr>`;
    }
    return h + `</table></div>`;
  }

  function lensPartB() {
    let h = `<div class="note">The 2026 Part B structure. For each section: the reviewer observations it has to answer and the documents that feed it. Drafting has not started.</div><div class="tablewrap"><table><caption class="sr-only">Part B sections</caption><tr><th scope="col">Section</th><th scope="col">Reviewer weaknesses to answer</th><th scope="col">Strengths to keep</th><th scope="col">Documents</th></tr>`;
    let last = "";
    for (const s of byType("partb")) {
      if (s.criterion !== last) { h += `<tr><th colspan="4" scope="colgroup" class="grp">${s.criterion}</th></tr>`; last = s.criterion; }
      const e = nb(s.id).filter(x => x.type === "esr"), b = x => `<button type="button" class="nd tag ${x.kind === "Weakness" ? "high" : "keep"}" data-id="${x.id}" title="${esc(x.title)}">${x.id.slice(4)}</button>`;
      h += `<tr class="nd" data-id="${s.id}"><td>${esc(s.title)}${dot(s.id)}</td><td>${e.filter(isW).map(b).join(" ") || "none"}</td><td>${e.filter(x => !isW(x)).map(b).join(" ") || "none"}</td><td>${nb(s.id).filter(x => x.type === "evidence").length}</td></tr>`;
    }
    return h + `</table></div>`;
  }

  function lensCost() {
    const ps = byType("partner").filter(p => p.budget2026), ws = byType("wp");
    const tp = ps.reduce((a, p) => a + p.budget2026, 0), tw = ws.reduce((a, w) => a + w.cost2026, 0), pm = ws.reduce((a, w) => a + w.pm2026, 0);
    return `<div class="note"><b>2026 sealed figures only.</b> No 2027 budget or person-month figures are entered until the call rules are checked and the work plan is fixed.</div>
    <div class="cols two"><div><div class="sech">Requested by partner (2026)</div><div class="tablewrap"><table><caption class="sr-only">Requested by partner</caption><tr><th scope="col">Partner</th><th scope="col">EU contribution</th></tr>${ps.map(p => `<tr class="nd" data-id="${p.id}"><td>${p.id}</td><td>${A.fmt(p.budget2026)}</td></tr>`).join("")}<tr><td><b>Total</b></td><td><b>${A.fmt(tp)}</b></td></tr></table></div></div>
    <div><div class="sech">Cost by work package (2026)</div><div class="tablewrap"><table><caption class="sr-only">Cost by work package</caption><tr><th scope="col">WP</th><th scope="col">PM</th><th scope="col">Cost</th></tr>${ws.map(w => `<tr class="nd" data-id="${w.id}"><td>${w.id} ${esc(w.title)}</td><td>${w.pm2026}</td><td>${A.fmt(w.cost2026)}</td></tr>`).join("")}<tr><td><b>Total</b></td><td><b>${pm}</b></td><td><b>${A.fmt(tw)}</b></td></tr></table></div></div></div>
    <p class="hint">Two things to reconcile before any 2027 budget: the work-package tables add to ${pm} person-months while the Part B staffing table and the budget workbook each show 156, and the two staffing tables disagree by partner.</p>`;
  }

  const LV = { eval: lensEval, plan: lensPlan, partners: lensPartners, evid: lensEvid, partb: lensPartB, cost: lensCost };
  A.views.explore = function () {
    const S = A.state;
    document.getElementById("lens-tabs").innerHTML = A.LENSES.map(([k, v]) => `<button type="button" class="chipb${S.lens === k ? " on" : ""}" data-lens="${k}" aria-pressed="${S.lens === k}">${v}</button>`).join("");
    const st = document.getElementById("stage"), y = st.scrollTop;
    st.innerHTML = `<div class="trace" id="trace" hidden></div>` + LV[S.lens]();
    st.scrollTop = y;
    st.querySelectorAll("tr.nd").forEach(r => { r.tabIndex = 0; r.setAttribute("role", "button"); });
  };
  A.search = function (q) {
    const v = q.trim().toLowerCase();
    if (v.length < 2) return [];
    return A.nodes.filter(n => (n.id + " " + n.title).toLowerCase().includes(v)).slice(0, 9);
  };
})();
