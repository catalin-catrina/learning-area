import Square from './Square';
import { decideWinner } from './decideWinner';

const Board = ({ squares, isXTurn, handleClickFurtherInGameComponent }) => {
  const winner = decideWinner(squares);
  let message;
  if (winner) message = `${winner} won the game!`;
  else {
    message = `It's ${isXTurn ? 'X' : 'O'} turn to move!`;
  }

  const handleClick = i => {
    if (squares[i] || decideWinner(squares)) return;

    const newSquares = [...squares];
    newSquares[i] = isXTurn ? 'X' : '0';

    handleClickFurtherInGameComponent(newSquares);
  };

  return (
    <>
      {' '}
      <div className="winner">{message}</div>
      <div className="container">
        <Square
          styleNr="1"
          square={squares[0]}
          onSquareClick={() => handleClick(0)}
        />
        <Square
          styleNr="2"
          square={squares[1]}
          onSquareClick={() => handleClick(1)}
        />
        <Square
          styleNr="3"
          square={squares[2]}
          onSquareClick={() => handleClick(2)}
        />
        <Square
          styleNr="4"
          square={squares[3]}
          onSquareClick={() => handleClick(3)}
        />
        <Square
          styleNr="5"
          square={squares[4]}
          onSquareClick={() => handleClick(4)}
        />
        <Square
          styleNr="6"
          square={squares[5]}
          onSquareClick={() => handleClick(5)}
        />
        <Square
          styleNr="7"
          square={squares[6]}
          onSquareClick={() => handleClick(6)}
        />
        <Square
          styleNr="8"
          square={squares[7]}
          onSquareClick={() => handleClick(7)}
        />
        <Square
          styleNr="9"
          square={squares[8]}
          onSquareClick={() => handleClick(8)}
        />
      </div>
    </>
  );
};

export default Board;
