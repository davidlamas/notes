/* Station content for the project. Edit by hand. Optional field "after" lists the independent work before the next session. */
window.TUT = window.TUT || {};
TUT.content = window.TUT.content || {};
Object.assign(TUT.content, {
  "step1": {
    "intro": "You start the project. By the end you have an approved website that you tested early, a map of what it offers and for whom, and your personas.",
    "parts": [
      {
        "title": "Read the project and the plan",
        "min": 10,
        "text": "Read the project view together. Agree who does what and how you will work between sessions. Register your group with your teacher."
      },
      {
        "title": "Settle the website with the teacher",
        "min": 30,
        "text": "Your website must be approved by the teacher, and no two groups use the same one. Check it against the rules on the project view: no login for the main tasks, enough complexity, real and safe, usable in Loop11. Try loading it in Loop11 now, so you find problems early. Have a second choice ready.",
        "help": [
          "svc-cp",
          "svc-ikea",
          "svc-stcp"
        ]
      },
      {
        "title": "Draw the mind-map",
        "min": 45,
        "text": "Put the website in the middle and branch out: what is it about, which services does it offer, who is the target audience? Explore the real site while you draw. Add what surprises you."
      },
      {
        "title": "Compare with another group",
        "min": 10,
        "text": "Show your map to another group for two minutes each. Ask what they would not have guessed from the map. Add it."
      },
      {
        "title": "Build the personas",
        "min": 40,
        "text": "A persona is a made-up person built from what you know about the real audience. Write two or three. Each has a goal on this website, a situation, how comfortable they are with technology, and anything that makes the site harder for them. Use your mind-map and a look at the real site. Do not use names of people you know.",
        "help": [
          "ixdf-articles"
        ]
      }
    ],
    "checks": {
      "title": "Before you move on",
      "items": [
        "The website is approved by the teacher, and not used by another group.",
        "You loaded the website in Loop11 once.",
        "The mind-map shows the purpose, the services and the audience.",
        "Two or three personas, each with a goal and a situation."
      ]
    },
    "good": {
      "title": "Good signs",
      "items": [
        "The map has services as branches, not only page names.",
        "The audience part says who really uses the site, not 'everyone'.",
        "The group saw the site on a phone as well as a laptop."
      ]
    },
    "watch": [
      "Choosing a site only because it looks easy. A site with a login wall is hard to test remotely.",
      "A mind-map copied from the site menu. It should show what people do there.",
      "Leaving the website choice until the end of the session."
    ],
    "output": [
      "An approved website.",
      "A mind-map.",
      "Personas."
    ],
    "teacher": [
      "Approve each website. The eligibility rules are on the project view"
    ]
  },
  "step2": {
    "intro": "You write the main stories, look at the website with them in hand, set the goals and questions of the study, and decide who will take part.",
    "parts": [
      {
        "title": "Write the main user stories",
        "min": 25,
        "text": "For each persona write the one or two main stories the site allows, in the form: as a [person] I want to [goal] so that [reason]. Keep to the main things people come to do."
      },
      {
        "title": "Do a first expert review",
        "min": 45,
        "text": "Walk through each story on the real site. Note what looks confusing, slow, hidden or broken. Use the Nielsen heuristics. Templates are in the Resources view: a Figma file, a Miro board and an NN/g workbook. Duplicate one and use it. Do not try to be complete. You are looking for the areas that deserve more attention.",
        "help": [
          "tpl-figma",
          "tpl-miro",
          "tpl-nng",
          "nng-articles"
        ]
      },
      {
        "title": "Set the goals and the questions",
        "min": 40,
        "text": "Look at what the review found. Write two or three usability goals. A goal says who, what they want, in what situation, how you will measure, and what is good enough. Then write the research questions that the test must answer.",
        "widget": "goal"
      },
      {
        "title": "Decide the participants and the size",
        "min": 25,
        "text": "Who should take part and how many? Think about the audience from your personas. With a small group the numbers are a signal, not a statistic. Say how you will recruit, and say how you will cope if some sessions fail. Decide what you will ask about each participant, and ask nothing that identifies them.",
        "help": [
          "nng-study-guide",
          "loop11-recruit"
        ]
      }
    ],
    "checks": {
      "title": "Before you move on",
      "items": [
        "The main user stories are written down.",
        "A short list of areas that deserve attention, from the expert review.",
        "Two or three usability goals, each with a measure and a good-enough rule.",
        "The research questions written out.",
        "Participants and size decided, with how you will recruit."
      ]
    },
    "good": {
      "title": "Good signs",
      "items": [
        "Personas differ in what they need, not only in age or job.",
        "Each story can be turned into a task a stranger can do.",
        "A goal has a rule you chose before any data exists."
      ]
    },
    "watch": [
      "Personas that describe the students in the group.",
      "Stories that name buttons instead of goals.",
      "A review that lists style opinions. Tie each note to a story."
    ],
    "output": [
      "User stories.",
      "Review notes, goals and research questions.",
      "A participant plan."
    ],
    "teacher": [
      "Check that each group's participant plan is realistic for its website."
    ]
  },
  "step3": {
    "intro": "You prepare the tasks and questions, choose the instruments and build the test. By the end it is ready to be piloted.",
    "parts": [
      {
        "title": "Prepare tasks, questions and questionnaires",
        "min": 45,
        "text": "Write the tasks from the user stories. A task is a goal in a situation, not a list of clicks. Decide how success is judged before the test: by the address a participant reaches or by an answer to a question after the task. Write the questions after each task, the questions at the start about the participants, and a satisfaction questionnaire. Warn participants that questions follow each task.",
        "widget": "profile",
        "help": [
          "loop11-questions",
          "loop11-unmoderated"
        ]
      },
      {
        "title": "Choose the instruments",
        "min": 15,
        "text": "Loop11 is the main tool for the remote test. Decide what else you need to collect data: a questionnaire, notes, a recording of the screen. Write down why you chose each one and what it cannot see.",
        "help": [
          "loop11-docs"
        ]
      },
      {
        "title": "Build the test in Loop11",
        "min": 50,
        "text": "Build the test in Loop11: tasks, success rules, questions, the opening and thank-you text. Try to run through it yourself once. Fix what is unclear. Do not launch it yet: the pilot comes first in the next lab.",
        "help": [
          "loop11-docs",
          "loop11-recording"
        ]
      },
      {
        "title": "Try it yourselves",
        "min": 25,
        "text": "Run through the whole test as if you were a participant. Time it. Fix what is unclear. Do not launch yet: the pilot is next."
      }
    ],
    "checks": {
      "title": "Before you move on",
      "items": [
        "Tasks written as goals, each with a success rule.",
        "Start questions, after-task questions and a satisfaction questionnaire.",
        "The instruments chosen, each with a reason.",
        "The test built in Loop11 and run through once by the group."
      ]
    },
    "good": {
      "title": "Good signs",
      "items": [
        "A task can be understood without clicks named.",
        "The success rule was chosen before data exists.",
        "Start questions describe the participants without naming them."
      ]
    },
    "watch": [
      "Tasks that tell people where to click.",
      "Too many tasks for the time a participant will give.",
      "Asking for names, emails or anything that identifies a person."
    ],
    "output": [
      "A test built in Loop11, not yet launched."
    ],
    "teacher": [
      "Check that every group has a Loop11 licence before this session."
    ]
  },
  "step4a": {
    "intro": "You test the test, fix it, find participants and start the study. While it runs you keep an eye on the data. This is the study side of the lab. The accessibility side runs at the same time.",
    "parts": [
      {
        "title": "Run a pilot",
        "min": 30,
        "text": "Ask one or two people who are not in your group to do the test while you watch. Do not help. Note where they hesitate or misread a task."
      },
      {
        "title": "Refine the plan",
        "min": 25,
        "text": "Fix what the pilot showed: unclear tasks, a wrong success rule, a missing question, or a broken set-up. Change the plan on paper too, and keep the old version. You will explain the change in the report."
      },
      {
        "title": "Recruit participants",
        "min": 20,
        "text": "Send the test to the people you planned to recruit. Keep the message short and honest about how long the test takes, that recording is on, and that questions follow each task.",
        "help": [
          "loop11-recruit"
        ]
      },
      {
        "title": "Start and follow the study",
        "min": 45,
        "text": "Launch the test. Watch the first sessions as they come in. Count how many started and how many finished. Open one or two recordings. Write down problems as they appear.",
        "widget": "studylog",
        "help": [
          "loop11-recording"
        ]
      },
      {
        "title": "Sort out problems",
        "min": 15,
        "text": "If something breaks, decide what to fix and what to leave. Decide when the study stops. Check that the next lab has the data it needs."
      }
    ],
    "checks": {
      "title": "Before you move on",
      "items": [
        "A pilot was run and its changes are written down.",
        "The test is launched and participants are invited.",
        "Interim results were checked at least once.",
        "You know when the study closes."
      ]
    },
    "good": {
      "title": "Good signs",
      "items": [
        "The pilot led to at least one real change.",
        "The invitation tells the truth about time and recording.",
        "The group wrote problems down as they saw them."
      ]
    },
    "watch": [
      "Launching without a pilot.",
      "Changing the tasks half-way through the run without telling anyone.",
      "Counting sessions that were not completed as if they were."
    ],
    "output": [
      "A pilot and a refined plan.",
      "A running study.",
      "A first list of problems from the study."
    ],
    "teacher": [
      "The study may run beyond the session. Some groups may end with few participants: ask them to say so in the report."
    ],
    "after": [
      "Keep the test open and invite people if numbers are low.",
      "Close the study a day or two before Step 5."
    ]
  },
  "step4b": {
    "intro": "You evaluate accessibility while the study runs. Use more than one kind of check, because none finds everything.",
    "parts": [
      {
        "title": "Plan the evaluation",
        "min": 20,
        "text": "There are four kinds of checks: heuristics, standards checks, operating-system features and other instruments. Pick the pages or screens that matter most for your user stories. Decide which check you will run on which page.",
        "help": [
          "wcag22",
          "wcag-checklist"
        ]
      },
      {
        "title": "Run the automatic and standards checks",
        "min": 40,
        "text": "Run an automatic tool, for example AccessMonitor, or Accessibility Insights for Web, on each page you chose. Read the result and then check at least three findings by hand. Look at WCAG 2.2 to see what each rule asks. An automatic tool cannot see everything, so note what it cannot say.",
        "help": [
          "accessmonitor",
          "accessmonitor-ext",
          "a11y-insights-overview",
          "a11y-insights-fastpass"
        ]
      },
      {
        "title": "Check with heuristics and by hand",
        "min": 35,
        "text": "Use the keyboard only, no mouse. Can you reach everything and see where you are? Zoom the page to 200 percent. Is anything lost or overlapping? Read the labels of forms and buttons. Note each problem you find."
      },
      {
        "title": "Check with the operating system",
        "min": 25,
        "text": "Try the page with the features your computer or phone already has: zoom, high contrast, dark mode or a screen reader. A short pass is enough. Say clearly which feature you tried and what you did not try."
      },
      {
        "title": "Write the problems down",
        "min": 15,
        "text": "Add each problem to the log, with the page, what you saw, how you found it, the rule it may break and who it hurts.",
        "widget": "issuelog",
        "help": [
          "ptlaw-acess",
          "law-dl83",
          "law-dl82"
        ]
      }
    ],
    "checks": {
      "title": "Before you move on",
      "items": [
        "At least two kinds of checks were run.",
        "At least three automatic findings were confirmed by hand.",
        "A keyboard-only pass and a zoom pass were done.",
        "Every problem is in the log with its evidence.",
        "You wrote down what you did not check."
      ]
    },
    "good": {
      "title": "Good signs",
      "items": [
        "Automatic findings are checked, not just copied.",
        "The log says who each problem hurts.",
        "The group says which law applies only if it knows."
      ]
    },
    "watch": [
      "Reporting a score as if it were the whole answer.",
      "Copying every automatic finding. Choose the ones that matter for your user stories.",
      "Stating a law as the rule for your website without checking. Ask your teacher."
    ],
    "output": [
      "A log of accessibility problems with evidence.",
      "A note on what you did not check."
    ],
    "teacher": [
      "Which Portuguese rules cover a given website depends on the site. Nobody has confirmed it for the options. The page lists both decrees, Decreto-Lei 83/2018 and 82/2022, and says so.",
      "Accessibility Insights and AccessMonitor are suggestions. Groups may use other instruments."
    ]
  },
  "step5": {
    "intro": "You merge the three sources of evidence: the first review, the study and the accessibility checks. You rank the problems, choose the ones to fix and start to understand them.",
    "parts": [
      {
        "title": "Read the numbers",
        "min": 25,
        "text": "For each task, enter how many tried and how many succeeded, and the times of those who succeeded. Read the range, not only the rate. Add a short sentence on who took part.",
        "widget": "rate",
        "help": [
          "nng-success-rate",
          "nng-usability-metrics"
        ]
      },
      {
        "title": "Satisfaction",
        "min": 10,
        "text": "If you used a satisfaction questionnaire like the System Usability Scale, work out the score for each participant and then for the group.",
        "widget": "sus"
      },
      {
        "title": "Describe the problems and chances",
        "min": 25,
        "text": "Merge the problems from the first review, the study and the accessibility checks into one list. Write each one in plain words with its evidence. A chance for improvement is something that works but could work better. Write those down too.",
        "widget": "studylog"
      },
      {
        "title": "Rank them",
        "min": 35,
        "text": "Give each item a score for how bad it is for the user and how often it happens. Sort them. Ask: does this hurt the service the site is meant to provide?",
        "widget": "rank"
      },
      {
        "title": "Choose the two or three that matter most",
        "min": 20,
        "text": "Pick the two or three problems or chances with the highest severity or the best chance to improve the service. Write down why you chose them and what you leave out."
      },
      {
        "title": "Study the chosen items",
        "min": 20,
        "text": "For each chosen item write what happens, who is hurt, the evidence and the likely cause. Say what is a guess. You propose fixes in Step 6."
      }
    ],
    "checks": {
      "title": "Before you move on",
      "items": [
        "Success, time and satisfaction are written down with their limits.",
        "The three sources are merged into one list.",
        "Each item has evidence, a severity and an impact.",
        "Two or three items are chosen, with the reason.",
        "Each chosen item has a cause, marked as a guess where needed."
      ]
    },
    "good": {
      "title": "Good signs",
      "items": [
        "Numbers come with a range and a sentence on who took part.",
        "One item points to evidence from more than one source.",
        "The choice is explained, not only ranked."
      ]
    },
    "watch": [
      "Treating a percentage from five people as a fact.",
      "Listing symptoms in different words as separate problems.",
      "Ranking by effort to fix instead of by effect on users."
    ],
    "output": [
      "A ranked list of problems and chances.",
      "Two or three chosen items, each with a likely cause."
    ],
    "teacher": [
      "The rate and satisfaction tools keep nothing after a reload."
    ]
  },
  "step6": {
    "intro": "You turn the chosen problems into proposals, you write the report and you prepare the talk.",
    "parts": [
      {
        "title": "Study the chosen items in depth",
        "min": 15,
        "text": "Check each chosen item once more: what happens, who is hurt, the evidence, the likely cause. Say clearly what is a guess."
      },
      {
        "title": "Propose fixes and sketch them",
        "min": 45,
        "text": "For each item write a short description of the fix and sketch it as a low-fidelity drawing of the screen or the page. Pencil and paper is fine. The report must include proposed and illustrated measures. Say how you would know if each fix worked.",
        "help": [
          "nng-articles",
          "ixdf-articles"
        ]
      },
      {
        "title": "Put the report together",
        "min": 55,
        "text": "Write the report together in the session: goals, questions, method, results, analysis and discussion, a critical reflection on the limits of the study, and conclusions that include the illustrated fixes. Assign sections, write and read each other's parts. Check that you changed nothing important without explaining it. Cite what you used."
      },
      {
        "title": "Plan the presentation",
        "min": 20,
        "text": "Plan one talk that tells the whole story, from the question to the fixes. Write one sentence for each part. Ask your teacher for the time you will have.",
        "widget": "talkplan"
      }
    ],
    "checks": {
      "title": "Before you move on",
      "items": [
        "Each chosen item has a clear description with evidence.",
        "Each item has a fix and a sketch.",
        "The report has every required part.",
        "The limits of the study are written down.",
        "The talk plan fits your time slot."
      ]
    },
    "good": {
      "title": "Good signs",
      "items": [
        "Fixes address the cause, not only the symptom.",
        "The limits section is honest and specific.",
        "Every claim in the report can be traced to evidence."
      ]
    },
    "watch": [
      "Sketches so polished that they hide the idea. Low fidelity is the point.",
      "A report that hides what went wrong. Say it instead.",
      "Copying text from the web or from other groups: plagiarism is not accepted."
    ],
    "output": [
      "The report, ready to hand in.",
      "A plan for the talk."
    ],
    "teacher": [
      "The report must include proposed and illustrated measures. Plagiarism is not accepted."
    ],
    "after": [
      "Polish the report and the slides.",
      "Hand in the report and the presentation the day before the presentation sessions."
    ]
  },
  "pres1": {
    "intro": "Groups present their work and results. This is presentation session 1. Each group has 20 minutes, then 10 minutes of discussion.",
    "parts": [
      {
        "title": "Set up",
        "min": 10,
        "text": "Check the order and the slides. Test the sound and the screen. Know who goes before you."
      },
      {
        "title": "Four presentations",
        "min": 120,
        "text": "Each group presents the work done in every stage of the study and the main results, in 20 minutes. Show the proposed fixes with their sketches. Then 10 minutes of discussion. When others present, write one thing you would do differently.",
        "widget": "talkplan"
      },
      {
        "title": "Wrap up",
        "min": 5,
        "text": "Say what you learned about the method and about the website you evaluated."
      }
    ],
    "checks": {
      "title": "Before you move on",
      "items": [
        "You presented the whole story from the question to the fixes.",
        "You kept to 20 minutes.",
        "You took part in the discussion of another group."
      ]
    },
    "good": {
      "title": "Good signs",
      "items": [
        "The talk starts from the question, not from the tool.",
        "Each result has a fix next to it.",
        "Questions are answered from evidence."
      ]
    },
    "watch": [
      "Reading slides aloud.",
      "Showing every finding. Show the main ones.",
      "Running over time. Practice once."
    ],
    "output": [
      "Your presentation, delivered.",
      "Notes from the other groups."
    ],
    "teacher": [
      "Four groups of 30 minutes take 120 of 135 minutes. Two sessions hold at most eight groups. Check how many groups you have."
    ]
  },
  "pres2": {
    "intro": "Groups present their work and results. This is presentation session 2. Each group has 20 minutes, then 10 minutes of discussion.",
    "parts": [
      {
        "title": "Set up",
        "min": 10,
        "text": "Check the order and the slides. Test the sound and the screen. Know who goes before you."
      },
      {
        "title": "Four presentations",
        "min": 120,
        "text": "Each group presents the work done in every stage of the study and the main results, in 20 minutes. Show the proposed fixes with their sketches. Then 10 minutes of discussion. When others present, write one thing you would do differently.",
        "widget": "talkplan"
      },
      {
        "title": "Wrap up",
        "min": 5,
        "text": "Say what you learned about the method and about the website you evaluated."
      }
    ],
    "checks": {
      "title": "Before you move on",
      "items": [
        "You presented the whole story from the question to the fixes.",
        "You kept to 20 minutes.",
        "You took part in the discussion of another group."
      ]
    },
    "good": {
      "title": "Good signs",
      "items": [
        "The talk starts from the question, not from the tool.",
        "Each result has a fix next to it.",
        "Questions are answered from evidence."
      ]
    },
    "watch": [
      "Reading slides aloud.",
      "Showing every finding. Show the main ones.",
      "Running over time. Practice once."
    ],
    "output": [
      "Your presentation, delivered.",
      "Notes from the other groups."
    ],
    "teacher": [
      "Four groups of 30 minutes take 120 of 135 minutes. Two sessions hold at most eight groups. Check how many groups you have."
    ]
  }
});
