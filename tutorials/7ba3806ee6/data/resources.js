/* Outside resources. Edit by hand.
   status: "listed" means David named it or it was found on the official site.
           "to-verify" means the address or the exact page still has to be checked.
           "pending" means the item has no address yet.
   Only ISO, IxDF, NN/g, Loop11, AccessMonitor, the plugin documentation and the Metro do Porto site belong here. */
window.TUT = window.TUT || {};
TUT.resources = [
  {
    "id": "deck-talks",
    "group": "Shared talk deck",
    "title": "Shared slide deck for the talks",
    "url": "https://docs.google.com/presentation/d/1icr2c8OgjRTND1p1kuXgeUesFMaQgVp4hXUCmEhk2ak/edit",
    "note": "One starting slide per team, Team 1 to Team 8. Your teacher opens it for editing when the time comes. Edit only your own slides (start from your Team slide; you may add up to 2 more right after it).",
    "status": "listed"
  },
  {
    "id": "iso-9241-11",
    "group": "Standards and law",
    "title": "ISO 9241-11:2018, Usability: definitions and concepts",
    "url": "https://www.iso.org/standard/63500.html",
    "note": "Official page of the standard. The full text is paywalled, so this page paraphrases it. The ISO page has a free \"Read sample\" button. Ask your teacher about access to the full text through the course.",
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
    "note": "Public-sector bodies. Nobody here knows which of the two laws covers Metro do Porto, so both are listed. Do not claim either.",
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
    "note": "Three ways to reach participants: a link, a pop-up invitation, or a panel. In class you use the link and teammates as participants.",
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
    "id": "metro-planner",
    "group": "The Metro do Porto website",
    "title": "Percursos: the trip planner",
    "url": "https://www.metrodoporto.pt/pages/285",
    "note": "From, to, departure or arrival, date and time.",
    "status": "listed"
  },
  {
    "id": "metro-schedules",
    "group": "The Metro do Porto website",
    "title": "Mapas e horários: schedules, frequencies, maps",
    "url": "https://www.metrodoporto.pt/pages/337",
    "note": "The timetables here are PDF files.",
    "status": "listed"
  },
  {
    "id": "metro-en",
    "group": "The Metro do Porto website",
    "title": "English version of the site",
    "url": "https://en.metrodoporto.pt/",
    "note": "For a task aimed at visitors.",
    "status": "listed"
  }
];
