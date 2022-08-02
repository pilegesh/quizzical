

import React from "react"

export default function IntroScreen(props) {

    return (
        <div className="introScreen">
            <h1>Qizzical</h1>
            <p className="sub-title">A trivia game</p>
            <button onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}