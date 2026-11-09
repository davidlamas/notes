/* Station content for Sprint 2. Edit by hand. Same shape as content-s1.js. */
window.TUT = window.TUT || {};
TUT.content = window.TUT.content || {};
Object.assign(TUT.content, {
  "s2-results": {
    "intro": "Read your Loop11 results with care. Use numbers to see where to look, and recordings to understand why.",
    "parts": [
      {
        "title": "Check the data first",
        "min": 5,
        "text": "Open the results. How many sessions started, how many are complete? Apply your rule. Look at the participant profiles: who took part, how well they know Porto, the metro and the website, and how comfortable they are with technology. Write one sentence on how they differ from a typical visitor. Then check the success rule against two or three recordings: did someone who failed really fail, and did someone who succeeded really succeed? Fix the rule and say so if it was wrong."
      },
      {
        "title": "Success and time",
        "min": 8,
        "text": "For each task, enter how many tried and how many succeeded, and the times of those who succeeded. Read the range, not only the rate.",
        "widget": "rate"
      },
      {
        "title": "Satisfaction",
        "min": 6,
        "text": "Work out a SUS score for each participant, then the group.",
        "widget": "sus"
      },
      {
        "title": "Paths",
        "min": 4,
        "text": "Open the paths if your results show them. Where did people go that you did not expect? If you have time, work out lostness for one failed and one successful session.",
        "widget": "lost"
      },
      {
        "title": "Watch and write problems",
        "min": 17,
        "text": "Watch the recordings of failed and slow sessions first. Pause at the moment the person hesitates, goes back, or gives up. Compare people who know the site well with people who do not, in words only. Five people cannot support a percentage per group. Write each problem with its evidence.",
        "widget": "studylog",
        "help": [
          "loop11-recording"
        ]
      }
    ],
    "checks": {
      "title": "Before you move on",
      "items": [
        "A sentence on who took part, from the profile answers.",
        "Sessions counted under your rule, and the success rule checked.",
        "Success rate with range, and median time, for each task.",
        "SUS for the group.",
        "At least one path or lostness look.",
        "Three to six problems written with evidence."
      ]
    },
    "good": {
      "title": "What good looks like",
      "items": [
        "A statement such as: 3 of 5 succeeded, but the range is wide, so we read the recordings.",
        "Problems with the moment in the recording and the number of people.",
        "A clear note on how few people took part and who they were."
      ]
    },
    "watch": [
      "Reporting a percentage from five people as if it were exact.",
      "Reporting the average time of people who failed.",
      "Treating your classmates as typical visitors. They know the site, and they were in a lab.",
      "Missing the moment a person gave up, because the recording was only skimmed.",
      "Listing a fix as a problem. Write the problem first.",
      "Splitting five people into groups and quoting percentages. Describe the difference in words."
    ],
    "output": [
      "Numbers per task, with ranges",
      "SUS result",
      "Three to six study problems with evidence"
    ],
    "teacher": [
      "Ask: how sure are you? Why?",
      "Check one success rule against a recording with each team."
    ]
  },
  "s2-audit": {
    "intro": "Turn a pile of tool results and notes into a short, checked list of accessibility findings. Say what is broken, which rule it breaks and who it hurts.",
    "parts": [
      {
        "title": "Collect and clean",
        "min": 5,
        "text": "Bring your log from Sprint 1: AccessMonitor, the plugin, the keyboard, zoom and PDF checks. Remove duplicates. Remove anything you could not confirm."
      },
      {
        "title": "Confirm and name the rule",
        "min": 12,
        "text": "Reproduce each problem once more. Look up the WCAG 2.2 success criterion and its level, and write it down. If you cannot find a rule that fits, say so. Do not force one."
      },
      {
        "title": "Who it hurts, and which task",
        "min": 13,
        "text": "For each problem, say who it hurts: for example keyboard users, people who zoom, screen reader users, people with limited motor control, or everyone. Then ask: did it show up in the study? Look for it in the recordings with sub-team A.",
        "widget": "issuelog"
      },
      {
        "title": "The law question",
        "min": 5,
        "text": "Look at the two Portuguese laws in the resources. Nobody here knows for sure which one applies to Metro do Porto, so name both. Write what you know, what you do not, and who you would ask. Do not claim a legal violation. You are not a lawyer, and this is a usability exercise."
      },
      {
        "title": "Pick the top findings",
        "min": 5,
        "text": "Pick three to five findings. For each, keep one piece of evidence: a screenshot, a note from the keyboard check, or a moment in a recording."
      }
    ],
    "checks": {
      "title": "Before you move on",
      "items": [
        "A cleaned list with no unconfirmed items.",
        "Each finding has a rule (or an honest note that none fits) and who it hurts.",
        "At least one finding linked to something seen in the study.",
        "A note on the legal question that claims nothing.",
        "Three to five top findings, each with evidence."
      ]
    },
    "good": {
      "title": "What good looks like",
      "items": [
        "Findings in plain words, for example: the planner cannot be used with the keyboard only, so some people cannot finish the task at all.",
        "A clear line between what a tool reported and what you confirmed."
      ]
    },
    "watch": [
      "Pasting a tool message as a finding.",
      "Naming a WCAG number from memory.",
      "Saying a PDF is inaccessible without having tested it.",
      "Making legal claims.",
      "Forgetting that a barrier for some people can be a total block for them, even if few people hit it."
    ],
    "output": [
      "A cleaned accessibility list",
      "Three to five top findings with evidence",
      "A careful note on the legal question"
    ],
    "teacher": [
      "Ask for one finding that no tool reported.",
      "Stop any legal conclusion. Ask what they actually know."
    ]
  },
  "s2-rank": {
    "intro": "Both sub-teams meet. Put the study problems and the accessibility problems in one list, rank them, and sketch a fix for the top ones.",
    "parts": [
      {
        "title": "One list",
        "min": 8,
        "text": "Read your problems to each other. Add each to the ranking tool. Where a study failure and an accessibility barrier are the same problem, write it once and say so in the evidence.",
        "widget": "rank"
      },
      {
        "title": "Rate and argue",
        "min": 7,
        "text": "Rate impact and frequency for each. Where you disagree, look at the evidence, not at who is louder. Pick the top three."
      },
      {
        "title": "Sketch fixes",
        "min": 10,
        "text": "For each of the top two or three, sketch a fix on paper. Write what changes, what you expect to happen, and how you would test it. Keep fixes small. A fix is a change you could try next week, not a new website. For the timetable PDFs, one family of ideas is to give the departure times on a normal web page, or to make the PDF itself readable by screen readers. These are examples, not the answer."
      }
    ],
    "checks": {
      "title": "Before you move on",
      "items": [
        "One merged list with both kinds of problems.",
        "Every problem has an impact, a frequency and evidence.",
        "A top three chosen and agreed.",
        "A sketch and a test idea for each top problem."
      ]
    },
    "good": {
      "title": "What good looks like",
      "items": [
        "A top three where each problem has evidence from the study, from the expert check, or both.",
        "Fixes that are small and testable, with a stated expected effect."
      ]
    },
    "watch": [
      "Ranking by taste.",
      "Too many problems. Three clear ones beat twelve.",
      "A fix that is a redesign.",
      "Dropping an accessibility problem because few classmates hit it. It may block some people completely."
    ],
    "output": [
      "A ranked list",
      "A top three with evidence",
      "Three sketches and test ideas"
    ],
    "teacher": [
      "Ask: why is this number one and not two?",
      "Look at the fixes. Are they testable?"
    ]
  },
  "s2-talk": {
    "intro": "Build a talk for the digital team. Five minutes, one message, and evidence. Say who took part.",
    "parts": [
      {
        "title": "Choose the message",
        "min": 5,
        "text": "Write one sentence that starts with: Fix this first, because. The talk is built to make that sentence true."
      },
      {
        "title": "Plan the five minutes",
        "min": 8,
        "text": "Write one sentence for each part of the talk.",
        "widget": "talkplan"
      },
      {
        "title": "Make your support",
        "min": 8,
        "text": "Use any support you can present in five minutes: a few slides, one page, a short clip, a paper sketch. Your teacher may set up one shared slide deck with a section for each team. If so, add your slides to your section before the session starts. One deck means no time lost between talks. If you show a recording of a classmate, ask that person first and keep the clip short. Keep names and personal data off the screen."
      },
      {
        "title": "Run it once",
        "min": 4,
        "text": "Say it out loud with a timer. Cut whatever does not fit. Decide who speaks and who runs the support."
      }
    ],
    "checks": {
      "title": "Before you present",
      "items": [
        "One message sentence.",
        "The top problems each have evidence.",
        "One sentence on who took part and how few they were.",
        "Your support opens and works.",
        "You ran it once and it fits five minutes.",
        "No names or personal data on screen."
      ]
    },
    "good": {
      "title": "What good looks like",
      "items": [
        "A talk that gives one clear priority, two or three problems with evidence, and one fix each.",
        "Honest words about how few people took part."
      ]
    },
    "watch": [
      "Too many slides.",
      "Telling the story of what you did instead of what you found.",
      "Showing numbers from five people without saying how few they are.",
      "Running over time. The next team is waiting."
    ],
    "output": [
      "Your talk and support",
      "A message sentence",
      "Roles for the talk"
    ],
    "teacher": [
      "Ask each team for their message sentence.",
      "Check that nobody shows names or personal data.",
      "Consider one shared slide deck with a section for each team. It saves the changeovers."
    ]
  },
  "s2-present": {
    "intro": "Eight talks of five minutes. The rest of the class is the digital team. Keep to time.",
    "parts": [
      {
        "title": "Set up",
        "min": 2,
        "text": "Agree the order. Open the shared deck if there is one, at the first slide. Otherwise each speaker has the support open at the side before the previous talk ends. Use the clock below for all eight talks.",
        "widget": "talkclock"
      },
      {
        "title": "Talks 1 to 4",
        "min": 20,
        "text": "Five minutes each, with no questions in between. Listeners write the first fix they would try, and the evidence that convinced them most. Use the clock in step 1."
      },
      {
        "title": "Talks 5 to 8",
        "min": 20,
        "text": "Same rules. Use the clock in step 1 and press the next talk button for each speaker."
      },
      {
        "title": "Close",
        "min": 3,
        "text": "Each team says in one sentence what it would do first if it were the digital team. Then one sentence on what you would do differently in your next study."
      }
    ],
    "checks": {
      "title": "While you listen",
      "items": [
        "I wrote the first fix I would try.",
        "I wrote the evidence that convinced me most.",
        "I noticed one thing another team did better than we did."
      ]
    },
    "good": {
      "title": "What good looks like",
      "items": [
        "Every talk finishes in five minutes.",
        "A listener could name the first fix after each talk."
      ]
    },
    "watch": [
      "Running over time. The talks are tight by design.",
      "Questions between talks. Save them for the close.",
      "A support that does not open. Test it before the talk."
    ],
    "output": [
      "Notes from the other talks",
      "A sentence on what to do differently next time"
    ],
    "teacher": [
      "Keep the time strictly. Eight talks fill forty minutes.",
      "A shared deck with one slide per team is the fastest way to change speakers. The deck (title, instructions, Team 1 to Team 8) is linked in Resources. Open it for editing before the lab.",
      "Use the close for what the class learned, and give feedback on the method."
    ]
  }
});
