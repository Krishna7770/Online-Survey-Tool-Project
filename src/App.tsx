import './App.css'
import surveyData from './data/surveyConfig.json'
import SurveyPage from './components/SurveyPage'

function App() {

  // find the first normal page (not the summary/print page)
  // .find() searches the array and returns the first element that matches the condition
  // p => !p.isSummaryPage  means: "pick the first page where isSummaryPage is NOT true"
  const firstPage = surveyData.pages.find((p) => !p.isSummaryPage)

  return (
    <div style={{ padding: '20px' }}>
      {/* show the main survey title */}
      <h1>{surveyData.title}</h1>

      {/* if firstPage exists, show it; otherwise show fallback text */}
      {firstPage ? (
        <SurveyPage page={firstPage} />
      ) : (
        <p>No normal page found in survey.</p>
      )}
      
    </div>
  )
}

export default App
