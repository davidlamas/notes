# Evaluation sprints: design and handover notes

Version 0.1.0, 9 November 2026. Written by Claude for David Lamas. Read this file first if you take over.

## What this page is

A script and exploration space for a six-academic-hour lab (6 x 45 = 270 minutes) in a bachelor course on human-computer interaction. Teams of five evaluate the Metro do Porto website in two sprints, using Loop11 (unmoderated remote usability test with screen recording), AccessMonitor and one Chrome accessibility plugin.

Students already know the theory and, to some extent, the website. The page does not teach theory. It links to chosen outside sources.

## Scenario (fictional, labelled as such on the page)

Metro do Porto's support line gets more calls, many about schedules and connections, while the network grows more complex. The digital team suspects the website. Students are an outside UX team doing a quick formative evaluation and report in five minutes.

## Fixed decisions from David

- All in English. Plain words.
- Two sprints. Umbrella titles: "Set the Route" and "Read the Signals". No mention of lab numbers.
- 8 teams of 5. Each team splits in two sub-teams (A: the study, B: the expert check). Sizes are suggestions only.
- Peer testing: team N builds a test, team N+1 takes it. Team 1 takes the last team's test.
- Mandatory tasks: a connection through the trip planner, and a departure read from a timetable PDF. Teams may add more.
- Last 45 minutes: eight 5-minute talks. Students may use any support they can show in five minutes.
- Sources limited to: the ISO standard, Interaction Design Foundation articles, Nielsen Norman Group articles, Loop11, AccessMonitor, the plugin's documentation, and the Metro do Porto site. Not the course slides.
- Teacher notes, timings and expected answers are visible to students. That is intended.
- Unlisted: not linked from the notes landing page, `noindex`, hash-named folder. Nothing else in the repository is touched. Do not edit `index.html`, `sitemap.xml`, `robots.txt`, `README.md` or other folders.

## Views

- **Brief.** The scenario, the facts, the two mandatory tasks, the sub-team split and the peer-test rotation.
- **Route.** The two sprints as blocks of time. Stations in one block run in parallel and share its minutes. A detail panel shows the selected station.
- **Resources.** Outside links, grouped, with a status tag.

## Data model (all content lives in `data/`)

- `meta.js`: version, date, totals, number of teams.
- `scenario.js`: scenario text, brief facts, mandatory tasks, extras, split, peer rotation.
- `sprints.js`: `TUT.sprints` (sprints and blocks) and `TUT.stations`. Fields: `title`, `stream` (A, B, AB), `minutes`, `status` (outline, draft), `aim`, `resources`.
- `resources.js`: `id`, `group`, `title`, `url`, `note`, `status`. Status `listed` means David named it or it was found on an official site. `pending` means no address yet. Only `listed` items may have an address.

Rules the checker enforces: block minutes equal station minutes; sprint minutes add up; the total is 270; station and resource ids exist; the presentation block is 45 minutes and eight talks fit; `index.html` has `noindex` and no external assets; JavaScript files hold no web addresses.

## Technical decisions

- Buildless HTML, CSS and JavaScript. No libraries, no remote fonts, no server, no accounts. Relative paths, so any static host works.
- Data in global `TUT` objects. `js/state.js` (state and URL), `js/render.js` (drawing), `js/app.js` (events).
- State in the query string (`?view=&sel=`), so a link shares the view and the selected station. Nothing is stored in the browser.
- Native buttons and `<dialog>`. Visible focus. `prefers-reduced-motion` respected. Skip link. Narrow screens stack into one column.
- Sub-team lanes are named in text on every station. Colour never carries meaning alone.
- Tokens follow the notes site: paper `#f7f4ee`, ink `#202624`, accent `#2f5e54`, focus `#9f4b2f`, Inter, 24px radius, pill mode switch.

## Checks

- `python3 src/check.py` checks the data.
- `NODE_PATH=/opt/npm-tools/node_modules node src/smoke.js` opens the page in Chromium, clicks through the views, tests the deep link, the dialog and a narrow screen.

## Status

All 14 stations are `draft` (full content). Version 0.4.0 is the checked version, ready for David's review. Remaining steps:

1. Sources: done (v0.1.1). Plugin chosen: Accessibility Insights for Web (free, guided WCAG 2.2 AA Assessment, FastPass). axe DevTools free tier is automated only. Resource ids `a11y-insights-*` replace the old `a11y-plugin-docs`. Loop11 help pages and AccessMonitor docs were only partly reachable; see open points.
2. Sprint 1 station content and interactions: done (v0.2.0).
3. Sprint 2 station content and interactions: done (v0.3.0).
4. Accessibility check, link check and handover notes: done (v0.4.0, see below).
5. David reviews, then says when to push. Nothing is pushed yet.

## Open points and claims that need qualification

- Which Portuguese law covers Metro do Porto's website (DL 83/2018 or DL 82/2022) is not confirmed.
- A quick scan found no accessibility tags or document language in the three schedule PDFs. That was a rough byte check, not an audit. Students should test it.
- How Loop11 judges success for the PDF task is not confirmed in its documentation; the plan is an answer question after the task. Check in the Loop11 account before the lab.
- Whether participants need a Loop11 licence is not confirmed. Verify in a Loop11 trial.
- The ISO link goes to the official paywalled page. David's Drive copy is not linked.
- AccessMonitor has a Chrome extension from AMA; not verified for this lab.
- The Metro do Porto site changes over time. The schedule PDFs seen on 9 November 2026 are valid from 7 September 2026.
- Sprint block timings are a first proposal. Sprint 2 is tight.

