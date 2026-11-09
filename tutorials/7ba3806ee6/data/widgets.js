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
      { "label": "Success is opening the PDF (its web address).", "verdict": "Weak", "why": "Opening the file is not finding the time. You would count people who opened it and read the wrong line. Also, a PDF may not load as a normal page address in the test." },
      { "label": "Success is a correct answer to a question after the task.", "verdict": "Strong", "why": "It checks the thing that matters. Ask for the next departure after a given time, as a choice between four times with one correct. You must know the right answer on the test day, so check the PDF yourself. Timetables change." },
      { "label": "Success is the participant saying \"done\".", "verdict": "Weak", "why": "People believe they are right when they are not. You would measure confidence, not success." },
      { "label": "Success is judged by watching every recording.", "verdict": "Slow, but useful as a second check", "why": "It works for five participants. It is slow and depends on who watches. Use it to check the answer question, not instead of it." }
    ],
    "tail": "For the planner task, try it in your own browser. If the address changes after a search, you may use it as a success address. If it does not change, use an answer question again."
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
  }
};
