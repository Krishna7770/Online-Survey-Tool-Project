import React, { useEffect, useState } from 'react'
import { useSurvey } from '../context/SurveyContext'
import RadarPageSummary from './RadarPageSummary'

// ------------------- FINAL SUMMARY PAGE -------------------
const FinalSummaryPage: React.FC = () => {
  const { answers } = useSurvey()

  // Local state to store survey JSON data
  const [surveyData, setSurveyData] = useState<any | null>(null)

  // Fetch JSON dynamically from public folder
  useEffect(() => {
    fetch('/surveyConfig.json')
      .then((res) => res.json())
      .then((data) => setSurveyData(data))
      .catch((err) => console.error('Error loading summary JSON:', err))
  }, [])

  // Wait for data to load
  if (!surveyData) {
    return <p>Loading summary...</p>
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* ------------------- SURVEY TITLE ------------------- */}
      <h2>{surveyData.title} – Summary Report</h2>
      <p>This report shows all your answers and calculated averages.</p>

      {/* ------------------- LOOP THROUGH ALL PAGES ------------------- */}
      {surveyData.pages
        .filter((p: any) => !p.isSummaryPage)
        .map((page: any) => (
          <div key={page.pageId} style={{ marginBottom: '40px' }}>
            <h3 style={{ color: '#007bff' }}>{page.title}</h3>

            {/* Show radar chart for numeric results */}
            <RadarPageSummary categories={page.categories} />

            {/* ------------------- SHOW ALL QUESTIONS & ANSWERS ------------------- */}
            {page.categories.map((cat: any) => (
              <div
                key={cat.categoryId}
                style={{
                  marginTop: '20px',
                  background: '#fafafa',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                }}
              >
                <h4 style={{ marginBottom: '10px' }}>{cat.title}</h4>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {cat.questions.map((q: any) => {
                    const ans = answers[q.questionId]
                    return (
                      <li
                        key={q.questionId}
                        style={{
                          marginBottom: '6px',
                          padding: '6px 0',
                          borderBottom: '1px dotted #ccc',
                        }}
                      >
                        <strong>{q.label}</strong>
                        <br />
                        <span style={{ color: '#333' }}>
                          {ans !== undefined && ans !== ''
                            ? ans.toString()
                            : 'No answer'}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        ))}

      {/* ------------------- PRINT BUTTON ------------------- */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button
          onClick={() => window.print()}
          style={{
            padding: '10px 20px',
            borderRadius: '6px',
            border: '1px solid #aaa',
            backgroundColor: '#f1f1f1',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Print / Save as PDF
        </button>
      </div>
    </div>
  )
}

export default FinalSummaryPage
