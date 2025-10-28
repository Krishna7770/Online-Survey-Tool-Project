import './App.css'
import { useState } from 'react'
import surveyData from './data/surveyConfig.json'
import SurveyPage from './components/SurveyPage'
import FinalSummaryPage from './components/FinalSummaryPage'

// Our main App component
function App() {
  
  // This keeps track of which page is currently selected
  const [currentPageId, setCurrentPageId] = useState(surveyData.pages[0].pageId)

  // Find the currently selected page object
  const currentPage = surveyData.pages.find((p) => p.pageId === currentPageId)

  return (
    <div style={{ padding: '20px' }}>
      {/* Survey title */}
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
        {surveyData.pages.map((page) => (
          <button
            key={page.pageId}
            onClick={() => setCurrentPageId(page.pageId)} // switch to this page
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

      {/* Render either a survey page or the summary page */}
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
