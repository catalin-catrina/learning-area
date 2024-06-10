import Board from "./Board";
import { useState, useEffect, useRef } from "react";
import calculateWinner from "./calculateWinner";

export default function Game() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), location: null },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isReversed, setIsReversed] = useState(false);
  const [winnerSquares, setWinnerSquares] = useState(null);
  const currentSquares = history[currentMove].squares;
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(newSquares, i) {
    const row = Math.floor(i / 3);
    const col = i % 3;
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: newSquares, location: { row, col } },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  let moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to move #${move} - [${squares.location?.row}, ${squares.location?.col}]`;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        {move === currentMove && move !== 0 ? (
          `You are at move ${move} - [${squares.location?.row} ${squares.location?.col}]`
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  const displayedMoves = isReversed ? [...moves].reverse() : moves;

  useEffect(() => {
    const winner = calculateWinner(currentSquares);
    if (winner) {
      setWinnerSquares(winner[0]);
    } else {
      setWinnerSquares(null);
    }
  }, [currentSquares]);

  function toggleDisplayOrder() {
    setIsReversed(!isReversed);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          winnerSquares={winnerSquares}
        />
      </div>
      <div className="game-info">
        <button onClick={toggleDisplayOrder}>
          Toggle ascending/descending
        </button>
        <ol>{displayedMoves}</ol>
      </div>
    </div>
  );
}
