# Evaluation project page: technical notes

A buildless static page (HTML, CSS, vanilla JS, no framework, no build step). Open `index.html` or serve the folder. It is self-contained: it does not link to, or depend on, any other page, platform or course.

## What it is
A plain-English working script for a group project: choose a website, run a formative usability study with Loop11, run an accessibility evaluation, compile and rank the problems, propose fixes, write a report and give a talk. Six working steps (135 minutes each, three academic hours) and two presentation sessions. No dates or deadlines appear on purpose; the hand-in is "the day before the presentation sessions".

## Files
- `data/meta.js`: title, mark, version, texts shown in the interface.
- `data/scenario.js`: the project brief (`sections` render as cards on the Project view).
- `data/sprints.js`: the timeline (stretches, blocks, stations). A "station" in the code is one step or session; the interface says "step".
- `data/content-p.js`: content of each step: `intro`, `parts[{title,min,text,widget?,help?}]`, `checks`, `good`, `watch`, `output`, `teacher`, optional `after`. Part minutes must add up to the step's minutes.
- `data/resources.js`: outside links. Status `listed`, `to-verify` or `pending`. Every resource should be attached to at least one step in `sprints.js`.
- `data/widgets.js`: small tools (goal, issue log, study log, rate, SUS, lost, rank, talk plan, profile). State lives in memory only (`App.mem`) and is lost on reload.
- `js/`, `styles.css`: the engine. State is in the query string: `?view=brief|route|station|resources&sel=<id>`.
- Words: a **work session** is one session on the timeline (Work session 1 to 6), followed by Presentation sessions 1 and 2. A **step** is one of the things the project asks for (numbered 1 to 14 in `scenario.js`, section kind `steps`, each with the `sessions` where it is done). A **part** is a timed block inside a session. The Project view links each step to its sessions, and each session page and panel lists its project steps back: keep the two lists coherent when you change either. Internal ids (`step1`, `step4a`, `pres1`) are session ids kept for stable addresses; the interface never shows them.
- Streams: A (the usability study), B (the accessibility evaluation), AB (the whole group).

## Checks (run from this folder)
- `python3 src/check.py`: data consistency, minutes, references.
- `node src/smoke.js` (Playwright; set `NODE_PATH` to where it is installed).
- `AXE=<path to axe.min.js> NODE_PATH=... node src/a11y.js`: axe on every view at two sizes.
- `python3 src/make-preview.py OUT.html`: one self-contained file for sharing or review.
- If you change the number of steps or resources, update the counts in `src/smoke.js`.

## Content rules
- Plain, short English. Notes for teachers and answers are visible to students on purpose.
- No personal data, names of participants, exports or recordings anywhere in the repository.
- The example websites and several links are from general knowledge and marked `to-verify`: open them before use.
- The legal notes (Portuguese accessibility decrees) are not legal advice and are marked `to-verify`.
- The page is not linked from anywhere and carries `noindex`; the host and repository are public.

## Open points
1. Check every `to-verify` link.
2. A screen reader pass has not been done. Run Accessibility Insights FastPass on the page.
3. The eligibility rules for websites are a draft for the teacher to adopt or change.
