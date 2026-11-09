# Handover: HCI course tutorial pages

For any agent or person taking over. Read this first. The tutorial folders are deliberately independent of any course or platform: each page's `DESIGN.md` holds only tutorial-level technical notes. Everything tied to the course (Moodle ids and edits, lab numbering, deck links, decisions, history) lives here and in `course-notes/` (the earlier full `DESIGN.md` files, one per page).

## What exists
Two unlisted, buildless GitHub pages (HTML, CSS, vanilla JS, no build step, no framework) for the bachelor course "Interação Homem-Máquina" (Lusófona Porto, Moodle course id 22490, taught by David Lamas and Virgínia Araújo). Repo: `davidlamas/notes`, branch `main`, published by GitHub Pages. Nothing is linked from anywhere; the hash folder names are the only "address".

| Folder | Mark | What it is |
|---|---|---|
| `7ba3806ee6/` | S | "Evaluation sprints": the two-sprint practice lab (Loop11, AccessMonitor, Metro do Porto), Moodle Labs #1 and #2. Wording: "Sprint 1 and 2". |
| `303a77ca38/` | P | "Evaluation project: Loop11 · AccessMonitor": the group project, Moodle Labs #3 to #10. Wording: "Step 1 to 6", then "Presentation sessions 1 and 2". Never say "station" in visible text (internal code names still do). |

## Decisions that must not be undone without asking David
- Project page: six working steps (Moodle Labs #3 to #8), then two presentation sessions (Labs #9, #10). Each session is 3 academic hours (135 min). The last four sessions are in January.
- No dates or deadlines on the page. Report and presentation are handed in the day before the presentation sessions.
- Talks: 20 min plus 10 min discussion, four groups per session (at most eight groups).
- Formative evaluation. Each group picks its own website, no duplicates, the lecturer approves it. It must allow broad interaction without login (may be private) and have a minimum complexity. No Metro do Porto material on the project page. SIGA, SNS24 and gov.pt were dropped.
- Work was rebalanced: more done in the labs, little independent work (only Step 4a and Step 6 have an "after" list).
- David wants plans and options first for anything big. Do not implement when asked for a plan. Do not push without being told.

## How each page works
- Data lives in `data/*.js` as `window.TUT` objects (`meta`, `scenario`/`sprints`, `content-*`, `resources`, `widgets`). Rendering is in `js/` (`state.js`, `render.js`, `widgets.js`, `app.js`). State is in the query string (`?view=brief|route|station|resources&sel=<id>`); widget and checkbox state is in memory only.
- Each lab/step has `intro`, `parts[{title,min,text,widget?,help?}]`, `checks`, `good`, `watch`, `output`, `teacher`, optional `after`. Part minutes must add up to the lab minutes (135 on the project page).
- Streams: A (study), B (accessibility), AB (whole group). Status `draft` or `outline`. Resource status `listed`, `to-verify`, `pending`.
- Edit data by hand. The one-off generator scripts used earlier were not kept.

## Checks (run from the page folder)
- `python3 src/check.py` (data consistency, minutes, links to ids)
- `node src/smoke.js` (Playwright; needs `NODE_PATH=/opt/npm-tools/node_modules` or similar)
- `AXE=/tmp/axe/node_modules/axe-core/axe.min.js NODE_PATH=/opt/npm-tools/node_modules node src/a11y.js` (axe; install `axe-core` into `/tmp/axe` first)
- `python3 src/make-preview.py OUT.html` builds one self-contained file to open or send. Rebuild it after every change; a stale preview caused a wrong "M" report once.
- If you change counts (stations, resources) update the numbers in `src/smoke.js`.

## Moodle (course id 22490)
Edited through the browser, signed in as David. Activity edit URL: `course/modedit.php?update=<cmid>`. Description editor is TinyMCE `#id_introeditor` (`tinyMCE.get('id_introeditor').setContent(...)`, then `.save()`); submit with `#id_submitbutton2`. Do not navigate away right after clicking submit; wait for the redirect.
- 151043: assignment "Projeto". Description updated. **Dates not changed: opens 17 Nov 2026, due 4 Jan 2027 23:59.** The due date probably should be the day before the presentations; David said to leave it. Raise it again only if he does.
- 151044, 151045: options A and B, hidden. 151046: option C, renamed to the STCP example.
- 154415 (Labs #1 to #3), 154432 (Labs #4 to #6), 154439 (Labs #7 to #10): lab bullet lists, updated 9 Nov 2026. Headings and week titles untouched.
- Full log of Moodle changes: `course-notes/303a77ca38-DESIGN.md`.

## Open points (all David's to decide or verify)
1. The 15 example websites on the project page (other than STCP) have unverified addresses and "to-verify" status. No link was opened.
2. Whether GitHub Pages is live and showing the latest version (the shell here cannot reach the Pages URL).
3. How many groups: Moodle has ten team spaces, but only eight talk slots exist.
4. Eligibility rules for websites are a draft for the lecturers to approve.
5. Portuguese accessibility law references (DL 83/2018, DL 82/2022) are marked to-verify.
6. The practice page's own checklist (Loop11 dry run, links, PDFs, licences, FastPass) is David's. See `course-notes/7ba3806ee6-DESIGN.md`.
7. Two shared Google Slides decks, one per case, so each presentation session runs from a single deck (Team 1 to Team 8 slides, instructions, order of talks):
   - Practice lab (5-minute talks): https://docs.google.com/presentation/d/1icr2c8OgjRTND1p1kuXgeUesFMaQgVp4hXUCmEhk2ak/edit
   - Project (20 + 10 minute talks; Teams 1 to 4 in session 1, Teams 5 to 8 in session 2): https://docs.google.com/presentation/d/1Hx93SZfuzjTXkn35M3uZlw8NUcFX8MMfccEvNb-wVxE/edit
   Both are owned by David's Google account and were private when created: students cannot open them until David turns on sharing (edit access for the group that needs it). The links are in this public repo and on both pages (Resources view, and on the talk steps) at David's request; check the sharing setting before assuming anyone can open or edit them.

## Independence rule (David, 9 Nov 2026)
The two tutorial pages must not mention or link to Moodle, the course, its lab numbering or each other, so each can be deployed on its own outside the course. Moodle must not link to them either. Keep course-specific facts out of the tutorial folders. The only course-specific item left on a page is the shared-deck link in Resources (one entry, `deck-talks`); remove that entry and its references in `sprints.js` for a standalone deployment.

## Rules
- Only touch `tutorials/7ba3806ee6/`, `tutorials/303a77ca38/` and this file. Do not modify anything else under `notes/`.
- This repo is public: no credentials, personal data or private links.
- Commit messages in this repo end with the attribution lines the tooling asks for.
