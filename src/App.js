import { useState } from 'react'
import './App.css'
import IntroScreen from './components/IntroScreen'
import QuizScreen from './components/QuizScreen'

function App() {
  const [quizScreen, setQuizScreen] = useState(false)

  const startQuiz = () => { setQuizScreen(true) }

  return (
    <div className="App">
      <div className='container'>
        {quizScreen ? <QuizScreen  />
                    : <IntroScreen  startQuiz={startQuiz} />}
        <div className='background-and-blobs'>
          <img className={`blob-top${quizScreen ? " blob-quiz" : ""}`} src={require("./img/blob-top.png")} alt="" />
          <img className={`blob-bottom${quizScreen ? " blob-quiz" : ""}`} src={require("./img/blob-bottom.png")} alt="" />
        </div>
      </div>
    </div>
  )
}

export default App
