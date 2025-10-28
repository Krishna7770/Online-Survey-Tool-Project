import './App.css'
import surveyData from './data/surveyConfig.json'

function App() {
  return (
    <div style={{ padding: '20px' }}>
      {/* show the main survey title */}
      <h1>{surveyData.title}</h1>

      {/* show all page titles */}
      <h2>Pages:</h2>
      <ul>
        {surveyData.pages.map((page) => (
          <li key={page.pageId}>{page.title}</li>
        ))}

        {/* alternative way 
        {surveyData.pages.map(function(page) {
            return <li key={page.pageId}>{page.title}</li>;
          })}*/}
          
      </ul>
    </div>
  )
}

export default App
