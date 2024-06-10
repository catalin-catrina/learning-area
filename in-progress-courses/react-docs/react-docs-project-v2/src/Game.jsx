import { useState } from "react";
import Board from "./Board";

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [isXTurn, setIsXTurn] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  const moves = history.map((squares, index) => {
    let message;
    if (index === 0) {
      message = "Go to game start";
    } else {
      message = `Go to move ${index}`;
    }
    return (
      <li key={index} onClick={() => goToMove(index)}>
        {message}
      </li>
    );
  });

  function goToMove(index) {
    setCurrentMove(index);
    setIsXTurn(index % 2 === 0);
  }

  function handlePlay(newSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setIsXTurn(!isXTurn);
  }

  return (
    <div>
      <div className="inner-container">
        <Board
          squares={currentSquares}
          isXTurn={isXTurn}
          handlePlay={handlePlay}
        />
        <div className="move-history-container">
          <ul className="move-history-list">{moves}</ul>
        </div>
      </div>
    </div>
  );
}

export default Game;
