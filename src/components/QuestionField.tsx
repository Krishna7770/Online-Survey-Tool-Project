import React from 'react'
import { useSurvey } from '../context/SurveyContext'

// "question" is the object we get from the JSON
interface QuestionProps {
  question: {
    questionId: string
    label: string
    type: string
    placeholder?: string
    min?: number
    max?: number
    step?: number
    options?: { value: number; text: string }[]
    xLabel?: string
    yLabel?: string
  }
}

const QuestionField: React.FC<QuestionProps> = ({ question }) => {
  const { answers, setAnswer } = useSurvey()
  const value = answers[question.questionId] ?? ''

  // We'll render different inputs depending on "question.type"
  switch (question.type) {
    case 'text':
      return (
        <div style={{ marginBottom: '12px' }}>
          <label>{question.label}</label><br />
          <input
            type="text"
            placeholder={question.placeholder || ''}
            value={value}
            onChange={(e) => setAnswer(question.questionId, e.target.value)}
          />
        </div>
      )

    case 'slider':
      return (
        <div style={{ marginBottom: '12px' }}>
          <label>{question.label} ({value || 0})</label><br />
          <input
            type="range"
            min={question.min || 1}
            max={question.max || 5}
            step={question.step || 1}
            value={value || 0}
            onChange={(e) => setAnswer(question.questionId, Number(e.target.value))}
          />
        </div>
      )

    case 'dropdown':
      return (
        <div style={{ marginBottom: '12px' }}>
          <label>{question.label}</label><br />
          <select
            value={value}
            onChange={(e) => setAnswer(question.questionId, Number(e.target.value))}
          >
            <option value="">Select...</option>
            {question.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.text}
              </option>
            ))}
          </select>
        </div>
      )

    case 'radio':
      return (
        <div style={{ marginBottom: '12px' }}>
          <p>{question.label}</p>
          {question.options?.map((opt) => (
            <label key={opt.value} style={{ display: 'block' }}>
              <input
                type="radio"
                name={question.questionId}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => setAnswer(question.questionId, opt.value)}
              />
              {opt.text}
            </label>
          ))}
        </div>
      )

    case 'date':
      return (
        <div style={{ marginBottom: '12px' }}>
          <label>{question.label}</label><br />
          <input
            type="date"
            value={value}
            onChange={(e) => setAnswer(question.questionId, e.target.value)}
          />
        </div>
      )

    case 'xy':
      const xy = value || { x: 0, y: 0 }
      return (
        <div style={{ marginBottom: '12px' }}>
          <p>{question.label}</p>
          <label>{question.xLabel}</label>
          <input
            type="number"
            min={question.min || 1}
            max={question.max || 5}
            step={question.step || 1}
            value={xy.x}
            onChange={(e) => setAnswer(question.questionId, { ...xy, x: Number(e.target.value) })}
          />
          <br />
          <label>{question.yLabel}</label>
          <input
            type="number"
            min={question.min || 1}
            max={question.max || 5}
            step={question.step || 1}
            value={xy.y}
            onChange={(e) => setAnswer(question.questionId, { ...xy, y: Number(e.target.value) })}
          />
        </div>
      )

    default:
      return <p>Unsupported question type: {question.type}</p>
  }
}

export default QuestionField
