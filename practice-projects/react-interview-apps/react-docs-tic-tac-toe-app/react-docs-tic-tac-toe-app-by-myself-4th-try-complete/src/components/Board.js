import Square from './Square';
import decideWinner from './decideWinner';

const Board = ({ squares, xIsNext, handleClickFurther }) => {
  const winner = decideWinner(squares);

  const handleClick = i => {
    if (squares[i] || decideWinner(squares)) return;

    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? 'X' : '0';
    handleClickFurther(nextSquares);
  };
  return (
    <div>
      <div className="message">
        {winner
          ? `Winner is ${winner}!`
          : `Next to move is ${xIsNext ? 'X' : '0'}`}
      </div>
      <div className="squares-container">
        <Square
          squareNrStyle="1"
          square={squares[0]}
          onSquareClick={() => handleClick(0)}
        />
        <Square
          squareNrStyle="2"
          square={squares[1]}
          onSquareClick={() => handleClick(1)}
        />
        <Square
          squareNrStyle="3"
          square={squares[2]}
          onSquareClick={() => handleClick(2)}
        />
        <Square
          squareNrStyle="4"
          square={squares[3]}
          onSquareClick={() => handleClick(3)}
        />
        <Square
          squareNrStyle="5"
          square={squares[4]}
          onSquareClick={() => handleClick(4)}
        />
        <Square
          squareNrStyle="6"
          square={squares[5]}
          onSquareClick={() => handleClick(5)}
        />
        <Square
          squareNrStyle="7"
          square={squares[6]}
          onSquareClick={() => handleClick(6)}
        />
        <Square
          squareNrStyle="8"
          square={squares[7]}
          onSquareClick={() => handleClick(7)}
        />
        <Square
          squareNrStyle="9"
          square={squares[8]}
          onSquareClick={() => handleClick(8)}
        />
      </div>
    </div>
  );
};

export default Board;
