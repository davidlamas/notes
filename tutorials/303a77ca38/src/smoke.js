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
  ok((await page.locator("#view-brief .card").count()) >= 10, "brief cards missing");
  ok((await page.title()).includes("Evaluation project"), "page title wrong");
  ok((await page.locator(".wordmark-mark").innerText()) === "P", "mark should be P");

  await page.click('[data-view="route"]');
  ok((await page.locator(".station").count()) === 9, "expected 9 stations");
  ok((await page.locator(".sprint").count()) === 2, "expected 2 stretches");
  await page.click('[data-sel="step3"]');
  ok((await page.locator("#panel h2").innerText()).includes("Plan the study"), "panel did not show step 3");
  ok(page.url().includes("sel=step3"), "selection not in URL");

  await page.click('[data-open="step3"]');
  ok((await page.locator("#view-station .part").count()) === 4, "expected 4 steps in step 3");
  ok((await page.locator(".widget").count()) === 1, "expected the profile tool in step 3");
  await page.locator("#view-station [data-done]").first().check();
  ok((await page.locator("#check-count").innerText()).startsWith("1 of"), "check count not updated");
  await page.click("#view-station .timer button >> text=Start timer");
  await page.goto(url + "?view=station&sel=step4a");
  await page.fill("input[id$='-what']", "Participants missed the search box");
  await page.click("text=Add to list");
  ok((await page.locator(".loglist li").count()) === 1, "study log did not add an entry");

  await page.goto(url + "?view=station&sel=step5");
  await page.fill("input[id$='-n']", "5"); await page.fill("input[id$='-ok']", "3"); await page.fill("input[id$='-times']", "90, 120, 200");
  const rt = await page.locator(".out").first().innerText();
  ok(rt.includes("3 of 5") && rt.includes("%") && rt.includes("120 seconds"), "rate widget wrong: " + rt);
  await page.goto(url + "?view=route");
  ok((await page.locator(".station").filter({ hasText: "ready" }).count()) === 9, "all stations should show ready");
  await page.click('[data-view="resources"]');
  ok((await page.locator(".ritem").count()) === 43, "expected 43 resources");
  ok((await page.locator('#view-resources a[target="_blank"][rel*="noopener"]').count()) >= 8, "links should open safely in a new tab");

  // deep link
  await page.goto(url + "?view=route&sel=step4b");
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
