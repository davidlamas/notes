/* Outside resources. Edit by hand.
   status: "listed" means the source names it or it was found on the official site.
           "to-verify" means the address or the exact page still has to be checked.
           "pending" means the item has no address yet. */
window.TUT = window.TUT || {};
TUT.resources = [
  {
    "id": "deck-talks",
    "group": "Shared talk deck",
    "title": "Shared slide deck for the talks",
    "url": "https://docs.google.com/presentation/d/1Hx93SZfuzjTXkn35M3uZlw8NUcFX8MMfccEvNb-wVxE/edit",
    "note": "One deck for all talks: a starting slide per team, Team 1 to Team 8. Your teacher opens it for editing when the time comes. Edit only your own slides (start from your Team slide, add more right after it), and do not edit after the hand-in.",
    "status": "listed"
  },
  {
    "id": "iso-9241-11",
    "group": "Standards and law",
    "title": "ISO 9241-11:2018, Usability: definitions and concepts",
    "url": "https://www.iso.org/standard/63500.html",
    "note": "Official page of the standard. The full text is paywalled. Ask your teacher about access.",
    "status": "listed"
  },
  {
    "id": "wcag22",
    "group": "Standards and law",
    "title": "Web Content Accessibility Guidelines (WCAG) 2.2",
    "url": "https://www.w3.org/TR/WCAG22/",
    "note": "The technical reference behind the checks.",
    "status": "listed"
  },
  {
    "id": "law-dl83",
    "group": "Standards and law",
    "title": "Decreto-Lei n.º 83/2018: accessibility of public-sector websites and apps",
    "url": "https://dre.pt/dre/detalhe/decreto-lei/83-2018-116734769",
    "note": "Public-sector bodies. Nobody here knows which of the two laws covers each website, so both are listed. Do not claim either without checking with your teacher.",
    "status": "to-verify"
  },
  {
    "id": "law-dl82",
    "group": "Standards and law",
    "title": "Decreto-Lei n.º 82/2022: accessibility of products and services",
    "url": "https://diariodarepublica.pt/dr/detalhe/decreto-lei/82-2022-204379872",
    "note": "Transposes the European Accessibility Act. See the note on the other law. Address not opened in the final link check. Open it before the lab.",
    "status": "to-verify"
  },
  {
    "id": "ixdf-articles",
    "group": "Articles",
    "title": "Interaction Design Foundation: Usability Testing (topic page)",
    "url": "https://ixdf.org/literature/topics/usability-testing",
    "note": "Overview and linked articles, including remote and unmoderated testing.",
    "status": "listed"
  },
  {
    "id": "nng-articles",
    "group": "Articles",
    "title": "NN/g: Unmoderated Usability Testing (how and why to do it)",
    "url": "https://www.nngroup.com/articles/unmoderated-usability-testing/",
    "note": "When to use it, its limits, and how to write tasks nobody has to explain.",
    "status": "listed"
  },
  {
    "id": "nng-study-guide",
    "group": "Articles",
    "title": "NN/g: Remote usability testing study guide",
    "url": "https://www.nngroup.com/articles/remote-usability-testing-study-guide/",
    "note": "Reading list that separates moderated from unmoderated testing.",
    "status": "listed"
  },
  {
    "id": "nng-success-rate",
    "group": "Articles",
    "title": "NN/g: Success rate, the simplest usability metric",
    "url": "https://www.nngroup.com/articles/success-rate-the-simplest-usability-metric/",
    "note": "Why success rate is the bottom line, and how partial success can be reported. Address not opened in the final link check. Open it before the lab.",
    "status": "to-verify"
  },
  {
    "id": "nng-usability-metrics",
    "group": "Articles",
    "title": "NN/g: Usability metrics",
    "url": "https://www.nngroup.com/articles/usability-metrics/",
    "note": "Success, time, errors and satisfaction as measures of usability.",
    "status": "listed"
  },
  {
    "id": "loop11-docs",
    "group": "Tools",
    "title": "Loop11: Setting up tasks (video and notes)",
    "url": "https://www.loop11.com/setting-up-tasks/",
    "note": "Start URL, task and question setup. Success URLs and recruiting: see the next items.",
    "status": "listed"
  },
  {
    "id": "loop11-recruit",
    "group": "Tools",
    "title": "Loop11: Recruiting participants and sharing the test link",
    "url": "https://www.loop11.com/?p=22568",
    "note": "Three ways to reach participants: a link, a pop-up invitation, or a panel. In practice you use the link and teammates as participants.",
    "status": "listed"
  },
  {
    "id": "loop11-unmoderated",
    "group": "Tools",
    "title": "Loop11: Unmoderated usability testing",
    "url": "https://loop11.com/features/unmoderated-usability-testing/",
    "note": "Feature overview from the vendor.",
    "status": "listed"
  },
  {
    "id": "loop11-questions",
    "group": "Tools",
    "title": "Loop11: Question types, including the ready-made SUS (video and transcript)",
    "url": "https://www.loop11.com/?p=22566",
    "note": "Multiple choice, rating scale, SUS, ranking, NPS and open questions.",
    "status": "listed"
  },
  {
    "id": "loop11-recording",
    "group": "Tools",
    "title": "Loop11: Recording and replay",
    "url": "https://www.loop11.com/?p=21192",
    "note": "Screen, video and audio recording, time-stamped notes, filters by task success.",
    "status": "listed"
  },
  {
    "id": "accessmonitor",
    "group": "Tools",
    "title": "AccessMonitor (AMA, the Portuguese public accessibility checker)",
    "url": "https://accessmonitor.acessibilidade.gov.pt/",
    "note": "Automatic check of a page against WCAG-based rules, scored 1 to 10. It checks one page address at a time.",
    "status": "listed"
  },
  {
    "id": "accessmonitor-ext",
    "group": "Tools",
    "title": "AccessMonitor Extension (Chrome Web Store)",
    "url": "https://chromewebstore.google.com/detail/accessmonitor-extension/knjdoonhhnjfmigigfgoehhihodndaii",
    "note": "Chrome and Edge version of AccessMonitor, from the Portuguese agency behind it. Found in the store listing and the agency's slides, not tried for this lab. Other free options if it fails: Accessibility Insights FastPass, WAVE from WebAIM, axe DevTools.",
    "status": "listed"
  },
  {
    "id": "a11y-insights-overview",
    "group": "Tools",
    "title": "Accessibility Insights for Web: overview",
    "url": "https://accessibilityinsights.io/docs/web/overview/",
    "note": "The Chrome extension chosen for the expert check: free, guided, covers WCAG 2.2 AA.",
    "status": "listed"
  },
  {
    "id": "a11y-insights-fastpass",
    "group": "Tools",
    "title": "Accessibility Insights for Web: FastPass",
    "url": "https://accessibilityinsights.io/docs/web/getstarted/fastpass/",
    "note": "Quick automated checks plus a tab-stops check.",
    "status": "listed"
  },
  {
    "id": "a11y-insights-assessment",
    "group": "Tools",
    "title": "Accessibility Insights for Web: Assessment",
    "url": "https://accessibilityinsights.io/docs/web/getstarted/assessment/",
    "note": "The guided manual and automated assessment.",
    "status": "listed"
  },
  {
    "id": "a11y-insights-quickassess",
    "group": "Tools",
    "title": "Accessibility Insights for Web: Quick Assess",
    "url": "https://accessibilityinsights.io/docs/web/getstarted/quickassess/",
    "note": "A shorter guided check than the full Assessment.",
    "status": "listed"
  },
  {
    "id": "a11y-insights-faq",
    "group": "Tools",
    "title": "Accessibility Insights for Web: FAQ",
    "url": "https://accessibilityinsights.io/docs/web/reference/faq/",
    "note": "What FastPass finds, what it cannot, and where results are stored.",
    "status": "listed"
  },
  {
    "id": "svc-stcp",
    "group": "Websites that may qualify (examples, for approval)",
    "title": "STCP, Porto public transport",
    "url": "https://www.stcp.pt/pt/viajar/",
    "note": "An example of a website that may qualify. Your teacher approves every choice.",
    "status": "listed"
  },
  {
    "id": "tpl-figma",
    "group": "Templates for the expert review",
    "title": "Heuristic evaluation template (Figma)",
    "url": "https://www.figma.com/community/file/1295378761228559977",
    "note": "Duplicate it and use it.",
    "status": "listed"
  },
  {
    "id": "tpl-miro",
    "group": "Templates for the expert review",
    "title": "Heuristic evaluation template (Miro)",
    "url": "https://miro.com/templates/heuristic-evaluation-1/",
    "note": "Duplicate it and use it.",
    "status": "listed"
  },
  {
    "id": "tpl-nng",
    "group": "Templates for the expert review",
    "title": "Heuristic evaluation workbook (NN/g, PDF)",
    "url": "https://media.nngroup.com/media/articles/attachments/Heuristic_Evaluation_Workbook_1_Fillable.pdf",
    "note": "A fillable workbook.",
    "status": "listed"
  },
  {
    "id": "ptlaw-acess",
    "group": "Standards and law",
    "title": "Acessibilidade.gov.pt: the Portuguese legal frame and good practice",
    "url": "https://www.acessibilidade.gov.pt/",
    "note": "The place for accessibility good practice for web content and mobile apps.",
    "status": "listed"
  },
  {
    "id": "wcag-checklist",
    "group": "Standards and law",
    "title": "WCAG 2.2 checklist",
    "url": "https://accessible.org/wcag/",
    "note": "A checklist for WCAG 2.2.",
    "status": "listed"
  },
  {
    "id": "svc-cp",
    "group": "Websites that may qualify (examples, for approval)",
    "title": "CP, Comboios de Portugal",
    "url": "https://www.cp.pt/",
    "note": "Train search, fares and discounts, changes and refunds. Guest purchase exists, so tasks can stop before payment. Address from general knowledge: open it and check it before you rely on it.",
    "status": "to-verify"
  },
  {
    "id": "svc-tap",
    "group": "Websites that may qualify (examples, for approval)",
    "title": "TAP Air Portugal",
    "url": "https://www.flytap.com/",
    "note": "Flight search and fares. Stop before payment. Address from general knowledge: open it and check it before you rely on it.",
    "status": "to-verify"
  },
  {
    "id": "svc-flixbus",
    "group": "Websites that may qualify (examples, for approval)",
    "title": "FlixBus Portugal",
    "url": "https://www.flixbus.pt/",
    "note": "Bus search and fares. Stop before payment. Address from general knowledge: open it and check it before you rely on it.",
    "status": "to-verify"
  },
  {
    "id": "svc-ikea",
    "group": "Websites that may qualify (examples, for approval)",
    "title": "IKEA Portugal",
    "url": "https://www.ikea.com/pt/pt/",
    "note": "Browsing, filters, comparison, planners, store and delivery information. Address from general knowledge: open it and check it before you rely on it.",
    "status": "to-verify"
  },
  {
    "id": "svc-worten",
    "group": "Websites that may qualify (examples, for approval)",
    "title": "Worten",
    "url": "https://www.worten.pt/",
    "note": "Electronics shop: search, filters, comparison, basket. Address from general knowledge: open it and check it before you rely on it.",
    "status": "to-verify"
  },
  {
    "id": "svc-decathlon",
    "group": "Websites that may qualify (examples, for approval)",
    "title": "Decathlon Portugal",
    "url": "https://www.decathlon.pt/",
    "note": "Sports shop: search, filters, sizes, stores. Address from general knowledge: open it and check it before you rely on it.",
    "status": "to-verify"
  },
  {
    "id": "svc-fnac",
    "group": "Websites that may qualify (examples, for approval)",
    "title": "FNAC Portugal",
    "url": "https://www.fnac.pt/",
    "note": "Books, music and electronics: search, filters, basket. Address from general knowledge: open it and check it before you rely on it.",
    "status": "to-verify"
  },
  {
    "id": "svc-continente",
    "group": "Websites that may qualify (examples, for approval)",
    "title": "Continente online",
    "url": "https://www.continente.pt/",
    "note": "Grocery shop: search, basket, delivery options. Check what works without an account. Address from general knowledge: open it and check it before you rely on it.",
    "status": "to-verify"
  },
  {
    "id": "svc-pingodoce",
    "group": "Websites that may qualify (examples, for approval)",
    "title": "Pingo Doce online",
    "url": "https://www.pingodoce.pt/",
    "note": "Grocery and recipes. Check what works without an account. Address from general knowledge: open it and check it before you rely on it.",
    "status": "to-verify"
  },
  {
    "id": "svc-glovo",
    "group": "Websites that may qualify (examples, for approval)",
    "title": "Glovo",
    "url": "https://glovoapp.com/pt/pt/",
    "note": "Food and goods delivery. Check what works without an account. Address from general knowledge: open it and check it before you rely on it.",
    "status": "to-verify"
  },
  {
    "id": "svc-casamusica",
    "group": "Websites that may qualify (examples, for approval)",
    "title": "Casa da Música",
    "url": "https://www.casadamusica.com/",
    "note": "Events, programme, tickets and visiting information. Address from general knowledge: open it and check it before you rely on it.",
    "status": "to-verify"
  },
  {
    "id": "svc-serralves",
    "group": "Websites that may qualify (examples, for approval)",
    "title": "Serralves",
    "url": "https://www.serralves.pt/",
    "note": "Exhibitions, events, tickets and visiting information. Address from general knowledge: open it and check it before you rely on it.",
    "status": "to-verify"
  },
  {
    "id": "svc-nos",
    "group": "Websites that may qualify (examples, for approval)",
    "title": "NOS Cinemas",
    "url": "https://cinemas.nos.pt/",
    "note": "Showtimes, cinemas and seat choice. Stop before payment. Address from general knowledge: open it and check it before you rely on it.",
    "status": "to-verify"
  },
  {
    "id": "svc-booking",
    "group": "Websites that may qualify (examples, for approval)",
    "title": "Booking.com",
    "url": "https://www.booking.com/",
    "note": "Accommodation search, filters and comparison. Pushes logins, so keep tasks on searching and comparing. Address from general knowledge: open it and check it before you rely on it.",
    "status": "to-verify"
  },
  {
    "id": "svc-airbnb",
    "group": "Websites that may qualify (examples, for approval)",
    "title": "Airbnb",
    "url": "https://www.airbnb.pt/",
    "note": "Accommodation search, filters and comparison. Pushes logins, so keep tasks on searching and comparing. Address from general knowledge: open it and check it before you rely on it.",
    "status": "to-verify"
  },
  {
    "id": "nng-personas",
    "group": "Articles",
    "title": "NN/g: Personas make users memorable for product team members",
    "url": "https://www.nngroup.com/articles/persona/",
    "note": "What a persona is and how to write one from your research.",
    "status": "listed"
  },
  {
    "id": "nng-5-users",
    "group": "Articles",
    "title": "NN/g: Why you only need to test with 5 users",
    "url": "https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/",
    "note": "Why small tests find most problems, and when you need more. Read it when you choose your sample size.",
    "status": "listed"
  },
  {
    "id": "nng-heuristics",
    "group": "Articles",
    "title": "NN/g: 10 usability heuristics for user interface design",
    "url": "https://www.nngroup.com/articles/ten-usability-heuristics/",
    "note": "A short list of rules of thumb for your expert review. Use it to name what a problem breaks.",
    "status": "listed"
  },
  {
    "id": "webaim-contrast",
    "group": "Tools",
    "title": "WebAIM: Contrast checker",
    "url": "https://webaim.org/resources/contrastchecker/",
    "note": "Check the contrast between text and background by hand, when a tool flags it.",
    "status": "listed"
  },
  {
    "id": "wcag-quickref",
    "group": "Standards and law",
    "title": "How to Meet WCAG 2.2 (quick reference)",
    "url": "https://www.w3.org/WAI/WCAG22/quickref/",
    "note": "A filterable list of every WCAG criterion with techniques. Handy to find which criterion a problem breaks.",
    "status": "to-verify"
  }
];
