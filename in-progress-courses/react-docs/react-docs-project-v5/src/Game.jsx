import { useState } from "react";
import Board from "./Board";

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentPosition = history[currentMove];
  const xIsNext = history.length % 2 !== 0;

  function handleGame(nextPosition) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextPosition];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function goToPosition(positionIndex) {
    setCurrentMove(positionIndex);
  }

  const moves = history.map((move, index) => {
    let description;

    if (index === 0) {
      description = "Go to game start";
    } else if (index === currentMove) {
      description = `You are at move ${currentMove}`;
    } else {
      description = `Go to move ${index}`;
    }

    return (
      <li key={index}>
        {index !== currentMove ? (
          <button onClick={() => goToPosition(index)}>{description}</button>
        ) : (
          <p>{description}</p>
        )}
      </li>
    );
  });

  return (
    <>
      <div className="game-board">
        <Board
          position={currentPosition}
          xIsNext={xIsNext}
          handleGame={handleGame}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </>
  );
}

export default Game;
