/* Small interactive tools inside stations. Text and options come from data/widgets.js.
   Everything is kept in memory (App.mem). Nothing is stored. */
(function () {
  const App = window.App, W = App.T.widgets, esc = App.esc;
  const timers = [];
  App.stopTimers = () => { while (timers.length) clearInterval(timers.pop()); };

  App.checkCount = function (id) {
    const el = document.getElementById("check-count"); if (!el) return;
    const boxes = document.querySelectorAll("#view-station [data-done]");
    const n = Array.from(boxes).filter(b => b.checked).length;
    el.textContent = `${n} of ${boxes.length} ticked`;
  };

  function h(tag, attrs, kids) {
    const e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(k => k === "text" ? (e.textContent = attrs[k]) : e.setAttribute(k, attrs[k]));
    (kids || []).forEach(c => e.appendChild(c));
    return e;
  }
  const state = key => (App.mem.widgets[key] = App.mem.widgets[key] || {});

  function copy(text, status) {
    const done = ok => { status.textContent = ok ? "Copied." : "Select the text and copy it by hand."; };
    try { navigator.clipboard.writeText(text).then(() => done(true), () => done(false)); } catch (e) { done(false); }
  }

  function goal(root, key) {
    const d = W.goal, st = state(key);
    root.appendChild(h("h4", { text: d.title }));
    root.appendChild(h("p", { class: "sub", text: d.lead }));
    const out = h("p", { class: "out", "aria-live": "polite" });
    const status = h("span", { class: "sub", role: "status" });
    const sentence = () => {
      const vals = {}; d.fields.forEach(f => (vals[f.id] = (st[f.id] || "").trim() || "[" + f.label.toLowerCase() + "]"));
      const t = d.template.replace(/\{(\w+)\}/g, (m, k) => vals[k]);
      return t.charAt(0).toUpperCase() + t.slice(1);
    };
    d.fields.forEach(f => {
      const id = `${key}-${f.id}`.replace(/[^\w-]/g, "_");
      const inp = h("input", { type: "text", id, placeholder: "e.g. " + f.example });
      inp.value = st[f.id] || "";
      inp.addEventListener("input", () => { st[f.id] = inp.value; out.textContent = sentence(); });
      root.appendChild(h("div", { class: "field" }, [h("label", { for: id, text: f.label }), h("span", { class: "sub", text: f.hint }), inp]));
    });
    out.textContent = sentence();
    root.appendChild(h("p", { class: "eyebrow", text: "Your goal" }));
    root.appendChild(out);
    const btn = h("button", { type: "button", class: "secondary-button", text: "Copy the goal" });
    btn.addEventListener("click", () => copy(sentence(), status));
    root.appendChild(btn); root.appendChild(status);
    root.appendChild(h("p", { class: "sub", text: d.note }));
  }

  function taskcheck(root, key) {
    const d = W.taskcheck, st = state(key);
    root.appendChild(h("h4", { text: d.title }));
    root.appendChild(h("p", { class: "sub", text: d.lead }));
    d.items.forEach((it, i) => {
      const fb = h("p", { class: "fb", role: "status" });
      const show = () => { const a = st[i]; if (a === undefined) return;
        fb.textContent = (a === it.good ? "Right. " : "Not quite. ") + (it.good ? "This is a good task. " : "This is a weak task. ") + it.why; };
      const mk = (label, val) => { const b = h("button", { type: "button", class: "choice", text: label, "aria-pressed": String(st[i] === val) });
        b.addEventListener("click", () => { st[i] = val; root.querySelectorAll(`[data-q="${i}"] .choice`).forEach(x => x.setAttribute("aria-pressed", String(x === b))); show(); }); return b; };
      const row = h("div", { class: "choices", "data-q": i }, [mk("Good task", true), mk("Weak task", false)]);
      root.appendChild(h("div", { class: "qitem" }, [h("p", { class: "quote", text: "“" + it.text + "”" }), row, fb]));
      show();
    });
  }

  function success(root, key) {
    const d = W.success, st = state(key);
    root.appendChild(h("h4", { text: d.title }));
    root.appendChild(h("p", { class: "sub", text: d.lead }));
    const fb = h("p", { class: "fb", role: "status" });
    const show = () => { if (st.i === undefined) return; const o = d.options[st.i]; fb.textContent = o.verdict + ". " + o.why; };
    const row = h("div", { class: "choices stack" });
    d.options.forEach((o, i) => {
      const b = h("button", { type: "button", class: "choice", text: o.label, "aria-pressed": String(st.i === i) });
      b.addEventListener("click", () => { st.i = i; row.querySelectorAll(".choice").forEach(x => x.setAttribute("aria-pressed", String(x === b))); show(); });
      row.appendChild(b);
    });
    root.appendChild(row); root.appendChild(fb); show();
    root.appendChild(h("p", { class: "sub", text: d.tail }));
  }

  function makeLog(name) { return function (root, key) {
    const d = W[name], st = state(key); st.rows = st.rows || [];
    root.appendChild(h("h4", { text: d.title }));
    root.appendChild(h("p", { class: "sub", text: d.lead }));
    root.appendChild(h("p", { class: "note", text: d.warn }));
    const form = h("form", { class: "logform" }), inputs = {};
    const first = d.fields[0].id, main = d.fields[1].id;
    d.fields.forEach(f => {
      const id = `${key}-${f.id}`.replace(/[^\w-]/g, "_");
      const inp = h("input", { type: "text", id }); inputs[f.id] = inp;
      form.appendChild(h("div", { class: "field" }, [h("label", { for: id, text: f.label }), h("span", { class: "sub", text: f.hint }), inp]));
    });
    form.appendChild(h("button", { type: "submit", class: "secondary-button", text: "Add to list" }));
    const list = h("div", { class: "loglist" }), status = h("span", { class: "sub", role: "status" });
    const line = r => d.fields.map(f => `${f.label}: ${r[f.id]}`).join(" | ");
    const text = () => st.rows.map((r, i) => `${i + 1}. ${line(r)}`).join("\n");
    const draw = () => {
      list.textContent = "";
      if (!st.rows.length) { list.appendChild(h("p", { class: "hint", text: "No entries yet." })); return; }
      const ol = h("ol");
      st.rows.forEach((r, i) => {
        const rm = h("button", { type: "button", class: "link-button", text: "Remove" }); rm.setAttribute("aria-label", "Remove entry " + (i + 1));
        rm.addEventListener("click", () => { st.rows.splice(i, 1); draw(); });
        ol.appendChild(h("li", {}, [h("span", { text: line(r) + " " }), rm]));
      });
      list.appendChild(ol);
      const cp = h("button", { type: "button", class: "secondary-button", text: "Copy the list" });
      cp.addEventListener("click", () => copy(text(), status));
      list.appendChild(cp); list.appendChild(status);
    };
    form.addEventListener("submit", e => {
      e.preventDefault();
      const r = {}; d.fields.forEach(f => (r[f.id] = inputs[f.id].value.trim() || "?"));
      if (r[main] === "?") { status.textContent = "Write what happened first."; inputs[main].focus(); return; }
      st.rows.push(r); d.fields.forEach(f => (inputs[f.id].value = "")); status.textContent = "Added."; draw(); inputs[first].focus();
    });
    root.appendChild(form); root.appendChild(list); draw();
  }; }
  const issuelog = makeLog("issuelog"), studylog = makeLog("studylog");

  function numField(root, key, st, f, onChange) {
    const id = `${key}-${f.id}`.replace(/[^\w-]/g, "_");
    const inp = h("input", { type: "text", inputmode: "decimal", id }); inp.value = st[f.id] || "";
    inp.addEventListener("input", () => { st[f.id] = inp.value; onChange(); });
    root.appendChild(h("div", { class: "field" }, [h("label", { for: id, text: f.label }), h("span", { class: "sub", text: f.hint }), inp]));
  }
  const num = v => { const x = parseFloat(String(v || "").replace(",", ".")); return isNaN(x) ? null : x; };
  const median = a => { const b = a.slice().sort((x, y) => x - y), m = Math.floor(b.length / 2); return b.length % 2 ? b[m] : (b[m - 1] + b[m]) / 2; };

  function rate(root, key) {
    const d = W.rate, st = state(key), out = h("p", { class: "out", "aria-live": "polite" });
    const calc = () => {
      const n = num(st.n), k = num(st.ok);
      if (n === null || k === null) { out.textContent = "Enter the two numbers to see the result."; return; }
      if (n <= 0 || k < 0 || k > n || n !== Math.round(n) || k !== Math.round(k)) { out.textContent = "Check the numbers: whole numbers, and successes cannot be more than the people who tried."; return; }
      const z = 1.96, p = k / n, den = 1 + z * z / n, c = (p + z * z / (2 * n)) / den, hw = z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / den;
      const lo = Math.max(0, c - hw), hi = Math.min(1, c + hw);
      let t = `${k} of ${n} succeeded: ${Math.round(p * 100)}%. With this many people the real rate could plausibly be anywhere from ${Math.round(lo * 100)}% to ${Math.round(hi * 100)}%.`;
      const times = String(st.times || "").split(",").map(num).filter(x => x !== null);
      if (times.length) t += ` Median time of those who succeeded (${times.length} people): ${Math.round(median(times))} seconds.`;
      out.textContent = t;
    };
    root.appendChild(h("h4", { text: d.title })); root.appendChild(h("p", { class: "sub", text: d.lead }));
    d.fields.forEach(f => numField(root, key, st, f, calc));
    root.appendChild(out); root.appendChild(h("p", { class: "sub", text: d.note })); calc();
  }

  function sus(root, key) {
    const d = W.sus, st = state(key); st.scores = st.scores || [];
    root.appendChild(h("h4", { text: d.title })); root.appendChild(h("p", { class: "sub", text: d.lead }));
    const grid = h("div", { class: "susgrid" }), ins = [];
    for (let i = 1; i <= 10; i++) {
      const id = `${key}-i${i}`.replace(/[^\w-]/g, "_");
      const inp = h("input", { type: "text", inputmode: "numeric", id, maxlength: "1" }); ins.push(inp);
      grid.appendChild(h("div", { class: "field" }, [h("label", { for: id, text: `Item ${i} (${i % 2 ? "positive" : "negative"})` }), inp]));
    }
    const status = h("p", { class: "fb", role: "status" }), out = h("p", { class: "out", "aria-live": "polite" });
    const draw = () => {
      if (!st.scores.length) { out.textContent = "No participants added yet."; return; }
      const mean = st.scores.reduce((a, b) => a + b, 0) / st.scores.length;
      out.textContent = `${st.scores.length} participant(s). Scores: ${st.scores.join(", ")}. Mean ${mean.toFixed(1)}. Median ${median(st.scores)}.`;
    };
    const add = h("button", { type: "button", class: "secondary-button", text: "Add participant" });
    add.addEventListener("click", () => {
      const v = ins.map(i => num(i.value));
      if (v.some(x => x === null || x < 1 || x > 5 || x !== Math.round(x))) { status.textContent = "Enter ten whole numbers from 1 to 5."; return; }
      const score = v.reduce((a, x, i) => a + (i % 2 === 0 ? x - 1 : 5 - x), 0) * 2.5;
      st.scores.push(score); ins.forEach(i => (i.value = "")); status.textContent = "Added. This participant scored " + score + "."; draw(); ins[0].focus();
    });
    const clear = h("button", { type: "button", class: "secondary-button", text: "Clear all" });
    clear.addEventListener("click", () => { st.scores = []; status.textContent = "Cleared."; draw(); });
    root.appendChild(grid); root.appendChild(add); root.appendChild(clear); root.appendChild(status); root.appendChild(out);
    root.appendChild(h("p", { class: "sub", text: d.note })); draw();
  }

  function lost(root, key) {
    const d = W.lost, st = state(key), out = h("p", { class: "out", "aria-live": "polite" });
    const calc = () => {
      const N = num(st.N), S = num(st.S), R = num(st.R);
      if (N === null || S === null || R === null) { out.textContent = "Enter the three numbers to see the result."; return; }
      if (N <= 0 || S < N || R <= 0 || R > N) { out.textContent = "Check the numbers: all visits are at least the different pages, and the fewest needed cannot be more than the different pages."; return; }
      const L = Math.sqrt(Math.pow(N / S - 1, 2) + Math.pow(R / N - 1, 2));
      out.textContent = `Lostness: ${L.toFixed(2)}. ${L > 0.5 ? "Often read as clearly lost." : L < 0.4 ? "Often read as not lost." : "In between. Look at the recording."}`;
    };
    root.appendChild(h("h4", { text: d.title })); root.appendChild(h("p", { class: "sub", text: d.lead }));
    d.fields.forEach(f => numField(root, key, st, f, calc));
    root.appendChild(out); root.appendChild(h("p", { class: "sub", text: d.note })); calc();
  }

  function rank(root, key) {
    const d = W.rank, st = state(key); st.rows = st.rows || [];
    root.appendChild(h("h4", { text: d.title })); root.appendChild(h("p", { class: "sub", text: d.lead })); root.appendChild(h("p", { class: "note", text: d.warn }));
    const form = h("form", { class: "logform" });
    const mk = (id, label, hint, el) => form.appendChild(h("div", { class: "field" }, [h("label", { for: el.id, text: label }), h("span", { class: "sub", text: hint }), el]));
    const idp = key.replace(/[^\w-]/g, "_");
    const title = h("input", { type: "text", id: idp + "-t" }), ev = h("input", { type: "text", id: idp + "-e" });
    const src = h("select", { id: idp + "-s" }); ["A: study", "B: expert check", "Both"].forEach(o => src.appendChild(h("option", { text: o })));
    const sel = {}; d.scale.forEach(sc => { const s = h("select", { id: idp + "-" + sc.id }); [1, 2, 3].forEach(n => s.appendChild(h("option", { value: n, text: String(n) }))); sel[sc.id] = s; });
    mk("t", "Problem", "One plain sentence.", title); mk("s", "Found by", "Which sub-team found it.", src);
    d.scale.forEach(sc => mk(sc.id, sc.label, sc.hint, sel[sc.id])); mk("e", "Evidence", "Recording and time, number, or screenshot.", ev);
    form.appendChild(h("button", { type: "submit", class: "secondary-button", text: "Add to ranking" }));
    const list = h("div", { class: "loglist" }), status = h("span", { class: "sub", role: "status" });
    const sorted = () => st.rows.slice().sort((a, b) => b.score - a.score);
    const text = () => sorted().map((r, i) => `${i + 1}. [score ${r.score}] ${r.title} | found by: ${r.src} | impact ${r.impact}, frequency ${r.freq} | evidence: ${r.ev}`).join("\n");
    const draw = () => {
      list.textContent = "";
      if (!st.rows.length) { list.appendChild(h("p", { class: "hint", text: "No problems yet." })); return; }
      const ol = h("ol");
      sorted().forEach((r, i) => {
        const rm = h("button", { type: "button", class: "link-button", text: "Remove" }); rm.setAttribute("aria-label", "Remove " + r.title);
        rm.addEventListener("click", () => { st.rows.splice(st.rows.indexOf(r), 1); draw(); });
        ol.appendChild(h("li", {}, [h("span", { text: `Score ${r.score}: ${r.title} (${r.src}; impact ${r.impact}, frequency ${r.freq}; evidence: ${r.ev}) ` }), rm]));
      });
      list.appendChild(ol);
      const cp = h("button", { type: "button", class: "secondary-button", text: "Copy the ranking" });
      cp.addEventListener("click", () => copy(text(), status)); list.appendChild(cp); list.appendChild(status);
    };
    form.addEventListener("submit", e => {
      e.preventDefault();
      if (!title.value.trim()) { status.textContent = "Write the problem first."; title.focus(); return; }
      const impact = +sel.impact.value, freq = +sel.freq.value;
      st.rows.push({ title: title.value.trim(), src: src.value, impact, freq, score: impact * freq, ev: ev.value.trim() || "?" });
      title.value = ""; ev.value = ""; status.textContent = "Added."; draw(); title.focus();
    });
    root.appendChild(form); root.appendChild(list); draw();
  }

  function talkplan(root, key) {
    const d = W.talkplan, st = state(key), total = d.parts.reduce((a, p) => a + p.min, 0);
    root.appendChild(h("h4", { text: d.title })); root.appendChild(h("p", { class: "sub", text: d.lead }));
    const status = h("span", { class: "sub", role: "status" });
    d.parts.forEach(p => {
      const id = `${key}-${p.id}`.replace(/[^\w-]/g, "_"), inp = h("input", { type: "text", id }); inp.value = st[p.id] || "";
      inp.addEventListener("input", () => { st[p.id] = inp.value; });
      root.appendChild(h("div", { class: "field" }, [h("label", { for: id, text: `${p.label} (${p.min} min)` }), h("span", { class: "sub", text: p.hint }), inp]));
    });
    root.appendChild(h("p", { class: "sub", text: `Total: ${total} minutes.` }));
    const cp = h("button", { type: "button", class: "secondary-button", text: "Copy the plan" });
    cp.addEventListener("click", () => copy(d.parts.map(p => `${p.label} (${p.min} min): ${st[p.id] || ""}`).join("\n"), status));
    root.appendChild(cp); root.appendChild(status);
  }

  function talkclock(root, key) {
    const d = W.talkclock, st = state(key);
    if (st.n == null) { st.n = 1; st.left = d.seconds; }
    root.appendChild(h("h4", { text: d.title })); root.appendChild(h("p", { class: "sub", text: d.lead }));
    const label = h("span", { class: "talkno" }), out = h("span", { class: "clock", "aria-hidden": "true" }), say = h("span", { class: "sr-only", role: "status" });
    const fmt = s => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
    const go = h("button", { type: "button", class: "secondary-button" }), next = h("button", { type: "button", class: "secondary-button", text: "Next talk" }), reset = h("button", { type: "button", class: "secondary-button", text: "Reset this talk" });
    const paint = () => { label.textContent = `Talk ${st.n} of ${d.talks}`; out.textContent = fmt(st.left); out.classList.toggle("up", st.left === 0); go.textContent = st.run ? "Pause" : "Start"; next.disabled = st.n >= d.talks; };
    timers.push(setInterval(() => { if (!st.run) return; st.left -= 1; if (st.left === 60) say.textContent = "One minute left."; if (st.left <= 0) { st.left = 0; st.run = false; say.textContent = "Time is up."; } paint(); }, 1000));
    go.addEventListener("click", () => { if (st.left <= 0) return; st.run = !st.run; paint(); });
    next.addEventListener("click", () => { st.n += 1; st.left = d.seconds; st.run = false; say.textContent = "Talk " + st.n + "."; paint(); });
    reset.addEventListener("click", () => { st.left = d.seconds; st.run = false; say.textContent = ""; paint(); });
    const row = h("div", { class: "timer" }, [label, out, go, next, reset, say]);
    root.appendChild(row); paint();
  }

  function timer(root) {
    const total = parseInt(root.dataset.timer, 10) * 60, key = "timer:" + App.state.sel, st = state(key);
    st.left = st.left == null ? total : st.left;
    const out = h("span", { class: "clock", "aria-hidden": "true" }), say = h("span", { class: "sr-only", role: "status" });
    const fmt = s => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
    const paint = () => { out.textContent = fmt(st.left); };
    const go = h("button", { type: "button", class: "secondary-button", text: "Start timer" });
    const reset = h("button", { type: "button", class: "secondary-button", text: "Reset" });
    const stop = () => { st.run = false; go.textContent = "Start timer"; };
    const tick = () => { if (!st.run) return; st.left -= 1; paint(); if (st.left <= 0) { st.left = 0; stop(); say.textContent = "Time is up for this station."; out.classList.add("up"); } };
    go.addEventListener("click", () => { if (st.run) { stop(); return; } if (st.left <= 0) return; st.run = true; go.textContent = "Pause"; });
    reset.addEventListener("click", () => { stop(); st.left = total; say.textContent = ""; out.classList.remove("up"); paint(); });
    timers.push(setInterval(tick, 1000));
    if (st.run) go.textContent = "Pause";
    paint();
    root.appendChild(h("span", { class: "sub", text: "Time for this station: " }));
    root.appendChild(out); root.appendChild(go); root.appendChild(reset); root.appendChild(say);
    root.appendChild(h("span", { class: "sub", text: " The timer is only a guide. It does not announce each minute." }));
  }

  const BUILD = { goal, taskcheck, success, issuelog, studylog, rate, sus, lost, rank, talkplan, talkclock };
  App.mountWidgets = function (scope) {
    scope.querySelectorAll("[data-widget]").forEach(el => { const f = BUILD[el.dataset.widget]; if (f) f(el, el.dataset.wkey); });
    scope.querySelectorAll("[data-timer]").forEach(timer);
  };
})();
