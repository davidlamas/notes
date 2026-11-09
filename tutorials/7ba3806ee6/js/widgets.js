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

  function issuelog(root, key) {
    const d = W.issuelog, st = state(key); st.rows = st.rows || [];
    root.appendChild(h("h4", { text: d.title }));
    root.appendChild(h("p", { class: "sub", text: d.lead }));
    root.appendChild(h("p", { class: "note", text: d.warn }));
    const form = h("form", { class: "logform" }), inputs = {};
    d.fields.forEach(f => {
      const id = `${key}-${f.id}`.replace(/[^\w-]/g, "_");
      const inp = h("input", { type: "text", id }); inputs[f.id] = inp;
      form.appendChild(h("div", { class: "field" }, [h("label", { for: id, text: f.label }), h("span", { class: "sub", text: f.hint }), inp]));
    });
    form.appendChild(h("button", { type: "submit", class: "secondary-button", text: "Add to log" }));
    const list = h("div", { class: "loglist" }), status = h("span", { class: "sub", role: "status" });
    const text = () => st.rows.map((r, i) => `${i + 1}. ${r.page} | ${r.what} | found by: ${r.how} | rule: ${r.rule} | hurts: ${r.who}`).join("\n");
    const draw = () => {
      list.textContent = "";
      if (!st.rows.length) { list.appendChild(h("p", { class: "hint", text: "No entries yet." })); return; }
      const ol = h("ol");
      st.rows.forEach((r, i) => {
        const rm = h("button", { type: "button", class: "link-button", text: "Remove" }); rm.setAttribute("aria-label", "Remove entry " + (i + 1));
        rm.addEventListener("click", () => { st.rows.splice(i, 1); draw(); });
        ol.appendChild(h("li", {}, [h("span", { text: `${r.page}: ${r.what} (found by ${r.how}; rule ${r.rule}; hurts ${r.who}) ` }), rm]));
      });
      list.appendChild(ol);
      const cp = h("button", { type: "button", class: "secondary-button", text: "Copy the log" });
      cp.addEventListener("click", () => copy(text(), status));
      list.appendChild(cp); list.appendChild(status);
    };
    form.addEventListener("submit", e => {
      e.preventDefault();
      const r = {}; d.fields.forEach(f => (r[f.id] = inputs[f.id].value.trim() || "?"));
      if (r.what === "?") { status.textContent = "Write what you saw first."; inputs.what.focus(); return; }
      st.rows.push(r); d.fields.forEach(f => (inputs[f.id].value = "")); status.textContent = "Added."; draw(); inputs.page.focus();
    });
    root.appendChild(form); root.appendChild(list); draw();
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

  const BUILD = { goal, taskcheck, success, issuelog };
  App.mountWidgets = function (scope) {
    scope.querySelectorAll("[data-widget]").forEach(el => { const f = BUILD[el.dataset.widget]; if (f) f(el, el.dataset.wkey); });
    scope.querySelectorAll("[data-timer]").forEach(timer);
  };
})();
