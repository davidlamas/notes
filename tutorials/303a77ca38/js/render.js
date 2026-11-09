/* Drawing. All text comes from data/*.js. */
(function () {
  const App = window.App, T = App.T, S = App.state, esc = App.esc;
  const $ = id => document.getElementById(id);
  const resById = {}; T.resources.forEach(r => (resById[r.id] = r));

  function brief() {
    const sc = T.scenario;
    const cards = it => `<article class="card"><span class="tag">${esc(it.tag)}</span><h3>${esc(it.title)}</h3><p>${esc(it.text)}</p></article>`;
    const secs = sc.sections.map(x => `<h2 style="margin-top:34px">${esc(x.title)}</h2><p class="sub">${esc(x.intro)}</p><div class="grid2">${x.items.map(cards).join("")}</div>`).join("");
    $("view-brief").innerHTML = `
      <p class="eyebrow">${esc(sc.eyebrow)}</p>
      <h1>${esc(sc.headline)}</h1>
      ${sc.paragraphs.map(p => `<p class="lede">${esc(p)}</p>`).join("")}
      <p class="note">${esc(sc.fictionNote)}</p>
      <div class="facts">${sc.brief.map(b => `<div class="fact"><b>${esc(b.label)}</b>${esc(b.text)}</div>`).join("")}</div>
      ${secs}
      <p style="margin-top:28px"><button class="secondary-button" type="button" data-view="route">${esc(T.meta.ui.briefButton)}</button></p>`;
  }

  function stationButton(id) {
    const s = T.stations[id], on = S.sel === id;
    return `<button class="station lane-${s.stream}" type="button" data-sel="${id}" aria-pressed="${on}"><span class="lane-name">${esc(App.LANES[s.stream])}</span><span class="t">${esc(s.title)}</span><span class="m">${s.minutes} min · ${s.status === "draft" ? "ready" : "outline"}</span></button>`;
  }

  function route() {
    const sprints = T.sprints.map(sp => {
      const blocks = sp.blocks.map((b, i) => {
        const two = b.stations.length > 1;
        return `<div class="block"><div class="block-label"><b>${esc(b.title)}</b><span>${b.minutes} min${two ? ", two streams in parallel" : ""}</span></div><div class="lanes${two ? " two" : ""}">${b.stations.map(stationButton).join("")}</div></div>`;
      }).join("");
      return `<section class="sprint" aria-labelledby="${sp.id}-h"><div class="sprint-head"><div><p class="eyebrow">${esc(sp.eyebrow)}</p><h2 id="${sp.id}-h">${esc(sp.title)}</h2><p>${esc(sp.subtitle)}</p></div><span class="minutes">${esc(sp.when)}</span></div>${blocks}</section>`;
    }).join("");
    $("view-route").innerHTML = `
      <p class="eyebrow">${esc(T.meta.ui.routeEyebrow)}</p>
      <h1>${esc(T.meta.ui.routeHeadline)}</h1>
      <p class="lede">${esc(T.meta.ui.routeLede)}</p>
      <div class="layout"><div>${sprints}</div><aside class="card detail-panel" id="panel" tabindex="0" aria-live="polite" aria-label="Station details"></aside></div>`;
    panel();
  }

  function panel() {
    const el = $("panel"); if (!el) return;
    if (!S.sel) { el.innerHTML = `<p class="eyebrow">Station</p><h2>Pick a station</h2><p class="hint">Its aim, time and resources show here.</p>`; return; }
    const s = T.stations[S.sel];
    const res = s.resources.map(id => resById[id]).filter(Boolean).map(r => resourceLine(r)).join("");
    el.innerHTML = `<p class="eyebrow">${esc(App.LANES[s.stream])} · ${s.minutes} min</p><h2>${esc(s.title)}</h2>
      <span class="tag">${esc(s.status)}</span>
      <div class="f"><b>Aim</b>${esc(s.aim)}</div>
      <div class="f"><b>Resources</b>${res ? `<ul>${res}</ul>` : `<span class="hint">None yet.</span>`}</div>
      ${T.content && T.content[S.sel] ? `<p><button class="secondary-button" type="button" data-open="${S.sel}">Open the full station</button></p>` : ""}`;
  }

  function resourceLine(r) {
    return r.url ? `<li><a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.title)}</a></li>` : `<li>${esc(r.title)} <span class="hint">(link to come)</span></li>`;
  }

  function resources() {
    const groups = []; T.resources.forEach(r => { let g = groups.find(x => x.name === r.group); if (!g) groups.push((g = { name: r.group, items: [] })); g.items.push(r); });
    $("view-resources").innerHTML = `
      <p class="eyebrow">Resources</p>
      <h1>Where to read and what to use.</h1>
      <p class="lede">Standards, articles, tools and the website itself. Links open in a new tab.</p>
      ${groups.map(g => `<section class="rgroup card" aria-label="${esc(g.name)}"><h2>${esc(g.name)}</h2>${g.items.map(r => `<div class="ritem"><div><h3>${r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.title)}<span class="sr-only"> (opens in a new tab)</span></a>` : esc(r.title)}</h3><p>${esc(r.note)}</p></div><span class="tag">${r.status === "listed" ? "link ready" : r.status === "to-verify" ? "to verify" : "link to come"}</span></div>`).join("")}</section>`).join("")}`;
  }


  const ORDER = []; T.sprints.forEach(sp => sp.blocks.forEach(b => b.stations.forEach(id => ORDER.push(id))));
  const list = (items, cls) => `<ul${cls ? ` class="${cls}"` : ""}>${items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;

  function station() {
    const id = S.sel, st = T.stations[id], c = T.content[id], el = $("view-station");
    const sp = T.sprints.find(x => x.blocks.some(b => b.stations.includes(id)));
    const res = st.resources.map(r => resById[r]).filter(Boolean).map(resourceLine).join("");
    const checks = c.checks.items.map((t, i) => { const k = id + ":c:" + i;
      return `<li><label><input type="checkbox" data-done="${k}"${App.mem.done[k] ? " checked" : ""}> <span>${esc(t)}</span></label></li>`; }).join("");
    const parts = c.parts.map((p, i) => `<section class="part card" aria-labelledby="${id}-p${i}">
        <p class="eyebrow">Step ${i + 1} · ${p.min} min</p><h2 id="${id}-p${i}">${esc(p.title)}</h2><p>${esc(p.text)}</p>
        ${p.help ? `<p class="help"><b>Help for this step:</b> ${p.help.map(x => resById[x]).filter(Boolean).map(x => x.url ? `<a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.title)}<span class="sr-only"> (opens in a new tab)</span></a>` : esc(x.title)).join(" · ")}</p>` : ""}
        ${p.widget ? `<div class="widget" data-widget="${p.widget}" data-wkey="${id}:${i}"></div>` : ""}</section>`).join("");
    const pos = ORDER.indexOf(id), prev = ORDER[pos - 1], next = ORDER[pos + 1];
    const nav = sid => sid ? `<button class="secondary-button" type="button" data-nav="${sid}">${esc(T.stations[sid].title)}</button>` : "";
    el.innerHTML = `
      <p class="crumbs"><button class="link-button" type="button" data-view="route">${esc(T.meta.ui.crumb)}</button> / ${esc(sp.title)}</p>
      <p class="eyebrow">${esc(App.LANES[st.stream])} · ${st.minutes} min</p>
      <h1 tabindex="-1">${esc(st.title)}</h1>
      <p class="lede">${esc(c.intro)}</p>
      <div class="timer" data-timer="${st.minutes}" role="group" aria-label="Station timer"></div>
      <div class="layout"><div class="parts">${parts}
        <section class="card"><h2>${esc(c.checks.title)}</h2><ul class="checklist">${checks}</ul><p class="sub" role="status" id="check-count"></p></section>
      </div>
      <aside class="card side" tabindex="0" aria-label="At a glance">
        <div class="f"><b>Aim</b>${esc(st.aim)}</div>
        <div class="f"><b>You leave with</b>${list(c.output)}</div>
        <div class="f"><b>${esc(c.good.title)}</b>${list(c.good.items)}</div>
        <div class="f"><b>Watch out</b>${list(c.watch)}</div>
        <div class="f"><b>Resources</b>${res ? `<ul>${res}</ul>` : `<span class="hint">None for this station.</span>`}</div>
        <div class="f"><b>For teachers</b>${list(c.teacher)}</div>
      </aside></div>
      <div class="pager">${nav(prev)}${nav(next)}</div>`;
    App.checkCount(id);
    App.mountWidgets(el);
  }

  App.views = { brief, route, station, resources };
  App.panel = panel;
})();
