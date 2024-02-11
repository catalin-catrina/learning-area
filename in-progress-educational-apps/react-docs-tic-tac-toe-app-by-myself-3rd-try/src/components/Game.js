import Board from './Board';
import { useState } from 'react';

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [isXTurn, setisXTurn] = useState(true);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const currentSquares = history[currentMoveIndex];

  const gameHandleClick = newSquares => {
    const newHistory = [...history.slice(0, currentMoveIndex + 1), newSquares];
    setHistory(newHistory);
    setCurrentMoveIndex(newHistory.length - 1);
    setisXTurn(!isXTurn);
  };

  const goBack = squaresIndex => {
    setCurrentMoveIndex(squaresIndex);
    setisXTurn(squaresIndex % 2 === 0);
  };

  const moves = history.map((squares, index) => {
    return (
      <li key={index}>
        <button onClick={() => goBack(index)}>
          {index > 0 ? `Go back to move ${index}` : 'Start the game'}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="board">
        <Board
          squares={currentSquares}
          isXTurn={isXTurn}
          handleClickFurtherInGameComponent={gameHandleClick}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
