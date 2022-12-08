import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getGenQuestions } from "../../services/api-calls";

const General = () => {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionData = await getGenQuestions();
      setQuestions(questionData.results);
    };
    fetchQuestions();
  }, []);

  return (
    <>
      <h1>I'm the general page</h1>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
};

export default General;
