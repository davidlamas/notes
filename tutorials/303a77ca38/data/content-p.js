/* Station content for the project. Edit by hand. Optional field "after" lists the independent work before the next session. */
window.TUT = window.TUT || {};
TUT.content = window.TUT.content || {};
Object.assign(TUT.content, {
  "lab3": {
    "intro": "You know which website you will evaluate. Now you map it and describe the people who use it and what they try to do.",
    "parts": [
      {
        "title": "Read the project and the plan",
        "min": 10,
        "text": "Read the brief view together. Agree who does what and how you will work between labs. Remember: your website was approved by the lecturer before this lab."
      },
      {
        "title": "Draw the mind-map",
        "min": 45,
        "text": "Put the website in the middle and branch out: what is it about, which services does it offer, who is the target audience? Explore the real site while you draw. Add what surprises you."
      },
      {
        "title": "Build the personas",
        "min": 40,
        "text": "A persona is a made-up person built from what you know about the real audience. Write two or three. Each has a goal on this website, a situation, how comfortable they are with technology, and anything that makes the site harder for them. Do not use names of people you know.",
        "help": [
          "ixdf-articles"
        ]
      },
      {
        "title": "Write the main user stories",
        "min": 25,
        "text": "For each persona write the one or two main stories the site allows, in the form: as a [person] I want to [goal] so that [reason]. Keep to the main things people come to do."
      },
      {
        "title": "Compare with another group",
        "min": 15,
        "text": "Show your map to another group for two minutes each. Ask what they would not have guessed from the map. Add it."
      }
    ],
    "checks": {
      "title": "Before you move on",
      "items": [
        "The website is approved by the lecturer.",
        "The mind-map shows the purpose, the services and the audience.",
        "Two or three personas, each with a goal and a situation.",
        "The main user stories are written down."
      ]
    },
    "good": {
      "title": "Good signs",
      "items": [
        "The map has services as branches, not only page names.",
        "Personas differ in what they need, not only in age or job.",
        "Each story can be turned into a task a stranger can do."
      ]
    },
    "watch": [
      "A mind-map copied from the site menu. It should show what people do there.",
      "Personas that describe the students in the group.",
      "Stories that name buttons instead of goals."
    ],
    "output": [
      "A mind-map.",
      "Personas.",
      "User stories."
    ],
    "after": [
      "Finish the mind-map, personas and stories if anything is missing.",
      "Walk through the site once with each user story and note where you hesitate. Bring the notes to Lab #4."
    ],
    "teacher": [
      "Moodle lists the mind-map under Lab #3 and personas and stories under Lab #4. They are joined here because there are four working labs.",
      "The lecturer approves each website before this lab. Websites are not repeated."
    ]
  },
  "lab4": {
    "intro": "You look at the website with the stories in hand, set the goals and questions of the study, and plan the study on paper.",
    "parts": [
      {
        "title": "Do a first expert review",
        "min": 30,
        "text": "Walk through each story on the real site. Note what looks confusing, slow, hidden or broken. Use the Nielsen heuristics. The course page gives templates for this: a Figma file, a Miro board and an NN/g workbook. Duplicate one and use it. You are looking for the areas that deserve more attention, not for a full list.",
        "help": [
          "tpl-figma",
          "tpl-miro",
          "tpl-nng",
          "nng-articles"
        ]
      },
      {
        "title": "Set the goals and the questions",
        "min": 30,
        "text": "Look at what the review found. Write two or three usability goals. A goal says who, what they want, in what situation, how you will measure, and what is good enough. Then write the research questions that the test must answer.",
        "widget": "goal"
      },
      {
        "title": "Decide the participants and the size",
        "min": 20,
        "text": "Who should take part and how many? Think about the audience from your personas. With a small group the numbers are a signal, not a statistic. Say how you will recruit. Ask nothing that identifies a person.",
        "help": [
          "nng-study-guide",
          "loop11-recruit"
        ]
      },
      {
        "title": "Prepare tasks, questions and questionnaires",
        "min": 55,
        "text": "Write the tasks from the user stories. A task is a goal in a situation, not a list of clicks. Decide how success is judged before the test: by the address a participant reaches or by an answer to a question after the task. Write the questions after each task, the questions at the start about the participants, and a satisfaction questionnaire. Warn participants that questions follow each task.",
        "widget": "profile",
        "help": [
          "loop11-questions",
          "loop11-unmoderated"
        ]
      }
    ],
    "checks": {
      "title": "Before you move on",
      "items": [
        "A list of areas that deserve attention, from the expert review.",
        "Two or three usability goals, each with a measure and a good-enough rule.",
        "The research questions written out.",
        "Participants and size decided, with how you will recruit.",
        "Tasks with success rules, and the questions and questionnaires."
      ]
    },
    "good": {
      "title": "Good signs",
      "items": [
        "A task can be understood without clicks named.",
        "A goal has a rule you chose before any data exists.",
        "Start questions describe the participants without naming them."
      ]
    },
    "watch": [
      "Tasks that tell people where to click.",
      "Too many tasks for the time a participant will give.",
      "Asking for names, emails or anything that identifies a person."
    ],
    "output": [
      "Review notes, goals and research questions.",
      "A study plan: participants, tasks, questions."
    ],
    "after": [
      "Finish the tasks and questions.",
      "Ask the lecturer about anything unclear in your plan.",
      "Bring the plan to Lab #5 ready to build."
    ],
    "teacher": [
      "Moodle lists the review and the goals under Lab #4 and the plan under Lab #5. They are joined here because there are four working labs.",
      "Moodle says participants get Loop11 licences. Check that every group has one before Lab #5."
    ]
  },
  "lab5a": {
    "intro": "This is the study side of the lab. You build the test, try it, fix it and launch it. The accessibility side runs at the same time.",
    "parts": [
      {
        "title": "Build the test",
        "min": 40,
        "text": "Build the test in Loop11: tasks, success rules, questions, opening and thank-you text. Choose what else you collect and why. Try it yourself once.",
        "help": [
          "loop11-docs",
          "loop11-recording"
        ]
      },
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
        "title": "Recruit and launch",
        "min": 40,
        "text": "Send the test to the people you planned to recruit. Keep the message short and honest about how long the test takes, that recording is on, and that questions follow each task. Launch and watch the first sessions. Note problems as they appear.",
        "widget": "studylog",
        "help": [
          "loop11-recruit",
          "loop11-recording"
        ]
      }
    ],
    "checks": {
      "title": "Before you move on",
      "items": [
        "The test is built and tried once.",
        "A pilot was run and its changes are written down.",
        "The test is launched and participants are invited.",
        "You know when the study closes."
      ]
    },
    "good": {
      "title": "Good signs",
      "items": [
        "The pilot led to at least one real change.",
        "The invitation tells the truth about time and recording.",
        "Problems were written down as they were seen."
      ]
    },
    "watch": [
      "Launching without a pilot.",
      "Changing the tasks half-way through the run without saying so.",
      "Counting sessions that were not completed as if they were."
    ],
    "output": [
      "A launched study.",
      "A first list of problems from the study."
    ],
    "after": [
      "Keep the test open. Chase participants if numbers are low.",
      "Open the recordings of failed or slow sessions and write down problems.",
      "Close the study a day or two before Lab #6."
    ],
    "teacher": [
      "The study keeps running after the lab, as independent work. Moodle says only 'Accompany the study' and 'Monitor interim results'.",
      "Some groups may end with few participants. Ask them to say so in the report."
    ]
  },
  "lab5b": {
    "intro": "This is the accessibility side of the lab. You evaluate accessibility while the study is set up. Use more than one kind of check, because none finds everything.",
    "parts": [
      {
        "title": "Plan the evaluation",
        "min": 15,
        "text": "Moodle names four kinds of checks: heuristics, standards checks, operating-system features and other instruments. Pick the pages or screens that matter most for your user stories. Decide which check you run on which page.",
        "help": [
          "wcag22",
          "wcag-checklist"
        ]
      },
      {
        "title": "Run the automatic and standards checks",
        "min": 40,
        "text": "Run an automatic tool, for example AccessMonitor or Accessibility Insights for Web, on each page you chose. Read the result and then check at least three findings by hand. Look at WCAG 2.2 to see what each rule asks. An automatic tool cannot see everything, so note what it cannot say.",
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
        "text": "Use the keyboard only, no mouse. Can you reach everything and see where you are? Zoom the page to 200 percent. Is anything lost or overlapping? Read the labels of forms and buttons. Note each problem."
      },
      {
        "title": "Check with the operating system",
        "min": 25,
        "text": "Try the page with features your computer or phone already has: zoom, high contrast, dark mode or a screen reader. A short pass is enough. Say which feature you tried and what you did not try."
      },
      {
        "title": "Write the problems down",
        "min": 20,
        "text": "Add each problem to the log: the page, what you saw, how you found it, the rule it may break and who it hurts.",
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
        "The group names a law as the rule only if it knows."
      ]
    },
    "watch": [
      "Reporting a score as if it were the whole answer.",
      "Copying every automatic finding. Choose the ones that matter for your user stories.",
      "Stating a law as the rule for your website without checking. Ask your lecturer."
    ],
    "output": [
      "A log of accessibility problems with evidence.",
      "A note on what you did not check."
    ],
    "after": [
      "Finish any checks you did not reach.",
      "Bring the log to Lab #6."
    ],
    "teacher": [
      "Which Portuguese rules cover a given website depends on the site. Nobody has confirmed it. The page lists both decrees, Decreto-Lei 83/2018 and 82/2022, and says so.",
      "Accessibility Insights and AccessMonitor are suggestions. Moodle says 'standards checks' and 'other instruments'."
    ]
  },
  "lab6": {
    "intro": "You now have three sources of evidence: the first review, the study and the accessibility checks. You merge them, rank the problems and choose the ones to fix.",
    "parts": [
      {
        "title": "Read the numbers",
        "min": 30,
        "text": "For each task, enter how many tried and how many succeeded, and the times of those who succeeded. Read the range, not only the rate. Add a short sentence on who took part.",
        "widget": "rate",
        "help": [
          "nng-success-rate",
          "nng-usability-metrics"
        ]
      },
      {
        "title": "Satisfaction",
        "min": 15,
        "text": "If you used a satisfaction questionnaire like the System Usability Scale, work out the score for each participant and then for the group.",
        "widget": "sus"
      },
      {
        "title": "Describe the problems and chances",
        "min": 30,
        "text": "Merge the problems from the review, the study and the accessibility checks into one list. Write each in plain words with its evidence. A chance for improvement is something that works but could work better.",
        "widget": "studylog"
      },
      {
        "title": "Rank them",
        "min": 35,
        "text": "Give each item a score for how bad it is for the user and how often it happens. Sort them. Ask: does this hurt what the site is meant to do?",
        "widget": "rank"
      },
      {
        "title": "Choose the two or three that matter most",
        "min": 25,
        "text": "Pick the two or three items with the highest severity or the best chance to improve the service. Write down why, and what you leave out. Agree who sketches which fix."
      }
    ],
    "checks": {
      "title": "Before you move on",
      "items": [
        "Success, time and satisfaction are written down with their limits.",
        "The three sources are merged into one list.",
        "Each item has evidence, a severity and an impact.",
        "Two or three items are chosen, with the reason.",
        "What you leave out is named."
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
      "The two or three items chosen to fix."
    ],
    "after": [
      "Study the chosen items in depth: what happens, who is hurt, the evidence, the likely cause. Say what is a guess.",
      "Propose a fix for each item and sketch it at low fidelity. Say how you would know the fix worked.",
      "Write the report: goals, questions, method, results, analysis and discussion, a critical reflection on the limits of the study, and conclusions that include the illustrated fixes.",
      "Plan the talk: 20 minutes, then 10 minutes of discussion.",
      "Hand in the report and the presentation the day before the presentation session."
    ],
    "teacher": [
      "Moodle lists compile and rank under Lab #7 and fixes, report and talk under Lab #8. Here they are Lab #6 and independent work, because there are four working labs.",
      "The report must include proposed and illustrated measures. Plagiarism means failing the course at once."
    ]
  },
  "pres1": {
    "intro": "Groups present their work and results. This is the first presentation session. Each group has 20 minutes, then 10 minutes of discussion.",
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
        "Answers in the discussion come from evidence."
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
      "The order is on a Moodle page hidden from students.",
      "Four groups of 30 minutes take 120 of 135 minutes. Two sessions hold at most eight groups. Moodle has ten team spaces. Check how many groups you have."
    ]
  },
  "pres2": {
    "intro": "Groups present their work and results. This is the second presentation session. Each group has 20 minutes, then 10 minutes of discussion.",
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
        "Answers in the discussion come from evidence."
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
      "The order is on a Moodle page hidden from students.",
      "Four groups of 30 minutes take 120 of 135 minutes. Two sessions hold at most eight groups. Moodle has ten team spaces. Check how many groups you have."
    ]
  }
});
