import React, { useState } from 'react'
import Card from '../Card/Card';


const QuizCard = ({lists}) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const startBtn = () =>{
    setQuizStarted(true);
  }
  return (
    <>
      {!quizStarted ? 
      <main className='main' >
    <div className='card card-start'>
      <h1>Coding Quiz Challenge
      </h1>
      <p className='check-text'>Try to answer the following question correctly within the time limit.</p>
      <p className='check-text'>Keep in mind that incorrect answers will penalize your time/score by ten seconds</p>
      <button className='btn' onClick={startBtn}>Start Quiz</button> 
      </div>
     
      </main> : <Card lists={lists} /> }
      
    </>
  )
}

export default QuizCard
