
export default function Question({questionData, handleAnswerClick, checkingAnswers}) {
    

    function getAnswerClass(index) {
        if (!checkingAnswers) {
            return index===questionData.selectedAnswer ? "selected" : ""
        } else if (index === questionData.correctAnswerIndex) {
            return "correct-answer"
        } else if (index === questionData.selectedAnswer) {
            return "selected-wrong"
        } else {
            return ""
        }
        
        
    }

    return (
        <div className="question-and-answers" index={questionData.index}>
            <p className="question">{questionData.question}</p>
            <div className="answers">
                {

                    questionData.answers.map((answer, index) => {
                        return (
                            <p className={`answer ${getAnswerClass(index)}`} key={index}
                                onClick={(event) => handleAnswerClick(event, index)}  >
                                {answer}
                            </p>
                        )
                    })
                }
            </div>
            <hr/>
        </div>

    )
}