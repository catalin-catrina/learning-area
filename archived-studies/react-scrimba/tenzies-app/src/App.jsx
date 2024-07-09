import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./components/Die";
import "./App.css";

function App() {
  const allNewDice = () => {
    const diceArr = [];
    for (let i = 0; i < 10; i++) {
      diceArr.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return diceArr;
  };

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0);
  const [highestScore, setHighestScore] = useState(
    localStorage.getItem("score")
  );

  useEffect(() => {
    for (let i = 0; i < dice.length; i++) {
      for (let j = i + 1; j < dice.length; j++) {
        if (dice[i].value !== dice[j].value || !dice[i].isHeld) return;
      }
    }
    setTenzies(true);
  }, [dice]);

  useEffect(() => {
    if (tenzies) {
      if (localStorage.getItem("score") === null) {
        localStorage.setItem("score", rolls);
      } else if (rolls < Number(localStorage.getItem("score"))) {
        localStorage.setItem("score", rolls);
        setHighestScore(rolls);
      }
    }
  }, [tenzies, rolls, highestScore]);

  const handleRoll = () => {
    setDice((oldDice) => {
      return oldDice.map((dice) => {
        return !dice.isHeld
          ? {
              ...dice,
              value: Math.ceil(Math.random() * 6),
            }
          : dice;
      });
    });
    setRolls((oldRolls) => oldRolls + 1);
  };

  const handleHoldDice = (id) => {
    setDice((oldDice) =>
      oldDice.map((dice) => {
        return dice.id === id
          ? {
              ...dice,
              isHeld: !dice.isHeld,
            }
          : dice;
      })
    );
  };

  const startNewGame = () => {
    setDice(allNewDice());
    setTenzies(false);
    setRolls(0);
  };

  const diceElements = dice.map((die, index) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => handleHoldDice(die.id)}
    />
  ));

  return (
    <div className="container">
      {tenzies && <Confetti />}
      <main className="main">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="main__container">{diceElements}</div>
        {!tenzies ? (
          <button onClick={handleRoll}>Roll</button>
        ) : (
          <button onClick={startNewGame}>New Game</button>
        )}
        <h3>Number of rolls: {rolls}</h3>
        <h3>Highest score: {highestScore}</h3>
      </main>
    </div>
  );
}

export default App;
