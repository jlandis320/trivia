import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getGenQuestions } from "../../services/api-calls";

const General = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  
  useEffect(() => {
    const fetchQuestions = async () => {
      const questionData = await getGenQuestions();
      setQuestions(questionData.results); 
    };
    fetchQuestions(); 
  }, []);
  
  let shuffledAnswers = questions.map(question => {
    let answerArray = [question.incorrect_answers[0], question.correct_answer, question.incorrect_answers[1], question.incorrect_answers[2]] 
    return shuffle(answerArray)
  })
  // Fisher-Yates shuffle to mix up answer options
  function shuffle(array) {
    var m = array.length,
      t,
      i;

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  let questionObj = questions.map((question, i) => {
    return {
    "question": question.question, 
    "correct_answer": question.correct_answer, 
    "answer_options": shuffledAnswers[i]
  }
  })
  console.log(questionObj)

  return (
    <>
      <h1>I'm the general page</h1>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <section>
        {questionObj.map((question, idx) => (
          <section key={idx}>
            <h3>{question.question}</h3>
            <button>{question.answer_options[0]}</button>
            <button>{question.answer_options[1]}</button>
            <button>{question.answer_options[2]}</button>
            <button>{question.answer_options[3]}</button>
          </section>
        ))}
      </section>
    </>
  );
};

export default General;
