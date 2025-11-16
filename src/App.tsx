// Import main styles and React utilities
import './App.css'
import { useEffect, useState } from 'react'

// Import page components
import SurveyPage from './components/SurveyPage'
import FinalSummaryPage from './components/FinalSummaryPage'

// ------------------- MAIN APP COMPONENT -------------------
function App() {
  // This will store the entire survey data loaded from JSON
  const [surveyData, setSurveyData] = useState<any | null>(null)

  // This keeps track of which page (tab) is currently open
  const [currentPageId, setCurrentPageId] = useState<string>('') // new state added

  // ------------------- FETCH JSON FROM PUBLIC FOLDER -------------------
  // Instead of importing the JSON directly (which was inside src),
  // now we will load it dynamically from the public folder using fetch().
  // This change also prepares us for Phase 2 where data will come from PHP.
  useEffect(() => {
    fetch('/surveyConfig.json')
      .then((res) => res.json())
      .then((data) => {
        setSurveyData(data)
        // When data loads, automatically set the first page as current
        if (data.pages && data.pages.length > 0) {
          setCurrentPageId(data.pages[0].pageId)
        }
      })
      .catch((err) => console.error('Error loading survey JSON:', err))
  }, [])

  // ------------------- SAFETY CHECK -------------------
  // If data hasn’t loaded yet, show a simple loading message.
  if (!surveyData) {
    return <p>Loading survey...</p>
  }

  // Find the currently selected page object from the survey data
  const currentPage = surveyData.pages.find((p: any) => p.pageId === currentPageId)

  return (
    <div style={{ padding: '20px' }}>
      {/* ------------------- SURVEY TITLE ------------------- */}
      <h1>{surveyData.title}</h1>

      {/* ------------------- NAVIGATION BAR ------------------- */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          flexWrap: 'wrap',
        }}
      >
        {/* Loop through each page and create a button for navigation */}
        {surveyData.pages.map((page: any) => (
          <button
            key={page.pageId}
            onClick={() => setCurrentPageId(page.pageId)} // switch to selected page
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border:
                currentPageId === page.pageId
                  ? '2px solid #007bff'
                  : '1px solid #ccc',
              backgroundColor:
                currentPageId === page.pageId ? '#e0f0ff' : '#f9f9f9',
              cursor: 'pointer',
            }}
          >
            {page.title}
          </button>
        ))}
      </div>

      {/* ------------------- PAGE CONTENT ------------------- */}
      {/* Show either:
          1. A survey question page (SurveyPage)
          2. Or the final summary page (FinalSummaryPage)
      */}
      {currentPage ? (
        currentPage.isSummaryPage ? (
          <FinalSummaryPage />
        ) : (
          <SurveyPage page={currentPage} />
        )
      ) : (
        <p>Page not found.</p>
      )}
    </div>
  )
}

export default App
