# MOZBEATS 2027 proposal canvas: design notes

Version 0.3.0, 6 November 2026. Written by Claude for David Lamas. Everything marked "assistant proposal" needs partner confirmation.

## Central argument

The 2026 proposal scored 80/100 and was rejected only because the call budget ran out. The 2027 text must therefore keep what worked and answer 20 named weaknesses. The canvas is a shared object for the partner meeting: one picture of the project, with the reviewer comments, the 2027 decisions and the documents we must secure tied to it.

## Modes

- **Overview.** The five work packages as one picture: Uptake (WP4) as a roof, three streams (WP1 to WP3), and a base (WP5). Layers switch on and off. It is for presenting.
- **Explore.** Six lenses on the same data: Evaluation, Plan, Partners, Evidence, Part B, Budget. It is for working through details after the presentation.

Both modes share one selection. Pick a node in either mode and everything it connects to is highlighted and listed in the detail panel.

## Layers and encodings (Overview)

Layers: tasks, deliverables and milestones, 2027 decisions, reviewer weaknesses, documents to secure, partners and leads, keep/revise/new. Presets: Start view, Plan, What changed from 2026, What reviewers said, What we must secure.

- Brown-orange circle with a number: count of 2026 weaknesses tied to the item.
- Solid brown-orange card edge: weakness. Dashed blue edge: strength to keep. Both carry a text label.
- Work package colours (sage, lilac, blue, ochre, rose) only identify the package.
- No red/green coding, as in the other notes pages. Colour never carries meaning alone.

## Data model

Ten node types: objective, wp, task, deliverable, milestone, partner, decision, esr, evidence, partb. Links are undirected pairs. 170 nodes and 429 links.
Fields that matter: `status` (decided, proposed, needs-validation, open, to-secure), `disposition` (keep, revise, new), `origin` (sealed-2026, evaluator, decided, proposed, matrix).
The data files in `data/*.js` are the source of truth. Edit them by hand.

## Technical decisions

- Buildless HTML, CSS and JavaScript. No dependencies. Relative paths, so any static host works.
- Data in separate files, one global `MOZ` object. `js/state.js` builds the graph; `overview.js` and `explore.js` draw; `app.js` handles events.
- Native buttons, checkboxes and `<dialog>`. Visible focus. `prefers-reduced-motion` respected.
- State in the query string (`?mode=&lens=&sel=&layers=`) so a view can be shared by link.
- Narrow screens stack into a single column.
- Same tokens as the notes site: paper `#f7f4ee`, ink `#202624`, accent `#2f5e54`, terracotta `#9f4b2f`, Inter, 24px radius, pill mode switch.

## Checks

`python3 src/check.py` tests duplicate ids, dead links, and that every weakness has a task or decision and a Part B section. `node src/smoke.js` runs the page in jsdom. `python3 src/make_docs.py` writes COVERAGE_MATRIX.md and EVIDENCE_GAP_AUDIT.md.

## Deliberate limits

- Budget lens shows 2026 figures only. 2027 rules are not published yet.
- The 2026 plan is the baseline. Nothing here replaces the sealed 2026 text.
- No accounts, no server, no saved edits. Changes go into the data files.

## Claims that need qualification

- Work package summaries (one line each) are assistant proposals.
- The seven decisions DEC-1 to DEC-7 come from the pre-blueprint log; partners have not all confirmed them. The UP role in the doctorate is still to be validated.
- Links between weaknesses, tasks and documents are the assistant's mapping. Partners should correct them.
- Task time windows are not yet taken from the 2026 timetable page.
- The February 2027 deadline is not verified.
- The 159 against 156 person-months difference in 2026 is flagged, not resolved.

## Material boundary

The page holds the proposal's own working material and the evaluation summary. It is not linked from anywhere and is marked `noindex`, but the host is public. Do not add personal data, bank data or partner contracts.
