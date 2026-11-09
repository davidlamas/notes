/* Drawing. All text comes from data/*.js. */
(function () {
  const App = window.App, T = App.T, S = App.state, esc = App.esc;
  const $ = id => document.getElementById(id);
  const resById = {}; T.resources.forEach(r => (resById[r.id] = r));

  function brief() {
    const sc = T.scenario, m = T.meta;
    const split = ["A", "B", "AB"].map(k => { const s = sc.split[k];
      return `<article class="card lane-${k}"><h3>${esc(s.name)}</h3><p class="sub">Suggested: ${esc(s.suggested)}</p><p>${esc(s.role)}</p></article>`; }).join("");
    const task = sc.mandatory.map(t => `<article class="card"><span class="tag">Mandatory</span><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p></article>`).join("");
    $("view-brief").innerHTML = `
      <p class="eyebrow">${esc(sc.eyebrow)}</p>
      <h1>${esc(sc.headline)}</h1>
      ${sc.paragraphs.map(p => `<p class="lede">${esc(p)}</p>`).join("")}
      <p class="note">${esc(sc.fictionNote)}</p>
      <div class="facts">${sc.brief.map(b => `<div class="fact"><b>${esc(b.label)}</b>${esc(b.text)}</div>`).join("")}</div>
      <h2 style="margin-top:34px">Two tasks every team must cover</h2>
      <div class="grid2">${task}</div>
      <p class="sub" style="margin-top:12px">Add more if the call-centre theme asks for them: ${sc.extras.map(esc).join(" ")}</p>
      <h2 style="margin-top:34px">Your team, in two sub-teams</h2>
      <p class="sub">${esc(sc.split.note)}</p>
      <div class="grid3">${split}</div>
      <h2 style="margin-top:34px">Who takes whose test</h2>
      <p class="lede">${esc(sc.peerTest)}</p>
      <p><button class="secondary-button" type="button" data-view="route">See the route</button></p>`;
  }

  function stationButton(id) {
    const s = T.stations[id], on = S.sel === id;
    return `<button class="station lane-${s.stream}" type="button" data-sel="${id}" aria-pressed="${on}"><span class="lane-name">${esc(App.LANES[s.stream])}</span><span class="t">${esc(s.title)}</span><span class="m">${s.minutes} min</span></button>`;
  }

  function route() {
    const sprints = T.sprints.map(sp => {
      const blocks = sp.blocks.map((b, i) => {
        const two = b.stations.length > 1;
        return `<div class="block"><div class="block-label"><b>${esc(b.title)}</b><span>${b.minutes} min${two ? ", in parallel" : ""}</span></div><div class="lanes${two ? " two" : ""}">${b.stations.map(stationButton).join("")}</div></div>`;
      }).join("");
      return `<section class="sprint" aria-labelledby="${sp.id}-h"><div class="sprint-head"><div><p class="eyebrow">Sprint ${sp.number}</p><h2 id="${sp.id}-h">${esc(sp.title)}</h2><p>${esc(sp.subtitle)}</p></div><span class="minutes">${sp.minutes} min</span></div>${blocks}</section>`;
    }).join("");
    $("view-route").innerHTML = `
      <p class="eyebrow">The route</p>
      <h1>Two sprints. Two sub-teams working side by side.</h1>
      <p class="lede">Pick any station to see its aim and the outside resources that go with it. Content for each station arrives step by step. Stations marked "outline" show the aim only.</p>
      <div class="layout"><div>${sprints}</div><aside class="card detail-panel" id="panel" aria-live="polite" aria-label="Station details"></aside></div>`;
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
      <div class="f"><b>Resources</b>${res ? `<ul>${res}</ul>` : `<span class="hint">None yet.</span>`}</div>`;
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

  App.views = { brief, route, resources };
  App.panel = panel;
})();
