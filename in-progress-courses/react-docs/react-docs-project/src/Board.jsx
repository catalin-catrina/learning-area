import Square from "./Square";
import calculateWinner from "./calculateWinner";

export default function Board({ xIsNext, squares, onPlay, winnerSquares }) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner[1];
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const handleCLick = (i) => {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "0");
    onPlay(nextSquares, i);
  };

  function displayBoard() {
    const board = [];
    for (let row = 0; row < 3; row++) {
      const rowSquares = [];
      for (let col = 0; col < 3; col++) {
        const index = row * 3 + col;
        rowSquares.push(
          <Square
            key={index}
            winnerBackground={winnerSquares?.includes(index) ? "winner" : ""}
            value={squares[index]}
            onSquareClick={() => handleCLick(index)}
          />
        );
      }
      board.push(
        <div key={row} className="board-row">
          {rowSquares}
        </div>
      );
    }
    return board;
  }

  return (
    <>
      {status}
      {displayBoard()}
    </>
  );
}
