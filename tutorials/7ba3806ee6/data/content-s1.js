/* Station content for Sprint 1. Edit by hand.
   Fields: intro, parts[{title,min,text,widget?}] (minutes add up to the station), checks{title,items},
   good{title,items}, watch[], output[], teacher[]. Menu names in Loop11 and the plugin can change.
   Tell students to follow the live screen and the linked documentation when they differ. */
window.TUT = window.TUT || {};
TUT.content = window.TUT.content || {};
Object.assign(TUT.content, {

"s1-brief": {
  "intro": "Ten minutes to land. Read the brief, look at the two pages you will test, and decide who does what.",
  "parts": [
    { "title": "Read the brief together", "min": 3, "text": "Each person says in one sentence who the digital team is and what they want from you. If the sentences differ, talk until they match." },
    { "title": "Look at the two pages", "min": 2, "text": "Open the trip planner and the schedules page. Click around for two minutes. Open one timetable PDF and see how it loads. You already know the site, so look for what feels slow, odd or hard." },
    { "title": "Choose your split", "min": 3, "text": "Pick sub-team A (the study) and sub-team B (the expert check). The sizes are only a suggestion. Choose by interest and by what you want to learn. You swap roles in your head later, but in this lab each of you keeps one stream." },
    { "title": "Find your partners", "min": 2, "text": "Write down the number of the team that takes your test and the number of the team whose test you take. Agree with your teacher how test links are passed on." }
  ],
  "checks": { "title": "Before you leave this station", "items": [
    "Everyone can say the scenario in one sentence.",
    "A and B are chosen and written down.",
    "You know which team takes your test.",
    "You know whose test you take, and how the link will reach you."
  ] },
  "good": { "title": "What good looks like", "items": [
    "A short shared sentence such as: the website may be sending people to the phone, find where and why.",
    "A split that matches what people want to learn, not who sits next to whom."
  ] },
  "watch": [
    "Splitting by friendship and ending with a lopsided plan.",
    "Starting to design tasks now. That is the next station.",
    "Forgetting to agree how the test link is shared."
  ],
  "output": ["Team split (A and B)", "Your test partner teams", "A one-sentence version of the brief"],
  "teacher": [
    "Keep it to ten minutes. Say aloud which team takes whose test.",
    "If a team cannot split, suggest two and three people and move on."
  ]
},

"s1-goals": {
  "intro": "Turn the call-centre worry into goals you can measure and tasks real people could have. Decide how success is judged before any data exists.",
  "parts": [
    { "title": "From worry to questions", "min": 5, "text": "List three reasons someone might phone about a schedule or a connection instead of using the website. Pick the two you can test with a task. Use the ISO idea of usability: can specified users reach specified goals with effectiveness, efficiency and satisfaction, in a stated context?" },
    { "title": "Write two usability goals", "min": 8, "text": "One goal per mandatory task. Use the builder.", "widget": "goal" },
    { "title": "Write the tasks as goals", "min": 7, "text": "A task is a short story with a goal and no hints. Test your own wording against the examples first.", "widget": "taskcheck" },
    { "title": "Decide how success is judged", "min": 5, "text": "Do this now, before data exists. Otherwise you will fit the rule to the results.", "widget": "success" }
  ],
  "checks": { "title": "Before you move on", "items": [
    "Two goals, each with a criterion.",
    "Two tasks, each a goal in a situation, with no control names.",
    "A success rule for each task, and you know the correct answer today.",
    "A short note on how the lab differs from real use (for example: students, in class, on a known site)."
  ] },
  "good": { "title": "What good looks like", "items": [
    "Planner task: You are at Trindade late on a Saturday. Find out if the metro can still take you to the airport tonight, and when you would arrive.",
    "PDF task: a question answered only after reading the timetable, with four choices and one correct.",
    "Two or three tasks in total. Each takes three to four minutes, and the whole test should stay near fifteen."
  ] },
  "watch": [
    "Tasks that name the button or give the answer.",
    "Too many tasks. Fifteen minutes is the limit for a person who does it once.",
    "A success rule that counts opening the PDF as finding the time.",
    "Treating a lab result as real-life evidence. State the difference in context of use."
  ],
  "output": ["Two usability goals", "Task texts, ready to paste into Loop11", "A success rule per task, with the correct answers"],
  "teacher": [
    "Look at task wording. It is the most common failure.",
    "Ask: how will you know who succeeded on the PDF task?"
  ]
},

"s1-scan": {
  "intro": "Run the automatic check on the two pages. It is fast and it misses a lot. Note both.",
  "parts": [
    { "title": "Open AccessMonitor", "min": 3, "text": "Open the tool and paste the address of the trip planner page. Wait for the result. The labels are in Portuguese. The tool gives a score from 1 to 10 and sorts what it found into passes, things to check by hand, and failures." },
    { "title": "Run both pages", "min": 7, "text": "Run the planner page, then the schedules page. For each, write down the score and how many items are in each group. Open two or three failures and read what the tool says." },
    { "title": "Log the problems", "min": 8, "text": "Add each real problem to the log. If you are not sure it is real, mark it with a question mark and check it in the next station.", "widget": "issuelog" },
    { "title": "Name what it cannot see", "min": 5, "text": "Write three things the score says nothing about. Think of the PDFs, the result of a search in the planner, and using the page with the keyboard only." },
    { "title": "Hand over", "min": 2, "text": "Pass your log and your three limits to whoever is on the plugin station. In a team of two or three, that is you." }
  ],
  "checks": { "title": "Before you move on", "items": [
    "Score and counts noted for two pages.",
    "At least three problems in the log.",
    "Three limits of the tool written down."
  ] },
  "good": { "title": "What good looks like", "items": [
    "Two pages, two scores, a short list of failures in plain words.",
    "A clear sentence such as: a high score means the tool found no failures it can detect, not that the page is accessible."
  ] },
  "watch": [
    "Taking the score as the verdict.",
    "Testing only the home page.",
    "The tool checks the page as it loads. It does not run your search in the planner.",
    "Copying the tool's wording without saying who the problem hurts."
  ],
  "output": ["Scores for the planner and schedules pages", "First entries in the issue log", "Three limits of automatic checks"],
  "teacher": [
    "Ask: if the score is 10, can a blind user plan a trip? Let them argue.",
    "Point to the legal point in the resources, without saying which law applies."
  ]
},

"s1-build": {
  "intro": "Build the test. This is the longest job in the sprint. Make it short, clear and checked.",
  "parts": [
    { "title": "Create the project", "min": 5, "text": "Open Loop11 and create a new website test. Name it with your team number. Use no personal data in names or texts. Follow the task and project pages in the documentation if a menu name differs." },
    { "title": "Add the tasks", "min": 10, "text": "For each task paste the scenario text. Set the start page. Start from the Metro home page for the first task so you see how people find the planner. Set the success rule you decided. For the PDF task, use an answer question with four choices." },
    { "title": "Add the questions", "min": 8, "text": "After each task add a short ease rating. After the last task add the System Usability Scale. Add one open question: what was the hardest part? Keep the whole test short." },
    { "title": "Set up the recording", "min": 5, "text": "Turn on screen recording. Write the welcome text. Say that the site is tested, not the person, and that the screen will be recorded. Ask participants to allow screen sharing when the browser asks, and to use the same browser you did." },
    { "title": "Preview and test it", "min": 7, "text": "Run it yourself as a participant. Give a wrong answer once and a correct answer once to see that success is judged right. Time the run. If it is over fifteen minutes, cut something." },
    { "title": "Get the link ready", "min": 5, "text": "Copy the participant link. Open it in a private window to see what a participant sees. Pass it to the team that takes your test, the way you agreed." }
  ],
  "checks": { "title": "Test is ready when", "items": [
    "Every task is a goal in a situation, with a start page.",
    "Each success rule gives the right result for a correct and a wrong answer.",
    "Ease rating after tasks, SUS at the end, one open question.",
    "Recording on, with a clear welcome text.",
    "A full run takes about fifteen minutes or less.",
    "The link works in a private window."
  ] },
  "good": { "title": "What good looks like", "items": [
    "A test a stranger can run without asking anything.",
    "A PDF question where a wrong answer is possible and a right answer needs the timetable."
  ] },
  "watch": [
    "In earlier editions several teams set a success check wrongly and found out only when the results came. Test with a wrong answer.",
    "A free trial may limit how many sessions you can collect. Check the limits in your account.",
    "Menu names change. Trust the live screen and the documentation.",
    "Participants who allow no recording. Say in the welcome text how to continue."
  ],
  "output": ["A working Loop11 test", "The participant link", "The correct answers, kept private from the next team"],
  "teacher": [
    "Check one success rule per team with a wrong answer.",
    "Ask if the link can be shared the way agreed."
  ]
},

"s1-plugin": {
  "intro": "Use Accessibility Insights for Web for a deeper look. It adds guided manual checks to the automatic ones. You do some checks with your own hands.",
  "parts": [
    { "title": "Install and open", "min": 5, "text": "Install Accessibility Insights for Web in Chrome. Open the planner page, then start the extension. If it does not respond, close its panel, reload the page and open it again." },
    { "title": "Run FastPass", "min": 10, "text": "Run FastPass on the planner page and on the schedules page. It runs automatic checks and a check of tab stops. Then press Tab through the planner using only the keyboard. Can you reach every field, see where you are, and leave each field?" },
    { "title": "Run part of the Assessment", "min": 15, "text": "The Assessment is a long guided list. You do not have time for all of it. Choose at least three parts that matter for a trip planner: keyboard, forms and labels, colour contrast, headings and landmarks. Mark each requirement as pass or fail as the tool asks, and read the explanation before you decide." },
    { "title": "Add checks by hand", "min": 7, "text": "Zoom the page to 200 percent, then 400 percent. Does the planner still work, without sideways scrolling? Open one timetable PDF. Try to select text. Try Ctrl+F for a station name. Look at the document title. Report what you see, not what you expect." },
    { "title": "Log it", "min": 3, "text": "Put each real problem in the log. Say who it hurts. Look up any WCAG rule you name.", "widget": "issuelog" }
  ],
  "checks": { "title": "Before you move on", "items": [
    "FastPass run on two pages.",
    "Keyboard-only trip through the planner attempted and noted.",
    "At least three Assessment parts done.",
    "Zoom check and PDF check done.",
    "Log updated, each entry with who it hurts."
  ] },
  "good": { "title": "What good looks like", "items": [
    "A list where each problem says what you saw, how you found it, which rule it may break and who it hurts.",
    "At least one problem found by hand that the automatic tools did not report."
  ] },
  "watch": [
    "Counting every warning as a failure. Check it first.",
    "The plugin is a helper. A pass in the tool is not a pass for people.",
    "Writing a rule number from memory. Look it up in WCAG 2.2.",
    "Claiming the PDFs are inaccessible without testing them. Test, then say what you saw."
  ],
  "output": ["Plugin results for two pages", "Notes from keyboard, zoom and PDF checks", "An issue log with who each problem hurts"],
  "teacher": [
    "Help with the plugin start-up problem. It is common.",
    "Ask for one problem the tools did not find."
  ]
},

"s1-check": {
  "intro": "Ten minutes where both sub-teams meet. B tells A what could break the test. Then you decide: go or fix.",
  "parts": [
    { "title": "B briefs A", "min": 4, "text": "Sub-team B names the three barriers that could break the test for some participants. Example: a planner that cannot be used by keyboard breaks the task for anyone who relies on it. The large timetable PDF is also heavy. Load it yourself, and see how long it takes." },
    { "title": "Go or no-go", "min": 4, "text": "Go through the list. Every item must be true before you pass the link." },
    { "title": "Decide and assign", "min": 2, "text": "Go, or write a short fix list with a name next to each item. Then pass the link." }
  ],
  "checks": { "title": "Go or no-go", "items": [
    "Every task is a goal in a situation.",
    "Each success rule was tried with a wrong and a right answer.",
    "Recording is on and the welcome text says so.",
    "SUS and an ease rating are in.",
    "A full run takes about fifteen minutes or less.",
    "The link works in a private window.",
    "The test asks for no personal data."
  ] },
  "good": { "title": "What good looks like", "items": [
    "A short, honest conversation, with a fix list when needed.",
    "B's findings change at least one decision in A's test."
  ] },
  "watch": [
    "Launching with an untested success rule.",
    "Talking about the tasks with the team that takes your test.",
    "Skipping this checkpoint because time is short."
  ],
  "output": ["A launched test link, or a fix list with owners"],
  "teacher": [
    "Ask each team: what did B tell A?",
    "If a team has no fix list, ask what they did not check."
  ]
},

"s1-run": {
  "intro": "Be a participant for the next team. Then watch your own results arrive. Do not talk about the tasks until all runs are finished.",
  "parts": [
    { "title": "Get set", "min": 3, "text": "Open the link of the test you take. Use your own laptop and the browser you were told to use. Close other tabs. Do not read the tasks aloud to teammates." },
    { "title": "Take the test", "min": 15, "text": "Everyone does it alone, as a visitor who really needs the answer. Do not use any knowledge from the lab. If the test lets you stop, stop when you would really give up." },
    { "title": "Write what you felt", "min": 5, "text": "Right after, write three lines for yourself: what was easy, what confused you, what you would tell the team. Keep it private until the end of the lab." },
    { "title": "Watch your own results", "min": 12, "text": "Sub-team A: open your results. How many sessions are complete? Do the success checks look right? Watch two or three recordings, and note where people stop or go back. Sub-team B: watch the same recordings and log the barriers you see, for example a long wait on the PDF, or a problem with zoom or keyboard.", "widget": "issuelog" },
    { "title": "Name surprises", "min": 5, "text": "Write three surprises about the website. Write one problem in your own test, for example a confusing task or a wrong success rule." }
  ],
  "checks": { "title": "Before the sprint ends", "items": [
    "You took the other team's test, alone and in full.",
    "You have your private notes from the run.",
    "You know how many of your own sessions are complete.",
    "Three surprises and one problem in your own test are written down."
  ] },
  "good": { "title": "What good looks like", "items": [
    "A first sense of where people lose time, before the numbers are read.",
    "A flaw in your own test named openly."
  ] },
  "watch": [
    "Talking about the tasks while others are still running the test.",
    "Taking the test as someone who already knows the answer. Say so in your notes.",
    "Too few sessions. Do not worry. Read what you have in Sprint 2 and say so in the talk.",
    "Deciding which sessions count. Choose a rule now: complete sessions only, or all."
  ],
  "output": ["Your private run notes", "First view of your own results", "Three surprises and one test flaw"],
  "teacher": [
    "Check that every team has a partner team and a working link.",
    "Walk past screens. Remind teams not to share the tasks."
  ]
},

"s1-buffer": {
  "intro": "Ten minutes for what ran late. Then save what you will need after the break.",
  "parts": [
    { "title": "Finish what is open", "min": 5, "text": "Finish any unfinished set-up, run or log. The rest of the team can help." },
    { "title": "Save for next time", "min": 5, "text": "Copy your issue log into your team notes. Write down where your Loop11 project is and how many sessions it has. Note your private run notes." }
  ],
  "checks": { "title": "Saved", "items": [
    "The issue log is copied to your team notes.",
    "The Loop11 project is easy to find.",
    "Private run notes are kept."
  ] },
  "good": { "title": "What good looks like", "items": [
    "Everything is in one place your team can open next time."
  ] },
  "watch": [
    "This page does not store your work. Closing it removes the log.",
    "Putting names or personal data in shared notes."
  ],
  "output": ["Saved log and notes"],
  "teacher": ["Use this time to help the slowest teams."]
}

});
