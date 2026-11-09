/* Outside resources. Edit by hand.
   status: "listed" means David named it or it was found on the official site.
           "to-verify" means the address or the exact page still has to be checked.
           "pending" means the item has no address yet.
   Only ISO, IxDF, NN/g, Loop11, AccessMonitor, the plugin documentation and the Metro do Porto site belong here. */
window.TUT = window.TUT || {};
TUT.resources = [
  {
    "id": "iso-9241-11",
    "group": "Standards and law",
    "title": "ISO 9241-11:2018, Usability: definitions and concepts",
    "url": "https://www.iso.org/standard/63500.html",
    "note": "Official page of the standard. It is paywalled, so this page paraphrases it. The core idea: usability is effectiveness, efficiency and satisfaction for specified users, goals and context of use.",
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
    "note": "Public-sector bodies. Whether Metro do Porto falls under this or under the next item is still to be confirmed; the page does not claim either.",
    "status": "listed"
  },
  {
    "id": "law-dl82",
    "group": "Standards and law",
    "title": "Decreto-Lei n.º 82/2022: accessibility of products and services",
    "url": "https://diariodarepublica.pt/dr/detalhe/decreto-lei/82-2022-204379872",
    "note": "Transposes the European Accessibility Act.",
    "status": "listed"
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
    "note": "Why success rate is the bottom line, and how partial success can be reported.",
    "status": "listed"
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
    "title": "Loop11: Recruiting participants",
    "url": "https://www.loop11.com/?p=22564",
    "note": "Sources of participants and screeners. In class, teammates are the participants.",
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
    "id": "accessmonitor",
    "group": "Tools",
    "title": "AccessMonitor (AMA, the Portuguese public accessibility checker)",
    "url": "https://accessmonitor.acessibilidade.gov.pt/",
    "note": "Automatic check of a page against WCAG-based rules, scored 1 to 10. It checks a URL, so it covers one page at a time. A Chrome extension from AMA also exists; not verified for this lab.",
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
