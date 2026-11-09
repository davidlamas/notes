/* Startup, view switching and events. */
(function () {
  const App = window.App, S = App.state, $ = id => document.getElementById(id);
  function render() {
    document.querySelectorAll(".mode-button").forEach(b => { const on = b.dataset.view === S.view; b.classList.toggle("is-active", on); b.setAttribute("aria-pressed", on); });
    ["brief", "route", "resources"].forEach(v => { $("view-" + v).hidden = S.view !== v; });
    App.views[S.view]();
    App.url();
  }
  document.addEventListener("click", e => {
    const v = e.target.closest("[data-view]"), s = e.target.closest("[data-sel]");
    if (v) { S.view = v.dataset.view; render(); window.scrollTo(0, 0); }
    else if (s) {
      S.sel = S.sel === s.dataset.sel ? null : s.dataset.sel;
      document.querySelectorAll("[data-sel]").forEach(b => b.setAttribute("aria-pressed", b.dataset.sel === S.sel));
      App.panel(); App.url();
    }
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
