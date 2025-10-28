import React from 'react';
import QuestionField from './QuestionField'
import RadarPageSummary from './RadarPageSummary'


//creating interfaces to make proper structure which helps with autocompletion

interface Question {
  questionId: string;
  label: string;
  type:string;
}

interface Category {
  categoryId: string;
  title: string;
  questions: Question[];
}

interface Page {
  pageId: string;
  title: string;
  introText?: string;
  isSummaryPage?: boolean;
  categories?: Category[];
}

interface Props {
  page: Page;
}

//So basically we’re drilling into the data like:
// page → categories → questions.

const SurveyPage: React.FC<Props> = ({ page }) => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginTop: '20px' }}>
      <h2>{page.title}</h2>
      {page.introText && <p>{page.introText}</p>}
        {/* loops through all the categories in that page. */}
      {page.categories?.map((cat) => (
        <div key={cat.categoryId} style={{ marginTop: '15px' }}>
          <h3>{cat.title}</h3>
          <ul>
            {/* loops through questions and displays their text. */}
            {cat.questions.map((q) => (
              <li key={q.questionId}>
                <QuestionField question={q} />
                </li>
            ))}
          </ul>
        </div>
      ))}
      <div style={{ marginTop: '30px', borderTop: '2px solid #ccc', paddingTop: '10px' }}>
      <h3>Live Summary</h3>
      <RadarPageSummary categories={page.categories} />
    </div>
    </div>
    
  );
};

export default SurveyPage;
