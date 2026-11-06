/* Startup, mode switching and events. */
(function () {
  const A = window.App, S = A.state, $ = id => document.getElementById(id);
  function render() {
    document.querySelectorAll(".mode-button").forEach(b => { const on = b.dataset.mode === S.mode; b.classList.toggle("is-active", on); b.setAttribute("aria-pressed", on); });
    $("overview").hidden = S.mode !== "overview"; $("explore").hidden = S.mode !== "explore";
    A.views[S.mode](); A.hl(); A.panels(); A.url();
  }
  A.render = render;
  const same = (a, b) => a.slice().sort().join() === b.slice().sort().join();

  document.addEventListener("click", e => {
    const t = e.target.closest("[data-mode],[data-lens],[data-preset],[data-rc],[data-go],[data-clear],[data-share],#overview [data-id],#stage [data-id]");
    if (!t) return;
    const d = t.dataset;
    if (d.mode) { S.mode = d.mode; render(); window.scrollTo(0, 0); }
    else if (d.lens) { S.lens = d.lens; render(); }
    else if (d.preset) { S.layers = A.PRESETS.find(p => p.k === d.preset).layers.slice(); render(); }
    else if (d.rc !== undefined) { S.rc = d.rc || null; render(); }
    else if (d.go) { A.select(d.go, false); }
    else if (d.clear) { S.sel = null; A.hl(); A.panels(); A.url(); }
    else if (d.share) {
      const msg = $(d.share === "overview" ? "share-status-ov" : "share-status-ex");
      try { navigator.clipboard.writeText(location.href).then(() => msg.textContent = "Link copied", () => msg.textContent = "Copy the address from the browser bar"); } catch (err) { msg.textContent = "Copy the address from the browser bar"; }
    }
    else if (d.id) { A.select(d.id, true); }
  });
  document.addEventListener("change", e => {
    const k = e.target.dataset && e.target.dataset.layer; if (!k) return;
    S.layers = e.target.checked ? S.layers.concat(k) : S.layers.filter(x => x !== k);
    render();
  });
  document.addEventListener("keydown", e => {
    if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("tr.nd")) { e.preventDefault(); e.target.click(); }
  });

  /* search */
  const sb = $("search"), sr = $("search-results");
  sb.addEventListener("input", () => {
    const r = A.search(sb.value);
    sr.hidden = !r.length && sb.value.trim().length < 2;
    sr.innerHTML = r.length ? r.map(n => `<button type="button" data-pick="${n.id}"><b>${n.id}</b> ${A.esc(n.title)}</button>`).join("") : (sb.value.trim().length >= 2 ? `<p class="hint">No match. Try a shorter word.</p>` : "");
  });
  sr.addEventListener("click", e => { const b = e.target.closest("[data-pick]"); if (!b) return; sr.hidden = true; sb.value = ""; A.select(b.dataset.pick, false); });
  sb.addEventListener("keydown", e => { if (e.key === "Escape") { sr.hidden = true; } });

  /* sources dialog */
  const dlg = $("sources-dialog");
  $("sources-open").addEventListener("click", () => dlg.showModal ? dlg.showModal() : dlg.setAttribute("open", ""));
  $("sources-close").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });

  /* start */
  A.restore();
  const m = A.M.meta;
  $("version-line").textContent = `Working draft · version ${m.version} · ${m.date}`;
  $("sources-version").textContent = `Version ${m.version}, ${m.date}.`;
  render();
})();
