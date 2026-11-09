/* Opens the page in a real browser and checks the basics.
   Run from the page folder: NODE_PATH=/opt/npm-tools/node_modules node src/smoke.js
   Needs playwright with a Chromium build. */
const path = require("path");
const { chromium } = require("playwright");

(async () => {
  const url = "file://" + path.resolve(__dirname, "..", "index.html");
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on("pageerror", e => errors.push("pageerror: " + e.message));
  page.on("console", m => { if (m.type() === "error") errors.push("console: " + m.text()); });
  await page.goto(url);
  const fail = [];
  const ok = (c, msg) => { if (!c) fail.push(msg); };

  ok((await page.locator("#view-brief h1").innerText()).length > 10, "brief heading missing");
  ok((await page.locator("#view-brief .card").count()) >= 5, "brief cards missing");

  await page.click('[data-view="route"]');
  ok((await page.locator(".station").count()) === 14, "expected 14 stations");
  ok((await page.locator(".sprint").count()) === 2, "expected 2 sprints");
  await page.click('[data-sel="s1-build"]');
  ok((await page.locator("#panel h2").innerText()).includes("Loop11"), "panel did not show the Loop11 station");
  ok(page.url().includes("sel=s1-build"), "selection not in URL");
  ok((await page.locator('[data-sel="s1-build"]').getAttribute("aria-pressed")) === "true", "aria-pressed not set");

  // full station page and tools
  await page.click('[data-sel="s1-goals"]');
  await page.click('[data-open="s1-goals"]');
  ok((await page.locator("#view-station h1").innerText()).includes("goals"), "station page did not open");
  ok(page.url().includes("view=station"), "station view not in URL");
  ok((await page.locator("#view-station .part").count()) === 4, "expected 4 steps");
  await page.fill("#s1-goals_1-who, input[id$='-who']", "a visitor");
  ok((await page.locator(".out").first().innerText()).startsWith("A visitor"), "goal builder did not update");
  await page.locator(".qitem").first().locator("text=Good task").click();
  ok((await page.locator(".qitem .fb").first().innerText()).includes("Not quite"), "task checker gave no feedback");
  await page.locator("#view-station .choices.stack .choice").nth(1).click();
  ok((await page.locator(".widget .fb").last().innerText()).startsWith("Strong"), "success chooser gave no feedback");
  await page.locator("#view-station [data-done]").first().check();
  ok((await page.locator("#check-count").innerText()).startsWith("1 of"), "check count not updated");
  await page.click("#view-station .timer button >> text=Start timer");
  await page.click('[data-nav="s1-scan"]');
  await page.fill("input[id$='-what']", "Search button has no label");
  await page.click("text=Add to list");
  ok((await page.locator(".loglist li").count()) === 1, "issue log did not add an entry");
  ok(await page.evaluate(() => document.activeElement && document.activeElement.tagName === "INPUT"), "focus not kept in the log form");
  // Sprint 2 tools
  await page.goto(url + "?view=station&sel=s2-results");
  await page.fill("input[id$='-n']", "5"); await page.fill("input[id$='-ok']", "3"); await page.fill("input[id$='-times']", "90, 120, 200");
  const rt = await page.locator(".out").first().innerText();
  ok(rt.includes("3 of 5") && rt.includes("%") && rt.includes("120 seconds"), "rate widget wrong: " + rt);
  for (let i = 1; i <= 10; i++) await page.fill(`input[id$='-i${i}']`, i % 2 ? "5" : "1");
  await page.click("text=Add participant");
  ok((await page.locator(".out").nth(1).innerText()).includes("100"), "SUS of best answers should be 100");
  await page.fill("input[id$='-N']", "4"); await page.fill("input[id$='-S']", "6"); await page.fill("input[id$='-R']", "2");
  ok((await page.locator(".out").nth(2).innerText()).includes("Lostness:"), "lostness not shown");
  await page.goto(url + "?view=station&sel=s2-rank");
  await page.fill("input[id$='-t']", "Planner needs the mouse");
  await page.selectOption("select[id$='-impact']", "3"); await page.selectOption("select[id$='-freq']", "2");
  await page.click("text=Add to ranking");
  ok((await page.locator(".loglist li").first().innerText()).includes("Score 6"), "rank score wrong");
  await page.goto(url + "?view=station&sel=s2-present");
  await page.click("text=Next talk");
  ok((await page.locator(".talkno").innerText()) === "Talk 2 of 8", "talk clock did not advance");
  await page.goto(url + "?view=route");
  ok((await page.locator(".station").filter({ hasText: "ready" }).count()) === 14, "all stations should show ready");
  await page.click('[data-view="resources"]');
  ok((await page.locator(".ritem").count()) === 29, "expected 29 resources");
  ok((await page.locator('#view-resources a[target="_blank"][rel*="noopener"]').count()) >= 8, "links should open safely in a new tab");

  // deep link
  await page.goto(url + "?view=route&sel=s2-audit");
  ok((await page.locator("#panel h2").innerText()).includes("accessibility"), "deep link did not restore the station");

  // keyboard: header buttons reachable and dialog works
  await page.click("#about-open");
  ok(await page.locator("#about-dialog").evaluate(d => d.open), "about dialog did not open");
  await page.keyboard.press("Escape");
  ok(!(await page.locator("#about-dialog").evaluate(d => d.open)), "about dialog did not close with Escape");

  // narrow screen: no sideways scroll
  await page.setViewportSize({ width: 390, height: 800 });
  await page.click('[data-view="route"]');
  ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), "sideways scroll on a narrow screen");

  await browser.close();
  const all = errors.concat(fail);
  if (all.length) { console.log("FAILED"); all.forEach(e => console.log(" -", e)); process.exit(1); }
  console.log("OK: smoke test passed");
})();
