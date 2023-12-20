import React, { useState, useEffect } from 'react'
import './App.css'
import data from './assets/data';


function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const question = data[currentQuestion];
  const [showFinalResults, setShowFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [showCorrectAns, setShowCorrectAns] = useState(null);
  
 
  const startBtn = () =>{
    setQuizStarted(true);
  }

  const optionClicked = (isCorrect) =>{
    //reset timer
    setTimer(10);
    //show correct answer
    setShowCorrectAns(true);
    // add score
    if (isCorrect) {
      setScore(score+1);
    }
    // move to next question
    if (currentQuestion +1 < data.length) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion +1);
        //reset correct answer
        setShowCorrectAns(false);
      }, 700);
    } else {
      setShowFinalResults(true);
      setTimer(0);
    }
  } 

  const restartBtn = () =>{
    setScore(0);
    setCurrentQuestion(0);
    setShowFinalResults(false);
    setTimer(10);
    setShowCorrectAns(null);
  }

  useEffect(() =>{
    const interval = setInterval (() =>{
      if (quizStarted) {
        setTimer((prevTimer) => prevTimer - 1);
        if (timer === 0) {
          if(currentQuestion < data.length - 1){
            setCurrentQuestion((prevQuestion) => prevQuestion +1);
            setTimer(10);
            setShowCorrectAns(false);
          }else {
            setTimer(0);
            setShowFinalResults(true);
          }
        }
      }
         
    }, 1000)
    return () => clearInterval(interval);
 }, [timer, currentQuestion, quizStarted])


  return (
    <>
    <header className="header">
      <div><p className='text'>Score: {score}</p></div>
      <div><p className='text'>Time: {timer}</p></div>
    </header>
    { !quizStarted ? 
    <div className='card'>
    <h1>Quiz Challenge
    </h1>
    <p>Try to answer the following question correctly within the time limit. You have 10 seconds for each question</p>
    <button className='btn' onClick={startBtn}>Start Quiz</button> 
  </div> 
    :
    <div>
    {showFinalResults ?
    <div className='finalResult'>
      <h3>Final Results</h3>
      <p>You score {score} out of {data.length} questions <br/> Grade - {(score/data.length) * 100}%</p>
      <button className='btn' onClick={restartBtn}>Restart</button>  
    </div>
      : <div className='card'> 
      <p>Question {currentQuestion +1} out of {data.length}</p> 
        <h2>{question.question}</h2>
        <ul>
          {question.options.map((option) => (<li key={option.id} onClick={() =>optionClicked(option.isCorrect)} className='optionList' style={{backgroundColor: showCorrectAns && option.isCorrect ? 'green' : '' }} >{option.text}</li> ))}
        </ul>
      </div>
    }
    </div>
     
    }
    <footer>
      <p> Coded with love by Ojo Damilola <span>&copy; 2023</span> </p>
    </footer>
    
    </>
  );
}

export default App;
