import { useState } from "react";
import Square from "./Square";
import calculateWinner from "./calculateWinner";

function Board({ position, xIsNext, handleGame }) {
  const winner = calculateWinner(position);

  let description;
  if (winner) {
    description = `Winner is ${winner}`;
  } else {
    description = `Next to move is ${xIsNext ? "X" : "0"}`;
  }

  function handleSquare(i) {
    if (position[i] || winner) return;
    const nextPosition = [...position];
    if (xIsNext) {
      nextPosition[i] = "X";
    } else {
      nextPosition[i] = "0";
    }

    handleGame(nextPosition);
  }

  function drawBoard(length) {
    return Array.from({ length: length }).map((_, rowIndex) => {
      const squares = Array.from({ length: length }).map((_, colIndex) => {
        const index = rowIndex * length + colIndex;
        return (
          <Square
            key={colIndex}
            value={position[index]}
            onSquareClicked={() => handleSquare(index)}
          />
        );
      });
      return (
        <div key={rowIndex} className="board-row">
          {squares}
        </div>
      );
    });
  }

  return (
    <>
      <div className="status">{description}</div>
      {drawBoard(3)}
    </>
  );
}

export default Board;
