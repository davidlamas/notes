/* Data for the small interactive tools inside stations. Edit by hand.
   A station part names a tool with "widget": "<id>". Code lives in js/widgets.js. */
window.TUT = window.TUT || {};
TUT.widgets = {
  "goal": {
    "title": "Usability goal builder",
    "lead": "A usability goal has five parts. Fill them in and the goal appears below. Write one goal for each main story of your website.",
    "fields": [
      {
        "id": "who",
        "label": "Who",
        "hint": "A kind of user, in one phrase.",
        "example": "a first-time visitor who has not used the service before"
      },
      {
        "id": "what",
        "label": "What they want to do",
        "hint": "A goal, not a button.",
        "example": "book or find what they came for without help"
      },
      {
        "id": "where",
        "label": "Where and how",
        "hint": "Device, place, situation.",
        "example": "on a laptop, at home"
      },
      {
        "id": "measure",
        "label": "How you measure",
        "hint": "Pick from: success, time, ease rating, SUS, lostness.",
        "example": "success, time on task and an ease rating"
      },
      {
        "id": "criterion",
        "label": "What counts as good enough",
        "hint": "A number you chose before the test.",
        "example": "at least 4 of 5 succeed in under 3 minutes"
      }
    ],
    "template": "{who} can {what}, {where}. We measure {measure}. Good enough: {criterion}.",
    "note": "With five participants the numbers are a signal, not a statistic. Use the criterion to decide what you will call a problem, not to claim a percentage."
  },
  "issuelog": {
    "title": "Issue log",
    "lead": "Add each accessibility problem you find. You will merge this log with the study results in Step 5.",
    "warn": "This page does not save anything. Copy the log into your team notes before you close the page.",
    "fields": [
      {
        "id": "page",
        "label": "Page or file",
        "hint": "The page, screen or file where you saw it."
      },
      {
        "id": "what",
        "label": "What you saw",
        "hint": "One plain sentence."
      },
      {
        "id": "how",
        "label": "How you found it",
        "hint": "AccessMonitor, plugin, keyboard, zoom, recording..."
      },
      {
        "id": "rule",
        "label": "Rule it may break",
        "hint": "WCAG number, if you know it. Look it up in WCAG 2.2."
      },
      {
        "id": "who",
        "label": "Who it hurts",
        "hint": "For example: keyboard users, low vision, screen reader users, everyone."
      }
    ]
  },
  "studylog": {
    "title": "Study problems",
    "lead": "Add each problem the study shows. Write it as who, what, where, with evidence.",
    "warn": "This page does not save anything. Copy the list into your team notes before you close the page.",
    "fields": [
      {
        "id": "task",
        "label": "Task",
        "hint": "Which of your tasks."
      },
      {
        "id": "what",
        "label": "What happened",
        "hint": "One plain sentence."
      },
      {
        "id": "evidence",
        "label": "Evidence",
        "hint": "Recording and time, a number, or an answer."
      },
      {
        "id": "count",
        "label": "How many people",
        "hint": "For example: 3 of 5."
      },
      {
        "id": "why",
        "label": "Likely cause",
        "hint": "Your best guess. Say it is a guess."
      }
    ]
  },
  "rate": {
    "title": "Success rate with a range",
    "lead": "Enter the numbers for one task. The range shows how far a small group can mislead you.",
    "fields": [
      {
        "id": "n",
        "label": "People who tried the task",
        "hint": "Sessions that count under your rule."
      },
      {
        "id": "ok",
        "label": "People who succeeded",
        "hint": "Under your success rule."
      },
      {
        "id": "times",
        "label": "Times of those who succeeded, in seconds",
        "hint": "Separated by commas, for example: 95, 140, 210."
      }
    ],
    "note": "The range is a 95 percent Wilson interval. With five people it is very wide. That is why you read recordings, not only numbers."
  },
  "sus": {
    "title": "System Usability Scale score",
    "lead": "Enter the ten answers of one participant, each from 1 to 5, in the order of the questionnaire. Odd items are the positive statements, even items the negative ones. Add the participant to see the group result.",
    "note": "The SUS score is from 0 to 100. A score near 68 is often quoted as an average. With a few people, treat the score as a hint and not as a verdict."
  },
  "lost": {
    "title": "Lostness",
    "lead": "Lostness compares the path a person took with the shortest possible path. Count from a recording or from the path view.",
    "fields": [
      {
        "id": "N",
        "label": "Different pages visited",
        "hint": "Each page once."
      },
      {
        "id": "S",
        "label": "All page visits",
        "hint": "Count a page again each time it is visited."
      },
      {
        "id": "R",
        "label": "Fewest pages needed",
        "hint": "The shortest correct path."
      }
    ],
    "note": "0 is a perfect path. Values above about 0.5 are often read as clearly lost, and below about 0.4 as fine (Smith, 1996). Use this as a guide only."
  },
  "rank": {
    "title": "Merge and rank",
    "lead": "Put every problem from both sub-teams in one list. Give each an impact and a frequency, from 1 (low) to 3 (high). The score is impact times frequency.",
    "warn": "This page does not save anything. Copy the ranking into your team notes before you close the page.",
    "scale": [
      {
        "id": "impact",
        "label": "Impact",
        "hint": "1 slows people, 2 makes them fail or give up on a task, 3 blocks some people completely."
      },
      {
        "id": "freq",
        "label": "Frequency",
        "hint": "1 a few people, 2 about half, 3 almost everyone, or everyone who relies on this feature."
      }
    ]
  },
  "talkplan": {
    "title": "Presentation plan",
    "lead": "Write one sentence for each part. Check the time you were given for your slot and adjust the minutes.",
    "parts": [
      {
        "id": "hook",
        "label": "The service and the question",
        "min": 0.5,
        "hint": "What you evaluated and what you wanted to know."
      },
      {
        "id": "how",
        "label": "What you did",
        "min": 1,
        "hint": "Study and expert check, in one breath."
      },
      {
        "id": "top",
        "label": "The top problems",
        "min": 2,
        "hint": "Two or three, each with its evidence."
      },
      {
        "id": "fix",
        "label": "Fixes to try",
        "min": 1,
        "hint": "One change for each top problem."
      },
      {
        "id": "ask",
        "label": "What should happen first",
        "min": 0.5,
        "hint": "One clear recommendation."
      }
    ]
  },
  "profile": {
    "title": "Participant profile questions",
    "lead": "Put these at the start of the test, so you can describe who took part. Copy them into Loop11 as multiple-choice or rating questions. Replace [the service] with your website.",
    "note": "Ask for no names and nothing that identifies a person. Keep every answer optional if the tool allows it. You report the profile of the group in words, not person by person.",
    "questions": [
      {
        "q": "How well do you know the region or city where the service works?",
        "options": [
          "Never been",
          "Visited a few times",
          "Visit often",
          "Live or work in the area"
        ]
      },
      {
        "q": "How often do you use [the service] or similar services?",
        "options": [
          "Never",
          "A few times in my life",
          "Some months",
          "Every week",
          "Almost every day"
        ]
      },
      {
        "q": "How familiar are you with the [the service] website?",
        "options": [
          "Never used it",
          "Used it once or twice",
          "Used it several times",
          "Use it regularly"
        ]
      },
      {
        "q": "How comfortable are you with technology in general?",
        "options": [
          "1 Not at all",
          "2",
          "3",
          "4",
          "5 Very comfortable"
        ]
      },
      {
        "q": "Which device and browser are you using now?",
        "options": [
          "Laptop or desktop, Chrome",
          "Laptop or desktop, another browser",
          "Phone or tablet"
        ]
      },
      {
        "q": "Optional: do you use any settings or tools to read or move around websites (for example zoom, keyboard only, high contrast, screen reader)?",
        "options": [
          "No",
          "Yes, one or more",
          "Prefer not to say"
        ]
      }
    ]
  }
};
