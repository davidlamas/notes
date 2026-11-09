/* The hypothetical scenario and the team set-up. Edit by hand. */
window.TUT = window.TUT || {};
TUT.scenario = {
  "eyebrow": "The brief",
  "headline": "The phone keeps ringing. Is the website the reason?",
  "paragraphs": [
    "Metro do Porto's support line gets more and more calls. Many are about schedules and connections. At the same time, the network keeps growing and getting more complex.",
    "The digital team suspects the website is sending people to the phone. You are an outside UX team, called in for a quick formative evaluation.",
    "In two sprints you find where the website fails real users, show the evidence, rank the problems and suggest fixes. Your audience is the digital team. You have five minutes."
  ],
  "fictionNote": "This scenario is invented for the exercise. The call figures, the digital team and the request are not real. The website, the schedules and the PDFs are real and public.",
  "brief": [
    { "label": "You are", "text": "an outside UX team of five students, split in two sub-teams." },
    { "label": "You deliver", "text": "ranked problems with evidence, and fixes to try. Both a usability study and an accessibility check feed the ranking." },
    { "label": "Your audience", "text": "the digital team, in a five-minute talk." },
    { "label": "Your method", "text": "an unmoderated remote usability test with screen recording in Loop11, plus an expert accessibility check with AccessMonitor and a Chrome plugin." }
  ],
  "mandatory": [
    {
      "id": "task-planner",
      "title": "Find a connection with the trip planner",
      "text": "Write it as a goal, not as a feature. Example of a goal: can you still reach your destination by metro at a given late hour? Leave the way to the answer open."
    },
    {
      "id": "task-pdf",
      "title": "Find a departure in the timetable PDF",
      "text": "The timetables are PDF files. Ask for an answer a participant can only give after reading the PDF, for example the next departure after a given time on one line in one direction."
    }
  ],
  "extras": [
    "A fare question for a first-time visitor with no card.",
    "Lost and found.",
    "Works or disruptions on the line.",
    "One task on the English version of the site."
  ],
  "split": {
    "note": "The team sizes are suggestions. Decide your own split, and change it if the work asks for it.",
    "A": { "key": "A", "name": "Sub-team A: the study", "suggested": "2 to 3 people", "role": "Goals, tasks, success rules, the Loop11 test, launch, and reading the results." },
    "B": { "key": "B", "name": "Sub-team B: the expert check", "suggested": "2 to 3 people", "role": "AccessMonitor, the Chrome plugin and manual checks on the schedule pages and PDFs, then the accessibility findings." },
    "AB": { "key": "AB", "name": "Together", "suggested": "everyone", "role": "Checkpoints, taking another team's test, ranking the problems and the talk." }
  },
  "peerTest": "Team 1 builds a test and Team 2 takes it. Team 2 builds a test and Team 3 takes it, and so on. The last team's test is taken by Team 1. Do not talk about the tasks with the other team until every run is finished."
};
