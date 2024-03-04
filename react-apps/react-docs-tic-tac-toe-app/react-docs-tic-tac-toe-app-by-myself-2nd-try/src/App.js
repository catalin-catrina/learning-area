import { useState } from 'react';

import './App.css';
import Square from './components/Square';

function App() {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [xIsNext, setxIsNext] = useState(true);

  const handleClick = i => {
    if (square[i]) return;
    const squaresCopy = square.slice();
    squaresCopy[i] = xIsNext ? 'X' : '0';
    setSquare(squaresCopy);
    setxIsNext(!xIsNext);
  };

  return (
    <div className="container">
      <Square
        squareNumber="1"
        value={square[0]}
        onSquareClick={() => handleClick(0)}
      />
      <Square
        squareNumber="2"
        value={square[1]}
        onSquareClick={() => handleClick(1)}
      />
      <Square
        squareNumber="3"
        value={square[2]}
        onSquareClick={() => handleClick(2)}
      />
      <Square
        squareNumber="4"
        value={square[3]}
        onSquareClick={() => handleClick(3)}
      />
      <Square
        squareNumber="5"
        value={square[4]}
        onSquareClick={() => handleClick(4)}
      />
      <Square
        squareNumber="6"
        value={square[5]}
        onSquareClick={() => handleClick(5)}
      />
      <Square
        squareNumber="7"
        value={square[6]}
        onSquareClick={() => handleClick(6)}
      />
      <Square
        squareNumber="8"
        value={square[7]}
        onSquareClick={() => handleClick(7)}
      />
      <Square
        squareNumber="9"
        value={square[8]}
        onSquareClick={() => handleClick(8)}
      />
    </div>
  );
}

export default App;
