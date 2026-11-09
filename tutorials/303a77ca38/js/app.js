/* Startup, view switching and events. */
(function () {
  const App = window.App, S = App.state, $ = id => document.getElementById(id);
  function render(focus) {
    App.stopTimers();
    document.querySelectorAll(".mode-button").forEach(b => { const on = b.dataset.view === (S.view === "station" ? "route" : S.view); b.classList.toggle("is-active", on); b.setAttribute("aria-pressed", on); });
    ["brief", "route", "station", "resources"].forEach(v => { $("view-" + v).hidden = S.view !== v; });
    App.views[S.view]();
    App.url();
    if (focus) { const h = $("view-" + S.view).querySelector("h1"); if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); } }
  }
  document.addEventListener("click", e => {
    const v = e.target.closest("[data-view]"), s = e.target.closest("[data-sel]"), o = e.target.closest("[data-open],[data-nav]");
    if (o) { S.sel = o.dataset.open || o.dataset.nav; S.view = "station"; render(true); window.scrollTo(0, 0); }
    else if (v) { S.view = v.dataset.view; render(true); window.scrollTo(0, 0); }
    else if (s) {
      S.sel = S.sel === s.dataset.sel ? null : s.dataset.sel;
      document.querySelectorAll("[data-sel]").forEach(b => b.setAttribute("aria-pressed", b.dataset.sel === S.sel));
      App.panel(); App.url();
    }
  });
  document.addEventListener("change", e => {
    const d = e.target.closest("[data-done]");
    if (d) { App.mem.done[d.dataset.done] = d.checked; App.checkCount(S.sel); }
  });
  const dlg = $("about-dialog");
  $("about-open").addEventListener("click", () => dlg.showModal ? dlg.showModal() : dlg.setAttribute("open", ""));
  $("about-close").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });

  App.restore();
  const m = App.T.meta;
  $("short-title").textContent = m.short;
  $("about-version").textContent = `Version ${m.version}, ${m.date}.`;
  render();
})();
