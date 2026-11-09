/* Sprints, blocks and stations. Edit by hand.
   A block is a stretch of time. Stations in one block run in parallel and share its minutes.
   stream: "A" (the study), "B" (the expert check) or "AB" (together).
   status: "outline" (title and aim only) or "draft" (content written). */
window.TUT = window.TUT || {};
TUT.sprints = [
  {
    "id": "s1",
    "number": 1,
    "title": "Set the Route",
    "subtitle": "Plan, build and launch your test, take another team's test, and plan how to read the results.",
    "minutes": 135,
    "blocks": [
      {
        "id": "s1-b1",
        "title": "Open the brief",
        "minutes": 8,
        "stations": [
          "s1-brief"
        ]
      },
      {
        "id": "s1-b2",
        "title": "Aim and first look",
        "minutes": 22,
        "stations": [
          "s1-goals",
          "s1-scan"
        ]
      },
      {
        "id": "s1-b3",
        "title": "Build and dig in",
        "minutes": 40,
        "stations": [
          "s1-build",
          "s1-plugin"
        ]
      },
      {
        "id": "s1-b4",
        "title": "Checkpoint",
        "minutes": 10,
        "stations": [
          "s1-check"
        ]
      },
      {
        "id": "s1-b5",
        "title": "Swap and run",
        "minutes": 40,
        "stations": [
          "s1-run"
        ]
      },
      {
        "id": "s1-b6",
        "title": "Plan the read while results come in",
        "minutes": 10,
        "stations": [
          "s1-plan"
        ]
      },
      {
        "id": "s1-b7",
        "title": "Catch up and save",
        "minutes": 5,
        "stations": [
          "s1-buffer"
        ]
      }
    ]
  },
  {
    "id": "s2",
    "number": 2,
    "title": "Read the Signals",
    "subtitle": "Make sense of the evidence, rank the problems and present.",
    "minutes": 135,
    "blocks": [
      {
        "id": "s2-b1",
        "title": "Read the evidence",
        "minutes": 40,
        "stations": [
          "s2-results",
          "s2-audit"
        ]
      },
      {
        "id": "s2-b2",
        "title": "Merge and rank",
        "minutes": 25,
        "stations": [
          "s2-rank"
        ]
      },
      {
        "id": "s2-b3",
        "title": "Build the talk",
        "minutes": 25,
        "stations": [
          "s2-talk"
        ]
      },
      {
        "id": "s2-b4",
        "title": "Present",
        "minutes": 45,
        "stations": [
          "s2-present"
        ]
      }
    ]
  }
];

TUT.stations = {
  "s1-brief": {
    "title": "Read the brief and choose your split",
    "stream": "AB",
    "minutes": 8,
    "status": "draft",
    "aim": "Understand the scenario, the two mandatory tasks and the peer-test rotation. Agree how your team splits in two.",
    "resources": [
      "metro-planner",
      "metro-schedules"
    ]
  },
  "s1-goals": {
    "title": "Write goals, tasks and success rules",
    "stream": "A",
    "minutes": 22,
    "status": "draft",
    "aim": "Turn the call-centre worry into usability goals with a criterion, and into tasks written as user goals. Decide how success is judged before any data exists.",
    "resources": [
      "iso-9241-11",
      "ixdf-articles",
      "nng-articles"
    ]
  },
  "s1-scan": {
    "title": "First look with AccessMonitor",
    "stream": "B",
    "minutes": 22,
    "status": "draft",
    "aim": "Run the automatic check on the planner page and the schedules page. Note what it finds and what it cannot see.",
    "resources": [
      "accessmonitor",
      "wcag22",
      "metro-planner",
      "metro-schedules"
    ]
  },
  "s1-build": {
    "title": "Build the test in Loop11",
    "stream": "A",
    "minutes": 40,
    "status": "draft",
    "aim": "Set up tasks, success checks, questions and the SUS, with screen recording. Solve the PDF task, where success cannot be judged by a web address.",
    "resources": [
      "loop11-docs"
    ]
  },
  "s1-plugin": {
    "title": "Go deeper with the Chrome plugin",
    "stream": "B",
    "minutes": 40,
    "status": "draft",
    "aim": "Use the plugin on the planner and on the PDF-linked pages. Add manual checks: keyboard, zoom, and a look at the PDFs.",
    "resources": [
      "a11y-insights-overview",
      "a11y-insights-assessment",
      "wcag22",
      "metro-schedules"
    ]
  },
  "s1-check": {
    "title": "Checkpoint: swap findings, check before launch",
    "stream": "AB",
    "minutes": 10,
    "status": "draft",
    "aim": "Sub-team B tells sub-team A about accessibility barriers that could break the test. Both check the test before it goes out.",
    "resources": []
  },
  "s1-run": {
    "title": "Take another team's test, watch yours arrive",
    "stream": "AB",
    "minutes": 40,
    "status": "draft",
    "aim": "Act as participants for the next team. Watch your own results come in and note what goes wrong.",
    "resources": [
      "loop11-docs"
    ]
  },
  "s1-buffer": {
    "title": "Catch up and save",
    "stream": "AB",
    "minutes": 5,
    "status": "draft",
    "aim": "Time for whatever ran late.",
    "resources": []
  },
  "s2-results": {
    "title": "Read the Loop11 results",
    "stream": "A",
    "minutes": 40,
    "status": "draft",
    "aim": "Look at success, time, paths, recordings and SUS. Read a small sample with care.",
    "resources": [
      "loop11-docs",
      "ixdf-articles"
    ]
  },
  "s2-audit": {
    "title": "Write up the accessibility findings",
    "stream": "B",
    "minutes": 40,
    "status": "draft",
    "aim": "Combine AccessMonitor, plugin and manual findings. Say which criterion each problem breaks and who it hurts.",
    "resources": [
      "accessmonitor",
      "a11y-insights-overview",
      "a11y-insights-assessment",
      "wcag22",
      "law-dl83",
      "law-dl82"
    ]
  },
  "s2-rank": {
    "title": "Merge, rank and sketch fixes",
    "stream": "AB",
    "minutes": 25,
    "status": "draft",
    "aim": "Put both sets of problems in one list. Rank them. Pick two or three and sketch a fix for each.",
    "resources": [
      "nng-articles"
    ]
  },
  "s2-talk": {
    "title": "Build your five-minute talk",
    "stream": "AB",
    "minutes": 25,
    "status": "draft",
    "aim": "Tell the digital team what to fix first, with evidence. Use any support you can present in five minutes.",
    "resources": [
      "deck-talks"
    ]
  },
  "s2-present": {
    "title": "Present to the digital team",
    "stream": "AB",
    "minutes": 45,
    "status": "draft",
    "aim": "Eight talks of five minutes, with changeovers.",
    "resources": [
      "deck-talks"
    ]
  },
  "s1-plan": {
    "title": "Plan how to read the evidence",
    "stream": "AB",
    "minutes": 10,
    "status": "draft",
    "aim": "Agree what counts as a problem and how you will rate it, before you open the results. The sessions are still arriving, which is the point.",
    "resources": [
      "nng-articles"
    ]
  }
};
