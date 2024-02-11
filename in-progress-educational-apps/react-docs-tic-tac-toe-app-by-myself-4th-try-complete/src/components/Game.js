import Board from './Board';
import { useState } from 'react';

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setxIsNext] = useState(true);
  const currentSquares = history[history.length - 1];

  const handleClickInGame = nextSquares => {
    setHistory([...history, nextSquares]);
    setxIsNext(!xIsNext);
  };

  const goTo = () => {};

  const moves = history.map((move, index) => {
    return <button onClick={goTo}>Go to move {index}</button>;
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
