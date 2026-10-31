# Experience and implementation decisions

## Core teaching argument

The site begins with a claim: a method does not determine a way of knowing. It then introduces six families, shows the kinds of warrants each family accepts, connects them, and returns students to the practical task of positioning a doctoral study.

## Two modes

### Presentation

A linear, keyboard-operable sequence for classroom use:

1. HCI does not have one epistemology.
2. Method is not epistemology.
3. Six coexisting epistemic families.
4. Focused family explanations and examples.
5. Cross-family tensions and translations.
6. Historical overlays as lenses, not a march of progress.
7. Conference communities as recurring—but plural and changing—epistemic homes.
8. A positioning synthesis for doctoral projects.

Slides use one central claim, short supporting text, and a restrained diagram. Forward/back controls and arrow keys support projection and lecturing.

### Exploration

A freely navigable map with progressive disclosure:

- overview first; family and tradition details on selection;
- search and family filters;
- keyboard-selectable nodes;
- related nodes remain emphasized while unrelated material recedes;
- a detail panel contains commitments, questions, methods, warrants, risks, relations, and studies;
- pan, zoom, reset, and overview controls;
- optional historical overlays;
- a two-way conference ecology: family → communities → papers and conference → papers → families;
- a visible construction methodology and known-limit statement;
- shareable query-string state;
- a categorized bibliography drawer with foundational, conceptual, study, and institutional sources;
- responsive list alternative when the graph would become cramped.

## Visual system

- Warm paper background with deep ink text.
- Six muted pastel family colours, each paired with dark text and non-colour labels.
- Sans-serif typography with generous leading and projection-friendly sizes.
- Curved map connections with explicit relation labels in details.
- Motion limited to orientation and state change; `prefers-reduced-motion` disables transitions.
- Strong focus rings, semantic headings, labelled controls, live regions for changing results, and no hover-only disclosure.

## Technical decisions

- Buildless HTML, CSS, and JavaScript for maintainability on GitHub Pages.
- Relative asset paths only, so `/notes/ways-of-knowing-in-hci/` works without a base rewrite.
- Content stored as structured JavaScript data, separate from rendering and interaction logic.
- No third-party runtime dependencies, external fonts, tracking, or server components.
- SVG is used only for generated semantic relationships; all interactive nodes are native HTML buttons.

## Deliberate limits

- The map is interpretive and pedagogical, not a bibliometric classification.
- Conference associations are tendencies and search lenses, not classifications of every paper in a venue.
- Featured studies may fit more than one family.
- The study-positioning tool offers prompts and tensions, not an automated epistemological verdict.
- “Path between” is limited to meaningful curated relations rather than arbitrary graph traversal.

