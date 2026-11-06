/* Overview mode: the project on a page, with layers that switch on and off. */
(function () {
  const A = window.App, esc = A.esc;

  /* Timeline shared by Overview (compact) and Explore > Plan (full). Positions are months 1-36. */
  A.timeline = function (compact) {
    const W = 36, pos = m => ((m - .5) / W * 100).toFixed(2) + "%", lh = compact ? 22 : 24;
    const ga = [[1, "GA1 Maputo"], [12, "GA2 Tallinn"], [24, "GA3 Lisbon"], [35, "GA4 Maputo"]];
    let h = `<div class="tl${compact ? " compact" : ""}" role="group" aria-label="Timeline, months 1 to 36"><div class="tlrow"><div class="tll"></div><div class="trk"><div class="ruler">` +
      Array.from({ length: W }, (_, i) => `<span>${i + 1}</span>`).join("") + `</div></div></div>`;
    for (const w of A.byType("wp")) {
      const items = A.nodes.filter(n => (n.type === "deliverable" || n.type === "milestone") && n.wp === w.id);
      const lane = {};
      const place = t => {
        const a = items.filter(n => n.type === t).sort((x, y) => x.month - y.month), ends = [];
        a.forEach(n => { let l = 0; while (ends[l] !== undefined && n.month - ends[l] < 3.4) l++; ends[l] = n.month; lane[n.id] = l; });
        return ends.length || 1;
      };
      const ml = place("milestone"), dl = place("deliverable"), H = lh * (ml + dl) + 12;
      h += `<div class="tlrow" style="height:${H}px"><div class="tll"><button type="button" class="nd tl-wp" data-id="${w.id}">${w.id}${compact ? "" : " " + esc(w.title)}${A.dot(w.id)}</button>${compact ? "" : `<div class="sub">lead ${w.lead2026} → ${w.lead2027}</div>`}</div><div class="trk">`;
      ga.forEach(([m]) => h += `<div class="ga" style="left:${pos(m)}"></div>`);
      items.filter(n => n.type === "milestone").forEach(n => h += `<button type="button" class="nd mk ms${A.wc[n.id] ? " hw" : ""}" data-id="${n.id}" style="left:${pos(n.month)};top:${4 + lane[n.id] * lh}px" title="${esc(n.title)}, month ${n.month}"><span aria-hidden="true">◆</span> ${n.id}</button>`);
      items.filter(n => n.type === "deliverable").forEach(n => h += `<button type="button" class="nd mk dl${A.wc[n.id] ? " hw" : ""}" data-id="${n.id}" style="left:${pos(n.month)};top:${8 + ml * lh + lane[n.id] * lh}px" title="${esc(n.title)}, month ${n.month}"><span aria-hidden="true">■</span> ${n.id}</button>`);
      h += `</div></div>`;
    }
    h += `<div class="tl-legend"><span><b aria-hidden="true">◆</b> Milestone</span><span><b aria-hidden="true">■</b> Deliverable</span><span><i class="ga-key" aria-hidden="true"></i> General Assembly: ` + ga.map(g => `M${g[0]} ${g[1].replace(/^GA\d /, "")}`).join(", ") + `</span><span><i class="hw-key" aria-hidden="true"></i> Tied to a reviewer weakness</span></div></div>`;
    return h;
  };

  const ORDER = ["WP4", "WP1", "WP2", "WP3", "WP5"];
  A.views.overview = function () {
    const S = A.state, on = k => S.layers.includes(k), N = A.N;
    /* layer bar */
    const same = (a, b) => a.slice().sort().join() === b.slice().sort().join();
    document.getElementById("ov-layers").innerHTML =
      `<fieldset class="layer-set"><legend>Layers</legend>` +
      A.LAYERS.map(l => `<label class="layer"><input type="checkbox" data-layer="${l.k}"${on(l.k) ? " checked" : ""}><span>${l.label}</span></label>`).join("") + `</fieldset>` +
      `<div class="preset-set" role="group" aria-label="Layer presets">` +
      A.PRESETS.map(p => `<button type="button" class="chipb${same(p.layers, S.layers) ? " on" : ""}" data-preset="${p.k}" aria-pressed="${same(p.layers, S.layers)}">${p.label}</button>`).join("") + `</div>`;

    const list = (label, items, mk) => items.length ? `<div class="ov-sec"><p class="ov-lab">${label}</p><ul class="ov-list">${items.map(x => `<li>${mk(x)}</li>`).join("")}</ul></div>` : "";
    const item = (x, extra) => `<button type="button" class="nd item${(on("status") && x.disposition === "new") ? " new" : ""}" data-id="${x.id}"><b>${x.id.startsWith("NT-") ? "New" : x.id}</b> ${esc(x.title)}${extra || ""}</button>`;

    const block = (id, role) => {
      const w = N[id], mem = A.members(id).map(x => x.id || x).join(" ");
      let h = `<article class="wpblock wp-${id} ${role}" data-has="${mem}"><div class="wp-top"><button type="button" class="nd wp-head" data-id="${id}"><span class="id">${id}</span><span class="ti">${esc(w.title)}</span></button><span class="wp-meta">${on("status") ? A.dtag(w) : ""}${A.dot(id)}</span></div><p class="wp-blurb">${esc(w.blurb || "")}</p>`;
      if (on("partners")) {
        const contrib = [...new Set(A.nodes.filter(n => n.wp === id && n.lead).map(n => n.lead))].filter(x => x !== w.lead2027);
        h += `<p class="sub wp-lead">Lead: ${w.lead2026} in 2026, ${w.lead2027} proposed for 2027${contrib.length ? `. Also lead deliverables or milestones: ${contrib.join(", ")}` : ""}.</p>`;
      }
      if (on("tasks")) h += list("Tasks", A.nodes.filter(n => n.type === "task" && n.wp === id).sort((a, b) => (a.disposition === "new") - (b.disposition === "new") || A.num(a, b)), x => item(x, on("status") ? " " + A.dtag(x) : ""));
      if (on("decisions")) h += list("2027 decisions", A.reach(id, x => x.type === "decision"), x => item(x));
      if (on("weak")) h += list("2026 reviewer weaknesses", A.reach(id, A.isW), x => item(x, ` ${A.ptag(x)}`));
      if (on("evid")) h += list("Documents to secure", A.reach(id, x => x.type === "evidence"), x => item(x, ` <span class="tag">${x.held === "none" ? "not held" : "partly held"}</span>`));
      return h + `</article>`;
    };
    let h = `<div class="ov" role="group" aria-label="Work packages">` +
      `<div class="ov-tier"><span class="ov-tier-l">Uptake</span>${block("WP4", "roof")}</div>` +
      `<div class="ov-tier"><span class="ov-tier-l">Three streams</span><div class="ov-streams">${block("WP1", "stream")}${block("WP2", "stream")}${block("WP3", "stream")}</div></div>` +
      `<div class="ov-tier"><span class="ov-tier-l">Base</span>${block("WP5", "base")}</div></div>`;
    if (on("time")) h += `<div class="ov-time"><p class="ov-lab">Deliverables and milestones over 36 months</p>${A.timeline(true)}</div>`;
    document.getElementById("ov-map").innerHTML = h;
  };
})();
