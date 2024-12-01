import { useState } from "react";
import Board from "./Board";

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [showReversedMoves, setShowReversedMoves] = useState(false);
  const xIsNext = currentMove % 2 === 0 ? true : false;
  const board = history[currentMove];

  function handleGame(newBoard) {
    const newHistory = [...history.slice(0, currentMove + 1), newBoard];

    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  }

  const moves = history.map((board, move) => {
    if (move === 0) {
      return (
        <li key={move} onClick={() => goToMove(move)}>
          Go to game start
        </li>
      );
    } else {
      return (
        <li key={move} onClick={() => goToMove(move)}>
          Go to move {move}
        </li>
      );
    }
  });

  const reversedMoves = [...history].reverse().map((board, move) => {
    if (move === history.length - 1) {
      return (
        <li key={move} onClick={() => goToMove(history.length - 1 - move)}>
          Go to game start
        </li>
      );
    } else {
      return (
        <li key={move} onClick={() => goToMove(history.length - 1 - move)}>
          Go to move {history.length - 1 - move}
        </li>
      );
    }
  });

  function goToMove(move) {
    setCurrentMove(move);
  }

  function sortMoves() {
    setShowReversedMoves(!showReversedMoves);
  }

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board onPlay={handleGame} xIsNext={xIsNext} board={board} />
        </div>
        <div className="game-info">
          <button onClick={sortMoves}>Sort moves</button>
          <ul>{showReversedMoves ? reversedMoves : moves}</ul>
        </div>
      </div>
    </>
  );
}

export default Game;
