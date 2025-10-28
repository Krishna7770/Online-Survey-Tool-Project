import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { SurveyProvider } from './context/SurveyContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Wrap the whole app so that all children can use SurveyContext */}
    <SurveyProvider>
      <App />
    </SurveyProvider>
  </React.StrictMode>,
)
