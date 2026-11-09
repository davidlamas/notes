/* Accessibility check of this page with axe-core, on every view and station, at two sizes.
   Run: NODE_PATH=/opt/npm-tools/node_modules AXE=/path/to/axe.min.js node src/a11y.js
   Install axe first: npm i axe-core (in any folder outside this one). Not part of the page. */
const path = require("path"), fs = require("fs");
const { chromium } = require("playwright");
(async () => {
  const axeSrc = fs.readFileSync(process.env.AXE, "utf8");
  const url = "file://" + path.resolve(__dirname, "..", "index.html");
  const b = await chromium.launch(), out = [];
  const stations = fs.readFileSync(path.resolve(__dirname, "..", "data", "sprints.js"), "utf8").match(/"((?:step|pres)[0-9]+[ab]?)": \{/g).map(x => x.match(/"(.+)"/)[1]);
  const targets = ["?view=brief", "?view=route", "?view=resources"].concat(stations.map(s => "?view=station&sel=" + s));
  for (const size of [{ width: 1280, height: 900 }, { width: 390, height: 800 }]) {
    const p = await b.newPage({ viewport: size });
    for (const t of targets) {
      await p.goto(url + t); await p.addScriptTag({ content: axeSrc });
      const r = await p.evaluate(() => axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] }));
      r.violations.forEach(v => out.push(`${size.width} ${t}: ${v.id} (${v.impact}) ${v.nodes.length} node(s): ${v.nodes[0].target.join(" ")}`));
    }
    await p.close();
  }
  await b.close();
  if (out.length) { console.log("VIOLATIONS"); out.forEach(o => console.log(" -", o)); process.exit(1); }
  console.log("OK: no axe violations on", targets.length, "pages at two sizes");
})();
