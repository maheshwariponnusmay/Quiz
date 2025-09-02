import React, { useRef, useState } from "react";
import "./Quiz.css";
import quizData from "../../QuizData"; 

const Quiz = () => {
  const [start, setStart] = useState(false);   
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const option_array = [option1, option2, option3, option4];
  const question = quizData[index];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === quizData.length - 1) {
        setShowResult(true);
        return;
      }
      setIndex(index + 1);
      setLock(false);
      option_array.forEach((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
      });
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setShowResult(false);
    setStart(false);   
  };

  return (
    <div className="container">
      {!start ? (
      
        <div className="welcome">
          <h1>Welcome to the Quiz </h1>
          <br></br>
          <button className="start-btn" onClick={() => setStart(true)}>
            Let’s Start
          </button>
        </div>
      ) : !showResult ? (
       
        <>
          <h1>Quiz App</h1>
          <hr />
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {quizData.length} questions
          </div>
        </>
      ) : (
       
        <div className="result">
          <h2>Quiz Completed!</h2>
          <br></br>
          <h2>
            Your Score: <b>{score}</b> / {quizData.length}
          </h2>
          <br></br>
          <button onClick={resetQuiz}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;