## Material boundary

The page is not linked from anywhere and marked `noindex`, but the host is public and the repository is public. Do not add personal data, student names, Loop11 exports, recordings, licence codes or any call-centre data. The scenario figures are invented and must stay labelled as invented.

## Station pages and tools (added in v0.2.0)

- A station with content opens as a full page: `?view=station&sel=<id>`. The mode switch keeps "Route" active. Stations without content show only the side panel.
- `data/content-s1.js` holds Sprint 1 content, keyed by station id: `intro`, `parts[{title,min,text,widget?}]`, `checks`, `good`, `watch`, `output`, `teacher`. Step minutes must add up to the station minutes. Sprint 2 content is in `data/content-s2.js` (same shape). The check script reads every `data/content-s*.js`. A station gets status `draft` in `sprints.js` once it has content.
- `data/widgets.js` holds the text and options of the tools: `goal` (usability goal builder), `taskcheck` (good or weak task), `success` (how to judge success), `issuelog`, `studylog` (lists with copy, from one factory `makeLog`), `rate` (success rate with a Wilson 95% range and median time), `sus` (SUS score per person and group), `lost` (lostness), `rank` (impact times frequency, sorted, copy), `talkplan`, `talkclock` (eight five-minute talks, one-minute warning). Code is in `js/widgets.js`. Add a tool: add data, add a function to `BUILD`, name it in a step.
- Everything the students type or tick lives in `App.mem` (memory only). A reload clears it. The issue log and the goal builder say so and offer Copy. This is deliberate: no storage, no personal data.
- A timer per station is a guide, with no minute-by-minute announcements.
- Loop11 and plugin menu names were not seen live, only from public pages. The text tells students to follow the live screen and the documentation. A teacher should click through Loop11 once before the lab.
- Facts used in the text that must be re-checked before the lab: station names Trindade, Aeroporto, Senhor de Matosinhos, Estádio do Dragão and the line names, and the answers to the PDF question (timetables change).

## Facts and formulas to re-check

- SUS: odd items score (answer minus 1), even items (5 minus answer), sum times 2.5. The text says "near 68 is often quoted as an average".
- Lostness (Smith, 1996): square root of ((N/S minus 1) squared plus (R/N minus 1) squared). Thresholds 0.4 and 0.5 are "often quoted" and labelled as a guide.
- Success rate range: Wilson interval, z = 1.96.
- Sprint 2 text says earlier editions had success-check errors. That comes from David's 2025 deck.
- The talks block is 2 + 20 + 20 + 3 minutes. Eight talks of five minutes fill 40 minutes, so changeovers must be near zero. The teacher notes say so.

## Checks run on 9 November 2026 (v0.4.0)

- `src/check.py`: data, minutes, ids, links rules, noindex, no external assets.
- `src/smoke.js`: Playwright. Views, deep links, dialog, every tool, narrow screen.
- `src/a11y.js`: axe-core (WCAG 2.0 to 2.2 A and AA, plus best practice) on 17 pages at 1280 and 390 pixels. First run found a contrast failure (muted text on the lilac lane), a link whose accessible name did not match its visible text, heading levels that skipped, and two scrollable panels not reachable by keyboard. All fixed. Result now: no violations. Needs `npm i axe-core` outside the folder and `AXE=<path to axe.min.js>`.
- By hand (scripted): 320 pixel width (a stand-in for 400 percent zoom) has no sideways scroll on all views and three stations. Tab order reaches every control, each with a visible focus ring and a name. After a view change by keyboard, focus moves to the new heading. Page has `lang`, a title, one `main` and one `h1`.
- Not done: a screen reader pass, and the Accessibility Insights Assessment on this page. axe finds only part of the problems. Run FastPass on this page before the lab, as an example for the students.
- Known gap: Portuguese words inside English text (Percursos, station names) have no `lang="pt"`. WCAG 3.1.2 asks for it.

## Link check (19 links)

Opened and title confirmed: Accessibility Insights (3), IxDF topic page, Loop11 (3), ISO page, NN/g study guide, unmoderated article, usability metrics, Metro planner, Metro schedules. The English Metro site is linked from the Metro site itself, but the address was not opened. One Loop11 address was wrong (it opened Task setup, not recruiting) and was replaced.
Not opened, so status `to-verify` on the page: DL 83/2018, DL 82/2022 and the NN/g success-rate article. WCAG 2.2 and AccessMonitor were not opened either, but they are canonical addresses. The workspace blocks most sites, so a person should click through all links once.

## Before the lab (teacher checklist)

1. Click through every link on the Resources view.
2. Make a Loop11 test with a wrong and a right answer. Confirm the PDF answer question, the SUS template, recording, the participant link and the trial limits.
3. Confirm the station and line names in the example tasks, and the correct answers for the PDF question.
4. Decide how teams pass test links, and tell them in Station 1.
5. Check the timetable PDFs: sizes, loading time, and whether they changed after 7 September 2026.
6. Run Accessibility Insights FastPass on this page.

## How to publish

The repository is public. Pushing to `main` publishes the page at davidlamas.github.io/notes/tutorials/7ba3806ee6/. Only the folder `tutorials/` has changed compared with the remote. Do not touch anything else. Nobody has pushed yet.
