# Evaluation project page: notes for the next person or agent

## What this page is
An unlisted, buildless page (HTML, CSS, vanilla JS) for the evaluation project of the HCI lab course (Lusófona, Porto). It is a sibling of `../7ba3806ee6/` (the two practice labs with Loop11). It uses the same engine. All text is English and lives in `data/`.

Title: "Evaluation project: Loop11 · AccessMonitor". Header mark: "P". Nothing links to it. It is marked `noindex`.

## Where the content comes from
Everything about the project is mined from the Moodle course page (course id 22490, read on 9 November 2026): the project description, the fifteen steps, the expected results, the options A/B/C, the templates, and the timeline. The English text is a plain summary. Moodle wins if they differ.

## Decisions from David (9 November 2026)
- Four working labs (Moodle #3 to #6), each 3 academic hours (135 min), plus two presentation sessions. Moodle's labs #7 and #8 are folded into Lab #6 and independent work. Each lab ends with an "after" list of independent work.
- No dates and no deadline on the page. Report and presentation are handed in the day before the presentation sessions.
- Talks: 20 minutes plus 10 minutes of discussion, so four groups per session and at most eight groups. Moodle has ten team spaces: check the real number of groups.
- Formative evaluation. Each group picks its own website, no duplicates, the lecturer approves it. SIGA and SNS24 dropped. No Metro do Porto material on this page. The eligibility rules on the brief view are a draft for the lecturer. Candidate services (CP, others) are not on the page yet.
- Header mark: "P" for project. (The Metro sprint page uses "S" for sprint.)

## Facts from Moodle used here
- The fifteen project steps, the expected report and presentation, the templates for expert review, the accessibility links, and the lab activity lists.
- Plagiarism means failing the course at once.
- The order of presentations is a hidden Moodle page.

## Open points
1. The minutes inside each lab are suggestions.
2. Which Portuguese accessibility law applies depends on the website. Both decrees are listed as "to verify".
3. Eligibility guidelines need the lecturer's approval. The list of candidate sites is still to come.
4. No link on this page was opened and checked, apart from the Moodle ones. No screen reader pass was done.

## Files
- `data/meta.js`, `scenario.js` (project brief, in `sections`), `sprints.js` (stretches, labs, stations), `content-p.js` (the content of each lab), `resources.js`, `widgets.js` (tools).
- `js/` and `styles.css`: the engine, copied from the practice page. Brief view renders `scenario.sections`. Route view texts come from `meta.ui`.
- "Sprint" in the code means a stretch of the timeline. Block means one lab. Stream A is the study, B is the accessibility evaluation, AB is the whole group.
- Checks: `python3 src/check.py`, `NODE_PATH=/opt/npm-tools/node_modules node src/smoke.js`, and `AXE=<axe.min.js> NODE_PATH=... node src/a11y.js`.

## Status at version 0.2.0
All seven stations have draft content. No links on this page were opened and checked, except the Moodle ones that were read from the course page. Resources copied from the practice page keep their status. No screen reader pass was done.

## How to publish
It is a static folder. Pushing to the `notes` repo publishes it with the rest. Do not link it from the notes landing page.
