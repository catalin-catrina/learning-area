import { useState } from "react";
import Square from "./Square";
import calculateWinner from "./calculateWinner";

function Board() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const board = history[currentMove];
  const xIsNext = currentMove % 2 === 0 ? "X" : "0";
  const winner = calculateWinner(board);
  const status = winner
    ? `Winner is ${winner}`
    : `Next to move ${xIsNext ? "X" : "0"}`;
  const moves = history.map((board, i) => {
    return (
      <li key={i} onClick={() => goToMove(i)}>
        {i === 0 ? "Go to game start" : `Go to move ${i}`}
      </li>
    );
  });

  function goToMove(i) {
    setCurrentMove(i);
  }

  function handleClick(i) {
    if (board[i] || winner) {
      return;
    }
    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "0";
    const newHistory = [...history.slice(0, currentMove + 1), newBoard];
    setHistory(newHistory);
    setCurrentMove((prevCurrentMove) => prevCurrentMove + 1);
  }

  return (
    <div className="game">
      <div className="board">
        <div className="board-row">
          <Square value={board[0]} onSquareClick={() => handleClick(0)} />
          <Square value={board[1]} onSquareClick={() => handleClick(1)} />
          <Square value={board[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={board[3]} onSquareClick={() => handleClick(3)} />
          <Square value={board[4]} onSquareClick={() => handleClick(4)} />
          <Square value={board[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={board[6]} onSquareClick={() => handleClick(6)} />
          <Square value={board[7]} onSquareClick={() => handleClick(7)} />
          <Square value={board[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      <div className="status">{status}</div>
      <div className="history">
        <ul>{moves}</ul>
      </div>
    </div>
  );
}

export default Board;
