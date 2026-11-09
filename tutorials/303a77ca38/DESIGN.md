# Evaluation project page: notes for the next person or agent

## What this page is
An unlisted, buildless page (HTML, CSS, vanilla JS) for the evaluation project of the HCI lab course (Lusófona, Porto). It is a sibling of `../7ba3806ee6/` (the two practice labs with Loop11 and the Metro do Porto website). It uses the same engine. All text is English and lives in `data/`.

Title requested by David: "Evaluation project, Loop11 · AccessMonitor · Metro do Porto". Header mark: "P". Nothing links to it. It is marked `noindex`.

## Where the content comes from
Everything about the project is mined from the Moodle course page (course id 22490, read on 9 November 2026): the project description, the fifteen steps, the expected results, the options A/B/C, the templates, and the timeline. The English text is a plain summary. Moodle wins if they differ.

## Facts from Moodle used here
- Project opens 17 Nov 2026, due Monday 4 Jan 2027 at 23:59 (assignment "Projeto").
- Labs #1 and #2 (Loop11, Metro do Porto) and #3 (start the project) sit under the week of 16 to 20 Nov. Labs #4 to #6 under 14 to 18 Dec. Labs #7, #8 and #9 and #10 (presentations) under 4 to 8 Jan.
- Groups: at most five. Options: A SIGA, B SNS24, C public transport in Porto (the address given is stcp.pt), or another website.
- Plagiarism means failing at once.
- The order of presentations is a hidden Moodle page.

## Assumptions and open points (decisions for David)
1. Lab length is assumed to be 135 minutes (three academic hours, as in the practice labs). Minutes inside each lab are suggestions.
2. The report deadline (4 Jan 23:59) is earlier than Lab #8 where the report is compiled, and the presentation labs are in the same week. One of the dates is probably out of date on Moodle.
3. Option C on Moodle is the STCP pages, not Metro do Porto. The page title says Metro do Porto because David asked for it. The content is written for any website.
4. Moodle has ten team spaces ("Equipa 1" to "Equipa 10"). The practice page assumed eight teams. This page does not depend on a team count.
5. Slot length for the final talks is not on Moodle.
6. Lab #3 appears under the November week. Confirm its real date.
7. Which Portuguese accessibility law applies to each option is not confirmed. Both decrees are listed with a "to verify" status.
8. The three service websites are real. Check that their main tasks can be tested without login or personal data. SIGA and SNS24 may need extra care.

## Files
- `data/meta.js`, `scenario.js` (project brief, in `sections`), `sprints.js` (stretches, labs, stations), `content-p.js` (the content of each lab), `resources.js`, `widgets.js` (tools).
- `js/` and `styles.css`: the engine, copied from the practice page. Brief view renders `scenario.sections`. Route view texts come from `meta.ui`.
- "Sprint" in the code means a stretch of the timeline. Block means one lab. Stream A is the study, B is the accessibility evaluation, AB is the whole group.
- Checks: `python3 src/check.py`, `NODE_PATH=/opt/npm-tools/node_modules node src/smoke.js`, and `AXE=<axe.min.js> NODE_PATH=... node src/a11y.js`.

## Status at version 0.1.0
All nine stations have draft content. No links on this page were opened and checked, except the Moodle ones that were read from the course page. Resources copied from the practice page keep their status. No screen reader pass was done.

## How to publish
It is a static folder. Pushing to the `notes` repo publishes it with the rest. Do not link it from the notes landing page.
