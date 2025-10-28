import React from 'react'
import { useSurvey } from '../context/SurveyContext'
import RadarPageSummary from './RadarPageSummary'
import surveyData from '../data/surveyConfig.json'

const FinalSummaryPage: React.FC = () => {
  const { answers } = useSurvey()

  return (
    <div style={{ padding: '20px' }}>
      <h2>{surveyData.title} – Summary</h2>

      {/* Loop through pages (skip summary itself) */}
      {surveyData.pages
        .filter((p) => !p.isSummaryPage)
        .map((page) => (
          <div key={page.pageId} style={{ marginBottom: '30px' }}>
            <h3>{page.title}</h3>
            <RadarPageSummary categories={page.categories} />
          </div>
        ))}

      <hr />
      <h3>Text Answers</h3>
      <ul>
        {Object.entries(answers).map(([qid, val]) =>
          typeof val === 'string' ? <li key={qid}>{val}</li> : null
        )}
      </ul>

      <button onClick={() => window.print()}>Print / Save as PDF</button>
    </div>
  )
}

export default FinalSummaryPage
