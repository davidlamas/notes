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

Foundation only. Every station is `outline`: title, time, stream and aim. Next steps, in order:

1. Sources: done (v0.1.1). Plugin chosen: Accessibility Insights for Web (free, guided WCAG 2.2 AA Assessment, FastPass). axe DevTools free tier is automated only. Resource ids `a11y-insights-*` replace the old `a11y-plugin-docs`. Loop11 help pages and AccessMonitor docs were only partly reachable; see open points.
2. Sprint 1 station content and interactions.
3. Sprint 2 station content and interactions.
4. Accessibility check of this page itself (use the same tools the students use), link check, handover notes.

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
