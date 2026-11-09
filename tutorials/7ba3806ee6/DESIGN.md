# Evaluation sprints page: technical notes

A buildless static page (HTML, CSS, vanilla JS, no framework, no build step). Open `index.html` or serve the folder. It is self-contained: it does not link to, or depend on, any other page, platform or course.

## What it is
A script and exploration space for a six-academic-hour hands-on session (6 x 45 = 270 minutes) in two sprints: teams of five evaluate the Metro do Porto website, with one sub-team running a Loop11 study and the other an accessibility evaluation (AccessMonitor, Accessibility Insights, by hand), then they merge, rank, sketch fixes and give 5-minute talks. The scenario is fictional: an outside UX team advising the transport company's digital team.

## Files
- `data/meta.js`, `data/scenario.js`, `data/sprints.js` (timeline and stations), `data/content-s1.js` and `data/content-s2.js` (content of each station), `data/resources.js`, `data/widgets.js`.
- Station model: `intro`, `parts[{title,min,text,widget?,help?}]`, `checks`, `good`, `watch`, `output`, `teacher`. Part minutes must add up to the station minutes.
- Streams: A (the study), B (the expert check), AB (everyone). Resource status: `listed`, `to-verify`, `pending`. Every resource should be attached to at least one station.
- `js/`, `styles.css`: the engine. State is in the query string: `?view=...&sel=<id>`. Widget state lives in memory only and is lost on reload; the tools say so and offer Copy.

## Checks (run from this folder)
- `python3 src/check.py`, `node src/smoke.js` (Playwright), `AXE=<path to axe.min.js> NODE_PATH=... node src/a11y.js`.
- `python3 src/make-preview.py OUT.html` builds one self-contained file.
- If you change the number of stations or resources, update the counts in `src/smoke.js`.

## Content rules
- Plain, short English. Notes for teachers and answers are visible to students on purpose.
- No personal data, participant names, Loop11 exports or recordings in the repository. The ISO standard is copyrighted: the page links the official page and paraphrases; it does not host the text.
- The Metro website changes over time, so exact success addresses may differ between sessions. The text says so.
- Loop11 and plugin menu names were taken from public pages, not seen live. The text tells learners to follow the live screen and the documentation. A teacher should click through the tools before the session.
- The page is not linked from anywhere and carries `noindex`; the host and repository are public.

## Open points
1. Open every link once; several are marked `to-verify`.
2. Run a screen reader pass and Accessibility Insights FastPass on the page.
3. Each learner needs a temporary Loop11 licence, and the teacher decides how teams pass test links.
