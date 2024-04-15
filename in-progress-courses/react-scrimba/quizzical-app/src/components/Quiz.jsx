import React from "react";
import decode from "html-entities-decoder";
import { useState, useEffect } from "react";

function Quiz() {
  const [data, setData] = useState();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [endGame, setEndGame] = useState(false);

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
        return newResults;
      });
    };
    getQuizesData();
  }, []);

  let page;
  if (data) {
    page = data.map((el, elIndex) => (
      <div key={elIndex} className="question__container">
        <h2 className="question__title">{decode(el.question)}</h2>
        <div className="question__answers">
          {el.answers.map((answer, btnIndex) => {
            if (!endGame)
              return (
                <button
                  key={btnIndex}
                  onClick={() => selectAnswer(answer, elIndex, btnIndex)}
                >
                  {decode(answer)}
                </button>
              );
            else {
              return (
                <button
                  key={btnIndex}
                  className={`answer answer-${btnIndex}`}
                  style={
                    el.correct_answer === selectedAnswers[elIndex].answer
                      ? { color: "red" }
                      : {}
                  }
                >
                  {decode(answer)}
                </button>
              );
            }
          })}
        </div>
      </div>
    ));
  }

  const selectAnswer = (answer, elIndex, btnIndex) => {
    const newAnswer = { [elIndex]: { answer: answer, btnIndex: btnIndex } };
    const newAnswerObject = Object.assign(selectedAnswers, newAnswer);
    setSelectedAnswers(newAnswerObject);
  };

  const handleCheck = () => {
    setEndGame(true);
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
