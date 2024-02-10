import Board from './Board';
import { useState } from 'react';

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [isXTurn, setisXTurn] = useState(true);
  const currentSquares = history[history.length - 1];

  const gameHandleClick = newSquares => {
    setHistory([...history, newSquares]);
    setisXTurn(!isXTurn);
  };

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
        <ol>{}</ol>
      </div>
    </div>
  );
};

export default Game;
