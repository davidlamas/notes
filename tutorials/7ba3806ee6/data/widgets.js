/* Data for the small interactive tools inside stations. Edit by hand.
   A station part names a tool with "widget": "<id>". Code lives in js/widgets.js. */
window.TUT = window.TUT || {};
TUT.widgets = {
  "goal": {
    "title": "Usability goal builder",
    "lead": "A usability goal has five parts. Fill them in and the goal appears below. Write two goals, one for each mandatory task.",
    "fields": [
      { "id": "who", "label": "Who", "hint": "A kind of user, in one phrase.", "example": "a visitor to Porto who does not know the network" },
      { "id": "what", "label": "What they want to do", "hint": "A goal, not a button.", "example": "work out how to reach the airport late on a Saturday" },
      { "id": "where", "label": "Where and how", "hint": "Device, place, situation.", "example": "on a laptop, at home, before the trip" },
      { "id": "measure", "label": "How you measure", "hint": "Pick from: success, time, ease rating, SUS, lostness.", "example": "success, time on task and an ease rating" },
      { "id": "criterion", "label": "What counts as good enough", "hint": "A number you chose before the test.", "example": "at least 4 of 5 succeed in under 3 minutes" }
    ],
    "template": "{who} can {what}, {where}. We measure {measure}. Good enough: {criterion}.",
    "note": "With five participants the numbers are a signal, not a statistic. Use the criterion to decide what you will call a problem, not to claim a percentage."
  },
  "taskcheck": {
    "title": "Is this a good task?",
    "lead": "Decide for each wording. Then read why.",
    "items": [
      { "text": "Click on Percursos and fill in the From field.", "good": false, "why": "It names the control. You test whether people can follow instructions, not whether they can find the planner." },
      { "text": "You are at Trindade station late on a Saturday. Find out if the metro can still take you to the airport tonight, and when you would arrive.", "good": true, "why": "A goal in a situation. It leaves the way open. The answer can be checked." },
      { "text": "Test the trip planner.", "good": false, "why": "No goal, no end point, no way to say who succeeded." },
      { "text": "Open the timetable PDF for line A and read the 9:00 departure.", "good": false, "why": "It gives the means (the PDF) and the answer. Nothing is left to find." },
      { "text": "You work near Senhor de Matosinhos. Find the first metro towards Estádio do Dragão on a Sunday morning.", "good": true, "why": "A real need with one clear answer. Check the line and station names on the current map before you use them, and confirm the answer on the day." }
    ]
  },
  "success": {
    "title": "Decide how success is judged (the PDF task)",
    "lead": "Loop11 can judge success by a web address or by an answer to a question. Which rule fits the PDF task? Try each one.",
    "options": [
      { "label": "Success is opening the PDF (its web address).", "verdict": "Weak", "why": "Opening the file is not finding the time. You would count people who opened it and read the wrong line. Also, the address of a PDF can change when Metro do Porto updates its timetables." },
      { "label": "Success is a correct answer to a question after the task.", "verdict": "Strong", "why": "It checks the thing that matters. Ask for the next departure after a given time, as a choice between four times with one correct. You must know the right answer on the test day, so check the PDF yourself. Timetables change." },
      { "label": "Success is the participant saying \"done\".", "verdict": "Weak", "why": "People believe they are right when they are not. You would measure confidence, not success." },
      { "label": "Success is judged by watching every recording.", "verdict": "Slow, but useful as a second check", "why": "It works for five participants. It is slow and depends on who watches. Use it to check the answer question, not instead of it." }
    ],
    "tail": "For the planner task, run a search in your own browser and read the address. If it holds your stations and time, the address is different for every person, and it will change when the site changes. A part-of-the-address match may help, if Loop11 offers one. Check in your account. If not, use an answer question here too."
  },
  "issuelog": {
    "title": "Issue log",
    "lead": "Add each problem you find. You will merge this log with the study results in Sprint 2.",
    "warn": "This page does not save anything. Copy the log into your team notes before you close the page.",
    "fields": [
      { "id": "page", "label": "Page or file", "hint": "Planner, schedules page, a PDF..." },
      { "id": "what", "label": "What you saw", "hint": "One plain sentence." },
      { "id": "how", "label": "How you found it", "hint": "AccessMonitor, plugin, keyboard, zoom, recording..." },
      { "id": "rule", "label": "Rule it may break", "hint": "WCAG number, if you know it. Look it up in WCAG 2.2." },
      { "id": "who", "label": "Who it hurts", "hint": "For example: keyboard users, low vision, screen reader users, everyone." }
    ]
  },
  "studylog": {
    "title": "Study problems",
    "lead": "Add each problem the study shows. Write it as who, what, where, with evidence.",
    "warn": "This page does not save anything. Copy the list into your team notes before you close the page.",
    "fields": [
      { "id": "task", "label": "Task", "hint": "Planner, PDF, or an extra task." },
      { "id": "what", "label": "What happened", "hint": "One plain sentence." },
      { "id": "evidence", "label": "Evidence", "hint": "Recording and time, a number, or an answer." },
      { "id": "count", "label": "How many people", "hint": "For example: 3 of 5." },
      { "id": "why", "label": "Likely cause", "hint": "Your best guess. Say it is a guess." }
    ]
  },
  "rate": {
    "title": "Success rate with a range",
    "lead": "Enter the numbers for one task. The range shows how far a small group can mislead you.",
    "fields": [
      { "id": "n", "label": "People who tried the task", "hint": "Sessions that count under your rule." },
      { "id": "ok", "label": "People who succeeded", "hint": "Under your success rule." },
      { "id": "times", "label": "Times of those who succeeded, in seconds", "hint": "Separated by commas, for example: 95, 140, 210." }
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
      { "id": "N", "label": "Different pages visited", "hint": "Each page once." },
      { "id": "S", "label": "All page visits", "hint": "Count a page again each time it is visited." },
      { "id": "R", "label": "Fewest pages needed", "hint": "The shortest correct path." }
    ],
    "note": "0 is a perfect path. Values above about 0.5 are often read as clearly lost, and below about 0.4 as fine (Smith, 1996). Use this as a guide only."
  },
  "rank": {
    "title": "Merge and rank",
    "lead": "Put every problem from both sub-teams in one list. Give each an impact and a frequency, from 1 (low) to 3 (high). The score is impact times frequency.",
    "warn": "This page does not save anything. Copy the ranking into your team notes before you close the page.",
    "scale": [
      { "id": "impact", "label": "Impact", "hint": "1 slows people, 2 makes them fail or give up on a task, 3 blocks some people completely." },
      { "id": "freq", "label": "Frequency", "hint": "1 a few people, 2 about half, 3 almost everyone, or everyone who relies on this feature." }
    ]
  },
  "talkplan": {
    "title": "Five-minute plan",
    "lead": "Write one sentence for each part. The minutes add up to five.",
    "parts": [
      { "id": "hook", "label": "The question", "min": 0.5, "hint": "Why the digital team asked you." },
      { "id": "how", "label": "What you did", "min": 1, "hint": "Study and expert check, in one breath." },
      { "id": "top", "label": "The top problems", "min": 2, "hint": "Two or three, each with its evidence." },
      { "id": "fix", "label": "Fixes to try", "min": 1, "hint": "One change for each top problem." },
      { "id": "ask", "label": "What to do first", "min": 0.5, "hint": "One clear request." }
    ]
  },
  "talkclock": {
    "title": "Talk clock",
    "lead": "Five minutes for each talk. The clock says when one minute is left and when time is up.",
    "talks": 8,
    "seconds": 300
  },
  "profile": {
    "title": "Participant profile questions",
    "lead": "Put these at the start of the test, so you can describe who took part. Copy them into Loop11 as multiple-choice or rating questions.",
    "note": "Ask for no names and nothing that identifies a person. Keep every answer optional if the tool allows it. You report the profile of the group in words, not person by person.",
    "questions": [
      { "q": "How well do you know Porto and the area around it?", "options": ["Never been", "Visited a few times", "Visit often", "Live or work in the area"] },
      { "q": "How often do you use the Metro do Porto?", "options": ["Never", "A few times in my life", "Some months", "Every week", "Almost every day"] },
      { "q": "How familiar are you with the Metro do Porto website?", "options": ["Never used it", "Used it once or twice", "Used it several times", "Use it regularly"] },
      { "q": "How comfortable are you with technology in general?", "options": ["1 Not at all", "2", "3", "4", "5 Very comfortable"] },
      { "q": "Which device and browser are you using now?", "options": ["Laptop or desktop, Chrome", "Laptop or desktop, another browser", "Phone or tablet"] },
      { "q": "Optional: do you use any settings or tools to read or move around websites (for example zoom, keyboard only, high contrast, screen reader)?", "options": ["No", "Yes, one or more", "Prefer not to say"] }
    ]
  }
};
