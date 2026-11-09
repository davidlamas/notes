/* Stretches, labs and stations. Edit by hand.
   A block is one session of 135 minutes (three academic hours). Stations in one block run in parallel.
   stream: "A" (the study), "B" (the accessibility evaluation) or "AB" (the whole group).
   Steps 1 to 6 are Moodle Labs #3 to #8. Presentation sessions 1 and 2 are Moodle Labs #9 and #10. Moodle is correct (David, 9 Nov). No dates are shown on purpose. */
window.TUT = window.TUT || {};
TUT.sprints = [
  {
    "id": "p1",
    "number": 1,
    "eyebrow": "Steps 1 to 6",
    "title": "Six working steps",
    "subtitle": "Choose and map, understand and plan, run and check accessibility, compile and rank, fix and report. Moodle calls them Labs #3 to #8. The last two are in January.",
    "minutes": 810,
    "when": "6 steps",
    "blocks": [
      {
        "id": "p1-b1",
        "title": "Step 1",
        "minutes": 135,
        "stations": [
          "step1"
        ]
      },
      {
        "id": "p1-b2",
        "title": "Step 2",
        "minutes": 135,
        "stations": [
          "step2"
        ]
      },
      {
        "id": "p1-b3",
        "title": "Step 3",
        "minutes": 135,
        "stations": [
          "step3"
        ]
      },
      {
        "id": "p1-b4",
        "title": "Step 4",
        "minutes": 135,
        "stations": [
          "step4a",
          "step4b"
        ]
      },
      {
        "id": "p1-b5",
        "title": "Step 5",
        "minutes": 135,
        "stations": [
          "step5"
        ]
      },
      {
        "id": "p1-b6",
        "title": "Step 6",
        "minutes": 135,
        "stations": [
          "step6"
        ]
      }
    ]
  },
  {
    "id": "p2",
    "number": 2,
    "eyebrow": "Presentation sessions",
    "title": "Presentation sessions 1 and 2",
    "subtitle": "Hand in the report and the presentation the day before. Moodle calls these Labs #9 and #10, also in January.",
    "minutes": 270,
    "when": "2 sessions",
    "blocks": [
      {
        "id": "p2-b1",
        "title": "Presentation session 1",
        "minutes": 135,
        "stations": [
          "pres1"
        ]
      },
      {
        "id": "p2-b2",
        "title": "Presentation session 2",
        "minutes": 135,
        "stations": [
          "pres2"
        ]
      }
    ]
  }
];

TUT.stations = {
  "step1": {
    "title": "Approve the website, map it, build personas",
    "stream": "AB",
    "minutes": 135,
    "status": "draft",
    "aim": "Settle the website with the lecturer, test that it loads in Loop11, describe it with a mind-map and build the personas.",
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
      "loop11-docs"
    ]
  },
  "step2": {
    "title": "Stories, first review, goals, participants",
    "stream": "AB",
    "minutes": 135,
    "status": "draft",
    "aim": "Write user stories, do a first expert review, set goals and research questions, and decide who will take part.",
    "resources": [
      "ixdf-articles",
      "nng-articles",
      "tpl-figma",
      "tpl-miro",
      "tpl-nng",
      "iso-9241-11"
    ]
  },
  "step3": {
    "title": "Prepare tasks and build the test",
    "stream": "AB",
    "minutes": 135,
    "status": "draft",
    "aim": "Prepare tasks, questions and questionnaires, choose the instruments and build the test.",
    "resources": [
      "loop11-docs",
      "loop11-unmoderated",
      "loop11-questions",
      "nng-study-guide",
      "iso-9241-11"
    ]
  },
  "step4a": {
    "title": "Pilot, recruit, launch and follow the study",
    "stream": "A",
    "minutes": 135,
    "status": "draft",
    "aim": "Run a pilot, refine the plan, recruit, launch the study and follow it.",
    "resources": [
      "loop11-docs",
      "loop11-recruit",
      "loop11-recording",
      "nng-study-guide"
    ]
  },
  "step4b": {
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
  "step5": {
    "title": "Compile, describe, rank and choose",
    "stream": "AB",
    "minutes": 135,
    "status": "draft",
    "aim": "Bring the review, the study and the accessibility results together, rank the problems, choose two or three and study their causes.",
    "resources": [
      "nng-usability-metrics",
      "nng-success-rate",
      "iso-9241-11",
      "wcag22"
    ]
  },
  "step6": {
    "title": "Fixes, report and presentation",
    "stream": "AB",
    "minutes": 135,
    "status": "draft",
    "aim": "Propose fixes with low-fidelity sketches, write the report in the session and prepare the talk.",
    "resources": [
      "nng-articles",
      "ixdf-articles"
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
