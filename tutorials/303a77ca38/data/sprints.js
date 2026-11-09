/* Stretches, labs and stations. Edit by hand.
   A block is one lab. Stations in one block run in parallel and share its minutes.
   stream: "A" (the study), "B" (the accessibility evaluation) or "AB" (the whole group).
   status: "outline" or "draft". Dates and lab numbers come from Moodle. Lab length (135 min) is an assumption. */
window.TUT = window.TUT || {};
TUT.sprints = [
  {
    "id": "p1",
    "number": 1,
    "eyebrow": "Week of 16 to 20 November",
    "title": "Start the project",
    "subtitle": "Choose a website and describe it. Moodle lists this as Lab #3, after the two Loop11 labs.",
    "minutes": 135,
    "when": "16 to 20 Nov",
    "blocks": [
      {
        "id": "p1-b1",
        "title": "Lab #3: start",
        "minutes": 135,
        "stations": [
          "lab3"
        ]
      }
    ]
  },
  {
    "id": "p2",
    "number": 2,
    "eyebrow": "Week of 14 to 18 December",
    "title": "Plan and run the study",
    "subtitle": "Understand the people, plan the study, run it, and check accessibility at the same time.",
    "minutes": 405,
    "when": "14 to 18 Dec",
    "blocks": [
      {
        "id": "p2-b1",
        "title": "Lab #4: people, stories, first review",
        "minutes": 135,
        "stations": [
          "lab4"
        ]
      },
      {
        "id": "p2-b2",
        "title": "Lab #5: plan the study",
        "minutes": 135,
        "stations": [
          "lab5"
        ]
      },
      {
        "id": "p2-b3",
        "title": "Lab #6: run the study and check accessibility",
        "minutes": 135,
        "stations": [
          "lab6a",
          "lab6b"
        ]
      }
    ]
  },
  {
    "id": "p3",
    "number": 3,
    "eyebrow": "Week of 4 to 8 January",
    "title": "Make sense, report, present",
    "subtitle": "Compile and rank the problems, propose fixes, report and present.",
    "minutes": 540,
    "when": "4 to 8 Jan",
    "blocks": [
      {
        "id": "p3-b1",
        "title": "Lab #7: compile and rank",
        "minutes": 135,
        "stations": [
          "lab7"
        ]
      },
      {
        "id": "p3-b2",
        "title": "Lab #8: fixes, report, talk",
        "minutes": 135,
        "stations": [
          "lab8"
        ]
      },
      {
        "id": "p3-b3",
        "title": "Lab #9: presentations",
        "minutes": 135,
        "stations": [
          "lab9"
        ]
      },
      {
        "id": "p3-b4",
        "title": "Lab #10: presentations",
        "minutes": 135,
        "stations": [
          "lab10"
        ]
      }
    ]
  }
];

TUT.stations = {
  "lab3": {
    "title": "Choose the website and map it",
    "stream": "AB",
    "minutes": 135,
    "status": "draft",
    "aim": "Form the group, choose the website to evaluate, and describe it with a mind-map: what is it about, which services does it offer, who is it for.",
    "resources": [
      "moodle-course",
      "svc-siga",
      "svc-sns24",
      "svc-stcp"
    ]
  },
  "lab4": {
    "title": "People, stories and a first expert review",
    "stream": "AB",
    "minutes": 135,
    "status": "draft",
    "aim": "Build personas, write the main user stories, do a first expert review, and turn what you find into goals and research questions.",
    "resources": [
      "ixdf-articles",
      "nng-articles",
      "tpl-figma",
      "tpl-miro",
      "tpl-nng",
      "iso-9241-11"
    ]
  },
  "lab5": {
    "title": "Plan the study",
    "stream": "AB",
    "minutes": 135,
    "status": "draft",
    "aim": "Decide who takes part and how many, prepare tasks, questions and questionnaires, choose the instruments and set them up.",
    "resources": [
      "loop11-docs",
      "loop11-unmoderated",
      "loop11-questions",
      "nng-study-guide",
      "iso-9241-11"
    ]
  },
  "lab6a": {
    "title": "Pilot, recruit and run the study",
    "stream": "A",
    "minutes": 135,
    "status": "draft",
    "aim": "Run a pilot, refine the plan, recruit participants, start the study and follow it as results come in.",
    "resources": [
      "loop11-docs",
      "loop11-recruit",
      "loop11-recording",
      "nng-study-guide"
    ]
  },
  "lab6b": {
    "title": "Evaluate accessibility",
    "stream": "B",
    "minutes": 135,
    "status": "draft",
    "aim": "At the same time as the study, evaluate accessibility with heuristics, standards checks, operating-system features and other instruments.",
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
  "lab7": {
    "title": "Compile, describe and rank the problems",
    "stream": "AB",
    "minutes": 135,
    "status": "draft",
    "aim": "Bring the review, the study and the accessibility results together. Describe the problems and chances, rank them, and choose the two or three that matter most.",
    "resources": [
      "nng-usability-metrics",
      "nng-success-rate",
      "iso-9241-11",
      "wcag22"
    ]
  },
  "lab8": {
    "title": "Propose fixes, write the report, build the talk",
    "stream": "AB",
    "minutes": 135,
    "status": "draft",
    "aim": "Study the two or three chosen problems in depth, propose fixes with low-fidelity sketches, write the report and prepare the presentation.",
    "resources": [
      "nng-articles",
      "ixdf-articles"
    ]
  },
  "lab9": {
    "title": "Present: first lab",
    "stream": "AB",
    "minutes": 135,
    "status": "draft",
    "aim": "Present your work and results, and learn from the other groups.",
    "resources": []
  },
  "lab10": {
    "title": "Present: second lab",
    "stream": "AB",
    "minutes": 135,
    "status": "draft",
    "aim": "Present your work and results, and learn from the other groups.",
    "resources": []
  }
};
