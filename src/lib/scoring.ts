//import { useSurvey } from '../context/SurveyContext'

// --- small helper type ---
interface Category {
  categoryId: string
  title: string
  questions: {
    questionId: string
    label: string
    type: string
    scoringGroup?: string | null
  }[]
  children?: Category[]
}

// This function goes through a page's categories and returns averages per scoringGroup
export function computePageScores(
  categories: Category[] | undefined,
  allAnswers: { [qid: string]: any }
): { [group: string]: number } {
  const groups: { [group: string]: number[] } = {}

  // go through each category
  categories?.forEach((cat) => {
    cat.questions.forEach((q) => {
      const val = allAnswers[q.questionId]
      // only count numeric answers (slider, dropdown, radio)
      if (typeof val === 'number' && q.scoringGroup) {
        if (!groups[q.scoringGroup]) groups[q.scoringGroup] = []
        groups[q.scoringGroup].push(val)
      }
    })

    // handle nested sub-categories (if any)
    cat.children?.forEach((sub) => {
      sub.questions.forEach((q) => {
        const val = allAnswers[q.questionId]
        if (typeof val === 'number' && q.scoringGroup) {
          if (!groups[q.scoringGroup]) groups[q.scoringGroup] = []
          groups[q.scoringGroup].push(val)
        }
      })
    })
  })

  // compute averages
  const result: { [group: string]: number } = {}
  Object.entries(groups).forEach(([group, values]) => {
    const avg = values.reduce((a, b) => a + b, 0) / values.length
    result[group] = Math.round(avg)
  })

  return result
}
