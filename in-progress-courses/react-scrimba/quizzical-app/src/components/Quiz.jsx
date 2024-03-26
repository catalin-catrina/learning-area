import React from "react";
import decode from "html-entities-decoder";
import { useState, useEffect } from "react";

function Quiz() {
  const [data, setData] = useState();
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    const getQuizesData = async () => {
      const req = await fetch(
        "https://opentdb.com/api.php?amount=5&category=13&difficulty=easy&type=multiple"
      );
      const res = await req.json();
      setData(() => {
        const newResults = res.results?.map((el) => {
          let answers = [...el.incorrect_answers];
          answers.push(el.correct_answer);

          answers.sort(() => Math.random() - 0.5);
          return {
            ...el,
            answers: answers,
          };
        });
        console.log(newResults);
        return newResults;
      });
    };
    getQuizesData();
  }, []);

  let page;
  if (data) {
    page = data.map((el, index) => (
      <div key={index} className="question__container">
        <h2 className="question__title">{decode(el.question)}</h2>
        <div className="question__answers">
          {el.answers.map((el, i) => (
            <button
              key={i}
              className="answer"
              onClick={() => selectAnswer(el, index)}
            >
              {decode(el)}
            </button>
          ))}
        </div>
      </div>
    ));
  }

  const selectAnswer = (answer, index) => {
    const newAnswer = [answer, index];
    setSelectedAnswers([...selectedAnswers, newAnswer]);
  };

  const handleCheck = () => {
    console.log(selectedAnswers);
  };

  return (
    <div>
      {page}
      <hr />
      <button className="submit" onClick={handleCheck}>
        Check Answers
      </button>
    </div>
  );
}

export default Quiz;
