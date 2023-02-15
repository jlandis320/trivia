import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getGenQuestions } from "../../services/api-calls";

const General = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  // state stores the question data from OpenTrivia DB
  useEffect(() => {
    const fetchQuestions = async () => {
      const questionData = await getGenQuestions();
      setQuestions(questionData.results); 
    };
    fetchQuestions(); 
  }, []);
  
  // combine the correct answer and the incorrect answers together and mix them up
  let shuffledAnswers = questions.map(question => {
    let answerArray = [question.correct_answer, question.incorrect_answers[0], question.incorrect_answers[1], question.incorrect_answers[2]] 
    return shuffle(answerArray)
  })

  // Fisher-Yates shuffle to mix up answer options
  function shuffle(array) {
    var m = array.length, t, i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  // construct new obj consisting  of question, correct answer, and answer options
  let questionObj = questions.map((question, i) => {
    return {
    question: question.question, 
    correctAnswer: question.correct_answer, 
    answerOptions: shuffledAnswers[i]
  }
  })

  // collects all the correct answers into one array
  let answerKey = questions.map(question => question.correct_answer)

  // check answer against answersheet
  function checkAnswer(evt){
    let selection = evt.target.innerHTML
    if (answerKey.includes(selection)){
      console.log("correct!")
    } else {
    console.log("incorrect!")
    }
  }

  return (
    <>
      <h1>I'm the general page</h1>
      <button onClick={() => navigate(-1)}>Go Back</button>
        {questionObj.map((question, idx) => (
          <section key={idx}>
            <h3>{question.question}</h3>
            <button className="answerBtn" onClick={checkAnswer}>{question.answerOptions[0]}</button>
            <button className="answerBtn" onClick={checkAnswer}>{question.answerOptions[1]}</button>
            <button className="answerBtn"onClick={checkAnswer}>{question.answerOptions[2]}</button>
            <button className="answerBtn" onClick={checkAnswer}>{question.answerOptions[3]}</button>
          </section>
        ))}
    </>
  );
};

export default General;
