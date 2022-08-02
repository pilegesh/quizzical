import React, { useEffect, useState } from "react"
import Question from "./Question"

export default function QuizScreen() {

    const [questions, setQuestions] = useState([])
    const [questionElements, setQuestionElements] = useState([])
    const [checkingAnswers, setCheckingAnswers] = useState(false)
    const [score, setScore] = useState(0)
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        loadQuestions()
    }, [])

    useEffect(() => {
        function handleAnswerClick(event, clickedAnswerIndex) {
            const questionIndex = event.target.parentElement.parentElement.getAttribute('index')
            const currentlySelected = questions[questionIndex].selectedAnswer
            if (currentlySelected !== clickedAnswerIndex) {
                setQuestions(prevQuestions => {
                    let newQuestions = [...prevQuestions]
                    newQuestions[questionIndex].selectedAnswer = clickedAnswerIndex
                    return newQuestions
                })
            }
        }
        setQuestionElements(questions.map((q, index) => <Question key={index} questionData={q} handleAnswerClick={handleAnswerClick} checkingAnswers={checkingAnswers} />))
    }, [questions, checkingAnswers])
    
    function loadQuestions() {
        fetch("https://opentdb.com/api.php?amount=5&encode=url3986")
        .then(res => {
            if (!res.ok) {throw new Error(`result not ok: ${res.status}`)}
            else {return res.json()}
        })            
        .then(data => {
            setQuestions(data.results.map((qData, index) => {
                const question = decodeURIComponent(qData.question)
                let answers = qData.incorrect_answers.map(ia => decodeURIComponent(ia))
                const randIndex = Math.floor(Math.random() * (answers.length+1))
                answers.splice(randIndex, 0, decodeURIComponent(qData.correct_answer))
                return {
                    index,
                    question,
                    answers,
                    correctAnswerIndex: randIndex,
                    selectedAnswer: null
                }
            }))
            setLoading(false)
        })
        .catch(err => console.log(err))
    }

    function handleCheckAnswers() {
        setCheckingAnswers(true)
        let correctAnswers = 0
        for (let q of questions) {
            if (q.selectedAnswer === q.correctAnswerIndex) {
                correctAnswers++
            }
        }
        setScore(correctAnswers)
    }

    function handlePlayAgain() {
        setLoading(true)
        setCheckingAnswers(false)
        loadQuestions()
    }

    if (!loading) {
        return (
            <div className="quizScreen">
                <div>{questionElements}</div>
                {!checkingAnswers && <div className="footer-prechecked">
                    <button onClick={handleCheckAnswers}>Check answers</button>  
                </div>}
                {checkingAnswers && <div className="footer-checked">
                    <span className="score">You scored {score}/5 correct answers</span>
                    <button onClick={handlePlayAgain}>Play again</button>
                </div>}
            </div>
        )
    }
    else {
        return
    }
}