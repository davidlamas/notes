/* Stretches, labs and stations. Edit by hand.
   A block is one session of 135 minutes (three academic hours). Stations in one block run in parallel.
   stream: "A" (the study), "B" (the accessibility evaluation) or "AB" (the whole group).
   Lab numbers follow Moodle (#3 to #6). No dates are shown on purpose. */
window.TUT = window.TUT || {};
TUT.sprints = [
  {
    "id": "p1",
    "number": 1,
    "eyebrow": "Working labs",
    "title": "Four labs of project work",
    "subtitle": "Map and plan, build and run, compile and choose. Independent work fills the time between labs.",
    "minutes": 540,
    "when": "4 labs",
    "blocks": [
      {
        "id": "p1-b1",
        "title": "Lab #3",
        "minutes": 135,
        "stations": [
          "lab3"
        ]
      },
      {
        "id": "p1-b2",
        "title": "Lab #4",
        "minutes": 135,
        "stations": [
          "lab4"
        ]
      },
      {
        "id": "p1-b3",
        "title": "Lab #5",
        "minutes": 135,
        "stations": [
          "lab5a",
          "lab5b"
        ]
      },
      {
        "id": "p1-b4",
        "title": "Lab #6",
        "minutes": 135,
        "stations": [
          "lab6"
        ]
      }
    ]
  },
  {
    "id": "p2",
    "number": 2,
    "eyebrow": "Presentations",
    "title": "Two presentation sessions",
    "subtitle": "Hand in the report and the presentation the day before. Then present.",
    "minutes": 270,
    "when": "2 sessions",
    "blocks": [
      {
        "id": "p2-b1",
        "title": "Session 1",
        "minutes": 135,
        "stations": [
          "pres1"
        ]
      },
      {
        "id": "p2-b2",
        "title": "Session 2",
        "minutes": 135,
        "stations": [
          "pres2"
        ]
      }
    ]
  }
];

TUT.stations = {
  "lab3": {
    "title": "Map the website, personas and stories",
    "stream": "AB",
    "minutes": 135,
    "status": "draft",
    "aim": "Describe the approved website with a mind-map, build personas and write the main user stories.",
    "resources": [
      "svc-stcp",
      "svc-cp",
      "svc-tap",
      "svc-flixbus",
      "svc-ikea",
      "svc-worten",
      "svc-decathlon",
      "svc-fnac",
      "svc-continente",
      "svc-pingodoce",
      "svc-glovo",
      "svc-casamusica",
      "svc-serralves",
      "svc-nos",
      "svc-booking",
      "svc-airbnb",
      "ixdf-articles",
      "nng-articles"
    ]
  },
  "lab4": {
    "title": "Review, goals and the study plan",
    "stream": "AB",
    "minutes": 135,
    "status": "draft",
    "aim": "Do a first expert review, set goals and research questions, and plan the study: participants, tasks and questions.",
    "resources": [
      "tpl-figma",
      "tpl-miro",
      "tpl-nng",
      "nng-study-guide",
      "loop11-questions",
      "iso-9241-11"
    ]
  },
  "lab5a": {
    "title": "Build, pilot and launch the study",
    "stream": "A",
    "minutes": 135,
    "status": "draft",
    "aim": "Build the test, run a pilot, refine, recruit and launch.",
    "resources": [
      "loop11-docs",
      "loop11-recruit",
      "loop11-recording",
      "loop11-unmoderated"
    ]
  },
  "lab5b": {
    "title": "Evaluate accessibility",
    "stream": "B",
    "minutes": 135,
    "status": "draft",
    "aim": "At the same time, evaluate accessibility with heuristics, standards checks, operating-system features and other instruments.",
    "resources": [
      "wcag22",
      "wcag-checklist",
      "accessmonitor",
      "accessmonitor-ext",
      "a11y-insights-overview",
      "a11y-insights-fastpass",
      "ptlaw-acess",
      "law-dl83",
      "law-dl82"
    ]
  },
  "lab6": {
    "title": "Compile, rank and choose",
    "stream": "AB",
    "minutes": 135,
    "status": "draft",
    "aim": "Bring the review, the study and the accessibility results together, rank the problems and choose two or three to fix.",
    "resources": [
      "nng-usability-metrics",
      "nng-success-rate",
      "iso-9241-11",
      "wcag22"
    ]
  },
  "pres1": {
    "title": "Presentation session 1",
    "stream": "AB",
    "minutes": 135,
    "status": "draft",
    "aim": "Four groups present: 20 minutes each, then 10 minutes of discussion.",
    "resources": []
  },
  "pres2": {
    "title": "Presentation session 2",
    "stream": "AB",
    "minutes": 135,
    "status": "draft",
    "aim": "Four groups present: 20 minutes each, then 10 minutes of discussion.",
    "resources": []
  }
};
