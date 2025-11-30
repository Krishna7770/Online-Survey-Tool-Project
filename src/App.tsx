// Import main styles and React utilities
import './App.css'
import { useState, useEffect } from 'react'

// Import page components
import SurveyPage from './components/SurveyPage'
import FinalSummaryPage from './components/FinalSummaryPage'

// NEW: Import the survey loader hook
import { useSurvey } from './hooks/useSurvey'

// ------------------- MAIN APP COMPONENT -------------------
function App() {
  // Load survey from PHP (qid = 1)
  const { survey: surveyData, loading } = useSurvey(1)

  // Track which page is active
  const [currentPageId, setCurrentPageId] = useState<string>('')

  // When surveyData loads AND currentPageId is empty → set first page automatically
  useEffect(() => {
    if (surveyData && surveyData.pages && surveyData.pages.length > 0) {
      if (!currentPageId) {
        setCurrentPageId(surveyData.pages[0].pageId)
      }
    }
  }, [surveyData, currentPageId])

  // Show loading screen until survey data arrives
  if (loading || !surveyData) {
    return <p>Loading survey...</p>
  }

  // Find currently selected page
  const currentPage = surveyData.pages.find(
    (p: any) => p.pageId === currentPageId
  )

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
        {surveyData.pages.map((page: any) => (
          <button
            key={page.pageId}
            onClick={() => setCurrentPageId(page.pageId)}
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
