import "./App.css";
import { useState } from "react";
import Square from "./components/Square";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);

  const winner = calculateWinner(squares);
  const message = isX ? "It's X turn" : "It's 0 turn";

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return;
    const squaresCopy = [...squares];
    squaresCopy[i] = isX ? "X" : "0";
    setSquares(squaresCopy);
    setIsX(!isX);
  };

  return (
    <>
      <h2>{winner ? `${winner} won the game` : message}</h2>
      <div className="container">
        <Square
          squareNumber="1"
          square={squares[0]}
          onSquareClick={() => handleClick(0)}
        />
        <Square
          squareNumber="2"
          square={squares[1]}
          onSquareClick={() => handleClick(1)}
        />
        <Square
          squareNumber="3"
          square={squares[2]}
          onSquareClick={() => handleClick(2)}
        />
        <Square
          squareNumber="4"
          square={squares[3]}
          onSquareClick={() => handleClick(3)}
        />
        <Square
          squareNumber="5"
          square={squares[4]}
          onSquareClick={() => handleClick(4)}
        />
        <Square
          squareNumber="6"
          square={squares[5]}
          onSquareClick={() => handleClick(5)}
        />
        <Square
          squareNumber="7"
          square={squares[6]}
          onSquareClick={() => handleClick(6)}
        />
        <Square
          squareNumber="8"
          square={squares[7]}
          onSquareClick={() => handleClick(7)}
        />
        <Square
          squareNumber="9"
          square={squares[8]}
          onSquareClick={() => handleClick(8)}
        />
      </div>
    </>
  );
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default App;
