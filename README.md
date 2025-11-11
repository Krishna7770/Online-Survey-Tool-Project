-------------------------------Online Survey Tool - Phase 1 Developer Manual-------------------------------

Project Title: Online Survey Tool (Phase 1)
Author(s): Krishna Kumar Sah and Gandiv Koirala
Goal of Phase 1: A dynamic browser-based survey app with live results and printable summary, powered by JSON (no backend)
________________________________________
Table of Contents
1.	Overview of the Project
2.	surveyConfig.json (Survey Definition / Content Brain)
3.	SurveyContext.tsx (Global Answers Memory)
4.	QuestionField.tsx (Dynamic Question Renderer)
5.	SurveyPage.tsx (A Single Page of the Survey)
6.	scoring.ts (How Scores / Averages Are Calculated)
7.	RadarPageSummary.tsx (Live Radar Chart Display)
8.	FinalSummaryPage.tsx (Printable Report Page)
9.	App.tsx (Tabs / Navigation Across Pages)
10.	main.tsx (Bootstrapping the App with Context)
11.	How To Change the Survey Topic / Questions
12.	How To Explain This Project to a Teacher
13.	How This App Grows in Phase 2 and Phase 3
________________________________________
1. Overview of the Project
What this tool is
This is an online survey tool. Users answer questions in the browser, and while they're answering, the tool:
•	Shows their answers
•	Calculates category scores
•	Draws a live radar chart (spider chart)
•	Builds a final summary page which can be printed or saved as PDF
No login, no backend, no database in Phase 1.
What makes this special (important for grading)
The content (questions, pages, category names, etc.) is not hardcoded in React.
Instead, it lives in a JSON file (surveyConfig.json).
That means:
•	If we want a totally new survey (like “Employee Satisfaction” instead of “Digital Readiness”), we don’t change React code. We only edit the JSON.
How the whole thing flows (high level story)
1.	surveyConfig.json describes the survey: pages → categories → questions.
2.	App.tsx loads that JSON, shows tabs for each page, and decides which page is on screen.
3.	SurveyPage.tsx renders one page: shows categories and each question.
4.	For each question, QuestionField.tsx decides which input to show (text, slider, dropdown, etc.).
5.	When the user types/chooses an answer, we store that answer in SurveyContext.tsx, which is like global memory for the whole app.
6.	RadarPageSummary.tsx reads the answers, calculates averages using scoring.ts, and plots a radar chart live.
7.	FinalSummaryPage.tsx shows all results and has a Print / Save as PDF button.
This matches everything in the Phase 1 brief:
•	Dynamic content from JSON ✅
•	Any number of pages, categories, questions ✅
•	Live result visualization per page ✅
•	Final summary tab, printable ✅
________________________________________
2. surveyConfig.json (Survey Definition / Content Brain)
Where is it: src/data/surveyConfig.json
What it is: A pure data file. No logic, only structure.
This file defines:
•	Survey title
•	Pages (tabs)
•	Categories inside each page
•	Questions inside each category
•	What type each question is
•	Which score group it contributes to
Important fields to understand:
•	"type": tells React what input to render (text, slider, dropdown, radio, date, xy).
•	"scoringGroup": tells the scoring system which "axis" this question belongs to in the radar chart.
Example: all questions with "scoringGroup": "vision" will be averaged together → “vision” score.
Why this file is critical:
•	Later we can swap just this JSON and turn your app into a different survey.
•	In Phase 2, PHP will generate THIS JSON from a database.
•	we built the UI in such a way that it doesn’t care what the topic is.
________________________________________
3. SurveyContext.tsx (Global Answers Memory)
Where is it: src/context/SurveyContext.tsx
What it is: Shared memory for the whole app.
In React, normally each component keeps its own state.
But in our app:
•	The question input needs to save the answer.
•	The radar chart needs to read that answer.
•	The summary page also needs that answer.
So we made one "global notebook" using React Context.
Key ideas inside this file:
•	We create a React Context object.
•	We create a SurveyProvider that stores answers in useState.
•	We give every component access to answers and setAnswer(...).
Conceptually:
const [answers, setAnswers] = useState({});
When the user answers question "q4", we do:
setAnswer("q4", 5)
Now any component in the app can read answers["q4"].
Why this matters:
•	The radar chart can update live using the same data.
•	The final summary page can show all answers together.
•	We do NOT need a database. All answers live in memory while the app is open.
How the Provider is given to the whole app:
In main.tsx, we wrap <App /> with <SurveyProvider>, so the entire app can access the same shared answers.
________________________________________
4. QuestionField.tsx (Dynamic Question Renderer)
Where is it: src/components/QuestionField.tsx
What it does:
Given one question object (from the JSON), it decides which input to show.
For example, if the question is:
{ "type": "slider", "min": 1, "max": 5, ... }
Then we render:
<input type="range" ... />
If the question is:
{ "type": "dropdown", "options": [ { "value": 1, "text": "No" }, ... ] }
We render:
<select>...</select>
So instead of hand-coding every question, we let the JSON drive the UI.
Why this is powerful:
•	You can add new questions in JSON.
•	You can reorder questions.
•	You can rename questions.
•	You don’t have to touch React code each time.
Also:
Each input calls setAnswer(questionId, value) from the context.
So the user’s answers immediately enter global state.
This is exactly the behavior you need for:
•	live radar chart
•	summary page
•	printable PDF
________________________________________
5. SurveyPage.tsx (A Single Page of the Survey)
Where it is: src/components/SurveyPage.tsx
What it does:
•	Takes one survey page (from JSON).
•	Displays the page title and intro text.
•	Loops through all categories on that page.
•	For each category, loops through all questions.
•	For each question, renders a <QuestionField /> (the correct input).
•	Shows a live radar chart summary for that page.
So visually:
Page → Categories → Questions → Inputs
and a “Live Summary” area on the same screen.
This matches the requirement:
“The system should be able to display the current results dynamically as the questions are being answered (i.e. the ‘report part’ is updated as answers are given).”
The report part = that radar chart and summary block.
________________________________________
6. scoring.ts (How Scores / Averages Are Calculated)
Where it is: src/lib/scoring.ts
Why it exists:
The assignment says:
•	Each category’s result is “the average of the answers for each question within that category rounded normally.”
•	Only numeric answers should be included (slider, dropdown, radio).
•	Text answers are not plotted on the radar.
This file:
•	Goes through all questions in the page.
•	Collects numeric answers grouped by scoringGroup.
•	Calculates the average for each group.
•	Rounds the average using Math.round to match “normal rounding rules.”
Example:
If 3 questions belong to "vision" and the user answered 4, 5, and 3:
•	Average = (4+5+3)/3 = 4
•	Rounded = 4
•	So category "vision" gets a score of 4/5.
This score is what we show in the radar chart.
This logic is what turns raw answers into something visual.
________________________________________
7. RadarPageSummary.tsx (Live Radar Chart Display)
Where it is: src/components/RadarPageSummary.tsx
What it does:
•	Gets answers from SurveyContext.
•	Uses computePageScores(...) from scoring.ts.
•	Converts those scores into a data format that recharts understands.
•	Renders a live RadarChart.
This means:
•	When you drag a slider or pick a dropdown option, the chart updates instantly without refreshing.
•	The user sees their “profile” developing page by page.
Why radar?
•	The requirement / examples from your assignment (like the KIITO tool) use radar charts to show relative strength across categories.
•	Radar charts are really good at saying “You’re strong in culture (5), weak in process (2), middle in strategy (3).”
Note:
We wrapped the chart container <div> with a fixed height so Recharts knows how big to draw. Without a known height, Recharts complains in console.
________________________________________
8. FinalSummaryPage.tsx (Printable Report Page)
Where it is: src/components/FinalSummaryPage.tsx
What it does:
•	Shows a summary of all pages (except the summary/print page itself).
•	For each real page, it reuses the same RadarPageSummary chart.
•	Shows all text answers the user entered (like freeform comments / plans).
•	Shows a button:
Print / Save as PDF
That button just calls:
window.print()
Modern browsers let the user choose “Save as PDF” in that print dialog — so we meet the requirement:
“Also, the results from each page is summarized in one final page (or tab), which is the page that can be printed out as a PDF.”
So this page is literally your “report” tab for Phase 1 evaluation.
In the viva, when you click that button and show “Save as PDF”, that’s a big ✅.
________________________________________
9. App.tsx (Tabs / Navigation Across Pages)
Where it is: src/App.tsx
What it does:
•	Imports the entire survey data from surveyConfig.json.
•	Makes a navigation bar (buttons) for each page in the survey.
•	Keeps track of which page is currently selected using useState.
•	Renders either:
o	<SurveyPage /> (for normal pages), or
o	<FinalSummaryPage /> (for the summary/print page)
Why this matters:
•	If you add more pages to the JSON, you automatically get more buttons in the navbar.
•	No code rewrite. No hardcoding page names.
You basically built a mini dynamic tab system.
________________________________________
10. main.tsx (Bootstrapping the App with Context)
Where it is: src/main.tsx
What it does:
•	This is where React actually starts.
•	Renders <App /> into the root <div> in index.html.
•	Wraps <App /> inside <SurveyProvider>.
Why wrapping matters:
If you don’t wrap the app in the provider, components won’t be able to use useSurvey() and won’t share answer state.
With wrapping, everything in the app can read and write answers.
So main.tsx is like:
“Start the app and give it a shared memory notebook.”

