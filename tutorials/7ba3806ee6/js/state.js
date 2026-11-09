/* State and URL. The view and the selected station live in the query string, so a link shares them. */
(function () {
  const App = (window.App = window.App || {});
  const VIEWS = ["brief", "route", "resources"];
  App.T = window.TUT;
  App.state = { view: "brief", sel: null };
  App.esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  App.restore = function () {
    try {
      const q = new URLSearchParams(location.search);
      if (VIEWS.includes(q.get("view"))) App.state.view = q.get("view");
      const sel = q.get("sel");
      if (sel && App.T.stations[sel]) { App.state.sel = sel; if (!q.get("view")) App.state.view = "route"; }
    } catch (e) { /* keep defaults */ }
  };
  App.url = function () {
    try {
      const q = new URLSearchParams();
      q.set("view", App.state.view);
      if (App.state.sel) q.set("sel", App.state.sel);
      history.replaceState(null, "", "?" + q.toString());
    } catch (e) { /* file:// or blocked: ignore */ }
  };
  App.LANES = { A: "A: the study", B: "B: the expert check", AB: "Together" };
})();
