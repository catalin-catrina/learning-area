import Board from "./Board";
import { useState } from "react";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const [currentSquaresIndex, setCurrentSquaresIndex] = useState(0);

  const [xIsNext, setxIsNext] = useState(true);
  const currentSquares = history[currentSquaresIndex];

  const handleClickInGame = (nextSquares) => {
    const newHistory = [
      ...history.slice(0, currentSquaresIndex + 1),
      nextSquares,
    ];
    setHistory(newHistory);
    setCurrentSquaresIndex(newHistory.length - 1);
    setxIsNext(!xIsNext);
  };

  const goTo = (squaresIndex) => {
    setCurrentSquaresIndex(squaresIndex);
    setxIsNext(squaresIndex % 2 === 0);
  };

  const moves = history.map((move, index) => {
    return (
      <button key="index" onClick={() => goTo(index)}>
        Go to move {index}
      </button>
    );
  });

  return (
    <div className="container">
      <Board
        squares={currentSquares}
        xIsNext={xIsNext}
        handleClickFurther={handleClickInGame}
      />
      <div className="history">{moves}</div>
    </div>
  );
};

export default Game;
