import React from 'react'
import { useSurvey } from '../context/SurveyContext'
import { computePageScores } from '../lib/scoring'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts'

interface PageProps {
  categories?: any
}

const RadarPageSummary: React.FC<PageProps> = ({ categories }) => {
  const { answers } = useSurvey()
  const scores = computePageScores(categories, answers)

  const data = Object.entries(scores).map(([group, val]) => ({
    group,
    value: val
  }))

  if (data.length === 0) {
    return <p>Fill numeric questions to see chart.</p>
  }

  return (
    <div style={{
    width: '100%',
    minHeight: '320px',
    height: '320px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    background: '#f8f8f8'
  }}>
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="group" />
        <PolarRadiusAxis angle={30} domain={[0, 5]} />
        <Radar dataKey="value" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  </div>
  )
}

export default RadarPageSummary